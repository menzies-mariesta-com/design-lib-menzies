import 'package:flutter/widgets.dart';

import '../../components/mask/wash_mask.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashMaskGalleryPage extends StatelessWidget {
  const WashMaskGalleryPage({super.key});

  static const _shapes = <(String, WashMaskShape)>[
    ('Squircle', WashMaskShape.squircle),
    ('Heart', WashMaskShape.heart),
    ('Hexagon', WashMaskShape.hexagon),
    ('Hexagon 2', WashMaskShape.hexagon2),
    ('Decagon', WashMaskShape.decagon),
    ('Pentagon', WashMaskShape.pentagon),
    ('Diamond', WashMaskShape.diamond),
    ('Square', WashMaskShape.square),
    ('Circle', WashMaskShape.circle),
    ('Star', WashMaskShape.star),
    ('Star 2', WashMaskShape.star2),
    ('Triangle', WashMaskShape.triangle),
    ('Triangle 2', WashMaskShape.triangle2),
    ('Triangle 3', WashMaskShape.triangle3),
    ('Triangle 4', WashMaskShape.triangle4),
  ];

  static const _sizes = <(String, double, String)>[
    ('XL', 128, 'h-32 w-32'),
    ('LG', 96, 'h-24 w-24'),
    ('MD', 64, 'h-16 w-16'),
    ('SM', 48, 'h-12 w-12'),
    ('XS', 32, 'h-8 w-8'),
  ];

  static const _studioPlates = <(String, WashMaskShape, LinearGradient?)>[
    ('Cerulean wash', WashMaskShape.squircle, WashMaskWashes.cerulean),
    ('Ochre bloom', WashMaskShape.hexagon, WashMaskWashes.ochre),
    ('Rose lake', WashMaskShape.heart, WashMaskWashes.rose),
    ('Ink star', WashMaskShape.star2, null),
    ('Jade diamond', WashMaskShape.diamond, WashMaskWashes.jade),
    ('Violet plate', WashMaskShape.pentagon, WashMaskWashes.violet),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    return WashGalleryPage(
      title: 'Mask',
      description:
          'daisyUI mask crops washes and figures into common shapes.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Shapes',
          title: 'Shape masks',
          description:
              'Every style class: squircle through triangle-4, on soft studio',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final cols = constraints.maxWidth >= 1024
                    ? 5
                    : constraints.maxWidth >= 768
                        ? 4
                        : constraints.maxWidth >= 640
                            ? 3
                            : 2;
                final gap = 24.0;
                final cellW =
                    (constraints.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    for (var i = 0; i < _shapes.length; i++)
                      SizedBox(
                        width: cellW,
                        child: _Sample(
                          label: 'mask ${washMaskClassName(_shapes[i].$2)}',
                          child: WashMask(
                            shape: _shapes[i].$2,
                            dimension: 96,
                            gradient: i % 6 == 5
                                ? WashMaskWashes.ink(tokens)
                                : WashMaskWashes
                                    .shapeCycle[i % WashMaskWashes.shapeCycle.length],
                            semanticLabel:
                                '${_shapes[i].$1} mask over pigment wash',
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
            dartSource: _shapesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Half masks',
          title: 'Half crop',
          description:
              'mask-half-1 and mask-half-2 crop the first or second half of a',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: Column(
              children: [
                Wrap(
                  spacing: 40,
                  runSpacing: 24,
                  alignment: WrapAlignment.center,
                  crossAxisAlignment: WrapCrossAlignment.end,
                  children: [
                    _Sample(
                      label: 'mask mask-half-1 mask-heart',
                      child: WashMask(
                        shape: WashMaskShape.heart,
                        half: WashMaskHalf.first,
                        dimension: 96,
                        gradient: WashMaskWashes.rose,
                        semanticLabel: 'Heart mask, first half',
                      ),
                    ),
                    _Sample(
                      label: 'mask mask-half-2 mask-heart',
                      child: WashMask(
                        shape: WashMaskShape.heart,
                        half: WashMaskHalf.second,
                        dimension: 96,
                        gradient: WashMaskWashes.cerulean,
                        semanticLabel: 'Heart mask, second half',
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                Text(
                  'Paired halves form one figure with two washes',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 14),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    WashMask(
                      shape: WashMaskShape.hexagon,
                      half: WashMaskHalf.first,
                      dimension: 112,
                      gradient: WashMaskWashes.ochre,
                      semanticLabel: 'Hexagon half one, ochre wash',
                    ),
                    WashMask(
                      shape: WashMaskShape.hexagon,
                      half: WashMaskHalf.second,
                      dimension: 112,
                      gradient: WashMaskWashes.jade,
                      semanticLabel: 'Hexagon half two, jade wash',
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'mask-half-1 + mask-half-2 mask-hexagon',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontFamily: 'monospace',
                    fontSize: 10.4,
                  ),
                ),
                const SizedBox(height: 40),
                Wrap(
                  spacing: 32,
                  runSpacing: 24,
                  alignment: WrapAlignment.center,
                  crossAxisAlignment: WrapCrossAlignment.end,
                  children: [
                    _Sample(
                      label: 'mask mask-half-1 mask-star',
                      child: WashMask(
                        shape: WashMaskShape.star,
                        half: WashMaskHalf.first,
                        dimension: 96,
                        gradient: WashMaskWashes.violet,
                        semanticLabel: 'Star mask, first half',
                      ),
                    ),
                    _Sample(
                      label: 'mask mask-half-2 mask-star',
                      child: WashMask(
                        shape: WashMaskShape.star,
                        half: WashMaskHalf.second,
                        dimension: 96,
                        gradient: WashMaskWashes.ink(tokens),
                        semanticLabel: 'Star mask, second half',
                      ),
                    ),
                  ],
                ),
              ],
            ),
            dartSource: _halfDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Sizes',
          title: 'Custom widths',
          description: 'Size with Tailwind w-* and h-* on the masked element',
          child: WashShowcaseTabs(
            preview: Wrap(
              spacing: 32,
              runSpacing: 24,
              alignment: WrapAlignment.center,
              crossAxisAlignment: WrapCrossAlignment.end,
              children: [
                for (var i = 0; i < _sizes.length; i++)
                  _Sample(
                    label: 'mask mask-squircle ${_sizes[i].$3}',
                    child: WashMask(
                      shape: WashMaskShape.squircle,
                      dimension: _sizes[i].$2,
                      gradient: i % 6 == 5
                          ? WashMaskWashes.ink(tokens)
                          : WashMaskWashes.shapeCycle[
                              i % WashMaskWashes.shapeCycle.length],
                      semanticLabel: 'Squircle mask, ${_sizes[i].$1} size',
                    ),
                  ),
              ],
            ),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Studio',
          title: 'Pigment wash plates',
          description:
              'Local CSS washes with soft grain, cropped by studio-friendly shapes',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: Column(
              children: [
                LayoutBuilder(
                  builder: (context, constraints) {
                    final cols = constraints.maxWidth >= 640 ? 3 : 2;
                    final gap = 24.0;
                    final cellW =
                        (constraints.maxWidth - gap * (cols - 1)) / cols;
                    return Wrap(
                      spacing: gap,
                      runSpacing: gap,
                      children: [
                        for (final plate in _studioPlates)
                          SizedBox(
                            width: cellW,
                            child: _Sample(
                              label: 'mask ${washMaskClassName(plate.$2)}',
                              child: Column(
                                children: [
                                  WashMask(
                                    shape: plate.$2,
                                    dimension: 112,
                                    gradient:
                                        plate.$3 ?? WashMaskWashes.ink(tokens),
                                    grain: true,
                                    semanticLabel:
                                        '${plate.$1} pigment plate',
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    plate.$1,
                                    style: WashTypography.body(tokens.inkMuted)
                                        .copyWith(fontSize: 12),
                                  ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    );
                  },
                ),
                const SizedBox(height: 32),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.only(top: 32),
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: tokens.inkBorder.withValues(alpha: 0.6),
                      ),
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Local asset cropped with mask-circle',
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 14),
                      ),
                      const SizedBox(height: 12),
                      _Sample(
                        label: 'mask mask-circle',
                        child: WashMask(
                          shape: WashMaskShape.circle,
                          dimension: 112,
                          semanticLabel:
                              'Studio watercolor hero crop in a circle mask',
                          child: Image.asset(
                            'assets/images/studio_hero.png',
                            package: 'menzies_design_wash_ui',
                            fit: BoxFit.cover,
                            width: 112,
                            height: 112,
                            errorBuilder: (_, __, ___) => DecoratedBox(
                              decoration: BoxDecoration(
                                gradient: WashMaskWashes.cerulean,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            dartSource: _studioDart,
          ),
        ),
      ],
    );
  }

  static const _shapesDart =
      'WashMask(shape: WashMaskShape.squircle, gradient: …)';
  static const _halfDart =
      'WashMask(shape: …, half: WashMaskHalf.first|second)';
  static const _sizesDart = 'WashMask(shape: squircle, dimension: 32…128)';
  static const _studioDart =
      'WashMask(…, grain: true) + Image.asset in mask-circle';
}

class _Sample extends StatelessWidget {
  const _Sample({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          label,
          textAlign: TextAlign.center,
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10.4,
          ),
        ),
      ],
    );
  }
}
