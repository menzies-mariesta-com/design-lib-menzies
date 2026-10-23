import 'package:flutter/widgets.dart';

import '../../components/fieldset/wash_fieldset.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/radio/wash_radio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashRadioGalleryPage extends StatelessWidget {
  const WashRadioGalleryPage({super.key});

  static const _colors = <(String, WashRadioVariant)>[
    ('Default', WashRadioVariant.defaultVariant),
    ('Neutral', WashRadioVariant.neutral),
    ('Primary', WashRadioVariant.primary),
    ('Secondary', WashRadioVariant.secondary),
    ('Accent', WashRadioVariant.accent),
    ('Success', WashRadioVariant.success),
    ('Warning', WashRadioVariant.warning),
    ('Info', WashRadioVariant.info),
    ('Error', WashRadioVariant.error),
  ];

  static const _sizes = <(String, WashRadioSize)>[
    ('XS', WashRadioSize.xs),
    ('SM', WashRadioSize.sm),
    ('MD', WashRadioSize.md),
    ('LG', WashRadioSize.lg),
    ('XL', WashRadioSize.xl),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Radio',
      description: 'Every daisyUI radio color and size.',
      sections: [
        _s('01 · Default', 'Base radio group', 'Two options in one named group',
            const _DefaultGroupDemo(), _defaultDart),
        _s('02 · Colors', 'Semantic colors',
            'Each color in its own group, selected', _colorsRow(), _colorsDart,
            tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'Size scale', 'From compact to XL touch targets',
            _sizesRow(), _sizesDart),
        _s(
            '04 · Size × color',
            'Primary through the scale',
            'One selected radio per color at every size',
            _sizeColorMatrix(),
            _matrixDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · With labels',
            'Form groups',
            'Fieldset and stacked labeled options',
            const _FieldsetGroupsDemo(),
            _labelsDart),
        _s(
            '06 · States',
            'Disabled',
            'Disabled radios stay out of the selection flow',
            _statesRow(),
            _statesDart),
        _s(
            '07 · Color groups',
            'Exclusive pigment pick',
            'One group, colored radios for each option',
            const _PigmentPickDemo(),
            _pigmentDart,
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

  static const _defaultDart = '''
WashRadioLabeled(
  label: 'Option A',
  radio: WashRadio(value: 'a', groupValue: group, onChanged: setGroup),
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
              WashRadio<String>(
                value: 'on',
                groupValue: 'on',
                onChanged: (_) {},
                variant: c.$2,
                semanticLabel: c.$1,
              ),
              const SizedBox(height: 8),
              Text(
                c.$1,
                style:
                    const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4),
              WashRadioClassLabel(
                c.$2 == WashRadioVariant.defaultVariant
                    ? 'radio'
                    : washRadioClassLabel(variant: c.$2),
              ),
            ],
          ),
      ],
    );
  }

  static const _colorsDart = '''
WashRadio(
  value: 'on',
  groupValue: 'on',
  variant: WashRadioVariant.primary,
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
              WashRadio<String>(
                value: 'on',
                groupValue: 'on',
                onChanged: (_) {},
                variant: WashRadioVariant.primary,
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
              WashRadioClassLabel(washRadioClassLabel(size: s.$2)),
            ],
          ),
      ],
    );
  }

  static const _sizesDart = '''
WashRadio(size: WashRadioSize.lg, variant: WashRadioVariant.primary);
''';

  static Widget _sizeColorMatrix() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (final s in _sizes) ...[
          Wrap(
            spacing: 12,
            runSpacing: 8,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              SizedBox(
                width: 32,
                child: WashGalleryLabelInk(s.$1),
              ),
              for (final c in _colors)
                WashRadio<String>(
                  value: 'on',
                  groupValue: 'on',
                  onChanged: (_) {},
                  size: s.$2,
                  variant: c.$2,
                  semanticLabel: '${s.$1} ${c.$1}',
                ),
            ],
          ),
          const SizedBox(height: 12),
        ],
      ],
    );
  }

  static const _matrixDart = '''
WashRadio(size: WashRadioSize.sm, variant: WashRadioVariant.warning);
''';

  static const _labelsDart = '''
WashFieldsetInkPanel(
  legend: 'Paper weight',
  children: [
    WashRadioFieldLabel(radio: WashRadio(...), caption: '300 gsm cold-press'),
  ],
);
''';

  static Widget _statesRow() {
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      children: [
        WashRadioLabeled<String>(
          label: 'Disabled off',
          dimmed: true,
          radio: const WashRadio<String>(
            value: 'off',
            groupValue: null,
            onChanged: null,
            disabled: true,
          ),
        ),
        WashRadioLabeled<String>(
          label: 'Disabled selected',
          dimmed: true,
          radio: const WashRadio<String>(
            value: 'on',
            groupValue: 'on',
            onChanged: null,
            variant: WashRadioVariant.primary,
            disabled: true,
          ),
        ),
        WashRadioLabeled<String>(
          label: 'Enabled',
          radio: WashRadio<String>(
            value: 'on',
            groupValue: 'on',
            onChanged: (_) {},
            variant: WashRadioVariant.secondary,
          ),
        ),
      ],
    );
  }

  static const _statesDart = '''
WashRadio(disabled: true, variant: WashRadioVariant.primary);
''';

  static const _pigmentDart = '''
WashRadioLabeled(label: 'Mineral blue', radio: WashRadio(variant: WashRadioVariant.primary));
''';
}

class _DefaultGroupDemo extends StatefulWidget {
  const _DefaultGroupDemo();

  @override
  State<_DefaultGroupDemo> createState() => _DefaultGroupDemoState();
}

class _DefaultGroupDemoState extends State<_DefaultGroupDemo> {
  String _group = 'a';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 24,
          runSpacing: 12,
          children: [
            WashRadioLabeled<String>(
              label: 'Option A',
              radio: WashRadio<String>(
                value: 'a',
                groupValue: _group,
                onChanged: (v) => setState(() => _group = v!),
              ),
            ),
            WashRadioLabeled<String>(
              label: 'Option B',
              radio: WashRadio<String>(
                value: 'b',
                groupValue: _group,
                onChanged: (v) => setState(() => _group = v!),
              ),
            ),
          ],
        ),
        const Padding(
          padding: EdgeInsets.only(top: 12),
          child: WashRadioClassLabel('radio + name'),
        ),
      ],
    );
  }
}

class _FieldsetGroupsDemo extends StatefulWidget {
  const _FieldsetGroupsDemo();

  @override
  State<_FieldsetGroupsDemo> createState() => _FieldsetGroupsDemoState();
}

class _FieldsetGroupsDemoState extends State<_FieldsetGroupsDemo> {
  String _paper = '300';
  String _wash = 'wet';

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final gap = 24.0;
        final panelW =
            twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: panelW,
              child: WashFieldsetInkPanel(
                legend: 'Paper weight',
                maxWidth: panelW,
                children: [
                  WashRadioFieldLabel<String>(
                    caption: '190 gsm',
                    radio: WashRadio<String>(
                      value: '190',
                      groupValue: _paper,
                      onChanged: (v) => setState(() => _paper = v!),
                      variant: WashRadioVariant.primary,
                    ),
                  ),
                  WashRadioFieldLabel<String>(
                    caption: '300 gsm cold-press',
                    radio: WashRadio<String>(
                      value: '300',
                      groupValue: _paper,
                      onChanged: (v) => setState(() => _paper = v!),
                      variant: WashRadioVariant.primary,
                    ),
                  ),
                  WashRadioFieldLabel<String>(
                    caption: '640 gsm rough',
                    radio: WashRadio<String>(
                      value: '640',
                      groupValue: _paper,
                      onChanged: (v) => setState(() => _paper = v!),
                      variant: WashRadioVariant.primary,
                    ),
                  ),
                  const WashFieldsetHelper('Choose one stock for this plate'),
                ],
              ),
            ),
            SizedBox(
              width: panelW,
              child: WashFieldsetInkPanel(
                legend: 'Wash mode',
                maxWidth: panelW,
                children: [
                  WashRadioFieldLabel<String>(
                    caption: 'Wet-on-wet',
                    radio: WashRadio<String>(
                      value: 'wet',
                      groupValue: _wash,
                      onChanged: (v) => setState(() => _wash = v!),
                      variant: WashRadioVariant.info,
                    ),
                  ),
                  WashRadioFieldLabel<String>(
                    caption: 'Dry brush',
                    radio: WashRadio<String>(
                      value: 'dry',
                      groupValue: _wash,
                      onChanged: (v) => setState(() => _wash = v!),
                      variant: WashRadioVariant.accent,
                    ),
                  ),
                  WashRadioFieldLabel<String>(
                    caption: 'Glaze layers',
                    radio: WashRadio<String>(
                      value: 'glaze',
                      groupValue: _wash,
                      onChanged: (v) => setState(() => _wash = v!),
                      variant: WashRadioVariant.success,
                    ),
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

class _PigmentPickDemo extends StatefulWidget {
  const _PigmentPickDemo();

  @override
  State<_PigmentPickDemo> createState() => _PigmentPickDemoState();
}

class _PigmentPickDemoState extends State<_PigmentPickDemo> {
  String _pick = 'mineral';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const options = <(String id, String label, WashRadioVariant tone)>[
      ('mineral', 'Mineral blue', WashRadioVariant.primary),
      ('ochre', 'Warm ochre', WashRadioVariant.warning),
      ('rose', 'Rose lake', WashRadioVariant.error),
      ('jade', 'Jade glaze', WashRadioVariant.success),
    ];
    return LayoutBuilder(
      builder: (context, constraints) {
        final horizontal = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final children = <Widget>[
          for (final o in options)
            _PigmentCard(
              tokens: tokens,
              label: o.$2,
              radio: WashRadio<String>(
                value: o.$1,
                groupValue: _pick,
                onChanged: (v) => setState(() => _pick = v!),
                variant: o.$3,
              ),
            ),
        ];
        if (horizontal) {
          return Wrap(spacing: 24, runSpacing: 12, children: children);
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (var i = 0; i < children.length; i++) ...[
              if (i > 0) const SizedBox(height: 12),
              children[i],
            ],
          ],
        );
      },
    );
  }
}

class _PigmentCard extends StatelessWidget {
  const _PigmentCard({
    required this.tokens,
    required this.label,
    required this.radio,
  });

  final WashTokens tokens;
  final String label;
  final WashRadio<String> radio;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => radio.onChanged?.call(radio.value),
        child: DecoratedBox(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
            color: tokens.surface.withValues(alpha: 0.8),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                radio,
                const SizedBox(width: 12),
                Text(
                  label,
                  style: WashTypography.label(tokens.onSurface).copyWith(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
