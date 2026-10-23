import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/dropdown/wash_dropdown.dart';
import '../../components/indicator/wash_indicator.dart';
import '../../components/join/wash_join.dart';
import '../../components/menu/wash_menu.dart';
import '../../components/navbar/wash_navbar.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashNavbarGalleryPage extends StatelessWidget {
  const WashNavbarGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Navbar',
      description:
          'daisyUI navbar patterns: start, center, and end sections, menus, search joins, avatar.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Start, center, and end',
          description:
              'Use navbar-start, navbar-center, and navbar-end to place brand',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: WashNavbar(
                  tone: WashNavbarTone.base200,
                  child: const WashNavbarBrand('Menzies Design'),
                ),
                dartSource: _basicBrandDart,
              ),
              const SizedBox(height: 16),
              WashShowcaseTabs(
                preview: WashNavbar(
                  start: const WashNavbarStart(
                    child: WashNavbarBrand('Brand', large: false),
                  ),
                  center: WashNavbarCenter(
                    child: Text(
                      'Center title',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  end: WashNavbarEnd(
                    child: WashButton(
                      label: 'Action',
                      size: WashButtonSize.sm,
                      variant: WashButtonVariant.defaultVariant,
                      onPressed: () {},
                    ),
                  ),
                ),
                dartSource: _basicSlotsDart,
              ),
              const SizedBox(height: 16),
              WashShowcaseTabs(
                preview: WashNavbar(
                  child: Row(
                    children: [
                      const Expanded(
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: WashNavbarBrand('Menzies Design'),
                        ),
                      ),
                      WashTooltip(
                        message: 'More',
                        prefer: WashTooltipSide.left,
                        child: WashButton(
                          variant: WashButtonVariant.ghost,
                          square: true,
                          onPressed: () {},
                          child: const WashLucideIcon('menu', size: 20),
                        ),
                      ),
                    ],
                  ),
                ),
                dartSource: _basicMoreDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · With menu',
          title: 'Horizontal menu links',
          description: 'Pair navbar with menu-horizontal',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: WashNavbar(
              start: const WashNavbarStart(
                child: WashNavbarBrand('Menzies Design'),
              ),
              end: WashNavbarEnd(
                child: WashMenu(
                  orientation: WashMenuOrientation.horizontal,
                  bordered: false,
                  shadow: false,
                  size: WashMenuSize.sm,
                  children: [
                    WashMenuItem(
                      label: 'Plates',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                    WashDropdown(
                      trigger: WashMenuItem(
                        label: 'Pigments',
                        size: WashMenuSize.sm,
                        onPressed: () {},
                      ),
                      panel: WashDropdownMenuPanel(
                        items: [
                          WashDropdownMenuItem(
                            label: 'Ultramarine',
                            onTap: () {},
                          ),
                          WashDropdownMenuItem(
                            label: 'Yellow ochre',
                            onTap: () {},
                          ),
                        ],
                      ),
                    ),
                    WashMenuItem(
                      label: 'Series',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ),
            dartSource: _menuDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · With search',
          title: 'Join input and button',
          description:
              'Search fields use join so input and button are direct siblings',
          tint: WashGalleryPanelTint.blue,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final inputW = constraints.maxWidth >= 640 ? 192.0 : 128.0;
                return WashNavbar(
                  start: const WashNavbarStart(
                    child: WashNavbarBrand('Menzies Design'),
                  ),
                  end: WashNavbarEnd(
                    child: WashJoin(
                      children: [
                        SizedBox(
                          width: inputW,
                          child: const WashJoinInput(
                            hint: 'Search washes…',
                          ),
                        ),
                        WashButton(
                          joinItem: true,
                          onPressed: () {},
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              WashLucideIcon('search', size: 16),
                              SizedBox(width: 8),
                              Text('Search'),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
            dartSource: _searchDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Dropdown / avatar',
          title: 'Account menu',
          description:
              'Focus dropdown with dropdown-end closes when focus leaves (click',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final searchW = constraints.maxWidth >= 768 ? null : 96.0;
                return WashNavbar(
                  child: Row(
                    children: [
                      const Expanded(
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: WashNavbarBrand('Menzies Design'),
                        ),
                      ),
                      SizedBox(
                        width: searchW ?? 180,
                        child: WashJoinInput(
                          hint: 'Search plates…',
                          joinItem: false,
                          width: searchW ?? 180,
                        ),
                      ),
                      const SizedBox(width: 8),
                      WashDropdown(
                        align: WashDropdownAlign.end,
                        trigger: WashButton(
                          variant: WashButtonVariant.ghost,
                          circle: true,
                          onPressed: () {},
                          child: Container(
                            width: 40,
                            height: 40,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color:
                                  tokens.palette.info.withValues(alpha: 0.45),
                              shape: BoxShape.circle,
                            ),
                            child: Text(
                              'MK',
                              style: WashTypography.body(tokens.onSurface)
                                  .copyWith(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                        panel: WashDropdownMenuPanel(
                          items: [
                            WashDropdownMenuItem(
                              label: 'Profile',
                              trailing: const WashBadge(
                                'New',
                                size: WashBadgeSize.sm,
                              ),
                              onTap: () {},
                            ),
                            WashDropdownMenuItem(
                              label: 'Studio prefs',
                              onTap: () {},
                            ),
                            WashDropdownMenuItem(
                              label: 'Sign out',
                              onTap: () {},
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
            dartSource: _avatarDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Icon buttons',
          title: 'Tooltips on icon-only actions',
          description: 'Icon-only controls wrap in matching tooltip colors',
          child: WashShowcaseTabs(
            preview: WashNavbar(
              start: WashNavbarStart(
                child: WashDropdown(
                  trigger: WashButton(
                    variant: WashButtonVariant.ghost,
                    square: true,
                    onPressed: () {},
                    child: const WashLucideIcon('menu', size: 20),
                  ),
                  panel: WashDropdownMenuPanel(
                    items: [
                      WashDropdownMenuItem(label: 'Desk', onTap: () {}),
                      WashDropdownMenuItem(label: 'Palette', onTap: () {}),
                      WashDropdownMenuItem(label: 'Layers', onTap: () {}),
                    ],
                  ),
                ),
              ),
              center: const WashNavbarCenter(
                child: WashNavbarBrand('Menzies Design'),
              ),
              end: WashNavbarEnd(
                gap: 4,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    WashTooltip(
                      message: 'Search',
                      prefer: WashTooltipSide.bottom,
                      child: WashButton(
                        variant: WashButtonVariant.ghost,
                        tint: WashButtonVariant.primary,
                        square: true,
                        onPressed: () {},
                        child: const WashLucideIcon('search', size: 20),
                      ),
                    ),
                    WashTooltip(
                      message: 'Notifications',
                      prefer: WashTooltipSide.bottom,
                      child: WashButton(
                        variant: WashButtonVariant.ghost,
                        tint: WashButtonVariant.secondary,
                        square: true,
                        onPressed: () {},
                        child: WashIndicator(
                          marks: const [
                            WashIndicatorMark(
                              child: WashBadge(
                                '',
                                size: WashBadgeSize.xs,
                                tone: WashBadgeTone.primary,
                              ),
                            ),
                          ],
                          child: const WashLucideIcon('bell', size: 20),
                        ),
                      ),
                    ),
                    WashTooltip(
                      message: 'Cart',
                      prefer: WashTooltipSide.bottom,
                      child: WashButton(
                        variant: WashButtonVariant.ghost,
                        tint: WashButtonVariant.accent,
                        square: true,
                        onPressed: () {},
                        child: WashIndicator(
                          marks: const [
                            WashIndicatorMark(
                              child: WashBadge('3', size: WashBadgeSize.sm),
                            ),
                          ],
                          child: const WashLucideIcon('shopping-bag', size: 20),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            dartSource: _iconsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio Menzies Design',
          title: 'Brand and pigment tools',
          description:
              'A watercolor desk bar: brand, tool join strip, and semantic icon',
          tint: WashGalleryPanelTint.blue,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final showDesk = constraints.maxWidth >= 640;
                final showTools = constraints.maxWidth >= 768;
                return WashNavbar(
                  start: WashNavbarStart(
                    gap: 8,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashNavbarBrand('Menzies Design'),
                        if (showDesk)
                          Text(
                            'Pigment desk',
                            style: WashTypography.label(tokens.inkMuted),
                          ),
                      ],
                    ),
                  ),
                  center: showTools
                      ? WashNavbarCenter(
                          child: WashJoin(
                            children: [
                              for (final t in _studioTools)
                                WashTooltip(
                                  message: t.$2,
                                  prefer: WashTooltipSide.bottom,
                                  child: WashButton(
                                    variant: WashButtonVariant.ghost,
                                    square: true,
                                    joinItem: true,
                                    onPressed: () {},
                                    child: WashLucideIcon(t.$1, size: 16),
                                  ),
                                ),
                            ],
                          ),
                        )
                      : const SizedBox.shrink(),
                  end: WashNavbarEnd(
                    gap: 4,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        WashTooltip(
                          message: 'Layers',
                          prefer: WashTooltipSide.bottom,
                          child: WashButton(
                            variant: WashButtonVariant.ghost,
                            tint: WashButtonVariant.primary,
                            square: true,
                            onPressed: () {},
                            child: const WashLucideIcon('layers', size: 16),
                          ),
                        ),
                        WashTooltip(
                          message: 'Palette',
                          prefer: WashTooltipSide.bottom,
                          child: WashButton(
                            variant: WashButtonVariant.ghost,
                            tint: WashButtonVariant.secondary,
                            square: true,
                            onPressed: () {},
                            child: const WashLucideIcon('palette', size: 16),
                          ),
                        ),
                        const SizedBox(width: 4),
                        WashAvatarPlaceholder('WF', size: 36),
                      ],
                    ),
                  ),
                );
              },
            ),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Colors',
          title: 'Background variants',
          description: 'Semantic fills inside the panel',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (final tone in _colorTones) ...[
                WashShowcaseTabs(
                  preview: WashNavbar(
                    tone: tone.$1,
                    softBorder: true,
                    child: const WashNavbarBrand('Menzies Design'),
                  ),
                  dartSource:
                      'WashNavbar(tone: WashNavbarTone.${tone.$1.name})',
                ),
                const SizedBox(height: 12),
              ],
              Text(
                'Sticky tip: use sticky top-0 in a page that owns its scroll, not inside this gallery under the fixed app header.',
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Responsive',
          title: 'Hamburger and collapse',
          description: 'Small screens: dropdown or collapse menu',
          tint: WashGalleryPanelTint.ochre,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: const _ResponsiveDropdownNavbar(),
                dartSource: _responsiveDropdownDart,
              ),
              const SizedBox(height: 24),
              WashShowcaseTabs(
                preview: const _ResponsiveCollapseNavbar(),
                dartSource: _responsiveCollapseDart,
              ),
              const SizedBox(height: 16),
              Text(
                'Resize below the large breakpoint to see the hamburger and collapse panel.',
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
            ],
          ),
        ),
      ],
    );
  }

  static const _studioTools = <(String, String)>[
    ('paintbrush', 'Round brush'),
    ('pencil', 'Pencil'),
    ('droplets', 'Wash dropper'),
    ('eraser', 'Kneaded eraser'),
  ];

  static const _colorTones = <(WashNavbarTone, String)>[
    (WashNavbarTone.base200, 'bg-base-200'),
    (WashNavbarTone.base300, 'bg-base-300'),
    (WashNavbarTone.neutral, 'bg-neutral'),
    (WashNavbarTone.primary, 'bg-primary'),
    (WashNavbarTone.secondary, 'bg-secondary'),
    (WashNavbarTone.accent, 'bg-accent'),
  ];

  static const _basicBrandDart =
      "WashNavbar(tone: base200, child: WashNavbarBrand('Menzies Design'))";
  static const _basicSlotsDart = 'WashNavbar(start/center/end slots)';
  static const _basicMoreDart = 'WashNavbar flex-1 brand + flex-none menu icon';
  static const _menuDart = 'WashNavbar + WashMenu(orientation: horizontal)';
  static const _searchDart =
      'WashNavbarEnd + WashJoin(WashJoinInput, Search button)';
  static const _avatarDart = 'WashDropdown(align: end) + avatar trigger';
  static const _iconsDart = 'Tooltips + WashIndicator badges on icon buttons';
  static const _studioDart = 'Studio pigment desk navbar with tool join';
  static const _responsiveDropdownDart =
      'lg:hidden hamburger dropdown + lg menu-horizontal';
  static const _responsiveCollapseDart = 'WashNavbarCollapse hamburger panel';
}

class _ResponsiveDropdownNavbar extends StatelessWidget {
  const _ResponsiveDropdownNavbar();

  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.sizeOf(context).width >= 1024;
    return WashNavbar(
      start: WashNavbarStart(
        gap: 4,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (!wide)
              WashDropdown(
                trigger: WashButton(
                  variant: WashButtonVariant.ghost,
                  square: true,
                  onPressed: () {},
                  child: const WashLucideIcon('menu', size: 20),
                ),
                panel: WashDropdownMenuPanel(
                  items: [
                    WashDropdownMenuItem(label: 'Item 1', onTap: () {}),
                    WashDropdownMenuItem(label: 'Parent', onTap: () {}),
                    WashDropdownMenuItem(label: 'Submenu 1', onTap: () {}),
                    WashDropdownMenuItem(label: 'Submenu 2', onTap: () {}),
                    WashDropdownMenuItem(label: 'Item 3', onTap: () {}),
                  ],
                ),
              ),
            const WashNavbarBrand('Menzies Design'),
          ],
        ),
      ),
      center: wide
          ? WashNavbarCenter(
              child: WashMenu(
                orientation: WashMenuOrientation.horizontal,
                bordered: false,
                shadow: false,
                size: WashMenuSize.sm,
                children: [
                  WashMenuItem(
                    label: 'Item 1',
                    size: WashMenuSize.sm,
                    onPressed: () {},
                  ),
                  WashDropdown(
                    trigger: WashMenuItem(
                      label: 'Parent',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                    panel: WashDropdownMenuPanel(
                      width: 160,
                      items: [
                        WashDropdownMenuItem(
                          label: 'Submenu 1',
                          onTap: () {},
                        ),
                        WashDropdownMenuItem(
                          label: 'Submenu 2',
                          onTap: () {},
                        ),
                      ],
                    ),
                  ),
                  WashMenuItem(
                    label: 'Item 3',
                    size: WashMenuSize.sm,
                    onPressed: () {},
                  ),
                ],
              ),
            )
          : const SizedBox.shrink(),
      end: WashNavbarEnd(
        child: WashButton(
          label: 'Open plate',
          variant: WashButtonVariant.defaultVariant,
          onPressed: () {},
        ),
      ),
    );
  }
}

class _ResponsiveCollapseNavbar extends StatelessWidget {
  const _ResponsiveCollapseNavbar();

  @override
  Widget build(BuildContext context) {
    return WashNavbarCollapse(
      barBuilder: (context, {required open, required wide, required onToggle}) {
        return Row(
          children: [
            WashNavbarStart(
              gap: 4,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (!wide)
                    WashButton(
                      variant: WashButtonVariant.ghost,
                      square: true,
                      onPressed: onToggle,
                      child: const WashLucideIcon('menu', size: 20),
                    ),
                  const WashNavbarBrand('Menzies Design'),
                ],
              ),
            ),
            if (wide)
              WashNavbarCenter(
                child: WashMenu(
                  orientation: WashMenuOrientation.horizontal,
                  bordered: false,
                  shadow: false,
                  size: WashMenuSize.sm,
                  children: [
                    WashMenuItem(
                      label: 'Item 1',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Item 2',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                    WashMenuItem(
                      label: 'Item 3',
                      size: WashMenuSize.sm,
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            WashNavbarEnd(
              child: SizedBox(
                width: wide ? 160 : 112,
                child: const WashJoinInput(
                  hint: 'Search',
                  joinItem: false,
                  size: WashButtonSize.sm,
                ),
              ),
            ),
          ],
        );
      },
      panel: WashMenu(
        bordered: true,
        shadow: false,
        children: [
          WashMenuItem(label: 'Item 1', onPressed: () {}),
          WashMenuBranch(
            label: 'Parent',
            children: [
              WashMenuItem(label: 'Submenu 1', onPressed: () {}),
              WashMenuItem(label: 'Submenu 2', onPressed: () {}),
            ],
          ),
          WashMenuItem(label: 'Item 3', onPressed: () {}),
        ],
      ),
    );
  }
}
