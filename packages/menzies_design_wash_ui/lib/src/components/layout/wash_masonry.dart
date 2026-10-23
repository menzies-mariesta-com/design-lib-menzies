import 'package:flutter/widgets.dart';

import '../../components/layout/wash_aspect_ratio.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Masonry / CSS-columns-style packing (shortest-column greedy).
class WashMasonryLayout extends StatelessWidget {
  const WashMasonryLayout({
    required this.children,
    this.columnCount = 3,
    this.minColumnCount = 1,
    this.gap = 16,
    this.itemBottomMargin = 16,
    super.key,
  });

  final List<WashMasonryChild> children;
  final int columnCount;
  final int minColumnCount;
  final double gap;
  final double itemBottomMargin;

  int _resolveColumns(double width) {
    if (width >= WashTailwindBreakpoints.lg) return columnCount;
    if (width >= WashTailwindBreakpoints.sm) {
      return columnCount > 2 ? 2 : columnCount;
    }
    return minColumnCount;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = _resolveColumns(w);
        if (cols <= 1) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) SizedBox(height: itemBottomMargin),
                children[i].build(context),
              ],
            ],
          );
        }
        final lists = List.generate(cols, (_) => <Widget>[]);
        final heights = List.filled(cols, 0.0);
        for (final child in children) {
          var pick = 0;
          for (var c = 1; c < cols; c++) {
            if (heights[c] < heights[pick]) pick = c;
          }
          lists[pick].add(
            Padding(
              padding: EdgeInsets.only(bottom: itemBottomMargin),
              child: child.build(context),
            ),
          );
          heights[pick] += child.estimatedHeight + itemBottomMargin;
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var c = 0; c < cols; c++) ...[
              if (c > 0) SizedBox(width: gap),
              Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: lists[c])),
            ],
          ],
        );
      },
    );
  }
}

class WashMasonryChild {
  const WashMasonryChild({
    required this.builder,
    this.estimatedHeight = 120,
  });

  final Widget Function(BuildContext context) builder;
  final double estimatedHeight;

  Widget build(BuildContext context) => builder(context);
}

enum WashMasonryPanelTint { none, blue, ochre, rose }

/// Card shell for pigment masonry tiles (web `card card-border` + wash panel body).
class WashMasonryCard extends StatelessWidget {
  const WashMasonryCard({
    required this.title,
    required this.body,
    this.minHeight = 112,
    this.tint = WashMasonryPanelTint.none,
    super.key,
  });

  final String title;
  final String body;
  final double minHeight;
  final WashMasonryPanelTint tint;

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washOchre = Color(0xFFB87524);
  static const _washRose = Color(0xFFC45C6E);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final panel = switch (tint) {
      WashMasonryPanelTint.blue => _washBlue.withValues(alpha: 0.12),
      WashMasonryPanelTint.ochre => _washOchre.withValues(alpha: 0.14),
      WashMasonryPanelTint.rose => _washRose.withValues(alpha: 0.12),
      WashMasonryPanelTint.none => null,
    };
    return Container(
      constraints: BoxConstraints(minHeight: minHeight),
      decoration: washInkBorderBox(tokens, fill: tokens.surface),
      clipBehavior: Clip.antiAlias,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        color: panel,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title,
                style: WashTypography.title(tokens.onSurface)
                    .copyWith(fontSize: 16)),
            const SizedBox(height: 8),
            Text(body,
                style: WashTypography.body(tokens.inkMuted)
                    .copyWith(fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

/// Studio pigment cards used on the Bento / Masonry gallery page.
class WashMasonryPigmentData {
  const WashMasonryPigmentData({
    required this.id,
    required this.title,
    required this.body,
    required this.minHeight,
    this.tint = WashMasonryPanelTint.none,
  });

  final String id;
  final String title;
  final String body;
  final double minHeight;
  final WashMasonryPanelTint tint;

  static List<WashMasonryChild> toLayoutChildren() {
    return galleryCards
        .map(
          (c) => WashMasonryChild(
            estimatedHeight: c.minHeight,
            builder: (_) => WashMasonryCard(
              title: c.title,
              body: c.body,
              minHeight: c.minHeight,
              tint: c.tint,
            ),
          ),
        )
        .toList();
  }

  static const galleryCards = [
    WashMasonryPigmentData(
      id: 'cerulean',
      title: 'Cerulean wash',
      body: 'Cool sky field for coastal plates. Keep edges soft.',
      minHeight: 112,
      tint: WashMasonryPanelTint.blue,
    ),
    WashMasonryPigmentData(
      id: 'sienna',
      title: 'Raw sienna',
      body: 'Warm ground layer. Useful under fog and sand.',
      minHeight: 160,
      tint: WashMasonryPanelTint.ochre,
    ),
    WashMasonryPigmentData(
      id: 'madder',
      title: 'Rose madder',
      body: 'Quiet accent for dusk edges and bloom notes.',
      minHeight: 96,
      tint: WashMasonryPanelTint.rose,
    ),
    WashMasonryPigmentData(
      id: 'payne',
      title: 'Payne grey',
      body: 'Ink weight for cliffs and shadow bands without heavy black.',
      minHeight: 144,
    ),
    WashMasonryPigmentData(
      id: 'sap',
      title: 'Sap green',
      body: 'Tide vegetation. Thin, then glaze.',
      minHeight: 128,
    ),
    WashMasonryPigmentData(
      id: 'violet',
      title: 'Cobalt violet',
      body: 'Evening bloom. Pair with cerulean, not ochre.',
      minHeight: 176,
      tint: WashMasonryPanelTint.rose,
    ),
    WashMasonryPigmentData(
      id: 'fog',
      title: 'Fog plate',
      body: 'Low contrast wash. Hierarchy from type, not pigment.',
      minHeight: 112,
      tint: WashMasonryPanelTint.blue,
    ),
    WashMasonryPigmentData(
      id: 'critique',
      title: 'Critique note',
      body: 'Hold back chroma on the second pass.',
      minHeight: 144,
      tint: WashMasonryPanelTint.ochre,
    ),
  ];
}

/// Click-to-focus pigment masonry (gallery section 05).
class WashMasonryInteractiveDemo extends StatefulWidget {
  const WashMasonryInteractiveDemo({super.key});

  @override
  State<WashMasonryInteractiveDemo> createState() =>
      _WashMasonryInteractiveDemoState();
}

class _WashMasonryInteractiveDemoState
    extends State<WashMasonryInteractiveDemo> {
  String? _active;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashMasonryLayout(
          columnCount: 3,
          children: WashMasonryPigmentData.galleryCards
              .map(
                (c) => WashMasonryChild(
                  estimatedHeight: c.minHeight,
                  builder: (ctx) {
                    final selected = _active == c.id;
                    return GestureDetector(
                      onTap: () => setState(
                          () => _active = _active == c.id ? null : c.id),
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: selected
                                ? tokens.palette.secondary
                                : tokens.inkBorder,
                            width: selected ? 2 : 1,
                          ),
                          boxShadow:
                              selected ? washPaperShadowSm(tokens) : null,
                        ),
                        child: WashMasonryCard(
                          title: c.title,
                          body: c.body,
                          minHeight: c.minHeight,
                          tint: c.tint,
                        ),
                      ),
                    );
                  },
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 8),
        Text(
          _active == null
              ? 'Click a pigment card to focus it.'
              : 'Focused pigment: ${WashMasonryPigmentData.galleryCards.firstWhere((c) => c.id == _active).title}',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
        ),
      ],
    );
  }
}
