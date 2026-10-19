import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/kbd/wash_kbd.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashKbdGalleryPage extends StatelessWidget {
  const WashKbdGalleryPage({super.key});

  static const _basicKeys = ['K', 'A', 'Enter', 'Esc', '⌘', '⇧'];

  static const _sizes = <(WashKbdSize, String)>[
    (WashKbdSize.xs, 'Xsmall'),
    (WashKbdSize.sm, 'Small'),
    (WashKbdSize.md, 'Medium'),
    (WashKbdSize.lg, 'Large'),
  ];

  static const _combos = <(List<String>, String)>[
    (['Ctrl', 'K'], 'kbd + Ctrl + K'),
    (['Ctrl', 'Shift', 'S'], 'kbd + Ctrl + Shift + S'),
    (['⌘', 'Z'], 'kbd + ⌘ + Z'),
    (['Alt', 'Tab'], 'kbd + Alt + Tab'),
  ];

  static const _studioShortcuts = <(String, List<String>)>[
    ('Save', ['Ctrl', 'S']),
    ('Undo', ['Ctrl', 'Z']),
    ('Redo', ['Ctrl', 'Shift', 'Z']),
    ('Brush size up', ['[']),
    ('Brush size down', [']']),
    ('Command palette', ['Ctrl', 'K']),
  ];

  static const _row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  static const _row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  static const _row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '/'];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Kbd',
      description:
          'daisyUI kbd for single keys, size scale, combinations, and studio shortcuts in prose.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Single keys',
          description: 'Plain kbd for letters, modifiers, and named keys',
          child: Wrap(
            spacing: 16,
            runSpacing: 16,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              for (final key in _basicKeys)
                WashShowcaseTabs(
                  preview: WashKbd(key),
                  dartSource: "WashKbd('$key')",
                ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Sizes',
          title: 'Size scale',
          description: 'kbd-xs through kbd-lg with class labels',
          tint: WashGalleryPanelTint.ochre,
          child: Wrap(
            spacing: 16,
            runSpacing: 16,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              for (final (size, label) in _sizes)
                WashShowcaseTabs(
                  preview: WashKbd(label, size: size),
                  dartSource: "WashKbd('$label', size: WashKbdSize.${size.name})",
                ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Combos',
          title: 'Key combinations',
          description: 'Sequences with a plus between each key',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Wrap(
                spacing: 16,
                runSpacing: 16,
                crossAxisAlignment: WrapCrossAlignment.end,
                children: [
                  for (final (keys, hint) in _combos)
                    WashShowcaseTabs(
                      preview: WashKbdCombo(keys: keys),
                      dartSource: 'WashKbdCombo(keys: ${keys.map((k) => "'$k'").toList()})',
                    ),
                ],
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Studio shortcuts',
          title: 'Full shortcuts row',
          description: 'Common Menzies Design studio bindings',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: _studioShortcutsPreview(context),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · In text',
          title: 'Inline in prose',
          description: 'kbd nested in sentences so shortcuts stay readable',
          child: WashShowcaseTabs(
            preview: _prosePreview(context),
            dartSource: _proseDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Responsive',
          title: 'Responsive layout',
          description: 'Key rows wrap on narrow screens and stay centered on wider',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: _responsivePreview(),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }

  static Widget _studioShortcutsPreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final cols = constraints.maxWidth >= 1024
                ? 3
                : constraints.maxWidth >= 640
                    ? 2
                    : 1;
            return Wrap(
              spacing: 16,
              runSpacing: 16,
              children: [
                for (final (action, keys) in _studioShortcuts)
                  SizedBox(
                    width: cols == 1
                        ? constraints.maxWidth
                        : (constraints.maxWidth - (cols - 1) * 16) / cols,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(tokens.radiusBox),
                        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
                        color: tokens.surface.withValues(alpha: 0.5),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                action,
                                style: WashTypography.body(tokens.onSurface).copyWith(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            WashKbdCombo(keys: keys),
                          ],
                        ),
                      ),
                    ),
                  ),
              ],
            );
          },
        ),
        const WashKbdClassLabel('kbd + studio shortcut rows'),
      ],
    );
  }

  static Widget _prosePreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    final body = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: 14,
      height: 1.5,
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text.rich(
          TextSpan(
            style: body,
            children: [
              const TextSpan(text: 'Press '),
              WidgetSpan(
                alignment: PlaceholderAlignment.middle,
                child: WashKbd('F', size: WashKbdSize.sm),
              ),
              const TextSpan(text: ' to focus the active wash layer.'),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 4,
          runSpacing: 8,
          children: [
            Text('Open the command palette with', style: body),
            const WashKbd('Ctrl', size: WashKbdSize.sm),
            Text('+', style: body.copyWith(color: tokens.inkMuted)),
            const WashKbd('K', size: WashKbdSize.sm),
            Text(', then type a pigment name.', style: body),
          ],
        ),
        const SizedBox(height: 16),
        Text.rich(
          TextSpan(
            style: body,
            children: [
              const TextSpan(text: 'Hold '),
              WidgetSpan(
                alignment: PlaceholderAlignment.middle,
                child: WashKbd('Space', size: WashKbdSize.sm),
              ),
              const TextSpan(text: ' to pan the canvas, or tap '),
              WidgetSpan(
                alignment: PlaceholderAlignment.middle,
                child: WashKbd('B', size: WashKbdSize.sm),
              ),
              const TextSpan(text: ' for the brush tool.'),
            ],
          ),
        ),
        const WashKbdClassLabel('kbd kbd-sm inside prose'),
      ],
    );
  }

  static Widget _responsivePreview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final pad2 = constraints.maxWidth >= 640 ? 16.0 : 0.0;
            final pad3 = constraints.maxWidth >= 640 ? 32.0 : 0.0;
            return ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 576),
              child: Column(
                children: [
                  _kbdRow(_row1, 0),
                  const SizedBox(height: 8),
                  _kbdRow(_row2, pad2),
                  const SizedBox(height: 8),
                  _kbdRow(_row3, pad3),
                ],
              ),
            );
          },
        ),
        const WashKbdClassLabel('kbd kbd-sm sm:kbd-md + flex-wrap'),
      ],
    );
  }

  static Widget _kbdRow(List<String> keys, double paddingStart) {
    return Padding(
      padding: EdgeInsets.only(left: paddingStart),
      child: Wrap(
        alignment: WrapAlignment.center,
        spacing: 4,
        runSpacing: 4,
        children: [for (final k in keys) WashKbdResponsive(k)],
      ),
    );
  }

  static const _studioDart = '''
Wrap(
  children: [
    for (final row in studioShortcuts)
      WashStudioShortcutRow(action: row.action, keys: row.keys),
  ],
);
''';

  static const _proseDart = '''
Text.rich(TextSpan(children: [
  TextSpan(text: 'Press '),
  WidgetSpan(child: WashKbd('F', size: WashKbdSize.sm)),
  TextSpan(text: ' to focus...'),
]));
''';

  static const _responsiveDart = '''
Wrap(children: [for (final k in row) WashKbdResponsive(k)]);
''';
}
