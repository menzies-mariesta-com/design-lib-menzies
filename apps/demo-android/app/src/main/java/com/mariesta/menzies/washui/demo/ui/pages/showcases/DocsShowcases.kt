package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog

private val kmpTargets = listOf(
    Triple("Android", "Compose Material 3 app module", "implementation(project(\":menzies-design-wash-compose\"))"),
    Triple("Desktop", "Compose Desktop JVM target", "implementation(project(\":menzies-design-wash-compose\"))"),
    Triple("iOS", "Compose Multiplatform shared UI", "export WashProvider in shared source set"),
)

private val mcpTools = listOf(
    "list_components" to "Browse exports by category",
    "search_components" to "Search by name or keyword",
    "get_component_docs" to "Usage, props, and examples",
    "get_theme_tokens" to "Theme tokens and pigment API",
    "get_install_guide" to "Install steps and peer dependencies",
)

@Composable
fun DocsStartShowcase(onNavigate: (AppPage) -> Unit) {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "Getting started",
            body = "Add menzies-design-wash-compose to your Kotlin Multiplatform or Android project, wrap the app in WashProvider, and render Wash primitives.",
        )
        ShowcaseSection(title = "Choose a target") {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                kmpTargets.forEach { (name, subtitle, snippet) ->
                    WashPanel(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigate(AppPage.DocsTheming) },
                    ) {
                        Text(name, color = colors.primary, fontWeight = FontWeight.SemiBold)
                        Text(subtitle, color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp, bottom = 8.dp))
                        CodeBlock(snippet)
                    }
                }
            }
        }
        ShowcaseSection(title = "Boot WashProvider") {
            CodeBlock(
                """
                WashProvider {
                    MaterialTheme {
                        DemoApp()
                    }
                }
                """.trimIndent(),
            )
        }
    }
}

@Composable
fun DocsThemingShowcase() {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "Theming",
            body = "${washPigmentCatalog.size} pigments, each with light and dark paper modes. Customize through WashProvider state or generated color schemes.",
        )
        ShowcaseSection(title = "Apply a pigment") {
            CodeBlock(
                """
                val wash = useWash()
                wash.setPigment(WashPigment.cerulean)
                wash.setMode(WashMode.Dark)
                """.trimIndent(),
            )
        }
        ShowcaseSection(title = "Pigment gallery") {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                washPigmentCatalog.take(12).forEach { meta ->
                    Text("${meta.label} (${meta.id.id})", color = colors.base_content)
                    Text(meta.note, color = colors.ink_muted)
                }
            }
        }
    }
}

@Composable
fun DocsTokensShowcase() {
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "Design tokens",
            body = "Paper, wash, ink, and motion tokens power every surface. Read values from WashTheme.colors in Compose.",
        )
        ShowcaseSection(title = "Core tokens") {
            CodeBlock(
                """
                wash_a / wash_b / wash_c
                paper_fiber / pigment_grain
                ink_muted / ink_border
                radiusBox / radiusField
                primary / secondary / accent
                """.trimIndent(),
            )
        }
        ShowcaseSection(title = "Compose accessors") {
            CodeBlock(
                """
                val colors = WashTheme.colors
                colors.base_100
                colors.primary
                colors.ink_border
                """.trimIndent(),
            )
        }
    }
}

@Composable
fun DocsCustomizeShowcase() {
    var sample by rememberSampleInput()
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "Customize components",
            body = "Every primitive accepts variants and slots. Prefer variants for semantics; prefer tokens for brand-wide look.",
        )
        ShowcaseSection(title = "Button variants") {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                WashButton(onClick = {}, text = "Primary", variant = WashButtonVariant.Primary)
                WashButton(onClick = {}, text = "Outline", variant = WashButtonVariant.Outline)
                WashButton(onClick = {}, text = "Ghost", variant = WashButtonVariant.Ghost)
            }
        }
        ShowcaseSection(title = "Input with required mark") {
            WashInput(
                value = sample,
                onValueChange = { sample = it },
                label = "Plate name",
                requiredMark = true,
                placeholder = "Coastal fog",
            )
        }
        ShowcaseSection(title = "Accessibility checklist") {
            BulletList(
                listOf(
                    "Visible or contentDescription on every control",
                    "Focus visible styles on custom click targets",
                    "Dialog and drawer: dismiss on back and outside tap",
                    "Respect prefers-reduced-motion for decorative splashes",
                ),
            )
        }
    }
}

@Composable
fun DocsMcpServerShowcase() {
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "MCP server",
            body = "The wash-ui-mcp package exposes Wash UI docs and APIs to AI assistants via the Model Context Protocol.",
        )
        ShowcaseSection(title = "Tools") {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                mcpTools.forEach { (name, desc) ->
                    Text(name, color = WashTheme.colors.primary, fontFamily = FontFamily.Monospace)
                    Text(desc, color = WashTheme.colors.ink_muted)
                }
            }
        }
        ShowcaseSection(title = "Cursor config") {
            CodeBlock(
                """
                {
                  "mcpServers": {
                    "wash-ui": {
                      "type": "stdio",
                      "command": "node",
                      "args": ["packages/wash-ui-mcp/dist/index.js"]
                    }
                  }
                }
                """.trimIndent(),
            )
        }
    }
}

@Composable
private fun DocIntro(eyebrow: String, title: String, body: String) {
    val colors = WashTheme.colors
    Column(modifier = Modifier.padding(bottom = 4.dp)) {
        Text(eyebrow, color = colors.ink_muted)
        Text(title, color = colors.base_content, fontWeight = FontWeight.SemiBold, modifier = Modifier.padding(top = 4.dp))
        Text(body, color = colors.ink_muted, modifier = Modifier.padding(top = 8.dp))
    }
}

@Composable
private fun CodeBlock(code: String) {
    Text(
        text = code,
        color = WashTheme.colors.base_content,
        fontFamily = FontFamily.Monospace,
        modifier = Modifier.padding(top = 4.dp),
    )
}

@Composable
private fun BulletList(items: List<String>) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        items.forEach { line ->
            Text("• $line", color = WashTheme.colors.base_content)
        }
    }
}

@Composable
private fun rememberSampleInput(): androidx.compose.runtime.MutableState<String> {
    return androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf("") }
}
