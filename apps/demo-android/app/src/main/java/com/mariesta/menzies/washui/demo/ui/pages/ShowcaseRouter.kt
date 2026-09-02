package com.mariesta.menzies.washui.demo.ui.pages

import androidx.compose.runtime.Composable
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.ui.ShowcasePlaceholder
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AccordionShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AlertShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AssetsFontsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.AuthScreenShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BentoShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.BottomsheetShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ButtonsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CardShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.CheckboxShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DataTableShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DialogShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DividerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsCustomizeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsMcpServerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsStartShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsThemingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DocsTokensShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DrawerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.DropdownShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.InputShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.JoinShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LayersShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ListShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.LoadingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.MenuShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.NavbarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.OtpShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.PaginationShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.PaletteShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ProgressShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RadioShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RangeShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RatingShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.RippleShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SelectShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SkeletonShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SnackbarShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.StatShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.SwapShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TableShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TabsShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TemplateCheckoutShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.TextareaShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ThemeControllerShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ToastShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.ToggleShowcase
import com.mariesta.menzies.washui.demo.ui.pages.showcases.WatercolorPlaygroundShowcase

private val implementedShowcasePages = setOf(
    AppPage.Buttons, AppPage.Input, AppPage.Textarea, AppPage.Checkbox, AppPage.Toggle,
    AppPage.Radio, AppPage.Select, AppPage.Otp, AppPage.Range, AppPage.Rating, AppPage.Swap,
    AppPage.Alert, AppPage.Toast, AppPage.Snackbar, AppPage.Dialog, AppPage.Loading,
    AppPage.Skeleton, AppPage.Progress, AppPage.Ripple,
    AppPage.Card, AppPage.Bento, AppPage.Tabs, AppPage.Accordion, AppPage.Divider, AppPage.Join, AppPage.Stat,
    AppPage.WatercolorPlayground, AppPage.ThemeController, AppPage.Palette, AppPage.Layers,
    AppPage.DataTable, AppPage.Table, AppPage.List, AppPage.Pagination,
    AppPage.Navbar, AppPage.Drawer, AppPage.Dropdown, AppPage.Menu, AppPage.Bottomsheet,
    AppPage.AuthScreen, AppPage.TemplateCheckout,
    AppPage.DocsStart, AppPage.DocsTheming, AppPage.DocsTokens, AppPage.DocsCustomize, AppPage.DocsMcpServer,
    AppPage.AssetsFonts,
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
        else -> ShowcasePlaceholder(title = page.label)
    }
}
