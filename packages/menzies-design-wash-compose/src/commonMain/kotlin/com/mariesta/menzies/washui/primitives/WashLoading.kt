package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashTheme

enum class WashLoadingSize {
    Sm,
    Md,
    Lg,
}

enum class WashLoadingVariant {
    Spinner,
    Dots,
    Ring,
    Ball,
    Bars,
    Infinity,
}

@Composable
fun WashLoading(
    modifier: Modifier = Modifier,
    label: String = "Loading",
    size: WashLoadingSize = WashLoadingSize.Md,
    variant: WashLoadingVariant = WashLoadingVariant.Spinner,
) {
    val colors = WashTheme.colors
    val indicatorSize = when (size) {
        WashLoadingSize.Sm -> 20.dp
        WashLoadingSize.Md -> 28.dp
        WashLoadingSize.Lg -> 40.dp
    }
    val stroke = when (size) {
        WashLoadingSize.Sm -> 2.dp
        WashLoadingSize.Md -> 3.dp
        WashLoadingSize.Lg -> 4.dp
    }

    Box(
        modifier = modifier.semantics { contentDescription = label },
        contentAlignment = Alignment.Center,
    ) {
        when (variant) {
            WashLoadingVariant.Spinner,
            WashLoadingVariant.Ring,
            -> CircularProgressIndicator(
                modifier = Modifier.size(indicatorSize),
                color = colors.primary,
                strokeWidth = stroke,
            )
            WashLoadingVariant.Dots -> LoadingDots(indicatorSize, colors.primary)
            WashLoadingVariant.Ball -> Box(
                modifier = Modifier
                    .size(indicatorSize / 2)
                    .clip(CircleShape),
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(indicatorSize / 2),
                    color = colors.primary,
                    strokeWidth = stroke,
                )
            }
            WashLoadingVariant.Bars -> LinearProgressIndicator(
                modifier = Modifier.size(width = indicatorSize * 2, height = stroke),
                color = colors.primary,
                trackColor = colors.base_300,
            )
            WashLoadingVariant.Infinity -> CircularProgressIndicator(
                modifier = Modifier.size(indicatorSize),
                color = colors.secondary,
                strokeWidth = stroke,
            )
        }
    }
}

@Composable
private fun LoadingDots(size: Dp, color: androidx.compose.ui.graphics.Color) {
    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        repeat(3) {
            Box(
                modifier = Modifier
                    .size(size / 4)
                    .clip(CircleShape),
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(size / 4),
                    color = color,
                    strokeWidth = 1.dp,
                )
            }
        }
    }
}

@Composable
fun WashLoading(
    label: String,
    modifier: Modifier = Modifier,
    size: WashLoadingSize = WashLoadingSize.Md,
    variant: WashLoadingVariant = WashLoadingVariant.Spinner,
    showLabel: Boolean = false,
) {
    val colors = WashTheme.colors
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        WashLoading(label = label, size = size, variant = variant)
        if (showLabel) {
            Text(text = label, color = colors.base_content)
        }
    }
}
