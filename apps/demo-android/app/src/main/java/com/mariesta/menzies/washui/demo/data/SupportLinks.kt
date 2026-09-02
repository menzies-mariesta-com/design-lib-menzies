package com.mariesta.menzies.washui.demo.data

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Star
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector

data class SupportLink(
    val name: String,
    val description: String,
    val supportLabel: String,
    val href: String,
    val icon: ImageVector,
    val accentColor: Color,
)

val librarySupportLinks: List<SupportLink> = listOf(
    SupportLink(
        name = "React",
        description = "Components, provider, and hooks",
        supportLabel = "React Foundation",
        href = "https://react.foundation/",
        icon = Icons.Default.Share,
        accentColor = Color(0xFF38BDF8),
    ),
    SupportLink(
        name = "TypeScript",
        description = "Typed APIs across the monorepo",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/microsoft",
        icon = Icons.Default.Info,
        accentColor = Color(0xFF3178C6),
    ),
    SupportLink(
        name = "Tailwind CSS",
        description = "Utility layout and responsive tokens",
        supportLabel = "Partner program",
        href = "https://tailwindcss.com/sponsor",
        icon = Icons.Default.Palette,
        accentColor = Color(0xFF38BDF8),
    ),
    SupportLink(
        name = "daisyUI",
        description = "Semantic components and theme slots",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/saadeghi/daisyui?sponsor=1",
        icon = Icons.Default.Favorite,
        accentColor = Color(0xFFFD6F9C),
    ),
    SupportLink(
        name = "Simple Icons",
        description = "SVG brand icons for products and services",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/simple-icons",
        icon = Icons.Default.Star,
        accentColor = Color(0xFF94A3B8),
    ),
    SupportLink(
        name = "Lucide",
        description = "Tree-shakeable UI icon set",
        supportLabel = "Open Collective",
        href = "https://opencollective.com/lucide-icons",
        icon = Icons.Default.Settings,
        accentColor = Color(0xFFFBBF24),
    ),
    SupportLink(
        name = "Vite",
        description = "Library and demo build tooling",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/vitejs/vite?sponsor=1",
        icon = Icons.Default.Share,
        accentColor = Color(0xFF34D399),
    ),
    SupportLink(
        name = "ApexCharts",
        description = "Pigment-aware chart primitives",
        supportLabel = "GitHub Sponsors",
        href = "https://github.com/sponsors/apexcharts",
        icon = Icons.Default.Info,
        accentColor = Color(0xFFF87171),
    ),
)

val washUiSupportLink = SupportLink(
    name = "Wash UI",
    description = "Menzies Design watercolor component library",
    supportLabel = "Star on GitHub",
    href = "https://github.com/menzies-mariesta-com/design-lib-menzies",
    icon = Icons.Default.Star,
    accentColor = Color(0xFFF62440),
)
