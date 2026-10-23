import 'package:flutter/widgets.dart';

import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

/// Website `label-ink`: 11px uppercase Maple Mono, 600, 0.08em tracking.
class WashGalleryLabelInk extends StatelessWidget {
  const WashGalleryLabelInk(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text.toUpperCase(),
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontSize: 11,
        height: 1.5,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.88,
      ),
    );
  }
}

class WashGalleryPageHero extends StatelessWidget {
  const WashGalleryPageHero({
    required this.title,
    required this.description,
    this.kicker = 'Component gallery',
    super.key,
  });

  final String kicker;
  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashGalleryLabelInk(kicker),
          const SizedBox(height: 8),
          Text(
            title,
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(
              fontSize: 36,
              height: 40 / 36,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.9,
            ),
          ),
          const SizedBox(height: 8),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 672),
            child: Text(
              description,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 16,
                height: 1.5,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
