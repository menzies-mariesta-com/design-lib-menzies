import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `progress-*` semantic colors.
enum WashProgressTone {
  /// Default `progress` (neutral track fill from primary).
  primary,
  secondary,
  accent,
  neutral,
  info,
  success,
  warning,
  error,
}

Color washProgressToneColor(WashTokens tokens, WashProgressTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashProgressTone.primary => p.primary,
    WashProgressTone.secondary => p.secondary,
    WashProgressTone.accent => p.accent,
    WashProgressTone.neutral => p.neutral,
    WashProgressTone.info => p.info,
    WashProgressTone.success => p.success,
    WashProgressTone.warning => p.warning,
    WashProgressTone.error => p.error,
  };
}

Color washProgressToneContent(WashTokens tokens, WashProgressTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashProgressTone.primary => p.primaryContent,
    WashProgressTone.secondary => p.secondaryContent,
    WashProgressTone.accent => p.accentContent,
    WashProgressTone.neutral => p.neutralContent,
    WashProgressTone.info => p.infoContent,
    WashProgressTone.success => p.successContent,
    WashProgressTone.warning => p.warningContent,
    WashProgressTone.error => p.errorContent,
  };
}

/// daisyUI linear `progress` bar. [value] null = indeterminate.
///
/// Values use the same units as [max] (default 100), matching web
/// `<progress value="70" max="100">`.
class WashProgress extends StatelessWidget {
  const WashProgress({
    this.value,
    this.max = 100,
    this.tone = WashProgressTone.primary,
    this.width,
    this.height = 8,
    this.wash = true,
    this.semanticLabel,
    super.key,
  }) : assert(max > 0);

  /// Progress amount, or null for indeterminate animation.
  final double? value;
  final double max;
  final WashProgressTone tone;

  /// Fixed width; null stretches to parent (like `w-full`).
  final double? width;
  final double height;

  /// Soft paper track + gradient fill (`progress-wash`).
  final bool wash;
  final String? semanticLabel;

  double? get _fraction {
    final v = value;
    if (v == null) return null;
    return (v / max).clamp(0.0, 1.0);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = washProgressToneColor(tokens, tone);
    final track = wash
        ? Color.alphaBlend(
            tokens.palette.base300.withValues(alpha: 0.8),
            tokens.palette.base100,
          )
        : tokens.palette.base200;
    final label = semanticLabel ??
        (value == null
            ? 'Indeterminate progress'
            : 'Progress ${value!.round()} percent');

    final bar = Semantics(
      label: label,
      value: value == null ? null : '${value!.round()}%',
      child: SizedBox(
        width: width ?? double.infinity,
        height: height,
        child: value == null
            ? _IndeterminateBar(
                track: track,
                fill: fill,
                wash: wash,
                height: height,
              )
            : CustomPaint(
                painter: _DeterminateBarPainter(
                  fraction: _fraction!,
                  track: track,
                  fill: fill,
                  wash: wash,
                ),
              ),
      ),
    );

    if (width != null) {
      return Align(alignment: Alignment.centerLeft, child: bar);
    }
    return bar;
  }
}

class _DeterminateBarPainter extends CustomPainter {
  _DeterminateBarPainter({
    required this.fraction,
    required this.track,
    required this.fill,
    required this.wash,
  });

  final double fraction;
  final Color track;
  final Color fill;
  final bool wash;

  @override
  void paint(Canvas canvas, Size size) {
    final r = Radius.circular(size.height / 2);
    final rect = Offset.zero & size;
    canvas.drawRRect(RRect.fromRectAndRadius(rect, r), Paint()..color = track);
    if (fraction <= 0) return;
    final fillW = math.max(size.height, size.width * fraction);
    final fillRect =
        Rect.fromLTWH(0, 0, fillW.clamp(0, size.width), size.height);
    final paint = Paint();
    if (wash) {
      paint.shader = LinearGradient(
        colors: [
          Color.lerp(fill, const Color(0xFFFFFFFF), 0.3)!,
          fill,
        ],
      ).createShader(fillRect);
    } else {
      paint.color = fill;
    }
    canvas.drawRRect(RRect.fromRectAndRadius(fillRect, r), paint);
  }

  @override
  bool shouldRepaint(covariant _DeterminateBarPainter old) =>
      old.fraction != fraction ||
      old.track != track ||
      old.fill != fill ||
      old.wash != wash;
}

class _IndeterminateBar extends StatefulWidget {
  const _IndeterminateBar({
    required this.track,
    required this.fill,
    required this.wash,
    required this.height,
  });

  final Color track;
  final Color fill;
  final bool wash;
  final double height;

  @override
  State<_IndeterminateBar> createState() => _IndeterminateBarState();
}

class _IndeterminateBarState extends State<_IndeterminateBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final reduced = WashReducedMotion.of(context);
    if (reduced) {
      _controller.stop();
      _controller.value = 0.35;
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          painter: _IndeterminateBarPainter(
            t: _controller.value,
            track: widget.track,
            fill: widget.fill,
            wash: widget.wash,
          ),
        );
      },
    );
  }
}

class _IndeterminateBarPainter extends CustomPainter {
  _IndeterminateBarPainter({
    required this.t,
    required this.track,
    required this.fill,
    required this.wash,
  });

  final double t;
  final Color track;
  final Color fill;
  final bool wash;

  @override
  void paint(Canvas canvas, Size size) {
    final r = Radius.circular(size.height / 2);
    canvas.drawRRect(
      RRect.fromRectAndRadius(Offset.zero & size, r),
      Paint()..color = track,
    );
    final chunk = size.width * 0.35;
    final travel = size.width + chunk;
    final x = t * travel - chunk;
    final fillRect = Rect.fromLTWH(x, 0, chunk, size.height);
    final paint = Paint();
    if (wash) {
      paint.shader = LinearGradient(
        colors: [
          fill.withValues(alpha: 0.2),
          fill,
          fill.withValues(alpha: 0.2),
        ],
      ).createShader(fillRect);
    } else {
      paint.color = fill;
    }
    canvas.save();
    canvas.clipRRect(RRect.fromRectAndRadius(Offset.zero & size, r));
    canvas.drawRRect(RRect.fromRectAndRadius(fillRect, r), paint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _IndeterminateBarPainter old) =>
      old.t != t || old.track != track || old.fill != fill || old.wash != wash;
}

/// daisyUI default `--size` (5rem at 16px root).
const double kWashRadialProgressDefaultSize = 80;

/// daisyUI `radial-progress` ring. [value] is 0–[max] (default 100).
class WashRadialProgress extends StatelessWidget {
  const WashRadialProgress({
    required this.value,
    this.max = 100,
    this.tone = WashProgressTone.primary,
    this.size = kWashRadialProgressDefaultSize,
    this.thickness,
    this.filled = false,
    this.borderWidth = 4,
    this.showLabel = true,
    this.labelFontSize,
    this.child,
    this.semanticLabel,
    super.key,
  }) : assert(max > 0);

  final double value;
  final double max;
  final WashProgressTone tone;

  /// Outer diameter in logical pixels (web `--size`, default 5rem / 80).
  final double size;

  /// Ring stroke width; defaults to 10% of [size] (daisyUI `--thickness`).
  final double? thickness;

  /// `bg-* text-*-content border-*` filled chrome.
  final bool filled;

  /// Border width when [filled] (web `border-4`).
  final double borderWidth;
  final bool showLabel;

  /// Override center label font size (otherwise scales with [size]).
  final double? labelFontSize;

  /// Custom center content; when null and [showLabel], shows `{value}%`.
  final Widget? child;
  final String? semanticLabel;

  double get _fraction => (value / max).clamp(0.0, 1.0);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = washProgressToneColor(tokens, tone);
    final content = washProgressToneContent(tokens, tone);
    final stroke = thickness ?? size * 0.1;
    final pct = value.round();
    final label = semanticLabel ?? '$pct%';
    final fg = filled ? content : color;
    final center = child ??
        (showLabel
            ? Text(
                '$pct%',
                style: WashTypography.label(fg).copyWith(
                  fontSize: labelFontSize ?? size * 0.22,
                  fontWeight: FontWeight.w600,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              )
            : null);

    final paintSize = filled ? size - borderWidth * 2 : size;
    final ring = CustomPaint(
      size: Size.square(paintSize),
      painter: _RadialProgressPainter(
        fraction: _fraction,
        color: fg,
        track: fg.withValues(alpha: filled ? 0.25 : 0.15),
        thickness: stroke,
      ),
      child: center == null ? null : Center(child: center),
    );

    final body = filled
        ? Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
              border: Border.all(color: color, width: borderWidth),
            ),
            alignment: Alignment.center,
            child: ring,
          )
        : SizedBox(width: size, height: size, child: ring);

    return Semantics(
      label: label,
      value: '$pct%',
      child: body,
    );
  }
}

class _RadialProgressPainter extends CustomPainter {
  _RadialProgressPainter({
    required this.fraction,
    required this.color,
    required this.track,
    required this.thickness,
  });

  final double fraction;
  final Color color;
  final Color track;
  final double thickness;

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final radius = size.shortestSide / 2 - thickness / 2;
    final trackPaint = Paint()
      ..color = track
      ..style = PaintingStyle.stroke
      ..strokeWidth = thickness
      ..strokeCap = StrokeCap.butt;
    canvas.drawCircle(center, radius, trackPaint);
    if (fraction <= 0) return;
    final arc = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = thickness
      ..strokeCap = StrokeCap.butt;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      fraction * 2 * math.pi,
      false,
      arc,
    );
  }

  @override
  bool shouldRepaint(covariant _RadialProgressPainter old) =>
      old.fraction != fraction ||
      old.color != color ||
      old.track != track ||
      old.thickness != thickness;
}
