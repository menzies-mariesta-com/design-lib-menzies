
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_navigation.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';

class _Stat {
  const _Stat(this.title, this.value, this.desc, this.icon, this.tone);
  final String title;
  final int value;
  final String desc;
  final String icon;
  final String tone;
}

class _Library {
  const _Library(
    this.name,
    this.description,
    this.icon,
    this.tone,
    this.href,
  );
  final String name;
  final String description;
  final String icon;
  final String tone;
  final String href;
}

const _stats = <_Stat>[
  _Stat('Component galleries', 84, 'Interactive examples', 'layers', 'primary'),
  _Stat('Templates', 14, 'Auth and data layouts', 'folder-open', 'secondary'),
  _Stat('Doc guides', 6, 'Theming to customization', 'book-open', 'accent'),
  _Stat('Pigment themes', 30, 'Light and dark paper', 'palette', 'warning'),
  _Stat('Chart galleries', 31, 'Pigment-aware analytics', 'chart-line', 'info'),
];

const _libraries = <_Library>[
  _Library('React', 'Components, provider, and hooks', 'atom', 'info',
      'https://react.dev'),
  _Library('TypeScript', 'Typed APIs across the monorepo', 'file-code',
      'primary', 'https://www.typescriptlang.org'),
  _Library('Tailwind CSS', 'Utility layout and responsive tokens', 'wind',
      'accent', 'https://tailwindcss.com'),
  _Library('daisyUI', 'Semantic components and theme slots', 'flower',
      'secondary', 'https://daisyui.com'),
  _Library('Simple Icons', 'Brand SVG icons', 'shapes', 'neutral',
      'https://simpleicons.org'),
  _Library('Lucide', 'Tree-shakeable UI icon set', 'feather', 'warning',
      'https://lucide.dev'),
  _Library('Vite', 'Library and demo build tooling', 'zap', 'success',
      'https://vite.dev'),
  _Library('ApexCharts', 'Pigment-aware chart primitives', 'chart-line',
      'error', 'https://apexcharts.com'),
];

/// Web `OverviewPage`: wash hero, stats strip, and open-library credits.
class WashOverviewGalleryPage extends StatelessWidget {
  const WashOverviewGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final navigate = WashGalleryNavigation.callbackOf(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _OverviewHero(
          onExplore: () => navigate?.call('buttons'),
          onDocs: () => navigate?.call('docs-start'),
        ),
        const SizedBox(height: 24),
        _StatsStrip(stats: _stats),
        const SizedBox(height: 24),
        WashGalleryPanel(
          header: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const WashGalleryLabelInk('Acknowledge'),
              const SizedBox(height: 4),
              Text(
                'Built on open libraries',
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 24,
                  height: 32 / 24,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.48,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Brands via Simple Icons. UI glyphs via Lucide.',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 14,
                  height: 1.5,
                ),
              ),
            ],
          ),
          child: _LibraryGrid(
            libraries: _libraries,
            maxColumns: 4,
            breakpoints: const [640, 1024, 1280],
          ),
        ),
      ],
    );
  }
}

class _OverviewHero extends StatelessWidget {
  const _OverviewHero({required this.onExplore, required this.onDocs});

  final VoidCallback onExplore;
  final VoidCallback onDocs;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _WashHeroPanel(
      kicker: 'Menzies Design',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.end,
            spacing: 8,
            runSpacing: 0,
            children: [
              Text(
                'Wash UI',
                style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                  fontSize: 48,
                  height: 1.08,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -1.2,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Text(
                  'v1.4.0',
                  style: WashTypography.body(
                    tokens.onSurface.withValues(alpha: 0.6),
                  ).copyWith(fontSize: 12, fontWeight: FontWeight.w400),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 672),
            child: Text(
              'A watercolor-first component library with pigment themes and '
              'production-ready templates. Gallery HTML/JSX/Svelte tabs paste '
              'full daisyUI kits (calendar-style complete files); use the npm '
              'package when you want the maintained primitive API.',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 16,
                height: 1.5,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          const SizedBox(height: 20),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              WashButton(
                onPressed: onExplore,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Flexible(child: Text('Explore components')),
                    SizedBox(width: 8),
                    WashLucideIcon('arrow-right', size: 16, strokeWidth: 2),
                  ],
                ),
              ),
              WashButton(
                onPressed: onDocs,
                variant: WashButtonVariant.outline,
                tint: WashButtonVariant.secondary,
                child: const Text('Read docs'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _WashHeroPanel extends StatelessWidget {
  const _WashHeroPanel({required this.kicker, required this.child});

  final String kicker;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo =
        kWashAtmosphereByTheme[washPaletteId(tokens.pigmentId, tokens.mode)] ??
            kWashAtmosphereByTheme['mineral']!;
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          Positioned.fill(
            child:
                WashPanelWash(tint: WashGalleryPanelTint.none, tokens: tokens),
          ),
          Positioned(
            left: -40,
            top: -48,
            child: _WashBlob(
              size: 224,
              color: atmo.washA,
              opacity: 0.585,
              blur: 40,
            ),
          ),
          Positioned(
            right: 0,
            bottom: -64,
            child: _WashBlob(
              size: 192,
              color: atmo.washB,
              opacity: 0.495,
              blur: 40,
            ),
          ),
          Positioned.fill(
            child: IgnorePointer(
              child: LayoutBuilder(
                builder: (context, constraints) => Stack(
                  children: [
                    Positioned(
                      left: constraints.maxWidth * 0.75 - 64,
                      top: constraints.maxHeight / 3,
                      child: _WashBlob(
                        size: 128,
                        color: atmo.washC,
                        opacity: 0.36,
                        blur: 24,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 40),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashGalleryLabelInk(kicker),
                const SizedBox(height: 8),
                child,
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _WashBlob extends StatelessWidget {
  const _WashBlob({
    required this.size,
    required this.color,
    required this.opacity,
    this.blur = 0,
  });

  final double size;
  final Color color;
  final double opacity;
  final double blur;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _WashBlobPainter(
          color: color,
          opacity: opacity,
          blur: blur,
        ),
      ),
    );
  }
}

class _WashBlobPainter extends CustomPainter {
  const _WashBlobPainter({
    required this.color,
    required this.opacity,
    required this.blur,
  });

  final Color color;
  final double opacity;
  final double blur;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final paint = Paint()
      ..shader = RadialGradient(
        colors: [
          color.withValues(alpha: opacity),
          color.withValues(alpha: 0),
        ],
        stops: const [0, 0.7],
      ).createShader(rect);
    if (blur > 0) {
      paint.maskFilter = MaskFilter.blur(BlurStyle.normal, blur);
    }
    canvas.drawRect(rect, paint);
  }

  @override
  bool shouldRepaint(covariant _WashBlobPainter oldDelegate) {
    return oldDelegate.color != color ||
        oldDelegate.opacity != opacity ||
        oldDelegate.blur != blur;
  }
}

class _StatsStrip extends StatelessWidget {
  const _StatsStrip({required this.stats});

  final List<_Stat> stats;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final horizontal = MediaQuery.sizeOf(context).width >= 640;
    final children = <Widget>[];
    for (var i = 0; i < stats.length; i++) {
      final stat = stats[i];
      if (i > 0) {
        children.add(
          Container(
            width: horizontal ? 1 : double.infinity,
            height: horizontal ? null : 1,
            color: tokens.inkBorder.withValues(alpha: 0.7),
          ),
        );
      }
      final cell = _StatCell(stat: stat);
      children.add(horizontal ? Expanded(child: cell) : cell);
    }
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(16),
      ),
      clipBehavior: Clip.antiAlias,
      child: horizontal
          ? IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: children,
              ),
            )
          : Column(children: children),
    );
  }
}

class _StatCell extends StatelessWidget {
  const _StatCell({required this.stat});

  final _Stat stat;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final tone = washTone(tokens, stat.tone);
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  stat.title,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${stat.value}',
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: 30,
                    height: 1.1,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  stat.desc,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
          Opacity(
            opacity: 0.8,
            child: WashLucideIcon(
              stat.icon,
              size: 28,
              color: tone,
              strokeWidth: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}

/// Shared link card used by Overview and Support.
class WashResourceLinkCard extends StatefulWidget {
  const WashResourceLinkCard({
    required this.name,
    required this.description,
    required this.icon,
    required this.tone,
    this.supportLabel,
    this.onTap,
    super.key,
  });

  final String name;
  final String description;
  final String icon;
  final String tone;
  final String? supportLabel;
  final VoidCallback? onTap;

  @override
  State<WashResourceLinkCard> createState() => _WashResourceLinkCardState();
}

class _WashResourceLinkCardState extends State<WashResourceLinkCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final tone = washTone(tokens, widget.tone);
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 160),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: _hover
                ? Color.alphaBlend(
                    tokens.palette.primary.withValues(alpha: 0.05),
                    tokens.surface,
                  )
                : tokens.surface.withValues(alpha: 0.8),
            border: Border.all(
              color: _hover
                  ? tokens.palette.primary.withValues(alpha: 0.5)
                  : tokens.inkBorder.withValues(alpha: 0.7),
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 36,
                height: 36,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Color.alphaBlend(
                    tone.withValues(alpha: 0.1),
                    tokens.surface,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: WashLucideIcon(
                  widget.icon,
                  size: 16,
                  color: tone,
                  strokeWidth: 2,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.name,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 14,
                        height: 1.4,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      widget.description,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 12,
                        height: 1.4,
                      ),
                    ),
                    if (widget.supportLabel != null) ...[
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              widget.supportLabel!,
                              style: WashTypography.body(tokens.palette.primary)
                                  .copyWith(
                                fontSize: 12,
                                height: 1.4,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          const SizedBox(width: 4),
                          Opacity(
                            opacity: 0.7,
                            child: WashLucideIcon(
                              'external-link',
                              size: 12,
                              color: tokens.palette.primary,
                              strokeWidth: 2,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _LibraryGrid extends StatelessWidget {
  const _LibraryGrid({
    required this.libraries,
    required this.maxColumns,
    required this.breakpoints,
  });

  final List<_Library> libraries;
  final int maxColumns;
  final List<double> breakpoints;

  @override
  Widget build(BuildContext context) {
    final viewport = MediaQuery.sizeOf(context).width;
    var cols = 1;
    if (viewport >= breakpoints[0]) cols = 2;
    if (breakpoints.length > 1 && viewport >= breakpoints[1]) cols = 3;
    if (breakpoints.length > 2 && viewport >= breakpoints[2]) cols = maxColumns;
    const gap = 12.0;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final library in libraries)
              SizedBox(
                width: width,
                child: WashResourceLinkCard(
                  name: library.name,
                  description: library.description,
                  icon: library.icon,
                  tone: library.tone,
                ),
              ),
          ],
        );
      },
    );
  }
}

Color washTone(WashTokens tokens, String tone) {
  return switch (tone) {
    'primary' => tokens.palette.primary,
    'secondary' => tokens.palette.secondary,
    'accent' => tokens.palette.accent,
    'info' => tokens.palette.info,
    'success' => tokens.palette.success,
    'warning' => tokens.palette.warning,
    'error' => tokens.palette.error,
    _ => tokens.palette.neutral,
  };
}
