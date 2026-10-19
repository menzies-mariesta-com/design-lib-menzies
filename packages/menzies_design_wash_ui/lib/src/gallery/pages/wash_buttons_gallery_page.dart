import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/input/wash_editable.dart';
import '../../foundation/wash_icon.dart';
import '../../theme/wash_typography.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashButtonsGalleryPage extends StatelessWidget {
  const WashButtonsGalleryPage({super.key});

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

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Buttons',
      description:
          'Every daisyUI btn color, style, size, modifier, and state.',
      sections: [
        _section(
          eyebrow: '01 · Colors',
          title: 'Semantic colors',
          description: 'Default ink plus neutral, brand, and status colors',
          preview: _semanticColors(),
          dart: _semanticColorsDart,
        ),
        _section(
          eyebrow: '02 · Styles',
          title: 'Style variants',
          description:
              'Solid, outline, dash, soft, ghost, and link: each with every color',
          tint: WashGalleryPanelTint.ochre,
          preview: _styleVariants(),
          dart: _styleVariantsDart,
        ),
        _section(
          eyebrow: '03 · Sizes',
          title: 'Size scale',
          description: 'From compact controls to XL actions',
          preview: _sizeScale(),
          dart: _sizeScaleDart,
        ),
        _section(
          eyebrow: '04 · Modifiers',
          title: 'Width & shape',
          description: 'Wide, block, square, and circle modifiers',
          tint: WashGalleryPanelTint.rose,
          preview: _modifiers(context),
          dart: _modifiersDart,
        ),
        _section(
          eyebrow: '05 · Behavior',
          title: 'Active & disabled',
          description: 'Pressed state and disabled controls',
          preview: _behavior(),
          dart: _behaviorDart,
        ),
        _section(
          eyebrow: '06 · With icons',
          title: 'Icon + label',
          description: 'Leading and trailing Lucide marks',
          tint: WashGalleryPanelTint.ochre,
          preview: _iconLabels(),
          dart: _iconLabelsDart,
        ),
        _section(
          eyebrow: '07 · Element types',
          title: 'Button, link, and input',
          description: 'Same btn classes on different HTML elements',
          preview: _elementTypes(),
          dart: _elementTypesDart,
        ),
        WashGallerySection(
          eyebrow: '08 · Groups',
          title: 'Join groups',
          description: 'Segmented controls with join + join-item',
          tint: WashGalleryPanelTint.rose,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: _joinSolid(),
                dartSource: _joinSolidDart,
              ),
              const SizedBox(height: 24),
              WashShowcaseTabs(
                preview: _joinOutline(),
                dartSource: _joinOutlineDart,
              ),
              const SizedBox(height: 24),
              WashShowcaseTabs(
                preview: _joinSearch(),
                dartSource: _joinSearchDart,
              ),
            ],
          ),
        ),
        _section(
          eyebrow: '09 · Size × style matrix',
          title: 'Soft primary scale',
          description: 'One color through every size and a few styles',
          preview: _sizeStyleMatrix(),
          dart: _sizeStyleMatrixDart,
        ),
      ],
    );
  }

  static Widget _section({
    required String eyebrow,
    required String title,
    required String description,
    required Widget preview,
    required String dart,
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: description,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _semanticColors() {
    return Wrap(
      spacing: 16,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: _colors
          .map(
            (c) => WashButton(
              label: c.$1,
              variant: c.$2,
              ripple: false,
              onPressed: () {},
            ),
          )
          .toList(),
    );
  }

  static const _semanticColorsDart = '''
Wrap(
  spacing: 16,
  children: [
    WashButton(label: 'Default', variant: WashButtonVariant.defaultVariant, onPressed: () {}),
    WashButton(label: 'Primary', onPressed: () {}),
    WashButton(label: 'Error', variant: WashButtonVariant.error, onPressed: () {}),
  ],
)''';

  static Widget _styleVariants() {
    final styles = <(String, bool outline, bool dash, bool soft, bool ghost, bool link)>[
      ('Solid', false, false, false, false, false),
      ('Outline', true, false, false, false, false),
      ('Dash', true, true, false, false, false),
      ('Soft', false, false, true, false, false),
      ('Ghost', false, false, false, true, false),
      ('Link', false, false, false, false, true),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: styles.map((s) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashGalleryLabelInk(s.$1),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _colors.map((c) {
                  final variant = s.$6
                      ? WashButtonVariant.link
                      : s.$5
                          ? WashButtonVariant.ghost
                          : s.$2
                              ? WashButtonVariant.outline
                              : c.$2;
                  return WashButton(
                    label: c.$1,
                    variant: variant,
                    tint: (s.$5 || s.$6) ? c.$2 : null,
                    dash: s.$3,
                    soft: s.$4,
                    ripple: false,
                    onPressed: () {},
                  );
                }).toList(),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  static const _styleVariantsDart = '''
WashButton(label: 'Primary', variant: WashButtonVariant.outline, onPressed: () {});
WashButton(label: 'Primary', soft: true, onPressed: () {});
WashButton(label: 'Primary', variant: WashButtonVariant.ghost, onPressed: () {});
''';

  static Widget _sizeScale() {
    const sizes = WashButtonSize.values;
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: sizes.map((s) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashButton(
              label: s.name.toUpperCase(),
              size: s,
              ripple: false,
              onPressed: () {},
            ),
            const SizedBox(height: 8),
            Text(
              'btn-${s.name}',
              style: WashTypography.label(const Color(0xff6e6a61)).copyWith(fontSize: 10),
            ),
          ],
        );
      }).toList(),
    );
  }

  static const _sizeScaleDart = '''
WashButton(size: WashButtonSize.xs, label: 'XS', onPressed: () {});
WashButton(size: WashButtonSize.xl, label: 'XL', onPressed: () {});
''';

  static Widget _modifiers(BuildContext context) {
    final slice = _colors.take(5);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashGalleryLabelInk('Wide'),
        const SizedBox(height: 12),
        WashButton(label: 'Wide action', wide: true, ripple: false, onPressed: () {}),
        const SizedBox(height: 24),
        WashGalleryLabelInk('Block'),
        const SizedBox(height: 12),
        WashButton(
          label: 'Full-width block',
          block: true,
          variant: WashButtonVariant.neutral,
          ripple: false,
          onPressed: () {},
        ),
        const SizedBox(height: 24),
        WashGalleryLabelInk('Square'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          children: slice
              .map(
                (c) => WashButton(
                  square: true,
                  variant: c.$2,
                  ripple: false,
                  onPressed: () {},
                  child: const WashIcon(WashIconGlyph.add, size: 16),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 24),
        WashGalleryLabelInk('Circle'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          children: slice
              .map(
                (c) => WashButton(
                  circle: true,
                  variant: c.$2,
                  ripple: false,
                  onPressed: () {},
                  child: const WashIcon(WashIconGlyph.starOutline, size: 16),
                ),
              )
              .toList(),
        ),
      ],
    );
  }

  static const _modifiersDart = '''
WashButton(label: 'Wide action', wide: true, onPressed: () {});
WashButton(label: 'Block', block: true, onPressed: () {});
WashButton(square: true, child: WashIcon(WashIconGlyph.add), onPressed: () {});
''';

  static Widget _behavior() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        WashButton(label: 'Idle', onPressed: () {}),
        WashButton(label: 'Active', active: true, onPressed: () {}),
        WashButton(
          label: 'Primary active',
          active: true,
          ripple: false,
          onPressed: () {},
        ),
        WashButton(label: 'Disabled attr', enabled: false, onPressed: () {}),
        WashButton(label: 'Disabled class', enabled: false, onPressed: null),
      ],
    );
  }

  static const _behaviorDart = '''
WashButton(label: 'Active', active: true, onPressed: () {});
WashButton(label: 'Disabled', enabled: false, onPressed: () {});
''';

  static Widget _iconLabels() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        WashButton(
          ripple: false,
          onPressed: () {},
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const WashIcon(WashIconGlyph.add, size: 16),
              const SizedBox(width: 8),
              Text('New wash'),
            ],
          ),
        ),
        WashButton(
          variant: WashButtonVariant.outline,
          ripple: false,
          onPressed: () {},
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashIcon(WashIconGlyph.chevronRight, size: 16),
              SizedBox(width: 8),
              Text('Export'),
            ],
          ),
        ),
        WashButton(
          soft: true,
          variant: WashButtonVariant.error,
          ripple: false,
          onPressed: () {},
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashIcon(WashIconGlyph.close, size: 16),
              SizedBox(width: 8),
              Text('Delete'),
            ],
          ),
        ),
        WashButton(
          variant: WashButtonVariant.ghost,
          ripple: false,
          onPressed: () {},
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Settings'),
              SizedBox(width: 8),
              WashIcon(WashIconGlyph.settings, size: 16),
            ],
          ),
        ),
        WashButton(
          variant: WashButtonVariant.link,
          ripple: false,
          onPressed: () {},
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Continue'),
              SizedBox(width: 8),
              WashIcon(WashIconGlyph.chevronRight, size: 16),
            ],
          ),
        ),
      ],
    );
  }

  static const _iconLabelsDart = '''
WashButton(
  onPressed: () {},
  child: Row(
    children: [
      WashIcon(WashIconGlyph.add, size: 16),
      SizedBox(width: 8),
      Text('New wash'),
    ],
  ),
);
''';

  static Widget _elementTypes() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        WashButton(label: '<button>', onPressed: () {}),
        WashButton(
          label: '<a class="btn">',
          variant: WashButtonVariant.outline,
          ripple: false,
          onPressed: () {},
        ),
        WashButton(
          label: '<input type=button>',
          variant: WashButtonVariant.defaultVariant,
          ripple: false,
          onPressed: () {},
        ),
        WashButton(
          label: '<input type=submit>',
          variant: WashButtonVariant.neutral,
          ripple: false,
          onPressed: () {},
        ),
        WashButton(
          label: '<input type=reset>',
          variant: WashButtonVariant.ghost,
          ripple: false,
          onPressed: () {},
        ),
      ],
    );
  }

  static const _elementTypesDart = '''
WashButton(label: '<button>', onPressed: () {});
''';

  static Widget _joinSolid() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashButton(label: 'Left', onPressed: () {}),
        WashButton(label: 'Center', active: true, onPressed: () {}),
        WashButton(label: 'Right', onPressed: () {}),
      ],
    );
  }

  static const _joinSolidDart = '''
Row(
  children: [
    WashButton(label: 'Left', onPressed: () {}),
    WashButton(label: 'Center', active: true, onPressed: () {}),
    WashButton(label: 'Right', onPressed: () {}),
  ],
);
''';

  static Widget _joinOutline() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashButton(label: 'Day', variant: WashButtonVariant.outline, onPressed: () {}),
        WashButton(label: 'Week', variant: WashButtonVariant.outline, active: true, onPressed: () {}),
        WashButton(label: 'Month', variant: WashButtonVariant.outline, onPressed: () {}),
      ],
    );
  }

  static const _joinOutlineDart = '''
WashButton(label: 'Week', variant: WashButtonVariant.outline, active: true, onPressed: () {});
''';

  static Widget _joinSearch() {
    return Row(
      children: [
        const Expanded(child: WashInput(hint: 'Filter plates…')),
        WashButton(label: 'Search', ripple: false, onPressed: () {}),
      ],
    );
  }

  static const _joinSearchDart = '''
Row(
  children: [
    Expanded(child: WashInput(hint: 'Filter plates…')),
    WashButton(label: 'Search', onPressed: () {}),
  ],
);
''';

  static Widget _sizeStyleMatrix() {
    const sizes = WashButtonSize.values;
    return Column(
      children: sizes.map((size) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: Row(
            children: [
              SizedBox(
                width: 32,
                child: WashGalleryLabelInk(size.name.toUpperCase()),
              ),
              Flexible(
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    WashButton(label: 'Solid', size: size, ripple: false, onPressed: () {}),
                    WashButton(
                      label: 'Outline',
                      size: size,
                      variant: WashButtonVariant.outline,
                      ripple: false,
                      onPressed: () {},
                    ),
                    WashButton(
                      label: 'Soft',
                      size: size,
                      soft: true,
                      ripple: false,
                      onPressed: () {},
                    ),
                    WashButton(
                      label: 'Ghost',
                      size: size,
                      variant: WashButtonVariant.ghost,
                      ripple: false,
                      onPressed: () {},
                    ),
                    WashButton(
                      label: 'Dash',
                      size: size,
                      variant: WashButtonVariant.outline,
                      dash: true,
                      ripple: false,
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  static const _sizeStyleMatrixDart = '''
WashButton(size: WashButtonSize.sm, soft: true, onPressed: () {});
''';
}
