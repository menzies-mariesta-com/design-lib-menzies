import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../foundation/reduced_motion.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashBentoPanelTint { none, blue, ochre, rose }

/// One cell in [WashBentoLayout] with responsive column / row spans (md+).
class WashBentoCell extends StatelessWidget {
  const WashBentoCell({
    required this.child,
    this.columnSpan = 1,
    this.rowSpan = 1,
    this.tint = WashBentoPanelTint.none,
    this.paperGrain = false,
    super.key,
  });

  final Widget child;
  final int columnSpan;
  final int rowSpan;
  final WashBentoPanelTint tint;
  final bool paperGrain;

  @override
  Widget build(BuildContext context) {
    return child;
  }
}

/// CSS-grid-style bento layout: fixed row height on md+, single column on phone.
class WashBentoLayout extends StatelessWidget {
  const WashBentoLayout({
    required this.cells,
    this.columns = 4,
    this.rowHeight = 120,
    this.gap = 12,
    this.mdGap = 16,
    super.key,
  });

  final List<WashBentoCell> cells;
  final int columns;
  final double rowHeight;
  final double gap;
  final double mdGap;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final md = w >= WashTailwindBreakpoints.md;
        final cols = md ? columns : 1;
        final g = md ? mdGap : gap;
        final specs = <_BentoSpec>[];
        for (final cell in cells) {
          specs.add(
            _BentoSpec(
              colSpan: md ? cell.columnSpan.clamp(1, cols) : 1,
              rowSpan: md ? cell.rowSpan : 1,
              tint: cell.tint,
              paperGrain: cell.paperGrain,
              child: cell.child,
            ),
          );
        }
        final placed = _place(specs, cols);
        if (placed.isEmpty) return const SizedBox.shrink();
        if (!md) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < placed.length; i++) ...[
                if (i > 0) SizedBox(height: g),
                _BentoChrome(
                  tint: placed[i].tint,
                  paperGrain: placed[i].paperGrain,
                  child: placed[i].child,
                ),
              ],
            ],
          );
        }
        final maxRow = placed.map((p) => p.row + p.rowSpan).reduce((a, b) => a > b ? a : b);
        final totalH = maxRow * rowHeight + (maxRow - 1) * g;
        final colW = (w - (cols - 1) * g) / cols;
        return SizedBox(
          height: totalH,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              for (final p in placed)
                Positioned(
                  left: p.col * (colW + g),
                  top: p.row * (rowHeight + g),
                  width: p.colSpan * colW + (p.colSpan - 1) * g,
                  height: p.rowSpan * rowHeight + (p.rowSpan - 1) * g,
                  child: _BentoChrome(
                    tint: p.tint,
                    paperGrain: p.paperGrain,
                    child: p.child,
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}

class _BentoSpec {
  _BentoSpec({
    required this.colSpan,
    required this.rowSpan,
    required this.tint,
    required this.paperGrain,
    required this.child,
  });

  final int colSpan;
  final int rowSpan;
  final WashBentoPanelTint tint;
  final bool paperGrain;
  final Widget child;
}

class _Placed {
  _Placed({
    required this.col,
    required this.row,
    required this.colSpan,
    required this.rowSpan,
    required this.tint,
    required this.paperGrain,
    required this.child,
  });

  final int col;
  final int row;
  final int colSpan;
  final int rowSpan;
  final WashBentoPanelTint tint;
  final bool paperGrain;
  final Widget child;
}

List<_Placed> _place(List<_BentoSpec> specs, int columns) {
  final occupied = <String>{};
  final out = <_Placed>[];
  for (final s in specs) {
    var placed = false;
    for (var row = 0; row < 64 && !placed; row++) {
      for (var col = 0; col <= columns - s.colSpan && !placed; col++) {
        if (_fits(occupied, col, row, s.colSpan, s.rowSpan)) {
          _mark(occupied, col, row, s.colSpan, s.rowSpan);
          out.add(
            _Placed(
              col: col,
              row: row,
              colSpan: s.colSpan,
              rowSpan: s.rowSpan,
              tint: s.tint,
              paperGrain: s.paperGrain,
              child: s.child,
            ),
          );
          placed = true;
        }
      }
    }
  }
  return out;
}

bool _fits(Set<String> occ, int col, int row, int cs, int rs) {
  for (var r = row; r < row + rs; r++) {
    for (var c = col; c < col + cs; c++) {
      if (occ.contains('$c,$r')) return false;
    }
  }
  return true;
}

void _mark(Set<String> occ, int col, int row, int cs, int rs) {
  for (var r = row; r < row + rs; r++) {
    for (var c = col; c < col + cs; c++) {
      occ.add('$c,$r');
    }
  }
}

class _BentoChrome extends StatelessWidget {
  const _BentoChrome({
    required this.child,
    required this.tint,
    required this.paperGrain,
  });

  final Widget child;
  final WashBentoPanelTint tint;
  final bool paperGrain;

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washOchre = Color(0xFFB87524);
  static const _washRose = Color(0xFFC45C6E);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final wash = switch (tint) {
      WashBentoPanelTint.blue => _washBlue.withValues(alpha: 0.14),
      WashBentoPanelTint.ochre => _washOchre.withValues(alpha: 0.14),
      WashBentoPanelTint.rose => _washRose.withValues(alpha: 0.12),
      WashBentoPanelTint.none => tokens.surface,
    };
    return DecoratedBox(
      decoration: BoxDecoration(
        color: wash,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: paperGrain ? washPaperShadowSm(tokens) : null,
      ),
      child: Padding(padding: const EdgeInsets.all(16), child: child),
    );
  }
}

/// Compact legacy / nav preview: asymmetric studio bento (section 01).
class WashBentoGrid extends StatelessWidget {
  const WashBentoGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return const WashBentoAsymmetricStudioDemo();
  }
}

/// Web parity: hero + stats + small cards + wide critique row.
class WashBentoAsymmetricStudioDemo extends StatelessWidget {
  const WashBentoAsymmetricStudioDemo({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashBentoLayout(
      cells: [
        WashBentoCell(
          columnSpan: 2,
          rowSpan: 2,
          tint: WashBentoPanelTint.blue,
          paperGrain: true,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Hero tile', style: WashTypography.label(tokens.inkMuted)),
                  const SizedBox(height: 4),
                  Text(
                    'Menzies Design desk',
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 24,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Planned span for the primary plate: title, status, and one clear action.',
                    style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: WashButton(
                  label: 'Open series',
                  size: WashButtonSize.sm,
                  onPressed: () {},
                ),
              ),
            ],
          ),
        ),
        WashBentoCell(
          columnSpan: 2,
          child: const _BentoStatsStrip(),
        ),
        WashBentoCell(
          child: _BentoIconCard(
            icon: 'paintbrush',
            title: 'Brushes',
            subtitle: '12 ready',
          ),
        ),
        WashBentoCell(
          child: _BentoIconCard(
            icon: 'layers',
            title: 'Layers',
            subtitle: 'Stack of 4',
          ),
        ),
        WashBentoCell(
          columnSpan: 2,
          child: Row(
            children: [
              WashLucideIcon('sparkles', size: 20, color: tokens.palette.accent),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Critique queue',
                      style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 16),
                    ),
                    Text(
                      'Three plates waiting. Wide span for a list cue.',
                      style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _BentoStatsStrip extends StatelessWidget {
  const _BentoStatsStrip();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: washInkBorderBox(tokens, fill: tokens.surface),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(child: _stat(context, 'Washes', '48', 'This week', 'droplets', tokens.primary)),
            Container(width: 1, color: tokens.inkBorder),
            Expanded(
              child: _stat(context, 'Drying', '6', 'In tray', 'clock', tokens.palette.secondary),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _stat(
    BuildContext context,
    String title,
    String value,
    String desc,
    String icon,
    Color iconColor,
  ) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashLucideIcon(icon, size: 20, color: iconColor),
          const SizedBox(height: 8),
          Text(title, style: WashTypography.label(tokens.inkMuted)),
          Text(
            value,
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(fontSize: 28),
          ),
          Text(desc, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12)),
        ],
      ),
    );
  }
}

class _BentoIconCard extends StatelessWidget {
  const _BentoIconCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  final String icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: washInkBorderBox(tokens, fill: tokens.surface),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashLucideIcon(icon, size: 16, color: tokens.onSurface.withValues(alpha: 0.7)),
            const SizedBox(height: 8),
            Text(title, style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 16)),
            Text(subtitle, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

/// Interactive bento tiles (section 04).
class WashBentoInteractiveDemo extends StatefulWidget {
  const WashBentoInteractiveDemo({super.key});

  @override
  State<WashBentoInteractiveDemo> createState() => _WashBentoInteractiveDemoState();
}

class _WashBentoInteractiveDemoState extends State<WashBentoInteractiveDemo> {
  String _active = 'hero';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final reduced = WashReducedMotion.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final md = constraints.maxWidth >= WashTailwindBreakpoints.md;
            final cols = md ? 3 : 1;
            final g = md ? 16.0 : 12.0;
            final rowH = 120.0;
            final tiles = _interactiveTiles(context);
            if (!md) {
              return Column(
                children: [
                  for (var i = 0; i < tiles.length; i++) ...[
                    if (i > 0) SizedBox(height: g),
                    _interactiveTileBody(
                      context,
                      tiles[i],
                      reduced: reduced,
                      selected: _active == tiles[i].id,
                      onTap: () => setState(() => _active = tiles[i].id),
                    ),
                  ],
                ],
              );
            }
            final w = constraints.maxWidth;
            final colW = (w - (cols - 1) * g) / cols;
            return SizedBox(
              height: rowH * 3 + g * 2,
              child: Stack(
                children: [
                  for (final t in tiles)
                    Positioned(
                      left: t.col * (colW + g),
                      top: t.row * (rowH + g),
                      width: t.colSpan * colW + (t.colSpan - 1) * g,
                      height: t.rowSpan * rowH + (t.rowSpan - 1) * g,
                      child: _interactiveTileBody(
                        context,
                        t,
                        reduced: reduced,
                        selected: _active == t.id,
                        onTap: () => setState(() => _active = t.id),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
        const SizedBox(height: 8),
        Text(
          'Selected: ${_titleFor(_active)}',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
        ),
      ],
    );
  }

  String _titleFor(String id) => _interactiveTiles(context).firstWhere((t) => t.id == id).title;

  List<_InteractiveTile> _interactiveTiles(BuildContext context) {
    return [
      _InteractiveTile(
        id: 'hero',
        title: 'Studio desk',
        body: 'Open washes, drying plates, and critique queue in one planned span.',
        icon: 'palette',
        tint: WashBentoPanelTint.blue,
        col: 0,
        row: 0,
        colSpan: 2,
        rowSpan: 2,
      ),
      _InteractiveTile(
        id: 'water',
        title: 'Water',
        body: '62% load',
        icon: 'droplets',
        col: 2,
        row: 0,
      ),
      _InteractiveTile(
        id: 'brush',
        title: 'Brush',
        body: 'Round 8',
        icon: 'paintbrush',
        tint: WashBentoPanelTint.ochre,
        col: 2,
        row: 1,
      ),
      _InteractiveTile(
        id: 'layers',
        title: 'Layer stack',
        body: 'Three wet layers. One dry glaze waiting.',
        icon: 'layers',
        tint: WashBentoPanelTint.rose,
        col: 0,
        row: 2,
        colSpan: 2,
      ),
    ];
  }

  Widget _interactiveTileBody(
    BuildContext context,
    _InteractiveTile t, {
    required bool reduced,
    required bool selected,
    required VoidCallback onTap,
  }) {
    final tokens = WashTokens.of(context);
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: reduced ? Duration.zero : const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          color: switch (t.tint) {
            WashBentoPanelTint.blue => const Color(0xFF4A7FA8).withValues(alpha: 0.14),
            WashBentoPanelTint.ochre => const Color(0xFFB87524).withValues(alpha: 0.14),
            WashBentoPanelTint.rose => const Color(0xFFC45C6E).withValues(alpha: 0.12),
            WashBentoPanelTint.none => tokens.surface,
          },
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? tokens.primary : tokens.inkBorder,
            width: selected ? 2 : 1,
          ),
          boxShadow: selected ? washPaperShadowSm(tokens) : null,
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    t.title,
                    style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18),
                  ),
                ),
                WashLucideIcon(t.icon, size: 16, color: tokens.onSurface.withValues(alpha: 0.7)),
              ],
            ),
            const SizedBox(height: 8),
            Text(t.body, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

class _InteractiveTile {
  _InteractiveTile({
    required this.id,
    required this.title,
    required this.body,
    required this.icon,
    this.tint = WashBentoPanelTint.none,
    this.col = 0,
    this.row = 0,
    this.colSpan = 1,
    this.rowSpan = 1,
  });

  final String id;
  final String title;
  final String body;
  final String icon;
  final WashBentoPanelTint tint;
  final int col;
  final int row;
  final int colSpan;
  final int rowSpan;
}
