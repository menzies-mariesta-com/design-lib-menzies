
import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/join/wash_join.dart';
import '../../components/pagination/wash_pagination.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashPaginationGalleryPage extends StatelessWidget {
  const WashPaginationGalleryPage({super.key});

  static const _sizes = <(String, WashButtonSize)>[
    ('XS', WashButtonSize.xs),
    ('SM', WashButtonSize.sm),
    ('MD', WashButtonSize.md),
    ('LG', WashButtonSize.lg),
    ('XL', WashButtonSize.xl),
  ];

  static const _plateItems = <String>[
    'Cerulean wash study',
    'Ochre cliff notes',
    'Rose petal glaze',
    'Fog bank mist',
    'Indigo night sky',
    'Salt bloom trial',
    'Cedar bark texture',
    'Harbor dawn plate',
    'Winter lake edge',
    'Paper tooth check',
    'Ultramarine depth',
    'Warm earth lift',
  ];

  static const _ledgerSeries = <(String, int, String)>[
    ('Harbor dawn', 12, 'Active'),
    ('Fog bank', 8, 'Draft'),
    ('Ochre cliff', 15, 'Active'),
    ('Rose bloom', 6, 'Archived'),
    ('Indigo night', 11, 'Active'),
    ('Salt bloom', 4, 'Draft'),
    ('Cedar bark', 9, 'Active'),
    ('Winter lake', 7, 'Archived'),
    ('Paper tooth', 3, 'Draft'),
    ('Ultramarine', 14, 'Active'),
    ('Warm earth', 10, 'Active'),
    ('Mist bank', 5, 'Draft'),
    ('Coastal glaze', 13, 'Active'),
    ('Petal wash', 8, 'Archived'),
    ('Studio light', 2, 'Draft'),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Pagination',
      description:
          'daisyUI join pagination via join button groups: numbered pages, prev/next, sizes, and ledger.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Numbered join',
          description: 'Group page buttons with join and join-item',
          child: _tabColumn([
            WashShowcaseTabs(
              preview: WashPagination(
                page: 2,
                totalPages: 4,
                edge: WashPaginationEdge.none,
                onChanged: (_) {},
              ),
              dartSource: _basicNumbersDart,
            ),
            WashShowcaseTabs(
              preview: const _BasicRadioDemo(),
              dartSource: _basicRadioDart,
            ),
          ]),
        ),
        WashGallerySection(
          eyebrow: '02 · Prev / next',
          title: 'Chevrons and labels',
          description: 'Icon-only controls need matching tooltips, aria-labels',
          tint: WashGalleryPanelTint.ochre,
          child: _tabColumn([
            WashShowcaseTabs(
              preview: FittedBox(
                fit: BoxFit.scaleDown,
                child: WashJoin(
                  children: [
                    WashTooltip(
                      message: 'Previous',
                      child: WashButton(
                        joinItem: true,
                        onPressed: () {},
                        child: const WashLucideIcon('chevron-left', size: 16),
                      ),
                    ),
                    WashButton(
                      label: '2',
                      joinItem: true,
                      active: true,
                      onPressed: () {},
                    ),
                    WashTooltip(
                      message: 'Next',
                      child: WashButton(
                        joinItem: true,
                        onPressed: () {},
                        child: const WashLucideIcon('chevron-right', size: 16),
                      ),
                    ),
                  ],
                ),
              ),
              dartSource: _chevronsDart,
            ),
            WashShowcaseTabs(
              preview: FittedBox(
                fit: BoxFit.scaleDown,
                child: WashJoin(
                  children: [
                    WashButton(
                      label: '«',
                      joinItem: true,
                      onPressed: () {},
                    ),
                    WashButton(
                      label: 'Page 22',
                      joinItem: true,
                      onPressed: () {},
                    ),
                    WashButton(
                      label: '»',
                      joinItem: true,
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
              dartSource: _pageLabelDart,
            ),
            WashShowcaseTabs(
              preview: WashPaginationOutlinePair(
                page: 2,
                totalPages: 5,
                onChanged: (_) {},
              ),
              dartSource: _outlinePairDart,
            ),
          ]),
        ),
        WashGallerySection(
          eyebrow: '03 · States',
          title: 'Active and disabled',
          description: 'btn-active for the current page',
          tint: WashGalleryPanelTint.rose,
          child: _tabColumn([
            WashShowcaseTabs(
              preview: WashPagination(
                page: 2,
                totalPages: 3,
                edge: WashPaginationEdge.none,
                onChanged: (_) {},
              ),
              dartSource: _activeDart,
            ),
            WashShowcaseTabs(
              preview: WashPagination(
                page: 1,
                totalPages: 100,
                edge: WashPaginationEdge.none,
                showEllipsis: true,
                onChanged: (_) {},
              ),
              dartSource: _ellipsisDart,
            ),
            WashShowcaseTabs(
              preview: WashPagination(
                page: 1,
                totalPages: 2,
                onChanged: (_) {},
              ),
              dartSource: _disabledPrevDart,
            ),
          ]),
        ),
        WashGallerySection(
          eyebrow: '04 · Sizes',
          title: 'Button size variants',
          description:
              'Match btn-xs through btn-xl on every join-item in the group',
          child: _tabColumn([
            for (final s in _sizes)
              WashShowcaseTabs(
                preview: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: WashPagination(
                    page: 2,
                    totalPages: 4,
                    size: s.$2,
                    edge: WashPaginationEdge.none,
                    onChanged: (_) {},
                  ),
                ),
                dartSource:
                    'WashPagination(size: WashButtonSize.${s.$2.name}, …)',
              ),
          ]),
        ),
        WashGallerySection(
          eyebrow: '05 · Interactive',
          title: 'Live plate list',
          description: 'Page state drives a short item list',
          tint: WashGalleryPanelTint.blue,
          child: const WashShowcaseTabs(
            preview: _InteractiveListDemo(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio ledger',
          title: 'Series paginator',
          description: 'CRUD-style join paginator under a zebra table',
          tint: WashGalleryPanelTint.ochre,
          child: const WashShowcaseTabs(
            preview: _StudioLedgerDemo(),
            dartSource: _ledgerDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Responsive',
          title: 'Compact on mobile',
          description: 'Show a short Page N control on small screens',
          child: const _CompactResponsiveDemo(),
        ),
      ],
    );
  }

  static Widget _tabColumn(List<Widget> tabs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < tabs.length; i++) ...[
          if (i > 0) const SizedBox(height: 20),
          tabs[i],
        ],
      ],
    );
  }

  static const _basicNumbersDart =
      'WashPagination(page: 2, totalPages: 4, edge: WashPaginationEdge.none, …)';
  static const _basicRadioDart =
      'WashPaginationRadios(page: 1, totalPages: 4, …)';
  static const _chevronsDart =
      'WashJoin + WashTooltip + WashLucideIcon(chevron-left/right)';
  static const _pageLabelDart = 'WashJoin(children: [«, Page 22, »])';
  static const _outlinePairDart =
      'WashPaginationOutlinePair(prevLabel: Previous page, nextLabel: Next)';
  static const _activeDart =
      'WashPagination(page: 2, totalPages: 3, edge: none)';
  static const _ellipsisDart =
      'WashPagination(showEllipsis: true, totalPages: 100)';
  static const _disabledPrevDart =
      'WashPagination(page: 1, totalPages: 2) // prev disabled';
  static const _interactiveDart = 'WashPagination(size: sm) + plate list slice';
  static const _ledgerDart = 'zebra table + WashPagination footer';
}

class _BasicRadioDemo extends StatefulWidget {
  const _BasicRadioDemo();

  @override
  State<_BasicRadioDemo> createState() => _BasicRadioDemoState();
}

class _BasicRadioDemoState extends State<_BasicRadioDemo> {
  var _page = 1;

  @override
  Widget build(BuildContext context) {
    return WashPaginationRadios(
      page: _page,
      totalPages: 4,
      onChanged: (p) => setState(() => _page = p),
    );
  }
}

class _InteractiveListDemo extends StatefulWidget {
  const _InteractiveListDemo();

  @override
  State<_InteractiveListDemo> createState() => _InteractiveListDemoState();
}

class _InteractiveListDemoState extends State<_InteractiveListDemo> {
  static const _pageSize = 4;
  var _page = 1;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final items = WashPaginationGalleryPage._plateItems;
    final totalPages = (items.length / _pageSize).ceil();
    final safe = _page.clamp(1, totalPages);
    final slice = items.sublist(
      (safe - 1) * _pageSize,
      (safe * _pageSize).clamp(0, items.length),
    );
    final from = (safe - 1) * _pageSize + 1;
    final to = (safe * _pageSize).clamp(0, items.length);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        DecoratedBox(
          decoration: BoxDecoration(
            color: tokens.palette.base100,
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
          ),
          child: Column(
            children: [
              for (var i = 0; i < slice.length; i++) ...[
                if (i > 0)
                  ColoredBox(
                    color: tokens.inkBorder.withValues(alpha: 0.6),
                    child: const SizedBox(height: 1, width: double.infinity),
                  ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Row(
                    children: [
                      SizedBox(
                        width: 24,
                        child: Text(
                          '${from + i}',
                          style: WashTypography.label(tokens.inkMuted).copyWith(
                            fontFeatures: const [FontFeature.tabularFigures()],
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          slice[i],
                          style: WashTypography.body(tokens.onSurface)
                              .copyWith(fontSize: 14),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 16),
        Wrap(
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 12,
          runSpacing: 12,
          children: [
            Text(
              'Showing $from-$to of ${items.length}',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            ),
            WashPagination(
              page: safe,
              totalPages: totalPages,
              size: WashButtonSize.sm,
              onChanged: (p) => setState(() => _page = p),
            ),
          ],
        ),
      ],
    );
  }
}

class _StudioLedgerDemo extends StatefulWidget {
  const _StudioLedgerDemo();

  @override
  State<_StudioLedgerDemo> createState() => _StudioLedgerDemoState();
}

class _StudioLedgerDemoState extends State<_StudioLedgerDemo> {
  static const _pageSize = 5;
  var _page = 1;

  WashBadgeTone _tone(String status) {
    return switch (status) {
      'Active' => WashBadgeTone.success,
      'Draft' => WashBadgeTone.warning,
      _ => WashBadgeTone.defaultTone,
    };
  }

  WashBadgeStyle _style(String status) {
    return status == 'Archived' ? WashBadgeStyle.ghost : WashBadgeStyle.solid;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final rows = WashPaginationGalleryPage._ledgerSeries;
    final totalPages = (rows.length / _pageSize).ceil();
    final safe = _page.clamp(1, totalPages);
    final slice = rows.sublist(
      (safe - 1) * _pageSize,
      (safe * _pageSize).clamp(0, rows.length),
    );
    final from = (safe - 1) * _pageSize + 1;
    final to = (safe * _pageSize).clamp(0, rows.length);

    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: SizedBox(
              width: 560,
              child: Column(
                children: [
                  _LedgerHeader(tokens: tokens),
                  for (var i = 0; i < slice.length; i++)
                    _LedgerRow(
                      tokens: tokens,
                      no: from + i,
                      name: slice[i].$1,
                      plates: slice[i].$2,
                      status: slice[i].$3,
                      zebra: i.isOdd,
                      badgeTone: _tone(slice[i].$3),
                      badgeStyle: _style(slice[i].$3),
                    ),
                ],
              ),
            ),
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(color: tokens.palette.base300),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Wrap(
                alignment: WrapAlignment.spaceBetween,
                crossAxisAlignment: WrapCrossAlignment.center,
                spacing: 8,
                runSpacing: 8,
                children: [
                  Text(
                    'Showing $from-$to of ${rows.length}',
                    style: WashTypography.body(tokens.inkMuted)
                        .copyWith(fontSize: 12),
                  ),
                  WashPagination(
                    page: safe,
                    totalPages: totalPages,
                    size: WashButtonSize.sm,
                    onChanged: (p) => setState(() => _page = p),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _LedgerHeader extends StatelessWidget {
  const _LedgerHeader({required this.tokens});

  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final style = WashTypography.label(tokens.inkMuted).copyWith(
      fontWeight: FontWeight.w600,
      fontSize: 12,
    );
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.5)),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            SizedBox(width: 48, child: Text('No', style: style)),
            SizedBox(width: 200, child: Text('Series', style: style)),
            SizedBox(width: 64, child: Text('Plates', style: style)),
            SizedBox(width: 120, child: Text('Status', style: style)),
          ],
        ),
      ),
    );
  }
}

class _LedgerRow extends StatelessWidget {
  const _LedgerRow({
    required this.tokens,
    required this.no,
    required this.name,
    required this.plates,
    required this.status,
    required this.zebra,
    required this.badgeTone,
    required this.badgeStyle,
  });

  final WashTokens tokens;
  final int no;
  final String name;
  final int plates;
  final String status;
  final bool zebra;
  final WashBadgeTone badgeTone;
  final WashBadgeStyle badgeStyle;

  @override
  Widget build(BuildContext context) {
    final body = WashTypography.body(tokens.onSurface).copyWith(fontSize: 13);
    return ColoredBox(
      color: zebra
          ? tokens.palette.base200.withValues(alpha: 0.55)
          : tokens.palette.base100,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            SizedBox(
              width: 48,
              child: Text(
                '$no',
                style: body.copyWith(
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
            SizedBox(width: 200, child: Text(name, style: body)),
            SizedBox(
              width: 64,
              child: Text(
                '$plates',
                style: body.copyWith(
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
            SizedBox(
              width: 120,
              child: Align(
                alignment: Alignment.centerLeft,
                child: WashBadge(
                  status,
                  size: WashBadgeSize.sm,
                  tone: badgeTone,
                  style: badgeStyle,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CompactResponsiveDemo extends StatefulWidget {
  const _CompactResponsiveDemo();

  @override
  State<_CompactResponsiveDemo> createState() => _CompactResponsiveDemoState();
}

class _CompactResponsiveDemoState extends State<_CompactResponsiveDemo> {
  var _page = 2;
  static const _total = 8;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashShowcaseTabs(
          preview: LayoutBuilder(
            builder: (context, constraints) {
              final narrow = constraints.maxWidth < 640;
              if (narrow) {
                return WashPaginationCompact(
                  page: _page,
                  totalPages: _total,
                  size: WashButtonSize.sm,
                  onChanged: (p) => setState(() => _page = p),
                );
              }
              return WashPagination(
                page: _page,
                totalPages: _total,
                size: WashButtonSize.sm,
                wrap: true,
                onChanged: (p) => setState(() => _page = p),
              );
            },
          ),
          dartSource:
              'narrow: WashPaginationCompact / wide: WashPagination(wrap: true)',
        ),
        const SizedBox(height: 20),
        WashShowcaseTabs(
          preview: WashPaginationOutlinePair(
            page: _page,
            totalPages: _total,
            onChanged: (p) => setState(() => _page = p),
          ),
          dartSource: 'WashPaginationOutlinePair(…)',
        ),
      ],
    );
  }
}
