import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_code_editor_pane.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class _LspPack {
  const _LspPack(this.label, this.fileName, this.sample);

  final String label;
  final String fileName;
  final String sample;
}

/// Web parity for `CodeEditorTemplatePage language={...}` (22 grammar packs).
class WashLspGalleryPage extends StatelessWidget {
  const WashLspGalleryPage({required this.language, super.key});

  final String language;

  static const _packs = <String, _LspPack>{
    'typescript': _LspPack(
        'TypeScript', 'app.ts', r'''import { initWash } from '#plain/brand'

export function boot(): boolean {
  initWash({ pigment: 'mineral', mode: 'light' })
  return true
}
'''),
    'javascript':
        _LspPack('JavaScript', 'boot.js', r'''export function greet(name) {
  return 'Hello ' + name
}
'''),
    'json': _LspPack('JSON', 'theme.json', r'''{
  "pigment": "mineral",
  "mode": "dark",
  "version": 1
}
'''),
    'css': _LspPack('CSS', 'panel.css', r'''.wash-panel {
  border-radius: 0.75rem;
  background: #f7f4ef;
}
'''),
    'html': _LspPack('HTML', 'card.html', r'''<section class="wash-panel">
  <h2>Plate</h2>
  <p>Studio ready.</p>
</section>
'''),
    'markdown': _LspPack('Markdown', 'NOTES.md', r'''# Studio notes

- Grammar packs, not LSP
- Ctrl/Cmd+F find, Ctrl/Cmd+H replace
'''),
    'plaintext': _LspPack('Plain text', 'notes.txt', r'''Wash UI code editor
Line numbers, tabs, find.
'''),
    'yaml': _LspPack('YAML', 'config.yaml', r'''pigment: mineral
mode: light
features:
  - editors
  - charts
'''),
    'toml': _LspPack('TOML', 'Cargo.toml', r'''[package]
name = "wash-demo"
version = "0.1.0"
'''),
    'xml': _LspPack('XML', 'data.xml', r'''<?xml version="1.0"?>
<root>
  <item id="1">Plate</item>
</root>
'''),
    'sql': _LspPack('SQL', 'query.sql', r'''SELECT id, name
FROM plates
WHERE status = 'Review'
ORDER BY updated_at DESC
LIMIT 25;
'''),
    'graphql': _LspPack('GraphQL', 'schema.graphql', r'''type Plate {
  id: ID!
  name: String!
}

type Query {
  plates: [Plate!]!
}
'''),
    'shell': _LspPack('Shell', 'build.sh', r'''#!/usr/bin/env bash
set -euo pipefail
npm run build
'''),
    'python': _LspPack('Python', 'main.py', r'''def greet(name: str) -> str:
    return f"Hello {name}"

if __name__ == "__main__":
    print(greet("Wash"))
'''),
    'go': _LspPack('Go', 'main.go', r'''package main

import "fmt"

func main() {
  fmt.Println("Wash UI")
}
'''),
    'rust': _LspPack('Rust', 'lib.rs', r'''pub fn boot() -> bool {
    println!("wash");
    true
}
'''),
    'java': _LspPack('Java', 'Main.java', r'''public class Main {
  public static void main(String[] args) {
    System.out.println("Wash UI");
  }
}
'''),
    'c': _LspPack('C', 'main.c', r'''#include <stdio.h>

int main(void) {
  printf("Wash UI\n");
  return 0;
}
'''),
    'cpp': _LspPack('C++', 'main.cpp', r'''#include <iostream>

int main() {
  std::cout << "Wash UI\n";
  return 0;
}
'''),
    'kotlin': _LspPack('Kotlin', 'Main.kt', r'''fun main() {
  println("Wash UI")
}
'''),
    'svelte': _LspPack('Svelte', 'App.svelte', r'''<script lang="ts">
  let count = $state(0)
</script>

<button onclick={() => count += 1}>
  clicks {count}
</button>
'''),
    'vue': _LspPack('Vue', 'App.vue', r'''<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
'''),
  };

  static const _shortcuts =
      'Shortcuts: Ctrl/Cmd+F find, Ctrl/Cmd+H replace, Ctrl/Cmd+G go to line, '
      'Ctrl/Cmd+/ comment, Tab indent. Completions are keyword/snippet packs, '
      'not LSP. Syntax tokens follow the current pigment.';

  _LspPack get _pack => _packs[language] ?? _packs['plaintext']!;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final pack = _pack;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashGalleryPageHero(
          kicker: 'LSP · Grammar pack',
          title: pack.label,
          description:
              'Preview for ${pack.label} only. Theme-aware grammar pack (not a real '
              'language server). Token colors use Wash pigment CSS variables.',
        ),
        Align(
          alignment: Alignment.centerLeft,
          child: IntrinsicWidth(
            child: _CopyCodeButton(code: pack.sample),
          ),
        ),
        const SizedBox(height: 24),
        WashGalleryPanel(
          header: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                pack.label,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 18,
                  height: 26 / 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                _shortcuts,
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 12,
                  height: 1.5,
                ),
              ),
            ],
          ),
          child: WashShowcaseTabs(
            preview: WashCodeEditorPane(
              code: pack.sample,
              fileName: pack.fileName,
              languageLabel: pack.label,
              languageId: language,
            ),
            dartSource: pack.sample,
          ),
        ),
      ],
    );
  }
}

class _CopyCodeButton extends StatefulWidget {
  const _CopyCodeButton({required this.code});
  final String code;

  @override
  State<_CopyCodeButton> createState() => _CopyCodeButtonState();
}

class _CopyCodeButtonState extends State<_CopyCodeButton> {
  bool _copied = false;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      size: WashButtonSize.sm,
      variant: WashButtonVariant.defaultVariant,
      onPressed: () async {
        await Clipboard.setData(ClipboardData(text: widget.code));
        if (!mounted) return;
        setState(() => _copied = true);
        await Future<void>.delayed(const Duration(milliseconds: 1600));
        if (mounted) setState(() => _copied = false);
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          WashLucideIcon(
            _copied ? 'check' : 'clipboard-copy',
            size: 15,
            strokeWidth: 2,
          ),
          const SizedBox(width: 6),
          Text(_copied ? 'Copied' : 'Copy code'),
        ],
      ),
    );
  }
}
