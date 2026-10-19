import 'dart:math' as math;
import 'dart:ui' show lerpDouble;

import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';

/// daisyUI `hover-3d`: eight invisible zones tilt the first child toward the pointer.
class WashHover3d extends StatefulWidget {
  const WashHover3d({
    required this.child,
    this.flat = false,
    this.onTap,
    super.key,
  });

  final Widget child;

  /// When true, matches web `hover-3d-safe` (always flat).
  final bool flat;

  final VoidCallback? onTap;

  @override
  State<WashHover3d> createState() => _WashHover3dState();
}

class _WashHover3dState extends State<WashHover3d>
    with SingleTickerProviderStateMixin {
  static const _perspective = 1200.0;
  static const _tiltDeg = 10.0;
  static const _hoverScale = 1.05;

  /// Axis (tx, ty) for rotate3d, shadow rem offset, shine grid (0..2).
  static const _zones = <(double tx, double ty, double sx, double sy, double gx, double gy)>[
    (-1, 1, -0.5, -0.5, 0, 0),
    (-1, 0, 0, -0.5, 1, 0),
    (-1, -1, 0.5, -0.5, 2, 0),
    (0, 1, -0.5, 0, 0, 1),
    (0, -1, 0.5, 0, 2, 1),
    (1, 1, -0.5, 0.5, 0, 2),
    (1, 0, 0, 0.5, 1, 2),
    (1, -1, 0.5, 0.5, 2, 2),
  ];

  late final AnimationController _motion;
  double _fromRx = 0;
  double _fromRy = 0;
  double _fromScale = 1;
  double _rx = 0;
  double _ry = 0;
  double _scale = 1;
  double _glare = 0;
  double _shadowX = 0;
  double _shadowY = 0;
  double _shineX = 1;
  double _shineY = 1;

  bool _inside = false;

  bool _motionEnabled(BuildContext context) {
    return !widget.flat && !WashReducedMotion.of(context);
  }

  @override
  void initState() {
    super.initState();
    _motion = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..addListener(_tick);
  }

  @override
  void dispose() {
    _motion.dispose();
    super.dispose();
  }

  void _tick() {
    final t = Curves.easeOutCubic.transform(_motion.value);
    setState(() {
      _rx = lerpDouble(_fromRx, _targetRx, t)!;
      _ry = lerpDouble(_fromRy, _targetRy, t)!;
      _scale = lerpDouble(_fromScale, _targetScale, t)!;
      _glare = lerpDouble(_fromGlare, _targetGlare, t)!;
      _shadowX = lerpDouble(_fromShadowX, _targetShadowX, t)!;
      _shadowY = lerpDouble(_fromShadowY, _targetShadowY, t)!;
      _shineX = lerpDouble(_fromShineX, _targetShineX, t)!;
      _shineY = lerpDouble(_fromShineY, _targetShineY, t)!;
    });
  }

  double _targetRx = 0;
  double _targetRy = 0;
  double _targetScale = 1;
  double _targetGlare = 0;
  double _targetShadowX = 0;
  double _targetShadowY = 0;
  double _targetShineX = 1;
  double _targetShineY = 1;

  double _fromGlare = 0;
  double _fromShadowX = 0;
  double _fromShadowY = 0;
  double _fromShineX = 1;
  double _fromShineY = 1;

  void _animateToTargets() {
    _fromRx = _rx;
    _fromRy = _ry;
    _fromScale = _scale;
    _fromGlare = _glare;
    _fromShadowX = _shadowX;
    _fromShadowY = _shadowY;
    _fromShineX = _shineX;
    _fromShineY = _shineY;
    _motion.forward(from: 0);
  }

  void _applyZone(int? zone, bool inside, BuildContext context) {
    if (!_motionEnabled(context)) {
      setState(() {
        _inside = inside;
        _rx = 0;
        _ry = 0;
        _scale = 1;
        _glare = 0;
      });
      return;
    }
    _inside = inside;
    if (zone != null) {
      final z = _zones[zone];
      _targetRy = z.$1 * _tiltDeg * math.pi / 180;
      _targetRx = -z.$2 * _tiltDeg * math.pi / 180;
      _targetShadowX = z.$3 * 8;
      _targetShadowY = z.$4 * 8;
      _targetShineX = z.$5;
      _targetShineY = z.$6;
      _targetGlare = 1;
    } else {
      _targetRx = 0;
      _targetRy = 0;
      _targetShadowX = 0;
      _targetShadowY = 0;
      _targetShineX = 1;
      _targetShineY = 1;
      _targetGlare = inside ? 0.35 : 0;
    }
    _targetScale = inside ? _hoverScale : 1;
    _animateToTargets();
  }

  Matrix4 _transformMatrix() {
    final m = Matrix4.identity();
    if (_motionEnabled(context)) {
      m.setEntry(3, 2, 1 / _perspective);
    }
    m.rotateX(_rx);
    m.rotateY(_ry);
    m.scaleByDouble(_scale, _scale, _scale, 1);
    return m;
  }

  int? _zoneIndex(int row, int col) {
    if (row == 0 && col == 0) return 0;
    if (row == 0 && col == 1) return 1;
    if (row == 0 && col == 2) return 2;
    if (row == 1 && col == 0) return 3;
    if (row == 1 && col == 2) return 4;
    if (row == 2 && col == 0) return 5;
    if (row == 2 && col == 1) return 6;
    if (row == 2 && col == 2) return 7;
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final motion = _motionEnabled(context);
    final shadows = motion && _inside
        ? [
            BoxShadow(
              color: const Color(0x03000000),
              offset: Offset(_shadowX * 0.2, _shadowY * 0.2),
              blurRadius: 0.4,
            ),
            BoxShadow(
              color: const Color(0x03000000),
              offset: Offset(_shadowX * 0.4, _shadowY * 0.4),
              blurRadius: 0.8,
            ),
            BoxShadow(
              color: const Color(0x03000000),
              offset: Offset(_shadowX * 0.6, _shadowY * 0.6),
              blurRadius: 1.2,
            ),
            BoxShadow(
              color: const Color(0x03000000),
              offset: Offset(_shadowX, _shadowY),
              blurRadius: 1.6,
            ),
          ]
        : const <BoxShadow>[];

    Widget stack = MouseRegion(
      onExit: (_) => _applyZone(null, false, context),
      child: Stack(
      clipBehavior: Clip.none,
      children: [
        DecoratedBox(
          decoration: BoxDecoration(boxShadow: shadows),
          child: Transform(
            alignment: Alignment.center,
            transform: motion ? _transformMatrix() : Matrix4.identity(),
            child: ClipRect(
              child: Stack(
                clipBehavior: Clip.hardEdge,
                children: [
                  widget.child,
                  if (motion && _glare > 0.01)
                    Positioned.fill(
                      child: IgnorePointer(
                        child: Opacity(
                          opacity: _glare.clamp(0, 1) * 0.55,
                          child: Align(
                            alignment: Alignment(
                              -1 + _shineX,
                              -1 + _shineY,
                            ),
                            child: FractionallySizedBox(
                              widthFactor: 0.33,
                              heightFactor: 0.33,
                              child: Transform.scale(
                                scale: 5,
                                child: DecoratedBox(
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    gradient: RadialGradient(
                                      colors: [
                                        const Color(0x33FFFFFF),
                                        const Color(0x00FFFFFF),
                                      ],
                                      stops: const [0.1, 0.5],
                                    ),
                                  ),
                                ),
                              ),
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
        Positioned.fill(
          child: Column(
            children: List.generate(3, (row) {
              return Expanded(
                child: Row(
                  children: List.generate(3, (col) {
                    final zone = _zoneIndex(row, col);
                    return Expanded(
                      child: MouseRegion(
                        onEnter: (_) => _applyZone(zone, true, context),
                        child: const SizedBox.expand(),
                      ),
                    );
                  }),
                ),
              );
            }),
          ),
        ),
      ],
    ),
    );

    if (widget.onTap != null) {
      stack = MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: widget.onTap,
          behavior: HitTestBehavior.deferToChild,
          child: stack,
        ),
      );
    }

    return stack;
  }
}
