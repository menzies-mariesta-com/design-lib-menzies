package com.mariesta.menzies.washui.demo.data

import com.mariesta.menzies.washui.charts.BoxPlotDatum
import com.mariesta.menzies.washui.charts.BubblePoint
import com.mariesta.menzies.washui.charts.CandlestickDatum
import com.mariesta.menzies.washui.charts.ChartPoint
import com.mariesta.menzies.washui.charts.ChartSlice
import com.mariesta.menzies.washui.charts.FunnelStage
import com.mariesta.menzies.washui.charts.HeatmapCell
import com.mariesta.menzies.washui.charts.RadarSeries
import com.mariesta.menzies.washui.charts.RangeAreaBand
import com.mariesta.menzies.washui.charts.ScatterSeries
import com.mariesta.menzies.washui.charts.SlopeDatum
import com.mariesta.menzies.washui.charts.SunburstRing
import com.mariesta.menzies.washui.charts.TimelineBar
import com.mariesta.menzies.washui.charts.TreemapNode
import com.mariesta.menzies.washui.charts.ViolinDatum
import com.mariesta.menzies.washui.charts.indexedChartPoints
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.demo.nav.chartsNav

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

    val rangeAreaBand = RangeAreaBand(
        low = indexedChartPoints(listOf(18f, 20f, 19f, 22f, 21f, 24f, 23f)),
        high = indexedChartPoints(listOf(28f, 32f, 30f, 36f, 34f, 40f, 38f)),
    )

    val slopeSeries = listOf(
        SlopeDatum("Cerulean", 42f, 68f),
        SlopeDatum("Ochre", 55f, 48f),
        SlopeDatum("Madder", 38f, 72f),
        SlopeDatum("Indigo", 61f, 58f),
    )

    val timelineBars = listOf(
        TimelineBar("Wash A", 0f, 3f, 0),
        TimelineBar("Dry", 3f, 5f, 0),
        TimelineBar("Glaze", 5f, 8f, 0),
        TimelineBar("Wash B", 1f, 4f, 1),
        TimelineBar("Review", 4f, 7f, 1),
        TimelineBar("Archive", 7f, 9f, 1),
    )

    val radialBarValues = listOf(86f, 72f, 64f, 48f)
    val polarAreaValues = listOf(24f, 18f, 30f, 14f, 22f, 16f)
    val gaugeValue = 72f

    val heatmapCells: List<HeatmapCell> = buildList {
        for (row in 0 until 7) {
            for (col in 0 until 7) {
                add(HeatmapCell(row, col, ((row * 3 + col * 5) % 11).toFloat() + 2f))
            }
        }
    }

    val treemapNodes = listOf(
        TreemapNode("Cerulean", 32f),
        TreemapNode("Ochre", 24f),
        TreemapNode("Madder", 18f),
        TreemapNode("Indigo", 14f),
        TreemapNode("Other", 12f),
    )

    val sunburstRings = listOf(
        SunburstRing(listOf(40f, 35f, 25f)),
        SunburstRing(listOf(18f, 22f, 14f, 16f, 12f, 18f)),
    )

    val bubblePoints = listOf(
        BubblePoint(12f, 40f, 18f),
        BubblePoint(22f, 55f, 28f),
        BubblePoint(30f, 48f, 12f),
        BubblePoint(38f, 62f, 34f),
        BubblePoint(45f, 50f, 22f),
        BubblePoint(52f, 70f, 16f),
    )

    val funnelStages = listOf(
        FunnelStage("Visitors", 1200f),
        FunnelStage("Trials", 640f),
        FunnelStage("Active", 310f),
        FunnelStage("Paid", 140f),
    )

    val boxPlots = listOf(
        BoxPlotDatum(12f, 22f, 30f, 38f, 48f),
        BoxPlotDatum(18f, 26f, 34f, 42f, 55f),
        BoxPlotDatum(10f, 20f, 28f, 36f, 44f),
    )

    val violinSeries = listOf(
        ViolinDatum(listOf(0.2f, 0.5f, 0.9f, 1.2f, 0.8f, 0.4f, 0.2f)),
        ViolinDatum(listOf(0.3f, 0.7f, 1.1f, 0.9f, 0.6f, 0.3f, 0.15f)),
    )

    val beeswarmValues = listOf(
        12f, 14f, 15f, 18f, 19f, 21f, 22f, 24f, 25f, 27f, 28f, 30f, 33f, 35f, 38f, 40f,
    )

    val candles = listOf(
        CandlestickDatum(32f, 38f, 30f, 36f),
        CandlestickDatum(36f, 40f, 33f, 34f),
        CandlestickDatum(34f, 42f, 32f, 41f),
        CandlestickDatum(41f, 44f, 37f, 39f),
        CandlestickDatum(39f, 43f, 35f, 42f),
        CandlestickDatum(42f, 46f, 40f, 45f),
    )

    val histogramBins = listOf(4f, 8f, 14f, 18f, 12f, 7f, 3f)

    val customSeries = listOf(
        ScatterSeries("Washes", indexedChartPoints(weeklyWashCounts)),
        ScatterSeries("Plates", indexedChartPoints(weeklyPlateCounts)),
        ScatterSeries("Dry", indexedChartPoints(dryTimeTrend)),
    )

    data class ChartNavLink(
        val page: AppPage,
        val label: String,
    )

    val chartNavLinks: List<ChartNavLink> by lazy {
        chartsNav.map { ChartNavLink(it.page, it.label) }
    }
}

private fun List<Pair<Float, Float>>.toChartPoints(): List<ChartPoint> =
    map { (x, y) -> ChartPoint(x, y) }
