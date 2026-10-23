import 'package:flutter/widgets.dart';

import '../theme/wash_theme.dart';
import 'wash_pigments.g.dart';

export 'wash_pigments.g.dart';
export 'wash_atmosphere.g.dart';
export 'wash_style_spec.g.dart';

const String kWashThemeStorageKey = 'design-web-menzies-theme';
const String kWashModeStorageKey = 'design-web-menzies-mode';

enum WashThemeMode { light, dark }

String washPaletteId(String pigmentId, WashThemeMode mode) {
  if (mode == WashThemeMode.dark) return '$pigmentId-dark';
  return pigmentId;
}

WashPigmentPalette washPalette(String pigmentId, WashThemeMode mode) {
  final id = washPaletteId(pigmentId, mode);
  return kWashPigmentPalettes[id] ?? kWashPigmentPalettes['mineral']!;
}

@immutable
class WashTokens {
  const WashTokens({
    required this.pigmentId,
    required this.mode,
    required this.palette,
    required this.inkBorder,
    required this.inkMuted,
  });

  final String pigmentId;
  final WashThemeMode mode;
  final WashPigmentPalette palette;
  final Color inkBorder;
  final Color inkMuted;

  Color get primary => palette.primary;
  Color get onPrimary => palette.primaryContent;
  Color get surface => palette.base100;
  Color get surfaceContainer => palette.base200;
  Color get surfaceContainerHigh => palette.base300;
  Color get onSurface => palette.baseContent;
  Color get error => palette.error;
  Color get onError => palette.errorContent;

  double get radiusField => palette.radiusField;
  double get radiusBox => palette.radiusBox;

  static WashTokens of(BuildContext context) => WashThemeScope.of(context);
}

WashTokens buildWashTokens({
  required String pigmentId,
  required WashThemeMode mode,
}) {
  final palette = washPalette(pigmentId, mode);
  final muted = Color.alphaBlend(
    palette.baseContent.withValues(alpha: 0.55),
    palette.base100,
  );
  final border = Color.alphaBlend(
    palette.baseContent.withValues(alpha: 0.12),
    palette.base300,
  );
  return WashTokens(
    pigmentId: pigmentId,
    mode: mode,
    palette: palette,
    inkBorder: border,
    inkMuted: muted,
  );
}
