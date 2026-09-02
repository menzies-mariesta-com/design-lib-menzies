package com.mariesta.menzies.washui.demo.nav

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.automirrored.filled.ShowChart
import androidx.compose.material.icons.filled.AlignHorizontalLeft
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.ViewModule
import androidx.compose.ui.graphics.vector.ImageVector

enum class AppPage(val route: String, val label: String) {
    Overview("overview", "Overview"),
    Support("support", "Support"),
    AssetsFonts("assets-fonts", "Fonts"),
    AssetsImages("assets-images", "Images"),
    DocsStart("docs-start", "Getting started"),
    DocsStartVanilla("docs-start-vanilla", "Vanilla HTML / CSS / JS"),
    DocsStartReactVite("docs-start-react-vite", "React (Vite)"),
    DocsStartNextjs("docs-start-nextjs", "Next.js"),
    DocsStartVueVite("docs-start-vue-vite", "Vue (Vite)"),
    DocsStartNuxt("docs-start-nuxt", "Nuxt"),
    DocsStartSveltekit("docs-start-sveltekit", "SvelteKit"),
    DocsStartAstro("docs-start-astro", "Astro"),
    DocsStartAngular("docs-start-angular", "Angular"),
    DocsStartRemix("docs-start-remix", "Remix"),
    DocsStartSolid("docs-start-solid", "Solid (Vite)"),
    DocsStartPreact("docs-start-preact", "Preact (Vite)"),
    DocsStartQwik("docs-start-qwik", "Qwik"),
    DocsStartLit("docs-start-lit", "Lit"),
    DocsStartEleventy("docs-start-eleventy", "Eleventy"),
    DocsTheming("docs-theming", "Theming"),
    DocsTokens("docs-tokens", "Tokens"),
    DocsCustomize("docs-customize", "Customize"),
    DocsMcpServer("docs-mcp-server", "MCP server"),
    Buttons("buttons", "Buttons"),
    Ripple("ripple", "Ripple"),
    Links("links", "Links"),
    Accordion("accordion", "Accordion"),
    Collapse("collapse", "Collapse"),
    ColorPicker("color-picker", "Color picker"),
    Fab("fab", "FAB"),
    Checkbox("checkbox", "Checkbox"),
    Toggle("toggle", "Toggle"),
    Swap("swap", "Swap"),
    Radio("radio", "Radio"),
    Input("input", "Input"),
    Textarea("textarea", "Textarea"),
    Range("range", "Range"),
    Rating("rating", "Rating"),
    Select("select", "Select"),
    SelectSearch("select-search", "Select search"),
    Autocomplete("autocomplete", "Autocomplete"),
    Fieldset("fieldset", "Fieldset"),
    Label("label", "Label"),
    Otp("otp", "OTP"),
    Validator("validator", "Validator"),
    FileInput("file-input", "File input"),
    Filter("filter", "Filter"),
    FloatingPanel("floating-panel", "Floating panel"),
    Join("join", "Join"),
    Tooltip("tooltip", "Tooltip"),
    Card("card", "Card"),
    Stat("stat", "Stat"),
    Bento("bento", "Bento / Masonry"),
    Hover3d("hover-3d", "Hover 3D"),
    HoverGallery("hover-gallery", "Hover gallery"),
    Carousel("carousel", "Carousel"),
    ChartsOverview("charts-overview", "Charts"),
    ChartsLine("charts-line", "Line Charts"),
    ChartsArea("charts-area", "Area Charts"),
    ChartsRangeArea("charts-range-area", "Range Area"),
    ChartsSlope("charts-slope", "Slope Charts"),
    ChartsColumn("charts-column", "Column charts"),
    ChartsBar("charts-bar", "Bar Charts"),
    ChartsMixed("charts-mixed", "Mixed Charts"),
    ChartsTimeline("charts-timeline", "Timeline"),
    ChartsPie("charts-pie", "Pie / Donut Charts"),
    ChartsRadialbar("charts-radialbar", "RadialBar Charts"),
    ChartsPolarArea("charts-polar-area", "Polar Area"),
    ChartsGauge("charts-gauge", "Gauge Charts"),
    ChartsSparklines("charts-sparklines", "Sparklines"),
    ChartsDashboards("charts-dashboards", "Dashboards"),
    ChartsHeatmap("charts-heatmap", "Heatmap Charts"),
    ChartsTreemap("charts-treemap", "Treemap Charts"),
    ChartsSunburst("charts-sunburst", "Sunburst Charts"),
    ChartsScatter("charts-scatter", "Scatter Charts"),
    ChartsBubble("charts-bubble", "Bubble Charts"),
    ChartsFunnel("charts-funnel", "Funnel Charts"),
    ChartsRadar("charts-radar", "Radar Charts"),
    ChartsBoxplot("charts-boxplot", "BoxPlot Charts"),
    ChartsViolin("charts-violin", "Violin Charts"),
    ChartsBeeswarm("charts-beeswarm", "Beeswarm Charts"),
    ChartsWaffle("charts-waffle", "Waffle Charts"),
    ChartsCandlestick("charts-candlestick", "Candlestick Charts"),
    ChartsHistogram("charts-histogram", "Histogram Charts"),
    ChartsCustomSeries("charts-custom-series", "Custom Series Charts"),
    ChartsInteractivity("charts-interactivity", "Interactivity"),
    ChartsNarrative("charts-narrative", "Narrative Charts"),
    ChartsUnit("charts-unit", "Unit Charts"),
    Tabs("tabs", "Tabs"),
    TagsInput("tags-input", "Tags input"),
    Table("table", "Table"),
    AuthScreen("auth-screen", "Auth Screen"),
    Auth2fa("auth-2fa", "2FA"),
    ForgotPassword("forgot-password", "Forgot password"),
    AuthOtp("auth-otp", "OTP"),
    TemplateCheckout("template-checkout", "Checkout"),
    TemplatePayment("template-payment", "Payment"),
    TemplateTerminalLogging("template-terminal-logging", "Terminal logging"),
    TemplateDocsLayout("template-docs-layout", "Documentation layout"),
    DataTable("data-table", "Data table"),
    List("list", "List"),
    TransferList("transfer-list", "Transfer list"),
    Pagination("pagination", "Pagination"),
    Bottomsheet("bottomsheet", "Bottom sheet"),
    Dock("dock", "Dock"),
    Drawer("drawer", "Drawer"),
    Footer("footer", "Footer"),
    Dropdown("dropdown", "Dropdown"),
    Menu("menu", "Menu"),
    ContextMenu("context-menu", "Context menu"),
    Megamenu("megamenu", "Megamenu"),
    Navbar("navbar", "Navbar"),
    AppBar("app-bar", "App bar"),
    AspectRatio("aspect-ratio", "Aspect ratio"),
    Mockup("mockup", "Mockup"),
    Hero("hero", "Hero"),
    TextRotate("text-rotate", "Text rotate"),
    Aura("aura", "Aura"),
    Dialog("dialog", "Dialog"),
    Alert("alert", "Alert"),
    Toast("toast", "Toast"),
    Snackbar("snackbar", "Snackbar"),
    Badge("badge", "Badge"),
    Chip("chip", "Chip"),
    Kbd("kbd", "Kbd"),
    Indicator("indicator", "Indicator"),
    Status("status", "Status"),
    Loading("loading", "Loading"),
    Skeleton("skeleton", "Skeleton"),
    Progress("progress", "Progress"),
    Qrcode("qrcode", "QR code"),
    RadialProgress("radial-progress", "Radial progress"),
    Steps("steps", "Steps"),
    Timeline("timeline", "Timeline"),
    OrgChart("org-chart", "Org chart"),
    Avatar("avatar", "Avatar"),
    Mask("mask", "Mask"),
    Marquee("marquee", "Marquee"),
    Chat("chat", "Chat bubble"),
    Calendar("calendar", "Calendar"),
    DateTime("date-time", "Date and time"),
    Countdown("countdown", "Countdown"),
    Diff("diff", "Diff"),
    Divider("divider", "Divider"),
    Palette("palette", "Palette"),
    ThemeController("theme-controller", "Theme controller"),
    Layers("layers", "Layers"),
    WatercolorPlayground("watercolor-playground", "Paint splash"),
    ;

    companion object {
        fun fromRoute(route: String?): AppPage? = entries.find { it.route == route }
    }
}

data class NavItem(
    val id: AppPage,
    val label: String,
    val icon: ImageVector,
    val page: AppPage = id,
)

private val templatePageIds = setOf(
    AppPage.AuthScreen,
    AppPage.Auth2fa,
    AppPage.ForgotPassword,
    AppPage.AuthOtp,
    AppPage.TemplateCheckout,
    AppPage.TemplatePayment,
    AppPage.TemplateTerminalLogging,
    AppPage.TemplateDocsLayout,
    AppPage.DataTable,
)

private val authTemplateIds = setOf(
    AppPage.AuthScreen,
    AppPage.Auth2fa,
    AppPage.ForgotPassword,
    AppPage.AuthOtp,
)

private val commerceTemplateIds = setOf(AppPage.TemplateCheckout, AppPage.TemplatePayment)
private val studioTemplateIds = setOf(AppPage.TemplateTerminalLogging)
private val layoutTemplateIds = setOf(AppPage.TemplateDocsLayout)

private fun iconFor(page: AppPage): ImageVector = when (page) {
    AppPage.Overview -> Icons.Default.Dashboard
    AppPage.Support -> Icons.Default.Favorite
    AppPage.AssetsFonts -> Icons.Default.AlignHorizontalLeft
    AppPage.AssetsImages -> Icons.Default.Image
    AppPage.DocsStart, AppPage.DocsStartVanilla, AppPage.DocsStartReactVite, AppPage.DocsStartNextjs,
    AppPage.DocsStartVueVite, AppPage.DocsStartNuxt, AppPage.DocsStartSveltekit, AppPage.DocsStartAstro,
    AppPage.DocsStartAngular, AppPage.DocsStartRemix, AppPage.DocsStartSolid, AppPage.DocsStartPreact,
    AppPage.DocsStartQwik, AppPage.DocsStartLit, AppPage.DocsStartEleventy,
    -> Icons.Default.Book
    AppPage.DocsTheming -> Icons.Default.Palette
    AppPage.DocsTokens -> Icons.AutoMirrored.Filled.MenuBook
    AppPage.DocsCustomize -> Icons.Default.Settings
    AppPage.DocsMcpServer -> Icons.Default.Share
    AppPage.ChartsOverview, AppPage.ChartsLine, AppPage.ChartsArea, AppPage.ChartsRangeArea,
    AppPage.ChartsSlope, AppPage.ChartsColumn, AppPage.ChartsBar, AppPage.ChartsMixed,
    AppPage.ChartsTimeline, AppPage.ChartsPie, AppPage.ChartsRadialbar, AppPage.ChartsPolarArea,
    AppPage.ChartsGauge, AppPage.ChartsSparklines, AppPage.ChartsDashboards, AppPage.ChartsHeatmap,
    AppPage.ChartsTreemap, AppPage.ChartsSunburst, AppPage.ChartsScatter, AppPage.ChartsBubble,
    AppPage.ChartsFunnel, AppPage.ChartsRadar, AppPage.ChartsBoxplot, AppPage.ChartsViolin,
    AppPage.ChartsBeeswarm, AppPage.ChartsWaffle, AppPage.ChartsCandlestick, AppPage.ChartsHistogram,
    AppPage.ChartsCustomSeries, AppPage.ChartsInteractivity, AppPage.ChartsNarrative, AppPage.ChartsUnit,
    -> Icons.AutoMirrored.Filled.ShowChart
    AppPage.Layers -> Icons.Default.Layers
    AppPage.Palette -> Icons.Default.Palette
    in templatePageIds -> Icons.Default.Folder
    else -> Icons.Default.ViewModule
}

private fun navItem(page: AppPage): NavItem = NavItem(
    id = page,
    label = page.label,
    icon = iconFor(page),
    page = page,
)

val nav: List<NavItem> = AppPage.entries.map(::navItem)

val overviewNav: NavItem = navItem(AppPage.Overview)
val supportNav: NavItem = navItem(AppPage.Support)

val assetsNav: List<NavItem> = listOf(
    navItem(AppPage.AssetsFonts),
    navItem(AppPage.AssetsImages),
)

val docsNav: List<NavItem> = nav.filter { item ->
    item.id.route.startsWith("docs-") && !isGettingStartedStackPage(item.page)
}

/** Sidebar docs group: Getting started flat link only. */
val sidebarDocsNav: List<NavItem> = listOf(navItem(AppPage.DocsStart))

val templatesNav: List<NavItem> = nav.filter { item -> item.page in templatePageIds }

val authTemplateNav: List<NavItem> = templatesNav.filter { it.page in authTemplateIds }
val commerceTemplateNav: List<NavItem> = templatesNav.filter { it.page in commerceTemplateIds }
val studioTemplateNav: List<NavItem> = templatesNav.filter { it.page in studioTemplateIds }
val layoutTemplateNav: List<NavItem> = templatesNav.filter { it.page in layoutTemplateIds }
val dataTemplateNav: List<NavItem> = templatesNav.filter { it.id == AppPage.DataTable }

val componentNav: List<NavItem> = nav.filter { item ->
    item.id != AppPage.Overview &&
        item.id != AppPage.Support &&
        !item.id.route.startsWith("assets-") &&
        !item.id.route.startsWith("docs-") &&
        item.page !in templatePageIds
}

fun isAssetsPage(page: AppPage): Boolean = page.route.startsWith("assets-")

fun isDocPage(page: AppPage): Boolean = page.route.startsWith("docs-")

fun isGettingStartedStackPage(page: AppPage): Boolean =
    page.route.startsWith("docs-start-") && page != AppPage.DocsStart

fun isTemplatePage(page: AppPage): Boolean = page in templatePageIds

fun isChartPage(page: AppPage): Boolean = page.route.startsWith("charts-")
