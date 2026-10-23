import 'package:flutter/widgets.dart';

import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/tabs/wash_tabs.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashTabsGalleryPage extends StatelessWidget {
  const WashTabsGalleryPage({super.key});

  static const _styles = <(String, WashTabsStyle, String)>[
    ('Default', WashTabsStyle.plain, 'tabs'),
    ('Border', WashTabsStyle.border, 'tabs tabs-border'),
    ('Lift', WashTabsStyle.lift, 'tabs tabs-lift'),
    ('Box', WashTabsStyle.box, 'tabs tabs-box'),
  ];

  static const _sizes = <WashTabsSize>[
    WashTabsSize.xs,
    WashTabsSize.sm,
    WashTabsSize.md,
    WashTabsSize.lg,
    WashTabsSize.xl,
  ];

  static const _pigmentItems = <WashTabItem>[
    WashTabItem(label: 'Pigment'),
    WashTabItem(label: 'Wash'),
    WashTabItem(label: 'Glaze'),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Tabs',
      description:
          'Every daisyUI tabs style, size, placement, and radio content pattern.',
      sections: [
        _s(
          '01 · Default',
          'Base tabs',
          'Plain tabs container with button parts and one active tab',
          const _LabeledTabs(
            style: WashTabsStyle.plain,
            initialIndex: 1,
            classLabel: 'tabs + tab + tab-active',
          ),
          _defaultDart,
        ),
        _s(
          '02 · Styles',
          'Border · lift · box',
          'Style modifiers on the tabs container',
          const _StylesSection(),
          _stylesDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Sizes',
          'xs through xl',
          'Size modifiers on tabs-lift for a clear visual scale',
          const _SizesSection(),
          _sizesDart,
        ),
        _s(
          '04 · Buttons',
          'Interactive button tabs',
          'Buttons with React state drive tab-active and a panel',
          WashTabs(
            initialIndex: 0,
            style: WashTabsStyle.border,
            contentMode: WashTabsContentMode.panel,
            items: const [
              WashTabItem(
                label: 'Underpaint',
                contentText: 'Cadmium yellow underpainting on cold-press.',
              ),
              WashTabItem(
                label: 'Wash',
                contentText: 'Two thin ultramarine washes for sky depth.',
              ),
              WashTabItem(
                label: 'Glaze',
                contentText: 'Final glaze to unify warm and cool edges.',
              ),
            ],
          ),
          _buttonsDart,
          tint: WashGalleryPanelTint.rose,
          classAfter: 'tabs tabs-border + button.tab + tabpanel',
        ),
        _s(
          '05 · Radio',
          'Radio input tabs',
          'Radio inputs as tabs. Unique name per group',
          const _LabeledTabs(
            style: WashTabsStyle.box,
            initialIndex: 1,
            classLabel: 'tabs tabs-box + input.tab[type="radio"]',
          ),
          _radioDart,
        ),
        _s(
          '06 · Content · border',
          'Radio tabs-border + panels',
          'Each radio is followed by its tab-content sibling',
          WashTabs(
            initialIndex: 1,
            style: WashTabsStyle.border,
            contentMode: WashTabsContentMode.attached,
            items: const [
              WashTabItem(
                label: 'Series',
                contentText: 'Atlantic Studies: coastal washes and cool greys.',
              ),
              WashTabItem(
                label: 'Palette',
                contentText:
                    'Ultramarine, burnt sienna, and raw umber for earth mixes.',
              ),
              WashTabItem(
                label: 'Notes',
                contentText: 'Keep edges soft until the final glaze pass.',
              ),
            ],
          ),
          _borderContentDart,
          tint: WashGalleryPanelTint.ochre,
          classAfter: 'tabs tabs-border + tab-content',
        ),
        _s(
          '07 · Content · lift',
          'Radio tabs-lift + panels',
          'Lift style with bordered content panels',
          WashTabs(
            initialIndex: 1,
            style: WashTabsStyle.lift,
            contentMode: WashTabsContentMode.attached,
            items: const [
              WashTabItem(
                label: 'Wet',
                contentText: 'Flood the paper while it still holds a sheen.',
              ),
              WashTabItem(
                label: 'Damp',
                contentText: 'Soft blooms without full runs. Ideal for clouds.',
              ),
              WashTabItem(
                label: 'Dry',
                contentText: 'Dry-brush texture for rocks and bark.',
              ),
            ],
          ),
          _liftContentDart,
          classAfter: 'tabs tabs-lift + tab-content',
        ),
        _s(
          '08 · Icons',
          'Lift tabs with Lucide icons',
          'Label wrappers hold radio + icon + text',
          WashTabs(
            initialIndex: 1,
            style: WashTabsStyle.lift,
            contentMode: WashTabsContentMode.attached,
            items: const [
              WashTabItem(
                label: 'Live',
                lucideIcon: 'play',
                contentText: 'Live session: wet-in-wet sky demo.',
              ),
              WashTabItem(
                label: 'Study',
                lucideIcon: 'smile',
                contentText: 'Gesture studies with limited palette.',
              ),
              WashTabItem(
                label: 'Favorites',
                lucideIcon: 'heart',
                contentText: 'Saved plates and pigment recipes.',
              ),
            ],
          ),
          _iconsDart,
          tint: WashGalleryPanelTint.rose,
          classAfter: 'tabs tabs-lift + label.tab + Lucide icons',
        ),
        _s(
          '09 · Placement',
          'tabs-top and tabs-bottom',
          'Default top placement vs content above the tab strip',
          const _PlacementSection(),
          _placementDart,
        ),
        _s(
          '10 · Content · box',
          'Radio tabs-box + panels',
          'Boxed tabs with matching content panels',
          WashTabs(
            initialIndex: 1,
            style: WashTabsStyle.box,
            contentMode: WashTabsContentMode.attached,
            items: const [
              WashTabItem(
                label: 'Layers',
                contentText: 'Build from lightest wash to darkest accents.',
              ),
              WashTabItem(
                label: 'Edges',
                contentText: 'Soften one edge; keep the other crisp for form.',
              ),
              WashTabItem(
                label: 'Values',
                contentText: 'Squint to check value hierarchy before detail.',
              ),
            ],
          ),
          _boxContentDart,
          tint: WashGalleryPanelTint.ochre,
          classAfter: 'tabs tabs-box + tab-content',
        ),
        _s(
          '11 · Disabled',
          'tab-disabled',
          'A disabled tab stays visible but is not interactive',
          const _LabeledTabs(
            style: WashTabsStyle.lift,
            initialIndex: 1,
            items: [
              WashTabItem(label: 'Open'),
              WashTabItem(label: 'Active'),
              WashTabItem(label: 'Locked', disabled: true),
            ],
            classLabel: 'tab tab-disabled',
          ),
          _disabledDart,
        ),
        _s(
          '12 · Icon strip',
          'Box tabs with palette icons',
          'Compact studio tools as icon-labeled radio tabs',
          WashTabs(
            initialIndex: 1,
            style: WashTabsStyle.box,
            contentMode: WashTabsContentMode.attached,
            items: const [
              WashTabItem(
                label: 'Palette',
                lucideIcon: 'palette',
                contentText: 'Mix two primaries plus one earth for the plate.',
              ),
              WashTabItem(
                label: 'Water',
                lucideIcon: 'droplets',
                contentText: 'Change water often to keep washes clean.',
              ),
              WashTabItem(
                label: 'Layers',
                lucideIcon: 'layers',
                contentText: 'Let each layer dry fully before the next.',
              ),
            ],
          ),
          _iconStripDart,
          tint: WashGalleryPanelTint.rose,
          classAfter: 'tabs tabs-box + label.tab + icons',
        ),
        _s(
          '13 · Overflow',
          'Horizontal scroll',
          'Narrow viewport scrolls when tab titles exceed the width',
          const _OverflowSection(),
          _overflowDart,
        ),
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
    String? classAfter,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(
        preview: classAfter == null
            ? preview
            : Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  preview,
                  const SizedBox(height: 12),
                  WashTabsClassLabel(classAfter),
                ],
              ),
        dartSource: dart,
      ),
    );
  }

  static const _defaultDart = '''
WashTabs(
  initialIndex: 1,
  items: [
    WashTabItem(label: 'Pigment'),
    WashTabItem(label: 'Wash'),
    WashTabItem(label: 'Glaze'),
  ],
)
''';

  static const _stylesDart = '''
WashTabs(style: WashTabsStyle.plain, items: items)
WashTabs(style: WashTabsStyle.border, items: items)
WashTabs(style: WashTabsStyle.lift, items: items)
WashTabs(style: WashTabsStyle.box, items: items)
''';

  static const _sizesDart = '''
WashTabs(
  style: WashTabsStyle.lift,
  size: WashTabsSize.xs,
  items: [
    WashTabItem(label: 'xs'),
    WashTabItem(label: 'xs'),
    WashTabItem(label: 'xs'),
  ],
)
''';

  static const _buttonsDart = '''
WashTabs(
  style: WashTabsStyle.border,
  contentMode: WashTabsContentMode.panel,
  items: [
    WashTabItem(label: 'Underpaint', contentText: '...'),
    WashTabItem(label: 'Wash', contentText: '...'),
    WashTabItem(label: 'Glaze', contentText: '...'),
  ],
)
''';

  static const _radioDart = '''
WashTabs(
  style: WashTabsStyle.box,
  initialIndex: 1,
  items: [
    WashTabItem(label: 'Pigment'),
    WashTabItem(label: 'Wash'),
    WashTabItem(label: 'Glaze'),
  ],
)
''';

  static const _borderContentDart = '''
WashTabs(
  style: WashTabsStyle.border,
  contentMode: WashTabsContentMode.attached,
  initialIndex: 1,
  items: [
    WashTabItem(label: 'Series', contentText: '...'),
    WashTabItem(label: 'Palette', contentText: '...'),
    WashTabItem(label: 'Notes', contentText: '...'),
  ],
)
''';

  static const _liftContentDart = '''
WashTabs(
  style: WashTabsStyle.lift,
  contentMode: WashTabsContentMode.attached,
  initialIndex: 1,
  items: [
    WashTabItem(label: 'Wet', contentText: '...'),
    WashTabItem(label: 'Damp', contentText: '...'),
    WashTabItem(label: 'Dry', contentText: '...'),
  ],
)
''';

  static const _iconsDart = '''
WashTabs(
  style: WashTabsStyle.lift,
  contentMode: WashTabsContentMode.attached,
  items: [
    WashTabItem(label: 'Live', lucideIcon: 'play', contentText: '...'),
    WashTabItem(label: 'Study', lucideIcon: 'smile', contentText: '...'),
    WashTabItem(label: 'Favorites', lucideIcon: 'heart', contentText: '...'),
  ],
)
''';

  static const _placementDart = '''
WashTabs(
  style: WashTabsStyle.lift,
  placement: WashTabsPlacement.top,
  contentMode: WashTabsContentMode.attached,
  items: skySeaShore,
)
WashTabs(
  style: WashTabsStyle.lift,
  placement: WashTabsPlacement.bottom,
  contentMode: WashTabsContentMode.attached,
  items: skySeaShore,
)
''';

  static const _boxContentDart = '''
WashTabs(
  style: WashTabsStyle.box,
  contentMode: WashTabsContentMode.attached,
  items: [
    WashTabItem(label: 'Layers', contentText: '...'),
    WashTabItem(label: 'Edges', contentText: '...'),
    WashTabItem(label: 'Values', contentText: '...'),
  ],
)
''';

  static const _disabledDart = '''
WashTabs(
  style: WashTabsStyle.lift,
  initialIndex: 1,
  items: [
    WashTabItem(label: 'Open'),
    WashTabItem(label: 'Active'),
    WashTabItem(label: 'Locked', disabled: true),
  ],
)
''';

  static const _iconStripDart = '''
WashTabs(
  style: WashTabsStyle.box,
  contentMode: WashTabsContentMode.attached,
  items: [
    WashTabItem(label: 'Palette', lucideIcon: 'palette', contentText: '...'),
    WashTabItem(label: 'Water', lucideIcon: 'droplets', contentText: '...'),
    WashTabItem(label: 'Layers', lucideIcon: 'layers', contentText: '...'),
  ],
)
''';

  static const _overflowDart = '''
SizedBox(
  width: 240,
  child: WashTabs(
    style: WashTabsStyle.lift,
    scrollable: true,
    contentMode: WashTabsContentMode.attached,
    items: longTitles,
  ),
)
''';
}

class _LabeledTabs extends StatelessWidget {
  const _LabeledTabs({
    required this.style,
    required this.classLabel,
    this.initialIndex = 1,
    this.items = WashTabsGalleryPage._pigmentItems,
  });

  final WashTabsStyle style;
  final String classLabel;
  final int initialIndex;
  final List<WashTabItem> items;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashTabs(
          style: style,
          initialIndex: initialIndex,
          items: items,
        ),
        const SizedBox(height: 12),
        WashTabsClassLabel(classLabel),
      ],
    );
  }
}

class _StylesSection extends StatelessWidget {
  const _StylesSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < WashTabsGalleryPage._styles.length; i++) ...[
          if (i > 0) const SizedBox(height: 32),
          Text(
            WashTabsGalleryPage._styles[i].$1,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
          ),
          const SizedBox(height: 8),
          WashTabs(
            style: WashTabsGalleryPage._styles[i].$2,
            initialIndex: 1,
            items: WashTabsGalleryPage._pigmentItems,
          ),
          const SizedBox(height: 8),
          WashTabsClassLabel(WashTabsGalleryPage._styles[i].$3),
        ],
      ],
    );
  }
}

class _SizesSection extends StatelessWidget {
  const _SizesSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < WashTabsGalleryPage._sizes.length; i++) ...[
          if (i > 0) const SizedBox(height: 24),
          WashTabs(
            style: WashTabsStyle.lift,
            size: WashTabsGalleryPage._sizes[i],
            initialIndex: 1,
            items: [
              WashTabItem(label: WashTabsGalleryPage._sizes[i].name),
              WashTabItem(label: WashTabsGalleryPage._sizes[i].name),
              WashTabItem(label: WashTabsGalleryPage._sizes[i].name),
            ],
          ),
          const SizedBox(height: 8),
          WashTabsClassLabel(
            'tabs tabs-lift tabs-${WashTabsGalleryPage._sizes[i].name}',
          ),
        ],
      ],
    );
  }
}

class _PlacementSection extends StatelessWidget {
  const _PlacementSection();

  static const _items = <WashTabItem>[
    WashTabItem(
      label: 'Sky',
      contentText: 'Cerulean and cobalt for open sky.',
    ),
    WashTabItem(
      label: 'Sea',
      contentText: 'Phthalo green with a touch of indigo.',
    ),
    WashTabItem(
      label: 'Shore',
      contentText: 'Warm sand: yellow ochre and white.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final top = _placementColumn(
          title: 'Top (default)',
          placement: WashTabsPlacement.top,
          classLabel: 'tabs tabs-lift tabs-top',
        );
        final bottom = _placementColumn(
          title: 'Bottom',
          placement: WashTabsPlacement.bottom,
          classLabel: 'tabs tabs-lift tabs-bottom',
        );
        if (row) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: top),
              const SizedBox(width: 32),
              Expanded(child: bottom),
            ],
          );
        }
        return Column(
          children: [
            top,
            const SizedBox(height: 40),
            bottom,
          ],
        );
      },
    );
  }

  static Widget _placementColumn({
    required String title,
    required WashTabsPlacement placement,
    required String classLabel,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
        ),
        const SizedBox(height: 8),
        WashTabs(
          style: WashTabsStyle.lift,
          placement: placement,
          contentMode: WashTabsContentMode.attached,
          initialIndex: 1,
          items: _items,
        ),
        const SizedBox(height: 8),
        WashTabsClassLabel(classLabel),
      ],
    );
  }
}

class _OverflowSection extends StatelessWidget {
  const _OverflowSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 240,
          child: WashTabs(
            style: WashTabsStyle.lift,
            scrollable: true,
            contentMode: WashTabsContentMode.attached,
            initialIndex: 1,
            items: const [
              WashTabItem(
                label: 'Morning wash',
                contentText: 'Cool grey underpainting.',
              ),
              WashTabItem(
                label: 'Midday glaze',
                contentText: 'Warm light across the plane.',
              ),
              WashTabItem(
                label: 'Evening shadow',
                contentText: 'Violet-grey for long shadows.',
              ),
              WashTabItem(
                label: 'Final accents',
                contentText: 'Dry-brush highlights only.',
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        const WashTabsClassLabel('overflow-x-auto + tabs tabs-lift min-w-max'),
      ],
    );
  }
}
