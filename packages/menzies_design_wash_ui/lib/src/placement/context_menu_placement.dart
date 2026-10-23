import 'dart:math' as math;

import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

const double kWashContextMenuCursorGap = 8;
const int kWashContextMenuLongPressMs = 500;

class WashContextMenuPlacement {
  const WashContextMenuPlacement._();

  static Offset placeNearCursor({
    required Offset cursor,
    required Size menuSize,
    required Size viewport,
    double gap = kWashContextMenuCursorGap,
    double pad = 8,
  }) {
    var dx = cursor.dx + gap;
    var dy = cursor.dy + gap;
    if (dx + menuSize.width > viewport.width - pad) {
      dx = cursor.dx - gap - menuSize.width;
    }
    if (dy + menuSize.height > viewport.height - pad) {
      dy = cursor.dy - gap - menuSize.height;
    }
    dx = math.max(pad, math.min(dx, viewport.width - menuSize.width - pad));
    dy = math.max(pad, math.min(dy, viewport.height - menuSize.height - pad));
    return Offset(dx, dy);
  }
}
