import 'package:flutter/painting.dart';

/// Fraunces display + Maple Mono body (family names; TTF registered in pubspec).
class WashTypography {
  const WashTypography._();

  static const String displayFamily = 'Fraunces';
  static const String bodyFamily = 'MapleMono';

  static TextStyle displayLarge(Color color) => TextStyle(
        fontFamily: displayFamily,
        fontSize: 32,
        fontWeight: FontWeight.w600,
        color: color,
        height: 1.2,
      );

  static TextStyle title(Color color) => TextStyle(
        fontFamily: displayFamily,
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: color,
      );

  static TextStyle body(Color color) => TextStyle(
        fontFamily: bodyFamily,
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: color,
        height: 1.45,
      );

  static TextStyle label(Color color) => TextStyle(
        fontFamily: bodyFamily,
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: color,
      );

  static TextStyle button(Color color, double fontSize, double weight) =>
      TextStyle(
        fontFamily: bodyFamily,
        fontSize: fontSize,
        fontWeight: FontWeight.lerp(FontWeight.w500, FontWeight.w700, weight / 700),
        color: color,
      );
}
