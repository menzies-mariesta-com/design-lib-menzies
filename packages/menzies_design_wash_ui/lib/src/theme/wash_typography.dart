import 'package:flutter/painting.dart';

/// Fraunces display + Maple Mono body (family names; TTF registered in pubspec).
class WashTypography {
  const WashTypography._();

  static const String displayFamily = 'Fraunces';
  static const String bodyFamily = 'MapleMono';

  /// Fonts are declared in this package's pubspec, so every [TextStyle] must
  /// opt into the package scope. Without it Flutter falls back to the platform
  /// sans/mono faces even though the assets are bundled.
  static const String fontPackage = 'menzies_design_wash_ui';

  static TextStyle displayLarge(Color color) => TextStyle(
        fontFamily: displayFamily,
        package: fontPackage,
        fontSize: 32,
        fontWeight: FontWeight.w600,
        color: color,
        height: 1.2,
        letterSpacing: -0.4,
      );

  static TextStyle title(Color color) => TextStyle(
        fontFamily: displayFamily,
        package: fontPackage,
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: color,
        height: 1.3,
      );

  static TextStyle body(Color color) => TextStyle(
        fontFamily: bodyFamily,
        package: fontPackage,
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: color,
        height: 1.45,
      );

  static TextStyle label(Color color) => TextStyle(
        fontFamily: bodyFamily,
        package: fontPackage,
        fontSize: 12,
        fontWeight: FontWeight.w600,
        color: color,
      );

  static TextStyle button(Color color, double fontSize, double weight) =>
      TextStyle(
        fontFamily: bodyFamily,
        package: fontPackage,
        fontSize: fontSize,
        fontWeight:
            FontWeight.lerp(FontWeight.w500, FontWeight.w700, weight / 700),
        color: color,
      );
}
