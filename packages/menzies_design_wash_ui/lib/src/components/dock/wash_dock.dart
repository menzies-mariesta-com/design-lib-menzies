import 'dart:ui' show ImageFilter;

import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashDockSize { xs, sm, md, lg, xl }

class WashDockItem {
  const WashDockItem({
    required this.iconName,
    this.label,
    this.active = false,
    this.onPressed,
    this.semanticsLabel,
  });

  final String iconName;
  final String? label;
  final bool active;
  final VoidCallback? onPressed;
  final String? semanticsLabel;
}

/// daisyUI `dock` bottom navigation bar.
class WashDock extends StatelessWidget {
  const WashDock({
    required this.items,
    this.size = WashDockSize.md,
    this.embeddedDemo = true,
    this.maxWidth = 448,
    this.backgroundColor,
    this.foregroundColor,
    this.borderColor,
    this.glass = false,
    this.showTopBorder = true,
    super.key,
  });

  final List<WashDockItem> items;
  final WashDockSize size;
  final bool embeddedDemo;
  final double? maxWidth;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? borderColor;
  final bool glass;
  final bool showTopBorder;

  static const _demoShadow = [
    BoxShadow(
      color: Color(0x14000000),
      offset: Offset(0, 1),
      blurRadius: 2,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _metricsFor(size);
    final bg = backgroundColor ?? (glass ? tokens.surface.withValues(alpha: 0.55) : tokens.surface);
    final fg = foregroundColor ?? tokens.onSurface;
    final border = borderColor ?? tokens.inkBorder.withValues(alpha: 0.5);

    Widget bar = SizedBox(
      height: metrics.barHeight,
      width: double.infinity,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: glass ? null : bg,
          borderRadius: embeddedDemo ? BorderRadius.circular(16) : null,
          border: embeddedDemo
              ? Border.all(color: border)
              : (showTopBorder
                  ? Border(
                      top: BorderSide(
                        color: tokens.onSurface.withValues(alpha: 0.05),
                        width: 0.5,
                      ),
                    )
                  : null),
          boxShadow: embeddedDemo ? _demoShadow : null,
        ),
        child: glass
            ? ClipRRect(
                borderRadius: embeddedDemo ? BorderRadius.circular(16) : BorderRadius.zero,
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: bg,
                      borderRadius: embeddedDemo ? BorderRadius.circular(16) : null,
                      border: embeddedDemo ? Border.all(color: border) : null,
                    ),
                    child: _row(metrics, fg, tokens),
                  ),
                ),
              )
            : _row(metrics, fg, tokens),
      ),
    );

    if (embeddedDemo) {
      bar = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth ?? 448),
        child: bar,
      );
    }

    if (!embeddedDemo) {
      return Positioned(
        left: 0,
        right: 0,
        bottom: 0,
        child: bar,
      );
    }

    return bar;
  }

  Widget _row(_WashDockMetrics metrics, Color fg, WashTokens tokens) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final item in items)
            Expanded(
              child: _WashDockButton(
                item: item,
                metrics: metrics,
                color: fg,
                tokens: tokens,
              ),
            ),
        ],
      ),
    );
  }

  _WashDockMetrics _metricsFor(WashDockSize size) {
    switch (size) {
      case WashDockSize.xs:
        return const _WashDockMetrics(barHeight: 48, labelSize: 10, iconSize: 18, activeWidth: 40);
      case WashDockSize.sm:
        return const _WashDockMetrics(barHeight: 56, labelSize: 10, iconSize: 20, activeWidth: 40);
      case WashDockSize.md:
        return const _WashDockMetrics(barHeight: 64, labelSize: 11, iconSize: 22, activeWidth: 40);
      case WashDockSize.lg:
        return const _WashDockMetrics(barHeight: 72, labelSize: 11, iconSize: 24, activeWidth: 44);
      case WashDockSize.xl:
        return const _WashDockMetrics(barHeight: 80, labelSize: 12, iconSize: 26, activeWidth: 48);
    }
  }
}

class _WashDockMetrics {
  const _WashDockMetrics({
    required this.barHeight,
    required this.labelSize,
    required this.iconSize,
    required this.activeWidth,
  });

  final double barHeight;
  final double labelSize;
  final double iconSize;
  final double activeWidth;
}

class _WashDockButton extends StatelessWidget {
  const _WashDockButton({
    required this.item,
    required this.metrics,
    required this.color,
    required this.tokens,
  });

  final WashDockItem item;
  final _WashDockMetrics metrics;
  final Color color;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final label = item.label;
    return Semantics(
      button: true,
      selected: item.active,
      label: item.semanticsLabel ?? label ?? item.iconName,
        child: WashRipple(
        onTap: item.onPressed,
        borderRadius: 16,
        child: Opacity(
          opacity: item.onPressed == null ? 0.5 : 1,
          child: Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                WashLucideIcon(
                  item.iconName,
                  size: metrics.iconSize,
                  strokeWidth: 2,
                  color: color,
                ),
                if (label != null && label.isNotEmpty) ...[
                  const SizedBox(height: 1),
                  Text(
                    label,
                    style: WashTypography.body(color).copyWith(
                      fontSize: metrics.labelSize,
                      height: 1.1,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
                AnimatedContainer(
                  duration: const Duration(milliseconds: 100),
                  height: 3,
                  width: item.active ? metrics.activeWidth : 24,
                  margin: const EdgeInsets.only(top: 2),
                  decoration: BoxDecoration(
                    color: item.active ? color : const Color(0x00000000),
                    borderRadius: BorderRadius.circular(999),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
