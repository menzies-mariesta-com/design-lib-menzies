import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';
import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../foundation/wash_ripple.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';


/// Lightweight syntax highlighting (no WebView), aligned with web language packs.
class WashCodeHighlighter {
  const WashCodeHighlighter._();

  static TextSpan highlight(String code, {String language = 'typescript'}) {
    final keywords = _keywordsFor(language);
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
          color = const Color(0xff569cd6);
        } else if (RegExp(r'^["\x27].*["\x27]$').hasMatch(token)) {
          color = const Color(0xffce9178);
        } else if (RegExp(r'^\d+$').hasMatch(token)) {
          color = const Color(0xffb5cea8);
        } else if (token.startsWith('//')) {
          color = const Color(0xff6a9955);
        }
        spans.add(
          TextSpan(
            text: token,
            style: TextStyle(color: color ?? const Color(0xffd4d4d4)),
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
