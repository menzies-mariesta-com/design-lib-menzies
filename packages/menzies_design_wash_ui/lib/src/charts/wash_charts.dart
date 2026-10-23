import 'package:flutter/widgets.dart';

import 'chart_engine.dart';
import 'downsample.dart';

/// Demo-friendly sample data.
List<WashChartPoint> washDemoSeries(int count) {
  return List.generate(
    count,
    (i) => WashChartPoint(i.toDouble(), (i * 3 % 17) + (i % 5).toDouble()),
  );
}

class WashLineChart extends StatelessWidget {
  const WashLineChart({this.title, this.data, super.key});
  final String? title;
  final List<WashChartPoint>? data;

  @override
  Widget build(BuildContext context) {
    return WashChartEngine(
      kind: WashChartKind.line,
      title: title ?? 'Line',
      series: [
        WashChartSeries(
          label: 'Series',
          points: data ?? washDemoSeries(48),
        ),
      ],
    );
  }
}

class WashAreaChart extends StatelessWidget {
  const WashAreaChart({super.key});
  @override
  Widget build(BuildContext context) {
    return WashChartEngine(
      kind: WashChartKind.area,
      title: 'Area',
      series: [WashChartSeries(label: 'Area', points: washDemoSeries(64))],
    );
  }
}

class WashBarChart extends StatelessWidget {
  const WashBarChart({super.key});
  @override
  Widget build(BuildContext context) {
    return WashChartEngine(
      kind: WashChartKind.bar,
      title: 'Bar',
      series: [WashChartSeries(label: 'Bar', points: washDemoSeries(12))],
    );
  }
}

class WashPieChart extends StatelessWidget {
  const WashPieChart({super.key});
  @override
  Widget build(BuildContext context) {
    return WashChartEngine(
      kind: WashChartKind.pie,
      title: 'Pie',
      series: [
        WashChartSeries(
          label: 'Segments',
          points: const [
            WashChartPoint(0, 30),
            WashChartPoint(1, 20),
            WashChartPoint(2, 25),
            WashChartPoint(3, 25),
          ],
        ),
      ],
    );
  }
}

/// Category chart: uses line/bar/pie engine with category label.
class WashCategoryChart extends StatelessWidget {
  const WashCategoryChart({required this.categoryId, super.key});

  final String categoryId;

  @override
  Widget build(BuildContext context) {
    final kind = _kindFor(categoryId);
    return WashChartEngine(
      kind: kind,
      title: categoryId,
      series: [
        WashChartSeries(
          label: categoryId,
          points: washDemoSeries(_pointCount(categoryId)),
        ),
      ],
    );
  }

  static WashChartKind _kindFor(String id) {
    if (id.contains('pie') || id.contains('donut')) return WashChartKind.pie;
    if (id.contains('bar') ||
        id.contains('column') ||
        id.contains('histogram') ||
        id.contains('waffle')) {
      return WashChartKind.bar;
    }
    if (id.contains('area') || id.contains('range')) return WashChartKind.area;
    return WashChartKind.line;
  }

  static int _pointCount(String id) {
    if (id.contains('spark')) return 24;
    if (id.contains('dashboard')) return 8;
    return 48;
  }
}

/// All web gallery chart category ids.
const List<String> kWashChartCategoryIds = [
  'charts-area',
  'charts-bar',
  'charts-beeswarm',
  'charts-boxplot',
  'charts-bubble',
  'charts-candlestick',
  'charts-column',
  'charts-custom-series',
  'charts-dashboards',
  'charts-funnel',
  'charts-gauge',
  'charts-heatmap',
  'charts-histogram',
  'charts-interactivity',
  'charts-line',
  'charts-mixed',
  'charts-narrative',
  'charts-pie',
  'charts-polar-area',
  'charts-radar',
  'charts-radialbar',
  'charts-range-area',
  'charts-scatter',
  'charts-slope',
  'charts-sparklines',
  'charts-sunburst',
  'charts-timeline',
  'charts-treemap',
  'charts-unit',
  'charts-violin',
  'charts-waffle',
];
