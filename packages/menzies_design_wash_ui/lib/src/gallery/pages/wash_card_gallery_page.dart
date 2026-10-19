import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/card/wash_card.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashCardGalleryPage extends StatelessWidget {
  const WashCardGalleryPage({super.key});

  static const _sizes = <(String, WashCardSize)>[
    ('XS', WashCardSize.xs),
    ('SM', WashCardSize.sm),
    ('MD', WashCardSize.md),
    ('LG', WashCardSize.lg),
    ('XL', WashCardSize.xl),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Cards',
      description:
          'Every daisyUI card style, size, and layout modifier.',
      sections: [
        _s('01 · Default', 'Base card', 'Body, title, and actions with the default surface', _baseCard(), _baseDart),
        _s('02 · Styles', 'Border and dash', 'Solid border and dashed outline variants', _styleGrid(), _stylesDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes', 'Size scale', 'From compact notes to XL display cards', _sizeGrid(), _sizesDart),
        _s('04 · Figure', 'Image on top', 'Figure before body places the image above the content', _figureSection(), _figureDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Side', 'Horizontal layout', 'card-side places figure and body in a row', _sideCard(), _sideDart),
        _s('06 · Responsive side', 'sm:card-side', 'Stacks on small screens, then goes horizontal from sm up', _responsiveSideCard(), _responsiveDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Image full', 'Overlay content', 'image-full places body copy over the figure', _imageFullCard(), _imageFullDart),
        _s('08 · Badges & actions', 'Badges, buttons, and joins', 'Common card chrome: badge in the title, multiple actions', _badgesSection(), _badgesDart, tint: WashGalleryPanelTint.rose),
        _s('09 · Centered', 'Centered content', 'items-center text-center for quiet marketing-style cards', _centeredCard(), _centeredDart),
        _s('10 · Compact grid', 'Border × size', 'Bordered cards across the size scale in one view', _compactGrid(), _compactDart, tint: WashGalleryPanelTint.ochre),
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

  static Widget _baseCard() {
    return _sample(
      'card + card-body + card-title + card-actions',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 384),
        child: WashCard(
          body: WashCardBody(
            children: [
              const WashCardTitle('Coastal fog plate'),
              _muted('Soft cerulean wash over warm paper. Quiet hierarchy, no extra pigment.'),
              WashCardActions(
                align: WashCardActionsAlign.end,
                children: [
                  WashButton(label: 'Open', onPressed: () {}, ripple: false),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _styleGrid() {
    final styles = <(String, WashCardSurfaceStyle)>[
      ('Default', WashCardSurfaceStyle.defaultStyle),
      ('Border', WashCardSurfaceStyle.border),
      ('Dash', WashCardSurfaceStyle.dash),
    ];
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      children: styles.map((s) {
        final classLabel = switch (s.$2) {
          WashCardSurfaceStyle.defaultStyle => 'card',
          WashCardSurfaceStyle.border => 'card card-border',
          WashCardSurfaceStyle.dash => 'card card-dash',
        };
        return SizedBox(
          width: 280,
          child: _sample(
            classLabel,
            WashCard(
              style: s.$2,
              body: WashCardBody(
                children: [
                  WashCardTitle(s.$1, large: true),
                  _muted('Style sample for studio plate cards.'),
                  WashCardActions(
                    align: WashCardActionsAlign.end,
                    children: [
                      WashButton(
                        label: 'View',
                        size: WashButtonSize.sm,
                        variant: WashButtonVariant.defaultVariant,
                        onPressed: () {},
                        ripple: false,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget _sizeGrid() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: _sizes.map((s) {
        return SizedBox(
          width: 260,
          child: _sample(
            'card card-border card-${s.$2.name}',
            WashCard(
              style: WashCardSurfaceStyle.border,
              size: s.$2,
              body: WashCardBody(
                size: s.$2,
                children: [
                  WashCardTitle(s.$1),
                  const Text('Sized body copy and actions.'),
                  WashCardActions(
                    children: [
                      WashButton(
                        label: 'Action',
                        variant: WashButtonVariant.defaultVariant,
                        onPressed: () {},
                        ripple: false,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget _figureSection() {
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      children: [
        SizedBox(
          width: 448,
          child: _sample(
            'card + figure + card-body',
            WashCard(
              style: WashCardSurfaceStyle.border,
              figure: WashCardFigure(
                height: 192,
                child: WashCardNetworkImage(
                  url: 'https://picsum.photos/id/1015/640/360',
                  width: 640,
                  height: 360,
                  alt: 'Mountain lake watercolor reference',
                ),
              ),
              body: WashCardBody(
                children: [
                  const WashCardTitle('Alpine study'),
                  _muted('Cool wash reference for distant ridges and sky.'),
                  WashCardActions(
                    align: WashCardActionsAlign.end,
                    children: [
                      WashButton(label: 'Buy now', onPressed: () {}, ripple: false),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        SizedBox(
          width: 448,
          child: _sample(
            'figure after card-body (image bottom)',
            WashCard(
              style: WashCardSurfaceStyle.border,
              figureBeforeBody: false,
              figure: WashCardFigure(
                height: 192,
                child: WashCardNetworkImage(
                  url: 'https://picsum.photos/id/1016/640/360',
                  width: 640,
                  height: 360,
                  alt: 'Harbor boats watercolor reference',
                ),
              ),
              body: WashCardBody(
                children: [
                  const WashCardTitle('Harbor light'),
                  _muted('Image after the body sits under the copy.'),
                  WashCardActions(
                    align: WashCardActionsAlign.end,
                    children: [
                      WashButton(
                        label: 'Details',
                        variant: WashButtonVariant.defaultVariant,
                        onPressed: () {},
                        ripple: false,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  static Widget _sideCard() {
    return _sample(
      'card card-side',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 672),
        child: WashCard(
          style: WashCardSurfaceStyle.border,
          side: true,
          figure: WashCardFigure(
            shrink: true,
            width: 160,
            child: WashCardNetworkImage(
              url: 'https://picsum.photos/id/1025/280/320',
              width: 280,
              height: 320,
              alt: 'Dog portrait study reference',
            ),
          ),
          body: WashCardBody(
            children: [
              const WashCardTitle('Portrait wash'),
              _muted('Side layout for compact catalog rows and plate previews.'),
              WashCardActions(
                align: WashCardActionsAlign.end,
                children: [
                  WashButton(label: 'Watch', onPressed: () {}, ripple: false),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _responsiveSideCard() {
    return _sample(
      'card sm:card-side',
      LayoutBuilder(
        builder: (context, constraints) {
          return ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 672),
            child: WashCard(
              style: WashCardSurfaceStyle.border,
              responsiveSide: true,
              figure: WashCardFigure(
                height: constraints.maxWidth < 640 ? 192 : null,
                width: constraints.maxWidth < 640 ? double.infinity : 192,
                maxHeight: 224,
                child: WashCardNetworkImage(
                  url: 'https://picsum.photos/id/1043/480/320',
                  width: 480,
                  height: 320,
                  alt: 'Forest path wash reference',
                ),
              ),
              body: WashCardBody(
                children: [
                  const WashCardTitle('Responsive plate'),
                  _muted('Vertical on phones. Side-by-side from the sm breakpoint.'),
                  WashCardActions(
                    align: WashCardActionsAlign.end,
                    children: [
                      WashButton(
                        label: 'Open',
                        variant: WashButtonVariant.defaultVariant,
                        onPressed: () {},
                        ripple: false,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  static Widget _imageFullCard() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: _sample(
        'card image-full',
        WashCard(
          imageFull: true,
          figure: WashCardFigure(
            height: 256,
            child: WashCardNetworkImage(
              url: 'https://picsum.photos/id/1018/640/420',
              width: 640,
              height: 420,
              alt: 'Valley mist overlaid card',
            ),
          ),
          body: WashCardBody(
            justifyEnd: true,
            children: [
              const WashCardTitle('Mist overlay'),
              const Text('Title and actions sit on the wash of the image.'),
              WashCardActions(
                children: [
                  WashButton(label: 'Explore', onPressed: () {}, ripple: false),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _badgesSection() {
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      children: [
        SizedBox(
          width: 320,
          child: _sample(
            'card-title + badge',
            WashCard(
              style: WashCardSurfaceStyle.border,
              body: WashCardBody(
                children: [
                  const WashCardTitle(
                    'Series ledger',
                    trailing: [
                      WashBadge('NEW', tone: WashBadgeTone.secondary),
                    ],
                  ),
                  _muted('Tag a plate status without cluttering the body.'),
                  WashCardActions(
                    align: WashCardActionsAlign.end,
                    children: [
                      WashButton(
                        label: 'Deny',
                        variant: WashButtonVariant.ghost,
                        onPressed: () {},
                        ripple: false,
                      ),
                      WashButton(label: 'Accept', onPressed: () {}, ripple: false),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        SizedBox(
          width: 320,
          child: _sample(
            'card-actions + btn-outline',
            WashCard(
              style: WashCardSurfaceStyle.border,
              figure: WashCardFigure(
                height: 144,
                child: WashCardNetworkImage(
                  url: 'https://picsum.photos/id/1039/640/280',
                  width: 640,
                  height: 280,
                  alt: 'Studio shelf reference',
                ),
              ),
              body: WashCardBody(
                children: [
                  const WashCardTitle(
                    'Pigment kit',
                    trailing: [
                      WashBadge('WS-12', style: WashBadgeStyle.outline),
                    ],
                  ),
                  _muted('Outline action for secondary paths.'),
                  WashCardActions(
                    align: WashCardActionsAlign.between,
                    children: [
                      WashButton(
                        label: 'Save',
                        variant: WashButtonVariant.outline,
                        onPressed: () {},
                        ripple: false,
                      ),
                      WashButton(label: 'Add', onPressed: () {}, ripple: false),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  static Widget _centeredCard() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 384),
      child: _sample(
        'card items-center text-center',
        WashCard(
          style: WashCardSurfaceStyle.border,
          centered: true,
          body: WashCardBody(
            centerItems: true,
            textAlign: TextAlign.center,
            children: [
              const WashCardTitle('Empty ledger'),
              _muted('No plates yet. Start a wash series when you are ready.'),
              WashCardActions(
                children: [
                  WashButton(label: 'Create plate', onPressed: () {}, ripple: false),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _compactGrid() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.start,
      children: _sizes.map((s) {
        return SizedBox(
          width: 176,
          child: _sample(
            'card card-border card-${s.$2.name}',
            WashCard(
              style: WashCardSurfaceStyle.border,
              size: s.$2,
              body: WashCardBody(
                size: s.$2,
                children: [
                  WashCardTitle(s.$1),
                  const Text('Bordered'),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget _muted(String text) {
    return Builder(
      builder: (context) {
        return Text(
          text,
          style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(fontSize: 14),
        );
      },
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4),
        ),
      ],
    );
  }

  static const _baseDart = '''
WashCard(
  body: WashCardBody(
    children: [
      WashCardTitle('Coastal fog plate'),
      WashCardActions(align: WashCardActionsAlign.end, children: [WashButton(label: 'Open')]),
    ],
  ),
);''';

  static const _stylesDart =
      "WashCard(style: WashCardSurfaceStyle.border, body: WashCardBody(...));";
  static const _sizesDart = 'WashCard(size: WashCardSize.lg, style: WashCardSurfaceStyle.border, ...)';
  static const _figureDart = 'WashCard(figure: WashCardFigure(...), body: WashCardBody(...));';
  static const _sideDart = 'WashCard(side: true, figure: ..., body: ...);';
  static const _responsiveDart = 'WashCard(responsiveSide: true, ...);';
  static const _imageFullDart = 'WashCard(imageFull: true, figure: ..., body: ...);';
  static const _badgesDart = 'WashCardTitle(..., trailing: [WashBadge(...)])';
  static const _centeredDart = 'WashCard(centered: true, body: WashCardBody(centerItems: true, ...));';
  static const _compactDart = 'WashCard(style: WashCardSurfaceStyle.border, size: WashCardSize.xs, ...)';
}
