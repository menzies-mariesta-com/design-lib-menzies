import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `swap-rotate` / `swap-flip` motion.
enum WashSwapEffect { none, rotate, flip }

/// Checkbox analog: off (`swap-off`), on (`swap-on`), mixed (`swap-indeterminate`).
enum WashSwapState { off, on, mixed }

/// daisyUI `swap`: stacked on/off (and optional indeterminate) with rotate or flip.
class WashSwap extends StatefulWidget {
  const WashSwap({
    required this.onChild,
    required this.offChild,
    this.indeterminateChild,
    this.value,
    this.initialState = WashSwapState.off,
    this.onChanged,
    this.effect = WashSwapEffect.none,
    this.tappable = true,
    this.enabled = true,
    this.semanticLabel,
    super.key,
  });

  final Widget onChild;
  final Widget offChild;
  final Widget? indeterminateChild;
  final WashSwapState? value;
  final WashSwapState initialState;
  final ValueChanged<WashSwapState>? onChanged;
  final WashSwapEffect effect;
  final bool tappable;
  final bool enabled;
  final String? semanticLabel;

  @override
  State<WashSwap> createState() => _WashSwapState();
}

class _WashSwapState extends State<WashSwap> {
  late WashSwapState _state = widget.initialState;

  WashSwapState get _resolved => widget.value ?? _state;

  void _toggle() {
    if (!widget.enabled) return;
    final next = switch (_resolved) {
      WashSwapState.mixed => WashSwapState.on,
      WashSwapState.on => WashSwapState.off,
      WashSwapState.off => WashSwapState.on,
    };
    if (widget.value == null) {
      setState(() => _state = next);
    }
    widget.onChanged?.call(next);
  }

  @override
  void didUpdateWidget(covariant WashSwap oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value == null && oldWidget.value != null) {
      _state = oldWidget.value!;
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = _resolved;
    final reduce = WashReducedMotion.of(context);
    final duration = reduce ? Duration.zero : const Duration(milliseconds: 200);
    const curve = Curves.easeInOut;
    final mixed =
        state == WashSwapState.mixed && widget.indeterminateChild != null;
    final showOn = state == WashSwapState.on;
    final showOff = state == WashSwapState.off ||
        (state == WashSwapState.mixed && widget.indeterminateChild == null);
    final showMixed = mixed;

    Widget stack = Stack(
      alignment: Alignment.center,
      children: [
        _SwapFace(
          visible: showOff,
          duration: duration,
          curve: curve,
          effect: widget.effect,
          role: _SwapFaceRole.off,
          child: widget.offChild,
        ),
        _SwapFace(
          visible: showOn,
          duration: duration,
          curve: curve,
          effect: widget.effect,
          role: _SwapFaceRole.on,
          child: widget.onChild,
        ),
        if (widget.indeterminateChild != null)
          _SwapFace(
            visible: showMixed,
            duration: duration,
            curve: curve,
            effect: WashSwapEffect.none,
            role: _SwapFaceRole.mixed,
            child: widget.indeterminateChild!,
          ),
      ],
    );

    stack = Semantics(
      button: widget.tappable && widget.enabled,
      enabled: widget.enabled,
      checked: state == WashSwapState.on,
      mixed: state == WashSwapState.mixed,
      label: widget.semanticLabel,
      child: stack,
    );

    if (!widget.tappable || !widget.enabled) {
      return MouseRegion(
        cursor: widget.enabled
            ? SystemMouseCursors.basic
            : SystemMouseCursors.forbidden,
        child: stack,
      );
    }

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: _toggle,
        behavior: HitTestBehavior.opaque,
        child: stack,
      ),
    );
  }
}

enum _SwapFaceRole { off, on, mixed }

class _SwapFace extends StatefulWidget {
  const _SwapFace({
    required this.visible,
    required this.duration,
    required this.curve,
    required this.effect,
    required this.role,
    required this.child,
  });

  final bool visible;
  final Duration duration;
  final Curve curve;
  final WashSwapEffect effect;
  final _SwapFaceRole role;
  final Widget child;

  @override
  State<_SwapFace> createState() => _SwapFaceState();
}

class _SwapFaceState extends State<_SwapFace>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: widget.duration,
    value: widget.visible ? 1 : 0,
  );

  late CurvedAnimation _curved = CurvedAnimation(
    parent: _controller,
    curve: widget.curve,
  );

  @override
  void didUpdateWidget(covariant _SwapFace oldWidget) {
    super.didUpdateWidget(oldWidget);
    _controller.duration = widget.duration;
    if (widget.curve != oldWidget.curve) {
      _curved.dispose();
      _curved = CurvedAnimation(parent: _controller, curve: widget.curve);
    }
    if (widget.visible != oldWidget.visible) {
      if (widget.visible) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _curved.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      ignoring: !widget.visible,
      child: FadeTransition(
        opacity: _curved,
        child: AnimatedBuilder(
          animation: _curved,
          builder: (context, child) {
            return Transform(
              alignment: Alignment.center,
              transform: _transform(_curved.value),
              child: child,
            );
          },
          child: widget.child,
        ),
      ),
    );
  }

  Matrix4 _transform(double t) {
    switch (widget.effect) {
      case WashSwapEffect.none:
        return Matrix4.identity();
      case WashSwapEffect.rotate:
        return Matrix4.rotationZ((math.pi / 4) * (1 - t));
      case WashSwapEffect.flip:
        final dir = widget.role == _SwapFaceRole.off ? -1.0 : 1.0;
        return Matrix4.identity()
          ..setEntry(3, 2, 0.001)
          ..rotateY(dir * math.pi * (1 - t));
    }
  }
}

/// Monospace class hint (`swap`, `swap swap-rotate`, …).
String washSwapClassLabel({
  WashSwapEffect effect = WashSwapEffect.none,
  bool active = false,
}) {
  final parts = <String>['swap'];
  switch (effect) {
    case WashSwapEffect.none:
      break;
    case WashSwapEffect.rotate:
      parts.add('swap-rotate');
      break;
    case WashSwapEffect.flip:
      parts.add('swap-flip');
      break;
  }
  if (active) parts.add('swap-active');
  return parts.join(' ');
}

class WashSwapClassLabel extends StatelessWidget {
  const WashSwapClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'swap' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}
