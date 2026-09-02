package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.effects.washPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun WashPanel(
    modifier: Modifier = Modifier,
    content: @Composable BoxScope.() -> Unit,
) {
    val colors = WashTheme.colors
    Box(
        modifier = modifier
            .fillMaxWidth()
            .washPanel()
            .border(1.dp, colors.ink_border, RoundedCornerShape(colors.radiusBox))
            .padding(16.dp),
        content = content,
    )
}
