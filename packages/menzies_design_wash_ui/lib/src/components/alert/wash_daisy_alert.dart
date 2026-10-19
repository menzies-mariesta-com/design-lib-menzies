import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashAlertTone { info, success, warning, error }

enum WashAlertStyle { solid, soft, outline, dash }

enum WashAlertLayout { horizontal, vertical }

/// daisyUI `alert` with semantic colors and layout modifiers.
class WashDaisyAlert extends StatelessWidget {
  const WashDaisyAlert({
    required this.children,
    this.tone,
    this.style = WashAlertStyle.solid,
    this.layout = WashAlertLayout.horizontal,
    this.shadow = false,
    this.padding,
    super.key,
  });

  final List<Widget> children;
  final WashAlertTone? tone;
  final WashAlertStyle style;
  final WashAlertLayout layout;
  final bool shadow;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final p = tokens.palette;
    final (bg, fg, border) = _resolve(tokens, p);

    final padding =
        this.padding ?? const EdgeInsets.symmetric(horizontal: 16, vertical: 12);
    final radius = BorderRadius.circular(tokens.radiusBox);

    final spaced = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0) {
        spaced.add(
          layout == WashAlertLayout.vertical
              ? const SizedBox(height: 8)
              : const SizedBox(width: 8),
        );
      }
      spaced.add(_flexChild(children[i], layout));
    }

    Widget content = DefaultTextStyle(
      style: WashTypography.body(fg),
      child: IconTheme(
        data: IconThemeData(color: fg, size: 24),
        child: layout == WashAlertLayout.vertical
            ? Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: spaced,
              )
            : Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: spaced
                    .map(
                      (w) => w is WashAlertMessage ? Expanded(child: w) : w,
                    )
                    .toList(),
              ),
      ),
    );

    return Semantics(
      container: true,
      label: 'alert',
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: bg,
          borderRadius: radius,
          border: border,
          boxShadow: shadow ? washPaperShadowSm(tokens) : null,
        ),
        child: Padding(padding: padding, child: content),
      ),
    );
  }

  static Widget _flexChild(Widget child, WashAlertLayout layout) {
    if (layout == WashAlertLayout.horizontal && child is WashAlertMessage) {
      return Expanded(child: child);
    }
    return child;
  }

  (Color, Color, Border?) _resolve(WashTokens tokens, WashPigmentPalette p) {
    final toneColor = switch (tone) {
      WashAlertTone.info => p.info,
      WashAlertTone.success => p.success,
      WashAlertTone.warning => p.warning,
      WashAlertTone.error => p.error,
      null => tokens.onSurface,
    };
    final toneContent = switch (tone) {
      WashAlertTone.info => p.infoContent,
      WashAlertTone.success => p.successContent,
      WashAlertTone.warning => p.warningContent,
      WashAlertTone.error => p.errorContent,
      null => tokens.onSurface,
    };

    switch (style) {
      case WashAlertStyle.soft:
        return (
          toneColor.withValues(alpha: 0.12),
          toneContent,
          Border.all(color: toneColor.withValues(alpha: 0.25)),
        );
      case WashAlertStyle.outline:
        return (
          tokens.surface,
          toneContent,
          Border.all(color: toneColor.withValues(alpha: 0.55)),
        );
      case WashAlertStyle.dash:
        return (
          tokens.surface,
          toneContent,
          Border.all(color: toneColor.withValues(alpha: 0.55), style: BorderStyle.none),
        );
      case WashAlertStyle.solid:
        if (tone == null) {
          return (
            tokens.surface,
            tokens.onSurface,
            Border.all(color: tokens.inkBorder),
          );
        }
        return (toneColor, toneContent, null);
    }
  }
}

class WashAlertMessage extends StatelessWidget {
  const WashAlertMessage(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Text(text),
    );
  }
}

class WashAlertIcon extends StatelessWidget {
  const WashAlertIcon(this.name, {this.color, super.key});

  /// Lucide kebab-case name (see [washAlertToneLucideIcon]).
  final String name;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return WashLucideIcon(name, size: 24, color: color, strokeWidth: 1.75);
  }
}

String washAlertToneLucideIcon(WashAlertTone tone) {
  return switch (tone) {
    WashAlertTone.info => 'info',
    WashAlertTone.success => 'circle-check',
    WashAlertTone.warning => 'triangle-alert',
    WashAlertTone.error => 'circle-x',
  };
}

/// Responsive layout: vertical on narrow widths, horizontal from [breakpoint] up.
class WashDaisyAlertResponsive extends StatelessWidget {
  const WashDaisyAlertResponsive({
    required this.children,
    this.tone,
    this.style = WashAlertStyle.solid,
    this.breakpoint = 640,
    super.key,
  });

  final List<Widget> children;
  final WashAlertTone? tone;
  final WashAlertStyle style;
  final double breakpoint;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final layout = constraints.maxWidth >= breakpoint
            ? WashAlertLayout.horizontal
            : WashAlertLayout.vertical;
        return WashDaisyAlert(
          tone: tone,
          style: style,
          layout: layout,
          children: children,
        );
      },
    );
  }
}

class WashToastStack extends StatelessWidget {
  const WashToastStack({
    required this.alerts,
    this.alignment = Alignment.bottomRight,
    super.key,
  });

  final List<Widget> alerts;
  final Alignment alignment;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        const inset = 16.0;
        final maxToastWidth = (constraints.maxWidth - inset * 2).clamp(0.0, 420.0);
        return Stack(
          fit: StackFit.expand,
          children: [
            Positioned(
              left: inset,
              right: inset,
              bottom: inset,
              child: Align(
                alignment: alignment,
                child: ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: maxToastWidth),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      for (var i = 0; i < alerts.length; i++) ...[
                        if (i > 0) const SizedBox(height: 8),
                        alerts[i],
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
