import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_background.dart';
import 'wash_aspect_ratio.dart';

/// daisyUI `hero` container with min-height and optional wash background.
class WashHero extends StatelessWidget {
  const WashHero({
    required this.child,
    this.minHeight = 288,
    this.backgroundColor,
    this.gradient,
    this.overlayColor,
    this.borderRadius,
    this.clipOverflow = false,
    this.pageWash = false,
    super.key,
  });

  final Widget child;
  final double minHeight;
  final Color? backgroundColor;
  final Gradient? gradient;
  final Color? overlayColor;
  final BorderRadius? borderRadius;
  final bool clipOverflow;
  final bool pageWash;

  static LinearGradient eveningGlazeGradient(WashTokens tokens) {
    final key = washPaletteId(tokens.pigmentId, tokens.mode);
    final atmo =
        kWashAtmosphereByTheme[key] ?? kWashAtmosphereByTheme['mineral']!;
    return LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        atmo.washA.withValues(alpha: 0.88),
        atmo.washC.withValues(alpha: 0.72),
        atmo.washB.withValues(alpha: 0.80),
      ],
      stops: const [0.0, 0.55, 1.0],
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final radius = borderRadius ?? BorderRadius.circular(tokens.radiusBox);
    final bg = backgroundColor ?? tokens.surfaceContainer;

    final decoration = BoxDecoration(
      color: pageWash ? null : (gradient == null ? bg : null),
      gradient: gradient,
      borderRadius: radius,
    );

    Widget body = Container(
      width: double.infinity,
      constraints: BoxConstraints(minHeight: minHeight),
      decoration: decoration,
      foregroundDecoration: overlayColor != null
          ? BoxDecoration(
              color: overlayColor,
              borderRadius: radius,
            )
          : null,
      clipBehavior: clipOverflow ? Clip.hardEdge : Clip.none,
      alignment: Alignment.center,
      child: child,
    );

    if (pageWash) {
      body = WashBackground(
        grain: true,
        borderRadius: radius,
        child: body,
      );
    }

    return ClipRRect(
      borderRadius: radius,
      child: body,
    );
  }
}

/// `hero-content` flex wrapper.
class WashHeroContent extends StatelessWidget {
  const WashHeroContent({
    required this.children,
    this.centerText = false,
    this.layout = WashHeroContentLayout.column,
    this.gap = 32,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
    this.maxWidth,
    super.key,
  });

  final List<Widget> children;
  final bool centerText;
  final WashHeroContentLayout layout;
  final double gap;
  final EdgeInsets padding;
  final double? maxWidth;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final row = switch (layout) {
          WashHeroContentLayout.column => false,
          WashHeroContentLayout.rowFromLg =>
            width >= WashTailwindBreakpoints.lg,
          WashHeroContentLayout.rowReverseFromLg =>
            width >= WashTailwindBreakpoints.lg,
        };
        final reverse = layout == WashHeroContentLayout.rowReverseFromLg && row;

        final rowChildren = reverse ? children.reversed.toList() : children;
        final aligned = row
            ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  for (var i = 0; i < rowChildren.length; i++) ...[
                    if (i > 0) SizedBox(width: gap),
                    Flexible(child: rowChildren[i]),
                  ],
                ],
              )
            : Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: centerText
                    ? CrossAxisAlignment.center
                    : CrossAxisAlignment.stretch,
                children: [
                  for (var i = 0; i < children.length; i++) ...[
                    if (i > 0) SizedBox(height: gap),
                    children[i],
                  ],
                ],
              );

        Widget body = Padding(padding: padding, child: aligned);
        if (maxWidth != null) {
          body = Align(
            child: ConstrainedBox(
              constraints: BoxConstraints(maxWidth: maxWidth!),
              child: body,
            ),
          );
        }
        return body;
      },
    );
  }
}

enum WashHeroContentLayout {
  column,
  rowFromLg,
  rowReverseFromLg,
}

/// CSS `wash-bloom` stand-in for hero media.
class WashHeroBloom extends StatelessWidget {
  const WashHeroBloom({
    this.label = 'Wash plate',
    this.height = 192,
    this.maxWidth = 320,
    super.key,
  });

  final String label;
  final double height;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final key = washPaletteId(tokens.pigmentId, tokens.mode);
    final atmo =
        kWashAtmosphereByTheme[key] ?? kWashAtmosphereByTheme['mineral']!;
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth, minHeight: height),
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              atmo.washB.withValues(alpha: 0.85),
              atmo.washC.withValues(alpha: 0.55),
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: tokens.onSurface.withValues(alpha: 0.12),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Center(
          child: Text(
            label,
            style: WashTypography.title(tokens.onSurface.withValues(alpha: 0.7))
                .copyWith(
              fontSize: 22,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}

/// Gallery helper: monospace class label under a hero sample.
class WashHeroSample extends StatelessWidget {
  const WashHeroSample({
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
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          classLabel,
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: WashTypography.bodyFamily,
            fontSize: 10.4,
          ),
        ),
      ],
    );
  }
}
