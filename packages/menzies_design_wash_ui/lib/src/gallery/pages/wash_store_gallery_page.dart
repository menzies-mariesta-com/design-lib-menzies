import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_navigation.dart';

const String _kPackage = 'menzies_design_wash_ui';
const String _kPayhipUrl = 'https://payhip.com/b/bq4A6';

class WashStoreMerchGalleryPage extends StatelessWidget {
  const WashStoreMerchGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _StoreHeader(
          title: 'Merch',
          description:
              'Studio hoodies for Wash UI. Front and back photos from the upcoming embroidery drop.',
          badges: const [
            _StoreBadge(label: 'Embroidery hoodie', icon: 'shirt'),
            _StoreBadge(label: 'Coming soon', warning: true),
          ],
        ),
        const SizedBox(height: 24),
        Align(
          alignment: Alignment.centerLeft,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 576),
            child: _StoreShowcaseCard(
              title: 'Wash UI Hoodie',
              comingSoon: true,
              coverAsset: 'assets/brand/hoodie-front.png',
              coverFit: BoxFit.contain,
              gallery: const [
                _StoreSlide(
                  asset: 'assets/brand/hoodie-front.png',
                  alt: 'Wash UI hoodie front with oversized favicon mark',
                  contain: true,
                ),
                _StoreSlide(
                  asset: 'assets/brand/hoodie-back.png',
                  alt:
                      'Wash UI hoodie back with favicon mark and Fraunces wordmark',
                  contain: true,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Front and back embroidery previews. Store checkout opens when the drop ships.',
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

class WashStorePageGalleryPage extends StatelessWidget {
  const WashStorePageGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const _StoreHeader(title: 'Page'),
        const SizedBox(height: 24),
        Align(
          alignment: Alignment.centerLeft,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 576),
            child: _StoreShowcaseCard(
              title: 'Documentation Website',
              priceLabel: '10',
              subtitle:
                  'Ready-to-ship SvelteKit documentation site: marketing home, Markdown docs, Cmd+K search, pigment themes, and Netlify deploy.',
              coverAsset: 'assets/brand/docs-template-docs.jpg',
              coverFit: BoxFit.cover,
              gallery: const [
                _StoreSlide(
                  asset: 'assets/brand/docs-template-docs.jpg',
                  alt: 'Documentation Website: Getting started page',
                  contain: false,
                ),
                _StoreSlide(
                  asset: 'assets/brand/docs-template-theming.jpg',
                  alt: 'Documentation Website: Theming guide',
                  contain: false,
                ),
                _StoreSlide(
                  asset: 'assets/brand/docs-template-home.jpg',
                  alt: 'Documentation Website: marketing home',
                  contain: false,
                ),
              ],
              highlights: const [
                'Docs shell: sidebar, breadcrumbs, TOC, prev/next',
                'Command search (Ctrl / ⌘ K) over every page',
                'Theme chrome: paper mode + Wash pigment picker',
                'Markdown, Shiki, SEO, and Netlify-ready deploy',
              ],
              sellingPoints: const [
                _SellingPoint(
                  title: 'Brand home into docs.',
                  detail:
                      'Marketing home with Wash branding and a clear path into Getting started, guides, and reference.',
                ),
                _SellingPoint(
                  title: 'Docs shell that ships.',
                  detail:
                      'Collapsible sidebar, breadcrumbs, TOC, and prev/next so Markdown feels like a product, not a wiki dump.',
                ),
                _SellingPoint(
                  title: 'Search and themes.',
                  detail:
                      'Ctrl / ⌘ K command search, light/dark paper mode, and thirty Wash pigments in the chrome.',
                ),
                _SellingPoint(
                  title: 'SEO and Netlify.',
                  detail:
                      'Titles, Open Graph, sitemap, robots, JSON-LD, and Netlify adapter config included.',
                ),
                _SellingPoint(
                  title: 'Lifetime support.',
                  detail:
                      'Updates as Wash UI and the docs shell evolve, with help customizing brand and content.',
                ),
              ],
              primaryCtaLabel: 'Unlock template',
              onPrimaryCta: () {
                WashGalleryNavigation.openExternalOf(context)
                    ?.call(_kPayhipUrl);
              },
            ),
          ),
        ),
      ],
    );
  }
}

class _StoreHeader extends StatelessWidget {
  const _StoreHeader({required this.title, this.description, this.badges});

  final String title;
  final String? description;
  final List<_StoreBadge>? badges;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: WashTypography.displayLarge(tokens.onSurface).copyWith(
            fontSize: 36,
            height: 1.12,
            fontWeight: FontWeight.w600,
            letterSpacing: -0.6,
          ),
        ),
        if (description != null) ...[
          const SizedBox(height: 12),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 672),
            child: Text(
              description!,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 15,
                height: 1.6,
              ),
            ),
          ),
        ],
        if (badges != null && badges!.isNotEmpty) ...[
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: badges!,
          ),
        ],
      ],
    );
  }
}

class _StoreBadge extends StatelessWidget {
  const _StoreBadge({required this.label, this.icon, this.warning = false});

  final String label;
  final String? icon;
  final bool warning;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = warning ? tokens.palette.warning : tokens.inkMuted;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
      decoration: BoxDecoration(
        color: warning
            ? Color.alphaBlend(
                tokens.palette.warning.withValues(alpha: 0.12),
                tokens.surface,
              )
            : tokens.surfaceContainer.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: warning
              ? tokens.palette.warning.withValues(alpha: 0.5)
              : tokens.inkBorder.withValues(alpha: 0.6),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            WashLucideIcon(icon!, size: 13, color: color, strokeWidth: 2),
            const SizedBox(width: 6),
          ],
          Text(
            label,
            style: WashTypography.body(color).copyWith(
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _SellingPoint {
  const _SellingPoint({required this.title, required this.detail});
  final String title;
  final String detail;
}

class _StoreSlide {
  const _StoreSlide({
    required this.asset,
    required this.alt,
    required this.contain,
  });
  final String asset;
  final String alt;
  final bool contain;
}

class _StoreShowcaseCard extends StatefulWidget {
  const _StoreShowcaseCard({
    required this.title,
    required this.coverAsset,
    required this.coverFit,
    required this.gallery,
    this.priceLabel,
    this.subtitle,
    this.highlights = const [],
    this.sellingPoints = const [],
    this.comingSoon = false,
    this.primaryCtaLabel = 'Unlock template',
    this.onPrimaryCta,
  });

  final String title;
  final String coverAsset;
  final BoxFit coverFit;
  final List<_StoreSlide> gallery;
  final String? priceLabel;
  final String? subtitle;
  final List<String> highlights;
  final List<_SellingPoint> sellingPoints;
  final bool comingSoon;
  final String primaryCtaLabel;
  final VoidCallback? onPrimaryCta;

  @override
  State<_StoreShowcaseCard> createState() => _StoreShowcaseCardState();
}

class _StoreShowcaseCardState extends State<_StoreShowcaseCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: GestureDetector(
        onTap: _open,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          transform: Matrix4.translationValues(0, _hover ? -2 : 0, 0),
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
            boxShadow: [
              BoxShadow(
                color: tokens.onSurface.withValues(
                  alpha: _hover ? 0.12 : 0.06,
                ),
                blurRadius: _hover ? 22 : 10,
                offset: Offset(0, _hover ? 10 : 4),
              ),
            ],
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                height: 300,
                decoration: BoxDecoration(
                  color: tokens.surfaceContainer,
                  border: Border(
                    bottom: BorderSide(
                      color: tokens.inkBorder.withValues(alpha: 0.6),
                    ),
                  ),
                ),
                child: Image.asset(
                  widget.coverAsset,
                  package: _kPackage,
                  fit: widget.coverFit,
                  alignment: Alignment.center,
                  filterQuality: FilterQuality.medium,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Expanded(
                      child: Wrap(
                        spacing: 8,
                        runSpacing: 6,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          Text(
                            widget.title,
                            style: WashTypography.displayLarge(tokens.onSurface)
                                .copyWith(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              letterSpacing: -0.3,
                            ),
                          ),
                          if (widget.comingSoon)
                            const _StoreBadge(
                              label: 'Coming soon',
                              warning: true,
                            ),
                        ],
                      ),
                    ),
                    if (widget.priceLabel != null)
                      _PriceMark(priceLabel: widget.priceLabel!, size: 18),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _open() {
    showGeneralDialog<void>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Close',
      barrierColor: const Color(0x8A000000),
      transitionDuration: const Duration(milliseconds: 180),
      pageBuilder: (context, _, __) => _StoreDialog(
        title: widget.title,
        priceLabel: widget.priceLabel,
        subtitle: widget.subtitle,
        gallery: widget.gallery,
        highlights: widget.highlights,
        sellingPoints: widget.sellingPoints,
        comingSoon: widget.comingSoon,
        primaryCtaLabel: widget.primaryCtaLabel,
        onPrimaryCta: widget.onPrimaryCta,
      ),
      transitionBuilder: (context, animation, _, child) =>
          FadeTransition(opacity: animation, child: child),
    );
  }
}

class _PriceMark extends StatelessWidget {
  const _PriceMark({required this.priceLabel, this.size = 20});

  final String priceLabel;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = tokens.mode == WashThemeMode.dark
        ? const Color(0xFFFBBF24)
        : const Color(0xFFB45309);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        WashLucideIcon('dollar-sign',
            size: size, color: color, strokeWidth: 2.25),
        Text(
          priceLabel,
          style: WashTypography.displayLarge(color).copyWith(
            fontSize: size + 2,
            fontWeight: FontWeight.w600,
            letterSpacing: -0.3,
          ),
        ),
      ],
    );
  }
}

class _StoreDialog extends StatefulWidget {
  const _StoreDialog({
    required this.title,
    required this.gallery,
    required this.highlights,
    required this.sellingPoints,
    required this.comingSoon,
    required this.primaryCtaLabel,
    this.priceLabel,
    this.subtitle,
    this.onPrimaryCta,
  });

  final String title;
  final List<_StoreSlide> gallery;
  final List<String> highlights;
  final List<_SellingPoint> sellingPoints;
  final bool comingSoon;
  final String primaryCtaLabel;
  final String? priceLabel;
  final String? subtitle;
  final VoidCallback? onPrimaryCta;

  @override
  State<_StoreDialog> createState() => _StoreDialogState();
}

class _StoreDialogState extends State<_StoreDialog> {
  int _slide = 0;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final size = MediaQuery.sizeOf(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: 1040,
            maxHeight: size.height - 48,
          ),
          child: Container(
            decoration: BoxDecoration(
              color: tokens.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: tokens.inkBorder),
              boxShadow: [
                BoxShadow(
                  color: tokens.onSurface.withValues(alpha: 0.2),
                  blurRadius: 44,
                  offset: const Offset(0, 20),
                ),
              ],
            ),
            clipBehavior: Clip.antiAlias,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _header(tokens),
                Flexible(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(24, 20, 24, 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        _gallery(tokens),
                        if (widget.highlights.isNotEmpty) ...[
                          const SizedBox(height: 18),
                          for (final item in widget.highlights)
                            _bullet(tokens, item),
                        ],
                        if (widget.sellingPoints.isNotEmpty) ...[
                          const SizedBox(height: 18),
                          for (final point in widget.sellingPoints)
                            _sellingPoint(tokens, point),
                        ],
                      ],
                    ),
                  ),
                ),
                _footer(tokens),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _header(WashTokens tokens) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 20, 16, 16),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.7)),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Wrap(
                  spacing: 10,
                  runSpacing: 6,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    Text(
                      widget.title,
                      style: WashTypography.displayLarge(tokens.onSurface)
                          .copyWith(
                        fontSize: 28,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.5,
                      ),
                    ),
                    if (widget.comingSoon)
                      const _StoreBadge(label: 'Coming soon', warning: true),
                  ],
                ),
                if (widget.priceLabel != null) ...[
                  const SizedBox(height: 6),
                  _PriceMark(priceLabel: widget.priceLabel!, size: 22),
                ],
                if (widget.subtitle != null) ...[
                  const SizedBox(height: 8),
                  Text(
                    widget.subtitle!,
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 14,
                      height: 1.55,
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(width: 12),
          WashButton(
            variant: WashButtonVariant.ghost,
            size: WashButtonSize.sm,
            square: true,
            onPressed: () => Navigator.of(context).maybePop(),
            child: const WashLucideIcon('x', size: 17),
          ),
        ],
      ),
    );
  }

  Widget _gallery(WashTokens tokens) {
    final slide = widget.gallery[_slide];
    return Container(
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          SizedBox(
            height: 360,
            width: double.infinity,
            child: Image.asset(
              slide.asset,
              package: _kPackage,
              fit: slide.contain ? BoxFit.contain : BoxFit.cover,
              alignment: slide.contain ? Alignment.center : Alignment.topCenter,
              filterQuality: FilterQuality.medium,
            ),
          ),
          if (widget.gallery.length > 1) ...[
            Positioned(
              left: 12,
              top: 0,
              bottom: 0,
              child: Center(
                child: _ArrowButton(
                  icon: 'chevron-left',
                  onTap: () => setState(
                    () => _slide = (_slide - 1 + widget.gallery.length) %
                        widget.gallery.length,
                  ),
                ),
              ),
            ),
            Positioned(
              right: 12,
              top: 0,
              bottom: 0,
              child: Center(
                child: _ArrowButton(
                  icon: 'chevron-right',
                  onTap: () => setState(
                    () => _slide = (_slide + 1) % widget.gallery.length,
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 10,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var i = 0; i < widget.gallery.length; i++)
                    Container(
                      width: 7,
                      height: 7,
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      decoration: BoxDecoration(
                        color: i == _slide
                            ? tokens.surface
                            : tokens.surface.withValues(alpha: 0.45),
                        shape: BoxShape.circle,
                      ),
                    ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _bullet(WashTokens tokens, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 2),
            child: WashLucideIcon(
              'check',
              size: 14,
              color: Color(0xFFD97706),
              strokeWidth: 2,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontSize: 13,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sellingPoint(WashTokens tokens, _SellingPoint point) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 2),
            child: WashLucideIcon(
              'check',
              size: 14,
              color: Color(0xFFD97706),
              strokeWidth: 2,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: point.title,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontSize: 13,
                      height: 1.5,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  TextSpan(
                    text: ' ${point.detail}',
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 13,
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _footer(WashTokens tokens) {
    final enabled = !widget.comingSoon && widget.onPrimaryCta != null;
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 14),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
      ),
      child: Row(
        children: [
          if (widget.priceLabel != null)
            _PriceMark(priceLabel: widget.priceLabel!, size: 20)
          else
            const Spacer(),
          const Spacer(),
          WashButton(
            variant: WashButtonVariant.warning,
            enabled: enabled,
            onPressed: enabled
                ? () {
                    Navigator.of(context).maybePop();
                    widget.onPrimaryCta?.call();
                  }
                : null,
            child: Text(
              widget.comingSoon ? 'Coming soon' : widget.primaryCtaLabel,
            ),
          ),
        ],
      ),
    );
  }
}

class _ArrowButton extends StatelessWidget {
  const _ArrowButton({required this.icon, required this.onTap});

  final String icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: tokens.surface.withValues(alpha: 0.92),
            shape: BoxShape.circle,
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
            boxShadow: [
              BoxShadow(
                color: tokens.onSurface.withValues(alpha: 0.14),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Center(
            child: WashLucideIcon(icon, size: 18, color: tokens.onSurface),
          ),
        ),
      ),
    );
  }
}
