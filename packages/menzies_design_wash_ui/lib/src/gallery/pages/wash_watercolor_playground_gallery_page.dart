import 'dart:math' as math;

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/color_picker/wash_color_picker.dart';
import '../../components/splash/wash_watercolor_splash.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashWatercolorPlaygroundGalleryPage extends StatelessWidget {
  const WashWatercolorPlaygroundGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Watercolor playground',
      description:
          'Shape organic paint splashes with reproducible seeds, tune pigment and atmosphere, then copy SVG, CSS, or React markup for cards, heroes, and empty states.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Studio',
          title: 'Paint splash playground',
          description: 'Randomize Wash themes, then export the splash',
          tint: WashGalleryPanelTint.ochre,
          child: const WashShowcaseTabs(
            preview: _PlaygroundStudio(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Variants',
          title: 'Splash shapes',
          description:
              'Forty procedural shape variants share the same pigment vars',
          child: Column(
            children: [
              const _ShapeGallery(),
              const SizedBox(height: 16),
              Text(
                'Browse all ${kWashSplashVariants.length} shapes above. Pick one in the studio controls or pass variant in code.',
                textAlign: TextAlign.center,
                style: WashTypography.body(WashTokens.of(context).inkMuted)
                    .copyWith(fontSize: 12),
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Usage',
          title: 'Drop-in pigment splashes',
          description:
              'Omit color props to inherit --wash-a and --wash-b from the active',
          child: const WashShowcaseTabs(
            preview: _UsageCards(),
            dartSource: _usageDart,
          ),
        ),
      ],
    );
  }

  static const _studioDart =
      'WashWatercolorSplash(seed:, variant:, colors:, opacity:, blur:, spread:, rotation:, size:)';
  static const _usageDart =
      'WashWatercolorSplash(variant: wash|ring|splash|blob) behind card content';
}

int _variantSeed(String id) {
  var hash = 0;
  for (final code in id.codeUnits) {
    hash = (hash * 31 + code) & 0xFFFFFFFF;
  }
  return 200 + (hash % 9000);
}

class _ShapeGallery extends StatelessWidget {
  const _ShapeGallery();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= 1024
            ? 8
            : constraints.maxWidth >= 768
                ? 5
                : constraints.maxWidth >= 640
                    ? 4
                    : 2;
        final gap = 12.0;
        final w = (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final id in kWashSplashVariants)
              SizedBox(
                width: w,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: tokens.palette.base100.withValues(alpha: 0.6),
                    borderRadius: BorderRadius.circular(tokens.radiusBox),
                    border: Border.all(
                      color: tokens.inkBorder.withValues(alpha: 0.6),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      children: [
                        WashWatercolorSplash(
                          variant: id,
                          seed: _variantSeed(id),
                          size: 72,
                          opacity: 0.82,
                          blur: 12,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          washSplashVariantLabel(id),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: WashTypography.body(tokens.onSurface)
                              .copyWith(fontSize: 12, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          id,
                          style: WashTypography.body(tokens.inkMuted).copyWith(
                            fontFamily: 'monospace',
                            fontSize: 9.6,
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
  }
}

class _PlaygroundStudio extends StatefulWidget {
  const _PlaygroundStudio();

  @override
  State<_PlaygroundStudio> createState() => _PlaygroundStudioState();
}

class _PlaygroundStudioState extends State<_PlaygroundStudio> {
  static const _defaults = ['#276c8e', '#b87524'];
  static const _palette = [
    '#276c8e',
    '#b87524',
    '#8e4a6b',
    '#3d7a5c',
    '#5c4a8e',
    '#8e6b27',
    '#2f6f8f',
    '#9a4d3a',
  ];

  late WashWatercolorSplashConfig _config;
  var _useThemeColors = false;
  var _composite = true;
  var _copied = '';

  @override
  void initState() {
    super.initState();
    _config = WashWatercolorSplashConfig(
      seed: 1284,
      variant: 'blob',
      colors: List<String>.from(_defaults),
      opacity: 0.72,
      blur: 18,
      spread: 1.05,
      rotation: 12,
      size: 280,
    );
  }

  List<String> get _activeColors {
    if (!_useThemeColors) return _config.colors;
    final tokens = WashTokens.of(context);
    return themeSplashColors(
      _config.colors.length,
      primary: tokens.primary,
      accent: tokens.palette.accent,
      secondary: tokens.palette.secondary,
    );
  }

  WashWatercolorSplashConfig get _activeConfig =>
      _config.copyWith(colors: _activeColors);

  void _randomizeTheme() {
    final scope = WashScope.of(context);
    final ids = kWashPigmentIds;
    final next = ids[math.Random().nextInt(ids.length)];
    scope.setPigment(next);
    setState(() => _useThemeColors = true);
  }

  void _randomizeShape() {
    setState(() {
      final next = generateSplashConfig(
        math.Random().nextInt(1000000),
      );
      _config = _config.copyWith(
        seed: next.seed,
        variant: next.variant,
        opacity: next.opacity,
        blur: next.blur,
        spread: next.spread,
        rotation: next.rotation,
      );
    });
  }

  Future<void> _copy(String label, String value) async {
    await Clipboard.setData(ClipboardData(text: value));
    setState(() => _copied = label);
    await Future<void>.delayed(const Duration(seconds: 2));
    if (mounted && _copied == label) setState(() => _copied = '');
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final active = _activeConfig;
    final resolved = resolveSplashPaintColors(
      active.colors,
      tokens.primary,
      tokens.palette.accent,
      tokens.palette.secondary,
    );
    final dartSnippet = splashToDart(active);
    final svgSnippet = splashToSvgExport(active, resolved);

    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 900;
        final preview = _PreviewStage(
          config: active,
          composite: _composite,
        );
        final controls = _ControlsPanel(
          config: _config,
          useThemeColors: _useThemeColors,
          composite: _composite,
          copied: _copied,
          onRandomizeTheme: _randomizeTheme,
          onRandomizeShape: _randomizeShape,
          onRandomizeAll: () {
            _randomizeTheme();
            _randomizeShape();
          },
          onVariant: (v) => setState(() => _config = _config.copyWith(variant: v)),
          onOpacity: (v) => setState(() => _config = _config.copyWith(opacity: v)),
          onBlur: (v) => setState(() => _config = _config.copyWith(blur: v)),
          onSpread: (v) => setState(() => _config = _config.copyWith(spread: v)),
          onRotation: (v) =>
              setState(() => _config = _config.copyWith(rotation: v)),
          onSize: (v) => setState(() => _config = _config.copyWith(size: v)),
          onComposite: (v) => setState(() => _composite = v),
          onUseTheme: (v) => setState(() => _useThemeColors = v),
          onAddColor: () {
            if (_config.colors.length >= kWashMaxSplashColors) return;
            setState(() {
              _useThemeColors = false;
              final next = [
                ..._config.colors,
                _palette[_config.colors.length % _palette.length],
              ];
              _config = _config.copyWith(colors: next);
            });
          },
          onRemoveColor: (i) {
            if (_config.colors.length <= 1) return;
            setState(() {
              _useThemeColors = false;
              final next = [..._config.colors]..removeAt(i);
              _config = _config.copyWith(colors: next);
            });
          },
          onColorAt: (i, hex) {
            setState(() {
              _useThemeColors = false;
              final next = [..._config.colors];
              next[i] = hex;
              _config = _config.copyWith(colors: next);
            });
          },
          onCopyDart: () => _copy('Dart', dartSnippet),
          onCopySvg: () => _copy('SVG', svgSnippet),
        );

        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: preview),
              const SizedBox(width: 16),
              Expanded(flex: 1, child: controls),
            ],
          );
        }
        return Column(
          children: [
            preview,
            const SizedBox(height: 16),
            controls,
          ],
        );
      },
    );
  }
}

class _PreviewStage extends StatelessWidget {
  const _PreviewStage({required this.config, required this.composite});

  final WashWatercolorSplashConfig config;
  final bool composite;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.palette.base200.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              'PREVIEW STAGE',
              style: WashTypography.label(tokens.inkMuted).copyWith(
                fontSize: 11,
                letterSpacing: 1.2,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 240,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: tokens.palette.base100.withValues(alpha: 0.9),
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                ),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    if (composite)
                      Transform.translate(
                        offset: const Offset(32, 24),
                        child: WashWatercolorSplash(
                          seed: config.seed + 913,
                          variant: 'splash',
                          colors: config.colors.reversed.toList(),
                          opacity: config.opacity * 0.55,
                          blur: config.blur * 1.15,
                          spread: config.spread * 0.85,
                          rotation: config.rotation + 48,
                          size: config.size * 0.72,
                        ),
                      ),
                    WashWatercolorSplash(
                      seed: config.seed,
                      variant: config.variant,
                      colors: config.colors,
                      opacity: config.opacity,
                      blur: config.blur,
                      spread: config.spread,
                      rotation: config.rotation,
                      size: config.size.clamp(120, 240),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Only your splash settings render here. Section chrome keeps Wash panel decoration.',
              textAlign: TextAlign.center,
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}

class _ControlsPanel extends StatelessWidget {
  const _ControlsPanel({
    required this.config,
    required this.useThemeColors,
    required this.composite,
    required this.copied,
    required this.onRandomizeTheme,
    required this.onRandomizeShape,
    required this.onRandomizeAll,
    required this.onVariant,
    required this.onOpacity,
    required this.onBlur,
    required this.onSpread,
    required this.onRotation,
    required this.onSize,
    required this.onComposite,
    required this.onUseTheme,
    required this.onAddColor,
    required this.onRemoveColor,
    required this.onColorAt,
    required this.onCopyDart,
    required this.onCopySvg,
  });

  final WashWatercolorSplashConfig config;
  final bool useThemeColors;
  final bool composite;
  final String copied;
  final VoidCallback onRandomizeTheme;
  final VoidCallback onRandomizeShape;
  final VoidCallback onRandomizeAll;
  final ValueChanged<String> onVariant;
  final ValueChanged<double> onOpacity;
  final ValueChanged<double> onBlur;
  final ValueChanged<double> onSpread;
  final ValueChanged<double> onRotation;
  final ValueChanged<double> onSize;
  final ValueChanged<bool> onComposite;
  final ValueChanged<bool> onUseTheme;
  final VoidCallback onAddColor;
  final ValueChanged<int> onRemoveColor;
  final void Function(int, String) onColorAt;
  final VoidCallback onCopyDart;
  final VoidCallback onCopySvg;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.palette.base100.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'CONTROLS',
              style: WashTypography.label(tokens.inkMuted).copyWith(
                fontSize: 11,
                letterSpacing: 1.2,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                WashButton(
                  label: 'Randomize theme',
                  size: WashButtonSize.sm,
                  onPressed: onRandomizeTheme,
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashLucideIcon('palette', size: 16),
                      SizedBox(width: 6),
                      Text('Randomize theme'),
                    ],
                  ),
                ),
                WashButton(
                  label: 'Randomize shape',
                  size: WashButtonSize.sm,
                  variant: WashButtonVariant.secondary,
                  onPressed: onRandomizeShape,
                ),
                WashButton(
                  label: 'Randomize all',
                  size: WashButtonSize.sm,
                  variant: WashButtonVariant.accent,
                  onPressed: onRandomizeAll,
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Shape (${config.variant})',
              style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 200,
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  mainAxisSpacing: 6,
                  crossAxisSpacing: 6,
                  childAspectRatio: 0.85,
                ),
                itemCount: kWashSplashVariants.length,
                itemBuilder: (context, i) {
                  final id = kWashSplashVariants[i];
                  final selected = id == config.variant;
                  return GestureDetector(
                    onTap: () => onVariant(id),
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: selected
                              ? tokens.primary.withValues(alpha: 0.1)
                              : tokens.palette.base100.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(tokens.radiusBox),
                          border: Border.all(
                            color: selected
                                ? tokens.primary
                                : tokens.inkBorder.withValues(alpha: 0.6),
                            width: selected ? 2 : 1,
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(6),
                          child: Column(
                            children: [
                              WashWatercolorSplash(
                                variant: id,
                                seed: _variantSeed(id),
                                size: 44,
                                opacity: 0.82,
                                blur: 12,
                              ),
                              Text(
                                washSplashVariantLabel(id),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: WashTypography.body(tokens.onSurface)
                                    .copyWith(fontSize: 10),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Text(
                    'Colors (${config.colors.length}/$kWashMaxSplashColors)',
                    style: WashTypography.body(tokens.onSurface)
                        .copyWith(fontSize: 14),
                  ),
                ),
                WashButton(
                  label: 'Add color',
                  size: WashButtonSize.xs,
                  variant: WashButtonVariant.ghost,
                  enabled: config.colors.length < kWashMaxSplashColors,
                  onPressed: onAddColor,
                ),
              ],
            ),
            for (var i = 0; i < config.colors.length; i++) ...[
              const SizedBox(height: 8),
              DecoratedBox(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: tokens.inkBorder.withValues(alpha: 0.6),
                  ),
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              'Color ${i + 1}',
                              style: WashTypography.body(tokens.onSurface)
                                  .copyWith(fontWeight: FontWeight.w500),
                            ),
                          ),
                          WashTooltip(
                            message: config.colors.length <= 1
                                ? 'Keep at least one color'
                                : 'Remove color',
                            child: WashButton(
                              size: WashButtonSize.xs,
                              variant: WashButtonVariant.ghost,
                              square: true,
                              enabled: config.colors.length > 1,
                              onPressed: () => onRemoveColor(i),
                              child: const WashLucideIcon(
                                'trash-2',
                                size: 14,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      WashColorPicker(
                        value: config.colors[i].startsWith('#')
                            ? config.colors[i]
                            : '#888888',
                        onChanged: (hex) => onColorAt(i, hex),
                        size: 120,
                        showSwatch: false,
                        showHexInput: true,
                        ariaLabel: 'Pick color ${i + 1}',
                      ),
                    ],
                  ),
                ),
              ),
            ],
            const SizedBox(height: 12),
            _CheckRow(
              label: 'Preview with Wash pigment theme colors',
              value: useThemeColors,
              onChanged: onUseTheme,
            ),
            _SliderRow(
              label: 'Opacity (${(config.opacity * 100).round()}%)',
              value: config.opacity,
              min: 0.2,
              max: 1,
              onChanged: onOpacity,
            ),
            _SliderRow(
              label: 'Blur (${config.blur.toStringAsFixed(0)}px)',
              value: config.blur,
              min: 0,
              max: 40,
              onChanged: onBlur,
            ),
            _SliderRow(
              label: 'Scale (${config.spread.toStringAsFixed(2)})',
              value: config.spread,
              min: 0.6,
              max: 1.6,
              onChanged: onSpread,
            ),
            _SliderRow(
              label: 'Rotation (${config.rotation.round()}°)',
              value: config.rotation,
              min: 0,
              max: 360,
              onChanged: onRotation,
            ),
            _SliderRow(
              label: 'Size (${config.size.round()}px)',
              value: config.size,
              min: 120,
              max: 420,
              onChanged: onSize,
            ),
            _CheckRow(
              label: 'Composite second splash',
              value: composite,
              onChanged: onComposite,
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                WashButton(
                  label: copied == 'SVG' ? 'Copied' : 'Copy SVG',
                  size: WashButtonSize.sm,
                  onPressed: onCopySvg,
                ),
                WashButton(
                  label: copied == 'Dart' ? 'Copied' : 'Copy Dart',
                  size: WashButtonSize.sm,
                  variant: WashButtonVariant.secondary,
                  onPressed: onCopyDart,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _CheckRow extends StatelessWidget {
  const _CheckRow({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: GestureDetector(
        onTap: () => onChanged(!value),
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: Row(
            children: [
              SizedBox(
                width: 20,
                height: 20,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    border: Border.all(color: tokens.inkBorder),
                    borderRadius: BorderRadius.circular(4),
                    color: value ? tokens.primary : tokens.palette.base100,
                  ),
                  child: value
                      ? const Center(
                          child: WashLucideIcon('check', size: 14),
                        )
                      : null,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  label,
                  style: WashTypography.body(tokens.onSurface)
                      .copyWith(fontSize: 13),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SliderRow extends StatelessWidget {
  const _SliderRow({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
  });

  final String label;
  final double value;
  final double min;
  final double max;
  final ValueChanged<double> onChanged;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final t = ((value - min) / (max - min)).clamp(0.0, 1.0);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 13),
          ),
          const SizedBox(height: 6),
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onHorizontalDragUpdate: (d) {
              final box = context.findRenderObject() as RenderBox?;
              if (box == null) return;
              final local = box.globalToLocal(d.globalPosition);
              final width = box.size.width;
              final next = min + (local.dx / width).clamp(0.0, 1.0) * (max - min);
              onChanged(next);
            },
            onTapDown: (d) {
              final box = context.findRenderObject() as RenderBox?;
              if (box == null) return;
              final next =
                  min + (d.localPosition.dx / box.size.width).clamp(0.0, 1.0) * (max - min);
              onChanged(next);
            },
            child: SizedBox(
              height: 18,
              child: Stack(
                alignment: Alignment.centerLeft,
                children: [
                  Container(
                    height: 6,
                    decoration: BoxDecoration(
                      color: tokens.palette.base300,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                  FractionallySizedBox(
                    widthFactor: t,
                    child: Container(
                      height: 6,
                      decoration: BoxDecoration(
                        color: tokens.primary,
                        borderRadius: BorderRadius.circular(99),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment(-1 + 2 * t, 0),
                    child: Container(
                      width: 16,
                      height: 16,
                      decoration: BoxDecoration(
                        color: tokens.primary,
                        shape: BoxShape.circle,
                        border: Border.all(color: tokens.palette.base100, width: 2),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _UsageCards extends StatelessWidget {
  const _UsageCards();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= 768 ? 3 : 1;
        final gap = 16.0;
        final w = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: w,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: tokens.palette.base100,
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                  border: Border.all(color: tokens.inkBorder),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      right: -24,
                      top: -32,
                      child: WashWatercolorSplash(
                        variant: 'wash',
                        seed: 902,
                        size: 180,
                        opacity: 0.9,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const WashLucideIcon('droplets', size: 32),
                          const SizedBox(height: 12),
                          Text(
                            'Card accent',
                            style: WashTypography.title(tokens.primary)
                                .copyWith(fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Position splashes behind content with absolute layout.',
                            style: WashTypography.body(tokens.inkMuted)
                                .copyWith(fontSize: 14),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(
              width: w,
              height: 160,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: tokens.palette.base100,
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                  border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
                ),
                child: const Center(
                  child: WashWatercolorSplash(
                    variant: 'ring',
                    seed: 441,
                    size: 160,
                    spread: 1.2,
                  ),
                ),
              ),
            ),
            SizedBox(
              width: w,
              height: 160,
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: tokens.palette.base100,
                  borderRadius: BorderRadius.circular(tokens.radiusBox),
                  border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    WashWatercolorSplash(
                      variant: 'splash',
                      seed: 77,
                      size: 100,
                      rotation: -18,
                    ),
                    WashWatercolorSplash(
                      variant: 'blob',
                      seed: 188,
                      size: 130,
                      rotation: 24,
                      opacity: 0.62,
                    ),
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
