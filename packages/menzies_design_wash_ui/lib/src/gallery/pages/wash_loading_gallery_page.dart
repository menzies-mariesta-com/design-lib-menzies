import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/loading/wash_loading.dart';
import '../../components/loading/wash_studio_loading.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashLoadingGalleryPage extends StatelessWidget {
  const WashLoadingGalleryPage({super.key});

  static const _variants = <(String, WashLoadingVariant)>[
    ('Spinner', WashLoadingVariant.spinner),
    ('Dots', WashLoadingVariant.dots),
    ('Ring', WashLoadingVariant.ring),
    ('Ball', WashLoadingVariant.ball),
    ('Bars', WashLoadingVariant.bars),
    ('Infinity', WashLoadingVariant.infinity),
  ];

  static const _tones = <(String, WashLoadingTone)>[
    ('Primary', WashLoadingTone.primary),
    ('Secondary', WashLoadingTone.secondary),
    ('Accent', WashLoadingTone.accent),
    ('Neutral', WashLoadingTone.neutral),
    ('Info', WashLoadingTone.info),
    ('Success', WashLoadingTone.success),
    ('Warning', WashLoadingTone.warning),
    ('Error', WashLoadingTone.error),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Loading',
      description:
          'Studio loaders built from stroke, pigment bloom, and the Menzies mark, '
          'plus daisyUI loading spinners.',
      sections: [
        WashGallerySection(
          eyebrow: '00 · Studio identity',
          title: 'Stroke, pigment, and logo',
          description: 'Custom busy states that share wash tokens with the desk',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final cols = constraints.maxWidth >= 1280
                    ? 4
                    : constraints.maxWidth >= 640
                        ? 2
                        : 1;
                final gap = 16.0;
                final cellW = cols == 1
                    ? constraints.maxWidth
                    : (constraints.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        child: Column(
                          children: [
                            const WashBrushStrokeLoader(decorative: true),
                            const SizedBox(height: 12),
                            Text(
                              'Stroke sweep',
                              style: _titleStyle(context),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'A round tip draws across the paper, then lifts.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel('studio-load-stroke'),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        child: Column(
                          children: [
                            const WashBrushTipLoader(decorative: true),
                            const SizedBox(height: 12),
                            Text('Tip pulse', style: _titleStyle(context)),
                            const SizedBox(height: 4),
                            Text(
                              'Blob size tracks desk px. Edge soft follows water and hardness.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel('studio-load-tip + --brush-*'),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        wash: _WashTint.blue,
                        child: Column(
                          children: [
                            const WashPigmentBloomLoader(decorative: true),
                            const SizedBox(height: 12),
                            Text('Wash bloom', style: _titleStyle(context)),
                            const SizedBox(height: 4),
                            Text(
                              'Droplet and pigment pools pulse with wash-a / wash-b / wash-c.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel(
                              'studio-load-bloom + wash tokens',
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        wash: _WashTint.rose,
                        child: Column(
                          children: [
                            const WashInkWordmarkLoader(decorative: true),
                            const SizedBox(height: 8),
                            const _ClassLabel(
                              'studio-load-ink + pigment mark',
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
            dartSource: _identityDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '01 · Studio states',
          title: 'Busy panels that follow the desk',
          description: 'Full-bleed studio states',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final wide = constraints.maxWidth >= 768;
                final gap = 16.0;
                final half = wide
                    ? (constraints.maxWidth - gap) / 2
                    : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: half,
                      child: _StatusCard(
                        minHeight: 208,
                        child: Column(
                          children: [
                            const WashBrushStrokeLoader(decorative: true),
                            const SizedBox(height: 16),
                            Text('Laying wash', style: _titleLg(context)),
                            const SizedBox(height: 4),
                            ConstrainedBox(
                              constraints: const BoxConstraints(maxWidth: 280),
                              child: Text(
                                'Soft edges settling with default studio load.',
                                textAlign: TextAlign.center,
                                style: _mutedStyle(context),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: half,
                      child: _PigmentMixPanel(),
                    ),
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _StatusCard(
                        wash: _WashTint.base200,
                        minHeight: 192,
                        child: Column(
                          children: [
                            const Wrap(
                              spacing: 24,
                              runSpacing: 16,
                              alignment: WrapAlignment.center,
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: [
                                WashPigmentMark(size: 64),
                                WashInkWordmarkLoader(decorative: true),
                              ],
                            ),
                            const SizedBox(height: 12),
                            ConstrainedBox(
                              constraints: const BoxConstraints(maxWidth: 420),
                              child: Text(
                                'Logo soak uses the pigment mark from the favicon palette '
                                'and an ink-fill wordmark timed to --brush-soak-duration.',
                                textAlign: TextAlign.center,
                                style: _mutedStyle(context),
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
            dartSource: _statesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Types',
          title: 'daisyUI animation styles',
          description: 'All six daisyUI 5 loading styles with class labels',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final cols = constraints.maxWidth >= 1024
                    ? 6
                    : constraints.maxWidth >= 640
                        ? 3
                        : 2;
                final gap = 24.0;
                final cellW =
                    (constraints.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  alignment: WrapAlignment.center,
                  children: [
                    for (final v in _variants)
                      SizedBox(
                        width: cellW,
                        child: Center(
                          child: WashLoading(
                            label: '${v.$1} loading',
                            variant: v.$2,
                            size: WashLoadingSize.lg,
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
            dartSource: _typesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Sizes',
          title: 'Size scale',
          description: 'loading-xs through loading-xl on the default spinner',
          tint: WashGalleryPanelTint.ochre,
          child: const WashShowcaseTabs(
            preview: Wrap(
              spacing: 24,
              runSpacing: 16,
              crossAxisAlignment: WrapCrossAlignment.end,
              children: [
                WashLoading(
                  label: 'XS spinner',
                  size: WashLoadingSize.xs,
                ),
                WashLoading(
                  label: 'SM spinner',
                  size: WashLoadingSize.sm,
                ),
                WashLoading(
                  label: 'MD spinner',
                  size: WashLoadingSize.md,
                ),
                WashLoading(
                  label: 'LG spinner',
                  size: WashLoadingSize.lg,
                ),
                WashLoading(
                  label: 'XL spinner',
                  size: WashLoadingSize.xl,
                ),
              ],
            ),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Colors',
          title: 'Semantic colors',
          description: 'Color via text-* utilities',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final cols = constraints.maxWidth >= 1024
                    ? 8
                    : constraints.maxWidth >= 640
                        ? 4
                        : 2;
                final gap = 24.0;
                final cellW =
                    (constraints.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    for (final t in _tones)
                      SizedBox(
                        width: cellW,
                        child: Center(
                          child: WashLoading(
                            label: '${t.$1} loading',
                            size: WashLoadingSize.lg,
                            tone: t.$2,
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
            dartSource: _colorsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Types × colors',
          title: 'Style matrix',
          description: 'Each animation style across primary through error',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: ConstrainedBox(
                constraints: const BoxConstraints(minWidth: 576),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (final v in _variants) ...[
                      WashGalleryLabelInk(v.$1),
                      const SizedBox(height: 12),
                      Wrap(
                        spacing: 20,
                        runSpacing: 12,
                        crossAxisAlignment: WrapCrossAlignment.end,
                        children: [
                          for (final t in _tones)
                            WashLoading(
                              label: '${v.$1} ${t.$1}',
                              variant: v.$2,
                              size: WashLoadingSize.md,
                              tone: t.$2,
                            ),
                        ],
                      ),
                      const SizedBox(height: 20),
                    ],
                  ],
                ),
              ),
            ),
            dartSource: _matrixDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · In buttons',
          title: 'Loading button states',
          description:
              'Busy buttons use studio marks or daisyUI loading, disabled state',
          child: Wrap(
            spacing: 16,
            runSpacing: 16,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.defaultVariant,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SizedBox(
                        width: 56,
                        height: 12,
                        child: WashBrushStrokeLoader(
                          decorative: true,
                          height: 12,
                          maxWidth: 56,
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Text('Mixing'),
                    ],
                  ),
                ),
                dartSource: _btnMixingDart,
              ),
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.primary,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashPigmentMark(size: 22),
                      SizedBox(width: 8),
                      Text('Saving plate'),
                    ],
                  ),
                ),
                dartSource: _btnSavingDart,
              ),
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.secondary,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashBrushTipLoader(decorative: true, scale: 0.45),
                      SizedBox(width: 4),
                      Text('Syncing'),
                    ],
                  ),
                ),
                dartSource: _btnSyncingDart,
              ),
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.outline,
                  tint: WashButtonVariant.accent,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashLoading(
                        decorative: true,
                        variant: WashLoadingVariant.bars,
                        size: WashLoadingSize.sm,
                        tone: WashLoadingTone.accent,
                      ),
                      SizedBox(width: 8),
                      Text('Exporting'),
                    ],
                  ),
                ),
                dartSource: _btnExportDart,
              ),
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.ghost,
                  circle: true,
                  child: const WashPigmentMark(size: 20),
                ),
                dartSource: _btnCircleDart,
              ),
              WashShowcaseTabs(
                preview: WashButton(
                  onPressed: null,
                  enabled: false,
                  variant: WashButtonVariant.info,
                  soft: true,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashLoading(
                        decorative: true,
                        variant: WashLoadingVariant.infinity,
                        tone: WashLoadingTone.info,
                      ),
                      SizedBox(width: 8),
                      Text('Drying wash'),
                    ],
                  ),
                ),
                dartSource: _btnDryingDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Studio panels',
          title: 'Wash drying panels',
          description:
              'Full-bleed busy states mixing studio loaders with daisyUI accents',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final md = constraints.maxWidth >= 768;
                final lg = constraints.maxWidth >= 1024;
                final gap = 16.0;
                final half =
                    md ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: half,
                      child: _StatusCard(
                        child: Column(
                          children: [
                            const WashBrushStrokeLoader(decorative: true),
                            const SizedBox(height: 12),
                            Text('Wash drying', style: _titleLg(context)),
                            const SizedBox(height: 4),
                            Text(
                              'Soft edges are settling. Leave the plate undisturbed.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel('studio-load-stroke'),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: half,
                      child: _StatusCard(
                        wash: _WashTint.blue,
                        child: Column(
                          children: [
                            const WashPigmentBloomLoader(decorative: true),
                            const SizedBox(height: 12),
                            Text('Pigment mix', style: _titleLg(context)),
                            const SizedBox(height: 4),
                            Text(
                              'Blending ultramarine and ochre for the next glaze.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel('studio-load-bloom'),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: lg ? half : constraints.maxWidth,
                      child: _StatusCard(
                        wash: _WashTint.rose,
                        child: Column(
                          children: [
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                WashLucideIcon(
                                  'droplets',
                                  size: 20,
                                  color: WashTokens.of(context).palette.accent,
                                ),
                                const SizedBox(width: 12),
                                const WashPigmentMark(size: 36),
                                const SizedBox(width: 12),
                                WashLucideIcon(
                                  'palette',
                                  size: 20,
                                  color: WashTokens.of(context).palette.accent,
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Text('Series sync', style: _titleLg(context)),
                            const SizedBox(height: 4),
                            Text(
                              'Pulling the latest plates into your studio shelf.',
                              textAlign: TextAlign.center,
                              style: _mutedStyle(context),
                            ),
                            const SizedBox(height: 8),
                            const _ClassLabel('pigment mark + Lucide'),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: lg ? half : constraints.maxWidth,
                      child: _OverlayInkPanel(),
                    ),
                  ],
                );
              },
            ),
            dartSource: _panelsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Responsive',
          title: 'Adaptive busy rows',
          description: 'Stacked on mobile, side by side from md up',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, constraints) {
                final row = constraints.maxWidth >= 768;
                final gap = 16.0;
                final cellW = row
                    ? (constraints.maxWidth - gap) / 2
                    : constraints.maxWidth;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 16,
                        ),
                        child: Row(
                          children: [
                            const WashBrushTipLoader(
                              decorative: true,
                              scale: 0.75,
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Thumbnail bake',
                                    style: WashTypography.body(
                                      WashTokens.of(context).onSurface,
                                    ).copyWith(fontWeight: FontWeight.w500),
                                  ),
                                  Text(
                                    'Compressing preview for the shelf grid with round tip.',
                                    style: _mutedStyle(context),
                                  ),
                                  const SizedBox(height: 4),
                                  const _ClassLabel('studio-load-tip'),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      width: cellW,
                      child: _StatusCard(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 16,
                        ),
                        child: Row(
                          children: [
                            const WashPigmentMark(size: 40),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Cloud archive',
                                    style: WashTypography.body(
                                      WashTokens.of(context).onSurface,
                                    ).copyWith(fontWeight: FontWeight.w500),
                                  ),
                                  Text(
                                    'Uploading high-res scan in the background.',
                                    style: _mutedStyle(context),
                                  ),
                                  const SizedBox(height: 4),
                                  const _ClassLabel('studio-load-mark'),
                                ],
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
      ],
    );
  }

  static TextStyle _titleStyle(BuildContext context) =>
      WashTypography.title(WashTokens.of(context).onSurface).copyWith(
        fontSize: 16,
        fontWeight: FontWeight.w600,
      );

  static TextStyle _titleLg(BuildContext context) =>
      WashTypography.title(WashTokens.of(context).onSurface).copyWith(
        fontSize: 18,
        fontWeight: FontWeight.w600,
      );

  static TextStyle _mutedStyle(BuildContext context) =>
      WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
        fontSize: 14,
      );

  static const _identityDart =
      'WashBrushStrokeLoader / WashBrushTipLoader / WashPigmentBloomLoader / WashInkWordmarkLoader';
  static const _statesDart = 'Studio busy panels + WashPigmentMark';
  static const _typesDart =
      'WashLoading(variant: …, size: WashLoadingSize.lg)';
  static const _sizesDart = 'WashLoading(size: WashLoadingSize.xs…xl)';
  static const _colorsDart = 'WashLoading(tone: WashLoadingTone.…)';
  static const _matrixDart = 'WashLoading matrix: variant × tone';
  static const _btnMixingDart =
      'WashButton(enabled: false, child: stroke + Mixing)';
  static const _btnSavingDart =
      'WashButton(primary, child: WashPigmentMark + Saving plate)';
  static const _btnSyncingDart =
      'WashButton(secondary, child: tip + Syncing)';
  static const _btnExportDart =
      'WashButton(outline accent, child: bars + Exporting)';
  static const _btnCircleDart =
      'WashButton(ghost, circle: true, child: WashPigmentMark)';
  static const _btnDryingDart =
      'WashButton(soft info, child: infinity + Drying wash)';
  static const _panelsDart = 'Studio panels + Lucide + overlay ink';
  static const _responsiveDart = 'Adaptive busy rows (tip + mark)';
}

enum _WashTint { none, blue, rose, base200 }

class _ClassLabel extends StatelessWidget {
  const _ClassLabel(this.value);

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

class _StatusCard extends StatelessWidget {
  const _StatusCard({
    required this.child,
    this.wash = _WashTint.none,
    this.minHeight,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
  });

  final Widget child;
  final _WashTint wash;
  final double? minHeight;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    const washBlue = Color(0xFF4A7FA8);
    final bg = switch (wash) {
      _WashTint.none => tokens.palette.base100.withValues(alpha: 0.7),
      _WashTint.blue => washBlue.withValues(alpha: 0.25),
      _WashTint.rose => atmo.washC.withValues(alpha: 0.35),
      _WashTint.base200 => tokens.palette.base200.withValues(alpha: 0.5),
    };
    return MouseRegion(
      cursor: SystemMouseCursors.wait,
      child: Container(
        constraints: minHeight != null
            ? BoxConstraints(minHeight: minHeight!)
            : null,
        padding: padding,
        decoration: BoxDecoration(
          color: Color.alphaBlend(bg, tokens.surface),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: tokens.inkBorder.withValues(alpha: 0.6),
          ),
          boxShadow: washPaperShadowSm(tokens),
        ),
        child: Center(child: child),
      ),
    );
  }
}

class _PigmentMixPanel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    return MouseRegion(
      cursor: SystemMouseCursors.progress,
      child: Container(
        constraints: const BoxConstraints(minHeight: 208),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          children: [
            Positioned.fill(
              child: ColoredBox(
                color: const Color(0xFF4A7FA8).withValues(alpha: 0.2),
              ),
            ),
            Positioned(
              left: -32,
              top: -40,
              child: Container(
                width: 160,
                height: 160,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      atmo.washA.withValues(alpha: 0.75),
                      atmo.washA.withValues(alpha: 0),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              right: -24,
              bottom: -48,
              child: Container(
                width: 144,
                height: 144,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      atmo.washC.withValues(alpha: 0.7),
                      atmo.washC.withValues(alpha: 0),
                    ],
                  ),
                ),
              ),
            ),
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashBrushTipLoader(decorative: true),
                      SizedBox(width: 16),
                      WashPigmentBloomLoader(decorative: true, size: 96),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Pigment mix',
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 280),
                    child: Text(
                      'Bloom radius follows flow and water from wash CSS vars.',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(tokens.inkMuted)
                          .copyWith(fontSize: 14),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OverlayInkPanel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.progress,
      child: Container(
        constraints: const BoxConstraints(minHeight: 192),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          alignment: Alignment.center,
          children: [
            Positioned.fill(
              child: ColoredBox(
                color: tokens.palette.base300.withValues(alpha: 0.4),
              ),
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const WashInkWordmarkLoader(decorative: true),
                const SizedBox(height: 12),
                Text(
                  'Content stays in place under a light wash veil.',
                  textAlign: TextAlign.center,
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 14),
                ),
                const SizedBox(height: 8),
                const _ClassLabel('studio-load-ink + overlay'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
