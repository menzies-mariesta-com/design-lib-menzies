import 'package:flutter/widgets.dart';

import '../../components/carousel/wash_carousel.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashCarouselGalleryPage extends StatelessWidget {
  const WashCarouselGalleryPage({super.key});

  static const _snaps = <({int id, String alt, int w, int h})>[
    (
      id: 1015,
      alt: 'Mountain lake reflecting cloudy sky at dusk',
      w: 280,
      h: 200
    ),
    (
      id: 1016,
      alt: 'Rocky coastal cliff above turquoise water',
      w: 280,
      h: 200
    ),
    (id: 1018, alt: 'Misty forest path lined with tall pines', w: 280, h: 200),
    (id: 1025, alt: 'Dog wearing a yellow raincoat outdoors', w: 280, h: 200),
    (
      id: 1035,
      alt: 'Open notebook with coffee on a wooden desk',
      w: 280,
      h: 200
    ),
    (id: 1039, alt: 'Sunlit canyon walls in warm stone tones', w: 280, h: 200),
    (
      id: 1043,
      alt: 'Quiet harbor with moored sailboats at dawn',
      w: 280,
      h: 200
    ),
  ];

  static const _fullSlides = <({int id, String alt})>[
    (id: 1044, alt: 'Soft watercolor sky over a quiet meadow'),
    (id: 1050, alt: 'Wet pavement reflections after evening rain'),
    (id: 106, alt: 'Sunflower field stretching toward the horizon'),
    (id: 110, alt: 'Snow-dusted peaks under a clear blue sky'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashGalleryPage(
      title: 'Carousel',
      description:
          'Every daisyUI carousel snap, direction, and navigation pattern.',
      sections: [
        _s(
            '01 · Snap start',
            'Snap to start',
            'Default horizontal scroll with items snapping to the start edge',
            _snapStart(tokens),
            _snapStartDart),
        _s(
            '02 · Snap center',
            'Snap to center',
            'Items settle toward the middle of the viewport while scrolling',
            _snapCenter(tokens),
            _snapCenterDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Snap end',
            'Snap to end',
            'Scroll snap aligns each item to the trailing edge',
            _snapEnd(tokens),
            _snapEndDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '04 · Full width',
            'Full width items',
            'Each slide fills the carousel width for a classic pager feel',
            _fullWidth(tokens),
            _fullWidthDart),
        _s(
            '05 · Vertical',
            'Vertical carousel',
            'Scroll along the Y axis with full-height slides',
            _vertical(tokens),
            _verticalDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '06 · Half width',
            'Half width items',
            'Two slides visible at once inside a fixed carousel frame',
            _halfWidth(tokens),
            _halfWidthDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '07 · Full bleed',
            'Full-bleed carousel',
            'Centered snaps with padded gutters so peeks of neighbors show',
            _fullBleed(tokens),
            _fullBleedDart),
        _s(
            '08 · Indicators',
            'Indicator buttons',
            'Anchor links jump to numbered slides',
            _indicators(tokens),
            _indicatorsDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '09 · Nav buttons',
            'Next and previous',
            'Circle controls on each slide for sequential browsing',
            _navButtons(tokens),
            _navDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '10 · Direction',
            'Horizontal explicit',
            'carousel-horizontal is the default direction, shown explicitly',
            _horizontal(tokens),
            _horizontalDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static List<WashCarouselItem> _snapItems(WashTokens tokens, _SlideSize size) {
    return _snaps
        .map(
          (s) => WashCarouselItem(
            child: WashCarouselImage(
              url: washCarouselPicsumUrl(s.id, size.w, size.h),
              width: size.w.toDouble(),
              height: size.h.toDouble(),
              alt: s.alt,
            ),
          ),
        )
        .toList();
  }

  static Widget _labeled(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 12),
        Text(label,
            style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4)),
      ],
    );
  }

  static Widget _snapStart(WashTokens tokens) {
    return _labeled(
      'carousel rounded-box',
      WashCarousel(
        height: 200,
        itemWidth: 280,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        items: _snapItems(tokens, const _SlideSize(280, 200)),
      ),
    );
  }

  static Widget _snapCenter(WashTokens tokens) {
    return _labeled(
      'carousel carousel-center rounded-box',
      WashCarousel(
        height: 200,
        snap: WashCarouselSnap.center,
        itemWidth: 280,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        items: _snapItems(tokens, const _SlideSize(280, 200)),
      ),
    );
  }

  static Widget _snapEnd(WashTokens tokens) {
    return _labeled(
      'carousel carousel-end rounded-box',
      WashCarousel(
        height: 200,
        snap: WashCarouselSnap.end,
        itemWidth: 280,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        items: _snapItems(tokens, const _SlideSize(280, 200)),
      ),
    );
  }

  static Widget _fullWidth(WashTokens tokens) {
    return _labeled(
      'carousel rounded-box · carousel-item w-full',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 320),
        child: WashCarousel(
          height: 280,
          itemWidthFactor: 1,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          items: _snaps
              .map(
                (s) => WashCarouselItem(
                  child: WashCarouselImage(
                    url: washCarouselPicsumUrl(s.id, 400, 280),
                    width: 400,
                    height: 280,
                    alt: s.alt,
                    fit: BoxFit.cover,
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  static Widget _vertical(WashTokens tokens) {
    return _labeled(
      'carousel carousel-vertical rounded-box h-96',
      SizedBox(
        height: 384,
        child: WashCarousel(
          axis: Axis.vertical,
          itemHeight: 384,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          items: _snapItems(tokens, const _SlideSize(360, 384)),
        ),
      ),
    );
  }

  static Widget _halfWidth(WashTokens tokens) {
    return _labeled(
      'carousel rounded-box · carousel-item w-1/2',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 512),
        child: WashCarousel(
          height: 220,
          itemWidthFactor: 0.5,
          gap: 0,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          items: _snaps
              .map(
                (s) => WashCarouselItem(
                  child: WashCarouselImage(
                    url: washCarouselPicsumUrl(s.id, 320, 220),
                    width: 320,
                    height: 220,
                    alt: s.alt,
                    fit: BoxFit.cover,
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  static Widget _fullBleed(WashTokens tokens) {
    return _labeled(
      'carousel carousel-center bg-neutral space-x-4 p-4',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 448),
        child: WashCarousel(
          height: 200,
          snap: WashCarouselSnap.center,
          itemWidth: 280,
          gap: 16,
          padding: const EdgeInsets.all(16),
          backgroundColor: tokens.palette.neutral,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          items: _snaps
              .map(
                (s) => WashCarouselItem(
                  child: WashCarouselImage(
                    url: washCarouselPicsumUrl(s.id, s.w, s.h),
                    width: s.w.toDouble(),
                    height: s.h.toDouble(),
                    alt: s.alt,
                    borderRadius: BorderRadius.circular(tokens.radiusBox),
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  static Widget _indicators(WashTokens tokens) {
    return _labeled(
      'carousel · btn btn-xs indicators via #anchors',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 576),
        child: WashCarouselIndicators(
          slides: _fullSlides
              .map(
                (s) => WashCarouselImage(
                  url: washCarouselPicsumUrl(s.id, 800, 400),
                  width: 800,
                  height: 400,
                  alt: s.alt,
                  fit: BoxFit.cover,
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  static Widget _navButtons(WashTokens tokens) {
    return _labeled(
      'carousel · btn btn-circle next/prev anchors',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 576),
        child: WashCarouselNav(
          slides: _fullSlides
              .map(
                (s) => WashCarouselImage(
                  url: washCarouselPicsumUrl(s.id, 800, 400),
                  width: 800,
                  height: 400,
                  alt: s.alt,
                  fit: BoxFit.cover,
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  static Widget _horizontal(WashTokens tokens) {
    final subset = _snaps.take(4).toList();
    return _labeled(
      'carousel carousel-horizontal rounded-box',
      WashCarousel(
        height: 200,
        itemWidth: 280,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        items: subset
            .map(
              (s) => WashCarouselItem(
                child: WashCarouselImage(
                  url: washCarouselPicsumUrl(s.id, s.w, s.h),
                  width: s.w.toDouble(),
                  height: s.h.toDouble(),
                  alt: s.alt,
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  static const _snapStartDart =
      'WashCarousel(height: 200, itemWidth: 280, items: [...]);';
  static const _snapCenterDart =
      'WashCarousel(snap: WashCarouselSnap.center, itemWidth: 280, items: [...]);';
  static const _snapEndDart =
      'WashCarousel(snap: WashCarouselSnap.end, itemWidth: 280, items: [...]);';
  static const _fullWidthDart =
      'WashCarousel(itemWidthFactor: 1, items: [WashCarouselItem(child: WashCarouselImage(...))]);';
  static const _verticalDart =
      'WashCarousel(axis: Axis.vertical, itemHeight: 384, items: [...]);';
  static const _halfWidthDart =
      'WashCarousel(itemWidthFactor: 0.5, height: 220, items: [...]);';
  static const _fullBleedDart =
      'WashCarousel(snap: WashCarouselSnap.center, gap: 16, padding: EdgeInsets.all(16), backgroundColor: tokens.palette.neutral, items: [...]);';
  static const _indicatorsDart = 'WashCarouselIndicators(slides: [...]);';
  static const _navDart = 'WashCarouselNav(slides: [...]);';
  static const _horizontalDart =
      'WashCarousel(itemWidth: 280, items: snaps.take(4).map(...));';
}

class _SlideSize {
  const _SlideSize(this.w, this.h);
  final int w;
  final int h;
}
