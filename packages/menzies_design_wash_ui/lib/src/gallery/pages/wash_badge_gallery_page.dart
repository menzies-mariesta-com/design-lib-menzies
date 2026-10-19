import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashBadgeGalleryPage extends StatelessWidget {
  const WashBadgeGalleryPage({super.key});

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
  static const _washRose = Color(0xFFC45C6E);
  static const _washOchre = Color(0xFFB87524);

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Badge',
      description: 'daisyUI badge colors, sizes, and styles.',
      sections: [
        _s('01 · Basic', 'Default badges', 'Plain badge with no color or style modifier', _basic(), _basicDart),
        _s('02 · Colors', 'Semantic colors', 'Default ink plus neutral, brand, and status colors', _semanticColors(), _colorsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'Size scale', 'badge-xs through badge-xl', _sizesRow(), _sizesDart),
        _s('04 · Soft', 'Soft variant', 'badge-soft with each brand and status color', _styled(WashBadgeStyle.soft), _softDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Outline', 'Outline variant', 'badge-outline for a lighter border treatment', _styled(WashBadgeStyle.outline), _outlineDart),
        _s('06 · Dash', 'Dash variant', 'badge-dash uses a dashed outline', _styled(WashBadgeStyle.dash), _dashDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Ghost', 'Ghost variant', 'badge-ghost for a quiet, low-contrast label', _ghost(), _ghostDart),
        _s('08 · Neutral outline / dash', 'Neutral on light ground', 'Neutral outline and dash use dark text', _neutralLight(), _neutralDart, tint: WashGalleryPanelTint.rose),
        _s('09 · Variants × colors', 'Style matrix', 'Outline, dash, soft, and ghost across brand and status colors', _matrix(), _matrixDart),
        _s('10 · Empty', 'Empty badges', 'Remove the text for a status dot', _empty(), _emptyDart, tint: WashGalleryPanelTint.ochre),
        _s('11 · Icons', 'Badges with Lucide', 'Status badges with matching Lucide 1.28.0 icons', _icons(), _iconsDart),
        _s('12 · In text', 'Inline with headings', 'Pair badge size with surrounding type scale', _inText(), _inTextDart, tint: WashGalleryPanelTint.rose),
        _s('13 · In buttons', 'Nested in buttons', 'Small badges as counts inside interactive buttons', _inButtons(), _inButtonsDart),
        _s('14 · With avatars', 'Beside avatar placeholders', 'Role and presence chips next to studio avatars', _withAvatars(), _avatarsDart, tint: WashGalleryPanelTint.ochre),
        _s('15 · In lists', 'List rows with status chips', 'badge-sm chips on daisyUI list-row items', _inLists(), _listsDart),
        _s('16 · Studio', 'Pigment tags and wash chips', 'Soft pigment labels and wash-state chips for the desk', _studio(), _studioDart, tint: WashGalleryPanelTint.rose),
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
    return _wrap([
      _sample('badge', const WashBadge('Badge')),
      _sample('badge (label)', const WashBadge('New')),
      _sample('badge (count)', const WashBadge('3')),
    ]);
  }

  static Widget _semanticColors() {
    return _wrap(
      _colors.map((c) {
        final cls = c.$2 == WashBadgeTone.defaultTone ? 'badge' : 'badge badge-${c.$1.toLowerCase()}';
        return _sample(cls, WashBadge(c.$1, tone: c.$2));
      }).toList(),
    );
  }

  static Widget _sizesRow() {
    return _wrap(
      _sizes.map((s) => _sample('badge badge-${s.$1.name}', WashBadge(s.$2, size: s.$1))).toList(),
      gap: 20,
    );
  }

  static Widget _styled(WashBadgeStyle style) {
    return _wrap(
      _styleColors.map((c) {
        return _sample(
          'badge badge-${style.name} badge-${c.$2.name}',
          WashBadge(c.$1, tone: c.$2, style: style),
        );
      }).toList(),
    );
  }

  static Widget _ghost() => _sample('badge badge-ghost', const WashBadge('ghost', style: WashBadgeStyle.ghost));

  static Widget _neutralLight() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFFFF),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0x33111111)),
      ),
      child: _wrap([
        _sample(
          'badge badge-neutral badge-outline',
          const WashBadge('Outline', tone: WashBadgeTone.neutral, style: WashBadgeStyle.outline),
        ),
        _sample(
          'badge badge-neutral badge-dash',
          const WashBadge('Dash', tone: WashBadgeTone.neutral, style: WashBadgeStyle.dash),
        ),
      ]),
    );
  }

  static Widget _matrix() {
    const styles = [
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
                if (style.$2 == WashBadgeStyle.ghost)
                  _sample('badge badge-ghost', const WashBadge('Ghost', style: WashBadgeStyle.ghost))
                else
                  ..._styleColors.map(
                    (c) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: _sample(
                        'badge badge-${style.$2.name} badge-${c.$2.name}',
                        WashBadge(c.$1, tone: c.$2, style: style.$2),
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

  static Widget _empty() {
    const order = [
      WashBadgeSize.xl,
      WashBadgeSize.lg,
      WashBadgeSize.md,
      WashBadgeSize.sm,
      WashBadgeSize.xs,
    ];
    return _wrap(
      order
          .map(
            (s) => _sample(
              'badge badge-primary badge-${s.name}',
              WashBadge('', tone: WashBadgeTone.primary, size: s, semanticsLabel: 'Empty badge-${s.name}'),
            ),
          )
          .toList(),
    );
  }

  static Widget _icons() {
    return _wrap([
      _sample('badge badge-info + Lucide', const WashBadge.icon('info', 'Info', tone: WashBadgeTone.info)),
      _sample('badge badge-success + Lucide', const WashBadge.icon('circle-check', 'Success', tone: WashBadgeTone.success)),
      _sample('badge badge-warning + Lucide', const WashBadge.icon('triangle-alert', 'Warning', tone: WashBadgeTone.warning)),
      _sample('badge badge-error + Lucide', const WashBadge.icon('circle-x', 'Error', tone: WashBadgeTone.error)),
      _sample('badge badge-primary + BadgeCheck', const WashBadge.icon('badge-check', 'Verified', tone: WashBadgeTone.primary)),
    ]);
  }

  static Widget _inText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          'text-xl + badge badge-xl',
          Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
              children: [
                const TextSpan(text: 'Heading 1 '),
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.xl)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        _sample(
          'text-lg + badge badge-lg',
          Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              children: [
                const TextSpan(text: 'Heading 2 '),
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.lg)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        _sample(
          'text-base + badge badge-md',
          Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              children: [
                const TextSpan(text: 'Heading 3 '),
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.md)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        _sample(
          'text-sm + badge badge-sm',
          Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
              children: [
                const TextSpan(text: 'Heading 4 '),
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.sm)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        _sample(
          'text-xs + badge badge-xs',
          Text.rich(
            TextSpan(
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
              children: [
                const TextSpan(text: 'Heading 5 '),
                WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.xs)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        _sample(
          'paragraph + badge badge-xs',
          Builder(
            builder: (context) {
              final muted = WashTokens.of(context).inkMuted;
              return Text.rich(
                TextSpan(
                  style: TextStyle(fontSize: 12, color: muted),
                  children: [
                    const TextSpan(text: 'Paragraph '),
                    WidgetSpan(alignment: PlaceholderAlignment.middle, child: WashBadge('Badge', size: WashBadgeSize.xs)),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  static Widget _inButtons() {
    return _wrap([
      _sample(
        'btn + badge badge-sm',
        WashButton(
          onPressed: () {},
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Inbox'),
              const SizedBox(width: 8),
              const WashBadge('+99', size: WashBadgeSize.sm),
            ],
          ),
        ),
      ),
      _sample(
        'btn + badge badge-sm badge-secondary',
        WashButton(
          onPressed: () {},
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Inbox'),
              const SizedBox(width: 8),
              const WashBadge('+99', size: WashBadgeSize.sm, tone: WashBadgeTone.secondary),
            ],
          ),
        ),
      ),
      _sample(
        'btn btn-primary + badge badge-sm badge-neutral',
        WashButton(
          onPressed: () {},
          variant: WashButtonVariant.primary,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const WashLucideIcon('badge-check', size: 16),
              const SizedBox(width: 8),
              const Text('Series'),
              const SizedBox(width: 8),
              const WashBadge('12', size: WashBadgeSize.sm, tone: WashBadgeTone.neutral),
            ],
          ),
        ),
      ),
      _sample(
        'btn btn-ghost + badge badge-xs badge-error',
        WashButton(
          onPressed: () {},
          variant: WashButtonVariant.ghost,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Alerts'),
              const SizedBox(width: 8),
              const WashBadge('2', size: WashBadgeSize.xs, tone: WashBadgeTone.error),
            ],
          ),
        ),
      ),
    ]);
  }

  static Widget _avatarCircle(String initials, Color bg, double size) {
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(color: bg, shape: BoxShape.circle),
      child: Text(
        initials,
        style: TextStyle(
          color: const Color(0xFFFFFFFF),
          fontSize: size < 36 ? 11 : 13,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  static Widget _withAvatars() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 480;
        final cells = [
          _sample(
            'avatar + badge badge-sm badge-primary',
            Row(
              children: [
                _avatarCircle('MK', _washBlue, 40),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Maya K.', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    const SizedBox(height: 4),
                    const WashBadge('Lead', size: WashBadgeSize.sm, tone: WashBadgeTone.primary),
                  ],
                ),
              ],
            ),
          ),
          _sample(
            'avatar + badge badge-sm badge-success',
            Row(
              children: [
                _avatarCircle('JL', _washRose, 40),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Jules L.', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    const SizedBox(height: 4),
                    const WashBadge('Online', size: WashBadgeSize.sm, tone: WashBadgeTone.success),
                  ],
                ),
              ],
            ),
          ),
          _sample(
            'avatar-group + badge badge-xs',
            Row(
              children: [
                SizedBox(
                  width: 72,
                  height: 32,
                  child: Stack(
                    clipBehavior: Clip.none,
                    children: [
                      Positioned(left: 0, child: _avatarCircle('A', _washBlue, 32)),
                      Positioned(left: 20, child: _avatarCircle('B', _washOchre, 32)),
                      Positioned(left: 40, child: _avatarCircle('C', _washRose, 32)),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                const WashBadge('+4', size: WashBadgeSize.xs, tone: WashBadgeTone.neutral),
              ],
            ),
          ),
        ];
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: cells.map((c) => Expanded(child: c)).toList(),
          );
        }
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: cells);
      },
    );
  }

  static Widget _inLists() {
    const rows = [
      ('UB', _washBlue, 'Ultramarine study', 'Cold wash, two layers', 'Wet', WashBadgeTone.info),
      ('QR', _washRose, 'Quinacridone rose', 'Warm glaze pending', 'Drying', WashBadgeTone.warning),
      ('SG', _washOchre, 'Sap green field', 'Ready for detail', 'Dry', WashBadgeTone.success),
    ];
    return _sample(
      'list + list-row + badge badge-sm',
      Builder(
        builder: (context) {
          final tokens = WashTokens.of(context);
          return DecoratedBox(
            decoration: washInkBorderBox(tokens),
            child: Column(
              children: [
                for (var i = 0; i < rows.length; i++) ...[
                  if (i > 0)
                    Container(height: 1, color: tokens.inkBorder.withValues(alpha: 0.7)),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: rows[i].$2,
                            borderRadius: BorderRadius.circular(tokens.radiusBox),
                          ),
                          child: Text(rows[i].$1, style: const TextStyle(color: Color(0xFFFFFFFF), fontWeight: FontWeight.w600, fontSize: 13)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(rows[i].$3, style: const TextStyle(fontWeight: FontWeight.w600)),
                              Text(rows[i].$4, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12)),
                            ],
                          ),
                        ),
                        WashBadge(rows[i].$5, size: WashBadgeSize.sm, tone: rows[i].$6),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          );
        },
      ),
    );
  }

  static Widget _studio() {
    const pigments = <(String, WashBadgeTone)>[
      ('Ultramarine', WashBadgeTone.primary),
      ('Quinacridone', WashBadgeTone.secondary),
      ('Sap green', WashBadgeTone.accent),
      ('Raw sienna', WashBadgeTone.warning),
      ('Payne gray', WashBadgeTone.neutral),
      ('Cerulean', WashBadgeTone.info),
    ];
    const chips = <(String, WashBadgeTone, WashBadgeStyle, String)>[
      ('Wet', WashBadgeTone.info, WashBadgeStyle.soft, 'droplets'),
      ('Drying', WashBadgeTone.warning, WashBadgeStyle.soft, 'layers'),
      ('Dry', WashBadgeTone.success, WashBadgeStyle.soft, 'circle-check'),
      ('Glaze ready', WashBadgeTone.primary, WashBadgeStyle.soft, 'paintbrush'),
      ('Hold', WashBadgeTone.neutral, WashBadgeStyle.outline, 'triangle-alert'),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashGalleryLabelInk('Pigment tags'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: pigments
              .map(
                (p) => _sample(
                  'badge badge-soft badge-${p.$2.name}',
                  WashBadge(p.$1, tone: p.$2, style: WashBadgeStyle.soft),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 24),
        const WashGalleryLabelInk('Wash status chips'),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: chips
              .map(
                (c) => _sample(
                  'badge badge-${c.$3.name} badge-${c.$2.name} + Lucide',
                  WashBadge.icon(c.$4, c.$1, tone: c.$2, style: c.$3),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 24),
        Builder(
          builder: (context) {
            final tokens = WashTokens.of(context);
            return DecoratedBox(
              decoration: BoxDecoration(
                color: tokens.palette.base100.withValues(alpha: 0.8),
                borderRadius: BorderRadius.circular(tokens.radiusBox),
                border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Plate 214 · Morning fog', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                    const SizedBox(height: 4),
                    Text(
                      'Cold wash, cerulean underpaint, hold before second layer.',
                      style: WashTypography.body(tokens.inkMuted),
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: const [
                        WashBadge('Wet', tone: WashBadgeTone.info, style: WashBadgeStyle.soft),
                        WashBadge('Series A', tone: WashBadgeTone.primary, style: WashBadgeStyle.outline),
                        WashBadge('Draft', style: WashBadgeStyle.ghost),
                      ],
                    ),
                    const SizedBox(height: 8),
                    _classLabel('badge-soft / badge-outline / badge-ghost (studio card)'),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  static Widget _wrap(List<Widget> children, {double gap = 16}) {
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.end,
      spacing: gap,
      runSpacing: gap,
      children: children,
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        _classLabel(label),
      ],
    );
  }

  static Widget _classLabel(String value) {
    return Text(
      value.isEmpty ? 'badge' : value,
      style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4),
    );
  }

  static const _basicDart = "WashBadge('Badge'); WashBadge('New'); WashBadge('3');";
  static const _colorsDart = "WashBadge('Primary', tone: WashBadgeTone.primary);";
  static const _sizesDart = "WashBadge('Xsmall', size: WashBadgeSize.xs);";
  static const _softDart =
      "WashBadge('Primary', tone: WashBadgeTone.primary, style: WashBadgeStyle.soft);";
  static const _outlineDart =
      'WashBadge(style: WashBadgeStyle.outline, tone: WashBadgeTone.primary);';
  static const _dashDart = 'WashBadge(style: WashBadgeStyle.dash, tone: WashBadgeTone.primary);';
  static const _ghostDart = "WashBadge('ghost', style: WashBadgeStyle.ghost);";
  static const _neutralDart =
      'WashBadge(tone: WashBadgeTone.neutral, style: WashBadgeStyle.outline);';
  static const _matrixDart =
      'WashBadge(style: WashBadgeStyle.soft, tone: WashBadgeTone.primary);';
  static const _emptyDart =
      "WashBadge('', tone: WashBadgeTone.primary, size: WashBadgeSize.md);";
  static const _iconsDart = "WashBadge.icon('info', 'Info', tone: WashBadgeTone.info);";
  static const _inTextDart =
      'Text.rich(WidgetSpan(child: WashBadge(..., size: WashBadgeSize.xl)));';
  static const _inButtonsDart =
      "WashButton(child: Row(children: [Text('Inbox'), WashBadge('+99', size: WashBadgeSize.sm)]));";
  static const _avatarsDart =
      "Row(children: [avatar, WashBadge('Lead', size: WashBadgeSize.sm)]);";
  static const _listsDart =
      "WashBadge('Wet', size: WashBadgeSize.sm, tone: WashBadgeTone.info);";
  static const _studioDart =
      "WashBadge('Ultramarine', style: WashBadgeStyle.soft, tone: WashBadgeTone.primary);";
}
