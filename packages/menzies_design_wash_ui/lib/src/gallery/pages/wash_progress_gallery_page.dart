import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/progress/wash_progress.dart';
import '../../foundation/reduced_motion.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_components_extended.dart' show WashRange;
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashProgressGalleryPage extends StatelessWidget {
  const WashProgressGalleryPage({super.key});

  static const _basicValues = <double>[0, 10, 40, 70, 100];

  static const _colors = <(String, WashProgressTone)>[
    ('Primary', WashProgressTone.primary),
    ('Secondary', WashProgressTone.secondary),
    ('Accent', WashProgressTone.accent),
    ('Neutral', WashProgressTone.neutral),
    ('Info', WashProgressTone.info),
    ('Success', WashProgressTone.success),
    ('Warning', WashProgressTone.warning),
    ('Error', WashProgressTone.error),
  ];

  static const _widths = <(String, double?)>[
    ('Narrow', 128),
    ('Medium', 224),
    ('Wide', 288),
    ('Full', null),
  ];

  static const _basicDart = '''
WashProgress(value: 40)
WashProgress() // indeterminate
''';

  static const _colorsDart = '''
WashProgress(value: 70, tone: WashProgressTone.primary)
WashProgress(value: 70, tone: WashProgressTone.error)
''';

  static const _widthsDart = '''
WashProgress(value: 55, width: 128)
WashProgress(value: 55, width: 224)
WashProgress(value: 55) // full width
''';

  static const _interactiveDart = '''
WashProgress(value: load, tone: WashProgressTone.primary)
WashRange(value: load, onChanged: setLoad)
''';

  static const _radialDart = '''
WashRadialProgress(value: 70)
WashRadialProgress(value: 70, filled: true)
WashRadialProgress(value: 70, size: 64, thickness: 4, tone: WashProgressTone.secondary)
WashRadialProgress(value: 70, size: 96, thickness: 8, tone: WashProgressTone.accent)
''';

  static const _studioDart = '''
WashProgress(value: drying, tone: WashProgressTone.primary)
WashProgress(value: 88, tone: WashProgressTone.info)
WashRadialProgress(value: 62, tone: WashProgressTone.accent, size: 88)
''';

  static const _responsiveDart = '''
WashProgress(value: 45, tone: WashProgressTone.warning)
WashProgress(value: 92, tone: WashProgressTone.success)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Progress',
      description: 'daisyUI progress bars for wash drying and pigment load.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Value and indeterminate',
          description: 'Set value and max for determinate bars',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk('Determinate'),
                const SizedBox(height: 12),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 448),
                  child: Column(
                    children: [
                      for (final v in _basicValues) ...[
                        WashProgress(value: v),
                        const SizedBox(height: 12),
                      ],
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                WashGalleryLabelInk('Indeterminate'),
                const SizedBox(height: 12),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 448),
                  child: const WashProgress(),
                ),
                const SizedBox(height: 8),
                _muted(
                  context,
                  'Indeterminate bars animate when motion is allowed. '
                  'Respect system reduced-motion settings when shipping live studio flows.',
                ),
              ],
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Colors',
          title: 'Semantic colors',
          description: 'progress-primary through progress-error',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, c) {
                final cols = c.maxWidth >= 640 ? 2 : 1;
                final gap = 20.0;
                final w = (c.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    for (final e in _colors)
                      SizedBox(
                        width: w,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              e.$1,
                              style: WashTypography.body(
                                WashTokens.of(context).onSurface,
                              ).copyWith(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 6),
                            WashProgress(value: 70, tone: e.$2),
                          ],
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
          eyebrow: '03 · Widths',
          title: 'Width scale',
          description: 'daisyUI progress has no size modifiers',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (final w in _widths) ...[
                  Text(
                    w.$1,
                    style: WashTypography.body(
                      WashTokens.of(context).onSurface,
                    ).copyWith(fontSize: 14, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 6),
                  if (w.$2 == null)
                    ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 448),
                      child: const WashProgress(value: 55),
                    )
                  else
                    WashProgress(value: 55, width: w.$2),
                  const SizedBox(height: 20),
                ],
              ],
            ),
            dartSource: _widthsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Interactive',
          title: 'Controlled value',
          description: 'Drive the bar with a range slider and quick presets',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _InteractiveProgress(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Radial',
          title: 'Related radial progress',
          description:
              'Circular companion using value, optional size and thickness',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk('Values'),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 24,
                  runSpacing: 24,
                  children: [
                    for (final v in const [0.0, 20.0, 60.0, 80.0, 100.0])
                      WashRadialProgress(value: v),
                  ],
                ),
                const SizedBox(height: 32),
                WashGalleryLabelInk('Colors and chrome'),
                const SizedBox(height: 16),
                const Wrap(
                  spacing: 24,
                  runSpacing: 24,
                  children: [
                    WashRadialProgress(value: 70),
                    WashRadialProgress(value: 70, filled: true),
                    WashRadialProgress(
                      value: 70,
                      tone: WashProgressTone.secondary,
                      size: 64,
                      thickness: 4,
                    ),
                    WashRadialProgress(
                      value: 70,
                      tone: WashProgressTone.accent,
                      size: 96,
                      thickness: 8,
                    ),
                  ],
                ),
              ],
            ),
            dartSource: _radialDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Wash drying panels',
          description:
              'Pigment load and wash settle meters for studio busy states',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _StudioPanels(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Responsive',
          title: 'Adaptive progress rows',
          description: 'Stacked on mobile, side by side from md up',
          child: WashShowcaseTabs(
            preview: const _ResponsiveRows(),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }
}

Widget _muted(BuildContext context, String text) {
  return Text(
    text,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 14,
    ),
  );
}

Widget _classLabel(BuildContext context, String value) {
  return Text(
    value,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 10.4,
      fontFeatures: const [FontFeature.tabularFigures()],
    ),
  );
}

class _InteractiveProgress extends StatefulWidget {
  const _InteractiveProgress();

  @override
  State<_InteractiveProgress> createState() => _InteractiveProgressState();
}

class _InteractiveProgressState extends State<_InteractiveProgress> {
  double _value = 42;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Text(
                  'Pigment load',
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Text(
                '${_value.round()}%',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 14,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          WashProgress(value: _value),
          const SizedBox(height: 16),
          WashGalleryLabelInk('Range control'),
          const SizedBox(height: 8),
          WashRange(
            value: _value,
            onChanged: (v) => setState(() => _value = v),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final n in const [0.0, 25.0, 50.0, 75.0, 100.0])
                WashButton(
                  size: WashButtonSize.sm,
                  variant: WashButtonVariant.ghost,
                  label: '${n.round()}%',
                  onPressed: () => setState(() => _value = n),
                ),
            ],
          ),
          const SizedBox(height: 12),
          _classLabel(context, 'progress progress-primary + range'),
        ],
      ),
    );
  }
}

class _StudioPanels extends StatelessWidget {
  const _StudioPanels();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final twoCol = c.maxWidth >= 768;
        final gap = 16.0;
        final half = twoCol ? (c.maxWidth - gap) / 2 : c.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: half,
              child: const _StudioDryingPanel(
                title: 'Wash drying',
                description: 'Soft edges are settling',
                tone: WashProgressTone.primary,
                start: 18,
                step: 7,
                label: 'progress progress-primary',
              ),
            ),
            SizedBox(
              width: half,
              child: const _StudioDryingPanel(
                title: 'Pigment load',
                description:
                    'Blending ultramarine and ochre for the next glaze',
                tone: WashProgressTone.secondary,
                start: 34,
                step: 5,
                label: 'progress progress-secondary',
              ),
            ),
            SizedBox(width: half, child: const _SeriesSyncCard()),
            SizedBox(width: half, child: const _GlazeRoundCard()),
          ],
        );
      },
    );
  }
}

class _StudioDryingPanel extends StatefulWidget {
  const _StudioDryingPanel({
    required this.title,
    required this.description,
    required this.tone,
    required this.start,
    required this.step,
    required this.label,
  });

  final String title;
  final String description;
  final WashProgressTone tone;
  final double start;
  final double step;
  final String label;

  @override
  State<_StudioDryingPanel> createState() => _StudioDryingPanelState();
}

class _StudioDryingPanelState extends State<_StudioDryingPanel> {
  late double _value;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _value = widget.start;
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _timer?.cancel();
    if (WashReducedMotion.of(context)) return;
    _timer = Timer.periodic(const Duration(milliseconds: 800), (_) {
      if (!mounted) return;
      setState(() {
        final next = _value + widget.step;
        _value = next > 100 ? 0 : next;
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.progress,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
        decoration: BoxDecoration(
          color: tokens.palette.base100.withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.title,
                        style: WashTypography.title(tokens.onSurface).copyWith(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.description,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  '${_value.round()}%',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 14,
                    fontFeatures: const [FontFeature.tabularFigures()],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            WashProgress(value: _value, tone: widget.tone),
            const SizedBox(height: 12),
            _classLabel(context, widget.label),
          ],
        ),
      ),
    );
  }
}

class _SeriesSyncCard extends StatelessWidget {
  const _SeriesSyncCard();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      decoration: BoxDecoration(
        color: atmo.washA.withValues(alpha: 0.25),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              WashLucideIcon('droplets', size: 20, color: tokens.palette.info),
              const SizedBox(width: 8),
              Text(
                'Series sync',
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Pulling the latest plates into your studio shelf.',
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          ),
          const SizedBox(height: 12),
          const WashProgress(value: 88, tone: WashProgressTone.info),
          const SizedBox(height: 12),
          _classLabel(context, 'progress progress-info · value=88'),
        ],
      ),
    );
  }
}

class _GlazeRoundCard extends StatelessWidget {
  const _GlazeRoundCard();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      decoration: BoxDecoration(
        color: atmo.washC.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              WashLucideIcon(
                'palette',
                size: 20,
                color: tokens.palette.accent,
              ),
              const SizedBox(width: 8),
              Text(
                'Glaze round',
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const WashRadialProgress(
            value: 62,
            tone: WashProgressTone.accent,
            size: 88,
          ),
          const SizedBox(height: 12),
          Text(
            'Second glaze layer at sixty-two percent opacity.',
            textAlign: TextAlign.center,
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          ),
          const SizedBox(height: 12),
          _classLabel(context, 'radial-progress text-accent'),
        ],
      ),
    );
  }
}

class _ResponsiveRows extends StatelessWidget {
  const _ResponsiveRows();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final row = c.maxWidth >= 768;
        final gap = 16.0;
        final w = row ? (c.maxWidth - gap) / 2 : c.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: w,
              child: const _ResponsiveCard(
                title: 'Thumbnail bake',
                value: 45,
                tone: WashProgressTone.warning,
                blurb: 'Compressing preview for the shelf grid.',
                label: 'progress progress-warning',
              ),
            ),
            SizedBox(
              width: w,
              child: const _ResponsiveCard(
                title: 'Cloud archive',
                value: 92,
                tone: WashProgressTone.success,
                blurb: 'Uploading high-res scan in the background.',
                label: 'progress progress-success',
              ),
            ),
          ],
        );
      },
    );
  }
}

class _ResponsiveCard extends StatelessWidget {
  const _ResponsiveCard({
    required this.title,
    required this.value,
    required this.tone,
    required this.blurb,
    required this.label,
  });

  final String title;
  final double value;
  final WashProgressTone tone;
  final String blurb;
  final String label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.palette.base100.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  title,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Text(
                '${value.round()}%',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 12,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          WashProgress(value: value, tone: tone),
          const SizedBox(height: 8),
          Text(
            blurb,
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          ),
          const SizedBox(height: 8),
          _classLabel(context, label),
        ],
      ),
    );
  }
}
