import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `table-xs` through `table-xl`.
enum WashTableSize { xs, sm, md, lg, xl }

class _WashTableMetrics {
  const _WashTableMetrics({
    required this.paddingX,
    required this.paddingY,
    required this.fontSize,
    required this.minHeight,
  });

  final double paddingX;
  final double paddingY;
  final double fontSize;
  final double minHeight;
}

const _kWashTableMetrics = <WashTableSize, _WashTableMetrics>{
  WashTableSize.xs: _WashTableMetrics(
    paddingX: 8,
    paddingY: 4,
    fontSize: 12,
    minHeight: 24,
  ),
  WashTableSize.sm: _WashTableMetrics(
    paddingX: 12,
    paddingY: 8,
    fontSize: 14,
    minHeight: 36,
  ),
  WashTableSize.md: _WashTableMetrics(
    paddingX: kWashTableRowPaddingX + 4,
    paddingY: 12,
    fontSize: 14,
    minHeight: kWashTableRowMinHeight,
  ),
  WashTableSize.lg: _WashTableMetrics(
    paddingX: 20,
    paddingY: 16,
    fontSize: 16,
    minHeight: 56,
  ),
  WashTableSize.xl: _WashTableMetrics(
    paddingX: 24,
    paddingY: 20,
    fontSize: 18,
    minHeight: 64,
  ),
};

_WashTableMetrics _washTableMetricsFor(WashTableSize size) =>
    _kWashTableMetrics[size]!;

String washTableClassLabel({
  WashTableSize size = WashTableSize.md,
  bool zebra = false,
  bool pinRows = false,
  bool pinCols = false,
  bool framed = false,
}) {
  final parts = <String>['table'];
  if (size != WashTableSize.md) {
    parts.add(switch (size) {
      WashTableSize.xs => 'table-xs',
      WashTableSize.sm => 'table-sm',
      WashTableSize.md => 'table-md',
      WashTableSize.lg => 'table-lg',
      WashTableSize.xl => 'table-xl',
    });
  }
  if (zebra) parts.add('table-zebra');
  if (pinRows) parts.add('table-pin-rows');
  if (pinCols) parts.add('table-pin-cols');
  if (framed) return 'overflow-x-auto > table';
  return parts.join(' ');
}

/// Monospace class hint for the Table gallery.
class WashTableClassLabel extends StatelessWidget {
  const WashTableClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'table' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// One header, body, or footer cell.
class WashTableCell {
  const WashTableCell({
    required Widget this.child,
    this.heading = false,
  }) : text = null;

  const WashTableCell.text(
    String this.text, {
    this.heading = false,
  }) : child = null;

  final Widget? child;
  final String? text;
  final bool heading;
}

/// One body row.
class WashTableRow {
  const WashTableRow({required this.cells});

  final List<WashTableCell> cells;
}

/// Compact daisyUI `checkbox checkbox-sm` for table cells.
class WashTableCheckbox extends StatelessWidget {
  const WashTableCheckbox({
    required this.value,
    required this.onChanged,
    this.semanticLabel,
    this.primary = false,
    super.key,
  });

  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? semanticLabel;
  final bool primary;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final enabled = onChanged != null;
    final fill = primary ? tokens.primary : tokens.onSurface;
    final border = value ? fill : tokens.onSurface.withValues(alpha: 0.35);

    return Semantics(
      label: semanticLabel,
      checked: value,
      enabled: enabled,
      child: MouseRegion(
        cursor: enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
        child: GestureDetector(
          onTap: enabled ? () => onChanged!(!value) : null,
          child: Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: value ? fill : const Color(0x00000000),
              borderRadius: BorderRadius.circular(tokens.radiusField * 0.35),
              border: Border.all(color: border, width: 1.5),
            ),
            child: value
                ? WashIcon(WashIconGlyph.check,
                    size: 14, color: tokens.onPrimary)
                : null,
          ),
        ),
      ),
    );
  }
}

/// daisyUI `table` with zebra, sizes, overflow, and pin-rows / pin-cols.
class WashTable extends StatefulWidget {
  const WashTable({
    required this.rows,
    this.header,
    this.footer,
    this.size = WashTableSize.md,
    this.zebra = false,
    this.pinRows = false,
    this.pinCols = false,
    this.hover = true,
    this.framed = false,
    this.overflowX = true,
    this.background,
    this.maxHeight,
    this.maxWidth,
    super.key,
  });

  final List<WashTableCell>? header;
  final List<WashTableRow> rows;
  final List<WashTableCell>? footer;
  final WashTableSize size;
  final bool zebra;
  final bool pinRows;
  final bool pinCols;
  final bool hover;
  final bool framed;
  final bool overflowX;
  final Color? background;
  final double? maxHeight;
  final double? maxWidth;

  @override
  State<WashTable> createState() => _WashTableState();
}

class _WashTableState extends State<WashTable> {
  final _hHeader = ScrollController();
  final _hBody = ScrollController();
  final _hFooter = ScrollController();
  final _vLeft = ScrollController();
  final _vMid = ScrollController();
  final _vRight = ScrollController();
  bool _syncing = false;

  @override
  void initState() {
    super.initState();
    _link(_hHeader, [_hBody, _hFooter]);
    _link(_hBody, [_hHeader, _hFooter]);
    _link(_hFooter, [_hHeader, _hBody]);
    _link(_vLeft, [_vMid, _vRight]);
    _link(_vMid, [_vLeft, _vRight]);
    _link(_vRight, [_vLeft, _vMid]);
  }

  void _link(ScrollController source, List<ScrollController> others) {
    source.addListener(() {
      if (_syncing || !source.hasClients) return;
      _syncing = true;
      final offset = source.offset;
      for (final other in others) {
        if (!other.hasClients) continue;
        final max = other.position.maxScrollExtent;
        final next = offset.clamp(0.0, max);
        if ((other.offset - next).abs() > 0.5) {
          other.jumpTo(next);
        }
      }
      _syncing = false;
    });
  }

  @override
  void dispose() {
    _hHeader.dispose();
    _hBody.dispose();
    _hFooter.dispose();
    _vLeft.dispose();
    _vMid.dispose();
    _vRight.dispose();
    super.dispose();
  }

  int get _colCount {
    if (widget.header != null) return widget.header!.length;
    if (widget.rows.isNotEmpty) return widget.rows.first.cells.length;
    if (widget.footer != null) return widget.footer!.length;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _washTableMetricsFor(widget.size);
    final cols = _colCount;
    if (cols == 0) return const SizedBox.shrink();

    final tableBg = widget.background ?? tokens.surface;
    final grid = _allRows();

    Widget table = _MeasuredTable(
      tokens: tokens,
      metrics: metrics,
      rows: grid,
      zebra: widget.zebra,
      hover: widget.hover,
      pinRows: widget.pinRows,
      pinCols: widget.pinCols,
      tableBackground: tableBg,
      maxHeight: widget.maxHeight ?? (widget.pinRows ? 288 : null),
      maxWidth: widget.maxWidth,
      overflowX: widget.overflowX,
      hHeader: _hHeader,
      hBody: _hBody,
      hFooter: _hFooter,
      vLeft: _vLeft,
      vMid: _vMid,
      vRight: _vRight,
    );

    if (widget.maxWidth != null) {
      table = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: widget.maxWidth!),
        child: table,
      );
    }

    if (widget.framed) {
      table = DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(
            color: tokens.onSurface.withValues(alpha: 0.05),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          child: table,
        ),
      );
    }

    return table;
  }

  List<_GridRow> _allRows() {
    final out = <_GridRow>[];
    if (widget.header != null) {
      out.add(_GridRow(cells: widget.header!, kind: _GridRowKind.header));
    }
    for (var i = 0; i < widget.rows.length; i++) {
      out.add(_GridRow(
          cells: widget.rows[i].cells, kind: _GridRowKind.body, bodyIndex: i));
    }
    if (widget.footer != null) {
      out.add(_GridRow(cells: widget.footer!, kind: _GridRowKind.footer));
    }
    return out;
  }
}

enum _GridRowKind { header, body, footer }

class _GridRow {
  const _GridRow({
    required this.cells,
    required this.kind,
    this.bodyIndex = 0,
  });

  final List<WashTableCell> cells;
  final _GridRowKind kind;
  final int bodyIndex;
}

class _MeasuredTable extends StatefulWidget {
  const _MeasuredTable({
    required this.tokens,
    required this.metrics,
    required this.rows,
    required this.zebra,
    required this.hover,
    required this.pinRows,
    required this.pinCols,
    required this.tableBackground,
    required this.maxHeight,
    required this.maxWidth,
    required this.overflowX,
    required this.hHeader,
    required this.hBody,
    required this.hFooter,
    required this.vLeft,
    required this.vMid,
    required this.vRight,
  });

  final WashTokens tokens;
  final _WashTableMetrics metrics;
  final List<_GridRow> rows;
  final bool zebra;
  final bool hover;
  final bool pinRows;
  final bool pinCols;
  final Color tableBackground;
  final double? maxHeight;
  final double? maxWidth;
  final bool overflowX;
  final ScrollController hHeader;
  final ScrollController hBody;
  final ScrollController hFooter;
  final ScrollController vLeft;
  final ScrollController vMid;
  final ScrollController vRight;

  @override
  State<_MeasuredTable> createState() => _MeasuredTableState();
}

class _MeasuredTableState extends State<_MeasuredTable> {
  List<double>? _widths;
  List<GlobalKey>? _colKeys;

  @override
  void initState() {
    super.initState();
    _colKeys =
        List.generate(widget.rows.first.cells.length, (_) => GlobalKey());
    WidgetsBinding.instance.addPostFrameCallback((_) => _capture());
  }

  @override
  void didUpdateWidget(covariant _MeasuredTable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.rows.first.cells.length != widget.rows.first.cells.length ||
        oldWidget.sizeChanged(widget)) {
      _colKeys =
          List.generate(widget.rows.first.cells.length, (_) => GlobalKey());
      _widths = null;
      WidgetsBinding.instance.addPostFrameCallback((_) => _capture());
    }
  }

  void _capture() {
    if (!mounted || _colKeys == null) return;
    final widths = <double>[];
    for (final key in _colKeys!) {
      final size = key.currentContext?.size;
      if (size == null) return;
      widths.add(size.width);
    }
    setState(() => _widths = widths);
  }

  @override
  Widget build(BuildContext context) {
    final cols = widget.rows.first.cells.length;
    return LayoutBuilder(
      builder: (context, constraints) {
        final parentW = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : (widget.maxWidth ?? 0);
        if (_widths == null) {
          return _measurePass(cols);
        }
        var widths = List<double>.from(_widths!);
        final minTotal = widths.fold<double>(0, (a, b) => a + b);
        if (parentW > minTotal && parentW.isFinite) {
          final extra = (parentW - minTotal) / cols;
          widths = widths.map((w) => w + extra).toList();
        }
        return _visual(widths, parentW);
      },
    );
  }

  Widget _measurePass(int cols) {
    return IgnorePointer(
      child: Opacity(
        opacity: 0,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var c = 0; c < cols; c++)
              KeyedSubtree(
                key: _colKeys![c],
                child: IntrinsicWidth(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      for (final row in widget.rows)
                        _cellBox(
                          row: row,
                          col: c,
                          width: null,
                          tokens: widget.tokens,
                        ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _visual(List<double> widths, double parentW) {
    final total = widths.fold<double>(0, (a, b) => a + b);
    final headerRows =
        widget.rows.where((r) => r.kind == _GridRowKind.header).toList();
    final bodyRows =
        widget.rows.where((r) => r.kind == _GridRowKind.body).toList();
    final footerRows =
        widget.rows.where((r) => r.kind == _GridRowKind.footer).toList();

    Widget rowWidget(_GridRow row) {
      return _TableRowView(
        row: row,
        widths: widths,
        tokens: widget.tokens,
        metrics: widget.metrics,
        zebra: widget.zebra,
        hover: widget.hover && row.kind == _GridRowKind.body,
        tableBackground: widget.tableBackground,
      );
    }

    if (!widget.pinCols) {
      Widget column = Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (final r in headerRows) rowWidget(r),
          if (widget.pinRows)
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [for (final r in bodyRows) rowWidget(r)],
                ),
              ),
            )
          else
            for (final r in bodyRows) rowWidget(r),
          for (final r in footerRows) rowWidget(r),
        ],
      );

      column = ColoredBox(color: widget.tableBackground, child: column);

      if (widget.pinRows) {
        column = SizedBox(height: widget.maxHeight ?? 288, child: column);
      }

      if (widget.overflowX) {
        column = SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: SizedBox(width: total, child: column),
        );
      } else {
        column = SizedBox(width: total, child: column);
      }
      return column;
    }

    final last = widths.length - 1;
    final midW =
        widths.skip(1).take(widths.length - 2).fold<double>(0, (a, b) => a + b);

    Widget pinCell(_GridRow row, int col) {
      return _cellBox(
        row: row,
        col: col,
        width: widths[col],
        tokens: widget.tokens,
      );
    }

    Widget midRow(_GridRow row) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var c = 1; c < last; c++)
            _cellBox(
              row: row,
              col: c,
              width: widths[c],
              tokens: widget.tokens,
            ),
        ],
      );
    }

    Widget hStrip(List<_GridRow> strip, ScrollController h) {
      if (strip.isEmpty) return const SizedBox.shrink();
      final row = strip.first;
      return ColoredBox(
        color: widget.tableBackground,
        child: Row(
          children: [
            pinCell(row, 0),
            Expanded(
              child: SingleChildScrollView(
                controller: h,
                scrollDirection: Axis.horizontal,
                child: midRow(row),
              ),
            ),
            pinCell(row, last),
          ],
        ),
      );
    }

    final paneH = widget.maxHeight ?? 288;
    final paneW =
        widget.maxWidth ?? (parentW.isFinite && parentW > 0 ? parentW : 448);

    return SizedBox(
      height: paneH,
      width: paneW,
      child: ColoredBox(
        color: widget.tableBackground,
        child: Column(
          children: [
            hStrip(headerRows, widget.hHeader),
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(
                    width: widths[0],
                    child: SingleChildScrollView(
                      controller: widget.vLeft,
                      child: Column(
                        children: [for (final r in bodyRows) pinCell(r, 0)],
                      ),
                    ),
                  ),
                  Expanded(
                    child: SingleChildScrollView(
                      controller: widget.vMid,
                      child: SingleChildScrollView(
                        controller: widget.hBody,
                        scrollDirection: Axis.horizontal,
                        child: SizedBox(
                          width: midW,
                          child: Column(
                            children: [for (final r in bodyRows) midRow(r)],
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: widths[last],
                    child: SingleChildScrollView(
                      controller: widget.vRight,
                      child: Column(
                        children: [for (final r in bodyRows) pinCell(r, last)],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            hStrip(footerRows, widget.hFooter),
          ],
        ),
      ),
    );
  }

  Widget _cellBox({
    required _GridRow row,
    required int col,
    required double? width,
    required WashTokens tokens,
  }) {
    final cell = col < row.cells.length
        ? row.cells[col]
        : const WashTableCell(child: SizedBox.shrink());
    return _WashTableCellBox(
      cell: cell,
      row: row,
      tokens: tokens,
      metrics: widget.metrics,
      zebra: widget.zebra,
      tableBackground: widget.tableBackground,
      width: width,
    );
  }
}

extension on _MeasuredTable {
  bool sizeChanged(_MeasuredTable other) =>
      metrics.paddingX != other.metrics.paddingX ||
      metrics.fontSize != other.metrics.fontSize ||
      rows.length != other.rows.length;
}

class _TableRowView extends StatefulWidget {
  const _TableRowView({
    required this.row,
    required this.widths,
    required this.tokens,
    required this.metrics,
    required this.zebra,
    required this.hover,
    required this.tableBackground,
  });

  final _GridRow row;
  final List<double> widths;
  final WashTokens tokens;
  final _WashTableMetrics metrics;
  final bool zebra;
  final bool hover;
  final Color tableBackground;

  @override
  State<_TableRowView> createState() => _TableRowViewState();
}

class _TableRowViewState extends State<_TableRowView> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final bg = _rowColor(
      tokens: widget.tokens,
      row: widget.row,
      zebra: widget.zebra,
      hovered: _hovered && widget.hover,
      tableBackground: widget.tableBackground,
    );
    Widget row = ColoredBox(
      color: bg,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var c = 0; c < widget.widths.length; c++)
            _WashTableCellBox(
              cell: c < widget.row.cells.length
                  ? widget.row.cells[c]
                  : const WashTableCell(child: SizedBox.shrink()),
              row: widget.row,
              tokens: widget.tokens,
              metrics: widget.metrics,
              zebra: widget.zebra,
              tableBackground: widget.tableBackground,
              width: widget.widths[c],
              skipBackground: true,
            ),
        ],
      ),
    );
    if (widget.hover) {
      row = MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: row,
      );
    }
    return row;
  }
}

Color _rowColor({
  required WashTokens tokens,
  required _GridRow row,
  required bool zebra,
  required bool hovered,
  required Color tableBackground,
}) {
  if (hovered) {
    return Color.alphaBlend(
        tokens.primary.withValues(alpha: 0.4), tableBackground);
  }
  if (row.kind == _GridRowKind.body && zebra && row.bodyIndex.isOdd) {
    return tokens.surfaceContainer;
  }
  return tableBackground;
}

class _WashTableCellBox extends StatelessWidget {
  const _WashTableCellBox({
    required this.cell,
    required this.row,
    required this.tokens,
    required this.metrics,
    required this.zebra,
    required this.tableBackground,
    required this.width,
    this.skipBackground = false,
  });

  final WashTableCell cell;
  final _GridRow row;
  final WashTokens tokens;
  final _WashTableMetrics metrics;
  final bool zebra;
  final Color tableBackground;
  final double? width;
  final bool skipBackground;

  @override
  Widget build(BuildContext context) {
    final isBand =
        row.kind == _GridRowKind.header || row.kind == _GridRowKind.footer;
    final color = isBand ? tokens.inkMuted : tokens.onSurface;
    final weight = (isBand || cell.heading) ? FontWeight.w700 : FontWeight.w500;
    final size = isBand ? 12.0 : metrics.fontSize;
    final bg = skipBackground
        ? const Color(0x00000000)
        : _rowColor(
            tokens: tokens,
            row: row,
            zebra: zebra,
            hovered: false,
            tableBackground: tableBackground,
          );

    Widget child = DefaultTextStyle(
      style: WashTypography.body(color).copyWith(
        fontSize: size,
        fontWeight: weight,
        height: 1.25,
      ),
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: metrics.paddingX,
          vertical: metrics.paddingY,
        ),
        child: ConstrainedBox(
          constraints: BoxConstraints(
              minHeight: metrics.minHeight - metrics.paddingY * 2),
          child: Align(
            alignment: Alignment.centerLeft,
            child: cell.child ??
                Text(
                  cell.text ?? '',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
          ),
        ),
      ),
    );

    child = DecoratedBox(
      decoration: BoxDecoration(
        color: bg,
        border: Border(
          bottom: BorderSide(
            color: tokens.onSurface.withValues(alpha: 0.05),
          ),
        ),
      ),
      child: child,
    );

    if (width != null) {
      child = SizedBox(width: width, child: child);
    }
    return child;
  }
}
