package com.mariesta.menzies.washui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashMode
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog
import com.mariesta.menzies.washui.useWash

@Composable
fun WashThemeSwitcher(modifier: Modifier = Modifier) {
    val wash = useWash()
    Column(modifier = modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Pigment", color = WashTheme.colors.base_content)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            washPigmentCatalog.take(6).forEach { meta ->
                FilterChip(
                    selected = wash.pigment == meta.id,
                    onClick = { wash.setPigment(meta.id) },
                    label = { Text(meta.label) },
                )
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
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
}
