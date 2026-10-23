import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

/// Lightweight syntax highlighting (no WebView), aligned with web language packs.
class WashCodeHighlighter {
  const WashCodeHighlighter._();

  static TextSpan highlight(
    String code, {
    String language = 'typescript',
    bool light = false,
  }) {
    final keywords = _keywordsFor(language);
    final keywordColor =
        light ? const Color(0xff0b6e99) : const Color(0xff569cd6);
    final stringColor =
        light ? const Color(0xffa15c00) : const Color(0xffce9178);
    final numberColor =
        light ? const Color(0xff2e7d32) : const Color(0xffb5cea8);
    final commentColor =
        light ? const Color(0xff7a7a7a) : const Color(0xff6a9955);
    final defaultColor =
        light ? const Color(0xff1f2328) : const Color(0xffd4d4d4);
    final spans = <TextSpan>[];
    final lines = code.split('\n');
    for (var li = 0; li < lines.length; li++) {
      final line = lines[li];
      final parts = RegExp(r'(\s+|[^\s]+)').allMatches(line);
      for (final part in parts) {
        final token = part.group(0)!;
        if (RegExp(r'^\s+$').hasMatch(token)) {
          spans.add(TextSpan(text: token));
          continue;
        }
        Color? color;
        if (keywords.contains(token)) {
          color = keywordColor;
        } else if (RegExp(r'^["\x27].*["\x27]$').hasMatch(token)) {
          color = stringColor;
        } else if (RegExp(r'^\d+$').hasMatch(token)) {
          color = numberColor;
        } else if (token.startsWith('//') ||
            token.startsWith('#') ||
            token.startsWith('--')) {
          color = commentColor;
        }
        spans.add(
          TextSpan(
            text: token,
            style: TextStyle(color: color ?? defaultColor),
          ),
        );
      }
      if (li < lines.length - 1) spans.add(const TextSpan(text: '\n'));
    }
    return TextSpan(children: spans);
  }

  static Set<String> _keywordsFor(String language) {
    const ts = {
      'import',
      'export',
      'from',
      'const',
      'let',
      'var',
      'function',
      'return',
      'void',
      'class',
      'interface',
      'type',
      'async',
      'await',
    };
    if (language == 'rust') {
      return {
        'fn',
        'let',
        'mut',
        'pub',
        'use',
        'struct',
        'impl',
        'return',
      };
    }
    if (language == 'python') {
      return {'def', 'import', 'from', 'class', 'return', 'async', 'await'};
    }
    return ts;
  }
}
