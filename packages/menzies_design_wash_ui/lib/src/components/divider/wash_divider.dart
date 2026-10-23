import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Line orientation inside a flex layout (daisyUI `divider` vs `divider-horizontal`).
enum WashDividerOrientation {
  /// Horizontal rule across a column (`divider`).
  horizontal,

  /// Vertical rule between row siblings (`divider-horizontal`).
  vertical,
}

enum WashDividerLabelAlign { start, center, end }

/// daisyUI `divider` with optional label, colors, and alignment modifiers.
class WashDivider extends StatelessWidget {
  const WashDivider({
    this.label,
    this.tone = WashBadgeTone.defaultTone,
    this.orientation = WashDividerOrientation.horizontal,
    this.labelAlign = WashDividerLabelAlign.center,
    super.key,
  });

  final String? label;
  final WashBadgeTone tone;
  final WashDividerOrientation orientation;
  final WashDividerLabelAlign labelAlign;

  static const _lineThickness = 2.0;
  static const _crossExtent = 16.0;
  static const _labelGap = 16.0;
  static const _marginH = 16.0;
  static const _marginV = 16.0;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final lineColor = _lineColor(tokens);
    final textStyle = WashTypography.body(
      tone == WashBadgeTone.defaultTone ? tokens.onSurface : lineColor,
    ).copyWith(fontSize: 14);

    final hasLabel = label != null && label!.isNotEmpty;
    final showBefore = labelAlign != WashDividerLabelAlign.start || !hasLabel;
    final showAfter = labelAlign != WashDividerLabelAlign.end || !hasLabel;

    if (orientation == WashDividerOrientation.vertical) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: _marginH),
        child: SizedBox(
          width: _crossExtent,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (showBefore)
                Expanded(
                  child: Center(
                    child: Container(
                      width: _lineThickness,
                      color: lineColor,
                    ),
                  ),
                ),
              if (hasLabel) ...[
                if (showBefore || showAfter) const SizedBox(height: _labelGap),
                Text(label!, style: textStyle, textAlign: TextAlign.center),
                if (showBefore || showAfter) const SizedBox(height: _labelGap),
              ],
              if (showAfter)
                Expanded(
                  child: Center(
                    child: Container(
                      width: _lineThickness,
                      color: lineColor,
                    ),
                  ),
                ),
            ],
          ),
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: _marginV),
      child: SizedBox(
        height: hasLabel ? null : _crossExtent,
        width: double.infinity,
        child: Row(
          children: [
            if (showBefore)
              Expanded(
                child: Align(
                  alignment: Alignment.center,
                  child: Container(height: _lineThickness, color: lineColor),
                ),
              ),
            if (hasLabel) ...[
              if (showBefore) const SizedBox(width: _labelGap),
              Text(label!, style: textStyle),
              if (showAfter) const SizedBox(width: _labelGap),
            ],
            if (showAfter)
              Expanded(
                child: Align(
                  alignment: Alignment.center,
                  child: Container(height: _lineThickness, color: lineColor),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Color _lineColor(WashTokens tokens) {
    final p = tokens.palette;
    switch (tone) {
      case WashBadgeTone.defaultTone:
        return tokens.onSurface.withValues(alpha: 0.1);
      case WashBadgeTone.neutral:
        return p.neutral;
      case WashBadgeTone.primary:
        return p.primary;
      case WashBadgeTone.secondary:
        return p.secondary;
      case WashBadgeTone.accent:
        return p.accent;
      case WashBadgeTone.info:
        return p.info;
      case WashBadgeTone.success:
        return p.success;
      case WashBadgeTone.warning:
        return p.warning;
      case WashBadgeTone.error:
        return p.error;
    }
  }
}
