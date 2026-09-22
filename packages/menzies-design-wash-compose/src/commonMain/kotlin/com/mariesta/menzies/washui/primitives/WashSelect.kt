package com.mariesta.menzies.washui.primitives

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Popup
import androidx.compose.ui.window.PopupProperties
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.icons.lucide.Check
import com.mariesta.menzies.washui.icons.lucide.ChevronDown
import com.mariesta.menzies.washui.theme.WashTheme

data class WashSelectOption(
    val value: String,
    val label: String,
    val disabled: Boolean = false,
)

/**
 * Wash select: field trigger + custom popup list (not a platform native picker).
 * Matches React Select / SearchSelect: outside-dismiss popup, check on active row.
 * Popup width matches the trigger (BoxWithConstraints); does not expand layout.
 */
@Composable
fun WashSelect(
    value: String,
    onValueChange: (String) -> Unit,
    options: List<WashSelectOption>,
    modifier: Modifier = Modifier,
    label: String? = null,
    hint: String? = null,
    enabled: Boolean = true,
    placeholder: String = "Choose…",
) {
    val colors = WashTheme.colors
    var expanded by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(colors.radiusField)
    val selected = options.firstOrNull { it.value == value }
    val selectedLabel = selected?.label
    val scroll = rememberScrollState()

    WashFormField(
        label = label,
        hint = hint,
        error = null,
        requiredMark = false,
        modifier = modifier,
    ) {
        BoxWithConstraints {
            val menuWidth = maxWidth
            Box {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(shape)
                    .background(
                        if (enabled) colors.base_200 else colors.base_200.copy(alpha = 0.5f),
                        shape,
                    )
                    .border(BorderStroke(1.dp, colors.ink_border), shape)
                    .clickable(enabled = enabled) { expanded = !expanded }
                    .padding(horizontal = 12.dp, vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                WashText(
                    text = selectedLabel ?: placeholder,
                    color = when {
                        !enabled -> colors.base_content.copy(alpha = 0.5f)
                        selectedLabel == null -> colors.base_content.copy(alpha = 0.5f)
                        else -> colors.base_content
                    },
                    modifier = Modifier.weight(1f),
                )
                WashIcon(
                    imageVector = LucideIcons.ChevronDown,
                    contentDescription = null,
                    tint = colors.base_content.copy(alpha = if (enabled) 0.6f else 0.4f),
                    size = 16.dp,
                )
            }
            if (expanded) {
                Popup(
                    onDismissRequest = { expanded = false },
                    properties = PopupProperties(focusable = true),
                ) {
                    Column(
                        modifier = Modifier
                            .padding(top = 4.dp)
                            .width(menuWidth)
                            .heightIn(max = 280.dp)
                            .shadow(6.dp, shape)
                            .clip(shape)
                            .background(colors.base_100, shape)
                            .border(BorderStroke(1.dp, colors.ink_border), shape)
                            .verticalScroll(scroll)
                            .padding(vertical = 6.dp),
                    ) {
                        options.forEach { option ->
                            val active = option.value == value
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable(enabled = !option.disabled) {
                                        onValueChange(option.value)
                                        expanded = false
                                    }
                                    .background(
                                        if (active) {
                                            colors.primary.copy(alpha = 0.12f)
                                        } else {
                                            colors.base_100
                                        },
                                    )
                                    .padding(horizontal = 14.dp, vertical = 10.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                WashText(
                                    text = option.label,
                                    color = if (option.disabled) {
                                        colors.base_content.copy(alpha = 0.4f)
                                    } else {
                                        colors.base_content
                                    },
                                    modifier = Modifier.weight(1f),
                                )
                                if (active) {
                                    WashIcon(
                                        imageVector = LucideIcons.Check,
                                        contentDescription = null,
                                        tint = colors.primary,
                                        size = 16.dp,
                                    )
                                }
                            }
                        }
                    }
                }
            }
            }
        }
    }
}
