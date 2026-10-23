
import 'package:flutter/widgets.dart';

import '../../foundation/wash_modal_scope.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_theme.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../bottom_sheet/wash_bottom_sheet.dart';
import '../button/wash_button.dart';
import '../dialog/wash_dialog.dart';

/// Catalog entry mirroring web `watercolorThemes` (id, label, note, swatch).
@immutable
class WashPigmentTheme {
  const WashPigmentTheme({
    required this.id,
    required this.label,
    required this.note,
    required this.swatch,
  });

  final String id;
  final String label;
  final String note;
  final Color swatch;

  String get swatchHex {
    final v = (swatch.r * 255).round() << 16 |
        (swatch.g * 255).round() << 8 |
        (swatch.b * 255).round();
    return '#${v.toRadixString(16).padLeft(6, '0').toUpperCase()}';
  }
}

/// All 30 pigment themes (same order and copy as web `watercolorThemes`).
const List<WashPigmentTheme> kWashPigmentThemes = [
  WashPigmentTheme(
    id: 'mineral',
    label: 'Mineral',
    note: 'Blue · ochre · rose',
    swatch: Color(0xFF276C8E),
  ),
  WashPigmentTheme(
    id: 'indigo',
    label: 'Indigo',
    note: 'Deep lake violet',
    swatch: Color(0xFF3D4F8F),
  ),
  WashPigmentTheme(
    id: 'celadon',
    label: 'Celadon',
    note: 'Sage glaze',
    swatch: Color(0xFF3D7A5F),
  ),
  WashPigmentTheme(
    id: 'vermilion',
    label: 'Vermilion',
    note: 'Warm lake red',
    swatch: Color(0xFFB8432F),
  ),
  WashPigmentTheme(
    id: 'sepia',
    label: 'Sepia',
    note: 'Archival ink',
    swatch: Color(0xFF6B4E32),
  ),
  WashPigmentTheme(
    id: 'cobalt',
    label: 'Cobalt',
    note: 'Bright mineral blue',
    swatch: Color(0xFF1F5F9E),
  ),
  WashPigmentTheme(
    id: 'moss',
    label: 'Moss',
    note: 'Botanical green',
    swatch: Color(0xFF4A6B3A),
  ),
  WashPigmentTheme(
    id: 'saffron',
    label: 'Saffron',
    note: 'Gold ochre',
    swatch: Color(0xFFC48A28),
  ),
  WashPigmentTheme(
    id: 'slate',
    label: 'Slate',
    note: 'Cool pigment gray',
    swatch: Color(0xFF5A6573),
  ),
  WashPigmentTheme(
    id: 'lake',
    label: 'Lake',
    note: 'Viridian teal',
    swatch: Color(0xFF2A7A72),
  ),
  WashPigmentTheme(
    id: 'ultramarine',
    label: 'Ultramarine',
    note: 'Deep lapis blue',
    swatch: Color(0xFF2F4A9B),
  ),
  WashPigmentTheme(
    id: 'viridian',
    label: 'Viridian',
    note: 'Cool chrome green',
    swatch: Color(0xFF2F7A68),
  ),
  WashPigmentTheme(
    id: 'madder',
    label: 'Madder',
    note: 'Rose madder lake',
    swatch: Color(0xFFA63D52),
  ),
  WashPigmentTheme(
    id: 'ochre',
    label: 'Ochre',
    note: 'Yellow earth',
    swatch: Color(0xFFB8892E),
  ),
  WashPigmentTheme(
    id: 'umber',
    label: 'Umber',
    note: 'Burnt earth brown',
    swatch: Color(0xFF6B4A32),
  ),
  WashPigmentTheme(
    id: 'ivory',
    label: 'Ivory',
    note: 'Ivory black gray',
    swatch: Color(0xFF4A4842),
  ),
  WashPigmentTheme(
    id: 'cerulean',
    label: 'Cerulean',
    note: 'Sky mineral blue',
    swatch: Color(0xFF3A7CA8),
  ),
  WashPigmentTheme(
    id: 'crimson',
    label: 'Crimson',
    note: 'Deep carmine',
    swatch: Color(0xFF9E2F3E),
  ),
  WashPigmentTheme(
    id: 'olive',
    label: 'Olive',
    note: 'Muted leaf green',
    swatch: Color(0xFF6A6B3A),
  ),
  WashPigmentTheme(
    id: 'sienna',
    label: 'Sienna',
    note: 'Raw earth orange',
    swatch: Color(0xFFA65A32),
  ),
  WashPigmentTheme(
    id: 'turquoise',
    label: 'Turquoise',
    note: 'Copper blue-green',
    swatch: Color(0xFF2A8A8E),
  ),
  WashPigmentTheme(
    id: 'lavender',
    label: 'Lavender',
    note: 'Soft mineral violet',
    swatch: Color(0xFF6A5A8E),
  ),
  WashPigmentTheme(
    id: 'charcoal',
    label: 'Charcoal',
    note: 'Graphite gray',
    swatch: Color(0xFF3E4248),
  ),
  WashPigmentTheme(
    id: 'coral',
    label: 'Coral',
    note: 'Warm shell pink',
    swatch: Color(0xFFC45A4A),
  ),
  WashPigmentTheme(
    id: 'pine',
    label: 'Pine',
    note: 'Forest needle green',
    swatch: Color(0xFF3A5E42),
  ),
  WashPigmentTheme(
    id: 'bronze',
    label: 'Bronze',
    note: 'Metallic ochre',
    swatch: Color(0xFF8E6A32),
  ),
  WashPigmentTheme(
    id: 'mist',
    label: 'Mist',
    note: 'Cool vapor gray',
    swatch: Color(0xFF6A7A88),
  ),
  WashPigmentTheme(
    id: 'rust',
    label: 'Rust',
    note: 'Iron oxide',
    swatch: Color(0xFFA04828),
  ),
  WashPigmentTheme(
    id: 'jade',
    label: 'Jade',
    note: 'Soft stone green',
    swatch: Color(0xFF3A8A6A),
  ),
  WashPigmentTheme(
    id: 'ink',
    label: 'Ink',
    note: 'Sumi black-blue',
    swatch: Color(0xFF2A3548),
  ),
];

WashPigmentTheme? washPigmentThemeById(String id) {
  for (final t in kWashPigmentThemes) {
    if (t.id == id) return t;
  }
  return null;
}

/// Radial pigment wash used on theme cards (web oklab mix approximated in sRGB).
BoxDecoration washPigmentSwatchDecoration(Color swatch) {
  final light = Color.lerp(const Color(0xFFFFFFFF), swatch, 0.3)!;
  final deep = Color.lerp(swatch, const Color(0xFF000000), 0.3)!;
  return BoxDecoration(
    borderRadius: BorderRadius.circular(8),
    border: Border.all(color: const Color(0x33000000)),
    gradient: RadialGradient(
      center: const Alignment(-0.3, -0.4),
      radius: 1.15,
      colors: [
        light.withValues(alpha: 0.85),
        swatch,
        deep,
      ],
      stops: const [0.0, 0.55, 1.0],
    ),
  );
}

/// Labeled color cell: tall swatch + mono class label (semantic / wash token).
class WashColorSwatch extends StatelessWidget {
  const WashColorSwatch({
    required this.name,
    required this.background,
    required this.foreground,
    required this.label,
    this.note,
    this.height = 80,
    super.key,
  });

  final String name;
  final Color background;
  final Color foreground;
  final String label;
  final String? note;
  final double height;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          height: height,
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: background,
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                name,
                style: WashTypography.label(foreground).copyWith(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  height: 1.15,
                ),
              ),
              if (note != null) ...[
                const SizedBox(height: 2),
                Text(
                  note!,
                  style: WashTypography.body(foreground)
                      .copyWith(
                        fontSize: 10.4,
                        height: 1.2,
                      )
                      .copyWith(
                        color: foreground.withValues(alpha: 0.8),
                      ),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontSize: 10.4,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
      ],
    );
  }
}

/// Responsive grid of daisyUI semantic role swatches for the active pigment.
class WashSemanticPaletteGrid extends StatelessWidget {
  const WashSemanticPaletteGrid({super.key});

  @override
  Widget build(BuildContext context) {
    final p = WashTokens.of(context).palette;
    final items = <(String, Color, Color, String)>[
      ('Primary', p.primary, p.primaryContent, 'bg-primary'),
      ('Secondary', p.secondary, p.secondaryContent, 'bg-secondary'),
      ('Accent', p.accent, p.accentContent, 'bg-accent'),
      ('Neutral', p.neutral, p.neutralContent, 'bg-neutral'),
      ('Base 100', p.base100, p.baseContent, 'bg-base-100'),
      ('Base 200', p.base200, p.baseContent, 'bg-base-200'),
      ('Base 300', p.base300, p.baseContent, 'bg-base-300'),
      ('Info', p.info, p.infoContent, 'bg-info'),
      ('Success', p.success, p.successContent, 'bg-success'),
      ('Warning', p.warning, p.warningContent, 'bg-warning'),
      ('Error', p.error, p.errorContent, 'bg-error'),
    ];
    return _ResponsiveSwatchGrid(
      minTileWidth: 120,
      children: [
        for (final item in items)
          WashColorSwatch(
            name: item.$1,
            background: item.$2,
            foreground: item.$3,
            label: item.$4,
          ),
      ],
    );
  }
}

/// Studio wash / paper CSS variables for the active pigment.
class WashTokenPaletteGrid extends StatelessWidget {
  const WashTokenPaletteGrid({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    final paperFiber = tokens.palette.base300;
    final items = <(String, String, Color, Color, String)>[
      (
        'Wash A',
        'Cool wash · wash-blue',
        atmo.washA,
        tokens.onSurface,
        '--wash-a / wash-blue',
      ),
      (
        'Wash B',
        'Warm wash · wash-ochre',
        atmo.washB,
        tokens.onSurface,
        '--wash-b / wash-ochre',
      ),
      (
        'Wash C',
        'Rose wash · wash-rose',
        atmo.washC,
        tokens.onSurface,
        '--wash-c / wash-rose',
      ),
      (
        'Paper fiber',
        'Grain undertone',
        paperFiber,
        tokens.onSurface,
        '--paper-fiber',
      ),
      (
        'Ink muted',
        'Secondary copy',
        tokens.inkMuted,
        tokens.palette.base100,
        '--ink-muted',
      ),
      (
        'Ink border',
        'Hairline rules',
        tokens.inkBorder,
        tokens.onSurface,
        '--ink-border',
      ),
    ];
    return _ResponsiveSwatchGrid(
      minTileWidth: 120,
      children: [
        for (final item in items)
          WashColorSwatch(
            name: item.$1,
            note: item.$2,
            background: item.$3,
            foreground: item.$4,
            label: item.$5,
          ),
      ],
    );
  }
}

class _ResponsiveSwatchGrid extends StatelessWidget {
  const _ResponsiveSwatchGrid({
    required this.children,
    required this.minTileWidth,
  });

  final List<Widget> children;
  final double minTileWidth;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : MediaQuery.sizeOf(context).width;
        final cols = (width / (minTileWidth + 12)).floor().clamp(2, 6);
        final gap = 12.0;
        final tileW = (width - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final child in children) SizedBox(width: tileW, child: child),
          ],
        );
      },
    );
  }
}

/// Pigment card: gradient swatch + label/note/id (web `PigmentThemeCard`).
class WashPigmentThemeCard extends StatelessWidget {
  const WashPigmentThemeCard({
    required this.theme,
    required this.active,
    required this.onOpen,
    super.key,
  });

  final WashPigmentTheme theme;
  final bool active;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onOpen,
        child: Semantics(
          button: true,
          selected: active,
          label: 'Open ${theme.label} pigment theme code',
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 160),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(tokens.radiusBox),
              border: Border.all(
                color: active ? tokens.primary : tokens.inkBorder,
                width: active ? 1.5 : 1,
              ),
              boxShadow: active ? washPaperShadowSm(tokens) : null,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Stack(
                  children: [
                    Container(
                      height: 64,
                      decoration: washPigmentSwatchDecoration(theme.swatch),
                    ),
                    if (active)
                      Positioned(
                        top: 6,
                        right: 6,
                        child: Container(
                          width: 24,
                          height: 24,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color:
                                tokens.palette.base100.withValues(alpha: 0.9),
                            shape: BoxShape.circle,
                          ),
                          child: WashLucideIcon(
                            'check',
                            size: 14,
                            color: tokens.primary,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        theme.label,
                        style: WashTypography.label(tokens.onSurface).copyWith(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          height: 1.15,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        theme.note,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 10.4,
                        ),
                      ),
                      Text(
                        theme.id,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 10.4,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Compact pigment row (swatch circle + label).
class WashPigmentThemeCompactRow extends StatelessWidget {
  const WashPigmentThemeCompactRow({
    required this.theme,
    required this.onOpen,
    this.active = false,
    super.key,
  });

  final WashPigmentTheme theme;
  final bool active;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onOpen,
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(
              color: active ? tokens.primary : tokens.inkBorder,
            ),
            boxShadow: active ? washPaperShadowSm(tokens) : null,
          ),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: theme.swatch,
                  shape: BoxShape.circle,
                  border: Border.all(color: tokens.inkBorder),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      theme.label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      theme.id,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 10.4,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Grid of all pigment theme cards; opens [showWashPigmentThemeDialog] on tap.
class WashPigmentThemeGrid extends StatelessWidget {
  const WashPigmentThemeGrid({
    this.onApply,
    super.key,
  });

  /// Called when the user applies a pigment from the dialog.
  /// Defaults to [WashScope.setPigment].
  final ValueChanged<String>? onApply;

  @override
  Widget build(BuildContext context) {
    final activeId = WashScope.of(context).pigmentId;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : MediaQuery.sizeOf(context).width;
        final cols = (width / 160).floor().clamp(2, 5);
        final gap = 12.0;
        final tileW = (width - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final theme in kWashPigmentThemes)
              SizedBox(
                width: tileW,
                child: WashPigmentThemeCard(
                  theme: theme,
                  active: theme.id == activeId,
                  onOpen: () => showWashPigmentThemeDialog(
                    context,
                    theme: theme,
                    onApply: onApply,
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

/// Opens pigment theme dialog (preview + Dart apply usage + Apply).
Future<void> showWashPigmentThemeDialog(
  BuildContext context, {
  required WashPigmentTheme theme,
  ValueChanged<String>? onApply,
}) {
  final scope = WashScope.of(context);
  return showWashDialog<void>(
    context: context,
    maxWidth: 896,
    builder: (ctx) {
      return WashModalBox(
        dialogStyle: true,
        width: 896,
        maxHeight: MediaQuery.sizeOf(ctx).height * 0.9,
        scrollable: true,
        child: _WashPigmentThemeDialogBody(
          theme: theme,
          activePigment: scope.pigmentId,
          mode: scope.mode,
          onApply: onApply ?? scope.setPigment,
        ),
      );
    },
  );
}

class _WashPigmentThemeDialogBody extends StatelessWidget {
  const _WashPigmentThemeDialogBody({
    required this.theme,
    required this.activePigment,
    required this.mode,
    required this.onApply,
  });

  final WashPigmentTheme theme;
  final String activePigment;
  final WashThemeMode mode;
  final ValueChanged<String> onApply;

  bool get _isActive => theme.id == activePigment;

  String get _dartUsage => '''
// Apply pigment via WashProvider scope
WashScope.of(context).setPigment('${theme.id}');

// Or bootstrap with a default
WashProvider(
  defaultPigment: '${theme.id}',
  defaultMode: WashThemeMode.light,
  child: child,
)

// Palette id (data-theme equivalent): ${theme.id} · ${theme.id}-dark
''';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final previewTokens = buildWashTokens(
      pigmentId: theme.id,
      mode: WashThemeMode.light,
    );
    final modeLabel = mode == WashThemeMode.dark ? 'dark' : 'light';
    final close = WashModalCloseScope.maybeCloseOf(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    theme.label,
                    style: WashTypography.title(tokens.primary).copyWith(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    theme.note,
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'data-theme="${theme.id}" · ${theme.id}-dark',
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 12,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                ],
              ),
            ),
            WashButton(
              variant: WashButtonVariant.ghost,
              tint: WashButtonVariant.primary,
              size: WashButtonSize.sm,
              square: true,
              onPressed: close,
              child: const WashLucideIcon('x', size: 16),
            ),
          ],
        ),
        const SizedBox(height: 16),
        _DialogPreviewTabs(
          dartSource: _dartUsage,
          preview: WashThemeScope(
            tokens: previewTokens,
            child: Builder(
              builder: (previewCtx) {
                final pt = WashTokens.of(previewCtx);
                final roles = <(String, Color, Color)>[
                  ('Primary', pt.palette.primary, pt.palette.primaryContent),
                  (
                    'Secondary',
                    pt.palette.secondary,
                    pt.palette.secondaryContent
                  ),
                  ('Accent', pt.palette.accent, pt.palette.accentContent),
                  ('Neutral', pt.palette.neutral, pt.palette.neutralContent),
                  ('Base 100', pt.palette.base100, pt.palette.baseContent),
                  ('Base 200', pt.palette.base200, pt.palette.baseContent),
                ];
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Container(
                      height: 96,
                      padding: const EdgeInsets.all(12),
                      decoration:
                          washPigmentSwatchDecoration(theme.swatch).copyWith(
                        borderRadius: BorderRadius.circular(pt.radiusBox),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: pt.palette.base100.withValues(alpha: 0.9),
                              borderRadius:
                                  BorderRadius.circular(pt.radiusBox * 0.5),
                            ),
                            child: Text(
                              theme.label,
                              style:
                                  WashTypography.label(pt.onSurface).copyWith(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          const Spacer(),
                          Text(
                            theme.swatchHex,
                            style: WashTypography.body(pt.palette.base100)
                                .copyWith(
                              fontSize: 10.4,
                              shadows: const [
                                Shadow(
                                  color: Color(0x66000000),
                                  blurRadius: 2,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    LayoutBuilder(
                      builder: (context, c) {
                        final cols = c.maxWidth < 420 ? 4 : 6;
                        final gap = 8.0;
                        final w = (c.maxWidth - gap * (cols - 1)) / cols;
                        return Wrap(
                          spacing: gap,
                          runSpacing: gap,
                          children: [
                            for (final r in roles)
                              SizedBox(
                                width: w,
                                child: Container(
                                  height: 48,
                                  padding: const EdgeInsets.all(6),
                                  alignment: Alignment.bottomLeft,
                                  decoration: BoxDecoration(
                                    color: r.$2,
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(
                                      color:
                                          pt.inkBorder.withValues(alpha: 0.5),
                                    ),
                                  ),
                                  child: Text(
                                    r.$1,
                                    style: TextStyle(
                                      color: r.$3,
                                      fontSize: 9.6,
                                      fontWeight: FontWeight.w500,
                                      height: 1.15,
                                    ),
                                  ),
                                ),
                              ),
                          ],
                        );
                      },
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Tokens from WashPigmentPalette / kWashAtmosphereByTheme. '
                      'Apply with WashScope.setPigment or WashProvider.',
                      style: WashTypography.body(pt.inkMuted).copyWith(
                        fontSize: 12,
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ),
        WashModalActions(
          children: [
            WashButton(
              label: _isActive ? 'Active · $modeLabel' : 'Apply pigment',
              variant: WashButtonVariant.primary,
              enabled: !_isActive,
              onPressed: _isActive
                  ? null
                  : () {
                      onApply(theme.id);
                      close?.call();
                    },
            ),
            WashButton(
              label: 'Close',
              onPressed: close,
            ),
          ],
        ),
      ],
    );
  }
}

class _DialogPreviewTabs extends StatefulWidget {
  const _DialogPreviewTabs({
    required this.preview,
    required this.dartSource,
  });

  final Widget preview;
  final String dartSource;

  @override
  State<_DialogPreviewTabs> createState() => _DialogPreviewTabsState();
}

class _DialogPreviewTabsState extends State<_DialogPreviewTabs> {
  var _dart = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            _MiniTab(
              label: 'Preview',
              selected: !_dart,
              onTap: () => setState(() => _dart = false),
            ),
            const SizedBox(width: 8),
            _MiniTab(
              label: 'Dart',
              selected: _dart,
              onTap: () => setState(() => _dart = true),
            ),
          ],
        ),
        const SizedBox(height: 12),
        if (!_dart)
          widget.preview
        else
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: tokens.inkBorder),
            ),
            child: Text(
              widget.dartSource,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontSize: 12,
                height: 1.45,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ),
      ],
    );
  }
}

class _MiniTab extends StatelessWidget {
  const _MiniTab({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: selected ? tokens.primary : tokens.palette.base200,
            borderRadius: BorderRadius.circular(999),
          ),
          child: Text(
            label,
            style: WashTypography.label(
              selected ? tokens.onPrimary : tokens.onSurface,
            ).copyWith(fontSize: 12, fontWeight: FontWeight.w600),
          ),
        ),
      ),
    );
  }
}
