package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
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
fun WashCheckbox(
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
        Checkbox(
            checked = checked,
            onCheckedChange = onCheckedChange,
            enabled = enabled,
            modifier = modifier.size(20.dp),
            colors = CheckboxDefaults.colors(
                checkedColor = colors.primary,
                uncheckedColor = colors.ink_border,
                checkmarkColor = colors.primary_content,
                disabledCheckedColor = colors.primary.copy(alpha = 0.4f),
                disabledUncheckedColor = colors.ink_border.copy(alpha = 0.4f),
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
                role = Role.Checkbox,
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
