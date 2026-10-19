import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/table/wash_table.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashTableGalleryPage extends StatelessWidget {
  const WashTableGalleryPage({super.key});

  static const _sizes = <(String, WashTableSize)>[
    ('XS', WashTableSize.xs),
    ('SM', WashTableSize.sm),
    ('MD', WashTableSize.md),
    ('LG', WashTableSize.lg),
    ('XL', WashTableSize.xl),
  ];

  static const _pinHeaders = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Tables',
      description: 'daisyUI table modifiers, sizes, and pin helpers.',
      sections: [
        _s(
          '01 · Default',
          'Base table',
          'Simple thead and tbody with the default surface',
          _sample('table', const _DefaultTable()),
          _defaultDart,
        ),
        _s(
          '02 · Zebra',
          'Striped rows',
          'Alternate row pigment with table-zebra',
          _sample('table table-zebra', const _ZebraTable()),
          _zebraDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Rich cells',
          'Checkboxes, avatars, badges',
          'Natural cell content: select, portrait, and role badge',
          _sample('table + checkbox + avatar + badge', const _RichTable()),
          _richDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '04 · Sizes',
          'xs through xl',
          'Density steps from compact ledgers to airy proofs',
          _sizesGrid(),
          _sizesDart,
        ),
        _s(
          '05 · Overflow',
          'Horizontal scroll wrapper',
          'overflow-x-auto keeps wide columns reachable on small screens',
          _sample('overflow-x-auto > table', const _OverflowTable()),
          _overflowDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '06 · Pin rows',
          'Sticky header and footer',
          'table-pin-rows keeps thead and tfoot visible while body scrolls',
          _sample('table table-pin-rows (h-72 overflow)', const _PinRowsTable()),
          _pinRowsDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '07 · Pin cols',
          'Pinned corners and columns',
          'Combine pin-rows and pin-cols in a bounded scroll pane',
          _sample(
            'table table-xs table-pin-rows table-pin-cols',
            const _PinColsTable(),
          ),
          _pinColsDart,
        ),
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

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        WashTableClassLabel(label),
      ],
    );
  }

  static Widget _sizesGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final two = constraints.maxWidth >= 720;
        final items = [
          for (final s in _sizes)
            _sample(
              'table table-${s.$1.toLowerCase()}',
              WashTable(
                size: s.$2,
                header: const [
                  WashTableCell.text('Size', heading: true),
                  WashTableCell.text('Wash', heading: true),
                  WashTableCell.text('Qty', heading: true),
                ],
                rows: [
                  WashTableRow(
                    cells: [
                      WashTableCell.text(s.$1),
                      const WashTableCell.text('Cerulean'),
                      const WashTableCell.text('4'),
                    ],
                  ),
                  WashTableRow(
                    cells: [
                      WashTableCell.text(s.$1),
                      const WashTableCell.text('Ochre'),
                      const WashTableCell.text('2'),
                    ],
                  ),
                ],
              ),
            ),
        ];
        if (!two) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < items.length; i++) ...[
                if (i > 0) const SizedBox(height: 24),
                items[i],
              ],
            ],
          );
        }
        return Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: items[0]),
                const SizedBox(width: 24),
                Expanded(child: items[1]),
              ],
            ),
            const SizedBox(height: 24),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: items[2]),
                const SizedBox(width: 24),
                Expanded(child: items[3]),
              ],
            ),
            const SizedBox(height: 24),
            Align(alignment: Alignment.centerLeft, child: items[4]),
          ],
        );
      },
    );
  }

  static const _defaultDart = '''
WashTable(
  header: [
    WashTableCell.text('', heading: true),
    WashTableCell.text('Name', heading: true),
    WashTableCell.text('Series', heading: true),
    WashTableCell.text('Plates', heading: true),
  ],
  rows: [
    WashTableRow(cells: [
      WashTableCell.text('1', heading: true),
      WashTableCell.text('Cerulean wash'),
      WashTableCell.text('Coastal'),
      WashTableCell.text('12'),
    ]),
  ],
)
''';

  static const _zebraDart = '''
WashTable(
  zebra: true,
  header: [
    WashTableCell.text('', heading: true),
    WashTableCell.text('Pigment', heading: true),
    WashTableCell.text('Wash', heading: true),
    WashTableCell.text('Status', heading: true),
  ],
  rows: [
    WashTableRow(cells: [
      WashTableCell.text('1', heading: true),
      WashTableCell.text("Payne's gray"),
      WashTableCell.text('Mist'),
      WashTableCell.text('Ready'),
    ]),
  ],
)
''';

  static const _richDart = '''
WashTable(
  header: [
    WashTableCell(child: WashTableCheckbox(...), heading: true),
    WashTableCell.text('Name', heading: true),
    WashTableCell.text('Role', heading: true),
    WashTableCell.text('Favorite', heading: true),
  ],
  rows: [
    WashTableRow(cells: [
      WashTableCell(child: WashTableCheckbox(...), heading: true),
      WashTableCell(child: Row(children: [WashAvatar.initials('MK'), name])),
      WashTableCell(child: WashBadge('Studio lead', style: WashBadgeStyle.ghost, size: WashBadgeSize.sm)),
      WashTableCell(child: WashTableCheckbox(primary: true, value: true, ...)),
    ]),
  ],
)
''';

  static const _sizesDart = '''
WashTable(
  size: WashTableSize.xs,
  header: [
    WashTableCell.text('Size', heading: true),
    WashTableCell.text('Wash', heading: true),
    WashTableCell.text('Qty', heading: true),
  ],
  rows: [
    WashTableRow(cells: [
      WashTableCell.text('XS'),
      WashTableCell.text('Cerulean'),
      WashTableCell.text('4'),
    ]),
  ],
)
''';

  static const _overflowDart = '''
WashTable(
  framed: true,
  header: [
    WashTableCell.text('Plate', heading: true),
    WashTableCell.text('Pigment A', heading: true),
    WashTableCell.text('Pigment B', heading: true),
    WashTableCell.text('Pigment C', heading: true),
    WashTableCell.text('Paper', heading: true),
    WashTableCell.text('Brush', heading: true),
    WashTableCell.text('Notes', heading: true),
    WashTableCell.text('Shelf', heading: true),
  ],
  rows: [
    WashTableRow(cells: [
      WashTableCell.text('Harbor dawn'),
      WashTableCell.text('Cerulean'),
      WashTableCell.text("Payne's gray"),
      WashTableCell.text('Titanium'),
      WashTableCell.text('Cold press'),
      WashTableCell.text('Round 8'),
      WashTableCell.text('Soft sky band'),
      WashTableCell.text('A-12'),
    ]),
  ],
)
''';

  static const _pinRowsDart = '''
WashTable(
  pinRows: true,
  maxHeight: 288,
  background: tokens.surfaceContainer,
  header: [
    WashTableCell.text('Year', heading: true),
    WashTableCell.text('Series', heading: true),
    WashTableCell.text('Plates', heading: true),
  ],
  rows: [
    for (var i = 0; i < 18; i++)
      WashTableRow(cells: [
        WashTableCell.text('\${2010 + i}'),
        WashTableCell.text('Menzies Design archive \${i + 1}'),
        WashTableCell.text('\${(i + 3) * 4}'),
      ]),
  ],
  footer: [
    WashTableCell.text('Year', heading: true),
    WashTableCell.text('Series', heading: true),
    WashTableCell.text('Plates', heading: true),
  ],
)
''';

  static const _pinColsDart = '''
WashTable(
  size: WashTableSize.xs,
  pinRows: true,
  pinCols: true,
  maxHeight: 288,
  maxWidth: 448,
  header: [
    WashTableCell.text('', heading: true),
    for (final h in ['A', 'B', '...', 'L']) WashTableCell.text(h),
  ],
  rows: [
    for (var r = 0; r < 12; r++)
      WashTableRow(cells: [
        WashTableCell.text('\${r + 1}', heading: true),
        for (final h in headers) WashTableCell.text('\$h\${r + 1}'),
      ]),
  ],
)
''';
}

class _DefaultTable extends StatelessWidget {
  const _DefaultTable();

  @override
  Widget build(BuildContext context) {
    return WashTable(
      header: const [
        WashTableCell.text('', heading: true),
        WashTableCell.text('Name', heading: true),
        WashTableCell.text('Series', heading: true),
        WashTableCell.text('Plates', heading: true),
      ],
      rows: const [
        WashTableRow(
          cells: [
            WashTableCell.text('1', heading: true),
            WashTableCell.text('Cerulean wash'),
            WashTableCell.text('Coastal'),
            WashTableCell.text('12'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('2', heading: true),
            WashTableCell.text('Ochre glaze'),
            WashTableCell.text('Warm earth'),
            WashTableCell.text('8'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('3', heading: true),
            WashTableCell.text('Rose bloom'),
            WashTableCell.text('Florals'),
            WashTableCell.text('15'),
          ],
        ),
      ],
    );
  }
}

class _ZebraTable extends StatelessWidget {
  const _ZebraTable();

  @override
  Widget build(BuildContext context) {
    return WashTable(
      zebra: true,
      header: const [
        WashTableCell.text('', heading: true),
        WashTableCell.text('Pigment', heading: true),
        WashTableCell.text('Wash', heading: true),
        WashTableCell.text('Status', heading: true),
      ],
      rows: const [
        WashTableRow(
          cells: [
            WashTableCell.text('1', heading: true),
            WashTableCell.text("Payne's gray"),
            WashTableCell.text('Mist'),
            WashTableCell.text('Ready'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('2', heading: true),
            WashTableCell.text('Raw sienna'),
            WashTableCell.text('Dry brush'),
            WashTableCell.text('Drying'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('3', heading: true),
            WashTableCell.text('Ultramarine'),
            WashTableCell.text('Wet-on-wet'),
            WashTableCell.text('Ready'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('4', heading: true),
            WashTableCell.text('Alizarin'),
            WashTableCell.text('Glaze'),
            WashTableCell.text('Queued'),
          ],
        ),
      ],
    );
  }
}

class _RichTable extends StatefulWidget {
  const _RichTable();

  @override
  State<_RichTable> createState() => _RichTableState();
}

class _RichRow {
  _RichRow({
    required this.name,
    required this.role,
    required this.job,
    required this.initials,
    required this.color,
    required this.favorite,
  });

  final String name;
  final String role;
  final String job;
  final String initials;
  final Color color;
  bool selected = false;
  bool favorite;
}

class _RichTableState extends State<_RichTable> {
  List<_RichRow>? _rows;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_rows != null) return;
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    _rows = [
      _RichRow(
        name: 'Mira K.',
        role: 'Lead wash',
        job: 'Studio lead',
        initials: 'MK',
        color: const Color(0xFF4A7FA8),
        favorite: true,
      ),
      _RichRow(
        name: 'Jon L.',
        role: 'Plate cutter',
        job: 'Prep bench',
        initials: 'JL',
        color: atmo.washB,
        favorite: false,
      ),
      _RichRow(
        name: 'Ada R.',
        role: 'Pigment tech',
        job: 'Mix desk',
        initials: 'AR',
        color: atmo.washC,
        favorite: true,
      ),
    ];
  }

  bool get _allSelected => _rows!.every((r) => r.selected);

  @override
  Widget build(BuildContext context) {
    final rows = _rows!;
    return WashTable(
      header: [
        WashTableCell(
          heading: true,
          child: WashTableCheckbox(
            value: _allSelected,
            semanticLabel: 'Select all',
            onChanged: (v) => setState(() {
              for (final r in rows) {
                r.selected = v;
              }
            }),
          ),
        ),
        const WashTableCell.text('Name', heading: true),
        const WashTableCell.text('Role', heading: true),
        const WashTableCell.text('Favorite', heading: true),
      ],
      rows: [
        for (final row in rows)
          WashTableRow(
            cells: [
              WashTableCell(
                heading: true,
                child: WashTableCheckbox(
                  value: row.selected,
                  semanticLabel: 'Select ${row.name}',
                  onChanged: (v) => setState(() => row.selected = v),
                ),
              ),
              WashTableCell(child: _NameCell(row: row)),
              WashTableCell(
                child: WashBadge(
                  row.job,
                  style: WashBadgeStyle.ghost,
                  size: WashBadgeSize.sm,
                ),
              ),
              WashTableCell(
                child: WashTableCheckbox(
                  value: row.favorite,
                  primary: true,
                  semanticLabel: '${row.name} favorite',
                  onChanged: (v) => setState(() => row.favorite = v),
                ),
              ),
            ],
          ),
      ],
      footer: const [
        WashTableCell.text('', heading: true),
        WashTableCell.text('Name', heading: true),
        WashTableCell.text('Role', heading: true),
        WashTableCell.text('Favorite', heading: true),
      ],
    );
  }
}

class _NameCell extends StatelessWidget {
  const _NameCell({required this.row});

  final _RichRow row;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: row.color,
            shape: BoxShape.circle,
          ),
          child: Text(
            row.initials,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: tokens.onSurface,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                row.name,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: tokens.onSurface,
                ),
              ),
              Text(
                row.role,
                style: TextStyle(
                  fontSize: 12,
                  color: tokens.inkMuted.withValues(alpha: 0.7),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _OverflowTable extends StatelessWidget {
  const _OverflowTable();

  @override
  Widget build(BuildContext context) {
    return const WashTable(
      framed: true,
      header: [
        WashTableCell.text('Plate', heading: true),
        WashTableCell.text('Pigment A', heading: true),
        WashTableCell.text('Pigment B', heading: true),
        WashTableCell.text('Pigment C', heading: true),
        WashTableCell.text('Paper', heading: true),
        WashTableCell.text('Brush', heading: true),
        WashTableCell.text('Notes', heading: true),
        WashTableCell.text('Shelf', heading: true),
      ],
      rows: [
        WashTableRow(
          cells: [
            WashTableCell.text('Harbor dawn'),
            WashTableCell.text('Cerulean'),
            WashTableCell.text("Payne's gray"),
            WashTableCell.text('Titanium'),
            WashTableCell.text('Cold press'),
            WashTableCell.text('Round 8'),
            WashTableCell.text('Soft sky band'),
            WashTableCell.text('A-12'),
          ],
        ),
        WashTableRow(
          cells: [
            WashTableCell.text('Cliff warm'),
            WashTableCell.text('Raw sienna'),
            WashTableCell.text('Burnt umber'),
            WashTableCell.text('Yellow ochre'),
            WashTableCell.text('Hot press'),
            WashTableCell.text('Flat 1/2"'),
            WashTableCell.text('Dry edge'),
            WashTableCell.text('B-03'),
          ],
        ),
      ],
    );
  }
}

class _PinRowsTable extends StatelessWidget {
  const _PinRowsTable();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashTable(
      pinRows: true,
      maxHeight: 288,
      background: tokens.surfaceContainer,
      header: const [
        WashTableCell.text('Year', heading: true),
        WashTableCell.text('Series', heading: true),
        WashTableCell.text('Plates', heading: true),
      ],
      rows: [
        for (var i = 0; i < 18; i++)
          WashTableRow(
            cells: [
              WashTableCell.text('${2010 + i}'),
              WashTableCell.text('Menzies Design archive ${i + 1}'),
              WashTableCell.text('${(i + 3) * 4}'),
            ],
          ),
      ],
      footer: const [
        WashTableCell.text('Year', heading: true),
        WashTableCell.text('Series', heading: true),
        WashTableCell.text('Plates', heading: true),
      ],
    );
  }
}

class _PinColsTable extends StatelessWidget {
  const _PinColsTable();

  @override
  Widget build(BuildContext context) {
    return WashTable(
      size: WashTableSize.xs,
      pinRows: true,
      pinCols: true,
      maxHeight: 288,
      maxWidth: 448,
      header: [
        const WashTableCell.text('', heading: true),
        for (final h in WashTableGalleryPage._pinHeaders) WashTableCell.text(h),
      ],
      rows: [
        for (var r = 0; r < 12; r++)
          WashTableRow(
            cells: [
              WashTableCell.text('${r + 1}', heading: true),
              for (final h in WashTableGalleryPage._pinHeaders)
                WashTableCell.text('$h${r + 1}'),
            ],
          ),
      ],
      footer: [
        const WashTableCell.text('', heading: true),
        for (final h in WashTableGalleryPage._pinHeaders) WashTableCell.text(h),
      ],
    );
  }
}
