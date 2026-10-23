import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';

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
    i = _setColor(shader, i, atmo.paperFiber);
    i = _setColor(shader, i, atmo.pigmentGrain);
    shader.setFloat(
      i++,
      tokens.mode == WashThemeMode.dark ? 1.0 : 0.0,
    );
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

  void _paintFallback(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    canvas.drawRect(rect, Paint()..color = tokens.surface);

    void ellipse(
      Color color,
      Offset center,
      double rx,
      double ry,
      double alpha,
      double stop,
    ) {
      canvas.save();
      canvas.translate(size.width * center.dx, size.height * center.dy);
      canvas.scale(size.width * rx, size.height * ry);
      final paint = Paint()
        ..shader = ui.Gradient.radial(
          Offset.zero,
          1,
          [color.withValues(alpha: alpha), color.withValues(alpha: 0)],
          [0, stop],
          TileMode.clamp,
        );
      canvas.drawRect(const Rect.fromLTRB(-1, -1, 1, 1), paint);
      canvas.restore();
    }

    // Reverse the CSS list so the first web gradient paints on top.
    ellipse(atmo.washA, const Offset(0.40, 0.45), 0.40, 0.30, 0.28, 0.70);
    ellipse(
      atmo.washC,
      const Offset(0.72, 1),
      0.55,
      0.40,
      0.42 + brush.water * 0.35,
      0.58,
    );
    ellipse(
      atmo.washB,
      const Offset(0.96, 0.04),
      0.70,
      0.45,
      0.50 + brush.flow * 0.30,
      0.52,
    );
    ellipse(
      atmo.washA,
      const Offset(0.06, -0.05),
      0.80 + brush.water * 0.002,
      0.50 + brush.flow * 0.001,
      0.55 + brush.opacity * 0.30,
      0.58,
    );

    if (grain) _paintGrainFallback(canvas, size);
  }

  void _paintGrainFallback(Canvas canvas, Size size) {
    final blend = tokens.mode == WashThemeMode.dark
        ? BlendMode.softLight
        : BlendMode.multiply;
    final opacity = brush.grainOpacity;

    void dots(
      double tile,
      Offset centerFrac,
      double radius,
      Color color,
      double alpha,
    ) {
      final paint = Paint()
        ..blendMode = blend
        ..color = color.withValues(alpha: alpha * opacity);
      for (double x = 0; x < size.width + tile; x += tile) {
        for (double y = 0; y < size.height + tile; y += tile) {
          canvas.drawCircle(
            Offset(x + tile * centerFrac.dx, y + tile * centerFrac.dy),
            radius,
            paint,
          );
        }
      }
    }

    dots(160, const Offset(0.88, 0.64), 0.5, tokens.palette.accent, 0.20);
    dots(200, const Offset(0.42, 0.78), 0.7, tokens.primary, 0.22);
    dots(140, const Offset(0.68, 0.32), 0.5, tokens.onSurface, 0.10);
    dots(180, const Offset(0.12, 0.18), 0.6, atmo.pigmentGrain, 0.35);

    final fiber = Paint()
      ..blendMode = blend
      ..color = atmo.paperFiber.withValues(alpha: 0.55 * opacity)
      ..strokeWidth = 1;
    const direction = Offset(0.9659258, 0.2588190);
    const normal = Offset(-0.2588190, 0.9659258);
    final reach = size.width + size.height;
    for (double k = -reach; k <= reach; k += 12) {
      final point = direction * (k + 3.5);
      canvas.drawLine(
        point - normal * reach,
        point + normal * reach,
        fiber,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _WashAtmospherePainter oldDelegate) {
    return oldDelegate.tokens.pigmentId != tokens.pigmentId ||
        oldDelegate.tokens.mode != tokens.mode ||
        oldDelegate.grain != grain ||
        oldDelegate.sizeBucket != sizeBucket ||
        oldDelegate.atmo.washA != atmo.washA ||
        oldDelegate.atmo.washB != atmo.washB ||
        oldDelegate.atmo.washC != atmo.washC ||
        oldDelegate.atmo.paperFiber != atmo.paperFiber ||
        oldDelegate.atmo.pigmentGrain != atmo.pigmentGrain;
  }
}
