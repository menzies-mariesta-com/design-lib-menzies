package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.components.WashThemeSwitcher
import com.mariesta.menzies.washui.demo.ui.WashAppLogo
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.EllipsisVertical
import com.mariesta.menzies.washui.icons.lucide.Menu
import com.mariesta.menzies.washui.icons.lucide.Search
import com.mariesta.menzies.washui.primitives.WashBottomSheet
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashDivider
import com.mariesta.menzies.washui.primitives.WashDropdownMenu
import com.mariesta.menzies.washui.primitives.WashIconButton
import com.mariesta.menzies.washui.primitives.WashModalDrawer
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.primitives.WashTopBar
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun NavbarShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Top navbar"
        ) {
            WashTopBar(
                title = "Menzies Design",
                subtitle = "Wash UI",
                navigationIcon = {
                    WashIconButton(
                        onClick = {},
                        imageVector = LucideIcons.Menu,
                        contentDescription = "Menu",
                    )
                },
                brand = {
                    WashAppLogo(size = 28.dp)
                },
                actions = {
                    WashIconButton(
                        onClick = {},
                        imageVector = LucideIcons.Search,
                        contentDescription = "Search",
                    )
                    WashIconButton(
                        onClick = {},
                        imageVector = LucideIcons.EllipsisVertical,
                        contentDescription = "More",
                    )
                },
            )
        }
    }
}

@Composable
fun DrawerShowcase() {
    var drawerOpen by remember { mutableStateOf(false) }
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Navigation drawer"
        ) {
            Box(modifier = Modifier.fillMaxWidth().height(220.dp)) {
                WashModalDrawer(
                    open = drawerOpen,
                    onDismiss = { drawerOpen = false },
                    drawerWidth = 220.dp,
                    drawerContent = {
                        WashText(
                            "Studio",
                            color = colors.primary,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.padding(16.dp),
                        )
                        listOf("Overview", "Components", "Templates", "Docs").forEach { label ->
                            WashText(
                                label,
                                color = colors.base_content,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { drawerOpen = false }
                                    .padding(horizontal = 16.dp, vertical = 10.dp),
                            )
                        }
                    },
                ) {
                    WashPanel {
                        WashText("Main content", color = colors.base_content, fontWeight = FontWeight.Medium)
                        WashButton(
                            onClick = { drawerOpen = true },
                            text = "Open drawer",
                            variant = WashButtonVariant.Primary,
                            modifier = Modifier.padding(top = 12.dp),
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun DropdownShowcase() {
    var open by remember { mutableStateOf(false) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Dropdown menu"
        ) {
            Box {
                WashButton(onClick = { open = true }, text = "Actions", variant = WashButtonVariant.Outline)
                WashDropdownMenu(
                    open = open,
                    onDismiss = { open = false },
                    items = listOf("Duplicate plate", "Export SVG", "Archive"),
                )
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
            title = "Vertical menu"
        ) {
            WashPanel {
                items.forEachIndexed { index, label ->
                    WashText(
                        text = label,
                        color = colors.base_content,
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { }
                            .padding(vertical = 10.dp),
                    )
                    if (index < items.lastIndex) {
                        WashDivider()
                    }
                }
            }
        }
    }
}

@Composable
fun BottomsheetShowcase() {
    var open by remember { mutableStateOf(false) }
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Bottom sheet"
        ) {
            WashButton(onClick = { open = true }, text = "Open sheet", variant = WashButtonVariant.Primary)
            WashBottomSheet(open = open, onDismiss = { open = false }) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    WashText("Filter plates", color = colors.base_content, fontWeight = FontWeight.SemiBold)
                    WashThemeSwitcher()
                    WashButton(
                        onClick = { open = false },
                        text = "Apply",
                        variant = WashButtonVariant.Primary,
                        modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp),
                    )
                }
            }
        }
    }
}
