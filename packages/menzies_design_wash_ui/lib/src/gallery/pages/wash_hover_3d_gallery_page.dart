import 'package:flutter/widgets.dart';

import '../../components/card/wash_card.dart';
import '../../components/hover_3d/wash_hover_3d.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashHover3dGalleryPage extends StatelessWidget {
  const WashHover3dGalleryPage({super.key});

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washRose = Color(0xFFC97B84);
  static const _washOchre = Color(0xFFC4A574);

  static const _galleryPlates = <({String title, String body, Color panel})>[
    (
      title: 'Cerulean wash',
      body: 'Cool sky pigment for coastal fog studies.',
      panel: _washBlue,
    ),
    (
      title: 'Ochre bloom',
      body: 'Warm earth tone for dry-brush edges.',
      panel: Color(0x00000000),
    ),
    (
      title: 'Rose mist',
      body: 'Soft petal wash for quiet accents.',
      panel: _washRose,
    ),
    (
      title: 'Ink line',
      body: 'Neutral contour over damp paper.',
      panel: Color(0x00000000),
    ),
    (
      title: 'Verdant glaze',
      body: 'Layered greens for meadow plates.',
      panel: Color(0x00000000),
    ),
    (
      title: 'Indigo depth',
      body: 'Night sky underpainting for stars.',
      panel: Color(0x00000000),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Hover 3D cards',
      description:
          'Official daisyUI hover-3d wrappers: eight hover zones tilt content toward the pointer.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Basic 3D hover',
          description: 'A single studio card tilts when you hover any zone',
          child: WashShowcaseTabs(
            preview: _basicPreview(context),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Pointer follow',
          title: 'Zone-based pointer follow',
          description: 'daisyUI places eight zones over the content',
          tint: WashGalleryPanelTint.ochre,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: _pointerPreview(context),
                dartSource: _pointerDart,
              ),
              const SizedBox(height: 16),
              Text(
                'Move across corners and edges to feel each zone. The whole plate is '
                'one link, matching the daisyUI pattern.',
                style: WashTypography.body(WashTokens.of(context).inkMuted),
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Grid',
          title: 'Sizes and pigment grid',
          description: 'Responsive studio plates',
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            alignment: WrapAlignment.center,
            children: List.generate(_galleryPlates.length, (i) {
              final plate = _galleryPlates[i];
              return SizedBox(
                width: 224,
                child: WashShowcaseTabs(
                  preview: _gridPlatePreview(context, plate, i),
                  dartSource: _gridPlateDart(i),
                ),
              );
            }),
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Figure',
          title: 'With image figure',
          description:
              'Image plates use figure as the first child, then the eight empty',
          tint: WashGalleryPanelTint.rose,
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            alignment: WrapAlignment.center,
            children: const [
              _FigureDemo(
                url: 'https://picsum.photos/id/1015/320/220',
                alt: 'Mountain lake reflecting cloudy sky at dusk',
                dart: _figureDart0,
              ),
              _FigureDemo(
                url: 'https://picsum.photos/id/1016/320/220',
                alt: 'Rocky coastal cliff above turquoise water',
                dart: _figureDart1,
              ),
              _FigureDemo(
                url: 'https://picsum.photos/id/1035/320/220',
                alt: 'Open notebook with coffee on a wooden desk',
                dart: _figureDart2,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Motion',
          title: 'Reduced motion',
          description:
              'All hover-3d plates flatten under prefers-reduced-motion: reduce',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              LayoutBuilder(
                builder: (context, c) {
                  final twoCol = c.maxWidth >= WashTailwindBreakpoints.lg;
                  final children = [
                    WashShowcaseTabs(
                      preview: _tiltPreview(context),
                      dartSource: _tiltDart,
                    ),
                    WashShowcaseTabs(
                      preview: _flatPreview(context),
                      dartSource: _flatDart,
                    ),
                  ];
                  if (twoCol) {
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
              ),
              const SizedBox(height: 16),
              Text(
                'Enable reduced motion in your OS or browser to verify every hover-3d plate stays flat.',
                style: WashTypography.body(WashTokens.of(context).inkMuted),
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Watercolor subject cards',
          description:
              'Palette, layers, and brushes themes for the Menzies Design desk',
          child: Wrap(
            spacing: 24,
            runSpacing: 24,
            alignment: WrapAlignment.center,
            children: [
              _studioCard(context, 'Palette', _washOchre, _studioDart0),
              _studioCard(context, 'Layers', _washRose, _studioDart1),
              _studioCard(context, 'Brushes', _washBlue, _studioDart2),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _basicPreview(BuildContext context) {
    return Center(
      child: WashHover3d(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 288),
          child: WashCard(
            body: WashCardBody(
              children: [
                const WashCardTitle('Coastal fog plate'),
                Text(
                  'Soft cerulean wash over warm paper. Quiet hierarchy, no extra pigment.',
                  style: WashTypography.body(WashTokens.of(context).inkMuted),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Widget _pointerPreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: WashHover3d(
        onTap: () {},
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 320),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            child: ColoredBox(
              color: tokens.palette.neutral,
              child: WashCard(
                shadow: false,
                body: WashCardBody(
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            'MENZIES DESIGN',
                            style: WashTypography.title(
                                    tokens.palette.neutralContent)
                                .copyWith(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                        Text(
                          '❁',
                          style: TextStyle(
                            fontSize: 36,
                            color: tokens.palette.neutralContent
                                .withValues(alpha: 0.2),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'PLATE · 0210 · FOG · 1150',
                      style: WashTypography.body(tokens.palette.neutralContent)
                          .copyWith(
                        fontSize: 13,
                        letterSpacing: 2,
                        color: tokens.palette.neutralContent
                            .withValues(alpha: 0.7),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      alignment: WrapAlignment.spaceBetween,
                      crossAxisAlignment: WrapCrossAlignment.start,
                      spacing: 12,
                      runSpacing: 8,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('SERIES',
                                style: _meta(tokens.palette.neutralContent)),
                            Text('Harbor mist',
                                style: _body(tokens.palette.neutralContent)),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('WASH',
                                style: _meta(tokens.palette.neutralContent)),
                            Text('Cerulean',
                                style: _body(tokens.palette.neutralContent)),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  static TextStyle _meta(Color c) =>
      TextStyle(fontSize: 12, color: c.withValues(alpha: 0.5));

  static TextStyle _body(Color c) => TextStyle(fontSize: 14, color: c);

  static Widget _gridPlatePreview(
    BuildContext context,
    ({String title, String body, Color panel}) plate,
    int index,
  ) {
    final tokens = WashTokens.of(context);
    Color? bg;
    if (index == 0) {
      bg = _washBlue.withValues(alpha: 0.4);
    } else if (index == 1) {
      bg = tokens.palette.secondary.withValues(alpha: 0.2);
    } else if (index == 2) {
      bg = _washRose.withValues(alpha: 0.35);
    } else if (index == 3) {
      bg = tokens.surfaceContainer;
    } else if (index == 4) {
      bg = tokens.palette.success.withValues(alpha: 0.15);
    } else if (index == 5) {
      bg = tokens.palette.primary.withValues(alpha: 0.15);
    }
    return WashHover3d(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        child: ColoredBox(
          color: bg ?? tokens.surface,
          child: WashCard(
            size: WashCardSize.sm,
            shadow: false,
            body: WashCardBody(
              size: WashCardSize.sm,
              children: [
                WashCardTitle(plate.title, size: WashCardSize.sm),
                Text(
                  plate.body,
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 12),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Widget _tiltPreview(BuildContext context) {
    return WashHover3d(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 384),
        child: WashCard(
          body: WashCardBody(
            children: [
              const WashCardTitle('Full tilt'),
              Text(
                'Standard rotate3d response when motion is allowed.',
                style: WashTypography.body(WashTokens.of(context).inkMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _flatPreview(BuildContext context) {
    return WashHover3d(
      flat: true,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 384),
        child: WashCard(
          body: WashCardBody(
            children: [
              const WashCardTitle('Always flat'),
              Text(
                'Same chrome. hover-3d-safe keeps this plate flat for demos.',
                style: WashTypography.body(WashTokens.of(context).inkMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _studioCard(
    BuildContext context,
    String subject,
    Color wash,
    String dart,
  ) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: 256,
      child: WashShowcaseTabs(
        preview: WashHover3d(
          onTap: () {},
          child: ClipRRect(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            child: ColoredBox(
              color: wash.withValues(alpha: subject == 'Palette' ? 0.5 : 0.4),
              child: WashCard(
                shadow: false,
                body: WashCardBody(
                  children: [
                    Text(subject, style: WashTypography.label(tokens.inkMuted)),
                    WashCardTitle('$subject plate', large: true),
                    Text(
                      switch (subject) {
                        'Palette' =>
                          'Mix ratios and pigment notes for the week.',
                        'Layers' => 'Transparent glazes stacked wet-into-wet.',
                        _ => 'Round, flat, and mop for studio sessions.',
                      },
                      style: WashTypography.body(tokens.inkMuted),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        dartSource: dart,
      ),
    );
  }

  static const _basicDart = '''
WashHover3d(
  child: WashCard(
    body: WashCardBody(
      children: [
        WashCardTitle('Coastal fog plate'),
        Text('Soft cerulean wash over warm paper.'),
      ],
    ),
  ),
)''';

  static const _pointerDart = '''
WashHover3d(
  onTap: () {},
  child: WashCard(
    backgroundColor: tokens.neutral,
    body: WashCardBody(/* MENZIES DESIGN plate */),
  ),
)''';

  static String _gridPlateDart(int i) => '''
WashHover3d(
  child: WashCard(
    size: WashCardSize.sm,
    body: WashCardBody(
      children: [
        WashCardTitle('${_galleryPlates[i].title}'),
        Text('${_galleryPlates[i].body}'),
      ],
    ),
  ),
)''';

  static const _figureDart0 = '''
WashHover3d(
  child: ClipRRect(
    borderRadius: BorderRadius.circular(16),
    child: WashCardNetworkImage(
      url: 'https://picsum.photos/id/1015/320/220',
      width: 240,
      height: 165,
    ),
  ),
)''';

  static const _figureDart1 = '''
WashHover3d(
  child: ClipRRect(
    borderRadius: BorderRadius.circular(16),
    child: WashCardNetworkImage(
      url: 'https://picsum.photos/id/1016/320/220',
      width: 240,
      height: 165,
    ),
  ),
)''';

  static const _figureDart2 = '''
WashHover3d(
  child: ClipRRect(
    borderRadius: BorderRadius.circular(16),
    child: WashCardNetworkImage(
      url: 'https://picsum.photos/id/1035/320/220',
      width: 240,
      height: 165,
    ),
  ),
)''';

  static const _tiltDart = '''
WashHover3d(
  child: WashCard(
    body: WashCardBody(
      children: [
        WashCardTitle('Full tilt'),
        Text('Standard rotate3d response when motion is allowed.'),
      ],
    ),
  ),
)''';

  static const _flatDart = '''
WashHover3d(
  flat: true,
  child: WashCard(
    body: WashCardBody(
      children: [
        WashCardTitle('Always flat'),
        Text('Same chrome. hover-3d-safe keeps this plate flat for demos.'),
      ],
    ),
  ),
)''';

  static const _studioDart0 = '''
WashHover3d(
  onTap: () {},
  child: WashCard(/* Palette plate */),
)''';

  static const _studioDart1 = '''
WashHover3d(
  onTap: () {},
  child: WashCard(/* Layers plate */),
)''';

  static const _studioDart2 = '''
WashHover3d(
  onTap: () {},
  child: WashCard(/* Brushes plate */),
)''';
}

class _FigureDemo extends StatelessWidget {
  const _FigureDemo({
    required this.url,
    required this.alt,
    required this.dart,
  });

  final String url;
  final String alt;
  final String dart;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 240,
      child: WashShowcaseTabs(
        preview: WashHover3d(
          child: DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x14000000),
                  blurRadius: 4,
                  offset: Offset(0, 1),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: WashCardNetworkImage(
                url: url,
                width: 240,
                height: 165,
                alt: alt,
              ),
            ),
          ),
        ),
        dartSource: dart,
      ),
    );
  }
}
