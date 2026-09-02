package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.theme.WashTheme

data class WashSelectOption(
    val value: String,
    val label: String,
    val disabled: Boolean = false,
)

@Composable
fun WashSelect(
    value: String,
    onValueChange: (String) -> Unit,
    options: List<WashSelectOption>,
    modifier: Modifier = Modifier,
    label: String? = null,
    hint: String? = null,
    enabled: Boolean = true,
) {
    val colors = WashTheme.colors
    var expanded by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(colors.radiusField)
    val selectedLabel = options.firstOrNull { it.value == value }?.label ?: value

    WashFormField(
        label = label,
        hint = hint,
        error = null,
        requiredMark = false,
        modifier = modifier,
    ) {
        Box {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(shape)
                    .background(if (enabled) colors.base_200 else colors.base_200.copy(alpha = 0.5f), shape)
                    .border(BorderStroke(1.dp, colors.ink_border), shape)
                    .clickable(enabled = enabled) { expanded = true }
                    .padding(horizontal = 12.dp, vertical = 12.dp),
            ) {
                Text(
                    text = selectedLabel,
                    color = if (enabled) colors.base_content else colors.base_content.copy(alpha = 0.5f),
                )
            }
            DropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false },
                modifier = Modifier
                    .background(colors.base_100)
                    .border(BorderStroke(1.dp, colors.ink_border), RoundedCornerShape(colors.radiusField)),
            ) {
                options.forEach { option ->
                    DropdownMenuItem(
                        text = {
                            Text(
                                text = option.label,
                                color = colors.base_content,
                            )
                        },
                        enabled = !option.disabled,
                        onClick = {
                            onValueChange(option.value)
                            expanded = false
                        },
                    )
                }
            }
        }
    }
}
