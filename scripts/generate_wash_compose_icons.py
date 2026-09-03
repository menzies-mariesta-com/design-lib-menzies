#!/usr/bin/env python3
"""Generate Compose ImageVector icons from lucide-react + simple-icons (node_modules)."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_LUCIDE = ROOT / "packages/menzies-design-wash-compose/src/commonMain/kotlin/com/mariesta/menzies/washui/icons/lucide"
OUT_BRANDS = ROOT / "packages/menzies-design-wash-compose/src/commonMain/kotlin/com/mariesta/menzies/washui/icons/brands"
HELPER = ROOT / "packages/menzies-design-wash-compose/src/commonMain/kotlin/com/mariesta/menzies/washui/icons/WashIcons.kt"

LUCIDE_ICONS = [
    "align-left",
    "arrow-right",
    "book-open",
    "chart-line",
    "chevron-down",
    "chevron-up",
    "ellipsis-vertical",
    "external-link",
    "eye",
    "eye-off",
    "folder-open",
    "heart",
    "image",
    "key-round",
    "layers",
    "layout-dashboard",
    "layout-grid",
    "menu",
    "mouse-pointer-click",
    "palette",
    "scroll-text",
    "search",
    "settings",
    "share-2",
    "square",
    "square-stack",
    "star",
    "swatch-book",
    "table-2",
    "x",
]

BRAND_EXPORTS = {
    "Angular": "siAngular",
    "Astro": "siAstro",
    "Daisyui": "siDaisyui",
    "Eleventy": "siEleventy",
    "GitHub": "siGithub",
    "Html5": "siHtml5",
    "Lit": "siLit",
    "Lucide": "siLucide",
    "Nextjs": "siNextdotjs",
    "Nuxt": "siNuxt",
    "Preact": "siPreact",
    "Qwik": "siQwik",
    "ReactBrand": "siReact",
    "Remix": "siRemix",
    "SimpleIcons": "siSimpleicons",
    "Solid": "siSolid",
    "Svelte": "siSvelte",
    "Tailwindcss": "siTailwindcss",
    "TypeScript": "siTypescript",
    "Vite": "siVite",
    "Vue": "siVuedotjs",
}


def kebab_to_pascal(name: str) -> str:
    return "".join(part.capitalize() for part in name.replace("_", "-").split("-"))



def fnum(v: float) -> str:
    s = f"{v:.4f}".rstrip("0").rstrip(".")
    if s in ("", "-"):
        s = "0"
    return s + "f"


class SvgPathReader:
    def __init__(self, d: str):
        self.d = d
        self.i = 0

    def eof(self) -> bool:
        return self.i >= len(self.d)

    def skip_sep(self) -> None:
        while self.i < len(self.d) and self.d[self.i] in " ,\t\n\r":
            self.i += 1

    def peek_cmd(self) -> str | None:
        self.skip_sep()
        if self.eof():
            return None
        ch = self.d[self.i]
        return ch if ch.isalpha() else None

    def read_cmd(self) -> str:
        self.skip_sep()
        ch = self.d[self.i]
        self.i += 1
        return ch

    def read_number(self) -> float:
        self.skip_sep()
        start = self.i
        if self.i < len(self.d) and self.d[self.i] in "+-":
            self.i += 1
        if self.i < len(self.d) and self.d[self.i] == ".":
            self.i += 1
            while self.i < len(self.d) and self.d[self.i].isdigit():
                self.i += 1
        else:
            while self.i < len(self.d) and self.d[self.i].isdigit():
                self.i += 1
            if self.i < len(self.d) and self.d[self.i] == ".":
                self.i += 1
                while self.i < len(self.d) and self.d[self.i].isdigit():
                    self.i += 1
        if self.i < len(self.d) and self.d[self.i] in "eE":
            self.i += 1
            if self.i < len(self.d) and self.d[self.i] in "+-":
                self.i += 1
            while self.i < len(self.d) and self.d[self.i].isdigit():
                self.i += 1
        if start == self.i:
            raise ValueError(f"expected number at {self.i} in {self.d[self.i:self.i+20]!r}")
        return float(self.d[start:self.i])

    def read_flag(self) -> int:
        self.skip_sep()
        if self.eof() or self.d[self.i] not in "01":
            raise ValueError(f"expected arc flag at {self.i}")
        flag = int(self.d[self.i])
        self.i += 1
        return flag

    def has_number(self) -> bool:
        self.skip_sep()
        if self.eof():
            return False
        ch = self.d[self.i]
        return ch in "+-." or ch.isdigit()


def path_to_compose(d: str, indent: str = "            ") -> str:
    """Convert SVG path data into Compose PathBuilder statements."""
    reader = SvgPathReader(d)
    lines: list[str] = []
    cx = cy = 0.0
    start_x = start_y = 0.0
    last_cmd = ""
    ctrl_x = ctrl_y = 0.0

    while not reader.eof():
        cmd_peek = reader.peek_cmd()
        if cmd_peek is not None:
            cmd = reader.read_cmd()
        else:
            if not reader.has_number():
                break
            if last_cmd in ("M", "m"):
                cmd = "L" if last_cmd == "M" else "l"
            elif last_cmd:
                cmd = last_cmd
            else:
                raise ValueError(f"number without command in {d!r}")
        prev_cmd = last_cmd
        last_cmd = cmd

        if cmd == "M":
            x, y = reader.read_number(), reader.read_number()
            lines.append(f"{indent}moveTo({fnum(x)}, {fnum(y)})")
            cx, cy = x, y
            start_x, start_y = x, y
            while reader.has_number():
                x, y = reader.read_number(), reader.read_number()
                lines.append(f"{indent}lineTo({fnum(x)}, {fnum(y)})")
                cx, cy = x, y
                last_cmd = "L"
        elif cmd == "m":
            dx, dy = reader.read_number(), reader.read_number()
            cx, cy = cx + dx, cy + dy
            lines.append(f"{indent}moveTo({fnum(cx)}, {fnum(cy)})")
            start_x, start_y = cx, cy
            while reader.has_number():
                dx, dy = reader.read_number(), reader.read_number()
                cx, cy = cx + dx, cy + dy
                lines.append(f"{indent}lineTo({fnum(cx)}, {fnum(cy)})")
                last_cmd = "l"
        elif cmd == "L":
            while True:
                x, y = reader.read_number(), reader.read_number()
                lines.append(f"{indent}lineTo({fnum(x)}, {fnum(y)})")
                cx, cy = x, y
                if not reader.has_number():
                    break
        elif cmd == "l":
            while True:
                dx, dy = reader.read_number(), reader.read_number()
                cx, cy = cx + dx, cy + dy
                lines.append(f"{indent}lineTo({fnum(cx)}, {fnum(cy)})")
                if not reader.has_number():
                    break
        elif cmd == "H":
            while True:
                x = reader.read_number()
                lines.append(f"{indent}horizontalLineTo({fnum(x)})")
                cx = x
                if not reader.has_number():
                    break
        elif cmd == "h":
            while True:
                cx += reader.read_number()
                lines.append(f"{indent}horizontalLineTo({fnum(cx)})")
                if not reader.has_number():
                    break
        elif cmd == "V":
            while True:
                y = reader.read_number()
                lines.append(f"{indent}verticalLineTo({fnum(y)})")
                cy = y
                if not reader.has_number():
                    break
        elif cmd == "v":
            while True:
                cy += reader.read_number()
                lines.append(f"{indent}verticalLineTo({fnum(cy)})")
                if not reader.has_number():
                    break
        elif cmd == "C":
            while True:
                x1, y1 = reader.read_number(), reader.read_number()
                x2, y2 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                lines.append(
                    f"{indent}curveTo({fnum(x1)}, {fnum(y1)}, {fnum(x2)}, {fnum(y2)}, {fnum(x)}, {fnum(y)})"
                )
                ctrl_x, ctrl_y = x2, y2
                cx, cy = x, y
                if not reader.has_number():
                    break
        elif cmd == "c":
            while True:
                x1, y1 = reader.read_number(), reader.read_number()
                x2, y2 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                abs_x1, abs_y1 = cx + x1, cy + y1
                abs_x2, abs_y2 = cx + x2, cy + y2
                cx, cy = cx + x, cy + y
                lines.append(
                    f"{indent}curveTo({fnum(abs_x1)}, {fnum(abs_y1)}, {fnum(abs_x2)}, {fnum(abs_y2)}, {fnum(cx)}, {fnum(cy)})"
                )
                ctrl_x, ctrl_y = abs_x2, abs_y2
                if not reader.has_number():
                    break
        elif cmd == "S":
            while True:
                x2, y2 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                if prev_cmd.lower() in ("c", "s"):
                    x1, y1 = 2 * cx - ctrl_x, 2 * cy - ctrl_y
                else:
                    x1, y1 = cx, cy
                lines.append(
                    f"{indent}curveTo({fnum(x1)}, {fnum(y1)}, {fnum(x2)}, {fnum(y2)}, {fnum(x)}, {fnum(y)})"
                )
                ctrl_x, ctrl_y = x2, y2
                cx, cy = x, y
                last_cmd = "S"
                if not reader.has_number():
                    break
        elif cmd == "s":
            while True:
                x2, y2 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                if prev_cmd.lower() in ("c", "s"):
                    x1, y1 = 2 * cx - ctrl_x, 2 * cy - ctrl_y
                else:
                    x1, y1 = cx, cy
                abs_x2, abs_y2 = cx + x2, cy + y2
                cx, cy = cx + x, cy + y
                lines.append(
                    f"{indent}curveTo({fnum(x1)}, {fnum(y1)}, {fnum(abs_x2)}, {fnum(abs_y2)}, {fnum(cx)}, {fnum(cy)})"
                )
                ctrl_x, ctrl_y = abs_x2, abs_y2
                last_cmd = "s"
                if not reader.has_number():
                    break
        elif cmd == "Q":
            while True:
                x1, y1 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                lines.append(f"{indent}quadTo({fnum(x1)}, {fnum(y1)}, {fnum(x)}, {fnum(y)})")
                ctrl_x, ctrl_y = x1, y1
                cx, cy = x, y
                if not reader.has_number():
                    break
        elif cmd == "q":
            while True:
                x1, y1 = reader.read_number(), reader.read_number()
                x, y = reader.read_number(), reader.read_number()
                abs_x1, abs_y1 = cx + x1, cy + y1
                cx, cy = cx + x, cy + y
                lines.append(f"{indent}quadTo({fnum(abs_x1)}, {fnum(abs_y1)}, {fnum(cx)}, {fnum(cy)})")
                ctrl_x, ctrl_y = abs_x1, abs_y1
                if not reader.has_number():
                    break
        elif cmd == "T":
            while True:
                x, y = reader.read_number(), reader.read_number()
                if prev_cmd.lower() in ("q", "t"):
                    x1, y1 = 2 * cx - ctrl_x, 2 * cy - ctrl_y
                else:
                    x1, y1 = cx, cy
                lines.append(f"{indent}quadTo({fnum(x1)}, {fnum(y1)}, {fnum(x)}, {fnum(y)})")
                ctrl_x, ctrl_y = x1, y1
                cx, cy = x, y
                last_cmd = "T"
                if not reader.has_number():
                    break
        elif cmd == "t":
            while True:
                x, y = reader.read_number(), reader.read_number()
                if prev_cmd.lower() in ("q", "t"):
                    x1, y1 = 2 * cx - ctrl_x, 2 * cy - ctrl_y
                else:
                    x1, y1 = cx, cy
                cx, cy = cx + x, cy + y
                lines.append(f"{indent}quadTo({fnum(x1)}, {fnum(y1)}, {fnum(cx)}, {fnum(cy)})")
                ctrl_x, ctrl_y = x1, y1
                last_cmd = "t"
                if not reader.has_number():
                    break
        elif cmd in ("A", "a"):
            relative = cmd == "a"
            while True:
                rx, ry, rot = reader.read_number(), reader.read_number(), reader.read_number()
                large, sweep = reader.read_flag(), reader.read_flag()
                x, y = reader.read_number(), reader.read_number()
                if relative:
                    x, y = cx + x, cy + y
                lines.append(
                    f"{indent}arcTo("
                    f"horizontalEllipseRadius = {fnum(rx)}, "
                    f"verticalEllipseRadius = {fnum(ry)}, "
                    f"theta = {fnum(rot)}, "
                    f"isMoreThanHalf = {'true' if large else 'false'}, "
                    f"isPositiveArc = {'true' if sweep else 'false'}, "
                    f"x1 = {fnum(x)}, "
                    f"y1 = {fnum(y)}"
                    f")"
                )
                cx, cy = x, y
                if not reader.has_number():
                    break
        elif cmd in ("Z", "z"):
            lines.append(f"{indent}close()")
            cx, cy = start_x, start_y
        else:
            raise ValueError(f"Unsupported SVG command: {cmd}")

    return "\n".join(lines)


def load_lucide_nodes(name: str) -> list:
    file = ROOT / "node_modules/lucide-react/dist/esm/icons" / f"{name}.mjs"
    script = f"""
const fs = require('fs');
const path = require('path');
let file = {json.dumps(str(file))};
let src = fs.readFileSync(file, 'utf8');
const reexport = src.match(/export \\{{ default \\}} from '\\.\\/([^']+)\\.mjs'/);
if (reexport) {{
  file = path.join(path.dirname(file), reexport[1] + '.mjs');
  src = fs.readFileSync(file, 'utf8');
}}
const match = src.match(/const __iconNode = (\\[[\\s\\S]*?\\]);/);
if (!match) throw new Error('missing icon node in ' + file);
process.stdout.write(JSON.stringify(eval(match[1])));
"""
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def element_to_path_d(tag: str, attrs: dict) -> tuple[str, bool]:
    """Return (path d, filled). filled=True means solid fill, no stroke."""
    if tag == "path":
        filled = attrs.get("fill") == "currentColor"
        return attrs["d"], filled
    if tag == "circle":
        cx, cy, r = float(attrs["cx"]), float(attrs["cy"]), float(attrs["r"])
        # Approximate circle as two arcs
        d = (
            f"M {cx - r} {cy} "
            f"a {r} {r} 0 1 0 {r * 2} 0 "
            f"a {r} {r} 0 1 0 {-r * 2} 0"
        )
        filled = attrs.get("fill") == "currentColor"
        return d, filled
    if tag == "rect":
        x, y = float(attrs.get("x", 0)), float(attrs.get("y", 0))
        w, h = float(attrs["width"]), float(attrs["height"])
        rx = float(attrs.get("rx", attrs.get("ry", 0)))
        ry = float(attrs.get("ry", rx))
        if rx == 0 and ry == 0:
            d = f"M {x} {y} h {w} v {h} h {-w} Z"
        else:
            # rounded rect
            d = (
                f"M {x + rx} {y} "
                f"H {x + w - rx} "
                f"A {rx} {ry} 0 0 1 {x + w} {y + ry} "
                f"V {y + h - ry} "
                f"A {rx} {ry} 0 0 1 {x + w - rx} {y + h} "
                f"H {x + rx} "
                f"A {rx} {ry} 0 0 1 {x} {y + h - ry} "
                f"V {y + ry} "
                f"A {rx} {ry} 0 0 1 {x + rx} {y} "
                f"Z"
            )
        return d, False
    if tag == "line":
        x1, y1 = float(attrs["x1"]), float(attrs["y1"])
        x2, y2 = float(attrs["x2"]), float(attrs["y2"])
        return f"M {x1} {y1} L {x2} {y2}", False
    if tag == "polyline":
        pts = [tuple(map(float, p.split(","))) for p in attrs["points"].strip().split()]
        d = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {x} {y}" for x, y in pts[1:])
        return d, False
    if tag == "polygon":
        pts = [tuple(map(float, p.split(","))) for p in attrs["points"].strip().split()]
        d = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {x} {y}" for x, y in pts[1:]) + " Z"
        return d, attrs.get("fill") == "currentColor"
    raise ValueError(f"Unsupported lucide element: {tag}")


def generate_lucide_file(name: str) -> str:
    pascal = kebab_to_pascal(name)
    nodes = load_lucide_nodes(name)
    path_blocks: list[str] = []
    for tag, attrs in nodes:
        d, filled = element_to_path_d(tag, attrs)
        body = path_to_compose(d)
        if filled:
            path_blocks.append(
                f"""        path(
            fill = SolidColor(Color.Black),
            stroke = null,
        ) {{
{body}
        }}"""
            )
        else:
            path_blocks.append(
                f"""        path(
            fill = SolidColor(Color.Transparent),
            stroke = SolidColor(Color.Black),
            strokeLineWidth = 2f,
            strokeLineCap = StrokeCap.Round,
            strokeLineJoin = StrokeJoin.Round,
        ) {{
{body}
        }}"""
            )

    joined = "\n".join(path_blocks)
    cache = f"_{pascal[0].lower()}{pascal[1:]}"
    return f"""// Generated by scripts/generate_wash_compose_icons.py. Do not edit by hand.
package com.mariesta.menzies.washui.icons.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.icons.LucideIcons

private var {cache}: ImageVector? = null

public val LucideIcons.{pascal}: ImageVector
    get() {{
        {cache}?.let {{ return it }}
        return ImageVector.Builder(
            name = "Lucide.{pascal}",
            defaultWidth = 24.dp,
            defaultHeight = 24.dp,
            viewportWidth = 24f,
            viewportHeight = 24f,
        ).apply {{
{joined}
        }}.build().also {{ {cache} = it }}
    }}
"""


def load_simple_icons() -> dict:
    script = f"""
const si = require({json.dumps(str(ROOT / 'node_modules/simple-icons'))});
const keys = {json.dumps(list(BRAND_EXPORTS.values()))};
const out = {{}};
for (const k of keys) {{
  const icon = si[k];
  out[k] = {{ title: icon.title, hex: icon.hex, path: icon.path }};
}}
process.stdout.write(JSON.stringify(out));
"""
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def generate_brand_file(export_name: str, si_key: str, data: dict) -> str:
    hex_color = data["hex"]
    color_const = f"0xFF{hex_color.upper()}"
    body = path_to_compose(data["path"])
    cache = f"_{export_name[0].lower()}{export_name[1:]}"
    return f"""// Generated by scripts/generate_wash_compose_icons.py. Do not edit by hand.
package com.mariesta.menzies.washui.icons.brands

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.icons.BrandIcons

private var {cache}: ImageVector? = null

/** {data['title']} brand mark (Simple Icons). */
public val BrandIcons.{export_name}: ImageVector
    get() {{
        {cache}?.let {{ return it }}
        return ImageVector.Builder(
            name = "Brand.{export_name}",
            defaultWidth = 24.dp,
            defaultHeight = 24.dp,
            viewportWidth = 24f,
            viewportHeight = 24f,
        ).apply {{
            path(
                fill = SolidColor(Color({color_const})),
                stroke = null,
            ) {{
{body}
            }}
        }}.build().also {{ {cache} = it }}
    }}
"""


HELPER_KT = """package com.mariesta.menzies.washui.icons

import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/** Marker object for Lucide ImageVectors (lucide-react 1.28.0 paths). */
public object LucideIcons

/** Marker object for Simple Icons brand ImageVectors. */
public object BrandIcons

/**
 * Renders a Wash icon. Brand marks keep baked-in Simple Icons colors when
 * [tint] is [Color.Unspecified]; Lucide strokes tint like Material Icons.
 */
@Composable
public fun WashIcon(
    imageVector: ImageVector,
    contentDescription: String?,
    modifier: Modifier = Modifier,
    tint: Color = Color.Unspecified,
    size: Dp = 24.dp,
) {
    Icon(
        imageVector = imageVector,
        contentDescription = contentDescription,
        modifier = modifier.size(size),
        tint = tint,
    )
}
"""


def main() -> None:
    OUT_LUCIDE.mkdir(parents=True, exist_ok=True)
    OUT_BRANDS.mkdir(parents=True, exist_ok=True)

    # Clear old generated files
    for path in OUT_LUCIDE.glob("*.kt"):
        path.unlink()
    for path in OUT_BRANDS.glob("*.kt"):
        path.unlink()

    HELPER.write_text(HELPER_KT, encoding="utf-8")

    for name in LUCIDE_ICONS:
        pascal = kebab_to_pascal(name)
        (OUT_LUCIDE / f"{pascal}.kt").write_text(generate_lucide_file(name), encoding="utf-8")
        print(f"lucide {pascal}")

    brands = load_simple_icons()
    for export_name, si_key in BRAND_EXPORTS.items():
        (OUT_BRANDS / f"{export_name}.kt").write_text(
            generate_brand_file(export_name, si_key, brands[si_key]),
            encoding="utf-8",
        )
        print(f"brand {export_name}")

    print("done")


if __name__ == "__main__":
    main()
