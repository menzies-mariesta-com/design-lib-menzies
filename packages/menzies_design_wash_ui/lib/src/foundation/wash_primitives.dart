import 'package:flutter/painting.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/widgets.dart';

import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import 'wash_ripple.dart';

export '../components/dialog/wash_dialog.dart'
    show
        showWashDialog,
        WashCheckboxDialog,
        WashDialogPlacement,
        WashDialogScope,
        WashForcedModal;

class WashListTile extends StatelessWidget {
  const WashListTile({
    required this.title,
    this.subtitle,
    this.leading,
    this.trailing,
    this.onTap,
    this.selected = false,
    super.key,
  });

  final Widget title;
  final Widget? subtitle;
  final Widget? leading;
  final Widget? trailing;
  final VoidCallback? onTap;
  final bool selected;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashRipple(
      onTap: onTap,
      child: Container(
        color: selected ? tokens.primary.withValues(alpha: 0.12) : null,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            if (leading != null) ...[leading!, const SizedBox(width: 12)],
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  DefaultTextStyle(style: WashTypography.body(tokens.onSurface), child: title),
                  if (subtitle != null) ...[
                    const SizedBox(height: 2),
                    DefaultTextStyle(
                      style: WashTypography.label(tokens.inkMuted),
                      child: subtitle!,
                    ),
                  ],
                ],
              ),
            ),
            if (trailing != null) trailing!,
          ],
        ),
      ),
    );
  }
}

class WashExpansionTile extends StatefulWidget {
  const WashExpansionTile({required this.title, required this.children, super.key});
  final Widget title;
  final List<Widget> children;

  @override
  State<WashExpansionTile> createState() => _WashExpansionTileState();
}

class _WashExpansionTileState extends State<WashExpansionTile> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashListTile(
          title: widget.title,
          trailing: Text(_open ? '−' : '+', style: TextStyle(color: tokens.inkMuted)),
          onTap: () => setState(() => _open = !_open),
        ),
        if (_open) ...widget.children,
      ],
    );
  }
}

class WashLinearProgress extends StatelessWidget {
  const WashLinearProgress({this.value, super.key});
  final double? value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ClipRRect(
      borderRadius: BorderRadius.circular(4),
      child: SizedBox(
        height: 6,
        child: CustomPaint(
          painter: _LinearProgressPainter(
            value: value,
            track: tokens.surfaceContainer,
            fill: tokens.primary,
          ),
        ),
      ),
    );
  }
}

class _LinearProgressPainter extends CustomPainter {
  _LinearProgressPainter({required this.value, required this.track, required this.fill});
  final double? value;
  final Color track;
  final Color fill;

  @override
  void paint(Canvas canvas, Size size) {
    final trackPaint = Paint()..color = track;
    canvas.drawRRect(
      RRect.fromRectAndRadius(Offset.zero & size, const Radius.circular(4)),
      trackPaint,
    );
    final v = value?.clamp(0.0, 1.0) ?? 0;
    if (v > 0) {
      final fillPaint = Paint()..color = fill;
      canvas.drawRRect(
        RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, size.width * v, size.height), const Radius.circular(4)),
        fillPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _LinearProgressPainter oldDelegate) =>
      oldDelegate.value != value || oldDelegate.track != track || oldDelegate.fill != fill;
}

class WashCircularProgress extends StatelessWidget {
  const WashCircularProgress({this.value, this.color, super.key});
  final double? value;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: 32,
      height: 32,
      child: CustomPaint(
        painter: _CircularProgressPainter(value: value, color: color ?? tokens.primary),
      ),
    );
  }
}

class _CircularProgressPainter extends CustomPainter {
  _CircularProgressPainter({required this.value, required this.color});
  final double? value;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = Paint()
      ..color = color.withValues(alpha: 0.25)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3;
    final center = size.center(Offset.zero);
    final radius = size.shortestSide / 2 - 2;
    canvas.drawCircle(center, radius, stroke);
    final arc = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;
    final sweep = (value ?? 0.35) * 6.28318;
    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -1.57, sweep, false, arc);
  }

  @override
  bool shouldRepaint(covariant _CircularProgressPainter oldDelegate) =>
      oldDelegate.value != value || oldDelegate.color != color;
}

class WashSlider extends StatelessWidget {
  const WashSlider({
    required this.value,
    required this.onChanged,
    this.min = 0,
    this.max = 100,
    super.key,
  });

  final double value;
  final ValueChanged<double>? onChanged;
  final double min;
  final double max;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = constraints.maxWidth;
        final t = ((value - min) / (max - min)).clamp(0.0, 1.0);
        return GestureDetector(
          onHorizontalDragUpdate: onChanged == null
              ? null
              : (d) {
                  final local = (d.localPosition.dx / w).clamp(0.0, 1.0);
                  onChanged!(min + local * (max - min));
                },
          onTapDown: onChanged == null
              ? null
              : (d) {
                  final local = (d.localPosition.dx / w).clamp(0.0, 1.0);
                  onChanged!(min + local * (max - min));
                },
          child: SizedBox(
            height: 32,
            child: Stack(
              alignment: Alignment.centerLeft,
              children: [
                Container(
                  height: 4,
                  width: w,
                  decoration: BoxDecoration(
                    color: tokens.surfaceContainer,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                Container(
                  height: 4,
                  width: w * t,
                  decoration: BoxDecoration(
                    color: tokens.primary,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                Positioned(
                  left: w * t - 8,
                  child: Container(
                    width: 16,
                    height: 16,
                    decoration: BoxDecoration(color: tokens.primary, shape: BoxShape.circle),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class WashAppBar extends StatelessWidget implements PreferredSizeWidget {
  const WashAppBar({
    required this.title,
    this.leading,
    this.actions,
    super.key,
  });

  final Widget title;
  final Widget? leading;
  final List<Widget>? actions;

  @override
  Size get preferredSize => const Size.fromHeight(56);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      height: 56,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: tokens.inkBorder)),
        color: tokens.surface.withValues(alpha: 0.92),
      ),
      child: Row(
        children: [
          if (leading != null) leading!,
          Expanded(
            child: DefaultTextStyle(
              style: WashTypography.title(tokens.onSurface),
              child: title,
            ),
          ),
          if (actions != null) ...actions!,
        ],
      ),
    );
  }
}

class WashMessengerScope extends InheritedWidget {
  const WashMessengerScope({required this.show, required super.child, super.key});
  final void Function(String message) show;

  static WashMessengerScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<WashMessengerScope>();
  }

  static void showSnack(BuildContext context, String message) {
    maybeOf(context)?.show(message);
  }

  @override
  bool updateShouldNotify(WashMessengerScope oldWidget) => false;
}

class WashRadioTile<T> extends StatelessWidget {
  const WashRadioTile({
    required this.value,
    required this.groupValue,
    required this.title,
    required this.onChanged,
    super.key,
  });

  final T value;
  final T? groupValue;
  final Widget title;
  final ValueChanged<T?> onChanged;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final selected = value == groupValue;
    return WashListTile(
      leading: Container(
        width: 18,
        height: 18,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: selected ? tokens.primary : tokens.inkBorder, width: 2),
        ),
        child: selected
            ? Center(
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(color: tokens.primary, shape: BoxShape.circle),
                ),
              )
            : null,
      ),
      title: title,
      onTap: () => onChanged(value),
    );
  }
}
