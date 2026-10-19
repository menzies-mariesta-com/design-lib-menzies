import 'dart:math' as math;
import 'dart:ui' show ImageFilter;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI aura style modifiers (`aura-dual`, `aura-rainbow`, …).
enum WashAuraStyle {
  defaultStyle,
  dual,
  rainbow,
  holo,
  gold,
  silver,
  glow,
}

/// Padding thickness (`aura-xs` … `aura-xl`; md is default).
enum WashAuraSize {
  xs,
  sm,
  md,
  lg,
  xl,
}

/// Inner corner radius source (daisy `:has(>.card)` / `>.btn` parity).
enum WashAuraChildRadius {
  box,
  field,
  selector,
}

extension WashAuraStyleX on WashAuraStyle {
  String get className => switch (this) {
        WashAuraStyle.defaultStyle => '',
        WashAuraStyle.dual => 'aura-dual',
        WashAuraStyle.rainbow => 'aura-rainbow',
        WashAuraStyle.holo => 'aura-holo',
        WashAuraStyle.gold => 'aura-gold',
        WashAuraStyle.silver => 'aura-silver',
        WashAuraStyle.glow => 'aura-glow',
      };
}

extension WashAuraSizeX on WashAuraSize {
  String get className => switch (this) {
        WashAuraSize.xs => 'aura-xs',
        WashAuraSize.sm => 'aura-sm',
        WashAuraSize.md => 'aura-md',
        WashAuraSize.lg => 'aura-lg',
        WashAuraSize.xl => 'aura-xl',
      };

  double get paddingPx => switch (this) {
        WashAuraSize.xs => 0,
        WashAuraSize.sm => 1,
        WashAuraSize.md => 2,
        WashAuraSize.lg => 2.5,
        WashAuraSize.xl => 4,
      };
}

/// Decorative rotating border light around a single child (daisyUI `.aura`).
class WashAura extends StatefulWidget {
  const WashAura({
    required this.child,
    this.style = WashAuraStyle.defaultStyle,
    this.size = WashAuraSize.md,
    this.color,
    this.padColor,
    this.childRadius = WashAuraChildRadius.box,
    this.duration,
    super.key,
  });

  final Widget child;
  final WashAuraStyle style;
  final WashAuraSize size;
  final Color? color;
  final Color? padColor;
  final WashAuraChildRadius childRadius;
  final Duration? duration;

  @override
  State<WashAura> createState() => _WashAuraState();
}

String washAuraClassLabel({
  WashAuraStyle style = WashAuraStyle.defaultStyle,
  WashAuraSize size = WashAuraSize.md,
  String? colorClass,
  String? backgroundClass,
}) {
  final parts = <String>['aura'];
  if (style != WashAuraStyle.defaultStyle) {
    parts.add(style.className);
  }
  if (size != WashAuraSize.md) {
    parts.add(size.className);
  }
  if (colorClass != null && colorClass.isNotEmpty) {
    parts.add(colorClass);
  }
  if (backgroundClass != null && backgroundClass.isNotEmpty) {
    parts.add(backgroundClass);
  }
  return parts.join(' ');
}

class _WashAuraState extends State<WashAura> with TickerProviderStateMixin {
  late AnimationController _spin;
  late AnimationController _glow;

  @override
  void initState() {
    super.initState();
    _spin = AnimationController(vsync: this);
    _glow = AnimationController(vsync: this);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _syncDurations();
    final reduced = WashReducedMotion.of(context);
    if (reduced) {
      _spin.stop();
      _glow.stop();
      return;
    }
    if (widget.style == WashAuraStyle.glow) {
      if (!_glow.isAnimating) _glow.repeat();
    } else if (!_spin.isAnimating) {
      _spin.repeat();
    }
  }

  @override
  void didUpdateWidget(covariant WashAura oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.style != widget.style ||
        oldWidget.duration != widget.duration) {
      _syncDurations();
    }
  }

  void _syncDurations() {
    final reduced = WashReducedMotion.of(context);
    final base = widget.duration ??
        switch (widget.style) {
          WashAuraStyle.holo => const Duration(seconds: 20),
          WashAuraStyle.glow => const Duration(seconds: 6),
          _ => const Duration(seconds: 6),
        };
    final spinDuration = reduced ? base * 4 : base;
    _spin.duration = spinDuration;
    _glow.duration = reduced ? base * 4 : base;
  }

  @override
  void dispose() {
    _spin.dispose();
    _glow.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final pigment = widget.color ?? tokens.palette.primary;
    final pad = widget.size.paddingPx;
    final innerRadius = switch (widget.childRadius) {
      WashAuraChildRadius.box => tokens.radiusBox,
      WashAuraChildRadius.field => tokens.radiusField,
      WashAuraChildRadius.selector => tokens.palette.radiusSelector,
    };
    final outerRadius = pad + innerRadius;

    return AnimatedBuilder(
      animation: Listenable.merge([_spin, _glow]),
      builder: (context, child) {
        final angle = widget.style == WashAuraStyle.glow ? 0.0 : _spin.value * 2 * math.pi;
        final gradient = _auraGradient(widget.style, pigment, angle);
        final glowT = _glow.value;

        return _AuraLayout(
          padding: pad,
          outerRadius: outerRadius,
          innerRadius: innerRadius,
          padColor: widget.padColor,
          gradient: gradient,
          glowStyle: widget.style == WashAuraStyle.glow,
          glowPhase: glowT,
          child: child!,
        );
      },
      child: widget.child,
    );
  }
}

class _AuraLayout extends StatelessWidget {
  const _AuraLayout({
    required this.padding,
    required this.outerRadius,
    required this.innerRadius,
    required this.gradient,
    required this.child,
    required this.glowStyle,
    required this.glowPhase,
    this.padColor,
  });

  final double padding;
  final double outerRadius;
  final double innerRadius;
  final Gradient gradient;
  final Color? padColor;
  final bool glowStyle;
  final double glowPhase;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final borderRadius = BorderRadius.circular(outerRadius);
    final inner = BorderRadius.circular(innerRadius);

    final ring = DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: borderRadius,
        gradient: gradient,
        color: padColor,
      ),
      child: Padding(
        padding: EdgeInsets.all(padding),
        child: ClipRRect(
          borderRadius: inner,
          child: child,
        ),
      ),
    );

    if (padding <= 0) {
      return ring;
    }

    final blur1 = glowStyle ? _glowBlur(glowPhase, 0.7, 4, 12) : 4.0;
    final blur2 = glowStyle ? _glowBlur(glowPhase, 0.3, 16, 24) : 16.0;
    final opacity1 = glowStyle ? _glowOpacity(glowPhase, 0.7) : 0.7;
    final opacity2 = glowStyle ? _glowOpacity(glowPhase, 0.3) : 0.3;

    return Stack(
      clipBehavior: Clip.none,
      alignment: Alignment.center,
      children: [
        Positioned.fill(
          child: IgnorePointer(
            child: Opacity(
              opacity: opacity1,
              child: ImageFiltered(
                imageFilter: ImageFilter.blur(sigmaX: blur1, sigmaY: blur1),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    borderRadius: borderRadius,
                    gradient: gradient,
                    color: padColor,
                  ),
                ),
              ),
            ),
          ),
        ),
        Positioned.fill(
          child: IgnorePointer(
            child: Opacity(
              opacity: opacity2,
              child: ImageFiltered(
                imageFilter: ImageFilter.blur(sigmaX: blur2, sigmaY: blur2),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    borderRadius: borderRadius,
                    gradient: gradient,
                    color: padColor,
                  ),
                ),
              ),
            ),
          ),
        ),
        ring,
      ],
    );
  }

  static double _glowBlur(double t, double _, double minBlur, double maxBlur) {
    final pulse = math.sin(t * 2 * math.pi);
    return minBlur + (maxBlur - minBlur) * (0.5 + 0.5 * pulse);
  }

  static double _glowOpacity(double t, double base) {
    final pulse = math.sin(t * 2 * math.pi);
    if (base >= 0.5) {
      return base + 0.3 * (0.5 + 0.5 * pulse);
    }
    return base + 0.3 * (0.5 + 0.5 * pulse);
  }
}

Gradient _auraGradient(WashAuraStyle style, Color pigment, double angle) {
  final rotation = GradientRotation(angle);
  switch (style) {
    case WashAuraStyle.dual:
      return SweepGradient(
        transform: rotation,
        tileMode: TileMode.repeated,
        colors: [
          const Color(0x00000000),
          const Color(0x00000000),
          pigment,
          const Color(0x00000000),
        ],
        stops: const [0, 0.4, 0.5, 1],
      );
    case WashAuraStyle.rainbow:
      return SweepGradient(
        transform: rotation,
        colors: const [
          Color(0x00000000),
          Color(0xFFE85D5D),
          Color(0xFFE8C85D),
          Color(0xFF5DE88A),
          Color(0xFF5DB8E8),
          Color(0xFF9D5DE8),
          Color(0xFFE85DA8),
          Color(0x00000000),
        ],
        stops: const [0.0, 0.12, 0.28, 0.44, 0.56, 0.72, 0.88, 1.0],
      );
    case WashAuraStyle.holo:
      return SweepGradient(
        transform: rotation,
        tileMode: TileMode.repeated,
        colors: const [
          Color(0xFFD878C8),
          Color(0xFF9888D8),
          Color(0xFF78C8D8),
          Color(0xFFD8E878),
          Color(0xFFE8D878),
          Color(0xFFD878C8),
        ],
        stops: const [0, 0.2, 0.4, 0.6, 0.8, 1],
      );
    case WashAuraStyle.gold:
      return SweepGradient(
        transform: rotation,
        tileMode: TileMode.repeated,
        colors: const [
          Color(0xFFC9A04A),
          Color(0xFFF5E6B8),
          Color(0xFFD4B05A),
          Color(0xFFF2E0A8),
          Color(0xFFB89040),
          Color(0xFFC9A04A),
        ],
        stops: const [0, 0.2, 0.4, 0.6, 0.8, 1],
      );
    case WashAuraStyle.silver:
      return SweepGradient(
        transform: rotation,
        tileMode: TileMode.repeated,
        colors: const [
          Color(0xFF4A4A4A),
          Color(0xFFE8E8E8),
          Color(0xFF9A9A9A),
          Color(0xFFF0F0F0),
          Color(0xFF7A7A7A),
          Color(0xFF4A4A4A),
        ],
        stops: const [0, 0.2, 0.4, 0.6, 0.8, 1],
      );
    case WashAuraStyle.glow:
      return RadialGradient(
        center: Alignment.center,
        radius: 1.2,
        colors: [
          pigment,
          pigment.withValues(alpha: 0),
        ],
        stops: const [0, 0.9],
      );
    case WashAuraStyle.defaultStyle:
      return SweepGradient(
        transform: rotation,
        colors: [
          const Color(0x00000000),
          const Color(0x00000000),
          pigment,
        ],
        stops: const [0, 225 / 360, 1],
      );
  }
}

/// Gallery helper: monospace class label under a sample.
class WashAuraSample extends StatelessWidget {
  const WashAuraSample({
    required this.classLabel,
    required this.child,
    super.key,
  });

  final String classLabel;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          classLabel,
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: WashTypography.bodyFamily,
            fontSize: 10.4,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }
}

/// Compact legacy gallery preview.
class WashAuraLegacyPreview extends StatelessWidget {
  const WashAuraLegacyPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return WashAura(
      style: WashAuraStyle.rainbow,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: WashTokens.of(context).palette.base100,
          borderRadius: BorderRadius.circular(WashTokens.of(context).radiusField),
        ),
        child: Text(
          'Aura',
          style: WashTypography.label(WashTokens.of(context).onSurface),
        ),
      ),
    );
  }
}

int washAuraGalleryColumns(double width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}
