import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../foundation/wash_ripple.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';


import '../templates/wash_templates.dart';
import '../behaviours/wash_behaviours.dart';
import '../charts/wash_charts.dart';
import '../version.dart';
import '../widgets/wash_background.dart';
import '../widgets/wash_button.dart';
import '../components/bottom_sheet/wash_bottom_sheet.dart';
import '../components/diff/wash_diff.dart';
import '../components/drawer/wash_drawer.dart';
import '../foundation/wash_modal_scope.dart';
import '../components/card/wash_card.dart';
import '../widgets/wash_catalog.dart';
import '../components/color_picker/wash_color_picker.dart';
import '../components/countdown/wash_countdown.dart';
import '../components/datetime/wash_calendar_month.dart';
import '../components/fab/wash_fab.dart';
import '../components/fieldset/wash_fieldset.dart';
import '../components/file_input/wash_file_input.dart';
import '../components/filter/wash_filter.dart';
import '../components/floating_panel/wash_floating_panel.dart';
import '../components/join/wash_join.dart';
import '../components/layout/wash_footer.dart';
import '../components/layout/wash_hero.dart';
import '../components/hover_3d/wash_hover_3d.dart';
import '../components/layout/wash_hover_gallery.dart';
import '../widgets/wash_components_extended.dart' hide WashSteps, WashTagsInput;
import '../components/theme_controller/wash_theme_controller.dart';
import '../components/text_rotate/wash_text_rotate.dart';
import '../components/tags_input/wash_tags_input.dart';
import '../components/steps/wash_steps.dart';
import '../widgets/wash_data_table.dart';
import '../components/loading/wash_loading.dart';
import '../components/marquee/wash_marquee.dart';
import '../components/mask/wash_mask.dart';
import '../components/megamenu/wash_megamenu.dart';
import '../components/menu/wash_menu.dart';
import '../components/mockup/wash_mockup.dart';
import '../widgets/wash_feedback.dart';
import '../widgets/wash_form_fields.dart';
import '../components/collapse/wash_collapse.dart';
import '../components/context_menu/wash_context_menu.dart';
import '../components/autocomplete/wash_autocomplete.dart';
import '../components/dropdown/wash_dropdown.dart';
import '../components/layout/wash_aspect_ratio.dart';
import '../components/layout/wash_bento.dart';
import '../components/aura/wash_aura.dart';
import '../components/avatar/wash_avatar.dart';
import '../components/carousel/wash_carousel.dart';
import '../components/chat/wash_chat.dart';
import '../components/badge/wash_badge.dart';
import '../components/indicator/wash_indicator.dart';
import '../components/chip/wash_chip.dart';
import '../components/stat/wash_stat.dart';

/// Legacy single-pane previews (used inside generated section tabs).
class WashGalleryLegacyPreview {
  const WashGalleryLegacyPreview._();

  static Widget build(BuildContext context, String pageId) {
    switch (pageId) {
      case 'overview':
        return Text('Wash UI Flutter · ${washUiBrandText()}');
      case 'support':
        return const WashDocPage(pageId: 'support');
      case 'buttons':
        return Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashButton(label: 'Primary', onPressed: () {}),
            WashButton(
              label: 'Secondary',
              variant: WashButtonVariant.secondary,
              onPressed: () {},
            ),
            WashButton(label: 'Loading', loading: true, onPressed: () {}),
          ],
        );
      case 'ripple':
        return const WashRippleDemo();
      case 'links':
        return Wrap(
          spacing: 12,
          runSpacing: 8,
          children: [
            WashLink(label: 'Primary', onTap: () {}, tone: WashLinkTone.primary),
            WashLink(
              label: 'Hover',
              onTap: () {},
              tone: WashLinkTone.accent,
              hoverUnderline: true,
            ),
            WashLink(label: 'Learn more', onTap: () {}),
          ],
        );
      case 'input':
        return const WashInput(
          hint: 'Plate title…',
          maxWidth: 448,
        );
      case 'textarea':
        return const WashTextarea(label: 'Message');
      case 'checkbox':
        return WashCheckbox(value: true, label: 'Accept', onChanged: (_) {});
      case 'toggle':
        return WashToggle(value: true, label: 'Notifications', onChanged: (_) {});
      case 'radio':
        return WashRadioGroup<String>(
          value: 'a',
          options: const [('a', 'Option A'), ('b', 'Option B')],
          onChanged: (_) {},
        );
      case 'range':
        return WashRange(value: 40, onChanged: (_) {});
      case 'rating':
        return WashRating(
          value: 3,
          shape: WashRatingShape.star2,
          tone: WashProgressTone.primary,
          onChanged: (_) {},
        );
      case 'select':
        return WashSelect<String>(
          label: 'Size',
          value: 'm',
          options: const [
            WashSelectOption(value: 's', label: 'Small'),
            WashSelectOption(value: 'm', label: 'Medium'),
          ],
          onChanged: (_) {},
        );
      case 'search-select':
        return WashSearchSelect(
          options: washSearchSelectFromStrings(const ['Apple', 'Banana']),
          label: 'Fruit',
          onChanged: (_) {},
        );
      case 'autocomplete':
        return const WashAutocomplete();
      case 'fieldset':
        return WashFieldset(
          legend: 'Account',
          children: const [WashInput(label: 'Name')],
        );
      case 'label':
        return const WashLabel(text: 'Email', child: WashInput(label: ''));
      case 'otp':
        return WashOtpField(length: 6, onCompleted: (_) {});
      case 'validator':
        return const WashValidatorForm();
      case 'file-input':
        return const WashFileInput(tone: WashFileInputTone.primary);
      case 'filter':
        return WashFilter(
          children: [
            WashFilterReset(onPressed: () {}),
            WashFilterRadio(label: 'Coastal', selected: true, onSelected: () {}),
            WashFilterRadio(label: 'Alpine', selected: false, onSelected: () {}),
          ],
        );
      case 'floating-panel':
        return WashFloatingDemoFrame(
          child: Stack(
            children: [
              WashFloatingPanel(
                title: 'Notes',
                draggable: false,
                resizable: false,
                defaultRect: const WashFloatingPanelRect(x: 48, y: 16, width: 220, height: 120),
                child: const Text('Floating panel preview'),
              ),
            ],
          ),
        );
      case 'join':
        return WashJoin(
          children: [
            WashButton(label: 'Wash', joinItem: true, onPressed: () {}),
            WashButton(label: 'Glaze', joinItem: true, active: true, onPressed: () {}),
            WashButton(label: 'Lift', joinItem: true, onPressed: () {}),
          ],
        );
      case 'tooltip':
        return WashTooltip(
          message: 'Tip',
          child: WashButton(label: 'Hover me', onPressed: () {}),
        );
      case 'alert':
        return const WashAlert(title: 'Heads up', message: 'Alert body');
      case 'dialog':
        return WashButton(
          label: 'Open dialog',
          onPressed: () {
            showWashDialog<void>(
              context: context,
              builder: (ctx) => WashModalBox(
                dialogStyle: true,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Hello!',
                      style: WashTypography.title(WashTokens.of(ctx).onSurface).copyWith(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Press Esc or click Close.',
                      style: WashTypography.body(WashTokens.of(ctx).inkMuted).copyWith(fontSize: 14),
                    ),
                    WashModalActions(
                      children: [
                        WashButton(
                          label: 'Close',
                          onPressed: () => WashModalCloseScope.maybeCloseOf(ctx)?.call(),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      case 'toast':
        return const WashToastTrigger();
      case 'snackbar':
        return const WashSnackbarTrigger();
      case 'loading':
        return const WashLoading(label: 'Loading');
      case 'card':
        return WashCard(
          body: WashCardBody(
            children: [
              const WashCardTitle('Card'),
              const Text('Body'),
            ],
          ),
        );
      case 'stat':
        return const WashStats(
          children: [
            WashStat(title: 'Users', value: '1.2k'),
          ],
        );
      case 'bento':
        return const WashBentoGrid();
      case 'hover-gallery':
        return WashHoverGallery(
          maxWidth: WashHoverGalleryMaxWidth.w60,
          children: const [
            WashHoverGalleryPlate(
              tone: WashHoverGalleryTone.blue,
              label: 'Cerulean',
              stage: WashHoverGalleryStage.wet,
            ),
            WashHoverGalleryPlate(
              tone: WashHoverGalleryTone.blue,
              label: 'Cerulean',
              stage: WashHoverGalleryStage.dry,
            ),
            WashHoverGalleryPlate(
              tone: WashHoverGalleryTone.ochre,
              label: 'Sienna',
              stage: WashHoverGalleryStage.wet,
            ),
            WashHoverGalleryPlate(
              tone: WashHoverGalleryTone.ochre,
              label: 'Sienna',
              stage: WashHoverGalleryStage.dry,
            ),
          ],
        );
      case 'hover-3d':
        return WashHover3d(
          child: WashCard(
            body: WashCardBody(
              children: [
                const WashCardTitle('Coastal fog plate'),
                Text(
                  'Soft cerulean wash over warm paper.',
                  style: WashTypography.body(WashTokens.of(context).inkMuted),
                ),
              ],
            ),
          ),
        );
      case 'carousel':
        return const WashCarouselLegacyPreview();
      case 'tabs':
        return SizedBox(
          height: 200,
          child: WashTabs(
            tabs: const ['One', 'Two'],
            children: const [Text('Tab 1'), Text('Tab 2')],
          ),
        );
      case 'accordion':
        return WashAccordion(
          items: const [(Text('Section'), Text('Content'))],
        );
      case 'collapse':
        return const WashCollapse(
          focusDriven: true,
          indicator: WashCollapseIndicator.none,
          title: Text('How do I create an account?'),
          content: Text('Click Sign Up in the top right and follow the registration steps.'),
        );
      case 'fab':
        return WashFabPrimary(onPressed: () {});
      case 'pagination':
        return WashPagination(page: 1, totalPages: 5, onChanged: (_) {});
      case 'progress':
        return const WashProgress(value: 60);
      case 'skeleton':
        return const Column(
          children: [
            WashSkeleton(width: 200),
            SizedBox(height: 8),
            WashSkeleton(width: 160),
          ],
        );
      case 'badge':
        return Wrap(
          spacing: 8,
          runSpacing: 8,
          children: const [
            WashBadge('Badge'),
            WashBadge('New'),
            WashBadge('3'),
            WashBadge('Info', tone: WashBadgeTone.info, style: WashBadgeStyle.soft),
          ],
        );
      case 'chip':
        return Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            const WashChip(label: 'Soft tag', style: WashBadgeStyle.soft),
            WashChip(label: 'Quinacridone rose', tone: WashBadgeTone.primary, onDeleted: () {}),
            WashChip.selectable(label: 'Glaze', selected: true, onPressed: () {}),
          ],
        );
      case 'kbd':
        return const WashKbd('⌘ K');
      case 'indicator':
        return WashIndicator(
          marks: const [
            WashIndicatorMark(
              child: WashBadge('3', tone: WashBadgeTone.error, size: WashBadgeSize.sm),
            ),
          ],
          child: WashIcon(WashIconGlyph.settings, color: WashTokens.of(context).onSurface),
        );
      case 'status':
        return const WashStatus();
      case 'avatar':
        return const WashAvatar.initials('ZH');
      case 'mask':
        return const WashMask(
          shape: WashMaskShape.squircle,
          dimension: 96,
          gradient: WashMaskWashes.cerulean,
        );
      case 'marquee':
        return WashMarquee(
          children: const [
            Text('Ultramarine'),
            Text('Quinacridone rose'),
            Text('Yellow ochre'),
            Text('Sap green'),
          ],
          hoverPause: true,
        );
      case 'chat':
        return const WashChatLegacyPreview();
      case 'countdown':
        return const WashCountdownLivePreview(initialSeconds: 90);
      case 'date-time':
        return const WashDateTimeFields();
      case 'diff':
        return WashDiff(
          before: WashDiffPlate(tone: WashDiffPlateTone.blue, label: 'Cerulean'),
          after: WashDiffPlate(
            tone: WashDiffPlateTone.blue,
            label: 'Cerulean',
            variant: WashDiffPlateVariant.dry,
          ),
        );
      case 'divider':
        return const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashDivider(label: 'OR'),
            WashDivider(tone: WashBadgeTone.primary, label: 'Pigment mix'),
          ],
        );
      case 'palette':
        return const WashPalettePreview();
      case 'theme-controller':
        return const WashThemeController();
      case 'layers':
        return const WashLayersPreview();
      case 'background':
        return WashBackground(
          grain: true,
          child: SizedBox(
            height: 240,
            width: double.infinity,
            child: Align(
              alignment: Alignment.bottomLeft,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  'Studio paper',
                  style: WashTypography.title(WashTokens.of(context).onSurface),
                ),
              ),
            ),
          ),
        );
      case 'color-picker':
        return const WashColorPickerLegacyPreview();
      case 'watercolor-playground':
        return WashWatercolorSplash(
          seed: 1284,
          variant: 'blob',
          size: 140,
          opacity: 0.72,
          blur: 16,
        );
      case 'aura':
        return const WashAuraLegacyPreview();
      case 'hero':
        return WashHero(
          minHeight: 160,
          child: WashHeroContent(
            centerText: true,
            children: [
              Text(
                'Wash UI',
                style: WashTypography.title(WashTokens.of(context).onSurface).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Text(
                'Flutter gallery',
                style: WashTypography.body(WashTokens.of(context).inkMuted),
              ),
            ],
          ),
        );
      case 'mockup':
        return WashMockupBrowser(
          url: 'https://menzies.design/plates',
          child: SizedBox(
            height: 120,
            child: Center(
              child: Text(
                'Plate archive',
                style: WashTypography.body(WashTokens.of(context).onSurface),
              ),
            ),
          ),
        );
      case 'org-chart':
        return const WashOrgChart(
          root: WashOrgNode(
            id: 'root',
            name: 'Studio',
            children: [
              WashOrgNode(id: 'a', name: 'Sketch'),
              WashOrgNode(id: 'b', name: 'Wash'),
              WashOrgNode(id: 'c', name: 'Glaze'),
            ],
          ),
        );
      case 'text-rotate':
        return const WashTextRotate(words: ['Design', 'Build', 'Ship']);
      case 'qrcode':
        return const WashQrFrame(
          child: WashQrCode(
            value: 'https://menzies.design/palette/ultramarine',
            size: 144,
          ),
        );
      case 'radial-progress':
        return const WashRadialProgress(value: 65);
      case 'steps':
        return const WashSteps(
          steps: [
            WashStepItem(label: 'Register', tone: WashStepTone.primary),
            WashStepItem(label: 'Choose plan', tone: WashStepTone.primary),
            WashStepItem(label: 'Purchase'),
            WashStepItem(label: 'Receive'),
          ],
        );
      case 'timeline':
        return const WashTimeline();
      case 'list':
        return WashList.titles(const ['One', 'Two', 'Three']);
      case 'transfer-list':
        return const SizedBox(height: 200, child: WashTransferList());
      case 'table':
        return const WashTableBasic();
      case 'tags-input':
        return WashTagsInput(
          tags: const ['Ultramarine', 'Glaze'],
          onChanged: (_) {},
          badgeTone: WashBadgeTone.primary,
          badgeStyle: WashBadgeStyle.soft,
        );
      case 'bottomsheet':
        return WashButton(
          label: 'Open bottom sheet',
          onPressed: () => showWashBottomSheet(
            context: context,
            barrierDismissible: false,
            blocksBackground: false,
            child: WashModalBox(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Wash notes',
                    style: WashTypography.title(WashTokens.of(context).onSurface).copyWith(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'A bottom sheet anchors to the lower edge with rounded top corners.',
                    style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(fontSize: 14),
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      case 'dock':
        return WashDock(
          items: [
            WashDockItem(iconName: 'house', label: 'Home', onPressed: () {}),
            WashDockItem(iconName: 'inbox', label: 'Inbox', active: true, onPressed: () {}),
            WashDockItem(iconName: 'settings', label: 'Settings', onPressed: () {}),
          ],
        );
      case 'drawer':
        return const WashDrawerBasicDemo();
      case 'footer':
        return WashFooter(
          horizontalFromSm: true,
          children: [
            WashFooterNav(
              title: 'Studio',
              children: [
                const WashFooterLink('About'),
                const WashFooterLink('Contact'),
              ],
            ),
          ],
        );
      case 'dropdown':
        return const WashDropdownBasicDemo();
      case 'menu':
        return WashMenu(
          width: 200,
          children: [
            WashMenuItem(label: 'Overview', onPressed: () {}),
            WashMenuItem(label: 'Palette', icon: 'palette', onPressed: () {}),
            WashMenuItem(label: 'Layers', icon: 'layers', onPressed: () {}),
          ],
        );
      case 'context-menu':
        return const WashContextMenuLegacyPreview();
      case 'megamenu':
        return WashMegamenu(
          initiallyOpenIndex: 0,
          showMobileMenuButton: false,
          sections: const [
            WashMegamenuSection(
              label: 'Pigments',
              panel: WashMegamenuLinkList([
                WashMegamenuLink(label: 'Ultramarine'),
                WashMegamenuLink(label: 'Cerulean'),
              ]),
            ),
            WashMegamenuSection(
              label: 'Tools',
              panel: WashMegamenuLinkList([
                WashMegamenuLink(label: 'Round 6'),
                WashMegamenuLink(label: 'Flat 12'),
              ]),
            ),
          ],
        );
      case 'navbar':
        return WashNavbar(
          start: const WashNavbarStart(child: WashNavbarBrand('Menzies Design')),
          end: WashNavbarEnd(
            child: WashButton(
              label: 'Action',
              size: WashButtonSize.sm,
              onPressed: () {},
            ),
          ),
        );
      case 'app-bar':
        return const WashNavbar(title: 'App bar');
      case 'aspect-ratio':
        return const WashAspectRatioLegacyPreview();
      case 'swap':
        return WashSwap(
          first: const WashIcon(WashIconGlyph.settings),
          second: const WashIcon(WashIconGlyph.close),
        );
      case 'assets-fonts':
        return const WashAssetsFonts();
      case 'assets-images':
        return const WashAssetsImages();
      case 'icons-usage':
        return const WashIconsUtility();
      case 'icons-brands':
        return const WashIconsBrands();
      case 'store-merch':
        return const WashStoreMerch();
      case 'store-page':
        return const WashStorePage();
      case 'auth-screen':
        return const WashAuthScreenTemplate();
      case 'auth-2fa':
        return const WashTwoFactorTemplate();
      case 'forgot-password':
        return const WashForgotPasswordTemplate();
      case 'auth-otp':
        return const WashOtpTemplate();
      case 'template-checkout':
        return const WashCheckoutTemplate();
      case 'template-payment':
        return const WashPaymentTemplate();
      case 'template-terminal-logging':
        return const WashTerminalLogTemplate();
      case 'template-rich-text':
        return const WashRichTextTemplate();
      case 'template-code-editor':
        return const WashCodeEditorView();
      case 'template-file-tree':
        return const WashFileTreeTemplate();
      case 'template-docs-layout':
        return const SizedBox(height: 280, child: WashDocsLayoutTemplate());
      case 'template-dialog':
        return const WashDialogTemplate();
      case 'data-table':
        return const WashDataTableTemplate();
      case 'calendar':
        return const WashCalendarTemplate();
      case 'behaviour-overflow-marquee':
        return const WashOverflowMarqueeDemo();
      case 'behaviour-auto-tooltip':
        return const WashSpaceAwareTooltipDemo();
      case 'behaviour-auto-dropdown':
        return const WashSpaceAwareDropdownDemo();
      case 'behaviour-dropdown-on-hover':
        return const WashDropdownOnHoverDemo();
      case 'charts-line':
        return const SizedBox(height: 240, child: WashLineChart());
      case 'charts-area':
        return const SizedBox(height: 240, child: WashAreaChart());
      case 'charts-bar':
        return const SizedBox(height: 240, child: WashBarChart());
      case 'charts-pie':
        return const SizedBox(height: 240, child: WashPieChart());
    }

    if (pageId.startsWith('charts-')) {
      return SizedBox(
        height: 240,
        child: WashCategoryChart(categoryId: pageId),
      );
    }
    if (pageId.startsWith('docs-')) {
      return WashDocPage(pageId: pageId);
    }
    if (pageId.startsWith('lsp-')) {
      final lang = pageId.replaceFirst('lsp-', '');
      return WashCodeEditorView(language: lang);
    }

    return WashPlateCard(
      title: pageId,
      child: Text('No preview registered for $pageId'),
    );
  }
}
