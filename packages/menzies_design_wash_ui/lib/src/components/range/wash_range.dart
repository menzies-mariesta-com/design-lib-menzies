import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../progress/wash_progress.dart';

/// daisyUI `range-*` size modifiers (`range-xs` … `range-xl`).
enum WashRangeSize { xs, sm, md, lg, xl }

class _WashRangeMetrics {
  const _WashRangeMetrics({
    required this.trackHeight,
    required this.thumbSize,
    required this.hitHeight,
  });

  final double trackHeight;
  final double thumbSize;
  final double hitHeight;
}

const _kRangeMetrics = <WashRangeSize, _WashRangeMetrics>{
  WashRangeSize.xs: _WashRangeMetrics(trackHeight: 2, thumbSize: 12, hitHeight: 28),
  WashRangeSize.sm: _WashRangeMetrics(trackHeight: 3, thumbSize: 14, hitHeight: 30),
  WashRangeSize.md: _WashRangeMetrics(trackHeight: 4, thumbSize: 16, hitHeight: 32),
  WashRangeSize.lg: _WashRangeMetrics(trackHeight: 5, thumbSize: 20, hitHeight: 36),
  WashRangeSize.xl: _WashRangeMetrics(trackHeight: 6, thumbSize: 24, hitHeight: 40),
};

/// Builds a daisyUI-style class hint (`range range-primary range-sm`, …).
String washRangeClassLabel({
  WashProgressTone? tone,
  WashRangeSize size = WashRangeSize.md,
  bool vertical = false,
}) {
  final parts = <String>['range'];
  if (tone != null) {
    parts.add('range-${tone.name}');
  }
  if (vertical) parts.add('range-vertical');
  if (size != WashRangeSize.md) {
    parts.add('range-${size.name}');
  }
  return parts.join(' ');
}

/// Gallery monospace class hint (RangePage ClassLabel).
class WashRangeClassLabel extends StatelessWidget {
  const WashRangeClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'range' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
          fontFeatures: const [FontFeature.tabularFigures()],
        ),
      ),
    );
  }
}

/// daisyUI horizontal or vertical `range` input.
class WashRange extends StatelessWidget {
  const WashRange({
    required this.value,
    required this.onChanged,
    this.min = 0,
    this.max = 100,
    this.step,
    this.tone,
    this.size = WashRangeSize.md,
    this.vertical = false,
    this.verticalExtent = 144,
    this.semanticLabel,
    super.key,
  }) : assert(max > min);

  final double value;
  final ValueChanged<double>? onChanged;
  final double min;
  final double max;
  final double? step;
  final WashProgressTone? tone;
  final WashRangeSize size;
  final bool vertical;
  final double verticalExtent;
  final String? semanticLabel;

  double _snap(double raw) {
    final clamped = raw.clamp(min, max);
    if (step == null || step! <= 0) return clamped;
    final steps = ((clamped - min) / step!).round();
    return (min + steps * step!).clamp(min, max);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = washProgressToneColor(tokens, tone ?? WashProgressTone.primary);
    final metrics = _kRangeMetrics[size]!;
    final enabled = onChanged != null;

    Widget slider(double width) {
      return _WashRangeTrack(
        value: _snap(value),
        min: min,
        max: max,
        width: width,
        metrics: metrics,
        fillColor: fill,
        trackColor: tokens.surfaceContainer,
        enabled: enabled,
        onChanged: onChanged == null ? null : (v) => onChanged!(_snap(v)),
        semanticLabel: semanticLabel,
      );
    }

    if (vertical) {
      return SizedBox(
        height: verticalExtent,
        width: metrics.hitHeight,
        child: RotatedBox(
          quarterTurns: 3,
          child: SizedBox(
            width: verticalExtent,
            child: slider(verticalExtent),
          ),
        ),
      );
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 280.0;
        return slider(w);
      },
    );
  }
}

class _WashRangeTrack extends StatelessWidget {
  const _WashRangeTrack({
    required this.value,
    required this.min,
    required this.max,
    required this.width,
    required this.metrics,
    required this.fillColor,
    required this.trackColor,
    required this.enabled,
    this.onChanged,
    this.semanticLabel,
  });

  final double value;
  final double min;
  final double max;
  final double width;
  final _WashRangeMetrics metrics;
  final Color fillColor;
  final Color trackColor;
  final bool enabled;
  final ValueChanged<double>? onChanged;
  final String? semanticLabel;

  double _fraction(double v) => ((v - min) / (max - min)).clamp(0.0, 1.0);

  void _update(double localX) {
    if (onChanged == null || width <= 0) return;
    final t = (localX / width).clamp(0.0, 1.0);
    onChanged!(min + t * (max - min));
  }

  @override
  Widget build(BuildContext context) {
    final t = _fraction(value);
    final thumb = metrics.thumbSize;
    final thumbLeft =
        (width * t - thumb / 2).clamp(0.0, math.max(0.0, width - thumb)).toDouble();

    return Semantics(
      slider: true,
      enabled: enabled,
      label: semanticLabel,
      value: '${value.round()}',
      increasedValue: '${(value + (max - min) * 0.05).clamp(min, max).round()}',
      decreasedValue: '${(value - (max - min) * 0.05).clamp(min, max).round()}',
      onIncrease: enabled ? () => onChanged!(value + (max - min) * 0.05) : null,
      onDecrease: enabled ? () => onChanged!(value - (max - min) * 0.05) : null,
      child: MouseRegion(
        cursor: enabled ? SystemMouseCursors.click : SystemMouseCursors.forbidden,
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onHorizontalDragUpdate: enabled
              ? (d) => _update(d.localPosition.dx)
              : null,
          onTapDown: enabled ? (d) => _update(d.localPosition.dx) : null,
          child: SizedBox(
            height: metrics.hitHeight,
            width: width,
            child: Stack(
              alignment: Alignment.centerLeft,
              clipBehavior: Clip.none,
              children: [
                Container(
                  height: metrics.trackHeight,
                  width: width,
                  decoration: BoxDecoration(
                    color: trackColor,
                    borderRadius: BorderRadius.circular(metrics.trackHeight),
                  ),
                ),
                Container(
                  height: metrics.trackHeight,
                  width: width * t,
                  decoration: BoxDecoration(
                    color: fillColor,
                    borderRadius: BorderRadius.circular(metrics.trackHeight),
                  ),
                ),
                Positioned(
                  left: thumbLeft,
                  child: Container(
                    width: thumb,
                    height: thumb,
                    decoration: BoxDecoration(
                      color: fillColor,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: trackColor.withValues(alpha: 0.35),
                          blurRadius: 2,
                          offset: const Offset(0, 1),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
