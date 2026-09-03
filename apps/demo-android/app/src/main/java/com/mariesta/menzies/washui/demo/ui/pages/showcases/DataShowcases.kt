package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import com.mariesta.menzies.washui.primitives.WashDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

private data class DemoRow(val name: String, val tags: String, val status: String)

private val sampleRows = listOf(
    DemoRow("Coastal fog", "hero, wash", "Published"),
    DemoRow("Mineral dusk", "palette", "Draft"),
    DemoRow("Studio ledger", "data, table", "Published"),
    DemoRow("Ink ripple", "motion", "Review"),
    DemoRow("Ochre bloom", "splash", "Published"),
    DemoRow("Cerulean plate", "docs", "Draft"),
    DemoRow("Paper grain", "texture", "Published"),
    DemoRow("Rose archive", "template", "Review"),
)

@Composable
fun DataTableShowcase() {
    var nameFilter by remember { mutableStateOf("") }
    var page by remember { mutableIntStateOf(1) }
    val pageSize = 4
    val filtered = remember(nameFilter) {
        sampleRows.filter { it.name.contains(nameFilter, ignoreCase = true) }
    }
    val pageCount = (filtered.size + pageSize - 1).coerceAtLeast(1) / pageSize
    val clampedPage = page.coerceIn(1, pageCount.coerceAtLeast(1))
    val slice = filtered.drop((clampedPage - 1) * pageSize).take(pageSize)

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Filtered data table"
        ) {
            DataTableShell(
                nameFilter = nameFilter,
                onNameFilterChange = { nameFilter = it; page = 1 },
                rows = slice,
                globalOffset = (clampedPage - 1) * pageSize,
                page = clampedPage,
                pageCount = pageCount.coerceAtLeast(1),
                onPageChange = { page = it },
            )
        }
    }
}

@Composable
fun TableShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Simple table"
        ) {
            SimpleTable(rows = sampleRows.take(5))
        }
    }
}

@Composable
fun ListShowcase() {
    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Studio list"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                sampleRows.take(6).forEach { row ->
                    WashPanel {
                        Text(row.name, color = WashTheme.colors.base_content, fontWeight = FontWeight.SemiBold)
                        Text(row.tags, color = WashTheme.colors.ink_muted, modifier = Modifier.padding(top = 4.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun PaginationShowcase() {
    var page by remember { mutableIntStateOf(1) }
    val pageCount = 5

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Paginator"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Page $page of $pageCount", color = WashTheme.colors.ink_muted)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    WashButton(
                        onClick = { page = (page - 1).coerceAtLeast(1) },
                        text = "Prev",
                        variant = WashButtonVariant.Outline,
                        enabled = page > 1,
                    )
                    (1..pageCount).forEach { index ->
                        WashButton(
                            onClick = { page = index },
                            text = index.toString(),
                            variant = if (page == index) WashButtonVariant.Primary else WashButtonVariant.Ghost,
                        )
                    }
                    WashButton(
                        onClick = { page = (page + 1).coerceAtMost(pageCount) },
                        text = "Next",
                        variant = WashButtonVariant.Outline,
                        enabled = page < pageCount,
                    )
                }
            }
        }
    }
}

@Composable
private fun DataTableShell(
    nameFilter: String,
    onNameFilterChange: (String) -> Unit,
    rows: List<DemoRow>,
    globalOffset: Int,
    page: Int,
    pageCount: Int,
    onPageChange: (Int) -> Unit,
) {
    val colors = WashTheme.colors
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(colors.base_200)
                .padding(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            WashInput(
                value = nameFilter,
                onValueChange = onNameFilterChange,
                label = "Name",
                placeholder = "Filter name",
                modifier = Modifier.weight(1f),
            )
        }
        TableHeader()
        if (rows.isEmpty()) {
            Text("No matches.", color = colors.ink_muted, modifier = Modifier.padding(12.dp))
        } else {
            rows.forEachIndexed { index, row ->
                TableRow(row = row, index = globalOffset + index + 1, zebra = index % 2 == 1)
            }
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text("Page $page of $pageCount", color = colors.ink_muted)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                WashButton(
                    onClick = { onPageChange((page - 1).coerceAtLeast(1)) },
                    text = "Prev",
                    variant = WashButtonVariant.Ghost,
                    enabled = page > 1,
                )
                WashButton(
                    onClick = { onPageChange((page + 1).coerceAtMost(pageCount)) },
                    text = "Next",
                    variant = WashButtonVariant.Ghost,
                    enabled = page < pageCount,
                )
            }
        }
    }
}

@Composable
private fun SimpleTable(rows: List<DemoRow>) {
    Column {
        TableHeader()
        rows.forEachIndexed { index, row ->
            TableRow(row = row, index = index + 1, zebra = index % 2 == 1)
        }
    }
}

@Composable
private fun TableHeader() {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(colors.base_300)
            .padding(horizontal = 12.dp, vertical = 10.dp),
    ) {
        Text("No", color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(0.5f))
        Text("Name", color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1.5f))
        Text("Tags", color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
        Text("Status", color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
    }
    WashDivider(color = colors.ink_border)
}

@Composable
private fun TableRow(row: DemoRow, index: Int, zebra: Boolean) {
    val colors = WashTheme.colors
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(if (zebra) colors.base_200.copy(alpha = 0.55f) else colors.base_100)
            .padding(horizontal = 12.dp, vertical = 10.dp),
    ) {
        Text(index.toString(), color = colors.base_content, modifier = Modifier.weight(0.5f))
        Text(row.name, color = colors.base_content, modifier = Modifier.weight(1.5f))
        Text(row.tags, color = colors.ink_muted, modifier = Modifier.weight(1f))
        Text(row.status, color = colors.primary, modifier = Modifier.weight(1f))
    }
    WashDivider(color = colors.ink_border.copy(alpha = 0.5f))
}
