package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.effects.rememberWashRipple
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun WashToggle(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    val colors = WashTheme.colors
    val interaction = remember { MutableInteractionSource() }
    val indication = if (enabled) rememberWashRipple(colors.primary.copy(alpha = 0.2f)) else null

    val control: @Composable () -> Unit = {
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            enabled = enabled,
            modifier = modifier,
            colors = SwitchDefaults.colors(
                checkedThumbColor = colors.primary_content,
                checkedTrackColor = colors.primary,
                uncheckedThumbColor = colors.base_content,
                uncheckedTrackColor = colors.base_300,
                disabledCheckedThumbColor = colors.primary_content.copy(alpha = 0.6f),
                disabledCheckedTrackColor = colors.primary.copy(alpha = 0.4f),
                disabledUncheckedThumbColor = colors.base_content.copy(alpha = 0.4f),
                disabledUncheckedTrackColor = colors.base_300.copy(alpha = 0.4f),
            ),
        )
    }

    if (label.isNullOrBlank()) {
        control()
        return
    }

    Row(
        modifier = Modifier
            .clickable(
                enabled = enabled,
                role = Role.Switch,
                interactionSource = interaction,
                indication = indication,
                onClick = { onCheckedChange(!checked) },
            ),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        control()
        Text(
            text = label,
            color = if (enabled) colors.base_content else colors.base_content.copy(alpha = 0.6f),
        )
    }
}
