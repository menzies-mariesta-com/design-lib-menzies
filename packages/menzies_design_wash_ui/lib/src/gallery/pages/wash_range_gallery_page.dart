import 'dart:math' as math;
import 'dart:ui' show FontFeature, ImageFilter;

import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/progress/wash_progress.dart';
import '../../components/range/wash_range.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashRangeGalleryPage extends StatelessWidget {
  const WashRangeGalleryPage({super.key});

  static const _colors = <(String, WashProgressTone?)>[
    ('Default', null),
    ('Neutral', WashProgressTone.neutral),
    ('Primary', WashProgressTone.primary),
    ('Secondary', WashProgressTone.secondary),
    ('Accent', WashProgressTone.accent),
    ('Success', WashProgressTone.success),
    ('Warning', WashProgressTone.warning),
    ('Info', WashProgressTone.info),
    ('Error', WashProgressTone.error),
  ];

  static const _sizes = <(String, WashRangeSize, double)>[
    ('XS', WashRangeSize.xs, 30),
    ('SM', WashRangeSize.sm, 40),
    ('MD', WashRangeSize.md, 50),
    ('LG', WashRangeSize.lg, 60),
    ('XL', WashRangeSize.xl, 70),
  ];

  static const _basicDart = '''
WashRange(value: strength, onChanged: setStrength, semanticLabel: 'Wash strength')
''';

  static const _sizesDart = '''
WashRange(value: 40, size: WashRangeSize.sm, onChanged: (_) {})
WashRange(value: 50, size: WashRangeSize.md, onChanged: (_) {})
''';

  static const _colorsDart = '''
WashRange(value: 40, tone: WashProgressTone.primary, onChanged: (_) {})
WashRange(value: 40, tone: WashProgressTone.error, onChanged: (_) {})
''';

  static const _stepsDart = '''
WashRange(value: step, min: 0, max: 100, step: 25, tone: WashProgressTone.primary, onChanged: setStep)
''';

  static const _interactiveDart = '''
WashRange(value: load, tone: WashProgressTone.secondary, onChanged: setLoad)
WashProgress(value: load, tone: WashProgressTone.secondary)
WashRange(value: load, vertical: true, size: WashRangeSize.sm, tone: WashProgressTone.secondary, onChanged: setLoad)
''';

  static const _studioDart = '''
WashRange(value: brushSize, min: 2, max: 64, size: WashRangeSize.sm, tone: WashProgressTone.primary, onChanged: setBrushSize)
WashRange(value: water, tone: WashProgressTone.accent, size: WashRangeSize.sm, onChanged: setWater)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Range',
      description:
          'daisyUI range sliders for wash strength, brush size, and desk controls.',
      sections: [
        _s(
            '01 · Basic',
            'Default range',
            'Simple slider with a live value readout',
            const _BasicDemo(),
            _basicDart),
        _s(
            '02 · Sizes',
            'Size scale',
            'Extra small through extra large track and thumb',
            _sizesPreview(),
            _sizesDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Colors',
            'Semantic colors',
            'Neutral through error fill accents',
            _colorsPreview(),
            _colorsDart),
        _s(
            '04 · Steps',
            'Steps and measure',
            'Stepped values with tick marks and numbered measure labels',
            const _StepsDemo(),
            _stepsDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Interactive',
            'Controlled value',
            'React state drives the slider and a matching progress bar',
            const _InteractiveDemo(),
            _interactiveDart),
        _s(
            '06 · Studio',
            'Brush desk',
            'Brush size, water, opacity, and hardness in one restrained wash',
            const _StudioDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
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

  static Widget _sizesPreview() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final s in _sizes) ...[
            Row(
              children: [
                Expanded(child: WashGalleryLabelInk(s.$1)),
                WashRangeClassLabel(
                  washRangeClassLabel(size: s.$2),
                ),
              ],
            ),
            const SizedBox(height: 8),
            _SizeRow(size: s.$2, initial: s.$3),
            const SizedBox(height: 20),
          ],
        ],
      ),
    );
  }

  static Widget _colorsPreview() {
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 1024
            ? 3
            : c.maxWidth >= 640
                ? 2
                : 1;
        final gap = 20.0;
        final w =
            cols == 1 ? c.maxWidth : (c.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final c in _colors)
              SizedBox(
                width: w,
                child: _ColorTile(name: c.$1, tone: c.$2),
              ),
          ],
        );
      },
    );
  }
}

class _BasicDemo extends StatefulWidget {
  const _BasicDemo();

  @override
  State<_BasicDemo> createState() => _BasicDemoState();
}

class _BasicDemoState extends State<_BasicDemo> {
  double _value = 40;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 448),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const Expanded(child: WashGalleryLabelInk('Wash strength')),
              Text(
                '${_value.round()}',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 12,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          WashRange(
            value: _value,
            onChanged: (v) => setState(() => _value = v),
            semanticLabel: 'Wash strength',
          ),
          const WashRangeClassLabel('range'),
        ],
      ),
    );
  }
}

class _SizeRow extends StatefulWidget {
  const _SizeRow({required this.size, required this.initial});

  final WashRangeSize size;
  final double initial;

  @override
  State<_SizeRow> createState() => _SizeRowState();
}

class _SizeRowState extends State<_SizeRow> {
  late double _v = widget.initial;

  @override
  Widget build(BuildContext context) {
    return WashRange(
      value: _v,
      size: widget.size,
      onChanged: (v) => setState(() => _v = v),
      semanticLabel: 'Range size ${widget.size.name}',
    );
  }
}

class _ColorTile extends StatefulWidget {
  const _ColorTile({required this.name, required this.tone});

  final String name;
  final WashProgressTone? tone;

  @override
  State<_ColorTile> createState() => _ColorTileState();
}

class _ColorTileState extends State<_ColorTile> {
  double _v = 40;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            Expanded(child: WashGalleryLabelInk(widget.name)),
            WashRangeClassLabel(
              washRangeClassLabel(tone: widget.tone),
            ),
          ],
        ),
        const SizedBox(height: 8),
        WashRange(
          value: _v,
          tone: widget.tone,
          onChanged: (v) => setState(() => _v = v),
          semanticLabel: 'Range color ${widget.name}',
        ),
      ],
    );
  }
}

class _StepsDemo extends StatefulWidget {
  const _StepsDemo();

  @override
  State<_StepsDemo> createState() => _StepsDemoState();
}

class _StepsDemoState extends State<_StepsDemo> {
  double _value = 25;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final muted = WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 320),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const Expanded(child: WashGalleryLabelInk('Dilution steps')),
              Text(
                '${_value.round()}',
                style: muted.copyWith(
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          WashRange(
            value: _value,
            min: 0,
            max: 100,
            step: 25,
            tone: WashProgressTone.primary,
            onChanged: (v) => setState(() => _value = v),
            semanticLabel: 'Dilution steps',
          ),
          const SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(5, (_) => Text('|', style: muted)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                for (final n in const ['1', '2', '3', '4', '5'])
                  Text(n, style: muted),
              ],
            ),
          ),
          const WashRangeClassLabel('range step=25 + measure'),
        ],
      ),
    );
  }
}

class _InteractiveDemo extends StatefulWidget {
  const _InteractiveDemo();

  @override
  State<_InteractiveDemo> createState() => _InteractiveDemoState();
}

class _InteractiveDemoState extends State<_InteractiveDemo> {
  double _value = 55;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, c) {
        final row = c.maxWidth >= 768;
        final horizontal = ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 576),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  const Expanded(child: WashGalleryLabelInk('Pigment load')),
                  WashBadge(
                    '${_value.round()}%',
                    tone: WashBadgeTone.primary,
                    style: WashBadgeStyle.outline,
                  ),
                ],
              ),
              const SizedBox(height: 8),
              WashRange(
                value: _value,
                tone: WashProgressTone.secondary,
                onChanged: (v) => setState(() => _value = v),
                semanticLabel: 'Pigment load',
              ),
              const SizedBox(height: 16),
              WashProgress(
                value: _value,
                tone: WashProgressTone.secondary,
                height: 8,
                semanticLabel: 'Pigment load progress',
              ),
              const WashRangeClassLabel('range range-secondary (controlled)'),
            ],
          ),
        );
        final vertical = Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
          decoration: BoxDecoration(
            color: tokens.surfaceContainer.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashRange(
                value: _value,
                vertical: true,
                size: WashRangeSize.sm,
                tone: WashProgressTone.secondary,
                onChanged: (v) => setState(() => _value = v),
                semanticLabel: 'Vertical pigment load',
              ),
              const SizedBox(height: 8),
              const WashGalleryLabelInk('Load'),
            ],
          ),
        );
        if (!row) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              horizontal,
              const SizedBox(height: 24),
              Center(child: vertical),
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(child: horizontal),
            const SizedBox(width: 24),
            vertical,
          ],
        );
      },
    );
  }
}

class _StudioDemo extends StatefulWidget {
  const _StudioDemo();

  @override
  State<_StudioDemo> createState() => _StudioDemoState();
}

class _StudioDemoState extends State<_StudioDemo> {
  double _brushSize = 18;
  double _water = 45;
  double _opacity = 78;
  double _hardness = 62;

  void _reset() {
    setState(() {
      _brushSize = 18;
      _water = 45;
      _opacity = 78;
      _hardness = 62;
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            WashLucideIcon('paintbrush',
                size: 16, color: tokens.palette.primary),
            const SizedBox(width: 8),
            Text(
              'Active tip',
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
            const Spacer(),
            WashTooltip(
              message: 'Reset desk',
              prefer: WashTooltipSide.left,
              child: WashButton(
                square: true,
                size: WashButtonSize.sm,
                variant: WashButtonVariant.ghost,
                onPressed: _reset,
                child: const WashLucideIcon('rotate-ccw', size: 16),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        LayoutBuilder(
          builder: (context, c) {
            final twoCol = c.maxWidth >= 1024;
            final controls = Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _studioSlider(
                  label: 'Brush size',
                  value: _brushSize,
                  display: '${_brushSize.round()}px',
                  min: 2,
                  max: 64,
                  tone: WashProgressTone.primary,
                  classHint: 'range range-primary range-sm',
                  onChanged: (v) => setState(() => _brushSize = v),
                  aria: 'Brush size',
                ),
                const SizedBox(height: 20),
                _studioSlider(
                  label: 'Water',
                  value: _water,
                  display: '${_water.round()}%',
                  tone: WashProgressTone.accent,
                  classHint: 'range range-accent range-sm',
                  onChanged: (v) => setState(() => _water = v),
                  aria: 'Water load',
                ),
                const SizedBox(height: 20),
                _studioSlider(
                  label: 'Opacity',
                  value: _opacity,
                  display: '${_opacity.round()}%',
                  min: 5,
                  tone: WashProgressTone.info,
                  classHint: 'range range-info range-sm',
                  onChanged: (v) => setState(() => _opacity = v),
                  aria: 'Brush opacity',
                ),
                const SizedBox(height: 20),
                _studioSlider(
                  label: 'Hardness',
                  value: _hardness,
                  display: '${_hardness.round()}%',
                  tone: WashProgressTone.neutral,
                  classHint: 'range range-neutral range-sm',
                  onChanged: (v) => setState(() => _hardness = v),
                  aria: 'Brush hardness',
                ),
              ],
            );
            final preview = _strokePreview(context);
            if (!twoCol) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  controls,
                  const SizedBox(height: 24),
                  preview,
                ],
              );
            }
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(flex: 12, child: controls),
                const SizedBox(width: 24),
                Expanded(flex: 8, child: preview),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _studioSlider({
    required String label,
    required double value,
    required String display,
    required WashProgressTone tone,
    required String classHint,
    required ValueChanged<double> onChanged,
    required String aria,
    double min = 0,
    double max = 100,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            Expanded(child: WashGalleryLabelInk(label)),
            Text(
              display,
              style:
                  WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
                fontSize: 12,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        WashRange(
          value: value,
          min: min,
          max: max,
          size: WashRangeSize.sm,
          tone: tone,
          onChanged: onChanged,
          semanticLabel: aria,
        ),
        WashRangeClassLabel(classHint),
      ],
    );
  }

  Widget _strokePreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    final blur = math.max(0.0, (100 - _hardness) / 28);
    final w = math.max(8.0, _brushSize * 1.4);
    final h = math.max(4.0, (_brushSize * 0.35).roundToDouble());
    final glow = (_water / 8).roundToDouble();
    final mix = math.max(20, _water.round());

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              WashLucideIcon('droplets', size: 16, color: tokens.palette.info),
              const SizedBox(width: 8),
              Text(
                'Stroke preview',
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            height: 96,
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(12),
              border:
                  Border.all(color: tokens.inkBorder.withValues(alpha: 0.5)),
            ),
            child: ImageFiltered(
              imageFilter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
              child: Container(
                width: w,
                height: h,
                decoration: BoxDecoration(
                  color:
                      tokens.palette.primary.withValues(alpha: _opacity / 100),
                  borderRadius: BorderRadius.circular(999),
                  boxShadow: [
                    BoxShadow(
                      color: tokens.palette.primary
                          .withValues(alpha: mix / 100 * 0.45),
                      blurRadius: glow,
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          _studioStat('Size', '${_brushSize.round()}px'),
          _studioStat('Water', '${_water.round()}%'),
          _studioStat('Opacity', '${_opacity.round()}%'),
          _studioStat('Hardness', '${_hardness.round()}%'),
        ],
      ),
    );
  }

  Widget _studioStat(String label, String value) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text.rich(
        TextSpan(
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          children: [
            TextSpan(text: '$label: '),
            TextSpan(
              text: value,
              style: TextStyle(color: tokens.onSurface),
            ),
          ],
        ),
      ),
    );
  }
}
