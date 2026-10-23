import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/select/wash_select.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashSelectGalleryPage extends StatelessWidget {
  const WashSelectGalleryPage({super.key});

  static const _colors = <(String, WashSelectTone)>[
    ('Default', WashSelectTone.defaultTone),
    ('Neutral', WashSelectTone.neutral),
    ('Primary', WashSelectTone.primary),
    ('Secondary', WashSelectTone.secondary),
    ('Accent', WashSelectTone.accent),
    ('Info', WashSelectTone.info),
    ('Success', WashSelectTone.success),
    ('Warning', WashSelectTone.warning),
    ('Error', WashSelectTone.error),
  ];

  static const _sizes = <(String, WashSelectSize)>[
    ('XS', WashSelectSize.xs),
    ('SM', WashSelectSize.sm),
    ('MD', WashSelectSize.md),
    ('LG', WashSelectSize.lg),
    ('XL', WashSelectSize.xl),
  ];

  static const _pigments = <WashSelectOption<String>>[
    WashSelectOption(value: 'ultramarine', label: 'Ultramarine'),
    WashSelectOption(value: 'ochre', label: 'Yellow ochre'),
    WashSelectOption(value: 'alizarin', label: 'Alizarin crimson'),
    WashSelectOption(value: 'viridian', label: 'Viridian'),
  ];

  static const _pigmentGroups = <WashSelectOptionGroup<String>>[
    WashSelectOptionGroup(
      label: 'Blues',
      options: [
        WashSelectOption(value: 'ultramarine', label: 'Ultramarine'),
        WashSelectOption(value: 'cerulean', label: 'Cerulean'),
        WashSelectOption(value: 'cobalt', label: 'Cobalt'),
      ],
    ),
    WashSelectOptionGroup(
      label: 'Earths',
      options: [
        WashSelectOption(value: 'ochre', label: 'Yellow ochre'),
        WashSelectOption(value: 'sienna', label: 'Burnt sienna'),
        WashSelectOption(value: 'umber', label: 'Raw umber'),
      ],
    ),
    WashSelectOptionGroup(
      label: 'Reds',
      options: [
        WashSelectOption(value: 'alizarin', label: 'Alizarin crimson'),
        WashSelectOption(value: 'cadmium-red', label: 'Cadmium red'),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Select',
      description:
          'Wash UI select: daisyUI-styled trigger with a custom listbox menu (viewport placement, outside click, Escape). Not the native OS picker.',
      sections: [
        _s(
          '01 · Default',
          'Base select',
          'Custom dropdown with placeholder',
          const _BaseDemo(),
          _baseDart,
        ),
        _s(
          '02 · Ghost',
          'Ghost style',
          'Borderless select for quiet UI surfaces',
          const _GhostDemo(),
          _ghostDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Colors',
          'Semantic colors',
          'Neutral through error border accents on the trigger',
          const _ColorsDemo(),
          _colorsDart,
        ),
        _s(
          '04 · Sizes',
          'Size scale',
          'From compact menus to XL',
          const _SizesDemo(),
          _sizesDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '05 · Disabled',
          'Disabled state',
          'Locked selects for read-only plate metadata',
          _disabled(),
          _disabledDart,
        ),
        _s(
          '06 · Groups',
          'Option groups',
          'Grouped listbox sections for pigment families',
          const _GroupsDemo(),
          _groupsDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '07 · Fieldset',
          'Labeled fields',
          'Fieldset with required-style labels on paper',
          const _FieldsetDemo(),
          _fieldsetDart,
        ),
        _s(
          '08 · Form',
          'Studio intake form',
          'Multiple selects in a short wash intake layout',
          const _FormDemo(),
          _formDart,
          tint: WashGalleryPanelTint.rose,
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
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(
        preview: Align(alignment: Alignment.topLeft, child: preview),
        dartSource: dart,
      ),
    );
  }

  static Widget _disabled() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ConstrainedBox(
          constraints: BoxConstraints(maxWidth: 512),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashSelect<String>(
                options: [
                  WashSelectOption(value: 'ochre', label: 'Yellow ochre'),
                  WashSelectOption(value: 'ultramarine', label: 'Ultramarine'),
                ],
                value: 'ochre',
                disabled: true,
                onChanged: _noop,
                semanticLabel: 'Disabled select',
              ),
              WashSelectClassLabel('disabled'),
              SizedBox(height: 16),
              WashSelect<String>(
                options: [
                  WashSelectOption(value: 'viridian', label: 'Viridian'),
                ],
                value: '',
                placeholder: 'Unavailable…',
                tone: WashSelectTone.primary,
                disabled: true,
                onChanged: _noop,
                semanticLabel: 'Disabled primary select',
              ),
              WashSelectClassLabel('Select select-primary disabled'),
            ],
          ),
        ),
      ],
    );
  }

  static const _baseDart = '''
WashSelect(
  options: pigments,
  value: base,
  onChanged: setBase,
  placeholder: 'Pick a pigment…',
  semanticLabel: 'Base select',
)
''';

  static const _ghostDart = '''
WashSelect(
  options: pigments,
  value: ghost,
  onChanged: setGhost,
  tone: WashSelectTone.ghost,
)
''';

  static const _colorsDart = '''
WashSelect(tone: WashSelectTone.primary, options: pigments, onChanged: setValue)
''';

  static const _sizesDart = '''
WashSelect(
  tone: WashSelectTone.primary,
  size: WashSelectSize.lg,
  options: pigments,
  onChanged: setValue,
)
''';

  static const _disabledDart = '''
WashSelect(value: 'ochre', disabled: true, options: pigments, onChanged: (_) {})
WashSelect(
  placeholder: 'Unavailable…',
  tone: WashSelectTone.primary,
  disabled: true,
  options: pigments,
  onChanged: (_) {},
)
''';

  static const _groupsDart = '''
WashSelect(
  groups: pigmentGroups,
  options: const [],
  placeholder: 'Choose from a family…',
  tone: WashSelectTone.secondary,
  onChanged: setGrouped,
)
''';

  static const _fieldsetDart = '''
WashFieldsetInkPanel(
  legend: 'Plate filters',
  children: [
    WashSelect(label: 'Series', requiredMark: true, tone: WashSelectTone.primary, ...),
    WashSelect(label: 'Status', ...),
  ],
)
''';

  static const _formDart = '''
WashSelect(label: 'Medium', requiredMark: true, tone: WashSelectTone.accent, ...)
WashSelect(label: 'Paper weight', tone: WashSelectTone.info, ...)
WashSelect(label: 'Finish', tone: WashSelectTone.ghost, ...)
''';
}

void _noop(String? _) {}

class _BaseDemo extends StatefulWidget {
  const _BaseDemo();

  @override
  State<_BaseDemo> createState() => _BaseDemoState();
}

class _BaseDemoState extends State<_BaseDemo> {
  String? _base;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashSelect<String>(
            options: WashSelectGalleryPage._pigments,
            value: _base,
            onChanged: (v) => setState(() => _base = v),
            placeholder: 'Pick a pigment…',
            semanticLabel: 'Base select',
          ),
          const WashSelectClassLabel('Select'),
        ],
      ),
    );
  }
}

class _GhostDemo extends StatefulWidget {
  const _GhostDemo();

  @override
  State<_GhostDemo> createState() => _GhostDemoState();
}

class _GhostDemoState extends State<_GhostDemo> {
  String? _ghost = 'ochre';

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashSelect<String>(
            options: WashSelectGalleryPage._pigments.take(3).toList(),
            value: _ghost,
            onChanged: (v) => setState(() => _ghost = v),
            tone: WashSelectTone.ghost,
            semanticLabel: 'Ghost select',
          ),
          const WashSelectClassLabel('Select className=select-ghost'),
        ],
      ),
    );
  }
}

class _ColorsDemo extends StatefulWidget {
  const _ColorsDemo();

  @override
  State<_ColorsDemo> createState() => _ColorsDemoState();
}

class _ColorsDemoState extends State<_ColorsDemo> {
  late Map<String, String> _values;

  @override
  void initState() {
    super.initState();
    _values = {
      for (final c in WashSelectGalleryPage._colors) c.$1: 'ultramarine',
    };
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= WashTailwindBreakpoints.lg
            ? 3
            : (constraints.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
        const gap = 16.0;
        final w = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final c in WashSelectGalleryPage._colors)
              SizedBox(
                width: w,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    WashSelect<String>(
                      options: [
                        WashSelectOption(value: 'ultramarine', label: c.$1),
                        const WashSelectOption(
                            value: 'ochre', label: 'Yellow ochre'),
                        const WashSelectOption(
                            value: 'alizarin', label: 'Alizarin crimson'),
                      ],
                      value: _values[c.$1] ?? 'ultramarine',
                      onChanged: (v) {
                        if (v == null) return;
                        setState(() => _values[c.$1] = v);
                      },
                      tone: c.$2,
                      semanticLabel: c.$1,
                    ),
                    WashSelectClassLabel(
                      c.$2 == WashSelectTone.defaultTone
                          ? 'Select'
                          : 'Select select-${c.$2.name}',
                    ),
                  ],
                ),
              ),
          ],
        );
      },
    );
  }
}

class _SizesDemo extends StatefulWidget {
  const _SizesDemo();

  @override
  State<_SizesDemo> createState() => _SizesDemoState();
}

class _SizesDemoState extends State<_SizesDemo> {
  late Map<String, String> _values;

  @override
  void initState() {
    super.initState();
    _values = {
      for (final s in WashSelectGalleryPage._sizes) s.$1: 'ultramarine',
    };
  }

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final s in WashSelectGalleryPage._sizes) ...[
            Row(
              children: [
                SizedBox(width: 32, child: WashGalleryLabelInk(s.$1)),
                const SizedBox(width: 12),
                Expanded(
                  child: WashSelect<String>(
                    options: [
                      WashSelectOption(
                          value: 'ultramarine', label: '${s.$1} select'),
                      const WashSelectOption(
                          value: 'ochre', label: 'Yellow ochre'),
                      const WashSelectOption(
                          value: 'alizarin', label: 'Alizarin crimson'),
                    ],
                    value: _values[s.$1] ?? 'ultramarine',
                    onChanged: (v) {
                      if (v == null) return;
                      setState(() => _values[s.$1] = v);
                    },
                    tone: WashSelectTone.primary,
                    size: s.$2,
                    semanticLabel: '${s.$1} select',
                  ),
                ),
              ],
            ),
            WashSelectClassLabel('Select select-primary select-${s.$2.name}'),
            const SizedBox(height: 16),
          ],
        ],
      ),
    );
  }
}

class _GroupsDemo extends StatefulWidget {
  const _GroupsDemo();

  @override
  State<_GroupsDemo> createState() => _GroupsDemoState();
}

class _GroupsDemoState extends State<_GroupsDemo> {
  String? _grouped;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashSelect<String>(
            options: const [],
            groups: WashSelectGalleryPage._pigmentGroups,
            value: _grouped,
            onChanged: (v) => setState(() => _grouped = v),
            placeholder: 'Choose from a family…',
            tone: WashSelectTone.secondary,
            semanticLabel: 'Grouped pigments',
          ),
          const WashSelectClassLabel('Select + option groups'),
        ],
      ),
    );
  }
}

class _FieldsetDemo extends StatefulWidget {
  const _FieldsetDemo();

  @override
  State<_FieldsetDemo> createState() => _FieldsetDemoState();
}

class _FieldsetDemoState extends State<_FieldsetDemo> {
  String? _series;
  String? _status = 'draft';

  @override
  Widget build(BuildContext context) {
    return WashFieldsetInkPanel(
      legend: 'Plate filters',
      children: [
        WashSelect<String>(
          label: 'Series',
          requiredMark: true,
          options: const [
            WashSelectOption(value: 'atlantic', label: 'Atlantic Studies'),
            WashSelectOption(value: 'fog', label: 'Coastal Fog'),
            WashSelectOption(value: 'meadow', label: 'Meadow Light'),
          ],
          value: _series,
          onChanged: (v) => setState(() => _series = v),
          placeholder: 'Select a series…',
          tone: WashSelectTone.primary,
        ),
        WashSelect<String>(
          label: 'Status',
          options: const [
            WashSelectOption(value: 'draft', label: 'Draft'),
            WashSelectOption(value: 'drying', label: 'Drying'),
            WashSelectOption(value: 'varnished', label: 'Varnished'),
            WashSelectOption(value: 'archived', label: 'Archived'),
          ],
          value: _status,
          onChanged: (v) => setState(() => _status = v),
        ),
        const WashFieldsetHelper('Asterisk marks required fields'),
      ],
    );
  }
}

class _FormDemo extends StatefulWidget {
  const _FormDemo();

  @override
  State<_FormDemo> createState() => _FormDemoState();
}

class _FormDemoState extends State<_FormDemo> {
  String? _medium = 'watercolor';
  String? _paper = '300';
  String? _finish;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 576),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashSelect<String>(
            label: 'Medium',
            requiredMark: true,
            options: const [
              WashSelectOption(value: 'watercolor', label: 'Watercolor'),
              WashSelectOption(value: 'gouache', label: 'Gouache'),
              WashSelectOption(value: 'ink', label: 'Ink wash'),
            ],
            value: _medium,
            onChanged: (v) => setState(() => _medium = v),
            tone: WashSelectTone.accent,
          ),
          const WashSelectClassLabel('Select select-accent'),
          const SizedBox(height: 16),
          WashSelect<String>(
            label: 'Paper weight',
            options: const [
              WashSelectOption(value: '190', label: '190 gsm'),
              WashSelectOption(value: '300', label: '300 gsm'),
              WashSelectOption(value: '640', label: '640 gsm'),
            ],
            value: _paper,
            onChanged: (v) => setState(() => _paper = v),
            tone: WashSelectTone.info,
          ),
          const WashSelectClassLabel('Select select-info'),
          const SizedBox(height: 16),
          WashSelect<String>(
            label: 'Finish',
            options: const [
              WashSelectOption(value: 'matte', label: 'Matte'),
              WashSelectOption(value: 'satin', label: 'Satin'),
              WashSelectOption(value: 'gloss', label: 'Gloss'),
            ],
            value: _finish,
            onChanged: (v) => setState(() => _finish = v),
            placeholder: 'Optional finish…',
            tone: WashSelectTone.ghost,
          ),
          const WashSelectClassLabel('Select select-ghost'),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              WashButton(
                label: 'Save plate',
                onPressed: () {},
              ),
              WashButton(
                label: 'Reset',
                variant: WashButtonVariant.ghost,
                onPressed: () {
                  setState(() {
                    _medium = 'watercolor';
                    _paper = '300';
                    _finish = null;
                  });
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
