#!/usr/bin/env python3
"""Generate WashColorSchemesGenerated.kt from web themes.css."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
css_path = ROOT / "packages/menzies-design-wash-ui/src/styles/themes.css"
out_path = (
    ROOT
    / "packages/menzies-design-wash-compose/src/commonMain/kotlin/com/mariesta/menzies/washui/theme/WashColorSchemesGenerated.kt"
)

COLOR_KEYS = [
    "base_100",
    "base_200",
    "base_300",
    "base_content",
    "primary",
    "primary_content",
    "secondary",
    "secondary_content",
    "accent",
    "accent_content",
    "neutral",
    "neutral_content",
    "info",
    "info_content",
    "success",
    "success_content",
    "warning",
    "warning_content",
    "error",
    "error_content",
]

PIGMENT_ENUM = [
    "mineral", "indigo", "celadon", "vermilion", "sepia", "cobalt", "moss", "saffron",
    "slate", "lake", "ultramarine", "viridian", "madder", "ochre", "umber", "ivory",
    "cerulean", "crimson", "olive", "sienna", "turquoise", "lavender", "charcoal", "coral",
    "pine", "bronze", "mist", "rust", "jade", "ink",
]


def parse_hex(block: str, key: str) -> str:
    pat = key.replace("_", "-")
    m = re.search(rf"--color-{pat}:\s*(#[0-9a-fA-F]+)", block)
    return m.group(1).upper() if m else "#000000"


def theme_key(name: str) -> tuple[str, bool]:
    if name.endswith("-dark"):
        return name[:-5].replace("-", "_"), True
    return name.replace("-", "_"), False


def main() -> None:
    css = css_path.read_text()
    blocks = re.findall(r'@plugin "daisyui/theme" \{(.*?)\n\}', css, re.DOTALL)
    entries = []
    for block in blocks:
        name_m = re.search(r'name:\s*"([^"]+)"', block)
        if not name_m:
            continue
        name = name_m.group(1)
        pigment_id, is_dark = theme_key(name)
        colors = {k: parse_hex(block, k) for k in COLOR_KEYS}
        rb = re.search(r"--radius-box:\s*([^;]+);", block)
        rf = re.search(r"--radius-field:\s*([^;]+);", block)
        radius_box = rb.group(1).strip() if rb else "1rem"
        radius_field = rf.group(1).strip() if rf else "1rem"
        entries.append((name, pigment_id, is_dark, colors, radius_box, radius_field))

    lines: list[str] = [
        "// AUTO-GENERATED from menzies-design-wash-ui/src/styles/themes.css",
        "// Regenerate: python3 scripts/generate_wash_compose_themes.py",
        "package com.mariesta.menzies.washui.theme",
        "",
        "import androidx.compose.ui.graphics.Color",
        "import androidx.compose.ui.unit.dp",
        "",
        "internal fun parseWashHex(hex: String): Color {",
        '    val h = hex.removePrefix("#")',
        "    return Color(0xFF000000L or h.toLong(16))",
        "}",
        "",
        "internal val generatedWashSchemes: Map<String, WashColorScheme> = mapOf(",
    ]

    for i, (_name, pigment_id, is_dark, colors, rb, rf) in enumerate(entries):
        key = f"{pigment_id}_{'dark' if is_dark else 'light'}"
        comma = "," if i < len(entries) - 1 else ""
        color_lines = ",\n        ".join(f"{k} = parseWashHex(\"{v}\")" for k, v in colors.items())
        rb_val = "16.dp" if "1rem" in rb else "12.dp"
        rf_val = "16.dp" if "1rem" in rf else "12.dp"
        lines.extend(
            [
                f'    "{key}" to WashColorScheme(',
                f"        pigment = WashPigment.{pigment_id},",
                f"        mode = WashMode.{'Dark' if is_dark else 'Light'},",
                f"        {color_lines},",
                f"        radiusBox = {rb_val},",
                f"        radiusField = {rf_val},",
                f"    ){comma}",
            ]
        )

    lines.extend(
        [
            ")",
            "",
            "internal fun schemeKey(pigment: WashPigment, mode: WashMode): String =",
            '    "${pigment.name.lowercase()}_${mode.name.lowercase()}"',
            "",
            "fun resolveWashColorScheme(pigment: WashPigment, mode: WashMode): WashColorScheme =",
            '    generatedWashSchemes[schemeKey(pigment, mode)]',
            '        ?: generatedWashSchemes["mineral_light"]!!',
            "",
        ]
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines))
    print(f"Wrote {out_path} ({len(entries)} schemes)")


if __name__ == "__main__":
    main()
