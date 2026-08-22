#!/usr/bin/env python3
"""Wrap every ShowcaseTabs preview prop in a fragment for valid JSX."""

from __future__ import annotations

import sys
from pathlib import Path

PAGES = [
    'DataTablePage.tsx',
    'DateTimeFieldsPage.tsx',
    'DialogPage.tsx',
    'DiffPage.tsx',
    'DividerPage.tsx',
    'DockPage.tsx',
    'DrawerPage.tsx',
    'DropdownPage.tsx',
    'FabPage.tsx',
    'FieldsetPage.tsx',
    'FileInputPage.tsx',
    'FilterPage.tsx',
    'FloatingPanelPage.tsx',
    'FooterPage.tsx',
    'Hover3dCardPage.tsx',
    'HoverGalleryPage.tsx',
    'IndicatorPage.tsx',
    'JoinPage.tsx',
    'KbdPage.tsx',
    'LabelPage.tsx',
    'LayersPage.tsx',
    'LinksPage.tsx',
    'ListPage.tsx',
    'LoadingPage.tsx',
    'MegamenuPage.tsx',
    'MenuPage.tsx',
    'MockupPage.tsx',
    'NavbarPage.tsx',
    'OrgChartPage.tsx',
    'OtpPage.tsx',
    'PaginationPage.tsx',
    'PalettePage.tsx',
    'ProgressPage.tsx',
]


def fix_preview_blocks(content: str) -> str:
    out: list[str] = []
    i = 0
    needle = 'preview={'
    while True:
        idx = content.find(needle, i)
        if idx == -1:
            out.append(content[i:])
            break
        out.append(content[i:idx])
        brace = content.index('{', idx + len('preview'))
        depth = 0
        j = brace
        while j < len(content):
            ch = content[j]
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    break
            j += 1
        inner = content[brace + 1 : j]
        stripped = inner.strip()
        pad = '              '
        if stripped.startswith('<>'):
            out.append(content[idx : j + 1])
        else:
            wrapped = (
                f'preview={{\n{pad}<>\n'
                + inner.rstrip('\n')
                + f'\n{pad}</>\n            }}'
            )
            out.append(wrapped)
        i = j + 1
    return ''.join(out)


def main() -> int:
    src = Path(__file__).resolve().parents[1] / 'src'
    names = PAGES if len(sys.argv) == 1 else sys.argv[1:]
    for name in names:
        path = src / name
        if not path.exists():
            continue
        original = path.read_text()
        updated = fix_preview_blocks(original)
        if updated != original:
            path.write_text(updated)
            print(f'fixed: {name}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
