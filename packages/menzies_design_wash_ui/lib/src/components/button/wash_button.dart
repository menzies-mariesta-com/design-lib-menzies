import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../foundation/wash_text.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashButtonVariant {
  primary,
  secondary,
  accent,
  neutral,
  info,
  success,
  warning,
  error,
  ghost,
  link,
  outline,
  defaultVariant,
}

enum WashButtonSize { xs, sm, md, lg, xl }

class WashButton extends StatelessWidget {
  const WashButton({
    required this.onPressed,
    this.label,
    this.child,
    this.variant = WashButtonVariant.primary,
    this.tint,
    this.size = WashButtonSize.md,
    this.loading = false,
    this.enabled = true,
    this.block = false,
    this.soft = false,
    this.dash = false,
    this.square = false,
    this.circle = false,
    this.wide = false,
    this.active = false,
    this.ripple = true,
    this.rippleTint,
    this.rippleOrigin,
    this.joinItem = false,
    super.key,
  });

  final VoidCallback? onPressed;
  final String? label;
  final Widget? child;
  final WashButtonVariant variant;

  /// Semantic color for [WashButtonVariant.link] / ghost (`btn-link btn-primary`).
  /// Link defaults to primary when null (daisyUI `--btn-color` fallback).
  final WashButtonVariant? tint;
  final WashButtonSize size;
  final bool loading;
  final bool enabled;
  final bool block;
  final bool soft;
  final bool dash;
  final bool square;
  final bool circle;
  final bool wide;
  final bool active;
  final bool ripple;
  final WashRippleTint? rippleTint;
  final WashRippleOrigin? rippleOrigin;
  final bool joinItem;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final sizeKey = switch (size) {
      WashButtonSize.xs => 'xs',
      WashButtonSize.sm => 'sm',
      WashButtonSize.md => 'md',
      WashButtonSize.lg => 'lg',
      WashButtonSize.xl => 'xl',
    };
    final metrics = kWashBtnSizeMetrics[sizeKey] ?? kWashBtnDefault;
    final disabled = !enabled || loading || onPressed == null;
    final (bg, fg, border) = _colors(tokens, disabled);
    final radius = joinItem
        ? 0.0
        : (circle
            ? metrics.minHeight / 2
            : (square ? metrics.borderRadius : metrics.borderRadius));

    Widget content;
    if (loading) {
      content = SizedBox(
        width: 20,
        height: 20,
        child: CustomPaint(
          painter: _SpinnerPainter(fg),
        ),
      );
    } else if (label != null) {
      content = WashText(
        label!,
        color: fg,
        fontWeight: FontWeight.w600,
      );
    } else {
      content = child ?? const SizedBox.shrink();
    }

    final textStyle = WashTypography.button(fg, metrics.fontSize, metrics.fontWeight);
    final themed = DefaultTextStyle(
      style: variant == WashButtonVariant.link
          ? textStyle.copyWith(
              decoration: TextDecoration.underline,
              decorationColor: fg,
            )
          : textStyle,
      child: IconTheme.merge(
        data: IconThemeData(color: fg, size: 16),
        child: content,
      ),
    );

    final padding = EdgeInsets.symmetric(horizontal: metrics.paddingX);
    final box = Container(
      width: block || wide ? double.infinity : null,
      height: metrics.minHeight,
      padding: padding,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(radius),
        border: border,
        boxShadow: variant == WashButtonVariant.link || joinItem
            ? null
            : washPaperShadowSm(tokens),
      ),
      child: themed,
    );

    if (variant == WashButtonVariant.link) {
      return MouseRegion(
        cursor: disabled
            ? SystemMouseCursors.forbidden
            : SystemMouseCursors.click,
        child: GestureDetector(
          onTap: disabled ? null : onPressed,
          child: themed,
        ),
      );
    }

    if (!ripple || disabled) {
      return GestureDetector(onTap: disabled ? null : onPressed, child: box);
    }
    return WashRipple(
      enabled: !disabled,
      onTap: onPressed,
      borderRadius: radius,
      foregroundColor: fg,
      tint: rippleTint ?? WashRippleTint.inherit,
      origin: rippleOrigin ?? WashRippleOrigin.pointer,
      child: box,
    );
  }

  (Color?, Color, Border?) _colors(WashTokens tokens, bool disabled) {
    final p = tokens.palette;
    Color? bg;
    Color fg;
    Border? border;
    Color base(WashButtonVariant v) {
      switch (v) {
        case WashButtonVariant.primary:
          return p.primary;
        case WashButtonVariant.secondary:
          return p.secondary;
        case WashButtonVariant.accent:
          return p.accent;
        case WashButtonVariant.neutral:
          return p.neutral;
        case WashButtonVariant.info:
          return p.info;
        case WashButtonVariant.success:
          return p.success;
        case WashButtonVariant.warning:
          return p.warning;
        case WashButtonVariant.error:
          return p.error;
        case WashButtonVariant.ghost:
        case WashButtonVariant.link:
        case WashButtonVariant.outline:
        case WashButtonVariant.defaultVariant:
          return tokens.surface;
      }
    }

    Color on(Color c) {
      switch (variant) {
        case WashButtonVariant.primary:
          return p.primaryContent;
        case WashButtonVariant.secondary:
          return p.secondaryContent;
        case WashButtonVariant.accent:
          return p.accentContent;
        case WashButtonVariant.neutral:
          return p.neutralContent;
        case WashButtonVariant.info:
          return p.infoContent;
        case WashButtonVariant.success:
          return p.successContent;
        case WashButtonVariant.warning:
          return p.warningContent;
        case WashButtonVariant.error:
          return p.errorContent;
        default:
          return tokens.onSurface;
      }
    }

    Color semantic(WashButtonVariant? v) {
      final tone = v ?? WashButtonVariant.primary;
      switch (tone) {
        case WashButtonVariant.primary:
          return p.primary;
        case WashButtonVariant.secondary:
          return p.secondary;
        case WashButtonVariant.accent:
          return p.accent;
        case WashButtonVariant.neutral:
          return p.neutral;
        case WashButtonVariant.info:
          return p.info;
        case WashButtonVariant.success:
          return p.success;
        case WashButtonVariant.warning:
          return p.warning;
        case WashButtonVariant.error:
          return p.error;
        case WashButtonVariant.ghost:
        case WashButtonVariant.link:
        case WashButtonVariant.outline:
        case WashButtonVariant.defaultVariant:
          return tokens.onSurface;
      }
    }

    if (soft) {
      final c = base(variant == WashButtonVariant.defaultVariant
          ? WashButtonVariant.primary
          : variant);
      bg = c.withValues(alpha: 0.15);
      fg = c;
    } else if (variant == WashButtonVariant.link) {
      // daisyUI: color: var(--btn-color, var(--color-primary)); underline
      bg = null;
      fg = semantic(tint ?? WashButtonVariant.primary);
    } else if (variant == WashButtonVariant.ghost) {
      bg = null;
      fg = tint != null ? semantic(tint) : tokens.onSurface;
    } else if (variant == WashButtonVariant.outline) {
      bg = null;
      fg = tokens.onSurface;
      border = Border.all(
        color: tokens.inkBorder,
        width: dash ? 2 : kWashBtnDefault.borderWidth,
      );
      if (dash) {
        border = Border.all(color: tokens.inkBorder, width: 2);
      }
    } else if (variant == WashButtonVariant.defaultVariant) {
      bg = tokens.surfaceContainer;
      fg = tokens.onSurface;
      border = Border.all(color: tokens.inkBorder);
    } else {
      final c = base(variant);
      bg = c;
      fg = on(c);
    }

    if (active && !disabled) {
      if (bg != null) {
        bg = Color.alphaBlend(tokens.onSurface.withValues(alpha: 0.12), bg);
      }
      border = border ??
          Border.all(
            color: tokens.onSurface.withValues(alpha: 0.2),
            width: kWashBtnDefault.borderWidth,
          );
    }

    if (disabled) {
      fg = fg.withValues(alpha: 0.5);
      bg = bg?.withValues(alpha: 0.5);
    }
    return (bg, fg, border);
  }
}

class _SpinnerPainter extends CustomPainter {
  _SpinnerPainter(this.color);
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;
    canvas.drawArc(
      Rect.fromLTWH(0, 0, size.width, size.height),
      0,
      3.14,
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant _SpinnerPainter oldDelegate) =>
      oldDelegate.color != color;
}
