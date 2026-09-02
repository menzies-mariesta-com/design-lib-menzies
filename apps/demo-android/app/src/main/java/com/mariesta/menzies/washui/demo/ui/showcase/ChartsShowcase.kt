package com.mariesta.menzies.washui.demo.ui.showcase

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.charts.AreaChart
import com.mariesta.menzies.washui.charts.BarChart
import com.mariesta.menzies.washui.charts.ColumnChart
import com.mariesta.menzies.washui.charts.DonutChart
import com.mariesta.menzies.washui.charts.LineChart
import com.mariesta.menzies.washui.charts.PieChart
import com.mariesta.menzies.washui.charts.RadarChart
import com.mariesta.menzies.washui.charts.ScatterChart
import com.mariesta.menzies.washui.charts.indexedChartPoints
import com.mariesta.menzies.washui.demo.data.ChartSamples
import com.mariesta.menzies.washui.demo.nav.AppPage
import com.mariesta.menzies.washui.primitives.WashPanel
import com.mariesta.menzies.washui.theme.WashTheme

@Composable
fun ChartShowcasePage(page: AppPage, onNavigate: (AppPage) -> Unit, modifier: Modifier = Modifier) {
    when (page) {
        AppPage.ChartsOverview -> ChartsOverviewPage(onNavigate = onNavigate, modifier = modifier)
        AppPage.ChartsLine -> ChartsLinePage(modifier = modifier)
        AppPage.ChartsArea -> ChartsAreaPage(modifier = modifier)
        AppPage.ChartsColumn -> ChartsColumnPage(modifier = modifier)
        AppPage.ChartsBar -> ChartsBarPage(modifier = modifier)
        AppPage.ChartsPie -> ChartsPiePage(modifier = modifier)
        AppPage.ChartsScatter -> ChartsScatterPage(modifier = modifier)
        AppPage.ChartsRadar -> ChartsRadarPage(modifier = modifier)
        else -> ChartsFallbackPage(page = page, modifier = modifier)
    }
}

@Composable
private fun ChartsFallbackPage(page: AppPage, modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = page.label,
        description = "Canvas chart demo using Wash chart primitives for this gallery category.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Sample line series", subtitle = "Weekly wash counts") {
            LineChart(points = indexedChartPoints(ChartSamples.weeklyWashCounts))
        }
        ChartDemoCard(title = "Sample columns", subtitle = "Monthly plate output") {
            ColumnChart(values = ChartSamples.monthlyPlateCounts)
        }
    }
}

@Composable
fun ChartsOverviewPage(onNavigate: (AppPage) -> Unit, modifier: Modifier = Modifier) {
    val colors = WashTheme.colors
    ChartShowcaseScaffold(
        title = "Charts overview",
        description = "Canvas chart primitives with Wash pigment tokens. Tap a gallery page to open demos.",
        modifier = modifier,
    ) {
        ChartSamples.chartNavLinks.forEach { link ->
            WashPanel(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigate(link.page) },
            ) {
                Text(link.label, color = colors.primary, fontWeight = FontWeight.SemiBold)
                Text(link.description, color = colors.ink_muted, modifier = Modifier.padding(top = 6.dp))
            }
        }
    }
}

@Composable
fun ChartsLinePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Line Charts",
        description = "Basic line series for weekly washes and pigment load.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Washes this week", subtitle = ChartSamples.washWeekLabels.joinToString(" · ")) {
            LineChart(points = indexedChartPoints(ChartSamples.weeklyWashCounts))
        }
        ChartDemoCard(title = "Pigment load trend", subtitle = "Seven-day studio intensity") {
            LineChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
        ChartDemoCard(title = "Dry time trend", subtitle = "Minutes per day") {
            LineChart(points = indexedChartPoints(ChartSamples.dryTimeTrend))
        }
    }
}

@Composable
fun ChartsAreaPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Area Charts",
        description = "Filled curves for pigment load and plate output.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Pigment load area", subtitle = "Filled wash under the trend line") {
            AreaChart(points = indexedChartPoints(ChartSamples.pigmentLoadTrend))
        }
        ChartDemoCard(title = "Weekly plate output", subtitle = "Area under plate counts") {
            AreaChart(points = indexedChartPoints(ChartSamples.weeklyPlateCounts), fillAlpha = 0.28f)
        }
        ChartDemoCard(title = "Dry time area", subtitle = "Studio drying minutes") {
            AreaChart(points = indexedChartPoints(ChartSamples.dryTimeTrend), fillAlpha = 0.42f)
        }
    }
}

@Composable
fun ChartsColumnPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Column charts",
        description = "Vertical columns for monthly plates and series output.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Monthly plates", subtitle = ChartSamples.monthlyPlateLabels.joinToString(" · ")) {
            ColumnChart(values = ChartSamples.monthlyPlateCounts)
        }
        ChartDemoCard(title = "Series plate counts", subtitle = "Atlantic Studies through Coastal Sketches") {
            ColumnChart(values = ChartSamples.seriesPlateCounts.map { it.second })
        }
        ChartDemoCard(title = "Budget delta", subtitle = "Positive and negative studio months") {
            ColumnChart(values = ChartSamples.studioBudgetDelta)
        }
    }
}

@Composable
fun ChartsBarPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Bar Charts",
        description = "Horizontal bars for plate status and budget surplus.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Plate status", subtitle = "Draft through archived") {
            BarChart(values = ChartSamples.plateStatusCounts.map { it.second })
        }
        ChartDemoCard(title = "Series output", subtitle = "Horizontal plate counts by series") {
            BarChart(values = ChartSamples.seriesPlateCounts.map { it.second })
        }
        ChartDemoCard(title = "Budget delta", subtitle = "Signed monthly studio budget") {
            BarChart(values = ChartSamples.studioBudgetDelta)
        }
    }
}

@Composable
fun ChartsPiePage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Pie / Donut Charts",
        description = "Part-to-whole pigment share with pie and donut variants.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Pigment share pie", subtitle = "Studio pigment families") {
            PieChart(values = ChartSamples.pigmentShare.map { it.value })
        }
        ChartDemoCard(title = "Pigment share donut", subtitle = "Donut with inner studio hole") {
            DonutChart(slices = ChartSamples.pigmentShare)
        }
        ChartDemoCard(title = "Plate status pie", subtitle = "Workflow status mix") {
            PieChart(values = ChartSamples.plateStatusCounts.map { it.second })
        }
    }
}

@Composable
fun ChartsScatterPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Scatter Charts",
        description = "Numeric scatter for pigment viscosity and load.",
        modifier = modifier,
    ) {
        ChartDemoCard(title = "Pigment viscosity", subtitle = "Load vs viscosity by family") {
            ScatterChart(series = ChartSamples.pigmentViscosityScatter)
        }
        ChartDemoCard(title = "Weekly washes", subtitle = "Indexed wash scatter") {
            ScatterChart(
                series = listOf(
                    com.mariesta.menzies.washui.charts.ScatterSeries(
                        name = "Washes",
                        points = indexedChartPoints(ChartSamples.weeklyWashCounts),
                    ),
                ),
            )
        }
    }
}

@Composable
fun ChartsRadarPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(
        title = "Radar Charts",
        description = "Spider charts for studio skill dimensions by pigment.",
        modifier = modifier,
    ) {
        ChartDemoCard(
            title = "Cerulean wash skills",
            subtitle = ChartSamples.studioSkillDimensions.joinToString(" · "),
        ) {
            RadarChart(
                categories = ChartSamples.studioSkillDimensions,
                series = listOf(ChartSamples.basicRadarSeries),
            )
        }
        ChartDemoCard(title = "Multi-pigment comparison", subtitle = "Cerulean, Ochre, and Madder overlays") {
            RadarChart(
                categories = ChartSamples.studioSkillDimensions,
                series = ChartSamples.multiRadarSeries,
                fillAlpha = 0.14f,
            )
        }
    }
}

@Composable
private fun ChartShowcaseScaffold(
    title: String,
    description: String,
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
            Text(title, color = colors.base_content, fontWeight = FontWeight.Bold)
            Text(description, color = colors.ink_muted, modifier = Modifier.padding(top = 8.dp))
        }
        content()
    }
}

@Composable
private fun ChartDemoCard(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier,
    chart: @Composable () -> Unit,
) {
    val colors = WashTheme.colors
    WashPanel(modifier = modifier.fillMaxWidth()) {
        Text(title, color = colors.base_content, fontWeight = FontWeight.SemiBold)
        Text(subtitle, color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp, bottom = 12.dp))
        chart()
    }
}
