import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/dropdown_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_date_time_util.dart';

enum WashTimeClockDialSize { sm, md }

/// Analog clock time picker (hour, minute, second) with dropdown trigger.
class WashTimeClockDial extends StatefulWidget {
  const WashTimeClockDial({
    this.value,
    this.defaultValue = '09:00:00',
    this.onChanged,
    this.size = WashTimeClockDialSize.md,
    this.disabled = false,
    this.triggerPrimary = false,
    this.triggerSecondary = false,
    this.triggerAccent = false,
    this.ariaLabel,
    super.key,
  });

  final String? value;
  final String defaultValue;
  final ValueChanged<String>? onChanged;
  final WashTimeClockDialSize size;
  final bool disabled;
  final bool triggerPrimary;
  final bool triggerSecondary;
  final bool triggerAccent;
  final String? ariaLabel;

  @override
  State<WashTimeClockDial> createState() => _WashTimeClockDialState();
}

enum _ClockView { hour, minute, second }

class _WashTimeClockDialState extends State<WashTimeClockDial> {
  final _link = LayerLink();
  OverlayEntry? _entry;
  String _internal = '09:00:00';
  _ClockView _view = _ClockView.hour;

  String get _resolved => washNormalizeTime(widget.value ?? _internal,
      fallback: widget.defaultValue);

  void _setValue(String next) {
    final normalized = washNormalizeTime(next);
    if (widget.value == null) {
      setState(() => _internal = normalized);
    }
    widget.onChanged?.call(normalized);
  }

  void _open() {
    if (widget.disabled || _entry != null) return;
    final overlay = Overlay.of(context);
    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return;
    final trigger = box.localToGlobal(Offset.zero) & box.size;
    final viewport =
        Offset.zero & (overlay.context.findRenderObject() as RenderBox).size;
    const panelSize = Size(248, 320);
    final placement = WashDropdownPlacementLogic.measure(
      trigger: trigger,
      panelSize: panelSize,
      viewport: viewport,
    );
    final pos = WashDropdownPlacementLogic.panelOffset(
      trigger: trigger,
      panelSize: panelSize,
      placement: placement,
    );
    _entry = OverlayEntry(
      builder: (ctx) => Stack(
        children: [
          Positioned.fill(
            child: GestureDetector(
              behavior: HitTestBehavior.translucent,
              onTap: _close,
            ),
          ),
          Positioned(
            left: pos.dx,
            top: pos.dy,
            width: panelSize.width,
            child: _ClockPanel(
              value: _resolved,
              view: _view,
              onView: (v) => setState(() => _view = v),
              onPick: (h, m, s) {
                _setValue(
                    '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}');
              },
              onClose: _close,
            ),
          ),
        ],
      ),
    );
    overlay.insert(_entry!);
  }

  void _close() {
    _entry?.remove();
    _entry = null;
  }

  @override
  void dispose() {
    _close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final compact = widget.size == WashTimeClockDialSize.sm;
    final borderColor = widget.triggerPrimary
        ? tokens.primary
        : widget.triggerSecondary
            ? tokens.palette.secondary
            : widget.triggerAccent
                ? tokens.palette.accent
                : tokens.inkBorder;
    final display = washFormatTime12(_resolved);

    return CompositedTransformTarget(
      link: _link,
      child: Semantics(
        button: true,
        label: widget.ariaLabel ?? 'Time',
        enabled: !widget.disabled,
        child: GestureDetector(
          onTap: widget.disabled ? null : _open,
          child: MouseRegion(
            cursor: widget.disabled
                ? SystemMouseCursors.forbidden
                : SystemMouseCursors.click,
            child: Container(
              constraints: BoxConstraints(minHeight: compact ? 40 : 44),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: washInkBorderBox(tokens).copyWith(
                border: Border.all(
                    color: borderColor,
                    width: widget.triggerPrimary ||
                            widget.triggerSecondary ||
                            widget.triggerAccent
                        ? 2
                        : 1),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      display,
                      style: WashTypography.body(tokens.onSurface),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  WashLucideIcon('clock', size: 18, color: tokens.inkMuted),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ClockPanel extends StatelessWidget {
  const _ClockPanel({
    required this.value,
    required this.view,
    required this.onView,
    required this.onPick,
    required this.onClose,
  });

  final String value;
  final _ClockView view;
  final ValueChanged<_ClockView> onView;
  final void Function(int hour, int minute, int second) onPick;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final parts = value.split(':');
    final hour = int.tryParse(parts[0]) ?? 0;
    final minute = int.tryParse(parts.length > 1 ? parts[1] : '0') ?? 0;
    final second = int.tryParse(parts.length > 2 ? parts[2] : '0') ?? 0;

    return Container(
      decoration: washInkBorderBox(tokens, radius: 12, fill: tokens.surface),
      padding: const EdgeInsets.all(12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _ViewChip(
                  label: 'Hour',
                  active: view == _ClockView.hour,
                  onTap: () => onView(_ClockView.hour)),
              const SizedBox(width: 6),
              _ViewChip(
                  label: 'Min',
                  active: view == _ClockView.minute,
                  onTap: () => onView(_ClockView.minute)),
              const SizedBox(width: 6),
              _ViewChip(
                  label: 'Sec',
                  active: view == _ClockView.second,
                  onTap: () => onView(_ClockView.second)),
            ],
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 180,
            width: 180,
            child: GestureDetector(
              onPanUpdate: (d) =>
                  _applyPointer(context, d.localPosition, hour, minute, second),
              onTapDown: (d) =>
                  _applyPointer(context, d.localPosition, hour, minute, second),
              child: CustomPaint(
                painter: _ClockFacePainter(
                  tokens: tokens,
                  view: view,
                  hour: hour,
                  minute: minute,
                  second: second,
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          WashButton(
            size: WashButtonSize.sm,
            variant: WashButtonVariant.ghost,
            label: 'Done',
            onPressed: onClose,
          ),
        ],
      ),
    );
  }

  void _applyPointer(
      BuildContext context, Offset local, int hour, int minute, int second) {
    const size = 180.0;
    final center = const Offset(size / 2, size / 2);
    final dx = local.dx - center.dx;
    final dy = local.dy - center.dy;
    var deg = math.atan2(dy, dx) * 180 / math.pi + 90;
    if (deg < 0) deg += 360;
    final dist = math.sqrt(dx * dx + dy * dy);
    final radius = size / 2;

    if (view == _ClockView.hour) {
      final outer = dist > radius * 0.62;
      final slot = (deg / 30).round() % 12;
      final h = outer ? slot : (slot == 0 ? 12 : slot + 12);
      onPick(h % 24, minute, second);
      return;
    }
    if (view == _ClockView.minute) {
      final m = (deg / 6).round() % 60;
      onPick(hour, m, second);
      return;
    }
    final s = (deg / 6).round() % 60;
    onPick(hour, minute, s);
  }
}

class _ViewChip extends StatelessWidget {
  const _ViewChip(
      {required this.label, required this.active, required this.onTap});
  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      size: WashButtonSize.xs,
      variant: active ? WashButtonVariant.primary : WashButtonVariant.ghost,
      label: label,
      onPressed: onTap,
    );
  }
}

class _ClockFacePainter extends CustomPainter {
  _ClockFacePainter({
    required this.tokens,
    required this.view,
    required this.hour,
    required this.minute,
    required this.second,
  });

  final WashTokens tokens;
  final _ClockView view;
  final int hour;
  final int minute;
  final int second;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 8;
    final fill = Paint()
      ..color = tokens.surfaceContainer.withValues(alpha: 0.5);
    canvas.drawCircle(center, radius, fill);
    final border = Paint()
      ..color = tokens.inkBorder
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    canvas.drawCircle(center, radius, border);

    final handPaint = Paint()
      ..color = tokens.primary
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;

    final angle = switch (view) {
      _ClockView.hour => (hour % 12) / 12 * 2 * math.pi - math.pi / 2,
      _ClockView.minute => minute / 60 * 2 * math.pi - math.pi / 2,
      _ClockView.second => second / 60 * 2 * math.pi - math.pi / 2,
    };
    final handLen = view == _ClockView.hour ? radius * 0.5 : radius * 0.72;
    final end = Offset(center.dx + math.cos(angle) * handLen,
        center.dy + math.sin(angle) * handLen);
    canvas.drawLine(center, end, handPaint);
    canvas.drawCircle(center, 4, Paint()..color = tokens.primary);
  }

  @override
  bool shouldRepaint(covariant _ClockFacePainter oldDelegate) {
    return oldDelegate.hour != hour ||
        oldDelegate.minute != minute ||
        oldDelegate.second != second ||
        oldDelegate.view != view;
  }
}
