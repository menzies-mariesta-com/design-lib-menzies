import 'package:flutter/widgets.dart';

import '../foundation/wash_icon.dart';
import '../studio/wash_code_highlighter.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

/// Lightweight, web-parity code editor chrome: window dots, filename,
/// language pill, line-number gutter and footer status bar.
class WashCodeEditorPane extends StatelessWidget {
  const WashCodeEditorPane({
    required this.code,
    required this.fileName,
    required this.languageLabel,
    this.languageId,
    this.bodyHeight = 352,
    super.key,
  });

  final String code;
  final String fileName;
  final String languageLabel;
  final String? languageId;
  final double bodyHeight;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final isLight = tokens.mode == WashThemeMode.light;
    final chrome = Color.alphaBlend(
      tokens.surfaceContainerHigh.withValues(alpha: isLight ? 0.55 : 0.7),
      tokens.surfaceContainer,
    );
    final body = tokens.surfaceContainer;
    final codeStyle = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: 13,
      height: 21 / 13,
      fontWeight: FontWeight.w400,
    );
    final numberStyle = WashTypography.body(tokens.inkMuted).copyWith(
      fontSize: 12,
      height: 21 / 12,
      fontWeight: FontWeight.w400,
    );
    final lines = code.split('\n');
    final highlight = WashCodeHighlighter.highlight(
      code,
      language: languageId ?? 'plaintext',
      light: isLight,
    );

    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(12),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            height: 40,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            color: chrome,
            child: Row(
              children: [
                _Dot(color: tokens.inkBorder),
                const SizedBox(width: 5),
                _Dot(color: tokens.inkBorder),
                const SizedBox(width: 5),
                _Dot(color: tokens.inkBorder),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: tokens.surface,
                      border: Border.all(color: tokens.inkBorder),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      fileName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 12,
                        height: 18 / 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(
                    color: tokens.surface,
                    border: Border.all(color: tokens.inkBorder),
                    borderRadius: BorderRadius.circular(7),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        languageLabel,
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 12,
                          height: 18 / 12,
                        ),
                      ),
                      const SizedBox(width: 8),
                      WashIcon(
                        WashIconGlyph.chevronDown,
                        size: 13,
                        color: tokens.inkMuted,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
            height: bodyHeight,
            color: body,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(vertical: 14),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 46,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        for (var i = 1; i <= lines.length; i++)
                          SizedBox(
                            height: 21,
                            child: Align(
                              alignment: Alignment.centerRight,
                              child: Text('$i', style: numberStyle),
                            ),
                          ),
                      ],
                    ),
                  ),
                  Container(
                    width: 1,
                    height: lines.length * 21,
                    margin: const EdgeInsets.only(right: 14),
                    color: tokens.inkBorder.withValues(alpha: 0.5),
                  ),
                  RichText(
                    softWrap: false,
                    text: TextSpan(
                      style: codeStyle,
                      children: highlight.children,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            height: 36,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            color: chrome,
            child: Row(
              children: [
                Text(
                  'Ln 1, Col 1',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 11.5,
                    height: 16 / 11.5,
                  ),
                ),
                const Spacer(),
                Text(
                  'No wrap',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 11.5,
                    height: 16 / 11.5,
                  ),
                ),
                const SizedBox(width: 12),
                Flexible(
                  child: Text(
                    languageLabel.toUpperCase(),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    textAlign: TextAlign.right,
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontSize: 11,
                      letterSpacing: 0.6,
                      height: 16 / 11,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Dot extends StatelessWidget {
  const _Dot({required this.color});
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}
