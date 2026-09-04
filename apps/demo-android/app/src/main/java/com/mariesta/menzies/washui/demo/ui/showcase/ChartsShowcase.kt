package com.mariesta.menzies.washui.demo.ui.showcase

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.charts.AreaChart
import com.mariesta.menzies.washui.charts.BarChart
import com.mariesta.menzies.washui.charts.BeeswarmChart
import com.mariesta.menzies.washui.charts.BoxPlotChart
import com.mariesta.menzies.washui.charts.BubbleChart
import com.mariesta.menzies.washui.charts.CandlestickChart
import com.mariesta.menzies.washui.charts.ColumnChart
import com.mariesta.menzies.washui.charts.CustomSeriesChart
import com.mariesta.menzies.washui.charts.DonutChart
import com.mariesta.menzies.washui.charts.FunnelChart
import com.mariesta.menzies.washui.charts.GaugeChart
import com.mariesta.menzies.washui.charts.HeatmapChart
import com.mariesta.menzies.washui.charts.HistogramChart
import com.mariesta.menzies.washui.charts.InteractiveLineChart
import com.mariesta.menzies.washui.charts.LineChart
import com.mariesta.menzies.washui.charts.MixedChart
import com.mariesta.menzies.washui.charts.NarrativeChart
import com.mariesta.menzies.washui.charts.PieChart
import com.mariesta.menzies.washui.charts.PolarAreaChart
import com.mariesta.menzies.washui.charts.RadarChart
import com.mariesta.menzies.washui.charts.RadialBarChart
import com.mariesta.menzies.washui.charts.RangeAreaChart
import com.mariesta.menzies.washui.charts.ScatterChart
import com.mariesta.menzies.washui.charts.ScatterSeries
import com.mariesta.menzies.washui.charts.SlopeChart
import com.mariesta.menzies.washui.charts.SparklineChart
import com.mariesta.menzies.washui.charts.SunburstChart
import com.mariesta.menzies.washui.charts.TimelineChart
import com.mariesta.menzies.washui.charts.TreemapChart
import com.mariesta.menzies.washui.charts.UnitChart
import com.mariesta.menzies.washui.charts.ViolinChart
import com.mariesta.menzies.washui.charts.WaffleChart
import com.mariesta.menzies.washui.charts.indexedChartPoints
import com.mariesta.menzies.washui.demo.data.ChartSamples
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.primitives.WashText
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun ChartShowcasePage(page: AppPage, onNavigate: (AppPage) -> Unit, modifier: Modifier = Modifier) {
    when (page) {
        AppPage.ChartsOverview -> ChartsOverviewPage(onNavigate = onNavigate, modifier = modifier)
        AppPage.ChartsLine -> ChartsLinePage(modifier = modifier)
        AppPage.ChartsArea -> ChartsAreaPage(modifier = modifier)
        AppPage.ChartsRangeArea -> ChartsRangeAreaPage(modifier = modifier)
        AppPage.ChartsSlope -> ChartsSlopePage(modifier = modifier)
        AppPage.ChartsColumn -> ChartsColumnPage(modifier = modifier)
        AppPage.ChartsBar -> ChartsBarPage(modifier = modifier)
        AppPage.ChartsMixed -> ChartsMixedPage(modifier = modifier)
        AppPage.ChartsTimeline -> ChartsTimelinePage(modifier = modifier)
        AppPage.ChartsPie -> ChartsPiePage(modifier = modifier)
        AppPage.ChartsRadialbar -> ChartsRadialbarPage(modifier = modifier)
        AppPage.ChartsPolarArea -> ChartsPolarAreaPage(modifier = modifier)
        AppPage.ChartsGauge -> ChartsGaugePage(modifier = modifier)
        AppPage.ChartsSparklines -> ChartsSparklinesPage(modifier = modifier)
        AppPage.ChartsDashboards -> ChartsDashboardsPage(modifier = modifier)
        AppPage.ChartsHeatmap -> ChartsHeatmapPage(modifier = modifier)
        AppPage.ChartsTreemap -> ChartsTreemapPage(modifier = modifier)
        AppPage.ChartsSunburst -> ChartsSunburstPage(modifier = modifier)
        AppPage.ChartsScatter -> ChartsScatterPage(modifier = modifier)
        AppPage.ChartsBubble -> ChartsBubblePage(modifier = modifier)
        AppPage.ChartsFunnel -> ChartsFunnelPage(modifier = modifier)
        AppPage.ChartsRadar -> ChartsRadarPage(modifier = modifier)
        AppPage.ChartsBoxplot -> ChartsBoxplotPage(modifier = modifier)
        AppPage.ChartsViolin -> ChartsViolinPage(modifier = modifier)
        AppPage.ChartsBeeswarm -> ChartsBeeswarmPage(modifier = modifier)
        AppPage.ChartsWaffle -> ChartsWafflePage(modifier = modifier)
        AppPage.ChartsCandlestick -> ChartsCandlestickPage(modifier = modifier)
        AppPage.ChartsHistogram -> ChartsHistogramPage(modifier = modifier)
        AppPage.ChartsCustomSeries -> ChartsCustomSeriesPage(modifier = modifier)
        AppPage.ChartsInteractivity -> ChartsInteractivityPage(modifier = modifier)
        AppPage.ChartsNarrative -> ChartsNarrativePage(modifier = modifier)
        AppPage.ChartsUnit -> ChartsUnitPage(modifier = modifier)
        else -> ChartsLinePage(modifier = modifier)
    }
}

@Composable
fun ChartsOverviewPage(onNavigate: (AppPage) -> Unit, modifier: Modifier = Modifier) {
    val colors = WashTheme.colors
    ChartShowcaseScaffold(title = "Charts", modifier = modifier) {
        ChartSamples.chartNavLinks.forEach { link ->
            WashPanel(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigate(link.page) },
            ) {
                WashText(link.label, color = colors.primary, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
fun ChartsLinePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Line Charts", modifier = modifier) {
        ChartDemoCard(title = "Washes this week", subtitle = ChartSamples.washWeekLabels.joinToString(" · ")) {
            LineChart(points = indexedChartPoints(ChartSamples.weeklyWashCounts))
        }
        ChartDemoCard(title = "Pigment load") {
            LineChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
        ChartDemoCard(title = "Dry time", subtitle = "Minutes / day") {
            LineChart(points = indexedChartPoints(ChartSamples.dryTimeTrend))
        }
    }
}

@Composable
fun ChartsAreaPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Area Charts", modifier = modifier) {
        ChartDemoCard(title = "Pigment load") {
            AreaChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
        ChartDemoCard(title = "Weekly plates") {
            AreaChart(points = indexedChartPoints(ChartSamples.weeklyPlateCounts), fillAlpha = 0.28f)
        }
        ChartDemoCard(title = "Dry time") {
            AreaChart(points = indexedChartPoints(ChartSamples.dryTimeTrend), fillAlpha = 0.42f)
        }
    }
}

@Composable
fun ChartsRangeAreaPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Range Area", modifier = modifier) {
        ChartDemoCard(title = "Load band", subtitle = "Low / high pigment load") {
            RangeAreaChart(band = ChartSamples.rangeAreaBand)
        }
        ChartDemoCard(title = "Tighter band") {
            RangeAreaChart(
                band = ChartSamples.rangeAreaBand.copy(
                    low = indexedChartPoints(listOf(22f, 24f, 23f, 26f, 25f, 28f, 27f)),
                ),
                fillAlpha = 0.4f,
            )
        }
    }
}

@Composable
fun ChartsSlopePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Slope Charts", modifier = modifier) {
        ChartDemoCard(title = "Before / after saturation") {
            SlopeChart(data = ChartSamples.slopeSeries)
        }
    }
}

@Composable
fun ChartsColumnPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Column charts", modifier = modifier) {
        ChartDemoCard(title = "Monthly plates", subtitle = ChartSamples.monthlyPlateLabels.joinToString(" · ")) {
            ColumnChart(values = ChartSamples.monthlyPlateCounts)
        }
        ChartDemoCard(title = "Series plates") {
            ColumnChart(values = ChartSamples.seriesPlateCounts.map { it.second })
        }
        ChartDemoCard(title = "Budget delta") {
            ColumnChart(values = ChartSamples.studioBudgetDelta)
        }
    }
}

@Composable
fun ChartsBarPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Bar Charts", modifier = modifier) {
        ChartDemoCard(title = "Plate status") {
            BarChart(values = ChartSamples.plateStatusCounts.map { it.second })
        }
        ChartDemoCard(title = "Series output") {
            BarChart(values = ChartSamples.seriesPlateCounts.map { it.second })
        }
        ChartDemoCard(title = "Budget delta") {
            BarChart(values = ChartSamples.studioBudgetDelta)
        }
    }
}

@Composable
fun ChartsMixedPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Mixed Charts", modifier = modifier) {
        ChartDemoCard(title = "Columns + line", subtitle = "Plates with wash overlay") {
            MixedChart(
                columns = ChartSamples.weeklyPlateCounts,
                line = indexedChartPoints(ChartSamples.weeklyWashCounts),
            )
        }
    }
}

@Composable
fun ChartsTimelinePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Timeline", modifier = modifier) {
        ChartDemoCard(title = "Studio schedule") {
            TimelineChart(bars = ChartSamples.timelineBars)
        }
    }
}

@Composable
fun ChartsPiePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Pie / Donut Charts", modifier = modifier) {
        ChartDemoCard(title = "Pigment share") {
            PieChart(values = ChartSamples.pigmentShare.map { it.value })
        }
        ChartDemoCard(title = "Pigment donut") {
            DonutChart(slices = ChartSamples.pigmentShare)
        }
        ChartDemoCard(title = "Plate status") {
            PieChart(values = ChartSamples.plateStatusCounts.map { it.second })
        }
    }
}

@Composable
fun ChartsRadialbarPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "RadialBar Charts", modifier = modifier) {
        ChartDemoCard(title = "Skill rings") {
            RadialBarChart(values = ChartSamples.radialBarValues)
        }
    }
}

@Composable
fun ChartsPolarAreaPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Polar Area", modifier = modifier) {
        ChartDemoCard(title = "Pigment rose") {
            PolarAreaChart(values = ChartSamples.polarAreaValues)
        }
    }
}

@Composable
fun ChartsGaugePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Gauge Charts", modifier = modifier) {
        ChartDemoCard(title = "Studio capacity", subtitle = "${ChartSamples.gaugeValue.toInt()}%") {
            GaugeChart(value = ChartSamples.gaugeValue)
        }
        ChartDemoCard(title = "Low load") {
            GaugeChart(value = 28f)
        }
    }
}

@Composable
fun ChartsSparklinesPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Sparklines", modifier = modifier) {
        ChartDemoCard(title = "Washes") {
            SparklineChart(points = indexedChartPoints(ChartSamples.weeklyWashCounts))
        }
        ChartDemoCard(title = "Pigment load") {
            SparklineChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
        ChartDemoCard(title = "Dry time") {
            SparklineChart(points = indexedChartPoints(ChartSamples.dryTimeTrend))
        }
    }
}

@Composable
fun ChartsDashboardsPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Dashboards", modifier = modifier) {
        ChartDemoCard(title = "Week overview") {
            MixedChart(
                columns = ChartSamples.weeklyPlateCounts,
                line = indexedChartPoints(ChartSamples.weeklyWashCounts),
            )
        }
        ChartDemoCard(title = "Share") {
            DonutChart(slices = ChartSamples.pigmentShare)
        }
        ChartDemoCard(title = "Heat") {
            HeatmapChart(cells = ChartSamples.heatmapCells, rows = 7, cols = 7)
        }
        ChartDemoCard(title = "Sparks") {
            SparklineChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
    }
}

@Composable
fun ChartsHeatmapPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Heatmap Charts", modifier = modifier) {
        ChartDemoCard(title = "Wash intensity") {
            HeatmapChart(cells = ChartSamples.heatmapCells, rows = 7, cols = 7)
        }
    }
}

@Composable
fun ChartsTreemapPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Treemap Charts", modifier = modifier) {
        ChartDemoCard(title = "Pigment volume") {
            TreemapChart(nodes = ChartSamples.treemapNodes)
        }
    }
}

@Composable
fun ChartsSunburstPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Sunburst Charts", modifier = modifier) {
        ChartDemoCard(title = "Series hierarchy") {
            SunburstChart(rings = ChartSamples.sunburstRings)
        }
    }
}

@Composable
fun ChartsScatterPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Scatter Charts", modifier = modifier) {
        ChartDemoCard(title = "Viscosity vs load") {
            ScatterChart(series = ChartSamples.pigmentViscosityScatter)
        }
        ChartDemoCard(title = "Weekly washes") {
            ScatterChart(
                series = listOf(
                    ScatterSeries(
                        name = "Washes",
                        points = indexedChartPoints(ChartSamples.weeklyWashCounts),
                    ),
                ),
            )
        }
    }
}

@Composable
fun ChartsBubblePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Bubble Charts", modifier = modifier) {
        ChartDemoCard(title = "Load vs size") {
            BubbleChart(points = ChartSamples.bubblePoints)
        }
    }
}

@Composable
fun ChartsFunnelPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Funnel Charts", modifier = modifier) {
        ChartDemoCard(title = "Studio funnel") {
            FunnelChart(stages = ChartSamples.funnelStages)
        }
    }
}

@Composable
fun ChartsRadarPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Radar Charts", modifier = modifier) {
        ChartDemoCard(
            title = "Cerulean skills",
            subtitle = ChartSamples.studioSkillDimensions.joinToString(" · "),
        ) {
            RadarChart(
                categories = ChartSamples.studioSkillDimensions,
                series = listOf(ChartSamples.basicRadarSeries),
            )
        }
        ChartDemoCard(title = "Multi-pigment") {
            RadarChart(
                categories = ChartSamples.studioSkillDimensions,
                series = ChartSamples.multiRadarSeries,
                fillAlpha = 0.14f,
            )
        }
    }
}

@Composable
fun ChartsBoxplotPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "BoxPlot Charts", modifier = modifier) {
        ChartDemoCard(title = "Dry time spread") {
            BoxPlotChart(series = ChartSamples.boxPlots)
        }
    }
}

@Composable
fun ChartsViolinPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Violin Charts", modifier = modifier) {
        ChartDemoCard(title = "Density of loads") {
            ViolinChart(series = ChartSamples.violinSeries)
        }
    }
}

@Composable
fun ChartsBeeswarmPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Beeswarm Charts", modifier = modifier) {
        ChartDemoCard(title = "Plate sizes") {
            BeeswarmChart(values = ChartSamples.beeswarmValues)
        }
    }
}

@Composable
fun ChartsWafflePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Waffle Charts", modifier = modifier) {
        ChartDemoCard(title = "Completion", subtitle = "64 of 100") {
            WaffleChart(filled = 64)
        }
        ChartDemoCard(title = "Half way") {
            WaffleChart(filled = 50)
        }
    }
}

@Composable
fun ChartsCandlestickPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Candlestick Charts", modifier = modifier) {
        ChartDemoCard(title = "Pigment futures") {
            CandlestickChart(candles = ChartSamples.candles)
        }
    }
}

@Composable
fun ChartsHistogramPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Histogram Charts", modifier = modifier) {
        ChartDemoCard(title = "Wash duration bins") {
            HistogramChart(bins = ChartSamples.histogramBins)
        }
    }
}

@Composable
fun ChartsCustomSeriesPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Custom Series Charts", modifier = modifier) {
        ChartDemoCard(title = "Multi-series overlay") {
            CustomSeriesChart(series = ChartSamples.customSeries)
        }
    }
}

@Composable
fun ChartsInteractivityPage(modifier: Modifier = Modifier) {
    var selectedLabel by remember { mutableStateOf("Tap a point") }
    ChartShowcaseScaffold(title = "Interactivity", modifier = modifier) {
        ChartDemoCard(title = "Selectable line", subtitle = selectedLabel) {
            InteractiveLineChart(
                points = indexedChartPoints(ChartSamples.pigmentLoadTrend),
                onSelect = { point ->
                    selectedLabel = point?.let { "x=${it.x.toInt()} y=${it.y.toInt()}" } ?: "Tap a point"
                },
            )
        }
    }
}

@Composable
fun ChartsNarrativePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Narrative Charts", modifier = modifier) {
        ChartDemoCard(title = "Annotated week", subtitle = "Markers on peak days") {
            NarrativeChart(
                points = indexedChartPoints(ChartSamples.weeklyWashCounts),
                markers = listOf(1, 3, 5),
            )
        }
    }
}

@Composable
fun ChartsUnitPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Unit Charts", modifier = modifier) {
        ChartDemoCard(title = "Plates shipped", subtitle = "14 of 20") {
            UnitChart(filled = 14, total = 20, columns = 10)
        }
        ChartDemoCard(title = "Sponsors", subtitle = "9 of 12") {
            UnitChart(filled = 9, total = 12, columns = 6)
        }
    }
}

@Composable
private fun ChartShowcaseScaffold(
    title: String,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    val colors = WashTheme.colors
    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        WashPanel {
            WashText(title, color = colors.base_content, fontWeight = FontWeight.Bold)
        }
        content()
    }
}

@Composable
private fun ChartDemoCard(
    title: String,
    subtitle: String? = null,
    modifier: Modifier = Modifier,
    chart: @Composable () -> Unit,
) {
    val colors = WashTheme.colors
    WashPanel(modifier = modifier.fillMaxWidth()) {
        WashText(title, color = colors.base_content, fontWeight = FontWeight.SemiBold)
        if (!subtitle.isNullOrBlank()) {
            WashText(subtitle, color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp, bottom = 12.dp))
        } else {
            Spacer(modifier = Modifier.padding(bottom = 12.dp))
        }
        chart()
    }
}
