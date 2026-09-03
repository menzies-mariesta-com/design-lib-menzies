package com.mariesta.menzies.washui.demo.ui

import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.NavItem
import com.mariesta.menzies.washui.demo.nav.asImageVector
import com.mariesta.menzies.washui.demo.nav.assetsNav
import com.mariesta.menzies.washui.demo.nav.authTemplateNav
import com.mariesta.menzies.washui.demo.nav.commerceTemplateNav
import com.mariesta.menzies.washui.demo.nav.componentNav
import com.mariesta.menzies.washui.demo.nav.dataTemplateNav
import com.mariesta.menzies.washui.demo.nav.isAssetsPage
import com.mariesta.menzies.washui.demo.nav.isChartPage
import com.mariesta.menzies.washui.demo.nav.isDocPage
import com.mariesta.menzies.washui.demo.nav.isGettingStartedStackPage
import com.mariesta.menzies.washui.demo.nav.isTemplatePage
import com.mariesta.menzies.washui.demo.nav.layoutTemplateNav
import com.mariesta.menzies.washui.demo.nav.overviewNav
import com.mariesta.menzies.washui.demo.nav.sidebarDocsNav
import com.mariesta.menzies.washui.demo.nav.studioTemplateNav
import com.mariesta.menzies.washui.demo.nav.supportNav
import com.mariesta.menzies.washui.demo.ui.pages.OverviewPage
import com.mariesta.menzies.washui.demo.ui.pages.ShowcaseRouter
import com.mariesta.menzies.washui.demo.ui.pages.SupportPage
import com.mariesta.menzies.washui.demo.ui.showcase.ChartShowcasePage
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.icons.lucide.BookOpen
import com.mariesta.menzies.washui.icons.lucide.ChevronDown
import com.mariesta.menzies.washui.icons.lucide.ChevronUp
import com.mariesta.menzies.washui.icons.lucide.FolderOpen
import com.mariesta.menzies.washui.icons.lucide.Image
import com.mariesta.menzies.washui.icons.lucide.Menu
import com.mariesta.menzies.washui.icons.lucide.Search
import com.mariesta.menzies.washui.icons.lucide.Square
import com.mariesta.menzies.washui.primitives.WashDivider
import com.mariesta.menzies.washui.primitives.WashIconButton
import com.mariesta.menzies.washui.primitives.WashModalDrawer
import com.mariesta.menzies.washui.primitives.WashScaffold
import com.mariesta.menzies.washui.primitives.WashTopBar
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun DemoApp() {
    val colors = WashTheme.colors
    val navController = rememberNavController()
    var drawerOpen by remember { mutableStateOf(false) }
    var searchOpen by remember { mutableStateOf(false) }

    var assetsOpen by remember { mutableStateOf(false) }
    var docsOpen by remember { mutableStateOf(false) }
    var templatesOpen by remember { mutableStateOf(false) }
    var componentsOpen by remember { mutableStateOf(false) }

    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentPage = AppPage.fromRoute(backStackEntry?.destination?.route) ?: AppPage.Overview

    BackHandler(enabled = drawerOpen) { drawerOpen = false }

    LaunchedEffect(currentPage) {
        when {
            isAssetsPage(currentPage) -> assetsOpen = true
            isDocPage(currentPage) || isGettingStartedStackPage(currentPage) -> docsOpen = true
            isTemplatePage(currentPage) -> templatesOpen = true
            currentPage != AppPage.Overview && currentPage != AppPage.Support -> componentsOpen = true
        }
    }

    fun navigate(page: AppPage) {
        navController.navigate(page.route) {
            popUpTo(navController.graph.findStartDestination().id) { saveState = true }
            launchSingleTop = true
            restoreState = true
        }
        drawerOpen = false
    }

    WashModalDrawer(
        open = drawerOpen,
        onDismiss = { drawerOpen = false },
        drawerContent = {
            DemoDrawerContent(
                currentPage = currentPage,
                assetsOpen = assetsOpen,
                docsOpen = docsOpen,
                templatesOpen = templatesOpen,
                componentsOpen = componentsOpen,
                onAssetsOpenChange = { assetsOpen = it },
                onDocsOpenChange = { docsOpen = it },
                onTemplatesOpenChange = { templatesOpen = it },
                onComponentsOpenChange = { componentsOpen = it },
                onNavigate = ::navigate,
            )
        },
    ) {
        WashScaffold(
            modifier = Modifier
                .fillMaxSize()
                .background(colors.base_100),
            topBar = {
                WashTopBar(
                    title = "Menzies Design",
                    subtitle = "Wash UI",
                    navigationIcon = {
                        WashIconButton(
                            onClick = { drawerOpen = true },
                            imageVector = LucideIcons.Menu,
                            contentDescription = "Open menu",
                        )
                    },
                    actions = {
                        WashIconButton(
                            onClick = { searchOpen = true },
                            imageVector = LucideIcons.Search,
                            contentDescription = "Search",
                        )
                    },
                )
            },
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                Text(
                    text = currentPage.label,
                    color = colors.ink_muted,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                )
                NavHost(
                    navController = navController,
                    startDestination = AppPage.Overview.route,
                    modifier = Modifier.fillMaxSize(),
                ) {
                    composable(
                        route = "{route}",
                        arguments = listOf(
                            navArgument("route") {
                                type = NavType.StringType
                            },
                        ),
                    ) { entry ->
                        val page = AppPage.fromRoute(entry.arguments?.getString("route"))
                            ?: AppPage.Overview
                        when (page) {
                            AppPage.Overview -> OverviewPage(onNavigate = ::navigate)
                            AppPage.Support -> SupportPage()
                            else -> when {
                                isChartPage(page) -> ChartShowcasePage(page = page, onNavigate = ::navigate)
                                else -> ShowcaseRouter(page = page, onNavigate = ::navigate)
                            }
                        }
                    }
                }
            }
        }
    }

    SearchOverlay(
        open = searchOpen,
        onDismiss = { searchOpen = false },
        onSelect = ::navigate,
    )
}

@Composable
private fun DemoDrawerContent(
    currentPage: AppPage,
    assetsOpen: Boolean,
    docsOpen: Boolean,
    templatesOpen: Boolean,
    componentsOpen: Boolean,
    onAssetsOpenChange: (Boolean) -> Unit,
    onDocsOpenChange: (Boolean) -> Unit,
    onTemplatesOpenChange: (Boolean) -> Unit,
    onComponentsOpenChange: (Boolean) -> Unit,
    onNavigate: (AppPage) -> Unit,
) {
    val colors = WashTheme.colors

    Column(
        modifier = Modifier
            .fillMaxHeight()
            .background(colors.base_100)
            .verticalScroll(rememberScrollState())
            .padding(vertical = 12.dp),
    ) {
        Column(modifier = Modifier.padding(horizontal = 20.dp, vertical = 12.dp)) {
            Text("Menzies Design", fontWeight = FontWeight.SemiBold, color = colors.base_content)
            Text("Wash UI", color = colors.primary, fontWeight = FontWeight.Medium)
        }
        WashDivider()

        DrawerNavButton(
            item = overviewNav,
            active = currentPage == AppPage.Overview,
            onClick = { onNavigate(AppPage.Overview) },
        )
        DrawerNavButton(
            item = supportNav,
            active = currentPage == AppPage.Support,
            onClick = { onNavigate(AppPage.Support) },
        )

        DrawerNavGroup(
            title = "Assets",
            icon = LucideIcons.Image,
            expanded = assetsOpen,
            onExpandedChange = onAssetsOpenChange,
            active = isAssetsPage(currentPage),
            items = if (assetsOpen) assetsNav else emptyList(),
            currentPage = currentPage,
            onNavigate = onNavigate,
        )

        DrawerNavGroup(
            title = "Docs",
            icon = LucideIcons.BookOpen,
            expanded = docsOpen,
            onExpandedChange = onDocsOpenChange,
            active = isDocPage(currentPage) || isGettingStartedStackPage(currentPage),
            items = if (docsOpen) sidebarDocsNav else emptyList(),
            currentPage = currentPage,
            onNavigate = onNavigate,
        )

        DrawerNavGroup(
            title = "Components",
            icon = LucideIcons.Square,
            expanded = componentsOpen,
            onExpandedChange = onComponentsOpenChange,
            active = currentPage != AppPage.Overview &&
                currentPage != AppPage.Support &&
                !isAssetsPage(currentPage) &&
                !isDocPage(currentPage) &&
                !isGettingStartedStackPage(currentPage) &&
                !isTemplatePage(currentPage),
            items = if (componentsOpen) componentNav else emptyList(),
            currentPage = currentPage,
            onNavigate = onNavigate,
        )

        TemplatesDrawerGroup(
            expanded = templatesOpen,
            onExpandedChange = onTemplatesOpenChange,
            currentPage = currentPage,
            onNavigate = onNavigate,
        )
    }
}

@Composable
private fun TemplatesDrawerGroup(
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    currentPage: AppPage,
    onNavigate: (AppPage) -> Unit,
) {
    val colors = WashTheme.colors
    val active = isTemplatePage(currentPage)

    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onExpandedChange(!expanded) }
                .padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            WashIcon(
                LucideIcons.FolderOpen,
                contentDescription = null,
                tint = if (active) colors.primary else colors.base_content,
            )
            Text(
                text = "Templates",
                color = if (active) colors.primary else colors.base_content,
                fontWeight = FontWeight.Medium,
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 12.dp),
            )
            WashIcon(
                if (expanded) LucideIcons.ChevronUp else LucideIcons.ChevronDown,
                contentDescription = null,
                tint = colors.ink_muted,
            )
        }
        AnimatedVisibility(visible = expanded) {
            Column(modifier = Modifier.padding(start = 28.dp, end = 8.dp)) {
                DrawerSectionTitle("Auth")
                authTemplateNav.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
                DrawerSectionTitle("Commerce")
                commerceTemplateNav.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
                DrawerSectionTitle("Data")
                dataTemplateNav.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
                DrawerSectionTitle("Studio")
                studioTemplateNav.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
                DrawerSectionTitle("Layout")
                layoutTemplateNav.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
            }
        }
    }
}

@Composable
private fun DrawerNavGroup(
    title: String,
    icon: ImageVector,
    expanded: Boolean,
    onExpandedChange: (Boolean) -> Unit,
    active: Boolean,
    items: List<NavItem>,
    currentPage: AppPage,
    onNavigate: (AppPage) -> Unit,
) {
    val colors = WashTheme.colors

    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onExpandedChange(!expanded) }
                .padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            WashIcon(icon, contentDescription = null, tint = if (active) colors.primary else colors.base_content)
            Text(
                text = title,
                color = if (active) colors.primary else colors.base_content,
                fontWeight = FontWeight.Medium,
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 12.dp),
            )
            WashIcon(
                if (expanded) LucideIcons.ChevronUp else LucideIcons.ChevronDown,
                contentDescription = null,
                tint = colors.ink_muted,
            )
        }
        AnimatedVisibility(visible = expanded) {
            Column(modifier = Modifier.padding(start = 28.dp, end = 8.dp)) {
                items.forEach { item ->
                    DrawerNestedButton(item, currentPage, onNavigate)
                }
            }
        }
    }
}

@Composable
private fun DrawerSectionTitle(title: String) {
    Text(
        text = title,
        color = WashTheme.colors.ink_muted,
        fontWeight = FontWeight.Medium,
        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
    )
}

@Composable
private fun DrawerNavButton(item: NavItem, active: Boolean, onClick: () -> Unit) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        WashIcon(
            item.icon.asImageVector(),
            contentDescription = null,
            tint = if (active) colors.primary else colors.base_content,
        )
        Text(
            text = item.label,
            color = if (active) colors.primary else colors.base_content,
            fontWeight = if (active) FontWeight.SemiBold else FontWeight.Normal,
            modifier = Modifier.padding(start = 12.dp),
        )
    }
}

@Composable
private fun DrawerNestedButton(item: NavItem, currentPage: AppPage, onNavigate: (AppPage) -> Unit) {
    val active = item.page == currentPage
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onNavigate(item.page) }
            .padding(horizontal = 12.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        WashIcon(
            item.icon.asImageVector(),
            contentDescription = null,
            tint = if (active) colors.primary else colors.ink_muted,
            size = 18.dp,
        )
        Text(
            text = item.label,
            color = if (active) colors.primary else colors.base_content,
            fontWeight = if (active) FontWeight.Medium else FontWeight.Normal,
        )
    }
}
