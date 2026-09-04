package com.mariesta.menzies.washui.demo.ui.pages.showcases

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import com.mariesta.menzies.washui.primitives.WashText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.components.WashCard
import com.mariesta.menzies.washui.components.WashCardTitle
import com.mariesta.menzies.washui.components.WashCardTitleTone
import com.mariesta.menzies.washui.demo.ui.WashAppLogo
import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashCheckbox
import com.mariesta.menzies.washui.primitives.WashInput
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun AuthScreenShowcase() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var rememberMe by remember { mutableStateOf(false) }
    var submitting by remember { mutableStateOf(false) }
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Sign in shell"
        ) {
            WashPanel {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        WashAppLogo(size = 40.dp)
                        WashText("Sign in", color = colors.primary, fontWeight = FontWeight.Bold)
                    }
                    WashInput(
                        value = email,
                        onValueChange = { email = it },
                        label = "Email",
                        requiredMark = true,
                        placeholder = "you@studio.com",
                    )
                    WashInput(
                        value = password,
                        onValueChange = { password = it },
                        label = "Password",
                        requiredMark = true,
                        placeholder = "Password",
                        visualTransformation = PasswordVisualTransformation(),
                    )
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        WashCheckbox(
                            checked = rememberMe,
                            onCheckedChange = { rememberMe = it },
                            label = "Remember me",
                        )
                        WashText("Forgot password?", color = colors.primary)
                    }
                    WashButton(
                        onClick = {
                            submitting = true
                            submitting = false
                        },
                        text = "Sign in",
                        variant = WashButtonVariant.Primary,
                        loading = submitting,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    WashText("No account? Create one", color = colors.ink_muted)
                }
            }
        }
    }
}

@Composable
fun TemplateCheckoutShowcase() {
    var name by remember { mutableStateOf("Studio member") }
    var card by remember { mutableStateOf("4242 4242 4242 4242") }
    var expiry by remember { mutableStateOf("08 / 28") }
    var cvc by remember { mutableStateOf("123") }
    val colors = WashTheme.colors

    ShowcaseScrollPage {
        ShowcaseSection(
            title = "Checkout shell"
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                WashCard(modifier = Modifier.weight(1f)) {
                    WashCardTitle(text = "Pay with card", tone = WashCardTitleTone.Primary)
                    WashInput(value = name, onValueChange = { name = it }, label = "Name on card", requiredMark = true)
                    WashInput(value = card, onValueChange = { card = it }, label = "Card number", requiredMark = true)
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        WashInput(
                            value = expiry,
                            onValueChange = { expiry = it },
                            label = "Expiry",
                            requiredMark = true,
                            modifier = Modifier.weight(1f),
                        )
                        WashInput(
                            value = cvc,
                            onValueChange = { cvc = it },
                            label = "CVC",
                            requiredMark = true,
                            modifier = Modifier.weight(1f),
                        )
                    }
                    WashButton(
                        onClick = {},
                        text = "Pay $48.00",
                        variant = WashButtonVariant.Primary,
                        modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                    )
                }
                WashCard(modifier = Modifier.weight(1f)) {
                    WashCardTitle(text = "Order summary")
                    WashText("Wash UI Pro license", color = colors.base_content, fontWeight = FontWeight.Medium)
                    WashText("Annual studio seat", color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp))
                    WashText("$48.00", color = colors.primary, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 12.dp))
                }
            }
        }
    }
}
