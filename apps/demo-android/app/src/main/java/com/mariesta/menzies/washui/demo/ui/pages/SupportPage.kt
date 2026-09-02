package com.mariesta.menzies.washui.demo.ui.pages

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.OpenInNew
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.data.SupportLink
import com.mariesta.menzies.washui.demo.data.librarySupportLinks
import com.mariesta.menzies.washui.demo.data.washUiSupportLink
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun SupportPage(modifier: Modifier = Modifier) {
    val colors = WashTheme.colors
    Column(
        modifier = modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Community", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Support open libraries",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp),
                )
                Text(
                    text = "Wash UI depends on a stack of open-source projects. Sponsor or donate to the libraries below first, then star the Wash UI repo to help the design system grow.",
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 8.dp),
                )
                Row(
                    modifier = Modifier.padding(top = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Text(
                        text = "Libraries first",
                        color = colors.primary,
                        modifier = Modifier
                            .clip(RoundedCornerShape(colors.radiusField))
                            .background(colors.primary.copy(alpha = 0.12f))
                            .padding(horizontal = 12.dp, vertical = 6.dp),
                    )
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Open libraries", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Sponsor the stack",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp),
                )
                Text(
                    text = "React, TypeScript, Tailwind CSS, daisyUI, Simple Icons, Lucide, Vite, and ApexCharts power pigments, components, icons, and charts in this studio.",
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 8.dp, bottom = 12.dp),
                )
                librarySupportLinks.forEach { link ->
                    SupportLinkCard(link)
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Wash UI", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Support this design system",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp),
                )
                Text(
                    text = "Star the monorepo, open issues, or share feedback as the watercolor library evolves.",
                    color = colors.ink_muted,
                    modifier = Modifier.padding(top = 8.dp, bottom = 12.dp),
                )
                SupportLinkCard(washUiSupportLink)
            }
        }
    }
}

@Composable
private fun SupportLinkCard(item: SupportLink) {
    val colors = WashTheme.colors
    val context = LocalContext.current

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .clip(RoundedCornerShape(colors.radiusField))
            .background(colors.base_200.copy(alpha = 0.5f))
            .clickable {
                context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(item.href)))
            }
            .padding(12.dp),
        verticalAlignment = Alignment.Top,
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(RoundedCornerShape(colors.radiusField))
                .background(item.accentColor.copy(alpha = 0.15f)),
            contentAlignment = Alignment.Center,
        ) {
            Icon(
                imageVector = if (item.name == "Wash UI") Icons.Default.Favorite else item.icon,
                contentDescription = null,
                tint = item.accentColor,
                modifier = Modifier.size(18.dp),
            )
        }
        Column(modifier = Modifier.padding(start = 12.dp)) {
            Text(text = item.name, color = colors.base_content, fontWeight = FontWeight.Medium)
            Text(
                text = item.description,
                color = colors.ink_muted,
                modifier = Modifier.padding(top = 2.dp),
            )
            Row(
                modifier = Modifier.padding(top = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = item.supportLabel,
                    color = colors.primary,
                    fontWeight = FontWeight.Medium,
                )
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.OpenInNew,
                    contentDescription = null,
                    tint = colors.primary,
                    modifier = Modifier
                        .padding(start = 4.dp)
                        .size(14.dp),
                )
            }
        }
    }
}
