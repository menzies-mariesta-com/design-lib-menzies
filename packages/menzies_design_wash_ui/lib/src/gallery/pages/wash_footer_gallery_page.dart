import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/input/wash_editable.dart';
import '../../components/join/wash_join.dart';
import '../../components/layout/wash_footer.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashFooterGalleryPage extends StatelessWidget {
  const WashFooterGalleryPage({super.key});

  static final _year = DateTime.now().year;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Footer',
      description:
          'daisyUI footer blocks for studio pages: titles, nav columns, colors, brand, and copyright.',
      sections: [
        _s('01 · Basic', 'Title and nav links', 'Default footer is vertical',
            _basic(), _basicDart),
        _s(
            '02 · Centered',
            'footer-center placement',
            'footer-center aligns columns and links to the middle of the bar',
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                WashShowcaseTabs(
                    preview: _centeredExplore(),
                    dartSource: _centeredExploreDart),
                const SizedBox(height: 24),
                WashShowcaseTabs(
                    preview: _centeredBrand(), dartSource: _centeredBrandDart),
              ],
            ),
            '',
            tint: WashGalleryPanelTint.ochre,
            showcase: false),
        _s('03 · Multi-column', 'Several nav title groups',
            'Stack many footer-title columns', _multiColumn(), _multiDart),
        _s(
            '04 · Colors',
            'Semantic background colors',
            'Footer has no color modifier classes',
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var i = 0; i < _colorTones.length; i++) ...[
                  if (i > 0) const SizedBox(height: 16),
                  WashShowcaseTabs(
                    preview: _colorFooter(_colorTones[i]),
                    dartSource: '// WashFooter(tone: ${_colorTones[i].name});',
                  ),
                ],
              ],
            ),
            '',
            tint: WashGalleryPanelTint.rose,
            showcase: false),
        _s('05 · Brand', 'Menzies Design studio with logo',
            'aside holds the mark and blurb', _brand(), _brandDart),
        _s(
            '06 · Copyright',
            'Legal and form row',
            'Compact copyright bars, optional contact icons',
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                WashShowcaseTabs(
                    preview: _copyrightCenter(),
                    dartSource: _copyrightCenterDart),
                const SizedBox(height: 24),
                WashShowcaseTabs(
                    preview: _copyrightIcons(),
                    dartSource: _copyrightIconsDart),
                const SizedBox(height: 24),
                WashShowcaseTabs(
                    preview: _newsletter(), dartSource: _newsletterDart),
              ],
            ),
            '',
            showcase: false),
        _s(
            '07 · Responsive',
            'Stack on mobile, row on larger screens',
            'footer-vertical is the default',
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                WashShowcaseTabs(
                    preview: _responsive(), dartSource: _responsiveDart),
                const SizedBox(height: 16),
                _breakpointNote(context),
              ],
            ),
            '',
            showcase: false),
      ],
    );
  }

  static const _colorTones = [
    WashFooterTone.base200,
    WashFooterTone.neutral,
    WashFooterTone.primary,
    WashFooterTone.secondary,
    WashFooterTone.accent,
  ];

  static WashGallerySection _s(
      String eyebrow, String title, String desc, Widget preview, String dart,
      {WashGalleryPanelTint tint = WashGalleryPanelTint.none,
      bool showcase = true}) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: showcase
          ? WashShowcaseTabs(preview: preview, dartSource: dart)
          : preview,
    );
  }

  static WashFooterNav _nav(String title, List<String> links) {
    return WashFooterNav(
      title: title,
      children: links.map((l) => WashFooterLink(l)).toList(),
    );
  }

  static Widget _basic() {
    return WashFooter(
      horizontalFromSm: true,
      children: [
        _nav('Services', ['Wet washes', 'Dry brush', 'Glazing', 'Commission']),
        _nav('Studio', ['About', 'Contact', 'Workshops', 'Press kit']),
        _nav('Legal', ['Terms of use', 'Privacy policy', 'Cookie policy']),
      ],
    );
  }

  static const _basicDart = '''
WashFooter(
  horizontalFromSm: true,
  children: [
    WashFooterNav(title: 'Services', children: [...]),
    WashFooterNav(title: 'Studio', children: [...]),
    WashFooterNav(title: 'Legal', children: [...]),
  ],
);''';

  static Widget _centeredExplore() {
    return WashFooter(
      center: true,
      padding: const EdgeInsets.all(32),
      children: [
        WashFooterNav(
          title: 'Explore',
          center: true,
          inlineLinks: true,
          children: [
            const WashFooterLink('Plates'),
            const WashFooterLink('Series'),
            const WashFooterLink('Pigments'),
          ],
        ),
      ],
    );
  }

  static const _centeredExploreDart = 'WashFooter(center: true, ...)';

  static Widget _centeredBrand() {
    return WashFooter(
      tone: WashFooterTone.primary,
      center: true,
      padding: const EdgeInsets.all(32),
      children: [
        WashFooterAside(
          center: true,
          child: Builder(
            builder: (context) {
              final fg = DefaultTextStyle.of(context).style.color!;
              return Column(
                children: [
                  WashLucideIcon('droplets',
                      size: 40, color: fg, strokeWidth: 1.75),
                  const SizedBox(height: 8),
                  Text(
                    'Menzies Design',
                    style: WashTypography.title(fg).copyWith(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    'Watercolor studio desk',
                    style: WashTypography.body(fg).copyWith(
                      fontSize: 14,
                      color: fg.withValues(alpha: 0.9),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
        WashFooterNav(
          center: true,
          inlineLinks: true,
          children: [
            const WashFooterLink('About'),
            const WashFooterLink('Contact'),
            const WashFooterLink('Workshops'),
          ],
        ),
      ],
    );
  }

  static const _centeredBrandDart =
      'WashFooter(tone: WashFooterTone.primary, center: true, ...)';

  static Widget _multiColumn() {
    return WashFooter(
      tone: WashFooterTone.neutral,
      horizontalFromSm: true,
      multiColumnGrid: true,
      children: [
        _nav('Services', ['Branding', 'Design', 'Marketing']),
        _nav('Studio', ['About us', 'Contact', 'Jobs']),
        _nav('Legal', ['Terms', 'Privacy', 'Cookies']),
        _nav('Visit', ['Hours', 'Map', 'Parking']),
        _nav('Learn', ['Guides', 'Recipes', 'Archive']),
        _nav('Shop', ['Prints', 'Sets', 'Gift cards']),
      ],
    );
  }

  static const _multiDart =
      'WashFooter(multiColumnGrid: true, horizontalFromSm: true, ...)';

  static Widget _colorFooter(WashFooterTone tone) {
    return WashFooter(
      tone: tone,
      horizontalFromSm: true,
      children: [
        _nav('Services', ['Wet washes', 'Dry brush']),
        _nav('Studio', ['About', 'Contact']),
      ],
    );
  }

  static Widget _brand() {
    return WashFooter(
      horizontalFromSm: true,
      padding: const EdgeInsets.all(32),
      children: [
        WashFooterAside(
          child: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  DecoratedBox(
                    decoration: BoxDecoration(
                      color: WashFooter.washBlueMark(tokens),
                      borderRadius: BorderRadius.circular(tokens.radiusBox),
                    ),
                    child: const SizedBox(
                      width: 48,
                      height: 48,
                      child: Center(
                        child: WashLucideIcon('droplets',
                            size: 28, strokeWidth: 1.75),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Menzies Design',
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    'Watercolor studio for plates, washes, and pigment notes since 2014.',
                    style: WashTypography.body(tokens.inkMuted)
                        .copyWith(fontSize: 14),
                  ),
                ],
              );
            },
          ),
        ),
        _nav('Services', ['Commissions', 'Workshops', 'Restorations']),
        _nav('Studio', ['About', 'Visit', 'Press kit']),
        _nav('Legal', ['Terms of use', 'Privacy policy']),
      ],
    );
  }

  static const _brandDart =
      'WashFooter + WashFooterAside + WashLucideIcon(droplets)';

  static Widget _copyrightCenter() {
    return WashFooter(
      tone: WashFooterTone.base300,
      center: true,
      padding: const EdgeInsets.all(16),
      children: [
        WashFooterAside(
          center: true,
          child: Text(
            'Copyright © $_year. All rights reserved by Menzies Design.',
            style: const TextStyle(fontSize: 14),
          ),
        ),
      ],
    );
  }

  static const _copyrightCenterDart =
      'WashFooter(tone: WashFooterTone.base300, center: true, ...)';

  static Widget _copyrightIcons() {
    return WashFooter(
      tone: WashFooterTone.neutral,
      horizontalFromSm: true,
      alignItemsCenter: true,
      padding: const EdgeInsets.all(16),
      children: [
        WashFooterAside(
          horizontal: true,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const WashLucideIcon('droplets', size: 32, strokeWidth: 1.75),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  'Copyright © $_year. All rights reserved.',
                  style: const TextStyle(fontSize: 14),
                ),
              ),
            ],
          ),
        ),
        WashFooterNav(
          inlineLinks: true,
          children: [
            WashFooterIconLink(
              semanticsLabel: 'Studio email',
              child: const WashLucideIcon('mail', size: 20, strokeWidth: 2),
            ),
            WashFooterIconLink(
              semanticsLabel: 'Studio location',
              child: const WashLucideIcon('map-pin', size: 20, strokeWidth: 2),
            ),
          ],
        ),
      ],
    );
  }

  static const _copyrightIconsDart =
      'WashFooterIconLink + WashLucideIcon(mail/map-pin)';

  static Widget _newsletter() {
    return WashFooter(
      horizontalFromSm: true,
      children: [
        _nav('Studio', ['About', 'Contact', 'Workshops']),
        _nav('Legal', ['Terms', 'Privacy']),
        WashFooterNav(
          title: 'Newsletter',
          children: [
            Builder(
              builder: (context) {
                final tokens = WashTokens.of(context);
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Studio email',
                      style: WashTypography.label(tokens.onSurface)
                          .copyWith(fontSize: 14),
                    ),
                    const SizedBox(height: 4),
                    LayoutBuilder(
                      builder: (context, c) {
                        final stacked = c.maxWidth < 320;
                        final input = WashEditable(hint: 'you@studio.example');
                        final button = WashButton(
                          label: 'Subscribe',
                          variant: WashButtonVariant.primary,
                          onPressed: () {},
                        );
                        if (stacked) {
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              input,
                              const SizedBox(height: 8),
                              button,
                            ],
                          );
                        }
                        return WashJoin(
                          fullWidth: true,
                          children: [input, button],
                        );
                      },
                    ),
                  ],
                );
              },
            ),
          ],
        ),
      ],
    );
  }

  static const _newsletterDart =
      'WashJoin(WashEditable + WashButton) inside WashFooterNav';

  static Widget _responsive() {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return WashFooter(
          tone: WashFooterTone.base100,
          horizontalFromSm: true,
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
          children: [
            WashFooterAside(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 320),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Menzies Design',
                      style: WashTypography.title(tokens.onSurface).copyWith(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text.rich(
                      TextSpan(
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 14),
                        children: const [
                          TextSpan(
                            text: 'Resize the viewport: columns stack below ',
                          ),
                          TextSpan(
                            text: 'sm',
                            style: TextStyle(
                                fontFamily: 'monospace', fontSize: 12),
                          ),
                          TextSpan(
                            text: ', then sit in a horizontal row.',
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            _nav('Plates', ['Morning wash', 'Midday glaze', 'Evening ink']),
            _nav('Pigments', ['Cerulean', 'Ochre', 'Rose madder']),
          ],
        );
      },
    );
  }

  static const _responsiveDart =
      'WashFooter(horizontalFromSm: true, tone: WashFooterTone.base100)';

  static Widget _breakpointNote(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: washInkBorderBox(
        tokens,
        fill: tokens.surface.withValues(alpha: 0.5),
        radius: tokens.radiusBox,
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Breakpoint behavior',
              style: WashTypography.title(tokens.onSurface).copyWith(
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            Text.rich(
              TextSpan(
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                children: const [
                  TextSpan(text: 'Below '),
                  TextSpan(
                      text: 'sm',
                      style: TextStyle(fontFamily: 'monospace', fontSize: 12)),
                  TextSpan(
                      text:
                          ', the footer stays vertical (footer-vertical). From small screens upward, '),
                  TextSpan(
                      text: 'sm:footer-horizontal',
                      style: TextStyle(fontFamily: 'monospace', fontSize: 12)),
                  TextSpan(
                      text:
                          ' places columns side by side without forcing a sticky page footer.'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
