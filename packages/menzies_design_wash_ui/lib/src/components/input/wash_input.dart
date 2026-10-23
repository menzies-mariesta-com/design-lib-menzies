import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `input` tone modifiers (`input-primary`, `input-ghost`, …).
enum WashInputTone {
  defaultTone,
  ghost,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

enum WashInputSize { xs, sm, md, lg, xl }

WashInputMetrics washInputMetricsFor(WashInputSize size) {
  return switch (size) {
    WashInputSize.xs => const WashInputMetrics(
        minHeight: 32,
        paddingX: 10,
        paddingY: 6,
        fontSize: 12,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashInputSize.sm => const WashInputMetrics(
        minHeight: 40,
        paddingX: 12,
        paddingY: 8,
        fontSize: 13,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashInputSize.md => kWashInputDefault,
    WashInputSize.lg => const WashInputMetrics(
        minHeight: 52,
        paddingX: 18,
        paddingY: 12,
        fontSize: 15,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashInputSize.xl => const WashInputMetrics(
        minHeight: 56,
        paddingX: 20,
        paddingY: 14,
        fontSize: 16,
        borderRadius: 16,
        borderWidth: 1,
      ),
  };
}

String washInputClassLabel({
  WashInputTone tone = WashInputTone.defaultTone,
  WashInputSize size = WashInputSize.md,
}) {
  final parts = <String>['input'];
  final toneClass = switch (tone) {
    WashInputTone.defaultTone => null,
    WashInputTone.ghost => 'input-ghost',
    WashInputTone.neutral => 'input-neutral',
    WashInputTone.primary => 'input-primary',
    WashInputTone.secondary => 'input-secondary',
    WashInputTone.accent => 'input-accent',
    WashInputTone.info => 'input-info',
    WashInputTone.success => 'input-success',
    WashInputTone.warning => 'input-warning',
    WashInputTone.error => 'input-error',
  };
  if (toneClass != null) parts.add(toneClass);
  if (size != WashInputSize.md) {
    parts.add('input-${size.name}');
  }
  return parts.join(' ');
}

/// Gallery monospace class hint (InputPage ClassLabel).
class WashInputClassLabel extends StatelessWidget {
  const WashInputClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'input' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

class WashInput extends StatefulWidget {
  const WashInput({
    this.controller,
    this.focusNode,
    this.label,
    this.hint,
    this.error,
    this.requiredMark = false,
    this.obscureText = false,
    this.readOnly = false,
    this.enabled = true,
    this.tone = WashInputTone.defaultTone,
    this.size = WashInputSize.md,
    this.keyboardType,
    this.onChanged,
    this.initialValue,
    this.leading,
    this.trailing,
    this.maxWidth,
    this.expanded = true,
    this.semanticLabel,
    this.maxLines = 1,
    this.joinItem = false,
    this.decorated = true,
    super.key,
  });

  final TextEditingController? controller;
  final FocusNode? focusNode;
  final String? label;
  final String? hint;
  final String? error;
  final bool requiredMark;
  final bool obscureText;
  final bool readOnly;
  final bool enabled;
  final WashInputTone tone;
  final WashInputSize size;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final String? initialValue;
  final Widget? leading;
  final Widget? trailing;
  final double? maxWidth;
  final bool expanded;
  final String? semanticLabel;
  final int maxLines;
  final bool joinItem;
  final bool decorated;

  @override
  State<WashInput> createState() => _WashInputState();
}

class _WashInputState extends State<WashInput> {
  late TextEditingController _controller;
  FocusNode? _ownedFocus;
  bool _ownsController = false;

  @override
  void initState() {
    super.initState();
    _ownsController = widget.controller == null;
    _controller =
        widget.controller ?? TextEditingController(text: widget.initialValue);
    if (widget.focusNode == null) {
      _ownedFocus = FocusNode();
    }
  }

  @override
  void didUpdateWidget(covariant WashInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      if (_ownsController) {
        _controller.dispose();
      }
      _ownsController = widget.controller == null;
      _controller =
          widget.controller ?? TextEditingController(text: widget.initialValue);
    }
    if (oldWidget.focusNode != widget.focusNode) {
      _ownedFocus?.dispose();
      _ownedFocus = widget.focusNode == null ? FocusNode() : null;
    }
  }

  @override
  void dispose() {
    if (_ownsController) _controller.dispose();
    _ownedFocus?.dispose();
    super.dispose();
  }

  FocusNode get _focus => widget.focusNode ?? _ownedFocus!;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = washInputMetricsFor(widget.size);
    final hasError = widget.error != null && widget.error!.isNotEmpty;
    final effectiveTone = hasError ? WashInputTone.error : widget.tone;
    final disabled = !widget.enabled;
    final composite = widget.leading != null || widget.trailing != null;

    Widget field = _WashInputField(
      controller: _controller,
      focusNode: _focus,
      hint: widget.hint,
      obscureText: widget.obscureText,
      readOnly: widget.readOnly || disabled,
      enabled: widget.enabled,
      metrics: metrics,
      tokens: tokens,
      keyboardType: widget.keyboardType,
      onChanged: widget.onChanged,
      maxLines: widget.maxLines,
    );

    if (widget.decorated) {
      if (composite) {
        field = _WashInputCompositeShell(
          metrics: metrics,
          tokens: tokens,
          tone: effectiveTone,
          joinItem: widget.joinItem,
          leading: widget.leading,
          trailing: widget.trailing,
          child: field,
        );
      } else {
        field = _WashInputShell(
          metrics: metrics,
          tokens: tokens,
          tone: effectiveTone,
          joinItem: widget.joinItem,
          readOnly: widget.readOnly,
          disabled: disabled,
          child: field,
        );
      }
    }

    if (widget.expanded) {
      field = SizedBox(width: double.infinity, child: field);
    }

    if (widget.maxWidth != null) {
      field = Align(
        alignment: Alignment.centerLeft,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: widget.maxWidth!),
          child: field,
        ),
      );
    }

    if (disabled) {
      field = Opacity(opacity: 0.55, child: field);
    }

    if (widget.semanticLabel != null) {
      field = Semantics(
        label: widget.semanticLabel,
        textField: true,
        enabled: widget.enabled,
        readOnly: widget.readOnly,
        child: field,
      );
    }

    final showLabel = widget.label != null && widget.label!.isNotEmpty;
    final showError = widget.error != null && widget.error!.isNotEmpty;

    if (!showLabel && !showError) {
      return field;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showLabel)
          Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.label!,
                  style: WashTypography.label(tokens.onSurface)
                      .copyWith(fontSize: 13),
                ),
                if (widget.requiredMark)
                  const Padding(
                    padding: EdgeInsets.only(left: 2),
                    child: Text(
                      '*',
                      style: TextStyle(
                          color: Color(0xFFEF4444), fontSize: 14, height: 1),
                    ),
                  ),
              ],
            ),
          ),
        field,
        if (showError)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              widget.error!,
              style: WashTypography.label(tokens.palette.error)
                  .copyWith(fontSize: 12),
            ),
          ),
      ],
    );
  }
}

class _WashInputShell extends StatelessWidget {
  const _WashInputShell({
    required this.metrics,
    required this.tokens,
    required this.tone,
    required this.joinItem,
    required this.readOnly,
    required this.disabled,
    required this.child,
  });

  final WashInputMetrics metrics;
  final WashTokens tokens;
  final WashInputTone tone;
  final bool joinItem;
  final bool readOnly;
  final bool disabled;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final (fill, borderColor, shadow) = _shellColors(tokens, tone, disabled);
    final radius = joinItem ? 0.0 : metrics.borderRadius;

    return Container(
      constraints: BoxConstraints(minHeight: metrics.minHeight),
      padding: EdgeInsets.symmetric(
          horizontal: metrics.paddingX, vertical: metrics.paddingY),
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: borderColor, width: metrics.borderWidth),
        boxShadow: shadow,
      ),
      alignment: Alignment.centerLeft,
      child: child,
    );
  }
}

class _WashInputCompositeShell extends StatelessWidget {
  const _WashInputCompositeShell({
    required this.metrics,
    required this.tokens,
    required this.tone,
    required this.joinItem,
    required this.leading,
    required this.trailing,
    required this.child,
  });

  final WashInputMetrics metrics;
  final WashTokens tokens;
  final WashInputTone tone;
  final bool joinItem;
  final Widget? leading;
  final Widget? trailing;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final (fill, borderColor, shadow) = _shellColors(tokens, tone, false);
    final radius = joinItem ? 0.0 : metrics.borderRadius;

    return Container(
      constraints: BoxConstraints(minHeight: metrics.minHeight),
      padding: EdgeInsets.symmetric(
          horizontal: metrics.paddingX, vertical: metrics.paddingY),
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: borderColor, width: metrics.borderWidth),
        boxShadow: shadow,
      ),
      child: Row(
        children: [
          if (leading != null) ...[leading!, const SizedBox(width: 8)],
          Expanded(child: child),
          if (trailing != null) ...[const SizedBox(width: 8), trailing!],
        ],
      ),
    );
  }
}

(Color? fill, Color border, List<BoxShadow>? shadow) _shellColors(
  WashTokens tokens,
  WashInputTone tone,
  bool disabled,
) {
  final p = tokens.palette;
  Color border = tokens.inkBorder;
  Color? fill = tokens.surface;
  List<BoxShadow>? shadow = washPaperShadowSm(tokens);

  switch (tone) {
    case WashInputTone.ghost:
      fill = null;
      border = tokens.inkBorder.withValues(alpha: 0.45);
      shadow = null;
    case WashInputTone.neutral:
      border = p.neutral;
    case WashInputTone.primary:
      border = p.primary;
    case WashInputTone.secondary:
      border = p.secondary;
    case WashInputTone.accent:
      border = p.accent;
    case WashInputTone.info:
      border = p.info;
    case WashInputTone.success:
      border = p.success;
    case WashInputTone.warning:
      border = p.warning;
    case WashInputTone.error:
      border = p.error;
    case WashInputTone.defaultTone:
      break;
  }

  if (disabled) {
    shadow = null;
  }

  return (fill, border, shadow);
}

class _WashInputField extends StatefulWidget {
  const _WashInputField({
    required this.controller,
    required this.focusNode,
    required this.hint,
    required this.obscureText,
    required this.readOnly,
    required this.enabled,
    required this.metrics,
    required this.tokens,
    required this.keyboardType,
    required this.onChanged,
    required this.maxLines,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final String? hint;
  final bool obscureText;
  final bool readOnly;
  final bool enabled;
  final WashInputMetrics metrics;
  final WashTokens tokens;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final int maxLines;

  @override
  State<_WashInputField> createState() => _WashInputFieldState();
}

class _WashInputFieldState extends State<_WashInputField> {
  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_sync);
  }

  @override
  void didUpdateWidget(covariant _WashInputField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_sync);
      widget.controller.addListener(_sync);
    }
  }

  @override
  void dispose() {
    widget.controller.removeListener(_sync);
    super.dispose();
  }

  void _sync() => setState(() {});

  @override
  Widget build(BuildContext context) {
    final showHint = widget.hint != null &&
        widget.hint!.isNotEmpty &&
        widget.controller.text.isEmpty;
    final textStyle = WashTypography.body(widget.tokens.onSurface).copyWith(
      fontSize: widget.metrics.fontSize,
    );
    final hintStyle = WashTypography.body(widget.tokens.inkMuted).copyWith(
      fontSize: widget.metrics.fontSize,
    );
    final cursor = widget.readOnly && !widget.enabled
        ? MouseCursor.defer
        : (widget.readOnly
            ? SystemMouseCursors.basic
            : SystemMouseCursors.text);

    return MouseRegion(
      cursor: widget.enabled ? cursor : SystemMouseCursors.forbidden,
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          if (showHint)
            IgnorePointer(
              child: Text(
                widget.hint!,
                style: hintStyle,
                maxLines: widget.maxLines,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          EditableText(
            controller: widget.controller,
            focusNode: widget.focusNode,
            readOnly: widget.readOnly || !widget.enabled,
            obscureText: widget.obscureText,
            style: textStyle,
            cursorColor: widget.tokens.primary,
            backgroundCursorColor: widget.tokens.inkMuted,
            keyboardType: widget.keyboardType,
            maxLines: widget.maxLines,
            onChanged: widget.onChanged,
          ),
        ],
      ),
    );
  }
}
