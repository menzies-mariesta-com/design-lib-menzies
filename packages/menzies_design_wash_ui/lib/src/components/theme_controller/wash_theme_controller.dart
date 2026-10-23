import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../button/wash_button.dart';
import '../dropdown/wash_dropdown.dart';
import '../join/wash_join.dart';
import '../palette/wash_palette.dart';
import '../radio/wash_radio.dart';
import '../swap/wash_swap.dart';

/// Compact pigment subset used by dropdown / join demos (web `DEMO_PIGMENT_IDS`).
const List<String> kWashThemeControllerDemoPigmentIds = [
  'mineral',
  'indigo',
  'celadon',
  'vermilion',
  'sepia',
  'cobalt',
];

List<WashPigmentTheme> washThemeControllerDemoPigments() {
  return [
    for (final id in kWashThemeControllerDemoPigmentIds)
      if (washPigmentThemeById(id) != null) washPigmentThemeById(id)!,
  ];
}

/// First dozen pigments for the studio radio strip.
List<WashPigmentTheme> washThemeControllerStripPigments() {
  return kWashPigmentThemes.take(12).toList();
}

/// daisyUI `theme-controller` host styles for light/dark.
enum WashThemeControllerStyle { toggle, checkbox }

/// Circular pigment wash (web radial-gradient swatch on radios / strip).
class WashThemePigmentDot extends StatelessWidget {
  const WashThemePigmentDot({
    required this.swatch,
    this.size = 14,
    super.key,
  });

  final Color swatch;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final light = Color.lerp(const Color(0xFFFFFFFF), swatch, 0.3)!;
    final deep = Color.lerp(swatch, const Color(0xFF000000), 0.3)!;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: tokens.inkBorder),
        gradient: RadialGradient(
          center: const Alignment(-0.3, -0.4),
          colors: [
            light.withValues(alpha: 0.7),
            swatch,
            deep,
          ],
          stops: const [0, 0.6, 1],
        ),
      ),
    );
  }
}

/// Monospace class hint (`toggle theme-controller`, etc.).
class WashThemeControllerClassLabel extends StatelessWidget {
  const WashThemeControllerClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// Light/dark `theme-controller` as daisyUI toggle or checkbox, wired to [WashScope].
class WashThemeController extends StatelessWidget {
  const WashThemeController({
    this.style = WashThemeControllerStyle.toggle,
    this.labeledIcons = false,
    this.innerIcons = false,
    this.semanticLabel,
    super.key,
  });

  final WashThemeControllerStyle style;
  final bool labeledIcons;
  final bool innerIcons;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final isDark = scope.mode == WashThemeMode.dark;
    final label =
        semanticLabel ?? (isDark ? 'Switch to light' : 'Switch to dark');

    void toggle(bool nextDark) {
      scope.setMode(nextDark ? WashThemeMode.dark : WashThemeMode.light);
    }

    final control = switch (style) {
      WashThemeControllerStyle.toggle => _ThemeModeToggle(
          value: isDark,
          onChanged: toggle,
          semanticLabel: label,
          innerIcons: innerIcons,
        ),
      WashThemeControllerStyle.checkbox => _ThemeModeCheckbox(
          value: isDark,
          onChanged: toggle,
          semanticLabel: label,
        ),
    };

    if (!labeledIcons) return control;

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => toggle(!isDark),
        behavior: HitTestBehavior.opaque,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashLucideIcon('sun',
                size: 20, color: WashTokens.of(context).onSurface),
            const SizedBox(width: 8),
            IgnorePointer(child: control),
            const SizedBox(width: 8),
            WashLucideIcon('moon',
                size: 20, color: WashTokens.of(context).onSurface),
          ],
        ),
      ),
    );
  }
}

/// `swap swap-rotate` sun/moon controller.
class WashThemeControllerSwap extends StatelessWidget {
  const WashThemeControllerSwap({super.key});

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final isDark = scope.mode == WashThemeMode.dark;
    final color = WashTokens.of(context).onSurface;
    return WashSwap(
      value: isDark ? WashSwapState.on : WashSwapState.off,
      effect: WashSwapEffect.rotate,
      semanticLabel: isDark ? 'Switch to light' : 'Switch to dark',
      onChanged: (state) {
        scope.setMode(
          state == WashSwapState.on ? WashThemeMode.dark : WashThemeMode.light,
        );
      },
      onChild: WashLucideIcon('moon', size: 40, color: color),
      offChild: WashLucideIcon('sun', size: 40, color: color),
    );
  }
}

/// `radio radio-sm theme-controller` pigment group.
class WashThemeControllerPigmentRadios extends StatelessWidget {
  const WashThemeControllerPigmentRadios({
    this.pigments,
    super.key,
  });

  final List<WashPigmentTheme>? pigments;

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final items = pigments ?? washThemeControllerDemoPigments();
    return Wrap(
      spacing: 12,
      runSpacing: 8,
      children: [
        for (final item in items)
          WashRadioLabeled<String>(
            label: item.label,
            radio: WashRadio<String>(
              value: item.id,
              groupValue: scope.pigmentId,
              size: WashRadioSize.sm,
              semanticLabel: item.label,
              onChanged: (_) => scope.setPigment(item.id),
            ),
          ),
      ],
    );
  }
}

/// `join` + `btn theme-controller` pigment picker.
class WashThemeControllerPigmentJoin extends StatelessWidget {
  const WashThemeControllerPigmentJoin({super.key});

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final items = washThemeControllerDemoPigments();
    return LayoutBuilder(
      builder: (context, constraints) {
        return WashJoin.responsive(
          // The Flutter join items run a few px wider than the web buttons;
          // keep the vertical stack until there is enough room for all six.
          maxWidth: constraints.maxWidth,
          breakpoint: 760,
          children: [
            for (final item in items)
              WashButton(
                label: item.label,
                joinItem: true,
                variant: WashButtonVariant.defaultVariant,
                active: scope.pigmentId == item.id,
                onPressed: () => scope.setPigment(item.id),
              ),
          ],
        );
      },
    );
  }
}

/// `dropdown` + `theme-controller` radio menu over the demo pigment set.
class WashThemeControllerPigmentDropdown extends StatefulWidget {
  const WashThemeControllerPigmentDropdown({super.key});

  @override
  State<WashThemeControllerPigmentDropdown> createState() =>
      _WashThemeControllerPigmentDropdownState();
}

class _WashThemeControllerPigmentDropdownState
    extends State<WashThemeControllerPigmentDropdown> {
  var _generation = 0;

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final tokens = WashTokens.of(context);
    final items = washThemeControllerDemoPigments();
    final current = washPigmentThemeById(scope.pigmentId) ?? items.first;
    final modeLabel = scope.mode == WashThemeMode.dark ? 'dark' : 'light';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashDropdown(
          key: ValueKey(_generation),
          hoverOpen: false,
          noHover: true,
          panelSizeEstimate: const Size(kWashDropdownMenuWidth, 280),
          trigger: Padding(
            padding: const EdgeInsets.all(4),
            child: WashButton(
              variant: WashButtonVariant.outline,
              onPressed: () {},
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Theme',
                    style: WashTypography.button(tokens.onSurface, 14, 500),
                  ),
                  const SizedBox(width: 8),
                  WashLucideIcon(
                    'chevron-down',
                    size: 12,
                    color: tokens.onSurface.withValues(alpha: 0.6),
                  ),
                ],
              ),
            ),
          ),
          panel: WashDropdownMenuPanel(
            items: [
              for (final item in items)
                WashDropdownMenuItem(
                  label: item.label,
                  active: item.id == scope.pigmentId,
                  onTap: () {
                    scope.setPigment(item.id);
                    setState(() => _generation++);
                  },
                ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Active: ${current.label} · $modeLabel',
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontSize: 12,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 4),
        const WashThemeControllerClassLabel(
            'dropdown + theme-controller radio'),
      ],
    );
  }
}

/// Studio pigment strip (`theme-controller radio radio-sm`).
class WashThemeControllerPigmentStrip extends StatelessWidget {
  const WashThemeControllerPigmentStrip({super.key});

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final tokens = WashTokens.of(context);
    final items = washThemeControllerStripPigments();
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final item in items)
          _StripChip(
            theme: item,
            active: item.id == scope.pigmentId,
            tokens: tokens,
            onSelect: () => scope.setPigment(item.id),
          ),
      ],
    );
  }
}

class _StripChip extends StatelessWidget {
  const _StripChip({
    required this.theme,
    required this.active,
    required this.tokens,
    required this.onSelect,
  });

  final WashPigmentTheme theme;
  final bool active;
  final WashTokens tokens;
  final VoidCallback onSelect;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onSelect,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: WashReducedMotion.of(context)
              ? Duration.zero
              : const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(
              color: active
                  ? tokens.primary
                  : tokens.inkBorder.withValues(alpha: 0.7),
            ),
            boxShadow: active ? washPaperShadowSm(tokens) : null,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashRadio<String>(
                value: theme.id,
                groupValue: active ? theme.id : null,
                size: WashRadioSize.sm,
                semanticLabel: theme.label,
                onChanged: (_) => onSelect(),
              ),
              const SizedBox(width: 8),
              WashThemePigmentDot(swatch: theme.swatch),
              const SizedBox(width: 8),
              Text(
                theme.label,
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ThemeModeToggle extends StatelessWidget {
  const _ThemeModeToggle({
    required this.value,
    required this.onChanged,
    required this.semanticLabel,
    this.innerIcons = false,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final String semanticLabel;
  final bool innerIcons;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final reduce = WashReducedMotion.of(context);
    final width = innerIcons ? 56.0 : 48.0;
    final height = innerIcons ? 28.0 : 24.0;
    final knob = innerIcons ? 20.0 : 18.0;

    return Semantics(
      label: semanticLabel,
      toggled: value,
      button: true,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => onChanged(!value),
          child: AnimatedContainer(
            duration:
                reduce ? Duration.zero : const Duration(milliseconds: 180),
            width: width,
            height: height,
            padding: const EdgeInsets.all(3),
            decoration: BoxDecoration(
              color: value ? tokens.primary : tokens.surfaceContainer,
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: tokens.inkBorder),
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                if (innerIcons)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      WashLucideIcon(
                        'sun',
                        size: 14,
                        color: tokens.onSurface
                            .withValues(alpha: value ? 0.35 : 0.9),
                      ),
                      WashLucideIcon(
                        'moon',
                        size: 14,
                        color: tokens.onPrimary
                            .withValues(alpha: value ? 0.95 : 0.35),
                      ),
                    ],
                  ),
                AnimatedAlign(
                  duration: reduce
                      ? Duration.zero
                      : const Duration(milliseconds: 180),
                  alignment:
                      value ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    width: knob,
                    height: knob,
                    decoration: BoxDecoration(
                      color: value ? tokens.onPrimary : tokens.surface,
                      shape: BoxShape.circle,
                      border: Border.all(
                          color: tokens.inkBorder.withValues(alpha: 0.4)),
                    ),
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

class _ThemeModeCheckbox extends StatelessWidget {
  const _ThemeModeCheckbox({
    required this.value,
    required this.onChanged,
    required this.semanticLabel,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Semantics(
      label: semanticLabel,
      checked: value,
      button: true,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => onChanged(!value),
          child: Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              color: value ? tokens.primary : tokens.surface,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: value ? tokens.primary : tokens.inkBorder,
                width: 2,
              ),
            ),
            child: value
                ? Center(
                    child: WashLucideIcon('check',
                        size: 14, color: tokens.onPrimary),
                  )
                : null,
          ),
        ),
      ),
    );
  }
}
