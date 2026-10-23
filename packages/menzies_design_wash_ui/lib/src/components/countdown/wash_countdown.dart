import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../foundation/reduced_motion.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';

/// Splits seconds into days, hours, minutes, and seconds (non-negative).
({int days, int hours, int minutes, int seconds}) washSplitCountdownSeconds(
    int total) {
  final s = total < 0 ? 0 : total;
  final days = s ~/ 86400;
  final hours = (s % 86400) ~/ 3600;
  final minutes = (s % 3600) ~/ 60;
  final seconds = s % 60;
  return (days: days, hours: hours, minutes: minutes, seconds: seconds);
}

/// daisyUI `countdown` digit span (`--value`, optional `--digits`).
class WashCountdownValue extends StatelessWidget {
  const WashCountdownValue({
    required this.value,
    this.digits,
    super.key,
  });

  final int value;
  final int? digits;

  @override
  Widget build(BuildContext context) {
    final n = value.clamp(0, 999);
    final reduced = WashReducedMotion.of(context);
    final duration =
        reduced ? Duration.zero : const Duration(milliseconds: 350);
    final curve = reduced ? Curves.linear : Curves.easeOutCubic;

    return Semantics(
      liveRegion: true,
      label: '$n',
      child: ClipRect(
        child: AnimatedSwitcher(
          duration: duration,
          switchInCurve: curve,
          switchOutCurve: curve,
          transitionBuilder: (child, animation) {
            final offset = Tween<Offset>(
              begin: const Offset(0, 0.35),
              end: Offset.zero,
            ).animate(animation);
            return SlideTransition(
              position: offset,
              child: FadeTransition(opacity: animation, child: child),
            );
          },
          layoutBuilder: (current, previous) => Stack(
            alignment: Alignment.bottomCenter,
            children: [...previous, if (current != null) current],
          ),
          child: Text(
            '$n',
            key: ValueKey<int>(n),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}

/// Typography wrapper matching `countdown font-mono`.
class WashCountdown extends StatelessWidget {
  const WashCountdown({
    required this.child,
    this.fontSize = 36,
    super.key,
  });

  final Widget child;
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DefaultTextStyle(
      style: WashTypography.displayLarge(tokens.onSurface).copyWith(
        fontFamily: 'monospace',
        fontSize: fontSize,
        height: 1,
        fontFeatures: const [FontFeature.tabularFigures()],
      ),
      child: child,
    );
  }
}

class WashCountdownClassLabel extends StatelessWidget {
  const WashCountdownClassLabel(this.value, {super.key});
  final String value;

  @override
  Widget build(BuildContext context) {
    return Text(
      value,
      style: const TextStyle(
          fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
    );
  }
}

/// Gallery / legacy preview: compact live tick (matches web `LiveTickDemo` start).
class WashCountdownLivePreview extends StatefulWidget {
  const WashCountdownLivePreview({this.initialSeconds = 90, super.key});

  final int initialSeconds;

  @override
  State<WashCountdownLivePreview> createState() =>
      _WashCountdownLivePreviewState();
}

class _WashCountdownLivePreviewState extends State<WashCountdownLivePreview> {
  late int _remaining;
  bool _paused = false;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _remaining = widget.initialSeconds;
    _scheduleTick();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _scheduleTick() {
    _timer?.cancel();
    final running = !_paused && _remaining > 0;
    if (!running) return;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_remaining <= 0) return;
      setState(() => _remaining = (_remaining - 1).clamp(0, 999999));
      if (_remaining == 0) _timer?.cancel();
    });
  }

  void _togglePause() {
    if (_remaining == 0) return;
    setState(() => _paused = !_paused);
    _scheduleTick();
  }

  void _reset() {
    setState(() {
      _remaining = widget.initialSeconds;
      _paused = false;
    });
    _scheduleTick();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final parts = washSplitCountdownSeconds(_remaining);
    final status = _remaining == 0
        ? 'Timer finished'
        : _paused
            ? 'Paused'
            : 'Ticking every second';

    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= 480;
        final clock = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashCountdown(
              fontSize: 48,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashCountdownValue(value: parts.minutes, digits: 2),
                  const Text(':'),
                  WashCountdownValue(value: parts.seconds, digits: 2),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const WashCountdownClassLabel('countdown + Timer.periodic'),
            const SizedBox(height: 4),
            Text(status, style: WashTypography.body(tokens.inkMuted)),
          ],
        );
        final controls = Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            WashTooltip(
              message: _paused ? 'Resume' : 'Pause',
              prefer: WashTooltipSide.top,
              child: WashButton(
                square: true,
                variant: _remaining == 0
                    ? WashButtonVariant.primary
                    : _paused
                        ? WashButtonVariant.success
                        : WashButtonVariant.secondary,
                enabled: _remaining > 0,
                onPressed: _remaining == 0 ? null : _togglePause,
                child: WashLucideIcon(_paused ? 'play' : 'pause', size: 20),
              ),
            ),
            const SizedBox(width: 8),
            WashTooltip(
              message: 'Reset',
              prefer: WashTooltipSide.top,
              child: WashButton(
                square: true,
                onPressed: _reset,
                child: const WashLucideIcon('timer-reset', size: 20),
              ),
            ),
          ],
        );
        if (row) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(child: clock),
              controls,
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            clock,
            const SizedBox(height: 16),
            controls,
          ],
        );
      },
    );
  }
}
