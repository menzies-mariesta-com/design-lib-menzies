import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/steps/wash_steps.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashStepsGalleryPage extends StatelessWidget {
  const WashStepsGalleryPage({super.key});

  static const _colors = <(String, WashStepTone)>[
    ('Neutral', WashStepTone.neutral),
    ('Primary', WashStepTone.primary),
    ('Secondary', WashStepTone.secondary),
    ('Accent', WashStepTone.accent),
    ('Info', WashStepTone.info),
    ('Success', WashStepTone.success),
    ('Warning', WashStepTone.warning),
    ('Error', WashStepTone.error),
  ];

  static const _studio = <(String, String, String)>[
    ('Sketch', 'pencil', 'Light graphite underdrawing.'),
    ('Wash', 'waves', 'Lay a soft first wash.'),
    ('Dry', 'sun', 'Wait until the plate is fully dry.'),
    ('Glaze', 'droplets', 'Transparent color over dry wash.'),
    ('Finish', 'sparkles', 'Final accents and signature.'),
  ];

  static const _basicDart = '''
WashSteps(
  steps: [
    WashStepItem(label: 'Register'),
    WashStepItem(label: 'Choose plan'),
    WashStepItem(label: 'Purchase'),
    WashStepItem(label: 'Receive'),
  ],
)
WashSteps(
  steps: [
    WashStepItem(label: 'Register', tone: WashStepTone.primary),
    WashStepItem(label: 'Choose plan', tone: WashStepTone.primary),
    WashStepItem(label: 'Purchase'),
    WashStepItem(label: 'Receive'),
  ],
)
''';

  static const _verticalDart = '''
WashSteps(
  direction: WashStepsDirection.vertical,
  expand: false,
  steps: [
    WashStepItem(label: 'Stretch paper', tone: WashStepTone.primary),
    WashStepItem(label: 'Mix wash', tone: WashStepTone.primary),
    WashStepItem(label: 'Lay glaze'),
    WashStepItem(label: 'Sign plate'),
  ],
)
''';

  static const _colorsDart = '''
WashSteps(
  steps: [
    WashStepItem(label: 'Start', tone: WashStepTone.primary),
    WashStepItem(label: 'Mid', tone: WashStepTone.primary),
    WashStepItem(label: 'End'),
  ],
)
''';

  static const _contentDart = '''
WashSteps(
  steps: [
    WashStepItem(label: 'Checked', tone: WashStepTone.primary, dataContent: '✓'),
    WashStepItem(label: 'Alert', tone: WashStepTone.primary, dataContent: '!'),
    WashStepItem(label: 'Question', dataContent: '?'),
    WashStepItem(label: 'Star', dataContent: '★'),
  ],
)
WashSteps(
  steps: [
    WashStepItem(label: 'Done', tone: WashStepTone.primary, icon: 'check'),
    WashStepItem(label: 'Wash', tone: WashStepTone.secondary, icon: 'droplets'),
    WashStepItem(label: 'Dry', tone: WashStepTone.accent, icon: 'sun'),
    WashStepItem(label: 'Finish', icon: 'sparkles'),
  ],
)
''';

  static const _interactiveDart = '''
WashSteps(
  semanticLabel: 'Interactive studio steps',
  steps: [
    for (var i = 0; i < labels.length; i++)
      WashStepItem(
        label: labels[i],
        tone: i <= current ? WashStepTone.primary : WashStepTone.none,
        current: i == current,
        onTap: () => setCurrent(i),
      ),
  ],
)
''';

  static const _studioDart = '''
WashSteps(
  semanticLabel: 'Studio workflow',
  steps: [
    WashStepItem(label: 'Sketch', tone: WashStepTone.primary, icon: 'pencil'),
    WashStepItem(label: 'Wash', tone: WashStepTone.primary, icon: 'waves'),
    WashStepItem(label: 'Dry', tone: WashStepTone.primary, icon: 'sun'),
    WashStepItem(label: 'Glaze', tone: WashStepTone.secondary, icon: 'droplets'),
    WashStepItem(label: 'Finish', icon: 'sparkles'),
  ],
)
''';

  static const _responsiveDart = '''
WashSteps(
  direction: width < 768
      ? WashStepsDirection.vertical
      : WashStepsDirection.horizontal,
  steps: [
    WashStepItem(label: 'Prep', tone: WashStepTone.primary),
    WashStepItem(label: 'Wash', tone: WashStepTone.primary),
    WashStepItem(label: 'Glaze'),
    WashStepItem(label: 'Finish'),
  ],
)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Steps',
      description:
          'daisyUI steps.: horizontal and vertical layouts, semantic colors.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Horizontal steps',
          description: 'Default direction is horizontal',
          child: WashShowcaseTabs(
            preview: const _BasicSection(),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Vertical',
          title: 'Vertical steps',
          description:
              'Add steps-vertical on the list for a stacked process trail',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _VerticalSection(),
            dartSource: _verticalDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Colors',
          title: 'Semantic step colors',
          description: 'step-primary through step-error',
          child: WashShowcaseTabs(
            preview: const _ColorsSection(),
            dartSource: _colorsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Data content',
          title: 'Custom bubble content',
          description:
              'Use data-content for symbols or letters, or nest Lucide icons in',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _ContentSection(),
            dartSource: _contentDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Interactive',
          title: 'Controlled current step',
          description: 'Drive step-primary from widget state',
          child: WashShowcaseTabs(
            preview: const _InteractiveSection(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Studio workflow',
          description:
              'Sketch, wash, dry, glaze, finish: a watercolor plate pipeline',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _StudioSection(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Responsive',
          title: 'Adaptive direction',
          description: 'Vertical on small screens, horizontal from md up',
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
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      child,
      const SizedBox(height: 8),
      _classLabel(context, label),
    ],
  );
}

class _BasicSection extends StatelessWidget {
  const _BasicSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          context,
          label: 'steps',
          child: const WashSteps(
            steps: [
              WashStepItem(label: 'Register'),
              WashStepItem(label: 'Choose plan'),
              WashStepItem(label: 'Purchase'),
              WashStepItem(label: 'Receive'),
            ],
          ),
        ),
        const SizedBox(height: 24),
        _sample(
          context,
          label: 'steps · step-primary (partial)',
          child: const WashSteps(
            steps: [
              WashStepItem(label: 'Register', tone: WashStepTone.primary),
              WashStepItem(label: 'Choose plan', tone: WashStepTone.primary),
              WashStepItem(label: 'Purchase'),
              WashStepItem(label: 'Receive'),
            ],
          ),
        ),
      ],
    );
  }
}

class _VerticalSection extends StatelessWidget {
  const _VerticalSection();

  @override
  Widget build(BuildContext context) {
    return _sample(
      context,
      label: 'steps steps-vertical',
      child: const WashSteps(
        direction: WashStepsDirection.vertical,
        expand: false,
        steps: [
          WashStepItem(label: 'Stretch paper', tone: WashStepTone.primary),
          WashStepItem(label: 'Mix wash', tone: WashStepTone.primary),
          WashStepItem(label: 'Lay glaze'),
          WashStepItem(label: 'Sign plate'),
        ],
      ),
    );
  }
}

class _ColorsSection extends StatelessWidget {
  const _ColorsSection();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= 640 ? 2 : 1;
        final gap = 24.0;
        final cellW =
            cols == 1 ? constraints.maxWidth : (constraints.maxWidth - gap) / 2;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final c in WashStepsGalleryPage._colors)
              SizedBox(
                width: cellW,
                child: _sample(
                  context,
                  label: washStepClassLabel(c.$2),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        c.$1,
                        style: WashTypography.body(
                          WashTokens.of(context).onSurface,
                        ).copyWith(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 8),
                      WashSteps(
                        steps: [
                          WashStepItem(label: 'Start', tone: c.$2),
                          WashStepItem(label: 'Mid', tone: c.$2),
                          const WashStepItem(label: 'End'),
                        ],
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

class _ContentSection extends StatelessWidget {
  const _ContentSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          context,
          label: 'step data-content="…"',
          child: const WashSteps(
            steps: [
              WashStepItem(
                label: 'Checked',
                tone: WashStepTone.primary,
                dataContent: '✓',
              ),
              WashStepItem(
                label: 'Alert',
                tone: WashStepTone.primary,
                dataContent: '!',
              ),
              WashStepItem(label: 'Question', dataContent: '?'),
              WashStepItem(label: 'Star', dataContent: '★'),
            ],
          ),
        ),
        const SizedBox(height: 32),
        _sample(
          context,
          label: 'step · step-icon',
          child: const WashSteps(
            steps: [
              WashStepItem(
                label: 'Done',
                tone: WashStepTone.primary,
                icon: 'check',
              ),
              WashStepItem(
                label: 'Wash',
                tone: WashStepTone.secondary,
                icon: 'droplets',
              ),
              WashStepItem(
                label: 'Dry',
                tone: WashStepTone.accent,
                icon: 'sun',
              ),
              WashStepItem(label: 'Finish', icon: 'sparkles'),
            ],
          ),
        ),
      ],
    );
  }
}

class _InteractiveSection extends StatefulWidget {
  const _InteractiveSection();

  @override
  State<_InteractiveSection> createState() => _InteractiveSectionState();
}

class _InteractiveSectionState extends State<_InteractiveSection> {
  static const _labels = [
    'Prep paper',
    'Mix pigment',
    'First wash',
    'Details',
  ];
  int _current = 1;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final last = _labels.length - 1;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashSteps(
          semanticLabel: 'Interactive studio steps',
          steps: [
            for (var i = 0; i < _labels.length; i++)
              WashStepItem(
                label: _labels[i],
                tone: i <= _current ? WashStepTone.primary : WashStepTone.none,
                current: i == _current,
                onTap: () => setState(() => _current = i),
              ),
          ],
        ),
        const SizedBox(height: 20),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            WashButton(
              size: WashButtonSize.sm,
              variant: WashButtonVariant.ghost,
              enabled: _current > 0,
              onPressed: _current > 0
                  ? () => setState(() => _current = (_current - 1).clamp(0, last))
                  : null,
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon('chevron-left', size: 16, strokeWidth: 2),
                  SizedBox(width: 4),
                  Text('Previous'),
                ],
              ),
            ),
            WashButton(
              size: WashButtonSize.sm,
              variant: WashButtonVariant.primary,
              enabled: _current < last,
              onPressed: _current < last
                  ? () => setState(() => _current = (_current + 1).clamp(0, last))
                  : null,
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Next'),
                  SizedBox(width: 4),
                  WashLucideIcon('chevron-right', size: 16, strokeWidth: 2),
                ],
              ),
            ),
            Text(
              'Step ${_current + 1} of ${_labels.length}',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _classLabel(context, 'steps + step-primary (controlled)'),
      ],
    );
  }
}

class _StudioSection extends StatelessWidget {
  const _StudioSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashSteps(
          semanticLabel: 'Studio workflow',
          steps: [
            for (var i = 0; i < WashStepsGalleryPage._studio.length; i++)
              WashStepItem(
                label: WashStepsGalleryPage._studio[i].$1,
                icon: WashStepsGalleryPage._studio[i].$2,
                tone: i < 3
                    ? WashStepTone.primary
                    : i == 3
                        ? WashStepTone.secondary
                        : WashStepTone.none,
              ),
          ],
        ),
        const SizedBox(height: 24),
        LayoutBuilder(
          builder: (context, constraints) {
            final w = constraints.maxWidth;
            final cols = w >= 1024
                ? 5
                : w >= 640
                    ? 2
                    : 1;
            final gap = 12.0;
            final cellW = cols == 1 ? w : (w - gap * (cols - 1)) / cols;
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (var i = 0; i < WashStepsGalleryPage._studio.length; i++)
                  SizedBox(
                    width: cellW,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: tokens.palette.base100.withValues(alpha: 0.7),
                        borderRadius: BorderRadius.circular(tokens.radiusBox),
                        border: Border.all(
                          color: tokens.inkBorder.withValues(alpha: 0.6),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${i + 1}. ${WashStepsGalleryPage._studio[i].$1}',
                            style: WashTypography.body(tokens.onSurface)
                                .copyWith(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            WashStepsGalleryPage._studio[i].$3,
                            style: WashTypography.body(tokens.inkMuted)
                                .copyWith(fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 8),
        _classLabel(context, 'steps · step-icon · studio stages'),
      ],
    );
  }
}

class _ResponsiveSection extends StatelessWidget {
  const _ResponsiveSection();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final vertical = constraints.maxWidth < 768;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _sample(
              context,
              label: 'steps steps-vertical md:steps-horizontal',
              child: WashSteps(
                direction: vertical
                    ? WashStepsDirection.vertical
                    : WashStepsDirection.horizontal,
                steps: const [
                  WashStepItem(label: 'Prep', tone: WashStepTone.primary),
                  WashStepItem(label: 'Wash', tone: WashStepTone.primary),
                  WashStepItem(label: 'Glaze'),
                  WashStepItem(label: 'Finish'),
                ],
              ),
            ),
            const SizedBox(height: 32),
            _sample(
              context,
              label: 'steps · overflow-x-auto (scroll)',
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: SizedBox(
                  width: constraints.maxWidth < 576 ? 576 : constraints.maxWidth,
                  child: const WashSteps(
                    steps: [
                      WashStepItem(label: 'Stretch', tone: WashStepTone.info),
                      WashStepItem(label: 'Mask', tone: WashStepTone.info),
                      WashStepItem(label: 'Wash A', tone: WashStepTone.info),
                      WashStepItem(label: 'Wash B', tone: WashStepTone.info),
                      WashStepItem(label: 'Dry'),
                      WashStepItem(label: 'Detail'),
                      WashStepItem(label: 'Varnish'),
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
