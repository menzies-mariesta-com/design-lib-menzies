import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/fab/wash_fab.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashFabGalleryPage extends StatelessWidget {
  const WashFabGalleryPage({super.key});

  static const _colors = <(String, WashButtonVariant)>[
    ('Default', WashButtonVariant.defaultVariant),
    ('Neutral', WashButtonVariant.neutral),
    ('Primary', WashButtonVariant.primary),
    ('Secondary', WashButtonVariant.secondary),
    ('Accent', WashButtonVariant.accent),
    ('Info', WashButtonVariant.info),
    ('Success', WashButtonVariant.success),
    ('Warning', WashButtonVariant.warning),
    ('Error', WashButtonVariant.error),
  ];

  static const _sizes = <(String, WashButtonSize)>[
    ('XS', WashButtonSize.xs),
    ('SM', WashButtonSize.sm),
    ('MD', WashButtonSize.md),
    ('LG', WashButtonSize.lg),
    ('XL', WashButtonSize.xl),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'FAB',
      description:
          'daisyUI fab floating action buttons and speed dials: vertical, flower, close, and main.',
      sections: [
        _s('01 · Default', 'Single FAB', 'One circle button in the corner. No speed dial', _defaultFab(), _defaultDart),
        _s('02 · Speed dial', 'Vertical speed dial', 'Focusable trigger opens additional circle actions upward', _speedDial(WashButtonVariant.primary), _speedDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Icons', 'Speed dial with Lucide icons', 'Secondary trigger and icon-only actions with matching tooltips', _speedDial(WashButtonVariant.secondary), _iconsDart),
        _s('04 · Labels', 'Speed dial with text labels', 'Label wrappers sit beside each action button', _labeledDial(), _labelsDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Rectangle', 'Rectangle action buttons', 'Drop btn-circle on actions for wider text buttons', _rectangleDial(), _rectDart),
        _s('06 · Close', 'fab-close replacement', 'When open, the trigger fades and a close control appears', _closeDial(), _closeDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Main action', 'fab-main-action replacement', 'Open state swaps the trigger for a primary action (not both)', _mainDial(), _mainDart),
        _s('08 · Flower', 'fab-flower quarter circle', 'Actions fan into an arc instead of a vertical stack', _flowerDial(mainAction: true), _flowerDart, tint: WashGalleryPanelTint.rose),
        _s('09 · Flower only', 'Flower without main action', 'Without fab-main-action, the first action also sits on the arc', _flowerDial(mainAction: false), _flowerOnlyDart),
        _s('10 · Flower icons', 'Flower with icons and tooltips', 'Quarter circle has no room for text labels; use tooltip-left', _flowerIcons(), _flowerIconsDart, tint: WashGalleryPanelTint.ochre),
        _s('11 · Colors', 'Semantic FAB colors', 'Color comes from nested btn classes, not fab itself', _colorsGrid(), _colorsDart),
        _s('12 · Sizes', 'Button size scale', 'FAB actions inherit btn size modifiers', _sizesRow(), _sizesDart, tint: WashGalleryPanelTint.rose),
        _s('13 · Styles', 'Style variants on FAB triggers', 'Outline, soft, ghost, and dash on circle FAB buttons', _stylesRow(), _stylesDart),
        _s('14 · Mixed palette', 'Colored speed dial actions', 'Each dial action can use its own semantic color', _mixedDial(), _mixedDart, tint: WashGalleryPanelTint.ochre),
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

  static Widget _fabStage(Widget fab, {double height = 224, String? hint}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFabStage(height: height, hint: hint ?? 'Click or focus the FAB', child: fab),
      ],
    );
  }

  static Widget _defaultFab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            trigger: WashFabTooltip(
              message: 'New',
              child: WashFabCircleButton(variant: WashButtonVariant.primary, onPressed: () {}),
            ),
          ),
        ),
        const WashFabClassLabel('fab + btn btn-lg btn-circle btn-primary'),
      ],
    );
  }

  static Widget _speedDial(WashButtonVariant triggerVariant) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: triggerVariant == WashButtonVariant.secondary ? 'New' : 'Open',
              child: WashFabCircleButton(variant: triggerVariant, onPressed: () {}),
            ),
            actions: [
              WashFabTooltip(message: 'Camera', child: WashFabCircleButton(icon: 'camera', onPressed: () {})),
              WashFabTooltip(message: 'Gallery', child: WashFabCircleButton(icon: 'image', onPressed: () {})),
              WashFabTooltip(message: 'Voice', child: WashFabCircleButton(icon: 'mic', onPressed: () {})),
            ],
          ),
        ),
        WashFabClassLabel(
          triggerVariant == WashButtonVariant.secondary
              ? 'fab + Lucide icons + tooltip'
              : 'fab + [tabindex] trigger + action buttons',
        ),
      ],
    );
  }

  static Widget _labeledDial() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: 'Open',
              child: WashFabCircleButton(
                variant: WashButtonVariant.success,
                label: 'F',
                onPressed: () {},
              ),
            ),
            actions: [
              WashFabLabeledAction(
                label: 'Camera',
                child: WashFabCircleButton(icon: 'camera', size: WashButtonSize.lg, onPressed: () {}),
              ),
              WashFabLabeledAction(
                label: 'Gallery',
                child: WashFabCircleButton(icon: 'image', size: WashButtonSize.lg, onPressed: () {}),
              ),
              WashFabLabeledAction(
                label: 'Voice',
                child: WashFabCircleButton(icon: 'mic', size: WashButtonSize.lg, onPressed: () {}),
              ),
            ],
          ),
        ),
        const WashFabClassLabel('fab + label wrapper + btn-circle'),
      ],
    );
  }

  static Widget _rectangleDial() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: 'Open',
              child: WashFabCircleButton(variant: WashButtonVariant.accent, onPressed: () {}),
            ),
            actions: [
              WashButton(label: 'New wash', size: WashButtonSize.lg, onPressed: () {}),
              WashButton(label: 'Import plate', size: WashButtonSize.lg, onPressed: () {}),
              WashButton(label: 'Share series', size: WashButtonSize.lg, onPressed: () {}),
            ],
          ),
        ),
        const WashFabClassLabel('fab + btn btn-lg (no circle on actions)'),
      ],
    );
  }

  static Widget _closeDial() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: 'Open',
              child: WashFabCircleButton(variant: WashButtonVariant.info, onPressed: () {}),
            ),
            close: WashFabClose(
              label: 'Close',
              child: WashFabCircleButton(
                variant: WashButtonVariant.error,
                icon: 'x',
                onPressed: () {},
              ),
            ),
            actions: [
              WashFabLabeledAction(label: 'Camera', child: WashFabCircleButton(icon: 'camera', size: WashButtonSize.lg, onPressed: () {})),
              WashFabLabeledAction(label: 'Gallery', child: WashFabCircleButton(icon: 'image', size: WashButtonSize.lg, onPressed: () {})),
              WashFabLabeledAction(label: 'Voice', child: WashFabCircleButton(icon: 'mic', size: WashButtonSize.lg, onPressed: () {})),
            ],
          ),
        ),
        const WashFabClassLabel('fab + fab-close + btn-error'),
      ],
    );
  }

  static Widget _mainDial() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: 'Open',
              child: WashFabCircleButton(variant: WashButtonVariant.primary, onPressed: () {}),
            ),
            mainActionSlot: WashFabMainAction(
              label: 'Compose',
              child: WashFabCircleButton(
                variant: WashButtonVariant.secondary,
                icon: 'pencil',
                size: WashButtonSize.lg,
                onPressed: () {},
              ),
            ),
            actions: [
              WashFabLabeledAction(label: 'Camera', child: WashFabCircleButton(icon: 'camera', size: WashButtonSize.lg, onPressed: () {})),
              WashFabLabeledAction(label: 'Gallery', child: WashFabCircleButton(icon: 'image', size: WashButtonSize.lg, onPressed: () {})),
              WashFabLabeledAction(label: 'File', child: WashFabCircleButton(icon: 'file-plus', size: WashButtonSize.lg, onPressed: () {})),
            ],
          ),
        ),
        const WashFabClassLabel('fab + fab-main-action'),
      ],
    );
  }

  static Widget _flowerDial({required bool mainAction}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            layout: WashFabLayout.flower,
            trigger: WashFabTooltip(
              message: 'Open',
              child: WashFabCircleButton(
                variant: mainAction ? WashButtonVariant.success : WashButtonVariant.primary,
                onPressed: () {},
              ),
            ),
            mainActionSlot: mainAction
                ? WashFabCircleButton(
                    variant: WashButtonVariant.defaultVariant,
                    label: 'M',
                    onPressed: () {},
                  )
                : null,
            actions: mainAction
                ? [
                    WashFabCircleButton(label: 'A', onPressed: () {}),
                    WashFabCircleButton(label: 'B', onPressed: () {}),
                    WashFabCircleButton(label: 'C', onPressed: () {}),
                    WashFabCircleButton(label: 'D', onPressed: () {}),
                  ]
                : [
                    WashFabCircleButton(label: 'A', onPressed: () {}),
                    WashFabCircleButton(label: 'B', onPressed: () {}),
                    WashFabCircleButton(label: 'C', onPressed: () {}),
                    WashFabCircleButton(label: 'D', onPressed: () {}),
                  ],
          ),
          height: 256,
          hint: mainAction ? 'Flower opens into a quarter circle' : 'Click or focus the FAB',
        ),
        WashFabClassLabel(
          mainAction ? 'fab fab-flower + fab-main-action' : 'fab fab-flower (no fab-main-action)',
        ),
      ],
    );
  }

  static Widget _flowerIcons() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            layout: WashFabLayout.flower,
            trigger: WashFabTooltip(
              message: 'New',
              child: WashFabCircleButton(onPressed: () {}),
            ),
            mainActionSlot: WashFabCircleButton(
              variant: WashButtonVariant.primary,
              icon: 'pencil',
              size: WashButtonSize.lg,
              onPressed: () {},
            ),
            actions: [
              WashFabTooltip(message: 'Camera', child: WashFabCircleButton(icon: 'camera', size: WashButtonSize.lg, onPressed: () {})),
              WashFabTooltip(message: 'List', child: WashFabCircleButton(icon: 'list', size: WashButtonSize.lg, onPressed: () {})),
              WashFabTooltip(message: 'Gallery', child: WashFabCircleButton(icon: 'image', size: WashButtonSize.lg, onPressed: () {})),
              WashFabTooltip(message: 'Voice', child: WashFabCircleButton(icon: 'mic', size: WashButtonSize.lg, onPressed: () {})),
            ],
          ),
          height: 256,
        ),
        const WashFabClassLabel('fab fab-flower + tooltip tooltip-left'),
      ],
    );
  }

  static Widget _colorsGrid() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: [
        for (final c in _colors)
          SizedBox(
            width: 200,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashFabStage(
                  height: 144,
                  hint: c.$1,
                  child: WashFab(
                    trigger: WashFabTooltip(
                      message: c.$1,
                      child: WashFabCircleButton(variant: c.$2, onPressed: () {}),
                    ),
                  ),
                ),
                WashFabClassLabel(
                  c.$2 == WashButtonVariant.defaultVariant
                      ? 'fab + btn btn-circle'
                      : 'fab + btn btn-circle btn-${c.$1.toLowerCase()}',
                ),
              ],
            ),
          ),
      ],
    );
  }

  static Widget _sizesRow() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final s in _sizes)
          Column(
            children: [
              WashFabTooltip(
                message: s.$1,
                child: WashFabCircleButton(
                  variant: WashButtonVariant.primary,
                  size: s.$2,
                  onPressed: () {},
                ),
              ),
              const SizedBox(height: 8),
              WashFabClassLabel('btn btn-circle ${s.$1.toLowerCase()}'),
            ],
          ),
      ],
    );
  }

  static Widget _stylesRow() {
    const styles = <(String, bool soft, bool outline, bool dash, bool ghost)>[
      ('Solid', false, false, false, false),
      ('Outline', false, true, false, false),
      ('Soft', true, false, false, false),
      ('Ghost', false, false, false, true),
      ('Dash', false, false, true, false),
    ];
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final s in styles)
          Column(
            children: [
              WashFabTooltip(
                message: s.$1,
                child: WashFabCircleButton(
                  variant: s.$3 ? WashButtonVariant.outline : WashButtonVariant.secondary,
                  soft: s.$2,
                  dash: s.$4,
                  ghost: s.$5,
                  icon: 'heart',
                  onPressed: () {},
                ),
              ),
              const SizedBox(height: 8),
              WashFabClassLabel(
                s.$1 == 'Solid'
                    ? 'btn btn-circle btn-secondary'
                    : 'btn btn-circle btn-secondary btn-${s.$1.toLowerCase()}',
              ),
            ],
          ),
      ],
    );
  }

  static Widget _mixedDial() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fabStage(
          WashFab(
            demoOpen: true,
            trigger: WashFabTooltip(
              message: 'Actions',
              child: WashFabCircleButton(variant: WashButtonVariant.neutral, onPressed: () {}),
            ),
            actions: [
              WashFabTooltip(
                message: 'Mail',
                child: WashFabCircleButton(variant: WashButtonVariant.info, icon: 'mail', onPressed: () {}),
              ),
              WashFabTooltip(
                message: 'Favorite',
                child: WashFabCircleButton(variant: WashButtonVariant.warning, icon: 'heart', onPressed: () {}),
              ),
              WashFabTooltip(
                message: 'Close menu',
                child: WashFabCircleButton(variant: WashButtonVariant.error, icon: 'x', onPressed: () {}),
              ),
            ],
          ),
        ),
        const WashFabClassLabel('fab + btn-info / btn-warning / btn-error actions'),
      ],
    );
  }

  static const _defaultDart = 'WashFabStage + WashFab + WashFabCircleButton';
  static const _speedDart = 'WashFab(demoOpen: true, actions: [...])';
  static const _iconsDart = 'WashFab + WashFabTooltip + WashLucideIcon actions';
  static const _labelsDart = 'WashFabLabeledAction + WashFabCircleButton';
  static const _rectDart = 'WashFab + WashButton (no circle) actions';
  static const _closeDart = 'WashFab + WashFabClose + btn-error';
  static const _mainDart = 'WashFab + WashFabMainAction';
  static const _flowerDart = 'WashFab(layout: WashFabLayout.flower)';
  static const _flowerOnlyDart = 'WashFab flower without mainAction';
  static const _flowerIconsDart = 'WashFab flower + WashFabTooltip';
  static const _colorsDart = 'WashFabStage grid + semantic WashFabCircleButton';
  static const _sizesDart = 'WashFabCircleButton size: WashButtonSize.*';
  static const _stylesDart = 'WashFabCircleButton soft/outline/ghost/dash';
  static const _mixedDart = 'WashFab multi-tone action buttons';
}
