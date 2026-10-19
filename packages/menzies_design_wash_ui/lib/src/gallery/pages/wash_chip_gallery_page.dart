import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/chip/wash_chip.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashChipGalleryPage extends StatelessWidget {
  const WashChipGalleryPage({super.key});

  static const _colors = <(String, WashBadgeTone)>[
    ('Default', WashBadgeTone.defaultTone),
    ('Neutral', WashBadgeTone.neutral),
    ('Primary', WashBadgeTone.primary),
    ('Secondary', WashBadgeTone.secondary),
    ('Accent', WashBadgeTone.accent),
    ('Info', WashBadgeTone.info),
    ('Success', WashBadgeTone.success),
    ('Warning', WashBadgeTone.warning),
    ('Error', WashBadgeTone.error),
  ];

  static const _styleColors = <(String, WashBadgeTone)>[
    ('Primary', WashBadgeTone.primary),
    ('Secondary', WashBadgeTone.secondary),
    ('Accent', WashBadgeTone.accent),
    ('Info', WashBadgeTone.info),
    ('Success', WashBadgeTone.success),
    ('Warning', WashBadgeTone.warning),
    ('Error', WashBadgeTone.error),
  ];

  static const _sizes = <(WashBadgeSize, String)>[
    (WashBadgeSize.xs, 'Xsmall'),
    (WashBadgeSize.sm, 'Small'),
    (WashBadgeSize.md, 'Medium'),
    (WashBadgeSize.lg, 'Large'),
    (WashBadgeSize.xl, 'Xlarge'),
  ];

  static const _washBlue = Color(0xFF4A7FA8);

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Chip',
      description:
          'Selectable and dismissible tags composed with daisyUI badge (no dedicated chip class).',
      sections: [
        _s('01 · Basic', 'Tag chips', 'Plain badge used as a chip or tag', _basic(), _basicDart),
        _s('02 · Colors', 'Semantic colors', 'Official badge color modifiers as chip fills', _semanticColors(), _colorsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Variants', 'Styles across colors', 'Outline, dash, soft, and ghost chip variants', _variants(), _variantsDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Sizes', 'Size scale', 'badge-xs through badge-xl for chip density', _sizesRow(), _sizesDart),
        _s('05 · Avatar / icon', 'Chips with avatar or Lucide', 'Composed: badge plus avatar thumbnail or Lucide 1.28.0 icon', _avatarIcon(), _avatarDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Dismissible', 'Remove on click', 'Composed chip: badge label', const _DismissibleChipsDemo(), _dismissDart, tint: WashGalleryPanelTint.rose),
        _s('07 · Selectable', 'Filter chips', 'Composed toggle: outline when idle, primary when selected', const _SelectableChipsDemo(), _selectDart),
        _s('08 · Studio', 'Pigment and wash tags', 'Studio-themed tag sets for pigments and wash techniques', _studio(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('09 · Wrap', 'Responsive wrap', 'flex-wrap keeps chips readable on mobile without horizontal page', _wrap(), _wrapDart),
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
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
        ),
      ],
    );
  }

  static Widget _wrapRow(List<Widget> children, {double gap = 16}) {
    return Wrap(
      spacing: gap,
      runSpacing: gap,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: children,
    );
  }

  static Widget _basic() {
    return _wrapRow([
      _sample('badge', const WashChip(label: 'Chip')),
      _sample('badge badge-soft', const WashChip(label: 'Soft tag', style: WashBadgeStyle.soft)),
      _sample('badge badge-outline', const WashChip(label: 'Outline tag', style: WashBadgeStyle.outline)),
      _sample('badge badge-ghost', const WashChip(label: 'Ghost tag', style: WashBadgeStyle.ghost)),
    ]);
  }

  static Widget _semanticColors() {
    return _wrapRow(
      _colors.map((c) {
        final cls = c.$2 == WashBadgeTone.defaultTone ? 'badge' : 'badge badge-${c.$1.toLowerCase()}';
        return _sample(cls, WashChip(label: c.$1, tone: c.$2));
      }).toList(),
    );
  }

  static Widget _variants() {
    const styles = <(String, WashBadgeStyle)>[
      ('Default', WashBadgeStyle.solid),
      ('Outline', WashBadgeStyle.outline),
      ('Dash', WashBadgeStyle.dash),
      ('Soft', WashBadgeStyle.soft),
      ('Ghost', WashBadgeStyle.ghost),
    ];
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 520;
        final columns = styles.map((style) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk(style.$1),
                const SizedBox(height: 12),
                if (style.$2 == WashBadgeStyle.ghost ||
                    (style.$2 == WashBadgeStyle.solid && style.$1 == 'Default'))
                  _sample(
                    style.$2 == WashBadgeStyle.ghost ? 'badge badge-ghost' : 'badge',
                    WashChip(label: style.$1, style: style.$2),
                  )
                else
                  ..._styleColors.map(
                    (c) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: _sample(
                        'badge badge-${style.$2.name} badge-${c.$2.name}',
                        WashChip(label: c.$1, tone: c.$2, style: style.$2),
                      ),
                    ),
                  ),
              ],
            ),
          );
        }).toList();
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: columns.map((c) => Expanded(child: c)).toList(),
          );
        }
        return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: columns);
      },
    );
  }

  static Widget _sizesRow() {
    return _wrapRow(
      _sizes.map((s) => _sample('badge badge-${s.$1.name}', WashChip(label: s.$2, size: s.$1))).toList(),
    );
  }

  static Widget _chipAvatarPlaceholder() {
    return Container(
      width: 20,
      height: 20,
      alignment: Alignment.center,
      decoration: const BoxDecoration(color: _washBlue, shape: BoxShape.circle),
      child: Text(
        'MK',
        style: WashTypography.label(const Color(0xFF1A1A1A)).copyWith(fontSize: 8.8, fontWeight: FontWeight.w600),
      ),
    );
  }

  static Widget _chipAvatarImage() {
    return ClipOval(
      child: Image.network(
        'https://picsum.photos/seed/wash-chip/40/40',
        width: 20,
        height: 20,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => const SizedBox(width: 20, height: 20),
      ),
    );
  }

  static Widget _avatarIcon() {
    return _wrapRow([
      _sample(
        'badge badge-lg + avatar',
        WashChip(
          label: 'Maya K.',
          size: WashBadgeSize.lg,
          leading: _chipAvatarPlaceholder(),
        ),
      ),
      _sample(
        'badge badge-primary badge-lg + avatar',
        WashChip(
          label: 'Series lead',
          tone: WashBadgeTone.primary,
          size: WashBadgeSize.lg,
          leading: _chipAvatarImage(),
        ),
      ),
      _sample(
        'badge badge-primary + Lucide',
        const WashChip(label: 'Tags', tone: WashBadgeTone.primary, iconName: 'tags'),
      ),
      _sample(
        'badge badge-secondary + Lucide',
        const WashChip(label: 'Hash', tone: WashBadgeTone.secondary, iconName: 'hash'),
      ),
      _sample(
        'badge badge-info + Lucide',
        const WashChip(label: 'Droplet', tone: WashBadgeTone.info, iconName: 'droplet'),
      ),
      _sample(
        'badge badge-accent + Lucide',
        const WashChip(label: 'Brush', tone: WashBadgeTone.accent, iconName: 'paintbrush'),
      ),
    ]);
  }

  static Widget _studio() {
    const pigments = <(String, WashBadgeTone)>[
      ('Ultramarine', WashBadgeTone.info),
      ('Cobalt', WashBadgeTone.primary),
      ('Cerulean', WashBadgeTone.accent),
      ('Burnt sienna', WashBadgeTone.warning),
      ('Sap green', WashBadgeTone.success),
      ('Quinacridone', WashBadgeTone.secondary),
    ];
    const washes = <(String, WashBadgeTone)>[
      ('Wet-on-wet', WashBadgeTone.info),
      ('Dry brush', WashBadgeTone.warning),
      ('Glaze', WashBadgeTone.primary),
      ('Bloom', WashBadgeTone.secondary),
      ('Lift', WashBadgeTone.accent),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashGalleryLabelInk('Pigment tags'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: pigments
              .map(
                (p) => _sample(
                  'badge badge-${p.$2.name} badge-soft',
                  WashChip(label: p.$1, tone: p.$2, style: WashBadgeStyle.soft, iconName: 'droplet'),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 24),
        WashGalleryLabelInk('Wash tags'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: washes
              .map(
                (w) => _sample(
                  'badge badge-outline badge-${w.$2.name}',
                  WashChip(label: w.$1, tone: w.$2, style: WashBadgeStyle.outline, iconName: 'sparkles'),
                ),
              )
              .toList(),
        ),
      ],
    );
  }

  static const _wrapLabels = [
    'Ultramarine deep',
    'Permanent rose',
    'Yellow ochre',
    'Raw umber',
    'Viridian',
    'Payne grey',
    'Titanium white',
    'Indigo',
    'Naples yellow',
    'Alizarin crimson',
    'Hooker green',
    'Sepia',
  ];

  static Widget _wrap() {
    return _sample(
      'flex flex-wrap gap-2',
      Wrap(
        spacing: 8,
        runSpacing: 8,
        children: _wrapLabels
            .map(
              (label) => WashChip(
                label: label,
                tone: WashBadgeTone.neutral,
                style: WashBadgeStyle.soft,
              ),
            )
            .toList(),
      ),
    );
  }

  static const _basicDart = "WashChip(label: 'Chip'); WashChip(style: WashBadgeStyle.soft);";
  static const _colorsDart = "WashChip(label: 'Primary', tone: WashBadgeTone.primary);";
  static const _variantsDart = "WashChip(style: WashBadgeStyle.outline, tone: WashBadgeTone.primary);";
  static const _sizesDart = "WashChip(label: 'Small', size: WashBadgeSize.sm);";
  static const _avatarDart = "WashChip(label: 'Maya K.', size: WashBadgeSize.lg, leading: avatar);";
  static const _dismissDart = "WashChip(label: 'Tag', tone: WashBadgeTone.primary, onDeleted: () {});";
  static const _selectDart = "WashChip.selectable(label: 'Glaze', selected: true, onPressed: () {});";
  static const _studioDart = "WashChip(iconName: 'droplet', style: WashBadgeStyle.soft);";
  static const _wrapDart = 'Wrap(children: [WashChip(style: WashBadgeStyle.soft, tone: WashBadgeTone.neutral)]);';
}

class _DismissibleChipsDemo extends StatefulWidget {
  const _DismissibleChipsDemo();

  @override
  State<_DismissibleChipsDemo> createState() => _DismissibleChipsDemoState();
}

class _DismissibleChipsDemoState extends State<_DismissibleChipsDemo> {
  static const _initial = <_DismissChip>[
    _DismissChip('rose', 'Quinacridone rose', WashBadgeTone.primary),
    _DismissChip('ochre', 'Yellow ochre', WashBadgeTone.secondary),
    _DismissChip('ultra', 'Ultramarine', WashBadgeTone.accent),
    _DismissChip('draft', 'Draft plate', WashBadgeTone.error, style: WashBadgeStyle.soft),
  ];

  var _chips = List<_DismissChip>.from(_initial);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: _chips.isEmpty
              ? [
                  Text(
                    'All chips dismissed.',
                    style: WashTypography.body(WashTokens.of(context).inkMuted),
                  ),
                ]
              : _chips
                  .map(
                    (chip) => WashChipGalleryPage._sample(
                      'badge ${chip.style == WashBadgeStyle.soft ? 'badge-soft badge-${chip.tone.name}' : 'badge-${chip.tone.name}'} + dismiss',
                      WashChip(
                        label: chip.label,
                        tone: chip.tone,
                        style: chip.style,
                        onDeleted: () => setState(() => _chips.removeWhere((c) => c.id == chip.id)),
                      ),
                    ),
                  )
                  .toList(),
        ),
        if (_chips.length < _initial.length) ...[
          const SizedBox(height: 16),
          WashButton(
            label: 'Restore chips',
            variant: WashButtonVariant.ghost,
            size: WashButtonSize.sm,
            onPressed: () => setState(() => _chips = List<_DismissChip>.from(_initial)),
          ),
        ],
      ],
    );
  }
}

class _DismissChip {
  const _DismissChip(this.id, this.label, this.tone, {this.style = WashBadgeStyle.solid});
  final String id;
  final String label;
  final WashBadgeTone tone;
  final WashBadgeStyle style;
}

class _SelectableChipsDemo extends StatefulWidget {
  const _SelectableChipsDemo();

  @override
  State<_SelectableChipsDemo> createState() => _SelectableChipsDemoState();
}

class _SelectableChipsDemoState extends State<_SelectableChipsDemo> {
  static const _options = ['Glaze', 'Granulating', 'Opaque', 'Cool', 'Warm', 'Earth'];
  final _selected = <String>{'Glaze', 'Cool'};

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _options.map((label) {
            final on = _selected.contains(label);
            return WashChipGalleryPage._sample(
              on ? 'badge badge-primary cursor-pointer' : 'badge badge-outline cursor-pointer',
              WashChip.selectable(
                label: label,
                selected: on,
                onPressed: () {
                  setState(() {
                    if (_selected.contains(label)) {
                      _selected.remove(label);
                    } else {
                      _selected.add(label);
                    }
                  });
                },
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 12),
        Text(
          'Selected: ${_selected.isEmpty ? 'none' : _selected.join(', ')}',
          style: WashTypography.body(tokens.inkMuted),
        ),
      ],
    );
  }
}
