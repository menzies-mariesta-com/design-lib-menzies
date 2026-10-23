import 'package:flutter/widgets.dart';

import '../../components/avatar/wash_avatar.dart';
import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/indicator/wash_indicator.dart';
import '../../components/input/wash_editable.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashIndicatorGalleryPage extends StatelessWidget {
  const WashIndicatorGalleryPage({super.key});

  static const _statusTones = <(String, WashStatusTone)>[
    ('Primary', WashStatusTone.primary),
    ('Secondary', WashStatusTone.secondary),
    ('Accent', WashStatusTone.accent),
    ('Info', WashStatusTone.info),
    ('Success', WashStatusTone.success),
    ('Warning', WashStatusTone.warning),
    ('Error', WashStatusTone.error),
  ];

  static const _badgeTones = <(String, WashBadgeTone)>[
    ('Primary', WashBadgeTone.primary),
    ('Secondary', WashBadgeTone.secondary),
    ('Accent', WashBadgeTone.accent),
    ('Info', WashBadgeTone.info),
    ('Success', WashBadgeTone.success),
    ('Warning', WashBadgeTone.warning),
    ('Error', WashBadgeTone.error),
  ];

  static const _positions =
      <(String, WashIndicatorVertical, WashIndicatorHorizontal)>[
    ('Top start', WashIndicatorVertical.top, WashIndicatorHorizontal.start),
    ('Top center', WashIndicatorVertical.top, WashIndicatorHorizontal.center),
    ('Top end', WashIndicatorVertical.top, WashIndicatorHorizontal.end),
    (
      'Middle start',
      WashIndicatorVertical.middle,
      WashIndicatorHorizontal.start
    ),
    (
      'Middle center',
      WashIndicatorVertical.middle,
      WashIndicatorHorizontal.center
    ),
    ('Middle end', WashIndicatorVertical.middle, WashIndicatorHorizontal.end),
    (
      'Bottom start',
      WashIndicatorVertical.bottom,
      WashIndicatorHorizontal.start
    ),
    (
      'Bottom center',
      WashIndicatorVertical.bottom,
      WashIndicatorHorizontal.center
    ),
    ('Bottom end', WashIndicatorVertical.bottom, WashIndicatorHorizontal.end),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Indicator',
      description:
          'daisyUI indicator pins a badge or status dot on buttons, avatars, inputs, and studio.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Badge and status dots',
          description: 'Place indicator-item before the main content',
          child: LayoutBuilder(
            builder: (context, c) {
              final cols = c.maxWidth >= WashTailwindBreakpoints.lg
                  ? 3
                  : (c.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
              final w = (c.maxWidth - (cols - 1) * 32) / cols;
              final tabs = [
                WashShowcaseTabs(
                  preview: _basicBadge(),
                  dartSource: _basicBadgeDart,
                ),
                WashShowcaseTabs(
                  preview: _basicStatus(),
                  dartSource: _basicStatusDart,
                ),
                WashShowcaseTabs(
                  preview: _basicInbox(),
                  dartSource: _basicInboxDart,
                ),
              ];
              return Wrap(
                spacing: 32,
                runSpacing: 24,
                crossAxisAlignment: WrapCrossAlignment.end,
                children: [
                  for (final tab in tabs) SizedBox(width: w, child: tab),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Positions',
          title: 'Placement grid',
          description:
              'Combine horizontal and vertical placement classes on indicator-item',
          tint: WashGalleryPanelTint.ochre,
          child: LayoutBuilder(
            builder: (context, c) {
              final cols = c.maxWidth >= WashTailwindBreakpoints.lg
                  ? 3
                  : (c.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
              final w = (c.maxWidth - (cols - 1) * 32) / cols;
              return Wrap(
                spacing: 32,
                runSpacing: 32,
                children: [
                  for (var i = 0; i < _positions.length; i++)
                    SizedBox(
                      width: cols == 1 ? c.maxWidth : w,
                      child: WashShowcaseTabs(
                        preview: _positionCell(_positions[i]),
                        dartSource: _positionDart(_positions[i]),
                      ),
                    ),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · All corners',
          title: 'Multiple indicators',
          description: 'Stack several indicator-item nodes on one container',
          child:
              WashShowcaseTabs(preview: _corners(), dartSource: _cornersDart),
        ),
        WashGallerySection(
          eyebrow: '04 · Status colors',
          title: 'Semantic status dots',
          description:
              'status with brand and feedback colors on the indicator corner',
          tint: WashGalleryPanelTint.rose,
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              for (final row in _statusTones)
                WashShowcaseTabs(
                  preview: _statusColorCell(row.$1, row.$2),
                  dartSource: _statusDart(row.$1, row.$2),
                ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Badge colors',
          title: 'Semantic badge indicators',
          description:
              'badge colors for counts and labels on the same placement',
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              for (final row in _badgeTones)
                WashShowcaseTabs(
                  preview: _badgeColorCell(row.$1, row.$2),
                  dartSource: _badgeColorDart(row.$1, row.$2),
                ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · With avatar',
          title: 'Avatar indicators',
          description:
              'Combine avatar and indicator for presence or role labels',
          tint: WashGalleryPanelTint.ochre,
          child: Wrap(
            spacing: 32,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              WashShowcaseTabs(
                  preview: _avatarLead(), dartSource: _avatarLeadDart),
              WashShowcaseTabs(
                  preview: _avatarOnline(), dartSource: _avatarOnlineDart),
              WashShowcaseTabs(
                  preview: _avatarAlert(), dartSource: _avatarAlertDart),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · With button',
          title: 'Button indicators',
          description: 'Unread counts and soft badges on interactive controls',
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              WashShowcaseTabs(
                  preview: _btnCritiques(), dartSource: _btnCritiquesDart),
              WashShowcaseTabs(
                  preview: _btnSeries(), dartSource: _btnSeriesDart),
              WashShowcaseTabs(
                  preview: _btnMessages(), dartSource: _btnMessagesDart),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · With input',
          title: 'Input indicators',
          description: 'Required or hint badges anchored to form fields',
          tint: WashGalleryPanelTint.rose,
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              WashShowcaseTabs(
                  preview: _inputRequired(), dartSource: _inputRequiredDart),
              WashShowcaseTabs(
                  preview: _inputHint(), dartSource: _inputHintDart),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '09 · Studio',
          title: 'Menzies Design patterns',
          description: 'Unread critique count, layer lock, and brush wet state',
          child: LayoutBuilder(
            builder: (context, c) {
              final cols = c.maxWidth >= WashTailwindBreakpoints.lg
                  ? 3
                  : (c.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
              final w = (c.maxWidth - (cols - 1) * 24) / cols;
              return Wrap(
                spacing: 24,
                runSpacing: 24,
                children: [
                  SizedBox(
                      width: cols == 1 ? c.maxWidth : w,
                      child: WashShowcaseTabs(
                          preview: _studioCritiques(),
                          dartSource: _studioCritiquesDart)),
                  SizedBox(
                      width: cols == 1 ? c.maxWidth : w,
                      child: WashShowcaseTabs(
                          preview: _studioLock(), dartSource: _studioLockDart)),
                  SizedBox(
                      width: cols == 1 ? c.maxWidth : w,
                      child: WashShowcaseTabs(
                          preview: _studioWet(), dartSource: _studioWetDart)),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '10 · Responsive',
          title: 'Breakpoint placement',
          description:
              'Resize the viewport: start, then middle, bottom, center, end',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
              preview: _responsive(), dartSource: _responsiveDart),
        ),
      ],
    );
  }

  static Widget _contentBox(String label) {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return Container(
          width: 96,
          height: 96,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: tokens.surfaceContainer,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(label,
              style:
                  WashTypography.body(tokens.onSurface).copyWith(fontSize: 14)),
        );
      },
    );
  }

  static Widget _basicBadge() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(child: WashBadge('New', tone: WashBadgeTone.primary)),
      ],
      child: _contentBox('content'),
    );
  }

  static const _basicBadgeDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('New', tone: WashBadgeTone.primary))],
  child: contentBox,
);''';

  static Widget _basicStatus() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
          child: WashStatusDot(
              tone: WashStatusTone.success, semanticsLabel: 'Online'),
        ),
      ],
      child: _contentBox('content'),
    );
  }

  static const _basicStatusDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashStatusDot(tone: WashStatusTone.success, semanticsLabel: 'Online'))],
  child: contentBox,
);''';

  static Widget _basicInbox() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
            child: WashBadge('12', tone: WashBadgeTone.secondary)),
      ],
      child: WashButton(label: 'Inbox', onPressed: () {}),
    );
  }

  static const _basicInboxDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('12', tone: WashBadgeTone.secondary))],
  child: WashButton(label: 'Inbox', onPressed: () {}),
);''';

  static Widget _positionCell(
      (String, WashIndicatorVertical, WashIndicatorHorizontal) p) {
    return WashIndicator(
      marks: [
        WashIndicatorMark(
          vertical: p.$2,
          horizontal: p.$3,
          child: const WashBadge('',
              tone: WashBadgeTone.secondary, size: WashBadgeSize.sm),
        ),
      ],
      child: _contentBox(p.$1),
    );
  }

  static String _positionDart(
      (String, WashIndicatorVertical, WashIndicatorHorizontal) p) {
    return '''
WashIndicator(
  marks: [
    WashIndicatorMark(
      vertical: WashIndicatorVertical.${p.$2.name},
      horizontal: WashIndicatorHorizontal.${p.$3.name},
      child: WashBadge('', tone: WashBadgeTone.secondary, size: WashBadgeSize.sm),
    ),
  ],
  child: contentBox,
);''';
  }

  static Widget _corners() {
    final marks = <WashIndicatorMark>[
      WashIndicatorMark(
          vertical: WashIndicatorVertical.top,
          horizontal: WashIndicatorHorizontal.start,
          child: const WashBadge('NW')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.top,
          horizontal: WashIndicatorHorizontal.center,
          child: const WashBadge('N')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.top,
          horizontal: WashIndicatorHorizontal.end,
          child: const WashBadge('NE')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.middle,
          horizontal: WashIndicatorHorizontal.start,
          child: const WashBadge('W')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.middle,
          horizontal: WashIndicatorHorizontal.center,
          child: const WashBadge('·')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.middle,
          horizontal: WashIndicatorHorizontal.end,
          child: const WashBadge('E')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.bottom,
          horizontal: WashIndicatorHorizontal.start,
          child: const WashBadge('SW')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.bottom,
          horizontal: WashIndicatorHorizontal.center,
          child: const WashBadge('S')),
      WashIndicatorMark(
          vertical: WashIndicatorVertical.bottom,
          horizontal: WashIndicatorHorizontal.end,
          child: const WashBadge('SE')),
    ];
    return WashIndicator(
      marks: marks,
      child: Builder(
        builder: (context) {
          final tokens = WashTokens.of(context);
          return Container(
            width: 240,
            height: 128,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text('Box',
                style: WashTypography.body(tokens.onSurface)
                    .copyWith(fontSize: 14)),
          );
        },
      ),
    );
  }

  static const _cornersDart = '''
WashIndicator(
  marks: [ /* nine WashIndicatorMark corners */ ],
  child: box,
);''';

  static Widget _statusColorCell(String name, WashStatusTone tone) {
    return WashIndicator(
      marks: [
        WashIndicatorMark(
            child: WashStatusDot(tone: tone, semanticsLabel: name)),
      ],
      child: _contentBox(name),
    );
  }

  static String _statusDart(String name, WashStatusTone tone) =>
      "WashIndicator(marks: [WashIndicatorMark(child: WashStatusDot(tone: WashStatusTone.${tone.name}, semanticsLabel: '$name'))], child: contentBox);";

  static Widget _badgeColorCell(String name, WashBadgeTone tone) {
    return WashIndicator(
      marks: [
        WashIndicatorMark(child: WashBadge(name.substring(0, 1), tone: tone)),
      ],
      child: _contentBox('content'),
    );
  }

  static String _badgeColorDart(String name, WashBadgeTone tone) =>
      "WashIndicator(marks: [WashIndicatorMark(child: WashBadge('${name.substring(0, 1)}', tone: WashBadgeTone.${tone.name}))], child: contentBox);";

  static Widget _avatarLead() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
            child: WashBadge('Lead', tone: WashBadgeTone.secondary)),
      ],
      child: const WashAvatar(
        imageId: 64,
        imageAlt: 'Studio artist portrait with role badge',
        size: WashAvatarSize.lg,
        radius: WashAvatarRadius.rounded,
      ),
    );
  }

  static const _avatarLeadDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('Lead', tone: WashBadgeTone.secondary))],
  child: WashAvatar(imageId: 64, size: WashAvatarSize.lg),
);''';

  static Widget _avatarOnline() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
          child: WashStatusDot(
              tone: WashStatusTone.success, semanticsLabel: 'Online'),
        ),
      ],
      child: const WashAvatar(
        imageId: 65,
        imageAlt: 'Studio artist portrait, online status',
        size: WashAvatarSize.lg,
        radius: WashAvatarRadius.circle,
      ),
    );
  }

  static const _avatarOnlineDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashStatusDot(tone: WashStatusTone.success, semanticsLabel: 'Online'))],
  child: WashAvatar(imageId: 65, radius: WashAvatarRadius.circle),
);''';

  static Widget _avatarAlert() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
          child:
              WashBadge('!', tone: WashBadgeTone.error, size: WashBadgeSize.xs),
        ),
      ],
      child: const WashAvatar(
        imageId: 91,
        imageAlt: 'Studio artist portrait with alert badge',
        size: WashAvatarSize.md,
        radius: WashAvatarRadius.circle,
      ),
    );
  }

  static const _avatarAlertDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('!', tone: WashBadgeTone.error, size: WashBadgeSize.xs))],
  child: WashAvatar(imageId: 91, size: WashAvatarSize.md, radius: WashAvatarRadius.circle),
);''';

  static Widget _btnCritiques() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(
            child: WashBadge('12', tone: WashBadgeTone.secondary)),
      ],
      child: WashButton(label: 'Critiques', onPressed: () {}),
    );
  }

  static const _btnCritiquesDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('12', tone: WashBadgeTone.secondary))],
  child: WashButton(label: 'Critiques', onPressed: () {}),
);''';

  static Widget _btnSeries() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(child: WashBadge('3', tone: WashBadgeTone.accent)),
      ],
      child: WashButton(
          label: 'Series',
          onPressed: () {},
          variant: WashButtonVariant.primary),
    );
  }

  static const _btnSeriesDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('3', tone: WashBadgeTone.accent))],
  child: WashButton(label: 'Series', variant: WashButtonVariant.primary, onPressed: () {}),
);''';

  static Widget _btnMessages() {
    return WashTooltip(
      message: 'Messages',
      child: WashIndicator(
        marks: const [
          WashIndicatorMark(
            child: WashBadge('5',
                tone: WashBadgeTone.error, size: WashBadgeSize.xs),
          ),
        ],
        child: WashButton(
          onPressed: () {},
          variant: WashButtonVariant.primary,
          square: true,
          child: const WashLucideIcon('message-square-text',
              size: 20, strokeWidth: 2),
        ),
      ),
    );
  }

  static const _btnMessagesDart = '''
WashTooltip(
  message: 'Messages',
  child: WashIndicator(
    marks: [WashIndicatorMark(child: WashBadge('5', tone: WashBadgeTone.error, size: WashBadgeSize.xs))],
    child: WashButton(square: true, child: WashLucideIcon('message-square-text')),
  ),
);''';

  static Widget _inputRequired() {
    return const WashIndicator(
      fullWidth: true,
      maxWidth: 320,
      marks: [
        WashIndicatorMark(child: WashBadge('Required')),
      ],
      child: WashEditable(hint: 'Studio email'),
    );
  }

  static const _inputRequiredDart = '''
WashIndicator(
  fullWidth: true,
  maxWidth: 320,
  marks: [WashIndicatorMark(child: WashBadge('Required'))],
  child: WashEditable(hint: 'Studio email'),
);''';

  static Widget _inputHint() {
    return const WashIndicator(
      fullWidth: true,
      maxWidth: 320,
      marks: [
        WashIndicatorMark(
          vertical: WashIndicatorVertical.bottom,
          child: WashBadge('Hint',
              tone: WashBadgeTone.info, size: WashBadgeSize.sm),
        ),
      ],
      child: WashEditable(hint: 'Plate title'),
    );
  }

  static const _inputHintDart = '''
WashIndicator(
  fullWidth: true,
  maxWidth: 320,
  marks: [
    WashIndicatorMark(
      vertical: WashIndicatorVertical.bottom,
      child: WashBadge('Hint', tone: WashBadgeTone.info, size: WashBadgeSize.sm),
    ),
  ],
  child: WashEditable(hint: 'Plate title'),
);''';

  static Widget _studioCritiques() {
    return WashIndicator(
      marks: const [
        WashIndicatorMark(child: WashBadge('4', tone: WashBadgeTone.error)),
      ],
      child: WashButton(
        onPressed: () {},
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            WashLucideIcon('message-square-text', size: 16, strokeWidth: 2),
            SizedBox(width: 8),
            Text('Critiques'),
          ],
        ),
      ),
    );
  }

  static const _studioCritiquesDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('4', tone: WashBadgeTone.error))],
  child: WashButton(onPressed: () {}, child: Row(children: [WashLucideIcon('message-square-text'), Text('Critiques')])),
);''';

  static Widget _studioLock() {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return WashIndicator(
          marks: const [
            WashIndicatorMark(
              child: WashStatusDot(
                  tone: WashStatusTone.warning, semanticsLabel: 'Locked'),
            ),
          ],
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration:
                washInkBorderBox(tokens, fill: tokens.surfaceContainerHigh),
            child: Row(
              children: [
                WashTooltip(
                  message: 'Layer locked',
                  child: WashButton(
                    onPressed: () {},
                    variant: WashButtonVariant.warning,
                    size: WashButtonSize.sm,
                    square: true,
                    child:
                        const WashLucideIcon('lock', size: 16, strokeWidth: 2),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Wash layer B',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: WashTypography.body(tokens.onSurface).copyWith(
                              fontWeight: FontWeight.w500, fontSize: 14)),
                      Text('Locked for export',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: WashTypography.label(tokens.inkMuted)
                              .copyWith(fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  static const _studioLockDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashStatusDot(tone: WashStatusTone.warning, semanticsLabel: 'Locked'))],
  child: layerRow,
);''';

  static Widget _studioWet() {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return WashIndicator(
          marks: const [
            WashIndicatorMark(
              child: WashBadge('Wet',
                  tone: WashBadgeTone.info, size: WashBadgeSize.sm),
            ),
          ],
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration:
                washInkBorderBox(tokens, fill: tokens.surfaceContainerHigh),
            child: Row(
              children: [
                WashTooltip(
                  message: 'Brush wetness',
                  child: WashButton(
                    onPressed: () {},
                    variant: WashButtonVariant.info,
                    size: WashButtonSize.sm,
                    square: true,
                    child: const WashLucideIcon('droplets',
                        size: 16, strokeWidth: 2),
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Round 6',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                            fontWeight: FontWeight.w500, fontSize: 14)),
                    Text('Keep tip damp',
                        style: WashTypography.label(tokens.inkMuted)
                            .copyWith(fontSize: 12)),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  static const _studioWetDart = '''
WashIndicator(
  marks: [WashIndicatorMark(child: WashBadge('Wet', tone: WashBadgeTone.info, size: WashBadgeSize.sm))],
  child: brushRow,
);''';

  static Widget _responsive() {
    return WashIndicator(
      marks: [
        WashIndicatorMark(
          horizontal: WashIndicatorHorizontal.start,
          responsive: washIndicatorResponsivePlacementDemo(),
          child: const WashBadge('',
              tone: WashBadgeTone.secondary, size: WashBadgeSize.sm),
        ),
      ],
      maxWidth: 320,
      child: Builder(
        builder: (context) {
          final tokens = WashTokens.of(context);
          return Container(
            width: double.infinity,
            height: 112,
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              'Resize to move the badge',
              textAlign: TextAlign.center,
              style:
                  WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
            ),
          );
        },
      ),
    );
  }

  static const _responsiveDart = '''
WashIndicator(
  marks: [
    WashIndicatorMark(
      horizontal: WashIndicatorHorizontal.start,
      responsive: washIndicatorResponsivePlacementDemo(),
      child: WashBadge('', tone: WashBadgeTone.secondary, size: WashBadgeSize.sm),
    ),
  ],
  child: resizeBox,
);''';
}
