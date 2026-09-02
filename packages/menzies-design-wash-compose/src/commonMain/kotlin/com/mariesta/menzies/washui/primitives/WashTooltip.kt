package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.layout.Box
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.PlainTooltip
import androidx.compose.material3.Text
import androidx.compose.material3.TooltipBox
import androidx.compose.material3.TooltipDefaults
import androidx.compose.material3.rememberTooltipState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashTheme

enum class WashTooltipSide {
    Top,
    Bottom,
    Left,
    Right,
}

enum class WashTooltipTone {
    Primary,
    Secondary,
    Accent,
    Info,
    Success,
    Warning,
    Error,
    Neutral,
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WashTooltip(
    tip: String,
    modifier: Modifier = Modifier,
    side: WashTooltipSide = WashTooltipSide.Top,
    tone: WashTooltipTone? = null,
    prefer: WashTooltipSide? = null,
    content: @Composable () -> Unit,
) {
    val colors = WashTheme.colors
    val resolvedTone = tone ?: WashTooltipTone.Primary
    val containerColor = tooltipContainer(resolvedTone, colors)
    val contentColor = tooltipContent(resolvedTone, colors)
    val tooltipState = rememberTooltipState()

    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(
            spacingBetweenTooltipAndAnchor = 4.dp,
        ),
        tooltip = {
            PlainTooltip(
                containerColor = containerColor,
                contentColor = contentColor,
            ) {
                Text(tip)
            }
        },
        state = tooltipState,
        modifier = modifier,
    ) {
        Box {
            content()
        }
    }
}

private fun tooltipContainer(
    tone: WashTooltipTone,
    colors: com.mariesta.menzies.washui.theme.WashColorScheme,
): androidx.compose.ui.graphics.Color =
    when (tone) {
        WashTooltipTone.Primary -> colors.primary
        WashTooltipTone.Secondary -> colors.secondary
        WashTooltipTone.Accent -> colors.accent
        WashTooltipTone.Info -> colors.info
        WashTooltipTone.Success -> colors.success
        WashTooltipTone.Warning -> colors.warning
        WashTooltipTone.Error -> colors.error
        WashTooltipTone.Neutral -> colors.neutral
    }

private fun tooltipContent(
    tone: WashTooltipTone,
    colors: com.mariesta.menzies.washui.theme.WashColorScheme,
): androidx.compose.ui.graphics.Color =
    when (tone) {
        WashTooltipTone.Primary -> colors.primary_content
        WashTooltipTone.Secondary -> colors.secondary_content
        WashTooltipTone.Accent -> colors.accent_content
        WashTooltipTone.Info -> colors.info_content
        WashTooltipTone.Success -> colors.success_content
        WashTooltipTone.Warning -> colors.warning_content
        WashTooltipTone.Error -> colors.error_content
        WashTooltipTone.Neutral -> colors.neutral_content
    }
