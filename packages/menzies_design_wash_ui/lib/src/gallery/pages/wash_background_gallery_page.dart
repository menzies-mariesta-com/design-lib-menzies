import 'package:flutter/widgets.dart';

import '../../foundation/wash_recipes.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_background.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashBackgroundGalleryPage extends StatelessWidget {
  const WashBackgroundGalleryPage({super.key});

  static const _demoHeight = 224.0;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Background',
      description:
          'Soft pigment radial washes over paper, with optional fiber grain. This is the same atmosphere used behind the demo app shell.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Component',
          title: 'WashBackground',
          description:
              'Wrap an app shell or a framed surface. Grain is on by default on web.',
          child: WashShowcaseTabs(
            preview: _washFrame(
              context,
              grain: true,
              title: 'Studio paper',
              subtitle: 'Wash A / B / C blooms over base-100.',
            ),
            dartSource: _withGrainDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Flat wash',
          title: 'Washes without grain',
          description:
              'Pass grain={false} (or use page-wash alone) when you want pigment blooms only.',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: _washFrame(
              context,
              grain: false,
              title: 'Flat pigment',
              subtitle: 'Same washes, no paper-grain overlay.',
            ),
            dartSource: _flatDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Recipe',
          title: 'Class string helpers',
          description:
              'Prefer the component in Flutter apps. Recipes stay available for progressive HTML.',
          child: _recipeList(context),
        ),
      ],
    );
  }

  static Widget _washFrame(
    BuildContext context, {
    required bool grain,
    required String title,
    required String subtitle,
  }) {
    final tokens = WashTokens.of(context);
    final radius = BorderRadius.circular(tokens.radiusBox);
    return DecoratedBox(
      decoration: washInkBorderBox(tokens, radius: tokens.radiusBox),
      child: WashBackground(
        grain: grain,
        borderRadius: radius,
        child: SizedBox(
          height: _demoHeight,
          width: double.infinity,
          child: Align(
            alignment: Alignment.bottomLeft,
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: WashTypography.title(tokens.onSurface)
                        .copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 4),
                  Text(subtitle, style: WashTypography.body(tokens.inkMuted)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  static Widget _recipeList(BuildContext context) {
    final tokens = WashTokens.of(context);
    final mono = WashTypography.body(tokens.inkMuted).copyWith(
      fontFamily: WashTypography.bodyFamily,
      fontSize: 12,
    );
    final value = WashTypography.body(tokens.onSurface).copyWith(fontSize: 14);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _recipeRow('washRecipes.pageWash', WashRecipes.pageWash, mono, value),
        const SizedBox(height: 8),
        _recipeRow(
            'washRecipes.pageWashFlat', WashRecipes.pageWashFlat, mono, value),
      ],
    );
  }

  static Widget _recipeRow(
    String label,
    String classes,
    TextStyle labelStyle,
    TextStyle valueStyle,
  ) {
    return RichText(
      text: TextSpan(
        style: labelStyle,
        children: [
          TextSpan(text: '$label → '),
          TextSpan(text: classes, style: valueStyle),
        ],
      ),
    );
  }

  static const _withGrainDart = '''
WashBackground(
  grain: true,
  borderRadius: BorderRadius.circular(tokens.radiusBox),
  child: SizedBox(
    height: 224,
    child: Align(
      alignment: Alignment.bottomLeft,
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Text('Studio paper'),
      ),
    ),
  ),
);''';

  static const _flatDart = '''
WashBackground(
  grain: false,
  borderRadius: BorderRadius.circular(tokens.radiusBox),
  child: SizedBox(
    height: 224,
    child: Align(
      alignment: Alignment.bottomLeft,
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Text('Flat pigment'),
      ),
    ),
  ),
);''';
}
