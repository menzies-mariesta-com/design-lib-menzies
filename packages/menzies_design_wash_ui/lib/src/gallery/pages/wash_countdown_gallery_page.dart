import 'dart:async';

import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/countdown/wash_countdown.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashCountdownGalleryPage extends StatelessWidget {
  const WashCountdownGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Countdown',
      description:
          'daisyUI countdown digits with wash-panel layouts, live ticks, and studio session timers.',
      sections: [
        _s('01 · Basic', 'Single value', 'Change the span text and the --value CSS variable', _basic(), _basicDart),
        _s('02 · Clock', 'Days, hours, minutes, seconds', 'Classic daisyUI clock layouts', _clock(), _clockDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · In boxes', 'Large type in boxes', 'Neutral boxes and wash chrome for exhibition-scale digits', _boxes(), _boxesDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Live tick', 'Interval countdown', 'Flutter state ticks every second', const _LiveTickSection(), _liveDart, tint: WashGalleryPanelTint.ochre),
        _s('05 · Studio session', 'Studio session timer', 'Wash dry time and critique start timers styled', const _StudioSessionSection(), _studioDart, tint: WashGalleryPanelTint.rose),
        _s('06 · Responsive', 'Fluid clock stack', 'Units wrap on narrow viewports and scale type from phone to desktop', _responsive(), _responsiveDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        WashCountdownClassLabel(label),
      ],
    );
  }

  static Widget _basic() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample('countdown', WashCountdown(child: WashCountdownValue(value: 59))),
        _sample('countdown · --digits: 2', WashCountdown(child: WashCountdownValue(value: 7, digits: 2))),
        _sample('countdown · --digits: 3', WashCountdown(child: WashCountdownValue(value: 42, digits: 3))),
      ],
    );
  }

  static Widget _clock() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          'countdown font-mono text-2xl',
          WashCountdown(
            fontSize: 24,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                WashCountdownValue(value: 10),
                Text('h'),
                WashCountdownValue(value: 24),
                Text('m'),
                WashCountdownValue(value: 59),
                Text('s'),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        _sample(
          'countdown with colons',
          WashCountdown(
            fontSize: 24,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                WashCountdownValue(value: 10),
                Text(':'),
                WashCountdownValue(value: 24, digits: 2),
                Text(':'),
                WashCountdownValue(value: 59, digits: 2),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        _sample(
          'labeled units',
          Wrap(
            spacing: 20,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Row(mainAxisSize: MainAxisSize.min, children: const [WashCountdown(child: WashCountdownValue(value: 15)), Text(' days')]),
              Row(mainAxisSize: MainAxisSize.min, children: const [WashCountdown(child: WashCountdownValue(value: 10)), Text(' hours')]),
              Row(mainAxisSize: MainAxisSize.min, children: const [WashCountdown(child: WashCountdownValue(value: 24)), Text(' min')]),
              Row(mainAxisSize: MainAxisSize.min, children: const [WashCountdown(child: WashCountdownValue(value: 59)), Text(' sec')]),
            ],
          ),
        ),
      ],
    );
  }

  static Widget _boxes() {
    return Builder(
      builder: (context) {
        final t = WashTokens.of(context);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _neutralBox(t, '15', 'days'),
                const SizedBox(width: 12),
                _neutralBox(t, '10', 'hours'),
                const SizedBox(width: 12),
                _neutralBox(t, '24', 'min'),
                const SizedBox(width: 12),
                _neutralBox(t, '59', 'sec'),
              ],
            ),
            const SizedBox(height: 32),
            WashCountdown(fontSize: 56, child: const WashCountdownValue(value: 59, digits: 2)),
          ],
        );
      },
    );
  }

  static Widget _neutralBox(WashTokens t, String n, String label) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: t.palette.neutral,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          WashCountdown(
            fontSize: 40,
            child: WashCountdownValue(value: int.parse(n)),
          ),
          Text(label, style: TextStyle(color: t.palette.neutralContent)),
        ],
      ),
    );
  }

  static Widget _responsive() {
    return Builder(
      builder: (context) {
        final t = WashTokens.of(context);
        final cells = [
          ('2', 'days'),
          ('14', 'hours'),
          ('36', 'min'),
          ('9', 'sec'),
        ];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LayoutBuilder(
              builder: (context, c) {
                final cols = c.maxWidth >= 640 ? 4 : 2;
                return GridView.count(
                  crossAxisCount: cols,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 1.1,
                  children: cells
                      .map(
                        (e) => Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: t.surfaceContainer.withValues(alpha: 0.6),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: t.inkBorder.withValues(alpha: 0.5)),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              WashCountdown(
                                fontSize: 32,
                                child: WashCountdownValue(value: int.parse(e.$1), digits: 2),
                              ),
                              Text(e.$2, style: WashTypography.label(t.inkMuted)),
                            ],
                          ),
                        ),
                      )
                      .toList(),
                );
              },
            ),
            const SizedBox(height: 16),
            Text(
              'Two columns on mobile, four on tablet and up. Type steps up with breakpoints.',
              style: WashTypography.body(t.inkMuted),
            ),
          ],
        );
      },
    );
  }

  static const _basicDart = 'WashCountdown(child: WashCountdownValue(value: 59));';
  static const _clockDart = 'WashCountdown(fontSize: 24, child: Row(children: [WashCountdownValue(value: 10), Text(":"), ...]));';
  static const _boxesDart = 'WashCountdown(fontSize: 40, child: WashCountdownValue(value: 15));';
  static const _liveDart = 'WashCountdownLivePreview(initialSeconds: 90);';
  static const _studioDart = '_StudioSessionSection();';
  static const _responsiveDart = 'WashCountdownValue(value: 2, digits: 2) in responsive grid;';
}

class _LiveTickSection extends StatelessWidget {
  const _LiveTickSection();

  @override
  Widget build(BuildContext context) {
    return const WashCountdownLivePreview(initialSeconds: 90);
  }
}

class _StudioSessionSection extends StatefulWidget {
  const _StudioSessionSection();

  @override
  State<_StudioSessionSection> createState() => _StudioSessionSectionState();
}

class _StudioSessionSectionState extends State<_StudioSessionSection> {
  static const _dryStart = 45 * 60;
  static const _critiqueStart = 12 * 60 + 30;

  _StudioMode _mode = _StudioMode.dry;
  late int _remaining;
  bool _paused = false;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _remaining = _dryStart;
    _schedule();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _schedule() {
    _timer?.cancel();
    if (_paused || _remaining <= 0) return;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_remaining <= 0) return;
      setState(() => _remaining = (_remaining - 1).clamp(0, 999999));
      if (_remaining == 0) _timer?.cancel();
    });
  }

  void _switchMode(_StudioMode mode) {
    setState(() {
      _mode = mode;
      _remaining = mode == _StudioMode.dry ? _dryStart : _critiqueStart;
      _paused = false;
    });
    _schedule();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final parts = washSplitCountdownSeconds(_remaining);
    final label = _mode == _StudioMode.dry ? 'Wash dry time' : 'Critique start';
    final status = _remaining == 0
        ? (_mode == _StudioMode.dry ? 'Wash is dry. Ready for the next layer.' : 'Critique has begun.')
        : _paused
            ? 'Session paused'
            : 'Counting down for the studio floor';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          children: [
            WashButton(
              size: WashButtonSize.sm,
              variant: _mode == _StudioMode.dry ? WashButtonVariant.primary : WashButtonVariant.ghost,
              label: 'Wash dry',
              onPressed: () => _switchMode(_StudioMode.dry),
            ),
            WashButton(
              size: WashButtonSize.sm,
              variant: _mode == _StudioMode.critique ? WashButtonVariant.secondary : WashButtonVariant.ghost,
              label: 'Critique',
              onPressed: () => _switchMode(_StudioMode.critique),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Text(label, style: WashTypography.label(tokens.inkMuted)),
        const SizedBox(height: 8),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (_mode == _StudioMode.dry) _studioCell(tokens, parts.hours, 'hours'),
            _studioCell(tokens, parts.minutes, 'min'),
            _studioCell(tokens, parts.seconds, 'sec'),
          ],
        ),
        const SizedBox(height: 12),
        Text(status, style: WashTypography.body(tokens.inkMuted)),
        const SizedBox(height: 12),
        Row(
          children: [
            WashTooltip(
              message: _paused ? 'Resume' : 'Pause',
              child: WashButton(
                square: true,
                enabled: _remaining > 0,
                variant: _paused ? WashButtonVariant.success : WashButtonVariant.secondary,
                onPressed: _remaining == 0
                    ? null
                    : () {
                        setState(() => _paused = !_paused);
                        _schedule();
                      },
                child: WashLucideIcon(_paused ? 'play' : 'pause', size: 20),
              ),
            ),
            const SizedBox(width: 8),
            WashTooltip(
              message: 'Reset',
              child: WashButton(
                square: true,
                onPressed: () {
                  setState(() {
                    _remaining = _mode == _StudioMode.dry ? _dryStart : _critiqueStart;
                    _paused = false;
                  });
                  _schedule();
                },
                child: const WashLucideIcon('timer-reset', size: 20),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _studioCell(WashTokens t, int value, String label) {
    return Container(
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: t.surfaceContainer.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          WashCountdown(
            fontSize: 36,
            child: WashCountdownValue(value: value, digits: 2),
          ),
          Text(label, style: WashTypography.label(t.inkMuted)),
        ],
      ),
    );
  }
}

enum _StudioMode { dry, critique }
