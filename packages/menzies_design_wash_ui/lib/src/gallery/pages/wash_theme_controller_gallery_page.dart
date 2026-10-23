import 'package:flutter/widgets.dart';

import '../../components/fieldset/wash_fieldset.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/theme_controller/wash_theme_controller.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashThemeControllerGalleryPage extends StatelessWidget {
  const WashThemeControllerGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Theme controller',
      description:
          'daisyUI theme-controller patterns wired to Menzies Design pigments.',
      sections: [
        _s(
          '00 · Note',
          'Production chrome',
          'Live pigment and light/dark controls',
          const _NotePreview(),
          _noteDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '01 · Basic',
          'Checkbox and radio controllers',
          'Official theme-controller markup on toggles, checkboxes',
          const _BasicPreview(),
          _basicDart,
        ),
        _s(
          '02 · Swap',
          'Sun and moon swap',
          'swap-rotate with a theme-controller checkbox',
          const _SwapPreview(),
          _swapDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Picker',
          'Dropdown and button join',
          'Pick among a subset of watercolorThemes',
          const _PickerPreview(),
          _pickerDart,
        ),
        _s(
          '04 · Studio strip',
          'Pigment radio strip',
          'A wider strip of pigments using official controller classes',
          const _StripPreview(),
          _stripDart,
          tint: WashGalleryPanelTint.ochre,
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

  static const _noteDart = '''
// Prefer WashThemeSwitcher for day-to-day switching.
// Gallery demos keep kWashThemeStorageKey and kWashModeStorageKey
// aligned via WashScope.setPigment / setMode.
''';

  static const _basicDart = '''
WashThemeController()
WashThemeController(style: WashThemeControllerStyle.checkbox)
WashThemeController(labeledIcons: true)
WashThemeControllerPigmentRadios()
''';

  static const _swapDart = '''
WashThemeControllerSwap()
WashThemeController(innerIcons: true)
''';

  static const _pickerDart = '''
WashThemeControllerPigmentDropdown()
WashThemeControllerPigmentJoin()
''';

  static const _stripDart = '''
WashThemeControllerPigmentStrip()
''';
}

class _Caption extends StatelessWidget {
  const _Caption(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: WashTypography.label(WashTokens.of(context).inkMuted).copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

class _NotePreview extends StatelessWidget {
  const _NotePreview();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text.rich(
          TextSpan(
            style: WashTypography.body(tokens.inkMuted),
            children: [
              const TextSpan(
                text:
                    'Prefer WashThemeSwitcher for day-to-day switching. Gallery demos below keep ',
              ),
              TextSpan(
                text: kWashThemeStorageKey,
                style: WashTypography.label(tokens.inkMuted).copyWith(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const TextSpan(text: ' and '),
              TextSpan(
                text: kWashModeStorageKey,
                style: WashTypography.label(tokens.inkMuted).copyWith(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const TextSpan(text: ' aligned via '),
              TextSpan(
                text: 'WashScope',
                style: WashTypography.label(tokens.inkMuted).copyWith(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const TextSpan(text: '.'),
            ],
          ),
        ),
      ),
    );
  }
}

class _BasicPreview extends StatelessWidget {
  const _BasicPreview();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= WashTailwindBreakpoints.lg
            ? 3
            : constraints.maxWidth >= WashTailwindBreakpoints.sm
                ? 2
                : 1;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _BasicGrid(columns: cols),
            const SizedBox(height: 32),
            WashFieldset(
              legend: 'Radio pigments (demo set)',
              backgroundColor: tokens.surface.withValues(alpha: 0.4),
              borderColor: tokens.inkBorder.withValues(alpha: 0.5),
              children: const [
                WashThemeControllerPigmentRadios(),
                WashThemeControllerClassLabel(
                    'radio radio-sm theme-controller'),
              ],
            ),
          ],
        );
      },
    );
  }
}

class _BasicGrid extends StatelessWidget {
  const _BasicGrid({required this.columns});

  final int columns;

  @override
  Widget build(BuildContext context) {
    const cells = [
      _BasicCell(
        control: WashThemeController(),
        classLabel: 'toggle theme-controller',
        caption: 'Toggle · light / dark',
      ),
      _BasicCell(
        control: WashThemeController(style: WashThemeControllerStyle.checkbox),
        classLabel: 'checkbox theme-controller',
        caption: 'Checkbox · light / dark',
      ),
      _BasicCell(
        control: WashThemeController(labeledIcons: true),
        classLabel: 'toggle theme-controller + icons',
        caption: 'Labeled toggle',
      ),
    ];

    if (columns == 1) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (var i = 0; i < cells.length; i++) ...[
            if (i > 0) const SizedBox(height: 32),
            cells[i],
          ],
        ],
      );
    }

    return Wrap(
      spacing: 32,
      runSpacing: 32,
      children: [
        for (final cell in cells) cell,
      ],
    );
  }
}

class _BasicCell extends StatelessWidget {
  const _BasicCell({
    required this.control,
    required this.classLabel,
    required this.caption,
  });

  final Widget control;
  final String classLabel;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        control,
        const SizedBox(height: 12),
        WashThemeControllerClassLabel(classLabel),
        const SizedBox(height: 4),
        _Caption(caption),
      ],
    );
  }
}

class _SwapPreview extends StatelessWidget {
  const _SwapPreview();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final swap = const _SwapColumn();
        final toggle = const _InnerIconsColumn();
        if (!row) {
          return Column(
            children: [
              swap,
              const SizedBox(height: 16),
              toggle,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Flexible(child: swap),
            const SizedBox(width: 40),
            Flexible(child: toggle),
          ],
        );
      },
    );
  }
}

class _SwapColumn extends StatelessWidget {
  const _SwapColumn();

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final mode = scope.mode == WashThemeMode.dark ? 'dark' : 'light';
    return Column(
      children: [
        const WashThemeControllerSwap(),
        const SizedBox(height: 8),
        const WashThemeControllerClassLabel(
            'swap swap-rotate + theme-controller'),
        const SizedBox(height: 4),
        _Caption('Mode: $mode · pigment ${scope.pigmentId}'),
      ],
    );
  }
}

class _InnerIconsColumn extends StatelessWidget {
  const _InnerIconsColumn();

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        WashThemeController(innerIcons: true),
        SizedBox(height: 8),
        WashThemeControllerClassLabel(
            'toggle + theme-controller (icons inside)'),
      ],
    );
  }
}

class _PickerPreview extends StatelessWidget {
  const _PickerPreview();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final dropdown = const WashThemeControllerPigmentDropdown();
        final join = const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashThemeControllerPigmentJoin(),
            SizedBox(height: 8),
            WashThemeControllerClassLabel('join + btn theme-controller'),
          ],
        );
        if (!row) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              dropdown,
              const SizedBox(height: 32),
              join,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            dropdown,
            const SizedBox(width: 48),
            Expanded(child: join),
          ],
        );
      },
    );
  }
}

class _StripPreview extends StatelessWidget {
  const _StripPreview();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashThemeControllerPigmentStrip(),
        SizedBox(height: 12),
        WashThemeControllerClassLabel(
          'theme-controller radio radio-sm (pigment strip)',
        ),
      ],
    );
  }
}
