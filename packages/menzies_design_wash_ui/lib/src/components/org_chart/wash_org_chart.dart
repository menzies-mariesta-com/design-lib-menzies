import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Avatar wash tint matching web `bg-wash-*` / `bg-secondary/40`.
enum WashOrgWashTint { blue, ochre, rose, secondary, base200 }

/// Card density (`compact` / `expanded`).
enum WashOrgDensity { compact, expanded }

/// Tree layout direction.
enum WashOrgDirection { vertical, horizontal }

/// One node in a [WashOrgChart] hierarchy.
class WashOrgNode {
  const WashOrgNode({
    required this.id,
    required this.name,
    this.role,
    this.initials,
    this.wash = WashOrgWashTint.base200,
    this.children = const [],
  });

  final String id;
  final String name;
  final String? role;
  final String? initials;
  final WashOrgWashTint wash;
  final List<WashOrgNode> children;

  WashOrgNode? findById(String id) {
    if (this.id == id) return this;
    for (final child in children) {
      final found = child.findById(id);
      if (found != null) return found;
    }
    return null;
  }

  Set<String> collectDescendantIds() {
    final ids = <String>{id};
    for (final child in children) {
      ids.addAll(child.collectDescendantIds());
    }
    return ids;
  }
}

Color washOrgTintColor(WashTokens tokens, WashOrgWashTint tint) {
  const blue = Color(0xFF4A7FA8);
  const ochre = Color(0xFFC4A574);
  const rose = Color(0xFFC97B84);
  return switch (tint) {
    WashOrgWashTint.blue => blue,
    WashOrgWashTint.ochre => ochre,
    WashOrgWashTint.rose => rose,
    WashOrgWashTint.secondary =>
      tokens.palette.secondary.withValues(alpha: 0.4),
    WashOrgWashTint.base200 => tokens.palette.base200,
  };
}

/// daisyUI-style org node card (`card` + optional avatar).
class WashOrgCard extends StatelessWidget {
  const WashOrgCard({
    required this.node,
    this.density = WashOrgDensity.expanded,
    this.selected = false,
    this.highlighted = false,
    this.onSelect,
    super.key,
  });

  final WashOrgNode node;
  final WashOrgDensity density;
  final bool selected;
  final bool highlighted;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final compact = density == WashOrgDensity.compact;
    final showAvatar = node.initials != null && node.initials!.isNotEmpty;
    final interactive = onSelect != null;
    final minW = compact ? 120.0 : 152.0;
    final pad = compact ? 8.0 : 12.0;
    final nameSize = compact ? 12.0 : 14.0;
    final roleSize = compact ? 10.4 : 12.0;
    final avatarSize = compact ? 32.0 : 40.0;

    Color ringColor;
    double ringWidth;
    if (selected) {
      ringColor = tokens.primary;
      ringWidth = 2;
    } else if (highlighted) {
      ringColor = tokens.primary.withValues(alpha: 0.4);
      ringWidth = 2;
    } else {
      ringColor = tokens.inkBorder.withValues(alpha: 0.7);
      ringWidth = 1;
    }

    final avatar = showAvatar
        ? Container(
            width: avatarSize,
            height: avatarSize,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: washOrgTintColor(tokens, node.wash),
              shape: BoxShape.circle,
            ),
            child: Text(
              node.initials!,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontSize: compact ? 12 : 13,
                fontWeight: FontWeight.w600,
              ),
            ),
          )
        : null;

    final textCol = Column(
      crossAxisAlignment:
          showAvatar ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          node.name,
          textAlign: showAvatar ? TextAlign.left : TextAlign.center,
          style: WashTypography.body(tokens.onSurface).copyWith(
            fontSize: nameSize,
            fontWeight: FontWeight.w500,
            height: 1.2,
          ),
        ),
        if (node.role != null) ...[
          const SizedBox(height: 2),
          Text(
            node.role!,
            textAlign: showAvatar ? TextAlign.left : TextAlign.center,
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: roleSize,
            ),
          ),
        ],
      ],
    );

    final body = Padding(
      padding: EdgeInsets.all(pad),
      child: showAvatar
          ? Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                avatar!,
                const SizedBox(width: 8),
                Flexible(child: textCol),
              ],
            )
          : textCol,
    );

    final card = AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      constraints: BoxConstraints(minWidth: minW),
      decoration: BoxDecoration(
        color: interactive
            ? tokens.palette.base100
            : tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: ringColor, width: ringWidth),
      ),
      child: body,
    );

    if (!interactive) return card;

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () => onSelect!(node.id),
        child: Semantics(
          button: true,
          selected: selected,
          label: [
            node.name,
            if (node.role != null) node.role!,
          ].join(', '),
          child: card,
        ),
      ),
    );
  }
}

/// Pure-layout org tree with card nodes and border connectors.
class WashOrgChart extends StatelessWidget {
  const WashOrgChart({
    required this.root,
    this.direction = WashOrgDirection.vertical,
    this.density = WashOrgDensity.expanded,
    this.selectedId,
    this.highlightIds,
    this.onSelect,
    this.scrollable = true,
    super.key,
  });

  final WashOrgNode root;
  final WashOrgDirection direction;
  final WashOrgDensity density;
  final String? selectedId;
  final Set<String>? highlightIds;
  final ValueChanged<String>? onSelect;
  final bool scrollable;

  @override
  Widget build(BuildContext context) {
    final tree = direction == WashOrgDirection.vertical
        ? _VerticalTree(
            node: root,
            density: density,
            selectedId: selectedId,
            highlightIds: highlightIds,
            onSelect: onSelect,
          )
        : _HorizontalTree(
            node: root,
            density: density,
            selectedId: selectedId,
            highlightIds: highlightIds,
            onSelect: onSelect,
          );

    if (!scrollable) return tree;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.only(bottom: 4),
      child: tree,
    );
  }
}

class _VerticalTree extends StatelessWidget {
  const _VerticalTree({
    required this.node,
    required this.density,
    this.selectedId,
    this.highlightIds,
    this.onSelect,
  });

  final WashOrgNode node;
  final WashOrgDensity density;
  final String? selectedId;
  final Set<String>? highlightIds;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final kids = node.children;
    final selected = selectedId == node.id;
    final highlighted =
        highlightIds != null && highlightIds!.contains(node.id) && !selected;
    final line = tokens.palette.base300;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashOrgCard(
          node: node,
          density: density,
          selected: selected,
          highlighted: highlighted,
          onSelect: onSelect,
        ),
        if (kids.isNotEmpty) ...[
          Container(width: 1, height: 20, color: line),
          Stack(
            alignment: Alignment.topCenter,
            children: [
              if (kids.length > 1)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: FractionallySizedBox(
                    widthFactor: 0.75,
                    child: Container(height: 1, color: line),
                  ),
                ),
              Row(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < kids.length; i++) ...[
                    if (i > 0) const SizedBox(width: 24),
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(width: 1, height: 20, color: line),
                        _VerticalTree(
                          node: kids[i],
                          density: density,
                          selectedId: selectedId,
                          highlightIds: highlightIds,
                          onSelect: onSelect,
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ],
          ),
        ],
      ],
    );
  }
}

class _HorizontalTree extends StatelessWidget {
  const _HorizontalTree({
    required this.node,
    required this.density,
    this.selectedId,
    this.highlightIds,
    this.onSelect,
  });

  final WashOrgNode node;
  final WashOrgDensity density;
  final String? selectedId;
  final Set<String>? highlightIds;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final kids = node.children;
    final selected = selectedId == node.id;
    final highlighted =
        highlightIds != null && highlightIds!.contains(node.id) && !selected;
    final line = tokens.palette.base300;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashOrgCard(
          node: node,
          density: density,
          selected: selected,
          highlighted: highlighted,
          onSelect: onSelect,
        ),
        if (kids.isNotEmpty) ...[
          Container(width: 20, height: 1, color: line),
          Stack(
            alignment: Alignment.centerLeft,
            children: [
              if (kids.length > 1)
                Positioned(
                  left: 0,
                  top: 0,
                  bottom: 0,
                  child: FractionallySizedBox(
                    heightFactor: 0.75,
                    child: Container(width: 1, color: line),
                  ),
                ),
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < kids.length; i++) ...[
                    if (i > 0) const SizedBox(height: 16),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(width: 20, height: 1, color: line),
                        _HorizontalTree(
                          node: kids[i],
                          density: density,
                          selectedId: selectedId,
                          highlightIds: highlightIds,
                          onSelect: onSelect,
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ],
          ),
        ],
      ],
    );
  }
}
