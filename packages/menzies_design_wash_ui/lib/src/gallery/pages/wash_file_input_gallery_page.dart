import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/file_input/wash_file_input.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashFileInputGalleryPage extends StatelessWidget {
  const WashFileInputGalleryPage({super.key});

  static const _colors = <(String, WashFileInputTone)>[
    ('Default', WashFileInputTone.defaultTone),
    ('Ghost', WashFileInputTone.ghost),
    ('Neutral', WashFileInputTone.neutral),
    ('Primary', WashFileInputTone.primary),
    ('Secondary', WashFileInputTone.secondary),
    ('Accent', WashFileInputTone.accent),
    ('Info', WashFileInputTone.info),
    ('Success', WashFileInputTone.success),
    ('Warning', WashFileInputTone.warning),
    ('Error', WashFileInputTone.error),
  ];

  static const _sizes = <(String, WashFileInputSize)>[
    ('XS', WashFileInputSize.xs),
    ('SM', WashFileInputSize.sm),
    ('MD', WashFileInputSize.md),
    ('LG', WashFileInputSize.lg),
    ('XL', WashFileInputSize.xl),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'File input',
      description:
          'daisyUI file-input styles for scans, references, and studio uploads.',
      sections: [
        _s(
            '01 · Basic',
            'Default file input',
            'Plain file picker with the base file-input class',
            _basic(),
            _basicDart),
        _s('02 · Sizes', 'Size scale', 'From compact pickers to XL',
            _sizesBlock(), _sizesDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Colors',
            'Semantic colors',
            'Ghost plus neutral through error accents',
            _colorsGrid(),
            _colorsDart),
        _s(
            '04 · Variants',
            'Bordered and ghost',
            'Default bordered control beside the ghost style',
            _variants(),
            _variantsDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Disabled',
            'Disabled state',
            'Non-interactive picker for locked uploads',
            _disabled(),
            _disabledDart),
        _s(
            '06 · Studio',
            'Watercolor scan upload',
            'Required reference upload with selected filename and clear action',
            const _StudioUploadDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · Multiple',
            'Multiple files',
            'HTML multiple attribute for batch reference photos',
            const _MultipleDemo(),
            _multiDart),
        _s(
            '08 · Responsive',
            'Fluid width',
            'Full-width on small screens, capped on larger viewports',
            _responsive(context),
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashFileInput(
          semanticLabel: 'Default file input',
          maxWidth: 448,
        ),
        const WashFileInputClassLabel('file-input'),
      ],
    );
  }

  static Widget _sizesBlock() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final s in _sizes) ...[
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 32,
                child: WashGalleryLabelInk(s.$1),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: WashFileInput(
                  tone: WashFileInputTone.primary,
                  size: s.$2,
                  semanticLabel: '${s.$1} file input',
                ),
              ),
            ],
          ),
          WashFileInputClassLabel('file-input ${s.$2.name}'),
          const SizedBox(height: 12),
        ],
      ],
    );
  }

  static Widget _colorsGrid() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= WashTailwindBreakpoints.lg
            ? 3
            : (constraints.maxWidth >= WashTailwindBreakpoints.sm ? 2 : 1);
        final itemWidth = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - 16 * (cols - 1)) / cols;
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: _colors.map((entry) {
            return SizedBox(
              width: itemWidth,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashFileInput(
                    tone: entry.$2,
                    semanticLabel: '${entry.$1} file input',
                  ),
                  WashFileInputClassLabel(
                    entry.$2 == WashFileInputTone.defaultTone
                        ? 'file-input'
                        : 'file-input file-input-${entry.$2.name}',
                  ),
                ],
              ),
            );
          }).toList(),
        );
      },
    );
  }

  static Widget _variants() {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              WashFileInput(
                  semanticLabel: 'Bordered file input',
                  maxWidth: double.infinity),
              WashFileInputClassLabel('file-input (bordered default)'),
            ],
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              WashFileInput(
                  tone: WashFileInputTone.ghost,
                  semanticLabel: 'Ghost file input',
                  maxWidth: double.infinity),
              WashFileInputClassLabel('file-input file-input-ghost'),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _disabled() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFileInput(
            enabled: false,
            semanticLabel: 'Disabled file input',
            maxWidth: 448),
        WashFileInputClassLabel('file-input disabled'),
      ],
    );
  }

  static Widget _responsive(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final cap = c.maxWidth >= WashTailwindBreakpoints.lg
            ? 512.0
            : (c.maxWidth >= WashTailwindBreakpoints.md
                ? 448.0
                : double.infinity);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const WashFieldsetLabel(text: 'Series cover'),
            const SizedBox(height: 4),
            WashFileInput(
              tone: WashFileInputTone.accent,
              maxWidth: cap,
              semanticLabel: 'Series cover file',
            ),
            const WashFileInputClassLabel(
                'file-input w-full md:max-w-md lg:max-w-lg'),
            const SizedBox(height: 16),
            WashFieldsetPanel(
              legend: 'Pick a file',
              maxWidth: double.infinity,
              children: const [
                WashFileInput(semanticLabel: 'Fieldset file input'),
                WashFieldsetHelper('Max size 2MB'),
                WashFileInputClassLabel('fieldset + file-input'),
              ],
            ),
          ],
        );
      },
    );
  }

  static const _basicDart = 'WashFileInput(semanticLabel: ..., maxWidth: 448)';
  static const _sizesDart =
      'WashFileInput(tone: primary, size: WashFileInputSize.sm, ...)';
  static const _colorsDart =
      'WashFileInput(tone: WashFileInputTone.accent, ...)';
  static const _variantsDart =
      'WashFileInput(tone: ghost) beside default bordered file-input';
  static const _disabledDart = 'WashFileInput(enabled: false, ...)';
  static const _studioDart =
      'WashFieldsetPanel + WashFileInput(primary) + clear btn-error';
  static const _multiDart = 'WashFileInput(multiple: true, tone: secondary)';
  static const _responsiveDart =
      'LayoutBuilder + capped maxWidth + WashFieldsetPanel';
}

class _StudioUploadDemo extends StatefulWidget {
  const _StudioUploadDemo();

  @override
  State<_StudioUploadDemo> createState() => _StudioUploadDemoState();
}

class _StudioUploadDemoState extends State<_StudioUploadDemo> {
  List<String> _files = const [];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final hasFile = _files.isNotEmpty;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetPanel(
          legend: 'Studio upload',
          maxWidth: 512,
          children: [
            const WashFieldsetLabel(
                text: 'Watercolor scan', requiredMark: true),
            const SizedBox(height: 4),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: WashFileInput(
                    tone: WashFileInputTone.primary,
                    fileNames: _files,
                    onChanged: (v) => setState(() => _files = v),
                    semanticLabel: 'Watercolor scan upload',
                  ),
                ),
                const SizedBox(width: 8),
                WashTooltip(
                  message: 'Clear file',
                  prefer: WashTooltipSide.left,
                  child: WashButton(
                    variant: WashButtonVariant.error,
                    square: true,
                    enabled: hasFile,
                    onPressed: hasFile
                        ? () => setState(() => _files = const [])
                        : null,
                    child: const WashLucideIcon('x', size: 16),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text(
                hasFile
                    ? 'Selected: ${_files.join(', ')}'
                    : 'Reference photo or scan. PNG, JPEG, or PDF.',
                style: WashTypography.label(tokens.inkMuted)
                    .copyWith(fontSize: 13),
              ),
            ),
            const WashFileInputClassLabel(
                'file-input file-input-primary + required'),
          ],
        ),
      ],
    );
  }
}

class _MultipleDemo extends StatefulWidget {
  const _MultipleDemo();

  @override
  State<_MultipleDemo> createState() => _MultipleDemoState();
}

class _MultipleDemoState extends State<_MultipleDemo> {
  List<String> _files = const [];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const WashFieldsetLabel(text: 'Plate references'),
        const SizedBox(height: 4),
        WashFileInput(
          tone: WashFileInputTone.secondary,
          multiple: true,
          fileNames: _files,
          onChanged: (v) => setState(() => _files = v),
          maxWidth: 512,
        ),
        Padding(
          padding: const EdgeInsets.only(top: 8),
          child: Text(
            _files.isEmpty
                ? 'Choose one or more images.'
                : 'Selected: ${_files.join(', ')}',
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          ),
        ),
        const WashFileInputClassLabel('file-input multiple'),
      ],
    );
  }
}
