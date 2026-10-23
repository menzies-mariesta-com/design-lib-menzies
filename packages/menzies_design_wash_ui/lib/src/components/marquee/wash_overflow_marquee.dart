import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Truncated text that marquees on hover/focus when overflowing.
///
/// Matches web `<OverflowMarquee>` / auto-attach truncate behaviour.
class WashOverflowMarquee extends StatefulWidget {
  const WashOverflowMarquee(
    this.text, {
    this.style,
    this.enabled = true,
    super.key,
  });

  final String text;
  final TextStyle? style;
  final bool enabled;

  @override
  State<WashOverflowMarquee> createState() => _WashOverflowMarqueeState();
}

class _WashOverflowMarqueeState extends State<WashOverflowMarquee>
    with SingleTickerProviderStateMixin {
  final GlobalKey _labelKey = GlobalKey();
  late final AnimationController _controller;
  bool _overflowing = false;
  bool _active = false;
  double _shift = 0;
  bool _looping = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
  }

  @override
  void didUpdateWidget(covariant WashOverflowMarquee oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
    }
  }

  @override
  void dispose() {
    _looping = false;
    _controller.dispose();
    super.dispose();
  }

  void _measure() {
    if (!mounted) return;
    final box = _labelKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return;
    // Compare intrinsic text width vs host
    final painter = TextPainter(
      text: TextSpan(text: widget.text, style: _resolvedStyle(context)),
      maxLines: 1,
      textDirection: TextDirection.ltr,
    )..layout();
    final hostW = box.size.width;
    final overflow = painter.width > hostW + 0.5;
    final overflowPx = (painter.width - hostW).clamp(0.0, 4000.0);
    final secs =
        (widget.text.length * 0.12 + overflowPx * 0.02).clamp(8.0, 28.0);
    setState(() {
      _overflowing = overflow;
      _shift = painter.width + 24;
      _controller.duration = Duration(milliseconds: (secs * 1000).round());
    });
  }

  TextStyle _resolvedStyle(BuildContext context) {
    return widget.style ??
        WashTypography.body(WashTokens.of(context).onSurface).copyWith(
          fontSize: 14,
        );
  }

  void _setActive(bool active) {
    if (!widget.enabled || !_overflowing) {
      if (_active) setState(() => _active = false);
      _stopLoop();
      return;
    }
    setState(() => _active = active);
    if (active && !WashReducedMotion.of(context)) {
      _startLoop();
    } else {
      _stopLoop();
    }
  }

  void _stopLoop() {
    _looping = false;
    _controller.stop();
    _controller.value = 0;
  }

  Future<void> _startLoop() async {
    if (_looping) return;
    _looping = true;
    while (mounted && _looping && _active) {
      try {
        await _controller.forward(from: _controller.value);
      } catch (_) {
        return;
      }
      if (!mounted || !_looping) return;
      _controller.value = 0;
    }
    _looping = false;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final style = _resolvedStyle(context);
    final reduced = WashReducedMotion.of(context);
    final showTrack = _active && _overflowing && !reduced;
    final showStaticReveal = _active && _overflowing && reduced;

    return MouseRegion(
      cursor:
          _overflowing ? SystemMouseCursors.basic : SystemMouseCursors.basic,
      onEnter: (_) => _setActive(true),
      onExit: (_) => _setActive(false),
      child: Focus(
        onFocusChange: _setActive,
        child: LayoutBuilder(
          builder: (context, constraints) {
            WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
            return Stack(
              clipBehavior: Clip.hardEdge,
              children: [
                Opacity(
                  opacity: showTrack ? 0 : 1,
                  child: Text(
                    key: _labelKey,
                    widget.text,
                    maxLines: showStaticReveal ? null : 1,
                    overflow: showStaticReveal
                        ? TextOverflow.visible
                        : TextOverflow.ellipsis,
                    softWrap: showStaticReveal,
                    style: style.copyWith(
                      backgroundColor:
                          showStaticReveal ? tokens.palette.base100 : null,
                    ),
                  ),
                ),
                if (showTrack)
                  Positioned.fill(
                    child: ClipRect(
                      child: AnimatedBuilder(
                        animation: _controller,
                        builder: (context, _) {
                          return Transform.translate(
                            offset: Offset(-_shift * _controller.value, 0),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  widget.text,
                                  maxLines: 1,
                                  softWrap: false,
                                  style: style,
                                ),
                                const SizedBox(width: 24),
                                ExcludeSemantics(
                                  child: Text(
                                    widget.text,
                                    maxLines: 1,
                                    softWrap: false,
                                    style: style,
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
                  ),
              ],
            );
          },
        ),
      ),
    );
  }
}
