import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../foundation/wash_ripple.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import 'wash_button.dart';

class WashDataColumn {
  const WashDataColumn({required this.label, this.flex = 1});
  final String label;
  final int flex;
}

class WashDataRow {
  const WashDataRow({required this.cells, this.onAction});
  final List<String> cells;
  final VoidCallback? onAction;
}

/// CRUD table chrome: sticky header, scrollable body, footer paginator.
class WashDataTable extends StatefulWidget {
  const WashDataTable({
    required this.columns,
    required this.rows,
    this.pageSize = 10,
    super.key,
  });

  final List<WashDataColumn> columns;
  final List<WashDataRow> rows;
  final int pageSize;

  @override
  State<WashDataTable> createState() => _WashDataTableState();
}

class _WashDataTableState extends State<WashDataTable> {
  int _page = 1;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final start = (_page - 1) * widget.pageSize;
    final pageRows = widget.rows.skip(start).take(widget.pageSize).toList();
    final pageCount = (widget.rows.length / widget.pageSize).ceil().clamp(1, 9999);

    return Column(
      children: [
        _Header(columns: widget.columns, tokens: tokens),
        Expanded(
          child: ListView.builder(
            itemCount: pageRows.length,
            itemBuilder: (context, index) {
              final globalIndex = start + index;
              final row = pageRows[index];
              final zebra = index.isEven;
              return Container(
                color: zebra
                    ? tokens.surfaceContainer.withValues(alpha: 0.35)
                    : tokens.surface,
                child: WashRipple(
                  onTap: row.onAction,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    child: Row(
                      children: [
                        SizedBox(
                          width: 72,
                          child: WashButton(
                            square: true,
                            variant: WashButtonVariant.ghost,
                            onPressed: row.onAction,
                            child: const WashIcon(WashIconGlyph.more, size: 20),
                          ),
                        ),
                        SizedBox(
                          width: 48,
                          child: Text('${globalIndex + 1}'),
                        ),
                        ...List.generate(widget.columns.length, (ci) {
                          return Expanded(
                            flex: widget.columns[ci].flex,
                            child: Text(row.cells[ci]),
                          );
                        }),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        _Paginator(
          page: _page,
          pageCount: pageCount,
          onPage: (p) => setState(() => _page = p),
          tokens: tokens,
        ),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.columns, required this.tokens});
  final List<WashDataColumn> columns;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: tokens.surfaceContainer,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          const SizedBox(width: 72, child: Text('Actions')),
          const SizedBox(width: 48, child: Text('No')),
          ...columns.map(
            (c) => Expanded(
              flex: c.flex,
              child: Text(c.label, style: const TextStyle(fontWeight: FontWeight.w600)),
            ),
          ),
        ],
      ),
    );
  }
}

class _Paginator extends StatelessWidget {
  const _Paginator({
    required this.page,
    required this.pageCount,
    required this.onPage,
    required this.tokens,
  });

  final int page;
  final int pageCount;
  final ValueChanged<int> onPage;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: tokens.inkBorder)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          WashButton(
            square: true,
            variant: WashButtonVariant.ghost,
            onPressed: page > 1 ? () => onPage(page - 1) : null,
            child: const WashIcon(WashIconGlyph.chevronLeft),
          ),
          Text('Page $page of $pageCount'),
          WashButton(
            square: true,
            variant: WashButtonVariant.ghost,
            onPressed: page < pageCount ? () => onPage(page + 1) : null,
            child: const WashIcon(WashIconGlyph.chevronRight),
          ),
        ],
      ),
    );
  }
}
