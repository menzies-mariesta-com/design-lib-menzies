import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/marquee/wash_marquee.dart';
import '../../components/marquee/wash_overflow_marquee.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashMarqueeGalleryPage extends StatelessWidget {
  const WashMarqueeGalleryPage({super.key});

  static const _pigments = [
    'Ultramarine',
    'Quinacridone rose',
    'Yellow ochre',
    'Sap green',
    'Burnt sienna',
    'Payne gray',
    'Cobalt teal',
    'Indigo',
  ];

  static const _washTips = [
    'Wet the paper before the first wash',
    'Tilt the board for a graded sky',
    'Leave dry islands for bloom edges',
    'Lift while the glaze is still shiny',
    'Layer cool over warm for depth',
    'Keep a clean sponge for soft edges',
  ];

  static const _studioLabels = [
    'Fog wash',
    'Soft edge',
    'Hard edge',
    'Dry brush',
    'Glaze',
    'Granulation',
  ];

  static const _badgeItems = <(String, WashBadgeTone)>[
    ('Ultramarine', WashBadgeTone.primary),
    ('Rose', WashBadgeTone.secondary),
    ('Ochre', WashBadgeTone.accent),
    ('Teal', WashBadgeTone.info),
    ('Sap', WashBadgeTone.success),
    ('Sienna', WashBadgeTone.warning),
    ('Indigo', WashBadgeTone.neutral),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    return WashGalleryPage(
      title: 'Marquee',
      description: 'Composed scroll bands for pigment names and studio tips.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Horizontal scroll',
          description:
              'Duplicated marquee-content strips animate as one seamless loop',
          child: WashShowcaseTabs(
            preview: _Sample(
              label: 'marquee > marquee-track > marquee-content ×2',
              child: WashMarquee(
                children: [
                  for (final name in _pigments) _Pill(name),
                ],
              ),
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Directions',
          title: 'Left, right, and vertical',
          description: 'Default scrolls left',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final twoUp = constraints.maxWidth >= 1024;
                final gap = 32.0;
                final half = twoUp
                    ? (constraints.maxWidth - gap) / 2
                    : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: 'marquee (default left)',
                        child: WashMarquee(
                          children: [
                            for (final label in _studioLabels)
                              Text(
                                label,
                                style: WashTypography.title(tokens.onSurface)
                                    .copyWith(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: 'marquee marquee-reverse',
                        child: WashMarquee(
                          direction: WashMarqueeDirection.reverse,
                          children: [
                            for (final label in _studioLabels)
                              Text(
                                label,
                                style: WashTypography.title(tokens.onSurface)
                                    .copyWith(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _Sample(
                        label: 'marquee marquee-vertical',
                        child: Align(
                          child: ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 320),
                            child: WashMarquee(
                              direction: WashMarqueeDirection.vertical,
                              children: [
                                for (final tip in _washTips)
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 12,
                                      vertical: 8,
                                    ),
                                    decoration: BoxDecoration(
                                      color: tokens.palette.base200
                                          .withValues(alpha: 0.6),
                                      borderRadius: BorderRadius.circular(8),
                                      border: Border.all(
                                        color: tokens.inkBorder
                                            .withValues(alpha: 0.7),
                                      ),
                                    ),
                                    child: Text(
                                      tip,
                                      textAlign: TextAlign.center,
                                      style: WashTypography.body(
                                        tokens.onSurface,
                                      ).copyWith(fontSize: 14),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
            dartSource: _directionsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Speeds / pause',
          title: 'Slow, fast, and pause on hover',
          description: 'Duration tokens plus marquee-hover-pause',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _Sample(
                  label: 'marquee marquee-slow marquee-hover-pause',
                  child: WashMarquee(
                    speed: WashMarqueeSpeed.slow,
                    hoverPause: true,
                    children: [
                      for (final tip in _washTips) _Pill(tip),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                _Sample(
                  label: 'marquee marquee-fast marquee-hover-pause',
                  child: WashMarquee(
                    speed: WashMarqueeSpeed.fast,
                    hoverPause: true,
                    children: [
                      for (final name in _pigments) _Pill(name),
                    ],
                  ),
                ),
              ],
            ),
            dartSource: _speedsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Badges / chips',
          title: 'Pigment chips in motion',
          description:
              'Official daisyUI badge chips ride inside the composed marquee track',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: _Sample(
              label: 'marquee + badge badge-soft',
              child: WashMarquee(
                hoverPause: true,
                children: [
                  for (final item in _badgeItems)
                    WashBadge(
                      item.$1,
                      tone: item.$2,
                      style: WashBadgeStyle.soft,
                      size: WashBadgeSize.lg,
                    ),
                ],
              ),
            ),
            dartSource: _badgesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Studio',
          title: 'Scrolling wash tips',
          description:
              'A quieter band of studio advice for the Menzies Design desk',
          child: WashShowcaseTabs(
            preview: _Sample(
              label: 'marquee marquee-slow',
              child: WashMarquee(
                speed: WashMarqueeSpeed.slow,
                children: [
                  for (final tip in _washTips)
                    Text.rich(
                      TextSpan(
                        style: WashTypography.title(tokens.inkMuted).copyWith(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                        children: [
                          TextSpan(text: tip),
                          TextSpan(
                            text: '  ·  ',
                            style: TextStyle(
                              color: tokens.onSurface.withValues(alpha: 0.3),
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Reduced motion',
          title: 'Pause when motion is reduced',
          description: 'Under prefers-reduced-motion: reduce, tracks stop',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final twoUp = constraints.maxWidth >= 1024;
                final gap = 32.0;
                final half = twoUp
                    ? (constraints.maxWidth - gap) / 2
                    : constraints.maxWidth;
                final slice = _pigments.take(4).toList();
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: 'prefers-reduced-motion: reduce (CSS)',
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text(
                              'System preference pauses every live marquee automatically. No JS required.',
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 14),
                            ),
                            const SizedBox(height: 12),
                            WashMarquee(
                              children: [
                                for (final name in slice) _Pill(name),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: 'marquee marquee-static',
                        child: WashMarquee(
                          staticBand: true,
                          children: [
                            for (final name in slice) _Pill(name),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
            dartSource: _reducedDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Responsive',
          title: 'Narrow and full-bleed bands',
          description:
              'Same loop scales from a compact card width to the full paper pane',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final row = constraints.maxWidth >= 768;
                final gap = 32.0;
                final narrow = row ? 224.0 : constraints.maxWidth;
                final wide = row
                    ? constraints.maxWidth - gap - narrow
                    : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: narrow,
                      child: _Sample(
                        label: 'marquee (max-w constrained)',
                        child: WashMarquee(
                          speed: WashMarqueeSpeed.fast,
                          hoverPause: true,
                          children: [
                            for (final label in _studioLabels) _Pill(label),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: wide,
                      child: _Sample(
                        label: 'marquee (fluid width)',
                        child: WashMarquee(
                          hoverPause: true,
                          children: [
                            for (final name in _pigments)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 6,
                                ),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF4A7FA8)
                                      .withValues(alpha: 0.5),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  name,
                                  style: WashTypography.body(tokens.onSurface)
                                      .copyWith(fontSize: 14),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
            dartSource: _responsiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Overflow on hover',
          title: 'Truncated text that marquees',
          description:
              'Only clipped labels animate. Hover or focus to loop the full string; '
              'leave to restore ellipsis. Full Behaviour gallery: Overflow marquee in the sidebar.',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final twoUp = constraints.maxWidth >= 768;
                final gap = 32.0;
                final half = twoUp
                    ? (constraints.maxWidth - gap) / 2
                    : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: 'truncate (auto-attach)',
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _OverflowCard(
                              maxWidth: 176,
                              child: WashOverflowMarquee(
                                'Ultramarine glaze over warm ochre underpainting for depth',
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Hover the truncated line. Non-overflowing text stays still.',
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: half,
                      child: _Sample(
                        label: '<OverflowMarquee>',
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _OverflowCard(
                              maxWidth: 176,
                              child: WashOverflowMarquee(
                                'Wet-on-wet bloom edges need a clean sponge and patience',
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Explicit wrapper when you own the markup.',
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _Sample(
                        label: 'truncate (fits: no marquee)',
                        child: _OverflowCard(
                          maxWidth: 560,
                          child: const WashOverflowMarquee('Short label'),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
            dartSource: _overflowDart,
          ),
        ),
      ],
    );
  }

  static const _basicDart = 'WashMarquee(children: […pills…])';
  static const _directionsDart =
      'WashMarquee(direction: left | reverse | vertical)';
  static const _speedsDart = 'WashMarquee(speed: slow|fast, hoverPause: true)';
  static const _badgesDart =
      'WashMarquee(hoverPause: true, children: [WashBadge.soft…])';
  static const _studioDart = 'WashMarquee(speed: WashMarqueeSpeed.slow, …)';
  static const _reducedDart =
      'WashMarquee + WashReducedMotion / staticBand: true';
  static const _responsiveDart = 'WashMarquee in narrow vs fluid LayoutBuilder';
  static const _overflowDart = 'WashOverflowMarquee(text)';
}

class _Sample extends StatelessWidget {
  const _Sample({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          label,
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10.4,
          ),
        ),
      ],
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: Text(
        text,
        style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
      ),
    );
  }
}

class _OverflowCard extends StatelessWidget {
  const _OverflowCard({required this.child, required this.maxWidth});

  final Widget child;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: tokens.palette.base100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
        ),
        child: child,
      ),
    );
  }
}
