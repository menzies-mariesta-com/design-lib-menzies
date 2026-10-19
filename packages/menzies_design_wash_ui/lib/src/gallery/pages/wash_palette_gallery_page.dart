import 'package:flutter/widgets.dart';

import '../../components/palette/wash_palette.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashPaletteGalleryPage extends StatelessWidget {
  const WashPaletteGalleryPage({super.key});

  static const _semanticDart = '''
WashSemanticPaletteGrid()
// Roles: primary, secondary, accent, neutral, base-100/200/300, info, success, warning, error
''';

  static const _washTokensDart = '''
WashTokenPaletteGrid()
// --wash-a/b/c, --paper-fiber, --ink-muted, --ink-border from active pigment
''';

  static const _pigmentsDart = '''
WashPigmentThemeGrid()
// Opens WashPigmentThemeCard → showWashPigmentThemeDialog → WashScope.setPigment
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Color gallery',
      title: 'Palette',
      description:
          'Semantic daisyUI roles, Menzies Design wash tokens, and all '
          '${kWashPigmentThemes.length} pigment themes.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Semantic',
          title: 'daisyUI color roles',
          description:
              'Primary through status colors, plus the base paper stack',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const WashSemanticPaletteGrid(),
            dartSource: _semanticDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Wash tokens',
          title: 'Paper and pigment washes',
          description:
              'Studio CSS variables that tint panels, grain, and muted ink',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const WashTokenPaletteGrid(),
            dartSource: _washTokensDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Pigments',
          title: 'Watercolor themes',
          description:
              'Open a pigment for its tokens preview and apply usage',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const WashPigmentThemeGrid(),
            dartSource: _pigmentsDart,
          ),
        ),
      ],
    );
  }
}
