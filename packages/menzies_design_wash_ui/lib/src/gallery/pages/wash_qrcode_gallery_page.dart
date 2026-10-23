
import 'package:flutter/widgets.dart';

import '../../components/input/wash_input.dart';
import '../../components/qrcode/wash_qrcode.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashQrcodeGalleryPage extends StatelessWidget {
  const WashQrcodeGalleryPage({super.key});

  static const sampleUrl = 'https://menzies.design/palette/ultramarine';
  static const sampleText = 'Menzies Design pigment desk';

  static const _studioDemos = <(String, String, String)>[
    ('Pigment id', 'pigment:ultramarine-deep-v2', 'pigment:…'),
    (
      'Studio session',
      'https://menzies.design/session/ws-4f8a2c',
      'session link'
    ),
    ('Layer share', 'menzies://layer/rose-wash-03', 'menzies://layer/…'),
  ];

  static const _basicDart = '''
WashQrFrame(
  child: WashQrCode(
    value: 'https://menzies.design/palette/ultramarine',
    size: 144,
  ),
)
''';

  static const _sizesDart = '''
WashQrCode(value: url, size: 96, foreground: tokens.primary)
WashQrCode(value: url, size: 160, foreground: tokens.primary)
WashQrCode(value: url, size: 224, foreground: tokens.primary)
''';

  static const _colorsDart = '''
WashQrCode(value: url, size: 112, foreground: tokens.primary)
WashQrCode(value: url, size: 112, foreground: tokens.onSurface, background: tokens.palette.base200)
''';

  static const _interactiveDart = '''
WashInput(label: 'Payload', requiredMark: true, maxLines: 4, onChanged: …)
WashQrCode(value: payload, size: 180, foreground: tokens.primary)
WashQrDownloadButton(value: payload, onPng: …)
''';

  static const _studioDart = '''
WashQrCode(
  value: 'pigment:ultramarine-deep-v2',
  size: 140,
  level: WashQrLevel.m,
  foreground: tokens.palette.secondary,
)
''';

  static const _downloadDart = '''
WashQrDownloadButton(
  value: url,
  size: 192,
  onPng: (bytes) { /* save or share PNG */ },
)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'QR code',
      description:
          'Encode studio URLs and pigment ids with WashQrCode (qr package).',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Sample payloads',
          description:
              'A Menzies Design URL and plain text encoded as QR codes',
          child: WashShowcaseTabs(
            preview: const _BasicSamples(),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Sizes',
          title: 'Small, medium, large',
          description: 'Pixel size controls module scale',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _SizeSamples(),
            dartSource: _sizesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Colors',
          title: 'Theme-aware pigments',
          description:
              'Foreground and background read from Wash tokens so codes track the active pigment',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const _ColorSamples(),
            dartSource: _colorsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Interactive',
          title: 'Live payload',
          description: 'Edit the text or URL',
          child: WashShowcaseTabs(
            preview: const _InteractiveSample(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Studio',
          title: 'Pigment and session demos',
          description:
              'Sample ids and deep links you might print on a wash plate or session',
          tint: WashGalleryPanelTint.blue,
          child: WashShowcaseTabs(
            preview: const _StudioSamples(),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Download',
          title: 'Export PNG',
          description: 'Canvas QR with an icon download control',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _DownloadSample(),
            dartSource: _downloadDart,
          ),
        ),
      ],
    );
  }
}

Widget _classLabel(BuildContext context, String value) {
  return Text(
    value,
    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(
      fontSize: 10.4,
      fontFeatures: const [FontFeature.tabularFigures()],
    ),
  );
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
        const SizedBox(height: 8),
        _classLabel(context, label),
      ],
    );
  }
}

class _BasicSamples extends StatelessWidget {
  const _BasicSamples();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _Sample(
          label: 'WashQrCode · URL',
          child: WashQrFrame(
            child: WashQrCode(
              value: WashQrcodeGalleryPage.sampleUrl,
              size: 144,
              foreground: tokens.onSurface,
              background: tokens.palette.base100,
              semanticLabel: 'Menzies Design palette link',
            ),
          ),
        ),
        _Sample(
          label: 'WashQrCode · text',
          child: WashQrFrame(
            child: WashQrCode(
              value: WashQrcodeGalleryPage.sampleText,
              size: 144,
              foreground: tokens.onSurface,
              background: tokens.palette.base100,
              semanticLabel: 'Menzies Design studio text',
            ),
          ),
        ),
      ],
    );
  }
}

class _SizeSamples extends StatelessWidget {
  const _SizeSamples();

  static const _sizes = <(String, double, String)>[
    ('Small', 96, 'size: 96'),
    ('Medium', 160, 'size: 160'),
    ('Large', 224, 'size: 224'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 24,
      runSpacing: 24,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (final s in _sizes)
          _Sample(
            label: s.$3,
            child: Column(
              children: [
                WashGalleryLabelInk(s.$1),
                const SizedBox(height: 8),
                WashQrFrame(
                  child: WashQrCode(
                    value: WashQrcodeGalleryPage.sampleUrl,
                    size: s.$2,
                    foreground: tokens.primary,
                    background: tokens.palette.base100,
                    semanticLabel: '${s.$1} QR',
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _ColorSamples extends StatelessWidget {
  const _ColorSamples();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final items = <(String, Color, Color, String)>[
      ('Primary', tokens.primary, tokens.palette.base100, 'fg primary'),
      (
        'Secondary',
        tokens.palette.secondary,
        tokens.palette.base100,
        'fg secondary',
      ),
      (
        'Accent',
        tokens.palette.accent,
        tokens.palette.base100,
        'fg accent',
      ),
      (
        'Neutral',
        tokens.palette.neutral,
        tokens.palette.base100,
        'fg neutral',
      ),
      (
        'Ink on wash',
        tokens.onSurface,
        tokens.palette.base200,
        'fg base-content',
      ),
    ];
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 1024
            ? 5
            : c.maxWidth >= 640
                ? 3
                : 2;
        final gap = 24.0;
        final w = (c.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final item in items)
              SizedBox(
                width: w,
                child: _Sample(
                  label: item.$4,
                  child: Column(
                    children: [
                      WashGalleryLabelInk(item.$1),
                      const SizedBox(height: 8),
                      WashQrFrame(
                        child: WashQrCode(
                          value: WashQrcodeGalleryPage.sampleUrl,
                          size: 112,
                          foreground: item.$2,
                          background: item.$3,
                          semanticLabel: '${item.$1} QR',
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _InteractiveSample extends StatefulWidget {
  const _InteractiveSample();

  @override
  State<_InteractiveSample> createState() => _InteractiveSampleState();
}

class _InteractiveSampleState extends State<_InteractiveSample> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: WashQrcodeGalleryPage.sampleUrl);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final payload = _controller.text;
    return LayoutBuilder(
      builder: (context, c) {
        final row = c.maxWidth >= 1024;
        final field = Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            WashInput(
              controller: _controller,
              label: 'Payload',
              requiredMark: true,
              hint: 'https://menzies.design/…',
              maxLines: 5,
              onChanged: (_) => setState(() {}),
            ),
            const SizedBox(height: 8),
            Text(
              'Empty payloads fall back to a short studio placeholder so the code stays scannable.',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            ),
          ],
        );
        final preview = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _Sample(
              label: 'WashQrCode · live',
              child: WashQrFrame(
                child: WashQrCode(
                  value: payload,
                  size: 180,
                  foreground: tokens.primary,
                  background: tokens.palette.base100,
                  semanticLabel: 'Interactive QR',
                ),
              ),
            ),
            const SizedBox(height: 12),
            WashQrDownloadButton(
              value: payload,
              size: 180,
              foreground: tokens.primary,
              background: tokens.palette.base100,
              onPng: (png) => washQrCopyPngNotice(context, png),
            ),
          ],
        );
        if (!row) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              field,
              const SizedBox(height: 20),
              preview,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: field),
            const SizedBox(width: 20),
            preview,
          ],
        );
      },
    );
  }
}

class _StudioSamples extends StatelessWidget {
  const _StudioSamples();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 1024
            ? 3
            : c.maxWidth >= 640
                ? 2
                : 1;
        final gap = 24.0;
        final w = (c.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final demo in WashQrcodeGalleryPage._studioDemos)
              SizedBox(
                width: w,
                child: _Sample(
                  label: demo.$3,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        demo.$1,
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        demo.$2,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 12,
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                      const SizedBox(height: 12),
                      WashQrFrame(
                        child: WashQrCode(
                          value: demo.$2,
                          size: 140,
                          level: WashQrLevel.m,
                          foreground: tokens.palette.secondary,
                          background: tokens.palette.base100,
                          semanticLabel: demo.$1,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _DownloadSample extends StatelessWidget {
  const _DownloadSample();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _Sample(
          label: 'WashQrCode · PNG',
          child: WashQrFrame(
            child: WashQrCode(
              value: WashQrcodeGalleryPage.sampleUrl,
              size: 192,
              foreground: tokens.onSurface,
              background: tokens.palette.base100,
              semanticLabel: 'Downloadable Menzies Design QR',
            ),
          ),
        ),
        WashQrDownloadButton(
          value: WashQrcodeGalleryPage.sampleUrl,
          size: 192,
          foreground: tokens.onSurface,
          background: tokens.palette.base100,
          onPng: (png) => washQrCopyPngNotice(context, png),
        ),
      ],
    );
  }
}
