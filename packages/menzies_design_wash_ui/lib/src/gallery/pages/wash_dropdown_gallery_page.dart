import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/dropdown/wash_dropdown.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../foundation/breakpoints.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_catalog.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashDropdownGalleryPage extends StatelessWidget {
  const WashDropdownGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Dropdown',
      description: 'daisyUI dropdown menus and panels.',
      sections: [
        _section(
          eyebrow: '01 · Basic',
          title: 'Button and menu',
          description: 'CSS focus dropdown: open on focus or click',
          preview: _basicMenu(),
          dart: _basicMenuDart,
        ),
        WashGallerySection(
          eyebrow: '02 · Alignments',
          title: 'Vertical-first placement',
          description:
              'Prefer dropdown-bottom / dropdown-top and dropdown-end near edges',
          tint: WashGalleryPanelTint.ochre,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Wrap(
                spacing: 24,
                runSpacing: 16,
                children: [
                  _alignmentTab('Align end', WashDropdownAlign.end, 'dropdown-end'),
                  _alignmentTab('Open top', WashDropdownAlign.top, 'dropdown-top'),
                  _alignmentTab('Open bottom', WashDropdownAlign.bottom, 'dropdown-bottom'),
                ],
              ),
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.only(top: 16),
                decoration: BoxDecoration(
                  border: Border(
                    top: BorderSide(
                      color: WashTokens.of(context).inkBorder.withValues(alpha: 0.5),
                    ),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Demo only: dropdown-left / dropdown-right open beside the trigger.',
                      style: WashTypography.label(WashTokens.of(context).inkMuted)
                          .copyWith(fontSize: 12),
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 24,
                      runSpacing: 16,
                      children: [
                        _alignmentTab('Open left', WashDropdownAlign.left, 'dropdown-left'),
                        _alignmentTab('Open right', WashDropdownAlign.right, 'dropdown-right'),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        _section(
          eyebrow: '03 · Hover',
          title: 'Open on hover (Wash default)',
          description:
              'Wash opens menu dropdowns on hover for fine pointers, with a ~200ms close delay so you can reach the panel. daisyUI dropdown-hover still works; plain dropdown gets the same behaviour. Opt out with dropdown-no-hover.',
          preview: WashDropdown(
            hoverOpen: true,
            trigger: const WashDropdownTriggerButton(label: 'Hover me'),
            panel: WashDropdownMenuPanel(
              items: washStandardPigmentMenuItems(),
            ),
          ),
          dart: _hoverDart,
        ),
        WashGallerySection(
          eyebrow: '04 · Card content',
          title: 'Non-menu panel',
          description: 'Any element can be dropdown-content',
          tint: WashGalleryPanelTint.rose,
          child: Wrap(
            spacing: 24,
            runSpacing: 16,
            crossAxisAlignment: WrapCrossAlignment.start,
            children: [
              WashShowcaseTabs(
                preview: WashDropdown(
                  trigger: const WashDropdownTriggerButton(label: 'Wash tip'),
                  panel: const WashDropdownCardPanel(
                    title: 'Layering washes',
                    body:
                        'Let each wash dry before the next pass so pigments stay luminous instead of muddy.',
                  ),
                ),
                dartSource: _washTipDart,
              ),
              WashShowcaseTabs(
                preview: _paperToothTip(),
                dartSource: _paperTipDart,
              ),
            ],
          ),
        ),
        _section(
          eyebrow: '05 · Details',
          title: 'Native details pattern',
          description: 'details and summary toggle without focus tricks',
          preview: WashDetailsDropdown(
            summary: WashDropdownTriggerButton(
              label: 'Open details',
              showChevron: true,
            ),
            panel: WashDropdownMenuPanel(
              items: washStandardPigmentMenuItems(),
            ),
          ),
          dart: _detailsDart,
        ),
        WashGallerySection(
          eyebrow: '06 · Studio',
          title: 'Pigment and tool picker',
          description: 'ThemeSwitcher-style details dropdown',
          child: WashShowcaseTabs(
            preview: const _StudioPickerDemo(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Overflow',
          title: 'Vertical overflow near edges',
          description:
              'Measure the viewport on open: apply dropdown-end near the right edge',
          tint: WashGalleryPanelTint.ochre,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: WashTokens.of(context).surfaceContainer.withValues(alpha: 0.3),
                    border: Border.all(
                      color: WashTokens.of(context).inkBorder.withValues(alpha: 0.6),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Wrap(
                          spacing: 16,
                          runSpacing: 16,
                          alignment: WrapAlignment.spaceBetween,
                          children: [
                            WashShowcaseTabs(
                              preview: WashDropdown(
                                align: WashDropdownAlign.end,
                                trigger: const WashDropdownTriggerButton(
                                  label: 'Near right',
                                  size: WashButtonSize.sm,
                                  margin: false,
                                ),
                                panel: WashDropdownMenuPanel(
                                  items: washStandardPigmentMenuItems(),
                                ),
                              ),
                              dartSource: _nearRightDart,
                            ),
                            WashShowcaseTabs(
                              preview: WashDropdown(
                                measureViewport: true,
                                noHover: true,
                                trigger: const WashDropdownTriggerButton(
                                  label: 'Edge-safe menu',
                                  size: WashButtonSize.sm,
                                  showChevron: true,
                                  margin: false,
                                ),
                                panel: WashDropdownMenuPanel(
                                  items: washStandardPigmentMenuItems(),
                                ),
                              ),
                              dartSource: _edgeSafeDart,
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Align(
                          alignment: Alignment.centerRight,
                          child: Padding(
                            padding: const EdgeInsets.only(top: 48),
                            child: WashShowcaseTabs(
                              preview: WashDropdown(
                                align: WashDropdownAlign.topEnd,
                                trigger: const WashDropdownTriggerButton(
                                  label: 'Near bottom',
                                  size: WashButtonSize.sm,
                                  margin: false,
                                ),
                                panel: WashDropdownMenuPanel(
                                  maxHeight: 160,
                                  items: washStandardPigmentMenuItems(),
                                ),
                              ),
                              dartSource: _nearBottomDart,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Demo shell uses overflow-hidden. Edge-safe menu measures the viewport and flips vertically.',
                style: WashTypography.label(WashTokens.of(context).inkMuted)
                    .copyWith(fontSize: 12),
              ),
            ],
          ),
        ),
        _section(
          eyebrow: '08 · Responsive',
          title: 'Stack on small screens',
          description: 'Triggers wrap and stretch on narrow viewports',
          preview: _responsiveRow(context),
          dart: _responsiveDart,
        ),
        _section(
          eyebrow: '09 · Forced open (demo)',
          title: 'dropdown-open labeled',
          description: 'Force-open is for demos only',
          tint: WashGalleryPanelTint.rose,
          preview: WashDropdown(
            forceOpen: true,
            trigger: Opacity(
              opacity: 0.8,
              child: WashDropdownTriggerButton(
                label: 'Forced open',
                margin: true,
              ),
            ),
            panel: WashDropdownMenuPanel(
              items: const [
                WashDropdownMenuItem(label: 'Demo item A', enabled: false),
                WashDropdownMenuItem(label: 'Demo item B', enabled: false),
              ],
            ),
          ),
          dart: _forcedOpenDart,
        ),
      ],
    );
  }

  static Widget _section({
    required String eyebrow,
    required String title,
    required String description,
    required Widget preview,
    required String dart,
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: description,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _basicMenu() {
    return WashDropdown(
      trigger: const WashDropdownTriggerButton(
        label: 'Open menu',
        showChevron: true,
      ),
      panel: WashDropdownMenuPanel(
        items: washStandardPigmentMenuItems(),
      ),
    );
  }

  static const _basicMenuDart = '''
WashDropdown(
  trigger: WashDropdownTriggerButton(label: 'Open menu', showChevron: true),
  panel: WashDropdownMenuPanel(items: washStandardPigmentMenuItems()),
)''';

  static const _hoverDart = '''
WashDropdown(
  hoverOpen: true,
  trigger: WashDropdownTriggerButton(label: 'Hover me'),
  panel: WashDropdownMenuPanel(items: washStandardPigmentMenuItems()),
)''';

  static const _washTipDart = '''
WashDropdown(
  trigger: WashDropdownTriggerButton(label: 'Wash tip'),
  panel: WashDropdownCardPanel(
    title: 'Layering washes',
    body: 'Let each wash dry before the next pass…',
  ),
)''';

  static Widget _paperToothTip() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text('Paper tooth'),
        const SizedBox(width: 8),
        WashDropdown(
          align: WashDropdownAlign.end,
          trigger: WashTooltip(
            message: 'More about paper',
            prefer: WashTooltipSide.left,
            child: WashButton(
              size: WashButtonSize.xs,
              circle: true,
              variant: WashButtonVariant.info,
              onPressed: () {},
              child: const WashIcon(WashIconGlyph.info, size: 14),
            ),
          ),
          panel: const WashDropdownCardPanel(
            title: 'Cold press',
            body:
                'Slight tooth holds pigment without fighting soft edges.',
            compact: true,
          ),
        ),
      ],
    );
  }

  static const _paperTipDart = '''
WashDropdown(
  align: WashDropdownAlign.end,
  trigger: WashTooltip(
    message: 'More about paper',
    child: WashButton(circle: true, variant: WashButtonVariant.info, …),
  ),
  panel: WashDropdownCardPanel(title: 'Cold press', compact: true, …),
)''';

  static const _detailsDart = '''
WashDetailsDropdown(
  summary: WashDropdownTriggerButton(label: 'Open details', showChevron: true),
  panel: WashDropdownMenuPanel(items: washStandardPigmentMenuItems()),
)''';

  static const _studioDart = '''
const _StudioPickerDemo(); // pigment + tool details dropdown''';

  static const _nearRightDart = '''
WashDropdown(
  align: WashDropdownAlign.end,
  trigger: WashDropdownTriggerButton(label: 'Near right', size: WashButtonSize.sm),
  panel: WashDropdownMenuPanel(items: washStandardPigmentMenuItems()),
)''';

  static const _edgeSafeDart = '''
WashDropdown(
  measureViewport: true,
  noHover: true,
  trigger: WashDropdownTriggerButton(label: 'Edge-safe menu', showChevron: true),
  panel: WashDropdownMenuPanel(items: washStandardPigmentMenuItems()),
)''';

  static const _nearBottomDart = '''
WashDropdown(
  align: WashDropdownAlign.topEnd,
  panel: WashDropdownMenuPanel(maxHeight: 160, items: …),
)''';

  static Widget _responsiveRow(BuildContext context) {
    final phone = WashBreakpoints.of(context).isPhone;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashDropdown(
          trigger: WashDropdownTriggerButton(
            label: 'Series',
            showChevron: true,
            block: phone,
            margin: false,
          ),
          panel: WashDropdownMenuPanel(
            width: phone ? 320 : kWashDropdownMenuWidth,
            items: washStandardPigmentMenuItems(),
          ),
        ),
        const SizedBox(height: 12),
        WashDropdown(
          align: WashDropdownAlign.end,
          trigger: WashDropdownTriggerButton(
            label: 'Format',
            variant: WashButtonVariant.ghost,
            block: phone,
            margin: false,
          ),
          panel: WashDropdownMenuPanel(
            width: phone ? 320 : kWashDropdownMenuWidth,
            items: const [
              WashDropdownMenuItem(label: 'Portrait plate'),
              WashDropdownMenuItem(label: 'Landscape wash'),
            ],
          ),
        ),
        const SizedBox(height: 12),
        const WashGalleryMonoLabel(
          'w-full sm:w-auto · dropdown-end · max-w viewport',
        ),
      ],
    );
  }

  static const _responsiveDart = '''
LayoutBuilder / WashBreakpoints: full-width triggers on phone, w-52 panels on desktop.''';

  static const _forcedOpenDart = '''
WashDropdown(
  forceOpen: true,
  trigger: WashDropdownTriggerButton(label: 'Forced open'),
  panel: WashDropdownMenuPanel(items: demoMutedItems),
)''';

  static Widget _alignmentTab(String tip, WashDropdownAlign align, String className) {
    return WashShowcaseTabs(
      preview: WashDropdown(
        align: align,
        trigger: WashDropdownTriggerButton(
          label: tip,
          size: WashButtonSize.sm,
        ),
        panel: WashDropdownMenuPanel(
          items: washStandardPigmentMenuItems(),
        ),
      ),
      dartSource: "WashDropdown(align: WashDropdownAlign.$className, …)",
    );
  }
}

class _StudioPickerDemo extends StatefulWidget {
  const _StudioPickerDemo();

  @override
  State<_StudioPickerDemo> createState() => _StudioPickerDemoState();
}

class _StudioPickerDemoState extends State<_StudioPickerDemo> {
  String _pigment = 'Ultramarine';
  String _tool = 'Round brush';

  static const _pigments = ['Ultramarine', 'Yellow ochre', 'Alizarin', 'Viridian'];
  static const _tools = <(String, String)>[
    ('Round brush', 'paintbrush'),
    ('Pencil', 'pencil'),
    ('Wash dropper', 'droplets'),
    ('Kneaded eraser', 'eraser'),
  ];

  String _toolIcon(String label) {
    return _tools.firstWhere((t) => t.$1 == label, orElse: () => ('', 'paintbrush')).$2;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final wide = MediaQuery.sizeOf(context).width >= WashTailwindBreakpoints.sm;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Flex(
          direction: wide ? Axis.horizontal : Axis.vertical,
          crossAxisAlignment: wide ? CrossAxisAlignment.start : CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            WashDetailsDropdown(
              measureViewport: true,
              panelSizeEstimate: const Size(288, 360),
              summary: WashButton(
                onPressed: () {},
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    washPigmentSwatch(_pigment, size: 14),
                    const SizedBox(width: 8),
                    WashLucideIcon(_toolIcon(_tool), size: 16, strokeWidth: 2),
                    const SizedBox(width: 8),
                    Text(_pigment, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                    const SizedBox(width: 6),
                    WashIcon(
                      WashIconGlyph.chevronDown,
                      size: 16,
                      color: tokens.onSurface.withValues(alpha: 0.7),
                    ),
                  ],
                ),
              ),
              panel: SizedBox(
                width: 288,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: tokens.surface,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: tokens.inkBorder),
                    boxShadow: washPaperShadowSm(tokens),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const WashGalleryLabelInk('Pigment'),
                        const SizedBox(height: 8),
                        ..._pigments.map(
                          (p) => _studioRow(
                            context,
                            p,
                            active: p == _pigment,
                            leading: washPigmentSwatch(p),
                            onTap: () => setState(() => _pigment = p),
                          ),
                        ),
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 8),
                          child: WashDivider(),
                        ),
                        const WashGalleryLabelInk('Tool'),
                        const SizedBox(height: 8),
                        ..._tools.map(
                          (t) => _studioRow(
                            context,
                            t.$1,
                            active: t.$1 == _tool,
                            leading: WashLucideIcon(t.$2, size: 16, strokeWidth: 2),
                            onTap: () => setState(() => _tool = t.$1),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            if (wide) const SizedBox(width: 16),
            if (!wide) const SizedBox(height: 12),
            Text(
              'Active wash: $_pigment · $_tool',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const WashGalleryMonoLabel(
          'details · dropdown-top/end from measure · pigment + tool',
        ),
      ],
    );
  }

  static Widget _studioRow(
    BuildContext context,
    String label, {
    required bool active,
    required Widget leading,
    required VoidCallback onTap,
  }) {
    final tokens = WashTokens.of(context);
    return WashRipple(
      onTap: onTap,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: active ? tokens.primary.withValues(alpha: 0.14) : null,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            children: [
              leading,
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  label,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              if (active)
                WashIcon(WashIconGlyph.check, size: 16, color: tokens.primary),
            ],
          ),
        ),
      ),
    );
  }
}

/// Small mono class label under demos.
class WashGalleryMonoLabel extends StatelessWidget {
  const WashGalleryMonoLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: TextStyle(
        fontFamily: 'monospace',
        fontSize: 10,
        color: WashTokens.of(context).inkMuted,
      ),
    );
  }
}
