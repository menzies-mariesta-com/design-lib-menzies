package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashTheme

/**
 * Minimal Wash app shell: optional top bar stacked over scrollable content.
 * Replaces Material3 Scaffold for gallery chrome without Material layout slots.
 */
@Composable
fun WashScaffold(
    modifier: Modifier = Modifier,
    topBar: @Composable (() -> Unit)? = null,
    contentPadding: PaddingValues = PaddingValues(0.dp),
    content: @Composable (PaddingValues) -> Unit,
) {
    val colors = WashTheme.colors
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(colors.base_100),
    ) {
        topBar?.invoke()
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxSize()
                .padding(contentPadding),
        ) {
            content(contentPadding)
        }
    }
}
