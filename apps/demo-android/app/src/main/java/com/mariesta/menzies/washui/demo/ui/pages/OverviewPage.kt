package com.mariesta.menzies.washui.demo.ui.pages

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import com.mariesta.menzies.washui.icons.WashIcon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.componentNav
import com.mariesta.menzies.washui.demo.nav.docsNav
import com.mariesta.menzies.washui.demo.nav.templatesNav
import com.mariesta.menzies.washui.icons.BrandIcons
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.ChartLine
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog

private data class AckLibrary(
    val name: String,
    val href: String,
    val icon: () -> ImageVector,
    val preserveIconColors: Boolean = true,
)

private fun acknowledgeLibraries(): List<AckLibrary> = listOf(
    AckLibrary("React", "https://react.dev", { BrandIcons.ReactBrand }),
    AckLibrary("TypeScript", "https://www.typescriptlang.org", { BrandIcons.TypeScript }),
    AckLibrary("Tailwind CSS", "https://tailwindcss.com", { BrandIcons.Tailwindcss }),
    AckLibrary("daisyUI", "https://daisyui.com", { BrandIcons.Daisyui }),
    AckLibrary("Simple Icons", "https://simpleicons.org", { BrandIcons.SimpleIcons }),
    AckLibrary("Lucide", "https://lucide.dev", { BrandIcons.Lucide }),
    AckLibrary("Vite", "https://vite.dev", { BrandIcons.Vite }),
    AckLibrary(
        name = "ApexCharts",
        href = "https://apexcharts.com",
        icon = { LucideIcons.ChartLine },
        preserveIconColors = false,
    ),
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
    val componentCount = remember { componentNav.size }
    val templateCount = remember { templatesNav.size }
    val docsCount = remember { docsNav.size }
    val libraries = remember { acknowledgeLibraries() }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
    ) {
        item(key = "hero") {
            WashPanel {
                Column(modifier = Modifier.padding(8.dp)) {
                    Text("Menzies Design", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                    Text(
                        text = "Wash UI",
                        color = colors.primary,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                    Text(
                        text = "Watercolor components, pigment themes, and templates for Compose.",
                        color = colors.ink_muted,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                    FlowRow(
                        modifier = Modifier.padding(top = 12.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        WashButton(onClick = { onNavigate(AppPage.Buttons) }, text = "Components")
                        WashButton(
                            onClick = { onNavigate(AppPage.DocsStart) },
                            text = "Docs",
                            variant = WashButtonVariant.Outline,
                        )
                        WashButton(
                            onClick = { onNavigate(AppPage.AuthScreen) },
                            text = "Templates",
                            variant = WashButtonVariant.Ghost,
                        )
                    }
                }
            }
        }

        item(key = "stats") {
            WashPanel {
                Column(modifier = Modifier.padding(8.dp)) {
                    Text("At a glance", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                    StatRow("Components", componentCount.toString())
                    StatRow("Templates", templateCount.toString())
                    StatRow("Docs", docsCount.toString())
                    StatRow("Themes", pigmentThemeCount.toString())
                    StatRow("Charts", "31")
                }
            }
        }

        item(key = "acks-header") {
            WashPanel {
                Column(modifier = Modifier.padding(8.dp)) {
                    Text("Open libraries", color = colors.base_content, fontWeight = FontWeight.Bold)
                }
            }
        }

        items(libraries, key = { it.name }) { library ->
            WashPanel {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(8.dp)
                        .clip(RoundedCornerShape(colors.radiusField))
                        .background(colors.base_200.copy(alpha = 0.5f))
                        .clickable {
                            context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(library.href)))
                        }
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    val icon = remember(library.name) { library.icon() }
                    WashIcon(
                        icon,
                        contentDescription = null,
                        tint = if (library.preserveIconColors) Color.Unspecified else colors.primary,
                        modifier = Modifier.size(20.dp),
                    )
                    Text(
                        library.name,
                        color = colors.base_content,
                        fontWeight = FontWeight.Medium,
                        modifier = Modifier.padding(start = 12.dp),
                    )
                }
            }
        }
    }
}

@Composable
private fun StatRow(title: String, value: String) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(title, color = colors.ink_muted)
        Text(value, color = colors.primary, fontWeight = FontWeight.Bold)
    }
}
