import 'package:flutter/widgets.dart';

import '../painting/wash_atmosphere_shader.dart';
import '../tokens/wash_tokens.dart';

/// Atmospheric page background (`page-wash` + optional `paper-grain` shader).
class WashBackground extends StatelessWidget {
  const WashBackground({
    required this.child,
    this.grain = true,
    this.borderRadius,
    super.key,
  });

  final Widget child;

  /// Paper-fiber grain overlay (`paper-grain`). Defaults to true to match web.
  final bool grain;

  /// Clips washes and grain to match `rounded-box` / `border-radius: inherit` on web.
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final paletteKey = washPaletteId(tokens.pigmentId, tokens.mode);
    final atmo = kWashAtmosphereByTheme[paletteKey] ??
        kWashAtmosphereByTheme['mineral']!;

    Widget stack = Stack(
      fit: StackFit.passthrough,
      clipBehavior: Clip.hardEdge,
      children: [
        Positioned.fill(
          child: ColoredBox(color: tokens.surface),
        ),
        Positioned.fill(
          child: RepaintBoundary(
            child: WashAtmosphereLayer(
              tokens: tokens,
              atmosphere: atmo,
              grain: grain,
            ),
          ),
        ),
        child,
      ],
    );

    if (borderRadius != null) {
      stack = ClipRRect(
        borderRadius: borderRadius!,
        clipBehavior: Clip.antiAlias,
        child: stack,
      );
    }

    return stack;
  }
}
