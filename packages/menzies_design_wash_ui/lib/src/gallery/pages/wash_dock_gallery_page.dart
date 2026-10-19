import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/dock/wash_dock.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDockGalleryPage extends StatelessWidget {
  const WashDockGalleryPage({super.key});

  static const _navIcons = ['house', 'inbox', 'settings'];
  static const _navLabels = ['Home', 'Inbox', 'Settings'];

  static const _sizes = <(WashDockSize, String)>[
    (WashDockSize.xs, 'dock-xs'),
    (WashDockSize.sm, 'dock-sm'),
    (WashDockSize.md, 'dock-md'),
    (WashDockSize.lg, 'dock-lg'),
    (WashDockSize.xl, 'dock-xl'),
  ];

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washRose = Color(0xFFC45C6E);

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Dock',
      description:
          'daisyUI dock bottom navigation bar: sizes, active state, colors, and a studio tool strip.',
      sections: [
        _s('01 · Basic', 'Icons and labels', 'Buttons inside dock', _basic(1), _basicDart),
        _s('02 · Active', 'Highlight one item', 'Add dock-active on the current destination', _active(), _activeDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'xs through xl', 'Size modifiers change bar height and label scale', _sizesSection(), _sizesDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Colors', 'Semantic fills and glass', 'Override background and text with daisyUI color utilities', _colors(context), _colorsDart),
        _s('05 · Studio dock', 'Watercolor tools', 'Interactive dock for palette, layers, brushes', const _StudioDockDemo(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Placement note', 'Fixed in apps, relative in demos', 'Production docks stick to the screen bottom with safe-area padding', _placement(context), _placementDart, tint: WashGalleryPanelTint.rose),
        _s('07 · Responsive', 'Labels from sm up', 'Hide dock-label on very small widths', const _ResponsiveDockDemo(), _responsiveDart),
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

  static List<WashDockItem> _navItems(int active, {bool labels = true}) {
    return List.generate(3, (i) {
      return WashDockItem(
        iconName: _navIcons[i],
        label: labels ? _navLabels[i] : null,
        active: i == active,
        onPressed: () {},
      );
    });
  }

  static Widget _basic(int active) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDock(items: _navItems(active)),
        const SizedBox(height: 12),
        _label('dock + button + dock-label'),
      ],
    );
  }

  static Widget _active() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, c) {
            final wrap = c.maxWidth < 640;
            final cells = [
              for (var i = 0; i < 3; i++)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _label('dock-active on ${_navLabels[i]}'),
                    const SizedBox(height: 8),
                    WashDock(items: _navItems(i)),
                  ],
                ),
            ];
            if (wrap) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (var i = 0; i < cells.length; i++) ...[
                    if (i > 0) const SizedBox(height: 16),
                    cells[i],
                  ],
                ],
              );
            }
            return Wrap(
              spacing: 16,
              runSpacing: 16,
              children: cells,
            );
          },
        ),
        const SizedBox(height: 12),
        _label('button.dock-active'),
      ],
    );
  }

  static Widget _sizesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final (size, className) in _sizes) ...[
          _label('dock $className'),
          const SizedBox(height: 8),
          WashDock(
            size: size,
            items: _navItems(1, labels: size != WashDockSize.xs && size != WashDockSize.sm),
          ),
          const SizedBox(height: 20),
        ],
      ],
    );
  }

  static Widget _colors(BuildContext context) {
    final tokens = WashTokens.of(context);
    final p = tokens.palette;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label('dock bg-neutral text-neutral-content'),
        const SizedBox(height: 8),
        WashDock(
          items: _navItems(1),
          backgroundColor: p.neutral,
          foregroundColor: p.neutralContent,
          borderColor: p.neutral,
        ),
        const SizedBox(height: 20),
        _label('dock bg-primary text-primary-content'),
        const SizedBox(height: 8),
        WashDock(
          items: _navItems(1),
          backgroundColor: p.primary,
          foregroundColor: p.primaryContent,
          borderColor: p.primary,
        ),
        const SizedBox(height: 20),
        _label('dock bg-secondary text-secondary-content'),
        const SizedBox(height: 8),
        WashDock(
          items: _navItems(1),
          backgroundColor: p.secondary,
          foregroundColor: p.secondaryContent,
          borderColor: p.secondary,
        ),
        const SizedBox(height: 20),
        _label('dock glass'),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                _washBlue.withValues(alpha: 0.4),
                tokens.surfaceContainer,
                _washRose.withValues(alpha: 0.3),
              ],
            ),
          ),
          child: WashDock(
            items: _navItems(1),
            glass: true,
            borderColor: tokens.onSurface.withValues(alpha: 0.1),
          ),
        ),
      ],
    );
  }

  static Widget _placement(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '• Default dock is position: fixed at the viewport bottom.\n'
          '• Use viewport-fit=cover on iOS so safe-area insets apply.\n'
          '• These wash-panel demos use relative positioning so they do not fight the studio drawer.',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14, height: 1.5),
        ),
        const SizedBox(height: 12),
        _label('dock (fixed) vs dock relative! (demo)'),
      ],
    );
  }
}

class _StudioDockDemo extends StatefulWidget {
  const _StudioDockDemo();

  @override
  State<_StudioDockDemo> createState() => _StudioDockDemoState();
}

class _StudioDockDemoState extends State<_StudioDockDemo> {
  static const _tools = [
    ('palette', 'Palette', 'palette'),
    ('layers', 'Layers', 'layers'),
    ('brushes', 'Brushes', 'paintbrush'),
    ('calendar', 'Calendar', 'calendar'),
  ];

  String _active = 'palette';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final current = _tools.firstWhere((t) => t.$1 == _active, orElse: () => _tools.first);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: washInkBorderBox(
            tokens,
            fill: tokens.surfaceContainer.withValues(alpha: 0.4),
            radius: 16,
          ),
          child: Text.rich(
            TextSpan(
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              children: [
                const TextSpan(text: 'Selected: '),
                TextSpan(
                  text: current.$2,
                  style: TextStyle(
                    color: tokens.onSurface,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        WashDock(
          items: [
            for (final (id, label, icon) in _tools)
              WashDockItem(
                iconName: icon,
                label: label,
                active: _active == id,
                onPressed: () => setState(() => _active = id),
              ),
          ],
        ),
        const SizedBox(height: 12),
        WashDockGalleryPage._label('dock + Lucide icons + dock-active (state)'),
      ],
    );
  }
}

class _ResponsiveDockDemo extends StatelessWidget {
  const _ResponsiveDockDemo();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final showLabels = c.maxWidth >= WashTailwindBreakpoints.sm;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashDock(
              maxWidth: double.infinity,
              items: [
                WashDockItem(iconName: 'house', label: showLabels ? 'Home' : null, active: true, onPressed: () {}),
                WashDockItem(iconName: 'inbox', label: showLabels ? 'Inbox' : null, onPressed: () {}),
                WashDockItem(iconName: 'settings', label: showLabels ? 'Settings' : null, onPressed: () {}),
              ],
            ),
            const SizedBox(height: 12),
            WashDockGalleryPage._label('dock-label hidden sm:inline'),
          ],
        );
      },
    );
  }
}

const _basicDart = '''
WashDock(
  items: [
    WashDockItem(iconName: 'house', label: 'Home', onPressed: () {}),
    WashDockItem(iconName: 'inbox', label: 'Inbox', active: true, onPressed: () {}),
    WashDockItem(iconName: 'settings', label: 'Settings', onPressed: () {}),
  ],
);
''';

const _activeDart = '''
WashDockItem(active: true, ...);
''';

const _sizesDart = '''
WashDock(size: WashDockSize.xs, items: [...]);
// sm, md, lg, xl
''';

const _colorsDart = '''
WashDock(backgroundColor: palette.primary, foregroundColor: palette.primaryContent);
WashDock(glass: true, ...);
''';

const _studioDart = '''
WashDockItem(onPressed: () => setState(...), active: selected);
''';

const _placementDart = '''
WashDock(embeddedDemo: false); // fixed to viewport bottom in apps
''';

const _responsiveDart = '''
// LayoutBuilder: hide labels when width < sm breakpoint
''';
