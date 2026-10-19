import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';

/// daisyUI `menu-xs` … `menu-lg`.
enum WashMenuSize { xs, sm, md, lg }

/// daisyUI `menu` / `menu-horizontal` orientation.
enum WashMenuOrientation { vertical, horizontal }

class _MenuMetrics {
  const _MenuMetrics({
    required this.padY,
    required this.padX,
    required this.fontSize,
    required this.iconSize,
    required this.shellPad,
  });
  final double padY;
  final double padX;
  final double fontSize;
  final double iconSize;
  final double shellPad;
}

_MenuMetrics _metrics(WashMenuSize size) {
  return switch (size) {
    WashMenuSize.xs => const _MenuMetrics(
        padY: 2,
        padX: 8,
        fontSize: 12,
        iconSize: 14,
        shellPad: 4,
      ),
    WashMenuSize.sm => const _MenuMetrics(
        padY: 4,
        padX: 10,
        fontSize: 13,
        iconSize: 15,
        shellPad: 6,
      ),
    WashMenuSize.md => const _MenuMetrics(
        padY: 6,
        padX: 12,
        fontSize: 14,
        iconSize: 16,
        shellPad: 8,
      ),
    WashMenuSize.lg => const _MenuMetrics(
        padY: 8,
        padX: 14,
        fontSize: 15,
        iconSize: 18,
        shellPad: 10,
      ),
  };
}

/// daisyUI `menu` shell: bordered rounded list of items / nested trees.
class WashMenu extends StatelessWidget {
  const WashMenu({
    required this.children,
    this.orientation = WashMenuOrientation.vertical,
    this.size = WashMenuSize.md,
    this.width,
    this.maxWidth,
    this.bordered = true,
    this.shadow = true,
    this.horizontalFrom,
    this.wrapHorizontal = true,
    super.key,
  });

  final List<Widget> children;
  final WashMenuOrientation orientation;
  final WashMenuSize size;
  final double? width;
  final double? maxWidth;
  final bool bordered;
  final bool shadow;

  /// When set (e.g. 1024), switch to horizontal at that width and above.
  final double? horizontalFrom;

  /// When horizontal, wrap items like `flex-wrap`.
  final bool wrapHorizontal;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _metrics(size);
    final w = MediaQuery.sizeOf(context).width;
    final horizontal = horizontalFrom != null
        ? w >= horizontalFrom!
        : orientation == WashMenuOrientation.horizontal;

    final body = horizontal && wrapHorizontal
        ? Wrap(
            spacing: 0,
            runSpacing: 0,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: children,
          )
        : Flex(
            direction: horizontal ? Axis.horizontal : Axis.vertical,
            crossAxisAlignment: horizontal
                ? CrossAxisAlignment.center
                : CrossAxisAlignment.stretch,
            children: children,
          );

    return Container(
      width: width,
      constraints: maxWidth != null
          ? BoxConstraints(maxWidth: maxWidth!)
          : null,
      padding: EdgeInsets.all(m.shellPad),
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: bordered
            ? Border.all(color: tokens.inkBorder.withValues(alpha: 0.6))
            : null,
        boxShadow: shadow ? washPaperShadowSm(tokens) : null,
      ),
      child: body,
    );
  }
}

/// Section label (`menu-title`).
class WashMenuTitle extends StatelessWidget {
  const WashMenuTitle(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 4),
      child: Text(
        text,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

/// A clickable menu row (`li > button` / link).
class WashMenuItem extends StatelessWidget {
  const WashMenuItem({
    required this.label,
    this.icon,
    this.iconSize,
    this.badge,
    this.active = false,
    this.focusStyle = false,
    this.disabled = false,
    this.onPressed,
    this.size = WashMenuSize.md,
    this.tooltip,
    this.iconOnly = false,
    this.tooltipPrefer,
    super.key,
  });

  final String label;
  final String? icon;
  final double? iconSize;
  final Widget? badge;
  final bool active;
  final bool focusStyle;
  final bool disabled;
  final VoidCallback? onPressed;
  final WashMenuSize size;
  final String? tooltip;
  final bool iconOnly;
  final WashTooltipSide? tooltipPrefer;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _metrics(size);
    final fg = disabled
        ? tokens.onSurface.withValues(alpha: 0.35)
        : active
            ? tokens.palette.neutralContent
            : tokens.onSurface;
    final bg = active
        ? tokens.palette.neutral
        : focusStyle
            ? tokens.onSurface.withValues(alpha: 0.08)
            : null;

    Widget row = Padding(
      padding: EdgeInsets.symmetric(horizontal: m.padX, vertical: m.padY),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            WashLucideIcon(
              icon!,
              size: iconSize ?? m.iconSize,
              strokeWidth: 2,
              color: fg,
            ),
            if (!iconOnly) const SizedBox(width: 8),
          ],
          if (!iconOnly)
            Text(
              label,
              style: WashTypography.body(fg).copyWith(
                fontSize: m.fontSize,
                fontWeight: active ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          if (badge != null) ...[
            const SizedBox(width: 8),
            badge!,
          ],
        ],
      ),
    );

    row = DecoratedBox(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(tokens.radiusField),
      ),
      child: row,
    );

    final clickable = MouseRegion(
      cursor: disabled
          ? SystemMouseCursors.forbidden
          : SystemMouseCursors.click,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: disabled ? null : onPressed,
        child: Semantics(
          button: true,
          enabled: !disabled,
          label: label,
          child: row,
        ),
      ),
    );

    if (tooltip != null && tooltip!.isNotEmpty) {
      return WashTooltip(
        message: tooltip!,
        prefer: tooltipPrefer,
        child: clickable,
      );
    }
    return clickable;
  }
}

/// Always-visible nested submenu with left rule (daisyUI nested `ul`).
class WashMenuSubtree extends StatelessWidget {
  const WashMenuSubtree({
    required this.children,
    this.size = WashMenuSize.md,
    super.key,
  });

  final List<Widget> children;
  final WashMenuSize size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(left: 16),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              width: 1,
              margin: const EdgeInsets.symmetric(vertical: 12),
              color: tokens.onSurface.withValues(alpha: 0.1),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: children,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Collapsible submenu (`details` / `menu-dropdown-toggle`).
class WashMenuDetails extends StatefulWidget {
  const WashMenuDetails({
    required this.label,
    required this.children,
    this.icon,
    this.initiallyOpen = false,
    this.size = WashMenuSize.md,
    this.dropdownToggle = false,
    super.key,
  });

  final String label;
  final String? icon;
  final List<Widget> children;
  final bool initiallyOpen;
  final WashMenuSize size;

  /// Use chevron style of `menu-dropdown-toggle` (JS toggle demos).
  final bool dropdownToggle;

  @override
  State<WashMenuDetails> createState() => _WashMenuDetailsState();
}

class _WashMenuDetailsState extends State<WashMenuDetails> {
  late bool _open;

  @override
  void initState() {
    super.initState();
    _open = widget.initiallyOpen;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _metrics(widget.size);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () => setState(() => _open = !_open),
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: m.padX,
                vertical: m.padY,
              ),
              child: Row(
                children: [
                  if (widget.icon != null) ...[
                    WashLucideIcon(
                      widget.icon!,
                      size: m.iconSize,
                      strokeWidth: 2,
                    ),
                    const SizedBox(width: 8),
                  ],
                  Expanded(
                    child: Text(
                      widget.label,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: m.fontSize,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Transform.rotate(
                    angle: _open ? 0.785 : -2.356,
                    child: Container(
                      width: 6,
                      height: 6,
                      decoration: BoxDecoration(
                        border: Border(
                          top: BorderSide(
                            color: tokens.onSurface.withValues(alpha: 0.35),
                            width: 2,
                          ),
                          left: BorderSide(
                            color: tokens.onSurface.withValues(alpha: 0.35),
                            width: 2,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        if (_open)
          WashMenuSubtree(size: widget.size, children: widget.children),
      ],
    );
  }
}

/// Parent row with always-open nested children (static tree).
class WashMenuBranch extends StatelessWidget {
  const WashMenuBranch({
    required this.label,
    required this.children,
    this.size = WashMenuSize.md,
    this.onPressed,
    super.key,
  });

  final String label;
  final List<Widget> children;
  final WashMenuSize size;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashMenuItem(
          label: label,
          size: size,
          onPressed: onPressed ?? () {},
        ),
        WashMenuSubtree(size: size, children: children),
      ],
    );
  }
}
