import 'package:flutter/widgets.dart';

import '../../components/aura/wash_aura.dart';
import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAuraGalleryPage extends StatelessWidget {
  const WashAuraGalleryPage({super.key});

  static const _styles = <(String, WashAuraStyle, String)>[
    ('Default', WashAuraStyle.defaultStyle, 'Default rotating border'),
    ('Dual', WashAuraStyle.dual, 'aura-dual'),
    ('Rainbow', WashAuraStyle.rainbow, 'aura-rainbow'),
    ('Holo', WashAuraStyle.holo, 'aura-holo'),
    ('Gold', WashAuraStyle.gold, 'aura-gold'),
    ('Silver', WashAuraStyle.silver, 'aura-silver'),
    ('Glow', WashAuraStyle.glow, 'aura-glow'),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Aura',
      description:
          'Decorative border light that wraps one child (card, button, avatar).',
      sections: [
        _s('01 · Default', 'Aura around a card', 'Base rotating border',
            _cardDefault(context), _cardDart),
        _s(
            '02 · Buttons',
            'Aura around a button',
            'Highlight a primary CTA with a light ring',
            _buttons(),
            _buttonsDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Styles',
            'Style modifiers',
            'dual, rainbow, holo, gold, silver, and glow variants',
            _stylesGrid(context),
            _stylesDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '04 · Sizes',
            'Aura sizes',
            'Padding thickness from aura-xs through aura-xl (md is default)',
            _sizes(),
            _sizesDart),
        _s(
            '05 · Theme colors',
            'text-* color classes',
            'Aura inherits currentColor',
            _themeColors(context),
            _themeColorsDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '06 · Custom color',
            'Arbitrary text and background',
            'Custom aura pigment via text-*, and optional bg-* for the aura pad',
            _customColors(context),
            _customColorsDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '07 · Avatars',
            'Aura around avatars',
            'Same wrapper pattern on avatar placeholders and image rings',
            _avatars(context),
            _avatarsDart),
        _s(
            '08 · Duration',
            'Custom animation duration',
            'Override spin speed with duration-* utilities',
            _duration(context),
            _durationDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '09 · Showcase',
            'Rainbow pricing card',
            'Docs pattern: highlight a featured plan with aura-rainbow',
            _showcase(context),
            _showcaseDart,
            tint: WashGalleryPanelTint.rose),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String description,
    Widget preview,
    String dart, {
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

  static Widget _cardDefault(BuildContext context) {
    return WashAuraSample(
      classLabel: 'aura',
      child: WashAura(
        child: _AuraDemoCard(
          title: 'Coastal fog plate',
          body: 'Soft rotating light around the card surface.',
          maxWidth: 360,
        ),
      ),
    );
  }

  static Widget _buttons() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        WashAuraSample(
          classLabel: 'aura + btn',
          child: WashAura(
            childRadius: WashAuraChildRadius.field,
            child: WashButton(label: 'Button with aura', onPressed: () {}),
          ),
        ),
        Builder(
          builder: (context) => WashAuraSample(
            classLabel: 'aura text-primary + btn-primary',
            child: WashAura(
              color: WashTokens.of(context).palette.primary,
              childRadius: WashAuraChildRadius.field,
              child: WashButton(
                label: 'Primary highlight',
                variant: WashButtonVariant.primary,
                onPressed: () {},
              ),
            ),
          ),
        ),
        WashAuraSample(
          classLabel: 'aura aura-glow text-accent + btn-accent',
          child: Builder(
            builder: (context) {
              final tokens = WashTokens.of(context);
              return WashAura(
                style: WashAuraStyle.glow,
                color: tokens.palette.accent,
                childRadius: WashAuraChildRadius.field,
                child: WashButton(
                  label: 'Glow accent',
                  variant: WashButtonVariant.accent,
                  onPressed: () {},
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  static Widget _stylesGrid(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = washAuraGalleryColumns(constraints.maxWidth);
        return Wrap(
          spacing: 24,
          runSpacing: 24,
          children: _styles.map((s) {
            return SizedBox(
              width: cols == 1
                  ? constraints.maxWidth
                  : (constraints.maxWidth - 24 * (cols - 1)) / cols,
              child: WashAuraSample(
                classLabel: washAuraClassLabel(style: s.$2),
                child: WashAura(
                  style: s.$2,
                  child: _AuraDemoCard(
                    title: s.$1,
                    body: s.$3,
                    compact: true,
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  static Widget _sizes() {
    const sizes = WashAuraSize.values;
    return Wrap(
      spacing: 20,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: sizes.map((s) {
        final label =
            s == WashAuraSize.md ? 'aura (md)' : washAuraClassLabel(size: s);
        return WashAuraSample(
          classLabel: label,
          child: WashAura(
            size: s,
            childRadius: WashAuraChildRadius.field,
            child: WashButton(
              label: switch (s) {
                WashAuraSize.xs => 'XS',
                WashAuraSize.sm => 'SM',
                WashAuraSize.md => 'MD',
                WashAuraSize.lg => 'LG',
                WashAuraSize.xl => 'XL',
              },
              onPressed: () {},
            ),
          ),
        );
      }).toList(),
    );
  }

  static Widget _themeColors(BuildContext context) {
    final tokens = WashTokens.of(context);
    final entries = <(String, Color)>[
      ('Primary', tokens.palette.primary),
      ('Secondary', tokens.palette.secondary),
      ('Accent', tokens.palette.accent),
      ('Info', tokens.palette.info),
      ('Success', tokens.palette.success),
      ('Warning', tokens.palette.warning),
      ('Error', tokens.palette.error),
    ];
    return Wrap(
      spacing: 20,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: entries.map((e) {
        return WashAuraSample(
          classLabel:
              washAuraClassLabel(colorClass: 'text-${e.$1.toLowerCase()}'),
          child: WashAura(
            color: e.$2,
            childRadius: WashAuraChildRadius.field,
            child: WashButton(label: e.$1, onPressed: () {}),
          ),
        );
      }).toList(),
    );
  }

  static Widget _customColors(BuildContext context) {
    const orange = Color(0xFFEA580C);
    const yellowPad = Color(0xFFFEF08A);
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 640;
        final itemWidth =
            wide ? (constraints.maxWidth - 24) / 2 : constraints.maxWidth;
        return Wrap(
          spacing: 24,
          runSpacing: 24,
          children: [
            SizedBox(
              width: itemWidth,
              child: WashAuraSample(
                classLabel: 'aura text-orange-600',
                child: WashAura(
                  color: orange,
                  child: const _AuraDemoCard(
                    title: 'Custom color',
                    body: 'Orange rotating border from text-orange-600.',
                  ),
                ),
              ),
            ),
            SizedBox(
              width: itemWidth,
              child: WashAuraSample(
                classLabel: 'aura text-orange-600 bg-yellow-200',
                child: WashAura(
                  color: orange,
                  padColor: yellowPad,
                  child: const _AuraDemoCard(
                    title: 'Color + background',
                    body: 'Yellow pad behind the light ring.',
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  static Widget _avatars(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        WashAuraSample(
          classLabel: 'aura + avatar',
          child: WashAura(
            childRadius: WashAuraChildRadius.selector,
            child: _AuraAvatar(
                'MK', tokens.palette.neutral, tokens.palette.neutralContent),
          ),
        ),
        WashAuraSample(
          classLabel: 'aura aura-rainbow + avatar',
          child: WashAura(
            style: WashAuraStyle.rainbow,
            childRadius: WashAuraChildRadius.selector,
            child: _AuraAvatar(
                'WR', tokens.palette.primary, tokens.palette.primaryContent),
          ),
        ),
        WashAuraSample(
          classLabel: 'aura aura-gold text-warning + avatar',
          child: WashAura(
            style: WashAuraStyle.gold,
            childRadius: WashAuraChildRadius.selector,
            child: _AuraAvatar(
                'GL', const Color(0xFF7AA8B8), tokens.palette.baseContent),
          ),
        ),
        WashAuraSample(
          classLabel: 'aura aura-glow text-info + avatar',
          child: WashAura(
            style: WashAuraStyle.glow,
            color: tokens.palette.info,
            childRadius: WashAuraChildRadius.selector,
            child: _AuraAvatar(
                'AO', tokens.palette.info, tokens.palette.infoContent),
          ),
        ),
      ],
    );
  }

  static Widget _duration(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = washAuraGalleryColumns(constraints.maxWidth);
        final w = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - 24 * (cols - 1)) / cols;
        return Wrap(
          spacing: 24,
          runSpacing: 24,
          children: [
            SizedBox(
              width: w,
              child: WashAuraSample(
                classLabel: 'aura aura-rainbow duration-1000',
                child: WashAura(
                  style: WashAuraStyle.rainbow,
                  duration: const Duration(milliseconds: 1000),
                  child: _AuraDemoCard(
                      title: '',
                      body: '1000ms spin',
                      compact: true,
                      hideTitle: true),
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: WashAuraSample(
                classLabel: 'aura aura-rainbow duration-2000',
                child: WashAura(
                  style: WashAuraStyle.rainbow,
                  duration: const Duration(milliseconds: 2000),
                  child: _AuraDemoCard(
                      title: '',
                      body: '2000ms spin',
                      compact: true,
                      hideTitle: true),
                ),
              ),
            ),
            SizedBox(
              width: w,
              child: WashAuraSample(
                classLabel: 'aura aura-rainbow (default 6s)',
                child: WashAura(
                  style: WashAuraStyle.rainbow,
                  child: _AuraDemoCard(
                      title: '',
                      body: 'Default duration',
                      compact: true,
                      hideTitle: true),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  static Widget _showcase(BuildContext context) {
    final tokens = WashTokens.of(context);
    const features = [
      'High-resolution plate scans',
      'Custom wash templates',
      'Batch pigment processing',
      'AI-driven enhancements',
    ];
    return WashAuraSample(
      classLabel: 'aura aura-rainbow + card',
      child: WashAura(
        style: WashAuraStyle.rainbow,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 360),
          child: _AuraDemoCard(
            title: '',
            body: '',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: tokens.palette.warning.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    'Most popular',
                    style: WashTypography.label(tokens.palette.warning)
                        .copyWith(fontSize: 10),
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  alignment: WrapAlignment.spaceBetween,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  spacing: 12,
                  runSpacing: 4,
                  children: [
                    Text(
                      'Premium',
                      style: WashTypography.title(tokens.onSurface).copyWith(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text('\$29/mo', style: TextStyle(fontSize: 18)),
                  ],
                ),
                const SizedBox(height: 16),
                for (final f in features)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        WashLucideIcon(
                          'circle-check',
                          size: 16,
                          color: tokens.palette.success,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                            child:
                                Text(f, style: const TextStyle(fontSize: 11))),
                      ],
                    ),
                  ),
                Opacity(
                  opacity: 0.5,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      WashLucideIcon(
                        'circle-check',
                        size: 16,
                        color:
                            tokens.palette.baseContent.withValues(alpha: 0.5),
                      ),
                      const SizedBox(width: 8),
                      const Expanded(
                        child: Text(
                          'Cloud collaboration',
                          style: TextStyle(
                              fontSize: 11,
                              decoration: TextDecoration.lineThrough),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                WashButton(label: 'Subscribe', block: true, onPressed: () {}),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static const _cardDart = '''
WashAura(
  child: WashCard(...),
);''';

  static const _buttonsDart = '''
WashAura(
  childRadius: WashAuraChildRadius.field,
  child: WashButton(label: 'Button with aura', onPressed: () {}),
);
WashAura(
  color: tokens.palette.primary,
  child: WashButton(variant: WashButtonVariant.primary, ...),
);
WashAura(
  style: WashAuraStyle.glow,
  color: tokens.palette.accent,
  child: WashButton(variant: WashButtonVariant.accent, ...),
);''';

  static const _stylesDart = '''
WashAura(style: WashAuraStyle.rainbow, child: demoCard);
WashAura(style: WashAuraStyle.gold, child: demoCard);''';

  static const _sizesDart = '''
WashAura(size: WashAuraSize.xs, childRadius: WashAuraChildRadius.field, child: btn);
// … through WashAuraSize.xl''';

  static const _themeColorsDart = '''
WashAura(color: tokens.palette.primary, child: WashButton(label: 'Primary', ...));
// secondary, accent, info, success, warning, error''';

  static const _customColorsDart = '''
WashAura(color: Color(0xFFEA580C), child: card);
WashAura(color: orange, padColor: Color(0xFFFEF08A), child: card);''';

  static const _avatarsDart = '''
WashAura(childRadius: WashAuraChildRadius.selector, child: avatar);
WashAura(style: WashAuraStyle.rainbow, childRadius: WashAuraChildRadius.selector, child: avatar);''';

  static const _durationDart = '''
WashAura(
  style: WashAuraStyle.rainbow,
  duration: Duration(milliseconds: 1000),
  child: card,
);''';

  static const _showcaseDart = '''
WashAura(
  style: WashAuraStyle.rainbow,
  child: pricingCard,
);''';
}

class _AuraDemoCard extends StatelessWidget {
  const _AuraDemoCard({
    required this.title,
    required this.body,
    this.maxWidth,
    this.compact = false,
    this.hideTitle = false,
    this.child,
  });

  final String title;
  final String body;
  final double? maxWidth;
  final bool compact;
  final bool hideTitle;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final content = child ??
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (!hideTitle && title.isNotEmpty)
              Text(
                title,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: compact ? 18 : 20,
                  fontWeight: FontWeight.w600,
                ),
              ),
            if (body.isNotEmpty) ...[
              if (!hideTitle && title.isNotEmpty) const SizedBox(height: 4),
              Text(
                body,
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
              ),
            ],
          ],
        );

    Widget card = Container(
      width: double.infinity,
      padding: EdgeInsets.all(compact ? 16 : 20),
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: content,
    );

    if (maxWidth != null) {
      card = ConstrainedBox(
          constraints: BoxConstraints(maxWidth: maxWidth!), child: card);
    }
    return card;
  }
}

class _AuraAvatar extends StatelessWidget {
  const _AuraAvatar(this.initials, this.bg, this.fg);

  final String initials;
  final Color bg;
  final Color fg;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 64,
      height: 64,
      alignment: Alignment.center,
      decoration: BoxDecoration(color: bg, shape: BoxShape.circle),
      child: Text(
        initials,
        style: TextStyle(color: fg, fontSize: 20, fontWeight: FontWeight.w600),
      ),
    );
  }
}
