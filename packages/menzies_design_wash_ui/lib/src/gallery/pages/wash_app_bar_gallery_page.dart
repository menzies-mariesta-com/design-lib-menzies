import 'package:flutter/widgets.dart';

import '../../components/app_bar/wash_screen_bar.dart';
import '../../components/button/wash_button.dart';
import '../../components/input/wash_editable.dart';
import '../../foundation/wash_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAppBarGalleryPage extends StatelessWidget {
  const WashAppBarGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'App bar',
      description: 'Compact top bars for a screen title',
      sections: [
        _s(
            '01 · Basic',
            'Leading icon, title, trailing actions',
            'App bars lead with a back or menu control, a short title',
            _basic(context)),
        _s(
            '02 · With search',
            'Join search field',
            'Search uses join so the input and button are direct siblings',
            _search(context),
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Density',
            'Dense and tall bars',
            'Tighten padding for tool-heavy desks, or raise min-height',
            _density(context),
            tint: WashGalleryPanelTint.ochre),
        _s('04 · Colors', 'Base, primary, and neutral',
            'Semantic fills for app bars inside the panel', _colors(context)),
        _s(
            '05 · Studio Menzies Design',
            'Pigment desk app bar',
            'Brand mark, tool join strip, and semantic icon actions',
            _studio(context),
            tint: WashGalleryPanelTint.ochre),
        _s(
            '06 · Scroll note',
            'Sticky inside a demo frame',
            'Sticky sticks to the scroll parent of this framed demo',
            _sticky(context),
            tint: WashGalleryPanelTint.rose),
        _s(
            '07 · Responsive',
            'Collapse trailing into a menu',
            'On small widths, hide trailing actions and open them from a menu',
            _responsive(context),
            tint: WashGalleryPanelTint.ochre),
      ],
    );
  }

  static WashGallerySection _s(
      String eyebrow, String title, String desc, Widget preview,
      {WashGalleryPanelTint tint = WashGalleryPanelTint.none}) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(
          preview: preview,
          dartSource: '// $title\nWashScreenBar(child: ...);'),
    );
  }

  static Widget _iconBtn(WashIconGlyph g,
      {WashButtonVariant v = WashButtonVariant.ghost, String? tip}) {
    final btn = WashButton(
        variant: v,
        square: true,
        onPressed: () {},
        child: WashIcon(g, size: 20));
    if (tip == null) return btn;
    return WashTooltip(message: tip, child: btn);
  }

  static Widget _basic(BuildContext context) {
    return Column(
      children: [
        WashScreenBar(
          child: WashScreenBarRow(
            leading: _iconBtn(WashIconGlyph.chevronLeft,
                v: WashButtonVariant.primary, tip: 'Back'),
            title: const WashScreenBarTitle('Plate detail'),
            trailing: Row(
              children: [
                _iconBtn(WashIconGlyph.more,
                    v: WashButtonVariant.secondary, tip: 'Share'),
                _iconBtn(WashIconGlyph.more, tip: 'More'),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        WashScreenBar(
          child: Row(
            children: [
              WashNavbarStart(
                child: Row(
                  children: [
                    _iconBtn(WashIconGlyph.menu, tip: 'Open menu'),
                    const WashScreenBarTitle('Wash series'),
                  ],
                ),
              ),
              WashNavbarEnd(
                child: Row(
                  children: [
                    _iconBtn(WashIconGlyph.check,
                        v: WashButtonVariant.primary, tip: 'Save'),
                    _iconBtn(WashIconGlyph.info,
                        v: WashButtonVariant.secondary, tip: 'Alerts'),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _search(BuildContext context) {
    return WashScreenBar(
      child: Row(
        children: [
          const WashNavbarStart(child: WashScreenBarTitle('Find plates')),
          WashNavbarEnd(
            child: Row(
              children: [
                const SizedBox(
                  width: 140,
                  child: WashEditable(hint: 'Search washes…'),
                ),
                WashButton(
                  size: WashButtonSize.sm,
                  onPressed: () {},
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashIcon(WashIconGlyph.search, size: 16),
                      SizedBox(width: 4),
                      Text('Search'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static Widget _density(BuildContext context) {
    return Column(
      children: [
        WashScreenBar(
          dense: true,
          child: Row(
            children: [
              WashNavbarStart(
                child: Row(
                  children: [
                    WashButton(
                        size: WashButtonSize.sm,
                        square: true,
                        variant: WashButtonVariant.primary,
                        onPressed: () {},
                        child: const WashIcon(WashIconGlyph.chevronLeft,
                            size: 16)),
                    const Text('Dense toolbar',
                        style: TextStyle(
                            fontSize: 14, fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
              WashNavbarEnd(
                child: Row(
                  children: [
                    _iconBtn(WashIconGlyph.starOutline, tip: 'Layers'),
                    _iconBtn(WashIconGlyph.star,
                        v: WashButtonVariant.secondary, tip: 'Palette'),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        WashScreenBar(
          tall: true,
          child: Row(
            children: [
              WashNavbarStart(
                child: Row(
                  children: [
                    _iconBtn(WashIconGlyph.menu, tip: 'Open menu'),
                    const WashScreenBarTitle('Tall bar',
                        subtitle: 'Extra vertical room'),
                  ],
                ),
              ),
              WashNavbarEnd(
                  child: WashButton(
                      label: 'Open plate',
                      size: WashButtonSize.sm,
                      onPressed: () {})),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _colors(BuildContext context) {
    final p = WashTokens.of(context).palette;
    final fills = [
      (p.base200, p.baseContent),
      (p.base300, p.baseContent),
      (p.neutral, p.neutralContent),
      (p.primary, p.primaryContent),
    ];
    return Column(
      children: fills.map((f) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: WashScreenBar(
            backgroundColor: f.$1,
            foregroundColor: f.$2,
            child: Row(
              children: [
                WashNavbarStart(
                  child: Row(
                    children: [
                      _iconBtn(WashIconGlyph.chevronLeft),
                      const WashScreenBarTitle('Menzies Design'),
                    ],
                  ),
                ),
                WashNavbarEnd(
                    child: WashButton(
                        label: 'Action',
                        size: WashButtonSize.sm,
                        variant: WashButtonVariant.ghost,
                        onPressed: () {})),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget _studio(BuildContext context) {
    return WashScreenBar(
      panelTint: WashTokens.of(context).primary,
      child: Row(
        children: [
          WashNavbarStart(
            child: Row(
              children: [
                WashButton(
                    variant: WashButtonVariant.ghost,
                    onPressed: () {},
                    label: 'Menzies Design'),
                const Text('Pigment desk', style: TextStyle(fontSize: 11)),
              ],
            ),
          ),
          WashNavbarCenter(
            child: Row(
              children: [
                _iconBtn(WashIconGlyph.settings, tip: 'Round brush'),
                _iconBtn(WashIconGlyph.star, tip: 'Pencil'),
                _iconBtn(WashIconGlyph.info, tip: 'Wash dropper'),
                _iconBtn(WashIconGlyph.close, tip: 'Kneaded eraser'),
              ],
            ),
          ),
          WashNavbarEnd(
            child: Row(
              children: [
                _iconBtn(WashIconGlyph.starOutline,
                    v: WashButtonVariant.primary, tip: 'Layers'),
                _iconBtn(WashIconGlyph.star,
                    v: WashButtonVariant.secondary, tip: 'Palette'),
                const WashAvatarPlaceholder('WF'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static Widget _sticky(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      height: 224,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.palette.base200.withValues(alpha: 0.4),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          child: SingleChildScrollView(
            child: Column(
              children: [
                WashScreenBar(
                  sticky: true,
                  rounded: false,
                  child: Row(
                    children: [
                      const WashNavbarStart(
                          child: WashScreenBarTitle('Sticky note')),
                      const WashNavbarEnd(
                          child: Text('Scroll the frame',
                              style: TextStyle(fontSize: 11))),
                    ],
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                          'This bar stays pinned while you scroll this panel only.'),
                      SizedBox(height: 12),
                      Text('Layer washes from light to dark.'),
                      SizedBox(height: 12),
                      Text(
                          'Dense toolbars belong in the content scroll region.'),
                      SizedBox(height: 12),
                      Text(
                          'More plate notes fill the frame so sticky behavior is easy to feel.'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static Widget _responsive(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final narrow = c.maxWidth < 480;
        return WashScreenBar(
          child: Row(
            children: [
              WashNavbarStart(
                child: Row(
                  children: [
                    _iconBtn(WashIconGlyph.chevronLeft,
                        v: WashButtonVariant.primary, tip: 'Back'),
                    const WashScreenBarTitle('Responsive bar'),
                  ],
                ),
              ),
              WashNavbarEnd(
                child: narrow
                    ? _iconBtn(WashIconGlyph.more, tip: 'More actions')
                    : Row(
                        children: [
                          _iconBtn(WashIconGlyph.more,
                              v: WashButtonVariant.secondary, tip: 'Share'),
                          _iconBtn(WashIconGlyph.check,
                              v: WashButtonVariant.primary, tip: 'Save'),
                          _iconBtn(WashIconGlyph.info, tip: 'Alerts'),
                        ],
                      ),
              ),
            ],
          ),
        );
      },
    );
  }
}
