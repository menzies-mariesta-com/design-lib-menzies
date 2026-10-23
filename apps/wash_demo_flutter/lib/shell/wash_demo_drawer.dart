import 'dart:math' as math;

import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import 'wash_demo_nav.dart';

/// The UI package ships Fraunces/Maple Mono as package-scoped font families.
const String _kUiPackage = 'menzies_design_wash_ui';

/// Website-parity gallery sidebar: brand header + collapsible menu groups.
class WashDemoDrawer extends StatefulWidget {
  const WashDemoDrawer({
    required this.selectedId,
    required this.query,
    required this.onSelect,
    super.key,
  });

  final String selectedId;

  /// Inline search filter. Non-empty queries expand every matching group.
  final String query;
  final ValueChanged<String> onSelect;

  @override
  State<WashDemoDrawer> createState() => _WashDemoDrawerState();
}

class _WashDemoDrawerState extends State<WashDemoDrawer> {
  /// Group id -> expanded state. Mirrors the web `*NavOpen` state.
  final Set<String> _openGroups = <String>{};

  @override
  void initState() {
    super.initState();
    _openGroupFor(widget.selectedId);
  }

  @override
  void didUpdateWidget(covariant WashDemoDrawer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.selectedId != widget.selectedId) {
      _openGroupFor(widget.selectedId);
    }
  }

  void _openGroupFor(String pageId) {
    final group = washDemoGroupForPage(pageId);
    if (group != null) _openGroups.add(group.id);
  }

  void _toggleGroup(WashDemoNavGroup group) {
    setState(() {
      if (!_openGroups.remove(group.id)) {
        _openGroups.add(group.id);
      }
    });
  }

  bool _isGroupOpen(WashDemoNavGroup group, {required bool filtering}) {
    return filtering || _openGroups.contains(group.id);
  }

  void _select(String pageId) {
    widget.onSelect(pageId);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final query = widget.query.trim().toLowerCase();
    final filtering = query.isNotEmpty;

    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border(
          right: BorderSide(
            color: tokens.inkBorder,
            width: 1,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _SidebarBrandHeader(tokens: tokens),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.fromLTRB(12, 16, 12, 16),
              children: [
                _SidebarLeaf(
                  item: kWashDemoOverviewItem,
                  active: widget.selectedId == kWashDemoOverviewItem.id,
                  onTap: _select,
                ),
                const SizedBox(height: 4),
                for (final group in kWashDemoSidebarGroups) ...[
                  if (_groupMatches(group, query))
                    _SidebarGroup(
                      group: group,
                      selectedId: widget.selectedId,
                      query: query,
                      open: _isGroupOpen(group, filtering: filtering),
                      onToggle: () => _toggleGroup(group),
                      onSelect: _select,
                    ),
                  if (_groupMatches(group, query)) const SizedBox(height: 4),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  bool _groupMatches(WashDemoNavGroup group, String query) {
    if (query.isEmpty) return true;
    return group.allItems.any(_matchesQuery);
  }

  bool _matchesQuery(WashDemoNavItem item) {
    final query = widget.query.trim().toLowerCase();
    if (query.isEmpty) return true;
    return item.label.toLowerCase().contains(query) ||
        item.id.toLowerCase().contains(query);
  }
}

class _SidebarBrandHeader extends StatelessWidget {
  const _SidebarBrandHeader({required this.tokens});

  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.sizeOf(context).width >= 1280;
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: tokens.inkBorder.withValues(alpha: 0.8),
          ),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Menzies Design',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(
              fontFamily: WashTypography.displayFamily,
              package: _kUiPackage,
              fontSize: wide ? 24 : 20,
              fontWeight: FontWeight.w600,
              height: 1.1,
              letterSpacing: -0.4,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            washUiBrandText().toUpperCase(),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: WashTypography.label(tokens.inkMuted).copyWith(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.9,
            ),
          ),
        ],
      ),
    );
  }
}

class _SidebarGroup extends StatelessWidget {
  const _SidebarGroup({
    required this.group,
    required this.selectedId,
    required this.query,
    required this.open,
    required this.onToggle,
    required this.onSelect,
  });

  final WashDemoNavGroup group;
  final String selectedId;
  final String query;
  final bool open;
  final VoidCallback onToggle;
  final ValueChanged<String> onSelect;

  bool get _hasActive => group.ownsPage(selectedId);

  bool _matches(WashDemoNavItem item) {
    if (query.isEmpty) return true;
    return item.label.toLowerCase().contains(query) ||
        item.id.toLowerCase().contains(query);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fg = _hasActive ? tokens.primary : tokens.onSurface;

    final visibleItems = group.items.where(_matches).toList();
    final visibleSections = [
      for (final section in group.sections)
        (
          label: section.label,
          items: section.items.where(_matches).toList(),
        ),
    ].where((section) => section.items.isNotEmpty).toList();

    if (query.isNotEmpty) {
      final hasChild = visibleItems.isNotEmpty || visibleSections.isNotEmpty;
      // Auto-expanded search results: skip group headers with no matches.
      if (!hasChild) return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        _SidebarGroupHeader(
          label: group.label,
          icon: group.icon,
          color: fg,
          open: open,
          requiresPurchase: group.requiresPurchase,
          onTap: onToggle,
        ),
        if (open)
          Padding(
            padding: const EdgeInsets.only(left: 8, top: 2),
            child: Container(
              decoration: BoxDecoration(
                border: Border(
                  left: BorderSide(
                    color: tokens.inkBorder.withValues(alpha: 0.6),
                  ),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(4, 4, 0, 4),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                spacing: 2,
                children: [
                  for (final item in visibleItems)
                    _SidebarLeaf(
                      item: item,
                      active: item.id == selectedId,
                      nested: true,
                      requiresPurchase: group.requiresPurchase,
                      onTap: onSelect,
                    ),
                  for (final section in visibleSections) ...[
                    _SidebarSectionTitle(section.label),
                    for (final item in section.items)
                      _SidebarLeaf(
                        item: item,
                        active: item.id == selectedId,
                        nested: true,
                        requiresPurchase: group.requiresPurchase,
                        onTap: onSelect,
                      ),
                  ],
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _SidebarGroupHeader extends StatefulWidget {
  const _SidebarGroupHeader({
    required this.label,
    required this.icon,
    required this.color,
    required this.open,
    required this.requiresPurchase,
    required this.onTap,
  });

  final String label;
  final String icon;
  final Color color;
  final bool open;
  final bool requiresPurchase;
  final VoidCallback onTap;

  @override
  State<_SidebarGroupHeader> createState() => _SidebarGroupHeaderState();
}

class _SidebarGroupHeaderState extends State<_SidebarGroupHeader> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final background = _hovered
        ? tokens.onSurface.withValues(alpha: 0.05)
        : const Color(0x00000000);

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: WashRipple(
        onTap: widget.onTap,
        borderRadius: tokens.radiusBox,
        tint: WashRippleTint.ink,
        child: Semantics(
          button: true,
          expanded: widget.open,
          label: widget.label,
          child: Container(
            constraints: const BoxConstraints(minHeight: 33),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: background,
              borderRadius: BorderRadius.circular(tokens.radiusBox),
            ),
            child: Row(
              children: [
                WashLucideIcon(
                  widget.icon,
                  size: 16,
                  strokeWidth: 2,
                  color: widget.color,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    widget.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(widget.color).copyWith(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      height: 1.4,
                    ),
                  ),
                ),
                if (widget.requiresPurchase) ...[
                  const SizedBox(width: 4),
                  const _RequiresPurchaseCrown(size: 14),
                ],
                const SizedBox(width: 4),
                WashLucideIcon(
                  'chevron-down',
                  size: 14,
                  strokeWidth: 2,
                  color: widget.color.withValues(alpha: 0.7),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _SidebarSectionTitle extends StatelessWidget {
  const _SidebarSectionTitle(this.label);

  final String label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      height: 24,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        child: Align(
          alignment: Alignment.centerLeft,
          child: Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: WashTypography.body(
              tokens.onSurface.withValues(alpha: 0.4),
            ).copyWith(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              height: 1.2,
            ),
          ),
        ),
      ),
    );
  }
}

class _SidebarLeaf extends StatefulWidget {
  const _SidebarLeaf({
    required this.item,
    required this.active,
    required this.onTap,
    this.nested = false,
    this.requiresPurchase = false,
  });

  final WashDemoNavItem item;
  final bool active;
  final ValueChanged<String> onTap;
  final bool nested;
  final bool requiresPurchase;

  @override
  State<_SidebarLeaf> createState() => _SidebarLeafState();
}

class _SidebarLeafState extends State<_SidebarLeaf> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final nested = widget.nested;
    final radius = tokens.radiusBox;
    final foreground = tokens.onSurface;

    final activeBackground = _washActiveBackground(tokens);
    final background = widget.active
        ? activeBackground
        : _hovered
            ? tokens.onSurface.withValues(alpha: 0.05)
            : const Color(0x00000000);

    final row = Container(
      constraints: BoxConstraints(minHeight: nested ? 36 : 33),
      padding: nested
          ? const EdgeInsets.symmetric(horizontal: 16, vertical: 8)
          : const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(radius),
      ),
      child: Row(
        children: [
          WashLucideIcon(
            widget.item.icon,
            size: 16,
            strokeWidth: 2,
            color: foreground,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              widget.item.label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: WashTypography.body(foreground).copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                height: 1.45,
              ),
            ),
          ),
          if (widget.requiresPurchase) ...[
            const SizedBox(width: 8),
            const _RequiresPurchaseCrown(size: 14),
          ],
        ],
      ),
    );

    final interactive = MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: WashRipple(
        onTap: () => widget.onTap(widget.item.id),
        borderRadius: radius,
        tint: WashRippleTint.ink,
        child: Semantics(
          button: true,
          selected: widget.active,
          label: widget.item.label,
          child: row,
        ),
      ),
    );

    return Padding(
      padding: EdgeInsets.symmetric(vertical: nested ? 2 : 0),
      child: CustomPaint(
        foregroundPainter: widget.active
            ? _DashedOutlinePainter(
                color: tokens.primary.withValues(alpha: 0.65),
                radius: radius,
              )
            : null,
        child: interactive,
      ),
    );
  }

  Color _washActiveBackground(WashTokens tokens) {
    final paletteId = washPaletteId(tokens.pigmentId, tokens.mode);
    final washA =
        kWashAtmosphereByTheme[paletteId]?.washA ?? tokens.surfaceContainerHigh;
    return Color.alphaBlend(washA.withValues(alpha: 0.55), tokens.surface);
  }
}

class _RequiresPurchaseCrown extends StatelessWidget {
  const _RequiresPurchaseCrown({this.size = 14});

  final double size;

  @override
  Widget build(BuildContext context) {
    return WashTooltip(
      message: 'Requires purchase',
      prefer: WashTooltipSide.right,
      child: WashLucideIcon(
        'crown',
        size: size,
        strokeWidth: 2,
        color: const Color(0xFFFBBF24),
      ),
    );
  }
}

class _DashedOutlinePainter extends CustomPainter {
  const _DashedOutlinePainter({required this.color, required this.radius});

  final Color color;
  final double radius;

  @override
  void paint(Canvas canvas, Size size) {
    final inset = math.min(1.0, math.min(size.width, size.height) / 2);
    final rect = Rect.fromLTWH(
      inset,
      inset,
      math.max(0, size.width - inset * 2),
      math.max(0, size.height - inset * 2),
    );
    final path = Path()
      ..addRRect(RRect.fromRectAndRadius(rect, Radius.circular(radius)));
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    final dashed = Path();
    for (final metric in path.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final end = math.min(distance + 4, metric.length);
        dashed.addPath(metric.extractPath(distance, end), Offset.zero);
        distance = end + 3;
      }
    }
    canvas.drawPath(dashed, paint);
  }

  @override
  bool shouldRepaint(covariant _DashedOutlinePainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.radius != radius;
  }
}
