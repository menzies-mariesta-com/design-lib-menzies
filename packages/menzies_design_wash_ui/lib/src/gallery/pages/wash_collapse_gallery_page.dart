import 'package:flutter/widgets.dart';

import '../../components/collapse/wash_collapse.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashCollapseGalleryPage extends StatelessWidget {
  const WashCollapseGalleryPage({super.key});

  static const _studioFaq = [
    ('How wet should the paper stay?', 'Keep a soft sheen for wet-into-wet. Let the shine fade before crisp edges.'),
    ('When do I lift pigment?', 'Lift while the wash is damp. Dry lifting scuffs the tooth of the sheet.'),
    ('Why does my wash look mottled?', 'Usually too much pigment or uneven water. Dilute, then re-lay a cleaner pass.'),
  ];

  static const _washTips = [
    ('What is a wash?', 'A thin, transparent layer of pigment diluted with water, laid across the paper.', 'droplets'),
    ('How many layers should I use?', 'Build slowly. Two to four light washes usually beat one heavy pass.', 'layers'),
    ('Which pigments dry cooler?', 'Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.', 'palette'),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Collapse',
      description:
          'daisyUI collapse panels: focus, checkbox, details, arrow, plus, force states, colors, and.',
      sections: [
        _s('01 · Basic', 'Title and content', 'Minimal focus collapse with a title and body', _basic(), _basicDart),
        _s('02 · Triggers', 'Focus, checkbox, and details', 'Three ways to open and close a standalone panel', _triggers(), _triggersDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Icons', 'Arrow and plus', 'collapse-arrow and collapse-plus add built-in indicators', _icons(), _iconsDart),
        _s('04 · Force states', 'Open and close modifiers', 'collapse-open and collapse-close force visibility', _force(), _forceDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Surfaces', 'Colors, border, and join', 'Semantic fills, bordered panels, and a joined vertical stack', _surfaces(), _surfacesDart),
        _s('06 · Studio FAQ', 'Watercolor studio collapses', 'Independent checkbox panels with icons for studio tips', _studio(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Responsive', 'Stacked on small, paired on large', 'Two columns from md up; single stack on phones', _responsive(), _responsiveDart, tint: WashGalleryPanelTint.rose),
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

  static Widget _basic() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashCollapse(
          focusDriven: true,
          indicator: WashCollapseIndicator.none,
          title: Text('How do I create an account?'),
          content: Text('Click Sign Up in the top right and follow the registration steps.'),
        ),
        const SizedBox(height: 12),
        _label('collapse + collapse-title + collapse-content'),
      ],
    );
  }

  static Widget _triggers() {
    return Builder(
      builder: (context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= WashTailwindBreakpoints.lg;
            final children = [
              _triggerCell(
                const WashCollapse(
                  focusDriven: true,
                  indicator: WashCollapseIndicator.none,
                  title: Text('Focus trigger'),
                  content: Text('Opens on focus. Closes when focus leaves the panel.'),
                ),
                'collapse[tabindex=0]',
              ),
              _triggerCell(
                const WashCollapse(
                  indicator: WashCollapseIndicator.none,
                  title: Text('Checkbox trigger'),
                  content: Text('Click again to close. State stays until toggled.'),
                ),
                'collapse + input[type=checkbox]',
              ),
              _triggerCell(
                const WashCollapseDetails(
                  title: Text('Details trigger'),
                  content: Text('Native details/summary keeps content searchable.'),
                ),
                'details.collapse + summary.collapse-title',
              ),
            ];
            if (wide) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < children.length; i++) ...[
                    if (i > 0) const SizedBox(width: 16),
                    Expanded(child: children[i]),
                  ],
                ],
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var i = 0; i < children.length; i++) ...[
                  if (i > 0) const SizedBox(height: 16),
                  children[i],
                ],
              ],
            );
          },
        ),
        const SizedBox(height: 16),
        Text(
          'Checkbox with outside click to close (peer + fixed overlay label).',
          style: TextStyle(
            fontSize: 14,
            color: WashTokens.of(context).inkMuted,
          ),
        ),
        const SizedBox(height: 8),
        const WashCollapseOutsideDismiss(
          title: Text('Close on outside click'),
          content: Text('Open, then click outside the panel to dismiss.'),
        ),
        const SizedBox(height: 8),
        _label('peer + label.fixed.inset-0.peer-checked:block'),
      ],
    ),
    );
  }

  static Widget _triggerCell(Widget panel, String label) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        panel,
        const SizedBox(height: 8),
        _label(label),
      ],
    );
  }

  static Widget _icons() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= WashTailwindBreakpoints.md;
            final arrow = _triggerCell(
              const WashCollapse(
                focusDriven: true,
                title: Text('Arrow icon'),
                content: Text('Chevron rotates when the panel opens.'),
              ),
              'collapse collapse-arrow',
            );
            final plus = _triggerCell(
              const WashCollapse(
                focusDriven: true,
                indicator: WashCollapseIndicator.plus,
                title: Text('Plus / minus icon'),
                content: Text('Plus flips to minus while expanded.'),
              ),
              'collapse collapse-plus',
            );
            if (wide) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: arrow),
                  const SizedBox(width: 16),
                  Expanded(child: plus),
                ],
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [arrow, const SizedBox(height: 16), plus],
            );
          },
        ),
        const SizedBox(height: 16),
        const WashCollapse(
          focusDriven: true,
          iconOnStart: true,
          title: Text('Arrow on the start edge'),
          content: Text('after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.'),
        ),
        const SizedBox(height: 8),
        _label('collapse-title after:start-5 after:end-auto ps-12'),
      ],
    );
  }

  static Widget _force() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= WashTailwindBreakpoints.md;
            final open = _triggerCell(
              const WashCollapse(
                force: WashCollapseForce.open,
                indicator: WashCollapseIndicator.none,
                title: Text('Forced open'),
                content: Text('Always expanded via collapse-open.'),
              ),
              'collapse collapse-open',
            );
            final closed = _triggerCell(
              const WashCollapse(
                focusDriven: true,
                force: WashCollapseForce.closed,
                title: Text('Forced closed'),
                content: Text('Stays closed even when focused, via collapse-close.'),
              ),
              'collapse collapse-close',
            );
            if (wide) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: open),
                  const SizedBox(width: 16),
                  Expanded(child: closed),
                ],
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [open, const SizedBox(height: 16), closed],
            );
          },
        ),
        const SizedBox(height: 16),
        const WashCollapseDetails(
          initiallyOpen: true,
          indicator: WashCollapseIndicator.arrow,
          title: Text('Details open by default'),
          content: Text('Use the open attribute on details. collapse-open does not apply here.'),
        ),
        const SizedBox(height: 8),
        _label('details.collapse[open]'),
      ],
    );
  }

  static Widget _surfaces() {
    final faqItems = _studioFaq.map((e) => (Text(e.$1), Text(e.$2))).toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= WashTailwindBreakpoints.md;
            final cells = [
              const WashCollapseFocusColorShift(),
              const WashCollapsePeerShift(),
              const WashCollapse(
                focusDriven: true,
                title: Text('Bordered panel'),
                content: Text('border border-base-300 with bg-base-100.'),
              ),
              const WashCollapse(
                focusDriven: true,
                bordered: false,
                title: Text('Minimal (no border)'),
                content: Text('Bare collapse when the wash panel already provides the surface.'),
              ),
            ];
            if (wide) {
              return Wrap(
                spacing: 12,
                runSpacing: 12,
                children: cells
                    .map(
                      (w) => SizedBox(
                        width: (constraints.maxWidth - 12) / 2,
                        child: w,
                      ),
                    )
                    .toList(),
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var i = 0; i < cells.length; i++) ...[
                  if (i > 0) const SizedBox(height: 12),
                  cells[i],
                ],
              ],
            );
          },
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 16,
          runSpacing: 8,
          children: [
            _label('bg-primary focus:bg-secondary'),
            _label('peer + peer-checked:bg-success'),
            _label('border border-base-300'),
          ],
        ),
        const SizedBox(height: 24),
        WashCollapseJoinCheckboxGroup(items: faqItems),
        const SizedBox(height: 12),
        _label('join join-vertical + collapse join-item'),
      ],
    );
  }

  static Widget _studio() {
    final items = _washTips
        .map(
          (w) => (
            Row(
              children: [
                WashLucideIcon(w.$3, size: 16, strokeWidth: 1.75),
                const SizedBox(width: 8),
                Text(w.$1),
              ],
            ),
            Text(w.$2),
          ),
        )
        .toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashCollapseCheckboxGroup(items: items),
        const SizedBox(height: 12),
        _label('collapse collapse-arrow + checkbox'),
      ],
    );
  }

  static Widget _responsive() {
    final items = _studioFaq.map((e) => (Text(e.$1), Text(e.$2))).toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _WashCollapseResponsivePlusGrid(items: items),
        const SizedBox(height: 12),
        _label('grid gap-3 md:grid-cols-2'),
      ],
    );
  }

  static Widget _label(String value) =>
      Text(value, style: const TextStyle(fontFamily: 'monospace', fontSize: 10));

  static const _basicDart = '''
WashCollapse(
  focusDriven: true,
  indicator: WashCollapseIndicator.none,
  title: Text('How do I create an account?'),
  content: Text('...'),
);''';

  static const _triggersDart = '''
WashCollapse(focusDriven: true, ...);
WashCollapse(indicator: WashCollapseIndicator.none, ...);
WashCollapseDetails(title: ..., content: ...);
WashCollapseOutsideDismiss(title: ..., content: ...);''';

  static const _iconsDart = '''
WashCollapse(focusDriven: true, indicator: WashCollapseIndicator.arrow, ...);
WashCollapse(focusDriven: true, indicator: WashCollapseIndicator.plus, ...);
WashCollapse(iconOnStart: true, focusDriven: true, ...);''';

  static const _forceDart = '''
WashCollapse(force: WashCollapseForce.open, ...);
WashCollapse(force: WashCollapseForce.closed, focusDriven: true, ...);
WashCollapseDetails(initiallyOpen: true, indicator: WashCollapseIndicator.arrow, ...);''';

  static const _surfacesDart = '''
WashCollapseFocusColorShift();
WashCollapsePeerShift();
WashCollapseJoinCheckboxGroup(items: [...]);''';

  static const _studioDart = 'WashCollapseCheckboxGroup(items: [...]);';

  static const _responsiveDart =
      'WashCollapse(indicator: WashCollapseIndicator.plus, items in md:grid-cols-2);';
}

class _WashCollapseResponsivePlusGrid extends StatefulWidget {
  const _WashCollapseResponsivePlusGrid({required this.items});

  final List<(Widget title, Widget content)> items;

  @override
  State<_WashCollapseResponsivePlusGrid> createState() =>
      _WashCollapseResponsivePlusGridState();
}

class _WashCollapseResponsivePlusGridState extends State<_WashCollapseResponsivePlusGrid> {
  late final Set<int> _open = {0};

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= WashTailwindBreakpoints.md;
        final panels = List<Widget>.generate(widget.items.length, (i) {
          return WashCollapse(
            open: _open.contains(i),
            indicator: WashCollapseIndicator.plus,
            title: widget.items[i].$1,
            content: widget.items[i].$2,
            onOpenChanged: (v) {
              setState(() {
                if (v) {
                  _open.add(i);
                } else {
                  _open.remove(i);
                }
              });
            },
          );
        });
        if (wide) {
          return Wrap(
            spacing: 12,
            runSpacing: 12,
            children: panels
                .map(
                  (w) => SizedBox(
                    width: (constraints.maxWidth - 12) / 2,
                    child: w,
                  ),
                )
                .toList(),
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (var i = 0; i < panels.length; i++) ...[
              if (i > 0) const SizedBox(height: 12),
              panels[i],
            ],
          ],
        );
      },
    );
  }
}
