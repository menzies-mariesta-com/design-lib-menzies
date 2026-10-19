import 'dart:ui' as ui;

import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../tokens/wash_atmosphere.g.dart';
import '../tokens/wash_tokens.dart';

/// Default brush tokens from web `index.css` (:root).
class WashBrushTokens {
  const WashBrushTokens({
    this.opacity = 0.78,
    this.flow = 0.7,
    this.water = 0.45,
    this.grainOpacity = 0.45,
  });

  final double opacity;
  final double flow;
  final double water;
  final double grainOpacity;

  static const WashBrushTokens defaults = WashBrushTokens();
}

class WashAtmosphereShader {
  WashAtmosphereShader._();

  static ui.FragmentProgram? _program;
  static bool _loadFailed = false;

  static Future<void> ensureLoaded() async {
    if (_program != null || _loadFailed) return;
    try {
      _program = await ui.FragmentProgram.fromAsset(
        'packages/menzies_design_wash_ui/shaders/wash_atmosphere.frag',
      );
    } catch (_) {
      try {
        _program = await ui.FragmentProgram.fromAsset(
          'shaders/wash_atmosphere.frag',
        );
      } catch (__) {
        _loadFailed = true;
      }
    }
  }

  static bool get isAvailable => _program != null;

  static ui.FragmentShader? createShader() {
    return _program?.fragmentShader();
  }
}

/// Full-bleed page atmosphere (page-wash + optional paper-grain) via GPU shader.
class WashAtmosphereLayer extends StatefulWidget {
  const WashAtmosphereLayer({
    required this.tokens,
    required this.atmosphere,
    this.grain = true,
    this.brush = WashBrushTokens.defaults,
    super.key,
  });

  final WashTokens tokens;
  final WashAtmosphereTokens atmosphere;
  final bool grain;
  final WashBrushTokens brush;

  @override
  State<WashAtmosphereLayer> createState() => _WashAtmosphereLayerState();
}

class _WashAtmosphereLayerState extends State<WashAtmosphereLayer> {
  @override
  void initState() {
    super.initState();
    WashAtmosphereShader.ensureLoaded().then((_) {
      if (mounted) setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final h = constraints.maxHeight;
        if (!w.isFinite || !h.isFinite || w <= 0 || h <= 0) {
          return const SizedBox.expand();
        }
        return CustomPaint(
          size: Size(w, h),
          painter: _WashAtmospherePainter(
            tokens: widget.tokens,
            atmo: widget.atmosphere,
            grain: widget.grain,
            brush: widget.brush,
            sizeBucket: _bucketSize(Size(w, h)),
          ),
        );
      },
    );
  }
}

Size _bucketSize(Size size) {
  const step = 64.0;
  return Size(
    (size.width / step).ceil() * step,
    (size.height / step).ceil() * step,
  );
}

class _WashAtmospherePainter extends CustomPainter {
  _WashAtmospherePainter({
    required this.tokens,
    required this.atmo,
    required this.grain,
    required this.brush,
    required this.sizeBucket,
  });

  final WashTokens tokens;
  final WashAtmosphereTokens atmo;
  final bool grain;
  final WashBrushTokens brush;
  final Size sizeBucket;

  static final Map<String, ui.Picture> _pictureCache = {};

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final cacheKey =
        '${tokens.pigmentId}_${tokens.mode.name}_${sizeBucket.width}x${sizeBucket.height}_$grain';

    if (WashAtmosphereShader.isAvailable) {
      final shader = WashAtmosphereShader.createShader();
      if (shader != null) {
        _bindUniforms(shader, size);
        final paint = Paint()..shader = shader;
        canvas.drawRect(rect, paint);
        return;
      }
    }

    final cached = _pictureCache[cacheKey];
    if (cached != null) {
      canvas.drawPicture(cached);
      return;
    }

    final recorder = ui.PictureRecorder();
    final c = Canvas(recorder);
    _paintFallback(c, size);
    final picture = recorder.endRecording();
    if (_pictureCache.length < 12) {
      _pictureCache[cacheKey] = picture;
    }
    canvas.drawPicture(picture);
  }

  void _bindUniforms(ui.FragmentShader shader, Size size) {
    var i = 0;
    shader.setFloat(i++, size.width);
    shader.setFloat(i++, size.height);
    shader.setFloat(i++, grain ? 1.0 : 0.0);
    i = _setColor(shader, i, tokens.surface);
    i = _setColor(shader, i, atmo.washA);
    i = _setColor(shader, i, atmo.washB);
    i = _setColor(shader, i, atmo.washC);
    i = _setColor(shader, i, tokens.primary);
    i = _setColor(shader, i, tokens.palette.accent);
    i = _setColor(shader, i, _paperFiber(tokens));
    i = _setColor(shader, i, _pigmentGrain(tokens));
    shader.setFloat(i++, brush.opacity);
    shader.setFloat(i++, brush.flow);
    shader.setFloat(i++, brush.water);
    shader.setFloat(i++, grain ? brush.grainOpacity : 0.0);
  }

  int _setColor(ui.FragmentShader shader, int index, Color c) {
    shader.setFloat(index++, c.r);
    shader.setFloat(index++, c.g);
    shader.setFloat(index++, c.b);
    shader.setFloat(index++, c.a);
    return index;
  }

  Color _paperFiber(WashTokens t) {
    return Color.alphaBlend(
      t.onSurface.withValues(alpha: 0.08),
      t.surface,
    );
  }

  Color _pigmentGrain(WashTokens t) {
    return Color.alphaBlend(
      t.primary.withValues(alpha: 0.35),
      t.onSurface.withValues(alpha: 0.25),
    );
  }

  void _paintFallback(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    canvas.drawRect(rect, Paint()..color = tokens.surface);
    void radial(Color color, Alignment align, double r, double a) {
      final center = align.alongSize(size);
      final paint = Paint()
        ..shader = ui.Gradient.radial(
          center,
          size.shortestSide * r,
          [color.withValues(alpha: a), color.withValues(alpha: 0)],
        );
      canvas.drawRect(rect, paint);
    }
    radial(atmo.washA, Alignment.topLeft, 0.9, 0.35);
    radial(atmo.washB, Alignment.centerRight, 0.75, 0.3);
    radial(atmo.washC, Alignment.bottomLeft, 0.65, 0.28);
    radial(atmo.washA, const Alignment(0.4, 0.45), 0.4, 0.15);
  }

  @override
  bool shouldRepaint(covariant _WashAtmospherePainter oldDelegate) {
    return oldDelegate.tokens.pigmentId != tokens.pigmentId ||
        oldDelegate.tokens.mode != tokens.mode ||
        oldDelegate.grain != grain ||
        oldDelegate.sizeBucket != sizeBucket ||
        oldDelegate.atmo.washA != atmo.washA;
  }
}
