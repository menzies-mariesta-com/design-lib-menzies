import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_style_spec.g.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `file-input` tone modifiers.
enum WashFileInputTone {
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

enum WashFileInputSize { xs, sm, md, lg, xl }

/// Token-driven file picker styled like daisyUI `file-input`.
class WashFileInput extends StatefulWidget {
  const WashFileInput({
    this.tone = WashFileInputTone.defaultTone,
    this.size = WashFileInputSize.md,
    this.enabled = true,
    this.multiple = false,
    this.browseLabel = 'Choose file',
    this.emptyLabel = 'No file chosen',
    this.fileNames,
    this.onChanged,
    this.onBrowse,
    this.semanticLabel,
    this.maxWidth,
    super.key,
  });

  final WashFileInputTone tone;
  final WashFileInputSize size;
  final bool enabled;
  final bool multiple;
  final String browseLabel;
  final String emptyLabel;
  final List<String>? fileNames;
  final ValueChanged<List<String>>? onChanged;
  final VoidCallback? onBrowse;
  final String? semanticLabel;
  final double? maxWidth;

  @override
  State<WashFileInput> createState() => _WashFileInputState();
}

class _WashFileInputState extends State<WashFileInput> {
  List<String> _picked = const [];

  List<String> get _names => widget.fileNames ?? _picked;

  void _browse() {
    if (!widget.enabled) return;
    if (widget.onBrowse != null) {
      widget.onBrowse!();
      return;
    }
    final demo = widget.multiple
        ? const ['plate-a.png', 'plate-b.png']
        : const ['coastal-scan.png'];
    setState(() => _picked = demo);
    widget.onChanged?.call(demo);
  }

  void clear() {
    if (!widget.enabled) return;
    setState(() => _picked = const []);
    widget.onChanged?.call(const []);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _metrics(widget.size);
    final (browseBg, browseFg, fieldBg, fieldFg, border) = _colors(tokens, widget.tone, widget.enabled);
    final names = _names;
    final label = names.isEmpty
        ? widget.emptyLabel
        : (widget.multiple ? names.join(', ') : names.first);

    Widget control = ClipRRect(
      borderRadius: BorderRadius.circular(metrics.borderRadius),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: fieldBg,
          border: border,
          borderRadius: BorderRadius.circular(metrics.borderRadius),
          boxShadow: widget.tone == WashFileInputTone.ghost ? null : washPaperShadowSm(tokens),
        ),
        child: Row(
          children: [
            WashRipple(
              enabled: widget.enabled,
              onTap: _browse,
              borderRadius: 0,
              child: Container(
                height: metrics.minHeight,
                padding: EdgeInsets.symmetric(horizontal: metrics.paddingX),
                alignment: Alignment.center,
                color: browseBg,
                child: Text(
                  widget.browseLabel,
                  style: WashTypography.button(browseFg, metrics.fontSize, 600),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: metrics.paddingX),
                child: Text(
                  label,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: WashTypography.body(fieldFg).copyWith(fontSize: metrics.fontSize),
                ),
              ),
            ),
          ],
        ),
      ),
    );

    if (widget.semanticLabel != null) {
      control = Semantics(
        label: widget.semanticLabel,
        button: true,
        enabled: widget.enabled,
        child: control,
      );
    }

    if (widget.maxWidth != null) {
      control = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: widget.maxWidth!),
        child: control,
      );
    }

    if (!widget.enabled) {
      control = Opacity(opacity: 0.55, child: control);
    }

    return control;
  }

  static WashBtnMetrics _metrics(WashFileInputSize size) {
    final key = switch (size) {
      WashFileInputSize.xs => 'xs',
      WashFileInputSize.sm => 'sm',
      WashFileInputSize.md => 'md',
      WashFileInputSize.lg => 'lg',
      WashFileInputSize.xl => 'xl',
    };
    return kWashBtnSizeMetrics[key] ?? kWashBtnDefault;
  }

  static (Color?, Color, Color?, Color, Border?) _colors(
    WashTokens tokens,
    WashFileInputTone tone,
    bool enabled,
  ) {
    final p = tokens.palette;
    Color? browseBg;
    Color browseFg = tokens.onSurface;
    Color? fieldBg = tokens.surface;
    Color fieldFg = enabled ? tokens.onSurface : tokens.inkMuted;
    Border? border = Border.all(color: tokens.inkBorder, width: 1);

    void applySemantic(Color c, Color on) {
      browseBg = c;
      browseFg = on;
    }

    switch (tone) {
      case WashFileInputTone.ghost:
        browseBg = null;
        fieldBg = null;
        border = Border.all(color: tokens.inkBorder.withValues(alpha: 0.5));
      case WashFileInputTone.neutral:
        applySemantic(p.neutral, p.neutralContent);
      case WashFileInputTone.primary:
        applySemantic(p.primary, p.primaryContent);
      case WashFileInputTone.secondary:
        applySemantic(p.secondary, p.secondaryContent);
      case WashFileInputTone.accent:
        applySemantic(p.accent, p.accentContent);
      case WashFileInputTone.info:
        applySemantic(p.info, p.infoContent);
      case WashFileInputTone.success:
        applySemantic(p.success, p.successContent);
      case WashFileInputTone.warning:
        applySemantic(p.warning, p.warningContent);
      case WashFileInputTone.error:
        applySemantic(p.error, p.errorContent);
      case WashFileInputTone.defaultTone:
        browseBg = tokens.surfaceContainer;
        browseFg = tokens.onSurface;
    }
    return (browseBg, browseFg, fieldBg, fieldFg, border);
  }
}

/// Gallery monospace class hint (FileInputPage ClassLabel).
class WashFileInputClassLabel extends StatelessWidget {
  const WashFileInputClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}
