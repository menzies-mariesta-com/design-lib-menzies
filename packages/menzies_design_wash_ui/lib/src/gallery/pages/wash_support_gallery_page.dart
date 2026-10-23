import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_navigation.dart';
import '../wash_gallery_typography.dart';
import 'wash_overview_gallery_page.dart';

class _SupportLink {
  const _SupportLink(
    this.name,
    this.description,
    this.supportLabel,
    this.icon,
    this.tone,
    this.href,
  );

  final String name;
  final String description;
  final String supportLabel;
  final String icon;
  final String tone;
  final String href;
}

const _supportLinks = <_SupportLink>[
  _SupportLink(
    'React',
    'Components, provider, and hooks',
    'React Foundation',
    'atom',
    'info',
    'https://react.foundation/',
  ),
  _SupportLink(
    'TypeScript',
    'Typed APIs across the monorepo',
    'GitHub Sponsors',
    'file-code',
    'primary',
    'https://github.com/sponsors/microsoft',
  ),
  _SupportLink(
    'Tailwind CSS',
    'Utility layout and responsive tokens',
    'Partner program',
    'wind',
    'accent',
    'https://tailwindcss.com/sponsor',
  ),
  _SupportLink(
    'daisyUI',
    'Semantic components and theme slots',
    'GitHub Sponsors',
    'flower',
    'secondary',
    'https://github.com/saadeghi/daisyui?sponsor=1',
  ),
  _SupportLink(
    'Simple Icons',
    'Brand SVG icons',
    'GitHub Sponsors',
    'shapes',
    'neutral',
    'https://github.com/sponsors/simple-icons',
  ),
  _SupportLink(
    'Lucide',
    'Tree-shakeable UI icon set',
    'Open Collective',
    'feather',
    'warning',
    'https://opencollective.com/lucide-icons',
  ),
  _SupportLink(
    'Vite',
    'Library and demo build tooling',
    'GitHub Sponsors',
    'zap',
    'success',
    'https://github.com/vitejs/vite?sponsor=1',
  ),
  _SupportLink(
    'ApexCharts',
    'Pigment-aware chart primitives',
    'GitHub Sponsors',
    'chart-line',
    'error',
    'https://github.com/sponsors/apexcharts',
  ),
];

const _washUiLink = _SupportLink(
  'Wash UI',
  'Menzies Design watercolor component library',
  'Star on GitHub',
  'star',
  'primary',
  'https://github.com/menzies-mariesta-com/design-lib-menzies',
);

/// Web `SupportPage`: libraries first, Wash UI second.
class WashSupportGalleryPage extends StatelessWidget {
  const WashSupportGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final viewport = MediaQuery.sizeOf(context).width;
    final supportCols = viewport >= 1280
        ? 4
        : viewport >= 1024
            ? 3
            : viewport >= 640
                ? 2
                : 1;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const _SupportHero(),
        const SizedBox(height: 24),
        _SupportPanel(
          eyebrow: 'Open libraries',
          title: 'Sponsor the stack',
          description:
              'Official sponsor links for libraries Wash UI depends on.',
          child: _SupportGrid(items: _supportLinks, columns: supportCols),
        ),
        const SizedBox(height: 24),
        _SupportPanel(
          rose: true,
          eyebrow: 'Wash UI',
          title: 'Support this design system',
          description: 'Star the monorepo or open an issue.',
          child: _SupportGrid(items: const [_washUiLink], columns: 2),
        ),
      ],
    );
  }
}

class _SupportHero extends StatelessWidget {
  const _SupportHero();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          Positioned(
            left: -40,
            top: -48,
            child: _Blob(
              size: 224,
              color: tokens.palette.primary,
              opacity: 0.22,
            ),
          ),
          Positioned(
            right: -20,
            bottom: -64,
            child: _Blob(
              size: 192,
              color: tokens.palette.accent,
              opacity: 0.18,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 40),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const WashGalleryLabelInk('Community'),
                const SizedBox(height: 8),
                Text(
                  'Support open libraries',
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: 36,
                    height: 40 / 36,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.9,
                  ),
                ),
                const SizedBox(height: 12),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 672),
                  child: Text(
                    'Sponsor the stack first, then star Wash UI.',
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 16,
                      height: 1.5,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Color.alphaBlend(
                          tokens.palette.primary.withValues(alpha: 0.1),
                          tokens.surface,
                        ),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          WashLucideIcon(
                            'heart',
                            size: 14,
                            color: tokens.palette.primary,
                            strokeWidth: 2,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Libraries first',
                            style: WashTypography.body(
                              tokens.palette.primary,
                            ).copyWith(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        border: Border.all(color: tokens.inkBorder),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        'Official sponsor links',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Blob extends StatelessWidget {
  const _Blob({
    required this.size,
    required this.color,
    required this.opacity,
  });

  final double size;
  final Color color;
  final double opacity;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors: [
            color.withValues(alpha: opacity),
            color.withValues(alpha: 0),
          ],
          stops: const [0, 0.7],
        ),
      ),
    );
  }
}

class _SupportPanel extends StatelessWidget {
  const _SupportPanel({
    required this.eyebrow,
    required this.title,
    required this.description,
    required this.child,
    this.rose = false,
  });

  final String eyebrow;
  final String title;
  final String description;
  final Widget child;
  final bool rose;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      decoration: BoxDecoration(
        color: rose
            ? Color.alphaBlend(
                tokens.palette.error.withValues(alpha: 0.035),
                tokens.surface,
              )
            : tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk(eyebrow),
                const SizedBox(height: 4),
                Text(
                  title,
                  style: WashTypography.title(tokens.onSurface).copyWith(
                    fontSize: 24,
                    height: 32 / 24,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.48,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 14,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          Padding(padding: const EdgeInsets.all(20), child: child),
        ],
      ),
    );
  }
}

class _SupportGrid extends StatelessWidget {
  const _SupportGrid({required this.items, required this.columns});

  final List<_SupportLink> items;
  final int columns;

  @override
  Widget build(BuildContext context) {
    const gap = 12.0;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = (constraints.maxWidth - gap * (columns - 1)) / columns;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final item in items)
              SizedBox(
                width: width,
                child: WashResourceLinkCard(
                  name: item.name,
                  description: item.description,
                  icon: item.icon,
                  tone: item.tone,
                  supportLabel: item.supportLabel,
                  onTap: () => WashGalleryNavigation.openExternalOf(context)
                      ?.call(item.href),
                ),
              ),
          ],
        );
      },
    );
  }
}
