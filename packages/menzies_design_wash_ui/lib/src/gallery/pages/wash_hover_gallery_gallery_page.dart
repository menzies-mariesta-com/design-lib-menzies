import 'package:flutter/widgets.dart';

import '../../components/card/wash_card.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/layout/wash_hover_gallery.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

typedef _Plate = ({
  WashHoverGalleryTone tone,
  String label,
  WashHoverGalleryStage stage
});

class WashHoverGalleryGalleryPage extends StatelessWidget {
  const WashHoverGalleryGalleryPage({super.key});

  static const _basicPlates = <_Plate>[
    (
      tone: WashHoverGalleryTone.blue,
      label: 'Cerulean',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.blue,
      label: 'Cerulean',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Sienna',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Sienna',
      stage: WashHoverGalleryStage.dry
    ),
  ];

  static const _coastal = <_Plate>[
    (
      tone: WashHoverGalleryTone.blue,
      label: 'Fog I',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.blue,
      label: 'Fog II',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.sage,
      label: 'Tide',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ink,
      label: 'Cliff',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Sand',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.rose,
      label: 'Dusk',
      stage: WashHoverGalleryStage.dry
    ),
  ];

  static const _studioPreview = <_Plate>[
    (
      tone: WashHoverGalleryTone.rose,
      label: 'Madder',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Ochre',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.blue,
      label: 'Cobalt',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.sage,
      label: 'Sap',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.violet,
      label: 'Violet',
      stage: WashHoverGalleryStage.dry
    ),
  ];

  static const _fullSet = <_Plate>[
    (
      tone: WashHoverGalleryTone.blue,
      label: '01',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: '02',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.rose,
      label: '03',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.sage,
      label: '04',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.violet,
      label: '05',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ink,
      label: '06',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.blue,
      label: '07',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: '08',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.rose,
      label: '09',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.sage,
      label: '10',
      stage: WashHoverGalleryStage.dry
    ),
  ];

  static const _warmSeries = <_Plate>[
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Warm I',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ochre,
      label: 'Warm II',
      stage: WashHoverGalleryStage.dry
    ),
    (
      tone: WashHoverGalleryTone.rose,
      label: 'Bloom',
      stage: WashHoverGalleryStage.wet
    ),
    (
      tone: WashHoverGalleryTone.ink,
      label: 'Line',
      stage: WashHoverGalleryStage.dry
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Hover gallery',
      description: 'daisyUI hover-gallery image strips.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Official structure',
          description: 'A figure with hover-gallery and a max width',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: _gallery(_basicPlates,
                    maxWidth: WashHoverGalleryMaxWidth.w60),
                dartSource: _basicDart,
              ),
              const SizedBox(height: 16),
              Text(
                'Tip: hover left to right across the plate to step through each image column.',
                style: WashTypography.body(WashTokens.of(context).inkMuted)
                    .copyWith(fontSize: 14),
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Multiple figures',
          title: 'Wash plate sets',
          description: 'Several galleries with matching SVG wash plates',
          tint: WashGalleryPanelTint.ochre,
          child: _multiColGrid(
            context,
            [
              WashShowcaseTabs(
                preview: _gallery(_basicPlates,
                    maxWidth: WashHoverGalleryMaxWidth.w60),
                dartSource: _setADart,
              ),
              WashShowcaseTabs(
                preview:
                    _gallery(_coastal, maxWidth: WashHoverGalleryMaxWidth.w60),
                dartSource: _setBDart,
              ),
              WashShowcaseTabs(
                preview:
                    _gallery(_fullSet, maxWidth: WashHoverGalleryMaxWidth.w60),
                dartSource: _setCDart,
              ),
            ],
            smCols: 2,
            lgCols: 3,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Sizes and aspect',
          title: 'Width and frame',
          description: 'No size modifier classes: constrain',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseWrap(
            maxColumns: 2,
            minItemWidth: 360,
            spacing: 24,
            runSpacing: 24,
            alignment: WrapAlignment.start,
            children: [
              WashShowcaseTabs(
                preview: _gallery(
                  _basicPlates,
                  maxWidth: WashHoverGalleryMaxWidth.w40,
                  w: 320,
                  h: 240,
                ),
                dartSource: _sizeSmDart,
              ),
              WashShowcaseTabs(
                preview: _gallery(_basicPlates,
                    maxWidth: WashHoverGalleryMaxWidth.w60),
                dartSource: _sizeMdDart,
              ),
              WashShowcaseTabs(
                preview: _gallery(_basicPlates,
                    maxWidth: WashHoverGalleryMaxWidth.xs),
                dartSource: _sizeLgDart,
              ),
              WashShowcaseTabs(
                preview: _squareGallery(),
                dartSource: _sizeSqDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Studio set',
          title: 'Menzies Design pigment preview',
          description: 'Official card + hover-gallery pattern, themed',
          child: _multiColGrid(
            context,
            [
              WashShowcaseTabs(
                  preview: _coastalFogCard(context),
                  dartSource: _studioCardDart),
              WashShowcaseTabs(
                  preview: _warmPaperCard(context), dartSource: _warmCardDart),
              WashShowcaseTabs(
                  preview: _divGalleryNote(context), dartSource: _divDart),
            ],
            smCols: 2,
            lgCols: 3,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Responsive',
          title: 'Fluid studio grid',
          description: 'Galleries wrap on small screens',
          tint: WashGalleryPanelTint.blue,
          child: _responsiveGrid(context),
        ),
      ],
    );
  }

  static Widget _multiColGrid(
    BuildContext context,
    List<Widget> cells, {
    required int smCols,
    required int lgCols,
  }) {
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= WashTailwindBreakpoints.lg
            ? lgCols
            : (c.maxWidth >= WashTailwindBreakpoints.sm ? smCols : 1);
        return _grid(cells, cols);
      },
    );
  }

  static Widget _grid(List<Widget> cells, int cols) {
    final rows = <Widget>[];
    for (var i = 0; i < cells.length; i += cols) {
      final rowCells =
          cells.sublist(i, i + cols > cells.length ? cells.length : i + cols);
      rows.add(
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var j = 0; j < rowCells.length; j++) ...[
              if (j > 0) const SizedBox(width: 24),
              Expanded(child: rowCells[j]),
            ],
            for (var k = rowCells.length; k < cols; k++) ...[
              if (k > 0 || rowCells.isNotEmpty) const SizedBox(width: 24),
              const Expanded(child: SizedBox()),
            ],
          ],
        ),
      );
      if (i + cols < cells.length) {
        rows.add(const SizedBox(height: 24));
      }
    }
    return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch, children: rows);
  }

  static Widget _responsiveGrid(BuildContext context) {
    const sets = <({String name, List<WashHoverGalleryTone> tones})>[
      (
        name: 'Blue',
        tones: [
          WashHoverGalleryTone.blue,
          WashHoverGalleryTone.blue,
          WashHoverGalleryTone.sage,
          WashHoverGalleryTone.ink
        ]
      ),
      (
        name: 'Ochre',
        tones: [
          WashHoverGalleryTone.ochre,
          WashHoverGalleryTone.ochre,
          WashHoverGalleryTone.rose,
          WashHoverGalleryTone.ink
        ]
      ),
      (
        name: 'Rose',
        tones: [
          WashHoverGalleryTone.rose,
          WashHoverGalleryTone.violet,
          WashHoverGalleryTone.rose,
          WashHoverGalleryTone.ink
        ]
      ),
      (
        name: 'Sage',
        tones: [
          WashHoverGalleryTone.sage,
          WashHoverGalleryTone.blue,
          WashHoverGalleryTone.sage,
          WashHoverGalleryTone.ochre
        ]
      ),
    ];

    final tabs = <Widget>[];
    for (final set in sets) {
      final plates = <_Plate>[];
      for (var i = 0; i < set.tones.length; i++) {
        final tone = set.tones[i];
        plates.add((
          tone: tone,
          label: _toneLabel(tone),
          stage:
              i.isEven ? WashHoverGalleryStage.wet : WashHoverGalleryStage.dry,
        ));
      }
      tabs.add(
        WashShowcaseTabs(
          preview: LayoutBuilder(
            builder: (context, c) {
              final maxW = c.maxWidth >= WashTailwindBreakpoints.sm
                  ? WashHoverGalleryMaxWidth.w60
                  : double.infinity;
              return _gallery(plates, maxWidth: maxW);
            },
          ),
          dartSource: '// WashHoverGallery responsive set: ${set.name}',
        ),
      );
    }

    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= WashTailwindBreakpoints.lg
            ? 4
            : (c.maxWidth >= WashTailwindBreakpoints.md
                ? 3
                : (c.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1));
        return _grid(tabs, cols);
      },
    );
  }

  static String _toneLabel(WashHoverGalleryTone tone) => switch (tone) {
        WashHoverGalleryTone.blue => 'Cerulean',
        WashHoverGalleryTone.ochre => 'Raw sienna',
        WashHoverGalleryTone.rose => 'Rose madder',
        WashHoverGalleryTone.ink => 'Payne grey',
        WashHoverGalleryTone.sage => 'Sap green',
        WashHoverGalleryTone.violet => 'Cobalt violet',
      };

  static Widget _plate(_Plate p, {double w = 480, double h = 360}) {
    return WashHoverGalleryPlate(
      tone: p.tone,
      label: p.label,
      stage: p.stage,
      width: w,
      height: h,
    );
  }

  static Widget _gallery(
    List<_Plate> plates, {
    double? maxWidth,
    double w = 480,
    double h = 360,
  }) {
    return WashHoverGallery(
      maxWidth: maxWidth,
      aspectRatio: w / h,
      children: plates.map((p) => _plate(p, w: w, h: h)).toList(),
    );
  }

  static Widget _squareGallery() {
    const tones = [
      WashHoverGalleryTone.blue,
      WashHoverGalleryTone.ochre,
      WashHoverGalleryTone.rose,
      WashHoverGalleryTone.sage,
    ];
    final plates = tones
        .map(
          (t) => (
            tone: t,
            label: _toneLabel(t),
            stage: WashHoverGalleryStage.wet,
          ),
        )
        .toList();
    return WashHoverGallery(
      maxWidth: WashHoverGalleryMaxWidth.sm,
      aspectRatio: 1,
      children: plates.map((p) => _plate(p, w: 400, h: 400)).toList(),
    );
  }

  static Widget _coastalFogCard(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: WashHoverGalleryMaxWidth.w60),
      child: WashCard(
        size: WashCardSize.sm,
        maxWidth: WashHoverGalleryMaxWidth.w60,
        body: WashCardBody(
          children: [
            WashCardTitle(
              'Coastal fog set',
              trailing: [
                Text(
                  '5 plates',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 14),
                ),
              ],
            ),
            Text(
              'Hover across the strip to preview each pigment wash.',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
          ],
        ),
        figure: WashCardFigure(
          child: WashHoverGallery(
            children: _studioPreview.map((p) => _plate(p)).toList(),
          ),
        ),
      ),
    );
  }

  static Widget _warmPaperCard(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: WashHoverGalleryMaxWidth.w60),
      child: WashCard(
        size: WashCardSize.sm,
        maxWidth: WashHoverGalleryMaxWidth.w60,
        body: WashCardBody(
          children: [
            WashCardTitle(
              'Warm paper set',
              trailing: [
                Text(
                  '4 plates',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 14),
                ),
              ],
            ),
            Text(
              'Ochre and rose washes for dry-brush studies.',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
          ],
        ),
        figure: WashCardFigure(
          child: WashHoverGallery(
            children: _warmSeries.map((p) => _plate(p)).toList(),
          ),
        ),
      ),
    );
  }

  static Widget _divGalleryNote(BuildContext context) {
    final tokens = WashTokens.of(context);
    final subset = _coastal.take(4).toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _gallery(subset, maxWidth: WashHoverGalleryMaxWidth.w60),
        const SizedBox(height: 8),
        Text.rich(
          TextSpan(
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            children: const [
              TextSpan(text: 'Same component on a '),
              TextSpan(text: 'div', style: TextStyle(fontFamily: 'monospace')),
              TextSpan(text: ' instead of '),
              TextSpan(
                  text: 'figure', style: TextStyle(fontFamily: 'monospace')),
              TextSpan(text: '.'),
            ],
          ),
        ),
      ],
    );
  }

  static const _basicDart = '''
WashHoverGallery(
  maxWidth: WashHoverGalleryMaxWidth.w60,
  children: [
    WashHoverGalleryPlate(tone: WashHoverGalleryTone.blue, label: 'Cerulean', stage: WashHoverGalleryStage.wet),
    // ... additional plates
  ],
);''';

  static const _setADart = '// WashHoverGallery with basic wash plate set';
  static const _setBDart = '// WashHoverGallery with coastal series';
  static const _setCDart = '// WashHoverGallery with full 10-plate set';
  static const _sizeSmDart =
      '// maxWidth: WashHoverGalleryMaxWidth.w40, plate 320x240';
  static const _sizeMdDart = '// maxWidth: WashHoverGalleryMaxWidth.w60';
  static const _sizeLgDart = '// maxWidth: WashHoverGalleryMaxWidth.xs';
  static const _sizeSqDart =
      '// maxWidth: WashHoverGalleryMaxWidth.sm, aspectRatio: 1';
  static const _studioCardDart =
      '// WashCard(figure: WashHoverGallery(...), body: ...)';
  static const _warmCardDart = '// Warm paper card + WashHoverGallery';
  static const _divDart = '// WashHoverGallery on a div (no figure wrapper)';
}
