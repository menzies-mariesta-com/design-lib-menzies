import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/card/wash_card.dart';
import '../../components/input/wash_input.dart';
import '../../components/join/wash_join.dart';
import '../../components/label/wash_label.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashLabelGalleryPage extends StatelessWidget {
  const WashLabelGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Label',
      description:
          'daisyUI label and floating-label and floating-label for naming fields, helpers, and control captions.',
      sections: [
        _s(
            '01 · Basic',
            'Label and input',
            'Stacked label above a text field, linked with htmlFor and id',
            _basic(),
            _basicDart),
        _s(
            '02 · Helper',
            'Helper and alt text',
            'Primary label above; daisyUI label helper below',
            const _HelperDemo(),
            _helperDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Required',
            'Required field asterisk',
            'Error-colored asterisk beside the label text, paired',
            _required(),
            _requiredDart),
        _s(
            '04 · Floating',
            'Floating label',
            'floating-label lifts the caption when the field is focused',
            const _FloatingDemo(),
            _floatingDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Controls',
            'Checkbox, toggle, and radio',
            'Wrap controls in label so the caption is clickable',
            const _ControlsDemo(),
            _controlsDart),
        _s(
            '06 · Studio form',
            'Wash recipe labels',
            'Create form with required asterisks, helpers, and a primary title',
            const _StudioFormDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · Responsive',
            'Breakpoint-aware floating labels',
            'Stacks on small screens; floating fields grow from xs to xl across',
            const _ResponsiveDemo(),
            _responsiveDart,
            tint: WashGalleryPanelTint.rose),
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

  static Widget _basic() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 448),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const WashFieldLabel(text: 'Plate title'),
              const SizedBox(height: 8),
              WashInput(hint: 'Coastal fog', semanticLabel: 'Plate title'),
            ],
          ),
        ),
        const WashLabelClassLabel('label + input'),
      ],
    );
  }

  static Widget _required() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 448),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const WashFieldLabel(text: 'Pigment', requiredMark: true),
                  const SizedBox(height: 8),
                  WashInput(
                    hint: 'Ultramarine',
                    tone: WashInputTone.primary,
                    semanticLabel: 'Pigment',
                  ),
                  const WashLabelClassLabel('label + text-error * + required'),
                ],
              ),
              const SizedBox(height: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const WashFieldLabel(text: 'Notes'),
                  const SizedBox(height: 8),
                  const WashInput(hint: 'Optional glaze notes'),
                  const WashLabelHelper('Optional fields omit the asterisk'),
                  const WashLabelClassLabel('label (optional, no asterisk)'),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  static const _basicDart = '''
WashFieldLabel(text: 'Plate title');
WashInput(hint: 'Coastal fog', semanticLabel: 'Plate title');
''';

  static const _helperDart =
      'WashFieldLabel + WashLabelHelper + WashInputAffixField';

  static const _requiredDart =
      'WashFieldLabel(requiredMark: true) + WashInput(tone: primary)';

  static const _floatingDart =
      'WashFloatingLabel(caption: ..., fieldBuilder: ...)';

  static const _controlsDart =
      'WashControlLabel + WashDaisyCheckbox / Toggle / Radio';

  static const _studioDart =
      'WashCard + WashFieldLabel + WashFloatingLabel + controls';

  static const _responsiveDart =
      'LayoutBuilder + WashFloatingLabel + responsive WashInput sizes';
}

class _HelperDemo extends StatelessWidget {
  const _HelperDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 512),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Row(
                    children: [
                      Expanded(child: WashFieldLabel(text: 'Series name')),
                      WashLabelOptionalHint('Optional'),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const WashInput(hint: 'Atlantic Studies'),
                  const WashLabelHelper('Shown on shared plate sheets'),
                  const WashLabelClassLabel(
                      'label + label-text + p.label helper'),
                ],
              ),
              const SizedBox(height: 24),
              WashInputAffixField(
                prefix: 'https://',
                child: WashInput(
                  hint: 'menzies.design',
                  expanded: false,
                  semanticLabel: 'Studio URL',
                  decorated: false,
                ),
              ),
              const WashLabelClassLabel('input + span.label prefix'),
              const SizedBox(height: 16),
              WashInputAffixField(
                suffix: '.studio',
                child: WashInput(
                  hint: 'menzies',
                  expanded: false,
                  semanticLabel: 'Domain name',
                  decorated: false,
                ),
              ),
              const WashLabelClassLabel('input + span.label suffix'),
              const SizedBox(height: 16),
              WashInputAffixField(
                prefix: 'Type',
                child: WashJoinSelect<String>(
                  value: 'personal',
                  joinItem: false,
                  placeholder: 'Account type',
                  options: const [
                    WashJoinSelectOption(value: 'personal', label: 'Personal'),
                    WashJoinSelectOption(value: 'business', label: 'Studio'),
                  ],
                  onChanged: (_) {},
                ),
              ),
              const WashLabelClassLabel('select + span.label'),
            ],
          ),
        ),
      ],
    );
  }
}

class _FloatingDemo extends StatelessWidget {
  const _FloatingDemo();

  static const _sizes = <(WashInputSize, String)>[
    (WashInputSize.xs, 'XS'),
    (WashInputSize.sm, 'SM'),
    (WashInputSize.md, 'MD'),
    (WashInputSize.lg, 'LG'),
    (WashInputSize.xl, 'XL'),
  ];

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          WashFloatingLabel(
            caption: 'Studio email',
            fieldBuilder: (focus, onChanged) => WashInput(
              focusNode: focus,
              hint: 'you@menzies.design',
              onChanged: onChanged,
            ),
          ),
          const WashLabelClassLabel('floating-label + input'),
          const SizedBox(height: 16),
          WashFloatingLabel(
            caption: 'Recipe name',
            requiredMark: true,
            fieldBuilder: (focus, onChanged) => WashInput(
              focusNode: focus,
              hint: 'Cerulean glaze',
              tone: WashInputTone.primary,
              onChanged: onChanged,
            ),
          ),
          const WashLabelClassLabel('floating-label + required *'),
          const SizedBox(height: 16),
          for (final (size, name) in _sizes) ...[
            WashFloatingLabel(
              caption: name,
              fieldBuilder: (focus, onChanged) => WashInput(
                focusNode: focus,
                hint: name,
                size: size,
                tone: WashInputTone.primary,
                onChanged: onChanged,
              ),
            ),
            WashLabelClassLabel(
                'floating-label + input ${washInputClassLabel(tone: WashInputTone.primary, size: size)}'),
            const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

class _ControlsDemo extends StatefulWidget {
  const _ControlsDemo();

  @override
  State<_ControlsDemo> createState() => _ControlsDemoState();
}

class _ControlsDemoState extends State<_ControlsDemo> {
  var _bloom = true;
  var _lock = false;
  var _grid = true;
  var _snap = false;
  var _paper = 'cold';

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 1024;
        final mid = constraints.maxWidth >= 640;
        final cols = wide ? 3 : (mid ? 2 : 1);
        final colWidth = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - (cols - 1) * 24) / cols;

        return Wrap(
          spacing: 24,
          runSpacing: 24,
          children: [
            SizedBox(
              width: colWidth,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashControlLabel(
                    control: WashDaisyCheckbox(
                      value: _bloom,
                      primary: true,
                      onChanged: (v) => setState(() => _bloom = v),
                    ),
                    caption: 'Allow wet-on-wet bloom',
                    onTap: () => setState(() => _bloom = !_bloom),
                  ),
                  WashControlLabel(
                    control: WashDaisyCheckbox(
                      value: _lock,
                      onChanged: (v) => setState(() => _lock = v),
                    ),
                    caption: 'Lock layer after dry',
                    onTap: () => setState(() => _lock = !_lock),
                  ),
                  const WashLabelClassLabel('label + checkbox + label-text'),
                ],
              ),
            ),
            SizedBox(
              width: colWidth,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashControlLabel(
                    control: WashDaisyToggle(
                      value: _grid,
                      primary: true,
                      onChanged: (v) => setState(() => _grid = v),
                    ),
                    caption: 'Show grid overlay',
                    onTap: () => setState(() => _grid = !_grid),
                  ),
                  WashControlLabel(
                    control: WashDaisyToggle(
                      value: _snap,
                      onChanged: (v) => setState(() => _snap = v),
                    ),
                    caption: 'Snap to wash guides',
                    onTap: () => setState(() => _snap = !_snap),
                  ),
                  const WashLabelClassLabel('label + toggle + label-text'),
                ],
              ),
            ),
            SizedBox(
              width: colWidth,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final (id, label) in [
                    ('cold', 'Cold press'),
                    ('hot', 'Hot press'),
                    ('rough', 'Rough'),
                  ])
                    WashControlLabel(
                      control: WashDaisyRadio(
                        value: id,
                        groupValue: _paper,
                        onChanged: (v) => setState(() => _paper = v),
                      ),
                      caption: label,
                      onTap: () => setState(() => _paper = id),
                    ),
                  const WashLabelClassLabel('label + radio + label-text'),
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}

class _StudioFormDemo extends StatefulWidget {
  const _StudioFormDemo();

  @override
  State<_StudioFormDemo> createState() => _StudioFormDemoState();
}

class _StudioFormDemoState extends State<_StudioFormDemo> {
  var _bloom = true;
  String? _dilution;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 576),
            child: WashCard(
              body: WashCardBody(
                children: [
                  Text(
                    'Add wash recipe',
                    style: WashTypography.title(tokens.primary)
                        .copyWith(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  const WashFieldLabel(text: 'Pigment', requiredMark: true),
                  const SizedBox(height: 8),
                  WashInput(hint: 'Ultramarine', tone: WashInputTone.primary),
                  const SizedBox(height: 16),
                  const WashFieldLabel(text: 'Dilution', requiredMark: true),
                  const SizedBox(height: 8),
                  WashJoinSelect<String>(
                    value: _dilution,
                    joinItem: false,
                    placeholder: 'Pick dilution…',
                    options: const [
                      WashJoinSelectOption(value: 'glaze', label: 'Glaze'),
                      WashJoinSelectOption(value: 'wash', label: 'Wash'),
                      WashJoinSelectOption(value: 'body', label: 'Body color'),
                    ],
                    onChanged: (v) => setState(() => _dilution = v),
                  ),
                  const SizedBox(height: 16),
                  WashFloatingLabel(
                    caption: 'Paper weight',
                    fieldBuilder: (focus, onChanged) => WashInput(
                      focusNode: focus,
                      hint: '300 gsm cold press',
                      onChanged: onChanged,
                    ),
                  ),
                  const WashLabelHelper('Optional. Defaults to studio stock.'),
                  const SizedBox(height: 12),
                  WashControlLabel(
                    control: WashDaisyCheckbox(
                      value: _bloom,
                      primary: true,
                      onChanged: (v) => setState(() => _bloom = v),
                    ),
                    caption: 'Allow wet-on-wet bloom',
                    onTap: () => setState(() => _bloom = !_bloom),
                  ),
                  const WashLabelHelper('Asterisk marks required fields'),
                  const SizedBox(height: 16),
                  Wrap(
                    alignment: WrapAlignment.end,
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      WashButton(
                        label: 'Cancel',
                        variant: WashButtonVariant.ghost,
                        onPressed: () {},
                      ),
                      WashButton(
                        label: 'Save recipe',
                        variant: WashButtonVariant.primary,
                        onPressed: () {},
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const WashLabelClassLabel(
            'card-title text-primary + label + floating-label'),
      ],
    );
  }
}

class _ResponsiveDemo extends StatefulWidget {
  const _ResponsiveDemo();

  @override
  State<_ResponsiveDemo> createState() => _ResponsiveDemoState();
}

class _ResponsiveDemoState extends State<_ResponsiveDemo> {
  final _notes =
      TextEditingController(text: 'Cool wash over warm underpainting');
  String _status = 'drying';

  @override
  void dispose() {
    _notes.dispose();
    super.dispose();
  }

  WashInputSize _inputSizeFor(double width) {
    if (width >= 1280) return WashInputSize.xl;
    if (width >= 1024) return WashInputSize.lg;
    if (width >= 768) return WashInputSize.md;
    if (width >= 640) return WashInputSize.sm;
    return WashInputSize.xs;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final stacked = constraints.maxWidth < 768;
        final inputSize = _inputSizeFor(constraints.maxWidth);
        DecoratedBox panel(Widget child) => DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(tokens.radiusBox),
                border: Border.all(
                    color: tokens.palette.neutral.withValues(alpha: 0.25)),
                color: tokens.surfaceContainer,
              ),
              child: Padding(padding: const EdgeInsets.all(16), child: child),
            );

        final left = panel(
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashFloatingLabel(
                caption: 'Plate title',
                fieldBuilder: (focus, onChanged) => WashInput(
                  focusNode: focus,
                  hint: 'Plate title',
                  initialValue: 'Evening tide',
                  size: inputSize,
                  onChanged: onChanged,
                ),
              ),
              const SizedBox(height: 12),
              WashFloatingLabel(
                caption: 'Notes',
                fieldBuilder: (focus, onChanged) => WashInput(
                  focusNode: focus,
                  controller: _notes,
                  hint: 'Notes',
                  maxLines: 3,
                  size: inputSize,
                  onChanged: onChanged,
                ),
              ),
              const WashLabelClassLabel(
                  'floating-label + responsive input/textarea sizes'),
            ],
          ),
        );

        final right = DecoratedBox(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder),
            color: tokens.surface.withValues(alpha: 0.8),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                WashFloatingLabel(
                  caption: 'Status',
                  fieldBuilder: (focus, onChanged) => WashJoinSelect<String>(
                    value: _status,
                    joinItem: false,
                    options: const [
                      WashJoinSelectOption(value: 'draft', label: 'Draft'),
                      WashJoinSelectOption(value: 'drying', label: 'Drying'),
                      WashJoinSelectOption(
                          value: 'varnished', label: 'Varnished'),
                    ],
                    onChanged: (v) => setState(() => _status = v ?? 'drying'),
                  ),
                ),
                const SizedBox(height: 12),
                const WashFieldLabel(text: 'Tags'),
                const SizedBox(height: 8),
                const WashInput(hint: 'coastal, fog, cool'),
                const WashLabelHelper('Comma-separated pigment tags'),
                const WashLabelClassLabel(
                    'floating-label select + stacked label'),
              ],
            ),
          ),
        );

        if (stacked) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              left,
              const SizedBox(height: 16),
              right,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: left),
            const SizedBox(width: 16),
            Expanded(child: right),
          ],
        );
      },
    );
  }
}
