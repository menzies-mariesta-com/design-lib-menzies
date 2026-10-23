import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Semantic daisyUI `radio-*` tones (matches button palette).
enum WashRadioVariant {
  defaultVariant,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

/// daisyUI `radio-xs` through `radio-xl`.
enum WashRadioSize { xs, sm, md, lg, xl }

class _WashRadioMetrics {
  const _WashRadioMetrics({
    required this.outer,
    required this.border,
    required this.inner,
  });

  final double outer;
  final double border;
  final double inner;
}

const _kWashRadioMetrics = <WashRadioSize, _WashRadioMetrics>{
  WashRadioSize.xs: _WashRadioMetrics(outer: 16, border: 1.5, inner: 8),
  WashRadioSize.sm: _WashRadioMetrics(outer: 18, border: 2, inner: 9),
  WashRadioSize.md: _WashRadioMetrics(outer: 20, border: 2, inner: 10),
  WashRadioSize.lg: _WashRadioMetrics(outer: 24, border: 2, inner: 12),
  WashRadioSize.xl: _WashRadioMetrics(outer: 28, border: 2, inner: 14),
};

/// daisyUI circular `radio` control.
class WashRadio<T> extends StatelessWidget {
  const WashRadio({
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.variant = WashRadioVariant.defaultVariant,
    this.size = WashRadioSize.md,
    this.disabled = false,
    this.semanticLabel,
    super.key,
  });

  final T value;
  final T? groupValue;
  final ValueChanged<T?>? onChanged;
  final WashRadioVariant variant;
  final WashRadioSize size;
  final bool disabled;
  final String? semanticLabel;

  bool get _selected => value == groupValue;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _kWashRadioMetrics[size]!;
    final ring = _ringColor(tokens, variant, _selected);
    final dot = _selected ? ring : null;
    final enabled = !disabled && onChanged != null;

    Widget control = Container(
      width: metrics.outer,
      height: metrics.outer,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: disabled && !_selected
              ? tokens.inkBorder.withValues(alpha: 0.5)
              : ring,
          width: metrics.border,
        ),
      ),
      child: dot == null
          ? null
          : Center(
              child: Container(
                width: metrics.inner,
                height: metrics.inner,
                decoration: BoxDecoration(
                  color: disabled ? ring.withValues(alpha: 0.45) : ring,
                  shape: BoxShape.circle,
                ),
              ),
            ),
    );

    control = Semantics(
      label: semanticLabel,
      checked: _selected,
      enabled: enabled,
      inMutuallyExclusiveGroup: true,
      child: control,
    );

    if (!enabled) {
      return MouseRegion(
        cursor: SystemMouseCursors.forbidden,
        child: control,
      );
    }

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => onChanged?.call(value),
        behavior: HitTestBehavior.opaque,
        child: control,
      ),
    );
  }

  static Color _ringColor(
      WashTokens tokens, WashRadioVariant variant, bool selected) {
    if (!selected) return tokens.inkBorder;
    final p = tokens.palette;
    switch (variant) {
      case WashRadioVariant.defaultVariant:
        return tokens.onSurface;
      case WashRadioVariant.neutral:
        return p.neutral;
      case WashRadioVariant.primary:
        return p.primary;
      case WashRadioVariant.secondary:
        return p.secondary;
      case WashRadioVariant.accent:
        return p.accent;
      case WashRadioVariant.info:
        return p.info;
      case WashRadioVariant.success:
        return p.success;
      case WashRadioVariant.warning:
        return p.warning;
      case WashRadioVariant.error:
        return p.error;
    }
  }
}

/// Monospace class hint for gallery (`radio radio-primary`, etc.).
String washRadioClassLabel({
  WashRadioVariant variant = WashRadioVariant.defaultVariant,
  WashRadioSize size = WashRadioSize.md,
}) {
  final parts = <String>['radio'];
  switch (variant) {
    case WashRadioVariant.defaultVariant:
      break;
    case WashRadioVariant.neutral:
      parts.add('radio-neutral');
      break;
    case WashRadioVariant.primary:
      parts.add('radio-primary');
      break;
    case WashRadioVariant.secondary:
      parts.add('radio-secondary');
      break;
    case WashRadioVariant.accent:
      parts.add('radio-accent');
      break;
    case WashRadioVariant.info:
      parts.add('radio-info');
      break;
    case WashRadioVariant.success:
      parts.add('radio-success');
      break;
    case WashRadioVariant.warning:
      parts.add('radio-warning');
      break;
    case WashRadioVariant.error:
      parts.add('radio-error');
      break;
  }
  if (size != WashRadioSize.md) {
    parts.add('radio-${size.name}');
  }
  return parts.join(' ');
}

class WashRadioClassLabel extends StatelessWidget {
  const WashRadioClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'radio' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

/// `label` row with gap-2 style caption beside a [WashRadio].
class WashRadioLabeled<T> extends StatelessWidget {
  const WashRadioLabeled({
    required this.radio,
    required this.label,
    this.onTap,
    this.dimmed = false,
    this.dense = false,
    super.key,
  });

  final WashRadio<T> radio;
  final String label;
  final VoidCallback? onTap;
  final bool dimmed;
  final bool dense;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final style = WashTypography.label(tokens.onSurface).copyWith(
      fontSize: 13,
      fontWeight: dense ? FontWeight.w500 : FontWeight.w400,
    );
    final gap = dense ? 12.0 : 8.0;
    final child = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        radio,
        SizedBox(width: gap),
        Flexible(
          child: Text(
            label,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: style,
          ),
        ),
      ],
    );
    final wrapped = dimmed ? Opacity(opacity: 0.7, child: child) : child;
    final enabled = !radio.disabled && radio.onChanged != null;
    final semanticsLabel = radio.semanticLabel ?? label;

    Widget withRowSemantics(Widget interactive) {
      if (!enabled && onTap == null) return wrapped;
      return Semantics(
        label: semanticsLabel,
        checked: radio.value == radio.groupValue,
        enabled: enabled || onTap != null,
        inMutuallyExclusiveGroup: true,
        child: ExcludeSemantics(child: interactive),
      );
    }

    if (onTap == null && !radio.disabled) {
      return withRowSemantics(
        MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () => radio.onChanged?.call(radio.value),
            behavior: HitTestBehavior.opaque,
            child: wrapped,
          ),
        ),
      );
    }
    if (onTap != null) {
      return withRowSemantics(
        MouseRegion(
          cursor: radio.disabled
              ? SystemMouseCursors.forbidden
              : SystemMouseCursors.click,
          child: GestureDetector(
            onTap: onTap,
            behavior: HitTestBehavior.opaque,
            child: wrapped,
          ),
        ),
      );
    }
    return wrapped;
  }
}

/// daisyUI `label` row: radio at start + `label-text`.
class WashRadioFieldLabel<T> extends StatelessWidget {
  const WashRadioFieldLabel({
    required this.radio,
    required this.caption,
    super.key,
  });

  final WashRadio<T> radio;
  final String caption;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: radio.disabled
          ? SystemMouseCursors.forbidden
          : SystemMouseCursors.click,
      child: GestureDetector(
        onTap: radio.disabled ? null : () => radio.onChanged?.call(radio.value),
        behavior: HitTestBehavior.opaque,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            radio,
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                caption,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
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
