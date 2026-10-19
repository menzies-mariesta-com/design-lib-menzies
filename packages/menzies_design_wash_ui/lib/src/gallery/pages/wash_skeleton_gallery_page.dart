import 'package:flutter/widgets.dart';

import '../../components/avatar/wash_avatar.dart';
import '../../components/badge/wash_badge.dart';
import '../../components/skeleton/wash_skeleton.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_form_fields.dart' show WashToggle;
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashSkeletonGalleryPage extends StatelessWidget {
  const WashSkeletonGalleryPage({super.key});

  static const _shapes = <(WashSkeleton, String)>[
    (WashSkeleton(width: 128, height: 128), 'skeleton h-32 w-32'),
    (
      WashSkeleton(width: 64, height: 64, shape: WashSkeletonShape.circle),
      'skeleton h-16 w-16 shrink-0 rounded-full',
    ),
    (WashSkeleton(width: 112, height: 12), 'skeleton h-3 w-28'),
    (WashSkeleton(width: 160, height: 16), 'skeleton h-4 w-40'),
    (WashSkeleton(width: 224, height: 16), 'skeleton h-4 w-56'),
  ];

  static const _sizes = <(WashSkeleton, String)>[
    (WashSkeleton(width: 64, height: 8), 'skeleton h-2 w-16'),
    (WashSkeleton(width: 96, height: 16), 'skeleton h-4 w-24'),
    (WashSkeleton(width: 160, height: 16), 'skeleton h-4 w-40'),
    (WashSkeleton(width: 256, height: 16), 'skeleton h-4 w-64'),
    (WashSkeleton(width: 48, height: 48), 'skeleton h-12 w-12'),
    (WashSkeleton(width: 80, height: 80), 'skeleton h-20 w-20'),
    (WashSkeleton(width: 128, height: 128), 'skeleton h-32 w-32'),
  ];

  static const _basicDart = '''
WashSkeleton(width: 128, height: 128)
WashSkeleton(width: 64, height: 64, shape: WashSkeletonShape.circle)
WashSkeleton(width: 160, height: 16)
WashSkeleton(height: 32, expand: true, maxWidth: 320)
WashSkeleton.text('Mixing the next glaze...')
''';

  static const _layoutsDart = '''
WashSkeleton(width: 64, height: 64, shape: WashSkeletonShape.circle)
WashSkeleton(width: 80, height: 16)
WashSkeleton(height: 128, expand: true)
WashSkeleton(height: 12, widthFraction: 0.75)
''';

  static const _sizesDart = '''
WashSkeleton(width: 64, height: 8)
WashSkeleton(width: 256, height: 16)
WashSkeleton(width: 128, height: 128)
WashSkeleton(height: 96, expand: true, maxWidth: 384)
''';

  static const _studioDart = '''
WashSkeleton(height: 112, expand: true)
WashSkeleton(width: 32, height: 32, shape: WashSkeletonShape.circle)
WashSkeleton(aspectSquare: true, expand: true)
''';

  static const _toggleDart = '''
WashToggle(value: loaded, onChanged: setLoaded)
WashSkeleton(width: 64, height: 64, shape: WashSkeletonShape.circle)
WashSkeleton.text replaced by loaded plate copy
''';

  static const _responsiveDart = '''
WashSkeleton(width: 56, height: 56, shape: WashSkeletonShape.roundedBox)
WashSkeleton(width: 56, height: 56, shape: WashSkeletonShape.circle)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Skeleton',
      description:
          'daisyUI skeleton placeholders for content still loading.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Blocks, circles, and lines',
          description:
              'Core skeleton shapes sized with Tailwind width and height utilities',
          child: WashShowcaseTabs(
            preview: const _BasicSection(),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Layouts',
          title: 'Card and list placeholders',
          description: 'Avatar plus lines, media cards, and wash-panel list rows',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _LayoutsSection(),
            dartSource: _layoutsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Sizes',
          title: 'Widths and heights',
          description:
              'Common placeholder scales with class labels under each sample',
          child: WashShowcaseTabs(
            preview: const _SizesSection(),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Studio',
          title: 'Pigment and layer placeholders',
          description:
              'Studio-shaped loading shells for pigment cards and the layer stack',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _StudioSection(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Toggle',
          title: 'Skeleton versus loaded',
          description: 'Flip between placeholder shell and finished plate content',
          child: WashShowcaseTabs(
            preview: const _ToggleSection(),
            dartSource: _toggleDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Responsive',
          title: 'Adaptive loading rows',
          description: 'Stacked on mobile, side by side from md up',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _ResponsiveSection(),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }
}

Widget _classLabel(BuildContext context, String value) {
  return Text(
    value,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 10.4,
      fontFamily: 'monospace',
      fontFeatures: const [FontFeature.tabularFigures()],
    ),
  );
}

Widget _sample(
  BuildContext context, {
  required String label,
  required Widget child,
  bool center = false,
}) {
  return Column(
    crossAxisAlignment:
        center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
    children: [
      child,
      const SizedBox(height: 8),
      _classLabel(context, label),
    ],
  );
}

Widget _panel({
  required WashTokens tokens,
  required Widget child,
  Color? fill,
  double borderAlpha = 0.6,
  EdgeInsetsGeometry padding = const EdgeInsets.all(16),
}) {
  return Container(
    padding: padding,
    decoration: BoxDecoration(
      color: fill ?? tokens.palette.base100.withValues(alpha: 0.6),
      borderRadius: BorderRadius.circular(tokens.radiusBox),
      border: Border.all(
        color: tokens.inkBorder.withValues(alpha: borderAlpha),
      ),
    ),
    child: child,
  );
}

class _BasicSection extends StatelessWidget {
  const _BasicSection();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = w >= 1024
            ? 6
            : w >= 640
                ? 3
                : 2;
        final gap = 24.0;
        final cellW = (w - gap * (cols - 1)) / cols;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (final s in WashSkeletonGalleryPage._shapes)
                  SizedBox(
                    width: cellW,
                    child: _sample(
                      context,
                      label: s.$2,
                      center: true,
                      child: s.$1,
                    ),
                  ),
                SizedBox(
                  width: cellW,
                  child: _sample(
                    context,
                    label: 'skeleton h-8 w-full max-w-xs',
                    center: true,
                    child: const WashSkeleton(
                      height: 32,
                      expand: true,
                      maxWidth: 320,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            const WashGalleryLabelInk('skeleton-text'),
            const SizedBox(height: 8),
            _sample(
              context,
              label: 'skeleton skeleton-text',
              child: WashSkeleton.text(
                'Mixing the next glaze...',
                textStyle: WashTypography.title(
                  WashTokens.of(context).onSurface,
                ).copyWith(fontSize: 18, fontWeight: FontWeight.w600),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _LayoutsSection extends StatelessWidget {
  const _LayoutsSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = w >= 1024
            ? 3
            : w >= 768
                ? 2
                : 1;
        final gap = 24.0;
        final cellW = cols == 1 ? w : (w - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: cellW,
              child: _sample(
                context,
                label: 'circle + lines + block',
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 320),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Row(
                        children: [
                          WashSkeleton(
                            width: 64,
                            height: 64,
                            shape: WashSkeletonShape.circle,
                          ),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              WashSkeleton(width: 80, height: 16),
                              SizedBox(height: 12),
                              WashSkeleton(width: 112, height: 16),
                            ],
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      WashSkeleton(height: 128, expand: true),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(
              width: cellW,
              child: _sample(
                context,
                label: 'media + title + body lines',
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 320),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      WashSkeleton(height: 128, expand: true),
                      SizedBox(height: 16),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: WashSkeleton(width: 112, height: 16),
                      ),
                      SizedBox(height: 16),
                      WashSkeleton(height: 16, expand: true),
                      SizedBox(height: 16),
                      WashSkeleton(height: 16, expand: true),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(
              width: cellW,
              child: _sample(
                context,
                label: 'wash-panel list rows',
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 320),
                  child: Column(
                    children: [
                      for (var i = 0; i < 3; i++) ...[
                        if (i > 0) const SizedBox(height: 12),
                        _panel(
                          tokens: tokens,
                          fill: tokens.palette.base100.withValues(alpha: 0.5),
                          borderAlpha: 0.5,
                          padding: const EdgeInsets.all(12),
                          child: const Row(
                            children: [
                              WashSkeleton(
                                width: 40,
                                height: 40,
                                shape: WashSkeletonShape.circle,
                              ),
                              SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    WashSkeleton(
                                      height: 12,
                                      widthFraction: 0.75,
                                    ),
                                    SizedBox(height: 8),
                                    WashSkeleton(
                                      height: 12,
                                      widthFraction: 0.5,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _SizesSection extends StatelessWidget {
  const _SizesSection();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final cols = w >= 640 ? 4 : 2;
        final gap = 24.0;
        final cellW = (w - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final s in WashSkeletonGalleryPage._sizes)
              SizedBox(
                width: cellW,
                child: _sample(
                  context,
                  label: s.$2,
                  center: true,
                  child: s.$1,
                ),
              ),
            SizedBox(
              width: cellW,
              child: _sample(
                context,
                label: 'skeleton h-24 w-full max-w-sm',
                center: true,
                child: const WashSkeleton(
                  height: 96,
                  expand: true,
                  maxWidth: 384,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _StudioSection extends StatelessWidget {
  const _StudioSection();

  static const _washBlue = Color(0xFF4A7FA8);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final two = w >= 768;
        final gap = 16.0;
        final half = two ? (w - gap) / 2 : w;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: half,
              child: _panel(
                tokens: tokens,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        WashLucideIcon(
                          'palette',
                          size: 16,
                          color: tokens.palette.primary,
                          strokeWidth: 2,
                        ),
                        const SizedBox(width: 8),
                        const WashGalleryLabelInk('Pigment card'),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const WashSkeleton(height: 112, expand: true),
                    const SizedBox(height: 16),
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: WashSkeleton(width: 128, height: 16),
                    ),
                    const SizedBox(height: 8),
                    const WashSkeleton(height: 12, expand: true),
                    const SizedBox(height: 8),
                    const WashSkeleton(height: 12, widthFraction: 5 / 6),
                    const SizedBox(height: 12),
                    const Row(
                      children: [
                        WashSkeleton(
                          width: 32,
                          height: 32,
                          shape: WashSkeletonShape.circle,
                        ),
                        SizedBox(width: 8),
                        WashSkeleton(
                          width: 32,
                          height: 32,
                          shape: WashSkeletonShape.circle,
                        ),
                        SizedBox(width: 8),
                        WashSkeleton(
                          width: 32,
                          height: 32,
                          shape: WashSkeletonShape.circle,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    _classLabel(context, 'skeleton pigment card'),
                  ],
                ),
              ),
            ),
            SizedBox(
              width: half,
              child: _panel(
                tokens: tokens,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        WashLucideIcon(
                          'layers',
                          size: 16,
                          color: tokens.palette.secondary,
                          strokeWidth: 2,
                        ),
                        const SizedBox(width: 8),
                        const WashGalleryLabelInk('Layer stack'),
                      ],
                    ),
                    const SizedBox(height: 12),
                    for (var i = 0; i < 4; i++) ...[
                      if (i > 0) const SizedBox(height: 8),
                      _panel(
                        tokens: tokens,
                        fill: tokens.palette.base200.withValues(alpha: 0.4),
                        borderAlpha: 0.4,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        child: const Row(
                          children: [
                            WashSkeleton(width: 32, height: 32),
                            SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  WashSkeleton(width: 96, height: 12),
                                  SizedBox(height: 6),
                                  WashSkeleton(width: 64, height: 8),
                                ],
                              ),
                            ),
                            WashSkeleton(width: 32, height: 16),
                          ],
                        ),
                      ),
                    ],
                    const SizedBox(height: 8),
                    _classLabel(context, 'skeleton layer stack'),
                  ],
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: _panel(
                tokens: tokens,
                fill: _washBlue.withValues(alpha: 0.25),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        WashLucideIcon(
                          'droplets',
                          size: 16,
                          color: tokens.palette.accent,
                          strokeWidth: 2,
                        ),
                        const SizedBox(width: 8),
                        const WashGalleryLabelInk('Wash drying shelf'),
                      ],
                    ),
                    const SizedBox(height: 12),
                    LayoutBuilder(
                      builder: (context, inner) {
                        final cols = inner.maxWidth >= 640 ? 4 : 2;
                        final tileGap = 12.0;
                        final tileW =
                            (inner.maxWidth - tileGap * (cols - 1)) / cols;
                        return Wrap(
                          spacing: tileGap,
                          runSpacing: tileGap,
                          children: [
                            for (var i = 0; i < 4; i++)
                              SizedBox(
                                width: tileW,
                                child: const Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    WashSkeleton(
                                      aspectSquare: true,
                                      expand: true,
                                    ),
                                    SizedBox(height: 8),
                                    WashSkeleton(
                                      height: 12,
                                      widthFraction: 0.75,
                                    ),
                                    SizedBox(height: 8),
                                    WashSkeleton(
                                      height: 8,
                                      widthFraction: 0.5,
                                    ),
                                  ],
                                ),
                              ),
                          ],
                        );
                      },
                    ),
                    const SizedBox(height: 8),
                    _classLabel(context, 'skeleton shelf grid'),
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _ToggleSection extends StatefulWidget {
  const _ToggleSection();

  @override
  State<_ToggleSection> createState() => _ToggleSectionState();
}

class _ToggleSectionState extends State<_ToggleSection> {
  bool _loaded = false;
  static const _washBlue = Color(0xFF4A7FA8);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 12,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            WashToggle(
              value: _loaded,
              label: 'Show loaded content',
              onChanged: (v) => setState(() => _loaded = v),
            ),
            _classLabel(context, 'toggle + skeleton vs content'),
          ],
        ),
        const SizedBox(height: 16),
        _panel(
          tokens: tokens,
          fill: tokens.palette.base100.withValues(alpha: 0.7),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final stacked = constraints.maxWidth < 640;
              return _loaded
                  ? _loadedContent(tokens, stacked: stacked)
                  : _skeletonContent(stacked: stacked);
            },
          ),
        ),
      ],
    );
  }

  Widget _skeletonContent({required bool stacked}) {
    const body = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashSkeleton(width: 160, height: 20),
        SizedBox(height: 12),
        WashSkeleton(height: 16, expand: true),
        SizedBox(height: 12),
        WashSkeleton(height: 16, widthFraction: 0.8, maxWidth: 448),
        SizedBox(height: 12),
        Row(
          children: [
            WashSkeleton(
              width: 80,
              height: 24,
              shape: WashSkeletonShape.circle,
            ),
            SizedBox(width: 8),
            WashSkeleton(
              width: 96,
              height: 24,
              shape: WashSkeletonShape.circle,
            ),
          ],
        ),
      ],
    );
    const avatar = WashSkeleton(
      width: 64,
      height: 64,
      shape: WashSkeletonShape.circle,
    );
    if (stacked) {
      return const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          avatar,
          SizedBox(height: 16),
          body,
        ],
      );
    }
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        avatar,
        SizedBox(width: 16),
        Expanded(child: body),
      ],
    );
  }

  Widget _loadedContent(WashTokens tokens, {required bool stacked}) {
    final avatar = WashAvatar(
      placeholderText: 'MK',
      placeholder: true,
      size: WashAvatarSize.md,
      radius: WashAvatarRadius.circle,
      placeholderBackground: _washBlue,
      placeholderForeground: tokens.onSurface,
    );
    final body = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Misty Cove plate',
          style: WashTypography.title(tokens.onSurface).copyWith(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Soft ultramarine wash over ochre underpainting. Edges left wet for bloom.',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
        ),
        const SizedBox(height: 8),
        const Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashBadge(
              'Series A',
              tone: WashBadgeTone.primary,
              style: WashBadgeStyle.soft,
            ),
            WashBadge(
              'Wet edge',
              tone: WashBadgeTone.secondary,
              style: WashBadgeStyle.soft,
            ),
          ],
        ),
      ],
    );
    if (stacked) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          avatar,
          const SizedBox(height: 16),
          body,
        ],
      );
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        avatar,
        const SizedBox(width: 16),
        Expanded(child: body),
      ],
    );
  }
}

class _ResponsiveSection extends StatelessWidget {
  const _ResponsiveSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= 768;
        Widget card({
          required Widget thumb,
          required Widget lines,
        }) {
          final panel = _panel(
            tokens: tokens,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            child: Row(
              children: [
                thumb,
                const SizedBox(width: 16),
                Expanded(child: lines),
              ],
            ),
          );
          if (row) return Expanded(child: panel);
          return panel;
        }

        final first = card(
          thumb: const WashSkeleton(
            width: 56,
            height: 56,
            shape: WashSkeletonShape.roundedBox,
          ),
          lines: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const WashSkeleton(width: 112, height: 16),
              const SizedBox(height: 8),
              const WashSkeleton(height: 12, expand: true),
              const SizedBox(height: 8),
              _classLabel(context, 'skeleton row (mobile stack)'),
            ],
          ),
        );
        final second = card(
          thumb: const WashSkeleton(
            width: 56,
            height: 56,
            shape: WashSkeletonShape.circle,
          ),
          lines: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const WashSkeleton(width: 128, height: 16),
              const SizedBox(height: 8),
              const WashSkeleton(height: 12, widthFraction: 0.8),
              const SizedBox(height: 8),
              _classLabel(context, 'skeleton row (md side by side)'),
            ],
          ),
        );
        if (row) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              first,
              const SizedBox(width: 16),
              second,
            ],
          );
        }
        return Column(
          children: [
            first,
            const SizedBox(height: 16),
            second,
          ],
        );
      },
    );
  }
}
