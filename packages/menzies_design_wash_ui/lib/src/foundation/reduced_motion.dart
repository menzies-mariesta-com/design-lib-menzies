import 'package:flutter/widgets.dart';

/// Mirrors web `prefers-reduced-motion`.
class WashReducedMotion {
  static bool of(BuildContext context) {
    final mq = MediaQuery.maybeOf(context);
    if (mq == null) return false;
    return mq.disableAnimations;
  }
}
