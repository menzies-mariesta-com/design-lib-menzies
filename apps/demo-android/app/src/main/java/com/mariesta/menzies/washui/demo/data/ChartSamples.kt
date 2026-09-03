package com.mariesta.menzies.washui.demo.data

import com.mariesta.menzies.washui.charts.ChartSlice
import com.mariesta.menzies.washui.charts.RadarSeries
import com.mariesta.menzies.washui.charts.ScatterSeries
import com.mariesta.menzies.washui.charts.ChartPoint
import com.mariesta.menzies.washui.demo.nav.AppPage

object ChartSamples {
    val washWeekLabels = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
    val weeklyWashCounts = listOf(12f, 18f, 14f, 22f, 19f, 8f, 11f)
    val pigmentLoadTrend = listOf(32f, 38f, 35f, 44f, 41f, 48f, 52f)
    val weeklyPlateCounts = listOf(6f, 8f, 7f, 10f, 9f, 4f, 5f)
    val dryTimeTrend = listOf(28f, 24f, 31f, 26f, 22f, 19f, 25f)

    val seriesPlateCounts = listOf(
        "Atlantic Studies" to 42f,
        "Mineral Notes" to 28f,
        "Botanical Index" to 34f,
        "Coastal Sketches" to 19f,
    )

    val plateStatusCounts = listOf(
        "Draft" to 8f,
        "In wash" to 14f,
        "Review" to 11f,
        "Archived" to 22f,
    )

    val pigmentShare = listOf(
        ChartSlice("Cerulean", 24f),
        ChartSlice("Ochre", 18f),
        ChartSlice("Madder", 16f),
        ChartSlice("Indigo", 14f),
        ChartSlice("Viridian", 12f),
        ChartSlice("Other", 16f),
    )

    val studioBudgetDelta = listOf(420f, -180f, 310f, -95f, 540f, 260f)
    val monthlyPlateCounts = listOf(18f, 22f, 26f, 24f, 31f, 28f)
    val monthlyPlateLabels = listOf("Mar", "Apr", "May", "Jun", "Jul", "Aug")

    val studioSkillDimensions = listOf(
        "Saturation",
        "Contrast",
        "Texture",
        "Flow",
        "Edge control",
        "Blend",
    )

    val basicRadarSeries = RadarSeries(
        name = "Cerulean wash",
        values = listOf(78f, 65f, 82f, 70f, 88f, 74f),
    )

    val multiRadarSeries = listOf(
        RadarSeries("Cerulean", listOf(78f, 65f, 82f, 70f, 88f, 74f)),
        RadarSeries("Ochre", listOf(62f, 88f, 58f, 75f, 52f, 80f)),
        RadarSeries("Madder", listOf(85f, 72f, 68f, 82f, 76f, 65f)),
    )

    val pigmentViscosityScatter = listOf(
        ScatterSeries(
            name = "Cerulean",
            points = listOf(18f to 38f, 22f to 45f, 26f to 52f, 30f to 48f, 34f to 58f, 28f to 44f).toChartPoints(),
        ),
        ScatterSeries(
            name = "Ochre",
            points = listOf(24f to 62f, 28f to 68f, 32f to 71f, 36f to 65f, 40f to 74f, 38f to 69f).toChartPoints(),
        ),
        ScatterSeries(
            name = "Madder",
            points = listOf(20f to 55f, 25f to 60f, 29f to 57f, 33f to 63f, 37f to 59f).toChartPoints(),
        ),
    )

    data class ChartNavLink(
        val page: AppPage,
        val label: String,
    )

    val chartNavLinks = listOf(
        ChartNavLink(AppPage.ChartsLine, "Line Charts"),
        ChartNavLink(AppPage.ChartsArea, "Area Charts"),
        ChartNavLink(AppPage.ChartsColumn, "Column charts"),
        ChartNavLink(AppPage.ChartsBar, "Bar Charts"),
        ChartNavLink(AppPage.ChartsPie, "Pie / Donut Charts"),
        ChartNavLink(AppPage.ChartsScatter, "Scatter Charts"),
        ChartNavLink(AppPage.ChartsRadar, "Radar Charts"),
    )
}

private fun List<Pair<Float, Float>>.toChartPoints(): List<ChartPoint> =
    map { (x, y) -> ChartPoint(x, y) }
