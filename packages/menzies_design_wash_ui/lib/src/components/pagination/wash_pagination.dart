import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../button/wash_button.dart';
import '../join/wash_join.dart';

/// Prev/next edge control style for [WashPagination].
enum WashPaginationEdge {
  /// No edge buttons; page numbers only.
  none,

  /// Guillemet edges (`«` / `»`).
  guillemets,

  /// Lucide chevron edges with tooltips.
  chevrons,
}

/// daisyUI `join` pagination: numbered page buttons with optional prev/next.
class WashPagination extends StatelessWidget {
  const WashPagination({
    required this.page,
    required this.totalPages,
    required this.onChanged,
    this.size = WashButtonSize.md,
    this.edge = WashPaginationEdge.guillemets,
    this.variant = WashButtonVariant.defaultVariant,
    this.wrap = false,
    this.showEllipsis = false,
    this.ellipsisAfter = 2,
    this.ellipsisBeforeEnd = 2,
    super.key,
  }) : assert(totalPages >= 1),
       assert(page >= 1);

  /// 1-based current page.
  final int page;

  final int totalPages;
  final ValueChanged<int> onChanged;
  final WashButtonSize size;
  final WashPaginationEdge edge;
  final WashButtonVariant variant;
  final bool wrap;

  /// When true and [totalPages] is large, inserts a disabled `…` button.
  final bool showEllipsis;

  /// Pages shown before the ellipsis (default 1, 2).
  final int ellipsisAfter;

  /// Pages shown after the ellipsis (default last two).
  final int ellipsisBeforeEnd;

  int get _safePage {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  }

  void _go(int next) {
    final clamped = next.clamp(1, totalPages);
    if (clamped != _safePage) onChanged(clamped);
  }

  List<Widget> _pageButtons() {
    final current = _safePage;
    final useEllipsis =
        showEllipsis && totalPages > ellipsisAfter + ellipsisBeforeEnd + 1;

    if (!useEllipsis) {
      return [
        for (var n = 1; n <= totalPages; n++)
          WashButton(
            label: '$n',
            joinItem: true,
            size: size,
            variant: variant,
            active: n == current,
            onPressed: () => _go(n),
          ),
      ];
    }

    final buttons = <Widget>[];
    for (var n = 1; n <= ellipsisAfter; n++) {
      buttons.add(
        WashButton(
          label: '$n',
          joinItem: true,
          size: size,
          variant: variant,
          active: n == current,
          onPressed: () => _go(n),
        ),
      );
    }
    buttons.add(
      WashButton(
        label: '…',
        joinItem: true,
        size: size,
        variant: variant,
        enabled: false,
        onPressed: null,
      ),
    );
    for (var n = totalPages - ellipsisBeforeEnd + 1; n <= totalPages; n++) {
      buttons.add(
        WashButton(
          label: '$n',
          joinItem: true,
          size: size,
          variant: variant,
          active: n == current,
          onPressed: () => _go(n),
        ),
      );
    }
    return buttons;
  }

  List<Widget> _edgePrev() {
    final current = _safePage;
    final canPrev = current > 1;
    return switch (edge) {
      WashPaginationEdge.none => const <Widget>[],
      WashPaginationEdge.guillemets => [
          WashButton(
            label: '«',
            joinItem: true,
            size: size,
            variant: variant,
            enabled: canPrev,
            onPressed: canPrev ? () => _go(current - 1) : null,
          ),
        ],
      WashPaginationEdge.chevrons => [
          WashTooltip(
            message: 'Previous',
            child: WashButton(
              joinItem: true,
              size: size,
              variant: variant,
              enabled: canPrev,
              onPressed: canPrev ? () => _go(current - 1) : null,
              child: const WashLucideIcon('chevron-left', size: 16),
            ),
          ),
        ],
    };
  }

  List<Widget> _edgeNext() {
    final current = _safePage;
    final canNext = current < totalPages;
    return switch (edge) {
      WashPaginationEdge.none => const <Widget>[],
      WashPaginationEdge.guillemets => [
          WashButton(
            label: '»',
            joinItem: true,
            size: size,
            variant: variant,
            enabled: canNext,
            onPressed: canNext ? () => _go(current + 1) : null,
          ),
        ],
      WashPaginationEdge.chevrons => [
          WashTooltip(
            message: 'Next',
            child: WashButton(
              joinItem: true,
              size: size,
              variant: variant,
              enabled: canNext,
              onPressed: canNext ? () => _go(current + 1) : null,
              child: const WashLucideIcon('chevron-right', size: 16),
            ),
          ),
        ],
    };
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      label: 'Pagination',
      child: WashJoin(
        wrap: wrap,
        children: [
          ..._edgePrev(),
          ..._pageButtons(),
          ..._edgeNext(),
        ],
      ),
    );
  }
}

/// Compact `«` / `Page N` / `»` join control.
class WashPaginationCompact extends StatelessWidget {
  const WashPaginationCompact({
    required this.page,
    required this.totalPages,
    required this.onChanged,
    this.size = WashButtonSize.sm,
    super.key,
  }) : assert(totalPages >= 1);

  final int page;
  final int totalPages;
  final ValueChanged<int> onChanged;
  final WashButtonSize size;

  int get _safePage {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  }

  @override
  Widget build(BuildContext context) {
    final current = _safePage;
    final canPrev = current > 1;
    final canNext = current < totalPages;
    return WashJoin(
      children: [
        WashButton(
          label: '«',
          joinItem: true,
          size: size,
          enabled: canPrev,
          onPressed: canPrev ? () => onChanged(current - 1) : null,
        ),
        WashButton(
          label: 'Page $current',
          joinItem: true,
          size: size,
          onPressed: () {},
        ),
        WashButton(
          label: '»',
          joinItem: true,
          size: size,
          enabled: canNext,
          onPressed: canNext ? () => onChanged(current + 1) : null,
        ),
      ],
    );
  }
}

/// Equal-width outline `Previous page` / `Next` join pair (`grid-cols-2`).
class WashPaginationOutlinePair extends StatelessWidget {
  const WashPaginationOutlinePair({
    required this.page,
    required this.totalPages,
    required this.onChanged,
    this.maxWidth = 448,
    this.size = WashButtonSize.md,
    this.prevLabel = 'Previous page',
    this.nextLabel = 'Next',
    super.key,
  });

  final int page;
  final int totalPages;
  final ValueChanged<int> onChanged;
  final double maxWidth;
  final WashButtonSize size;
  final String prevLabel;
  final String nextLabel;

  int get _safePage {
    if (page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  }

  @override
  Widget build(BuildContext context) {
    final current = _safePage;
    final canPrev = current > 1;
    final canNext = current < totalPages;
    final tokens = WashTokens.of(context);
    return Align(
      alignment: Alignment.centerLeft,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth),
        child: DecoratedBox(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: tokens.palette.base300),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Row(
              children: [
                Expanded(
                  child: WashButton(
                    label: prevLabel,
                    joinItem: true,
                    size: size,
                    variant: WashButtonVariant.outline,
                    block: true,
                    enabled: canPrev,
                    onPressed: canPrev ? () => onChanged(current - 1) : null,
                  ),
                ),
                ColoredBox(
                  color: tokens.palette.base300,
                  child: const SizedBox(width: 1, height: 48),
                ),
                Expanded(
                  child: WashButton(
                    label: nextLabel,
                    joinItem: true,
                    size: size,
                    variant: WashButtonVariant.outline,
                    block: true,
                    enabled: canNext,
                    onPressed: canNext ? () => onChanged(current + 1) : null,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Square radio-style page buttons (`btn btn-square join-item`).
class WashPaginationRadios extends StatelessWidget {
  const WashPaginationRadios({
    required this.page,
    required this.totalPages,
    required this.onChanged,
    this.size = WashButtonSize.md,
    super.key,
  });

  final int page;
  final int totalPages;
  final ValueChanged<int> onChanged;
  final WashButtonSize size;

  @override
  Widget build(BuildContext context) {
    final current = page.clamp(1, totalPages);
    return WashJoin(
      children: [
        for (var n = 1; n <= totalPages; n++)
          WashButton(
            label: '$n',
            joinItem: true,
            square: true,
            size: size,
            active: n == current,
            onPressed: () => onChanged(n),
          ),
      ],
    );
  }
}
