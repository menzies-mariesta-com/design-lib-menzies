package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.effects.rememberWashRipple
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashDialog
import com.mariesta.menzies.washui.primitives.WashDialogTone
import com.mariesta.menzies.washui.primitives.WashLoading
import com.mariesta.menzies.washui.primitives.WashLoadingSize
import com.mariesta.menzies.washui.primitives.WashLoadingVariant
import com.mariesta.menzies.washui.primitives.WashToastProvider
import com.mariesta.menzies.washui.primitives.WashToastTone
import com.mariesta.menzies.washui.primitives.rememberWashToastState
import com.mariesta.menzies.washui.theme.WashTheme
import kotlinx.coroutines.launch

@Composable
fun AlertShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Semantic alerts",
            description = "Inline banners for status messaging.",
        ) {
            AlertBanner(
                title = "Studio sync complete",
                body = "Pigments saved to your device.",
                background = WashTheme.colors.success,
                content = WashTheme.colors.success_content,
            )
            AlertBanner(
                title = "Low contrast warning",
                body = "Check ink on dark paper before export.",
                background = WashTheme.colors.warning,
                content = WashTheme.colors.warning_content,
                modifier = Modifier.padding(top = 8.dp),
            )
            AlertBanner(
                title = "Export failed",
                body = "Could not write PNG. Try again.",
                background = WashTheme.colors.error,
                content = WashTheme.colors.error_content,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
private fun AlertBanner(
    title: String,
    body: String,
    background: androidx.compose.ui.graphics.Color,
    content: androidx.compose.ui.graphics.Color,
    modifier: Modifier = Modifier,
) {
    val colors = WashTheme.colors
    val shape = RoundedCornerShape(colors.radiusField)
    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(shape)
            .background(background, shape)
            .padding(horizontal = 16.dp, vertical = 12.dp),
    ) {
        Text(text = title, color = content, fontWeight = FontWeight.Bold)
        Text(text = body, color = content, modifier = Modifier.padding(top = 4.dp))
    }
}

@Composable
fun ToastShowcase() {
    WashToastProvider {
        val toast = rememberWashToastState()
        ShowcaseScrollPage {
            ShowcaseSection(
                title = "Toast stack",
                description = "Bottom-right alerts that auto dismiss.",
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    WashButton(
                        onClick = { toast.push("Saved to gallery", WashToastTone.Success) },
                        text = "Success",
                        variant = WashButtonVariant.Success,
                    )
                    WashButton(
                        onClick = { toast.push("Network error", WashToastTone.Error) },
                        text = "Error",
                        variant = WashButtonVariant.Error,
                    )
                }
                Row(
                    modifier = Modifier.padding(top = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    WashButton(
                        onClick = { toast.push("Cache warming", WashToastTone.Info) },
                        text = "Info",
                        variant = WashButtonVariant.Info,
                    )
                    WashButton(
                        onClick = { toast.push("Contrast low", WashToastTone.Warning) },
                        text = "Warning",
                        variant = WashButtonVariant.Warning,
                    )
                }
            }
        }
    }
}

@Composable
fun SnackbarShowcase() {
    val colors = WashTheme.colors
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = {
            SnackbarHost(snackbarHostState) { data ->
                Snackbar(
                    snackbarData = data,
                    containerColor = colors.base_200,
                    contentColor = colors.base_content,
                )
            }
        },
    ) { padding ->
        Column(modifier = Modifier.padding(padding)) {
            ShowcaseScrollPage {
                ShowcaseSection(
                    title = "Snackbar",
                    description = "Transient message anchored to the scaffold.",
                ) {
                    WashButton(
                        onClick = {
                            scope.launch {
                                snackbarHostState.showSnackbar("Pigment applied to canvas")
                            }
                        },
                        text = "Show snackbar",
                    )
                }
            }
        }
    }
}

@Composable
fun DialogShowcase() {
    var open by remember { mutableStateOf(false) }
    var destructiveOpen by remember { mutableStateOf(false) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Modal dialog",
            description = "Paper panel with title and actions.",
        ) {
            WashButton(onClick = { open = true }, text = "Open dialog")
            WashButton(
                onClick = { destructiveOpen = true },
                text = "Delete wash",
                variant = WashButtonVariant.Error,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }

    WashDialog(
        open = open,
        onClose = { open = false },
        title = "Save pigment",
        description = "Apply mineral wash to the current canvas?",
        actions = {
            Row {
                WashButton(onClick = { open = false }, text = "Cancel", variant = WashButtonVariant.Ghost)
                WashButton(onClick = { open = false }, text = "Save", modifier = Modifier.padding(start = 8.dp))
            }
        },
    )
    WashDialog(
        open = destructiveOpen,
        onClose = { destructiveOpen = false },
        title = "Delete layer",
        description = "This cannot be undone.",
        tone = WashDialogTone.Error,
        actions = {
            Row {
                WashButton(onClick = { destructiveOpen = false }, text = "Cancel", variant = WashButtonVariant.Ghost)
                WashButton(
                    onClick = { destructiveOpen = false },
                    text = "Delete",
                    variant = WashButtonVariant.Error,
                    modifier = Modifier.padding(start = 8.dp),
                )
            }
        },
    )
}

@Composable
fun LoadingShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Loading indicators",
            description = "Spinner, dots, and bar variants.",
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                WashLoading(label = "Spinner", variant = WashLoadingVariant.Spinner)
                WashLoading(label = "Dots", variant = WashLoadingVariant.Dots)
                WashLoading(label = "Bars", variant = WashLoadingVariant.Bars)
            }
        }
        ShowcaseSection(
            title = "Sizes",
            description = "Scale loaders for inline and hero states.",
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                WashLoading(label = "Small", size = WashLoadingSize.Sm)
                WashLoading(label = "Medium", size = WashLoadingSize.Md)
                WashLoading(label = "Large", size = WashLoadingSize.Lg)
            }
        }
    }
}

@Composable
fun SkeletonShowcase() {
    val colors = WashTheme.colors
    val transition = rememberInfiniteTransition(label = "skeleton")
    val alpha by transition.animateFloat(
        initialValue = 0.35f,
        targetValue = 0.75f,
        animationSpec = infiniteRepeatable(
            animation = tween(900, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse,
        ),
        label = "skeleton-alpha",
    )
    val shape = RoundedCornerShape(colors.radiusField)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Skeleton placeholders",
            description = "Pulse blocks while content loads.",
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(12.dp)
                    .alpha(alpha)
                    .clip(shape)
                    .background(colors.base_300, shape),
            )
            Box(
                modifier = Modifier
                    .fillMaxWidth(0.7f)
                    .padding(top = 8.dp)
                    .height(12.dp)
                    .alpha(alpha)
                    .clip(shape)
                    .background(colors.base_300, shape),
            )
            Row(
                modifier = Modifier.padding(top = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .alpha(alpha)
                        .clip(shape)
                        .background(colors.base_300, shape),
                )
                Column {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(0.6f)
                            .height(10.dp)
                            .alpha(alpha)
                            .clip(shape)
                            .background(colors.base_300, shape),
                    )
                    Box(
                        modifier = Modifier
                            .padding(top = 6.dp)
                            .fillMaxWidth(0.4f)
                            .height(10.dp)
                            .alpha(alpha)
                            .clip(shape)
                            .background(colors.base_300, shape),
                    )
                }
            }
        }
    }
}

@Composable
fun ProgressShowcase() {
    val colors = WashTheme.colors
    var progress by remember { mutableFloatStateOf(0.35f) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Linear progress",
            description = "Track completion for exports and sync.",
        ) {
            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier.fillMaxWidth(),
                color = colors.primary,
                trackColor = colors.base_300,
            )
            Text(
                text = "${(progress * 100).toInt()}% complete",
                color = colors.ink_muted,
                modifier = Modifier.padding(top = 8.dp),
            )
            WashButton(
                onClick = { progress = ((progress + 0.15f) % 1f) },
                text = "Advance",
                variant = WashButtonVariant.Outline,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
fun RippleShowcase() {
    val colors = WashTheme.colors
    val interaction = remember { MutableInteractionSource() }
    val indication = rememberWashRipple(colors.primary.copy(alpha = 0.25f))
    val shape = RoundedCornerShape(colors.radiusField)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Wash ripple",
            description = "Pigment ripple on press, reduced when motion is limited.",
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(80.dp)
                    .clip(shape)
                    .background(colors.base_200, shape)
                    .clickable(
                        interactionSource = interaction,
                        indication = indication,
                        onClick = {},
                    ),
                contentAlignment = Alignment.Center,
            ) {
                Text(text = "Press for ripple", color = colors.base_content, fontWeight = FontWeight.Medium)
            }
        }
    }
}
