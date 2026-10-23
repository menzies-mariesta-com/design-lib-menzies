// Port of packages/menzies-design-wash-ui/src/lib/watercolorSplash.ts
// ignore_for_file: prefer_const_constructors, prefer_interpolation_to_compose_strings

import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/widgets.dart';
import 'package:path_parsing/path_parsing.dart';

import '../../tokens/wash_tokens.dart';

/// All procedural splash shape ids (parity with web `SPLASH_VARIANTS`).
const List<String> kWashSplashVariants = [
  'blob',
  'splash',
  'wash',
  'ring',
  'drip',
  'burst',
  'petal',
  'cloud',
  'puddle',
  'streak',
  'arc',
  'splatter',
  'feather',
  'wave',
  'ripple',
  'starburst',
  'comet',
  'smudge',
  'blot',
  'spray',
  'fan',
  'crescent',
  'teardrop',
  'cluster',
  'swirl',
  'blotchy',
  'streaky',
  'speckle',
  'halo',
  'notch',
  'shard',
  'bloom',
  'funnel',
  'tail',
  'crown',
  'island',
  'delta',
  'hook',
  'tendril',
  'crater',
];

const Set<String> kWashSplashEvenOddVariants = {
  'ring',
  'ripple',
  'halo',
  'crater',
  'notch',
  'crescent',
};

const int kWashMaxSplashColors = 8;

const List<String> kWashDefaultSplashColors = [
  'var(--wash-a)',
  'var(--wash-b)',
];

class WashWatercolorSplashConfig {
  const WashWatercolorSplashConfig({
    required this.seed,
    required this.variant,
    required this.colors,
    required this.opacity,
    required this.blur,
    required this.spread,
    required this.rotation,
    required this.size,
  });

  final int seed;
  final String variant;
  final List<String> colors;
  final double opacity;
  final double blur;
  final double spread;
  final double rotation;
  final double size;

  WashWatercolorSplashConfig copyWith({
    int? seed,
    String? variant,
    List<String>? colors,
    double? opacity,
    double? blur,
    double? spread,
    double? rotation,
    double? size,
  }) {
    return WashWatercolorSplashConfig(
      seed: seed ?? this.seed,
      variant: variant ?? this.variant,
      colors: colors ?? this.colors,
      opacity: opacity ?? this.opacity,
      blur: blur ?? this.blur,
      spread: spread ?? this.spread,
      rotation: rotation ?? this.rotation,
      size: size ?? this.size,
    );
  }
}

class _Pt {
  const _Pt({required this.x, required this.y});
  final double x;
  final double y;
}

int _imul(int a, int b) => (a * b) & 0xFFFFFFFF;
int _ifloor(double v) => v.floor();
double _clamp(double value, double min, double max) =>
    math.min(max, math.max(min, value));
double _lerp(double min, double max, double t) => min + (max - min) * t;

double Function() mulberry32(int seed) {
  var state = seed & 0xFFFFFFFF;
  return () {
    state = (state + 0x6D2B79F5) & 0xFFFFFFFF;
    var t = state;
    t = _imul(t ^ (t >> 15), t | 1) & 0xFFFFFFFF;
    t = (t ^ (t + _imul(t ^ (t >> 7), t | 61))) & 0xFFFFFFFF;
    return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296.0;
  };
}

String washSplashVariantLabel(String variant) {
  if (variant.isEmpty) return variant;
  return '${variant[0].toUpperCase()}${variant.substring(1)}';
}

List<String> normalizeSplashColors(List<String> colors) {
  final trimmed =
      colors.map((c) => c.trim()).where((c) => c.isNotEmpty).toList();
  if (trimmed.isEmpty) return List<String>.from(kWashDefaultSplashColors);
  return trimmed.take(kWashMaxSplashColors).toList();
}

String washColorToHex(Color c) {
  final r = (c.r * 255).round().clamp(0, 255).toRadixString(16).padLeft(2, '0');
  final g = (c.g * 255).round().clamp(0, 255).toRadixString(16).padLeft(2, '0');
  final b = (c.b * 255).round().clamp(0, 255).toRadixString(16).padLeft(2, '0');
  return '#$r$g$b';
}

List<String> themeSplashColors(
  int count, {
  required Color primary,
  required Color accent,
  required Color secondary,
}) {
  final size =
      _clamp(count.toDouble(), 1, kWashMaxSplashColors.toDouble()).floor();
  final fallback = [primary, accent, secondary];
  return List<String>.generate(
    size,
    (i) => washColorToHex(fallback[i % fallback.length]),
  );
}

WashWatercolorSplashConfig generateSplashConfig([int? seed]) {
  final resolved = seed ?? math.Random().nextInt(1000000);
  final rng = mulberry32(resolved);
  return WashWatercolorSplashConfig(
    seed: resolved,
    variant: kWashSplashVariants[_ifloor(rng() * kWashSplashVariants.length)],
    colors: List<String>.from(kWashDefaultSplashColors),
    opacity: _lerp(0.45, 0.88, rng()),
    blur: _lerp(6, 28, rng()),
    spread: _lerp(0.75, 1.35, rng()),
    rotation: _lerp(0, 360, rng()).floorToDouble(),
    size: _lerp(120, 320, rng()),
  );
}

WashWatercolorSplashConfig mergeSplashConfig(
  WashWatercolorSplashConfig base, {
  int? seed,
  String? variant,
  List<String>? colors,
  double? opacity,
  double? blur,
  double? spread,
  double? rotation,
  double? size,
}) {
  return WashWatercolorSplashConfig(
    seed: seed ?? base.seed,
    variant: variant ?? base.variant,
    colors: colors != null ? normalizeSplashColors(colors) : base.colors,
    opacity: opacity ?? base.opacity,
    blur: blur ?? base.blur,
    spread: spread ?? base.spread,
    rotation: rotation ?? base.rotation,
    size: size ?? base.size,
  );
}

List<_Pt> _organicBlobPoints(double Function() rng, double spread,
    [int? count]) {
  final total = count ?? (8 + _ifloor(rng() * 4));
  final points = <_Pt>[];
  for (var i = 0; i < total; i++) {
    final angle = (i / total) * math.pi * 2;
    final radius = _lerp(28, 42, rng()) * spread;
    final wobble = _lerp(0.78, 1.22, rng());
    points.add(_Pt(
      x: 50 + math.cos(angle) * radius * wobble,
      y: 50 + math.sin(angle) * radius * wobble,
    ));
  }
  return points;
}

String _pointsToPath(List<_Pt> points) {
  if (points.isEmpty) return '';
  final first = points.first;
  final buf = StringBuffer(
    'M ${first.x.toStringAsFixed(2)} ${first.y.toStringAsFixed(2)}',
  );
  for (var i = 0; i < points.length; i++) {
    final current = points[i];
    final next = points[(i + 1) % points.length];
    final midX = (current.x + next.x) / 2;
    final midY = (current.y + next.y) / 2;
    buf.write(
      ' Q ${current.x.toStringAsFixed(2)} ${current.y.toStringAsFixed(2)} '
      '${midX.toStringAsFixed(2)} ${midY.toStringAsFixed(2)}',
    );
  }
  buf.write(' Z');
  return buf.toString();
}

List<_Pt> _polarPoints(
  double Function() rng,
  int count,
  double innerRadius,
  double outerRadius,
  double spread, [
  double offset = -math.pi / 2,
]) {
  final points = <_Pt>[];
  for (var i = 0; i < count * 2; i++) {
    final angle = (i / (count * 2)) * math.pi * 2 + offset;
    final outer = i % 2 == 0;
    final radius = (outer
            ? _lerp(outerRadius * 0.7, outerRadius, rng())
            : _lerp(innerRadius * 0.5, innerRadius, rng())) *
        spread;
    points.add(_Pt(
      x: 50 + math.cos(angle) * radius,
      y: 50 + math.sin(angle) * radius,
    ));
  }
  return points;
}

String _ellipsePath(
  double cx,
  double cy,
  double rx,
  double ry, [
  double rotation = 0,
]) {
  final cos = math.cos(rotation);
  final sin = math.sin(rotation);
  final x0 = cx + rx * cos;
  final y0 = cy + rx * sin;
  final x2 = cx - rx * cos;
  final y2 = cy - rx * sin;
  final deg = ((rotation * 180) / math.pi).toStringAsFixed(1);
  return [
    'M ${x0.toStringAsFixed(2)} ${y0.toStringAsFixed(2)}',
    'A ${rx.toStringAsFixed(2)} ${ry.toStringAsFixed(2)} $deg 1 1 ${x2.toStringAsFixed(2)} ${y2.toStringAsFixed(2)}',
    'A ${rx.toStringAsFixed(2)} ${ry.toStringAsFixed(2)} $deg 1 1 ${x0.toStringAsFixed(2)} ${y0.toStringAsFixed(2)}',
    'Z',
  ].join(' ');
}

String _buildRingPath(double Function() rng, double spread, [double? shrink]) {
  shrink ??= _lerp(0.52, 0.68, rng());
  final outer = _organicBlobPoints(rng, spread);
  final inner = <_Pt>[];
  for (var index = 0; index < outer.length; index++) {
    final point = outer[index];
    final angle = (index / outer.length) * math.pi * 2;
    inner.add(_Pt(
      x: 50 + math.cos(angle) * (point.x - 50) * shrink,
      y: 50 + math.sin(angle) * (point.y - 50) * shrink,
    ));
  }
  return '${_pointsToPath(outer)} ${_pointsToPath(inner.reversed.toList())}';
}

String buildVariantPath(String variant, double Function() rng, double spread) {
  switch (variant) {
    case 'splash':
      return _pointsToPath(
          _polarPoints(rng, 9 + _ifloor(rng() * 5), 12, 48, spread));
    case 'wash':
      {
        final left = _lerp(8, 16, rng());
        final right = _lerp(84, 92, rng());
        final top = _lerp(36, 44, rng());
        final bottom = _lerp(56, 64, rng());
        final curl = _lerp(4, 12, rng()) * spread;
        return [
          "M ${left.toStringAsFixed(1)} ${(top + curl).toStringAsFixed(1)}",
          "C ${(left + 10).toStringAsFixed(1)} ${(top - curl).toStringAsFixed(1)} ${(50 - 8).toStringAsFixed(1)} ${(top - curl * 0.6).toStringAsFixed(1)} 50 ${top.toStringAsFixed(1)}",
          "C ${(50 + 8).toStringAsFixed(1)} ${(top + curl * 0.8).toStringAsFixed(1)} ${(right - 10).toStringAsFixed(1)} ${(top - curl).toStringAsFixed(1)} ${right.toStringAsFixed(1)} ${(top + curl).toStringAsFixed(1)}",
          "C ${(right - 6).toStringAsFixed(1)} ${(bottom + curl).toStringAsFixed(1)} ${(50 + 10).toStringAsFixed(1)} ${(bottom + curl * 0.5).toStringAsFixed(1)} 50 ${bottom.toStringAsFixed(1)}",
          "C ${(50 - 10).toStringAsFixed(1)} ${(bottom - curl * 0.4).toStringAsFixed(1)} ${(left + 6).toStringAsFixed(1)} ${(bottom + curl).toStringAsFixed(1)} ${left.toStringAsFixed(1)} ${(top + curl).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'ring':
      return _buildRingPath(rng, spread);
    case 'drip':
      {
        final width = _lerp(14, 22, rng()) * spread;
        final top = _lerp(18, 28, rng());
        final tip = _lerp(78, 88, rng());
        return [
          "M ${(50 - width).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "Q ${(50 - width * 1.4).toStringAsFixed(1)} ${_lerp(45, 55, rng()).toStringAsFixed(1)} ${(50 - width * 0.4).toStringAsFixed(1)} ${_lerp(58, 68, rng()).toStringAsFixed(1)}",
          "Q ${50} ${tip.toStringAsFixed(1)} ${(50 + width * 0.4).toStringAsFixed(1)} ${_lerp(58, 68, rng()).toStringAsFixed(1)}",
          "Q ${(50 + width * 1.4).toStringAsFixed(1)} ${_lerp(45, 55, rng()).toStringAsFixed(1)} ${(50 + width).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "Q 50 ${(top - 8).toStringAsFixed(1)} ${(50 - width).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'burst':
      return _pointsToPath(
          _polarPoints(rng, 12 + _ifloor(rng() * 6), 8, 46, spread));
    case 'petal':
      {
        final tilt = _lerp(-0.4, 0.4, rng());
        final length = _lerp(32, 44, rng()) * spread;
        final width = _lerp(14, 22, rng()) * spread;
        return [
          "M 50 50",
          "C ${(50 + width).toStringAsFixed(1)} ${(50 - length * 0.3).toStringAsFixed(1)} ${(50 + width * 0.6 + tilt * 10).toStringAsFixed(1)} ${(50 - length).toStringAsFixed(1)} 50 ${(50 - length).toStringAsFixed(1)}",
          "C ${(50 - width * 0.6 - tilt * 10).toStringAsFixed(1)} ${(50 - length).toStringAsFixed(1)} ${(50 - width).toStringAsFixed(1)} ${(50 - length * 0.3).toStringAsFixed(1)} 50 50",
          'Z',
        ].join(' ');
      }
    case 'cloud':
      {
        final bumps = 5 + _ifloor(rng() * 3);
        final points = <_Pt>[];
        for (var i = 0; i < bumps * 2; i += 1) {
          final t = i / (bumps * 2);
          final angle = _lerp(-math.pi * 0.15, math.pi * 1.15, t);
          final outer = i % 2 == 0;
          final radius =
              (outer ? _lerp(30, 42, rng()) : _lerp(18, 26, rng())) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius * 1.1,
            y: 50 + math.sin(angle) * radius * 0.75,
          ));
        }
        return _pointsToPath(points);
      }
    case 'puddle':
      return _ellipsePath(
          50,
          _lerp(52, 58, rng()),
          _lerp(30, 40, rng()) * spread,
          _lerp(12, 18, rng()) * spread,
          _lerp(-0.2, 0.2, rng()));
    case 'streak':
      {
        final y = _lerp(44, 56, rng());
        final height = _lerp(6, 14, rng()) * spread;
        final left = _lerp(6, 14, rng());
        final right = _lerp(86, 94, rng());
        return [
          "M ${left.toStringAsFixed(1)} ${(y + height).toStringAsFixed(1)}",
          "C ${(left + 20).toStringAsFixed(1)} ${(y - height).toStringAsFixed(1)} ${(right - 20).toStringAsFixed(1)} ${(y - height * 0.6).toStringAsFixed(1)} ${right.toStringAsFixed(1)} ${y.toStringAsFixed(1)}",
          "C ${(right - 8).toStringAsFixed(1)} ${(y + height).toStringAsFixed(1)} ${(left + 8).toStringAsFixed(1)} ${(y + height * 0.8).toStringAsFixed(1)} ${left.toStringAsFixed(1)} ${(y + height).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'arc':
      {
        final start = _lerp(-math.pi * 0.85, -math.pi * 0.55, rng());
        final end = _lerp(math.pi * 0.55, math.pi * 0.85, rng());
        final outerR = _lerp(36, 44, rng()) * spread;
        final innerR = outerR * _lerp(0.55, 0.72, rng());
        final outerStart = _Pt(
            x: 50 + math.cos(start) * outerR, y: 50 + math.sin(start) * outerR);
        final outerEnd =
            _Pt(x: 50 + math.cos(end) * outerR, y: 50 + math.sin(end) * outerR);
        final innerEnd =
            _Pt(x: 50 + math.cos(end) * innerR, y: 50 + math.sin(end) * innerR);
        final innerStart = _Pt(
            x: 50 + math.cos(start) * innerR, y: 50 + math.sin(start) * innerR);
        final largeArc = end - start > math.pi ? 1 : 0;
        return [
          "M ${outerStart.x.toStringAsFixed(2)} ${outerStart.y.toStringAsFixed(2)}",
          "A ${outerR.toStringAsFixed(2)} ${outerR.toStringAsFixed(2)} 0 $largeArc 1 ${outerEnd.x.toStringAsFixed(2)} ${outerEnd.y.toStringAsFixed(2)}",
          "L ${innerEnd.x.toStringAsFixed(2)} ${innerEnd.y.toStringAsFixed(2)}",
          "A ${innerR.toStringAsFixed(2)} ${innerR.toStringAsFixed(2)} 0 $largeArc 0 ${innerStart.x.toStringAsFixed(2)} ${innerStart.y.toStringAsFixed(2)}",
          'Z',
        ].join(' ');
      }
    case 'splatter':
      {
        final blobs = <String>[];
        final count = 4 + _ifloor(rng() * 4);
        for (var i = 0; i < count; i += 1) {
          final cx = _lerp(28, 72, rng());
          final cy = _lerp(28, 72, rng());
          final r = _lerp(6, 16, rng()) * spread;
          blobs.add(_ellipsePath(cx, cy, r, r * _lerp(0.7, 1.2, rng())));
        }
        return blobs.join(' ');
      }
    case 'feather':
      {
        final length = _lerp(38, 48, rng()) * spread;
        final width = _lerp(8, 14, rng()) * spread;
        final curve = _lerp(8, 18, rng());
        return [
          "M 50 50",
          "C ${(50 + width).toStringAsFixed(1)} ${(50 - length * 0.4).toStringAsFixed(1)} ${(50 + curve).toStringAsFixed(1)} ${(50 - length).toStringAsFixed(1)} ${(50 + width * 0.3).toStringAsFixed(1)} ${(50 - length).toStringAsFixed(1)}",
          "C ${(50 - width * 0.5).toStringAsFixed(1)} ${(50 - length * 0.85).toStringAsFixed(1)} ${(50 - width).toStringAsFixed(1)} ${(50 - length * 0.35).toStringAsFixed(1)} 50 50",
          'Z',
        ].join(' ');
      }
    case 'wave':
      {
        final baseY = _lerp(48, 56, rng());
        final amp = _lerp(6, 12, rng()) * spread;
        return [
          "M 8 ${baseY.toStringAsFixed(1)}",
          "C 22 ${(baseY - amp).toStringAsFixed(1)} 38 ${(baseY + amp).toStringAsFixed(1)} 50 ${baseY.toStringAsFixed(1)}",
          "C 62 ${(baseY - amp).toStringAsFixed(1)} 78 ${(baseY + amp).toStringAsFixed(1)} 92 ${baseY.toStringAsFixed(1)}",
          "L 92 ${(baseY + amp * 1.5).toStringAsFixed(1)}",
          "C 78 ${(baseY + amp * 0.5).toStringAsFixed(1)} 62 ${(baseY + amp * 2).toStringAsFixed(1)} 50 ${(baseY + amp * 1.5).toStringAsFixed(1)}",
          "C 38 ${(baseY + amp * 2).toStringAsFixed(1)} 22 ${(baseY + amp * 0.5).toStringAsFixed(1)} 8 ${(baseY + amp * 1.5).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'ripple':
      return _buildRingPath(rng, spread, _lerp(0.72, 0.82, rng()));
    case 'starburst':
      return _pointsToPath(
          _polarPoints(rng, 16 + _ifloor(rng() * 8), 6, 44, spread));
    case 'comet':
      {
        final headR = _lerp(14, 20, rng()) * spread;
        final tailLen = _lerp(28, 40, rng()) * spread;
        final head = _ellipsePath(
            _lerp(58, 66, rng()), _lerp(42, 52, rng()), headR, headR * 0.9);
        final tail = [
          "M ${(50 - tailLen).toStringAsFixed(1)} ${50}",
          "L ${(50 - tailLen * 0.3).toStringAsFixed(1)} ${(50 - headR * 0.5).toStringAsFixed(1)}",
          "L ${(50 + headR).toStringAsFixed(1)} ${50}",
          "L ${(50 - tailLen * 0.3).toStringAsFixed(1)} ${(50 + headR * 0.5).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
        return "$head $tail";
      }
    case 'smudge':
      {
        final points = <_Pt>[];
        final count = 10 + _ifloor(rng() * 4);
        for (var i = 0; i < count; i += 1) {
          final angle =
              _lerp(-math.pi * 0.35, math.pi * 0.35, i / (count - 1)) +
                  _lerp(-0.2, 0.2, rng());
          final radius = _lerp(20, 38, rng()) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius * 0.55,
          ));
        }
        return _pointsToPath(points);
      }
    case 'blot':
      return _pointsToPath(_organicBlobPoints(rng, spread * 0.85, 10));
    case 'spray':
      {
        final rays = 7 + _ifloor(rng() * 5);
        final points = [_Pt(x: 50, y: 50)];
        for (var i = 0; i < rays; i += 1) {
          final angle = _lerp(-math.pi * 0.6, math.pi * 0.15, rng());
          final radius = _lerp(28, 44, rng()) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius,
          ));
        }
        points.sort((a, b) => math
            .atan2(a.y - 50, a.x - 50)
            .compareTo(math.atan2(b.y - 50, b.x - 50)));
        return _pointsToPath(points);
      }
    case 'fan':
      {
        final start = _lerp(-math.pi * 0.75, -math.pi * 0.45, rng());
        final end = _lerp(math.pi * 0.05, math.pi * 0.35, rng());
        final radius = _lerp(36, 46, rng()) * spread;
        final startPt = _Pt(
            x: 50 + math.cos(start) * radius, y: 50 + math.sin(start) * radius);
        final endPt =
            _Pt(x: 50 + math.cos(end) * radius, y: 50 + math.sin(end) * radius);
        return [
          "M 50 50",
          "L ${startPt.x.toStringAsFixed(2)} ${startPt.y.toStringAsFixed(2)}",
          "Q ${(50 + math.cos((start + end) / 2) * radius * 1.05).toStringAsFixed(2)} ${(50 + math.sin((start + end) / 2) * radius * 1.05).toStringAsFixed(2)} ${endPt.x.toStringAsFixed(2)} ${endPt.y.toStringAsFixed(2)}",
          'Z',
        ].join(' ');
      }
    case 'crescent':
      return _buildRingPath(rng, spread, _lerp(0.78, 0.88, rng()));
    case 'teardrop':
      {
        final size = _lerp(32, 42, rng()) * spread;
        return [
          "M 50 ${(50 - size).toStringAsFixed(1)}",
          "C ${(50 + size * 0.65).toStringAsFixed(1)} ${(50 - size * 0.2).toStringAsFixed(1)} ${(50 + size * 0.55).toStringAsFixed(1)} ${(50 + size * 0.55).toStringAsFixed(1)} 50 ${(50 + size * 0.65).toStringAsFixed(1)}",
          "C ${(50 - size * 0.55).toStringAsFixed(1)} ${(50 + size * 0.55).toStringAsFixed(1)} ${(50 - size * 0.65).toStringAsFixed(1)} ${(50 - size * 0.2).toStringAsFixed(1)} 50 ${(50 - size).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'cluster':
      {
        final parts = <String>[];
        final count = 3 + _ifloor(rng() * 3);
        for (var i = 0; i < count; i += 1) {
          final cx = _lerp(32, 68, rng());
          final cy = _lerp(32, 68, rng());
          final r = _lerp(10, 18, rng()) * spread;
          final localRng = mulberry32(_ifloor(rng() * 10000));
          final blob = _organicBlobPoints(localRng, 0.55, 6)
              .map(
                (p) => _Pt(
                  x: cx + (p.x - 50) * (r / 40),
                  y: cy + (p.y - 50) * (r / 40),
                ),
              )
              .toList();
          parts.add(_pointsToPath(blob));
        }
        return parts.join(' ');
      }
    case 'swirl':
      {
        final points = <_Pt>[];
        final turns = _lerp(1.2, 1.8, rng());
        final steps = 24;
        for (var i = 0; i <= steps; i += 1) {
          final t = i / steps;
          final angle = t * math.pi * 2 * turns - math.pi / 2;
          final radius = _lerp(8, 38, t) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius,
          ));
        }
        for (var i = steps; i >= 0; i -= 1) {
          final t = i / steps;
          final angle = t * math.pi * 2 * turns - math.pi / 2 + 0.35;
          final radius = _lerp(6, 32, t) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius,
          ));
        }
        return _pointsToPath(points);
      }
    case 'blotchy':
      return _pointsToPath(_organicBlobPoints(rng, spread * 1.15, 12));
    case 'streaky':
      {
        final streaks = <String>[];
        final count = 3 + _ifloor(rng() * 3);
        for (var i = 0; i < count; i += 1) {
          final y = _lerp(30, 70, rng());
          final h = _lerp(4, 10, rng()) * spread;
          final left = _lerp(10, 24, rng());
          final right = _lerp(76, 90, rng());
          streaks.add(
            [
              "M ${left.toStringAsFixed(1)} ${(y + h).toStringAsFixed(1)}",
              "C ${(left + 18).toStringAsFixed(1)} ${(y - h).toStringAsFixed(1)} ${(right - 18).toStringAsFixed(1)} ${y.toStringAsFixed(1)} ${right.toStringAsFixed(1)} ${(y + h * 0.5).toStringAsFixed(1)}",
              "C ${(right - 6).toStringAsFixed(1)} ${(y + h).toStringAsFixed(1)} ${(left + 6).toStringAsFixed(1)} ${(y + h * 0.7).toStringAsFixed(1)} ${left.toStringAsFixed(1)} ${(y + h).toStringAsFixed(1)}",
              'Z',
            ].join(' '),
          );
        }
        return streaks.join(' ');
      }
    case 'speckle':
      {
        final dots = <String>[];
        final count = 8 + _ifloor(rng() * 8);
        for (var i = 0; i < count; i += 1) {
          final cx = _lerp(22, 78, rng());
          final cy = _lerp(22, 78, rng());
          final r = _lerp(3, 9, rng()) * spread;
          dots.add(_ellipsePath(cx, cy, r, r * _lerp(0.8, 1.3, rng())));
        }
        return dots.join(' ');
      }
    case 'halo':
      return _buildRingPath(rng, spread, _lerp(0.82, 0.9, rng()));
    case 'notch':
      {
        final outer = _organicBlobPoints(rng, spread);
        final notchDepth = _lerp(0.35, 0.5, rng());
        final notchAngle = _lerp(-0.5, 0.8, rng());
        final inner = <_Pt>[];
        for (var index = 0; index < outer.length; index++) {
          final point = outer[index];
          final angle = (index / outer.length) * math.pi * 2;
          var shrink = _lerp(0.55, 0.68, rng());
          if ((angle - notchAngle).abs() < 0.5) shrink = notchDepth;
          inner.add(
            _Pt(
              x: 50 + math.cos(angle) * (point.x - 50) * shrink,
              y: 50 + math.sin(angle) * (point.y - 50) * shrink,
            ),
          );
        }
        return '${_pointsToPath(outer)} ${_pointsToPath(inner.reversed.toList())}';
      }
    case 'shard':
      {
        final points = <_Pt>[];
        final corners = 3 + _ifloor(rng() * 2);
        for (var i = 0; i < corners; i += 1) {
          final angle = (i / corners) * math.pi * 2 -
              math.pi / 2 +
              _lerp(-0.15, 0.15, rng());
          final radius = _lerp(30, 44, rng()) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius,
          ));
        }
        return _pointsToPath(points);
      }
    case 'bloom':
      {
        final petals = 5 + _ifloor(rng() * 3);
        final parts = <String>[];
        for (var i = 0; i < petals; i += 1) {
          final angle = (i / petals) * math.pi * 2 - math.pi / 2;
          final length = _lerp(22, 32, rng()) * spread;
          final width = _lerp(10, 16, rng()) * spread;
          final tipX = 50 + math.cos(angle) * length;
          final tipY = 50 + math.sin(angle) * length;
          final leftX = 50 + math.cos(angle - 0.35) * width;
          final leftY = 50 + math.sin(angle - 0.35) * width;
          final rightX = 50 + math.cos(angle + 0.35) * width;
          final rightY = 50 + math.sin(angle + 0.35) * width;
          parts.add(
            [
              "M 50 50",
              "Q ${leftX.toStringAsFixed(1)} ${leftY.toStringAsFixed(1)} ${tipX.toStringAsFixed(1)} ${tipY.toStringAsFixed(1)}",
              "Q ${rightX.toStringAsFixed(1)} ${rightY.toStringAsFixed(1)} 50 50",
              'Z',
            ].join(' '),
          );
        }
        return parts.join(' ');
      }
    case 'funnel':
      {
        final topWidth = _lerp(36, 48, rng()) * spread;
        final neck = _lerp(6, 12, rng()) * spread;
        final top = _lerp(16, 26, rng());
        final bottom = _lerp(72, 84, rng());
        return [
          "M ${(50 - topWidth).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "L ${(50 + topWidth).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "L ${(50 + neck).toStringAsFixed(1)} ${bottom.toStringAsFixed(1)}",
          "L ${(50 - neck).toStringAsFixed(1)} ${bottom.toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'tail':
      {
        final headR = _lerp(16, 22, rng()) * spread;
        final headX = _lerp(62, 70, rng());
        final headY = _lerp(46, 54, rng());
        return [
          _ellipsePath(headX, headY, headR, headR * 0.85),
          "M ${(headX - headR).toStringAsFixed(1)} ${headY.toStringAsFixed(1)}",
          "C ${(headX - headR * 2.2).toStringAsFixed(1)} ${(headY - headR * 0.3).toStringAsFixed(1)} ${(headX - headR * 3).toStringAsFixed(1)} ${(headY + headR * 0.5).toStringAsFixed(1)} ${(headX - headR * 3.8).toStringAsFixed(1)} ${(headY + headR * 0.2).toStringAsFixed(1)}",
          "C ${(headX - headR * 2.5).toStringAsFixed(1)} ${(headY + headR * 0.8).toStringAsFixed(1)} ${(headX - headR * 1.2).toStringAsFixed(1)} ${(headY + headR * 0.4).toStringAsFixed(1)} ${(headX - headR).toStringAsFixed(1)} ${headY.toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'crown':
      {
        final peaks = 5 + _ifloor(rng() * 3);
        final points = <_Pt>[];
        for (var i = 0; i < peaks * 2; i += 1) {
          final t = i / (peaks * 2);
          final angle = _lerp(-math.pi * 0.9, -math.pi * 0.1, t);
          final outer = i % 2 == 0;
          final radius =
              (outer ? _lerp(34, 44, rng()) : _lerp(20, 28, rng())) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radius,
            y: 50 + math.sin(angle) * radius * 0.9 + (outer ? -4 : 6),
          ));
        }
        return _pointsToPath(points);
      }
    case 'island':
      {
        final points = <_Pt>[];
        final count = 9 + _ifloor(rng() * 4);
        for (var i = 0; i < count; i += 1) {
          final angle = (i / count) * math.pi * 2;
          final radiusX = _lerp(26, 40, rng()) * spread;
          final radiusY = _lerp(20, 34, rng()) * spread;
          points.add(_Pt(
            x: 50 + math.cos(angle) * radiusX,
            y: 50 + math.sin(angle) * radiusY,
          ));
        }
        return _pointsToPath(points);
      }
    case 'delta':
      {
        final width = _lerp(38, 48, rng()) * spread;
        final top = _lerp(18, 28, rng());
        final bottom = _lerp(72, 82, rng());
        final inset = _lerp(8, 16, rng()) * spread;
        return [
          "M ${(50 - width).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "L ${(50 + width).toStringAsFixed(1)} ${top.toStringAsFixed(1)}",
          "L ${(50 + inset).toStringAsFixed(1)} ${bottom.toStringAsFixed(1)}",
          "L ${(50 - inset).toStringAsFixed(1)} ${bottom.toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'hook':
      {
        final thickness = _lerp(10, 16, rng()) * spread;
        return [
          "M ${(50 - thickness).toStringAsFixed(1)} ${(50 - thickness).toStringAsFixed(1)}",
          "C ${(50 + thickness * 1.5).toStringAsFixed(1)} ${(50 - thickness * 1.8).toStringAsFixed(1)} ${(50 + thickness * 1.8).toStringAsFixed(1)} ${(50 + thickness).toStringAsFixed(1)} ${50} ${(50 + thickness * 1.6).toStringAsFixed(1)}",
          "C ${(50 - thickness * 1.2).toStringAsFixed(1)} ${(50 + thickness * 2).toStringAsFixed(1)} ${(50 - thickness * 2).toStringAsFixed(1)} ${(50 + thickness * 0.5).toStringAsFixed(1)} ${(50 - thickness).toStringAsFixed(1)} ${(50 - thickness).toStringAsFixed(1)}",
          'Z',
        ].join(' ');
      }
    case 'tendril':
      {
        final points = <_Pt>[];
        final steps = 16;
        for (var i = 0; i <= steps; i += 1) {
          final t = i / steps;
          final angle = t * math.pi * 1.4 - math.pi / 2;
          final radius = _lerp(10, 36, t) * spread;
          final width = _lerp(8, 2, t);
          points.add(_Pt(
            x: 50 +
                math.cos(angle) * radius +
                math.cos(angle + math.pi / 2) * width,
            y: 50 +
                math.sin(angle) * radius +
                math.sin(angle + math.pi / 2) * width,
          ));
        }
        for (var i = steps; i >= 0; i -= 1) {
          final t = i / steps;
          final angle = t * math.pi * 1.4 - math.pi / 2;
          final radius = _lerp(10, 36, t) * spread;
          final width = _lerp(8, 2, t);
          points.add(_Pt(
            x: 50 +
                math.cos(angle) * radius -
                math.cos(angle + math.pi / 2) * width,
            y: 50 +
                math.sin(angle) * radius -
                math.sin(angle + math.pi / 2) * width,
          ));
        }
        return _pointsToPath(points);
      }
    case 'crater':
      return _buildRingPath(rng, spread, _lerp(0.38, 0.52, rng()));
    case 'blob':
    default:
      return _pointsToPath(_organicBlobPoints(rng, spread));
  }
}

Path parseSplashPath(String d, {bool evenOdd = false}) {
  final path = Path();
  if (evenOdd) path.fillType = PathFillType.evenOdd;
  writeSvgPathDataToPath(d, _PathProxy(path));
  return path;
}

class _PathProxy extends PathProxy {
  _PathProxy(this.path);
  final Path path;

  @override
  void close() => path.close();

  @override
  void cubicTo(
    double x1,
    double y1,
    double x2,
    double y2,
    double x3,
    double y3,
  ) =>
      path.cubicTo(x1, y1, x2, y2, x3, y3);

  @override
  void lineTo(double x, double y) => path.lineTo(x, y);

  @override
  void moveTo(double x, double y) => path.moveTo(x, y);
}

List<Color> resolveSplashPaintColors(
  List<String> colors,
  Color primary,
  Color accent,
  Color secondary,
) {
  return normalizeSplashColors(colors).map((c) {
    final t = c.trim();
    if (t.contains('--wash-a') || t.contains('--color-primary')) return primary;
    if (t.contains('--wash-b') || t.contains('--color-accent')) return accent;
    if (t.contains('--wash-c') || t.contains('--color-secondary')) {
      return secondary;
    }
    final hex = t.startsWith('#') ? t.substring(1) : t;
    if (hex.length == 6) {
      final v = int.tryParse(hex, radix: 16);
      if (v != null) return Color(0xFF000000 | v);
    }
    if (hex.length == 3) {
      final r = hex[0];
      final g = hex[1];
      final b = hex[2];
      final v = int.tryParse('$r$r$g$g$b$b', radix: 16);
      if (v != null) return Color(0xFF000000 | v);
    }
    return primary;
  }).toList();
}

String splashToDart(WashWatercolorSplashConfig config) {
  final colors = config.colors.map((c) => "'$c'").join(', ');
  final buf = StringBuffer();
  buf.writeln('WashWatercolorSplash(');
  buf.writeln('  seed: ${config.seed},');
  buf.writeln("  variant: '${config.variant}',");
  buf.writeln('  colors: [$colors],');
  buf.writeln('  opacity: ${config.opacity.toStringAsFixed(2)},');
  buf.writeln('  blur: ${config.blur.toStringAsFixed(1)},');
  buf.writeln('  spread: ${config.spread.toStringAsFixed(2)},');
  buf.writeln('  rotation: ${config.rotation},');
  buf.writeln('  size: ${config.size.round()},');
  buf.writeln(')');
  return buf.toString();
}

String splashToSvgExport(
    WashWatercolorSplashConfig config, List<Color> resolved) {
  final rng = mulberry32(config.seed);
  final d = buildVariantPath(config.variant, rng, config.spread);
  final fillRule = kWashSplashEvenOddVariants.contains(config.variant)
      ? ' fill-rule="evenodd"'
      : '';
  final stops = <String>[];
  if (resolved.length == 1) {
    final hex = washColorToHex(resolved.first);
    stops.add(
      '<stop offset="0%" stop-color="$hex" stop-opacity="${config.opacity.toStringAsFixed(2)}" />',
    );
    stops.add('<stop offset="100%" stop-color="$hex" stop-opacity="0" />');
  } else if (resolved.length >= 2) {
    stops.add(
      '<stop offset="0%" stop-color="${washColorToHex(resolved[0])}" stop-opacity="${config.opacity.toStringAsFixed(2)}" />',
    );
    stops.add(
      '<stop offset="58%" stop-color="${washColorToHex(resolved[1])}" stop-opacity="${(config.opacity * 0.72).toStringAsFixed(2)}" />',
    );
    stops.add(
      '<stop offset="100%" stop-color="${washColorToHex(resolved[1])}" stop-opacity="0" />',
    );
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
      'width="${config.size}" height="${config.size}" role="img" aria-hidden="true">'
      '<defs><radialGradient id="g" cx="42%" cy="38%" r="68%">'
      '${stops.join()}'
      '</radialGradient></defs>'
      '<g transform="rotate(${config.rotation} 50 50)">'
      '<path d="$d" fill="url(#g)"$fillRule /></g></svg>';
}

/// Procedural watercolor paint splash (web `WatercolorSplash` parity).
class WashWatercolorSplash extends StatelessWidget {
  const WashWatercolorSplash({
    this.seed = 42,
    this.variant = 'blob',
    this.colors,
    this.opacity = 0.65,
    this.blur = 16,
    this.spread = 1,
    this.rotation = 0,
    this.size = 200,
    this.semanticLabel,
    super.key,
  });

  final int seed;
  final String variant;
  final List<String>? colors;
  final double opacity;
  final double blur;
  final double spread;
  final double rotation;
  final double size;
  final String? semanticLabel;

  WashWatercolorSplashConfig get config => WashWatercolorSplashConfig(
        seed: seed,
        variant: variant,
        colors: normalizeSplashColors(colors ?? kWashDefaultSplashColors),
        opacity: opacity,
        blur: blur,
        spread: spread,
        rotation: rotation,
        size: size,
      );

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final resolved = resolveSplashPaintColors(
      config.colors,
      tokens.primary,
      tokens.palette.accent,
      tokens.palette.secondary,
    );
    final sigma = _clamp(blur / 10, 0, 8);
    return Semantics(
      label: semanticLabel ?? 'Watercolor splash',
      child: SizedBox(
        width: size,
        height: size,
        child: ImageFiltered(
          imageFilter: ui.ImageFilter.blur(sigmaX: sigma, sigmaY: sigma),
          child: CustomPaint(
            painter: _SplashPainter(config: config, colors: resolved),
          ),
        ),
      ),
    );
  }
}

class _SplashPainter extends CustomPainter {
  _SplashPainter({required this.config, required this.colors});

  final WashWatercolorSplashConfig config;
  final List<Color> colors;

  @override
  void paint(Canvas canvas, Size size) {
    final rng = mulberry32(config.seed);
    final d = buildVariantPath(config.variant, rng, config.spread);
    final evenOdd = kWashSplashEvenOddVariants.contains(config.variant);
    final path = parseSplashPath(d, evenOdd: evenOdd);
    final scale = size.shortestSide / 100;
    canvas.save();
    canvas.translate(size.width / 2, size.height / 2);
    canvas.rotate(config.rotation * math.pi / 180);
    canvas.scale(scale);
    canvas.translate(-50, -50);

    final gradientColors = <Color>[];
    final stops = <double>[];
    if (colors.length == 1) {
      gradientColors.addAll([
        colors.first.withValues(alpha: config.opacity),
        colors.first.withValues(alpha: 0),
      ]);
      stops.addAll(const [0, 1]);
    } else if (colors.length == 2) {
      gradientColors.addAll([
        colors[0].withValues(alpha: config.opacity),
        colors[1].withValues(alpha: config.opacity * 0.72),
        colors[1].withValues(alpha: 0),
      ]);
      stops.addAll(const [0, 0.58, 1]);
    } else {
      for (var i = 0; i < colors.length; i++) {
        final last = i == colors.length - 1;
        final t = i / (colors.length - 1);
        stops.add(last ? 1.0 : t * 0.88);
        gradientColors.add(
          colors[i].withValues(
            alpha: last ? 0.0 : config.opacity * (1 - t * 0.38),
          ),
        );
      }
    }

    final paint = Paint()
      ..shader = ui.Gradient.radial(
        const Offset(42, 38),
        68,
        gradientColors,
        stops,
      )
      ..style = PaintingStyle.fill;

    canvas.drawPath(path, paint);

    if (colors.length >= 3) {
      for (var index = 2; index < colors.length; index++) {
        final blobRng = mulberry32(config.seed + index * 7919);
        final accentPath = parseSplashPath(
          _pointsToPath(
            _organicBlobPoints(
              blobRng,
              config.spread * _lerp(0.32, 0.52, blobRng()),
              7,
            ),
          ),
        );
        final cx = _lerp(22, 78, blobRng());
        final cy = _lerp(22, 78, blobRng());
        final layerOpacity =
            _clamp(config.opacity * _lerp(0.34, 0.58, blobRng()), 0.05, 0.78);
        canvas.save();
        canvas.translate(cx - 50, cy - 50);
        canvas.drawPath(
          accentPath,
          Paint()..color = colors[index].withValues(alpha: layerOpacity),
        );
        canvas.restore();
      }
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _SplashPainter oldDelegate) {
    return oldDelegate.config.seed != config.seed ||
        oldDelegate.config.variant != config.variant ||
        oldDelegate.config.opacity != config.opacity ||
        oldDelegate.config.blur != config.blur ||
        oldDelegate.config.spread != config.spread ||
        oldDelegate.config.rotation != config.rotation ||
        oldDelegate.config.size != config.size ||
        oldDelegate.colors != colors;
  }
}
