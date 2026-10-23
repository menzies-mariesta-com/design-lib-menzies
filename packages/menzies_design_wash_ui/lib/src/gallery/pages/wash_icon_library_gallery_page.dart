import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../components/button/wash_button.dart';
import '../../components/input/wash_input.dart';
import '../../icons/wash_brand_icon_names.g.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../icons/wash_lucide_icon_names.g.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

const String _kPackage = 'menzies_design_wash_ui';
const int _kPageSize = 96;

class WashIconsUtilityGalleryPage extends StatelessWidget {
  const WashIconsUtilityGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final names = [...washLucideIconNames]..sort();
    return _IconLibraryPage(
      eyebrow: 'Icons',
      title: 'Utility',
      description: 'Full Lucide 1.28.0 via Wash UI. Click for import snippets.',
      items: [
        for (final name in names)
          _IconItem(
            id: name,
            label: _pascal(name),
            keywords: '$name lucide wash',
            brand: false,
          ),
      ],
    );
  }
}

class WashIconsBrandsGalleryPage extends StatelessWidget {
  const WashIconsBrandsGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _IconLibraryPage(
      eyebrow: 'Icons',
      title: 'Brands',
      description:
          'Full Simple Icons brands via Wash UI. Click for import snippets.',
      items: [
        for (final brand in washBrandIcons)
          _IconItem(
            id: brand.slug,
            label: brand.title,
            keywords: '${brand.slug} ${brand.title} brand wash',
            brand: true,
          ),
      ],
    );
  }
}

class _IconItem {
  const _IconItem({
    required this.id,
    required this.label,
    required this.keywords,
    required this.brand,
  });

  final String id;
  final String label;
  final String keywords;
  final bool brand;

  Widget preview(WashTokens tokens, double size) {
    if (brand) {
      return SvgPicture.asset(
        'assets/icons/brands/$id.svg',
        package: _kPackage,
        width: size,
        height: size,
        fit: BoxFit.contain,
        colorFilter: ColorFilter.mode(tokens.onSurface, BlendMode.srcIn),
      );
    }
    return WashLucideIcon(
      id,
      size: size,
      color: tokens.onSurface,
      strokeWidth: 1.75,
    );
  }

  String get dartSource {
    if (brand) {
      return "SvgPicture.asset(\n"
          "  'assets/icons/brands/$id.svg',\n"
          "  package: 'menzies_design_wash_ui',\n"
          "  width: 24,\n"
          "  height: 24,\n"
          ")";
    }
    return "WashLucideIcon(\n"
        "  '$id',\n"
        "  size: 24,\n"
        "  strokeWidth: 1.75,\n"
        ")";
  }
}

class _IconLibraryPage extends StatefulWidget {
  const _IconLibraryPage({
    required this.eyebrow,
    required this.title,
    required this.description,
    required this.items,
  });

  final String eyebrow;
  final String title;
  final String description;
  final List<_IconItem> items;

  @override
  State<_IconLibraryPage> createState() => _IconLibraryPageState();
}

class _IconLibraryPageState extends State<_IconLibraryPage> {
  late final TextEditingController _controller;
  String _query = '';
  int _page = 1;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final query = _query.trim().toLowerCase();
    final filtered = query.isEmpty
        ? widget.items
        : widget.items
            .where(
              (item) =>
                  item.label.toLowerCase().contains(query) ||
                  item.id.toLowerCase().contains(query) ||
                  item.keywords.toLowerCase().contains(query),
            )
            .toList();
    final pageCount = filtered.isEmpty
        ? 1
        : ((filtered.length + _kPageSize - 1) ~/ _kPageSize);
    final page = _page < 1 ? 1 : (_page > pageCount ? pageCount : _page);
    final pageItems = filtered.skip((page - 1) * _kPageSize).take(_kPageSize);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashGalleryPageHero(
          kicker: widget.eyebrow,
          title: widget.title,
          description: widget.description,
        ),
        const SizedBox(height: 24),
        LayoutBuilder(
          builder: (context, constraints) {
            final narrow = constraints.maxWidth < 640;
            final search = SizedBox(
              width: narrow ? constraints.maxWidth : 440,
              child: WashInput(
                controller: _controller,
                hint: 'Search icons',
                leading: const WashLucideIcon('search', size: 16),
                maxWidth: narrow ? constraints.maxWidth : 440,
                expanded: false,
                onChanged: (value) => setState(() {
                  _query = value;
                  _page = 1;
                }),
              ),
            );
            final count = Text(
              '${_formatInt(filtered.length)} icons'
              '${filtered.length != widget.items.length ? ' (of ${_formatInt(widget.items.length)})' : ''}',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 13,
              ),
            );
            if (narrow) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [search, const SizedBox(height: 10), count],
              );
            }
            return Row(
              children: [
                search,
                const Spacer(),
                count,
              ],
            );
          },
        ),
        const SizedBox(height: 16),
        if (filtered.isEmpty)
          Container(
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              color: tokens.surface.withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(12),
              border:
                  Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
            ),
            child: Text(
              'No icons match this search.',
              textAlign: TextAlign.center,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 13,
              ),
            ),
          )
        else
          LayoutBuilder(
            builder: (context, constraints) {
              final cols = constraints.maxWidth >= 1024
                  ? 8
                  : constraints.maxWidth >= 768
                      ? 6
                      : constraints.maxWidth >= 480
                          ? 4
                          : 3;
              const gap = 8.0;
              final width = (constraints.maxWidth - gap * (cols - 1)) / cols;
              return Wrap(
                spacing: gap,
                runSpacing: gap,
                children: [
                  for (final item in pageItems)
                    SizedBox(
                      width: width,
                      child: _IconTile(
                        item: item,
                        onTap: () => _openDialog(context, item),
                      ),
                    ),
                ],
              );
            },
          ),
        if (pageCount > 1) ...[
          const SizedBox(height: 24),
          Row(
            children: [
              Text(
                'Page $page of $pageCount',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 13,
                ),
              ),
              const Spacer(),
              WashButton(
                variant: WashButtonVariant.outline,
                size: WashButtonSize.sm,
                enabled: page > 1,
                onPressed:
                    page > 1 ? () => setState(() => _page = page - 1) : null,
                child: const Text('Prev'),
              ),
              const SizedBox(width: 8),
              WashButton(
                variant: WashButtonVariant.outline,
                size: WashButtonSize.sm,
                enabled: page < pageCount,
                onPressed: page < pageCount
                    ? () => setState(() => _page = page + 1)
                    : null,
                child: const Text('Next'),
              ),
            ],
          ),
        ],
      ],
    );
  }

  void _openDialog(BuildContext context, _IconItem item) {
    showGeneralDialog<void>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Close',
      barrierColor: const Color(0x8A000000),
      transitionDuration: const Duration(milliseconds: 160),
      pageBuilder: (context, _, __) => _IconDetailDialog(item: item),
      transitionBuilder: (context, animation, _, child) =>
          FadeTransition(opacity: animation, child: child),
    );
  }
}

class _IconTile extends StatefulWidget {
  const _IconTile({required this.item, required this.onTap});

  final _IconItem item;
  final VoidCallback onTap;

  @override
  State<_IconTile> createState() => _IconTileState();
}

class _IconTileState extends State<_IconTile> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Semantics(
      button: true,
      label: 'Open ${widget.item.label}',
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        onEnter: (_) => setState(() => _hover = true),
        onExit: (_) => setState(() => _hover = false),
        child: GestureDetector(
          onTap: widget.onTap,
          behavior: HitTestBehavior.opaque,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 120),
            height: 88,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
            decoration: BoxDecoration(
              color: _hover
                  ? Color.alphaBlend(
                      tokens.palette.primary.withValues(alpha: 0.08),
                      tokens.surface,
                    )
                  : tokens.surface.withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: _hover
                    ? tokens.palette.primary.withValues(alpha: 0.5)
                    : tokens.inkBorder.withValues(alpha: 0.6),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 40,
                  height: 40,
                  child: Center(
                    child: widget.item.preview(tokens, 24),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  widget.item.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 10.5,
                    fontFamily: 'MapleMono',
                    height: 1.2,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _IconDetailDialog extends StatelessWidget {
  const _IconDetailDialog({required this.item});

  final _IconItem item;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 560),
          child: Container(
            decoration: BoxDecoration(
              color: tokens.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: tokens.inkBorder),
              boxShadow: [
                BoxShadow(
                  color: tokens.onSurface.withValues(alpha: 0.18),
                  blurRadius: 40,
                  offset: const Offset(0, 18),
                ),
              ],
            ),
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            item.label,
                            style: WashTypography.title(tokens.palette.primary)
                                .copyWith(
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            item.id,
                            style:
                                WashTypography.body(tokens.inkMuted).copyWith(
                              fontSize: 12,
                              fontFamily: 'MapleMono',
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    WashButton(
                      variant: WashButtonVariant.ghost,
                      size: WashButtonSize.sm,
                      square: true,
                      onPressed: () => Navigator.of(context).maybePop(),
                      child: const WashLucideIcon('x', size: 16),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                WashShowcaseTabs(
                  preview: Container(
                    constraints: const BoxConstraints(minHeight: 150),
                    alignment: Alignment.center,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 72,
                          height: 72,
                          child: Center(child: item.preview(tokens, 64)),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          item.label,
                          style: WashTypography.body(tokens.inkMuted).copyWith(
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                  dartSource: item.dartSource,
                ),
                const SizedBox(height: 20),
                Align(
                  alignment: Alignment.centerRight,
                  child: WashButton(
                    onPressed: () => Navigator.of(context).maybePop(),
                    child: const Text('Close'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

String _pascal(String kebab) {
  return kebab
      .split('-')
      .map((part) =>
          part.isEmpty ? part : '${part[0].toUpperCase()}${part.substring(1)}')
      .join();
}

String _formatInt(int value) {
  final text = value.toString();
  final buffer = StringBuffer();
  for (var i = 0; i < text.length; i++) {
    if (i > 0 && (text.length - i) % 3 == 0) buffer.write(',');
    buffer.write(text[i]);
  }
  return buffer.toString();
}
