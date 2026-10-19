import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/input/wash_input.dart';
import '../../components/label/wash_label.dart';
import '../../components/snackbar/wash_snackbar.dart';
import '../../components/tags_input/wash_tags_input.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

const _pigmentSuggestions = <String>[
  'Ultramarine',
  'Cobalt blue',
  'Cerulean',
  'Yellow ochre',
  'Burnt sienna',
  'Quinacridone rose',
  'Viridian',
  'Sap green',
  'Alizarin crimson',
  "Payne's gray",
];

const _washSuggestions = <String>[
  'Wet-on-wet',
  'Dry brush',
  'Glaze',
  'Bloom',
  'Lift',
  'Granulating',
  'Opaque',
];

const _colorVariants = <(String, WashInputTone, WashBadgeTone)>[
  ('Default', WashInputTone.defaultTone, WashBadgeTone.defaultTone),
  ('Primary', WashInputTone.primary, WashBadgeTone.primary),
  ('Secondary', WashInputTone.secondary, WashBadgeTone.secondary),
  ('Accent', WashInputTone.accent, WashBadgeTone.accent),
  ('Info', WashInputTone.info, WashBadgeTone.info),
  ('Success', WashInputTone.success, WashBadgeTone.success),
  ('Warning', WashInputTone.warning, WashBadgeTone.warning),
  ('Error', WashInputTone.error, WashBadgeTone.error),
];

const _sizeVariants = <(String, WashInputSize, WashBadgeSize)>[
  ('XS', WashInputSize.xs, WashBadgeSize.xs),
  ('SM', WashInputSize.sm, WashBadgeSize.sm),
  ('MD', WashInputSize.md, WashBadgeSize.md),
  ('LG', WashInputSize.lg, WashBadgeSize.lg),
];

class WashTagsInputGalleryPage extends StatelessWidget {
  const WashTagsInputGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Tags input',
      description:
          'Compose daisyUI input with badge chips to add and remove tags.',
      sections: [
        _s('01 · Basic', 'Type and commit', 'Enter or comma adds a tag', const _BasicTagsDemo(), _basicDart),
        _s('02 · Dismissible', 'Remove from each tag', 'Icon-only dismiss with tooltip-error matching btn-error', const _DismissibleTagsDemo(), _dismissibleDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Suggestions', 'Pigment and wash hints', 'Optional datalist or menu of studio suggestions', const _SuggestionsDemo(), _suggestionsDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Sizes and colors', 'Input and badge variants', 'daisyUI input and badge color and size modifiers on the same field', const _SizesColorsDemo(), _sizesColorsDart),
        _s('05 · Limits', 'Max tags and duplicates', 'Cap the list and block repeated labels with quiet feedback', const _LimitsDemo(), _limitsDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Studio', 'Plate labels', 'Pigment tags and wash labels on a watercolor plate', const _StudioPlateDemo(), _studioDart, tint: WashGalleryPanelTint.blue),
        _s('07 · Required', 'Form with tags', 'Required asterisk, validation, and bottom-right toast on save', const _RequiredFormDemo(), _requiredDart, tint: WashGalleryPanelTint.rose),
        _s('08 · Responsive', 'Wrapping field', 'Long tag sets wrap inside the input shell on small screens', const _ResponsiveWrapDemo(), _responsiveDart),
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

  static const _basicDart = '''
WashTagsInput(
  tags: tags,
  onChanged: setTags,
  placeholder: 'Type a pigment, press Enter',
  badgeTone: WashBadgeTone.primary,
  badgeStyle: WashBadgeStyle.soft,
);
''';

  static const _dismissibleDart = '''
WashTagsInput(
  tags: tags,
  onChanged: setTags,
  dismissible: true,
  placeholder: 'Add wash label…',
  badgeTone: WashBadgeTone.secondary,
  badgeStyle: WashBadgeStyle.soft,
);
''';

  static const _suggestionsDart = '''
WashTagsInput(
  dismissible: true,
  suggestions: pigmentSuggestions,
  suggestionMode: WashTagsInputSuggestionMode.datalist,
  badgeTone: WashBadgeTone.info,
);
WashTagsInput(
  dismissible: true,
  suggestions: washSuggestions,
  suggestionMode: WashTagsInputSuggestionMode.menu,
  badgeTone: WashBadgeTone.accent,
  badgeStyle: WashBadgeStyle.outline,
);
''';

  static const _sizesColorsDart = '''
WashTagsInput(
  tone: WashInputTone.primary,
  badgeTone: WashBadgeTone.primary,
  badgeStyle: WashBadgeStyle.soft,
  dismissible: true,
);
WashTagsInput(
  size: WashInputSize.sm,
  badgeSize: WashBadgeSize.sm,
  badgeTone: WashBadgeTone.primary,
  dismissible: true,
);
''';

  static const _limitsDart = '''
WashTagsInput(
  maxTags: 4,
  dismissible: true,
  onLimitHit: () {},
);
WashTagsInput(
  dismissible: true,
  onDuplicate: (tag) {},
);
''';

  static const _studioDart = '''
WashTagsInput(
  suggestions: pigmentSuggestions,
  suggestionMode: WashTagsInputSuggestionMode.menu,
  badgeTone: WashBadgeTone.info,
  dismissible: true,
);
WashTagsInput(
  suggestions: washSuggestions,
  suggestionMode: WashTagsInputSuggestionMode.datalist,
  badgeTone: WashBadgeTone.primary,
  badgeStyle: WashBadgeStyle.outline,
  dismissible: true,
);
''';

  static const _requiredDart = '''
WashFieldLabel(text: 'Tags', requiredMark: true);
WashTagsInput(
  invalid: tags.isEmpty,
  dismissible: true,
);
WashButton(label: 'Save plate', onPressed: save);
''';

  static const _responsiveDart = '''
WashTagsInput(
  tags: longList,
  dismissible: true,
  badgeStyle: WashBadgeStyle.soft,
);
''';
}

class _Sample extends StatelessWidget {
  const _Sample({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        WashTagsInputClassLabel(label),
      ],
    );
  }
}

class _TwoCol extends StatelessWidget {
  const _TwoCol({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        if (w < 1024) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) const SizedBox(height: 24),
                children[i],
              ],
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (var i = 0; i < children.length; i++) ...[
              if (i > 0) const SizedBox(width: 24),
              Expanded(child: children[i]),
            ],
          ],
        );
      },
    );
  }
}

class _Grid extends StatelessWidget {
  const _Grid({required this.children, this.xlCols = 4, this.smCols = 2});

  final List<Widget> children;
  final int xlCols;
  final int smCols;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth.isFinite ? constraints.maxWidth : 360.0;
        final cols = w >= 1280 ? xlCols : (w >= 640 ? smCols : 1);
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            for (final child in children)
              SizedBox(
                width: cols == 1 ? w : (w - 16 * (cols - 1)) / cols,
                child: child,
              ),
          ],
        );
      },
    );
  }
}

class _BasicTagsDemo extends StatefulWidget {
  const _BasicTagsDemo();

  @override
  State<_BasicTagsDemo> createState() => _BasicTagsDemoState();
}

class _BasicTagsDemoState extends State<_BasicTagsDemo> {
  var _tags = ['Ultramarine', 'Glaze'];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Sample(
      label: 'input + badge · Enter / comma · Backspace',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashTagsInput(
            tags: _tags,
            onChanged: (next) => setState(() => _tags = next),
            placeholder: 'Type a pigment, press Enter',
            semanticLabel: 'Basic tags',
            badgeTone: WashBadgeTone.primary,
            badgeStyle: WashBadgeStyle.soft,
          ),
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(
              'Press Enter or comma to add. Backspace removes the last tag when the field is empty.',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }
}

class _DismissibleTagsDemo extends StatefulWidget {
  const _DismissibleTagsDemo();

  @override
  State<_DismissibleTagsDemo> createState() => _DismissibleTagsDemoState();
}

class _DismissibleTagsDemoState extends State<_DismissibleTagsDemo> {
  var _tags = ['Quinacridone rose', 'Yellow ochre', 'Draft plate'];

  @override
  Widget build(BuildContext context) {
    return _Sample(
      label: 'badge + tooltip-error dismiss',
      child: WashTagsInput(
        tags: _tags,
        onChanged: (next) => setState(() => _tags = next),
        dismissible: true,
        placeholder: 'Add wash label…',
        semanticLabel: 'Dismissible tags',
        badgeTone: WashBadgeTone.secondary,
        badgeStyle: WashBadgeStyle.soft,
      ),
    );
  }
}

class _SuggestionsDemo extends StatefulWidget {
  const _SuggestionsDemo();

  @override
  State<_SuggestionsDemo> createState() => _SuggestionsDemoState();
}

class _SuggestionsDemoState extends State<_SuggestionsDemo> {
  var _datalist = ['Cobalt blue'];
  var _menu = <String>[];

  @override
  Widget build(BuildContext context) {
    return _TwoCol(
      children: [
        _Sample(
          label: 'input + datalist suggestions',
          child: WashTagsInput(
            tags: _datalist,
            onChanged: (next) => setState(() => _datalist = next),
            dismissible: true,
            suggestions: _pigmentSuggestions,
            suggestionMode: WashTagsInputSuggestionMode.datalist,
            placeholder: 'Pick or type a pigment',
            semanticLabel: 'Datalist pigment tags',
            badgeTone: WashBadgeTone.info,
            badgeStyle: WashBadgeStyle.soft,
          ),
        ),
        _Sample(
          label: 'input + menu suggestions',
          child: WashTagsInput(
            tags: _menu,
            onChanged: (next) => setState(() => _menu = next),
            dismissible: true,
            suggestions: _washSuggestions,
            suggestionMode: WashTagsInputSuggestionMode.menu,
            placeholder: 'Wash technique…',
            semanticLabel: 'Menu wash tags',
            badgeTone: WashBadgeTone.accent,
            badgeStyle: WashBadgeStyle.outline,
          ),
        ),
      ],
    );
  }
}

class _SizesColorsDemo extends StatefulWidget {
  const _SizesColorsDemo();

  @override
  State<_SizesColorsDemo> createState() => _SizesColorsDemoState();
}

class _SizesColorsDemoState extends State<_SizesColorsDemo> {
  late Map<String, List<String>> _byColor;
  late Map<String, List<String>> _bySize;

  @override
  void initState() {
    super.initState();
    _byColor = {
      for (final v in _colorVariants) v.$1: [v.$1],
    };
    _bySize = {
      for (final v in _sizeVariants) v.$1: [v.$1],
    };
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _Grid(
          children: [
            for (final variant in _colorVariants)
              _Sample(
                label: variant.$2 == WashInputTone.defaultTone
                    ? 'input + badge'
                    : 'input ${washInputClassLabel(tone: variant.$2)} + badge badge-${variant.$1.toLowerCase()}',
                child: WashTagsInput(
                  tags: _byColor[variant.$1] ?? const [],
                  onChanged: (next) =>
                      setState(() => _byColor[variant.$1] = next),
                  dismissible: true,
                  placeholder: 'Add…',
                  semanticLabel: '${variant.$1} tags',
                  tone: variant.$2,
                  badgeTone: variant.$3,
                  badgeStyle: WashBadgeStyle.soft,
                ),
              ),
          ],
        ),
        const SizedBox(height: 32),
        _Grid(
          xlCols: 4,
          smCols: 2,
          children: [
            for (final variant in _sizeVariants)
              _Sample(
                label:
                    'input ${washInputClassLabel(size: variant.$2)} + badge badge-${variant.$3.name}',
                child: WashTagsInput(
                  tags: _bySize[variant.$1] ?? const [],
                  onChanged: (next) =>
                      setState(() => _bySize[variant.$1] = next),
                  dismissible: true,
                  placeholder: 'Add…',
                  semanticLabel: '${variant.$1} size tags',
                  size: variant.$2,
                  badgeTone: WashBadgeTone.primary,
                  badgeStyle: WashBadgeStyle.soft,
                  badgeSize: variant.$3,
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _LimitsDemo extends StatefulWidget {
  const _LimitsDemo();

  @override
  State<_LimitsDemo> createState() => _LimitsDemoState();
}

class _LimitsDemoState extends State<_LimitsDemo> {
  var _maxTags = ['Warm', 'Cool', 'Earth'];
  var _unique = ['Glaze'];
  String? _note;

  void _setNote(String message) {
    setState(() => _note = message);
    Future<void>.delayed(const Duration(milliseconds: 2800), () {
      if (mounted && _note == message) setState(() => _note = null);
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _TwoCol(
          children: [
            _Sample(
              label: 'maxTags=4',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashTagsInput(
                    tags: _maxTags,
                    onChanged: (next) => setState(() => _maxTags = next),
                    dismissible: true,
                    maxTags: 4,
                    placeholder: 'Up to 4 tags',
                    semanticLabel: 'Max tags',
                    badgeTone: WashBadgeTone.warning,
                    badgeStyle: WashBadgeStyle.soft,
                    onLimitHit: () =>
                        _setNote('Maximum of 4 tags on this plate.'),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(
                      '${_maxTags.length}/4 tags',
                      style: WashTypography.body(tokens.inkMuted)
                          .copyWith(fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
            _Sample(
              label: 'duplicates blocked',
              child: WashTagsInput(
                tags: _unique,
                onChanged: (next) => setState(() => _unique = next),
                dismissible: true,
                placeholder: 'Unique labels only',
                semanticLabel: 'Unique tags',
                badgeTone: WashBadgeTone.success,
                badgeStyle: WashBadgeStyle.soft,
                onDuplicate: (tag) =>
                    _setNote('"$tag" is already on the list.'),
              ),
            ),
          ],
        ),
        if (_note != null)
          Padding(
            padding: const EdgeInsets.only(top: 16),
            child: Text(
              _note!,
              style: WashTypography.body(tokens.palette.warning)
                  .copyWith(fontSize: 13),
            ),
          ),
      ],
    );
  }
}

class _StudioPlateDemo extends StatefulWidget {
  const _StudioPlateDemo();

  @override
  State<_StudioPlateDemo> createState() => _StudioPlateDemoState();
}

class _StudioPlateDemoState extends State<_StudioPlateDemo> {
  var _pigments = ['Ultramarine', 'Burnt sienna'];
  var _washes = ['Wet-on-wet', 'Lift'];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    Widget plate(String title, Widget child) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: tokens.surface.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(title, style: WashTypography.label(tokens.inkMuted)),
            ),
            child,
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _TwoCol(
          children: [
            plate(
              'Pigment tags',
              WashTagsInput(
                tags: _pigments,
                onChanged: (next) => setState(() => _pigments = next),
                dismissible: true,
                suggestions: _pigmentSuggestions,
                suggestionMode: WashTagsInputSuggestionMode.menu,
                placeholder: 'Name a tube…',
                semanticLabel: 'Pigment tags',
                badgeTone: WashBadgeTone.info,
                badgeStyle: WashBadgeStyle.soft,
              ),
            ),
            plate(
              'Wash labels',
              WashTagsInput(
                tags: _washes,
                onChanged: (next) => setState(() => _washes = next),
                dismissible: true,
                suggestions: _washSuggestions,
                suggestionMode: WashTagsInputSuggestionMode.datalist,
                placeholder: 'Technique…',
                semanticLabel: 'Wash labels',
                badgeTone: WashBadgeTone.primary,
                badgeStyle: WashBadgeStyle.outline,
              ),
            ),
          ],
        ),
        const WashTagsInputClassLabel(
          'studio plate · pigment + wash TagsInput',
        ),
      ],
    );
  }
}

class _RequiredFormDemo extends StatefulWidget {
  const _RequiredFormDemo();

  @override
  State<_RequiredFormDemo> createState() => _RequiredFormDemoState();
}

class _RequiredFormDemoState extends State<_RequiredFormDemo> {
  final _title = TextEditingController();
  var _tags = <String>[];
  var _saving = false;

  @override
  void dispose() {
    _title.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    setState(() => _saving = true);
    try {
      if (_tags.isEmpty) {
        showWashSnackbar(
          context,
          message: 'Add at least one plate tag.',
          tone: WashAlertTone.error,
          iconName: 'circle-x',
          placement: WashSnackbarPlacement.bottomEnd,
          showDismiss: false,
          duration: const Duration(milliseconds: 3200),
        );
        return;
      }
      final count = _tags.length;
      final noun = count == 1 ? 'tag' : 'tags';
      showWashSnackbar(
        context,
        message: 'Plate "${_title.text}" saved with $count $noun.',
        tone: WashAlertTone.success,
        iconName: 'circle-check',
        placement: WashSnackbarPlacement.bottomEnd,
        showDismiss: false,
        duration: const Duration(milliseconds: 3200),
      );
      setState(() {
        _title.clear();
        _tags = [];
      });
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: tokens.surface.withValues(alpha: 0.6),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Label a plate',
              style: WashTypography.title(tokens.palette.primary).copyWith(
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            const WashFieldLabel(text: 'Title', requiredMark: true),
            WashInput(
              controller: _title,
              hint: 'Evening glaze study',
              semanticLabel: 'Title',
            ),
            const SizedBox(height: 12),
            const WashFieldLabel(text: 'Tags', requiredMark: true),
            WashTagsInput(
              tags: _tags,
              onChanged: (next) => setState(() => _tags = next),
              dismissible: true,
              suggestions: _pigmentSuggestions,
              suggestionMode: WashTagsInputSuggestionMode.datalist,
              placeholder: 'At least one tag',
              semanticLabel: 'Required plate tags',
              invalid: _tags.isEmpty,
              badgeTone: WashBadgeTone.primary,
              badgeStyle: WashBadgeStyle.soft,
            ),
            const SizedBox(height: 12),
            WashButton(
              label: 'Save plate',
              onPressed: _save,
              loading: _saving,
              enabled: !_saving,
            ),
            const WashTagsInputClassLabel('required TagsInput + form toast'),
          ],
        ),
      ),
    );
  }
}

class _ResponsiveWrapDemo extends StatefulWidget {
  const _ResponsiveWrapDemo();

  @override
  State<_ResponsiveWrapDemo> createState() => _ResponsiveWrapDemoState();
}

class _ResponsiveWrapDemoState extends State<_ResponsiveWrapDemo> {
  var _tags = [
    'Ultramarine deep',
    'Quinacridone rose',
    'Yellow ochre light',
    'Burnt sienna',
    'Sap green',
    'Cerulean hue',
    "Payne's gray",
    'Wet-on-wet bloom',
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Sample(
      label: 'flex-wrap tags inside input shell',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashTagsInput(
            tags: _tags,
            onChanged: (next) => setState(() => _tags = next),
            dismissible: true,
            placeholder: 'More tags wrap…',
            semanticLabel: 'Wrapping tags',
            badgeStyle: WashBadgeStyle.soft,
          ),
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(
              'Tags wrap inside the field on narrow viewports. No horizontal page scroll.',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }
}
