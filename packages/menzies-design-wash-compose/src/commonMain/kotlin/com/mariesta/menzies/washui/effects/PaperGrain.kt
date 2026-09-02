package com.mariesta.menzies.washui.effects

import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Color
import com.mariesta.menzies.washui.theme.WashTheme
import kotlin.random.Random

fun Modifier.paperGrain(
    enabled: Boolean = true,
    opacity: Float = 0.08f,
): Modifier = composed {
    if (!enabled) return@composed this
    val grain = WashTheme.colors.pigment_grain
    drawWithContent {
        drawContent()
        val step = 4f
        var y = 0f
        val random = Random(42)
        while (y < size.height) {
            var x = 0f
            while (x < size.width) {
                if (random.nextFloat() > 0.65f) {
                    drawCircle(
                        color = grain.copy(alpha = opacity * random.nextFloat()),
                        radius = 0.6f + random.nextFloat(),
                        center = Offset(x, y),
                        blendMode = BlendMode.Multiply,
                    )
                }
                x += step
            }
            y += step
        }
    }
}

fun Modifier.washPanel(): Modifier = composed {
    val colors = WashTheme.colors
    drawWithContent {
        drawRect(colors.wash_panel_bg)
        drawContent()
        val grain = colors.pigment_grain
        val step = 4f
        var y = 0f
        val random = Random(7)
        while (y < size.height) {
            var x = 0f
            while (x < size.width) {
                if (random.nextFloat() > 0.7f) {
                    drawCircle(
                        color = grain.copy(alpha = 0.06f),
                        radius = 0.8f,
                        center = Offset(x, y),
                        blendMode = BlendMode.Multiply,
                    )
                }
                x += step
            }
            y += step
        }
    }
}
