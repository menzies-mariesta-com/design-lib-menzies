import 'package:flutter/widgets.dart';

import '../../components/collapse/wash_collapse.dart';
import '../../foundation/wash_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAccordionGalleryPage extends StatelessWidget {
  const WashAccordionGalleryPage({super.key});

  static const _faq = [
    (
      'How do I create an account?',
      'Click the "Sign Up" button in the top right corner and follow the registration process.'
    ),
    (
      'I forgot my password. What should I do?',
      'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    ),
    (
      'How do I update my profile information?',
      'Go to "My Account" settings and select "Edit Profile" to make changes.'
    ),
  ];

  static const _wash = [
    (
      'What is a wash?',
      'A thin, transparent layer of pigment diluted with water, laid across the paper.',
      WashIconGlyph.info
    ),
    (
      'How many layers should I use?',
      'Build slowly. Two to four light washes usually beat one heavy pass.',
      WashIconGlyph.starOutline
    ),
    (
      'Which pigments dry cooler?',
      'Ultramarine and phthalo lean cool; ochres and cadmiums lean warm.',
      WashIconGlyph.star
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Accordion',
      description:
          'daisyUI collapse as accordion: radio, details, arrow, plus, join, and force states.',
      sections: [
        _s(
            '01 · Radio',
            'Accordion with radio inputs',
            'Same name on radios: only one panel open at a time.',
            _radio(),
            _radioDart),
        _s(
            '02 · Details',
            'Accordion with details',
            'Shared name on details keeps exclusive open state.',
            _details(),
            _detailsDart,
            tint: WashGalleryPanelTint.ochre),
        _s('03 · Arrow', 'Arrow icon',
            'collapse-arrow adds a chevron indicator.', _arrow(), _arrowDart),
        _s('04 · Plus', 'Plus / minus icon',
            'collapse-plus toggles a plus/minus glyph.', _plus(), _plusDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Join',
            'Joined vertical stack',
            'join join-vertical + join-item for shared borders.',
            _join(),
            _joinDart),
        _s('06 · Checkbox', 'Multiple open (checkbox)',
            'Checkbox collapses are independent.', _checkbox(), _checkboxDart,
            tint: WashGalleryPanelTint.ochre),
        _s('07 · Focus', 'Focus-driven collapse',
            'Opens on focus, closes when focus leaves.', _focus(), _focusDart),
        _s(
            '08 · Force states',
            'Open and close modifiers',
            'collapse-open and collapse-close force visibility.',
            _force(),
            _forceDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '09 · Colors',
            'Semantic surfaces',
            'Background and content colors on accordion panels.',
            _colors(context),
            _colorsDart),
        _s(
            '10 · Icon start',
            'Arrow on the start edge',
            'Utility classes move the collapse-arrow glyph to the left.',
            _iconStart(),
            _iconStartDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '11 · Minimal',
            'Without border or background',
            'Bare collapse: no border, no base fill.',
            _minimal(),
            _minimalDart),
      ],
    );
  }

  static WashGallerySection _s(
      String eyebrow, String title, String desc, Widget preview, String dart,
      {WashGalleryPanelTint tint = WashGalleryPanelTint.none}) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _faqAccordion(WashCollapseIndicator indicator,
      {bool join = false}) {
    final items = _faq.map((e) => (Text(e.$1), Text(e.$2))).toList();
    return WashAccordion(items: items, indicator: indicator, joined: join);
  }

  static Widget _radio() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _faqAccordion(WashCollapseIndicator.none),
        const SizedBox(height: 12),
        _label('collapse + input[type=radio]')
      ]);
  static Widget _details() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        WashCollapseDetailsGroup(items: _faq),
        const SizedBox(height: 12),
        _label('details.collapse[name] + summary.collapse-title')
      ]);
  static Widget _arrow() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _faqAccordion(WashCollapseIndicator.arrow),
        const SizedBox(height: 12),
        _label('collapse collapse-arrow')
      ]);
  static Widget _plus() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _faqAccordion(WashCollapseIndicator.plus),
        const SizedBox(height: 12),
        _label('collapse collapse-plus')
      ]);
  static Widget _join() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _faqAccordion(WashCollapseIndicator.arrow, join: true),
        const SizedBox(height: 12),
        _label('join join-vertical + collapse join-item')
      ]);

  static Widget _checkbox() {
    final items = _wash
        .map((w) => (
              Row(children: [
                WashIcon(w.$3, size: 16),
                const SizedBox(width: 8),
                Expanded(child: Text(w.$1))
              ]),
              Text(w.$2)
            ))
        .toList();
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      WashCollapseCheckboxGroup(items: items),
      const SizedBox(height: 12),
      _label('collapse + input[type=checkbox]')
    ]);
  }

  static Widget _focus() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const WashCollapse(
          focusDriven: true,
          title: Text('Focus this panel to expand'),
          content:
              Text('Click or tab into the title. Blur or click away to close.'),
          indicator: WashCollapseIndicator.arrow,
        ),
        const SizedBox(height: 12),
        _label('collapse[tabindex=0] collapse-arrow'),
      ]);

  static Widget _force() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const WashCollapse(
            title: Text('Forced open'),
            content: Text('Always expanded via collapse-open.'),
            force: WashCollapseForce.open),
        const SizedBox(height: 12),
        _label('collapse collapse-open'),
        const SizedBox(height: 16),
        const WashCollapse(
          focusDriven: true,
          title: Text('Forced closed'),
          content: Text('Stays closed even when focused, via collapse-close.'),
          force: WashCollapseForce.closed,
          indicator: WashCollapseIndicator.arrow,
        ),
        const SizedBox(height: 12),
        _label('collapse collapse-close'),
      ]);

  static Widget _colors(BuildContext context) {
    final p = WashTokens.of(context).palette;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      WashAccordionColorGroup(
        panels: [
          WashAccordionColorPanel(
              title: 'Primary wash',
              content: 'bg-primary text-primary-content on the collapse root.',
              background: p.primary,
              foreground: p.primaryContent),
          WashAccordionColorPanel(
              title: 'Secondary wash',
              content: 'bg-secondary text-secondary-content.',
              background: p.secondary,
              foreground: p.secondaryContent),
          WashAccordionColorPanel(
              title: 'Accent wash',
              content: 'bg-accent text-accent-content.',
              background: p.accent,
              foreground: p.accentContent),
        ],
      ),
      const SizedBox(height: 12),
      const WashCollapsePeerShift(),
      const SizedBox(height: 12),
      _label('collapse bg-primary text-primary-content'),
    ]);
  }

  static Widget _iconStart() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const WashCollapse(
          focusDriven: true,
          iconOnStart: true,
          title: Text('Icon starts on the left'),
          content: Text(
              'after:start-5 after:end-auto with pe-4 ps-12 on collapse-title.'),
          indicator: WashCollapseIndicator.arrow,
        ),
        const SizedBox(height: 12),
        _label('collapse-title after:start-5 after:end-auto ps-12'),
      ]);

  static Widget _minimal() =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const WashCollapse(
          focusDriven: true,
          bordered: false,
          title: Text('Minimal focus collapse'),
          content:
              Text('Useful when the wash panel already provides the surface.'),
          indicator: WashCollapseIndicator.arrow,
        ),
        const SizedBox(height: 12),
        _label('collapse collapse-arrow (no border)'),
      ]);

  static Widget _label(String value) => Text(value,
      style: const TextStyle(fontFamily: 'monospace', fontSize: 10));

  static const _radioDart =
      "WashAccordion(items: [('Title', Text('Body'))], indicator: WashCollapseIndicator.none);";
  static const _detailsDart = 'WashCollapseDetailsGroup(items: [...]);';
  static const _arrowDart =
      'WashAccordion(indicator: WashCollapseIndicator.arrow, items: [...]);';
  static const _plusDart =
      'WashAccordion(indicator: WashCollapseIndicator.plus, items: [...]);';
  static const _joinDart =
      'WashAccordion(joined: true, indicator: WashCollapseIndicator.arrow, items: [...]);';
  static const _checkboxDart = 'WashCollapseCheckboxGroup(items: [...]);';
  static const _focusDart =
      'WashCollapse(focusDriven: true, indicator: WashCollapseIndicator.arrow, ...);';
  static const _forceDart = 'WashCollapse(force: WashCollapseForce.open, ...);';
  static const _colorsDart = 'WashAccordionColorGroup(panels: [...]);';
  static const _iconStartDart =
      'WashCollapse(iconOnStart: true, focusDriven: true, ...);';
  static const _minimalDart =
      'WashCollapse(bordered: false, focusDriven: true, ...);';
}
