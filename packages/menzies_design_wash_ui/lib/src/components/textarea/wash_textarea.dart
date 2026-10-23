import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../input/wash_input.dart';

/// daisyUI `textarea` uses the same tone and size tokens as `input`.
typedef WashTextareaTone = WashInputTone;
typedef WashTextareaSize = WashInputSize;

double washTextareaMinHeightFor({
  WashInputSize size = WashInputSize.md,
  int rows = 3,
}) {
  final metrics = washInputMetricsFor(size);
  final lineHeight = metrics.fontSize * 1.375;
  return metrics.paddingY * 2 + lineHeight * rows;
}

String washTextareaClassLabel({
  WashInputTone tone = WashInputTone.defaultTone,
  WashInputSize size = WashInputSize.md,
}) {
  final parts = <String>['textarea'];
  final toneClass = switch (tone) {
    WashInputTone.defaultTone => null,
    WashInputTone.ghost => 'textarea-ghost',
    WashInputTone.neutral => 'textarea-neutral',
    WashInputTone.primary => 'textarea-primary',
    WashInputTone.secondary => 'textarea-secondary',
    WashInputTone.accent => 'textarea-accent',
    WashInputTone.info => 'textarea-info',
    WashInputTone.success => 'textarea-success',
    WashInputTone.warning => 'textarea-warning',
    WashInputTone.error => 'textarea-error',
  };
  if (toneClass != null) parts.add(toneClass);
  if (size != WashInputSize.md) {
    parts.add('textarea-${size.name}');
  }
  return parts.join(' ');
}

/// Gallery monospace class hint (TextareaPage ClassLabel).
class WashTextareaClassLabel extends StatelessWidget {
  const WashTextareaClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'textarea' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// daisyUI `textarea` for multi-line notes. Reuses [WashInputTone] / [WashInputSize].
class WashTextarea extends StatefulWidget {
  const WashTextarea({
    this.controller,
    this.focusNode,
    this.label,
    this.hint,
    this.error,
    this.helper,
    this.requiredMark = false,
    this.readOnly = false,
    this.enabled = true,
    this.tone = WashInputTone.defaultTone,
    this.size = WashInputSize.md,
    this.minLines = 3,
    this.rows,
    this.maxLines,
    this.maxLength,
    this.onChanged,
    this.initialValue,
    this.maxWidth,
    this.expanded = true,
    this.semanticLabel,
    super.key,
  });

  final TextEditingController? controller;
  final FocusNode? focusNode;
  final String? label;
  final String? hint;
  final String? error;
  final String? helper;
  final bool requiredMark;
  final bool readOnly;
  final bool enabled;
  final WashInputTone tone;
  final WashInputSize size;

  /// Legacy row count; prefer [rows] when both are set [rows] wins.
  final int minLines;
  final int? rows;
  final int? maxLines;
  final int? maxLength;
  final ValueChanged<String>? onChanged;
  final String? initialValue;
  final double? maxWidth;
  final bool expanded;
  final String? semanticLabel;

  int get effectiveRows => rows ?? minLines;

  @override
  State<WashTextarea> createState() => _WashTextareaState();
}

class _WashTextareaState extends State<WashTextarea> {
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
  void didUpdateWidget(covariant WashTextarea oldWidget) {
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
    final rows = widget.effectiveRows;
    final maxLines = widget.maxLines ?? rows;
    final minHeight = washTextareaMinHeightFor(size: widget.size, rows: rows);

    Widget field = _WashTextareaField(
      controller: _controller,
      focusNode: _focus,
      hint: widget.hint,
      readOnly: widget.readOnly || disabled,
      enabled: widget.enabled,
      metrics: metrics,
      tokens: tokens,
      onChanged: widget.onChanged,
      minLines: rows,
      maxLines: maxLines,
      maxLength: widget.maxLength,
    );

    field = _WashTextareaShell(
      metrics: metrics,
      tokens: tokens,
      tone: effectiveTone,
      minHeight: minHeight,
      disabled: disabled,
      child: field,
    );

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
      field = IgnorePointer(
        child: Opacity(opacity: 0.55, child: field),
      );
    }

    if (widget.semanticLabel != null) {
      field = Semantics(
        label: widget.semanticLabel,
        textField: true,
        multiline: true,
        enabled: widget.enabled,
        readOnly: widget.readOnly,
        child: field,
      );
    }

    final showLabel = widget.label != null && widget.label!.isNotEmpty;
    final showError = widget.error != null && widget.error!.isNotEmpty;
    final showHelper = widget.helper != null && widget.helper!.isNotEmpty;

    if (!showLabel && !showError && !showHelper) {
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
          )
        else if (showHelper)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              widget.helper!,
              style:
                  WashTypography.label(tokens.inkMuted).copyWith(fontSize: 12),
            ),
          ),
      ],
    );
  }
}

class _WashTextareaShell extends StatelessWidget {
  const _WashTextareaShell({
    required this.metrics,
    required this.tokens,
    required this.tone,
    required this.minHeight,
    required this.disabled,
    required this.child,
  });

  final WashInputMetrics metrics;
  final WashTokens tokens;
  final WashInputTone tone;
  final double minHeight;
  final bool disabled;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final (fill, borderColor, shadow) = _shellColors(tokens, tone, disabled);

    return Container(
      constraints: BoxConstraints(minHeight: minHeight),
      padding: EdgeInsets.symmetric(
          horizontal: metrics.paddingX, vertical: metrics.paddingY),
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(metrics.borderRadius),
        border: Border.all(color: borderColor, width: metrics.borderWidth),
        boxShadow: shadow,
      ),
      alignment: Alignment.topLeft,
      child: child,
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
      border = const Color(0x00000000);
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

class _WashTextareaField extends StatefulWidget {
  const _WashTextareaField({
    required this.controller,
    required this.focusNode,
    required this.hint,
    required this.readOnly,
    required this.enabled,
    required this.metrics,
    required this.tokens,
    required this.onChanged,
    required this.minLines,
    required this.maxLines,
    required this.maxLength,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final String? hint;
  final bool readOnly;
  final bool enabled;
  final WashInputMetrics metrics;
  final WashTokens tokens;
  final ValueChanged<String>? onChanged;
  final int minLines;
  final int maxLines;
  final int? maxLength;

  @override
  State<_WashTextareaField> createState() => _WashTextareaFieldState();
}

class _WashTextareaFieldState extends State<_WashTextareaField> {
  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_sync);
  }

  @override
  void didUpdateWidget(covariant _WashTextareaField oldWidget) {
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
      height: 1.375,
    );
    final hintStyle = WashTypography.body(widget.tokens.inkMuted).copyWith(
      fontSize: widget.metrics.fontSize,
      height: 1.375,
    );
    final cursor = widget.readOnly && !widget.enabled
        ? SystemMouseCursors.forbidden
        : (widget.readOnly
            ? SystemMouseCursors.basic
            : SystemMouseCursors.text);

    return MouseRegion(
      cursor: widget.enabled ? cursor : SystemMouseCursors.forbidden,
      child: Stack(
        alignment: Alignment.topLeft,
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
            style: textStyle,
            cursorColor: widget.tokens.primary,
            backgroundCursorColor: widget.tokens.inkMuted,
            keyboardType: TextInputType.multiline,
            textInputAction: TextInputAction.newline,
            minLines: widget.minLines,
            maxLines: widget.maxLines,
            onChanged: widget.onChanged,
            inputFormatters: [
              if (widget.maxLength != null)
                LengthLimitingTextInputFormatter(widget.maxLength),
            ],
          ),
        ],
      ),
    );
  }
}
