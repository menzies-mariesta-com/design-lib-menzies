import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/menu/wash_menu.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashMenuGalleryPage extends StatelessWidget {
  const WashMenuGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Menu',
      description:
          'daisyUI menu lists: vertical and horizontal layouts, sizes, icons, titles, states, nested.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Vertical menu links',
          description: 'Default menu is vertical',
          child: WashShowcaseTabs(
            preview: WashMenu(
              width: 224,
              children: [
                WashMenuItem(label: 'Overview', onPressed: () {}),
                WashMenuItem(label: 'Palette', onPressed: () {}),
                WashMenuItem(label: 'Layers', onPressed: () {}),
              ],
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Horizontal',
          title: 'menu-horizontal',
          description: 'Lay items in a row for toolbars and compact nav strips',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: WashMenu(
              orientation: WashMenuOrientation.horizontal,
              children: [
                WashMenuItem(label: 'Plates', onPressed: () {}),
                WashMenuItem(label: 'Washes', onPressed: () {}),
                WashMenuItem(label: 'Series', onPressed: () {}),
              ],
            ),
            dartSource: _horizontalDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Sizes',
          title: 'From menu-xs to menu-lg',
          description: 'Size modifiers scale padding and type',
          child: LayoutBuilder(
            builder: (context, constraints) {
              final cols = constraints.maxWidth >= 1024
                  ? 4
                  : constraints.maxWidth >= 640
                      ? 2
                      : 1;
              return Wrap(
                spacing: 16,
                runSpacing: 16,
                children: [
                  for (final entry in _sizes)
                    SizedBox(
                      width: cols == 1
                          ? constraints.maxWidth
                          : (constraints.maxWidth - 16 * (cols - 1)) / cols,
                      child: WashShowcaseTabs(
                        preview: WashMenu(
                          size: entry.$1,
                          children: [
                            WashMenuItem(
                              label: '${entry.$2} item',
                              size: entry.$1,
                              onPressed: () {},
                            ),
                            WashMenuItem(
                              label: 'Second',
                              size: entry.$1,
                              onPressed: () {},
                            ),
                          ],
                        ),
                        dartSource: 'WashMenu(size: WashMenuSize.${entry.$1.name})',
                      ),
                    ),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Icons',
          title: 'Lucide icons in menu items',
          description: 'Pair Lucide 1.28.0 icons',
          tint: WashGalleryPanelTint.blue,
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.start,
            children: [
              WashShowcaseTabs(
                preview: WashMenu(
                  width: 224,
                  children: [
                    WashMenuItem(
                      label: 'Home',
                      icon: 'home',
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Palette',
                      icon: 'palette',
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Layers',
                      icon: 'layers',
                      badge: const WashBadge(
                        'New',
                        size: WashBadgeSize.xs,
                        tone: WashBadgeTone.warning,
                      ),
                      onPressed: () {},
                    ),
                  ],
                ),
                dartSource: _iconsLabeledDart,
              ),
              WashShowcaseTabs(
                preview: WashMenu(
                  children: [
                    WashMenuItem(
                      label: 'Home',
                      icon: 'home',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Home',
                      tooltipPrefer: WashTooltipSide.right,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Palette',
                      icon: 'palette',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Palette',
                      tooltipPrefer: WashTooltipSide.right,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Layers',
                      icon: 'layers',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Layers',
                      tooltipPrefer: WashTooltipSide.right,
                      onPressed: () {},
                    ),
                  ],
                ),
                dartSource: _iconsOnlyDart,
              ),
              WashShowcaseTabs(
                preview: WashMenu(
                  orientation: WashMenuOrientation.horizontal,
                  children: [
                    WashMenuItem(
                      label: 'Home',
                      icon: 'home',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Home',
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Palette',
                      icon: 'palette',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Palette',
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Image',
                      icon: 'image',
                      iconSize: 20,
                      iconOnly: true,
                      tooltip: 'Image',
                      onPressed: () {},
                    ),
                  ],
                ),
                dartSource: _iconsHorizontalDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · States',
          title: 'Title, disabled, active, focus',
          description: 'menu-title for section labels',
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            children: [
              WashShowcaseTabs(
                preview: WashMenu(
                  width: 224,
                  children: [
                    const WashMenuTitle('Pigments'),
                    WashMenuItem(label: 'Ultramarine', onPressed: () {}),
                    WashMenuItem(label: 'Alizarin', onPressed: () {}),
                  ],
                ),
                dartSource: _titleDart,
              ),
              WashShowcaseTabs(
                preview: WashMenu(
                  width: 224,
                  children: [
                    const WashMenuTitle('Washes'),
                    WashMenuSubtree(
                      children: [
                        WashMenuItem(label: 'Flat wash', onPressed: () {}),
                        WashMenuItem(label: 'Graded wash', onPressed: () {}),
                      ],
                    ),
                  ],
                ),
                dartSource: _titleNestedDart,
              ),
              WashShowcaseTabs(
                preview: WashMenu(
                  width: 224,
                  children: [
                    WashMenuItem(
                      label: 'Active item',
                      active: true,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Focus style',
                      focusStyle: true,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Disabled button',
                      disabled: true,
                    ),
                    WashMenuItem(
                      label: 'Disabled link',
                      disabled: true,
                    ),
                  ],
                ),
                dartSource: _statesDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Submenus',
          title: 'Nested, details, and JS toggle',
          description: 'Nested ul for always-open trees',
          tint: WashGalleryPanelTint.rose,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final cols = constraints.maxWidth >= 1280
                  ? 3
                  : constraints.maxWidth >= 1024
                      ? 2
                      : 1;
              final cellW = cols == 1
                  ? constraints.maxWidth
                  : (constraints.maxWidth - 24 * (cols - 1)) / cols;
              return Wrap(
                spacing: 24,
                runSpacing: 24,
                children: [
                  SizedBox(
                    width: cellW,
                    child: WashShowcaseTabs(
                      preview: WashMenu(
                        width: 224,
                        children: [
                          WashMenuItem(label: 'Item 1', onPressed: () {}),
                          WashMenuBranch(
                            label: 'Parent',
                            children: [
                              WashMenuItem(
                                label: 'Submenu 1',
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'Submenu 2',
                                onPressed: () {},
                              ),
                              WashMenuBranch(
                                label: 'Nested parent',
                                children: [
                                  WashMenuItem(
                                    label: 'Leaf A',
                                    onPressed: () {},
                                  ),
                                  WashMenuItem(
                                    label: 'Leaf B',
                                    onPressed: () {},
                                  ),
                                ],
                              ),
                            ],
                          ),
                          WashMenuItem(label: 'Item 3', onPressed: () {}),
                        ],
                      ),
                      dartSource: _nestedDart,
                    ),
                  ),
                  SizedBox(
                    width: cellW,
                    child: WashShowcaseTabs(
                      preview: WashMenu(
                        width: 224,
                        children: [
                          WashMenuItem(label: 'Item 1', onPressed: () {}),
                          WashMenuDetails(
                            label: 'Parent',
                            initiallyOpen: true,
                            children: [
                              WashMenuItem(
                                label: 'Submenu 1',
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'Submenu 2',
                                onPressed: () {},
                              ),
                              WashMenuDetails(
                                label: 'Nested',
                                children: [
                                  WashMenuItem(
                                    label: 'Leaf A',
                                    onPressed: () {},
                                  ),
                                  WashMenuItem(
                                    label: 'Leaf B',
                                    onPressed: () {},
                                  ),
                                ],
                              ),
                            ],
                          ),
                          WashMenuItem(label: 'Item 3', onPressed: () {}),
                        ],
                      ),
                      dartSource: _detailsDart,
                    ),
                  ),
                  SizedBox(
                    width: cellW,
                    child: WashShowcaseTabs(
                      preview: WashMenu(
                        width: 224,
                        children: [
                          WashMenuItem(label: 'Home', onPressed: () {}),
                          WashMenuDetails(
                            label: 'Pigments',
                            dropdownToggle: true,
                            children: [
                              WashMenuItem(
                                label: 'Ultramarine',
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'Yellow ochre',
                                onPressed: () {},
                              ),
                            ],
                          ),
                        ],
                      ),
                      dartSource: _jsToggleDart,
                    ),
                  ),
                  SizedBox(
                    width: cellW,
                    child: WashShowcaseTabs(
                      preview: WashMenu(
                        width: 224,
                        children: [
                          WashMenuItem(label: 'Home', onPressed: () {}),
                          WashMenuItem(label: 'About', onPressed: () {}),
                          WashMenuDetails(
                            label: 'Products',
                            children: [
                              WashMenuItem(
                                label: 'All products',
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'Brushes',
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'Papers',
                                onPressed: () {},
                              ),
                            ],
                          ),
                        ],
                      ),
                      dartSource: _pagedDart,
                    ),
                  ),
                  SizedBox(
                    width: cellW,
                    child: WashShowcaseTabs(
                      preview: WashMenu(
                        size: WashMenuSize.xs,
                        width: 320,
                        maxWidth: 320,
                        children: [
                          WashMenuItem(
                            label: 'plate-01.png',
                            icon: 'image',
                            size: WashMenuSize.xs,
                            onPressed: () {},
                          ),
                          WashMenuDetails(
                            label: 'Harbor series',
                            icon: 'folder-open',
                            size: WashMenuSize.xs,
                            initiallyOpen: true,
                            children: [
                              WashMenuItem(
                                label: 'dawn-wash.png',
                                icon: 'image',
                                size: WashMenuSize.xs,
                                onPressed: () {},
                              ),
                              WashMenuItem(
                                label: 'mist-bank.png',
                                icon: 'image',
                                size: WashMenuSize.xs,
                                onPressed: () {},
                              ),
                              WashMenuDetails(
                                label: 'Studies',
                                icon: 'folder-open',
                                size: WashMenuSize.xs,
                                children: [
                                  WashMenuItem(
                                    label: 'edge-test.png',
                                    icon: 'image',
                                    size: WashMenuSize.xs,
                                    onPressed: () {},
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                      dartSource: _fileTreeDart,
                    ),
                  ),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Studio',
          title: 'Watercolor tools sidebar',
          description:
              'A compact pigment-desk menu: titles, Lucide tools, active selection',
          child: WashShowcaseTabs(
            preview: const _StudioToolsMenu(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Responsive',
          title: 'Vertical on small, horizontal on large',
          description:
              'Use menu-vertical lg:menu-horizontal so nav stacks on phones',
          tint: WashGalleryPanelTint.blue,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: WashMenu(
                  horizontalFrom: 1024,
                  maxWidth: 448,
                  children: [
                    WashMenuItem(
                      label: 'Desk',
                      icon: 'home',
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Pigments',
                      icon: 'palette',
                      badge: const WashBadge('12', size: WashBadgeSize.xs),
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Layers',
                      icon: 'layers',
                      badge: const WashBadge(
                        'New',
                        size: WashBadgeSize.xs,
                        tone: WashBadgeTone.warning,
                      ),
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Stats',
                      badge: const WashBadge(
                        '',
                        size: WashBadgeSize.xs,
                        tone: WashBadgeTone.info,
                      ),
                      onPressed: () {},
                    ),
                  ],
                ),
                dartSource: _responsiveDart,
              ),
              const SizedBox(height: 16),
              Builder(
                builder: (context) {
                  final tokens = WashTokens.of(context);
                  return Text(
                    'Resize the viewport: items stack vertically below the large breakpoint, then run horizontally.',
                    style: WashTypography.body(tokens.inkMuted)
                        .copyWith(fontSize: 14),
                  );
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  static const _sizes = <(WashMenuSize, String)>[
    (WashMenuSize.xs, 'XS'),
    (WashMenuSize.sm, 'SM'),
    (WashMenuSize.md, 'MD'),
    (WashMenuSize.lg, 'LG'),
  ];

  static const _basicDart =
      "WashMenu(width: 224, children: [WashMenuItem(label: 'Overview'), …])";
  static const _horizontalDart =
      'WashMenu(orientation: horizontal, children: [Plates, Washes, Series])';
  static const _iconsLabeledDart =
      "WashMenuItem(label: 'Home', icon: 'home') + badge";
  static const _iconsOnlyDart =
      'WashMenuItem(iconOnly: true, tooltip: …, tooltipPrefer: right)';
  static const _iconsHorizontalDart =
      'WashMenu(orientation: horizontal) + iconOnly tooltips';
  static const _titleDart = "WashMenuTitle('Pigments') + items";
  static const _titleNestedDart = "WashMenuTitle('Washes') + WashMenuSubtree";
  static const _statesDart =
      'active / focusStyle / disabled WashMenuItem';
  static const _nestedDart = 'WashMenuBranch nested trees';
  static const _detailsDart = 'WashMenuDetails(initiallyOpen: true)';
  static const _jsToggleDart = 'WashMenuDetails(dropdownToggle: true)';
  static const _pagedDart = 'menu-paged style details Products';
  static const _fileTreeDart =
      "WashMenu(size: xs) + folder-open / image tree";
  static const _studioDart =
      'WashMenuTitle + active tool selection sidebar';
  static const _responsiveDart =
      'WashMenu(horizontalFrom: 1024) + badges';
}

class _StudioToolsMenu extends StatefulWidget {
  const _StudioToolsMenu();

  @override
  State<_StudioToolsMenu> createState() => _StudioToolsMenuState();
}

class _StudioToolsMenuState extends State<_StudioToolsMenu> {
  String _active = 'brush';

  static const _items = <(String, String, String)>[
    ('brush', 'Round brush', 'paintbrush'),
    ('pencil', 'Pencil', 'pencil'),
    ('drop', 'Wash dropper', 'droplets'),
    ('eraser', 'Kneaded eraser', 'eraser'),
    ('layers', 'Layers', 'layers'),
    ('palette', 'Palette', 'palette'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final activeLabel =
        _items.firstWhere((e) => e.$1 == _active, orElse: () => _items.first).$2;

    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= 640;
        final menu = WashMenu(
          width: 320,
          maxWidth: 320,
          children: [
            const WashMenuTitle('Studio tools'),
            for (final item in _items)
              WashMenuItem(
                label: item.$2,
                icon: item.$3,
                active: _active == item.$1,
                onPressed: () => setState(() => _active = item.$1),
              ),
            const WashMenuItem(
              label: 'Mask lock (soon)',
              disabled: true,
            ),
          ],
        );

        final panel = Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: tokens.palette.base200.withValues(alpha: 0.4),
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.5)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Active tool',
                style: WashTypography.label(tokens.inkMuted),
              ),
              const SizedBox(height: 8),
              Text(
                activeLabel,
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Sidebar-style menu with titles, icons, active, and disabled states.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
              const SizedBox(height: 8),
              Text(
                'menu + menu-title + menu-active + menu-disabled',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontFamily: 'monospace',
                  fontSize: 10.4,
                ),
              ),
            ],
          ),
        );

        if (row) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(child: menu),
              const SizedBox(width: 24),
              Expanded(child: panel),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            menu,
            const SizedBox(height: 12),
            panel,
          ],
        );
      },
    );
  }
}
