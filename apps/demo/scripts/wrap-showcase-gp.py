#!/usr/bin/env python3
"""Wrap Sample blocks and Section bodies in G-P demo gallery pages with ShowcaseTabs."""

from __future__ import annotations

import re
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

SKIP_IF_PRESENT = False


def add_import(content: str) -> str:
    if "from './components/ShowcaseTabs'" in content:
        return content
    react_import = re.search(
        r"^import .+ from 'react'\s*$", content, re.MULTILINE
    )
    line = "import { ShowcaseTabs } from './components/ShowcaseTabs'"
    if react_import:
        insert_at = react_import.end()
        return content[:insert_at] + '\n' + line + content[insert_at:]
    return line + '\n' + content


def jsx_to_html(jsx: str) -> str:
    html = jsx
    html = re.sub(r'\bclassName=', 'class=', html)
    html = re.sub(r'\bhtmlFor=', 'for=', html)
    html = re.sub(r'\bdefaultChecked\b', 'checked', html)
    html = re.sub(r'\bdefaultValue=\{([^}]+)\}', r'value="\1"', html)
    html = re.sub(r'\bdefaultValue="([^"]*)"', r'value="\1"', html)
    html = re.sub(r'\bdefaultOpen\b', 'open', html)
    html = re.sub(r'\bstrokeWidth=\{[^}]+\}', '', html)
    html = re.sub(r'\baria-hidden=\{[^}]+\}', 'aria-hidden="true"', html)
    html = re.sub(r'\baria-label=\{[^}]+\}', 'aria-label="Label"', html)
    html = re.sub(r'\baria-pressed=\{[^}]+\}', 'aria-pressed="true"', html)
    html = re.sub(r'\baria-selected=\{[^}]+\}', 'aria-selected="true"', html)
    html = re.sub(r'\baria-live=\{[^}]+\}', 'aria-live="polite"', html)
    html = re.sub(r'\baria-busy=\{[^}]+\}', 'aria-busy="true"', html)
    html = re.sub(r'\bdisabled=\{[^}]+\}', 'disabled', html)
    html = re.sub(r'\bonClick=\{[^}]+\}', '', html)
    html = re.sub(r'\bonChange=\{[^}]+\}', '', html)
    html = re.sub(r'\bonToggle=\{[^}]+\}', '', html)
    html = re.sub(r'\bref=\{[^}]+\}', '', html)
    html = re.sub(r'\btabIndex=\{[^}]+\}', 'tabindex="0"', html)
    html = re.sub(r'\bstyle=\{\{[^}]+\}\}', '', html)
    html = re.sub(r'\bstyle=\{\s*\n[^}]+\}\s*as CSSProperties\}', '', html, flags=re.DOTALL)
    html = re.sub(r'\{\/\*[^*]*\*\/\}', '', html)
    html = re.sub(r'\{[a-zA-Z_][\w.]*\}', '', html)
    html = re.sub(r'\{`[^`]*`\}', '', html)
    html = re.sub(r'\{\s*\.\.\.[^}]+\}', '', html)
    html = re.sub(r'<(\w+)\.(\w+)', r'<!-- \1.\2 -->', html)
    html = re.sub(r'<([A-Z][A-Za-z0-9]*)\b[^>]*>.*?</\1>', r'<!-- \1 -->', html, flags=re.DOTALL)
    html = re.sub(r'<([A-Z][A-Za-z0-9]*)\b[^>]*/>', r'<!-- \1 -->', html)
    html = re.sub(r'src=\{[^}]+\}', 'src="/hero.png"', html)
    html = re.sub(r'\s+/>', ' />', html)
    html = re.sub(r'\n{3,}', '\n\n', html)
    return html.strip()


def escape_backticks(s: str) -> str:
    return s.replace('`', '\\`').replace('${', '\\${')


def indent(text: str, spaces: int) -> str:
    pad = ' ' * spaces
    return '\n'.join(pad + line if line.strip() else line for line in text.splitlines())


def remove_sample_helper(content: str) -> str:
    pattern = re.compile(
        r'\nfunction Sample\(\{[\s\S]*?\n\}\n',
        re.MULTILINE,
    )
    return pattern.sub('\n', content, count=1)


def wrap_sample(match: re.Match[str]) -> str:
    children = match.group(1).strip()
    if 'ShowcaseTabs' in children:
        return match.group(0)
    jsx = children
    html = jsx_to_html(jsx)
    return (
        f'<ShowcaseTabs\n'
        f'            preview={{\n'
        f'{indent(children, 14)}\n'
        f'            }}\n'
        f'            html={{`{escape_backticks(html)}`}}\n'
        f'            jsx={{`{escape_backticks(jsx)}`}}\n'
        f'          />'
    )


def wrap_samples(content: str) -> str:
    if 'function Sample(' not in content:
        return content
    content = remove_sample_helper(content)
    pattern = re.compile(
        r'<Sample\b[^>]*>\s*(.*?)\s*</Sample>',
        re.DOTALL,
    )
    return pattern.sub(wrap_sample, content)


def wrap_section_body(match: re.Match[str]) -> str:
    opening, body, closing = match.group(1), match.group(2), match.group(3)
    stripped = body.strip()
    if not stripped or 'ShowcaseTabs' in stripped:
        return match.group(0)
    preview = stripped
    jsx = stripped
    html = jsx_to_html(stripped)
    return (
        f'{opening}\n'
        f'          <ShowcaseTabs\n'
        f'            preview={{\n'
        f'{indent(preview, 14)}\n'
        f'            }}\n'
        f'            html={{`{escape_backticks(html)}`}}\n'
        f'            jsx={{`{escape_backticks(jsx)}`}}\n'
        f'          />\n'
        f'        {closing}'
    )


def wrap_sections_without_tabs(content: str) -> str:
    pattern = re.compile(
        r'(\s*<Section\b[^>]*>)(.*?)(\s*</Section>)',
        re.DOTALL,
    )
    return pattern.sub(wrap_section_body, content)


def transform(content: str) -> str:
    content = add_import(content)
    content = wrap_samples(content)
    content = wrap_sections_without_tabs(content)
    return content


def main() -> int:
    src = Path(__file__).resolve().parents[1] / 'src'
    names = PAGES if len(sys.argv) == 1 else sys.argv[1:]

    for name in names:
        path = src / name
        if not path.exists():
            print(f'skip missing: {name}')
            continue
        original = path.read_text()
        if SKIP_IF_PRESENT and 'ShowcaseTabs' in original:
            print(f'skip already wrapped: {name}')
            continue
        updated = transform(original)
        if updated != original:
            path.write_text(updated)
            print(f'updated: {name}')
        else:
            print(f'unchanged: {name}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
