import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/filter/wash_filter.dart';
import '../../components/join/wash_join.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashFilterGalleryPage extends StatelessWidget {
  const WashFilterGalleryPage({super.key});

  static const _sizes = <(String, WashButtonSize)>[
    ('XS', WashButtonSize.xs),
    ('SM', WashButtonSize.sm),
    ('MD', WashButtonSize.md),
    ('LG', WashButtonSize.lg),
    ('XL', WashButtonSize.xl),
  ];

  static const _colors = <(String, WashButtonVariant)>[
    ('Neutral', WashButtonVariant.neutral),
    ('Primary', WashButtonVariant.primary),
    ('Secondary', WashButtonVariant.secondary),
    ('Accent', WashButtonVariant.accent),
    ('Info', WashButtonVariant.info),
    ('Success', WashButtonVariant.success),
    ('Warning', WashButtonVariant.warning),
    ('Error', WashButtonVariant.error),
  ];

  static const _responsiveLabels = [
    'Indigo',
    'Viridian',
    'Sap green',
    'Naples yellow',
    'Venetian red',
    'Payne gray',
    'Titanium white',
    'Ivory black',
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Filter',
      description: 'daisyUI filter groups: radio (or checkbox) buttons.',
      sections: [
        _s('01 · Basic', 'Form filter with reset', 'HTML form: radio options', const _BasicFilterDemo(), _basicDart),
        _s('02 · Without form', 'Div with filter-reset', 'When a form is not practical', const _DivFilterDemo(), _withoutDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'Button size modifiers', 'Filter radios inherit btn sizes', _sizesSection(), _sizesDart),
        _s('04 · Colors', 'Semantic button colors', 'Color modifiers on each filter btn', _colorsSection(), _colorsDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Studio pigments', 'Live wash filter', 'Interactive filter over sample pigments', const _StudioPigmentsDemo(), _studioDart, tint: WashGalleryPanelTint.blue),
        _s('06 · Join', 'Joined button group', 'join groups filter-like radios into a continuous control', const _JoinSection(), _joinDart),
        _s('07 · Checkboxes', 'Multi-select filter', 'Checkbox inputs keep several options visible at once', const _CheckboxFilterDemo(), _checkboxDart),
        _s('08 · Responsive', 'Wrap on mobile', 'flex-wrap keeps long filter rows usable on small screens without', const _ResponsiveFilterDemo(), _responsiveDart),
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

  static Widget _sizesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: _sizes
          .map(
            (s) => Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: _SizeFilterRow(size: s.$2, label: s.$1),
            ),
          )
          .toList(),
    );
  }

  static Widget _colorsSection() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: _colors.map((c) {
            return SizedBox(
              width: twoCol ? (constraints.maxWidth - 16) / 2 : constraints.maxWidth,
              child: _ColorFilterRow(variant: c.$2, name: c.$1),
            );
          }).toList(),
        );
      },
    );
  }

  static const _basicDart = 'WashFilter + WashFilterReset + WashFilterRadio';
  static const _withoutDart = 'WashFilter + WashFilterResetRadio + radios';
  static const _sizesDart = 'WashFilterReset(size: ...) + WashFilterRadio(size: ...)';
  static const _colorsDart = 'WashFilterRadio(soft: true, variant: ...)';
  static const _studioDart = 'WashFilter + controlled wash filter + pigment grid';
  static const _joinDart = 'Row(join radios) + WashFilter(joined: true)';
  static const _checkboxDart = 'WashFilterCheckbox multi-select + WashFilterReset';
  static const _responsiveDart = 'WashFilter + btn-sm radios flex-wrap';
}

class _BasicFilterDemo extends StatefulWidget {
  const _BasicFilterDemo();

  @override
  State<_BasicFilterDemo> createState() => _BasicFilterDemoState();
}

class _BasicFilterDemoState extends State<_BasicFilterDemo> {
  String? _value;

  @override
  Widget build(BuildContext context) {
    const options = ['Coastal', 'Alpine', 'Desert', 'Urban'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFilter(
          children: [
            WashFilterReset(onPressed: () => setState(() => _value = null)),
            for (final o in options)
              WashFilterRadio(
                label: o,
                selected: _value == o,
                onSelected: () => setState(() => _value = o),
              ),
          ],
        ),
        const WashFilterClassLabel('filter + btn + type=reset btn-square'),
      ],
    );
  }
}

class _DivFilterDemo extends StatefulWidget {
  const _DivFilterDemo();

  @override
  State<_DivFilterDemo> createState() => _DivFilterDemoState();
}

class _DivFilterDemoState extends State<_DivFilterDemo> {
  String? _value;

  @override
  Widget build(BuildContext context) {
    const options = ['Gum arabic', 'Honey', 'Glycerin'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFilter(
          children: [
            WashFilterResetRadio(
              selected: _value == null,
              onSelected: (_) => setState(() => _value = null),
            ),
            for (final o in options)
              WashFilterRadio(
                label: o,
                selected: _value == o,
                onSelected: () => setState(() => _value = o),
              ),
          ],
        ),
        const WashFilterClassLabel('filter + filter-reset'),
      ],
    );
  }
}

class _SizeFilterRow extends StatefulWidget {
  const _SizeFilterRow({required this.size, required this.label});

  final WashButtonSize size;
  final String label;

  @override
  State<_SizeFilterRow> createState() => _SizeFilterRowState();
}

class _SizeFilterRowState extends State<_SizeFilterRow> {
  String? _value;

  @override
  Widget build(BuildContext context) {
    const options = ['Wash', 'Glaze', 'Lift'];
    return WashFilter(
      children: [
        WashFilterReset(
          size: widget.size,
          accessibilityLabel: 'Clear ${widget.label} filter',
          onPressed: () => setState(() => _value = null),
        ),
        for (final o in options)
          WashFilterRadio(
            label: o,
            size: widget.size,
            selected: _value == o,
            onSelected: () => setState(() => _value = o),
          ),
      ],
    );
  }
}

class _ColorFilterRow extends StatefulWidget {
  const _ColorFilterRow({required this.variant, required this.name});

  final WashButtonVariant variant;
  final String name;

  @override
  State<_ColorFilterRow> createState() => _ColorFilterRowState();
}

class _ColorFilterRowState extends State<_ColorFilterRow> {
  String? _value;

  @override
  Widget build(BuildContext context) {
    const options = ['A', 'B', 'C'];
    return WashFilter(
      children: [
        WashFilterReset(
          variant: widget.variant,
          soft: true,
          accessibilityLabel: 'Clear ${widget.name} filter',
          onPressed: () => setState(() => _value = null),
        ),
        for (final o in options)
          WashFilterRadio(
            label: o,
            variant: widget.variant,
            soft: true,
            selected: _value == o,
            onSelected: () => setState(() => _value = o),
          ),
      ],
    );
  }
}

class _Pigment {
  const _Pigment(this.name, this.wash, this.hue);
  final String name;
  final String wash;
  final String hue;
}

class _StudioPigmentsDemo extends StatefulWidget {
  const _StudioPigmentsDemo();

  @override
  State<_StudioPigmentsDemo> createState() => _StudioPigmentsDemoState();
}

class _StudioPigmentsDemoState extends State<_StudioPigmentsDemo> {
  static const _pigments = <_Pigment>[
    _Pigment('Ultramarine', 'glaze', 'cool'),
    _Pigment('Cobalt blue', 'flat', 'cool'),
    _Pigment('Cerulean', 'granulating', 'cool'),
    _Pigment('Yellow ochre', 'flat', 'earth'),
    _Pigment('Burnt sienna', 'glaze', 'earth'),
    _Pigment('Raw umber', 'granulating', 'earth'),
    _Pigment('Cadmium red', 'flat', 'warm'),
    _Pigment('Quinacridone rose', 'glaze', 'warm'),
    _Pigment('Vermilion', 'granulating', 'warm'),
  ];

  String? _wash;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final visible = _wash == null
        ? _pigments
        : _pigments.where((p) => p.wash == _wash).toList();
    const washOptions = ['Glaze', 'Flat', 'Granulating'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFilter(
          children: [
            WashFilterReset(onPressed: () => setState(() => _wash = null)),
            for (final w in washOptions)
              WashFilterRadio(
                label: w,
                selected: _wash == w.toLowerCase(),
                onSelected: () => setState(() => _wash = w.toLowerCase()),
              ),
          ],
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, c) {
            final cols = c.maxWidth >= WashTailwindBreakpoints.lg
                ? 3
                : (c.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
            return Wrap(
              spacing: 8,
              runSpacing: 8,
              children: visible.map((p) {
                return SizedBox(
                  width: cols == 1 ? double.infinity : (c.maxWidth - 8 * (cols - 1)) / cols,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: tokens.surface.withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(tokens.radiusBox),
                      border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(p.name, style: WashTypography.body(tokens.onSurface).copyWith(fontWeight: FontWeight.w600, fontSize: 14)),
                          Text('${p.wash} · ${p.hue}', style: WashTypography.label(tokens.inkMuted)),
                        ],
                      ),
                    ),
                  ),
                );
              }).toList(),
            );
          },
        ),
        const SizedBox(height: 12),
        Text(
          'Showing ${visible.length} of ${_pigments.length} pigments${_wash != null ? ' · $_wash' : ' · all washes'}',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
        ),
        const WashFilterClassLabel('filter + controlled radios + filtered list'),
      ],
    );
  }
}

class _JoinSection extends StatefulWidget {
  const _JoinSection();

  @override
  State<_JoinSection> createState() => _JoinSectionState();
}

class _JoinSectionState extends State<_JoinSection> {
  var _paper = 'Cold press';
  String? _series;

  @override
  Widget build(BuildContext context) {
    const papers = ['Cold press', 'Hot press', 'Rough'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            return WashJoin.responsive(
              maxWidth: constraints.maxWidth,
              children: [
                for (final label in papers)
                  WashButton(
                    label: label,
                    joinItem: true,
                    active: _paper == label,
                    onPressed: () => setState(() => _paper = label),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 20),
        WashFilter(
          joined: true,
          children: [
            WashFilterReset(
              joinItem: true,
              onPressed: () => setState(() => _series = null),
            ),
            for (final s in ['Series A', 'Series B', 'Series C'])
              WashFilterRadio(
                label: s,
                joinItem: true,
                selected: _series == s,
                onSelected: () => setState(() => _series = s),
              ),
          ],
        ),
      ],
    );
  }
}

class _CheckboxFilterDemo extends StatefulWidget {
  const _CheckboxFilterDemo();

  @override
  State<_CheckboxFilterDemo> createState() => _CheckboxFilterDemoState();
}

class _CheckboxFilterDemoState extends State<_CheckboxFilterDemo> {
  final _checked = <String>{};

  @override
  Widget build(BuildContext context) {
    const tools = ['Round', 'Flat', 'Rigger', 'Mop'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFilter(
          children: [
            for (final t in tools)
              WashFilterCheckbox(
                label: t,
                checked: _checked.contains(t),
                onChanged: (on) => setState(() {
                  if (on) {
                    _checked.add(t);
                  } else {
                    _checked.remove(t);
                  }
                }),
              ),
            WashFilterReset(onPressed: () => setState(() => _checked.clear())),
          ],
        ),
        const WashFilterClassLabel('filter + type=checkbox + type=reset'),
      ],
    );
  }
}

class _ResponsiveFilterDemo extends StatefulWidget {
  const _ResponsiveFilterDemo();

  @override
  State<_ResponsiveFilterDemo> createState() => _ResponsiveFilterDemoState();
}

class _ResponsiveFilterDemoState extends State<_ResponsiveFilterDemo> {
  String? _value;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFilter(
          children: [
            WashFilterReset(
              size: WashButtonSize.sm,
              accessibilityLabel: 'Clear responsive filter',
              onPressed: () => setState(() => _value = null),
            ),
            for (final label in WashFilterGalleryPage._responsiveLabels)
              WashFilterRadio(
                label: label,
                size: WashButtonSize.sm,
                selected: _value == label,
                onSelected: () => setState(() => _value = label),
              ),
          ],
        ),
        const WashFilterClassLabel('filter flex flex-wrap gap-2'),
      ],
    );
  }
}
