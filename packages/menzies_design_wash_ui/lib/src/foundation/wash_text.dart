import 'package:flutter/widgets.dart';

import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

enum WashTextVariant { body, title, display, label }

class WashText extends StatelessWidget {
  const WashText(
    this.data, {
    super.key,
    this.variant = WashTextVariant.body,
    this.color,
    this.maxLines,
    this.overflow,
    this.fontWeight,
  });

  final String data;
  final WashTextVariant variant;
  final Color? color;
  final int? maxLines;
  final TextOverflow? overflow;
  final FontWeight? fontWeight;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fg = color ?? tokens.onSurface;
    TextStyle style;
    switch (variant) {
      case WashTextVariant.display:
        style = WashTypography.displayLarge(fg);
      case WashTextVariant.title:
        style = WashTypography.title(fg);
      case WashTextVariant.label:
        style = WashTypography.label(fg);
      case WashTextVariant.body:
        style = WashTypography.body(fg);
    }
    if (fontWeight != null) {
      style = style.copyWith(fontWeight: fontWeight);
    }
    return Text(
      data,
      style: style,
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}
