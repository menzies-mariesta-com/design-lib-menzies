import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/drawer/wash_drawer.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDrawerGalleryPage extends StatelessWidget {
  const WashDrawerGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Drawer',
      description:
          'daisyUI drawer sidebars: checkbox toggle, end placement, responsive open, overlay, and a.',
      sections: [
        _s('01 · Basic', 'Checkbox toggle', 'drawer-toggle checkbox, drawer-content, and drawer-side', _basic(), _basicDart),
        _s('02 · drawer-end', 'Panel from the right', 'Add drawer-end so the side panel slides in from the right edge', _end(), _endDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Responsive', 'Always open on large screens', 'lg:drawer-open keeps the sidebar visible from the lg breakpoint', _responsive(), _responsiveDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Mobile overlay', 'drawer-overlay dismiss', 'The overlay sits behind the side panel', _overlay(), _overlayDart),
        _s('05 · Navbar + sidebar', 'Watercolor studio mini demo', 'A compact navbar with menu toggle and a side menu of studio links', _navbar(), _navbarDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Sizes and placement', 'Height-constrained demo frames', 'Gallery drawers sit in relative frames so page scroll still works', _sizes(), _sizesDart, tint: WashGalleryPanelTint.rose),
        _s('07 · Icon toggles', 'Menu and close with tooltips', 'Icon-only controls use Lucide Menu / X inside daisyUI tooltips', _icons(), _iconsDart),
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

  static Widget _label(String value) {
    return Text(
      value,
      style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
    );
  }

  static Widget _menuWithClose(List<String> items) {
    return Stack(
      children: [
        WashDrawerMenu(items: items),
        const Positioned(top: 8, right: 8, child: WashDrawerCloseButton()),
      ],
    );
  }

  static Widget _basic() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDrawer(
          side: _menuWithClose(['Home', 'Palette', 'Layers']),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('Main content area', style: WashTypography.body(tokens.inkMuted)),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashDrawerOpenButton(label: 'Open drawer'),
                        const SizedBox(width: 8),
                        const WashDrawerIconToggle(tip: 'Open menu'),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        _label('drawer + drawer-toggle + drawer-content + drawer-side'),
      ],
    );
  }

  static const _basicDart = '''
WashDrawer(
  side: WashDrawerMenu(items: ['Home', 'Palette', 'Layers']),
  content: WashDrawerOpenButton(label: 'Open drawer'),
)''';

  static Widget _end() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDrawer(
          end: true,
          side: const WashDrawerMenu(items: ['Pigments', 'Washes', 'Series']),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('Content stays left', style: WashTypography.body(tokens.inkMuted)),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashDrawerOpenButton(
                          label: 'Open right panel',
                          variant: WashButtonVariant.secondary,
                        ),
                        const SizedBox(width: 8),
                        const WashDrawerIconToggle(
                          tip: 'Open right menu',
                          color: WashDrawerIconToggleColor.secondary,
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        _label('drawer drawer-end'),
      ],
    );
  }

  static const _endDart = 'WashDrawer(end: true, side: WashDrawerMenu(...), …)';

  static Widget _responsive() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _label('drawer lg:drawer-open'),
            _label('drawer-button lg:hidden'),
          ],
        ),
        const SizedBox(height: 12),
        WashDrawer(
          lgOpen: true,
          frameHeight: 320,
          side: const WashDrawerMenu(items: ['Overview', 'Plates', 'Archive']),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              final hideToggle = MediaQuery.sizeOf(context).width >= WashTailwindBreakpoints.lg;
              return Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        if (!hideToggle) const WashDrawerOpenButton(label: 'Toggle', size: WashButtonSize.sm),
                        if (!hideToggle) const SizedBox(width: 8),
                        Text(
                          'Resize below lg to use the toggle',
                          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Expanded(
                      child: Center(
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            color: tokens.surface.withValues(alpha: 0.5),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: tokens.inkBorder.withValues(alpha: 0.5),
                              style: BorderStyle.solid,
                            ),
                          ),
                          child: const Padding(
                            padding: EdgeInsets.all(16),
                            child: Text('Page content'),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        Text(
          'This app shell uses the same pattern: drawer lg:drawer-open with a mobile-only menu control.',
          style: TextStyle(fontSize: 14, color: const Color(0xFF6B7280)),
        ),
      ],
    );
  }

  static const _responsiveDart = 'WashDrawer(lgOpen: true, frameHeight: 320, …)';

  static Widget _overlay() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDrawer(
          side: const WashDrawerMenu(
            title: 'Overlay closes me',
            items: ['Sketchbook', 'Wet media'],
          ),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Open the drawer, then click the dimmed area to dismiss.',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                    ),
                    const SizedBox(height: 12),
                    const WashDrawerIconToggle(tip: 'Open overlay demo'),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        _label('label.drawer-overlay[for=toggle-id]'),
      ],
    );
  }

  static const _overlayDart = 'WashDrawer(side: WashDrawerMenu(...), content: …)';

  static Widget _navbar() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDrawer(
          frameHeight: 320,
          side: const WashDrawerStudioAside(),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Column(
                children: [
                  WashDrawerStudioNavbar(
                    onMenu: () => WashDrawerScope.maybeOf(context)?.setOpen(true),
                  ),
                  Expanded(
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Pigment desk',
                            style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 20),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Open the sidebar for studio tools',
                            style: WashTypography.body(tokens.inkMuted),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        _label('navbar + drawer-side + menu'),
      ],
    );
  }

  static const _navbarDart = 'WashDrawer(frameHeight: 320, side: WashDrawerStudioAside(), …)';

  static Widget _sizes() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, c) {
            final twoCol = c.maxWidth >= WashTailwindBreakpoints.sm;
            final left = Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _label('frame h-48'),
                const SizedBox(height: 8),
                WashDrawer(
                  frameHeight: 192,
                  side: const WashDrawerMenu(items: ['A', 'B'], width: 160, padding: EdgeInsets.all(12)),
                  content: const Center(child: WashDrawerOpenButton(label: 'Short frame', size: WashButtonSize.sm)),
                ),
              ],
            );
            final right = Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _label('frame h-64 + drawer-end'),
                const SizedBox(height: 8),
                WashDrawer(
                  end: true,
                  frameHeight: 256,
                  side: const WashDrawerMenu(items: ['Right A', 'Right B'], width: 176, padding: EdgeInsets.all(12)),
                  content: Center(
                    child: WashDrawerOpenButton(
                      label: 'Tall end panel',
                      size: WashButtonSize.sm,
                      variant: WashButtonVariant.secondary,
                    ),
                  ),
                ),
              ],
            );
            if (twoCol) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: left),
                  const SizedBox(width: 16),
                  Expanded(child: right),
                ],
              );
            }
            return Column(children: [left, const SizedBox(height: 16), right]);
          },
        ),
        const SizedBox(height: 16),
        Text(
          'Demo frames use relative height and overflow-hidden. Side width is set on the menu (e.g. w-56), not by a drawer size class.',
          style: TextStyle(fontSize: 14, color: const Color(0xFF6B7280)),
        ),
      ],
    );
  }

  static const _sizesDart = 'WashDrawer(frameHeight: 192, …) · WashDrawer(end: true, frameHeight: 256, …)';

  static Widget _icons() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDrawer(
          side: _menuWithClose(['Open', 'Close', 'Repeat']),
          content: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Prefer tooltips on icon-only drawer buttons',
                      style: WashTypography.body(tokens.inkMuted),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashDrawerIconToggle(tip: 'Open menu'),
                        const SizedBox(width: 12),
                        const WashDrawerIconToggle(
                          tip: 'Toggle sidebar',
                          color: WashDrawerIconToggleColor.secondary,
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        _label('tooltip + btn-ghost btn-square + Menu / X'),
      ],
    );
  }

  static const _iconsDart = 'WashDrawerIconToggle(tip: \'Open menu\', close: false)';
}
