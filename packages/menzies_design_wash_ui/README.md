# menzies_design_wash_ui

Flutter port of **Menzies Design Wash UI**: watercolor pigment themes, mobile-first components, custom-painted charts, and gallery templates.

## Install

```yaml
dependencies:
  menzies_design_wash_ui:
    path: ../packages/menzies_design_wash_ui # or git / pub when published
```

## Quick start

```dart
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  runApp(
    WashProvider(
      child: MaterialApp(
        theme: buildWashThemeData(
          pigmentId: 'mineral',
          mode: WashThemeMode.light,
        ),
        home: const Scaffold(
          body: WashBackground(
            child: Center(
              child: WashButton(label: 'Hello', onPressed: () {}),
            ),
          ),
        ),
      ),
    ),
  );
}
```

## Tokens

Run the CSS token generator after changing web `themes.css`:

```bash
dart run tool/wash_tokens/generate.dart
```

## Icons (Lucide 1.28.0 + Lab)

SVGs are bundled under `assets/icons/`. Regenerate from npm pins (`lucide-static@1.28.0`, `@lucide/lab@0.7.0`):

```bash
dart run tool/wash_lucide/generate.dart
```

```dart
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

const WashLucideIcon('heart', size: 24, strokeWidth: 1.75);
const WashLucideIcon('bat', lab: true); // Lucide Lab
// washLucideIconNames — same catalog as web DynamicIcon / iconNames
```

## Gallery

```bash
cd apps/wash_demo_flutter && flutter run
```

## License

GPL-3.0-or-later
