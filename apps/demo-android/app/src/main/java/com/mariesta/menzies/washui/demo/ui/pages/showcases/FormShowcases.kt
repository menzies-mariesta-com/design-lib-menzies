package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.animation.Crossfade
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.Star
import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.primitives.WashSlider
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.effects.rememberWashRipple
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonSize
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashCheckbox
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashRadio
import com.mariesta.menzies.washui.primitives.WashSelect
import com.mariesta.menzies.washui.primitives.WashSelectOption
import com.mariesta.menzies.washui.primitives.WashTextarea
import com.mariesta.menzies.washui.primitives.WashToggle
import com.mariesta.menzies.washui.theme.WashTheme

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ButtonsShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Semantic colors"
        ) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                WashButton(onClick = {}, text = "Default", variant = WashButtonVariant.Default)
                WashButton(onClick = {}, text = "Primary", variant = WashButtonVariant.Primary)
                WashButton(onClick = {}, text = "Secondary", variant = WashButtonVariant.Secondary)
                WashButton(onClick = {}, text = "Accent", variant = WashButtonVariant.Accent)
                WashButton(onClick = {}, text = "Info", variant = WashButtonVariant.Info)
                WashButton(onClick = {}, text = "Success", variant = WashButtonVariant.Success)
                WashButton(onClick = {}, text = "Warning", variant = WashButtonVariant.Warning)
                WashButton(onClick = {}, text = "Error", variant = WashButtonVariant.Error)
            }
        }
        ShowcaseSection(
            title = "Styles and sizes"
        ) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                WashButton(onClick = {}, text = "Outline", variant = WashButtonVariant.Outline)
                WashButton(onClick = {}, text = "Ghost", variant = WashButtonVariant.Ghost)
                WashButton(onClick = {}, text = "Link", variant = WashButtonVariant.Link)
                WashButton(onClick = {}, text = "Loading", loading = true)
            }
            FlowRow(
                modifier = Modifier.padding(top = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                WashButton(onClick = {}, text = "XS", size = WashButtonSize.Xs)
                WashButton(onClick = {}, text = "SM", size = WashButtonSize.Sm)
                WashButton(onClick = {}, text = "MD", size = WashButtonSize.Md)
                WashButton(onClick = {}, text = "LG", size = WashButtonSize.Lg)
                WashButton(onClick = {}, text = "XL", size = WashButtonSize.Xl)
            }
        }
    }
}

@Composable
fun InputShowcase() {
    var value by remember { mutableStateOf("") }
    var errorValue by remember { mutableStateOf("bad@") }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Text input"
        ) {
            WashInput(
                value = value,
                onValueChange = { value = it },
                label = "Email",
                hint = "Never shared.",
                placeholder = "you@studio.com",
            )
        }
        ShowcaseSection(
            title = "Validation"
        ) {
            WashInput(
                value = errorValue,
                onValueChange = { errorValue = it },
                label = "Email",
                error = "Enter a valid email address.",
                requiredMark = true,
            )
        }
    }
}

@Composable
fun TextareaShowcase() {
    var notes by remember { mutableStateOf("") }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Multiline field"
        ) {
            WashTextarea(
                value = notes,
                onValueChange = { notes = it },
                label = "Studio notes",
                hint = "Goals or layout notes.",
                placeholder = "Notes…",
                minLines = 4,
            )
        }
        ShowcaseSection(
            title = "Compact copy"
        ) {
            WashTextarea(
                value = notes,
                onValueChange = { notes = it },
                label = "Caption",
                placeholder = "One line or two.",
                minLines = 2,
            )
        }
    }
}

@Composable
fun CheckboxShowcase() {
    var checked by remember { mutableStateOf(true) }
    var terms by remember { mutableStateOf(false) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Checkbox states"
        ) {
            WashCheckbox(checked = checked, onCheckedChange = { checked = it }, label = "Remember pigment")
            WashCheckbox(
                checked = terms,
                onCheckedChange = { terms = it },
                label = "Accept studio terms",
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
fun ToggleShowcase() {
    var notifications by remember { mutableStateOf(true) }
    var marketing by remember { mutableStateOf(false) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Toggle switches"
        ) {
            WashToggle(checked = notifications, onCheckedChange = { notifications = it }, label = "Push notifications")
            WashToggle(
                checked = marketing,
                onCheckedChange = { marketing = it },
                label = "Product updates",
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
fun RadioShowcase() {
    var selected by remember { mutableStateOf("light") }
    val options = listOf("light" to "Light paper", "dark" to "Dark paper", "system" to "Follow system")

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Radio group"
        ) {
            options.forEach { (value, label) ->
                WashRadio(
                    selected = selected == value,
                    onClick = { selected = value },
                    label = label,
                    modifier = Modifier.padding(vertical = 4.dp),
                )
            }
        }
    }
}

@Composable
fun SelectShowcase() {
    var pigment by remember { mutableStateOf("mineral") }
    val options = listOf(
        WashSelectOption("mineral", "Mineral"),
        WashSelectOption("rose", "Rose"),
        WashSelectOption("indigo", "Indigo"),
        WashSelectOption("sage", "Sage"),
    )

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Select menu"
        ) {
            WashSelect(
                value = pigment,
                onValueChange = { pigment = it },
                options = options,
                label = "Pigment",
                hint = "Palette family.",
            )
        }
    }
}

@Composable
fun OtpShowcase() {
    val colors = WashTheme.colors
    var digits by remember { mutableStateOf(List(6) { "" }) }
    val shape = RoundedCornerShape(colors.radiusField)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "One-time code"
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth(),
            ) {
                digits.forEachIndexed { index, digit ->
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(shape)
                            .background(colors.base_200, shape)
                            .clickable { },
                        contentAlignment = Alignment.Center,
                    ) {
                        WashText(
                            text = digit.ifBlank { "·" },
                            color = if (digit.isBlank()) colors.ink_muted else colors.base_content,
                            fontWeight = FontWeight.Bold,
                        )
                    }
                }
            }
            WashButton(
                onClick = {
                    digits = listOf("4", "2", "8", "1", "0", "6")
                },
                text = "Fill sample code",
                variant = WashButtonVariant.Outline,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
fun RangeShowcase() {
    val colors = WashTheme.colors
    var volume by remember { mutableFloatStateOf(0.45f) }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Range slider"
        ) {
            WashText(text = "Wash intensity: ${(volume * 100).toInt()}%", color = colors.ink_muted)
            WashSlider(
                value = volume,
                onValueChange = { volume = it },
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
fun RatingShowcase() {
    val colors = WashTheme.colors
    var rating by remember { mutableIntStateOf(3) }
    val interaction = remember { MutableInteractionSource() }
    val indication = rememberWashRipple(colors.primary.copy(alpha = 0.2f))

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Star rating"
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                repeat(5) { index ->
                    val filled = index < rating
                    WashIcon(
                        imageVector = LucideIcons.Star,
                        contentDescription = "Rate ${index + 1}",
                        tint = if (filled) colors.warning else colors.ink_border,
                        modifier = Modifier
                            .size(32.dp)
                            .alpha(if (filled) 1f else 0.35f)
                            .clickable(
                                interactionSource = interaction,
                                indication = indication,
                                role = Role.Button,
                                onClick = { rating = index + 1 },
                            ),
                    )
                }
            }
            WashText(
                text = "$rating of 5 stars",
                color = colors.ink_muted,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
fun SwapShowcase() {
    val colors = WashTheme.colors
    var swapped by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(colors.radiusField)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Swap toggle"
        ) {
            WashToggle(checked = swapped, onCheckedChange = { swapped = it }, label = "Show alternate wash")
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 12.dp)
                    .height(96.dp)
                    .clip(shape)
                    .background(colors.base_200, shape),
                contentAlignment = Alignment.Center,
            ) {
                Crossfade(targetState = swapped, label = "swap") { active ->
                    WashText(
                        text = if (active) "Rose pigment splash" else "Mineral paper wash",
                        color = if (active) colors.secondary else colors.primary,
                        fontWeight = FontWeight.Bold,
                    )
                }
            }
        }
    }
}
