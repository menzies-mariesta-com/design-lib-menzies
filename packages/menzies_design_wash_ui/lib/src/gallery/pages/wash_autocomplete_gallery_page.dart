import 'package:flutter/widgets.dart';

import '../../components/autocomplete/wash_autocomplete.dart';
import '../../foundation/breakpoints.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAutocompleteGalleryPage extends StatelessWidget {
  const WashAutocompleteGalleryPage({super.key});

  static const _sizes = [
    ('XS', WashAutocompleteInputSize.xs),
    ('SM', WashAutocompleteInputSize.sm),
    ('MD', WashAutocompleteInputSize.md),
    ('LG', WashAutocompleteInputSize.lg),
    ('XL', WashAutocompleteInputSize.xl),
  ];

  static const _colors = [
    ('Default', WashAutocompleteInputTone.defaultVariant),
    ('Neutral', WashAutocompleteInputTone.neutral),
    ('Primary', WashAutocompleteInputTone.primary),
    ('Secondary', WashAutocompleteInputTone.secondary),
    ('Accent', WashAutocompleteInputTone.accent),
    ('Info', WashAutocompleteInputTone.info),
    ('Success', WashAutocompleteInputTone.success),
    ('Warning', WashAutocompleteInputTone.warning),
    ('Error', WashAutocompleteInputTone.error),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Autocomplete',
      description: 'daisyUI input has no dedicated autocomplete class.',
      sections: [
        _s('01 · Basic', 'Typeahead suggestions', 'Input plus daisyUI dropdown menu', _basic(), _basicDart),
        _s('02 · Icons and badges', 'Rich option rows', 'Search field with Lucide icons and badge chips in each suggestion', const WashAutocompleteToolSearch(), _iconsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'Input size scale', 'Autocomplete inherits daisyUI input sizes (xs through xl)', _sizesGrid(), _sizesDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Colors', 'Semantic input colors', 'Neutral through error border accents', _colorsGrid(), _colorsDart),
        _s('05 · Studio pigments', 'Filter watercolorThemes', 'Type to narrow every Menzies Design pigment', const _StudioPigmentsDemo(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Disabled and empty', 'Quiet and empty states', 'Disabled field locks suggestions', _disabledEmpty(), _disabledDart),
        _s('07 · Responsive', 'Stack on small screens', 'Two typeaheads sit side by side on desktop and stack on mobile', _responsive(context), _responsiveDart),
      ],
    );
  }

  static WashGallerySection _s(String eyebrow, String title, String desc, Widget preview, String dart, {WashGalleryPanelTint tint = WashGalleryPanelTint.none}) {
    return WashGallerySection(eyebrow: eyebrow, title: title, description: desc, tint: tint, child: WashShowcaseTabs(preview: preview, dartSource: dart));
  }

  static Widget _basic() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 640;
        final children = [
          _sample(
            'input + dropdown menu combobox',
            const WashTypeaheadAutocomplete(
              required: true,
              label: 'Pigment name',
              placeholder: 'Start typing a pigment…',
            ),
          ),
          _sample(
            'dropdown + menu typeahead',
            const WashTypeaheadAutocomplete(required: true, label: 'Suggest pigment'),
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

  static Widget _sizesGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final cols = w >= 1024 ? 3 : (w >= 640 ? 2 : 1);
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: _sizes.map((e) {
            final className = e.$1 == 'MD' ? 'input + menu' : 'input input-${e.$1.toLowerCase()} + menu';
            return SizedBox(
              width: cols == 1 ? w : (w - 16 * (cols - 1)) / cols,
              child: _sample(
                className,
                WashTypeaheadAutocomplete(
                  size: e.$2,
                  label: '${e.$1} size',
                  emptyQueryShowsAll: false,
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  static Widget _colorsGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final cols = w >= 1024 ? 3 : (w >= 640 ? 2 : 1);
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: _colors.map((e) {
            final toneClass = e.$2 == WashAutocompleteInputTone.defaultVariant
                ? 'input + menu'
                : 'input input-${e.$1.toLowerCase()} + menu';
            return SizedBox(
              width: cols == 1 ? w : (w - 16 * (cols - 1)) / cols,
              child: _sample(
                toneClass,
                WashTypeaheadAutocomplete(
                  tone: e.$2,
                  label: e.$1,
                  emptyQueryShowsAll: false,
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  static Widget _disabledEmpty() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 640;
        final children = [
          _sample(
            'input[disabled] + dropdown',
            const WashTypeaheadAutocomplete(
              disabled: true,
              label: 'Locked suggestions',
            ),
          ),
          _sample(
            'empty matches',
            const _EmptyStateDemo(),
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
        const WashTypeaheadAutocomplete(label: 'Quick pick', placeholder: 'Pigment…'),
      ),
      _sample(
        'dropdown + menu',
        const WashTypeaheadAutocomplete(label: 'Mobile-friendly filter'),
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

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontFamily: 'monospace', fontSize: 10)),
      ],
    );
  }

  static const _basicDart =
      "WashTypeaheadAutocomplete(required: true, label: 'Pigment name', placeholder: 'Start typing…');";
  static const _iconsDart = 'WashAutocompleteToolSearch();';
  static const _sizesDart =
      'WashTypeaheadAutocomplete(size: WashAutocompleteInputSize.sm, emptyQueryShowsAll: false);';
  static const _colorsDart =
      'WashTypeaheadAutocomplete(tone: WashAutocompleteInputTone.primary, emptyQueryShowsAll: false);';
  static const _studioDart = 'WashAutocompleteStudioField(onSelectionChanged: (_) {});';
  static const _disabledDart =
      'WashTypeaheadAutocomplete(disabled: true); // empty: initialQuery + warning tone';
  static const _responsiveDart = "WashTypeaheadAutocomplete(label: 'Quick pick');";
}

class _StudioPigmentsDemo extends StatefulWidget {
  const _StudioPigmentsDemo();

  @override
  State<_StudioPigmentsDemo> createState() => _StudioPigmentsDemoState();
}

class _StudioPigmentsDemoState extends State<_StudioPigmentsDemo> {
  WashStudioPigmentRow? _selected;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 1024;
        final field = WashAutocompleteStudioField(
          onSelectionChanged: (row) => setState(() => _selected = row),
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
              Text('Selection', style: WashTypography.label(tokens.inkMuted)),
              const SizedBox(height: 8),
              if (_selected != null)
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 32,
                      height: 32,
                      margin: const EdgeInsets.only(top: 2),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: _selected!.swatch,
                        border: Border.all(color: tokens.inkBorder),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _selected!.label,
                            style: WashTypography.title(tokens.onSurface),
                          ),
                          Text(
                            _selected!.note,
                            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
                          ),
                          Text(
                            _selected!.id,
                            style: const TextStyle(fontFamily: 'monospace', fontSize: 10),
                          ),
                        ],
                      ),
                    ),
                  ],
                )
              else
                Text(
                  'Choose a pigment from the suggestions.',
                  style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
                ),
            ],
          ),
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(flex: 3, child: field),
              const SizedBox(width: 16),
              SizedBox(width: 200, child: aside),
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

class _EmptyStateDemo extends StatelessWidget {
  const _EmptyStateDemo();

  @override
  Widget build(BuildContext context) {
    return const WashTypeaheadAutocomplete(
      label: 'Unmatched query',
      initialQuery: 'zzzx',
      initialOpen: true,
      tone: WashAutocompleteInputTone.warning,
      placeholder: '',
      emptyQueryShowsAll: false,
    );
  }
}
