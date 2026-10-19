import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../painting/wash_decorations.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_atmosphere.g.dart';
import '../tokens/wash_tokens.dart';
import 'wash_gallery_typography.dart';

enum WashGalleryPanelTint { none, ochre, rose, blue }

class WashGallerySection extends StatelessWidget {
  const WashGallerySection({
    required this.eyebrow,
    required this.title,
    required this.child,
    this.description,
    this.tint = WashGalleryPanelTint.none,
    super.key,
  });

  final String eyebrow;
  final String title;
  final String? description;
  final Widget child;
  final WashGalleryPanelTint tint;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPanel(
      tint: tint,
      header: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashGalleryLabelInk(eyebrow),
          const SizedBox(height: 4),
          Text(
            title,
            style: WashTypography.title(WashTokens.of(context).onSurface).copyWith(
              fontSize: 22,
              fontWeight: FontWeight.w600,
            ),
          ),
          if (description != null) ...[
            const SizedBox(height: 4),
            Text(
              description!,
              style: WashTypography.body(WashTokens.of(context).inkMuted),
            ),
          ],
        ],
      ),
      child: child,
    );
  }
}

class WashGalleryPanel extends StatelessWidget {
  const WashGalleryPanel({
    required this.child,
    this.header,
    this.tint = WashGalleryPanelTint.none,
    super.key,
  });

  final Widget? header;
  final Widget child;
  final WashGalleryPanelTint tint;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    const washBlue = Color(0xFF4A7FA8);
    final wash = switch (tint) {
      WashGalleryPanelTint.ochre => atmo.washB,
      WashGalleryPanelTint.rose => atmo.washC,
      WashGalleryPanelTint.blue => washBlue,
      WashGalleryPanelTint.none => atmo.washA,
    };
    return Container(
      decoration: BoxDecoration(
        color: Color.alphaBlend(wash.withValues(alpha: 0.14), tokens.surface),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (header != null)
            Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.7)),
                ),
              ),
              child: header,
            ),
          Padding(padding: const EdgeInsets.all(20), child: child),
        ],
      ),
    );
  }
}

class WashGalleryPage extends StatelessWidget {
  const WashGalleryPage({
    required this.title,
    required this.description,
    required this.sections,
    this.kicker = 'Component gallery',
    super.key,
  });

  final String kicker;
  final String title;
  final String description;
  final List<Widget> sections;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashGalleryPageHero(
          kicker: kicker,
          title: title,
          description: description,
        ),
        for (var i = 0; i < sections.length; i++) ...[
          if (i > 0) const SizedBox(height: 24),
          sections[i],
        ],
      ],
    );
  }
}
