package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import com.mariesta.menzies.washui.icons.WashIcon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.icons.BrandIcons
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.brands.Angular
import com.mariesta.menzies.washui.icons.brands.Astro
import com.mariesta.menzies.washui.icons.brands.Eleventy
import com.mariesta.menzies.washui.icons.brands.Html5
import com.mariesta.menzies.washui.icons.brands.Lit
import com.mariesta.menzies.washui.icons.brands.Nextjs
import com.mariesta.menzies.washui.icons.brands.Nuxt
import com.mariesta.menzies.washui.icons.brands.Preact
import com.mariesta.menzies.washui.icons.brands.Qwik
import com.mariesta.menzies.washui.icons.brands.ReactBrand
import com.mariesta.menzies.washui.icons.brands.Remix
import com.mariesta.menzies.washui.icons.brands.Solid
import com.mariesta.menzies.washui.icons.brands.Svelte
import com.mariesta.menzies.washui.icons.brands.Vue
import com.mariesta.menzies.washui.icons.lucide.ArrowRight
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.washPigmentCatalog

private data class GettingStartedStack(
    val name: String,
    val page: AppPage,
    val icon: ImageVector,
    val accent: Color,
)

private fun gettingStartedStacks(): List<GettingStartedStack> = listOf(
    GettingStartedStack("Vanilla HTML / CSS / JS", AppPage.DocsStartVanilla, BrandIcons.Html5, Color(0xFFE34F26)),
    GettingStartedStack("React (Vite)", AppPage.DocsStartReactVite, BrandIcons.ReactBrand, Color(0xFF61DAFB)),
    GettingStartedStack("Next.js", AppPage.DocsStartNextjs, BrandIcons.Nextjs, Color(0xFF111111)),
    GettingStartedStack("Vue (Vite)", AppPage.DocsStartVueVite, BrandIcons.Vue, Color(0xFF4FC08D)),
    GettingStartedStack("Nuxt", AppPage.DocsStartNuxt, BrandIcons.Nuxt, Color(0xFF00DC82)),
    GettingStartedStack("SvelteKit", AppPage.DocsStartSveltekit, BrandIcons.Svelte, Color(0xFFFF3E00)),
    GettingStartedStack("Astro", AppPage.DocsStartAstro, BrandIcons.Astro, Color(0xFFBC52EE)),
    GettingStartedStack("Angular", AppPage.DocsStartAngular, BrandIcons.Angular, Color(0xFF0F0F11)),
    GettingStartedStack("Remix", AppPage.DocsStartRemix, BrandIcons.Remix, Color(0xFF111111)),
    GettingStartedStack("Solid (Vite)", AppPage.DocsStartSolid, BrandIcons.Solid, Color(0xFF2C4F7C)),
    GettingStartedStack("Preact (Vite)", AppPage.DocsStartPreact, BrandIcons.Preact, Color(0xFF673AB8)),
    GettingStartedStack("Qwik", AppPage.DocsStartQwik, BrandIcons.Qwik, Color(0xFFAC7EF4)),
    GettingStartedStack("Lit", AppPage.DocsStartLit, BrandIcons.Lit, Color(0xFF324FFF)),
    GettingStartedStack("Eleventy", AppPage.DocsStartEleventy, BrandIcons.Eleventy, Color(0xFF222222)),
)

private val kmpTargets = listOf(
    "Android" to "implementation(project(\":menzies-design-wash-compose\"))",
    "Desktop" to "implementation(project(\":menzies-design-wash-compose\"))",
    "iOS" to "export WashProvider in shared source set",
)

private val mcpTools = listOf(
    "list_components" to "Browse by category",
    "search_components" to "Search by name",
    "get_component_docs" to "Usage and props",
    "get_theme_tokens" to "Tokens and pigments",
    "get_install_guide" to "Install guide",
)

@Composable
fun DocsStartShowcase(onNavigate: (AppPage) -> Unit) {
    val colors = WashTheme.colors
    ShowcaseScrollPage {
        DocIntro(
            eyebrow = "Documentation",
            title = "Getting started",
            body = "Pick a stack, or use menzies-design-wash-compose on KMP.",
        )
        ShowcaseSection(title = "Web stacks") {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                gettingStartedStacks().forEach { stack ->
                    WashPanel(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigate(stack.page) },
                    ) {
                        Row(
                            modifier = Modifier.padding(4.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(44.dp)
                                    .clip(RoundedCornerShape(colors.radiusField))
                                    .background(stack.accent.copy(alpha = 0.12f)),
                                contentAlignment = Alignment.Center,
                            ) {
                                WashIcon(
                                    imageVector = stack.icon,
                                    contentDescription = stack.name,
                                    tint = Color.Unspecified,
                                    modifier = Modifier.size(24.dp),
                                )
                            }
                            Column(modifier = Modifier.padding(start = 12.dp).weight(1f)) {
                                Text(stack.name, color = colors.base_content, fontWeight = FontWeight.SemiBold)
                                WashIcon(
                                    LucideIcons.ArrowRight,
                                    contentDescription = null,
                                    tint = colors.primary,
                                    modifier = Modifier.padding(top = 4.dp).size(14.dp),
                                )
                            }
                        }
                    }
                }
            }
        }
        ShowcaseSection(title = "KMP targets") {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                kmpTargets.forEach { (name, snippet) ->
                    WashPanel(modifier = Modifier.fillMaxWidth()) {
                        Text(name, color = colors.primary, fontWeight = FontWeight.SemiBold)
                        CodeBlock(snippet)
                    }
                }
            }
        }
        ShowcaseSection(title = "WashProvider") {
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
            body = "${washPigmentCatalog.size} pigments × light / dark paper.",
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
            body = "Read values from WashTheme.colors.",
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
            title = "Customize",
            body = "Variants for semantics; tokens for brand look.",
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
                    "Label or contentDescription on controls",
                    "Visible focus on custom targets",
                    "Dialog / drawer: dismiss on back and outside",
                    "Respect reduced motion for splashes",
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
            body = "wash-ui-mcp for AI assistants.",
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
