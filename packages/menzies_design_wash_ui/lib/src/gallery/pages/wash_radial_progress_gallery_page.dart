import 'dart:ui' show FontFeature;

import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/progress/wash_progress.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_components_extended.dart' show WashRange;
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashRadialProgressGalleryPage extends StatelessWidget {
  const WashRadialProgressGalleryPage({super.key});

  static const _basicValues = <double>[0, 20, 60, 70, 80, 100];

  static const _sizes = <(String, double, double)>[
    ('3rem', 48, 12),
    ('4rem', 64, 14),
    ('5rem', 80, 16),
    ('7rem', 112, 20),
    ('9rem', 144, 24),
  ];

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

  static const _thicknesses = <(String, double, double)>[
    ('2px', 2, 96),
    ('4px', 4, 96),
    ('8px', 8, 96),
    ('1rem', 16, 96),
    ('2rem', 32, 128),
  ];

  static const _basicDart = '''
WashRadialProgress(value: 70, tone: WashProgressTone.primary)
''';

  static const _sizesDart = '''
WashRadialProgress(value: 70, size: 48, tone: WashProgressTone.secondary)
WashRadialProgress(value: 70, size: 80, tone: WashProgressTone.secondary)
WashRadialProgress(value: 70, size: 144, tone: WashProgressTone.secondary)
''';

  static const _colorsDart = '''
WashRadialProgress(value: 72, tone: WashProgressTone.info)
WashRadialProgress(value: 70, filled: true, tone: WashProgressTone.primary)
''';

  static const _thicknessDart = '''
WashRadialProgress(value: 70, size: 96, thickness: 2)
WashRadialProgress(value: 70, size: 96, thickness: 8)
WashRadialProgress(value: 70, size: 128, thickness: 32)
''';

  static const _interactiveDart = '''
WashRadialProgress(
  value: v,
  size: 128,
  thickness: 10,
  child: Text('\$v%', style: display),
)
WashRange(value: v, onChanged: setV)
''';

  static const _studioDart = '''
WashRadialProgress(value: pigment, size: 88, thickness: 6)
// load = pigment*0.45 + water*0.3 + flow*0.25
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Radial progress',
      description:
          'daisyUI radial-progress rings for circular task and wash meters.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Values and a11y',
          description:
              'Set value and expose semantics for screen readers',
          child: WashShowcaseTabs(
            preview: LayoutBuilder(
              builder: (context, c) {
                final cols = c.maxWidth >= 1024
                    ? 6
                    : c.maxWidth >= 640
                        ? 3
                        : 2;
                final gap = 24.0;
                final w = (c.maxWidth - gap * (cols - 1)) / cols;
                return Wrap(
                  spacing: gap,
                  runSpacing: gap,
                  children: [
                    for (final v in _basicValues)
                      SizedBox(
                        width: w,
                        child: _Sample(
                          label: '--value:${v.round()}',
                          child: WashRadialProgress(
                            value: v,
                            tone: WashProgressTone.primary,
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Sizes',
          title: 'Width and type',
          description: '--size defaults to 5rem',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: Wrap(
              spacing: 24,
              runSpacing: 24,
              crossAxisAlignment: WrapCrossAlignment.end,
              children: [
                for (final s in _sizes)
                  _Sample(
                    label: '--size:${s.$1}',
                    child: WashRadialProgress(
                      value: 70,
                      size: s.$2,
                      labelFontSize: s.$3,
                      tone: WashProgressTone.secondary,
                    ),
                  ),
              ],
            ),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Colors',
          title: 'Semantic and filled',
          description: 'Color via tone; filled adds bg and border chrome',
          child: WashShowcaseTabs(
            preview: Column(
              children: [
                LayoutBuilder(
                  builder: (context, c) {
                    final cols = c.maxWidth >= 640 ? 4 : 2;
                    final gap = 24.0;
                    final w = (c.maxWidth - gap * (cols - 1)) / cols;
                    return Wrap(
                      spacing: gap,
                      runSpacing: gap,
                      children: [
                        for (final e in _colors)
                          SizedBox(
                            width: w,
                            child: _Sample(
                              label: 'radial-progress text-${e.$1.toLowerCase()}',
                              child: WashRadialProgress(
                                value: 72,
                                tone: e.$2,
                              ),
                            ),
                          ),
                      ],
                    );
                  },
                ),
                const SizedBox(height: 32),
                LayoutBuilder(
                  builder: (context, c) {
                    final cols = c.maxWidth >= 640 ? 3 : 1;
                    final gap = 24.0;
                    final w = (c.maxWidth - gap * (cols - 1)) / cols;
                    return Wrap(
                      spacing: gap,
                      runSpacing: gap,
                      children: [
                        SizedBox(
                          width: w,
                          child: const _Sample(
                            label: 'bg-primary text-primary-content border-4',
                            child: WashRadialProgress(
                              value: 70,
                              filled: true,
                              tone: WashProgressTone.primary,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: w,
                          child: const _Sample(
                            label: 'bg-secondary text-secondary-content border-4',
                            child: WashRadialProgress(
                              value: 55,
                              filled: true,
                              tone: WashProgressTone.secondary,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: w,
                          child: const _Sample(
                            label: 'bg-accent text-accent-content border-4',
                            child: WashRadialProgress(
                              value: 88,
                              filled: true,
                              tone: WashProgressTone.accent,
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ],
            ),
            dartSource: _colorsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Thickness',
          title: 'Ring weight',
          description: '--thickness defaults to 10% of size',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: Wrap(
              spacing: 24,
              runSpacing: 24,
              crossAxisAlignment: WrapCrossAlignment.end,
              children: [
                for (final t in _thicknesses)
                  _Sample(
                    label: '--thickness:${t.$1} --size:${t.$3 == 96 ? '6rem' : '8rem'}',
                    child: WashRadialProgress(
                      value: 70,
                      size: t.$3,
                      thickness: t.$2,
                      tone: WashProgressTone.primary,
                    ),
                  ),
              ],
            ),
            dartSource: _thicknessDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Interactive',
          title: 'Live value',
          description:
              'A range input drives value so the ring and label stay in sync',
          child: WashShowcaseTabs(
            preview: const _InteractiveDemo(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Pigment meters',
          description:
              'Wash desk readouts for pigment, water, flow, and combined load',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _StudioMeters(),
            dartSource: _studioDart,
          ),
        ),
      ],
    );
  }
}

class _Sample extends StatelessWidget {
  const _Sample({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          label,
          textAlign: TextAlign.center,
          style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
            fontSize: 10.4,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
      ],
    );
  }
}

class _InteractiveDemo extends StatefulWidget {
  const _InteractiveDemo();

  @override
  State<_InteractiveDemo> createState() => _InteractiveDemoState();
}

class _InteractiveDemoState extends State<_InteractiveDemo> {
  double _value = 62;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final pct = _value.round();
    return LayoutBuilder(
      builder: (context, c) {
        final row = c.maxWidth >= 640;
        final meter = Column(
          children: [
            WashRadialProgress(
              value: _value,
              size: 128,
              thickness: 10,
              tone: WashProgressTone.primary,
              child: Text(
                '$pct%',
                style: WashTypography.title(tokens.primary).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '--value (live)',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 10.4,
              ),
            ),
          ],
        );
        final slider = ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 384),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      'Wash progress',
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Text(
                    '$pct%',
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
              ),
              const SizedBox(height: 4),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  for (final n in const ['0', '50', '100'])
                    Text(
                      n,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 10.4,
                      ),
                    ),
                ],
              ),
            ],
          ),
        );
        if (!row) {
          return Column(
            children: [
              meter,
              const SizedBox(height: 24),
              slider,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            meter,
            const SizedBox(width: 24),
            Expanded(child: slider),
          ],
        );
      },
    );
  }
}

class _StudioMeters extends StatefulWidget {
  const _StudioMeters();

  @override
  State<_StudioMeters> createState() => _StudioMetersState();
}

class _StudioMetersState extends State<_StudioMeters> {
  double _pigment = 78;
  double _water = 42;
  double _flow = 65;

  double get _load =>
      (_pigment * 0.45 + _water * 0.3 + _flow * 0.25).roundToDouble();

  void _reset() {
    setState(() {
      _pigment = 78;
      _water = 42;
      _flow = 65;
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final meters = <(String, double, WashProgressTone, String)>[
      ('Pigment', _pigment, WashProgressTone.primary, 'text-primary · pigment'),
      ('Water', _water, WashProgressTone.secondary, 'text-secondary · water'),
      ('Flow', _flow, WashProgressTone.info, 'text-info · flow'),
      ('Load', _load, WashProgressTone.accent, 'text-accent · load'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, c) {
            final cols = c.maxWidth >= 640 ? 4 : 2;
            final gap = 24.0;
            final w = (c.maxWidth - gap * (cols - 1)) / cols;
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (final m in meters)
                  SizedBox(
                    width: w,
                    child: Column(
                      children: [
                        WashRadialProgress(
                          value: m.$2,
                          size: 88,
                          thickness: 6,
                          tone: m.$3,
                        ),
                        const SizedBox(height: 8),
                        WashGalleryLabelInk(m.$1),
                        const SizedBox(height: 4),
                        Text(
                          m.$4,
                          textAlign: TextAlign.center,
                          style: WashTypography.body(tokens.inkMuted).copyWith(
                            fontSize: 10.4,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 24),
        LayoutBuilder(
          builder: (context, c) {
            final cols = c.maxWidth >= 768 ? 3 : 1;
            final gap = 16.0;
            final w = (c.maxWidth - gap * (cols - 1)) / cols;
            final sliders = <(String, double, ValueChanged<double>)>[
              ('Pigment', _pigment, (v) => setState(() => _pigment = v)),
              ('Water', _water, (v) => setState(() => _water = v)),
              ('Flow', _flow, (v) => setState(() => _flow = v)),
            ];
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (final s in sliders)
                  SizedBox(
                    width: w,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                s.$1,
                                style: WashTypography.body(tokens.onSurface)
                                    .copyWith(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            Text(
                              '${s.$2.round()}%',
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(
                                fontSize: 12,
                                fontFeatures: const [
                                  FontFeature.tabularFigures(),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        WashRange(value: s.$2, onChanged: s.$3),
                      ],
                    ),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: tokens.palette.base100.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
          ),
          child: Wrap(
            spacing: 12,
            runSpacing: 12,
            crossAxisAlignment: WrapCrossAlignment.center,
            alignment: WrapAlignment.spaceBetween,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: WashLucideIcon(
                      'droplets',
                      size: 16,
                      color: tokens.palette.info,
                    ),
                  ),
                  const SizedBox(width: 8),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 420),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Desk read',
                          style: WashTypography.body(tokens.onSurface).copyWith(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Combined load is a weighted mix of pigment, water, and flow. '
                          'Keep water below pigment for sharper edges.',
                          style: WashTypography.body(tokens.inkMuted).copyWith(
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              WashButton(
                size: WashButtonSize.sm,
                variant: WashButtonVariant.ghost,
                onPressed: _reset,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const WashLucideIcon('rotate-ccw', size: 16),
                    const SizedBox(width: 8),
                    Text(
                      'Reset meters',
                      style: WashTypography.label(tokens.onSurface).copyWith(
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
