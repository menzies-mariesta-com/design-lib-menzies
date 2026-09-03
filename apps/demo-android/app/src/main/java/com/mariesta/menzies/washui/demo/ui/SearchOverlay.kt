package com.mariesta.menzies.washui.demo.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.SearchEntry
import com.mariesta.menzies.washui.demo.nav.asImageVector
import com.mariesta.menzies.washui.demo.nav.filterSearchEntries
import com.mariesta.menzies.washui.demo.nav.searchEntries
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.icons.lucide.Search
import com.mariesta.menzies.washui.icons.lucide.X
import com.mariesta.menzies.washui.primitives.WashDialog
import com.mariesta.menzies.washui.primitives.WashDialogTone
import com.mariesta.menzies.washui.primitives.WashIconButton
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun SearchOverlay(
    open: Boolean,
    onDismiss: () -> Unit,
    onSelect: (AppPage) -> Unit,
    entries: List<SearchEntry> = searchEntries,
) {
    var query by remember(open) { mutableStateOf("") }
    val results = remember(query, entries) { filterSearchEntries(entries, query) }
    val colors = WashTheme.colors

    WashDialog(
        open = open,
        onClose = onDismiss,
        title = "Search gallery",
        tone = WashDialogTone.Primary,
        content = {
            Column {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    WashIcon(
                        LucideIcons.Search,
                        contentDescription = null,
                        tint = colors.ink_muted,
                        size = 18.dp,
                        modifier = Modifier.padding(end = 8.dp),
                    )
                    WashInput(
                        value = query,
                        onValueChange = { query = it },
                        modifier = Modifier.weight(1f),
                        placeholder = "Search…",
                        singleLine = true,
                    )
                    if (query.isNotEmpty()) {
                        WashIconButton(
                            onClick = { query = "" },
                            imageVector = LucideIcons.X,
                            contentDescription = "Clear search",
                            iconSize = 18.dp,
                            buttonSize = 36.dp,
                        )
                    }
                }
                LazyColumn(
                    modifier = Modifier
                        .padding(top = 8.dp)
                        .heightIn(max = 360.dp),
                ) {
                    items(results, key = { it.id.route }) { entry ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    onSelect(entry.id)
                                    onDismiss()
                                }
                                .padding(vertical = 10.dp, horizontal = 4.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            WashIcon(
                                imageVector = entry.icon.asImageVector(),
                                contentDescription = null,
                                tint = colors.primary,
                                modifier = Modifier.padding(end = 12.dp),
                            )
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = entry.label,
                                    color = colors.base_content,
                                    fontWeight = FontWeight.Medium,
                                )
                                if (entry.subtitle.isNotEmpty()) {
                                    Text(
                                        text = entry.subtitle,
                                        color = colors.ink_muted,
                                        modifier = Modifier.padding(top = 2.dp),
                                    )
                                }
                            }
                        }
                    }
                }
            }
        },
    )
}
