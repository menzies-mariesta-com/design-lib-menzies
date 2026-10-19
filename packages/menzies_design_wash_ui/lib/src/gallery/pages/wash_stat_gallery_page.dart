import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/stat/wash_stat.dart';
import '../../icons/wash_lucide_icon.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashStatGalleryPage extends StatelessWidget {
  const WashStatGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Stat',
      description:
          'daisyUI stats blocks.: title, value, description, figures, colors, and.',
      sections: [
        _s(
          '01 · Basic',
          'Single stat',
          'One stat with title, value, and description inside a stats',
          _basic(),
          _basicDart,
        ),
        _s(
          '02 · Direction',
          'Horizontal and vertical',
          'stats is horizontal by default',
          const _DirectionDemo(),
          _directionDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Figure',
          'Icons in the figure',
          'Place Lucide icons in stat-figure',
          _figure(),
          _figureDart,
        ),
        _s(
          '04 · Colors',
          'Value accents',
          'Accent titles, values',
          const _ColorsDemo(),
          _colorsDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '05 · Multiple',
          'Studio metrics row',
          'Several stats in one horizontal group',
          _multiple(),
          _multipleDart,
        ),
        _s(
          '06 · Studio',
          'Menzies Design dashboard',
          'Washes completed, pigments, critiques, and dry time',
          _studio(),
          _studioDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '07 · Responsive',
          'Stack on mobile',
          'stats-vertical on small screens, stats-horizontal from lg up',
          const _ResponsiveDemo(),
          _responsiveDart,
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        WashStatClassLabel(label),
      ],
    );
  }

  static Widget _basic() {
    return _sample(
      'stats · stat · stat-title · stat-value · stat-desc',
      const WashStats(
        children: [
          WashStat(
            title: 'Washes this week',
            value: '48',
            desc: '12 more than last week',
          ),
        ],
      ),
    );
  }

  static Widget _figure() {
    return _sample(
      'stat-figure + Lucide',
      WashStats(
        expand: true,
        children: [
          WashStat(
            title: 'Washes completed',
            value: '312',
            desc: '18% more than last month',
            valueTone: WashStatTone.primary,
            figureTone: WashStatTone.primary,
            figure: const WashLucideIcon('droplets', size: 32, strokeWidth: 2),
          ),
          WashStat(
            title: 'Pigments mixed',
            value: '86',
            desc: 'Ultramarine leading',
            valueTone: WashStatTone.secondary,
            figureTone: WashStatTone.secondary,
            figure: const WashLucideIcon('palette', size: 32, strokeWidth: 2),
          ),
          WashStat(
            title: 'Critiques',
            value: '24',
            desc: '3 pending review',
            valueTone: WashStatTone.accent,
            figureTone: WashStatTone.accent,
            figure: const WashLucideIcon(
              'message-square-text',
              size: 32,
              strokeWidth: 2,
            ),
          ),
        ],
      ),
    );
  }

  static Widget _multiple() {
    return _sample(
      'stats · multiple stat',
      WashStats(
        expand: true,
        children: [
          const WashStat(
            title: 'Downloads',
            value: '31K',
            desc: 'Jan 1 to Feb 1',
          ),
          WashStat(
            title: 'New followers',
            value: '4,200',
            desc: 'Up 400 (22%)',
            descTone: WashStatTone.success,
            figureTone: WashStatTone.success,
            figure: const WashLucideIcon('trending-up', size: 32, strokeWidth: 2),
          ),
          WashStat(
            title: 'Abandoned drafts',
            value: '90',
            desc: 'Down 14%',
            descTone: WashStatTone.error,
            figureTone: WashStatTone.error,
            figure: const WashLucideIcon(
              'trending-down',
              size: 32,
              strokeWidth: 2,
            ),
          ),
        ],
      ),
    );
  }

  static Widget _studio() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          'stats · studio dashboard',
          WashStats(
            expand: true,
            surface: WashStatsSurface.inkBorderSoft,
            children: [
              WashStat(
                title: 'Washes completed',
                value: '156',
                desc: 'This season',
                figureTone: WashStatTone.primary,
                figure: const WashLucideIcon('droplets', size: 32, strokeWidth: 2),
              ),
              WashStat(
                title: 'Pigments',
                value: '64',
                desc: 'On the palette',
                figureTone: WashStatTone.secondary,
                figure: const WashLucideIcon('palette', size: 32, strokeWidth: 2),
              ),
              WashStat(
                title: 'Critiques',
                value: '19',
                desc: 'Open threads',
                figureTone: WashStatTone.accent,
                figure: const WashLucideIcon(
                  'message-square-text',
                  size: 32,
                  strokeWidth: 2,
                ),
              ),
              WashStat(
                title: 'Dry time',
                value: '2.4h',
                desc: 'Avg last glaze',
                figureTone: WashStatTone.info,
                figure: const WashLucideIcon('clock', size: 32, strokeWidth: 2),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        _sample(
          'stat-actions',
          WashStats(
            surface: WashStatsSurface.border,
            children: [
              WashStat(
                title: 'Studio balance',
                value: '\$420',
                actions: [
                  WashButton(
                    label: 'Add funds',
                    size: WashButtonSize.xs,
                    variant: WashButtonVariant.success,
                    onPressed: () {},
                  ),
                ],
              ),
              WashStat(
                title: 'Print credit',
                value: '\$89',
                actions: [
                  WashButton(
                    label: 'Withdraw',
                    size: WashButtonSize.xs,
                    variant: WashButtonVariant.defaultVariant,
                    onPressed: () {},
                  ),
                  WashButton(
                    label: 'Deposit',
                    size: WashButtonSize.xs,
                    variant: WashButtonVariant.defaultVariant,
                    onPressed: () {},
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  static const _basicDart = '''
WashStats(
  children: [
    WashStat(
      title: 'Washes this week',
      value: '48',
      desc: '12 more than last week',
    ),
  ],
)
''';

  static const _directionDart = '''
WashStats(children: [WashStat(title: 'Plates', value: '128', desc: 'On the shelf'), ...])
WashStats(
  direction: WashStatsDirection.vertical,
  expand: true,
  children: [...],
)
''';

  static const _figureDart = '''
WashStat(
  title: 'Washes completed',
  value: '312',
  valueTone: WashStatTone.primary,
  figureTone: WashStatTone.primary,
  figure: WashLucideIcon('droplets', size: 32),
)
''';

  static const _colorsDart = '''
WashStats(
  direction: WashStatsDirection.responsive,
  expand: true,
  children: [
    WashStat(title: 'Primary', value: '89%', desc: 'Glaze opacity', valueTone: WashStatTone.primary, descTone: WashStatTone.primary),
  ],
)
''';

  static const _multipleDart = '''
WashStats(
  expand: true,
  children: [
    WashStat(title: 'Downloads', value: '31K', desc: 'Jan 1 to Feb 1'),
    WashStat(title: 'New followers', value: '4,200', descTone: WashStatTone.success, figure: WashLucideIcon('trending-up')),
  ],
)
''';

  static const _studioDart = '''
WashStats(surface: WashStatsSurface.inkBorderSoft, expand: true, children: [...])
WashStats(
  surface: WashStatsSurface.border,
  children: [
    WashStat(title: 'Studio balance', value: '\$420', actions: [WashButton(label: 'Add funds', size: WashButtonSize.xs, variant: WashButtonVariant.success)]),
  ],
)
''';

  static const _responsiveDart = '''
WashStats(
  direction: WashStatsDirection.responsive,
  expand: true,
  children: [
    WashStat(title: 'Downloads', value: '31K', desc: 'Jan 1 to Feb 1', align: WashStatAlign.responsiveCenter),
  ],
)
''';
}

class _DirectionDemo extends StatelessWidget {
  const _DirectionDemo();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final twoCol = c.maxWidth >= kWashStatLgBreakpoint;
        final horizontal = WashStatGalleryPage._sample(
          'stats (horizontal default)',
          const WashStats(
            expand: true,
            children: [
              WashStat(title: 'Plates', value: '128', desc: 'On the shelf'),
              WashStat(title: 'Series', value: '14', desc: 'Active'),
            ],
          ),
        );
        final vertical = WashStatGalleryPage._sample(
          'stats stats-vertical',
          const WashStats(
            direction: WashStatsDirection.vertical,
            expand: true,
            children: [
              WashStat(title: 'Plates', value: '128', desc: 'On the shelf'),
              WashStat(title: 'Series', value: '14', desc: 'Active'),
              WashStat(title: 'Sketches', value: '62', desc: 'In progress'),
            ],
          ),
        );
        if (!twoCol) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              horizontal,
              const SizedBox(height: 24),
              vertical,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: horizontal),
            const SizedBox(width: 24),
            Expanded(child: vertical),
          ],
        );
      },
    );
  }
}

class _ColorsDemo extends StatelessWidget {
  const _ColorsDemo();

  @override
  Widget build(BuildContext context) {
    return WashStatGalleryPage._sample(
      'stat-value text-primary … text-error',
      const WashStats(
        direction: WashStatsDirection.responsive,
        expand: true,
        children: [
          WashStat(
            title: 'Primary',
            value: '89%',
            desc: 'Glaze opacity',
            valueTone: WashStatTone.primary,
            descTone: WashStatTone.primary,
          ),
          WashStat(
            title: 'Secondary',
            value: '42',
            desc: 'Layers stacked',
            valueTone: WashStatTone.secondary,
            descTone: WashStatTone.secondary,
          ),
          WashStat(
            title: 'Accent',
            value: '7',
            desc: 'New brushes',
            valueTone: WashStatTone.accent,
            descTone: WashStatTone.accent,
          ),
          WashStat(
            title: 'Info',
            value: '16h',
            desc: 'Dry window',
            valueTone: WashStatTone.info,
            descTone: WashStatTone.info,
          ),
          WashStat(
            title: 'Success',
            value: '98%',
            desc: 'Archive healthy',
            valueTone: WashStatTone.success,
            descTone: WashStatTone.success,
          ),
          WashStat(
            title: 'Warning',
            value: '4',
            desc: 'Plates at risk',
            valueTone: WashStatTone.warning,
            descTone: WashStatTone.warning,
          ),
          WashStat(
            title: 'Error',
            value: '2',
            desc: 'Failed exports',
            valueTone: WashStatTone.error,
            descTone: WashStatTone.error,
          ),
        ],
      ),
    );
  }
}

class _ResponsiveDemo extends StatelessWidget {
  const _ResponsiveDemo();

  @override
  Widget build(BuildContext context) {
    return WashStatGalleryPage._sample(
      'stats stats-vertical lg:stats-horizontal',
      const WashStats(
        direction: WashStatsDirection.responsive,
        expand: true,
        children: [
          WashStat(
            title: 'Downloads',
            value: '31K',
            desc: 'Jan 1 to Feb 1',
            align: WashStatAlign.responsiveCenter,
          ),
          WashStat(
            title: 'Followers',
            value: '4,200',
            desc: 'Up 40 (2%)',
            valueTone: WashStatTone.secondary,
            descTone: WashStatTone.secondary,
            align: WashStatAlign.responsiveCenter,
          ),
          WashStat(
            title: 'New registers',
            value: '1,200',
            desc: 'Down 90 (14%)',
            align: WashStatAlign.responsiveCenter,
          ),
        ],
      ),
    );
  }
}
