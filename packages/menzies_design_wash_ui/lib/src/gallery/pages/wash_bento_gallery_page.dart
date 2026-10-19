import 'package:flutter/widgets.dart';

import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/layout/wash_bento.dart';
import '../../components/layout/wash_masonry.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashBentoGalleryPage extends StatelessWidget {
  const WashBentoGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Bento / Masonry',
      description: 'Layout galleries for Menzies Design desks.',
      sections: [
        _s('01 · Bento', 'Asymmetric studio grid', 'Hero tile plus smaller metric tiles', _bento(), _bentoDart),
        _s('02 · Masonry', 'Staggered pigment columns', 'CSS columns flow cards by height', _masonry(), _masonryDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Sizes / density', 'Gap and column density', 'Tighten or open the packing without changing tile content', _density(), _densityDart),
        _s('04 · Interactive', 'Click to highlight', 'Local selection only', const WashBentoInteractiveDemo(), _interactiveBentoDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Interactive masonry', 'Focus a pigment card', 'Same click pattern on column-packed cards', const WashMasonryInteractiveDemo(), _interactiveMasonryDart),
        _s('06 · Responsive', 'Single column on mobile', 'Bento collapses to one column under md', _responsive(), _responsiveDart),
        _s('07 · Bento vs masonry', 'How they differ', 'Choose the model that matches the desk: planned hierarchy or flowing', _compare(), _compareDart),
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

  static Widget _bento() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashBentoAsymmetricStudioDemo(),
        const SizedBox(height: 8),
        _classLabel('grid grid-cols-1 md:grid-cols-4 md:auto-rows-[7.5rem]'),
      ],
    );
  }

  static Widget _masonry() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashMasonryLayout(
          columnCount: 3,
          children: WashMasonryPigmentData.toLayoutChildren(),
        ),
        const SizedBox(height: 8),
        _classLabel('columns-1 sm:columns-2 lg:columns-3 · break-inside-avoid'),
      ],
    );
  }

  static Widget _density() {
    final cards = WashMasonryPigmentData.galleryCards.take(4).toList();
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final wide = w >= WashTailwindBreakpoints.lg;
        final cols = [
          _densityColumn(cards, gap: 8, margin: 8, label: 'Tight density', classLabel: 'gap-2 · columns-2'),
          _densityColumn(cards, gap: 16, margin: 16, label: 'Comfort density', classLabel: 'gap-4 · columns-2'),
          _densityColumn(cards, gap: 24, margin: 24, label: 'Loose density', classLabel: 'gap-6 · columns-2', pad: 16),
        ];
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (var i = 0; i < cols.length; i++) ...[
                if (i > 0) const SizedBox(width: 24),
                Expanded(child: cols[i]),
              ],
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (var i = 0; i < cols.length; i++) ...[
              if (i > 0) const SizedBox(height: 24),
              cols[i],
            ],
          ],
        );
      },
    );
  }

  static Widget _densityColumn(
    List<WashMasonryPigmentData> cards, {
    required double gap,
    required double margin,
    required String label,
    required String classLabel,
    double pad = 12,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashMasonryLayout(
          columnCount: 2,
          gap: gap,
          itemBottomMargin: margin,
          children: cards
              .map(
                (c) => WashMasonryChild(
                  estimatedHeight: 72,
                  builder: (ctx) {
                    final tokens = WashTokens.of(ctx);
                    return Container(
                      padding: EdgeInsets.all(pad),
                      decoration: washInkBorderBox(tokens, fill: tokens.surface),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(c.title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                          const SizedBox(height: 4),
                          Text(label, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12)),
                        ],
                      ),
                    );
                  },
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 8),
        _classLabel(classLabel),
      ],
    );
  }

  static Widget _responsive() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final sideBySide = w >= WashTailwindBreakpoints.lg;
        final bento = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _responsiveBento(),
            const SizedBox(height: 8),
            _classLabel('grid-cols-1 md:grid-cols-3'),
          ],
        );
        final masonry = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _responsiveMasonry(),
            const SizedBox(height: 8),
            _classLabel('columns-1 xl:columns-3'),
          ],
        );
        if (sideBySide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: bento),
              const SizedBox(width: 24),
              Expanded(child: masonry),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            bento,
            const SizedBox(height: 24),
            masonry,
          ],
        );
      },
    );
  }

  static Widget _responsiveBento() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final md = constraints.maxWidth >= WashTailwindBreakpoints.md;
        final tokens = WashTokens.of(context);
        if (!md) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _roundedTile(tokens, 'Wide on desktop', 'Full width on mobile', span: false),
              const SizedBox(height: 8),
              _roundedTile(tokens, 'Side', 'Stacks below', span: false),
              const SizedBox(height: 8),
              _roundedTile(tokens, 'Footer span', 'md:col-span-3', span: false),
            ],
          );
        }
        return WashBentoLayout(
          columns: 3,
          rowHeight: 88,
          cells: [
            WashBentoCell(
              columnSpan: 2,
              child: _roundedTile(tokens, 'Wide on desktop', 'Full width on mobile', span: false),
            ),
            WashBentoCell(child: _roundedTile(tokens, 'Side', 'Stacks below', span: false)),
            WashBentoCell(
              columnSpan: 3,
              child: _roundedTile(tokens, 'Footer span', 'md:col-span-3', span: false),
            ),
          ],
        );
      },
    );
  }

  static Widget _roundedTile(WashTokens tokens, String title, String body, {required bool span}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: WashTypography.title(tokens.onSurface).copyWith(fontWeight: FontWeight.w600)),
          const SizedBox(height: 4),
          Text(body, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14)),
        ],
      ),
    );
  }

  static Widget _responsiveMasonry() {
    return WashMasonryLayout(
      columnCount: 3,
      gap: 12,
      itemBottomMargin: 12,
      children: ['Fog', 'Sand', 'Cliff']
          .map(
            (name) => WashMasonryChild(
              estimatedHeight: 64,
              builder: (ctx) {
                final tokens = WashTokens.of(ctx);
                return Container(
                  padding: const EdgeInsets.all(12),
                  decoration: washInkBorderBox(tokens, fill: tokens.surface),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                      const SizedBox(height: 4),
                      Text(
                        'One column until xl',
                        style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
                      ),
                    ],
                  ),
                );
              },
            ),
          )
          .toList(),
    );
  }

  static Widget _compare() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final md = constraints.maxWidth >= WashTailwindBreakpoints.md;
        final tokens = WashTokens.of(context);
        final bento = _compareCard(
          tokens,
          'Bento',
          'Planned spans',
          'You assign col-span and row-span. Hero tiles stay dominant. Gaps are even. Best for dashboards and feature desks.',
          'CSS Grid · explicit spans',
        );
        final masonry = _compareCard(
          tokens,
          'Masonry',
          'Flow packing',
          'Cards keep natural heights. Columns pack top-to-bottom, then across. Order follows source, not a fixed map. Best for pigment libraries and note walls.',
          'CSS columns · break-inside-avoid',
        );
        if (md) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: bento),
              const SizedBox(width: 16),
              Expanded(child: masonry),
            ],
          );
        }
        return Column(children: [bento, const SizedBox(height: 16), masonry]);
      },
    );
  }

  static Widget _compareCard(
    WashTokens tokens,
    String label,
    String title,
    String body,
    String classLabel,
  ) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: washInkBorderBox(tokens, fill: tokens.surface),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashGalleryLabelInk(label),
          const SizedBox(height: 4),
          Text(title, style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
          const SizedBox(height: 8),
          Text(body, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14)),
          const SizedBox(height: 8),
          _classLabel(classLabel),
        ],
      ),
    );
  }

  static Widget _classLabel(String value) {
    return Text(value, style: const TextStyle(fontFamily: 'MapleMono', fontSize: 10.4));
  }

  static const _bentoDart = 'const WashBentoAsymmetricStudioDemo();';
  static const _masonryDart = 'WashMasonryLayout(columnCount: 3, children: WashMasonryPigmentData.toLayoutChildren());';
  static const _densityDart = 'WashMasonryLayout(columnCount: 2, gap: 16, children: [...]);';
  static const _interactiveBentoDart = 'const WashBentoInteractiveDemo();';
  static const _interactiveMasonryDart = 'const WashMasonryInteractiveDemo();';
  static const _responsiveDart = 'WashBentoLayout(columns: 3, cells: [...]);';
  static const _compareDart = 'WashBentoLayout vs WashMasonryLayout';
}
