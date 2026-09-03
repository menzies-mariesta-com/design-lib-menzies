package com.mariesta.menzies.washui.demo.data

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import com.mariesta.menzies.washui.icons.BrandIcons
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.brands.Daisyui
import com.mariesta.menzies.washui.icons.brands.GitHub
import com.mariesta.menzies.washui.icons.brands.Lucide
import com.mariesta.menzies.washui.icons.brands.ReactBrand
import com.mariesta.menzies.washui.icons.brands.SimpleIcons
import com.mariesta.menzies.washui.icons.brands.Tailwindcss
import com.mariesta.menzies.washui.icons.brands.TypeScript
import com.mariesta.menzies.washui.icons.brands.Vite
import com.mariesta.menzies.washui.icons.lucide.ChartLine

data class SupportLink(
    val name: String,
    val supportLabel: String,
    val href: String,
    val icon: ImageVector,
    val accentColor: Color,
    /** When true, keep Simple Icons baked-in colors ([Color.Unspecified] tint). */
    val preserveIconColors: Boolean = true,
)

val librarySupportLinks: List<SupportLink> by lazy { listOf(
    SupportLink(
        name = "React",
        supportLabel = "React Foundation",
        href = "https://react.foundation/",
        icon = BrandIcons.ReactBrand,
        accentColor = Color(0xFF38BDF8),
    ),
    SupportLink(
        name = "TypeScript",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/microsoft",
        icon = BrandIcons.TypeScript,
        accentColor = Color(0xFF3178C6),
    ),
    SupportLink(
        name = "Tailwind CSS",
        supportLabel = "Partner program",
        href = "https://tailwindcss.com/sponsor",
        icon = BrandIcons.Tailwindcss,
        accentColor = Color(0xFF38BDF8),
    ),
    SupportLink(
        name = "daisyUI",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/saadeghi/daisyui?sponsor=1",
        icon = BrandIcons.Daisyui,
        accentColor = Color(0xFFFD6F9C),
    ),
    SupportLink(
        name = "Simple Icons",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/simple-icons",
        icon = BrandIcons.SimpleIcons,
        accentColor = Color(0xFF94A3B8),
    ),
    SupportLink(
        name = "Lucide",
        supportLabel = "Open Collective",
        href = "https://opencollective.com/lucide-icons",
        icon = BrandIcons.Lucide,
        accentColor = Color(0xFFFBBF24),
    ),
    SupportLink(
        name = "Vite",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/vitejs/vite?sponsor=1",
        icon = BrandIcons.Vite,
        accentColor = Color(0xFF34D399),
    ),
    SupportLink(
        name = "ApexCharts",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/apexcharts",
        icon = LucideIcons.ChartLine,
        accentColor = Color(0xFFF87171),
        preserveIconColors = false,
    ),
)
}

val washUiSupportLink = SupportLink(
    name = "Wash UI",
    supportLabel = "Star on GitHub",
    href = "https://github.com/menzies-mariesta-com/design-lib-menzies",
    icon = BrandIcons.GitHub,
    accentColor = Color(0xFFF62440),
)
