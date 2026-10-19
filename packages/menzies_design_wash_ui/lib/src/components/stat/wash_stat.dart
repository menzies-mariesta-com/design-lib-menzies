import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `text-*` accents on title, value, desc, or figure.
enum WashStatTone {
  none,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

/// daisyUI `stats` / `stats-vertical` / `lg:stats-horizontal`.
enum WashStatsDirection {
  horizontal,
  vertical,
  responsive,
}

/// daisyUI `place-items-center` / `lg:place-items-start`.
enum WashStatAlign {
  start,
  center,
  responsiveCenter,
}

/// Surface chrome for the `stats` shell.
enum WashStatsSurface {
  /// `bg-base-100 shadow`
  shadow,

  /// `border border-ink-border/60 bg-base-100/80 shadow-sm`
  inkBorderSoft,

  /// `border border-base-300 bg-base-100`
  border,
}

/// Tailwind `lg` (1024 CSS px) used by the web Stat gallery.
const double kWashStatLgBreakpoint = 1024;

Color? washStatToneColor(WashTokens tokens, WashStatTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashStatTone.none => null,
    WashStatTone.primary => p.primary,
    WashStatTone.secondary => p.secondary,
    WashStatTone.accent => p.accent,
    WashStatTone.info => p.info,
    WashStatTone.success => p.success,
    WashStatTone.warning => p.warning,
    WashStatTone.error => p.error,
  };
}

String washStatsClassLabel({
  WashStatsDirection direction = WashStatsDirection.horizontal,
  bool expand = false,
}) {
  switch (direction) {
    case WashStatsDirection.horizontal:
      return expand ? 'stats w-full' : 'stats';
    case WashStatsDirection.vertical:
      return expand ? 'stats stats-vertical w-full' : 'stats stats-vertical';
    case WashStatsDirection.responsive:
      return expand
          ? 'stats stats-vertical lg:stats-horizontal w-full'
          : 'stats stats-vertical lg:stats-horizontal';
  }
}

/// Monospace class hint for the Stat gallery.
class WashStatClassLabel extends StatelessWidget {
  const WashStatClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// daisyUI `stat` cell: title, value, desc, optional figure and actions.
class WashStat extends StatelessWidget {
  const WashStat({
    this.title,
    this.value,
    this.desc,
    this.figure,
    this.actions,
    this.titleTone = WashStatTone.none,
    this.valueTone = WashStatTone.none,
    this.descTone = WashStatTone.none,
    this.figureTone = WashStatTone.none,
    this.align = WashStatAlign.start,
    super.key,
  });

  final String? title;
  final String? value;
  final String? desc;
  final Widget? figure;
  final List<Widget>? actions;
  final WashStatTone titleTone;
  final WashStatTone valueTone;
  final WashStatTone descTone;
  final WashStatTone figureTone;
  final WashStatAlign align;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final width = MediaQuery.sizeOf(context).width;
    final centered = switch (align) {
      WashStatAlign.start => false,
      WashStatAlign.center => true,
      WashStatAlign.responsiveCenter => width < kWashStatLgBreakpoint,
    };
    final muted = tokens.onSurface.withValues(alpha: 0.60);
    final cross = centered ? CrossAxisAlignment.center : CrossAxisAlignment.start;
    final textAlign = centered ? TextAlign.center : TextAlign.start;

    Widget? line(String? text, WashStatTone tone, {required bool valueLine}) {
      if (text == null) return null;
      final color = washStatToneColor(tokens, tone) ??
          (valueLine ? tokens.onSurface : muted);
      return Text(
        text,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        textAlign: textAlign,
        style: valueLine
            ? WashTypography.body(color).copyWith(
                fontSize: 32,
                fontWeight: FontWeight.w800,
                height: 1.15,
              )
            : WashTypography.label(color).copyWith(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                height: 1.3,
              ),
      );
    }

    final copy = Column(
      crossAxisAlignment: cross,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (title != null) line(title, titleTone, valueLine: false)!,
        if (value != null) ...[
          if (title != null) const SizedBox(height: 2),
          line(value, valueTone, valueLine: true)!,
        ],
        if (desc != null) ...[
          const SizedBox(height: 2),
          line(desc, descTone, valueLine: false)!,
        ],
        if (actions != null && actions!.isNotEmpty) ...[
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: centered ? WrapAlignment.center : WrapAlignment.start,
            children: actions!,
          ),
        ],
      ],
    );

    Widget body = copy;
    if (figure != null) {
      final figureColor = washStatToneColor(tokens, figureTone);
      final painted = IconTheme(
        data: IconThemeData(color: figureColor ?? tokens.onSurface, size: 32),
        child: DefaultTextStyle.merge(
          style: TextStyle(color: figureColor ?? tokens.onSurface),
          child: figure!,
        ),
      );
      body = Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(child: copy),
          const SizedBox(width: 16),
          painted,
        ],
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: body,
    );
  }
}

/// daisyUI `stats` group: horizontal, vertical, or responsive stack.
class WashStats extends StatelessWidget {
  const WashStats({
    required this.children,
    this.direction = WashStatsDirection.horizontal,
    this.surface = WashStatsSurface.shadow,
    this.expand = false,
    super.key,
  });

  final List<Widget> children;
  final WashStatsDirection direction;
  final WashStatsSurface surface;
  final bool expand;

  bool _vertical(BuildContext context) {
    return switch (direction) {
      WashStatsDirection.vertical => true,
      WashStatsDirection.horizontal => false,
      WashStatsDirection.responsive =>
        MediaQuery.sizeOf(context).width < kWashStatLgBreakpoint,
    };
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final vertical = _vertical(context);
    final dividerColor = tokens.onSurface.withValues(alpha: 0.10);

    final cells = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      Widget cell = children[i];
      if (!vertical && expand) {
        cell = Expanded(child: cell);
      }
      cells.add(cell);
      if (i < children.length - 1) {
        cells.add(
          _WashStatDashDivider(
            axis: vertical ? Axis.horizontal : Axis.vertical,
            color: dividerColor,
          ),
        );
      }
    }

    Widget group = vertical
        ? Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: cells,
          )
        : IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
              children: cells,
            ),
          );

    final BoxDecoration decoration;
    switch (surface) {
      case WashStatsSurface.shadow:
        decoration = BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          boxShadow: washPaperShadowSm(tokens),
        );
      case WashStatsSurface.inkBorderSoft:
        decoration = BoxDecoration(
          color: tokens.surface.withValues(alpha: 0.80),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.60)),
          boxShadow: [
            BoxShadow(
              color: tokens.onSurface.withValues(alpha: 0.06),
              offset: const Offset(0, 1),
              blurRadius: 2,
            ),
          ],
        );
      case WashStatsSurface.border:
        decoration = BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.surfaceContainerHigh),
        );
    }

    group = MouseRegion(
      cursor: SystemMouseCursors.basic,
      child: DecoratedBox(decoration: decoration, child: group),
    );

    if (expand) {
      return SizedBox(width: double.infinity, child: group);
    }
    return group;
  }
}

class _WashStatDashDivider extends StatelessWidget {
  const _WashStatDashDivider({required this.axis, required this.color});

  final Axis axis;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _WashDashPainter(axis: axis, color: color),
      child: axis == Axis.vertical
          ? const SizedBox(width: 1)
          : const SizedBox(height: 1),
    );
  }
}

class _WashDashPainter extends CustomPainter {
  const _WashDashPainter({required this.axis, required this.color});

  final Axis axis;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;
    const dash = 4.0;
    const gap = 3.0;
    var pos = 0.0;
    if (axis == Axis.vertical) {
      final x = size.width / 2;
      while (pos < size.height) {
        final end = (pos + dash).clamp(0.0, size.height);
        canvas.drawLine(Offset(x, pos), Offset(x, end), paint);
        pos += dash + gap;
      }
    } else {
      final y = size.height / 2;
      while (pos < size.width) {
        final end = (pos + dash).clamp(0.0, size.width);
        canvas.drawLine(Offset(pos, y), Offset(end, y), paint);
        pos += dash + gap;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _WashDashPainter oldDelegate) {
    return oldDelegate.axis != axis || oldDelegate.color != color;
  }
}
