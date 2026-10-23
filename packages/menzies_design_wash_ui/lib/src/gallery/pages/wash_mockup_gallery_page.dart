import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/mockup/wash_mockup.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashMockupGalleryPage extends StatelessWidget {
  const WashMockupGalleryPage({super.key});

  static const _phoneImageUrl =
      'https://img.daisyui.com/images/stock/453966.webp';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Mockups',
      description:
          'daisyUI mockup-browser and mockup-code mockup-phone, and mockup-window frames.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Browser',
          title: 'Bordered browser',
          description:
              'Toolbar with an address bar input and bordered content pane',
          child: WashShowcaseTabs(
            preview: WashMockupBrowser(
              url: 'https://menzies.design/plates',
              child: Container(
                height: 256,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: tokens.palette.base200.withValues(alpha: 0.4),
                  border: Border(
                    top: BorderSide(color: tokens.palette.base300),
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: LayoutBuilder(
                  builder: (context, constraints) => FittedBox(
                    fit: BoxFit.scaleDown,
                    child: SizedBox(
                      width: constraints.maxWidth,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Plate archive',
                            textAlign: TextAlign.center,
                            style:
                                WashTypography.body(tokens.onSurface).copyWith(
                              fontSize: 24,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 8),
                          ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 384),
                            child: Text(
                              'Browse coastal fog series, pigment notes, and wash recipes from the studio desk.',
                              textAlign: TextAlign.center,
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 14),
                            ),
                          ),
                          const SizedBox(height: 16),
                          WashButton(
                            label: 'Open catalog',
                            onPressed: () {},
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            dartSource: _browserBorderedDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Browser',
          title: 'Tinted browser',
          description:
              'Same chrome with a base surface fill behind the viewport',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: WashMockupBrowser(
              url: 'https://menzies.design/series/cerulean',
              tinted: true,
              child: Container(
                height: 256,
                alignment: Alignment.center,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Series · Cerulean',
                      style: WashTypography.label(tokens.inkMuted),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Soft blue over warm paper',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 384),
                      child: Text(
                        'Quiet hierarchy. Ink weight before more pigment.',
                        textAlign: TextAlign.center,
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 14),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            dartSource: _browserTintedDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Code',
          title: 'Line prefix',
          description: 'Terminal-style prefix via data-prefix on each pre line',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const WashMockupCode(
              lines: [
                WashMockupCodeLine('npm i daisyui@5.7.9', prefix: r'$'),
              ],
            ),
            dartSource: _codePrefixDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Code',
          title: 'Multi-line output',
          description:
              'Command plus status lines with warning and success tint',
          child: WashShowcaseTabs(
            preview: const WashMockupCode(
              lines: [
                WashMockupCodeLine(
                  'pnpm paint:wash coastal-fog',
                  prefix: r'$',
                ),
                WashMockupCodeLine(
                  'layering pigment…',
                  prefix: '>',
                  tone: WashMockupCodeTone.warning,
                ),
                WashMockupCodeLine(
                  'Done! Plate #1842 dried.',
                  prefix: '>',
                  tone: WashMockupCodeTone.success,
                ),
              ],
            ),
            dartSource: _codeMultiDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Code',
          title: 'Highlighted line',
          description:
              'Numbered prefixes with a warning highlight on the error row',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const WashMockupCode(
              lines: [
                WashMockupCodeLine(
                  "const wash = mix('cerulean', 0.4)",
                  prefix: '1',
                ),
                WashMockupCodeLine('paper.soak(wash)', prefix: '2'),
                WashMockupCodeLine(
                  "throw new Error('Bleed past the margin')",
                  prefix: '3',
                  tone: WashMockupCodeTone.highlight,
                ),
              ],
            ),
            dartSource: _codeHighlightDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Code',
          title: 'Long line scroll',
          description:
              'Overflowing lines stay in the mockup and scroll horizontally',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const WashMockupCode(
              lines: [
                WashMockupCodeLine(
                  'Soft cerulean wash over warm paper with quiet hierarchy, ink '
                  'weight before pigment, and a long recipe note that scrolls '
                  'inside the frame instead of wrapping the chrome.',
                  prefix: '~',
                ),
              ],
            ),
            dartSource: _codeScrollDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · Code',
          title: 'Without prefix',
          description: 'Plain pre/code block inside the editor chrome',
          child: LayoutBuilder(
            builder: (context, constraints) {
              final wide = constraints.maxWidth >= 1024;
              final kids = [
                const WashShowcaseTabs(
                  preview: WashMockupCode(
                    lines: [
                      WashMockupCodeLine(
                        "export const studio = 'Menzies Design'",
                      ),
                    ],
                  ),
                  dartSource: _codePlainDart,
                ),
                WashShowcaseTabs(
                  preview: WashMockupCode(
                    background: tokens.primary,
                    foreground: tokens.onPrimary,
                    lines: const [
                      WashMockupCodeLine('Pigment desk ready'),
                    ],
                  ),
                  dartSource: _codePrimaryDart,
                ),
              ];
              if (wide) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: kids[0]),
                    const SizedBox(width: 24),
                    Expanded(child: kids[1]),
                  ],
                );
              }
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  kids[0],
                  const SizedBox(height: 24),
                  kids[1],
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Phone',
          title: 'iPhone frame',
          description:
              'Camera notch plus display surface for mobile compositions',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseWrap(
            maxColumns: 2,
            minItemWidth: 360,
            spacing: 32,
            runSpacing: 32,
            alignment: WrapAlignment.center,
            children: [
              WashShowcaseTabs(
                preview: WashMockupPhone(
                  child: ColoredBox(
                    color: tokens.palette.neutral,
                    child: Center(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'Menzies Design',
                              style: WashTypography.label(
                                tokens.palette.neutralContent
                                    .withValues(alpha: 0.7),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Field notes',
                              textAlign: TextAlign.center,
                              style: WashTypography.body(
                                tokens.palette.neutralContent,
                              ).copyWith(
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Capture pigment mixes on the go.',
                              textAlign: TextAlign.center,
                              style: WashTypography.body(
                                tokens.palette.neutralContent
                                    .withValues(alpha: 0.8),
                              ).copyWith(fontSize: 14),
                            ),
                            const SizedBox(height: 16),
                            WashButton(
                              label: 'New note',
                              size: WashButtonSize.sm,
                              onPressed: () {},
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                dartSource: _phoneNotesDart,
              ),
              WashShowcaseTabs(
                preview: WashMockupPhone(
                  borderColor: tokens.primary,
                  child: const WashMockupPhoneImage(
                    url: _phoneImageUrl,
                    semanticLabel:
                        'Soft watercolor wash wallpaper for phone mockup',
                  ),
                ),
                dartSource: _phoneImageDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '09 · Window',
          title: 'OS window border',
          description: 'Desktop window chrome with a bordered content area',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: WashMockupWindow(
              child: Container(
                height: 256,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  border: Border(
                    top: BorderSide(color: tokens.palette.base300),
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: LayoutBuilder(
                  builder: (context, constraints) => FittedBox(
                    fit: BoxFit.scaleDown,
                    child: SizedBox(
                      width: constraints.maxWidth,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Studio mixer',
                            textAlign: TextAlign.center,
                            style:
                                WashTypography.body(tokens.onSurface).copyWith(
                              fontSize: 24,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 8),
                          ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 448),
                            child: Text(
                              'Blend washes, export recipes, and keep plates in one OS-style frame.',
                              textAlign: TextAlign.center,
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 14),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            alignment: WrapAlignment.center,
                            children: [
                              WashButton(
                                label: 'Cancel',
                                size: WashButtonSize.sm,
                                variant: WashButtonVariant.defaultVariant,
                                onPressed: () {},
                              ),
                              WashButton(
                                label: 'Save wash',
                                size: WashButtonSize.sm,
                                onPressed: () {},
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            dartSource: _windowBorderedDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '10 · Window',
          title: 'Tinted window',
          description:
              'Window mockup with a filled base surface behind the body',
          child: WashShowcaseTabs(
            preview: WashMockupWindow(
              tinted: true,
              child: Container(
                height: 256,
                alignment: Alignment.center,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Preferences',
                      style: WashTypography.label(tokens.inkMuted),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Paper grain & ink weight',
                      textAlign: TextAlign.center,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 384),
                      child: Text(
                        'Toggle soak intensity and dry-brush focus rings for the desk UI.',
                        textAlign: TextAlign.center,
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 14),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            dartSource: _windowTintedDart,
          ),
        ),
      ],
    );
  }

  static const _browserBorderedDart =
      "WashMockupBrowser(url: '…/plates', child: Plate archive pane)";
  static const _browserTintedDart =
      'WashMockupBrowser(tinted: true, url: …/cerulean)';
  static const _codePrefixDart =
      r"WashMockupCode(lines: [WashMockupCodeLine('npm i daisyui@5.7.9', prefix: r'$')])";
  static const _codeMultiDart = 'WashMockupCode + warning/success tones';
  static const _codeHighlightDart =
      'WashMockupCodeTone.highlight on error line';
  static const _codeScrollDart =
      'WashMockupCode long line with horizontal scroll';
  static const _codePlainDart =
      "WashMockupCodeLine(\"export const studio = 'Menzies Design'\")";
  static const _codePrimaryDart =
      'WashMockupCode(background: primary, foreground: onPrimary)';
  static const _phoneNotesDart = 'WashMockupPhone + neutral display + New note';
  static const _phoneImageDart =
      'WashMockupPhone(borderColor: primary) + WashMockupPhoneImage';
  static const _windowBorderedDart = 'WashMockupWindow + Studio mixer actions';
  static const _windowTintedDart = 'WashMockupWindow(tinted: true) Preferences';
}
