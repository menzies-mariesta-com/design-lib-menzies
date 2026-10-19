import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';

/// Picsum URL parity with web carousel gallery.
String washCarouselPicsumUrl(int id, int width, int height) =>
    'https://picsum.photos/id/$id/$width/$height';

enum WashCarouselSnap { start, center, end }

/// daisyUI `carousel-item` wrapper.
class WashCarouselItem extends StatelessWidget {
  const WashCarouselItem({
    required this.child,
    this.width,
    this.height,
    this.widthFactor,
    this.heightFactor,
    super.key,
  });

  final Widget child;
  final double? width;
  final double? height;
  final double? widthFactor;
  final double? heightFactor;

  @override
  Widget build(BuildContext context) {
    return child;
  }
}

/// Horizontal or vertical scroll carousel with scroll-snap parity.
class WashCarousel extends StatefulWidget {
  const WashCarousel({
    required this.items,
    this.snap = WashCarouselSnap.start,
    this.axis = Axis.horizontal,
    this.height,
    this.width,
    this.padding = EdgeInsets.zero,
    this.backgroundColor,
    this.gap = 0,
    this.borderRadius,
    this.itemWidth,
    this.itemHeight,
    this.itemWidthFactor,
    this.itemHeightFactor,
    super.key,
  });

  final List<WashCarouselItem> items;
  final WashCarouselSnap snap;
  final Axis axis;
  final double? height;
  final double? width;
  final EdgeInsets padding;
  final Color? backgroundColor;
  final double gap;
  final BorderRadius? borderRadius;
  final double? itemWidth;
  final double? itemHeight;
  final double? itemWidthFactor;
  final double? itemHeightFactor;

  @override
  State<WashCarousel> createState() => _WashCarouselState();
}

class _WashCarouselState extends State<WashCarousel> {
  final _controller = ScrollController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  double _itemExtent(double viewport) {
    if (widget.axis == Axis.horizontal) {
      if (widget.itemWidth != null) return widget.itemWidth!;
      if (widget.itemWidthFactor != null) return viewport * widget.itemWidthFactor!;
      return viewport;
    }
    if (widget.itemHeight != null) return widget.itemHeight!;
    if (widget.itemHeightFactor != null) return viewport * widget.itemHeightFactor!;
    return viewport;
  }

  void _snapAfterScroll() {
    if (!_controller.hasClients || widget.items.isEmpty) return;
    final position = _controller.position;
    final viewport = position.viewportDimension;
    final extent = _itemExtent(viewport);
    final stride = extent + widget.gap;
    if (stride <= 0) return;

    final index = _controller.offset / stride;
    var targetIndex = index.round().clamp(0, widget.items.length - 1);

    if (widget.snap == WashCarouselSnap.center) {
      targetIndex = ((index + 0.5).floor()).clamp(0, widget.items.length - 1);
    } else if (widget.snap == WashCarouselSnap.end) {
      targetIndex = (index.ceil()).clamp(0, widget.items.length - 1);
    }

    var targetOffset = targetIndex * stride;
    final max = position.maxScrollExtent;
    if (widget.snap == WashCarouselSnap.center) {
      targetOffset = (targetIndex * stride) - (viewport - extent) / 2;
    } else if (widget.snap == WashCarouselSnap.end) {
      targetOffset = (targetIndex * stride) - (viewport - extent);
    }
    targetOffset = targetOffset.clamp(0.0, max);

    if ((targetOffset - _controller.offset).abs() > 0.5) {
      _controller.animateTo(
        targetOffset,
        duration: const Duration(milliseconds: 220),
        curve: Curves.easeOutCubic,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final radius = widget.borderRadius ?? BorderRadius.circular(tokens.radiusBox);

    Widget viewport = LayoutBuilder(
      builder: (context, constraints) {
        final maxW = widget.width ?? constraints.maxWidth;
        final maxH = widget.height ?? constraints.maxHeight;
        final horizontal = widget.axis == Axis.horizontal;
        final viewportMain = horizontal ? maxW : maxH;
        final extent = _itemExtent(viewportMain.isFinite ? viewportMain : 320);

        return NotificationListener<ScrollEndNotification>(
          onNotification: (_) {
            _snapAfterScroll();
            return false;
          },
          child: ListView.separated(
            controller: _controller,
            scrollDirection: widget.axis,
            padding: widget.padding,
            physics: const BouncingScrollPhysics(),
            itemCount: widget.items.length,
            separatorBuilder: (_, __) => horizontal
                ? SizedBox(width: widget.gap)
                : SizedBox(height: widget.gap),
            itemBuilder: (context, index) {
              final item = widget.items[index].child;
              if (horizontal) {
                return SizedBox(
                  width: widget.itemWidthFactor != null
                      ? extent
                      : (widget.itemWidth ?? extent),
                  child: item,
                );
              }
              return SizedBox(
                height: widget.itemHeightFactor != null
                    ? extent
                    : (widget.itemHeight ?? extent),
                child: item,
              );
            },
          ),
        );
      },
    );

    if (widget.height != null && widget.axis == Axis.horizontal) {
      viewport = SizedBox(height: widget.height, child: viewport);
    }
    if (widget.width != null && widget.axis == Axis.vertical) {
      viewport = SizedBox(width: widget.width, child: viewport);
    }

    return ClipRRect(
      borderRadius: radius,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: widget.backgroundColor,
          borderRadius: radius,
        ),
        child: viewport,
      ),
    );
  }
}

/// Gallery slide image with semantics alt text.
class WashCarouselImage extends StatelessWidget {
  const WashCarouselImage({
    required this.url,
    required this.width,
    required this.height,
    this.alt,
    this.fit = BoxFit.cover,
    this.borderRadius,
    super.key,
  });

  final String url;
  final double width;
  final double height;
  final String? alt;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    Widget img = Image.network(
      url,
      width: width,
      height: height,
      fit: fit,
      filterQuality: FilterQuality.medium,
      errorBuilder: (_, __, ___) => Container(
        width: width,
        height: height,
        color: tokens.surfaceContainer,
      ),
    );
    if (borderRadius != null) {
      img = ClipRRect(borderRadius: borderRadius!, child: img);
    }
    return Semantics(label: alt, image: true, child: img);
  }
}

/// Full-width pager with numbered indicator buttons (web section 08).
class WashCarouselIndicators extends StatefulWidget {
  const WashCarouselIndicators({
    required this.slides,
    super.key,
  });

  final List<Widget> slides;

  @override
  State<WashCarouselIndicators> createState() => _WashCarouselIndicatorsState();
}

class _WashCarouselIndicatorsState extends State<WashCarouselIndicators> {
  late final PageController _page;
  int _index = 0;

  @override
  void initState() {
    super.initState();
    _page = PageController();
  }

  @override
  void dispose() {
    _page.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        AspectRatio(
          aspectRatio: 2,
          child: PageView(
            controller: _page,
            onPageChanged: (i) => setState(() => _index = i),
            children: widget.slides,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(widget.slides.length, (i) {
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: WashButton(
                label: '${i + 1}',
                size: WashButtonSize.xs,
                variant: _index == i
                    ? WashButtonVariant.primary
                    : WashButtonVariant.defaultVariant,
                onPressed: () {
                  _page.animateToPage(
                    i,
                    duration: const Duration(milliseconds: 280),
                    curve: Curves.easeOutCubic,
                  );
                },
                ripple: false,
              ),
            );
          }),
        ),
      ],
    );
  }
}

/// Full-width pager with prev/next circle controls on each slide (web section 09).
class WashCarouselNav extends StatefulWidget {
  const WashCarouselNav({required this.slides, super.key});

  final List<Widget> slides;

  @override
  State<WashCarouselNav> createState() => _WashCarouselNavState();
}

class _WashCarouselNavState extends State<WashCarouselNav> {
  late final PageController _page;
  int _index = 0;

  @override
  void initState() {
    super.initState();
    _page = PageController();
  }

  @override
  void dispose() {
    _page.dispose();
    super.dispose();
  }

  void _go(int delta) {
    final next = (_index + delta).clamp(0, widget.slides.length - 1);
    _page.animateToPage(
      next,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return AspectRatio(
      aspectRatio: 2,
      child: Stack(
        fit: StackFit.expand,
        children: [
          PageView(
            controller: _page,
            onPageChanged: (i) => setState(() => _index = i),
            children: widget.slides,
          ),
          Positioned.fill(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _navBtn(
                    tokens,
                    label: 'Previous slide',
                    icon: 'chevron-left',
                    onTap: () => _go(-1),
                    enabled: _index > 0,
                  ),
                  _navBtn(
                    tokens,
                    label: 'Next slide',
                    icon: 'chevron-right',
                    onTap: () => _go(1),
                    enabled: _index < widget.slides.length - 1,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _navBtn(
    WashTokens tokens, {
    required String label,
    required String icon,
    required VoidCallback onTap,
    required bool enabled,
  }) {
    return WashButton(
      circle: true,
      variant: WashButtonVariant.defaultVariant,
      enabled: enabled,
      onPressed: enabled ? onTap : null,
      child: WashLucideIcon(icon, size: 20, color: tokens.onSurface),
      ripple: false,
    );
  }
}

/// Legacy catalog preview: horizontal snap carousel with two plates.
class WashCarouselLegacyPreview extends StatelessWidget {
  const WashCarouselLegacyPreview({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashCarousel(
      height: 160,
      borderRadius: BorderRadius.circular(tokens.radiusBox),
      itemWidth: 200,
      items: [
        WashCarouselItem(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: washInkBorderBox(tokens),
            child: Text('Slide 1', style: WashTypography.title(tokens.onSurface)),
          ),
        ),
        WashCarouselItem(
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: washInkBorderBox(tokens),
            child: Text('Slide 2', style: WashTypography.title(tokens.onSurface)),
          ),
        ),
      ],
    );
  }
}
