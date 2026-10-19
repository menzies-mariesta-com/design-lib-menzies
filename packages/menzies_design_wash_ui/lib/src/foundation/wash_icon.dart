import 'package:flutter/widgets.dart';

import '../icons/wash_lucide_icon.dart';

/// Curated glyphs mapped to bundled Lucide SVGs (kebab-case).
enum WashIconGlyph {
  add,
  close,
  menu,
  search,
  chevronLeft,
  chevronRight,
  chevronDown,
  info,
  star,
  starOutline,
  check,
  more,
  settings,
  person,
  image,
  home,
}

String washIconGlyphLucideName(WashIconGlyph glyph) {
  return switch (glyph) {
    WashIconGlyph.add => 'plus',
    WashIconGlyph.close => 'x',
    WashIconGlyph.menu => 'menu',
    WashIconGlyph.search => 'search',
    WashIconGlyph.chevronLeft => 'chevron-left',
    WashIconGlyph.chevronRight => 'chevron-right',
    WashIconGlyph.chevronDown => 'chevron-down',
    WashIconGlyph.info => 'info',
    WashIconGlyph.star => 'star',
    WashIconGlyph.starOutline => 'star',
    WashIconGlyph.check => 'check',
    WashIconGlyph.more => 'ellipsis',
    WashIconGlyph.settings => 'settings',
    WashIconGlyph.person => 'user',
    WashIconGlyph.image => 'image',
    WashIconGlyph.home => 'home',
  };
}

/// Convenience wrapper around [WashLucideIcon] for common shell glyphs.
class WashIcon extends StatelessWidget {
  const WashIcon(this.glyph, {super.key, this.size = 20, this.color});

  final WashIconGlyph glyph;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return WashLucideIcon(
      washIconGlyphLucideName(glyph),
      size: size,
      color: color,
      strokeWidth: 1.75,
    );
  }
}
