import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/card/wash_card.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/input/wash_input.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../components/textarea/wash_textarea.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashTextareaGalleryPage extends StatelessWidget {
  const WashTextareaGalleryPage({super.key});

  static const _colors = <(String, WashInputTone)>[
    ('Default', WashInputTone.defaultTone),
    ('Neutral', WashInputTone.neutral),
    ('Primary', WashInputTone.primary),
    ('Secondary', WashInputTone.secondary),
    ('Accent', WashInputTone.accent),
    ('Info', WashInputTone.info),
    ('Success', WashInputTone.success),
    ('Warning', WashInputTone.warning),
    ('Error', WashInputTone.error),
  ];

  static const _sizes = <(String, WashInputSize)>[
    ('XS', WashInputSize.xs),
    ('SM', WashInputSize.sm),
    ('MD', WashInputSize.md),
    ('LG', WashInputSize.lg),
    ('XL', WashInputSize.xl),
  ];

  static const _notesMax = 280;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Textarea',
      description:
          'Every daisyUI textarea size, color, and state for multi-line studio notes.',
      sections: [
        _s('01 · Basic', 'Default textarea',
            'Multi-line field with placeholder', _basic(), _basicDart),
        _s(
            '02 · Sizes',
            'Size scale',
            'From compact notes to XL critique blocks',
            _sizeScale(),
            _sizesDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Colors & ghost',
            'Semantic colors and ghost',
            'Neutral through error accents, plus borderless ghost',
            _colorsGrid(),
            _colorsDart),
        _s('04 · States', 'Disabled and readonly',
            'Locked fields for archived plate notes', _states(), _statesDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Labels & fieldset',
            'Labeled fields',
            'Fieldset with required asterisk beside the label text',
            _labeledFields(),
            _labeledDart),
        _s(
            '06 · Studio',
            'Wash notes and critique',
            'Create-style form with required fields and optional character count',
            const _StudioDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · Responsive',
            'Fluid width',
            'Textareas span full width on mobile and cap on larger screens',
            _responsive(),
            _responsiveDart),
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
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashTextarea(
          hint: 'Describe the wash…',
          rows: 4,
          maxWidth: 448,
          semanticLabel: 'Describe the wash',
        ),
        WashTextareaClassLabel('textarea'),
      ],
    );
  }

  static const _basicDart = '''
WashTextarea(
  hint: 'Describe the wash…',
  rows: 4,
  maxWidth: 448,
);
''';

  static Widget _sizeScale() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final s in _sizes) ...[
            LayoutBuilder(
              builder: (context, c) {
                final stacked = c.maxWidth < WashTailwindBreakpoints.sm;
                final field = WashTextarea(
                  hint: '${s.$1} textarea',
                  tone: WashInputTone.primary,
                  size: s.$2,
                  rows: 2,
                  semanticLabel: '${s.$1} textarea',
                );
                if (stacked) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      WashGalleryLabelInk(s.$1),
                      const SizedBox(height: 8),
                      field,
                    ],
                  );
                }
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: 32,
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: WashGalleryLabelInk(s.$1),
                      ),
                    ),
                    Expanded(child: field),
                  ],
                );
              },
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: WashTextareaClassLabel(
                'textarea textarea-primary textarea-${s.$2.name}',
              ),
            ),
          ],
        ],
      ),
    );
  }

  static const _sizesDart = '''
WashTextarea(
  tone: WashInputTone.primary,
  size: WashInputSize.lg,
  hint: 'LG textarea',
  rows: 2,
);
''';

  static Widget _colorsGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= WashTailwindBreakpoints.lg
            ? 3
            : (constraints.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
        final gap = 16.0;
        final w = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final c in _colors)
              SizedBox(
                width: cols == 1 ? constraints.maxWidth : w,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    WashTextarea(
                      hint: c.$1,
                      tone: c.$2,
                      rows: 3,
                      semanticLabel: c.$1,
                    ),
                    WashTextareaClassLabel(washTextareaClassLabel(tone: c.$2)),
                  ],
                ),
              ),
            SizedBox(
              width: constraints.maxWidth,
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashTextarea(
                    hint: 'Ghost textarea…',
                    tone: WashInputTone.ghost,
                    rows: 3,
                    maxWidth: 448,
                    semanticLabel: 'Ghost textarea',
                  ),
                  WashTextareaClassLabel('textarea textarea-ghost'),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  static const _colorsDart = '''
WashTextarea(hint: 'Primary', tone: WashInputTone.primary, rows: 3);
WashTextarea(hint: 'Ghost textarea…', tone: WashInputTone.ghost, rows: 3);
''';

  static Widget _states() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final two = constraints.maxWidth >= WashTailwindBreakpoints.sm;
        final gap = 16.0;
        final w = two ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: w,
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashTextarea(
                    hint: 'Disabled…',
                    enabled: false,
                    rows: 3,
                  ),
                  WashTextareaClassLabel('disabled'),
                ],
              ),
            ),
            SizedBox(
              width: w,
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashTextarea(
                    initialValue:
                        'WS-214 · Coastal fog. Soft cobalt underpainting held overnight.',
                    readOnly: true,
                    rows: 3,
                  ),
                  WashTextareaClassLabel('readOnly'),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  static const _statesDart = '''
WashTextarea(hint: 'Disabled…', enabled: false, rows: 3);
WashTextarea(
  initialValue: 'WS-214 · Coastal fog. Soft cobalt underpainting held overnight.',
  readOnly: true,
  rows: 3,
);
''';

  static Widget _labeledFields() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetInkPanel(
          legend: 'Plate notes',
          maxWidth: 512,
          children: const [
            WashFieldsetLabel(text: 'Summary', requiredMark: true),
            WashTextarea(
              hint: 'One sentence for the ledger…',
              tone: WashInputTone.primary,
              rows: 3,
            ),
            WashFieldsetLabel(text: 'Process'),
            WashTextarea(
              hint: 'Optional process notes…',
              rows: 3,
            ),
            WashFieldsetHelper('Asterisk marks required fields'),
          ],
        ),
        const WashTextareaClassLabel('fieldset + label + textarea'),
      ],
    );
  }

  static const _labeledDart = '''
WashFieldsetInkPanel(
  legend: 'Plate notes',
  children: [
    WashFieldsetLabel(text: 'Summary', requiredMark: true),
    WashTextarea(
      hint: 'One sentence for the ledger…',
      tone: WashInputTone.primary,
      rows: 3,
    ),
    WashFieldsetLabel(text: 'Process'),
    WashTextarea(hint: 'Optional process notes…', rows: 3),
  ],
);
''';

  static const _studioDart = '''
WashCard(
  body: WashCardBody(
    children: [
      Text('Add critique', style: WashTypography.title(primary).copyWith(fontWeight: FontWeight.bold)),
      WashTextarea(label: 'Wash notes', requiredMark: true, tone: WashInputTone.primary, rows: 4, maxLength: 280),
      WashTextarea(label: 'Critique', requiredMark: true, rows: 5),
      WashButton(label: 'Clear', variant: WashButtonVariant.ghost, onPressed: clear),
      WashButton(label: 'Save critique', onPressed: save),
    ],
  ),
);
''';

  static Widget _responsive() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final two = constraints.maxWidth >= WashTailwindBreakpoints.md;
        final gap = 16.0;
        final w = two ? (constraints.maxWidth - gap) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: w,
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashFieldsetLabel(text: 'Mobile-first note'),
                  SizedBox(height: 8),
                  WashTextarea(
                    hint: 'Full width on small screens…',
                    rows: 4,
                  ),
                  WashTextareaClassLabel('textarea w-full'),
                ],
              ),
            ),
            SizedBox(
              width: w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const WashFieldsetLabel(text: 'Desktop companion'),
                  const SizedBox(height: 8),
                  WashTextarea(
                    hint: 'Stacks beside on md+…',
                    tone: WashInputTone.secondary,
                    rows: 4,
                    maxLines: two ? 6 : 4,
                  ),
                  const WashTextareaClassLabel('textarea w-full md:min-h-32'),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  static const _responsiveDart = '''
Wrap(
  children: [
    WashTextarea(hint: 'Full width on small screens…', rows: 4),
    WashTextarea(
      hint: 'Stacks beside on md+…',
      tone: WashInputTone.secondary,
      rows: 4,
    ),
  ],
);
''';
}

class _StudioDemo extends StatefulWidget {
  const _StudioDemo();

  @override
  State<_StudioDemo> createState() => _StudioDemoState();
}

class _StudioDemoState extends State<_StudioDemo> {
  late final TextEditingController _notes;
  late final TextEditingController _critique;

  @override
  void initState() {
    super.initState();
    _notes = TextEditingController();
    _critique = TextEditingController();
    _notes.addListener(_sync);
  }

  @override
  void dispose() {
    _notes.removeListener(_sync);
    _notes.dispose();
    _critique.dispose();
    super.dispose();
  }

  void _sync() => setState(() {});

  void _clear() {
    _notes.clear();
    _critique.clear();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final notesLen = _notes.text.length;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 576),
        child: WashCard(
          body: WashCardBody(
            children: [
              Text(
                'Add critique',
                style: WashTypography.title(tokens.primary)
                    .copyWith(fontWeight: FontWeight.bold),
              ),
              Text(
                'Capture wash notes and a short critique for the plate ledger.',
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
              ),
              WashTextarea(
                controller: _notes,
                label: 'Wash notes',
                requiredMark: true,
                hint: 'Pigment mixes, drying times, paper tooth…',
                tone: WashInputTone.primary,
                rows: 4,
                maxLength: WashTextareaGalleryPage._notesMax,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Required',
                    style: WashTypography.label(tokens.inkMuted)
                        .copyWith(fontSize: 12),
                  ),
                  Text(
                    '$notesLen/${WashTextareaGalleryPage._notesMax}',
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontSize: 12,
                      fontFeatures: const [FontFeature.tabularFigures()],
                    ),
                  ),
                ],
              ),
              WashTextarea(
                controller: _critique,
                label: 'Critique',
                requiredMark: true,
                hint: 'What holds, what needs another pass…',
                rows: 5,
                helper: 'No character limit on critique',
              ),
              WashCardActions(
                align: WashCardActionsAlign.end,
                children: [
                  WashButton(
                    label: 'Clear',
                    variant: WashButtonVariant.ghost,
                    onPressed: _clear,
                  ),
                  WashButton(
                    label: 'Save critique',
                    onPressed: () {},
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
