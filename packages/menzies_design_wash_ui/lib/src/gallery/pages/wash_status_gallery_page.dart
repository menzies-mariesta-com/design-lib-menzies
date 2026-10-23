import 'package:flutter/widgets.dart';

import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/status/wash_status.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashStatusGalleryPage extends StatelessWidget {
  const WashStatusGalleryPage({super.key});

  static const _colors = <(String, WashStatusVariant)>[
    ('Neutral', WashStatusVariant.neutral),
    ('Primary', WashStatusVariant.primary),
    ('Secondary', WashStatusVariant.secondary),
    ('Accent', WashStatusVariant.accent),
    ('Info', WashStatusVariant.info),
    ('Success', WashStatusVariant.success),
    ('Warning', WashStatusVariant.warning),
    ('Error', WashStatusVariant.error),
  ];

  static const _sizes = <WashStatusSize>[
    WashStatusSize.xs,
    WashStatusSize.sm,
    WashStatusSize.md,
    WashStatusSize.lg,
    WashStatusSize.xl,
  ];

  static const _presence = <(String, WashStatusVariant, String)>[
    ('Online', WashStatusVariant.success, 'Painting now'),
    ('Away', WashStatusVariant.warning, 'Back in 20 min'),
    ('Busy', WashStatusVariant.error, 'Critique in progress'),
    ('Offline', WashStatusVariant.neutral, 'Last seen yesterday'),
  ];

  static const _studio = <(String, WashStatusVariant, String)>[
    ('Layer wet', WashStatusVariant.info, 'Wash still drying'),
    ('Layer dry', WashStatusVariant.success, 'Ready to glaze'),
    ('Brush ready', WashStatusVariant.primary, 'Round 6 loaded'),
    ('Syncing', WashStatusVariant.warning, 'Uploading plate'),
    ('Synced', WashStatusVariant.success, 'Cloud up to date'),
    ('Sync failed', WashStatusVariant.error, 'Retry when online'),
  ];

  static const _chipColors = <(String, WashStatusVariant)>[
    ('success', WashStatusVariant.success),
    ('warning', WashStatusVariant.warning),
    ('error', WashStatusVariant.error),
    ('info', WashStatusVariant.info),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Status',
      description: 'daisyUI status dots for presence, sync, and studio state.',
      sections: [
        _s(
          '01 · Basic',
          'Default status dots',
          'Bare status spans',
          _basic(),
          _basicDart,
        ),
        _s(
          '02 · Colors',
          'Semantic colors',
          'Brand and feedback colors with class labels',
          _colorsRow(),
          _colorsDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Sizes',
          'Size scale',
          'status-xs through status-xl',
          _sizesRow(),
          _sizesDart,
        ),
        _s(
          '04 · With text',
          'Online and offline rows',
          'Status dots beside labels for presence lists and unread cues',
          _withText(),
          _withTextDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '05 · Studio',
          'Menzies Design states',
          'Layer wet or dry, brush ready, and sync outcomes',
          _studioGrid(),
          _studioDart,
        ),
        _s(
          '06 · Responsive',
          'Breakpoint layouts',
          'Dots stack tightly on mobile, then open into a labeled size row',
          const _ResponsiveSection(),
          _responsiveDart,
          tint: WashGalleryPanelTint.ochre,
        ),
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

  static Widget _sample(String label, Widget child) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        WashStatusClassLabel(label),
      ],
    );
  }

  static Widget _basic() {
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'status',
          const WashStatus(semanticLabel: 'Status'),
        ),
        _sample(
          'status (pair)',
          const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashStatus(),
              SizedBox(width: 8),
              WashStatus(),
              SizedBox(width: 8),
              WashStatus(),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _colorsRow() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = w >= WashTailwindBreakpoints.lg
            ? 8
            : w >= WashTailwindBreakpoints.sm
                ? 4
                : 2;
        final gap = 24.0;
        final cellW = (w - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final c in _colors)
              SizedBox(
                width: cellW,
                child: _sample(
                  washStatusClassLabel(variant: c.$2),
                  WashStatus(variant: c.$2, semanticLabel: c.$1),
                ),
              ),
          ],
        );
      },
    );
  }

  static Widget _sizesRow() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final s in _sizes)
          _sample(
            washStatusClassLabel(
              variant: WashStatusVariant.primary,
              size: s,
            ),
            WashStatus(
              variant: WashStatusVariant.primary,
              size: s,
              semanticLabel: '${s.name.toUpperCase()} status',
            ),
          ),
      ],
    );
  }

  static Widget _withText() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final gap = 24.0;
        final colW =
            twoCol ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: colW,
              child: Column(
                children: [
                  for (var i = 0; i < _presence.length; i++) ...[
                    if (i > 0) const SizedBox(height: 12),
                    _StatusCopyCard(
                      variant: _presence[i].$2,
                      title: _presence[i].$1,
                      detail: _presence[i].$3,
                      classLabel:
                          washStatusClassLabel(variant: _presence[i].$2),
                    ),
                  ],
                ],
              ),
            ),
            SizedBox(
              width: colW,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _sample(
                    washStatusClassLabel(
                      variant: WashStatusVariant.error,
                      motion: WashStatusMotion.ping,
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashStatus(
                          variant: WashStatusVariant.error,
                          motion: WashStatusMotion.ping,
                          semanticLabel: 'Server is down',
                        ),
                        const SizedBox(width: 12),
                        Text(
                          'Server is down',
                          style: WashTypography.body(
                            WashTokens.of(context).onSurface,
                          ).copyWith(fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  _sample(
                    washStatusClassLabel(
                      variant: WashStatusVariant.info,
                      motion: WashStatusMotion.bounce,
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const WashStatus(
                          variant: WashStatusVariant.info,
                          motion: WashStatusMotion.bounce,
                        ),
                        const SizedBox(width: 12),
                        Text(
                          'Unread messages',
                          style: WashTypography.body(
                            WashTokens.of(context).onSurface,
                          ).copyWith(fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  static Widget _studioGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = w >= WashTailwindBreakpoints.lg
            ? 3
            : w >= WashTailwindBreakpoints.sm
                ? 2
                : 1;
        final gap = 12.0;
        final cellW = (w - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final row in _studio)
              SizedBox(
                width: cellW,
                child: _StatusCopyCard(
                  variant: row.$2,
                  title: row.$1,
                  detail: row.$3,
                  classLabel: washStatusClassLabel(variant: row.$2),
                  alignStart: true,
                ),
              ),
          ],
        );
      },
    );
  }

  static const _basicDart = '''
WashStatus(semanticLabel: 'Status')
Row(children: [WashStatus(), WashStatus(), WashStatus()])
''';

  static const _colorsDart = '''
WashStatus(variant: WashStatusVariant.neutral)
WashStatus(variant: WashStatusVariant.primary)
WashStatus(variant: WashStatusVariant.error)
''';

  static const _sizesDart = '''
WashStatus(variant: WashStatusVariant.primary, size: WashStatusSize.xs)
WashStatus(variant: WashStatusVariant.primary, size: WashStatusSize.xl)
''';

  static const _withTextDart = '''
WashStatus(variant: WashStatusVariant.success)
WashStatus(variant: WashStatusVariant.error, motion: WashStatusMotion.ping)
WashStatus(variant: WashStatusVariant.info, motion: WashStatusMotion.bounce)
''';

  static const _studioDart = '''
WashStatus(variant: WashStatusVariant.info)
WashStatus(variant: WashStatusVariant.success)
WashStatus(variant: WashStatusVariant.error)
''';

  static const _responsiveDart = '''
WashStatus(variant: WashStatusVariant.accent, size: WashStatusSize.xs)
WashStatus(variant: WashStatusVariant.success)
''';
}

class _StatusCopyCard extends StatelessWidget {
  const _StatusCopyCard({
    required this.variant,
    required this.title,
    required this.detail,
    required this.classLabel,
    this.alignStart = false,
  });

  final WashStatusVariant variant;
  final String title;
  final String detail;
  final String classLabel;
  final bool alignStart;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          crossAxisAlignment:
              alignStart ? CrossAxisAlignment.start : CrossAxisAlignment.center,
          children: [
            Padding(
              padding: EdgeInsets.only(top: alignStart ? 4 : 0),
              child: WashStatus(variant: variant),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    detail,
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 12,
                    ),
                  ),
                  if (alignStart) ...[
                    const SizedBox(height: 8),
                    WashStatusClassLabel(classLabel),
                  ],
                ],
              ),
            ),
            if (!alignStart) WashStatusClassLabel(classLabel),
          ],
        ),
      ),
    );
  }
}

class _ResponsiveSection extends StatelessWidget {
  const _ResponsiveSection();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final row = w >= WashTailwindBreakpoints.sm;
        final size = w >= WashTailwindBreakpoints.lg
            ? WashStatusSize.lg
            : w >= WashTailwindBreakpoints.md
                ? WashStatusSize.md
                : w >= WashTailwindBreakpoints.sm
                    ? WashStatusSize.sm
                    : WashStatusSize.xs;
        final chips = LayoutBuilder(
          builder: (context, inner) {
            final cols = inner.maxWidth >= WashTailwindBreakpoints.sm ? 4 : 2;
            final gap = 12.0;
            final cellW = (inner.maxWidth - gap * (cols - 1)) / cols;
            final tokens = WashTokens.of(context);
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (final c in WashStatusGalleryPage._chipColors)
                  SizedBox(
                    width: cellW,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        color: tokens.surface.withValues(alpha: 0.6),
                        borderRadius: BorderRadius.circular(tokens.radiusBox),
                        border: Border.all(
                          color: tokens.inkBorder.withValues(alpha: 0.6),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        child: Row(
                          children: [
                            WashStatus(variant: c.$2),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                c.$1,
                                overflow: TextOverflow.ellipsis,
                                style: WashTypography.body(tokens.onSurface)
                                    .copyWith(fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
              ],
            );
          },
        );

        final sample = Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashStatus(
              variant: WashStatusVariant.accent,
              size: size,
              semanticLabel: 'Responsive size status',
            ),
            const SizedBox(height: 8),
            const WashStatusClassLabel(
              'status-xs sm:status-sm md:status-md lg:status-lg',
            ),
          ],
        );

        if (!row) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              sample,
              const SizedBox(height: 24),
              chips,
            ],
          );
        }

        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            sample,
            const SizedBox(width: 24),
            Expanded(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 448),
                child: chips,
              ),
            ),
          ],
        );
      },
    );
  }
}
