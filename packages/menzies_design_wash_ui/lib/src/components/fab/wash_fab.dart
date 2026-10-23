import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';

enum WashFabLayout { vertical, flower }

/// Gallery stage that contains fixed FAB demos (matches FabPage FabStage).
class WashFabStage extends StatelessWidget {
  const WashFabStage({
    required this.child,
    this.height = 224,
    this.hint = 'Click or focus the FAB',
    super.key,
  });

  final Widget child;
  final double height;
  final String hint;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      height: height,
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: tokens.surfaceContainer.withValues(alpha: 0.4),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Positioned(
                left: 12,
                top: 12,
                child: Text(
                  hint,
                  style: WashTypography.label(tokens.inkMuted)
                      .copyWith(fontSize: 10.4),
                ),
              ),
              child,
            ],
          ),
        ),
      ),
    );
  }
}

/// daisyUI `fab` speed dial: vertical stack or flower arc.
class WashFab extends StatefulWidget {
  const WashFab({
    required this.trigger,
    this.actions = const [],
    this.close,
    this.mainActionSlot,
    this.layout = WashFabLayout.vertical,
    this.demoOpen = false,
    super.key,
  });

  final Widget trigger;
  final List<Widget> actions;
  final Widget? close;
  final Widget? mainActionSlot;
  final WashFabLayout layout;
  final bool demoOpen;

  @override
  State<WashFab> createState() => _WashFabState();
}

class _WashFabState extends State<WashFab> {
  final _focusNode = FocusNode();
  bool _open = false;

  @override
  void initState() {
    super.initState();
    _open = widget.demoOpen;
    _focusNode.addListener(_onFocus);
  }

  void _onFocus() {
    setState(() => _open = _focusNode.hasFocus || widget.demoOpen);
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocus);
    _focusNode.dispose();
    super.dispose();
  }

  void _toggle() => setState(() => _open = !_open);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 16,
      bottom: 16,
      child: widget.layout == WashFabLayout.flower
          ? _flowerDial()
          : _verticalDial(),
    );
  }

  Widget _verticalDial() {
    final showActions = _open;
    final items = <Widget>[];

    if (showActions) {
      if (widget.close != null) {
        items.add(widget.close!);
      } else if (widget.mainActionSlot != null) {
        items.add(widget.mainActionSlot!);
      }
      items.addAll(widget.actions);
    }

    return Focus(
      focusNode: _focusNode,
      onFocusChange: (_) => setState(() {}),
      child: GestureDetector(
        onTap: _toggle,
        behavior: HitTestBehavior.translucent,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            for (var i = 0; i < items.length; i++) ...[
              if (i > 0) const SizedBox(height: 8),
              items[i],
            ],
            if (items.isNotEmpty) const SizedBox(height: 8),
            Opacity(
              opacity: showActions &&
                      (widget.close != null || widget.mainActionSlot != null)
                  ? 0
                  : 1,
              child: widget.trigger,
            ),
          ],
        ),
      ),
    );
  }

  Widget _flowerDial() {
    final show = _open;
    const radius = 88.0;
    final count =
        widget.actions.length + (widget.mainActionSlot != null ? 1 : 0);
    final arcStart = math.pi * 0.5;
    final arcEnd = math.pi;
    final step = count <= 1 ? 0.0 : (arcEnd - arcStart) / (count - 1);

    return Focus(
      focusNode: _focusNode,
      child: GestureDetector(
        onTap: _toggle,
        child: SizedBox(
          width: radius + 56,
          height: radius + 56,
          child: Stack(
            clipBehavior: Clip.none,
            alignment: Alignment.bottomRight,
            children: [
              if (show)
                for (var i = 0; i < widget.actions.length; i++)
                  Positioned(
                    right: 28 + radius * math.cos(arcStart + step * i),
                    bottom: 28 + radius * math.sin(arcStart + step * i),
                    child: widget.actions[i],
                  ),
              if (show && widget.mainActionSlot != null)
                Positioned(
                  right: 28 + radius * 0.72,
                  bottom: 28 + radius * 0.72,
                  child: widget.mainActionSlot!,
                ),
              Positioned(right: 0, bottom: 0, child: widget.trigger),
            ],
          ),
        ),
      ),
    );
  }
}

/// Label + action row used in speed dial demos (fab-close).
class WashFabClose extends StatelessWidget {
  const WashFabClose({required this.label, required this.child, super.key});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(label,
            style:
                WashTypography.label(tokens.onSurface).copyWith(fontSize: 13)),
        const SizedBox(width: 8),
        child,
      ],
    );
  }
}

/// Label + primary action when dial is open (fab-main-action).
class WashFabMainAction extends StatelessWidget {
  const WashFabMainAction({this.label, required this.child, super.key});

  final String? label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (label == null) return child;
    final tokens = WashTokens.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(label!,
            style:
                WashTypography.label(tokens.onSurface).copyWith(fontSize: 13)),
        const SizedBox(width: 8),
        child,
      ],
    );
  }
}

/// Text label beside a dial action (section 04).
class WashFabLabeledAction extends StatelessWidget {
  const WashFabLabeledAction(
      {required this.label, required this.child, super.key});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(label,
            style:
                WashTypography.label(tokens.onSurface).copyWith(fontSize: 13)),
        const SizedBox(width: 4),
        child,
      ],
    );
  }
}

class WashFabClassLabel extends StatelessWidget {
  const WashFabClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text(
        value,
        style: const TextStyle(
            fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
      ),
    );
  }
}

/// Tooltip wrapper with left preference for FAB actions.
class WashFabTooltip extends StatelessWidget {
  const WashFabTooltip({
    required this.message,
    required this.child,
    super.key,
  });

  final String message;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return WashTooltip(
      message: message,
      prefer: WashTooltipSide.left,
      child: child,
    );
  }
}

/// Circle FAB action used across gallery sections.
class WashFabCircleButton extends StatelessWidget {
  const WashFabCircleButton({
    required this.onPressed,
    this.variant = WashButtonVariant.primary,
    this.icon = 'plus',
    this.label,
    this.size = WashButtonSize.lg,
    this.soft = false,
    this.outline = false,
    this.dash = false,
    this.ghost = false,
    this.child,
    super.key,
  });

  final VoidCallback? onPressed;
  final WashButtonVariant variant;
  final String icon;
  final String? label;
  final WashButtonSize size;
  final bool soft;
  final bool outline;
  final bool dash;
  final bool ghost;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final iconSize =
        size == WashButtonSize.xs || size == WashButtonSize.sm ? 16.0 : 24.0;
    final stroke =
        size == WashButtonSize.xs || size == WashButtonSize.sm ? 2.0 : 1.75;
    final resolved = ghost
        ? WashButtonVariant.ghost
        : (outline ? WashButtonVariant.outline : variant);
    return WashButton(
      onPressed: onPressed,
      variant: resolved,
      size: size,
      circle: true,
      soft: soft,
      dash: dash,
      label: label,
      child: child ??
          WashLucideIcon(icon,
              size: iconSize, strokeWidth: label == null ? 2 : stroke),
    );
  }
}

/// Single primary FAB for compact legacy previews.
class WashFabPrimary extends StatelessWidget {
  const WashFabPrimary({required this.onPressed, super.key});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return WashFabStage(
      height: 120,
      child: WashFab(
        trigger: WashFabCircleButton(
          variant: WashButtonVariant.primary,
          label: 'New',
          onPressed: onPressed,
        ),
      ),
    );
  }
}
