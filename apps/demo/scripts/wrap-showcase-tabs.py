#!/usr/bin/env python3
"""Wrap Section bodies in demo gallery pages with ShowcaseTabs."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

PAGES = [
    'AccordionPage.tsx',
    'AlertPage.tsx',
    'AppBarPage.tsx',
    'AspectRatioPage.tsx',
    'AuraPage.tsx',
    'AutocompletePage.tsx',
    'AvatarPage.tsx',
    'BadgePage.tsx',
    'BentoMasonryPage.tsx',
    'BottomSheetPage.tsx',
    'ButtonsPage.tsx',
    'CalendarPage.tsx',
    'CardPage.tsx',
    'CarouselPage.tsx',
    'ChatBubblePage.tsx',
    'CheckboxPage.tsx',
    'ChipPage.tsx',
    'CollapsePage.tsx',
    'ContextMenuPage.tsx',
    'CountdownPage.tsx',
]


def add_import(content: str) -> str:
    if "from './components/ShowcaseTabs'" in content:
        return content

    react_import = re.search(
        r"^import .+ from 'react'\s*$", content, re.MULTILINE
    )
    import_line = "import { ShowcaseTabs } from './components/ShowcaseTabs'"
    if react_import:
        insert_at = react_import.end()
        return content[:insert_at] + '\n' + import_line + content[insert_at:]
    return import_line + '\n' + content


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
    html = re.sub(r'\bdisabled=\{[^}]+\}', 'disabled', html)
    html = re.sub(r'\bonClick=\{[^}]+\}', '', html)
    html = re.sub(r'\bonChange=\{[^}]+\}', '', html)
    html = re.sub(r'\bref=\{[^}]+\}', '', html)
    html = re.sub(r'\btabIndex=\{[^}]+\}', 'tabindex="0"', html)
    html = re.sub(r'\bstyle=\{\{[^}]+\}\}', '', html)
    html = re.sub(r'\{\/\*[^*]*\*\/\}', '', html)
    html = re.sub(r'<(\w+)\.(\w+)', r'<!-- \1.\2 -->', html)
    html = re.sub(r'<([A-Z][A-Za-z0-9]*)\b[^>]*>.*?</\1>', r'<!-- \1 -->', html, flags=re.DOTALL)
    html = re.sub(r'<([A-Z][A-Za-z0-9]*)\b[^>]*/>', r'<!-- \1 -->', html)
    html = re.sub(r'src=\{[^}]+\}', 'src="/hero.png"', html)
    html = re.sub(r'\s*/>', ' />', html)
    html = re.sub(r'\n{3,}', '\n\n', html)
    return html.strip()


def indent(text: str, spaces: int) -> str:
    pad = ' ' * spaces
    return '\n'.join(pad + line if line.strip() else line for line in text.splitlines())


def wrap_section(match: re.Match[str]) -> str:
    opening, body, closing = match.group(1), match.group(2), match.group(3)
    stripped = body.strip()

    if not stripped or 'ShowcaseTabs' in stripped:
        return match.group(0)

    preview = stripped
    jsx = stripped
    html = jsx_to_html(stripped)
    jsx_literal = json.dumps(jsx)
    html_literal = json.dumps(html)

    wrapped = (
        f'{opening}\n'
        f'          <ShowcaseTabs\n'
        f'            preview={{\n'
        f'              <>\n'
        f'{indent(preview, 16)}\n'
        f'              </>\n'
        f'            }}\n'
        f'            html={{{html_literal}}}\n'
        f'            jsx={{{jsx_literal}}}\n'
        f'          />\n'
        f'        {closing}'
    )
    return wrapped


def transform(content: str) -> str:
    content = add_import(content)
    pattern = re.compile(
        r'(\s*<Section\b[^>]*>)(.*?)(\s*</Section>)',
        re.DOTALL,
    )
    return pattern.sub(wrap_section, content)


def main() -> int:
    src = Path(__file__).resolve().parents[1] / 'src'
    names = PAGES if len(sys.argv) == 1 else sys.argv[1:]

    for name in names:
        path = src / name
        if not path.exists():
            print(f'skip missing: {name}')
            continue
        original = path.read_text()
        if 'ShowcaseTabs' in original and 'GallerySection' not in original:
            # ButtonsPage and other hand-wrapped pages
            if name == 'ButtonsPage.tsx':
                print(f'skip already wrapped: {name}')
                continue
        updated = transform(original)
        path.write_text(updated)
        print(f'updated: {name}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
