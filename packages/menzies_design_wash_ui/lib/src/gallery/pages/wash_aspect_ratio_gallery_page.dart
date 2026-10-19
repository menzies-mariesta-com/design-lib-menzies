import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAspectRatioGalleryPage extends StatelessWidget {
  const WashAspectRatioGalleryPage({super.key});

  static const _basicRatios = <(String, WashAspectRatioValue)>[
    ('Square', WashAspectRatioValue.square),
    ('Video', WashAspectRatioValue.video),
    ('Classic', WashAspectRatioValue.classic),
    ('Portrait', WashAspectRatioValue.portrait),
    ('Cinema', WashAspectRatioValue.cinema),
  ];

  static const _paperFrames = <_PaperFrame>[
    _PaperFrame(
      name: 'Study square',
      ratio: WashAspectRatioValue.square,
      tone: WashAspectPlateTone.mineral,
      size: 'Quarter sheet',
    ),
    _PaperFrame(
      name: 'Sketch portrait',
      ratio: WashAspectRatioValue.portrait,
      tone: WashAspectPlateTone.ochre,
      size: 'A5 portrait',
    ),
    _PaperFrame(
      name: 'Wash landscape',
      ratio: WashAspectRatioValue.classic,
      tone: WashAspectPlateTone.rose,
      size: 'A4 landscape',
    ),
    _PaperFrame(
      name: 'Panorama strip',
      ratio: WashAspectRatioValue.cinema,
      tone: WashAspectPlateTone.sage,
      size: 'Wide crop',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Aspect ratio',
      description:
          'Tailwind aspect-* frames for washes, figures, and crop previews.',
      sections: [
        _section(
          eyebrow: '01 · Basic',
          title: 'Common ratios',
          description: 'Built-in and arbitrary aspect utilities',
          preview: _basicRatiosPreview(),
          dart: _basicDart,
        ),
        _section(
          eyebrow: '02 · Cards / figures',
          title: 'In cards and figures',
          description: 'Aspect frames inside daisyUI cards and figure markup',
          tint: WashGalleryPanelTint.ochre,
          preview: _cardsPreview(context),
          dart: _cardsDart,
        ),
        _section(
          eyebrow: '03 · Object-fit',
          title: 'Cover and contain',
          description:
              'Same aspect box, different object-fit behavior on the local studio',
          tint: WashGalleryPanelTint.rose,
          preview: _objectFitPreview(),
          dart: _objectFitDart,
        ),
        _section(
          eyebrow: '04 · Studio',
          title: 'Paper sizes and crop frames',
          description: 'Watercolor paper proportions as crop frames',
          preview: _studioPreview(context),
          dart: _studioDart,
        ),
        _section(
          eyebrow: '05 · Responsive',
          title: 'Breakpoint aspects',
          description:
              'One frame that shifts ratio by viewport: square on mobile, video',
          preview: _responsivePreview(),
          dart: _responsiveDart,
        ),
        _section(
          eyebrow: '06 · Interactive',
          title: 'Toggle preview aspect',
          description: 'Switch the preview frame among common studio ratios',
          tint: WashGalleryPanelTint.ochre,
          preview: const _InteractiveAspectPreview(),
          dart: _interactiveDart,
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

  static Widget _basicRatiosPreview() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = washAspectGalleryColumns(constraints.maxWidth, desktop: 3);
        final gap = washAspectGalleryGap(constraints.maxWidth);
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: _basicRatios.map((r) {
            return SizedBox(
              width: (constraints.maxWidth - gap * (cols - 1)) / cols,
              child: WashAspectSample(
                classLabel: r.$2.classLabel,
                child: WashAspectFrame(
                  ratio: r.$2,
                  child: WashAspectPlate.preset(
                    tone: WashAspectPlateTone.mineral,
                    label: r.$1,
                    caption: _hintFor(r.$2),
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  static String _hintFor(WashAspectRatioValue v) => switch (v) {
        WashAspectRatioValue.square => '1:1',
        WashAspectRatioValue.video => '16:9',
        WashAspectRatioValue.classic => '4:3',
        WashAspectRatioValue.portrait => '3:4',
        WashAspectRatioValue.cinema => '21:9',
        _ => '${v.width}:${v.height}',
      };

  static Widget _cardsPreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final gap = 24.0;
        final cardW = twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: cardW,
              child: WashAspectSample(
                classLabel: 'card + figure + aspect-video',
                child: _demoCard(
                  tokens: tokens,
                  title: 'Wet wash plate',
                  body: 'Local hero asset framed at 16:9 inside a card figure.',
                  figure: WashAspectRatio(
                    ratio: WashAspectRatioValue.video,
                    child: const WashStudioHeroImage(
                      semanticLabel:
                          'Studio watercolor wash cropped to video aspect',
                    ),
                  ),
                ),
              ),
            ),
            SizedBox(
              width: cardW,
              child: WashAspectSample(
                classLabel: 'card + aspect-[4/3] wash plate',
                child: _demoCard(
                  tokens: tokens,
                  title: 'Pigment card',
                  body: 'CSS wash only. No remote image URL.',
                  figure: WashAspectRatio(
                    ratio: WashAspectRatioValue.classic,
                    child: WashAspectPlate.preset(
                      tone: WashAspectPlateTone.ochre,
                      label: 'Ochre bloom',
                      caption: '4:3 figure',
                    ),
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  static Widget _demoCard({
    required WashTokens tokens,
    required String title,
    required String body,
    required Widget figure,
  }) {
    return Container(
      decoration: washInkBorderBox(tokens).copyWith(
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ClipRect(child: figure),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
                const SizedBox(height: 4),
                Text(body, style: WashTypography.body(tokens.inkMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static Widget _objectFitPreview() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final gap = 24.0;
        final w = twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        final tokens = WashTokens.of(context);
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: w,
              child: WashAspectSample(
                classLabel: 'aspect-square + object-cover',
                child: WashAspectFrame(
                  ratio: WashAspectRatioValue.square,
                  maxWidth: 320,
                  child: const WashStudioHeroImage(
                    semanticLabel: 'Studio wash cropped with object-cover',
                  ),
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: WashAspectSample(
                classLabel: 'aspect-square + object-contain',
                child: WashAspectFrame(
                  ratio: WashAspectRatioValue.square,
                  maxWidth: 320,
                  backgroundColor: tokens.surfaceContainer.withValues(alpha: 0.5),
                  child: const WashStudioHeroImage(
                    fit: BoxFit.contain,
                    semanticLabel: 'Studio wash letterboxed with object-contain',
                  ),
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: WashAspectSample(
                classLabel: 'aspect-video + object-cover',
                child: WashAspectFrame(
                  ratio: WashAspectRatioValue.video,
                  child: const WashStudioHeroImage(
                    semanticLabel: 'Studio wash cover-cropped to video frame',
                  ),
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: WashAspectSample(
                classLabel: 'aspect-[3/4] + object-contain',
                child: WashAspectFrame(
                  ratio: WashAspectRatioValue.portrait,
                  maxWidth: 224,
                  backgroundColor: tokens.surfaceContainer.withValues(alpha: 0.5),
                  child: const WashStudioHeroImage(
                    fit: BoxFit.contain,
                    semanticLabel: 'Studio wash contained in a portrait frame',
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  static Widget _studioPreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
            final gap = 20.0;
            final w = twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: _paperFrames.map((frame) {
                return SizedBox(
                  width: w,
                  child: WashAspectSample(
                    classLabel: frame.ratio.classLabel,
                    footer: Text(
                      frame.size,
                      style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
                    ),
                    child: WashAspectFrame(
                      ratio: frame.ratio,
                      child: WashAspectPlate.preset(
                        tone: frame.tone,
                        label: frame.name,
                        caption: frame.size,
                      ),
                    ),
                  ),
                );
              }).toList(),
            );
          },
        ),
        const SizedBox(height: 32),
        Container(
          padding: const EdgeInsets.only(top: 24),
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.6)),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Crop matte', style: WashTypography.label(tokens.inkMuted)),
              const SizedBox(height: 12),
              WashAspectSample(
                classLabel: 'aspect-[4/3] + inset matte + object-cover',
                child: Align(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 448),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: tokens.surfaceContainer.withValues(alpha: 0.6),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: tokens.onSurface.withValues(alpha: 0.1),
                            ),
                          ),
                          child: WashAspectRatio(
                            ratio: WashAspectRatioValue.classic,
                            child: const WashStudioHeroImage(
                              semanticLabel:
                                  'Studio wash inside a paper crop matte',
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _responsivePreview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashAspectSample(
          classLabel: 'aspect-square md:aspect-video',
          child: WashAspectFrame(
            responsive: const WashResponsiveAspectRatio(
              base: WashAspectRatioValue.square,
              md: WashAspectRatioValue.video,
            ),
            child: WashAspectPlate.preset(
              tone: WashAspectPlateTone.violet,
              label: 'Responsive frame',
              caption: 'square → video',
            ),
          ),
        ),
        const SizedBox(height: 24),
        LayoutBuilder(
          builder: (context, constraints) {
            final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.sm;
            final gap = 20.0;
            final w = twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                SizedBox(
                  width: w,
                  child: WashAspectSample(
                    classLabel: 'aspect-[3/4] sm:aspect-[4/3]',
                    child: WashAspectFrame(
                      responsive: const WashResponsiveAspectRatio(
                        base: WashAspectRatioValue.portrait,
                        sm: WashAspectRatioValue.classic,
                      ),
                      child: WashAspectPlate.preset(
                        tone: WashAspectPlateTone.rose,
                        label: 'Portrait to landscape',
                        caption: '3:4 → 4:3',
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  width: w,
                  child: WashAspectSample(
                    classLabel: 'aspect-video lg:aspect-[21/9]',
                    child: WashAspectFrame(
                      responsive: const WashResponsiveAspectRatio(
                        base: WashAspectRatioValue.video,
                        lg: WashAspectRatioValue.cinema,
                      ),
                      child: WashAspectPlate.preset(
                        tone: WashAspectPlateTone.sage,
                        label: 'Wide at desktop',
                        caption: '16:9 → 21:9',
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ],
    );
  }

  static const _basicDart = '''
WashAspectFrame(
  ratio: WashAspectRatioValue.video,
  child: WashAspectPlate.preset(
    tone: WashAspectPlateTone.mineral,
    label: 'Video',
    caption: '16:9',
  ),
);
''';

  static const _cardsDart = '''
WashAspectRatio(
  ratio: WashAspectRatioValue.video,
  child: WashStudioHeroImage(),
);
''';

  static const _objectFitDart = '''
WashAspectFrame(
  ratio: WashAspectRatioValue.square,
  child: WashStudioHeroImage(fit: BoxFit.contain),
);
''';

  static const _studioDart = '''
WashAspectFrame(
  ratio: WashAspectRatioValue.classic,
  child: WashAspectPlate.preset(
    tone: WashAspectPlateTone.rose,
    label: 'Wash landscape',
    caption: 'A4 landscape',
  ),
);
''';

  static const _responsiveDart = '''
WashAspectFrame(
  responsive: WashResponsiveAspectRatio(
    base: WashAspectRatioValue.square,
    md: WashAspectRatioValue.video,
  ),
  child: WashAspectPlate.preset(
    tone: WashAspectPlateTone.violet,
    label: 'Responsive frame',
  ),
);
''';

  static const _interactiveDart = '''
WashAspectFrame(
  ratio: activeRatio,
  animateDuration: const Duration(milliseconds: 300),
  child: WashStudioHeroImage(),
);
''';
}

class _PaperFrame {
  const _PaperFrame({
    required this.name,
    required this.ratio,
    required this.tone,
    required this.size,
  });

  final String name;
  final WashAspectRatioValue ratio;
  final WashAspectPlateTone tone;
  final String size;
}

class _InteractiveAspectPreview extends StatefulWidget {
  const _InteractiveAspectPreview();

  @override
  State<_InteractiveAspectPreview> createState() => _InteractiveAspectPreviewState();
}

class _InteractiveAspectPreviewState extends State<_InteractiveAspectPreview> {
  WashAspectRatioValue _active = WashAspectRatioValue.video;

  static const _options = <(String, WashAspectRatioValue)>[
    ('Square', WashAspectRatioValue.square),
    ('Video', WashAspectRatioValue.video),
    ('4:3', WashAspectRatioValue.classic),
    ('3:4', WashAspectRatioValue.portrait),
    ('21:9', WashAspectRatioValue.cinema),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _options.map((opt) {
            final selected = opt.$2 == _active;
            return WashButton(
              label: opt.$1,
              size: WashButtonSize.sm,
              variant: selected ? WashButtonVariant.primary : WashButtonVariant.ghost,
              onPressed: () => setState(() => _active = opt.$2),
            );
          }).toList(),
        ),
        const SizedBox(height: 20),
        WashAspectSample(
          classLabel: _active.classLabel,
          child: WashAspectFrame(
            ratio: _active,
            maxWidth: 672,
            animateDuration: const Duration(milliseconds: 300),
            child: WashStudioHeroImage(
              semanticLabel: 'Studio wash preview at ${_labelFor(_active)} aspect',
            ),
          ),
        ),
      ],
    );
  }

  static String _labelFor(WashAspectRatioValue v) => switch (v) {
        WashAspectRatioValue.square => 'Square',
        WashAspectRatioValue.video => 'Video',
        WashAspectRatioValue.classic => '4:3',
        WashAspectRatioValue.portrait => '3:4',
        WashAspectRatioValue.cinema => '21:9',
        _ => v.classLabel,
      };
}
