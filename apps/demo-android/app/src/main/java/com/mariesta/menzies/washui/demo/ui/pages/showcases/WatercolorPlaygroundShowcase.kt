package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import com.mariesta.menzies.washui.primitives.WashSlider
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.effects.SplashVariant
import com.mariesta.menzies.washui.effects.WatercolorSplash
import com.mariesta.menzies.washui.effects.rememberWatercolorSplash
import com.mariesta.menzies.washui.theme.WashTheme

private val featuredVariants = listOf(
    SplashVariant.Blob,
    SplashVariant.Splash,
    SplashVariant.Ring,
    SplashVariant.Drip,
    SplashVariant.Burst,
    SplashVariant.Petal,
    SplashVariant.Cloud,
    SplashVariant.Wave,
    SplashVariant.Ripple,
    SplashVariant.Starburst,
    SplashVariant.Bloom,
    SplashVariant.Swirl,
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun WatercolorPlaygroundShowcase() {
    val colors = WashTheme.colors
    var seed by remember { mutableIntStateOf(77) }
    val splashColors = remember(colors) {
        listOf(colors.primary, colors.secondary, colors.accent)
    }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Paint splash gallery"
        ) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                featuredVariants.forEach { variant ->
                    val config = rememberWatercolorSplash(
                        seed = variantSeed(variant),
                        variant = variant,
                        colors = splashColors,
                    )
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.padding(4.dp),
                    ) {
                        Box(
                            modifier = Modifier
                                .size(88.dp)
                                .padding(4.dp),
                            contentAlignment = Alignment.Center,
                        ) {
                            WatercolorSplash(
                                config = config,
                                modifier = Modifier.size(72.dp),
                            )
                        }
                        WashText(
                            text = variant.name,
                            color = colors.base_content,
                            fontWeight = FontWeight.Medium,
                        )
                    }
                }
            }
        }

        ShowcaseSection(
            title = "Interactive seed"
        ) {
            val config = rememberWatercolorSplash(seed = seed, variant = SplashVariant.Blob, colors = splashColors)
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(160.dp),
                    contentAlignment = Alignment.Center,
                ) {
                    WatercolorSplash(config = config, modifier = Modifier.size(140.dp))
                }
                WashText("Seed: $seed", color = colors.ink_muted)
                WashSlider(
                    value = seed.toFloat(),
                    onValueChange = { seed = it.toInt() },
                    valueRange = 1f..999f,
                )
            }
        }
    }
}

private fun variantSeed(variant: SplashVariant): Int {
    var hash = 0
    variant.name.forEach { ch ->
        hash = (hash * 31 + ch.code) and 0x7FFFFFFF
    }
    return 200 + (hash % 9000)
}
