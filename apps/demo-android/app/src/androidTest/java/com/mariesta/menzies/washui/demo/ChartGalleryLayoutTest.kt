package com.mariesta.menzies.washui.demo

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.geometry.Rect
import com.mariesta.menzies.washui.WashProvider
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.ui.showcase.ChartShowcasePage
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import androidx.test.ext.junit.runners.AndroidJUnit4

@RunWith(AndroidJUnit4::class)
class ChartGalleryLayoutTest {
    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun heatmapFallbackCardsStackTitleAboveSubtitle() {
        composeRule.setContent {
            WashProvider {
                ChartShowcasePage(page = AppPage.ChartsHeatmap, onNavigate = {})
            }
        }
        composeRule.waitForIdle()

        composeRule.onNodeWithText("Heatmap Charts").assertExists()
        assertStacked(topText = "Sample line", bottomText = "Weekly washes")
        assertStacked(topText = "Sample columns", bottomText = "Monthly plates")
    }

    @Test
    fun lineChartsCardsStackTitleAboveSubtitle() {
        composeRule.setContent {
            WashProvider {
                ChartShowcasePage(page = AppPage.ChartsLine, onNavigate = {})
            }
        }
        composeRule.waitForIdle()

        composeRule.onNodeWithText("Line Charts").assertExists()
        assertStacked(topText = "Pigment load", bottomText = "Dry time")
    }

    private fun assertStacked(topText: String, bottomText: String) {
        val top = boundsOf(topText)
        val bottom = boundsOf(bottomText)
        assertTrue(
            "Expected \"$topText\" (bottom=${top.bottom}) above \"$bottomText\" (top=${bottom.top})",
            top.bottom <= bottom.top + 1f,
        )
    }

    private fun boundsOf(text: String): Rect =
        composeRule.onNodeWithText(text).fetchSemanticsNode().boundsInRoot
}
