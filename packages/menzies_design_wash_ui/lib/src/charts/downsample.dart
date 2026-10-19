class WashChartPoint {
  const WashChartPoint(this.x, this.y);
  final double x;
  final double y;
}

List<WashChartPoint> downsampleLttb(
  List<WashChartPoint> points,
  int targetPoints,
) {
  final threshold = targetPoints < 3 ? 3 : targetPoints;
  if (points.length <= threshold) return List.of(points);
  final sampled = <WashChartPoint>[points.first];
  final bucketSize = (points.length - 2) / (threshold - 2);
  var previousIndex = 0;
  for (var i = 0; i < threshold - 2; i++) {
    final rangeStart = ((i + 1) * bucketSize).floor() + 1;
    final rangeEnd = ((i + 2) * bucketSize).floor() + 1;
    final nextBucketStart = ((i + 2) * bucketSize).floor() + 1;
    final nextBucketEnd = ((i + 3) * bucketSize).floor() + 1;
    var avgX = 0.0;
    var avgY = 0.0;
    final avgLength = (nextBucketEnd - nextBucketStart).clamp(0, points.length);
    if (avgLength > 0) {
      for (var j = nextBucketStart; j < nextBucketEnd && j < points.length; j++) {
        avgX += points[j].x;
        avgY += points[j].y;
      }
      avgX /= avgLength;
      avgY /= avgLength;
    } else {
      avgX = points.last.x;
      avgY = points.last.y;
    }
    var maxArea = -1.0;
    var maxIndex = rangeStart;
    for (var j = rangeStart; j < rangeEnd && j < points.length; j++) {
      final area = ((points[previousIndex].x - avgX) *
                  (points[j].y - points[previousIndex].y) -
              (points[previousIndex].x - points[j].x) *
                  (avgY - points[previousIndex].y))
          .abs();
      if (area > maxArea) {
        maxArea = area;
        maxIndex = j;
      }
    }
    sampled.add(points[maxIndex]);
    previousIndex = maxIndex;
  }
  sampled.add(points.last);
  return sampled;
}

List<WashChartPoint> downsampleSeries(
  List<WashChartPoint> points, {
  int maxPoints = 512,
}) {
  if (points.length <= maxPoints) return points;
  return downsampleLttb(points, maxPoints);
}
