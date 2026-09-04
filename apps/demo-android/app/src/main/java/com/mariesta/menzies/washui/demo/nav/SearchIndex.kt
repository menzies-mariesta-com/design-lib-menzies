package com.mariesta.menzies.washui.demo.nav


data class SearchEntry(
    val id: AppPage,
    val label: String,
    val subtitle: String,
    val keywords: List<String>,
    val icon: WashNavIcon,
)

private val washUiBrandLabel = "Wash UI"

val pageSubtitle: Map<AppPage, String> = mapOf(
    AppPage.Overview to washUiBrandLabel,
    AppPage.Support to "Sponsor libraries",
    AppPage.AssetsFonts to "Studio fonts",
    AppPage.AssetsImages to "Brand images",
    AppPage.DocsStart to "Setup guides",
    AppPage.DocsStartVanilla to "Vanilla setup",
    AppPage.DocsStartReactVite to "React + Vite",
    AppPage.DocsStartNextjs to "Next.js setup",
    AppPage.DocsStartVueVite to "Vue + Vite",
    AppPage.DocsStartNuxt to "Nuxt setup",
    AppPage.DocsStartSveltekit to "SvelteKit setup",
    AppPage.DocsStartAstro to "Astro setup",
    AppPage.DocsStartAngular to "Angular setup",
    AppPage.DocsStartRemix to "Remix setup",
    AppPage.DocsStartSolid to "Solid + Vite",
    AppPage.DocsStartPreact to "Preact + Vite",
    AppPage.DocsStartQwik to "Qwik setup",
    AppPage.DocsStartLit to "Lit setup",
    AppPage.DocsStartEleventy to "Eleventy setup",
    AppPage.DocsTheming to "Pigments",
    AppPage.DocsTokens to "Tokens",
    AppPage.DocsCustomize to "Customization",
    AppPage.DocsMcpServer to "MCP tools",
    AppPage.Buttons to "Button gallery",
    AppPage.Ripple to "Ripple effects",
    AppPage.Links to "Link gallery",
    AppPage.Accordion to "Accordion gallery",
    AppPage.Collapse to "Collapse panels",
    AppPage.ColorPicker to "Hue wheel color picker",
    AppPage.Fab to "FAB gallery",
    AppPage.Checkbox to "Checkbox gallery",
    AppPage.Toggle to "Toggles",
    AppPage.Swap to "Swap toggles",
    AppPage.Radio to "Radio gallery",
    AppPage.Input to "Input gallery",
    AppPage.Textarea to "Text areas",
    AppPage.Range to "Range sliders",
    AppPage.Rating to "Star ratings",
    AppPage.Select to "Select gallery",
    AppPage.SelectSearch to "Searchable selects",
    AppPage.Autocomplete to "Autocomplete",
    AppPage.Fieldset to "Form fieldsets",
    AppPage.Label to "Form labels",
    AppPage.Otp to "OTP inputs",
    AppPage.Validator to "Validators",
    AppPage.FileInput to "File inputs",
    AppPage.Filter to "Filter groups",
    AppPage.FloatingPanel to "Floating panels",
    AppPage.Join to "Join groups",
    AppPage.Tooltip to "Tooltip gallery",
    AppPage.Card to "Card gallery",
    AppPage.Stat to "Stat blocks",
    AppPage.Bento to "Bento and masonry",
    AppPage.Hover3d to "Hover 3D cards",
    AppPage.HoverGallery to "Hover galleries",
    AppPage.Carousel to "Carousel gallery",
    AppPage.ChartsOverview to "Charts overview",
    AppPage.ChartsLine to "Line Charts",
    AppPage.ChartsArea to "Area Charts",
    AppPage.ChartsRangeArea to "Range Area",
    AppPage.ChartsColumn to "Column charts",
    AppPage.ChartsBar to "Bar Charts",
    AppPage.ChartsMixed to "Mixed Charts",
    AppPage.ChartsTimeline to "Timeline",
    AppPage.ChartsPie to "Pie / Donut Charts",
    AppPage.ChartsRadialbar to "RadialBar charts",
    AppPage.ChartsPolarArea to "Polar Area",
    AppPage.ChartsGauge to "Gauge Charts",
    AppPage.ChartsSparklines to "Sparklines",
    AppPage.ChartsDashboards to "Dashboards",
    AppPage.ChartsHeatmap to "Heatmap Charts",
    AppPage.ChartsTreemap to "Treemap Charts",
    AppPage.ChartsSunburst to "Sunburst Charts",
    AppPage.ChartsScatter to "Scatter Charts",
    AppPage.ChartsSlope to "Slope Charts",
    AppPage.ChartsBubble to "Bubble Charts",
    AppPage.ChartsFunnel to "Funnel Charts",
    AppPage.ChartsRadar to "Radar Charts",
    AppPage.ChartsBoxplot to "BoxPlot Charts",
    AppPage.ChartsViolin to "Violin Charts",
    AppPage.ChartsBeeswarm to "Beeswarm Charts",
    AppPage.ChartsWaffle to "Waffle Charts",
    AppPage.ChartsCandlestick to "Candlestick Charts",
    AppPage.ChartsHistogram to "Histogram Charts",
    AppPage.ChartsCustomSeries to "Custom Series Charts",
    AppPage.ChartsInteractivity to "Interactivity",
    AppPage.ChartsNarrative to "Narrative Charts",
    AppPage.ChartsUnit to "Unit Charts",
    AppPage.Tabs to "Tabs gallery",
    AppPage.TagsInput to "Tags inputs",
    AppPage.Table to "Table gallery",
    AppPage.AuthScreen to "Login and signup shells",
    AppPage.Auth2fa to "Two-factor verification",
    AppPage.ForgotPassword to "Password reset flows",
    AppPage.AuthOtp to "One-time code verification",
    AppPage.TemplateCheckout to "Studio commerce checkout",
    AppPage.TemplatePayment to "Card payment step",
    AppPage.TemplateTerminalLogging to "Studio terminal log viewer",
    AppPage.TemplateDocsLayout to "Documentation page shell",
    AppPage.DataTable to "CRUD data tables",
    AppPage.List to "List rows",
    AppPage.TransferList to "Transfer lists",
    AppPage.Pagination to "Pagination",
    AppPage.Bottomsheet to "Bottom sheet gallery",
    AppPage.Dock to "Bottom dock",
    AppPage.Drawer to "Drawer sidebars",
    AppPage.Footer to "Page footers",
    AppPage.Dropdown to "Dropdown menus",
    AppPage.Menu to "Menus",
    AppPage.ContextMenu to "Context menus",
    AppPage.Megamenu to "Megamenus",
    AppPage.Navbar to "Navbars",
    AppPage.AppBar to "App bars",
    AppPage.AspectRatio to "Aspect ratios",
    AppPage.Mockup to "Mockup gallery",
    AppPage.Hero to "Hero banners",
    AppPage.TextRotate to "Text rotate",
    AppPage.Aura to "Aura gallery",
    AppPage.Dialog to "Dialog gallery",
    AppPage.Alert to "Alert gallery",
    AppPage.Toast to "Toasts",
    AppPage.Snackbar to "Snackbars",
    AppPage.Background to "Page wash",
    AppPage.Badge to "Badges",
    AppPage.Chip to "Chips",
    AppPage.Kbd to "Keyboard keys",
    AppPage.Indicator to "Status indicators",
    AppPage.Status to "Status dots",
    AppPage.Loading to "Loading indicators",
    AppPage.Skeleton to "Skeleton loaders",
    AppPage.Progress to "Progress bars",
    AppPage.Qrcode to "QR codes",
    AppPage.RadialProgress to "Radial progress",
    AppPage.Steps to "Step indicators",
    AppPage.Timeline to "Timelines",
    AppPage.OrgChart to "Org charts",
    AppPage.Avatar to "Avatar gallery",
    AppPage.Mask to "Image masks",
    AppPage.Marquee to "Marquees",
    AppPage.Chat to "Chat bubbles",
    AppPage.Calendar to "Studio calendar",
    AppPage.DateTime to "Date and time fields",
    AppPage.Countdown to "Countdown clocks",
    AppPage.Palette to "Pigment palette",
    AppPage.ThemeController to "Theme controllers",
    AppPage.Layers to "Layer stack",
    AppPage.WatercolorPlayground to "Paint splash studio",
    AppPage.Diff to "Before and after",
    AppPage.Divider to "Section dividers",
)

private val extraKeywords: Map<AppPage, List<String>> = mapOf(
    AppPage.Overview to listOf("dashboard", "home", "studio", "desk", "kpi", "plates", "menzies", "menzies design", "wash ui"),
    AppPage.AssetsFonts to listOf("fonts", "typography", "download", "fraunces", "maple mono", "adwaita sans", "woff2", "monospace", "brand kit"),
    AppPage.AssetsImages to listOf("images", "download", "brand", "favicon", "hero", "logo", "sprite", "svg", "png", "artwork", "brand kit"),
    AppPage.DocsStart to listOf("install", "quickstart", "getting started", "framework", "stack"),
    AppPage.DocsStartVanilla to listOf("vanilla", "html", "css", "javascript", "initwash", "core"),
    AppPage.DocsStartReactVite to listOf("react", "vite", "washprovider", "spa"),
    AppPage.DocsStartNextjs to listOf("next", "nextjs", "app router", "react", "washprovider"),
    AppPage.DocsTheming to listOf("theme", "pigment", "dark", "light", "customize"),
    AppPage.DocsTokens to listOf("tokens", "wash", "paper", "ink", "motion"),
    AppPage.DocsMcpServer to listOf("mcp", "model context protocol", "cursor", "claude", "ai", "assistant", "tools", "server"),
    AppPage.Buttons to listOf("btn", "cta", "click", "gallery"),
    AppPage.ChartsLine to listOf("line chart", "trend", "time series", "wash chart"),
    AppPage.ChartsSparklines to listOf("sparkline", "mini chart", "kpi", "stat block", "trend", "wash chart"),
    AppPage.ChartsDashboards to listOf("dashboard", "dashboards", "multi chart", "kpi grid", "wash chart"),
    AppPage.AuthScreen to listOf("login", "signup", "sign in", "register", "password", "auth"),
    AppPage.Auth2fa to listOf("two factor", "2fa", "totp", "authenticator", "mfa", "template"),
    AppPage.TemplateCheckout to listOf("checkout", "cart", "order", "shipping", "commerce", "template"),
    AppPage.DataTable to listOf("crud", "datagrid", "ledger", "template"),
    AppPage.Loading to listOf("spinner", "busy", "pigment", "logo", "wash", "studio"),
    AppPage.WatercolorPlayground to listOf("paint", "splash", "watercolor", "blob", "svg", "pigment", "wash", "playground"),
    AppPage.Support to listOf("sponsor", "donate", "github sponsors", "open collective", "star", "community", "libraries"),
)

fun buildSearchEntries(items: List<NavItem> = nav): List<SearchEntry> =
    items.mapNotNull { item ->
        val page = item.page
        val subtitle = pageSubtitle[page].orEmpty()
        val idTokens = page.route.split('-').filter { it.isNotEmpty() }
        val keywords = buildList {
            add(item.label)
            add(subtitle)
            add(page.route)
            addAll(idTokens)
            addAll(extraKeywords[page].orEmpty())
        }
            .map { it.trim().lowercase() }
            .filter { it.isNotEmpty() }
            .distinct()

        SearchEntry(
            id = page,
            label = item.label,
            subtitle = subtitle,
            keywords = keywords,
            icon = item.icon,
        )
    }

fun filterSearchEntries(entries: List<SearchEntry>, query: String): List<SearchEntry> {
    val q = query.trim().lowercase()
    if (q.isEmpty()) return entries

    return entries
        .map { entry ->
            val label = entry.label.lowercase()
            val subtitle = entry.subtitle.lowercase()
            val id = entry.id.route.lowercase()
            var score = 0

            when {
                label == q -> score += 100
                label.startsWith(q) -> score += 80
                label.contains(q) -> score += 50
            }
            when {
                id == q -> score += 40
                id.contains(q) -> score += 25
            }
            if (subtitle.contains(q)) score += 20
            if (entry.keywords.any { it == q || it.contains(q) }) score += 15

            entry to score
        }
        .filter { (_, score) -> score > 0 }
        .sortedWith(compareByDescending<Pair<SearchEntry, Int>> { it.second }.thenBy { it.first.label })
        .map { it.first }
}

val searchEntries: List<SearchEntry> by lazy { buildSearchEntries() }
