import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

/// Gallery chart preview used by every `charts-*` route.
///
/// The web demo composes each category from ApexCharts presets. Flutter cannot
/// reuse that runtime, so this widget renders a pigment-aware approximation per
/// category and section (line, area, bars, pie/donut, radar, heatmap, gauge,
/// funnel, treemap, candlestick, and dashboard styles).
class WashGalleryChart extends StatelessWidget {
  const WashGalleryChart({
    required this.categoryId,
    required this.sectionIndex,
    required this.sectionTitle,
    this.height = 300,
    super.key,
  });

  final String categoryId;
  final int sectionIndex;
  final String sectionTitle;
  final double height;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final spec = _buildSpec(categoryId, sectionIndex, sectionTitle, tokens);
    return SizedBox(
      height: height,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (spec.metric != null) ...[
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Expanded(
                    child: Text(
                      spec.metric!,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 12,
                        height: 1.4,
                      ),
                    ),
                  ),
                  Text(
                    spec.value!,
                    style:
                        WashTypography.displayLarge(tokens.onSurface).copyWith(
                      fontSize: 22,
                      height: 1.1,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (spec.delta != null) ...[
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: Color.alphaBlend(
                          tokens.palette.success.withValues(alpha: 0.12),
                          tokens.surface,
                        ),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        spec.delta!,
                        style: WashTypography.body(tokens.palette.success)
                            .copyWith(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
          Expanded(
            child: RepaintBoundary(
              child: CustomPaint(
                painter: _GalleryChartPainter(spec: spec, tokens: tokens),
                child: const SizedBox.expand(),
              ),
            ),
          ),
          if (spec.showLegend) ...[
            const SizedBox(height: 8),
            Wrap(
              spacing: 14,
              runSpacing: 6,
              children: [
                for (final item in _legendItems(spec))
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: item.color,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        item.label,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 11,
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

enum _ChartStyle {
  line,
  area,
  bar,
  stackedBar,
  pie,
  donut,
  scatter,
  radar,
  heatmap,
  boxplot,
  candlestick,
  funnel,
  gauge,
  radialBar,
  waffle,
  treemap,
  sunburst,
  timeline,
  violin,
  slope,
  sparklines,
  dashboard,
  mixed,
}

class _Series {
  const _Series({
    required this.label,
    required this.values,
    required this.color,
    this.dashed = false,
  });

  final String label;
  final List<double> values;
  final Color color;
  final bool dashed;
}

class _ChartSpec {
  const _ChartSpec({
    required this.style,
    required this.series,
    required this.labels,
    required this.colors,
    this.filled = false,
    this.step = false,
    this.showPoints = true,
    this.showDataLabels = false,
    this.horizontal = false,
    this.monochrome = false,
    this.pattern = false,
    this.rounded = false,
    this.showLegend = true,
    this.stacked = false,
    this.metric,
    this.value,
    this.delta,
  });

  final _ChartStyle style;
  final List<_Series> series;
  final List<String> labels;
  final List<Color> colors;
  final bool filled;
  final bool step;
  final bool showPoints;
  final bool showDataLabels;
  final bool horizontal;
  final bool monochrome;
  final bool pattern;
  final bool rounded;
  final bool showLegend;
  final bool stacked;
  final String? metric;
  final String? value;
  final String? delta;
}

List<double> _values(int seed, int count, {double min = 18, double max = 92}) {
  final rnd = math.Random(seed);
  return List.generate(count, (i) {
    final wave = (math.sin(i * 0.72 + seed * 0.11) + 1) / 2;
    final noise = rnd.nextDouble();
    return min + (max - min) * (wave * 0.68 + noise * 0.32);
  });
}

List<String> _weekLabels() =>
    const ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

_ChartSpec _buildSpec(
  String categoryId,
  int sectionIndex,
  String sectionTitle,
  WashTokens tokens,
) {
  final title = sectionTitle.toLowerCase();
  final seed = categoryId.hashCode ^ (sectionIndex * 7919);
  final palette = <Color>[
    tokens.palette.primary,
    tokens.palette.accent,
    tokens.palette.secondary,
    tokens.palette.warning,
    tokens.palette.success,
    tokens.palette.error,
  ];
  final labels = _weekLabels();
  final flags = (
    filled: title.contains('gradient') ||
        title.contains('area') ||
        categoryId == 'charts-area' ||
        categoryId == 'charts-range-area',
    step: title.contains('step'),
    horizontal: title.contains('horizontal'),
    rounded: title.contains('rounded') || title.contains('rounded'),
    monochrome: title.contains('monochrome'),
    pattern: title.contains('pattern'),
    dataLabels: title.contains('label') || title.contains('annotation'),
  );

  _ChartStyle style;
  if (categoryId == 'charts-pie') {
    style = title.contains('donut') || title.contains('doughnut')
        ? _ChartStyle.donut
        : _ChartStyle.pie;
  } else if (categoryId == 'charts-radialbar') {
    style = _ChartStyle.radialBar;
  } else if (categoryId == 'charts-polar-area' ||
      categoryId == 'charts-radar') {
    style = _ChartStyle.radar;
  } else if (categoryId == 'charts-gauge') {
    style = _ChartStyle.gauge;
  } else if (categoryId == 'charts-waffle') {
    style = _ChartStyle.waffle;
  } else if (categoryId == 'charts-heatmap') {
    style = _ChartStyle.heatmap;
  } else if (categoryId == 'charts-treemap') {
    style = _ChartStyle.treemap;
  } else if (categoryId == 'charts-sunburst') {
    style = _ChartStyle.sunburst;
  } else if (categoryId == 'charts-funnel') {
    style = _ChartStyle.funnel;
  } else if (categoryId == 'charts-timeline') {
    style = _ChartStyle.timeline;
  } else if (categoryId == 'charts-boxplot') {
    style = _ChartStyle.boxplot;
  } else if (categoryId == 'charts-violin') {
    style = _ChartStyle.violin;
  } else if (categoryId == 'charts-candlestick') {
    style = _ChartStyle.candlestick;
  } else if (categoryId == 'charts-scatter' ||
      categoryId == 'charts-beeswarm' ||
      categoryId == 'charts-bubble') {
    style = _ChartStyle.scatter;
  } else if (categoryId == 'charts-slope') {
    style = _ChartStyle.slope;
  } else if (categoryId == 'charts-sparklines') {
    style = _ChartStyle.sparklines;
  } else if (categoryId == 'charts-dashboards') {
    style = _ChartStyle.dashboard;
  } else if (categoryId == 'charts-mixed' ||
      categoryId == 'charts-custom-series' ||
      categoryId == 'charts-interactivity' ||
      categoryId == 'charts-narrative') {
    style = _ChartStyle.mixed;
  } else if (categoryId == 'charts-bar' || categoryId == 'charts-column') {
    style = title.contains('stack') ? _ChartStyle.stackedBar : _ChartStyle.bar;
  } else if (categoryId == 'charts-histogram') {
    style = _ChartStyle.bar;
  } else if (categoryId == 'charts-area' || categoryId == 'charts-range-area') {
    style = _ChartStyle.area;
  } else if (categoryId == 'charts-unit') {
    style = _ChartStyle.line;
  } else {
    style = flags.filled ? _ChartStyle.area : _ChartStyle.line;
  }

  final circular = style == _ChartStyle.pie ||
      style == _ChartStyle.donut ||
      style == _ChartStyle.radialBar ||
      style == _ChartStyle.gauge ||
      style == _ChartStyle.sunburst ||
      style == _ChartStyle.waffle;
  final labelsForStyle = switch (style) {
    _ChartStyle.pie || _ChartStyle.donut => const [
        'Mineral',
        'Indigo',
        'Celadon',
        'Vermilion',
        'Ochre',
      ],
    _ChartStyle.funnel => const [
        'Visits',
        'Trials',
        'Carts',
        'Checkouts',
        'Paid',
      ],
    _ChartStyle.timeline => const [
        'Prep',
        'Wash',
        'Dry',
        'Scan',
        'Ship',
      ],
    _ChartStyle.radar => const [
        'Line',
        'Area',
        'Bar',
        'Pie',
        'Radar',
        'Gauge',
      ],
    _ => labels,
  };

  final series = <_Series>[
    _Series(
      label: circular ? 'Pigment share' : 'Washes',
      values: _values(seed, labelsForStyle.length, min: 20, max: 95),
      color: palette[0],
      dashed: title.contains('dashed'),
    ),
  ];
  if (!circular && style != _ChartStyle.gauge && style != _ChartStyle.waffle) {
    series.add(
      _Series(
        label: 'Plates',
        values: _values(seed + 13, labelsForStyle.length, min: 12, max: 78),
        color: palette[1],
        dashed: title.contains('target'),
      ),
    );
  }
  if (style == _ChartStyle.mixed || style == _ChartStyle.dashboard) {
    series.add(
      _Series(
        label: 'Pigment load',
        values: _values(seed + 29, labelsForStyle.length, min: 30, max: 90),
        color: palette[2],
        dashed: true,
      ),
    );
  }

  String? metric;
  String? value;
  String? delta;
  if (style == _ChartStyle.dashboard ||
      style == _ChartStyle.sparklines ||
      style == _ChartStyle.gauge) {
    metric = switch (sectionIndex % 3) {
      0 => 'Weekly plate output',
      1 => 'Pigment load',
      _ => 'Studio throughput',
    };
    value = '${1200 + (seed.abs() % 3400)}';
    delta = '+${4 + (seed.abs() % 18)}.${seed.abs() % 10}%';
  }

  return _ChartSpec(
    style: style,
    series: series,
    labels: labelsForStyle,
    colors: palette,
    filled: flags.filled,
    step: flags.step,
    horizontal: flags.horizontal,
    monochrome: flags.monochrome,
    pattern: flags.pattern,
    rounded: flags.rounded,
    showDataLabels: flags.dataLabels,
    showPoints: style == _ChartStyle.line ||
        style == _ChartStyle.area ||
        style == _ChartStyle.mixed,
    showLegend:
        style != _ChartStyle.sparklines && style != _ChartStyle.dashboard,
    stacked: title.contains('stack'),
    metric: metric,
    value: value,
    delta: delta,
  );
}

List<({String label, Color color})> _legendItems(_ChartSpec spec) {
  if (spec.style == _ChartStyle.pie || spec.style == _ChartStyle.donut) {
    return [
      for (var i = 0; i < spec.labels.length; i++)
        (
          label: spec.labels[i],
          color: spec.monochrome
              ? spec.colors.first.withValues(alpha: 1 - i * 0.13)
              : spec.colors[i % spec.colors.length],
        ),
    ];
  }
  return [
    for (final series in spec.series)
      (label: series.label, color: series.color),
  ];
}

class _GalleryChartPainter extends CustomPainter {
  _GalleryChartPainter({required this.spec, required this.tokens});

  final _ChartSpec spec;
  final WashTokens tokens;

  @override
  void paint(Canvas canvas, Size size) {
    switch (spec.style) {
      case _ChartStyle.line:
      case _ChartStyle.area:
      case _ChartStyle.mixed:
        _paintCartesian(canvas, size);
      case _ChartStyle.bar:
      case _ChartStyle.stackedBar:
        _paintBars(canvas, size);
      case _ChartStyle.pie:
      case _ChartStyle.donut:
        _paintPie(canvas, size);
      case _ChartStyle.scatter:
        _paintScatter(canvas, size);
      case _ChartStyle.radar:
        _paintRadar(canvas, size);
      case _ChartStyle.heatmap:
        _paintHeatmap(canvas, size);
      case _ChartStyle.boxplot:
        _paintBoxplot(canvas, size);
      case _ChartStyle.candlestick:
        _paintCandlestick(canvas, size);
      case _ChartStyle.funnel:
        _paintFunnel(canvas, size);
      case _ChartStyle.gauge:
        _paintGauge(canvas, size);
      case _ChartStyle.radialBar:
        _paintRadialBar(canvas, size);
      case _ChartStyle.waffle:
        _paintWaffle(canvas, size);
      case _ChartStyle.treemap:
        _paintTreemap(canvas, size);
      case _ChartStyle.sunburst:
        _paintSunburst(canvas, size);
      case _ChartStyle.timeline:
        _paintTimeline(canvas, size);
      case _ChartStyle.violin:
        _paintViolin(canvas, size);
      case _ChartStyle.slope:
        _paintSlope(canvas, size);
      case _ChartStyle.sparklines:
        _paintSparklines(canvas, size);
      case _ChartStyle.dashboard:
        _paintDashboard(canvas, size);
    }
  }

  Rect _plot(Size size, {double left = 42, double right = 12}) =>
      Rect.fromLTRB(left, 8, size.width - right, size.height - 26);

  void _text(
    Canvas canvas,
    String text,
    Offset offset, {
    double size = 10,
    Color? color,
    TextAlign align = TextAlign.left,
    double maxWidth = 120,
    FontWeight weight = FontWeight.w400,
  }) {
    final painter = TextPainter(
      text: TextSpan(
        text: text,
        style: WashTypography.body(color ?? tokens.inkMuted).copyWith(
          fontSize: size,
          height: 1.2,
          fontWeight: weight,
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: align,
      maxLines: 1,
      ellipsis: '…',
    )..layout(maxWidth: maxWidth);
    var dx = offset.dx;
    if (align == TextAlign.center) dx -= painter.width / 2;
    if (align == TextAlign.right) dx -= painter.width;
    painter.paint(canvas, Offset(dx, offset.dy));
  }

  void _axes(Canvas canvas, Rect plot, {bool horizontal = false}) {
    final grid = Paint()
      ..color = tokens.inkBorder.withValues(alpha: 0.55)
      ..strokeWidth = 1;
    for (var i = 0; i <= 4; i++) {
      final y = plot.top + plot.height * i / 4;
      canvas.drawLine(Offset(plot.left, y), Offset(plot.right, y), grid);
      if (!horizontal) {
        _text(
          canvas,
          '${100 - i * 25}',
          Offset(plot.left - 8, y - 6),
          align: TextAlign.right,
          size: 9,
        );
      }
    }
    if (!horizontal && spec.labels.isNotEmpty) {
      final step = plot.width / spec.labels.length;
      for (var i = 0; i < spec.labels.length; i++) {
        _text(
          canvas,
          spec.labels[i],
          Offset(plot.left + step * i + step / 2, plot.bottom + 7),
          align: TextAlign.center,
          size: 9,
          maxWidth: step,
        );
      }
    }
  }

  double _x(Rect plot, int i, int n) =>
      plot.left + (n <= 1 ? 0 : plot.width * i / (n - 1));

  double _y(Rect plot, double value, double min, double max) =>
      plot.bottom -
      (value - min) / (max - min == 0 ? 1 : max - min) * plot.height;

  void _paintCartesian(Canvas canvas, Size size) {
    final plot = _plot(size);
    _axes(canvas, plot);
    if (spec.stacked && spec.style == _ChartStyle.area) {
      _drawStackedAreas(canvas, plot);
      return;
    }
    final all = spec.series.expand((s) => s.values).toList();
    final min = all.reduce(math.min) * 0.7;
    final max = all.reduce(math.max) * 1.08;
    for (final s in spec.series) {
      final isLine = s == spec.series.last && spec.style == _ChartStyle.mixed;
      if (spec.style == _ChartStyle.mixed && !isLine) {
        _drawBarsForSeries(canvas, plot, s, 0, 1, min, max);
        continue;
      }
      _drawLineSeries(canvas, plot, s, min, max);
    }
  }

  void _drawStackedAreas(Canvas canvas, Rect plot) {
    final n = spec.series.first.values.length;
    final totals = List<double>.filled(n, 0);
    for (final s in spec.series) {
      for (var i = 0; i < n; i++) {
        totals[i] += s.values[i];
      }
    }
    final max = totals.reduce(math.max) * 1.04;
    final base = List<double>.filled(n, 0);
    for (final s in spec.series) {
      final top = <Offset>[];
      final bottom = <Offset>[];
      for (var i = 0; i < n; i++) {
        final x = _x(plot, i, n);
        top.add(
          Offset(
            x,
            plot.bottom - (base[i] + s.values[i]) / max * plot.height,
          ),
        );
        bottom.add(Offset(x, plot.bottom - base[i] / max * plot.height));
        base[i] += s.values[i];
      }
      final path = Path()..moveTo(top.first.dx, top.first.dy);
      for (var i = 1; i < top.length; i++) {
        path.lineTo(top[i].dx, top[i].dy);
      }
      for (var i = bottom.length - 1; i >= 0; i--) {
        path.lineTo(bottom[i].dx, bottom[i].dy);
      }
      path.close();
      canvas.drawPath(
        path,
        Paint()..color = s.color.withValues(alpha: 0.35),
      );
      final line = Path()..moveTo(top.first.dx, top.first.dy);
      for (var i = 1; i < top.length; i++) {
        line.lineTo(top[i].dx, top[i].dy);
      }
      canvas.drawPath(
        line,
        Paint()
          ..color = s.color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }
  }

  void _drawLineSeries(
    Canvas canvas,
    Rect plot,
    _Series s,
    double min,
    double max,
  ) {
    final n = s.values.length;
    if (n < 2) return;
    final points = <Offset>[
      for (var i = 0; i < n; i++)
        Offset(_x(plot, i, n), _y(plot, s.values[i], min, max)),
    ];
    final path = Path()..moveTo(points.first.dx, points.first.dy);
    if (spec.step) {
      for (var i = 1; i < points.length; i++) {
        path.lineTo(points[i].dx, points[i - 1].dy);
        path.lineTo(points[i].dx, points[i].dy);
      }
    } else {
      for (var i = 1; i < points.length; i++) {
        final prev = points[i - 1];
        final curr = points[i];
        final mid = (prev.dx + curr.dx) / 2;
        path.cubicTo(mid, prev.dy, mid, curr.dy, curr.dx, curr.dy);
      }
    }
    if (spec.filled || spec.style == _ChartStyle.area) {
      final fill = Path.from(path)
        ..lineTo(points.last.dx, plot.bottom)
        ..lineTo(points.first.dx, plot.bottom)
        ..close();
      canvas.drawPath(
        fill,
        Paint()
          ..shader = LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              s.color.withValues(alpha: 0.30),
              s.color.withValues(alpha: 0.02),
            ],
          ).createShader(plot),
      );
    }
    final stroke = Paint()
      ..color = s.color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.4
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    if (s.dashed) {
      _drawDashedPath(canvas, path, stroke);
    } else {
      canvas.drawPath(path, stroke);
    }
    if (spec.showPoints) {
      for (final p in points) {
        canvas.drawCircle(p, 3.2, Paint()..color = tokens.surface);
        canvas.drawCircle(
          p,
          3.2,
          Paint()
            ..color = s.color
            ..style = PaintingStyle.stroke
            ..strokeWidth = 1.8,
        );
      }
    }
    if (spec.showDataLabels) {
      for (var i = 0; i < points.length; i++) {
        if (i % 2 != 0) continue;
        _text(
          canvas,
          s.values[i].round().toString(),
          Offset(points[i].dx, points[i].dy - 15),
          align: TextAlign.center,
          size: 9,
          color: s.color,
          weight: FontWeight.w600,
        );
      }
    }
  }

  void _drawDashedPath(Canvas canvas, Path path, Paint paint) {
    for (final metric in path.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final end = math.min(distance + 7, metric.length);
        canvas.drawPath(metric.extractPath(distance, end), paint);
        distance += 12;
      }
    }
  }

  void _paintBars(Canvas canvas, Size size) {
    final plot = _plot(size);
    if (spec.horizontal) {
      _axes(canvas, plot, horizontal: true);
    } else {
      _axes(canvas, plot);
    }
    final all = spec.series.expand((s) => s.values).toList();
    final max = all.reduce(math.max) * 1.1;
    if (spec.style == _ChartStyle.stackedBar) {
      final n = spec.series.first.values.length;
      final groupWidth = plot.width / n;
      final barWidth = groupWidth * 0.54;
      final stacked = List<double>.filled(n, 0);
      for (var si = 0; si < spec.series.length; si++) {
        final s = spec.series[si];
        for (var i = 0; i < n; i++) {
          final value = s.values[i];
          final bottom = plot.bottom - stacked[i] / max * plot.height;
          final h = value / max * plot.height;
          final left = plot.left + groupWidth * i + (groupWidth - barWidth) / 2;
          canvas.drawRRect(
            RRect.fromRectAndRadius(
              Rect.fromLTWH(left, bottom - h, barWidth, h),
              const Radius.circular(4),
            ),
            Paint()..color = s.color,
          );
          stacked[i] += value;
        }
      }
      return;
    }
    final n = spec.series.first.values.length;
    final groupWidth = plot.width / n;
    final barWidth = groupWidth * 0.58 / spec.series.length;
    for (var si = 0; si < spec.series.length; si++) {
      final s = spec.series[si];
      for (var i = 0; i < n; i++) {
        final value = s.values[i];
        final left = plot.left +
            groupWidth * i +
            (groupWidth - barWidth * spec.series.length) / 2 +
            barWidth * si;
        if (spec.horizontal) {
          final w = value / max * plot.width;
          final top = plot.bottom - groupWidth * i - groupWidth * 0.7;
          canvas.drawRRect(
            RRect.fromRectAndRadius(
              Rect.fromLTWH(plot.left, top, w, groupWidth * 0.55),
              const Radius.circular(4),
            ),
            Paint()..color = s.color,
          );
        } else {
          final h = value / max * plot.height;
          canvas.drawRRect(
            RRect.fromRectAndRadius(
              Rect.fromLTWH(left, plot.bottom - h, barWidth, h),
              Radius.circular(spec.rounded ? barWidth / 2 : 4),
            ),
            Paint()..color = s.color,
          );
        }
      }
    }
  }

  void _drawBarsForSeries(
    Canvas canvas,
    Rect plot,
    _Series s,
    int si,
    int count,
    double min,
    double max,
  ) {
    final n = s.values.length;
    final groupWidth = plot.width / n;
    final barWidth = groupWidth * 0.58 / count;
    for (var i = 0; i < n; i++) {
      final h = (s.values[i] - min) / (max - min) * plot.height;
      final left = plot.left +
          groupWidth * i +
          (groupWidth - barWidth * count) / 2 +
          barWidth * si;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(left, plot.bottom - h, barWidth, h),
          const Radius.circular(4),
        ),
        Paint()..color = s.color.withValues(alpha: 0.45),
      );
    }
  }

  void _paintPie(Canvas canvas, Size size) {
    final n = spec.series.first.values.length;
    final total = spec.series.first.values.fold<double>(0, (a, b) => a + b);
    if (total == 0) return;
    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) * 0.36;
    var start = -math.pi / 2;
    for (var i = 0; i < n; i++) {
      final sweep = spec.series.first.values[i] / total * 2 * math.pi;
      final color = spec.monochrome
          ? spec.colors.first.withValues(alpha: 1 - i * 0.13)
          : spec.colors[i % spec.colors.length];
      final paint = Paint()..color = color;
      if (spec.rounded) {
        paint
          ..style = PaintingStyle.stroke
          ..strokeWidth = (spec.style == _ChartStyle.donut ? 34 : 58)
          ..strokeCap = StrokeCap.round;
        final gap = 0.03;
        final rect = Rect.fromCircle(
          center: center,
          radius: radius - paint.strokeWidth / 2,
        );
        canvas.drawArc(rect, start + gap, sweep - gap * 2, false, paint);
      } else {
        canvas.drawArc(
          Rect.fromCircle(center: center, radius: radius),
          start,
          sweep,
          true,
          paint,
        );
      }
      if (spec.pattern) {
        final angle = start + sweep / 2;
        for (var r = 6.0; r < radius - 6; r += 10) {
          final p = Offset(
            center.dx + math.cos(angle) * r,
            center.dy + math.sin(angle) * r,
          );
          canvas.drawCircle(
            p,
            1.2,
            Paint()..color = tokens.surface.withValues(alpha: 0.55),
          );
        }
      }
      start += sweep;
    }
    if (spec.style == _ChartStyle.donut) {
      canvas.drawCircle(center, radius * 0.56, Paint()..color = tokens.surface);
      _text(
        canvas,
        '100%',
        Offset(center.dx, center.dy - 10),
        align: TextAlign.center,
        size: 20,
        color: tokens.onSurface,
        weight: FontWeight.w600,
      );
      _text(
        canvas,
        'pigment share',
        Offset(center.dx, center.dy + 12),
        align: TextAlign.center,
        size: 10,
      );
    }
  }

  void _paintScatter(Canvas canvas, Size size) {
    final plot = _plot(size);
    _axes(canvas, plot);
    final rnd = math.Random(spec.series.first.values.length * 17);
    for (var si = 0; si < spec.series.length; si++) {
      final s = spec.series[si];
      final color = s.color;
      for (var i = 0; i < 24; i++) {
        final x = plot.left + rnd.nextDouble() * plot.width;
        final y = plot.bottom - rnd.nextDouble() * plot.height;
        final r = 3.0 + rnd.nextDouble() * (si == 1 ? 8 : 3);
        canvas.drawCircle(
          Offset(x, y),
          r,
          Paint()..color = color.withValues(alpha: 0.55),
        );
      }
    }
  }

  void _paintRadar(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) * 0.34;
    final axes = spec.labels.length;
    final gridPaint = Paint()
      ..color = tokens.inkBorder
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    for (var ring = 1; ring <= 3; ring++) {
      final path = Path();
      for (var i = 0; i < axes; i++) {
        final angle = -math.pi / 2 + i * 2 * math.pi / axes;
        final p = Offset(
          center.dx + math.cos(angle) * radius * ring / 3,
          center.dy + math.sin(angle) * radius * ring / 3,
        );
        if (i == 0) {
          path.moveTo(p.dx, p.dy);
        } else {
          path.lineTo(p.dx, p.dy);
        }
      }
      path.close();
      canvas.drawPath(path, gridPaint);
    }
    for (var i = 0; i < axes; i++) {
      final angle = -math.pi / 2 + i * 2 * math.pi / axes;
      canvas.drawLine(
        center,
        Offset(
          center.dx + math.cos(angle) * radius,
          center.dy + math.sin(angle) * radius,
        ),
        gridPaint,
      );
      _text(
        canvas,
        spec.labels[i],
        Offset(
          center.dx + math.cos(angle) * (radius + 16),
          center.dy + math.sin(angle) * (radius + 16) - 6,
        ),
        align: TextAlign.center,
        size: 9,
      );
    }
    for (final s in spec.series) {
      final path = Path();
      for (var i = 0; i < axes; i++) {
        final angle = -math.pi / 2 + i * 2 * math.pi / axes;
        final value = s.values[i % s.values.length] / 100;
        final p = Offset(
          center.dx + math.cos(angle) * radius * value,
          center.dy + math.sin(angle) * radius * value,
        );
        if (i == 0) {
          path.moveTo(p.dx, p.dy);
        } else {
          path.lineTo(p.dx, p.dy);
        }
      }
      path.close();
      canvas.drawPath(path, Paint()..color = s.color.withValues(alpha: 0.18));
      canvas.drawPath(
        path,
        Paint()
          ..color = s.color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
    }
  }

  void _paintHeatmap(Canvas canvas, Size size) {
    final plot = _plot(size, left: 48);
    const rows = 5;
    const cols = 8;
    final cellW = plot.width / cols;
    final cellH = plot.height / rows;
    final rnd = math.Random(97);
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        final value = (math.sin(c * 0.7 + r * 1.1) + 1) / 2 * 0.8 +
            rnd.nextDouble() * 0.2;
        final color = Color.alphaBlend(
          spec.colors.first.withValues(alpha: 0.12 + value * 0.78),
          tokens.surface,
        );
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromLTWH(
              plot.left + c * cellW + 1.5,
              plot.top + r * cellH + 1.5,
              cellW - 3,
              cellH - 3,
            ),
            const Radius.circular(4),
          ),
          Paint()..color = color,
        );
      }
    }
    for (var r = 0; r < rows; r++) {
      _text(
        canvas,
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][r],
        Offset(plot.left - 8, plot.top + r * cellH + cellH / 2 - 5),
        align: TextAlign.right,
        size: 9,
      );
    }
    for (var c = 0; c < cols; c++) {
      _text(
        canvas,
        '${c + 8}h',
        Offset(plot.left + c * cellW + cellW / 2, plot.bottom + 6),
        align: TextAlign.center,
        size: 8,
      );
    }
  }

  void _paintBoxplot(Canvas canvas, Size size) {
    final plot = _plot(size);
    _axes(canvas, plot);
    final rnd = math.Random(41);
    final n = 5;
    final step = plot.width / n;
    for (var i = 0; i < n; i++) {
      final cx = plot.left + step * i + step / 2;
      final q1 = 30 + rnd.nextDouble() * 15;
      final median = q1 + 10 + rnd.nextDouble() * 10;
      final q3 = median + 8 + rnd.nextDouble() * 12;
      final low = q1 - 8 - rnd.nextDouble() * 8;
      final high = q3 + 8 + rnd.nextDouble() * 8;
      double y(double v) => plot.bottom - v / 100 * plot.height;
      final boxW = step * 0.42;
      final rect = Rect.fromLTRB(cx - boxW / 2, y(q3), cx + boxW / 2, y(q1));
      canvas.drawRect(
          rect, Paint()..color = spec.colors[0].withValues(alpha: 0.18));
      canvas.drawRect(
        rect,
        Paint()
          ..color = spec.colors[0]
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.5,
      );
      canvas.drawLine(
        Offset(cx - boxW / 2, y(median)),
        Offset(cx + boxW / 2, y(median)),
        Paint()
          ..color = spec.colors[0]
          ..strokeWidth = 2,
      );
      canvas.drawLine(
        Offset(cx, y(low)),
        Offset(cx, y(high)),
        Paint()
          ..color = tokens.inkMuted
          ..strokeWidth = 1,
      );
      canvas.drawCircle(
          Offset(cx, y(high)), 3, Paint()..color = spec.colors[0]);
      canvas.drawCircle(Offset(cx, y(low)), 3, Paint()..color = spec.colors[0]);
    }
  }

  void _paintCandlestick(Canvas canvas, Size size) {
    final plot = _plot(size);
    _axes(canvas, plot);
    final rnd = math.Random(73);
    final n = 12;
    final step = plot.width / n;
    var price = 50.0;
    for (var i = 0; i < n; i++) {
      final open = price;
      final close = (open + (rnd.nextDouble() - 0.45) * 22).clamp(12.0, 88.0);
      final high = math.max(open, close) + rnd.nextDouble() * 8;
      final low = math.min(open, close) - rnd.nextDouble() * 8;
      price = close;
      final cx = plot.left + step * i + step / 2;
      double y(double v) => plot.bottom - v / 100 * plot.height;
      final rising = close >= open;
      final color = rising ? tokens.palette.success : tokens.palette.error;
      canvas.drawLine(
        Offset(cx, y(high)),
        Offset(cx, y(low)),
        Paint()
          ..color = color
          ..strokeWidth = 1.2,
      );
      final body = Rect.fromLTRB(
        cx - step * 0.22,
        y(math.max(open, close)),
        cx + step * 0.22,
        y(math.min(open, close)),
      );
      canvas.drawRect(body, Paint()..color = color.withValues(alpha: 0.75));
    }
  }

  void _paintFunnel(Canvas canvas, Size size) {
    final centerX = size.width / 2;
    final top = 12.0;
    final available = size.height - 24;
    final n = 5;
    final step = available / n;
    for (var i = 0; i < n; i++) {
      final t = i / n;
      final topWidth = size.width * (0.72 - t * 0.5);
      final bottomWidth = size.width * (0.72 - (i + 1) / n * 0.5);
      final y0 = top + step * i;
      final y1 = y0 + step - 4;
      final path = Path()
        ..moveTo(centerX - topWidth / 2, y0)
        ..lineTo(centerX + topWidth / 2, y0)
        ..lineTo(centerX + bottomWidth / 2, y1)
        ..lineTo(centerX - bottomWidth / 2, y1)
        ..close();
      canvas.drawPath(
        path,
        Paint()
          ..color = spec.colors[i % spec.colors.length].withValues(alpha: 0.75),
      );
      _text(
        canvas,
        '${spec.labels[i]} · ${100 - i * 17}%',
        Offset(centerX, y0 + step / 2 - 6),
        align: TextAlign.center,
        size: 11,
        color: tokens.onSurface,
        weight: FontWeight.w600,
      );
    }
  }

  void _paintGauge(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height * 0.58);
    final radius = math.min(size.width, size.height) * 0.36;
    final rect = Rect.fromCircle(center: center, radius: radius);
    final track = Paint()
      ..color = tokens.inkBorder
      ..style = PaintingStyle.stroke
      ..strokeWidth = 16
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, math.pi * 0.75, math.pi * 1.5, false, track);
    final value = spec.series.first.values.first.clamp(0, 100) / 100;
    canvas.drawArc(
      rect,
      math.pi * 0.75,
      math.pi * 1.5 * value,
      false,
      Paint()
        ..color = spec.colors.first
        ..style = PaintingStyle.stroke
        ..strokeWidth = 16
        ..strokeCap = StrokeCap.round,
    );
    _text(
      canvas,
      '${(value * 100).round()}%',
      Offset(center.dx, center.dy - 18),
      align: TextAlign.center,
      size: 30,
      color: tokens.onSurface,
      weight: FontWeight.w600,
    );
    _text(
      canvas,
      'Pigment load',
      Offset(center.dx, center.dy + 18),
      align: TextAlign.center,
      size: 11,
    );
    _text(canvas, '0', Offset(center.dx - radius, center.dy + 40), size: 9);
    _text(
      canvas,
      '100',
      Offset(center.dx + radius, center.dy + 40),
      align: TextAlign.right,
      size: 9,
    );
  }

  void _paintRadialBar(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final maxRadius = math.min(size.width, size.height) * 0.38;
    final values = [0.82, 0.63, 0.46];
    for (var i = 0; i < values.length; i++) {
      final radius = maxRadius - i * 22;
      final rect = Rect.fromCircle(center: center, radius: radius);
      canvas.drawArc(
        rect,
        -math.pi / 2,
        math.pi * 2,
        false,
        Paint()
          ..color = tokens.inkBorder.withValues(alpha: 0.5)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 12
          ..strokeCap = StrokeCap.round,
      );
      canvas.drawArc(
        rect,
        -math.pi / 2,
        math.pi * 2 * values[i],
        false,
        Paint()
          ..color = spec.colors[i % spec.colors.length]
          ..style = PaintingStyle.stroke
          ..strokeWidth = 12
          ..strokeCap = StrokeCap.round,
      );
    }
    _text(
      canvas,
      '82%',
      Offset(center.dx, center.dy - 8),
      align: TextAlign.center,
      size: 24,
      color: tokens.onSurface,
      weight: FontWeight.w600,
    );
  }

  void _paintWaffle(Canvas canvas, Size size) {
    final cell = math.min(size.width, size.height - 20) / 10;
    final startX = (size.width - cell * 10) / 2;
    final startY = (size.height - cell * 10) / 2;
    final filled = (spec.series.first.values.first / 100 * 100).round();
    for (var r = 0; r < 10; r++) {
      for (var c = 0; c < 10; c++) {
        final index = r * 10 + c;
        final color = index < filled
            ? spec.colors[(index ~/ 18) % spec.colors.length]
            : tokens.inkBorder.withValues(alpha: 0.45);
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            Rect.fromLTWH(
              startX + c * cell + 1,
              startY + r * cell + 1,
              cell - 2,
              cell - 2,
            ),
            const Radius.circular(2),
          ),
          Paint()..color = color,
        );
      }
    }
  }

  void _paintTreemap(Canvas canvas, Size size) {
    final rects = <Rect>[
      Rect.fromLTWH(0, 0, size.width * 0.52, size.height * 0.58),
      Rect.fromLTWH(
          size.width * 0.52, 0, size.width * 0.48, size.height * 0.34),
      Rect.fromLTWH(size.width * 0.52, size.height * 0.34, size.width * 0.22,
          size.height * 0.24),
      Rect.fromLTWH(size.width * 0.74, size.height * 0.34, size.width * 0.26,
          size.height * 0.24),
      Rect.fromLTWH(
          0, size.height * 0.58, size.width * 0.34, size.height * 0.42),
      Rect.fromLTWH(size.width * 0.34, size.height * 0.58, size.width * 0.66,
          size.height * 0.42),
    ];
    final labels = [
      'Mineral',
      'Indigo',
      'Celadon',
      'Ochre',
      'Rose',
      'Graphite'
    ];
    for (var i = 0; i < rects.length; i++) {
      final r = rects[i].deflate(2);
      canvas.drawRRect(
        RRect.fromRectAndRadius(r, const Radius.circular(4)),
        Paint()..color = spec.colors[i % spec.colors.length],
      );
      _text(
        canvas,
        labels[i],
        Offset(r.left + 8, r.top + 8),
        size: 10,
        color: tokens.onPrimary,
        weight: FontWeight.w600,
        maxWidth: r.width - 16,
      );
    }
  }

  void _paintSunburst(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final inner = math.min(size.width, size.height) * 0.16;
    final outer = math.min(size.width, size.height) * 0.4;
    var start = -math.pi / 2;
    for (var ring = 0; ring < 2; ring++) {
      final r0 = inner + ring * (outer - inner) / 2;
      final r1 = r0 + (outer - inner) / 2;
      for (var i = 0; i < 6; i++) {
        final sweep = math.pi * 2 / 6;
        final color = spec.colors[(i + ring) % spec.colors.length];
        final path = Path()
          ..arcTo(
              Rect.fromCircle(center: center, radius: r1), start, sweep, true)
          ..arcTo(Rect.fromCircle(center: center, radius: r0), start + sweep,
              -sweep, false)
          ..close();
        canvas.drawPath(
            path, Paint()..color = color.withValues(alpha: 1 - ring * 0.25));
      }
      start += 0.2;
    }
  }

  void _paintTimeline(Canvas canvas, Size size) {
    final left = 64.0;
    final right = size.width - 12;
    final rows = 5;
    final rowH = (size.height - 16) / rows;
    final rnd = math.Random(53);
    for (var r = 0; r < rows; r++) {
      _text(
        canvas,
        spec.labels[r],
        Offset(8, 8 + r * rowH + rowH / 2 - 5),
        size: 9,
      );
      final start = left + rnd.nextDouble() * (right - left) * 0.35;
      final len = (right - left) * (0.25 + rnd.nextDouble() * 0.45);
      final top = 8 + r * rowH + rowH * 0.25;
      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(start, top, len, rowH * 0.5),
          const Radius.circular(6),
        ),
        Paint()..color = spec.colors[r % spec.colors.length],
      );
    }
  }

  void _paintViolin(Canvas canvas, Size size) {
    final plot = _plot(size);
    final n = 4;
    final step = plot.width / n;
    for (var i = 0; i < n; i++) {
      final cx = plot.left + step * i + step / 2;
      final width = step * 0.3;
      final path = Path();
      for (var j = 0; j <= 20; j++) {
        final t = j / 20;
        final w = math.sin(t * math.pi) * width;
        final p = Offset(cx - w, plot.top + plot.height * t);
        if (j == 0) {
          path.moveTo(p.dx, p.dy);
        } else {
          path.lineTo(p.dx, p.dy);
        }
      }
      for (var j = 20; j >= 0; j--) {
        final t = j / 20;
        final w = math.sin(t * math.pi) * width;
        path.lineTo(cx + w, plot.top + plot.height * t);
      }
      path.close();
      canvas.drawPath(
        path,
        Paint()
          ..color = spec.colors[i % spec.colors.length].withValues(alpha: 0.55),
      );
      _text(
        canvas,
        spec.labels[i],
        Offset(cx, plot.bottom + 7),
        align: TextAlign.center,
        size: 9,
      );
    }
  }

  void _paintSlope(Canvas canvas, Size size) {
    final plot = _plot(size);
    final left = plot.left + plot.width * 0.22;
    final right = plot.left + plot.width * 0.78;
    final n = spec.series.first.values.length.clamp(3, 6);
    final rnd = math.Random(67);
    for (var i = 0; i < n; i++) {
      final a = 0.15 + rnd.nextDouble() * 0.7;
      final b = 0.15 + rnd.nextDouble() * 0.7;
      final y0 = plot.bottom - plot.height * a;
      final y1 = plot.bottom - plot.height * b;
      final color = spec.colors[i % spec.colors.length];
      canvas.drawLine(
        Offset(left, y0),
        Offset(right, y1),
        Paint()
          ..color = color.withValues(alpha: 0.7)
          ..strokeWidth = 2,
      );
      canvas.drawCircle(Offset(left, y0), 4, Paint()..color = color);
      canvas.drawCircle(Offset(right, y1), 4, Paint()..color = color);
    }
  }

  void _paintSparklines(Canvas canvas, Size size) {
    final rows = 3;
    final rowH = size.height / rows;
    for (var r = 0; r < rows; r++) {
      final top = r * rowH + 8;
      final h = rowH - 16;
      final s = spec.series[r % spec.series.length];
      final points = <Offset>[
        for (var i = 0; i < s.values.length; i++)
          Offset(
            8 + (size.width - 16) * i / (s.values.length - 1),
            top + h - s.values[i] / 100 * h,
          ),
      ];
      final path = Path()..moveTo(points.first.dx, points.first.dy);
      for (var i = 1; i < points.length; i++) {
        path.lineTo(points[i].dx, points[i].dy);
      }
      canvas.drawPath(
        path,
        Paint()
          ..color = s.color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2,
      );
      _text(
        canvas,
        s.label,
        Offset(8, top - 2),
        size: 9,
      );
    }
  }

  void _paintDashboard(Canvas canvas, Size size) {
    final gap = 8.0;
    final w = (size.width - gap) / 2;
    final h = (size.height - gap) / 2;
    final rects = [
      Rect.fromLTWH(0, 0, w, h),
      Rect.fromLTWH(w + gap, 0, w, h),
      Rect.fromLTWH(0, h + gap, w, h),
      Rect.fromLTWH(w + gap, h + gap, w, h),
    ];
    final labels = ['Line', 'Bars', 'Donut', 'Area'];
    for (var i = 0; i < rects.length; i++) {
      final r = rects[i];
      canvas.drawRRect(
        RRect.fromRectAndRadius(r, const Radius.circular(8)),
        Paint()..color = tokens.surfaceContainer.withValues(alpha: 0.35),
      );
      _text(
        canvas,
        labels[i],
        Offset(r.left + 8, r.top + 6),
        size: 9,
      );
      final plot = Rect.fromLTRB(
        r.left + 8,
        r.top + 22,
        r.right - 8,
        r.bottom - 8,
      );
      final s = spec.series[i % spec.series.length];
      if (i == 1) {
        final step = plot.width / s.values.length;
        for (var j = 0; j < s.values.length; j++) {
          final bh = s.values[j] / 100 * plot.height;
          canvas.drawRRect(
            RRect.fromRectAndRadius(
              Rect.fromLTWH(
                plot.left + step * j + step * 0.15,
                plot.bottom - bh,
                step * 0.7,
                bh,
              ),
              const Radius.circular(2),
            ),
            Paint()..color = s.color.withValues(alpha: 0.7),
          );
        }
      } else if (i == 2) {
        final center = plot.center;
        final radius = math.min(plot.width, plot.height) / 2;
        var start = -math.pi / 2;
        for (var j = 0; j < 5; j++) {
          final sweep = math.pi * 2 / 5;
          canvas.drawArc(
            Rect.fromCircle(center: center, radius: radius),
            start,
            sweep - 0.05,
            true,
            Paint()..color = spec.colors[j % spec.colors.length],
          );
          start += sweep;
        }
      } else {
        final path = Path();
        for (var j = 0; j < s.values.length; j++) {
          final p = Offset(
            plot.left + plot.width * j / (s.values.length - 1),
            plot.bottom - plot.height * s.values[j] / 100,
          );
          if (j == 0) {
            path.moveTo(p.dx, p.dy);
          } else {
            path.lineTo(p.dx, p.dy);
          }
        }
        canvas.drawPath(
          path,
          Paint()
            ..color = s.color
            ..style = PaintingStyle.stroke
            ..strokeWidth = 1.8,
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant _GalleryChartPainter oldDelegate) =>
      oldDelegate.spec != spec || oldDelegate.tokens != tokens;
}
