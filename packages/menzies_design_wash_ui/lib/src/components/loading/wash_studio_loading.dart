import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Favicon-style pigment mark (wash circles).
class WashPigmentMark extends StatefulWidget {
  const WashPigmentMark({this.size = 48, super.key});

  final double size;

  @override
  State<WashPigmentMark> createState() => _WashPigmentMarkState();
}

class _WashPigmentMarkState extends State<WashPigmentMark>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _syncMotion();
  }

  void _syncMotion() {
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
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
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final t = _controller.value;
        final pulse = 1 + 0.06 * math.sin(t * math.pi * 2);
        return Transform.scale(
          scale: pulse,
          child: CustomPaint(
            size: Size.square(widget.size),
            painter: _PigmentMarkPainter(
              primary: tokens.palette.primary,
              secondary: tokens.palette.secondary,
              accent: tokens.palette.accent,
              t: t,
            ),
          ),
        );
      },
    );
  }
}

class _PigmentMarkPainter extends CustomPainter {
  _PigmentMarkPainter({
    required this.primary,
    required this.secondary,
    required this.accent,
    required this.t,
  });

  final Color primary;
  final Color secondary;
  final Color accent;
  final double t;

  double _bloom(double phase) {
    final u = (t + phase) % 1.0;
    final wave = 0.5 - 0.5 * math.cos(u * math.pi * 2);
    return 0.92 + 0.2 * wave;
  }

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.shortestSide / 32;
    void circle(Offset c, double r, Color color, double opacity, double scale) {
      canvas.drawCircle(
        Offset(c.dx * s, c.dy * s),
        r * s * scale,
        Paint()..color = color.withValues(alpha: opacity),
      );
    }

    circle(const Offset(14, 16), 10, primary, 0.4, _bloom(0));
    circle(const Offset(20, 14), 8, secondary, 0.32, _bloom(0.08));
    circle(const Offset(16, 20), 7, accent, 0.28, _bloom(0.16));
    final tip = 0.88 + 0.2 * (0.5 + 0.5 * math.sin(t * math.pi * 2));
    circle(const Offset(12, 12), 3, primary, 0.7, tip);
  }

  @override
  bool shouldRepaint(covariant _PigmentMarkPainter oldDelegate) =>
      oldDelegate.t != t ||
      oldDelegate.primary != primary ||
      oldDelegate.secondary != secondary ||
      oldDelegate.accent != accent;
}

/// Sweeping stroke loader (`studio-load-stroke`).
class WashBrushStrokeLoader extends StatefulWidget {
  const WashBrushStrokeLoader({
    this.label = 'Brush stroke loading',
    this.decorative = false,
    this.height = 56,
    this.maxWidth = 320,
    super.key,
  });

  final String label;
  final bool decorative;
  final double height;
  final double maxWidth;

  @override
  State<WashBrushStrokeLoader> createState() => _WashBrushStrokeLoaderState();
}

class _WashBrushStrokeLoaderState extends State<WashBrushStrokeLoader>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1600),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
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
    final markH = math.max(8.0, 18 * 0.55);
    final child = AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final t = _controller.value;
        double scaleX;
        double opacity;
        if (t < 0.42) {
          final u = t / 0.42;
          scaleX = ui.lerpDouble(0.06, 1, Curves.easeOut.transform(u))!;
          opacity = ui.lerpDouble(0.2, 1, u)!;
        } else if (t < 0.58) {
          scaleX = 1;
          opacity = 1;
        } else {
          final u = (t - 0.58) / 0.42;
          scaleX = ui.lerpDouble(1, 0.06, Curves.easeIn.transform(u))!;
          opacity = ui.lerpDouble(1, 0.25, u)!;
        }
        final mid = Color.lerp(
          tokens.palette.primary,
          tokens.palette.secondary,
          0.35,
        )!;
        return Align(
          alignment: Alignment.centerLeft,
          child: Transform.scale(
            alignment: Alignment.centerLeft,
            scaleX: scaleX,
            scaleY: 1,
            child: Container(
              height: markH,
              width: double.infinity,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(markH * 0.4),
                gradient: LinearGradient(
                  colors: [
                    mid.withValues(alpha: 0),
                    mid.withValues(alpha: opacity * 0.95),
                    mid.withValues(alpha: opacity * 0.45),
                    mid.withValues(alpha: 0),
                  ],
                  stops: const [0, 0.08, 0.82, 1],
                ),
                boxShadow: [
                  BoxShadow(
                    color: tokens.palette.primary.withValues(alpha: 0.22),
                    blurRadius: 12,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );

    final box = SizedBox(
      height: widget.height,
      width: widget.maxWidth,
      child: OverflowBox(
        maxWidth: widget.maxWidth,
        child: child,
      ),
    );

    if (widget.decorative) return box;
    return Semantics(
      label: widget.label,
      liveRegion: true,
      child: box,
    );
  }
}

/// Soft tip blob that breathes (`studio-load-tip`).
class WashBrushTipLoader extends StatefulWidget {
  const WashBrushTipLoader({
    this.label = 'Brush tip loading',
    this.decorative = false,
    this.scale = 1,
    super.key,
  });

  final String label;
  final bool decorative;
  final double scale;

  @override
  State<WashBrushTipLoader> createState() => _WashBrushTipLoaderState();
}

class _WashBrushTipLoaderState extends State<WashBrushTipLoader>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
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
    const dim = 33.0;
    final color = Color.lerp(
      tokens.palette.primary,
      tokens.palette.secondary,
      0.22,
    )!;

    final blob = AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final wave = 0.5 - 0.5 * math.cos(_controller.value * math.pi * 2);
        final scale = 0.88 + 0.2 * wave;
        final opacity = 0.78 * (0.75 + 0.25 * wave);
        return Transform.scale(
          scale: scale,
          child: Container(
            width: dim,
            height: dim,
            decoration: BoxDecoration(
              color: color.withValues(alpha: opacity),
              borderRadius: BorderRadius.circular(dim * 0.4),
              boxShadow: [
                BoxShadow(
                  color: tokens.palette.primary.withValues(alpha: 0.35),
                  blurRadius: 16,
                ),
              ],
            ),
          ),
        );
      },
    );

    final child = Transform.scale(scale: widget.scale, child: blob);
    if (widget.decorative) return child;
    return Semantics(label: widget.label, liveRegion: true, child: child);
  }
}

/// Pigment droplet + wash bloom pulse (`studio-load-bloom`).
class WashPigmentBloomLoader extends StatefulWidget {
  const WashPigmentBloomLoader({
    this.label = 'Pigment bloom loading',
    this.decorative = false,
    this.size = 112,
    super.key,
  });

  final String label;
  final bool decorative;
  final double size;

  @override
  State<WashPigmentBloomLoader> createState() => _WashPigmentBloomLoaderState();
}

class _WashPigmentBloomLoaderState extends State<WashPigmentBloomLoader>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2600),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
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
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;

    final child = AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final t = _controller.value;
        double pulse(double phase) {
          final u = (t + phase) % 1.0;
          return 0.92 + 0.2 * (0.5 - 0.5 * math.cos(u * math.pi * 2));
        }

        double opacity(double phase) {
          final u = (t + phase) % 1.0;
          return 0.55 + 0.4 * (0.5 - 0.5 * math.cos(u * math.pi * 2));
        }

        final dropWave = 0.5 - 0.5 * math.cos(t * math.pi * 2);
        final dropY = ui.lerpDouble(-0.18, 0.18, dropWave)!;
        final dropScale = ui.lerpDouble(0.85, 1.05, dropWave)!;

        return Container(
          width: widget.size,
          height: widget.size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Color.alphaBlend(
              tokens.palette.base200.withValues(alpha: 0.75),
              tokens.surface,
            ),
            border: Border.all(
              color: tokens.onSurface.withValues(alpha: 0.12),
            ),
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            children: [
              Positioned(
                top: widget.size * 0.08,
                left: widget.size * 0.06,
                child: Transform.scale(
                  scale: pulse(0),
                  child: _BloomPool(
                    size: Size(widget.size * 0.58, widget.size * 0.62),
                    color: atmo.washA.withValues(alpha: opacity(0)),
                  ),
                ),
              ),
              Positioned(
                top: widget.size * 0.18,
                right: widget.size * 0.04,
                child: Transform.scale(
                  scale: pulse(0.12),
                  child: _BloomPool(
                    size: Size(widget.size * 0.52, widget.size * 0.55),
                    color: atmo.washB.withValues(alpha: opacity(0.12)),
                  ),
                ),
              ),
              Positioned(
                left: widget.size * 0.22,
                bottom: widget.size * 0.06,
                child: Transform.scale(
                  scale: pulse(0.2),
                  child: _BloomPool(
                    size: Size(widget.size * 0.48, widget.size * 0.5),
                    color: atmo.washC.withValues(alpha: opacity(0.2)),
                  ),
                ),
              ),
              Align(
                alignment: Alignment(0, -0.2 + dropY),
                child: Transform.scale(
                  scale: dropScale,
                  child: Container(
                    width: 17,
                    height: 22,
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(12),
                        bottom: Radius.circular(16),
                      ),
                      color: Color.lerp(
                        tokens.palette.primary,
                        tokens.palette.secondary,
                        0.35,
                      )!
                          .withValues(alpha: 0.75 + 0.2 * dropWave),
                      boxShadow: [
                        BoxShadow(
                          color: tokens.palette.primary.withValues(alpha: 0.25),
                          blurRadius: 4,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );

    if (widget.decorative) return child;
    return Semantics(label: widget.label, liveRegion: true, child: child);
  }
}

class _BloomPool extends StatelessWidget {
  const _BloomPool({required this.size, required this.color});

  final Size size;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return ImageFiltered(
      imageFilter: ui.ImageFilter.blur(sigmaX: 10, sigmaY: 10),
      child: Container(
        width: size.width,
        height: size.height,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(
            colors: [color, color.withValues(alpha: 0)],
          ),
        ),
      ),
    );
  }
}

/// Wordmark ink-fill soak with pigment mark (`studio-load-ink`).
class WashInkWordmarkLoader extends StatefulWidget {
  const WashInkWordmarkLoader({
    this.label = 'Menzies Design logo loading',
    this.decorative = false,
    this.wordmark = 'Menzies Design',
    super.key,
  });

  final String label;
  final bool decorative;
  final String wordmark;

  @override
  State<WashInkWordmarkLoader> createState() => _WashInkWordmarkLoaderState();
}

class _WashInkWordmarkLoaderState extends State<WashInkWordmarkLoader>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3200),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
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
    final ink = Color.lerp(
      tokens.palette.primary,
      tokens.palette.secondary,
      0.15,
    )!;
    final muted = tokens.onSurface.withValues(alpha: 0.34);

    final column = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const WashPigmentMark(size: 56),
        const SizedBox(height: 12),
        AnimatedBuilder(
          animation: _controller,
          builder: (context, _) {
            final t = _controller.value;
            double fill;
            if (t < 0.45) {
              fill = Curves.easeOut.transform(t / 0.45);
            } else if (t < 0.55) {
              fill = 1;
            } else {
              fill = 1 - Curves.easeIn.transform((t - 0.55) / 0.45);
            }
            return ShaderMask(
              blendMode: BlendMode.srcIn,
              shaderCallback: (bounds) {
                return LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [ink, ink, muted, muted],
                  stops: [
                    0,
                    fill.clamp(0.0, 1.0),
                    fill.clamp(0.0, 1.0),
                    1,
                  ],
                ).createShader(bounds);
              },
              child: Text(
                widget.wordmark,
                textAlign: TextAlign.center,
                style: WashTypography.displayLarge(const Color(0xFFFFFFFF))
                    .copyWith(
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.4,
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 8),
        Text(
          'Ink soaking in',
          style: WashTypography.label(tokens.inkMuted),
        ),
      ],
    );

    if (widget.decorative) return column;
    return Semantics(label: widget.label, liveRegion: true, child: column);
  }
}
