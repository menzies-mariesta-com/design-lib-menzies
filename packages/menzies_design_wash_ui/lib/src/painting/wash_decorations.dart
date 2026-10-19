import 'package:flutter/painting.dart';

import '../tokens/wash_tokens.dart';

BoxDecoration washInkBorderBox(
  WashTokens tokens, {
  Color? fill,
  double radius = 16,
  double borderWidth = 1,
}) {
  return BoxDecoration(
    color: fill ?? tokens.surface,
    borderRadius: BorderRadius.circular(radius),
    border: Border.all(color: tokens.inkBorder, width: borderWidth),
  );
}

List<BoxShadow> washPaperShadowSm(WashTokens tokens) {
  return [
    BoxShadow(
      color: tokens.onSurface.withValues(alpha: 0.08),
      offset: const Offset(0, 1),
      blurRadius: 0,
    ),
    BoxShadow(
      color: tokens.primary.withValues(alpha: 0.06),
      offset: const Offset(0, 8),
      blurRadius: 24,
    ),
  ];
}
