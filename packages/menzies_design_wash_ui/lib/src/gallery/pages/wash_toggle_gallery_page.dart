import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/toggle/wash_toggle.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashToggleGalleryPage extends StatelessWidget {
  const WashToggleGalleryPage({super.key});

  static const _colors = <(String, WashToggleTone)>[
    ('Default', WashToggleTone.defaultTone),
    ('Primary', WashToggleTone.primary),
    ('Secondary', WashToggleTone.secondary),
    ('Accent', WashToggleTone.accent),
    ('Neutral', WashToggleTone.neutral),
    ('Success', WashToggleTone.success),
    ('Warning', WashToggleTone.warning),
    ('Info', WashToggleTone.info),
    ('Error', WashToggleTone.error),
  ];

  static const _sizes = <(String, WashToggleSize)>[
    ('XS', WashToggleSize.xs),
    ('SM', WashToggleSize.sm),
    ('MD', WashToggleSize.md),
    ('LG', WashToggleSize.lg),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Toggle',
      description: 'daisyUI toggle switches for on and off studio settings.',
      sections: [
        _s(
            '01 · Basic',
            'On and off',
            'Unchecked and checked states with the default theme color',
            const _BasicDemo(),
            _basicDart),
        _s(
            '02 · Sizes',
            'Size scale',
            'From compact desk chrome to large touch targets',
            _sizesRow(),
            _sizesDart),
        _s('03 · Colors', 'Semantic colors',
            'Primary through error, each shown on', _colorsRow(), _colorsDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '04 · Disabled',
            'Disabled states',
            'Off and on when the control cannot change',
            _disabledRow(),
            _disabledDart),
        _s(
            '05 · Labels',
            'With label and fieldset',
            'Pair toggle with label or fieldset for form use',
            const _LabelsDemo(),
            _labelsDart),
        _s(
            '06 · Studio',
            'Brush and layer switches',
            'Wet edges, pressure, and layer visibility in the spirit of Brushes',
            const _StudioDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '07 · Interactive',
            'Controlled state',
            'State drives the switch; flip from the control or a button',
            const _InteractiveDemo(),
            _interactiveDart),
        _s(
            '08 · Icons',
            'Icons inside',
            'Label-wrapped toggle with check and clear marks',
            _iconsRow(),
            _iconsDart),
        _s(
            '09 · Responsive',
            'Stack and row',
            'Narrow screens stack; wider layouts sit in a row',
            const _ResponsiveDemo(),
            _responsiveDart,
            tint: WashGalleryPanelTint.ochre),
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

  static const _basicDart = '''
WashToggle(value: false, onChanged: setOff);
WashToggle(value: true, onChanged: setOn);
''';

  static const _sizesDart = '''
WashToggle(
  value: true,
  size: WashToggleSize.lg,
  tone: WashToggleTone.primary,
  onChanged: (_) {},
);
''';

  static Widget _sizesRow() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final s in _sizes)
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashToggle(
                value: true,
                onChanged: (_) {},
                tone: WashToggleTone.primary,
                size: s.$2,
                semanticLabel: s.$1,
              ),
              const SizedBox(height: 8),
              Text(
                s.$1,
                style:
                    const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4),
              WashToggleClassLabel(washToggleClassLabel(size: s.$2)),
            ],
          ),
      ],
    );
  }

  static const _colorsDart = '''
WashToggle(
  value: true,
  tone: WashToggleTone.primary,
  onChanged: (_) {},
);
''';

  static Widget _colorsRow() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final c in _colors)
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashToggle(
                value: true,
                onChanged: (_) {},
                tone: c.$2,
                semanticLabel: c.$1,
              ),
              const SizedBox(height: 8),
              Text(
                c.$1,
                style:
                    const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4),
              WashToggleClassLabel(
                c.$2 == WashToggleTone.defaultTone
                    ? 'toggle'
                    : washToggleClassLabel(tone: c.$2),
              ),
            ],
          ),
      ],
    );
  }

  static Widget _disabledRow() {
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashToggle(
              value: false,
              disabled: true,
              onChanged: (_) {},
              semanticLabel: 'Disabled off',
            ),
            const SizedBox(height: 8),
            const WashToggleClassLabel('disabled'),
            const SizedBox(height: 4),
            const Text('Disabled off', style: TextStyle(fontSize: 12)),
          ],
        ),
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashToggle(
              value: true,
              disabled: true,
              tone: WashToggleTone.primary,
              onChanged: (_) {},
              semanticLabel: 'Disabled on',
            ),
            const SizedBox(height: 8),
            const WashToggleClassLabel('disabled checked'),
            const SizedBox(height: 4),
            const Text('Disabled on', style: TextStyle(fontSize: 12)),
          ],
        ),
      ],
    );
  }

  static const _disabledDart = '''
WashToggle(value: false, disabled: true, onChanged: (_) {});
WashToggle(
  value: true,
  disabled: true,
  tone: WashToggleTone.primary,
  onChanged: (_) {},
);
''';

  static const _labelsDart = '''
WashFieldsetInkPanel(
  legend: 'Wash preferences',
  children: [
    WashToggleFieldLabel(
      caption: 'Auto dry brush',
      toggle: WashToggle(
        value: true,
        tone: WashToggleTone.primary,
        onChanged: setAuto,
      ),
    ),
  ],
);
''';

  static const _studioDart = '''
WashToggle(
  value: wetEdges,
  tone: WashToggleTone.primary,
  onChanged: setWetEdges,
  semanticLabel: 'Wet edges',
);
''';

  static const _interactiveDart = '''
WashToggle(
  value: on,
  size: WashToggleSize.lg,
  tone: WashToggleTone.accent,
  onChanged: setOn,
);
WashButton(
  label: 'Flip from button',
  variant: WashButtonVariant.outline,
  size: WashButtonSize.sm,
  onPressed: () => setOn(!on),
);
''';

  static Widget _iconsRow() {
    return Wrap(
      spacing: 24,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        const _IconToggleDemo(),
        const WashToggleClassLabel('label.toggle + icons'),
      ],
    );
  }

  static const _iconsDart = '''
WashToggle(
  value: true,
  onChanged: setOn,
  offIcon: WashLucideIcon('check', size: 12, strokeWidth: 3),
  onIcon: WashLucideIcon('x', size: 12, strokeWidth: 3),
);
''';

  static const _responsiveDart = '''
WashToggle(
  value: true,
  tone: WashToggleTone.primary,
  size: isMd ? WashToggleSize.md : WashToggleSize.lg,
  onChanged: (_) {},
);
''';
}

class _BasicDemo extends StatefulWidget {
  const _BasicDemo();

  @override
  State<_BasicDemo> createState() => _BasicDemoState();
}

class _BasicDemoState extends State<_BasicDemo> {
  bool _off = false;
  bool _on = true;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashToggle(
              value: _off,
              onChanged: (v) => setState(() => _off = v),
              semanticLabel: 'Off',
            ),
            const SizedBox(height: 8),
            const WashToggleClassLabel('toggle'),
            const SizedBox(height: 4),
            Text('Off', style: TextStyle(fontSize: 12, color: tokens.inkMuted)),
          ],
        ),
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashToggle(
              value: _on,
              onChanged: (v) => setState(() => _on = v),
              semanticLabel: 'On',
            ),
            const SizedBox(height: 8),
            const WashToggleClassLabel('toggle (checked)'),
            const SizedBox(height: 4),
            Text('On', style: TextStyle(fontSize: 12, color: tokens.inkMuted)),
          ],
        ),
      ],
    );
  }
}

class _LabelsDemo extends StatefulWidget {
  const _LabelsDemo();

  @override
  State<_LabelsDemo> createState() => _LabelsDemoState();
}

class _LabelsDemoState extends State<_LabelsDemo> {
  bool _auto = true;
  bool _snap = false;
  bool _bleed = true;
  bool _notify = true;
  bool _autosave = false;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        const gap = 24.0;
        final panelW =
            twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        final tokens = WashTokens.of(context);
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: panelW,
              child: WashFieldsetInkPanel(
                legend: 'Wash preferences',
                maxWidth: panelW,
                children: [
                  WashToggleFieldLabel(
                    caption: 'Auto dry brush',
                    toggle: WashToggle(
                      value: _auto,
                      tone: WashToggleTone.primary,
                      onChanged: (v) => setState(() => _auto = v),
                    ),
                  ),
                  WashToggleFieldLabel(
                    caption: 'Snap to grid',
                    toggle: WashToggle(
                      value: _snap,
                      tone: WashToggleTone.accent,
                      onChanged: (v) => setState(() => _snap = v),
                    ),
                  ),
                  WashToggleFieldLabel(
                    caption: 'Show bleed margin',
                    toggle: WashToggle(
                      value: _bleed,
                      tone: WashToggleTone.secondary,
                      onChanged: (v) => setState(() => _bleed = v),
                    ),
                  ),
                  const WashFieldsetHelper('Optional studio chrome'),
                ],
              ),
            ),
            SizedBox(
              width: panelW,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: tokens.surface.withValues(alpha: 0.8),
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                  border: Border.all(color: tokens.inkBorder),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const WashGalleryLabelInk('Inline label'),
                      const SizedBox(height: 12),
                      WashToggle(
                        value: _notify,
                        size: WashToggleSize.sm,
                        tone: WashToggleTone.info,
                        label: 'Notify when washes finish drying',
                        onChanged: (v) => setState(() => _notify = v),
                      ),
                      const SizedBox(height: 12),
                      WashToggle(
                        value: _autosave,
                        size: WashToggleSize.sm,
                        tone: WashToggleTone.success,
                        label: 'Autosave plate drafts',
                        onChanged: (v) => setState(() => _autosave = v),
                      ),
                      const Padding(
                        padding: EdgeInsets.only(top: 12),
                        child: WashToggleClassLabel('toggle + label'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _StudioDemo extends StatefulWidget {
  const _StudioDemo();

  @override
  State<_StudioDemo> createState() => _StudioDemoState();
}

class _StudioDemoState extends State<_StudioDemo> {
  bool _wetEdges = true;
  bool _pressure = false;
  bool _layerVisible = true;
  static const _washBlue = Color(0xFF4A7FA8);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final summary = [
      _wetEdges ? 'Soft bloom on stroke edges.' : 'Hard edge mode.',
      _pressure ? 'Pressure curve on.' : 'Flat pressure.',
      _layerVisible ? 'Layer shown.' : 'Layer hidden.',
    ].join(' ');

    return LayoutBuilder(
      builder: (context, constraints) {
        final lg = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final sm = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        const gap = 16.0;
        final cols = lg ? 3 : (sm ? 2 : 1);
        final cardW = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                SizedBox(
                  width: cardW,
                  child: _StudioCard(
                    tokens: tokens,
                    washBlue: _washBlue,
                    label: 'Wet edges',
                    icon: WashLucideIcon(
                      'droplets',
                      size: 16,
                      color: tokens.palette.primary,
                      strokeWidth: 2,
                    ),
                    toggle: WashToggle(
                      value: _wetEdges,
                      tone: WashToggleTone.primary,
                      onChanged: (v) => setState(() => _wetEdges = v),
                      semanticLabel: 'Wet edges',
                    ),
                  ),
                ),
                SizedBox(
                  width: cardW,
                  child: _StudioCard(
                    tokens: tokens,
                    washBlue: _washBlue,
                    label: 'Pressure',
                    icon: WashLucideIcon(
                      'gauge',
                      size: 16,
                      color: tokens.palette.secondary,
                      strokeWidth: 2,
                    ),
                    toggle: WashToggle(
                      value: _pressure,
                      tone: WashToggleTone.secondary,
                      onChanged: (v) => setState(() => _pressure = v),
                      semanticLabel: 'Pressure',
                    ),
                  ),
                ),
                SizedBox(
                  width: lg ? cardW : constraints.maxWidth,
                  child: _StudioCard(
                    tokens: tokens,
                    washBlue: _washBlue,
                    label: 'Layer visibility',
                    icon: WashLucideIcon(
                      _layerVisible ? 'eye' : 'eye-off',
                      size: 16,
                      color: _layerVisible
                          ? tokens.palette.success
                          : tokens.palette.warning,
                      strokeWidth: 2,
                    ),
                    toggle: WashToggle(
                      value: _layerVisible,
                      tone: WashToggleTone.success,
                      onChanged: (v) => setState(() => _layerVisible = v),
                      semanticLabel: 'Layer visibility',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              summary,
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 4),
              child: WashToggleClassLabel('toggle (controlled studio)'),
            ),
          ],
        );
      },
    );
  }
}

class _StudioCard extends StatefulWidget {
  const _StudioCard({
    required this.tokens,
    required this.washBlue,
    required this.label,
    required this.icon,
    required this.toggle,
  });

  final WashTokens tokens;
  final Color washBlue;
  final String label;
  final Widget icon;
  final WashToggle toggle;

  @override
  State<_StudioCard> createState() => _StudioCardState();
}

class _StudioCardState extends State<_StudioCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = widget.tokens;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: GestureDetector(
        onTap: () => widget.toggle.onChanged(!widget.toggle.value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 120),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
            color: _hover
                ? Color.alphaBlend(
                    widget.washBlue.withValues(alpha: 0.3),
                    tokens.surface.withValues(alpha: 0.8),
                  )
                : tokens.surface.withValues(alpha: 0.8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              widget.icon,
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  widget.label,
                  style: WashTypography.label(tokens.onSurface).copyWith(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              ExcludeSemantics(child: widget.toggle),
            ],
          ),
        ),
      ),
    );
  }
}

class _InteractiveDemo extends StatefulWidget {
  const _InteractiveDemo();

  @override
  State<_InteractiveDemo> createState() => _InteractiveDemoState();
}

class _InteractiveDemoState extends State<_InteractiveDemo> {
  bool _on = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final switchRow = Wrap(
          spacing: 16,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            WashToggle(
              value: _on,
              size: WashToggleSize.lg,
              tone: WashToggleTone.accent,
              onChanged: (v) => setState(() => _on = v),
              semanticLabel: 'Interactive preview toggle',
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _on ? 'Preview wash on' : 'Preview wash off',
                  style: WashTypography.label(tokens.onSurface).copyWith(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 4),
                const WashToggleClassLabel(
                  'toggle toggle-lg toggle-accent (controlled)',
                ),
              ],
            ),
          ],
        );
        final button = WashButton(
          label: 'Flip from button',
          variant: WashButtonVariant.outline,
          size: WashButtonSize.sm,
          onPressed: () => setState(() => _on = !_on),
        );
        if (row) {
          return Row(
            children: [
              Expanded(child: switchRow),
              button,
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            switchRow,
            const SizedBox(height: 16),
            button,
          ],
        );
      },
    );
  }
}

class _IconToggleDemo extends StatefulWidget {
  const _IconToggleDemo();

  @override
  State<_IconToggleDemo> createState() => _IconToggleDemoState();
}

class _IconToggleDemoState extends State<_IconToggleDemo> {
  bool _on = true;

  @override
  Widget build(BuildContext context) {
    return WashToggle(
      value: _on,
      onChanged: (v) => setState(() => _on = v),
      semanticLabel: 'Icon toggle',
      offIcon: const WashLucideIcon('check', size: 12, strokeWidth: 3),
      onIcon: const WashLucideIcon('x', size: 12, strokeWidth: 3),
    );
  }
}

class _ResponsiveDemo extends StatelessWidget {
  const _ResponsiveDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final md = constraints.maxWidth >= WashTailwindBreakpoints.md;
        final copy = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Desktop preview mode',
              style: WashTypography.label(tokens.onSurface).copyWith(
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Use a larger switch on touch, smaller beside labels on desk.',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            ),
          ],
        );
        final control = Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashToggle(
              value: true,
              tone: WashToggleTone.primary,
              size: md ? WashToggleSize.md : WashToggleSize.lg,
              onChanged: (_) {},
              semanticLabel: 'Desktop preview',
            ),
            const SizedBox(width: 16),
            const Flexible(
              child: WashToggleClassLabel('toggle-lg md:toggle-md'),
            ),
          ],
        );
        if (md) {
          return Row(
            children: [
              Expanded(child: copy),
              control,
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            copy,
            const SizedBox(height: 16),
            control,
          ],
        );
      },
    );
  }
}
