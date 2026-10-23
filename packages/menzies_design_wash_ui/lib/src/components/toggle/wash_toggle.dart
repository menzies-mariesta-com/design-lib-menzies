import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Semantic daisyUI `toggle-*` tones.
enum WashToggleTone {
  defaultTone,
  primary,
  secondary,
  accent,
  neutral,
  info,
  success,
  warning,
  error,
}

/// daisyUI `toggle-xs` through `toggle-xl`.
enum WashToggleSize { xs, sm, md, lg, xl }

class WashToggleMetrics {
  const WashToggleMetrics({
    required this.width,
    required this.height,
    required this.padding,
    required this.border,
    required this.knob,
    required this.icon,
  });

  final double width;
  final double height;
  final double padding;
  final double border;
  final double knob;
  final double icon;
}

const kWashToggleMetrics = <WashToggleSize, WashToggleMetrics>{
  WashToggleSize.xs: WashToggleMetrics(
    width: 26,
    height: 16,
    padding: 2,
    border: 1,
    knob: 12,
    icon: 8,
  ),
  WashToggleSize.sm: WashToggleMetrics(
    width: 33,
    height: 20,
    padding: 2.5,
    border: 1,
    knob: 15,
    icon: 10,
  ),
  WashToggleSize.md: WashToggleMetrics(
    width: 40,
    height: 24,
    padding: 3,
    border: 1,
    knob: 18,
    icon: 12,
  ),
  WashToggleSize.lg: WashToggleMetrics(
    width: 47,
    height: 28,
    padding: 3.5,
    border: 1,
    knob: 21,
    icon: 14,
  ),
  WashToggleSize.xl: WashToggleMetrics(
    width: 54,
    height: 32,
    padding: 4,
    border: 1,
    knob: 24,
    icon: 16,
  ),
};

WashToggleMetrics washToggleMetricsFor(WashToggleSize size) =>
    kWashToggleMetrics[size]!;

Color washToggleToneColor(WashTokens tokens, WashToggleTone tone,
    {required bool checked}) {
  if (!checked) {
    return tokens.onSurface.withValues(alpha: 0.5);
  }
  final p = tokens.palette;
  switch (tone) {
    case WashToggleTone.defaultTone:
      return tokens.onSurface;
    case WashToggleTone.primary:
      return p.primary;
    case WashToggleTone.secondary:
      return p.secondary;
    case WashToggleTone.accent:
      return p.accent;
    case WashToggleTone.neutral:
      return p.neutral;
    case WashToggleTone.info:
      return p.info;
    case WashToggleTone.success:
      return p.success;
    case WashToggleTone.warning:
      return p.warning;
    case WashToggleTone.error:
      return p.error;
  }
}

/// Builds a daisyUI-style class hint (`toggle toggle-primary toggle-sm`, …).
String washToggleClassLabel({
  WashToggleTone tone = WashToggleTone.defaultTone,
  WashToggleSize size = WashToggleSize.md,
}) {
  final parts = <String>['toggle'];
  switch (tone) {
    case WashToggleTone.defaultTone:
      break;
    case WashToggleTone.primary:
      parts.add('toggle-primary');
      break;
    case WashToggleTone.secondary:
      parts.add('toggle-secondary');
      break;
    case WashToggleTone.accent:
      parts.add('toggle-accent');
      break;
    case WashToggleTone.neutral:
      parts.add('toggle-neutral');
      break;
    case WashToggleTone.info:
      parts.add('toggle-info');
      break;
    case WashToggleTone.success:
      parts.add('toggle-success');
      break;
    case WashToggleTone.warning:
      parts.add('toggle-warning');
      break;
    case WashToggleTone.error:
      parts.add('toggle-error');
      break;
  }
  if (size != WashToggleSize.md) {
    parts.add('toggle-${size.name}');
  }
  return parts.join(' ');
}

/// Gallery monospace class hint (TogglePage ClassLabel).
class WashToggleClassLabel extends StatelessWidget {
  const WashToggleClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'toggle' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

/// daisyUI `toggle` switch (`role="switch"`).
class WashToggle extends StatelessWidget {
  const WashToggle({
    required this.value,
    required this.onChanged,
    this.label,
    this.tone = WashToggleTone.defaultTone,
    this.size = WashToggleSize.md,
    this.disabled = false,
    this.semanticLabel,
    this.offIcon,
    this.onIcon,
    super.key,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final String? label;
  final WashToggleTone tone;
  final WashToggleSize size;
  final bool disabled;
  final String? semanticLabel;

  /// First daisyUI icon child (visible when off), typically a check.
  final Widget? offIcon;

  /// Second daisyUI icon child (visible when on), typically an X.
  final Widget? onIcon;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = washToggleMetricsFor(size);
    final current = washToggleToneColor(tokens, tone, checked: value);
    final enabled = !disabled;

    final Widget knob = Container(
      width: metrics.knob,
      height: metrics.knob,
      decoration: BoxDecoration(
        color: disabled ? const Color(0x00000000) : current,
        shape: BoxShape.circle,
        border:
            disabled ? Border.all(color: current, width: metrics.border) : null,
      ),
      alignment: Alignment.center,
      child: _knobIcons(tokens, metrics),
    );

    Widget control = AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeOut,
      width: metrics.width,
      height: metrics.height,
      padding: EdgeInsets.all(metrics.padding),
      decoration: BoxDecoration(
        color: value ? tokens.surface : const Color(0x00000000),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: current, width: metrics.border),
      ),
      child: AnimatedAlign(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        alignment: value ? Alignment.centerRight : Alignment.centerLeft,
        child: knob,
      ),
    );

    if (disabled) {
      control = Opacity(opacity: 0.3, child: control);
    }

    Widget result = control;
    if (label != null) {
      final caption = Text(
        label!,
        style: WashTypography.label(tokens.onSurface).copyWith(
          fontSize: 13,
          fontWeight: FontWeight.w500,
        ),
      );
      result = Wrap(
        spacing: 12,
        runSpacing: 4,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          control,
          disabled ? Opacity(opacity: 0.6, child: caption) : caption,
        ],
      );
    }

    result = ExcludeSemantics(child: result);

    if (!enabled) {
      return Semantics(
        label: semanticLabel ?? label,
        enabled: false,
        toggled: value,
        child: MouseRegion(
          cursor: SystemMouseCursors.forbidden,
          child: result,
        ),
      );
    }

    return Semantics(
      label: semanticLabel ?? label,
      enabled: true,
      toggled: value,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => onChanged(!value),
          behavior: HitTestBehavior.opaque,
          child: result,
        ),
      ),
    );
  }

  Widget? _knobIcons(WashTokens tokens, WashToggleMetrics metrics) {
    if (offIcon == null && onIcon == null) return null;
    final color = tokens.surface;
    Widget wrap(Widget icon, bool visible) {
      return Opacity(
        opacity: visible ? 1 : 0,
        child: IconTheme.merge(
          data: IconThemeData(color: color, size: metrics.icon),
          child: SizedBox(
            width: metrics.icon,
            height: metrics.icon,
            child: FittedBox(child: icon),
          ),
        ),
      );
    }

    return Stack(
      alignment: Alignment.center,
      children: [
        if (offIcon != null) wrap(offIcon!, !value),
        if (onIcon != null) wrap(onIcon!, value),
      ],
    );
  }
}

/// daisyUI `label` row: toggle at start + `label-text`.
class WashToggleFieldLabel extends StatelessWidget {
  const WashToggleFieldLabel({
    required this.toggle,
    required this.caption,
    super.key,
  });

  final WashToggle toggle;
  final String caption;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final enabled = !toggle.disabled;
    return MouseRegion(
      cursor: enabled ? SystemMouseCursors.click : SystemMouseCursors.forbidden,
      child: GestureDetector(
        onTap: enabled ? () => toggle.onChanged(!toggle.value) : null,
        behavior: HitTestBehavior.opaque,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            ExcludeSemantics(child: toggle),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                caption,
                style: WashTypography.label(tokens.onSurface).copyWith(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
