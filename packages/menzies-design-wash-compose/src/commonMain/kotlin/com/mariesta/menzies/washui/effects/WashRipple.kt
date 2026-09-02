package com.mariesta.menzies.washui.effects

import androidx.compose.material3.ripple
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
expect fun rememberReducedMotion(): Boolean

@Composable
fun rememberWashRipple(color: Color = Color.Unspecified): androidx.compose.foundation.Indication {
    val reduced = rememberReducedMotion()
    val rippleColor = if (color != Color.Unspecified) color else WashTheme.colors.primary.copy(alpha = 0.25f)
    return ripple(
        bounded = true,
        radius = 999.dp,
        color = if (reduced) Color.Transparent else rippleColor,
    )
}

fun Modifier.washRipple(enabled: Boolean = true): Modifier = composed {
    if (!enabled) this else this
}
