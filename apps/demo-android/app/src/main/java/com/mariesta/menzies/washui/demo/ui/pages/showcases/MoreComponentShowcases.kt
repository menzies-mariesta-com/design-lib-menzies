package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mariesta.menzies.washui.components.WashAccordion
import com.mariesta.menzies.washui.components.WashAccordionItem
import com.mariesta.menzies.washui.demo.ui.WashAppLogo
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.icons.lucide.Calendar
import com.mariesta.menzies.washui.icons.lucide.Check
import com.mariesta.menzies.washui.icons.lucide.ChevronRight
import com.mariesta.menzies.washui.icons.lucide.CircleFadingPlus
import com.mariesta.menzies.washui.icons.lucide.FileUp
import com.mariesta.menzies.washui.icons.lucide.Link
import com.mariesta.menzies.washui.icons.lucide.Menu
import com.mariesta.menzies.washui.icons.lucide.Plus
import com.mariesta.menzies.washui.icons.lucide.Search
import com.mariesta.menzies.washui.icons.lucide.UserRound
import com.mariesta.menzies.washui.icons.lucide.X
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonSize
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashChip
import com.mariesta.menzies.washui.primitives.WashDivider
import com.mariesta.menzies.washui.primitives.WashDropdownMenu
import com.mariesta.menzies.washui.primitives.WashIconButton
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashText
import com.mariesta.menzies.washui.primitives.WashTooltip
import com.mariesta.menzies.washui.primitives.WashTooltipSide
import com.mariesta.menzies.washui.primitives.WashTopBar
import com.mariesta.menzies.washui.theme.WashTheme
import kotlinx.coroutines.delay
import kotlin.math.min

@Composable
fun AppBarShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "App bar") {
            WashTopBar(
                title = "Studio desk",
                subtitle = "App bar",
                navigationIcon = {
                    WashIconButton(
                        onClick = {},
                        imageVector = LucideIcons.Menu,
                        contentDescription = "Menu",
                    )
                },
                brand = { WashAppLogo(size = 26.dp) },
                actions = {
                    WashIconButton(
                        onClick = {},
                        imageVector = LucideIcons.Search,
                        contentDescription = "Search",
                    )
                },
            )
        }
    }
}

@Composable
fun AspectRatioShowcase() {
    val colors = WashTheme.colors
    val shape = RoundedCornerShape(colors.radiusBox)
    ShowcaseScrollPage {
        ShowcaseSection(title = "Aspect ratio") {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(16f / 9f)
                    .clip(shape)
                    .background(colors.wash_a.copy(alpha = 0.45f), shape)
                    .padding(12.dp),
            ) {
                WashText("16:9 wash plate", color = colors.base_content, fontWeight = FontWeight.SemiBold)
            }
            Box(
                modifier = Modifier
                    .padding(top = 12.dp)
                    .fillMaxWidth(0.5f)
                    .aspectRatio(1f)
                    .clip(shape)
                    .background(colors.wash_b.copy(alpha = 0.45f), shape)
                    .padding(12.dp),
            ) {
                WashText("1:1", color = colors.base_content)
            }
        }
    }
}

@Composable
fun AuraShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Aura") {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
                    .clip(RoundedCornerShape(colors.radiusBox))
                    .background(
                        Brush.radialGradient(
                            colors = listOf(
                                colors.primary.copy(alpha = 0.35f),
                                colors.secondary.copy(alpha = 0.18f),
                                colors.base_200,
                            ),
                        ),
                    )
                    .padding(16.dp),
                contentAlignment = Alignment.Center,
            ) {
                WashText("Soft pigment aura", color = colors.base_content, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun AutocompleteShowcase() {
    var query by remember { mutableStateOf("") }
    val options = listOf("Cerulean", "Ochre", "Madder", "Indigo", "Viridian", "Umber")
    val filtered = options.filter { it.contains(query, ignoreCase = true) }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Autocomplete") {
            WashInput(
                value = query,
                onValueChange = { query = it },
                label = "Pigment",
                placeholder = "Start typing…",
            )
            filtered.take(4).forEach { item ->
                WashText(
                    text = item,
                    color = WashTheme.colors.base_content,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { query = item }
                        .padding(vertical = 8.dp),
                )
            }
        }
    }
}

@Composable
fun AvatarShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Avatar") {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(colors.primary),
                    contentAlignment = Alignment.Center,
                ) {
                    WashIcon(LucideIcons.UserRound, contentDescription = null, tint = colors.primary_content, size = 24.dp)
                }
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(colors.secondary),
                    contentAlignment = Alignment.Center,
                ) {
                    WashText("ZA", color = colors.secondary_content, fontWeight = FontWeight.Bold)
                }
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .border(2.dp, colors.accent, CircleShape)
                        .background(colors.base_200),
                    contentAlignment = Alignment.Center,
                ) {
                    WashText("MW", color = colors.accent, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun BadgeShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Badge") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(
                    colors.primary to colors.primary_content,
                    colors.secondary to colors.secondary_content,
                    colors.success to colors.success_content,
                    colors.error to colors.error_content,
                ).forEach { (bg, fg) ->
                    WashText(
                        text = "Badge",
                        color = fg,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier
                            .clip(RoundedCornerShape(999.dp))
                            .background(bg)
                            .padding(horizontal = 10.dp, vertical = 4.dp),
                    )
                }
            }
        }
    }
}

@Composable
fun CalendarShowcase() {
    val colors = WashTheme.colors
    val days = (1..28).toList()
    ShowcaseScrollPage {
        ShowcaseSection(title = "Calendar") {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                WashIcon(LucideIcons.Calendar, contentDescription = null, tint = colors.primary, size = 20.dp)
                WashText("September 2026", color = colors.base_content, fontWeight = FontWeight.SemiBold)
            }
            Column(modifier = Modifier.padding(top = 12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                days.chunked(7).forEach { week ->
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        week.forEach { day ->
                            val selected = day == 4
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .aspectRatio(1f)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (selected) colors.primary else colors.base_200),
                                contentAlignment = Alignment.Center,
                            ) {
                                WashText(
                                    "$day",
                                    color = if (selected) colors.primary_content else colors.base_content,
                                    fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal,
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun CarouselShowcase() {
    val colors = WashTheme.colors
    val slides = listOf(colors.wash_a, colors.wash_b, colors.wash_c)
    ShowcaseScrollPage {
        ShowcaseSection(title = "Carousel") {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                slides.forEachIndexed { index, color ->
                    Box(
                        modifier = Modifier
                            .width(220.dp)
                            .height(120.dp)
                            .clip(RoundedCornerShape(colors.radiusBox))
                            .background(color.copy(alpha = 0.55f))
                            .padding(12.dp),
                    ) {
                        WashText("Slide ${index + 1}", color = colors.base_content, fontWeight = FontWeight.SemiBold)
                    }
                }
            }
        }
    }
}

@Composable
fun ChatShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Chat bubble") {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                ChatBubble("Need a cooler wash on the sky?", mine = false)
                ChatBubble("Trying cerulean with more water.", mine = true)
                ChatBubble("Ship it.", mine = false)
            }
        }
    }
}

@Composable
private fun ChatBubble(text: String, mine: Boolean) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (mine) Arrangement.End else Arrangement.Start,
    ) {
        WashText(
            text = text,
            color = if (mine) colors.primary_content else colors.base_content,
            modifier = Modifier
                .clip(RoundedCornerShape(16.dp))
                .background(if (mine) colors.primary else colors.base_200)
                .padding(horizontal = 12.dp, vertical = 8.dp),
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ChipShowcase() {
    var selected by remember { mutableStateOf("Cerulean") }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Chip") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("Cerulean", "Ochre", "Madder", "Indigo").forEach { label ->
                    WashChip(
                        selected = selected == label,
                        onClick = { selected = label },
                        label = label,
                    )
                }
            }
        }
    }
}

@Composable
fun CollapseShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Collapse") {
            WashAccordion {
                WashAccordionItem(title = "Wash layers", defaultOpen = true) {
                    WashText("Underpainting, glaze, and dry brush.", color = WashTheme.colors.ink_muted)
                }
                WashAccordionItem(title = "Paper stock") {
                    WashText("Cold press 300gsm.", color = WashTheme.colors.ink_muted)
                }
            }
        }
    }
}

@Composable
fun ColorPickerShowcase() {
    var hue by remember { mutableFloatStateOf(0.55f) }
    val colors = WashTheme.colors
    val picked = Color.hsv(hue * 360f, 0.65f, 0.85f)
    ShowcaseScrollPage {
        ShowcaseSection(title = "Color picker") {
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(RoundedCornerShape(colors.radiusField))
                    .background(picked)
                    .border(1.dp, colors.ink_border, RoundedCornerShape(colors.radiusField)),
            ) {}
            Row(
                modifier = Modifier
                    .padding(top = 12.dp)
                    .fillMaxWidth()
                    .height(28.dp)
                    .clip(RoundedCornerShape(999.dp))
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color.Red, Color.Yellow, Color.Green, Color.Cyan, Color.Blue, Color.Magenta, Color.Red),
                        ),
                    )
                    .clickable {
                        hue = ((hue + 0.08f) % 1f)
                    },
            ) {}
            WashText("Tap the spectrum to cycle hue", color = colors.ink_muted, modifier = Modifier.padding(top = 8.dp))
        }
    }
}

@Composable
fun ContextMenuShowcase() {
    var open by remember { mutableStateOf(false) }
    var chosen by remember { mutableStateOf("Long-press or open menu") }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Context menu") {
            Box {
                WashButton(onClick = { open = true }, text = "Open actions")
                WashDropdownMenu(
                    open = open,
                    onDismiss = { open = false },
                    items = listOf("Duplicate", "Archive", "Delete"),
                    onItemClick = { chosen = it },
                )
            }
            WashText(chosen, color = WashTheme.colors.ink_muted, modifier = Modifier.padding(top = 8.dp))
        }
    }
}

@Composable
fun CountdownShowcase() {
    var seconds by remember { mutableIntStateOf(12) }
    LaunchedEffect(Unit) {
        while (seconds > 0) {
            delay(1000)
            seconds -= 1
        }
    }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Countdown") {
            WashText(
                text = "%02d".format(seconds),
                color = WashTheme.colors.primary,
                fontWeight = FontWeight.Bold,
                fontSize = 42.sp,
            )
            WashText("Seconds remaining", color = WashTheme.colors.ink_muted)
        }
    }
}

@Composable
fun DateTimeShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Date and time") {
            WashInput(value = "2026-09-04", onValueChange = {}, label = "Date", enabled = false)
            WashInput(
                value = "10:15",
                onValueChange = {},
                label = "Time",
                enabled = false,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
fun DiffShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Diff") {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                WashText(
                    "- cold wash",
                    color = colors.error_content,
                    modifier = Modifier
                        .weight(1f)
                        .background(colors.error.copy(alpha = 0.85f), RoundedCornerShape(8.dp))
                        .padding(10.dp),
                )
                WashText(
                    "+ warm glaze",
                    color = colors.success_content,
                    modifier = Modifier
                        .weight(1f)
                        .background(colors.success.copy(alpha = 0.85f), RoundedCornerShape(8.dp))
                        .padding(10.dp),
                )
            }
        }
    }
}

@Composable
fun DockShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Dock") {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(colors.base_200)
                    .padding(10.dp),
                horizontalArrangement = Arrangement.SpaceEvenly,
            ) {
                listOf("Home", "Wash", "Docs", "More").forEach { label ->
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(colors.primary.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center,
                        ) {
                            WashIcon(LucideIcons.Menu, contentDescription = label, tint = colors.primary, size = 18.dp)
                        }
                        WashText(label, color = colors.ink_muted, fontSize = 11.sp)
                    }
                }
            }
        }
    }
}

@Composable
fun FabShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "FAB") {
            Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.CenterEnd) {
                WashIconButton(
                    onClick = {},
                    imageVector = LucideIcons.CircleFadingPlus,
                    contentDescription = "Add wash",
                    tint = WashTheme.colors.primary,
                    buttonSize = 56.dp,
                    iconSize = 28.dp,
                )
            }
            WashButton(
                onClick = {},
                text = "New plate",
                variant = WashButtonVariant.Primary,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
fun FieldsetShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Fieldset") {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, WashTheme.colors.ink_border, RoundedCornerShape(WashTheme.colors.radiusBox))
                    .padding(12.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                WashText("Plate metadata", color = WashTheme.colors.primary, fontWeight = FontWeight.Bold)
                WashInput(value = "Coastal study", onValueChange = {}, label = "Title")
                WashInput(value = "Cerulean", onValueChange = {}, label = "Pigment")
            }
        }
    }
}

@Composable
fun FileInputShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "File input") {
            WashButton(
                onClick = {},
                text = "Choose file",
                variant = WashButtonVariant.Outline,
            )
            Row(
                modifier = Modifier.padding(top = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                WashIcon(LucideIcons.FileUp, contentDescription = null, tint = WashTheme.colors.ink_muted, size = 18.dp)
                WashText("plate-scan.png", color = WashTheme.colors.ink_muted)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun FilterShowcase() {
    var selected by remember { mutableStateOf(setOf("Draft")) }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Filter") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("Draft", "In wash", "Review", "Archived").forEach { label ->
                    WashChip(
                        selected = label in selected,
                        onClick = {
                            selected = if (label in selected) selected - label else selected + label
                        },
                        label = label,
                    )
                }
            }
        }
    }
}

@Composable
fun FloatingPanelShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Floating panel") {
            Box(modifier = Modifier.fillMaxWidth().height(160.dp)) {
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .width(180.dp)
                        .clip(RoundedCornerShape(colors.radiusBox))
                        .background(colors.base_100)
                        .border(1.dp, colors.ink_border, RoundedCornerShape(colors.radiusBox))
                        .padding(12.dp),
                ) {
                    Column {
                        WashText("Inspector", color = colors.primary, fontWeight = FontWeight.Bold)
                        WashText("Opacity 72%", color = colors.ink_muted, modifier = Modifier.padding(top = 6.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun FooterShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Footer") {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(WashTheme.colors.base_200, RoundedCornerShape(WashTheme.colors.radiusBox))
                    .padding(16.dp),
            ) {
                WashText("Menzies Design", color = WashTheme.colors.base_content, fontWeight = FontWeight.Bold)
                WashText("Wash UI · Compose", color = WashTheme.colors.ink_muted, modifier = Modifier.padding(top = 4.dp))
                WashDivider(modifier = Modifier.padding(vertical = 10.dp))
                WashText("© 2026 Mariesta", color = WashTheme.colors.ink_muted)
            }
        }
    }
}

@Composable
fun HeroShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Hero") {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(colors.radiusBox))
                    .background(
                        Brush.verticalGradient(
                            listOf(colors.wash_a.copy(alpha = 0.5f), colors.base_200),
                        ),
                    )
                    .padding(20.dp),
            ) {
                WashText("Wash UI", color = colors.primary, fontWeight = FontWeight.Black, fontSize = 28.sp)
                WashText(
                    "Paper-first components for Compose.",
                    color = colors.base_content,
                    modifier = Modifier.padding(top = 8.dp, bottom = 12.dp),
                )
                WashButton(onClick = {}, text = "Explore", variant = WashButtonVariant.Primary)
            }
        }
    }
}

@Composable
fun Hover3dShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Hover 3D") {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .rotate(-2f)
                    .clip(RoundedCornerShape(WashTheme.colors.radiusBox))
                    .background(WashTheme.colors.wash_b.copy(alpha = 0.5f))
                    .padding(16.dp),
            ) {
                WashText("Tilted wash card", color = WashTheme.colors.base_content, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
fun HoverGalleryShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Hover gallery") {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf(colors.wash_a, colors.wash_b, colors.wash_c).forEachIndexed { index, color ->
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(96.dp)
                            .clip(RoundedCornerShape(colors.radiusField))
                            .background(color.copy(alpha = 0.5f))
                            .padding(8.dp),
                    ) {
                        WashText("Plate ${index + 1}", color = colors.base_content)
                    }
                }
            }
        }
    }
}

@Composable
fun IndicatorShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Indicator") {
            Box {
                WashButton(onClick = {}, text = "Inbox")
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .offset(x = 4.dp, y = (-4).dp)
                        .size(12.dp)
                        .clip(CircleShape)
                        .background(WashTheme.colors.error),
                )
            }
        }
    }
}

@Composable
fun KbdShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Kbd") {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("⌘", "K", "Esc").forEach { key ->
                    WashText(
                        text = key,
                        fontFamily = FontFamily.Monospace,
                        color = WashTheme.colors.base_content,
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(WashTheme.colors.base_200)
                            .border(1.dp, WashTheme.colors.ink_border, RoundedCornerShape(6.dp))
                            .padding(horizontal = 10.dp, vertical = 6.dp),
                    )
                }
            }
        }
    }
}

@Composable
fun LabelShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Label") {
            WashInput(value = "", onValueChange = {}, label = "Plate name", requiredMark = true, placeholder = "Required")
            WashInput(
                value = "",
                onValueChange = {},
                label = "Notes",
                hint = "Optional",
                modifier = Modifier.padding(top = 12.dp),
            )
        }
    }
}

@Composable
fun LinksShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Links") {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                WashIcon(LucideIcons.Link, contentDescription = null, tint = WashTheme.colors.primary, size = 16.dp)
                WashButton(onClick = {}, text = "Open docs", variant = WashButtonVariant.Link)
            }
            WashButton(onClick = {}, text = "Secondary link", variant = WashButtonVariant.Link, modifier = Modifier.padding(top = 4.dp))
        }
    }
}

@Composable
fun MaskShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Mask") {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(modifier = Modifier.size(64.dp).clip(CircleShape).background(colors.primary)) {}
                Box(modifier = Modifier.size(64.dp).clip(RoundedCornerShape(16.dp)).background(colors.secondary)) {}
                Box(modifier = Modifier.size(64.dp).clip(RoundedCornerShape(percent = 50)).background(colors.accent)) {}
            }
        }
    }
}

@Composable
fun MarqueeShowcase() {
    val infinite = rememberInfiniteTransition(label = "marquee")
    val offset by infinite.animateFloat(
        initialValue = 0f,
        targetValue = -200f,
        animationSpec = infiniteRepeatable(tween(4000, easing = LinearEasing), RepeatMode.Restart),
        label = "offset",
    )
    ShowcaseScrollPage {
        ShowcaseSection(title = "Marquee") {
            Box(modifier = Modifier.fillMaxWidth().height(36.dp).clip(RoundedCornerShape(8.dp)).background(WashTheme.colors.base_200)) {
                WashText(
                    "Cerulean · Ochre · Madder · Indigo · Viridian · ",
                    color = WashTheme.colors.base_content,
                    modifier = Modifier.offset(x = offset.dp).padding(vertical = 8.dp),
                )
            }
        }
    }
}

@Composable
fun MegamenuShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Megamenu") {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, WashTheme.colors.ink_border, RoundedCornerShape(WashTheme.colors.radiusBox))
                    .padding(12.dp),
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    listOf(
                        listOf("Buttons", "Inputs", "Feedback"),
                        listOf("Layout", "Navigation", "Data"),
                        listOf("Charts", "Theme", "Effects"),
                    ).forEach { col ->
                        Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            col.forEach { WashText(it, color = WashTheme.colors.base_content) }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun MockupShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Mockup") {
            Box(
                modifier = Modifier
                    .width(160.dp)
                    .height(280.dp)
                    .clip(RoundedCornerShape(28.dp))
                    .border(3.dp, colors.ink_border, RoundedCornerShape(28.dp))
                    .background(colors.base_100)
                    .padding(12.dp),
            ) {
                Column {
                    Box(
                        modifier = Modifier
                            .align(Alignment.CenterHorizontally)
                            .width(48.dp)
                            .height(6.dp)
                            .clip(RoundedCornerShape(999.dp))
                            .background(colors.ink_border),
                    )
                    WashText("Phone mockup", color = colors.base_content, modifier = Modifier.padding(top = 16.dp))
                }
            }
        }
    }
}

@Composable
fun OrgChartShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Org chart") {
            Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                OrgNode("Studio lead")
                Box(
                    modifier = Modifier
                        .padding(vertical = 4.dp)
                        .width(2.dp)
                        .height(16.dp)
                        .background(WashTheme.colors.ink_border),
                )
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    OrgNode("Wash")
                    OrgNode("Docs")
                    OrgNode("Charts")
                }
            }
        }
    }
}

@Composable
private fun OrgNode(label: String) {
    WashText(
        label,
        color = WashTheme.colors.base_content,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(WashTheme.colors.base_200)
            .border(1.dp, WashTheme.colors.ink_border, RoundedCornerShape(8.dp))
            .padding(horizontal = 12.dp, vertical = 8.dp),
    )
}

@Composable
fun QrcodeShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "QR code") {
            Canvas(modifier = Modifier.size(160.dp).background(colors.base_100)) {
                val cells = 11
                val cell = size.minDimension / cells
                for (row in 0 until cells) {
                    for (col in 0 until cells) {
                        val on = ((row * 3 + col * 5) % 4) != 0 || row < 3 || col < 3 || row > cells - 4 || col > cells - 4
                        if (on) {
                            drawRect(
                                color = colors.base_content,
                                topLeft = Offset(col * cell, row * cell),
                                size = Size(cell - 1f, cell - 1f),
                            )
                        }
                    }
                }
            }
            WashText("Demo pattern (not scannable)", color = colors.ink_muted, modifier = Modifier.padding(top = 8.dp))
        }
    }
}

@Composable
fun RadialProgressShowcase() {
    val colors = WashTheme.colors
    val progress = 0.72f
    ShowcaseScrollPage {
        ShowcaseSection(title = "Radial progress") {
            Box(contentAlignment = Alignment.Center, modifier = Modifier.size(120.dp)) {
                Canvas(modifier = Modifier.size(120.dp)) {
                    val stroke = 12f
                    val radius = min(size.width, size.height) / 2f - stroke
                    drawCircle(color = colors.ink_border.copy(alpha = 0.4f), radius = radius, style = Stroke(stroke))
                    drawArc(
                        color = colors.primary,
                        startAngle = -90f,
                        sweepAngle = 360f * progress,
                        useCenter = false,
                        style = Stroke(width = stroke),
                        topLeft = Offset(stroke, stroke),
                        size = Size(size.width - stroke * 2, size.height - stroke * 2),
                    )
                }
                WashText("72%", color = colors.base_content, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun SelectSearchShowcase() {
    var query by remember { mutableStateOf("") }
    var selected by remember { mutableStateOf<String?>(null) }
    val options = listOf("Cerulean", "Ochre", "Madder", "Indigo", "Viridian")
        .filter { it.contains(query, ignoreCase = true) }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Select search") {
            WashInput(value = query, onValueChange = { query = it }, label = "Search pigments", placeholder = "Filter…")
            options.forEach { option ->
                val active = selected == option
                WashText(
                    option,
                    color = if (active) WashTheme.colors.primary else WashTheme.colors.base_content,
                    fontWeight = if (active) FontWeight.SemiBold else FontWeight.Normal,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { selected = option }
                        .padding(vertical = 8.dp),
                )
            }
        }
    }
}

@Composable
fun StatusShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Status") {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                StatusRow("Online", WashTheme.colors.success)
                StatusRow("Away", WashTheme.colors.warning)
                StatusRow("Offline", WashTheme.colors.ink_muted)
            }
        }
    }
}

@Composable
private fun StatusRow(label: String, color: Color) {
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(color)) {}
        WashText(label, color = WashTheme.colors.base_content)
    }
}

@Composable
fun StepsShowcase() {
    val steps = listOf("Sketch", "Wash", "Glaze", "Review")
    var current by remember { mutableIntStateOf(1) }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Steps") {
            Row(verticalAlignment = Alignment.CenterVertically) {
                steps.forEachIndexed { index, label ->
                    val done = index <= current
                    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.weight(1f)) {
                        Box(
                            modifier = Modifier
                                .size(28.dp)
                                .clip(CircleShape)
                                .background(if (done) WashTheme.colors.primary else WashTheme.colors.base_200),
                            contentAlignment = Alignment.Center,
                        ) {
                            if (done) {
                                WashIcon(LucideIcons.Check, contentDescription = null, tint = WashTheme.colors.primary_content, size = 14.dp)
                            } else {
                                WashText("${index + 1}", color = WashTheme.colors.ink_muted)
                            }
                        }
                        WashText(label, color = WashTheme.colors.ink_muted, fontSize = 11.sp, modifier = Modifier.padding(top = 4.dp))
                    }
                    if (index < steps.lastIndex) {
                        Box(
                            modifier = Modifier
                                .weight(0.4f)
                                .height(2.dp)
                                .background(if (index < current) WashTheme.colors.primary else WashTheme.colors.ink_border),
                        )
                    }
                }
            }
            WashButton(
                onClick = { current = (current + 1).coerceAtMost(steps.lastIndex) },
                text = "Next step",
                modifier = Modifier.padding(top = 12.dp),
                size = WashButtonSize.Sm,
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun TagsInputShowcase() {
    var tags by remember { mutableStateOf(listOf("wash", "paper")) }
    var draft by remember { mutableStateOf("") }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Tags input") {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                tags.forEach { tag ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .clip(RoundedCornerShape(999.dp))
                            .background(WashTheme.colors.primary.copy(alpha = 0.15f))
                            .padding(start = 10.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
                    ) {
                        WashText(tag, color = WashTheme.colors.primary)
                        WashIconButton(
                            onClick = { tags = tags - tag },
                            imageVector = LucideIcons.X,
                            contentDescription = "Remove $tag",
                            buttonSize = 28.dp,
                            iconSize = 14.dp,
                            tint = WashTheme.colors.primary,
                        )
                    }
                }
            }
            Row(
                modifier = Modifier.padding(top = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                WashInput(
                    value = draft,
                    onValueChange = { draft = it },
                    placeholder = "Add tag",
                    modifier = Modifier.weight(1f),
                )
                WashIconButton(
                    onClick = {
                        val next = draft.trim()
                        if (next.isNotEmpty() && next !in tags) {
                            tags = tags + next
                            draft = ""
                        }
                    },
                    imageVector = LucideIcons.Plus,
                    contentDescription = "Add tag",
                    tint = WashTheme.colors.primary,
                )
            }
        }
    }
}

@Composable
fun TextRotateShowcase() {
    val words = listOf("wash", "glaze", "paper", "ink")
    var index by remember { mutableIntStateOf(0) }
    LaunchedEffect(Unit) {
        while (true) {
            delay(1200)
            index = (index + 1) % words.size
        }
    }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Text rotate") {
            Row {
                WashText("Love ", color = WashTheme.colors.base_content, fontWeight = FontWeight.Bold, fontSize = 22.sp)
                WashText(words[index], color = WashTheme.colors.primary, fontWeight = FontWeight.Bold, fontSize = 22.sp)
            }
        }
    }
}

@Composable
fun TimelineShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Timeline") {
            Column(verticalArrangement = Arrangement.spacedBy(0.dp)) {
                listOf(
                    "Sketched plate" to "Sep 1",
                    "First wash" to "Sep 2",
                    "Review pass" to "Sep 4",
                ).forEachIndexed { index, (title, date) ->
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Box(
                                modifier = Modifier
                                    .size(12.dp)
                                    .clip(CircleShape)
                                    .background(WashTheme.colors.primary),
                            )
                            if (index < 2) {
                                Box(
                                    modifier = Modifier
                                        .width(2.dp)
                                        .height(36.dp)
                                        .background(WashTheme.colors.ink_border),
                                )
                            }
                        }
                        Column(modifier = Modifier.padding(bottom = 12.dp)) {
                            WashText(title, color = WashTheme.colors.base_content, fontWeight = FontWeight.SemiBold)
                            WashText(date, color = WashTheme.colors.ink_muted)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TooltipShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(title = "Tooltip") {
            WashText("Long-press the button", color = WashTheme.colors.ink_muted, modifier = Modifier.padding(bottom = 8.dp))
            WashTooltip(tip = "Save pigment", side = WashTooltipSide.Top) {
                WashButton(onClick = {}, text = "Save")
            }
        }
    }
}

@Composable
fun TransferListShowcase() {
    var left by remember { mutableStateOf(listOf("Cerulean", "Ochre", "Madder")) }
    var right by remember { mutableStateOf(listOf("Indigo")) }
    ShowcaseScrollPage {
        ShowcaseSection(title = "Transfer list") {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                TransferColumn("Available", left, Modifier.weight(1f)) { item ->
                    left = left - item
                    right = right + item
                }
                TransferColumn("Selected", right, Modifier.weight(1f)) { item ->
                    right = right - item
                    left = left + item
                }
            }
        }
    }
}

@Composable
private fun TransferColumn(
    title: String,
    items: List<String>,
    modifier: Modifier = Modifier,
    onMove: (String) -> Unit,
) {
    Column(
        modifier = modifier
            .border(1.dp, WashTheme.colors.ink_border, RoundedCornerShape(WashTheme.colors.radiusBox))
            .padding(8.dp),
    ) {
        WashText(title, color = WashTheme.colors.primary, fontWeight = FontWeight.Bold)
        items.forEach { item ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onMove(item) }
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                WashText(item, color = WashTheme.colors.base_content)
                WashIcon(LucideIcons.ChevronRight, contentDescription = null, tint = WashTheme.colors.ink_muted, size = 16.dp)
            }
        }
    }
}

@Composable
fun ValidatorShowcase() {
    var email by remember { mutableStateOf("bad@") }
    val valid = email.contains("@") && email.substringAfter("@").contains(".")
    ShowcaseScrollPage {
        ShowcaseSection(title = "Validator") {
            WashInput(
                value = email,
                onValueChange = { email = it },
                label = "Email",
                error = if (valid) null else "Enter a valid email",
                hint = if (valid) "Looks good" else null,
            )
        }
    }
}

@Composable
fun AssetsImagesShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        ShowcaseSection(title = "Images") {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                WashAppLogo(size = 72.dp)
                Box(
                    modifier = Modifier
                        .size(72.dp)
                        .clip(RoundedCornerShape(colors.radiusBox))
                        .background(colors.wash_a.copy(alpha = 0.5f)),
                    contentAlignment = Alignment.Center,
                ) {
                    WashText("Mark", color = colors.base_content)
                }
            }
            WashText("Brand marks and demo imagery.", color = colors.ink_muted, modifier = Modifier.padding(top = 12.dp))
        }
    }
}
