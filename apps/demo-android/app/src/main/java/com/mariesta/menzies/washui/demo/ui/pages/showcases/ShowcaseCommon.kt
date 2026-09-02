package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun ShowcaseScrollPage(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        content = content,
    )
}

@Composable
fun ShowcaseSection(
    title: String,
    description: String? = null,
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit,
) {
    val colors = WashTheme.colors
    WashPanel(modifier = modifier) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = title,
                color = colors.primary,
                fontWeight = FontWeight.Bold,
            )
            if (!description.isNullOrBlank()) {
                Text(
                    text = description,
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 4.dp, bottom = 12.dp),
                )
            } else {
                androidx.compose.foundation.layout.Spacer(modifier = Modifier.padding(bottom = 12.dp))
            }
            content()
        }
    }
}
