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
    ChartShowcaseScaffold(title = page.label, modifier = modifier) {
        ChartDemoCard(title = "Sample line", subtitle = "Weekly washes") {
            LineChart(points = indexedChartPoints(ChartSamples.weeklyWashCounts))
        }
        ChartDemoCard(title = "Sample columns", subtitle = "Monthly plates") {
            ColumnChart(values = ChartSamples.monthlyPlateCounts)
        }
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
                Text(link.label, color = colors.primary, fontWeight = FontWeight.SemiBold)
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
fun ChartsScatterPage(modifier: Modifier = Modifier) {
    ChartShowcaseScaffold(title = "Scatter Charts", modifier = modifier) {
        ChartDemoCard(title = "Viscosity vs load") {
            ScatterChart(series = ChartSamples.pigmentViscosityScatter)
        }
        ChartDemoCard(title = "Weekly washes") {
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
            Text(title, color = colors.base_content, fontWeight = FontWeight.Bold)
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
        Text(title, color = colors.base_content, fontWeight = FontWeight.SemiBold)
        if (!subtitle.isNullOrBlank()) {
            Text(subtitle, color = colors.ink_muted, modifier = Modifier.padding(top = 4.dp, bottom = 12.dp))
        } else {
            androidx.compose.foundation.layout.Spacer(modifier = Modifier.padding(bottom = 12.dp))
        }
        chart()
    }
}
