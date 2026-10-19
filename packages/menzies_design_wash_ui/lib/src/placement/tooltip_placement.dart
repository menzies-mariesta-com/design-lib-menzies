import 'dart:math' as math;

import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../foundation/wash_ripple.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';


enum WashTooltipSide { top, bottom, left, right }

class WashTooltipPlacement {
  const WashTooltipPlacement._();

  static const double defaultGap = 10;
  static const double defaultPad = 8;

  /// Picks side that fits inside [clipRect] (viewport or scroll clip).
  static WashTooltipSide measure({
    required Rect trigger,
    required Size tipSize,
    required Rect clipRect,
    WashTooltipSide? prefer,
    double gap = defaultGap,
    double pad = defaultPad,
  }) {
    final order = <WashTooltipSide>[
      if (prefer != null) prefer,
      WashTooltipSide.top,
      WashTooltipSide.bottom,
      WashTooltipSide.right,
      WashTooltipSide.left,
    ];

    WashTooltipSide? best;
    double bestScore = -1;

    for (final side in order) {
      final pos = positionFor(
        trigger: trigger,
        tipSize: tipSize,
        side: side,
        gap: gap,
      );
      final tipRect = Rect.fromLTWH(pos.dx, pos.dy, tipSize.width, tipSize.height);
      if (!_fits(tipRect, clipRect.deflate(pad))) continue;
      final score = _visibilityScore(tipRect, clipRect);
      if (score > bestScore) {
        bestScore = score;
        best = side;
      }
    }
    return best ?? prefer ?? WashTooltipSide.top;
  }

  static Offset positionFor({
    required Rect trigger,
    required Size tipSize,
    required WashTooltipSide side,
    double gap = defaultGap,
  }) {
    switch (side) {
      case WashTooltipSide.top:
        return Offset(
          trigger.center.dx - tipSize.width / 2,
          trigger.top - gap - tipSize.height,
        );
      case WashTooltipSide.bottom:
        return Offset(
          trigger.center.dx - tipSize.width / 2,
          trigger.bottom + gap,
        );
      case WashTooltipSide.left:
        return Offset(
          trigger.left - gap - tipSize.width,
          trigger.center.dy - tipSize.height / 2,
        );
      case WashTooltipSide.right:
        return Offset(
          trigger.right + gap,
          trigger.center.dy - tipSize.height / 2,
        );
    }
  }

  static bool _fits(Rect tip, Rect clip) {
    return tip.left >= clip.left &&
        tip.top >= clip.top &&
        tip.right <= clip.right &&
        tip.bottom <= clip.bottom;
  }

  static double _visibilityScore(Rect tip, Rect clip) {
    final intersection = tip.intersect(clip);
    return intersection.width * intersection.height;
  }

  /// Clamp offset so tip stays inside clip after centering.
  static Offset clampToClip({
    required Offset raw,
    required Size tipSize,
    required Rect clip,
    double pad = defaultPad,
  }) {
    final c = clip.deflate(pad);
    final dx = math.min(math.max(raw.dx, c.left), c.right - tipSize.width);
    final dy = math.min(math.max(raw.dy, c.top), c.bottom - tipSize.height);
    return Offset(dx, dy);
  }
}
