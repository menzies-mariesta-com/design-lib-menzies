package com.mariesta.menzies.washui.demo.ui.pages

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material.icons.filled.Key
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.TableChart
import androidx.compose.material.icons.filled.TouchApp
import androidx.compose.material.icons.filled.ViewModule
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.componentNav
import com.mariesta.menzies.washui.demo.nav.docsNav
import com.mariesta.menzies.washui.demo.nav.templatesNav
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog

private data class FeatureCard(
    val title: String,
    val description: String,
    val icon: ImageVector,
    val page: AppPage,
)

private data class QuickLink(
    val label: String,
    val description: String,
    val page: AppPage,
    val icon: ImageVector,
)

private data class AckLibrary(
    val name: String,
    val description: String,
    val href: String,
    val icon: ImageVector,
)

private val featureCards = listOf(
    FeatureCard(
        title = "Pigment theming",
        description = "Switch watercolor pigments and light or dark paper without leaving the page. Tokens stay consistent across every component.",
        icon = Icons.Default.Palette,
        page = AppPage.DocsTheming,
    ),
    FeatureCard(
        title = "Design tokens",
        description = "Paper, wash, ink, and motion tokens power every surface. Override at root or scope tokens per layout.",
        icon = Icons.AutoMirrored.Filled.MenuBook,
        page = AppPage.DocsTokens,
    ),
    FeatureCard(
        title = "Production templates",
        description = "Auth shells and CRUD data tables ship as ready layouts. Copy patterns straight into product work.",
        icon = Icons.Default.Folder,
        page = AppPage.AuthScreen,
    ),
    FeatureCard(
        title = "Framework-agnostic core",
        description = "Shared tokens and themes live in a core package. The Compose adapter wires them into this gallery.",
        icon = Icons.Default.Layers,
        page = AppPage.DocsStart,
    ),
)

private val quickLinks = listOf(
    QuickLink("Getting started", "Install, first render, and project setup", AppPage.DocsStart, Icons.Default.Book),
    QuickLink("Buttons", "Primary actions, outlines, and wash ripples", AppPage.Buttons, Icons.Default.TouchApp),
    QuickLink("Cards", "Paper panels, sizes, and bordered layouts", AppPage.Card, Icons.Default.ViewModule),
    QuickLink("Auth screen", "Login and signup shells", AppPage.AuthScreen, Icons.Default.Key),
    QuickLink("Data table", "Filterable CRUD table template", AppPage.DataTable, Icons.Default.TableChart),
    QuickLink("Palette", "Browse every pigment swatch", AppPage.Palette, Icons.Default.Palette),
)

private val acknowledgeLibraries = listOf(
    AckLibrary("React", "Components, provider, and hooks", "https://react.dev", Icons.Default.AutoAwesome),
    AckLibrary("TypeScript", "Typed APIs across the monorepo", "https://www.typescriptlang.org", Icons.Default.Book),
    AckLibrary("Tailwind CSS", "Utility layout and responsive tokens", "https://tailwindcss.com", Icons.Default.Palette),
    AckLibrary("daisyUI", "Semantic components and theme slots", "https://daisyui.com", Icons.Default.ViewModule),
    AckLibrary("Vite", "Library and demo build tooling", "https://vite.dev", Icons.Default.Layers),
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun OverviewPage(
    onNavigate: (AppPage) -> Unit,
    modifier: Modifier = Modifier,
) {
    val colors = WashTheme.colors
    val context = LocalContext.current
    val pigmentThemeCount = washPigmentCatalog.size * 2

    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Menzies Design", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Wash UI design system",
                    color = colors.primary,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp),
                )
                Text(
                    text = "A watercolor-first component library with pigment themes and production-ready templates. Explore ${componentNav.size}+ galleries, switch themes live in the header, and ship interfaces that feel hand-painted on paper.",
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 8.dp),
                )
                FlowRow(
                    modifier = Modifier.padding(top = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    WashButton(onClick = { onNavigate(AppPage.Buttons) }, text = "Explore components")
                    WashButton(
                        onClick = { onNavigate(AppPage.DocsStart) },
                        text = "Read docs",
                        variant = WashButtonVariant.Outline,
                    )
                    WashButton(
                        onClick = { onNavigate(AppPage.AuthScreen) },
                        text = "View templates",
                        variant = WashButtonVariant.Ghost,
                    )
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Library at a glance", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                StatRow("Component galleries", componentNav.size.toString(), "Interactive examples")
                StatRow("Templates", templatesNav.size.toString(), "Auth and data layouts")
                StatRow("Doc guides", docsNav.size.toString(), "Theming to customization")
                StatRow("Pigment themes", pigmentThemeCount.toString(), "Light and dark paper")
                StatRow("Chart galleries", "31", "Pigment-aware analytics")
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Built on open libraries", color = colors.base_content, fontWeight = FontWeight.Bold)
                Text(
                    text = "Wash UI composes these projects for pigments, components, icons, and charts.",
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 4.dp, bottom = 12.dp),
                )
                acknowledgeLibraries.forEach { library ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clip(RoundedCornerShape(colors.radiusField))
                            .background(colors.base_200.copy(alpha = 0.5f))
                            .clickable {
                                context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(library.href)))
                            }
                            .padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Icon(library.icon, contentDescription = null, tint = colors.primary)
                        Column(modifier = Modifier.padding(start = 12.dp)) {
                            Text(library.name, color = colors.base_content, fontWeight = FontWeight.Medium)
                            Text(library.description, color = colors.ink_muted)
                        }
                    }
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Why Wash UI", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Built for pigment, paper, and product",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp, bottom = 12.dp),
                )
                featureCards.forEach { card ->
                    FeatureCardRow(card = card, onNavigate = onNavigate)
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Quick navigation", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Jump into the gallery",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp, bottom = 12.dp),
                )
                quickLinks.forEach { link ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clip(RoundedCornerShape(colors.radiusField))
                            .clickable { onNavigate(link.page) }
                            .padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(RoundedCornerShape(colors.radiusField))
                                .background(colors.base_200),
                            contentAlignment = Alignment.Center,
                        ) {
                            Icon(link.icon, contentDescription = null, tint = colors.base_content, modifier = Modifier.size(18.dp))
                        }
                        Column(modifier = Modifier.padding(start = 12.dp)) {
                            Text(link.label, color = colors.base_content, fontWeight = FontWeight.Medium)
                            Text(link.description, color = colors.ink_muted)
                        }
                    }
                }
            }
        }

        WashPanel {
            Row(
                modifier = Modifier.padding(8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text("Start exploring", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                    Text(
                        text = "Everything in one studio desk",
                        color = colors.base_content,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                    Text(
                        text = "${docsNav.size} documentation guides, ${templatesNav.size} templates, and ${componentNav.size} component galleries.",
                        color = colors.ink_muted,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
                WashButton(onClick = { onNavigate(AppPage.Buttons) }, text = "Open gallery")
            }
        }
    }
}

@Composable
private fun StatRow(title: String, value: String, desc: String) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column {
            Text(title, color = colors.ink_muted)
            Text(desc, color = colors.ink_muted)
        }
        Text(value, color = colors.primary, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun FeatureCardRow(card: FeatureCard, onNavigate: (AppPage) -> Unit) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .clip(RoundedCornerShape(colors.radiusField))
            .clickable { onNavigate(card.page) }
            .padding(12.dp),
        verticalAlignment = Alignment.Top,
    ) {
        Icon(card.icon, contentDescription = null, tint = colors.primary, modifier = Modifier.padding(end = 12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(card.title, color = colors.base_content, fontWeight = FontWeight.SemiBold)
            Text(card.description, color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp))
            Row(
                modifier = Modifier.padding(top = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("Learn more", color = colors.primary, fontWeight = FontWeight.Medium)
                Icon(
                    Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = colors.primary,
                    modifier = Modifier
                        .padding(start = 4.dp)
                        .size(14.dp),
                )
            }
        }
    }
}
