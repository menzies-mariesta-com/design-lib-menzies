import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/link/wash_link.dart';
import '../../components/link/wash_preview_link.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashLinksGalleryPage extends StatelessWidget {
  const WashLinksGalleryPage({super.key});

  static const _tones = <(String, WashLinkTone)>[
    ('Default', WashLinkTone.inherit),
    ('Neutral', WashLinkTone.neutral),
    ('Primary', WashLinkTone.primary),
    ('Secondary', WashLinkTone.secondary),
    ('Accent', WashLinkTone.accent),
    ('Success', WashLinkTone.success),
    ('Info', WashLinkTone.info),
    ('Warning', WashLinkTone.warning),
    ('Error', WashLinkTone.error),
  ];

  static const _previewSamples = <_PreviewSample>[
    _PreviewSample(
      label: 'Ultramarine study',
      title: 'Ultramarine study',
      description:
          'Cool wash notes for glazing skies. Soft edges, low contrast bloom',
      tone: WashPreviewLinkTone.blue,
      linkTone: WashLinkTone.primary,
      plateLabel: 'Cerulean plate',
    ),
    _PreviewSample(
      label: 'Ochre ledger',
      title: 'Ochre ledger',
      description:
          'Raw sienna mixes and drying times for warm underpainting layers',
      tone: WashPreviewLinkTone.ochre,
      linkTone: WashLinkTone.warning,
      plateLabel: 'Raw sienna',
    ),
    _PreviewSample(
      label: 'Rose madder glaze',
      title: 'Rose madder glaze',
      description:
          'Transparent pinks for florals. Keep the paper white for sparkle',
      tone: WashPreviewLinkTone.rose,
      linkTone: WashLinkTone.secondary,
      plateLabel: 'Rose wash',
    ),
    _PreviewSample(
      label: 'Sap green meadow',
      title: 'Sap green meadow',
      description: 'Field greens with a touch of ochre. Avoid muddy mid-tones',
      tone: WashPreviewLinkTone.sage,
      linkTone: WashLinkTone.success,
      plateLabel: 'Sap green',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Links',
      description: 'Every daisyUI link color and hover style.',
      sections: [
        _section(
          eyebrow: '01 · Default',
          title: 'Base link',
          description: 'Tailwind resets anchors; add link to restore underline',
          preview: _defaultSection(context),
          dart: _defaultDart,
        ),
        _section(
          eyebrow: '02 · Colors',
          title: 'Semantic colors',
          description: 'Default ink plus neutral, brand, and status link colors',
          tint: WashGalleryPanelTint.ochre,
          preview: _colorsSection(),
          dart: _colorsDart,
        ),
        _section(
          eyebrow: '03 · Style',
          title: 'Hover underline',
          description: 'link-hover shows the underline only on hover',
          preview: _hoverSection(),
          dart: _hoverDart,
        ),
        _section(
          eyebrow: '04 · Color × hover',
          title: 'Hover with every color',
          description: 'link-hover paired with each semantic color',
          tint: WashGalleryPanelTint.rose,
          preview: _matrixSection(),
          dart: _matrixDart,
        ),
        _section(
          eyebrow: '05 · With icons',
          title: 'Icon + label',
          description: 'Leading and trailing Lucide marks on colored links',
          preview: _iconsSection(),
          dart: _iconsDart,
        ),
        _section(
          eyebrow: '06 · Element types',
          title: 'Anchor and button',
          description: 'link on <a> and <button>; btn-link for button-as-link',
          tint: WashGalleryPanelTint.ochre,
          preview: _elementsSection(),
          dart: _elementsDart,
        ),
        _section(
          eyebrow: '07 · In prose',
          title: 'Paragraph context',
          description: 'Colored links nested in studio copy',
          preview: _proseSection(context),
          dart: _proseDart,
        ),
        _section(
          eyebrow: '08 · Hover preview',
          title: 'Link preview card',
          description: 'Hover or focus a link for a delayed wash preview',
          tint: WashGalleryPanelTint.blue,
          preview: _previewSection(context),
          dart: _previewDart,
        ),
      ],
    );
  }

  static WashGallerySection _section({
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

  static InlineSpan _inlineLink(
    String label,
    WashLinkTone tone, {
    bool hover = false,
  }) {
    return WidgetSpan(
      alignment: PlaceholderAlignment.baseline,
      baseline: TextBaseline.alphabetic,
      child: WashLink(
        label: label,
        onTap: () {},
        tone: tone,
        hoverUnderline: hover,
      ),
    );
  }

  static Widget _defaultSection(BuildContext context) {
    final muted = WashTokens.of(context).inkMuted;
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _linkColumn('Click me', WashLinkTone.inherit, classLabel: 'link'),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 448),
              child: Text.rich(
                TextSpan(
                  style: WashTypography.body(muted).copyWith(fontSize: 14),
                  children: [
                    const TextSpan(
                      text:
                          'Tailwind CSS resets the style of links by default. Add ',
                    ),
                    TextSpan(
                      text: 'link',
                      style: WashTypography.body(muted).copyWith(
                        fontFamily: 'monospace',
                        fontSize: 12,
                      ),
                    ),
                    const TextSpan(text: ' to make it look like a '),
                    _inlineLink('normal link', WashLinkTone.inherit),
                    const TextSpan(text: ' again.'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 8),
            const WashLinkClassLabel('link (inline)'),
          ],
        ),
      ],
    );
  }

  static Widget _colorsSection() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final (name, tone) in _tones)
          _linkColumn(
            name,
            tone,
            classLabel: tone == WashLinkTone.inherit
                ? 'link'
                : washLinkClassLabel(tone: tone),
            center: true,
          ),
      ],
    );
  }

  static Widget _hoverSection() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _linkColumn(
          'Hover me',
          WashLinkTone.inherit,
          hover: true,
          classLabel: 'link link-hover',
          center: true,
        ),
        for (final (name, tone) in _tones.skip(1).take(4))
          _linkColumn(
            name,
            tone,
            hover: true,
            classLabel: washLinkClassLabel(tone: tone, hoverUnderline: true),
            center: true,
          ),
      ],
    );
  }

  static Widget _matrixSection() {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final (name, tone) in _tones)
          _linkColumn(
            name,
            tone,
            hover: true,
            classLabel: washLinkClassLabel(tone: tone, hoverUnderline: true),
            center: true,
          ),
      ],
    );
  }

  static Widget _iconsSection() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        _iconLinkColumn(
          WashLink(
            onTap: () {},
            tone: WashLinkTone.primary,
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                WashLucideIcon('book-open', size: 16, strokeWidth: 1.75),
                SizedBox(width: 6),
                Text('Studio notes'),
              ],
            ),
          ),
          'link link-primary',
        ),
        _iconLinkColumn(
          WashLink(
            onTap: () {},
            tone: WashLinkTone.secondary,
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                WashLucideIcon('mail', size: 16, strokeWidth: 1.75),
                SizedBox(width: 6),
                Text('Write curator'),
              ],
            ),
          ),
          'link link-secondary',
        ),
        _iconLinkColumn(
          WashLink(
            onTap: () {},
            tone: WashLinkTone.accent,
            hoverUnderline: true,
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('Continue'),
                SizedBox(width: 6),
                WashLucideIcon('arrow-right', size: 16, strokeWidth: 1.75),
              ],
            ),
          ),
          'link link-accent link-hover',
        ),
        _iconLinkColumn(
          WashLink(
            onTap: () {},
            tone: WashLinkTone.info,
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('External plate'),
                SizedBox(width: 6),
                WashLucideIcon('external-link', size: 16, strokeWidth: 1.75),
              ],
            ),
          ),
          'link link-info',
        ),
        _iconLinkColumn(
          WashLink(
            onTap: () {},
            tone: WashLinkTone.success,
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                WashLucideIcon('download', size: 16, strokeWidth: 1.75),
                SizedBox(width: 6),
                Text('Export wash'),
              ],
            ),
          ),
          'link link-success',
        ),
      ],
    );
  }

  static Widget _elementsSection() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _linkColumn(
          '<a class="link">',
          WashLinkTone.primary,
          classLabel: 'a.link',
          center: true,
        ),
        Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            WashLinkButton(
              label: '<button class="link">',
              tone: WashLinkTone.secondary,
              onTap: () {},
            ),
            const SizedBox(height: 8),
            const WashLinkClassLabel('button.link'),
          ],
        ),
        Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            WashButton(
              label: 'btn btn-link',
              variant: WashButtonVariant.link,
              tint: WashButtonVariant.primary,
              onPressed: () {},
            ),
            const SizedBox(height: 8),
            const WashLinkClassLabel('btn btn-link btn-primary'),
          ],
        ),
        Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            WashButton(
              variant: WashButtonVariant.link,
              tint: WashButtonVariant.error,
              onPressed: () {},
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon('link-2', size: 16, strokeWidth: 1.75),
                  SizedBox(width: 6),
                  Text('Revoke link'),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const WashLinkClassLabel('btn btn-link btn-error'),
          ],
        ),
      ],
    );
  }

  static Widget _proseSection(BuildContext context) {
    final tokens = WashTokens.of(context);
    final body = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: 14,
      height: 1.6,
    );
    final muted = WashTypography.body(tokens.inkMuted).copyWith(
      fontSize: 14,
      height: 1.6,
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text.rich(
          TextSpan(
            style: body,
            children: [
              const TextSpan(text: 'Mix a cool wash with '),
              _inlineLink('ultramarine', WashLinkTone.primary),
              const TextSpan(text: ' and a touch of '),
              _inlineLink('rose madder', WashLinkTone.accent),
              const TextSpan(
                text: '. Keep edges soft unless you need a dry-brush edge.',
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text.rich(
          TextSpan(
            style: muted,
            children: [
              const TextSpan(text: 'See also the '),
              _inlineLink('pigment ledger', WashLinkTone.info, hover: true),
              const TextSpan(text: ' and '),
              _inlineLink('drying queue', WashLinkTone.warning, hover: true),
              const TextSpan(text: '.'),
            ],
          ),
        ),
        const SizedBox(height: 16),
        const Wrap(
          spacing: 16,
          runSpacing: 8,
          children: [
            WashLinkClassLabel('link link-primary'),
            WashLinkClassLabel('link link-hover link-info'),
          ],
        ),
      ],
    );
  }

  static Widget _previewSection(BuildContext context) {
    final muted = WashTokens.of(context).inkMuted;
    final body = WashTypography.body(muted).copyWith(fontSize: 14, height: 1.6);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text.rich(
          TextSpan(
            style: body,
            children: [
              const TextSpan(text: 'Browse the studio catalog: '),
              for (var i = 0; i < _previewSamples.length; i++) ...[
                if (i > 0)
                  TextSpan(
                    text: i == _previewSamples.length - 1 ? ', and ' : ', ',
                  ),
                WidgetSpan(
                  alignment: PlaceholderAlignment.baseline,
                  baseline: TextBaseline.alphabetic,
                  child: WashPreviewLink(
                    title: _previewSamples[i].title,
                    description: _previewSamples[i].description,
                    tone: _previewSamples[i].tone,
                    plateLabel: _previewSamples[i].plateLabel,
                    linkTone: _previewSamples[i].linkTone,
                    child: Text(_previewSamples[i].label),
                  ),
                ),
              ],
              const TextSpan(text: '.'),
            ],
          ),
        ),
        const SizedBox(height: 20),
        Wrap(
          spacing: 24,
          runSpacing: 16,
          children: [
            for (final sample in _previewSamples)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashPreviewLink(
                    title: sample.title,
                    description: sample.description,
                    tone: sample.tone,
                    plateLabel: sample.plateLabel,
                    linkTone: sample.linkTone,
                    hoverUnderline: true,
                    child: Text(sample.label),
                  ),
                  const SizedBox(height: 8),
                  const WashLinkClassLabel('link + portal preview'),
                ],
              ),
          ],
        ),
        const SizedBox(height: 16),
        const Wrap(
          spacing: 16,
          runSpacing: 8,
          children: [
            WashLinkClassLabel('show ~250ms · hide ~180ms'),
            WashLinkClassLabel('fixed + createPortal(body)'),
            WashLinkClassLabel('Escape dismiss · motion-reduce'),
          ],
        ),
      ],
    );
  }

  static Widget _linkColumn(
    String label,
    WashLinkTone tone, {
    bool hover = false,
    String? classLabel,
    bool center = false,
  }) {
    return Column(
      crossAxisAlignment:
          center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashLink(
          label: label,
          onTap: () {},
          tone: tone,
          hoverUnderline: hover,
        ),
        const SizedBox(height: 8),
        WashLinkClassLabel(
          classLabel ?? washLinkClassLabel(tone: tone, hoverUnderline: hover),
        ),
      ],
    );
  }

  static Widget _iconLinkColumn(Widget link, String classLabel) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        link,
        const SizedBox(height: 8),
        WashLinkClassLabel(classLabel),
      ],
    );
  }

  static const _defaultDart = '''
WashLink(label: 'Click me', onTap: onTap);
// Inline: Text.rich with WashLink for "normal link"
''';

  static const _colorsDart = 'WashLink(tone: WashLinkTone.primary, …)';

  static const _hoverDart = 'WashLink(hoverUnderline: true, tone: …)';

  static const _matrixDart = 'WashLink(hoverUnderline: true) for each tone';

  static const _iconsDart = 'WashLink + WashLucideIcon (book-open, mail, …)';

  static const _elementsDart =
      'WashLink, WashLinkButton, WashButton(variant: link, tint: primary|error)';

  static const _proseDart = 'WashLink in Text.rich for prose links';

  static const _previewDart = 'WashPreviewLink(title, description, tone, child)';
}

class _PreviewSample {
  const _PreviewSample({
    required this.label,
    required this.title,
    required this.description,
    required this.tone,
    required this.linkTone,
    required this.plateLabel,
  });

  final String label;
  final String title;
  final String description;
  final WashPreviewLinkTone tone;
  final WashLinkTone linkTone;
  final String plateLabel;
}
