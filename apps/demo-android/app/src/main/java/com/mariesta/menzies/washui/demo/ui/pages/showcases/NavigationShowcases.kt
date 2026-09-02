package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.components.WashThemeSwitcher
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NavbarShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Top navbar",
            description = "App bar with brand, search, and theme controls.",
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Icon(Icons.Default.Menu, contentDescription = "Menu", tint = colors.base_content)
                Column(modifier = Modifier.padding(start = 12.dp).weight(1f)) {
                    Text("Menzies Design", color = colors.base_content, fontWeight = FontWeight.SemiBold)
                    Text("Wash UI", color = colors.primary)
                }
                IconButton(onClick = {}) {
                    Icon(Icons.Default.Search, contentDescription = "Search", tint = colors.base_content)
                }
                IconButton(onClick = {}) {
                    Icon(Icons.Default.MoreVert, contentDescription = "More", tint = colors.base_content)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DrawerShowcase() {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Navigation drawer",
            description = "Modal drawer for section navigation on compact widths.",
        ) {
            ModalNavigationDrawer(
                drawerState = drawerState,
                drawerContent = {
                    ModalDrawerSheet(modifier = Modifier.width(260.dp)) {
                        Text(
                            "Studio",
                            color = colors.primary,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.padding(16.dp),
                        )
                        listOf("Overview", "Components", "Templates", "Docs").forEach { label ->
                            Text(
                                label,
                                color = colors.base_content,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { scope.launch { drawerState.close() } }
                                    .padding(horizontal = 16.dp, vertical = 10.dp),
                            )
                        }
                    }
                },
            ) {
                WashPanel {
                    Text("Main content", color = colors.base_content, fontWeight = FontWeight.Medium)
                    WashButton(
                        onClick = { scope.launch { drawerState.open() } },
                        text = "Open drawer",
                        variant = WashButtonVariant.Primary,
                        modifier = Modifier.padding(top = 12.dp),
                    )
                }
            }
        }
    }
}

@Composable
fun DropdownShowcase() {
    var open by remember { mutableStateOf(false) }
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Dropdown menu",
            description = "Compact action menu anchored to a trigger.",
        ) {
            Box {
                WashButton(onClick = { open = true }, text = "Actions", variant = WashButtonVariant.Outline)
                DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
                    listOf("Duplicate plate", "Export SVG", "Archive").forEach { label ->
                        DropdownMenuItem(
                            text = { Text(label) },
                            onClick = { open = false },
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun MenuShowcase() {
    val colors = WashTheme.colors
    val items = listOf("New plate", "Import tokens", "Share link", "Settings")

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Vertical menu",
            description = "Stacked menu rows inside a wash panel.",
        ) {
            WashPanel {
                items.forEachIndexed { index, label ->
                    Text(
                        text = label,
                        color = colors.base_content,
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { }
                            .padding(vertical = 10.dp),
                    )
                    if (index < items.lastIndex) {
                        HorizontalDivider(color = colors.ink_border.copy(alpha = 0.6f))
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomsheetShowcase() {
    var open by remember { mutableStateOf(false) }
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Bottom sheet",
            description = "Modal sheet for filters and quick actions on mobile.",
        ) {
            WashButton(onClick = { open = true }, text = "Open sheet", variant = WashButtonVariant.Primary)
            if (open) {
                ModalBottomSheet(onDismissRequest = { open = false }, sheetState = sheetState) {
                    Column(
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        Text("Filter plates", color = colors.base_content, fontWeight = FontWeight.SemiBold)
                        Text("Choose pigment and mode without leaving the gallery.", color = colors.ink_muted)
                        WashThemeSwitcher()
                        WashButton(
                            onClick = { open = false },
                            text = "Apply",
                            variant = WashButtonVariant.Primary,
                            modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp),
                        )
                    }
                }
            }
        }
    }
}
