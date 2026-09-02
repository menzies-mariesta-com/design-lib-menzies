package com.mariesta.menzies.washui.demo.ui

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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Square
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.mariesta.menzies.washui.components.WashThemeSwitcher
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.NavItem
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
import com.mariesta.menzies.washui.theme.WashTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DemoApp() {
    val colors = WashTheme.colors
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var searchOpen by remember { mutableStateOf(false) }

    var assetsOpen by remember { mutableStateOf(false) }
    var docsOpen by remember { mutableStateOf(false) }
    var templatesOpen by remember { mutableStateOf(false) }
    var componentsOpen by remember { mutableStateOf(false) }

    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentPage = AppPage.fromRoute(backStackEntry?.destination?.route) ?: AppPage.Overview

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
        scope.launch { drawerState.close() }
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                modifier = Modifier.width(280.dp),
            ) {
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
            }
        },
    ) {
        Scaffold(
            modifier = Modifier
                .fillMaxSize()
                .background(colors.base_100),
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text("Menzies Design", fontWeight = FontWeight.SemiBold, color = colors.base_content)
                            Text("Wash UI", color = colors.primary, fontWeight = FontWeight.Medium)
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, contentDescription = "Open menu", tint = colors.base_content)
                        }
                    },
                    actions = {
                        IconButton(onClick = { searchOpen = true }) {
                            Icon(Icons.Default.Search, contentDescription = "Search", tint = colors.base_content)
                        }
                        WashThemeSwitcher(modifier = Modifier.padding(end = 8.dp))
                    },
                )
            },
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding),
            ) {
                HorizontalDivider(color = colors.ink_border.copy(alpha = 0.6f))
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
                    AppPage.entries.forEach { page ->
                        composable(page.route) {
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
        HorizontalDivider(color = colors.ink_border.copy(alpha = 0.6f))

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
            icon = Icons.Default.Image,
            expanded = assetsOpen,
            onExpandedChange = onAssetsOpenChange,
            active = isAssetsPage(currentPage),
            items = assetsNav,
            currentPage = currentPage,
            onNavigate = onNavigate,
        )

        DrawerNavGroup(
            title = "Docs",
            icon = Icons.Default.Book,
            expanded = docsOpen,
            onExpandedChange = onDocsOpenChange,
            active = isDocPage(currentPage) || isGettingStartedStackPage(currentPage),
            items = sidebarDocsNav,
            currentPage = currentPage,
            onNavigate = onNavigate,
        )

        DrawerNavGroup(
            title = "Components",
            icon = Icons.Default.Square,
            expanded = componentsOpen,
            onExpandedChange = onComponentsOpenChange,
            active = componentNav.any { it.page == currentPage },
            items = componentNav,
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
            Icon(Icons.Default.Folder, contentDescription = null, tint = if (active) colors.primary else colors.base_content)
            Text(
                text = "Templates",
                color = if (active) colors.primary else colors.base_content,
                fontWeight = FontWeight.Medium,
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 12.dp),
            )
            Icon(
                if (expanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
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
    icon: androidx.compose.ui.graphics.vector.ImageVector,
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
            Icon(icon, contentDescription = null, tint = if (active) colors.primary else colors.base_content)
            Text(
                text = title,
                color = if (active) colors.primary else colors.base_content,
                fontWeight = FontWeight.Medium,
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 12.dp),
            )
            Icon(
                if (expanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
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
        Icon(item.icon, contentDescription = null, tint = if (active) colors.primary else colors.base_content)
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
        Icon(item.icon, contentDescription = null, tint = if (active) colors.primary else colors.ink_muted, modifier = Modifier.size(18.dp))
        Text(
            text = item.label,
            color = if (active) colors.primary else colors.base_content,
            fontWeight = if (active) FontWeight.Medium else FontWeight.Normal,
        )
    }
}
