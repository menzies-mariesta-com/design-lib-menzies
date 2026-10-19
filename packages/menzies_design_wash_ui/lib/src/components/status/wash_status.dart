import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `status-*` tones.
enum WashStatusVariant {
  defaultVariant,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

/// daisyUI `status-xs` through `status-xl`.
enum WashStatusSize { xs, sm, md, lg, xl }

/// Tailwind motion used on the Status gallery (`animate-ping`, `animate-bounce`).
enum WashStatusMotion { none, ping, bounce }

/// Diameter in logical px from daisyUI `--size-selector` (0.25rem = 4px).
double washStatusDiameter(WashStatusSize size) {
  const selector = 4.0;
  return switch (size) {
    WashStatusSize.xs => selector * 0.5,
    WashStatusSize.sm => selector * 1,
    WashStatusSize.md => selector * 2,
    WashStatusSize.lg => selector * 3,
    WashStatusSize.xl => selector * 4,
  };
}

Color washStatusFill(WashTokens tokens, WashStatusVariant variant) {
  final p = tokens.palette;
  return switch (variant) {
    WashStatusVariant.defaultVariant => p.baseContent.withValues(alpha: 0.2),
    WashStatusVariant.neutral => p.neutral,
    WashStatusVariant.primary => p.primary,
    WashStatusVariant.secondary => p.secondary,
    WashStatusVariant.accent => p.accent,
    WashStatusVariant.info => p.info,
    WashStatusVariant.success => p.success,
    WashStatusVariant.warning => p.warning,
    WashStatusVariant.error => p.error,
  };
}

/// Monospace class hint (`status status-primary status-xs`, …).
String washStatusClassLabel({
  WashStatusVariant variant = WashStatusVariant.defaultVariant,
  WashStatusSize? size,
  WashStatusMotion motion = WashStatusMotion.none,
}) {
  final parts = <String>['status'];
  switch (variant) {
    case WashStatusVariant.defaultVariant:
      break;
    case WashStatusVariant.neutral:
      parts.add('status-neutral');
    case WashStatusVariant.primary:
      parts.add('status-primary');
    case WashStatusVariant.secondary:
      parts.add('status-secondary');
    case WashStatusVariant.accent:
      parts.add('status-accent');
    case WashStatusVariant.info:
      parts.add('status-info');
    case WashStatusVariant.success:
      parts.add('status-success');
    case WashStatusVariant.warning:
      parts.add('status-warning');
    case WashStatusVariant.error:
      parts.add('status-error');
  }
  if (size != null) {
    parts.add('status-${size.name}');
  }
  switch (motion) {
    case WashStatusMotion.none:
      break;
    case WashStatusMotion.ping:
      parts.add('animate-ping');
    case WashStatusMotion.bounce:
      parts.add('animate-bounce');
  }
  return parts.join(' ');
}

class WashStatusClassLabel extends StatelessWidget {
  const WashStatusClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'status' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// daisyUI `status` presence dot.
class WashStatus extends StatelessWidget {
  const WashStatus({
    this.variant = WashStatusVariant.defaultVariant,
    this.size = WashStatusSize.md,
    this.motion = WashStatusMotion.none,
    this.semanticLabel,
    super.key,
  });

  final WashStatusVariant variant;
  final WashStatusSize size;
  final WashStatusMotion motion;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final diameter = washStatusDiameter(size);
    final fill = washStatusFill(tokens, variant);
    final reduce = WashReducedMotion.of(context);
    final motion = reduce ? WashStatusMotion.none : this.motion;

    Widget dot = _WashStatusDot(diameter: diameter, fill: fill);

    if (motion == WashStatusMotion.ping) {
      dot = SizedBox(
        width: diameter,
        height: diameter,
        child: Stack(
          alignment: Alignment.center,
          clipBehavior: Clip.none,
          children: [
            _WashStatusPing(diameter: diameter, fill: fill),
            _WashStatusDot(diameter: diameter, fill: fill),
          ],
        ),
      );
    } else if (motion == WashStatusMotion.bounce) {
      dot = _WashStatusBounce(diameter: diameter, child: dot);
    }

    return MouseRegion(
      cursor: SystemMouseCursors.basic,
      child: Semantics(
        label: semanticLabel,
        child: dot,
      ),
    );
  }
}

class _WashStatusDot extends StatelessWidget {
  const _WashStatusDot({required this.diameter, required this.fill});

  final double diameter;
  final Color fill;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: diameter,
      height: diameter,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          center: const Alignment(-0.3, -0.4),
          radius: 0.95,
          colors: [
            const Color(0xFFFFFFFF).withValues(alpha: 0.45),
            fill,
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: fill.withValues(alpha: 0.45),
            offset: const Offset(0, 2),
            blurRadius: 3,
            spreadRadius: -1,
          ),
        ],
      ),
    );
  }
}

class _WashStatusPing extends StatefulWidget {
  const _WashStatusPing({required this.diameter, required this.fill});

  final double diameter;
  final Color fill;

  @override
  State<_WashStatusPing> createState() => _WashStatusPingState();
}

class _WashStatusPingState extends State<_WashStatusPing>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: Tween<double>(begin: 1, end: 0).animate(
        CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.75, 1, curve: Curves.linear),
        ),
      ),
      child: ScaleTransition(
        scale: Tween<double>(begin: 1, end: 2).animate(
          CurvedAnimation(
            parent: _controller,
            curve: const Interval(0, 0.75, curve: Cubic(0, 0, 0.2, 1)),
          ),
        ),
        child: _WashStatusDot(diameter: widget.diameter, fill: widget.fill),
      ),
    );
  }
}

class _WashStatusBounce extends StatefulWidget {
  const _WashStatusBounce({required this.diameter, required this.child});

  final double diameter;
  final Widget child;

  @override
  State<_WashStatusBounce> createState() => _WashStatusBounceState();
}

class _WashStatusBounceState extends State<_WashStatusBounce>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      child: widget.child,
      builder: (context, child) {
        final t = _controller.value;
        final down = t < 0.5;
        final local = down ? t * 2 : (t - 0.5) * 2;
        final curve = down
            ? const Cubic(0.8, 0, 1, 1)
            : const Cubic(0, 0, 0.2, 1);
        final y = down
            ? -0.25 * curve.transform(local)
            : -0.25 * (1 - curve.transform(local));
        return Transform.translate(
          offset: Offset(0, y * widget.diameter),
          child: child,
        );
      },
    );
  }
}
