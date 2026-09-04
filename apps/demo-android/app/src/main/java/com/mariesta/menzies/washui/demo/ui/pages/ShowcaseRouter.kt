package com.mariesta.menzies.washui.demo.ui.pages

import androidx.compose.runtime.Composable
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.ui.ShowcasePlaceholder
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AccordionShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AlertShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AppBarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AspectRatioShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AssetsFontsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AssetsImagesShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AuraShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AuthScreenShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AutocompleteShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AvatarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BackgroundShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BadgeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BentoShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BottomsheetShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ButtonsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CalendarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CardShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CarouselShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ChatShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CheckboxShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ChipShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CollapseShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ColorPickerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ContextMenuShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CountdownShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DataTableShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DateTimeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DialogShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DiffShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DividerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DockShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsCustomizeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsMcpServerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsStartShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsThemingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsTokensShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DrawerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DropdownShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FabShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FieldsetShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FileInputShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FilterShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FloatingPanelShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.FooterShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.HeroShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.Hover3dShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.HoverGalleryShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.IndicatorShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.InputShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.JoinShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.KbdShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LabelShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LayersShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LinksShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ListShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LoadingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MaskShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MarqueeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MegamenuShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MenuShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MockupShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.NavbarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.OrgChartShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.OtpShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.PaginationShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.PaletteShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ProgressShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.QrcodeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RadialProgressShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RadioShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RangeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RatingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RippleShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SelectSearchShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SelectShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SkeletonShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SnackbarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.StatShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.StatusShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.StepsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SwapShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TableShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TabsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TagsInputShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TemplateCheckoutShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TextRotateShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TextareaShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ThemeControllerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TimelineShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ToastShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ToggleShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TooltipShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TransferListShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ValidatorShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.WatercolorPlaygroundShowcase

private val implementedShowcasePages = setOf(
    AppPage.Buttons, AppPage.Input, AppPage.Textarea, AppPage.Checkbox, AppPage.Toggle,
    AppPage.Radio, AppPage.Select, AppPage.SelectSearch, AppPage.Otp, AppPage.Range, AppPage.Rating,
    AppPage.Swap, AppPage.Alert, AppPage.Toast, AppPage.Snackbar, AppPage.Dialog, AppPage.Loading,
    AppPage.Skeleton, AppPage.Progress, AppPage.Ripple, AppPage.Card, AppPage.Bento, AppPage.Tabs,
    AppPage.Accordion, AppPage.Collapse, AppPage.Divider, AppPage.Join, AppPage.Stat,
    AppPage.WatercolorPlayground, AppPage.ThemeController, AppPage.Palette, AppPage.Layers,
    AppPage.DataTable, AppPage.Table, AppPage.List, AppPage.Pagination, AppPage.Navbar, AppPage.Drawer,
    AppPage.Dropdown, AppPage.Menu, AppPage.Bottomsheet, AppPage.AuthScreen, AppPage.TemplateCheckout,
    AppPage.DocsStart, AppPage.DocsTheming, AppPage.DocsTokens, AppPage.DocsCustomize, AppPage.DocsMcpServer,
    AppPage.AssetsFonts, AppPage.AssetsImages,
    AppPage.AppBar, AppPage.AspectRatio, AppPage.Aura, AppPage.Autocomplete, AppPage.Avatar,
    AppPage.Avatar, AppPage.Background, AppPage.Badge, AppPage.Calendar, AppPage.Carousel, AppPage.Chat, AppPage.Chip, AppPage.ColorPicker,
    AppPage.ContextMenu, AppPage.Countdown, AppPage.DateTime, AppPage.Diff, AppPage.Dock, AppPage.Fab,
    AppPage.Fieldset, AppPage.FileInput, AppPage.Filter, AppPage.FloatingPanel, AppPage.Footer,
    AppPage.Hero, AppPage.Hover3d, AppPage.HoverGallery, AppPage.Indicator, AppPage.Kbd, AppPage.Label,
    AppPage.Links, AppPage.Mask, AppPage.Marquee, AppPage.Megamenu, AppPage.Mockup, AppPage.OrgChart,
    AppPage.Qrcode, AppPage.RadialProgress, AppPage.Status, AppPage.Steps, AppPage.TagsInput,
    AppPage.TextRotate, AppPage.Timeline, AppPage.Tooltip, AppPage.TransferList, AppPage.Validator,
)

fun hasShowcase(page: AppPage): Boolean = page in implementedShowcasePages

@Composable
fun ShowcaseRouter(page: AppPage, onNavigate: (AppPage) -> Unit = {}) {
    when (page) {
        AppPage.Buttons -> ButtonsShowcase()
        AppPage.Input -> InputShowcase()
        AppPage.Textarea -> TextareaShowcase()
        AppPage.Checkbox -> CheckboxShowcase()
        AppPage.Toggle -> ToggleShowcase()
        AppPage.Radio -> RadioShowcase()
        AppPage.Select -> SelectShowcase()
        AppPage.SelectSearch -> SelectSearchShowcase()
        AppPage.Otp -> OtpShowcase()
        AppPage.Range -> RangeShowcase()
        AppPage.Rating -> RatingShowcase()
        AppPage.Swap -> SwapShowcase()
        AppPage.Alert -> AlertShowcase()
        AppPage.Toast -> ToastShowcase()
        AppPage.Snackbar -> SnackbarShowcase()
        AppPage.Dialog -> DialogShowcase()
        AppPage.Loading -> LoadingShowcase()
        AppPage.Skeleton -> SkeletonShowcase()
        AppPage.Progress -> ProgressShowcase()
        AppPage.Ripple -> RippleShowcase()
        AppPage.Card -> CardShowcase()
        AppPage.Bento -> BentoShowcase()
        AppPage.Tabs -> TabsShowcase()
        AppPage.Accordion -> AccordionShowcase()
        AppPage.Collapse -> CollapseShowcase()
        AppPage.Divider -> DividerShowcase()
        AppPage.Join -> JoinShowcase()
        AppPage.Stat -> StatShowcase()
        AppPage.WatercolorPlayground -> WatercolorPlaygroundShowcase()
        AppPage.ThemeController -> ThemeControllerShowcase()
        AppPage.Palette -> PaletteShowcase()
        AppPage.Layers -> LayersShowcase()
        AppPage.DataTable -> DataTableShowcase()
        AppPage.Table -> TableShowcase()
        AppPage.List -> ListShowcase()
        AppPage.Pagination -> PaginationShowcase()
        AppPage.Navbar -> NavbarShowcase()
        AppPage.Drawer -> DrawerShowcase()
        AppPage.Dropdown -> DropdownShowcase()
        AppPage.Menu -> MenuShowcase()
        AppPage.Bottomsheet -> BottomsheetShowcase()
        AppPage.AuthScreen -> AuthScreenShowcase()
        AppPage.TemplateCheckout -> TemplateCheckoutShowcase()
        AppPage.DocsStart -> DocsStartShowcase(onNavigate = onNavigate)
        AppPage.DocsTheming -> DocsThemingShowcase()
        AppPage.DocsTokens -> DocsTokensShowcase()
        AppPage.DocsCustomize -> DocsCustomizeShowcase()
        AppPage.DocsMcpServer -> DocsMcpServerShowcase()
        AppPage.AssetsFonts -> AssetsFontsShowcase()
        AppPage.AssetsImages -> AssetsImagesShowcase()
        AppPage.AppBar -> AppBarShowcase()
        AppPage.AspectRatio -> AspectRatioShowcase()
        AppPage.Aura -> AuraShowcase()
        AppPage.Autocomplete -> AutocompleteShowcase()
        AppPage.Avatar -> AvatarShowcase()
        AppPage.Background -> BackgroundShowcase()
        AppPage.Badge -> BadgeShowcase()
        AppPage.Calendar -> CalendarShowcase()
        AppPage.Carousel -> CarouselShowcase()
        AppPage.Chat -> ChatShowcase()
        AppPage.Chip -> ChipShowcase()
        AppPage.ColorPicker -> ColorPickerShowcase()
        AppPage.ContextMenu -> ContextMenuShowcase()
        AppPage.Countdown -> CountdownShowcase()
        AppPage.DateTime -> DateTimeShowcase()
        AppPage.Diff -> DiffShowcase()
        AppPage.Dock -> DockShowcase()
        AppPage.Fab -> FabShowcase()
        AppPage.Fieldset -> FieldsetShowcase()
        AppPage.FileInput -> FileInputShowcase()
        AppPage.Filter -> FilterShowcase()
        AppPage.FloatingPanel -> FloatingPanelShowcase()
        AppPage.Footer -> FooterShowcase()
        AppPage.Hero -> HeroShowcase()
        AppPage.Hover3d -> Hover3dShowcase()
        AppPage.HoverGallery -> HoverGalleryShowcase()
        AppPage.Indicator -> IndicatorShowcase()
        AppPage.Kbd -> KbdShowcase()
        AppPage.Label -> LabelShowcase()
        AppPage.Links -> LinksShowcase()
        AppPage.Mask -> MaskShowcase()
        AppPage.Marquee -> MarqueeShowcase()
        AppPage.Megamenu -> MegamenuShowcase()
        AppPage.Mockup -> MockupShowcase()
        AppPage.OrgChart -> OrgChartShowcase()
        AppPage.Qrcode -> QrcodeShowcase()
        AppPage.RadialProgress -> RadialProgressShowcase()
        AppPage.Status -> StatusShowcase()
        AppPage.Steps -> StepsShowcase()
        AppPage.TagsInput -> TagsInputShowcase()
        AppPage.TextRotate -> TextRotateShowcase()
        AppPage.Timeline -> TimelineShowcase()
        AppPage.Tooltip -> TooltipShowcase()
        AppPage.TransferList -> TransferListShowcase()
        AppPage.Validator -> ValidatorShowcase()
        else -> ShowcasePlaceholder(title = page.label)
    }
}
