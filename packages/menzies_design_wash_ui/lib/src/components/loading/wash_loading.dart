import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `loading-*` animation styles.
enum WashLoadingVariant { spinner, dots, ring, ball, bars, infinity }

/// daisyUI `loading-xs` … `loading-xl` (px from `--size-selector` * 4…8).
enum WashLoadingSize { xs, sm, md, lg, xl }

/// Semantic `text-*` color for loaders.
enum WashLoadingTone {
  primary,
  secondary,
  accent,
  neutral,
  info,
  success,
  warning,
  error,
}

double washLoadingSizePx(WashLoadingSize size) {
  // daisyUI: width = calc(var(--size-selector, .25rem) * N) ≈ 4px * N
  return switch (size) {
    WashLoadingSize.xs => 16,
    WashLoadingSize.sm => 20,
    WashLoadingSize.md => 24,
    WashLoadingSize.lg => 28,
    WashLoadingSize.xl => 32,
  };
}

Color washLoadingToneColor(WashTokens tokens, WashLoadingTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashLoadingTone.primary => p.primary,
    WashLoadingTone.secondary => p.secondary,
    WashLoadingTone.accent => p.accent,
    WashLoadingTone.neutral => p.neutral,
    WashLoadingTone.info => p.info,
    WashLoadingTone.success => p.success,
    WashLoadingTone.warning => p.warning,
    WashLoadingTone.error => p.error,
  };
}

/// daisyUI `loading` indicator (spinner / dots / ring / ball / bars / infinity).
class WashLoading extends StatefulWidget {
  const WashLoading({
    this.label = 'Loading',
    this.variant = WashLoadingVariant.spinner,
    this.size = WashLoadingSize.md,
    this.tone = WashLoadingTone.primary,
    this.color,
    this.decorative = false,
    super.key,
  });

  final String? label;
  final WashLoadingVariant variant;
  final WashLoadingSize size;
  final WashLoadingTone tone;
  final Color? color;
  final bool decorative;

  @override
  State<WashLoading> createState() => _WashLoadingState();
}

class _WashLoadingState extends State<WashLoading>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
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
    final tokens = WashTokens.of(context);
    final color = widget.color ?? washLoadingToneColor(tokens, widget.tone);
    final side = washLoadingSizePx(widget.size);
    final label = widget.label;

    final indicator = AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          size: Size(side, side),
          painter: _LoadingPainter(
            variant: widget.variant,
            color: color,
            t: _controller.value,
          ),
        );
      },
    );

    if (widget.decorative) {
      return indicator;
    }

    return Semantics(
      label: label ?? 'Loading',
      liveRegion: true,
      child: indicator,
    );
  }
}

class _LoadingPainter extends CustomPainter {
  _LoadingPainter({
    required this.variant,
    required this.color,
    required this.t,
  });

  final WashLoadingVariant variant;
  final Color color;
  final double t;

  @override
  void paint(Canvas canvas, Size size) {
    switch (variant) {
      case WashLoadingVariant.spinner:
        _paintSpinner(canvas, size);
      case WashLoadingVariant.dots:
        _paintDots(canvas, size);
      case WashLoadingVariant.ring:
        _paintRing(canvas, size);
      case WashLoadingVariant.ball:
        _paintBall(canvas, size);
      case WashLoadingVariant.bars:
        _paintBars(canvas, size);
      case WashLoadingVariant.infinity:
        _paintInfinity(canvas, size);
    }
  }

  void _paintSpinner(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.shortestSide * 0.12
      ..strokeCap = StrokeCap.round;
    final center = size.center(Offset.zero);
    final r = size.shortestSide / 2 - paint.strokeWidth;
    final rot =
        t * math.pi * 2 * (8 / 2.4); // ~8s full spin compressed into loop
    final dash = 0.15 + 0.35 * (0.5 - (t - 0.5).abs()) * 2;
    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.rotate(rot);
    canvas.drawArc(
      Rect.fromCircle(center: Offset.zero, radius: r),
      -math.pi / 2,
      math.pi * 2 * dash,
      false,
      paint,
    );
    canvas.restore();
  }

  void _paintDots(Canvas canvas, Size size) {
    final paint = Paint()..color = color;
    final r = size.shortestSide * 0.12;
    final cy = size.height / 2;
    final xs = [size.width * 0.2, size.width * 0.5, size.width * 0.8];
    for (var i = 0; i < 3; i++) {
      final phase = (t + i * 0.08) % 1.0;
      final bounce = phase < 0.286
          ? Curves.easeOut.transform(phase / 0.286)
          : phase < 0.571
              ? 1 - Curves.easeIn.transform((phase - 0.286) / 0.285)
              : 0.0;
      final y = cy - bounce * size.height * 0.28;
      canvas.drawCircle(Offset(xs[i], y), r, paint);
    }
  }

  void _paintRing(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final maxR = size.shortestSide / 2 - 1;
    for (var i = 0; i < 3; i++) {
      final phase = (t + i / 3) % 1.0;
      final r = 1 + (maxR - 1) * Curves.easeOut.transform(phase);
      final opacity = (1 - phase).clamp(0.0, 1.0);
      final paint = Paint()
        ..color = color.withValues(alpha: opacity)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2;
      canvas.drawCircle(center, r, paint);
    }
  }

  void _paintBall(Canvas canvas, Size size) {
    final paint = Paint()..color = color;
    final phase = t % 1.0;
    // Approximate bounce: top -> bottom -> top
    double cy;
    double rx = size.shortestSide * 0.16;
    double ry = rx;
    if (phase < 0.47) {
      final u = phase / 0.47;
      cy = size.height * (0.22 + 0.58 * Curves.easeIn.transform(u));
    } else if (phase < 0.53) {
      final u = (phase - 0.47) / 0.06;
      cy = size.height * 0.8;
      rx = size.shortestSide * (0.16 + 0.04 * math.sin(u * math.pi));
      ry = size.shortestSide * (0.16 - 0.04 * math.sin(u * math.pi));
    } else {
      final u = (phase - 0.53) / 0.47;
      cy = size.height * (0.8 - 0.58 * Curves.easeOut.transform(u));
    }
    canvas.drawOval(
      Rect.fromCenter(
        center: Offset(size.width / 2, cy),
        width: rx * 2,
        height: ry * 2,
      ),
      paint,
    );
  }

  void _paintBars(Canvas canvas, Size size) {
    final w = size.width / 5;
    final gaps = size.width / 12;
    for (var i = 0; i < 3; i++) {
      final phase = (t + i * 0.15) % 1.0;
      final shrink = phase < 0.5
          ? Curves.easeInOut.transform(phase * 2)
          : 1 - Curves.easeInOut.transform((phase - 0.5) * 2);
      final h = size.height * (0.55 + 0.4 * (1 - shrink));
      final top = (size.height - h) / 2;
      final opacity = 0.25 + 0.75 * (1 - shrink * 0.7);
      final paint = Paint()..color = color.withValues(alpha: opacity);
      final x = gaps + i * (w + gaps);
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(x, top, w, h),
          const Radius.circular(2),
        ),
        paint,
      );
    }
  }

  void _paintInfinity(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.shortestSide * 0.12
      ..strokeCap = StrokeCap.round;
    final path = Path();
    final cx = size.width / 2;
    final cy = size.height / 2;
    final a = size.width * 0.32;
    final b = size.height * 0.22;
    // Lemniscate of Bernoulli approximation
    for (var i = 0; i <= 64; i++) {
      final ang = i / 64 * math.pi * 2;
      final s = math.sin(ang);
      final denom = 1 + s * s;
      final x = cx + a * math.cos(ang) / denom;
      final y = cy + b * math.sin(ang) * math.cos(ang) / denom;
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    final metrics = path.computeMetrics().first;
    final len = metrics.length;
    final dash = len * 0.78;
    final start = (t * len) % len;
    final extract =
        metrics.extractPath(start, start + dash, startWithMoveTo: true);
    // Wrap remainder
    if (start + dash > len) {
      final wrap =
          metrics.extractPath(0, start + dash - len, startWithMoveTo: true);
      canvas.drawPath(extract, paint);
      canvas.drawPath(wrap, paint);
    } else {
      canvas.drawPath(extract, paint);
    }
  }

  @override
  bool shouldRepaint(covariant _LoadingPainter oldDelegate) =>
      oldDelegate.variant != variant ||
      oldDelegate.color != color ||
      oldDelegate.t != t;
}
