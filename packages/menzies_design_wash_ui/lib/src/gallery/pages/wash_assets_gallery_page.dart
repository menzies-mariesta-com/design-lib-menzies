import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_navigation.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';

const String _kPackage = 'menzies_design_wash_ui';

class WashAssetsFontsGalleryPage extends StatelessWidget {
  const WashAssetsFontsGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const WashGalleryPageHero(
          kicker: 'Brand kit · Assets',
          title: 'Fonts',
          description:
              'Demo typefaces in a planned bento: Fraunces as the hero tile, '
              'Maple Mono beside it, Adwaita faces as the smaller plates.',
        ),
        const SizedBox(height: 32),
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= 900;
            if (!wide) {
              return Column(
                children: [
                  for (var i = 0; i < _fonts.length; i++) ...[
                    if (i > 0) const SizedBox(height: 16),
                    _FontCard(font: _fonts[i], fill: false),
                  ],
                ],
              );
            }
            final height = constraints.maxWidth >= 1200 ? 1000.0 : 1040.0;
            return SizedBox(
              height: height,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(
                    flex: 2,
                    child: _FontCard(font: _fonts[0], fill: true, hero: true),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    flex: 2,
                    child: Column(
                      children: [
                        Expanded(child: _FontCard(font: _fonts[1], fill: true)),
                        const SizedBox(height: 16),
                        Expanded(
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Expanded(
                                child: _FontCard(font: _fonts[2], fill: true),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: _FontCard(font: _fonts[3], fill: true),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

class WashAssetsImagesGalleryPage extends StatelessWidget {
  const WashAssetsImagesGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Brand kit · Assets',
      title: 'Images',
      description: 'Local brand artwork. Download any file below.',
      sections: [
        WashGallerySection(
          eyebrow: 'Raster and vector',
          title: 'Brand artwork',
          description: 'Favicon, sprite, and hero plate',
          tint: WashGalleryPanelTint.ochre,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final cols = constraints.maxWidth >= 1200
                  ? 3
                  : constraints.maxWidth >= 700
                      ? 2
                      : 1;
              const gap = 20.0;
              final width = (constraints.maxWidth - gap * (cols - 1)) / cols;
              return Wrap(
                spacing: gap,
                runSpacing: gap,
                children: [
                  for (final image in _images)
                    SizedBox(
                      width: width,
                      child: _ImageCard(image: image),
                    ),
                ],
              );
            },
          ),
        ),
      ],
    );
  }
}

class _FontDef {
  const _FontDef({
    required this.name,
    required this.family,
    required this.role,
    required this.usage,
    required this.cssVariable,
    required this.tailwindClass,
    required this.sample,
    required this.source,
    required this.license,
    required this.files,
    this.hero = false,
    this.panel,
  });

  final String name;
  final String family;
  final String role;
  final String usage;
  final String? cssVariable;
  final String tailwindClass;
  final String sample;
  final String source;
  final String license;
  final List<_FontFile> files;
  final bool hero;
  final WashGalleryPanelTint? panel;
}

class _FontFile {
  const _FontFile(this.weight, this.filename);
  final int weight;
  final String filename;
}

const _fonts = <_FontDef>[
  _FontDef(
    name: 'Fraunces',
    family: 'Fraunces',
    role: 'Display headings',
    usage: 'Display headings via font-display',
    cssVariable: '--font-display',
    tailwindClass: 'font-display',
    sample: 'Pigment desk gallery',
    source: 'Bundled in Wash UI styles.css (latin woff2)',
    license: 'SIL Open Font License 1.1',
    files: [
      _FontFile(500, 'fraunces-latin-500-normal.woff2'),
      _FontFile(600, 'fraunces-latin-600-normal.woff2'),
      _FontFile(700, 'fraunces-latin-700-normal.woff2'),
    ],
    hero: true,
    panel: WashGalleryPanelTint.blue,
  ),
  _FontDef(
    name: 'Maple Mono',
    family: 'MapleMono',
    role: 'Body and monospace UI',
    usage: 'UI body and code via font-sans',
    cssVariable: '--font-sans, --font-mono',
    tailwindClass: 'font-sans',
    sample: 'Wash tokens · btn-primary · 0123456789',
    source: 'Bundled in Wash UI styles.css (latin woff2)',
    license: 'SIL Open Font License 1.1',
    files: [
      _FontFile(400, 'maple-mono-latin-400-normal.woff2'),
      _FontFile(500, 'maple-mono-latin-500-normal.woff2'),
      _FontFile(600, 'maple-mono-latin-600-normal.woff2'),
      _FontFile(700, 'maple-mono-latin-700-normal.woff2'),
    ],
    panel: WashGalleryPanelTint.ochre,
  ),
  _FontDef(
    name: 'Adwaita Sans',
    family: 'AdwaitaSans',
    role: 'GNOME UI sans-serif',
    usage: 'GNOME / libadwaita sans',
    cssVariable: null,
    tailwindClass: 'font-sans',
    sample: 'Libadwaita · adaptive layout · 0123456789',
    source: 'GNOME adwaita-fonts / @fontsource/adwaita-sans',
    license: 'SIL Open Font License 1.1',
    files: [
      _FontFile(400, 'adwaita-sans-latin-400-normal.woff2'),
      _FontFile(500, 'adwaita-sans-latin-500-normal.woff2'),
      _FontFile(600, 'adwaita-sans-latin-600-normal.woff2'),
      _FontFile(700, 'adwaita-sans-latin-700-normal.woff2'),
    ],
  ),
  _FontDef(
    name: 'Adwaita Mono',
    family: 'AdwaitaMono',
    role: 'GNOME UI monospace',
    usage: 'GNOME monospace companion',
    cssVariable: null,
    tailwindClass: 'font-mono',
    sample: 'gtk4-rs · gsettings · 0123456789',
    source: 'GNOME adwaita-fonts / @fontsource/adwaita-mono',
    license: 'SIL Open Font License 1.1',
    files: [
      _FontFile(400, 'adwaita-mono-latin-400-normal.woff2'),
      _FontFile(700, 'adwaita-mono-latin-700-normal.woff2'),
    ],
    panel: WashGalleryPanelTint.rose,
  ),
];

class _FontCard extends StatelessWidget {
  const _FontCard({
    required this.font,
    required this.fill,
    this.hero = false,
  });

  final _FontDef font;
  final bool fill;
  final bool hero;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final tint = _tintColor(tokens, font.panel);
    return Container(
      decoration: BoxDecoration(
        color: tint == null
            ? tokens.surface.withValues(alpha: 0.72)
            : Color.alphaBlend(tint.withValues(alpha: 0.08), tokens.surface)
                .withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  font.role.toUpperCase(),
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 10.5,
                    letterSpacing: 0.88,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  font.name,
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: hero ? 28 : 20,
                    height: 1.15,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.4,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  font.usage,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 13,
                    height: 1.45,
                  ),
                ),
              ],
            ),
          ),
          if (fill)
            Expanded(child: _FontBody(font: font, fill: true))
          else
            _FontBody(font: font, fill: false),
        ],
      ),
    );
  }

  Color? _tintColor(WashTokens tokens, WashGalleryPanelTint? tint) {
    return switch (tint) {
      WashGalleryPanelTint.blue => tokens.palette.primary,
      WashGalleryPanelTint.ochre => tokens.palette.warning,
      WashGalleryPanelTint.rose => tokens.palette.error,
      _ => null,
    };
  }
}

class _FontBody extends StatelessWidget {
  const _FontBody({required this.font, required this.fill});

  final _FontDef font;
  final bool fill;

  @override
  Widget build(BuildContext context) {
    final content = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _FontPreview(font: font, hero: font.hero),
        const SizedBox(height: 16),
        _FontMeta(font: font, wide: font.hero),
        const SizedBox(height: 16),
        _FontFiles(font: font, scroll: false),
      ],
    );
    return Padding(
      padding: const EdgeInsets.all(20),
      child: fill ? SingleChildScrollView(child: content) : content,
    );
  }
}

class _FontPreview extends StatelessWidget {
  const _FontPreview({required this.font, required this.hero});

  final _FontDef font;
  final bool hero;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.78),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'PREVIEW',
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 10.5,
              letterSpacing: 0.88,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            font.sample,
            style: TextStyle(
              fontFamily: font.family,
              fontSize: hero ? 30 : 24,
              height: 1.16,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.3,
              color: tokens.onSurface,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
            style: TextStyle(
              fontFamily: font.family,
              fontSize: hero ? 15 : 13,
              height: 1.5,
              color: tokens.inkMuted,
            ),
          ),
        ],
      ),
    );
  }
}

class _FontMeta extends StatelessWidget {
  const _FontMeta({required this.font, required this.wide});

  final _FontDef font;
  final bool wide;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final items = <({String label, String value})>[
      (label: 'CSS variable', value: font.cssVariable ?? 'none'),
      (label: 'Tailwind', value: font.tailwindClass),
      (label: 'Source', value: font.source),
      (label: 'License', value: font.license),
    ];
    return LayoutBuilder(
      builder: (context, constraints) {
        final two = wide && constraints.maxWidth >= 360;
        final width =
            two ? (constraints.maxWidth - 12) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: 12,
          runSpacing: 8,
          children: [
            for (final item in items)
              SizedBox(
                width: width,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.label.toUpperCase(),
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 10,
                        letterSpacing: 0.8,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      item.value,
                      style: WashTypography.body(
                        item.label == 'Source' || item.label == 'License'
                            ? tokens.inkMuted
                            : tokens.onSurface,
                      ).copyWith(
                        fontSize: 12,
                        height: 1.4,
                        fontFamily: item.label == 'CSS variable' ||
                                item.label == 'Tailwind'
                            ? 'MapleMono'
                            : null,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        );
      },
    );
  }
}

class _FontFiles extends StatelessWidget {
  const _FontFiles({required this.font, required this.scroll});

  final _FontDef font;
  final bool scroll;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final list = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < font.files.length; i++) ...[
          if (i > 0) const SizedBox(height: 8),
          _FontFileRow(file: font.files[i]),
        ],
      ],
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'FONT FILES',
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontSize: 10.5,
            letterSpacing: 0.88,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        if (scroll)
          Expanded(child: SingleChildScrollView(child: list))
        else
          list,
      ],
    );
  }
}

class _FontFileRow extends StatelessWidget {
  const _FontFileRow({required this.file});

  final _FontFile file;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  file.filename,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 12,
                    fontFamily: 'MapleMono',
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Weight ${file.weight} · WOFF2',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          WashButton(
            variant: WashButtonVariant.outline,
            size: WashButtonSize.sm,
            onPressed: () {
              final download = WashGalleryNavigation.downloadOf(context);
              if (download != null) {
                download('/fonts/${file.filename}', file.filename);
              } else {
                Clipboard.setData(ClipboardData(text: file.filename));
              }
            },
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                WashLucideIcon('download', size: 14),
                SizedBox(width: 6),
                Text('Download'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ImageDef {
  const _ImageDef({
    required this.name,
    required this.filename,
    required this.usage,
    required this.format,
    required this.alt,
    required this.asset,
    required this.svg,
    required this.favicon,
  });

  final String name;
  final String filename;
  final String usage;
  final String format;
  final String alt;
  final String asset;
  final bool svg;
  final bool favicon;
}

const _images = <_ImageDef>[
  _ImageDef(
    name: 'Pigment mark favicon',
    filename: 'favicon.svg',
    usage: 'Favicon and loading mark',
    format: 'SVG',
    alt: 'Menzies Design pigment wash favicon',
    asset: 'assets/brand/favicon.svg',
    svg: true,
    favicon: true,
  ),
  _ImageDef(
    name: 'Social icon sprite',
    filename: 'icons.svg',
    usage: 'Footer social symbols',
    format: 'SVG',
    alt: 'Sprite sheet with Bluesky, Discord, GitHub, and X icons',
    asset: 'assets/brand/icons.svg',
    svg: true,
    favicon: false,
  ),
  _ImageDef(
    name: 'Coastal fog watercolor plate',
    filename: 'hero.png',
    usage: 'Hero and gallery demos',
    format: 'PNG',
    alt: 'Menzies Design watercolor hero plate',
    asset: 'assets/brand/hero.png',
    svg: false,
    favicon: false,
  ),
];

class _ImageCard extends StatelessWidget {
  const _ImageCard({required this.image});

  final _ImageDef image;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.72),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  image.format.toUpperCase(),
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 10.5,
                    letterSpacing: 0.88,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  image.name,
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: 18,
                    height: 1.2,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.2,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  image.usage,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 13,
                    height: 1.45,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  constraints: const BoxConstraints(minHeight: 160),
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: tokens.surfaceContainer.withValues(alpha: 0.8),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: tokens.inkBorder.withValues(alpha: 0.7),
                    ),
                  ),
                  child: Center(child: _preview(tokens)),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        image.filename,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 13,
                          fontFamily: 'MapleMono',
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    WashButton(
                      size: WashButtonSize.sm,
                      onPressed: () {
                        final download =
                            WashGalleryNavigation.downloadOf(context);
                        if (download != null) {
                          download('/brand/${image.filename}', image.filename);
                        } else {
                          Clipboard.setData(
                              ClipboardData(text: image.filename));
                        }
                      },
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          WashLucideIcon('download', size: 14),
                          SizedBox(width: 6),
                          Text('Download'),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _preview(WashTokens tokens) {
    if (image.svg) {
      return SvgPicture.asset(
        image.asset,
        package: _kPackage,
        width: image.favicon ? 64 : null,
        height: image.favicon ? 64 : 80,
        fit: BoxFit.contain,
        semanticsLabel: image.alt,
        colorFilter: image.favicon
            ? ColorFilter.mode(tokens.palette.primary, BlendMode.srcIn)
            : null,
      );
    }
    return Image.asset(
      image.asset,
      package: _kPackage,
      height: 190,
      fit: BoxFit.contain,
      filterQuality: FilterQuality.medium,
      semanticLabel: image.alt,
    );
  }
}
