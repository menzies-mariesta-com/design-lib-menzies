import 'dart:math' as math;

class WashRgb {
  const WashRgb(this.r, this.g, this.b);
  final double r;
  final double g;
  final double b;
}

class WashHsl {
  const WashHsl(this.h, this.s, this.l);
  final double h;
  final double s;
  final double l;
}

final _hexShort = RegExp(r'^#([0-9a-fA-F]{3})$');
final _hexLong = RegExp(r'^#([0-9a-fA-F]{6})$');

String? washNormalizeHex(String value) {
  final trimmed = value.trim();
  final short = _hexShort.matchAsPrefix(trimmed);
  if (short != null) {
    final hex = short.group(1)!;
    return '#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}'.toLowerCase();
  }
  if (_hexLong.matchAsPrefix(trimmed) != null) {
    return trimmed.toLowerCase();
  }
  return null;
}

WashRgb? washHexToRgb(String hex) {
  final normalized = washNormalizeHex(hex);
  if (normalized == null) return null;
  final raw = normalized.substring(1);
  return WashRgb(
    int.parse(raw.substring(0, 2), radix: 16).toDouble(),
    int.parse(raw.substring(2, 4), radix: 16).toDouble(),
    int.parse(raw.substring(4, 6), radix: 16).toDouble(),
  );
}

String washRgbToHex(double r, double g, double b) {
  int clampChannel(double channel) =>
      math.max(0, math.min(255, channel.round()));
  final cr = clampChannel(r);
  final cg = clampChannel(g);
  final cb = clampChannel(b);
  return '#${cr.toRadixString(16).padLeft(2, '0')}'
      '${cg.toRadixString(16).padLeft(2, '0')}'
      '${cb.toRadixString(16).padLeft(2, '0')}';
}

WashHsl washRgbToHsl(double r, double g, double b) {
  final rn = r / 255;
  final gn = g / 255;
  final bn = b / 255;
  final max = math.max(rn, math.max(gn, bn));
  final min = math.min(rn, math.min(gn, bn));
  final delta = max - min;
  var h = 0.0;
  var s = 0.0;
  final l = (max + min) / 2;

  if (delta != 0) {
    s = delta / (1 - (2 * l - 1).abs());
    if (max == rn) {
      h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
    } else if (max == gn) {
      h = ((bn - rn) / delta + 2) * 60;
    } else {
      h = ((rn - gn) / delta + 4) * 60;
    }
  }

  return WashHsl((h + 360) % 360, s * 100, l * 100);
}

WashRgb washHslToRgb(double h, double s, double l) {
  final hue = ((h % 360) + 360) % 360;
  final sat = math.max(0, math.min(100, s)) / 100;
  final light = math.max(0, math.min(100, l)) / 100;
  final c = (1 - (2 * light - 1).abs()) * sat;
  final x = c * (1 - (((hue / 60) % 2) - 1).abs());
  final m = light - c / 2;

  double rn = 0;
  double gn = 0;
  double bn = 0;

  if (hue < 60) {
    rn = c;
    gn = x;
  } else if (hue < 120) {
    rn = x;
    gn = c;
  } else if (hue < 180) {
    gn = c;
    bn = x;
  } else if (hue < 240) {
    gn = x;
    bn = c;
  } else if (hue < 300) {
    rn = x;
    bn = c;
  } else {
    rn = c;
    bn = x;
  }

  return WashRgb((rn + m) * 255, (gn + m) * 255, (bn + m) * 255);
}

WashHsl? washHexToHsl(String hex) {
  final rgb = washHexToRgb(hex);
  if (rgb == null) return null;
  return washRgbToHsl(rgb.r, rgb.g, rgb.b);
}

String washHslToHex(double h, double s, double l) {
  final rgb = washHslToRgb(h, s, l);
  return washRgbToHex(rgb.r, rgb.g, rgb.b);
}

double washClamp(double value, double min, double max) =>
    math.max(min, math.min(max, value));
