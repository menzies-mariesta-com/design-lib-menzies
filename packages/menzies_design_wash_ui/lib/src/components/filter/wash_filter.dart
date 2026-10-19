import 'package:flutter/widgets.dart';

import '../button/wash_button.dart';
import '../join/wash_join.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `filter` row: radio or checkbox chips built from `btn`.
class WashFilter extends StatelessWidget {
  const WashFilter({
    required this.children,
    this.spacing = 8,
    this.runSpacing = 8,
    this.joined = false,
    super.key,
  });

  final List<Widget> children;
  final double spacing;
  final double runSpacing;
  final bool joined;

  @override
  Widget build(BuildContext context) {
    if (joined) {
      return WashJoin(wrap: true, children: children);
    }
    return Wrap(
      spacing: spacing,
      runSpacing: runSpacing,
      children: children,
    );
  }
}

/// Square reset control (`type=reset` + `btn-square`).
class WashFilterReset extends StatelessWidget {
  const WashFilterReset({
    required this.onPressed,
    this.size = WashButtonSize.md,
    this.variant = WashButtonVariant.defaultVariant,
    this.soft = false,
    this.joinItem = false,
    this.accessibilityLabel = 'Clear filter',
    super.key,
  });

  final VoidCallback? onPressed;
  final WashButtonSize size;
  final WashButtonVariant variant;
  final bool soft;
  final bool joinItem;
  final String accessibilityLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: accessibilityLabel,
      button: true,
      child: WashButton(
        label: '×',
        onPressed: onPressed,
        size: size,
        variant: variant,
        soft: soft,
        square: true,
        joinItem: joinItem,
      ),
    );
  }
}

/// `filter-reset` radio used outside a `<form>`.
class WashFilterResetRadio extends StatelessWidget {
  const WashFilterResetRadio({
    required this.selected,
    required this.onSelected,
    this.size = WashButtonSize.md,
    this.joinItem = false,
    super.key,
  });

  final bool selected;
  final ValueChanged<bool> onSelected;
  final WashButtonSize size;
  final bool joinItem;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '×',
      button: true,
      child: WashButton(
        label: '×',
        size: size,
        square: true,
        active: selected,
        joinItem: joinItem,
        onPressed: () => onSelected(true),
      ),
    );
  }
}

/// Single filter option (`btn` + radio semantics).
class WashFilterRadio extends StatelessWidget {
  const WashFilterRadio({
    required this.label,
    required this.selected,
    required this.onSelected,
    this.size = WashButtonSize.md,
    this.variant = WashButtonVariant.defaultVariant,
    this.soft = false,
    this.joinItem = false,
    super.key,
  });

  final String label;
  final bool selected;
  final VoidCallback onSelected;
  final WashButtonSize size;
  final WashButtonVariant variant;
  final bool soft;
  final bool joinItem;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: label,
      size: size,
      variant: variant,
      soft: soft,
      active: selected,
      joinItem: joinItem,
      onPressed: onSelected,
    );
  }
}

/// Multi-select filter chip (`type=checkbox` + `btn`).
class WashFilterCheckbox extends StatelessWidget {
  const WashFilterCheckbox({
    required this.label,
    required this.checked,
    required this.onChanged,
    this.size = WashButtonSize.md,
    super.key,
  });

  final String label;
  final bool checked;
  final ValueChanged<bool> onChanged;
  final WashButtonSize size;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: label,
      size: size,
      active: checked,
      onPressed: () => onChanged(!checked),
    );
  }
}

class WashFilterClassLabel extends StatelessWidget {
  const WashFilterClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text(
        value,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}
