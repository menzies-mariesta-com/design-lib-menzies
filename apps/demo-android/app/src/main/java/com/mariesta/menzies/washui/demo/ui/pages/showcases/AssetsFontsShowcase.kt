package com.mariesta.menzies.washui.demo.ui.pages.showcases

import android.content.Context
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.FontDownloadManager
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.useWash
import java.io.File
import kotlinx.coroutines.launch

private data class FontAsset(
    val name: String,
    val role: String,
    val filename: String,
    val sample: String,
)

private val studioFonts = listOf(
    FontAsset("Fraunces", "Display", "Fraunces.ttf", "Menzies Design"),
    FontAsset("Maple Mono", "Monospace", "MapleMono-NF-Regular.ttf", "val tokens = WashTheme.colors"),
)

@Composable
fun AssetsFontsShowcase() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val wash = useWash()
    var downloading by remember { mutableStateOf(false) }
    var progress by remember { mutableFloatStateOf(0f) }
    val colors = WashTheme.colors

    LaunchedEffect(Unit) {
        if (!fontsPresent(context)) {
            downloading = true
            FontDownloadManager.ensureFonts(context) { progress = it }
            downloading = false
        } else {
            progress = 1f
        }
    }

    ShowcaseScrollPage {
        Column(modifier = Modifier.padding(bottom = 4.dp)) {
            Text("Assets", color = colors.ink_muted)
            Text("Fonts", color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(top = 4.dp))
        }
        ShowcaseSection(
            title = "Download",
            description = if (wash.fontsReady) "Ready" else "Downloading…",
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(
                        text = when {
                            downloading -> "Downloading… ${(progress * 100).toInt()}%"
                            wash.fontsReady -> "Ready"
                            else -> "Pending"
                        },
                        color = colors.base_content,
                        fontWeight = FontWeight.Medium,
                    )
                    if (downloading) {
                        CircularProgressIndicator(modifier = Modifier.padding(start = 8.dp))
                    }
                }
                WashButton(
                    onClick = {
                        scope.launch {
                            downloading = true
                            FontDownloadManager.ensureFonts(context) { progress = it }
                            downloading = false
                        }
                    },
                    text = "Download fonts",
                    variant = WashButtonVariant.Outline,
                    loading = downloading,
                    enabled = !downloading,
                )
            }
        }
        studioFonts.forEach { font ->
            ShowcaseSection(title = font.name, description = font.role) {
                val file = fontFile(context, font.filename)
                Text(font.sample, color = colors.base_content, fontWeight = FontWeight.SemiBold)
                Text(
                    text = if (file.exists()) "Cached: ${file.name}" else "Not cached",
                    color = if (file.exists()) colors.success else colors.warning,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }
    }
}

private fun fontsPresent(context: Context): Boolean =
    studioFonts.all { fontFile(context, it.filename).exists() }

private fun fontFile(context: Context, name: String): File {
    val dir = File(context.filesDir, "wash-fonts")
    return File(dir, name)
}
