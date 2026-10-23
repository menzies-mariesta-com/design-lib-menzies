import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashCardSurfaceStyle { defaultStyle, border, dash }

enum WashCardSize { xs, sm, md, lg, xl }

class _WashCardMetrics {
  const _WashCardMetrics({
    required this.bodyPadding,
    required this.titleSize,
    required this.bodyGap,
    required this.actionsGap,
  });

  final double bodyPadding;
  final double titleSize;
  final double bodyGap;
  final double actionsGap;
}

const _kCardMetrics = <WashCardSize, _WashCardMetrics>{
  WashCardSize.xs: _WashCardMetrics(
    bodyPadding: 10,
    titleSize: 14,
    bodyGap: 6,
    actionsGap: 8,
  ),
  WashCardSize.sm: _WashCardMetrics(
    bodyPadding: 12,
    titleSize: 15,
    bodyGap: 8,
    actionsGap: 10,
  ),
  WashCardSize.md: _WashCardMetrics(
    bodyPadding: 16,
    titleSize: 16,
    bodyGap: 8,
    actionsGap: 12,
  ),
  WashCardSize.lg: _WashCardMetrics(
    bodyPadding: 20,
    titleSize: 18,
    bodyGap: 10,
    actionsGap: 12,
  ),
  WashCardSize.xl: _WashCardMetrics(
    bodyPadding: 24,
    titleSize: 20,
    bodyGap: 12,
    actionsGap: 14,
  ),
};

/// daisyUI `card` shell: surface, border/dash, side layout, and image-full overlay.
class WashCard extends StatelessWidget {
  const WashCard({
    required this.body,
    this.figure,
    this.figureBeforeBody = true,
    this.style = WashCardSurfaceStyle.defaultStyle,
    this.size = WashCardSize.md,
    this.side = false,
    this.responsiveSide = false,
    this.imageFull = false,
    this.centered = false,
    this.shadow = true,
    this.width,
    this.maxWidth,
    super.key,
  });

  final Widget body;
  final Widget? figure;
  final bool figureBeforeBody;
  final WashCardSurfaceStyle style;
  final WashCardSize size;
  final bool side;
  final bool responsiveSide;
  final bool imageFull;
  final bool centered;
  final bool shadow;
  final double? width;
  final double? maxWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final decoration = _shellDecoration(tokens);

    if (imageFull && figure != null) {
      return _ImageFullCard(
        tokens: tokens,
        decoration: decoration,
        width: width,
        maxWidth: maxWidth,
        figure: figure!,
        body: body,
      );
    }

    final horizontal =
        figure != null && (side || (responsiveSide && !_stackSide(context)));

    Widget content;
    if (horizontal) {
      content = IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: figureBeforeBody
              ? [figure!, Expanded(child: body)]
              : [Expanded(child: body), figure!],
        ),
      );
    } else if (figure != null && !figureBeforeBody) {
      content = Column(
        crossAxisAlignment:
            centered ? CrossAxisAlignment.center : CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [body, figure!],
      );
    } else if (figure != null) {
      content = Column(
        crossAxisAlignment:
            centered ? CrossAxisAlignment.center : CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [figure!, body],
      );
    } else {
      content = body;
    }

    final dashShell = style == WashCardSurfaceStyle.dash;
    Widget shell = Container(
      width: width,
      constraints:
          maxWidth != null ? BoxConstraints(maxWidth: maxWidth!) : null,
      alignment: centered ? Alignment.center : null,
      decoration: dashShell ? null : decoration,
      clipBehavior: dashShell ? Clip.none : Clip.antiAlias,
      child: content,
    );

    if (dashShell) {
      shell = CustomPaint(
        painter: _DashCardPainter(
          color: tokens.inkBorder,
          radius: 16,
          fill: tokens.surface,
          shadow: shadow ? washPaperShadowSm(tokens) : null,
        ),
        child: shell,
      );
    }

    return shell;
  }

  bool _stackSide(BuildContext context) {
    return MediaQuery.sizeOf(context).width < 640;
  }

  BoxDecoration _shellDecoration(WashTokens tokens) {
    final fill = tokens.surface;
    const radius = 16.0;
    switch (style) {
      case WashCardSurfaceStyle.defaultStyle:
        return BoxDecoration(
          color: fill,
          borderRadius: BorderRadius.circular(radius),
          boxShadow: shadow ? washPaperShadowSm(tokens) : null,
        );
      case WashCardSurfaceStyle.border:
        return washInkBorderBox(tokens, fill: fill, radius: radius);
      case WashCardSurfaceStyle.dash:
        return BoxDecoration(
          color: fill,
          borderRadius: BorderRadius.circular(radius),
          boxShadow: shadow ? washPaperShadowSm(tokens) : null,
        );
    }
  }
}

class _DashCardPainter extends CustomPainter {
  _DashCardPainter({
    required this.color,
    required this.radius,
    required this.fill,
    this.shadow,
  });

  final Color color;
  final double radius;
  final Color fill;
  final List<BoxShadow>? shadow;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(rect, Radius.circular(radius));
    if (shadow != null) {
      for (final s in shadow!) {
        canvas.drawRRect(
          rrect.shift(s.offset),
          Paint()
            ..color = s.color
            ..maskFilter = MaskFilter.blur(BlurStyle.normal, s.blurRadius),
        );
      }
    }
    canvas.drawRRect(rrect, Paint()..color = fill);
    final path = Path()..addRRect(rrect);
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    for (final metric in path.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final len = (distance + 6).clamp(0, metric.length) - distance;
        final extract = metric.extractPath(distance, distance + len);
        canvas.drawPath(extract, paint);
        distance += 10;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DashCardPainter oldDelegate) =>
      oldDelegate.color != color || oldDelegate.fill != fill;
}

class _ImageFullCard extends StatelessWidget {
  const _ImageFullCard({
    required this.tokens,
    required this.decoration,
    required this.figure,
    required this.body,
    this.width,
    this.maxWidth,
  });

  final WashTokens tokens;
  final BoxDecoration decoration;
  final Widget figure;
  final Widget body;
  final double? width;
  final double? maxWidth;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      constraints:
          maxWidth != null ? BoxConstraints(maxWidth: maxWidth!) : null,
      decoration: decoration,
      clipBehavior: Clip.antiAlias,
      child: Stack(
        fit: StackFit.passthrough,
        children: [
          figure,
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    tokens.onSurface.withValues(alpha: 0.05),
                    tokens.onSurface.withValues(alpha: 0.72),
                  ],
                ),
              ),
            ),
          ),
          Positioned(left: 0, right: 0, bottom: 0, child: body),
        ],
      ),
    );
  }
}

/// daisyUI `card-body`.
class WashCardBody extends StatelessWidget {
  const WashCardBody({
    required this.children,
    this.size = WashCardSize.md,
    this.justifyEnd = false,
    this.centerItems = false,
    this.textAlign = TextAlign.start,
    super.key,
  });

  final List<Widget> children;
  final WashCardSize size;
  final bool justifyEnd;
  final bool centerItems;
  final TextAlign textAlign;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _kCardMetrics[size] ?? _kCardMetrics[WashCardSize.md]!;
    return Padding(
      padding: EdgeInsets.all(m.bodyPadding),
      child: DefaultTextStyle(
        textAlign: textAlign,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: size == WashCardSize.xs ? 12 : 14,
        ),
        child: Column(
          crossAxisAlignment: centerItems
              ? CrossAxisAlignment.center
              : CrossAxisAlignment.stretch,
          mainAxisAlignment:
              justifyEnd ? MainAxisAlignment.end : MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: _spaced(children, m.bodyGap),
        ),
      ),
    );
  }

  List<Widget> _spaced(List<Widget> items, double gap) {
    if (items.isEmpty) return items;
    final out = <Widget>[items.first];
    for (var i = 1; i < items.length; i++) {
      out.add(SizedBox(height: gap));
      out.add(items[i]);
    }
    return out;
  }
}

/// daisyUI `card-title` (display font).
class WashCardTitle extends StatelessWidget {
  const WashCardTitle(
    this.text, {
    this.size = WashCardSize.md,
    this.trailing = const [],
    this.large = false,
    super.key,
  });

  final String text;
  final WashCardSize size;
  final List<Widget> trailing;
  final bool large;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _kCardMetrics[size] ?? _kCardMetrics[WashCardSize.md]!;
    final fontSize = large ? m.titleSize + 2 : m.titleSize;
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 8,
      runSpacing: 4,
      children: [
        Text(
          text,
          style: WashTypography.displayLarge(tokens.onSurface).copyWith(
            fontSize: fontSize,
            fontWeight: FontWeight.w600,
          ),
        ),
        ...trailing,
      ],
    );
  }
}

/// daisyUI `card-actions`.
class WashCardActions extends StatelessWidget {
  const WashCardActions({
    required this.children,
    this.align = WashCardActionsAlign.start,
    this.gap = 8,
    super.key,
  });

  final List<Widget> children;
  final WashCardActionsAlign align;
  final double gap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Wrap(
        spacing: gap,
        runSpacing: gap,
        alignment: switch (align) {
          WashCardActionsAlign.end => WrapAlignment.end,
          WashCardActionsAlign.between => WrapAlignment.spaceBetween,
          WashCardActionsAlign.start => WrapAlignment.start,
        },
        children: children,
      ),
    );
  }
}

enum WashCardActionsAlign { start, end, between }

/// Figure slot (image or media above/beside body).
class WashCardFigure extends StatelessWidget {
  const WashCardFigure({
    required this.child,
    this.shrink = false,
    this.height,
    this.width,
    this.maxHeight,
    super.key,
  });

  final Widget child;
  final bool shrink;
  final double? height;
  final double? width;
  final double? maxHeight;

  @override
  Widget build(BuildContext context) {
    Widget img = child;
    if (height != null || width != null || maxHeight != null) {
      img = SizedBox(
        height: height,
        width: width,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxHeight: maxHeight ?? double.infinity),
          child: img,
        ),
      );
    }
    if (shrink) {
      return img;
    }
    return img;
  }
}

/// Network figure helper for gallery demos (picsum parity with web).
class WashCardNetworkImage extends StatelessWidget {
  const WashCardNetworkImage({
    required this.url,
    required this.width,
    required this.height,
    this.alt,
    super.key,
  });

  final String url;
  final double width;
  final double height;
  final String? alt;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: alt,
      image: true,
      child: Image.network(
        url,
        width: width,
        height: height,
        fit: BoxFit.cover,
        filterQuality: FilterQuality.medium,
        errorBuilder: (_, __, ___) => Container(
          width: width,
          height: height,
          color: WashTokens.of(context).surfaceContainer,
        ),
      ),
    );
  }
}

/// Legacy catalog plate: title + child in a bordered box (not daisyUI card-body).
class WashPlateCard extends StatelessWidget {
  const WashPlateCard({required this.title, required this.child, super.key});
  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: washInkBorderBox(tokens),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: WashTypography.title(tokens.onSurface)),
          const SizedBox(height: 8),
          child,
        ],
      ),
    );
  }
}
