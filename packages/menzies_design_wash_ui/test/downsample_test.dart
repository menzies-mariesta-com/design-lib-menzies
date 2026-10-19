import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/charts.dart';

void main() {
  test('downsample reduces point count', () {
    final pts = List.generate(1000, (i) => WashChartPoint(i.toDouble(), i % 7));
    final out = downsampleSeries(pts, maxPoints: 50);
    expect(out.length, lessThanOrEqualTo(50));
    expect(out.first.x, pts.first.x);
    expect(out.last.x, pts.last.x);
  });
}
