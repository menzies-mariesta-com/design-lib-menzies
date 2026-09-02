package com.mariesta.menzies.washui.demo.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
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
import com.mariesta.menzies.washui.demo.nav.filterSearchEntries
import com.mariesta.menzies.washui.demo.nav.searchEntries
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun SearchOverlay(
    open: Boolean,
    onDismiss: () -> Unit,
    onSelect: (AppPage) -> Unit,
    entries: List<SearchEntry> = searchEntries,
) {
    if (!open) return

    var query by remember(open) { mutableStateOf("") }
    val results = remember(query, entries) { filterSearchEntries(entries, query) }
    val colors = WashTheme.colors

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text("Search gallery", color = colors.base_content, fontWeight = FontWeight.SemiBold)
        },
        text = {
            Column {
                TextField(
                    value = query,
                    onValueChange = { query = it },
                    modifier = Modifier.fillMaxWidth(),
                    placeholder = { Text("Search pages, docs, components...") },
                    leadingIcon = {
                        Icon(Icons.Default.Search, contentDescription = null, tint = colors.ink_muted)
                    },
                    trailingIcon = {
                        if (query.isNotEmpty()) {
                            IconButton(onClick = { query = "" }) {
                                Icon(Icons.Default.Close, contentDescription = "Clear search")
                            }
                        }
                    },
                    singleLine = true,
                )
                LazyColumn(modifier = Modifier.padding(top = 8.dp)) {
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
                            Icon(
                                imageVector = entry.icon,
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
        confirmButton = {},
        dismissButton = {},
    )
}
