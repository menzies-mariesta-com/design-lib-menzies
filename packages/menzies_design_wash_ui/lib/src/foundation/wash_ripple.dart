import 'dart:math' as math;

import 'package:flutter/gestures.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../tokens/wash_tokens.dart';
import 'reduced_motion.dart';

/// Matches web `RippleOrigin`.
enum WashRippleOrigin { pointer, center }

/// Matches web tint helpers: `ripple-primary`, `ripple-ink`, etc.
enum WashRippleTint { inherit, ink, primary, secondary, accent }

const _kRippleDurationMs = 620.0;
const _kRippleOpacity = 0.42;
const _kBrushRippleScale = 1.0;

Color washResolveRippleColor(
  WashTokens tokens, {
  WashRippleTint tint = WashRippleTint.inherit,
  Color? foreground,
  Color? override,
}) {
  if (override != null) return override;
  final p = tokens.palette;
  switch (tint) {
    case WashRippleTint.primary:
      return p.primary.withValues(alpha: 0.34);
    case WashRippleTint.secondary:
      return p.secondary.withValues(alpha: 0.34);
    case WashRippleTint.accent:
      return p.accent.withValues(alpha: 0.34);
    case WashRippleTint.ink:
      return p.baseContent.withValues(alpha: 0.22);
    case WashRippleTint.inherit:
      final fg = foreground ?? tokens.onSurface;
      return fg.withValues(alpha: 0.28);
  }
}

/// Soft wash bloom on press (web `.ripple` / `spawnRipple`).
class WashRipple extends StatefulWidget {
  const WashRipple({
    required this.child,
    this.onTap,
    this.borderRadius = 16,
    this.enabled = true,
    this.origin = WashRippleOrigin.pointer,
    this.tint = WashRippleTint.inherit,
    this.rippleColor,
    this.foregroundColor,
    this.durationMs = _kRippleDurationMs,
    this.brushScale = _kBrushRippleScale,
    this.semanticButton = false,
    super.key,
  });

  final Widget child;
  final VoidCallback? onTap;
  final double borderRadius;
  final bool enabled;
  final WashRippleOrigin origin;
  final WashRippleTint tint;
  final Color? rippleColor;
  final Color? foregroundColor;
  final double durationMs;
  final double brushScale;

  /// When true, handles Enter/Space like a button host (center-origin bloom).
  final bool semanticButton;

  @override
  State<WashRipple> createState() => _WashRippleState();
}

class _Wave {
  _Wave({
    required this.left,
    required this.top,
    required this.size,
    required this.startedAt,
  });

  final double left;
  final double top;
  final double size;
  final Duration startedAt;
}

class _WashRippleState extends State<WashRipple> with SingleTickerProviderStateMixin {
  final List<_Wave> _waves = [];
  late Ticker _ticker;
  Duration _elapsed = Duration.zero;

  @override
  void initState() {
    super.initState();
    _ticker = createTicker(_onTick);
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  void _onTick(Duration elapsed) {
    _elapsed = elapsed;
    final now = elapsed;
    _waves.removeWhere((w) {
      final ageMs = (now - w.startedAt).inMilliseconds;
      return ageMs > widget.durationMs + 40;
    });
    if (_waves.isEmpty) {
      _ticker.stop();
    }
    setState(() {});
  }

  bool get _interactive => widget.enabled && (widget.onTap != null || widget.semanticButton);

  void _spawnAt(Offset? localPosition) {
    if (!_interactive || WashReducedMotion.of(context)) return;
    final box = context.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return;

    final size = box.size;
    final waveSize = math.max(size.width, size.height) * 2 * widget.brushScale;

    double left;
    double top;
    final useCenter = widget.origin == WashRippleOrigin.center || localPosition == null;
    if (useCenter) {
      left = size.width / 2 - waveSize / 2;
      top = size.height / 2 - waveSize / 2;
    } else {
      left = localPosition.dx - waveSize / 2;
      top = localPosition.dy - waveSize / 2;
    }

    _waves.add(
      _Wave(
        left: left,
        top: top,
        size: waveSize,
        startedAt: _elapsed,
      ),
    );
    if (!_ticker.isActive) {
      _ticker.start();
    }
    setState(() {});
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (!_interactive || WashReducedMotion.of(context)) {
      return KeyEventResult.ignored;
    }
    if (event is KeyRepeatEvent) return KeyEventResult.handled;
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    if (event.logicalKey != LogicalKeyboardKey.enter &&
        event.logicalKey != LogicalKeyboardKey.space) {
      return KeyEventResult.ignored;
    }
    _spawnAt(null);
    widget.onTap?.call();
    return KeyEventResult.handled;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final rippleColor = washResolveRippleColor(
      tokens,
      tint: widget.tint,
      foreground: widget.foregroundColor,
      override: widget.rippleColor,
    );
    final disabled = !_interactive;

    Widget content = ClipRRect(
      borderRadius: BorderRadius.circular(widget.borderRadius),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        fit: StackFit.passthrough,
        children: [
          widget.child,
          Positioned.fill(
            child: IgnorePointer(
              child: CustomPaint(
                painter: _RippleWavePainter(
                  waves: _waves,
                  elapsed: _elapsed,
                  color: rippleColor,
                  durationMs: widget.durationMs,
                ),
              ),
            ),
          ),
        ],
      ),
    );

    content = Listener(
      behavior: HitTestBehavior.deferToChild,
      onPointerDown: disabled
          ? null
          : (event) {
              if (event.buttons != kPrimaryMouseButton &&
                  event.kind == PointerDeviceKind.mouse) {
                return;
              }
              _spawnAt(event.localPosition);
            },
      child: GestureDetector(
        onTap: disabled ? null : widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: content,
      ),
    );

    if (widget.semanticButton || widget.onTap != null) {
      content = Focus(
        onKeyEvent: _onKey,
        child: content,
      );
    }

    return MouseRegion(
      cursor: disabled ? SystemMouseCursors.forbidden : SystemMouseCursors.click,
      child: content,
    );
  }
}

class _RippleWavePainter extends CustomPainter {
  _RippleWavePainter({
    required this.waves,
    required this.elapsed,
    required this.color,
    required this.durationMs,
  });

  final List<_Wave> waves;
  final Duration elapsed;
  final Color color;
  final double durationMs;

  @override
  void paint(Canvas canvas, Size size) {
    for (final wave in waves) {
      final ageMs = (elapsed - wave.startedAt).inMilliseconds;
      if (ageMs < 0) continue;
      final t = (ageMs / durationMs).clamp(0.0, 1.0);
      final curved = Curves.easeOut.transform(t);
      final scale = curved;
      final opacity = _kRippleOpacity * (1 - curved);
      if (opacity <= 0) continue;

      final center = Offset(
        wave.left + wave.size / 2,
        wave.top + wave.size / 2,
      );
      final radius = wave.size / 2 * scale;
      final paint = Paint()
        ..color = color.withValues(alpha: opacity)
        ..isAntiAlias = true;
      canvas.drawCircle(center, radius, paint);
    }
  }

  @override
  bool shouldRepaint(covariant _RippleWavePainter old) =>
      old.waves != waves || old.elapsed != elapsed || old.color != color;
}
