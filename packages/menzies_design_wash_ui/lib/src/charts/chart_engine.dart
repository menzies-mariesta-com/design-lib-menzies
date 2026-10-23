import 'dart:math' as math;

import 'package:flutter/widgets.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

import 'downsample.dart';

enum WashChartKind { line, area, bar, pie }

class WashChartSeries {
  const WashChartSeries({
    required this.label,
    required this.points,
    this.color,
  });

  final String label;
  final List<WashChartPoint> points;
  final Color? color;
}

class WashChartEngine extends StatelessWidget {
  const WashChartEngine({
    required this.kind,
    required this.series,
    this.title,
    this.maxPoints = 512,
    super.key,
  });

  final WashChartKind kind;
  final List<WashChartSeries> series;
  final String? title;
  final int maxPoints;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return RepaintBoundary(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (title != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                title!,
                style: WashTypography.title(WashTokens.of(context).onSurface),
              ),
            ),
          Expanded(
            child: CustomPaint(
              painter: _WashChartPainter(
                kind: kind,
                series: series,
                tokens: tokens,
                maxPoints: maxPoints,
              ),
              child: const SizedBox.expand(),
            ),
          ),
          if (series.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Wrap(
                spacing: 12,
                children: series
                    .map(
                      (s) => Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 12,
                            height: 12,
                            color: s.color ?? tokens.primary,
                          ),
                          const SizedBox(width: 4),
                          Text(s.label, style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                    )
                    .toList(),
              ),
            ),
        ],
      ),
    );
  }
}

class _WashChartPainter extends CustomPainter {
  _WashChartPainter({
    required this.kind,
    required this.series,
    required this.tokens,
    required this.maxPoints,
  });

  final WashChartKind kind;
  final List<WashChartSeries> series;
  final WashTokens tokens;
  final int maxPoints;

  @override
  void paint(Canvas canvas, Size size) {
    final plot = Rect.fromLTWH(40, 8, size.width - 48, size.height - 32);
    final grid = Paint()
      ..color = tokens.inkBorder
      ..strokeWidth = 1;
    canvas.drawRect(plot, grid);

    if (series.isEmpty) return;

    switch (kind) {
      case WashChartKind.line:
      case WashChartKind.area:
        _paintCartesian(canvas, plot, fill: kind == WashChartKind.area);
      case WashChartKind.bar:
        _paintBars(canvas, plot);
      case WashChartKind.pie:
        _paintPie(canvas, plot);
    }
  }

  void _paintCartesian(Canvas canvas, Rect plot, {required bool fill}) {
    for (var si = 0; si < series.length; si++) {
      final s = series[si];
      final pts = downsampleSeries(s.points, maxPoints: maxPoints);
      if (pts.length < 2) continue;
      var minX = pts.first.x;
      var maxX = pts.first.x;
      var minY = pts.first.y;
      var maxY = pts.first.y;
      for (final p in pts) {
        minX = math.min(minX, p.x);
        maxX = math.max(maxX, p.x);
        minY = math.min(minY, p.y);
        maxY = math.max(maxY, p.y);
      }
      final color = s.color ?? tokens.primary;
      final path = Path();
      for (var i = 0; i < pts.length; i++) {
        final px = plot.left +
            (pts[i].x - minX) /
                (maxX - minX == 0 ? 1 : maxX - minX) *
                plot.width;
        final py = plot.bottom -
            (pts[i].y - minY) /
                (maxY - minY == 0 ? 1 : maxY - minY) *
                plot.height;
        if (i == 0) {
          path.moveTo(px, py);
        } else {
          path.lineTo(px, py);
        }
      }
      if (fill) {
        final fillPath = Path.from(path)
          ..lineTo(plot.right, plot.bottom)
          ..lineTo(plot.left, plot.bottom)
          ..close();
        canvas.drawPath(
          fillPath,
          Paint()..color = color.withValues(alpha: 0.25),
        );
      }
      canvas.drawPath(
        path,
        Paint()
          ..color = color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }
  }

  void _paintBars(Canvas canvas, Rect plot) {
    final s = series.first;
    final pts = downsampleSeries(s.points, maxPoints: maxPoints);
    if (pts.isEmpty) return;
    final barWidth = plot.width / pts.length * 0.7;
    var maxY = pts.map((e) => e.y).reduce(math.max);
    if (maxY == 0) maxY = 1;
    final color = s.color ?? tokens.primary;
    for (var i = 0; i < pts.length; i++) {
      final h = (pts[i].y / maxY) * plot.height;
      final left = plot.left + (plot.width / pts.length) * i + barWidth * 0.15;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(left, plot.bottom - h, barWidth, h),
          const Radius.circular(4),
        ),
        Paint()..color = color,
      );
    }
  }

  void _paintPie(Canvas canvas, Rect plot) {
    final s = series.first;
    final total = s.points.fold<double>(0, (a, p) => a + p.y.abs());
    if (total == 0) return;
    final center = plot.center;
    final radius = math.min(plot.width, plot.height) / 2 * 0.9;
    var start = -math.pi / 2;
    final colors = [
      tokens.primary,
      tokens.palette.accent,
      tokens.palette.secondary,
      tokens.palette.success,
    ];
    for (var i = 0; i < s.points.length; i++) {
      final sweep = (s.points[i].y / total) * 2 * math.pi;
      final paint = Paint()..color = colors[i % colors.length];
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        start,
        sweep,
        true,
        paint,
      );
      start += sweep;
    }
  }

  @override
  bool shouldRepaint(covariant _WashChartPainter oldDelegate) {
    return oldDelegate.kind != kind ||
        oldDelegate.series != series ||
        oldDelegate.tokens != tokens;
  }
}
