import 'dart:ui' show FontFeature;

import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/progress/wash_progress.dart';
import '../../components/rating/wash_rating.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashRatingGalleryPage extends StatelessWidget {
  const WashRatingGalleryPage({super.key});

  static const _sizes = <(String, WashRatingSize)>[
    ('XS', WashRatingSize.xs),
    ('SM', WashRatingSize.sm),
    ('MD', WashRatingSize.md),
    ('LG', WashRatingSize.lg),
    ('XL', WashRatingSize.xl),
  ];

  static const _colors = <(String, WashProgressTone)>[
    ('Primary', WashProgressTone.primary),
    ('Secondary', WashProgressTone.secondary),
    ('Accent', WashProgressTone.accent),
    ('Neutral', WashProgressTone.neutral),
    ('Success', WashProgressTone.success),
    ('Warning', WashProgressTone.warning),
    ('Info', WashProgressTone.info),
    ('Error', WashProgressTone.error),
  ];

  static const _basicDart = '''
WashRating(
  value: score,
  onChanged: (v) => setScore(v),
  shape: WashRatingShape.star,
  tone: WashProgressTone.primary,
)
''';

  static const _sizesDart = '''
WashRating(
  value: 2,
  size: WashRatingSize.lg,
  tone: WashProgressTone.warning,
)
''';

  static const _colorsDart = '''
WashRating(value: 3, tone: WashProgressTone.primary)
WashRating(
  value: 2,
  shape: WashRatingShape.heart,
  itemTones: [error, warning, warning, success, success],
  gap: 4,
)
''';

  static const _halfDart = '''
WashRating(
  value: 3.5,
  half: true,
  clearable: true,
  size: WashRatingSize.lg,
  tone: WashProgressTone.success,
  onChanged: (v) => setDepth(v),
)
''';

  static const _interactiveDart = '''
WashRating(
  value: live,
  size: WashRatingSize.lg,
  tone: WashProgressTone.secondary,
  onChanged: (v) => setLive(v),
)
WashProgress(value: live * 20, max: 100, tone: WashProgressTone.secondary)
''';

  static const _studioDart = '''
WashRating(value: critique, size: WashRatingSize.md, shape: WashRatingShape.star)
WashRating(value: pigment, half: true, clearable: true, tone: WashProgressTone.accent)
WashRating(value: paper, size: WashRatingSize.sm, tone: WashProgressTone.info)
''';

  static const _clearDart = '''
WashRating(value: 4, readOnly: true, size: WashRatingSize.md, tone: WashProgressTone.warning)
WashRating(value: score, clearable: true, size: WashRatingSize.lg, onChanged: setScore)
''';

  static const _responsiveDart = '''
WashRating(value: 5, readOnly: true, size: WashRatingSize.md, tone: WashProgressTone.primary)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Rating',
      description:
          'daisyUI rating star sets for critique scores, pigment quality, and desk feedback.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Default stars',
          description: 'Radio inputs with mask-star for a five-point score',
          child: WashShowcaseTabs(
            preview: const _BasicSection(),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Sizes',
          title: 'Size scale',
          description: 'Extra small through extra large star tracks',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: _SizesSection(sizes: _sizes),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Colors',
          title: 'Semantic fills',
          description: 'Theme-aware bg colors on mask-star-2, plus heart masks',
          child: WashShowcaseTabs(
            preview: _ColorsSection(colors: _colors),
            dartSource: _colorsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Half stars',
          title: 'Half-step scores',
          description:
              'rating-half with mask-half-1 and mask-half-2 on mask-star-2',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _HalfSection(),
            dartSource: _halfDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Interactive',
          title: 'Controlled value',
          description: 'State drives the stars and a live badge readout',
          child: WashShowcaseTabs(
            preview: const _InteractiveSection(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Critique desk',
          description:
              'Plate critique, pigment quality, and paper feel in one wash panel',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _StudioSection(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Read-only and clear',
          title: 'Display and reset',
          description:
              'Div-based read-only stars, plus rating-hidden to clear a choice',
          child: WashShowcaseTabs(
            preview: const _ClearSection(),
            dartSource: _clearDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Responsive',
          title: 'Narrow and wide',
          description: 'Stacks on small screens; side-by-side score cards from md up',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _ResponsiveSection(),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }
}

WashBadgeTone _badgeTone(WashProgressTone tone) {
  return switch (tone) {
    WashProgressTone.primary => WashBadgeTone.primary,
    WashProgressTone.secondary => WashBadgeTone.secondary,
    WashProgressTone.accent => WashBadgeTone.accent,
    WashProgressTone.neutral => WashBadgeTone.neutral,
    WashProgressTone.info => WashBadgeTone.info,
    WashProgressTone.success => WashBadgeTone.success,
    WashProgressTone.warning => WashBadgeTone.warning,
    WashProgressTone.error => WashBadgeTone.error,
  };
}

Widget _classLabel(BuildContext context, String value) {
  return Text(
    value,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 10.4,
      fontFamily: 'monospace',
      fontFeatures: const [FontFeature.tabularFigures()],
    ),
  );
}

Widget _muted(BuildContext context, String text) {
  return Text(
    text,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 14,
    ),
  );
}

class _BasicSection extends StatefulWidget {
  const _BasicSection();

  @override
  State<_BasicSection> createState() => _BasicSectionState();
}

class _BasicSectionState extends State<_BasicSection> {
  num _value = 3;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 16,
      runSpacing: 12,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const WashGalleryLabelInk('Plate score'),
            const SizedBox(height: 8),
            WashRating(
              value: _value,
              onChanged: (v) => setState(() => _value = v),
              shape: WashRatingShape.star,
              tone: WashProgressTone.primary,
            ),
            const SizedBox(height: 8),
            _classLabel(context, 'rating + mask mask-star'),
          ],
        ),
        WashBadge(
          '${_value.toInt()} / 5',
          tone: _badgeTone(WashProgressTone.primary),
          style: WashBadgeStyle.outline,
        ),
      ],
    );
  }
}

class _SizesSection extends StatelessWidget {
  const _SizesSection({required this.sizes});
  final List<(String, WashRatingSize)> sizes;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 20,
      runSpacing: 20,
      children: [
        for (final (name, size) in sizes)
          SizedBox(
            width: 220,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk(name),
                const SizedBox(height: 4),
                _classLabel(context, 'rating rating-${name.toLowerCase()}'),
                const SizedBox(height: 8),
                WashRating(
                  value: 2,
                  size: size,
                  tone: WashProgressTone.warning,
                  onChanged: (_) {},
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _ColorsSection extends StatelessWidget {
  const _ColorsSection({required this.colors});
  final List<(String, WashProgressTone)> colors;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 20,
          runSpacing: 20,
          children: [
            for (final (name, tone) in colors)
              SizedBox(
                width: 220,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    WashGalleryLabelInk(name),
                    const SizedBox(height: 4),
                    _classLabel(context, 'mask-star-2 $name'),
                    const SizedBox(height: 8),
                    WashRating(
                      value: 3,
                      tone: tone,
                      onChanged: (_) {},
                    ),
                  ],
                ),
              ),
          ],
        ),
        const SizedBox(height: 24),
        Container(
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                color: WashTokens.of(context).inkBorder.withValues(alpha: 0.6),
              ),
            ),
          ),
          padding: const EdgeInsets.only(top: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const WashGalleryLabelInk('Hearts'),
              const SizedBox(height: 4),
              _classLabel(context, 'rating gap-1 + mask-heart'),
              const SizedBox(height: 8),
              WashRating(
                value: 2,
                shape: WashRatingShape.heart,
                gap: 4,
                onChanged: (_) {},
                itemTones: const [
                  WashProgressTone.error,
                  WashProgressTone.warning,
                  WashProgressTone.warning,
                  WashProgressTone.success,
                  WashProgressTone.success,
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _HalfSection extends StatefulWidget {
  const _HalfSection();

  @override
  State<_HalfSection> createState() => _HalfSectionState();
}

class _HalfSectionState extends State<_HalfSection> {
  num _value = 3.5;

  @override
  Widget build(BuildContext context) {
    final label = _value == _value.roundToDouble()
        ? '${_value.toInt()} / 5'
        : '${_value.toStringAsFixed(1)} / 5';
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 16,
      runSpacing: 12,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const WashGalleryLabelInk('Wash depth'),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: WashRating(
                value: _value,
                half: true,
                clearable: true,
                size: WashRatingSize.lg,
                tone: WashProgressTone.success,
                onChanged: (v) => setState(() => _value = v),
              ),
            ),
            const SizedBox(height: 8),
            _classLabel(context, 'rating rating-lg rating-half'),
          ],
        ),
        WashBadge(
          label,
          tone: _badgeTone(WashProgressTone.success),
          style: WashBadgeStyle.outline,
        ),
      ],
    );
  }
}

class _InteractiveSection extends StatefulWidget {
  const _InteractiveSection();

  @override
  State<_InteractiveSection> createState() => _InteractiveSectionState();
}

class _InteractiveSectionState extends State<_InteractiveSection> {
  num _live = 4;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 576),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    const Expanded(child: WashGalleryLabelInk('Series rating')),
                    WashBadge(
                      '${_live.toInt()} / 5',
                      tone: _badgeTone(WashProgressTone.secondary),
                      style: WashBadgeStyle.outline,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                WashRating(
                  value: _live,
                  size: WashRatingSize.lg,
                  tone: WashProgressTone.secondary,
                  onChanged: (v) => setState(() => _live = v),
                ),
                const SizedBox(height: 16),
                WashProgress(
                  value: _live * 20,
                  max: 100,
                  tone: WashProgressTone.secondary,
                  semanticLabel: 'Series rating progress',
                ),
                const SizedBox(height: 8),
                _classLabel(context, 'rating rating-lg (controlled)'),
              ],
            ),
          ),
          const SizedBox(width: 24),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            decoration: BoxDecoration(
              color: tokens.palette.base200.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: tokens.inkBorder.withValues(alpha: 0.6),
              ),
            ),
            child: Column(
              children: [
                WashLucideIcon(
                  'star',
                  size: 32,
                  color: tokens.palette.secondary,
                  strokeWidth: 1.75,
                ),
                const SizedBox(height: 8),
                Text(
                  '${_live.toInt()}',
                  style: WashTypography.displayLarge(tokens.palette.secondary)
                      .copyWith(
                    fontSize: 28,
                    fontWeight: FontWeight.w600,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
                Text(
                  'of 5',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StudioSection extends StatefulWidget {
  const _StudioSection();

  @override
  State<_StudioSection> createState() => _StudioSectionState();
}

class _StudioSectionState extends State<_StudioSection> {
  num _critique = 4;
  num _pigment = 3.5;
  num _paper = 5;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final average = (_critique + _pigment + _paper) / 3;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            WashLucideIcon(
              'palette',
              size: 16,
              color: tokens.palette.primary,
              strokeWidth: 1.75,
            ),
            const SizedBox(width: 8),
            Text(
              'Active plate review',
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 12,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _studioRow(
                    context,
                    label: 'Critique score',
                    valueLabel: '${_critique.toInt()} / 5',
                    rating: WashRating(
                      value: _critique,
                      size: WashRatingSize.md,
                      shape: WashRatingShape.star,
                      tone: WashProgressTone.primary,
                      onChanged: (v) => setState(() => _critique = v),
                    ),
                    classHint: 'rating rating-md + mask-star',
                  ),
                  const SizedBox(height: 20),
                  _studioRow(
                    context,
                    label: 'Pigment quality',
                    valueLabel: '${_pigment.toStringAsFixed(1)} / 5',
                    rating: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: WashRating(
                        value: _pigment,
                        half: true,
                        clearable: true,
                        size: WashRatingSize.md,
                        tone: WashProgressTone.accent,
                        onChanged: (v) => setState(() => _pigment = v),
                      ),
                    ),
                    classHint: 'rating rating-md rating-half',
                  ),
                  const SizedBox(height: 20),
                  _studioRow(
                    context,
                    label: 'Paper feel',
                    valueLabel: '${_paper.toInt()} / 5',
                    rating: WashRating(
                      value: _paper,
                      size: WashRatingSize.sm,
                      tone: WashProgressTone.info,
                      onChanged: (v) => setState(() => _paper = v),
                    ),
                    classHint: 'rating rating-sm + mask-star-2',
                  ),
                ],
              ),
            ),
            const SizedBox(width: 24),
            Expanded(
              flex: 8,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: tokens.palette.base100.withValues(alpha: 0.6),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: tokens.inkBorder.withValues(alpha: 0.7),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        WashLucideIcon(
                          'droplets',
                          size: 16,
                          color: tokens.palette.info,
                          strokeWidth: 1.75,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Review summary',
                          style: WashTypography.body(tokens.onSurface).copyWith(
                            fontWeight: FontWeight.w500,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _summaryLine(context, 'Critique', '${_critique.toInt()} / 5'),
                    _summaryLine(
                      context,
                      'Pigment',
                      '${_pigment.toStringAsFixed(1)} / 5',
                    ),
                    _summaryLine(context, 'Paper', '${_paper.toInt()} / 5'),
                    const SizedBox(height: 16),
                    const WashGalleryLabelInk('Average'),
                    const SizedBox(height: 8),
                    Text(
                      average.toStringAsFixed(1),
                      style: WashTypography.displayLarge(tokens.onSurface)
                          .copyWith(
                        fontSize: 32,
                        fontWeight: FontWeight.w600,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _studioRow(
    BuildContext context, {
    required String label,
    required String valueLabel,
    required Widget rating,
    required String classHint,
  }) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            WashGalleryLabelInk(label),
            const Spacer(),
            Text(
              valueLabel,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 12,
                fontFamily: 'monospace',
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        rating,
        const SizedBox(height: 8),
        _classLabel(context, classHint),
      ],
    );
  }

  Widget _summaryLine(BuildContext context, String label, String value) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text.rich(
        TextSpan(
          children: [
            TextSpan(
              text: '$label: ',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
            TextSpan(
              text: value,
              style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}

class _ClearSection extends StatefulWidget {
  const _ClearSection();

  @override
  State<_ClearSection> createState() => _ClearSectionState();
}

class _ClearSectionState extends State<_ClearSection> {
  num _clearable = 2;

  @override
  Widget build(BuildContext context) {
    final cleared = _clearable == 0;
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      children: [
        SizedBox(
          width: 280,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const WashGalleryLabelInk('Published score'),
              const SizedBox(height: 8),
              const WashRating(
                value: 4,
                readOnly: true,
                size: WashRatingSize.md,
                tone: WashProgressTone.warning,
                shape: WashRatingShape.star,
                semanticLabel: '4 of 5 stars',
              ),
              const SizedBox(height: 8),
              _classLabel(context, 'rating (div + aria-current)'),
              const SizedBox(height: 12),
              _muted(
                context,
                'Non-interactive display for locked critique results.',
              ),
            ],
          ),
        ),
        SizedBox(
          width: 280,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const WashGalleryLabelInk('Clearable rating'),
                  const Spacer(),
                  Text(
                    cleared ? 'cleared' : '${_clearable.toInt()} / 5',
                    style: WashTypography.body(
                      WashTokens.of(context).inkMuted,
                    ).copyWith(
                      fontSize: 12,
                      fontFamily: 'monospace',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              WashRating(
                value: _clearable,
                clearable: true,
                size: WashRatingSize.lg,
                tone: WashProgressTone.primary,
                onChanged: (v) => setState(() => _clearable = v),
              ),
              const SizedBox(height: 8),
              _classLabel(context, 'rating rating-lg + rating-hidden'),
              const SizedBox(height: 12),
              _muted(
                context,
                'First radio uses rating-hidden so the score can be cleared.',
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _ResponsiveSection extends StatelessWidget {
  const _ResponsiveSection();

  static const _cards = [
    ('Morning wash', 5, WashProgressTone.primary),
    ('Edge control', 3, WashProgressTone.secondary),
    ('Granulation', 4, WashProgressTone.accent),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            for (final (label, value, tone) in _cards)
              Container(
                width: 200,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: tokens.palette.base100.withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: tokens.inkBorder.withValues(alpha: 0.6),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    WashGalleryLabelInk(label),
                    const SizedBox(height: 12),
                    WashRating(
                      value: value,
                      readOnly: true,
                      size: WashRatingSize.md,
                      tone: tone,
                      shape: WashRatingShape.star,
                      semanticLabel: '$value of 5 stars',
                    ),
                    const SizedBox(height: 12),
                    Text(
                      '$value / 5',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 12,
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
        const SizedBox(height: 16),
        _classLabel(context, 'grid sm:grid-cols-2 xl:grid-cols-3'),
      ],
    );
  }
}
