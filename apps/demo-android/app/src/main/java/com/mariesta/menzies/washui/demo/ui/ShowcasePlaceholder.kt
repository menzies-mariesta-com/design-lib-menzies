package com.mariesta.menzies.washui.demo.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun ShowcasePlaceholder(title: String, modifier: Modifier = Modifier) {
    val colors = WashTheme.colors
    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.TopCenter,
    ) {
        WashPanel(modifier = Modifier.padding(16.dp)) {
            Text(
                text = title,
                color = colors.base_content,
                fontWeight = FontWeight.SemiBold,
            )
            Text(
                text = "Coming soon",
                color = colors.ink_muted,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}
