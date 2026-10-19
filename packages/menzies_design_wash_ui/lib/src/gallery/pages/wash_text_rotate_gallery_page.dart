import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/text_rotate/wash_text_rotate.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashTextRotateGalleryPage extends StatelessWidget {
  const WashTextRotateGalleryPage({super.key});

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washRose = Color(0xFFC97B84);
  static const _washOchre = Color(0xFFC4A574);

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

  static TextStyle _display(
    Color color, {
    required double size,
    double height = 1.2,
    FontWeight weight = FontWeight.w600,
    bool italic = false,
  }) {
    return TextStyle(
      fontFamily: WashTypography.displayFamily,
      fontSize: size,
      fontWeight: weight,
      height: height,
      fontStyle: italic ? FontStyle.italic : FontStyle.normal,
      color: color,
    );
  }

  static TextStyle _body(
    Color color, {
    required double size,
    double height = 1.25,
    FontWeight weight = FontWeight.w600,
  }) {
    return TextStyle(
      fontFamily: WashTypography.bodyFamily,
      fontSize: size,
      fontWeight: weight,
      height: height,
      color: color,
    );
  }

  static double _sizeAt(
    double width, {
    required double compact,
    required double regular,
    double md = WashTailwindBreakpoints.md,
  }) {
    return width < md ? compact : regular;
  }

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Text rotate',
      description:
          'daisyUI text-rotate cycles 2 to 6 lines in a single line-height slot.',
      sections: [
        _s(
          '01 · Basic',
          'Rotating word list',
          'Three words in the official nested span structure',
          _basic(context),
          _basicDart,
        ),
        _s(
          '02 · Variants',
          'Centered, duration, sentence, and leading',
          'Documented presentation patterns: justify-items-center, duration-*',
          _variants(context),
          _variantsDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Sizes and colors',
          'Type scale and semantic ink',
          'Size with Tailwind text utilities',
          _sizes(context),
          _sizesDart,
          tint: WashGalleryPanelTint.blue,
        ),
        _s(
          '04 · Studio',
          'Menzies Design headline',
          'Rotating watercolor verbs and pigment names inside a studio hero',
          _studio(context),
          _studioDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '05 · Responsive',
          'Scale down on small screens',
          'Use max-md:text-* with larger desktop type so the slot stays one',
          _responsive(context),
          _responsiveDart,
        ),
        _s(
          '06 · Reduced motion',
          'Pause and flatten',
          'Under prefers-reduced-motion: reduce, gallery CSS stops the rotator',
          _reduced(context),
          _reducedDart,
          tint: WashGalleryPanelTint.blue,
        ),
      ],
    );
  }

  static Widget _sample(
    String label,
    Widget child, {
    CrossAxisAlignment align = CrossAxisAlignment.start,
  }) {
    return Column(
      crossAxisAlignment: align,
      children: [
        child,
        const SizedBox(height: 8),
        WashTextRotateClassLabel(label),
      ],
    );
  }

  static Widget _basic(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final size = _sizeAt(c.maxWidth, compact: 30, regular: 36);
        return _sample(
          'text-rotate',
          WashTextRotate(
            words: const ['Wash', 'Glaze', 'Bloom'],
            style: _display(tokens.onSurface, size: size, height: 1.15)
                .copyWith(letterSpacing: -0.4),
          ),
        );
      },
    );
  }

  static Widget _variants(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final two = c.maxWidth >= WashTailwindBreakpoints.lg;
        final layerSize = _sizeAt(c.maxWidth, compact: 30, regular: 60);
        final durationSize = _sizeAt(c.maxWidth, compact: 36, regular: 48);
        final sentenceSize = _sizeAt(c.maxWidth, compact: 16, regular: 18);
        final leadSize = _sizeAt(c.maxWidth, compact: 30, regular: 36);

        final cells = [
          _sample(
            'text-rotate text-5xl + justify-items-center',
            WashTextRotate(
              words: const ['LAYER', 'SOFTEN', 'LIFT', 'EDGE', 'DRY', 'REPEAT'],
              center: true,
              style: _display(tokens.onSurface, size: layerSize, height: 1),
            ),
            align: CrossAxisAlignment.center,
          ),
          _sample(
            'text-rotate duration-6000',
            WashTextRotate(
              duration: kWashTextRotateDuration6000,
              center: true,
              children: [
                Text(
                  'Soft',
                  style: _display(tokens.onSurface, size: durationSize, height: 1.1),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Text(
                    'edge first',
                    style: _display(
                      tokens.onSurface,
                      size: durationSize,
                      height: 1.1,
                      weight: FontWeight.w700,
                      italic: true,
                    ),
                  ),
                ),
              ],
            ),
            align: CrossAxisAlignment.center,
          ),
          _sample(
            'inline text-rotate + per-word color',
            DefaultTextStyle(
              style: _body(tokens.onSurface, size: sentenceSize, weight: FontWeight.w500),
              child: Wrap(
                crossAxisAlignment: WrapCrossAlignment.end,
                children: [
                  const Text('Mixing plates for '),
                  WashTextRotate(
                    style: _body(tokens.onSurface, size: sentenceSize, weight: FontWeight.w500),
                    children: [
                      _PigmentChip('fog', _washBlue, tokens),
                      _PigmentChip('bloom', _washRose, tokens),
                      _PigmentChip('grain', _washOchre, tokens),
                    ],
                  ),
                ],
              ),
            ),
          ),
          _sample(
            'text-rotate leading-[2]',
            WashTextRotate(
              words: const ['Wet in wet', 'Dry brush', 'Lift wash', 'Hard edge'],
              center: true,
              style: _display(tokens.onSurface, size: leadSize, height: 2),
            ),
            align: CrossAxisAlignment.center,
          ),
        ];

        if (two) {
          return Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: cells[0]),
                  const SizedBox(width: 32),
                  Expanded(child: cells[1]),
                ],
              ),
              const SizedBox(height: 32),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: cells[2]),
                  const SizedBox(width: 32),
                  Expanded(child: cells[3]),
                ],
              ),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (var i = 0; i < cells.length; i++) ...[
              if (i > 0) const SizedBox(height: 32),
              cells[i],
            ],
          ],
        );
      },
    );
  }

  static Widget _sizes(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final cols = c.maxWidth >= WashTailwindBreakpoints.lg
            ? 3
            : c.maxWidth >= WashTailwindBreakpoints.sm
                ? 2
                : 1;
        final cells = [
          _sample(
            'text-rotate text-xl',
            WashTextRotate(
              words: const ['Cerulean', 'Ultramarine', 'Indigo'],
              style: _body(tokens.onSurface, size: 20, height: 1.4),
            ),
          ),
          _sample(
            'text-rotate text-3xl',
            WashTextRotate(
              words: const ['Ochre', 'Sienna', 'Umber'],
              style: _display(tokens.onSurface, size: 30, height: 1.2),
            ),
          ),
          _sample(
            'text-rotate text-5xl',
            WashTextRotate(
              words: const ['Rose', 'Madder', 'Carmine'],
              style: _display(tokens.onSurface, size: 48, height: 1),
            ),
          ),
          _sample(
            'text-rotate text-primary',
            WashTextRotate(
              words: const ['Primary', 'wash', 'ink'],
              style: _body(tokens.primary, size: 24, height: 1.33),
            ),
          ),
          _sample(
            'text-rotate text-secondary',
            WashTextRotate(
              words: const ['Secondary', 'glaze', 'tint'],
              style: _body(tokens.palette.secondary, size: 24, height: 1.33),
            ),
          ),
          _sample(
            'text-rotate text-accent',
            WashTextRotate(
              words: const ['Accent', 'bloom', 'edge'],
              style: _body(tokens.palette.accent, size: 24, height: 1.33),
            ),
          ),
        ];
        return _grid(cells, cols: cols, gap: 24);
      },
    );
  }

  static Widget _studio(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final w = c.maxWidth;
        final headline = w >= WashTailwindBreakpoints.lg
            ? 60.0
            : w >= WashTailwindBreakpoints.md
                ? 48.0
                : 30.0;
        final padH = w >= WashTailwindBreakpoints.md ? 40.0 : 20.0;
        final padV = w >= WashTailwindBreakpoints.md ? 56.0 : 40.0;
        return _sample(
          'hero line + text-rotate',
          DecoratedBox(
            decoration: BoxDecoration(
              color: tokens.palette.base200.withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(tokens.radiusBox),
            ),
            child: Padding(
              padding: EdgeInsets.fromLTRB(padH, padV, padH, padV),
              child: Column(
                children: [
                  const WashGalleryLabelInk('Menzies Design'),
                  const SizedBox(height: 12),
                  Wrap(
                    alignment: WrapAlignment.center,
                    crossAxisAlignment: WrapCrossAlignment.end,
                    children: [
                      Text(
                        'Learn to ',
                        style: _display(
                          tokens.onSurface,
                          size: headline,
                          height: 1.1,
                        ).copyWith(letterSpacing: -0.5),
                      ),
                      WashTextRotate(
                        words: const ['wet', 'lift', 'glaze', 'bloom', 'grain', 'rest'],
                        center: true,
                        style: _display(
                          tokens.primary,
                          size: headline,
                          height: 1.1,
                        ).copyWith(letterSpacing: -0.5),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 512),
                    child: Text(
                      'One rotating verb keeps the headline calm while the pigment desk cycles studio language.',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: w >= WashTailwindBreakpoints.md ? 16 : 14,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          align: CrossAxisAlignment.stretch,
        );
      },
    );
  }

  static Widget _responsive(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final size = _sizeAt(c.maxWidth, compact: 24, regular: 60);
        return Column(
          children: [
            _sample(
              'text-rotate max-md:text-2xl text-6xl',
              WashTextRotate(
                words: const ['Plate', 'Series', 'Study', 'Field'],
                center: true,
                style: _display(tokens.onSurface, size: size, height: 1),
              ),
              align: CrossAxisAlignment.center,
            ),
            const SizedBox(height: 16),
            Text.rich(
              TextSpan(
                style: WashTypography.body(tokens.inkMuted),
                children: [
                  const TextSpan(text: 'On narrow viewports the type drops to '),
                  TextSpan(
                    text: 'text-2xl',
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontFamily: 'monospace',
                      fontSize: 12,
                    ),
                  ),
                  const TextSpan(text: '; from '),
                  TextSpan(
                    text: 'md',
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontFamily: 'monospace',
                      fontSize: 12,
                    ),
                  ),
                  const TextSpan(text: ' up it grows to '),
                  TextSpan(
                    text: 'text-6xl',
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontFamily: 'monospace',
                      fontSize: 12,
                    ),
                  ),
                  const TextSpan(text: '.'),
                ],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        );
      },
    );
  }

  static Widget _reduced(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final two = c.maxWidth >= WashTailwindBreakpoints.md;
        final style = _display(tokens.onSurface, size: 24, height: 1.2);
        final live = _sample(
          'text-rotate (system preference)',
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Live rotator. Flattens automatically when the OS asks for reduced motion.',
                style: WashTypography.body(tokens.inkMuted),
              ),
              const SizedBox(height: 8),
              WashTextRotate(
                words: const ['Animate', 'Pause', 'Flatten'],
                style: style,
              ),
            ],
          ),
        );
        final flat = _sample(
          'text-rotate text-rotate-static',
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Always flat companion: first word only, no loop.',
                style: WashTypography.body(tokens.inkMuted),
              ),
              const SizedBox(height: 8),
              WashTextRotate(
                words: const ['Animate', 'Pause', 'Flatten'],
                staticRotate: true,
                style: style,
              ),
            ],
          ),
        );
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (two)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: live),
                  const SizedBox(width: 24),
                  Expanded(child: flat),
                ],
              )
            else ...[
              live,
              const SizedBox(height: 24),
              flat,
            ],
            const SizedBox(height: 24),
            const WashDaisyAlert(
              children: [
                WashAlertMessage(
                  'Official daisyUI still ships a stepped fallback under reduced motion. This gallery overrides that with pause and flatten so the headline stays still.',
                ),
              ],
            ),
          ],
        );
      },
    );
  }

  static Widget _grid(List<Widget> cells, {required int cols, required double gap}) {
    if (cols <= 1) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (var i = 0; i < cells.length; i++) ...[
            if (i > 0) SizedBox(height: gap),
            cells[i],
          ],
        ],
      );
    }
    final rows = <Widget>[];
    for (var i = 0; i < cells.length; i += cols) {
      final slice = cells.sublist(i, i + cols > cells.length ? cells.length : i + cols);
      rows.add(
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var j = 0; j < cols; j++) ...[
              if (j > 0) SizedBox(width: gap),
              Expanded(child: j < slice.length ? slice[j] : const SizedBox.shrink()),
            ],
          ],
        ),
      );
    }
    return Column(
      children: [
        for (var i = 0; i < rows.length; i++) ...[
          if (i > 0) SizedBox(height: gap),
          rows[i],
        ],
      ],
    );
  }

  static const _basicDart = '''
WashTextRotate(
  words: ['Wash', 'Glaze', 'Bloom'],
)
''';

  static const _variantsDart = '''
WashTextRotate(
  center: true,
  words: ['LAYER', 'SOFTEN', 'LIFT', 'EDGE', 'DRY', 'REPEAT'],
)
WashTextRotate(
  duration: kWashTextRotateDuration6000,
  center: true,
  children: [Text('Soft'), Text('edge first')],
)
WashTextRotate(
  children: [
    _PigmentChip('fog'),
    _PigmentChip('bloom'),
    _PigmentChip('grain'),
  ],
)
WashTextRotate(
  center: true,
  style: TextStyle(height: 2),
  words: ['Wet in wet', 'Dry brush', 'Lift wash', 'Hard edge'],
)
''';

  static const _sizesDart = '''
WashTextRotate(words: ['Cerulean', 'Ultramarine', 'Indigo'])
WashTextRotate(words: ['Ochre', 'Sienna', 'Umber'])
WashTextRotate(words: ['Rose', 'Madder', 'Carmine'])
WashTextRotate(style: TextStyle(color: primary), words: ['Primary', 'wash', 'ink'])
''';

  static const _studioDart = '''
Row(
  children: [
    Text('Learn to '),
    WashTextRotate(
      center: true,
      words: ['wet', 'lift', 'glaze', 'bloom', 'grain', 'rest'],
    ),
  ],
)
''';

  static const _responsiveDart = '''
WashTextRotate(
  center: true,
  style: TextStyle(fontSize: width < 768 ? 24 : 60),
  words: ['Plate', 'Series', 'Study', 'Field'],
)
''';

  static const _reducedDart = '''
WashTextRotate(words: ['Animate', 'Pause', 'Flatten'])
WashTextRotate(
  staticRotate: true,
  words: ['Animate', 'Pause', 'Flatten'],
)
''';
}

class _PigmentChip extends StatelessWidget {
  const _PigmentChip(this.label, this.fill, this.tokens);

  final String label;
  final Color fill;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(tokens.radiusField),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8),
        child: Text(
          label,
          style: TextStyle(
            fontFamily: WashTypography.bodyFamily,
            fontSize: 16,
            fontWeight: FontWeight.w500,
            color: tokens.onSurface,
          ),
        ),
      ),
    );
  }
}
