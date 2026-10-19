import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/divider/wash_divider.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDividerGalleryPage extends StatelessWidget {
  const WashDividerGalleryPage({super.key});

  static const _tones = <(String, WashBadgeTone)>[
    ('Default', WashBadgeTone.defaultTone),
    ('Neutral', WashBadgeTone.neutral),
    ('Primary', WashBadgeTone.primary),
    ('Secondary', WashBadgeTone.secondary),
    ('Accent', WashBadgeTone.accent),
    ('Success', WashBadgeTone.success),
    ('Warning', WashBadgeTone.warning),
    ('Info', WashBadgeTone.info),
    ('Error', WashBadgeTone.error),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Divider',
      description: 'daisyUI divider lines that separate watercolor desk sections.',
      sections: [
        _s('01 · Horizontal', 'Default divider with and without text', 'Vertical stack is the default direction', _horizontal(), _horizDart),
        _s('02 · Vertical', 'Horizontal divider in a flex row', 'Use divider-horizontal when panels sit side by side', _vertical(), _vertDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Colors', 'Semantic divider colors', 'Color modifiers tint the rule and the optional label text', _colors(), _colorsDart),
        _s('04 · Positions', 'Start, center, and end text', 'divider-start and divider-end push the label along the rule', _positions(), _posDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Studio layout', 'Watercolor desk sections', 'Labeled dividers separate wash stages on a pigment desk narrative', _studio(context), _studioDart),
        _s('06 · Responsive', 'Stack on mobile, row on large screens', 'Combine flex direction with lg:divider-horizontal so the rule flips', _responsive(), _responsiveDart),
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

  static Widget _block(String label, {bool fill = false}) {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return Container(
          height: fill ? null : 80,
          width: double.infinity,
          constraints: fill ? const BoxConstraints(minHeight: 80) : null,
          decoration: BoxDecoration(
            color: tokens.surfaceContainerHigh,
            borderRadius: BorderRadius.circular(16),
          ),
          alignment: Alignment.center,
          padding: fill ? const EdgeInsets.symmetric(vertical: 24) : null,
          child: Text(
            label,
            style: WashTypography.body(tokens.onSurface).copyWith(
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
        );
      },
    );
  }

  static Widget _label(String value) {
    return Text(
      value,
      style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
    );
  }

  static Widget _horizontal() {
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final withText = Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _block('Wet wash notes'),
            const WashDivider(label: 'OR'),
            _block('Dry brush notes'),
          ],
        );
        final plain = Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _block('Plate A'),
            const WashDivider(),
            _block('Plate B'),
          ],
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: withText),
              const SizedBox(width: 24),
              Expanded(child: plain),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            withText,
            const SizedBox(height: 24),
            plain,
          ],
        );
      },
    );
  }

  static Widget _vertical() {
    return SizedBox(
      height: 100,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(child: _block('Cerulean', fill: true)),
          const WashDivider(label: 'OR', orientation: WashDividerOrientation.vertical),
          Expanded(child: _block('Ultramarine', fill: true)),
        ],
      ),
    );
  }

  static Widget _colors() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (final (label, tone) in _tones)
          WashDivider(label: label, tone: tone),
      ],
    );
  }

  static Widget _positions() {
    return LayoutBuilder(
      builder: (context, c) {
        final horiz = Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: const [
            WashDivider(label: 'Start', labelAlign: WashDividerLabelAlign.start),
            WashDivider(label: 'Default'),
            WashDivider(label: 'End', labelAlign: WashDividerLabelAlign.end),
          ],
        );
        final vert = SizedBox(
          height: 160,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: const [
              Expanded(
                child: WashDivider(
                  label: 'Start',
                  orientation: WashDividerOrientation.vertical,
                  labelAlign: WashDividerLabelAlign.start,
                ),
              ),
              Expanded(
                child: WashDivider(label: 'Default', orientation: WashDividerOrientation.vertical),
              ),
              Expanded(
                child: WashDivider(
                  label: 'End',
                  orientation: WashDividerOrientation.vertical,
                  labelAlign: WashDividerLabelAlign.end,
                ),
              ),
            ],
          ),
        );
        if (c.maxWidth >= WashTailwindBreakpoints.lg) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: horiz),
              const SizedBox(width: 24),
              Expanded(child: vert),
            ],
          );
        }
        return Column(
          children: [
            horiz,
            const SizedBox(height: 24),
            vert,
          ],
        );
      },
    );
  }

  static Widget _studio(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: washInkBorderBox(
            tokens,
            fill: tokens.surface.withValues(alpha: 0.5),
            radius: 16,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Morning stretch', style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
              const SizedBox(height: 4),
              Text(
                'Soft cerulean across damp paper. Keep edges open for later lifts.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
              const WashDivider(label: 'Pigment mix', tone: WashBadgeTone.primary),
              Text('Midday glaze', style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
              const SizedBox(height: 4),
              Text(
                'Thin ochre over the dry pass. Watch for blooms at the wet edge.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
              const WashDivider(label: 'Drying pause', tone: WashBadgeTone.secondary),
              Text('Evening detail', style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
              const SizedBox(height: 4),
              Text(
                'Dry brush and ink weight for stems, shadows, and signature marks.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
              const WashDivider(
                label: 'Studio close',
                tone: WashBadgeTone.accent,
                labelAlign: WashDividerLabelAlign.end,
              ),
              Text(
                'Cap the palette, rinse brushes, and leave plates flat overnight.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        _label('divider-primary · divider-secondary · divider-accent divider-end'),
      ],
    );
  }

  static Widget _responsive() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, c) {
            final row = c.maxWidth >= WashTailwindBreakpoints.lg;
            final plate = _block(row ? 'Wet wash plate' : 'Wet wash plate');
            final plateB = _block(row ? 'Dry brush plate' : 'Dry brush plate');
            if (row) {
              return SizedBox(
                height: 128,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Expanded(child: plate),
                    const WashDivider(label: 'OR', orientation: WashDividerOrientation.vertical),
                    Expanded(child: plateB),
                  ],
                ),
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                SizedBox(height: 128, child: plate),
                const WashDivider(label: 'OR'),
                SizedBox(height: 128, child: plateB),
              ],
            );
          },
        ),
        const SizedBox(height: 16),
        Builder(
          builder: (context) {
            final tokens = WashTokens.of(context);
            return Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: washInkBorderBox(
                tokens,
                fill: tokens.surface.withValues(alpha: 0.5),
                radius: 16,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Breakpoint behavior', style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18)),
                  const SizedBox(height: 8),
                  Text(
                    'Below lg, panels stack and the divider stays horizontal across the column. At large widths, panels sit in a row and the divider becomes vertical between them.',
                    style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

const _horizDart = '''
Column(
  children: [
    demoBlock('Wet wash notes'),
    WashDivider(label: 'OR'),
    demoBlock('Dry brush notes'),
  ],
);
''';

const _vertDart = '''
Row(
  children: [
    demoBlock('Cerulean'),
    WashDivider(label: 'OR', orientation: WashDividerOrientation.vertical),
    demoBlock('Ultramarine'),
  ],
);
''';

const _colorsDart = '''
WashDivider(label: 'Primary', tone: WashBadgeTone.primary);
// neutral, secondary, accent, success, warning, info, error
''';

const _posDart = '''
WashDivider(label: 'Start', labelAlign: WashDividerLabelAlign.start);
WashDivider(label: 'End', labelAlign: WashDividerLabelAlign.end);
''';

const _studioDart = '''
WashDivider(label: 'Pigment mix', tone: WashBadgeTone.primary);
WashDivider(label: 'Studio close', tone: WashBadgeTone.accent, labelAlign: WashDividerLabelAlign.end);
''';

const _responsiveDart = '''
// lg+: Row + WashDivider(orientation: vertical)
// mobile: Column + horizontal WashDivider
''';
