import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/layout/wash_hero.dart';
import '../wash_gallery_panel.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_showcase_tabs.dart';

class WashHeroGalleryPage extends StatelessWidget {
  const WashHeroGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Hero',
      description:
          'daisyUI hero and hero-content and hero-overlay banners nested in wash panels so studio.',
      sections: [
        _s('01 · Basic', 'Title, copy, and CTA', 'Minimal hero with content block and a primary action',
            WashHeroSample(classLabel: 'hero + hero-content', child: _basicHero()), _basicDart),
        _s('02 · Figure', 'Hero with image', 'Stacks on mobile, then sits beside the plate on large screens',
            WashHeroSample(classLabel: 'hero-content flex-col lg:flex-row', child: _figureHero()), _figureDart,
            tint: WashGalleryPanelTint.ochre),
        _s('03 · Reverse figure', 'Image on the trailing edge',
            'Same stack on mobile; figure flips to the right from lg up',
            WashHeroSample(classLabel: 'hero-content flex-col lg:flex-row-reverse', child: _reverseHero()),
            _reverseDart),
        _s('04 · Overlay', 'Wash field with hero-overlay',
            'Tinted overlay over a wash gradient for readable light text',
            WashHeroSample(classLabel: 'hero + hero-overlay + hero-content', child: _overlayHero(context)),
            _overlayDart,
            tint: WashGalleryPanelTint.rose),
        _s('05 · Centered height', 'Centered and min-height', 'Taller stage with centered copy', _heights(), _heightsDart),
        _s('06 · Studio landing', 'Menzies Design brand hero',
            'Brand-forward mini landing: strong name, one headline, one sentence',
            WashHeroSample(classLabel: 'hero + brand-forward hero-content', child: _brandHero()), _brandDart,
            tint: WashGalleryPanelTint.ochre),
        _s('07 · Responsive', 'Stack then split', 'Content stacks on small screens',
            WashHeroSample(classLabel: 'flex-col lg:flex-row (responsive)', child: _responsiveHero()),
            _responsiveDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _copyBlock({
    required String headline,
    required String body,
    required Widget action,
    bool center = true,
    bool alignLeftOnLg = false,
  }) {
    return LayoutBuilder(
      builder: (context, c) {
        final tokens = WashTokens.of(context);
        final wide = alignLeftOnLg && c.maxWidth >= WashTailwindBreakpoints.lg;
        final align = center && !wide ? TextAlign.center : TextAlign.left;
        return ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 448),
          child: Column(
            crossAxisAlignment:
                align == TextAlign.center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
            children: [
              Text(
                headline,
                textAlign: align,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 30,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: Text(
                  body,
                  textAlign: align,
                  style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                ),
              ),
              action,
            ],
          ),
        );
      },
    );
  }

  static Widget _basicHero() {
    return WashHero(
      minHeight: 288,
      child: WashHeroContent(
        centerText: true,
        children: [
          _copyBlock(
            headline: 'Soft morning wash',
            body:
                'Lay a quiet cerulean field, then ink the hierarchy. One headline, one sentence, one clear next step.',
            action: WashButton(
              label: 'Open plate',
              variant: WashButtonVariant.primary,
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }

  static const _basicDart = 'WashHero + WashHeroContent(centerText: true)';

  static Widget _figureHero() {
    return WashHero(
      minHeight: 288,
      child: WashHeroContent(
        layout: WashHeroContentLayout.rowFromLg,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 320),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: const AspectRatio(
                aspectRatio: 343 / 361,
                child: WashStudioHeroImage(
                  semanticLabel: 'Menzies Design watercolor plate',
                ),
              ),
            ),
          ),
          _copyBlock(
            headline: 'Coastal fog plate',
            body:
                'Pair a local wash plate with copy. No remote stock URLs, so the gallery stays offline-safe.',
            alignLeftOnLg: true,
            action: WashButton(
              label: 'View series',
              variant: WashButtonVariant.primary,
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }

  static const _figureDart = 'WashStudioHeroImage + WashHeroContent(rowFromLg)';

  static Widget _reverseHero() {
    return WashHero(
      minHeight: 288,
      child: WashHeroContent(
        layout: WashHeroContentLayout.rowReverseFromLg,
        children: [
          const WashHeroBloom(),
          _copyBlock(
            headline: 'Ochre undertone',
            body:
                'A CSS wash bloom stands in for media when you want pigment atmosphere without a bitmap.',
            alignLeftOnLg: true,
            action: WashButton(
              label: 'Mix pigment',
              variant: WashButtonVariant.secondary,
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }

  static const _reverseDart = 'WashHeroBloom + WashHeroContent(rowReverseFromLg)';

  static Widget _overlayHero(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashHero(
      minHeight: 320,
      gradient: WashHero.eveningGlazeGradient(tokens),
      overlayColor: tokens.palette.neutral.withValues(alpha: 0.55),
      child: WashHeroContent(
        centerText: true,
        children: [
          Builder(
            builder: (context) {
              final fg = tokens.palette.neutralContent;
              return ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 448),
                child: Column(
                  children: [
                    Text(
                      'Evening glaze',
                      textAlign: TextAlign.center,
                      style: WashTypography.title(fg).copyWith(
                        fontSize: 30,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      'Overlay softens the wash so type stays crisp. Keep the CTA primary and the sentence short.',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(fg).copyWith(
                        fontSize: 14,
                        color: fg.withValues(alpha: 0.9),
                      ),
                    ),
                    const SizedBox(height: 20),
                    WashButton(
                      label: 'Enter studio',
                      variant: WashButtonVariant.primary,
                      onPressed: () {},
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  static const _overlayDart = 'WashHero(gradient: ..., overlayColor: neutral/55)';

  static Widget _heights() {
    return LayoutBuilder(
      builder: (context, c) {
        final twoCol = c.maxWidth >= WashTailwindBreakpoints.lg;
        final tall = WashHeroSample(
          classLabel: 'hero min-h-96 + text-center',
          child: WashHero(
            minHeight: 384,
            child: WashHeroContent(
              centerText: true,
              children: [
                _copyBlock(
                  headline: 'Tall center',
                  body: 'Use min-h-* inside the panel, not full viewport height.',
                  action: WashButton(
                    label: 'Continue',
                    variant: WashButtonVariant.primary,
                    onPressed: () {},
                  ),
                ),
              ],
            ),
          ),
        );
        final compact = WashHeroSample(
          classLabel: 'hero min-h-60 bg-base-200',
          child: WashHero(
            minHeight: 240,
            child: WashHeroContent(
              children: [
                Builder(
                  builder: (context) {
                    final tokens = WashTokens.of(context);
                    return ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 384),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Compact band',
                            style: WashTypography.title(tokens.onSurface).copyWith(
                              fontSize: 24,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            child: Text(
                              'Shorter min-height for inline marketing strips and tool headers.',
                              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                            ),
                          ),
                          WashButton(
                            label: 'Learn more',
                            variant: WashButtonVariant.outline,
                            onPressed: () {},
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        );
        if (twoCol) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: tall),
              const SizedBox(width: 24),
              Expanded(child: compact),
            ],
          );
        }
        return Column(
          children: [
            tall,
            const SizedBox(height: 24),
            compact,
          ],
        );
      },
    );
  }

  static const _heightsDart = 'WashHero(minHeight: 384) + WashHero(minHeight: 240)';

  static Widget _brandHero() {
    return WashHero(
      minHeight: 320,
      clipOverflow: true,
      pageWash: true,
      child: WashHeroContent(
        maxWidth: 672,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 40),
        children: [
          Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Column(
                children: [
                  Text(
                    'Menzies Design',
                    textAlign: TextAlign.center,
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 36,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Pigment desk for quiet hierarchy',
                    textAlign: TextAlign.center,
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 24,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Build pages with ink weight and wash opacity. Start from the overview and keep every control on paper.',
                    textAlign: TextAlign.center,
                    style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                  ),
                  const SizedBox(height: 24),
                  Wrap(
                    alignment: WrapAlignment.center,
                    spacing: 12,
                    runSpacing: 8,
                    children: [
                      WashButton(
                        label: 'Open overview',
                        variant: WashButtonVariant.primary,
                        onPressed: () {},
                      ),
                      WashButton(
                        label: 'Browse palette',
                        variant: WashButtonVariant.ghost,
                        onPressed: () {},
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  static const _brandDart = 'WashHero(pageWash: true, clipOverflow: true)';

  static Widget _responsiveHero() {
    return WashHero(
      minHeight: 288,
      child: WashHeroContent(
        layout: WashHeroContentLayout.rowFromLg,
        gap: 40,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 384),
            child: WashGalleryPanel(
              tint: WashGalleryPanelTint.rose,
              child: AspectRatio(
                aspectRatio: 4 / 3,
                child: Align(
                  alignment: Alignment.bottomLeft,
                  child: Builder(
                    builder: (context) {
                      final tokens = WashTokens.of(context);
                      return Padding(
                        padding: const EdgeInsets.all(12),
                        child: Text(
                          'Series wall',
                          style: WashTypography.title(tokens.onSurface).copyWith(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ),
          _copyBlock(
            headline: 'Mobile stacks first',
            body:
                'On narrow viewports the figure sits above the copy. Widen the pane to see the row layout.',
            alignLeftOnLg: true,
            action: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                WashButton(
                  label: 'Start',
                  variant: WashButtonVariant.primary,
                  onPressed: () {},
                ),
                WashButton(
                  label: 'Specs',
                  variant: WashButtonVariant.outline,
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static const _responsiveDart = 'WashHeroContent(rowFromLg) + wash-panel figure';
}
