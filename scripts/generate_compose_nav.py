#!/usr/bin/env python3
"""Generate AppPage.kt from web nav.ts for demo-android."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
nav_ts = (ROOT / "apps/demo/src/nav.ts").read_text()
pages = re.findall(r"\| '([^']+)'", nav_ts.split("export type AppPage")[1].split("export type NavItem")[0])

enum_entries = []
for p in pages:
    key = p.upper().replace("-", "_")
    enum_entries.append(f'    {key}("{p}"),')

out = ROOT / "apps/demo-android/app/src/main/java/com/mariesta/menzies/washui/demo/nav/AppPage.kt"
out.parent.mkdir(parents=True, exist_ok=True)
content = f"""package com.mariesta.menzies.washui.demo.nav

enum class AppPage(val id: String) {{
{chr(10).join(enum_entries)}
    ;

    companion object {{
        fun fromId(id: String): AppPage? = entries.find {{ it.id == id }}
    }}
}}
"""
out.write_text(content)
print(f"Wrote {out} with {len(pages)} pages")
