import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Tailwind min-width breakpoints (CSS px parity).
abstract final class WashTailwindBreakpoints {
  static const double sm = 640;
  static const double md = 768;
  static const double lg = 1024;
}

/// Width / height factors (Tailwind `aspect-*` parity).
class WashAspectRatioValue {
  const WashAspectRatioValue(this.width, this.height);

  final double width;
  final double height;

  double get value => width / height;

  static const square = WashAspectRatioValue(1, 1);
  static const video = WashAspectRatioValue(16, 9);
  static const classic = WashAspectRatioValue(4, 3);
  static const portrait = WashAspectRatioValue(3, 4);
  static const cinema = WashAspectRatioValue(21, 9);

  /// Gallery / docs class label (not used for layout).
  String get classLabel => switch (this) {
        square => 'aspect-square',
        video => 'aspect-video',
        classic => 'aspect-[4/3]',
        portrait => 'aspect-[3/4]',
        cinema => 'aspect-[21/9]',
        _ => 'aspect-[${width.toStringAsFixed(0)}/${height.toStringAsFixed(0)}]',
      };

  @override
  bool operator ==(Object other) =>
      other is WashAspectRatioValue && other.width == width && other.height == height;

  @override
  int get hashCode => Object.hash(width, height);
}

/// Mobile-first responsive aspect (e.g. `aspect-square md:aspect-video`).
class WashResponsiveAspectRatio {
  const WashResponsiveAspectRatio({
    required this.base,
    this.sm,
    this.md,
    this.lg,
  });

  final WashAspectRatioValue base;
  final WashAspectRatioValue? sm;
  final WashAspectRatioValue? md;
  final WashAspectRatioValue? lg;

  WashAspectRatioValue resolve(double viewportWidth) {
    if (viewportWidth >= WashTailwindBreakpoints.lg && lg != null) {
      return lg!;
    }
    if (viewportWidth >= WashTailwindBreakpoints.md && md != null) {
      return md!;
    }
    if (viewportWidth >= WashTailwindBreakpoints.sm && sm != null) {
      return sm!;
    }
    return base;
  }

  String get classLabel {
    final parts = <String>[base.classLabel];
    if (sm != null) parts.add('sm:${sm!.classLabel}');
    if (md != null) parts.add('md:${md!.classLabel}');
    if (lg != null) parts.add('lg:${lg!.classLabel}');
    return parts.join(' ');
  }
}

/// Constrains [child] to a width-based aspect ratio (daisyUI / Tailwind `aspect-*`).
class WashAspectRatio extends StatelessWidget {
  const WashAspectRatio({
    required this.child,
    this.ratio,
    this.responsive,
    this.animateDuration = Duration.zero,
    super.key,
  }) : assert(ratio != null || responsive != null);

  final Widget child;
  final WashAspectRatioValue? ratio;
  final WashResponsiveAspectRatio? responsive;
  final Duration animateDuration;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite ? constraints.maxWidth : MediaQuery.sizeOf(context).width;
        final active = responsive?.resolve(width) ?? ratio!;
        final aspect = active.value;

        if (animateDuration > Duration.zero) {
          return _AnimatedAspectRatio(
            aspectRatio: aspect,
            duration: animateDuration,
            child: child,
          );
        }
        return _AspectRatioLayout(aspectRatio: aspect, child: child);
      },
    );
  }
}

class _AspectRatioLayout extends StatelessWidget {
  const _AspectRatioLayout({required this.aspectRatio, required this.child});

  final double aspectRatio;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(aspectRatio: aspectRatio, child: child);
  }
}

class _AnimatedAspectRatio extends StatefulWidget {
  const _AnimatedAspectRatio({
    required this.aspectRatio,
    required this.duration,
    required this.child,
  });

  final double aspectRatio;
  final Duration duration;
  final Widget child;

  @override
  State<_AnimatedAspectRatio> createState() => _AnimatedAspectRatioState();
}

class _AnimatedAspectRatioState extends State<_AnimatedAspectRatio>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  double _from = 1;
  double _to = 1;

  @override
  void initState() {
    super.initState();
    _to = widget.aspectRatio;
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _animation = Tween<double>(begin: _from, end: _to).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    _controller.value = 1;
  }

  @override
  void didUpdateWidget(covariant _AnimatedAspectRatio oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.aspectRatio != widget.aspectRatio) {
      _from = _animation.value;
      _to = widget.aspectRatio;
      _animation = Tween<double>(begin: _from, end: _to).animate(
        CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
      );
      _controller
        ..duration = widget.duration
        ..forward(from: 0);
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
      animation: _animation,
      builder: (context, child) {
        return AspectRatio(aspectRatio: _animation.value, child: child);
      },
      child: widget.child,
    );
  }
}

/// Rounded frame with ink border and base wash fill (web `AspectFrame`).
class WashAspectFrame extends StatelessWidget {
  const WashAspectFrame({
    required this.child,
    this.ratio,
    this.responsive,
    this.maxWidth,
    this.backgroundColor,
    this.animateDuration = Duration.zero,
    super.key,
  }) : assert(ratio != null || responsive != null);

  final Widget child;
  final WashAspectRatioValue? ratio;
  final WashResponsiveAspectRatio? responsive;
  final double? maxWidth;
  final Color? backgroundColor;
  final Duration animateDuration;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = backgroundColor ?? tokens.surfaceContainer.withValues(alpha: 0.4);

    Widget frame = Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      clipBehavior: Clip.antiAlias,
      child: WashAspectRatio(
        ratio: ratio,
        responsive: responsive,
        animateDuration: animateDuration,
        child: child,
      ),
    );

    if (maxWidth != null) {
      frame = Align(
        alignment: Alignment.center,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: maxWidth!),
          child: frame,
        ),
      );
    }

    return frame;
  }
}

/// CSS wash plate (no remote image).
class WashAspectPlate extends StatelessWidget {
  const WashAspectPlate({
    required this.gradient,
    required this.label,
    this.caption,
    super.key,
  });

  final Gradient gradient;
  final String label;
  final String? caption;

  factory WashAspectPlate.preset({
    required WashAspectPlateTone tone,
    required String label,
    String? caption,
  }) {
    return WashAspectPlate(
      gradient: tone.gradient,
      label: label,
      caption: caption,
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Semantics(
      label: label,
      image: true,
      child: DecoratedBox(
        decoration: BoxDecoration(gradient: gradient),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Positioned.fill(
              child: IgnorePointer(
                child: CustomPaint(
                  painter: _WashPlateOverlayPainter(),
                ),
              ),
            ),
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      label,
                      textAlign: TextAlign.center,
                      style: WashTypography.title(tokens.onSurface).copyWith(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.2,
                      ),
                    ),
                    if (caption != null) ...[
                      const SizedBox(height: 4),
                      Text(
                        caption!.toUpperCase(),
                        textAlign: TextAlign.center,
                        style: WashTypography.label(tokens.onSurface.withValues(alpha: 0.55)).copyWith(
                          fontSize: 10,
                          letterSpacing: 2,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

enum WashAspectPlateTone {
  mineral,
  ochre,
  rose,
  sage,
  violet,
}

extension WashAspectPlateToneX on WashAspectPlateTone {
  Gradient get gradient => LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: switch (this) {
          WashAspectPlateTone.mineral => const [
              Color(0xFF7AA8B8),
              Color(0xFFB8DCE8),
              Color(0xFFEEF6F9),
            ],
          WashAspectPlateTone.ochre => const [
              Color(0xFFC4A06A),
              Color(0xFFE8D2A8),
              Color(0xFFF8F0E0),
            ],
          WashAspectPlateTone.rose => const [
              Color(0xFFB87870),
              Color(0xFFDCB0A8),
              Color(0xFFF4E4E0),
            ],
          WashAspectPlateTone.sage => const [
              Color(0xFF6A9E8A),
              Color(0xFFA8D4C4),
              Color(0xFFE8F4EF),
            ],
          WashAspectPlateTone.violet => const [
              Color(0xFF8A7AA8),
              Color(0xFFC4B8D8),
              Color(0xFFF0ECF6),
            ],
        },
      );
}

class _WashPlateOverlayPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..blendMode = BlendMode.softLight;
    paint.shader = RadialGradient(
      center: const Alignment(-0.4, -0.3),
      radius: 0.85,
      colors: [
        const Color(0xFFFFFFFF).withValues(alpha: 0.55),
        const Color(0xFFFFFFFF).withValues(alpha: 0),
      ],
    ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), paint);

    paint.shader = RadialGradient(
      center: const Alignment(0.44, 0.36),
      radius: 0.7,
      colors: [
        const Color(0xFFFFFFFF).withValues(alpha: 0.3),
        const Color(0xFFFFFFFF).withValues(alpha: 0),
      ],
    ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Local studio hero asset (web `/hero.png` parity).
class WashStudioHeroImage extends StatelessWidget {
  const WashStudioHeroImage({
    this.fit = BoxFit.cover,
    this.semanticLabel = 'Studio watercolor wash',
    super.key,
  });

  final BoxFit fit;
  final String semanticLabel;

  static const assetPath = 'packages/menzies_design_wash_ui/assets/images/studio_hero.png';

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      assetPath,
      fit: fit,
      width: double.infinity,
      height: double.infinity,
      semanticLabel: semanticLabel,
      errorBuilder: (context, error, stack) {
        return WashAspectPlate.preset(
          tone: WashAspectPlateTone.mineral,
          label: 'Studio wash',
        );
      },
    );
  }
}

/// Compact legacy gallery preview (replaces old 16:9 card stub).
class WashAspectRatioLegacyPreview extends StatelessWidget {
  const WashAspectRatioLegacyPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return WashAspectFrame(
      ratio: WashAspectRatioValue.video,
      maxWidth: 280,
      child: const WashStudioHeroImage(),
    );
  }
}

/// Gallery helper: monospace class label under a sample.
class WashAspectSample extends StatelessWidget {
  const WashAspectSample({
    required this.classLabel,
    required this.child,
    this.footer,
    super.key,
  });

  final String classLabel;
  final Widget child;
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          classLabel,
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: WashTypography.bodyFamily,
            fontSize: 10,
            fontWeight: FontWeight.w400,
          ),
        ),
        if (footer != null) ...[
          const SizedBox(height: 4),
          footer!,
        ],
      ],
    );
  }
}

int washAspectGalleryColumns(double width, {int phone = 1, int tablet = 2, int desktop = 3}) {
  if (width >= WashTailwindBreakpoints.lg) return desktop;
  if (width >= WashTailwindBreakpoints.sm) return tablet;
  return phone;
}

double washAspectGalleryGap(double width) => width >= WashTailwindBreakpoints.sm ? 20 : 16;
