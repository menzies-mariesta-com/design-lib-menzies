package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.Eye
import com.mariesta.menzies.washui.icons.lucide.EyeOff
import androidx.compose.material3.FilterChip
import com.mariesta.menzies.washui.primitives.WashIconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.components.WashThemeSwitcher
import com.mariesta.menzies.washui.theme.WashMode
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog
import com.mariesta.menzies.washui.useWash

@Composable
fun ThemeControllerShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Studio theme controller"
        ) {
            WashThemeSwitcher()
        }
        ShowcaseSection(
            title = "Compact pigment strip"
        ) {
            PigmentStrip(take = 12)
        }
    }
}

@Composable
fun PaletteShowcase() {
    val colors = WashTheme.colors
    val semantic = listOf(
        "Primary" to colors.primary,
        "Secondary" to colors.secondary,
        "Accent" to colors.accent,
        "Neutral" to colors.neutral,
        "Base 100" to colors.base_100,
        "Base 200" to colors.base_200,
        "Base 300" to colors.base_300,
        "Info" to colors.info,
        "Success" to colors.success,
        "Warning" to colors.warning,
        "Error" to colors.error,
    )
    val washTokens = listOf(
        "Wash A" to colors.wash_a,
        "Wash B" to colors.wash_b,
        "Wash C" to colors.wash_c,
        "Paper fiber" to colors.paper_fiber,
        "Ink muted" to colors.ink_muted,
        "Ink border" to colors.ink_border,
    )

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Semantic palette",
            description = "${colors.pigment.id} · ${colors.mode.name.lowercase()}",
        ) {
            ColorSwatchGrid(semantic)
        }
        ShowcaseSection(
            title = "Wash and ink tokens"
        ) {
            ColorSwatchGrid(washTokens)
        }
    }
}

@Composable
fun LayersShowcase() {
    val colors = WashTheme.colors
    data class LayerRow(val name: String, val tint: Color, val visible: Boolean)

    var layers by remember {
        mutableStateOf(
            listOf(
                LayerRow("Sky glaze", colors.wash_a, true),
                LayerRow("Ochre cliff", colors.wash_b, true),
                LayerRow("Rose bloom", colors.wash_c, true),
                LayerRow("Paper tooth", colors.base_200, true),
            ),
        )
    }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Layer stack"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                layers.forEachIndexed { index, layer ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(colors.radiusField))
                            .background(colors.base_200)
                            .padding(horizontal = 12.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Box(
                            modifier = Modifier
                                .size(28.dp)
                                .clip(CircleShape)
                                .background(layer.tint)
                                .border(1.dp, colors.ink_border, CircleShape),
                        )
                        Text(
                            text = layer.name,
                            color = colors.base_content,
                            modifier = Modifier
                                .weight(1f)
                                .padding(horizontal = 12.dp),
                        )
                        WashIconButton(
                            onClick = {
                                layers = layers.mapIndexed { i, row ->
                                    if (i == index) row.copy(visible = !row.visible) else row
                                }
                            },
                            imageVector = if (layer.visible) LucideIcons.Eye else LucideIcons.EyeOff,
                            contentDescription = if (layer.visible) "Hide layer" else "Show layer",
                            tint = colors.primary,
                        )
                    }
                }
            }
        }
        ShowcaseSection(
            title = "Composite preview"
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(colors.radiusBox))
                    .background(colors.base_300)
                    .padding(24.dp),
            ) {
                layers.filter { it.visible }.forEachIndexed { index, layer ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = (index * 10).dp)
                            .clip(RoundedCornerShape(colors.radiusBox))
                            .background(layer.tint.copy(alpha = 0.55f))
                            .padding(32.dp),
                    )
                }
                Text("Studio plate", color = colors.base_content, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun PigmentStrip(take: Int) {
    val wash = useWash()
    FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
        washPigmentCatalog.take(take).forEach { meta ->
            FilterChip(
                selected = wash.pigment == meta.id,
                onClick = { wash.setPigment(meta.id) },
                label = { Text(meta.label) },
            )
        }
    }
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
        FilterChip(
            selected = wash.mode == WashMode.Light,
            onClick = { wash.setMode(WashMode.Light) },
            label = { Text("Light") },
        )
        FilterChip(
            selected = wash.mode == WashMode.Dark,
            onClick = { wash.setMode(WashMode.Dark) },
            label = { Text("Dark") },
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ColorSwatchGrid(entries: List<Pair<String, Color>>) {
    val colors = WashTheme.colors
    FlowRow(
        horizontalArrangement = Arrangement.spacedBy(10.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        entries.forEach { (label, tint) ->
            Column(modifier = Modifier.padding(4.dp)) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .clip(RoundedCornerShape(colors.radiusField))
                        .background(tint)
                        .border(1.dp, colors.ink_border, RoundedCornerShape(colors.radiusField)),
                )
                Text(label, color = colors.base_content, modifier = Modifier.padding(top = 4.dp))
            }
        }
    }
}
