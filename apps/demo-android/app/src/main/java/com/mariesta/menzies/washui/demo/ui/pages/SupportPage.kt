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
import com.mariesta.menzies.washui.icons.WashIcon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.data.SupportLink
import com.mariesta.menzies.washui.demo.data.librarySupportLinks
import com.mariesta.menzies.washui.demo.data.washUiSupportLink
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.ExternalLink
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
                Text("Support", color = colors.ink_muted, fontWeight = FontWeight.Medium)
                Text(
                    text = "Sponsor the stack, then star Wash UI.",
                    color = colors.base_content,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Open libraries", color = colors.base_content, fontWeight = FontWeight.Bold)
                librarySupportLinks.forEach { link ->
                    SupportLinkCard(link)
                }
            }
        }

        WashPanel {
            Column(modifier = Modifier.padding(8.dp)) {
                Text("Wash UI", color = colors.base_content, fontWeight = FontWeight.Bold)
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
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier = Modifier
                .size(36.dp)
                .clip(RoundedCornerShape(colors.radiusField))
                .background(item.accentColor.copy(alpha = 0.15f)),
            contentAlignment = Alignment.Center,
        ) {
            WashIcon(
                imageVector = item.icon,
                contentDescription = null,
                tint = if (item.preserveIconColors) Color.Unspecified else item.accentColor,
                modifier = Modifier.size(18.dp),
            )
        }
        Column(modifier = Modifier.padding(start = 12.dp).weight(1f)) {
            Text(text = item.name, color = colors.base_content, fontWeight = FontWeight.Medium)
            Row(
                modifier = Modifier.padding(top = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = item.supportLabel,
                    color = colors.primary,
                    fontWeight = FontWeight.Medium,
                )
                WashIcon(
                    imageVector = LucideIcons.ExternalLink,
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
