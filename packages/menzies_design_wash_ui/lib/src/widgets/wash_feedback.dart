import 'package:flutter/widgets.dart';

import '../components/alert/wash_daisy_alert.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

import '../placement/tooltip_placement.dart';

export '../components/alert/wash_daisy_alert.dart' show WashAlertTone;

class WashAlert extends StatelessWidget {
  const WashAlert({
    required this.message,
    this.title,
    this.tone = WashAlertTone.info,
    this.style = WashAlertStyle.solid,
    this.icon,
    super.key,
  });

  final String? title;
  final String message;
  final WashAlertTone tone;
  final WashAlertStyle style;
  final Widget? icon;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final children = <Widget>[
      icon ??
          WashAlertIcon(
            washAlertToneLucideIcon(tone),
            color: tone == WashAlertTone.info ? tokens.palette.info : null,
          ),
      if (title != null)
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title!, style: const TextStyle(fontWeight: FontWeight.bold)),
            Text(message, style: const TextStyle(fontSize: 12)),
          ],
        )
      else
        WashAlertMessage(message),
    ];
    return WashDaisyAlert(tone: tone, style: style, children: children);
  }
}

class WashDialog extends StatelessWidget {
  const WashDialog({
    required this.title,
    required this.body,
    this.actions,
    super.key,
  });

  final String title;
  final Widget body;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 420),
        margin: const EdgeInsets.all(24),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: [
            BoxShadow(
              color: tokens.onSurface.withValues(alpha: 0.12),
              blurRadius: 24,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              title,
              style: WashTypography.title(tokens.primary)
                  .copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            body,
            if (actions != null) ...[
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: actions!,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class WashTooltip extends StatefulWidget {
  const WashTooltip({
    required this.message,
    required this.child,
    this.prefer,
    super.key,
  });

  final String message;
  final Widget child;
  final WashTooltipSide? prefer;

  @override
  State<WashTooltip> createState() => _WashTooltipState();
}

class _WashTooltipState extends State<WashTooltip> {
  final _layerLink = LayerLink();
  OverlayEntry? _entry;

  void _show() {
    if (_entry != null) return;
    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return;
    final trigger = box.localToGlobal(Offset.zero) & box.size;
    final overlay = Overlay.of(context).context.findRenderObject() as RenderBox;
    final viewport = Offset.zero & overlay.size;
    const tipSize = Size(120, 36);
    final side = WashTooltipPlacement.measure(
      trigger: trigger,
      tipSize: tipSize,
      clipRect: viewport,
      prefer: widget.prefer,
    );
    final pos = WashTooltipPlacement.positionFor(
      trigger: trigger,
      tipSize: tipSize,
      side: side,
    );
    final tokens = WashTokens.of(context);
    _entry = OverlayEntry(
      builder: (context) => Positioned(
        left: pos.dx,
        top: pos.dy,
        width: tipSize.width,
        child: Container(
          decoration: BoxDecoration(
            color: tokens.palette.neutral,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            child: Text(
              widget.message,
              style:
                  TextStyle(color: tokens.palette.neutralContent, fontSize: 12),
            ),
          ),
        ),
      ),
    );
    Overlay.of(context).insert(_entry!);
  }

  void _hide() {
    _entry?.remove();
    _entry = null;
  }

  @override
  void dispose() {
    _hide();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: GestureDetector(
        onLongPress: _show,
        onTapDown: (_) => _show(),
        onTapUp: (_) => _hide(),
        onTapCancel: _hide,
        child: widget.child,
      ),
    );
  }
}
