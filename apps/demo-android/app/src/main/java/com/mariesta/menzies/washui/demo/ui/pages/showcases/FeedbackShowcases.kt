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
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.ui.WashAppLogo
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

@Composable
fun AlertShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Semantic alerts"
        ) {
            AlertBanner(
                title = "Sync complete",
                body = "Pigments saved.",
                background = WashTheme.colors.success,
                content = WashTheme.colors.success_content,
            )
            AlertBanner(
                title = "Low contrast",
                body = "Check ink on dark paper.",
                background = WashTheme.colors.warning,
                content = WashTheme.colors.warning_content,
                modifier = Modifier.padding(top = 8.dp),
            )
            AlertBanner(
                title = "Export failed",
                body = "Could not write PNG.",
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
        WashText(text = title, color = content, fontWeight = FontWeight.Bold)
        WashText(text = body, color = content, modifier = Modifier.padding(top = 4.dp))
    }
}

@Composable
fun ToastShowcase() {
    WashToastProvider {
        val toast = rememberWashToastState()
        ShowcaseScrollPage {
            ShowcaseSection(
                title = "Toast stack"
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
    WashToastProvider {
        val toast = rememberWashToastState()
        ShowcaseScrollPage {
            ShowcaseSection(
                title = "Snackbar"
            ) {
                WashButton(
                    onClick = { toast.push("Pigment applied to canvas", WashToastTone.Info) },
                    text = "Show snackbar",
                )
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
            title = "Modal dialog"
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
        description = "Apply mineral wash?",
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
            title = "Loading indicators"
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
            title = "Sizes"
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
        ShowcaseSection(
            title = "Logo soak",
            description = "Same pigment mark as the app launcher icon.",
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                WashAppLogo(size = 64.dp)
                WashText("Wash UI", color = WashTheme.colors.primary, fontWeight = FontWeight.SemiBold)
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
            title = "Skeleton placeholders"
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
            title = "Linear progress"
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(999.dp))
                    .background(colors.base_300),
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(progress)
                        .height(6.dp)
                        .clip(RoundedCornerShape(999.dp))
                        .background(colors.primary),
                )
            }
            WashText(
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
            title = "Wash ripple"
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
                WashText(text = "Press for ripple", color = colors.base_content, fontWeight = FontWeight.Medium)
            }
        }
    }
}
