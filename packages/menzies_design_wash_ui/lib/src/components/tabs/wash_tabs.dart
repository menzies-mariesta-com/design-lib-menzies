import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `tabs` chrome: default, `tabs-border`, `tabs-lift`, `tabs-box`.
enum WashTabsStyle { plain, border, lift, box }

/// daisyUI `tabs-xs` through `tabs-xl`.
enum WashTabsSize { xs, sm, md, lg, xl }

/// daisyUI `tabs-top` / `tabs-bottom`.
enum WashTabsPlacement { top, bottom }

/// How selected copy is shown relative to the tab strip.
enum WashTabsContentMode {
  /// Tab strip only.
  none,

  /// Separate `tabpanel` below the strip (button tabs).
  panel,

  /// daisyUI `tab-content` sibling (radio / lift / box panels).
  attached,
}

class _WashTabMetrics {
  const _WashTabMetrics({
    required this.height,
    required this.fontSize,
    required this.paddingX,
    required this.radiusMin,
  });

  final double height;
  final double fontSize;
  final double paddingX;
  final double radiusMin;
}

const _kWashTabMetrics = <WashTabsSize, _WashTabMetrics>{
  WashTabsSize.xs: _WashTabMetrics(
    height: 24,
    fontSize: 12,
    paddingX: 6,
    radiusMin: 8,
  ),
  WashTabsSize.sm: _WashTabMetrics(
    height: 32,
    fontSize: 14,
    paddingX: 8,
    radiusMin: 8,
  ),
  WashTabsSize.md: _WashTabMetrics(
    height: 40,
    fontSize: 14,
    paddingX: 12,
    radiusMin: 12,
  ),
  WashTabsSize.lg: _WashTabMetrics(
    height: 48,
    fontSize: 18,
    paddingX: 16,
    radiusMin: 24,
  ),
  WashTabsSize.xl: _WashTabMetrics(
    height: 56,
    fontSize: 18,
    paddingX: 20,
    radiusMin: 32,
  ),
};

/// One daisyUI `tab` (button, radio, or labeled radio).
class WashTabItem {
  const WashTabItem({
    required this.label,
    this.content,
    this.contentText,
    this.icon,
    this.lucideIcon,
    this.disabled = false,
  });

  final String label;
  final Widget? content;
  final String? contentText;
  final Widget? icon;

  /// Lucide kebab-case name, sized like `size-4`.
  final String? lucideIcon;
  final bool disabled;

  bool get hasIcon => icon != null || lucideIcon != null;

  Widget? resolveContent(WashTokens tokens) {
    if (content != null) return content;
    if (contentText == null) return null;
    return Text(
      contentText!,
      style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
    );
  }
}

String washTabsClassLabel({
  WashTabsStyle style = WashTabsStyle.plain,
  WashTabsSize size = WashTabsSize.md,
  WashTabsPlacement placement = WashTabsPlacement.top,
  bool includePlacement = false,
}) {
  final parts = <String>['tabs'];
  switch (style) {
    case WashTabsStyle.plain:
      break;
    case WashTabsStyle.border:
      parts.add('tabs-border');
    case WashTabsStyle.lift:
      parts.add('tabs-lift');
    case WashTabsStyle.box:
      parts.add('tabs-box');
  }
  if (size != WashTabsSize.md) {
    parts.add('tabs-${size.name}');
  }
  if (includePlacement) {
    parts.add(
        placement == WashTabsPlacement.bottom ? 'tabs-bottom' : 'tabs-top');
  }
  return parts.join(' ');
}

class WashTabsClassLabel extends StatelessWidget {
  const WashTabsClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// daisyUI `tabs` + `tab` / `tab-active` / `tab-disabled` / `tab-content`.
class WashTabs extends StatefulWidget {
  const WashTabs({
    required this.items,
    this.initialIndex = 0,
    this.index,
    this.onChanged,
    this.style = WashTabsStyle.plain,
    this.size = WashTabsSize.md,
    this.placement = WashTabsPlacement.top,
    this.contentMode = WashTabsContentMode.none,
    this.scrollable = false,
    this.semanticLabel,
    super.key,
  });

  final List<WashTabItem> items;
  final int initialIndex;
  final int? index;
  final ValueChanged<int>? onChanged;
  final WashTabsStyle style;
  final WashTabsSize size;
  final WashTabsPlacement placement;
  final WashTabsContentMode contentMode;
  final bool scrollable;
  final String? semanticLabel;

  @override
  State<WashTabs> createState() => _WashTabsState();
}

class _WashTabsState extends State<WashTabs> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.index ?? widget.initialIndex;
  }

  @override
  void didUpdateWidget(WashTabs oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.index != null) {
      _index = widget.index!;
    }
  }

  int get _selected {
    if (widget.items.isEmpty) return 0;
    return _index.clamp(0, widget.items.length - 1);
  }

  void _select(int i) {
    final item = widget.items[i];
    if (item.disabled) return;
    widget.onChanged?.call(i);
    if (widget.index == null) {
      setState(() => _index = i);
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _kWashTabMetrics[widget.size]!;
    final selected = _selected;
    final content = widget.contentMode == WashTabsContentMode.none
        ? null
        : widget.items[selected].resolveContent(tokens);

    final strip = _TabStrip(
      tokens: tokens,
      metrics: metrics,
      items: widget.items,
      selected: selected,
      style: widget.style,
      placement: widget.placement,
      scrollable: widget.scrollable,
      onSelect: _select,
    );

    Widget body;
    if (content == null) {
      body = strip;
    } else if (widget.contentMode == WashTabsContentMode.panel) {
      body = ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 512),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            strip,
            const SizedBox(height: 12),
            DecoratedBox(
              decoration: BoxDecoration(
                color: tokens.surface,
                borderRadius: BorderRadius.circular(tokens.radiusBox),
                border: Border.all(color: tokens.palette.base300),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: DefaultTextStyle(
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 14,
                  ),
                  child: content,
                ),
              ),
            ),
          ],
        ),
      );
    } else {
      final attached = _AttachedContent(
        tokens: tokens,
        style: widget.style,
        placement: widget.placement,
        selectedIsFirst: selected == 0,
        scrollable: widget.scrollable,
        child: content,
      );
      final stacked = widget.placement == WashTabsPlacement.bottom
          ? [attached, strip]
          : [strip, attached];
      body = Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: stacked,
      );
    }

    return Semantics(
      container: true,
      label: widget.semanticLabel,
      child: body,
    );
  }
}

class _TabStrip extends StatelessWidget {
  const _TabStrip({
    required this.tokens,
    required this.metrics,
    required this.items,
    required this.selected,
    required this.style,
    required this.placement,
    required this.scrollable,
    required this.onSelect,
  });

  final WashTokens tokens;
  final _WashTabMetrics metrics;
  final List<WashTabItem> items;
  final int selected;
  final WashTabsStyle style;
  final WashTabsPlacement placement;
  final bool scrollable;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    final tabs = <Widget>[
      for (var i = 0; i < items.length; i++)
        _WashTabChip(
          item: items[i],
          selected: i == selected,
          metrics: metrics,
          tokens: tokens,
          style: style,
          placement: placement,
          onTap: () => onSelect(i),
        ),
    ];

    Widget row;
    if (scrollable) {
      row = SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(mainAxisSize: MainAxisSize.min, children: tabs),
      );
    } else {
      row = Wrap(crossAxisAlignment: WrapCrossAlignment.end, children: tabs);
    }

    if (style != WashTabsStyle.box) return row;

    final boxRadius = math.min(metrics.height / 2, tokens.radiusField) + 4;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        borderRadius: BorderRadius.circular(boxRadius),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFFFFFFF).withValues(alpha: 0.08),
            offset: const Offset(0, -0.5),
            blurRadius: 0,
          ),
          BoxShadow(
            color: const Color(0xFF000000).withValues(alpha: 0.05),
            offset: const Offset(0, 0.5),
            blurRadius: 0,
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(4),
        child: row,
      ),
    );
  }
}

class _WashTabChip extends StatefulWidget {
  const _WashTabChip({
    required this.item,
    required this.selected,
    required this.metrics,
    required this.tokens,
    required this.style,
    required this.placement,
    required this.onTap,
  });

  final WashTabItem item;
  final bool selected;
  final _WashTabMetrics metrics;
  final WashTokens tokens;
  final WashTabsStyle style;
  final WashTabsPlacement placement;
  final VoidCallback onTap;

  @override
  State<_WashTabChip> createState() => _WashTabChipState();
}

class _WashTabChipState extends State<_WashTabChip> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = widget.tokens;
    final metrics = widget.metrics;
    final selected = widget.selected;
    final disabled = widget.item.disabled;
    final muted = !selected && !_hover && !disabled;
    final color = disabled
        ? tokens.onSurface.withValues(alpha: 0.4)
        : muted
            ? tokens.onSurface.withValues(alpha: 0.5)
            : tokens.onSurface;
    final radius = math.min(tokens.radiusField, metrics.radiusMin);
    final borderColor = tokens.palette.base300;

    Widget label = Text(
      widget.item.label,
      style: WashTypography.body(color).copyWith(
        fontSize: metrics.fontSize,
        fontWeight: FontWeight.w500,
      ),
    );
    if (widget.item.hasIcon) {
      final icon = widget.item.icon ??
          WashLucideIcon(
            widget.item.lucideIcon!,
            size: 16,
            color: color,
            strokeWidth: 2,
          );
      label = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          icon,
          const SizedBox(width: 8),
          label,
        ],
      );
    }

    final pad = EdgeInsets.symmetric(horizontal: metrics.paddingX);
    BoxDecoration decoration;
    switch (widget.style) {
      case WashTabsStyle.plain:
        decoration = const BoxDecoration();
      case WashTabsStyle.border:
        decoration = BoxDecoration(
          borderRadius: BorderRadius.circular(tokens.radiusField),
        );
      case WashTabsStyle.lift:
        final top = widget.placement == WashTabsPlacement.top;
        decoration = BoxDecoration(
          color: selected ? tokens.surface : null,
          borderRadius: top
              ? BorderRadius.vertical(top: Radius.circular(radius))
              : BorderRadius.vertical(bottom: Radius.circular(radius)),
          border: selected
              ? Border(
                  top: top ? BorderSide(color: borderColor) : BorderSide.none,
                  bottom:
                      top ? BorderSide.none : BorderSide(color: borderColor),
                  left: BorderSide(color: borderColor),
                  right: BorderSide(color: borderColor),
                )
              : Border(
                  bottom:
                      top ? BorderSide(color: borderColor) : BorderSide.none,
                  top: top ? BorderSide.none : BorderSide(color: borderColor),
                ),
        );
      case WashTabsStyle.box:
        decoration = BoxDecoration(
          color: selected ? tokens.surface : null,
          borderRadius: BorderRadius.circular(tokens.radiusField),
          boxShadow: selected ? washPaperShadowSm(tokens) : null,
        );
    }

    Widget chip = Container(
      height: metrics.height,
      padding: pad,
      decoration: decoration,
      child: Center(widthFactor: 1, child: label),
    );

    if (widget.style == WashTabsStyle.border) {
      chip = Stack(
        alignment: Alignment.bottomCenter,
        children: [
          chip,
          Positioned(
            left: metrics.paddingX,
            right: metrics.paddingX,
            bottom: 0,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              height: 3,
              decoration: BoxDecoration(
                color: selected ? color : const Color(0x00000000),
                borderRadius: BorderRadius.circular(tokens.radiusField),
              ),
            ),
          ),
        ],
      );
    }

    chip = Semantics(
      button: true,
      selected: selected,
      enabled: !disabled,
      label: widget.item.label,
      child: chip,
    );

    return MouseRegion(
      cursor:
          disabled ? SystemMouseCursors.forbidden : SystemMouseCursors.click,
      onEnter: disabled ? null : (_) => setState(() => _hover = true),
      onExit: disabled ? null : (_) => setState(() => _hover = false),
      child: Opacity(
        opacity: disabled ? 0.4 : 1,
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: disabled ? null : widget.onTap,
          child: chip,
        ),
      ),
    );
  }
}

class _AttachedContent extends StatelessWidget {
  const _AttachedContent({
    required this.tokens,
    required this.style,
    required this.placement,
    required this.selectedIsFirst,
    required this.scrollable,
    required this.child,
  });

  final WashTokens tokens;
  final WashTabsStyle style;
  final WashTabsPlacement placement;
  final bool selectedIsFirst;
  final bool scrollable;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final top = placement == WashTabsPlacement.top;
    final box = style == WashTabsStyle.box;
    final lift = style == WashTabsStyle.lift;
    final radius = tokens.radiusBox;
    BorderRadius borderRadius;
    if (box) {
      borderRadius = BorderRadius.circular(
        math.min(20, tokens.radiusField) + 4,
      );
    } else if (lift) {
      if (top) {
        borderRadius = BorderRadius.only(
          topLeft: selectedIsFirst ? Radius.zero : Radius.circular(radius),
          topRight: Radius.circular(radius),
          bottomLeft: Radius.circular(radius),
          bottomRight: Radius.circular(radius),
        );
      } else {
        borderRadius = BorderRadius.only(
          topLeft: Radius.circular(radius),
          topRight: Radius.circular(radius),
          bottomLeft: selectedIsFirst ? Radius.zero : Radius.circular(radius),
          bottomRight: Radius.circular(radius),
        );
      }
    } else {
      borderRadius = BorderRadius.circular(radius);
    }

    Widget panel = DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: borderRadius,
        border: Border.all(color: tokens.palette.base300),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: DefaultTextStyle(
          style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
          child: child,
        ),
      ),
    );

    if (scrollable) {
      panel = ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 240),
        child: panel,
      );
    }

    if (box) {
      return Padding(padding: const EdgeInsets.only(top: 4), child: panel);
    }
    if (lift) {
      return Transform.translate(
        offset: Offset(0, top ? -1 : 1),
        child: panel,
      );
    }
    return panel;
  }
}
