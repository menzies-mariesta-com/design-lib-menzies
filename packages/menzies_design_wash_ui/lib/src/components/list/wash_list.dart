import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `list` shadow presets used in the gallery.
enum WashListShadow { none, sm, md }

/// Quiet section label (`li` with `p-4 pb-2 text-xs tracking-wide opacity-60`).
class WashListSectionLabel extends StatelessWidget {
  const WashListSectionLabel(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(
        text,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 12,
          letterSpacing: 0.6,
          color: tokens.onSurface.withValues(alpha: 0.6),
        ),
      ),
    );
  }
}

/// Medium-weight primary line for a list row.
class WashListTitle extends StatelessWidget {
  const WashListTitle(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.body(tokens.onSurface).copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// Muted secondary line (`text-xs opacity-60`).
class WashListSubtitle extends StatelessWidget {
  const WashListSubtitle(
    this.text, {
    this.uppercase = false,
    super.key,
  });

  final String text;
  final bool uppercase;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      uppercase ? text.toUpperCase() : text,
      style: WashTypography.body(tokens.onSurface).copyWith(
        fontSize: 12,
        fontWeight: uppercase ? FontWeight.w600 : FontWeight.w400,
        color: tokens.onSurface.withValues(alpha: 0.6),
      ),
    );
  }
}

/// Title + subtitle stack used as a list-row column.
class WashListTextBlock extends StatelessWidget {
  const WashListTextBlock({
    required this.title,
    this.subtitle,
    this.subtitleUppercase = false,
    super.key,
  });

  final String title;
  final String? subtitle;
  final bool subtitleUppercase;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashListTitle(title),
        if (subtitle != null) ...[
          const SizedBox(height: 2),
          WashListSubtitle(subtitle!, uppercase: subtitleUppercase),
        ],
      ],
    );
  }
}

/// Gallery monospace class hint.
class WashListClassLabel extends StatelessWidget {
  const WashListClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'list' : value,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

/// daisyUI `list` shell: vertical flex of rows with optional border/shadow.
class WashList extends StatelessWidget {
  const WashList({
    required this.children,
    this.maxWidth,
    this.bordered = true,
    this.shadow = WashListShadow.sm,
    this.width,
    super.key,
  });

  /// Title-only rows (legacy / quick demos).
  factory WashList.titles(
    List<String> titles, {
    Key? key,
    double? maxWidth,
    bool bordered = true,
    WashListShadow shadow = WashListShadow.sm,
    String? header,
  }) {
    return WashList(
      key: key,
      maxWidth: maxWidth,
      bordered: bordered,
      shadow: shadow,
      children: [
        if (header != null) WashListSectionLabel(header),
        for (final t in titles) WashListRow(children: [WashListTitle(t)]),
      ],
    );
  }

  final List<Widget> children;
  final double? maxWidth;
  final double? width;
  final bool bordered;
  final WashListShadow shadow;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final box = DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: bordered ? Border.all(color: tokens.inkBorder) : null,
        boxShadow: switch (shadow) {
          WashListShadow.none => null,
          WashListShadow.sm => washPaperShadowSm(tokens),
          WashListShadow.md => [
              ...washPaperShadowSm(tokens),
              BoxShadow(
                color: tokens.onSurface.withValues(alpha: 0.1),
                offset: const Offset(0, 10),
                blurRadius: 28,
              ),
            ],
        },
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: _withDividers(context, children),
        ),
      ),
    );

    Widget child = box;
    if (width != null) {
      child = SizedBox(width: width, child: child);
    }
    if (maxWidth != null) {
      child = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth!),
        child: child,
      );
    }
    return child;
  }

  List<Widget> _withDividers(BuildContext context, List<Widget> kids) {
    final tokens = WashTokens.of(context);
    final out = <Widget>[];
    for (var i = 0; i < kids.length; i++) {
      final kid = kids[i];
      final showDivider = kid is WashListRow &&
          i + 1 < kids.length &&
          kids[i + 1] is WashListRow;
      if (showDivider) {
        out.add(
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              kid,
              Padding(
                padding: EdgeInsets.symmetric(horizontal: tokens.radiusBox),
                child: Container(
                  height: 1,
                  color: tokens.onSurface.withValues(alpha: 0.05),
                ),
              ),
            ],
          ),
        );
      } else {
        out.add(kid);
      }
    }
    return out;
  }
}

/// daisyUI `list-row` with optional `list-col-grow`, wrap line, hover, and selection.
class WashListRow extends StatefulWidget {
  const WashListRow({
    required this.children,
    this.growIndex,
    this.wrap,
    this.onTap,
    this.selected = false,
    this.hoverable = false,
    super.key,
  });

  /// Row cells (figures, text, actions). Painted on the first grid row.
  final List<Widget> children;

  /// Index of the child that fills remaining space (`list-col-grow`).
  /// When null, the second child (index 1) expands if present (daisyUI default).
  final int? growIndex;

  /// Content forced onto the next grid row (`list-col-wrap`).
  final Widget? wrap;

  final VoidCallback? onTap;
  final bool selected;

  /// Enables `hover:bg-primary/40` (and pointer cursor when [onTap] is set).
  final bool hoverable;

  @override
  State<WashListRow> createState() => _WashListRowState();
}

class _WashListRowState extends State<WashListRow> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final interactive = widget.onTap != null || widget.hoverable;
    final bg = widget.selected
        ? tokens.primary.withValues(alpha: 0.2)
        : (_hovered && interactive
            ? tokens.primary.withValues(alpha: 0.4)
            : null);

    final grow = widget.growIndex ?? (widget.children.length >= 2 ? 1 : null);

    final rowChildren = <Widget>[];
    for (var i = 0; i < widget.children.length; i++) {
      final child = widget.children[i];
      if (grow != null && i == grow) {
        rowChildren.add(Expanded(child: child));
      } else {
        rowChildren.add(child);
      }
      if (i < widget.children.length - 1) {
        rowChildren.add(const SizedBox(width: 16));
      }
    }

    Widget body = Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: rowChildren,
          ),
          if (widget.wrap != null) ...[
            const SizedBox(height: 8),
            widget.wrap!,
          ],
        ],
      ),
    );

    if (interactive) {
      body = MouseRegion(
        cursor: widget.onTap != null
            ? SystemMouseCursors.click
            : SystemMouseCursors.basic,
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: widget.onTap,
          child: body,
        ),
      );
    }

    return ColoredBox(
      color: bg ?? const Color(0x00000000),
      child: body,
    );
  }
}
