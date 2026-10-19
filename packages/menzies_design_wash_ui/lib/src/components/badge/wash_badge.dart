import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashBadgeTone {
  defaultTone,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

enum WashBadgeStyle { solid, soft, outline, dash, ghost }

enum WashBadgeSize { xs, sm, md, lg, xl }

class _WashBadgeMetrics {
  const _WashBadgeMetrics({
    required this.minHeight,
    required this.paddingX,
    required this.fontSize,
    required this.gap,
    required this.emptySize,
  });

  final double minHeight;
  final double paddingX;
  final double fontSize;
  final double gap;
  final double emptySize;
}

const _kBadgeMetrics = <WashBadgeSize, _WashBadgeMetrics>{
  WashBadgeSize.xs: _WashBadgeMetrics(
    minHeight: 16,
    paddingX: 6,
    fontSize: 10,
    gap: 4,
    emptySize: 8,
  ),
  WashBadgeSize.sm: _WashBadgeMetrics(
    minHeight: 20,
    paddingX: 8,
    fontSize: 12,
    gap: 4,
    emptySize: 10,
  ),
  WashBadgeSize.md: _WashBadgeMetrics(
    minHeight: 24,
    paddingX: 10,
    fontSize: 13,
    gap: 6,
    emptySize: 12,
  ),
  WashBadgeSize.lg: _WashBadgeMetrics(
    minHeight: 28,
    paddingX: 12,
    fontSize: 14,
    gap: 6,
    emptySize: 14,
  ),
  WashBadgeSize.xl: _WashBadgeMetrics(
    minHeight: 32,
    paddingX: 14,
    fontSize: 15,
    gap: 6,
    emptySize: 16,
  ),
};

/// daisyUI `badge` with semantic colors, sizes, and style modifiers.
class WashBadge extends StatelessWidget {
  const WashBadge(
    this.label, {
    this.tone = WashBadgeTone.defaultTone,
    this.style = WashBadgeStyle.solid,
    this.size = WashBadgeSize.md,
    this.icon,
    this.iconName,
    this.leading,
    this.trailing,
    this.color,
    this.semanticsLabel,
    super.key,
  });

  const WashBadge.icon(
    String iconName,
    String label, {
    WashBadgeTone tone = WashBadgeTone.defaultTone,
    WashBadgeStyle style = WashBadgeStyle.solid,
    WashBadgeSize size = WashBadgeSize.md,
    Color? color,
    Key? key,
  }) : this(
         label,
         tone: tone,
         style: style,
         size: size,
         iconName: iconName,
         color: color,
         key: key,
       );

  /// Visible text; omit or pass empty for a status dot badge.
  final String label;
  final WashBadgeTone tone;
  final WashBadgeStyle style;
  final WashBadgeSize size;
  final Widget? icon;
  final String? iconName;
  final Widget? leading;
  final Widget? trailing;
  final Color? color;
  final String? semanticsLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _kBadgeMetrics[size]!;
    final (bg, fg, borderColor) = _resolve(tokens);
    final radius = BorderRadius.circular(metrics.minHeight / 2);
    final hasLabel = label.isNotEmpty;
    final leadingWidget = leading ??
        icon ??
        (iconName != null
            ? WashLucideIcon(
                iconName!,
                size: metrics.fontSize,
                color: fg,
                strokeWidth: 2,
              )
            : null);

    final children = <Widget>[];
    if (leadingWidget != null) {
      children.add(leadingWidget);
      if (hasLabel) children.add(SizedBox(width: metrics.gap));
    }
    if (hasLabel) {
      children.add(
        Text(
          label,
          style: WashTypography.label(fg).copyWith(
            fontSize: metrics.fontSize,
            fontWeight: FontWeight.w600,
            height: 1.1,
          ),
        ),
      );
    }
    if (trailing != null) {
      children.add(SizedBox(width: metrics.gap * 0.75));
      children.add(trailing!);
    }

    final padding = hasLabel
        ? EdgeInsets.fromLTRB(
            metrics.paddingX,
            (metrics.minHeight - metrics.fontSize) / 2,
            trailing != null ? 4 : metrics.paddingX,
            (metrics.minHeight - metrics.fontSize) / 2,
          )
        : EdgeInsets.all((metrics.minHeight - metrics.emptySize) / 2);

    Widget inner = Container(
      constraints: BoxConstraints(minHeight: metrics.minHeight),
      padding: padding,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: radius,
        border: style == WashBadgeStyle.outline && borderColor != null
            ? Border.all(color: borderColor, width: 1)
            : null,
      ),
      child: hasLabel || leadingWidget != null || trailing != null
          ? Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: children,
            )
          : SizedBox(
              width: metrics.emptySize,
              height: metrics.emptySize,
            ),
    );

    if (style == WashBadgeStyle.dash && borderColor != null) {
      inner = CustomPaint(
        painter: _DashRRectPainter(
          color: borderColor,
          radius: metrics.minHeight / 2,
          strokeWidth: 1,
        ),
        child: inner,
      );
    }

    return Semantics(
      label: semanticsLabel ?? (hasLabel ? label : 'badge'),
      child: inner,
    );
  }

  (Color?, Color, Color?) _resolve(WashTokens tokens) {
    final p = tokens.palette;
    final toneColor = color ?? _toneColor(tokens, p);
    final toneFg = color != null
        ? _contentOn(color!, p)
        : _toneForeground(tokens, p);

    final outlineFg = tone == WashBadgeTone.defaultTone
        ? tokens.onSurface
        : (color ?? _toneColor(tokens, p));

    switch (style) {
      case WashBadgeStyle.soft:
        return (
          toneColor.withValues(alpha: 0.12),
          toneFg,
          toneColor.withValues(alpha: 0.35),
        );
      case WashBadgeStyle.outline:
        return (tokens.surface, outlineFg, toneColor.withValues(alpha: 0.55));
      case WashBadgeStyle.dash:
        return (tokens.surface, outlineFg, toneColor.withValues(alpha: 0.55));
      case WashBadgeStyle.ghost:
        return (null, tokens.inkMuted, null);
      case WashBadgeStyle.solid:
        if (tone == WashBadgeTone.defaultTone && color == null) {
          return (tokens.surfaceContainer, tokens.onSurface, null);
        }
        return (toneColor, toneFg, null);
    }
  }

  Color _toneColor(WashTokens tokens, WashPigmentPalette p) {
    switch (tone) {
      case WashBadgeTone.defaultTone:
        return tokens.surfaceContainer;
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

  Color _toneForeground(WashTokens tokens, WashPigmentPalette p) {
    switch (tone) {
      case WashBadgeTone.defaultTone:
        return tokens.onSurface;
      case WashBadgeTone.neutral:
        return p.neutralContent;
      case WashBadgeTone.primary:
        return p.primaryContent;
      case WashBadgeTone.secondary:
        return p.secondaryContent;
      case WashBadgeTone.accent:
        return p.accentContent;
      case WashBadgeTone.info:
        return p.infoContent;
      case WashBadgeTone.success:
        return p.successContent;
      case WashBadgeTone.warning:
        return p.warningContent;
      case WashBadgeTone.error:
        return p.errorContent;
    }
  }

  static Color _contentOn(Color bg, WashPigmentPalette p) {
    final luminance = bg.computeLuminance();
    return luminance > 0.45 ? p.baseContent : const Color(0xFFFFFFFF);
  }
}

class _DashRRectPainter extends CustomPainter {
  _DashRRectPainter({
    required this.color,
    required this.radius,
    required this.strokeWidth,
  });

  final Color color;
  final double radius;
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    final rrect = RRect.fromRectAndRadius(
      Offset.zero & size,
      Radius.circular(radius),
    );
    final path = Path()..addRRect(rrect);
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth;
    for (final metric in path.computeMetrics()) {
      var distance = 0.0;
      const dash = 4.0;
      const gap = 3.0;
      while (distance < metric.length) {
        final next = math.min(distance + dash, metric.length);
        canvas.drawPath(metric.extractPath(distance, next), paint);
        distance += dash + gap;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DashRRectPainter oldDelegate) {
    return oldDelegate.color != color ||
        oldDelegate.radius != radius ||
        oldDelegate.strokeWidth != strokeWidth;
  }
}
