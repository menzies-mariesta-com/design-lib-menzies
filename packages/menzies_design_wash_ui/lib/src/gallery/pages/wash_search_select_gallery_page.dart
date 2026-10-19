import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/input/wash_input.dart';
import '../../components/palette/wash_palette.dart';
import '../../components/search_select/wash_search_select.dart';
import '../../foundation/breakpoints.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashSearchSelectGalleryPage extends StatelessWidget {
  const WashSearchSelectGalleryPage({super.key});

  static final _pigments = washSearchSelectFromStrings(const [
    'Ultramarine',
    'Yellow ochre',
    'Alizarin crimson',
    'Viridian',
    'Burnt sienna',
    'Cobalt blue',
    'Cerulean',
    'Quinacridone rose',
  ]);

  static const _sizes = <(String, WashButtonSize, WashInputSize)>[
    ('XS', WashButtonSize.xs, WashInputSize.xs),
    ('SM', WashButtonSize.sm, WashInputSize.sm),
    ('MD', WashButtonSize.md, WashInputSize.md),
    ('LG', WashButtonSize.lg, WashInputSize.lg),
    ('XL', WashButtonSize.xl, WashInputSize.xl),
  ];

  static const _colors = <(String, WashButtonVariant)>[
    ('Default', WashButtonVariant.defaultVariant),
    ('Neutral', WashButtonVariant.neutral),
    ('Primary', WashButtonVariant.primary),
    ('Secondary', WashButtonVariant.secondary),
    ('Accent', WashButtonVariant.accent),
    ('Info', WashButtonVariant.info),
    ('Success', WashButtonVariant.success),
    ('Warning', WashButtonVariant.warning),
    ('Error', WashButtonVariant.error),
  ];

  static const _tools = <WashSearchSelectOption>[
    WashSearchSelectOption(
      value: 'round',
      label: 'Round brush',
      note: 'Washes and edges',
      badge: 'Tool',
      iconName: 'paintbrush',
    ),
    WashSearchSelectOption(
      value: 'drop',
      label: 'Wash dropper',
      note: 'Dilution control',
      badge: 'Water',
      iconName: 'droplets',
    ),
    WashSearchSelectOption(
      value: 'spark',
      label: 'Bloom lift',
      note: 'Soft highlights',
      badge: 'Effect',
      iconName: 'sparkles',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Search Select',
      description:
          'daisyUI dropdown has no dedicated searchable select. Wash SearchSelect adds a filter field and flips the menu top or bottom from viewport space (bottom default).',
      sections: [
        _s('01 · Basic', 'Searchable single select', 'Trigger shows the committed value', _sample('dropdown + btn + input + menu', WashSearchSelect(options: _pigments, label: 'Pigment', placeholder: 'Search pigments…')), _basicDart),
        _s('02 · Sizes and colors', 'Trigger scale and accents', 'Sizes and semantic colors apply to the select-like button', _sizesColors(), _sizesColorsDart, tint: WashGalleryPanelTint.rose),
        _s('03 · Icons and badges', 'Rich option rows', 'Filtered options can carry Lucide icons and badge chips', Column(crossAxisAlignment: CrossAxisAlignment.start, children: [ConstrainedBox(constraints: const BoxConstraints(maxWidth: 512), child: WashSearchSelect(options: _tools, label: 'Studio tool', placeholder: 'Search and pick a tool…', filterPlaceholder: 'Filter tools…', emptyMessage: 'No tools match.')), const WashSearchSelectClassLabel('btn + input + menu · icons / badges')]), _iconsDart, tint: WashGalleryPanelTint.ochre),
        _s('04 · Studio pigments', 'Search watercolorThemes', 'Filter every Menzies Design pigment, then apply it', const _StudioPigmentSearchSelect(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('05 · Disabled and empty', 'Quiet and no-results states', 'Disabled locks the trigger', _disabledEmpty(), _disabledDart),
        _s('06 · Required', 'Required form field', 'Required asterisk beside the label', const _RequiredFormDemo(), _requiredDart),
        _s('07 · Responsive', 'Stack on small screens', 'Two searchable selects sit side by side on desktop and stack on mobile', _responsive(context), _responsiveDart),
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

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        WashSearchSelectClassLabel(label),
      ],
    );
  }

  static Widget _grid(BuildContext context, List<Widget> children) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final cols = w >= 1024 ? 3 : (w >= 640 ? 2 : 1);
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            for (final child in children)
              SizedBox(
                width: cols == 1 ? w : (w - 16 * (cols - 1)) / cols,
                child: child,
              ),
          ],
        );
      },
    );
  }

  static Widget _sizesColors() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final sizeTiles = [
          for (final size in _sizes)
            _sample(
              'btn ${size.$2 == WashButtonSize.md ? 'btn-md' : 'btn-${size.$2.name}'} + input input-${size.$3.name}',
              WashSearchSelect(
                options: _pigments,
                label: '${size.$1} size',
                placeholder: 'Search pigments…',
                triggerSize: size.$2,
                filterSize: size.$3,
              ),
            ),
        ];
        final colorTiles = [
          for (final color in _colors)
            _sample(
              color.$2 == WashButtonVariant.defaultVariant
                  ? 'btn + menu'
                  : 'btn btn-${color.$1.toLowerCase()} + menu',
              WashSearchSelect(
                options: _pigments,
                label: color.$1,
                placeholder: 'Search pigments…',
                triggerVariant: color.$2,
              ),
            ),
        ];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _grid(context, sizeTiles),
            const SizedBox(height: 24),
            _grid(context, colorTiles),
          ],
        );
      },
    );
  }

  static Widget _disabledEmpty() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 768;
        final children = [
          _sample(
            'btn[disabled] + dropdown',
            WashSearchSelect(
              options: _pigments,
              label: 'Locked select',
              disabled: true,
              placeholder: 'Search locked',
            ),
          ),
          _sample(
            'empty matches',
            WashSearchSelect(
              options: _pigments,
              label: 'Unmatched filter',
              defaultQuery: 'zzzx',
              forceOpen: true,
              emptyMessage: 'No pigments match.',
            ),
          ),
        ];
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: children[0]),
              const SizedBox(width: 24),
              Expanded(child: children[1]),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            children[0],
            const SizedBox(height: 24),
            children[1],
          ],
        );
      },
    );
  }

  static Widget _responsive(BuildContext context) {
    final bp = WashBreakpoints.of(context);
    final children = [
      _sample(
        'dropdown + menu',
        WashSearchSelect(
          options: _pigments,
          label: 'Wash medium',
          placeholder: 'Search mediums…',
        ),
      ),
      _sample(
        'dropdown + menu',
        WashSearchSelect(
          options: washSearchSelectFromStrings(const [
            'Cold press',
            'Hot press',
            'Rough',
            'Plate',
            'Block',
          ]),
          label: 'Paper tooth',
          placeholder: 'Search papers…',
        ),
      ),
    ];
    if (bp.isPhone) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          children[0],
          const SizedBox(height: 16),
          children[1],
        ],
      );
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(child: children[0]),
        const SizedBox(width: 16),
        Expanded(child: children[1]),
      ],
    );
  }

  static const _basicDart = '''
WashSearchSelect(
  options: pigmentOptions,
  label: 'Pigment',
  placeholder: 'Search pigments…',
);
''';

  static const _sizesColorsDart = '''
WashSearchSelect(
  options: pigmentOptions,
  triggerSize: WashButtonSize.sm,
  filterSize: WashInputSize.sm,
  triggerVariant: WashButtonVariant.primary,
);
''';

  static const _iconsDart = '''
WashSearchSelect(
  label: 'Studio tool',
  options: [
    WashSearchSelectOption(
      value: 'round',
      label: 'Round brush',
      note: 'Washes and edges',
      badge: 'Tool',
      iconName: 'paintbrush',
    ),
  ],
);
''';

  static const _studioDart = '''
WashSearchSelect(
  label: 'Studio pigment',
  requiredMark: true,
  triggerVariant: WashButtonVariant.primary,
  options: pigmentThemes,
  onPick: (id) => WashScope.of(context).setPigment(id),
);
''';

  static const _disabledDart = '''
WashSearchSelect(disabled: true, placeholder: 'Search locked');
WashSearchSelect(defaultQuery: 'zzzx', forceOpen: true, emptyMessage: 'No pigments match.');
''';

  static const _requiredDart = '''
WashSearchSelect(
  options: pigmentOptions,
  label: 'Series pigment',
  requiredMark: true,
  onPick: setPicked,
);
WashButton(label: 'Save pick', onPressed: save);
''';

  static const _responsiveDart = '''
WashSearchSelect(label: 'Wash medium', placeholder: 'Search mediums…');
WashSearchSelect(label: 'Paper tooth', placeholder: 'Search papers…');
''';
}

class _StudioPigmentSearchSelect extends StatefulWidget {
  const _StudioPigmentSearchSelect();

  @override
  State<_StudioPigmentSearchSelect> createState() =>
      _StudioPigmentSearchSelectState();
}

class _StudioPigmentSearchSelectState extends State<_StudioPigmentSearchSelect> {
  String? _selectedId;
  String _query = '';

  List<WashSearchSelectOption> get _options {
    return [
      for (final theme in kWashPigmentThemes)
        WashSearchSelectOption(
          value: theme.id,
          label: theme.label,
          note: theme.note,
          swatch: theme.swatch,
        ),
    ];
  }

  WashPigmentTheme? get _selected {
    final id = _selectedId;
    if (id == null) return null;
    for (final theme in kWashPigmentThemes) {
      if (theme.id == id) return theme;
    }
    return null;
  }

  int get _matchCount {
    final q = _query;
    if (q.trim().isEmpty) return kWashPigmentThemes.length;
    return _options.where((opt) {
      return washSearchSelectFilterText(q, opt.label) ||
          washSearchSelectFilterText(q, opt.value) ||
          (opt.note != null && washSearchSelectFilterText(q, opt.note!));
    }).length;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final selected = _selected;
    final field = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashSearchSelect(
          options: _options,
          label: 'Studio pigment',
          requiredMark: true,
          placeholder: 'Search watercolorThemes…',
          filterPlaceholder: 'Filter by name, note, or id…',
          triggerVariant: WashButtonVariant.primary,
          value: _selectedId,
          onQueryChanged: (q) => setState(() => _query = q),
          onChanged: (id) {
            setState(() {
              _selectedId = id;
              _query = '';
            });
            if (id != null) {
              WashScope.of(context).setPigment(id);
            }
          },
        ),
        Padding(
          padding: const EdgeInsets.only(top: 8),
          child: Text(
            'Showing $_matchCount of ${kWashPigmentThemes.length} pigments. Pick one to call applyTheme (ThemeSwitcher stays in sync).',
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 11),
          ),
        ),
        const WashSearchSelectClassLabel('btn + input + menu · applyTheme'),
      ],
    );

    final aside = Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Applied', style: WashTypography.label(tokens.inkMuted)),
          const SizedBox(height: 8),
          if (selected != null)
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 32,
                  height: 32,
                  margin: const EdgeInsets.only(top: 2),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: selected.swatch,
                    border: Border.all(color: tokens.inkBorder),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        selected.label,
                        style: WashTypography.title(tokens.onSurface),
                      ),
                      Text(
                        selected.note,
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 13),
                      ),
                      Text(
                        selected.id,
                        style: const TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 10.4,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            )
          else
            Text(
              'Search and select a pigment to restain the desk.',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
            ),
        ],
      ),
    );

    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 1024;
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: field),
              const SizedBox(width: 16),
              SizedBox(width: 220, child: aside),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            field,
            const SizedBox(height: 16),
            aside,
          ],
        );
      },
    );
  }
}

class _RequiredFormDemo extends StatefulWidget {
  const _RequiredFormDemo();

  @override
  State<_RequiredFormDemo> createState() => _RequiredFormDemoState();
}

class _RequiredFormDemoState extends State<_RequiredFormDemo> {
  String? _picked;
  String? _submitted;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashSearchSelect(
            options: WashSearchSelectGalleryPage._pigments,
            label: 'Series pigment',
            placeholder: 'Search then select…',
            requiredMark: true,
            onPick: (value) {
              setState(() {
                _picked = value;
                _submitted = null;
              });
            },
          ),
          const SizedBox(height: 16),
          WashButton(
            label: 'Save pick',
            onPressed: () {
              final picked = _picked;
              if (picked == null) return;
              setState(() => _submitted = picked);
            },
          ),
          if (_submitted != null) ...[
            const SizedBox(height: 8),
            Text(
              'Saved "$_submitted" from the searchable select.',
              style: WashTypography.body(tokens.palette.success).copyWith(fontSize: 13),
            ),
          ],
          const WashSearchSelectClassLabel('form + required combobox'),
        ],
      ),
    );
  }
}
