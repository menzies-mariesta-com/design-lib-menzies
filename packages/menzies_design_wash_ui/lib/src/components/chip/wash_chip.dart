import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';
import '../badge/wash_badge.dart';

/// daisyUI `badge` composed as a tag or filter chip (no dedicated chip class).
class WashChip extends StatelessWidget {
  const WashChip({
    required this.label,
    this.tone = WashBadgeTone.defaultTone,
    this.style = WashBadgeStyle.solid,
    this.size = WashBadgeSize.md,
    this.iconName,
    this.leading,
    this.onDeleted,
    this.dismissTooltip = 'Remove',
    super.key,
  })  : selected = null,
        onPressed = null;

  const WashChip.selectable({
    required this.label,
    required this.selected,
    required this.onPressed,
    this.size = WashBadgeSize.md,
    super.key,
  })  : tone = WashBadgeTone.primary,
        style = WashBadgeStyle.solid,
        iconName = null,
        leading = null,
        onDeleted = null,
        dismissTooltip = 'Remove';

  final String label;
  final WashBadgeTone tone;
  final WashBadgeStyle style;
  final WashBadgeSize size;
  final String? iconName;
  final Widget? leading;
  final VoidCallback? onDeleted;
  final String dismissTooltip;
  final bool? selected;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    if (onPressed != null && selected != null) {
      return _SelectableChip(
        label: label,
        selected: selected!,
        onPressed: onPressed!,
        size: size,
      );
    }

    final dismiss = onDeleted == null
        ? null
        : WashTooltip(
            message: dismissTooltip,
            prefer: WashTooltipSide.right,
            child: WashButton(
              onPressed: onDeleted,
              variant: WashButtonVariant.ghost,
              size: WashButtonSize.xs,
              square: true,
              child: WashLucideIcon(
                'x',
                size: 14,
                strokeWidth: 2,
              ),
            ),
          );

    return WashBadge(
      label,
      tone: tone,
      style: style,
      size: size,
      iconName: iconName,
      leading: leading,
      trailing: dismiss,
    );
  }
}

class _SelectableChip extends StatelessWidget {
  const _SelectableChip({
    required this.label,
    required this.selected,
    required this.onPressed,
    required this.size,
  });

  final String label;
  final bool selected;
  final VoidCallback onPressed;
  final WashBadgeSize size;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      child: GestureDetector(
        onTap: onPressed,
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: WashBadge(
            label,
            tone: selected ? WashBadgeTone.primary : WashBadgeTone.defaultTone,
            style: selected ? WashBadgeStyle.solid : WashBadgeStyle.outline,
            size: size,
          ),
        ),
      ),
    );
  }
}
