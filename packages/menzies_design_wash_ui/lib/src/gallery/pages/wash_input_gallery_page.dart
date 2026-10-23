import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/file_input/wash_file_input.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/input/wash_input.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashInputGalleryPage extends StatelessWidget {
  const WashInputGalleryPage({super.key});

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

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Input',
      description: 'Every daisyUI input color, size, and composition.',
      sections: [
        _s('01 · Default', 'Base input', 'Simple text field with placeholder',
            _base(), _baseDart),
        _s('02 · Ghost', 'Ghost style',
            'Borderless field for quiet UI surfaces', _ghost(), _ghostDart,
            tint: WashGalleryPanelTint.ochre),
        _s('03 · Colors', 'Semantic colors',
            'Neutral through error border accents', _colorsGrid(), _colorsDart),
        _s('04 · Sizes', 'Size scale', 'From compact fields to XL',
            _sizeScale(), _sizesDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Types',
            'HTML input types',
            'Text, email, password, number, date, search',
            const _InputTypesDemo(),
            _typesDart),
        _s(
            '06 · With icons',
            'Composite input',
            'Wrap children in an input container for icons and addons',
            _composite(context),
            _compositeDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · States',
            'Disabled & readonly',
            'Non-editable fields for locked plate metadata',
            _states(),
            _statesDart),
        _s(
            '08 · Form layout',
            'Labeled fields',
            'Fieldset with required-style labels on paper',
            _labeledFields(),
            _labeledDart,
            tint: WashGalleryPanelTint.rose),
        _s('09 · Join', 'Input + button', 'Joined search field and action',
            _joinSearch(), _joinDart),
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

  static Widget _base() {
    return const WashInput(
      hint: 'Plate title…',
      maxWidth: 448,
      semanticLabel: 'Plate title',
    );
  }

  static const _baseDart = '''
WashInput(
  hint: 'Plate title…',
  maxWidth: 448,
);
''';

  static Widget _ghost() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashInput(
          hint: 'Ghost input…',
          tone: WashInputTone.ghost,
          maxWidth: 448,
        ),
        const WashInputClassLabel('input input-ghost'),
      ],
    );
  }

  static const _ghostDart = '''
WashInput(
  hint: 'Ghost input…',
  tone: WashInputTone.ghost,
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
                    WashInput(
                      hint: c.$1,
                      tone: c.$2,
                      semanticLabel: c.$1,
                    ),
                    WashInputClassLabel(washInputClassLabel(tone: c.$2)),
                  ],
                ),
              ),
          ],
        );
      },
    );
  }

  static const _colorsDart = '''
WashInput(hint: 'Primary', tone: WashInputTone.primary);
''';

  static Widget _sizeScale() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final s in _sizes) ...[
          Row(
            children: [
              SizedBox(width: 32, child: WashGalleryLabelInk(s.$1)),
              Expanded(
                child: WashInput(
                  hint: '${s.$1} input',
                  tone: WashInputTone.primary,
                  size: s.$2,
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(left: 32, bottom: 12),
            child: WashInputClassLabel(
                washInputClassLabel(tone: WashInputTone.primary, size: s.$2)),
          ),
        ],
      ],
    );
  }

  static const _sizesDart = '''
WashInput(tone: WashInputTone.primary, size: WashInputSize.lg, hint: 'LG input');
''';

  static Widget _composite(BuildContext context) {
    final muted = WashTokens.of(context).onSurface.withValues(alpha: 0.6);
    return Column(
      children: [
        WashInput(
          hint: 'Search washes…',
          keyboardType: TextInputType.webSearch,
          leading:
              WashLucideIcon('search', size: 16, color: muted, strokeWidth: 2),
        ),
        const SizedBox(height: 16),
        WashInput(
          hint: 'studio@menzies.design',
          tone: WashInputTone.primary,
          keyboardType: TextInputType.emailAddress,
          leading:
              WashLucideIcon('mail', size: 16, color: muted, strokeWidth: 2),
        ),
        const SizedBox(height: 16),
        WashInput(
          hint: 'Passphrase',
          obscureText: true,
          leading:
              WashLucideIcon('lock', size: 16, color: muted, strokeWidth: 2),
          trailing:
              WashLucideIcon('eye', size: 16, color: muted, strokeWidth: 2),
        ),
      ],
    );
  }

  static const _compositeDart = '''
WashInput(
  hint: 'Search washes…',
  leading: WashLucideIcon('search', size: 16),
);
''';

  static Widget _states() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashInput(hint: 'Disabled…', enabled: false, maxWidth: 512),
        const WashInputClassLabel('disabled'),
        const SizedBox(height: 16),
        const WashInput(
          initialValue: 'WS-214 · Coastal fog',
          readOnly: true,
          maxWidth: 512,
        ),
        const WashInputClassLabel('readOnly'),
      ],
    );
  }

  static const _statesDart = '''
WashInput(hint: 'Disabled…', enabled: false);
WashInput(initialValue: 'WS-214 · Coastal fog', readOnly: true);
''';

  static Widget _labeledFields() {
    return WashFieldsetInkPanel(
      legend: 'New plate',
      children: [
        const WashFieldsetLabel(text: 'Name', requiredMark: true),
        const WashInput(
          hint: 'Coastal fog plate',
          tone: WashInputTone.primary,
        ),
        const WashFieldsetLabel(text: 'Series'),
        const WashInput(hint: 'Atlantic Studies'),
        const WashFieldsetLabel(text: 'Notes'),
        const WashInput(
            hint: 'Optional wash notes…', tone: WashInputTone.ghost),
        const WashFieldsetHelper('Asterisk marks required fields'),
      ],
    );
  }

  static const _labeledDart = '''
WashFieldsetInkPanel(
  legend: 'New plate',
  children: [
    WashFieldsetLabel(text: 'Name', requiredMark: true),
    WashInput(hint: 'Coastal fog plate', tone: WashInputTone.primary),
  ],
);
''';

  static Widget _joinSearch() {
    return LayoutBuilder(
      builder: (context, c) {
        final w = c.maxWidth >= WashTailwindBreakpoints.lg ? 512.0 : c.maxWidth;
        final muted = WashTokens.of(context).onSurface.withValues(alpha: 0.6);
        return SizedBox(
          width: w,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: WashInput(
                  hint: 'Filter ledger…',
                  keyboardType: TextInputType.webSearch,
                  joinItem: true,
                  leading: WashLucideIcon('search',
                      size: 16, color: muted, strokeWidth: 2),
                ),
              ),
              WashButton(
                label: 'Search',
                joinItem: true,
                onPressed: () {},
              ),
            ],
          ),
        );
      },
    );
  }

  static const _joinDart = '''
Row(
  children: [
    Expanded(
      child: WashInput(
        hint: 'Filter ledger…',
        joinItem: true,
        leading: WashLucideIcon('search'),
      ),
    ),
    WashButton(label: 'Search', joinItem: true, onPressed: () {}),
  ],
);
''';

  static const _typesDart = '''
WashInput(keyboardType: TextInputType.emailAddress, hint: 'you@studio.test');
''';
}

class _InputTypesDemo extends StatelessWidget {
  const _InputTypesDemo();

  static const _rows = <_TypeRow>[
    _TypeRow('text', 'Text', TextInputType.text),
    _TypeRow('email', 'you@studio.test', TextInputType.emailAddress),
    _TypeRow('password', 'Password', TextInputType.visiblePassword,
        obscure: true),
    _TypeRow('number', '42', TextInputType.number),
    _TypeRow('search', 'Search plates…', TextInputType.webSearch),
    _TypeRow('url', 'https://…', TextInputType.url),
    _TypeRow('tel', '+1 555…', TextInputType.phone),
    _TypeRow('date', '', TextInputType.datetime, isDate: true),
    _TypeRow('time', '', TextInputType.datetime, isTime: true),
    _TypeRow('file', '', TextInputType.text, isFile: true),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1;
        final gap = 16.0;
        final w =
            cols == 1 ? constraints.maxWidth : (constraints.maxWidth - gap) / 2;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final row in _rows)
              SizedBox(
                width: cols == 1 ? constraints.maxWidth : w,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    row.buildField(),
                    WashInputClassLabel(row.label),
                  ],
                ),
              ),
          ],
        );
      },
    );
  }
}

class _TypeRow {
  const _TypeRow(
    this.id,
    this.placeholder,
    this.keyboard, {
    this.obscure = false,
    this.isDate = false,
    this.isTime = false,
    this.isFile = false,
  });

  final String id;
  final String placeholder;
  final TextInputType keyboard;
  final bool obscure;
  final bool isDate;
  final bool isTime;
  final bool isFile;

  String get label => 'type="$id"';

  Widget buildField() {
    if (isFile) {
      return const WashFileInput(
        browseLabel: 'Browse',
        emptyLabel: 'No file chosen',
      );
    }
    if (isDate) {
      return const _DateTypeField();
    }
    if (isTime) {
      return const _TimeTypeField();
    }
    return WashInput(
      hint: placeholder.isEmpty ? null : placeholder,
      keyboardType: keyboard,
      obscureText: obscure,
    );
  }
}

class _DateTypeField extends StatefulWidget {
  const _DateTypeField();

  @override
  State<_DateTypeField> createState() => _DateTypeFieldState();
}

class _DateTypeFieldState extends State<_DateTypeField> {
  String _value = '';

  @override
  Widget build(BuildContext context) {
    return WashInput(
      hint: 'YYYY-MM-DD',
      initialValue: _value,
      keyboardType: TextInputType.datetime,
      onChanged: (v) => setState(() => _value = v),
    );
  }
}

class _TimeTypeField extends StatefulWidget {
  const _TimeTypeField();

  @override
  State<_TimeTypeField> createState() => _TimeTypeFieldState();
}

class _TimeTypeFieldState extends State<_TimeTypeField> {
  String _value = '';

  @override
  Widget build(BuildContext context) {
    return WashInput(
      hint: 'HH:mm',
      initialValue: _value,
      keyboardType: TextInputType.datetime,
      onChanged: (v) => setState(() => _value = v),
    );
  }
}
