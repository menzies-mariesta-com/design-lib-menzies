import 'package:flutter/widgets.dart';

import '../foundation/wash_icon.dart';
import '../theme/wash_provider.dart';
import '../tokens/wash_tokens.dart';
import 'wash_button.dart';

class WashThemeSwitcher extends StatelessWidget {
  const WashThemeSwitcher({super.key});

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final idx = kWashPigmentIds.indexOf(scope.pigmentId);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashButton(
          square: true,
          variant: WashButtonVariant.ghost,
          onPressed: () {
            final next = kWashPigmentIds[(idx - 1) % kWashPigmentIds.length];
            scope.setPigment(next);
          },
          child: const WashIcon(WashIconGlyph.chevronLeft),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          child: Text(scope.pigmentId, style: const TextStyle(fontSize: 12)),
        ),
        WashButton(
          square: true,
          variant: WashButtonVariant.ghost,
          onPressed: () {
            final next = kWashPigmentIds[(idx + 1) % kWashPigmentIds.length];
            scope.setPigment(next);
          },
          child: const WashIcon(WashIconGlyph.chevronRight),
        ),
        const SizedBox(width: 8),
        WashButton(
          square: true,
          variant: WashButtonVariant.ghost,
          onPressed: () {
            scope.setMode(
              scope.mode == WashThemeMode.light
                  ? WashThemeMode.dark
                  : WashThemeMode.light,
            );
          },
          child: WashIcon(
            scope.mode == WashThemeMode.light ? WashIconGlyph.more : WashIconGlyph.settings,
          ),
        ),
      ],
    );
  }
}
