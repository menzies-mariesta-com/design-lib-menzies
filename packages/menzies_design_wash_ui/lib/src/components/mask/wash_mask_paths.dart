import 'dart:math' as math;

import 'package:flutter/widgets.dart';

/// daisyUI 5.7.9 `mask-*` shapes (SVG viewBox + path `d`).
enum WashMaskShape {
  squircle,
  heart,
  hexagon,
  hexagon2,
  decagon,
  pentagon,
  diamond,
  square,
  circle,
  star,
  star2,
  triangle,
  triangle2,
  triangle3,
  triangle4,
}

enum WashMaskHalf { none, first, second }

class WashMaskDef {
  const WashMaskDef(this.viewW, this.viewH, this.d);
  final double viewW;
  final double viewH;
  final String d;
}

const Map<WashMaskShape, WashMaskDef> kWashMaskDefs = {
  WashMaskShape.squircle: WashMaskDef(
    200,
    200,
    "M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z",
  ),
  WashMaskShape.heart: WashMaskDef(
    200,
    185,
    "M100 184.606a15.384 15.384 0 0 1-8.653-2.678C53.565 156.28 37.205 138.695 28.182 127.7 8.952 104.264-.254 80.202.005 54.146.308 24.287 24.264 0 53.406 0c21.192 0 35.869 11.937 44.416 21.879a2.884 2.884 0 0 0 4.356 0C110.725 11.927 125.402 0 146.594 0c29.142 0 53.098 24.287 53.4 54.151.26 26.061-8.956 50.122-28.176 73.554-9.023 10.994-25.383 28.58-63.165 54.228a15.384 15.384 0 0 1-8.653 2.673Z",
  ),
  WashMaskShape.hexagon: WashMaskDef(
    182,
    201,
    "M.3 65.486c0-9.196 6.687-20.063 14.211-25.078l61.86-35.946c8.36-5.016 20.899-5.016 29.258 0l61.86 35.946c8.36 5.015 14.211 15.882 14.211 25.078v71.055c0 9.196-6.687 20.063-14.211 25.079l-61.86 35.945c-8.36 4.18-20.899 4.18-29.258 0L14.51 161.62C6.151 157.44.3 145.737.3 136.54V65.486Z",
  ),
  WashMaskShape.hexagon2: WashMaskDef(
    200,
    182,
    "M64.786 181.4c-9.196 0-20.063-6.687-25.079-14.21L3.762 105.33c-5.016-8.36-5.016-20.9 0-29.259l35.945-61.86C44.723 5.851 55.59 0 64.786 0h71.055c9.196 0 20.063 6.688 25.079 14.211l35.945 61.86c4.18 8.36 4.18 20.899 0 29.258l-35.945 61.86c-4.18 8.36-15.883 14.211-25.079 14.211H64.786Z",
  ),
  WashMaskShape.decagon: WashMaskDef(
    192,
    200,
    "m96 0 58.779 19.098 36.327 50v61.804l-36.327 50L96 200l-58.779-19.098-36.327-50V69.098l36.327-50z",
  ),
  WashMaskShape.pentagon: WashMaskDef(
    192,
    181,
    "m96 0 95.106 69.098-36.327 111.804H37.22L.894 69.098z",
  ),
  WashMaskShape.diamond: WashMaskDef(
    200,
    200,
    "m100 0 100 100-100 100L0 100z",
  ),
  WashMaskShape.square: WashMaskDef(
    200,
    200,
    "M0 0h200v200H0z",
  ),
  WashMaskShape.circle: WashMaskDef(
    200,
    200,
    "M100 0A100 100 0 1 1 100 200A100 100 0 1 1 100 0Z",
  ),
  WashMaskShape.star: WashMaskDef(
    192,
    180,
    "m96 137.263-58.779 42.024 22.163-68.389L.894 68.481l72.476-.243L96 0l22.63 68.238 72.476.243-58.49 42.417 22.163 68.389z",
  ),
  WashMaskShape.star2: WashMaskDef(
    192,
    180,
    "m96 153.044-58.779 26.243 7.02-63.513L.894 68.481l63.117-13.01L96 0l31.989 55.472 63.117 13.01-43.347 47.292 7.02 63.513z",
  ),
  WashMaskShape.triangle: WashMaskDef(
    174,
    149,
    "m87 148.476-86.603.185L43.86 74.423 87 0l43.14 74.423 43.463 74.238z",
  ),
  WashMaskShape.triangle2: WashMaskDef(
    174,
    150,
    "m87 .738 86.603-.184-43.463 74.238L87 149.214 43.86 74.792.397.554z",
  ),
  WashMaskShape.triangle3: WashMaskDef(
    150,
    174,
    "m149.369 87.107.185 86.603-74.239-43.463L.893 87.107l74.422-43.14L149.554.505z",
  ),
  WashMaskShape.triangle4: WashMaskDef(
    150,
    174,
    "M.631 87.107.446.505l74.239 43.462 74.422 43.14-74.422 43.14L.446 173.71z",
  ),
};

String washMaskClassName(WashMaskShape shape) {
  return switch (shape) {
    WashMaskShape.squircle => 'mask-squircle',
    WashMaskShape.heart => 'mask-heart',
    WashMaskShape.hexagon => 'mask-hexagon',
    WashMaskShape.hexagon2 => 'mask-hexagon-2',
    WashMaskShape.decagon => 'mask-decagon',
    WashMaskShape.pentagon => 'mask-pentagon',
    WashMaskShape.diamond => 'mask-diamond',
    WashMaskShape.square => 'mask-square',
    WashMaskShape.circle => 'mask-circle',
    WashMaskShape.star => 'mask-star',
    WashMaskShape.star2 => 'mask-star-2',
    WashMaskShape.triangle => 'mask-triangle',
    WashMaskShape.triangle2 => 'mask-triangle-2',
    WashMaskShape.triangle3 => 'mask-triangle-3',
    WashMaskShape.triangle4 => 'mask-triangle-4',
  };
}

/// Parse a subset of SVG path `d` into a Flutter [Path] in viewBox coordinates.
Path parseWashSvgPath(String d) {
  final path = Path();
  final tokens = _tokenizeSvgPath(d);
  var i = 0;
  double cx = 0, cy = 0;
  double startX = 0, startY = 0;
  double? prevCx, prevCy;
  String? prevCmd;

  double next() => double.parse(tokens[i++]);
  bool has() => i < tokens.length && !_isCmd(tokens[i]);

  while (i < tokens.length) {
    var cmd = tokens[i];
    if (_isCmd(cmd)) {
      i++;
    } else {
      cmd = prevCmd ?? 'L';
    }
    final rel = cmd == cmd.toLowerCase();
    final c = cmd.toUpperCase();

    switch (c) {
      case 'M':
        cx = rel ? cx + next() : next();
        cy = rel ? cy + next() : next();
        path.moveTo(cx, cy);
        startX = cx;
        startY = cy;
        prevCx = null;
        prevCy = null;
        prevCmd = rel ? 'l' : 'L';
        while (has()) {
          cx = rel ? cx + next() : next();
          cy = rel ? cy + next() : next();
          path.lineTo(cx, cy);
        }
      case 'L':
        prevCmd = cmd;
        while (has()) {
          cx = rel ? cx + next() : next();
          cy = rel ? cy + next() : next();
          path.lineTo(cx, cy);
        }
      case 'H':
        prevCmd = cmd;
        while (has()) {
          final x = next();
          cx = rel ? cx + x : x;
          path.lineTo(cx, cy);
        }
      case 'V':
        prevCmd = cmd;
        while (has()) {
          final y = next();
          cy = rel ? cy + y : y;
          path.lineTo(cx, cy);
        }
      case 'C':
        prevCmd = cmd;
        while (has()) {
          final x1 = rel ? cx + next() : next();
          final y1 = rel ? cy + next() : next();
          final x2 = rel ? cx + next() : next();
          final y2 = rel ? cy + next() : next();
          final x = rel ? cx + next() : next();
          final y = rel ? cy + next() : next();
          path.cubicTo(x1, y1, x2, y2, x, y);
          prevCx = x2;
          prevCy = y2;
          cx = x;
          cy = y;
        }
      case 'S':
        prevCmd = cmd;
        while (has()) {
          final x2 = rel ? cx + next() : next();
          final y2 = rel ? cy + next() : next();
          final x = rel ? cx + next() : next();
          final y = rel ? cy + next() : next();
          final px = prevCx;
          final py = prevCy;
          final x1 = px != null ? 2 * cx - px : cx;
          final y1 = py != null ? 2 * cy - py : cy;
          path.cubicTo(x1, y1, x2, y2, x, y);
          prevCx = x2;
          prevCy = y2;
          cx = x;
          cy = y;
        }
      case 'A':
        prevCmd = cmd;
        while (has()) {
          final rx = next();
          final ry = next();
          final rot = next();
          final large = next() != 0;
          final sweep = next() != 0;
          final x = rel ? cx + next() : next();
          final y = rel ? cy + next() : next();
          _arcTo(path, cx, cy, rx, ry, rot, large, sweep, x, y);
          cx = x;
          cy = y;
          prevCx = null;
          prevCy = null;
        }
      case 'Z':
        path.close();
        cx = startX;
        cy = startY;
        prevCx = null;
        prevCy = null;
        prevCmd = c;
      default:
        if (i < tokens.length && !_isCmd(tokens[i])) i++;
    }
  }
  return path;
}

List<String> _tokenizeSvgPath(String d) {
  final out = <String>[];
  final buf = StringBuffer();
  void flush() {
    if (buf.isNotEmpty) {
      out.add(buf.toString());
      buf.clear();
    }
  }

  for (var i = 0; i < d.length; i++) {
    final ch = d[i];
    if (_isCmdChar(ch)) {
      flush();
      out.add(ch);
    } else if (ch == ',' || ch == ' ' || ch == '\n' || ch == '\t') {
      flush();
    } else if (ch == '-') {
      final s = buf.toString();
      if (s.isNotEmpty && !s.endsWith('e') && !s.endsWith('E')) {
        flush();
      }
      buf.write(ch);
    } else if (ch == '.') {
      final s = buf.toString();
      if (s.contains('.')) {
        flush();
      }
      buf.write(ch);
    } else {
      buf.write(ch);
    }
  }
  flush();
  return out;
}

bool _isCmd(String t) => t.length == 1 && _isCmdChar(t);

bool _isCmdChar(String ch) {
  const cmds = 'MmLlHhVvCcSsQqTtAaZz';
  return cmds.contains(ch);
}

void _arcTo(
  Path path,
  double x1,
  double y1,
  double rx,
  double ry,
  double angleDeg,
  bool largeArc,
  bool sweep,
  double x2,
  double y2,
) {
  if (rx == 0 || ry == 0) {
    path.lineTo(x2, y2);
    return;
  }
  // Simplified ellipse arc via unit-circle transform (SVG spec subset).
  final phi = angleDeg * math.pi / 180;
  final cosPhi = math.cos(phi);
  final sinPhi = math.sin(phi);
  final dx = (x1 - x2) / 2;
  final dy = (y1 - y2) / 2;
  final x1p = cosPhi * dx + sinPhi * dy;
  final y1p = -sinPhi * dx + cosPhi * dy;
  var rx2 = rx * rx;
  var ry2 = ry * ry;
  final x1p2 = x1p * x1p;
  final y1p2 = y1p * y1p;
  final lam = x1p2 / rx2 + y1p2 / ry2;
  if (lam > 1) {
    final s = math.sqrt(lam);
    rx *= s;
    ry *= s;
    rx2 = rx * rx;
    ry2 = ry * ry;
  }
  var sq = ((rx2 * ry2) - (rx2 * y1p2) - (ry2 * x1p2)) /
      ((rx2 * y1p2) + (ry2 * x1p2));
  sq = sq < 0 ? 0 : sq;
  final coef = (largeArc == sweep ? -1 : 1) * math.sqrt(sq);
  final cxp = coef * (rx * y1p) / ry;
  final cyp = coef * (-ry * x1p) / rx;
  final cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
  final cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;

  double angle(double ux, double uy, double vx, double vy) {
    final sign = ux * vy - uy * vx < 0 ? -1.0 : 1.0;
    final dot = ((ux * vx + uy * vy) /
            (math.sqrt(ux * ux + uy * uy) * math.sqrt(vx * vx + vy * vy)))
        .clamp(-1.0, 1.0);
    return sign * math.acos(dot);
  }

  final start = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  var delta = angle(
    (x1p - cxp) / rx,
    (y1p - cyp) / ry,
    (-x1p - cxp) / rx,
    (-y1p - cyp) / ry,
  );
  if (!sweep && delta > 0) delta -= 2 * math.pi;
  if (sweep && delta < 0) delta += 2 * math.pi;

  final steps = math.max(1, (delta.abs() / (math.pi / 8)).ceil());
  for (var i = 1; i <= steps; i++) {
    final t = start + delta * (i / steps);
    final x = cx + rx * math.cos(t) * cosPhi - ry * math.sin(t) * sinPhi;
    final y = cy + rx * math.cos(t) * sinPhi + ry * math.sin(t) * cosPhi;
    path.lineTo(x, y);
  }
}

/// Fit [view] path into [target] with CSS `mask-size: contain` + centered.
Path washMaskPathFor(
  WashMaskShape shape,
  Size target, {
  WashMaskHalf half = WashMaskHalf.none,
}) {
  final def = kWashMaskDefs[shape]!;
  var base = parseWashSvgPath(def.d);

  if (half == WashMaskHalf.none) {
    final scale = math.min(target.width / def.viewW, target.height / def.viewH);
    final dx = (target.width - def.viewW * scale) / 2;
    final dy = (target.height - def.viewH * scale) / 2;
    final m = Matrix4.identity()
      ..translateByDouble(dx, dy, 0, 1)
      ..scaleByDouble(scale, scale, 1, 1);
    return base.transform(m.storage);
  }

  // daisyUI half: mask-size 200%, position 0% / 100% on X, center Y.
  final maskW = target.width * 2;
  final maskH = target.height * 2;
  final scale = math.min(maskW / def.viewW, maskH / def.viewH);
  final placedW = def.viewW * scale;
  final placedH = def.viewH * scale;
  final ox = (maskW - placedW) / 2;
  final oy = (maskH - placedH) / 2;
  final m = Matrix4.identity()
    ..translateByDouble(ox, oy, 0, 1)
    ..scaleByDouble(scale, scale, 1, 1);
  base = base.transform(m.storage);

  final dx = half == WashMaskHalf.second ? -target.width : 0.0;
  final dy = -target.height / 2;
  final shifted = base.shift(Offset(dx, dy));
  return Path.combine(
    PathOperation.intersect,
    shifted,
    Path()..addRect(Offset.zero & target),
  );
}

class WashMaskClipper extends CustomClipper<Path> {
  WashMaskClipper(this.shape, {this.half = WashMaskHalf.none});

  final WashMaskShape shape;
  final WashMaskHalf half;

  @override
  Path getClip(Size size) => washMaskPathFor(shape, size, half: half);

  @override
  bool shouldReclip(covariant WashMaskClipper oldClipper) =>
      oldClipper.shape != shape || oldClipper.half != half;
}
