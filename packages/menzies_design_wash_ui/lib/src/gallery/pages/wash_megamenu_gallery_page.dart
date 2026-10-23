import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/megamenu/wash_megamenu.dart';
import '../../components/app_bar/wash_screen_bar.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashMegamenuGalleryPage extends StatelessWidget {
  const WashMegamenuGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Megamenu',
      description:
          'daisyUI megamenu panels: wide multi-column links, icons, Menzies Design studio columns.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Wide multi-column panel',
          description: 'megamenu-wide with nested menu columns',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _Shell(
                  child: WashMegamenu(
                    initiallyOpenIndex: 0,
                    sections: [
                      WashMegamenuSection(
                        label: 'Pigments',
                        panel: WashMegamenuMenu(
                          children: [
                            WashMegamenuColumn(
                              title: 'Blues',
                              titleIsLink: true,
                              links: const [
                                WashMegamenuLink(label: 'Ultramarine'),
                                WashMegamenuLink(label: 'Cerulean'),
                                WashMegamenuLink(label: 'Indigo'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Earths',
                              titleIsLink: true,
                              links: const [
                                WashMegamenuLink(label: 'Yellow ochre'),
                                WashMegamenuLink(label: 'Burnt sienna'),
                                WashMegamenuLink(label: 'Raw umber'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Reds',
                              titleIsLink: true,
                              links: const [
                                WashMegamenuLink(label: 'Alizarin'),
                                WashMegamenuLink(label: 'Cadmium red'),
                                WashMegamenuLink(label: 'Rose madder'),
                              ],
                            ),
                          ],
                        ),
                      ),
                      WashMegamenuSection(
                        label: 'Tools',
                        panel: WashMegamenuMenu(
                          children: [
                            WashMegamenuColumn(
                              title: 'Brushes',
                              titleIsLink: true,
                              links: const [
                                WashMegamenuLink(label: 'Round 6'),
                                WashMegamenuLink(label: 'Flat 12'),
                                WashMegamenuLink(label: 'Rigger'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Paper',
                              titleIsLink: true,
                              links: const [
                                WashMegamenuLink(label: 'Cold press'),
                                WashMegamenuLink(label: 'Hot press'),
                                WashMegamenuLink(label: 'Rough'),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const WashMegamenuSection(
                        label: 'Series',
                        panel: WashMegamenuLinkList([
                          WashMegamenuLink(label: 'Harbor light'),
                          WashMegamenuLink(label: 'Mist meadow'),
                          WashMegamenuLink(label: 'Ink study'),
                        ]),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                const _ClassLabel(
                  'megamenu megamenu-wide max-sm:megamenu-vertical',
                ),
              ],
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Icons',
          title: 'Lucide icons in link rows',
          description: 'Same megamenu structure with icons beside each link',
          tint: WashGalleryPanelTint.blue,
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _Shell(
                  child: WashMegamenu(
                    initiallyOpenIndex: 0,
                    sections: [
                      WashMegamenuSection(
                        label: 'Kit',
                        panel: WashMegamenuMenu(
                          children: [
                            WashMegamenuColumn(
                              title: 'Media',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Round brush',
                                  icon: 'paintbrush',
                                ),
                                WashMegamenuLink(
                                  label: 'Graphite pencil',
                                  icon: 'pencil',
                                ),
                                WashMegamenuLink(
                                  label: 'Wash dropper',
                                  icon: 'droplets',
                                ),
                                WashMegamenuLink(
                                  label: 'Kneaded eraser',
                                  icon: 'eraser',
                                ),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Surface',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Palette plate',
                                  icon: 'palette',
                                ),
                                WashMegamenuLink(
                                  label: 'Layer stack',
                                  icon: 'layers',
                                ),
                                WashMegamenuLink(
                                  label: 'Dry brush',
                                  icon: 'brush',
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const WashMegamenuSection(
                        label: 'Desk',
                        panel: WashMegamenuLinkList([
                          WashMegamenuLink(
                            label: 'Studio calendar',
                            icon: 'calendar',
                          ),
                          WashMegamenuLink(
                            label: 'Component shelf',
                            icon: 'square-stack',
                          ),
                          WashMegamenuLink(
                            label: 'Dock preview',
                            icon: 'app-window',
                          ),
                        ]),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                const _ClassLabel('menu + Lucide size-4 in links'),
              ],
            ),
            dartSource: _iconsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Studio',
          title: 'Menzies Design section columns',
          description: 'One open panel with Palette, Layers, Brushes, Calendar',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _Shell(
                  child: WashMegamenu(
                    initiallyOpenIndex: 0,
                    sections: [
                      WashMegamenuSection(
                        label: 'Explore',
                        panel: WashMegamenuMenu(
                          children: [
                            WashMegamenuColumn(
                              title: 'Palette',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Pigment chart',
                                  icon: 'palette',
                                ),
                                WashMegamenuLink(label: 'Mix notes'),
                                WashMegamenuLink(label: 'Swatch racks'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Layers',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Wash stack',
                                  icon: 'layers',
                                ),
                                WashMegamenuLink(label: 'Masking film'),
                                WashMegamenuLink(label: 'Glaze order'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Brushes',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Round set',
                                  icon: 'paintbrush',
                                ),
                                WashMegamenuLink(label: 'Flat wash'),
                                WashMegamenuLink(label: 'Detail tips'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Calendar',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Session plan',
                                  icon: 'calendar',
                                ),
                                WashMegamenuLink(label: 'Drying windows'),
                                WashMegamenuLink(label: 'Critique dates'),
                              ],
                            ),
                            WashMegamenuColumn(
                              title: 'Components',
                              links: const [
                                WashMegamenuLink(
                                  label: 'Gallery pages',
                                  icon: 'square-stack',
                                ),
                                WashMegamenuLink(label: 'Form controls'),
                                WashMegamenuLink(label: 'Feedback chrome'),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const WashMegamenuSection(
                        label: 'Guides',
                        panel: WashMegamenuLinkList([
                          WashMegamenuLink(label: 'Wet on wet'),
                          WashMegamenuLink(label: 'Dry brush edges'),
                          WashMegamenuLink(label: 'Granulation tips'),
                        ]),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                const _ClassLabel(
                  'menu-title columns: Palette, Layers, Brushes, Calendar, Components',
                ),
              ],
            ),
            dartSource: _studioDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Navbar',
          title: 'Mini navbar host',
          description:
              'A self-contained navbar inside the wash-panel hosts megamenu-full in',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _Shell(
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final narrow = constraints.maxWidth < 640;
                      final tokens = WashTokens.of(context);
                      return WashScreenBar(
                        dense: true,
                        child: WashScreenBarRow(
                          start: WashButton(
                            variant: WashButtonVariant.ghost,
                            onPressed: () {},
                            child: Text(
                              'Menzies Design',
                              style: WashTypography.title(tokens.onSurface)
                                  .copyWith(
                                fontSize: 18,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          center: narrow
                              ? null
                              : ConstrainedBox(
                                  constraints:
                                      const BoxConstraints(maxWidth: 420),
                                  child: WashMegamenu(
                                    variant: WashMegamenuVariant.full,
                                    bordered: false,
                                    showMobileMenuButton: false,
                                    padding: const EdgeInsets.all(4),
                                    initiallyOpenIndex: 0,
                                    sections: [
                                      WashMegamenuSection(
                                        label: 'Studio',
                                        panel: WashMegamenuMenu(
                                          children: [
                                            WashMegamenuColumn(
                                              title: 'Workspace',
                                              titleIsLink: true,
                                              links: const [
                                                WashMegamenuLink(
                                                  label: 'Palette',
                                                  icon: 'palette',
                                                ),
                                                WashMegamenuLink(
                                                  label: 'Layers',
                                                  icon: 'layers',
                                                ),
                                                WashMegamenuLink(
                                                  label: 'Brushes',
                                                  icon: 'paintbrush',
                                                ),
                                              ],
                                            ),
                                            WashMegamenuColumn(
                                              title: 'Schedule',
                                              titleIsLink: true,
                                              links: const [
                                                WashMegamenuLink(
                                                  label: 'Calendar',
                                                  icon: 'calendar',
                                                ),
                                                WashMegamenuLink(
                                                  label: 'Critiques',
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                      const WashMegamenuSection(
                                        label: 'Library',
                                        panel: WashMegamenuLinkList([
                                          WashMegamenuLink(
                                            label: 'Reference plates',
                                          ),
                                          WashMegamenuLink(
                                            label: 'Wash recipes',
                                          ),
                                          WashMegamenuLink(
                                            label: 'Paper grades',
                                          ),
                                        ]),
                                      ),
                                    ],
                                  ),
                                ),
                          end: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              if (!narrow)
                                WashButton(
                                  label: 'Sign in',
                                  size: WashButtonSize.sm,
                                  onPressed: () {},
                                ),
                              if (narrow)
                                WashButton(
                                  label: 'Menu',
                                  size: WashButtonSize.sm,
                                  onPressed: () {},
                                ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 12),
                const _ClassLabel('navbar + megamenu megamenu-full'),
              ],
            ),
            dartSource: _navDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Responsive',
          title: 'Small screen notes',
          description: 'Megamenu prefers large screens',
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (final row in _responsiveNotes) ...[
                  _ResponsiveNote(code: row.$1, text: row.$2),
                  const SizedBox(height: 8),
                ],
                const SizedBox(height: 4),
                const _ClassLabel(
                  'responsive: button + max-sm:megamenu-vertical + stacked columns',
                ),
              ],
            ),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }

  static const _responsiveNotes = <(String, String)>[
    (
      'sm:hidden',
      'Show a single Menu button that targets the megamenu popover on phones.',
    ),
    (
      'max-sm:megamenu-vertical',
      'Collapse the bar into a vertical sheet when the popover opens.',
    ),
    (
      'max-sm:flex-col',
      'Stack multi-column panels so titles and links remain readable.',
    ),
    (
      'popover',
      'Item panels use the Popover API, so outside click and Escape dismiss without sticky open classes.',
    ),
  ];

  static const _basicDart =
      'WashMegamenu(variant: wide, sections: [Pigments, Tools, Series])';
  static const _iconsDart = 'WashMegamenu + WashMegamenuLink(icon: …)';
  static const _studioDart = 'WashMegamenuColumn(title: Palette|Layers|…)';
  static const _navDart = 'WashScreenBar + WashMegamenu(variant: full)';
  static const _responsiveDart =
      'narrow Menu button + verticalOnNarrow + stacked columns';
}

class _Shell extends StatelessWidget {
  const _Shell({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tokens.palette.base200.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: child,
    );
  }
}

class _ClassLabel extends StatelessWidget {
  const _ClassLabel(this.value);

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

class _ResponsiveNote extends StatelessWidget {
  const _ResponsiveNote({required this.code, required this.text});

  final String code;
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 168,
          child: Text(
            code,
            style: WashTypography.body(tokens.onSurface).copyWith(
              fontFamily: 'monospace',
              fontSize: 11.2,
            ),
          ),
        ),
        Expanded(
          child: Text(
            text,
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
          ),
        ),
      ],
    );
  }
}
