package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import com.mariesta.menzies.washui.primitives.WashDivider
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.components.WashAccordion
import com.mariesta.menzies.washui.components.WashAccordionItem
import com.mariesta.menzies.washui.components.WashCard
import com.mariesta.menzies.washui.components.WashCardTitle
import com.mariesta.menzies.washui.components.WashCardTitleTone
import com.mariesta.menzies.washui.components.WashTab
import com.mariesta.menzies.washui.components.WashTabs
import com.mariesta.menzies.washui.effects.rememberWashRipple
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun CardShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Paper cards"
        ) {
            WashCard {
                WashCardTitle(text = "Studio desk")
            }
            WashCard(modifier = Modifier.padding(top = 12.dp), compact = true) {
                WashCardTitle(text = "Compact card", tone = WashCardTitleTone.Secondary)
            }
        }
    }
}

@Composable
fun BentoShowcase() {
    val colors = WashTheme.colors
    val shape = RoundedCornerShape(colors.radiusBox)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Bento grid"
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Box(
                    modifier = Modifier
                        .weight(1.2f)
                        .fillMaxHeight()
                        .clip(shape)
                        .background(colors.wash_a.copy(alpha = 0.5f), shape)
                        .padding(12.dp),
                ) {
                    WashText("Hero wash", color = colors.base_content, fontWeight = FontWeight.Bold)
                }
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .clip(shape)
                            .background(colors.wash_b.copy(alpha = 0.5f), shape)
                            .padding(8.dp),
                    ) {
                        WashText("Pigment", color = colors.base_content)
                    }
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .clip(shape)
                            .background(colors.wash_c.copy(alpha = 0.5f), shape)
                            .padding(8.dp),
                    ) {
                        WashText("Paper", color = colors.base_content)
                    }
                }
            }
        }
    }
}

@Composable
fun TabsShowcase() {
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Tabbed panels"
        ) {
            WashTabs(defaultValue = "design", boxed = true) {
                WashTab(
                    value = "design",
                    panel = {
                        WashText("Tokens and pigments.", color = colors.ink_muted)
                    },
                ) {
                    WashText("Design", color = colors.base_content)
                }
                WashTab(
                    value = "code",
                    panel = {
                        WashText("Compose snippets.", color = colors.ink_muted)
                    },
                ) {
                    WashText("Code", color = colors.base_content)
                }
                WashTab(
                    value = "preview",
                    panel = {
                        WashText("Live preview.", color = colors.ink_muted)
                    },
                ) {
                    WashText("Preview", color = colors.base_content)
                }
            }
        }
    }
}

@Composable
fun AccordionShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Accordion"
        ) {
            WashAccordion {
                WashAccordionItem(title = "Pigment tokens") {
                    WashText("Primary / secondary / accent slots.", color = WashTheme.colors.ink_muted)
                }
                WashAccordionItem(title = "Paper surfaces") {
                    WashText("base-100 to base-300 depth.", color = WashTheme.colors.ink_muted)
                }
            }
        }
    }
}

@Composable
fun DividerShowcase() {
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Dividers"
        ) {
            WashText(text = "Section one", color = colors.base_content)
            WashDivider(
                modifier = Modifier.padding(vertical = 12.dp),
                color = colors.ink_border,
            )
            WashText(text = "Section two", color = colors.base_content)
            WashDivider(
                modifier = Modifier.padding(vertical = 12.dp),
                color = colors.primary.copy(alpha = 0.4f),
            )
            WashText(text = "Section three", color = colors.base_content)
        }
    }
}

@Composable
fun JoinShowcase() {
    val colors = WashTheme.colors
    var active by remember { mutableStateOf("center") }

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Join group"
        ) {
            Row(modifier = Modifier.fillMaxWidth()) {
                JoinButton(
                    label = "Left",
                    selected = active == "left",
                    onClick = { active = "left" },
                    isStart = true,
                    isEnd = false,
                )
                JoinButton(
                    label = "Center",
                    selected = active == "center",
                    onClick = { active = "center" },
                    isStart = false,
                    isEnd = false,
                )
                JoinButton(
                    label = "Right",
                    selected = active == "right",
                    onClick = { active = "right" },
                    isStart = false,
                    isEnd = true,
                )
            }
            WashText(
                text = "Active: $active",
                color = colors.ink_muted,
                modifier = Modifier.padding(top = 8.dp),
            )
        }
    }
}

@Composable
private fun RowScope.JoinButton(
    label: String,
    selected: Boolean,
    onClick: () -> Unit,
    isStart: Boolean,
    isEnd: Boolean,
) {
    val colors = WashTheme.colors
    val interaction = remember { MutableInteractionSource() }
    val indication = rememberWashRipple(colors.primary.copy(alpha = 0.2f))
    val shape = when {
        isStart && isEnd -> RoundedCornerShape(colors.radiusField)
        isStart -> RoundedCornerShape(topStart = colors.radiusField, bottomStart = colors.radiusField)
        isEnd -> RoundedCornerShape(topEnd = colors.radiusField, bottomEnd = colors.radiusField)
        else -> RoundedCornerShape(0.dp)
    }
    Box(
        modifier = Modifier
            .weight(1f)
            .clip(shape)
            .background(if (selected) colors.primary else colors.base_200, shape)
            .clickable(
                interactionSource = interaction,
                indication = indication,
                onClick = onClick,
            )
            .padding(vertical = 10.dp),
        contentAlignment = Alignment.Center,
    ) {
        WashText(
            text = label,
            color = if (selected) colors.primary_content else colors.base_content,
            fontWeight = FontWeight.Medium,
        )
    }
}

@Composable
fun StatShowcase() {
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Stat figures"
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                StatFigure(title = "Galleries", value = "120+", desc = "Components", modifier = Modifier.weight(1f))
                StatFigure(title = "Themes", value = "24", desc = "Pigments", modifier = Modifier.weight(1f))
            }
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                StatFigure(title = "Templates", value = "9", desc = "Layouts", modifier = Modifier.weight(1f))
                StatFigure(title = "Charts", value = "31", desc = "Variants", modifier = Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun StatFigure(
    title: String,
    value: String,
    desc: String,
    modifier: Modifier = Modifier,
) {
    val colors = WashTheme.colors
    Column(modifier = modifier) {
        WashText(text = title, color = colors.ink_muted)
        WashText(text = value, color = colors.primary, fontWeight = FontWeight.Bold)
        WashText(text = desc, color = colors.ink_muted)
    }
}
