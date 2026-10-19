import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../tokens/wash_tokens.dart';
import 'reduced_motion.dart';

class WashRipple extends StatefulWidget {
  const WashRipple({
    required this.child,
    this.onTap,
    this.borderRadius = 16,
    this.enabled = true,
    super.key,
  });

  final Widget child;
  final VoidCallback? onTap;
  final double borderRadius;
  final bool enabled;

  @override
  State<WashRipple> createState() => _WashRippleState();
}

class _WashRippleState extends State<WashRipple> {
  Offset? _rippleOrigin;
  double _rippleRadius = 0;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final disabled = !widget.enabled || widget.onTap == null;
    return GestureDetector(
      onTap: disabled ? null : widget.onTap,
      onTapDown: disabled || WashReducedMotion.of(context)
          ? null
          : (d) {
              setState(() {
                _rippleOrigin = d.localPosition;
                _rippleRadius = 0;
              });
              WidgetsBinding.instance.addPostFrameCallback((_) {
                if (mounted) setState(() => _rippleRadius = 120);
              });
            },
      onTapUp: (_) => setState(() => _rippleOrigin = null),
      onTapCancel: () => setState(() => _rippleOrigin = null),
      behavior: HitTestBehavior.opaque,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(widget.borderRadius),
        child: Stack(
          fit: StackFit.passthrough,
          children: [
            widget.child,
            if (_rippleOrigin != null)
              Positioned.fill(
                child: CustomPaint(
                  painter: _RipplePainter(
                    origin: _rippleOrigin!,
                    radius: _rippleRadius,
                    color: tokens.primary.withValues(alpha: 0.25),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _RipplePainter extends CustomPainter {
  _RipplePainter({
    required this.origin,
    required this.radius,
    required this.color,
  });

  final Offset origin;
  final double radius;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawCircle(origin, radius, Paint()..color = color);
  }

  @override
  bool shouldRepaint(covariant _RipplePainter old) =>
      old.origin != origin || old.radius != radius;
}
