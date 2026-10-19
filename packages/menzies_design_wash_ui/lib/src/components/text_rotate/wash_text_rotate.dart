import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI default `--duration` for `text-rotate` (10s).
const Duration kWashTextRotateDuration = Duration(seconds: 10);

/// Tailwind `duration-6000` on `text-rotate`.
const Duration kWashTextRotateDuration6000 = Duration(milliseconds: 6000);

/// daisyUI `linear()` hold/jump stops for 2-6 words.
double washTextRotateProgress(double t, int items) {
  if (items < 2) return 0;
  final x = t.clamp(0.0, 1.0);
  final stops = switch (items) {
    2 => const <(double, double)>[
        (0, 0),
        (0.49, 0),
        (0.50, 0.5),
        (0.99, 0.5),
        (1, 1),
      ],
    3 => const <(double, double)>[
        (0, 0),
        (0.32, 0),
        (0.33, 0.333333),
        (0.65, 0.333333),
        (0.66, 0.666666),
        (0.99, 0.666666),
        (1, 1),
      ],
    4 => const <(double, double)>[
        (0, 0),
        (0.24, 0),
        (0.25, 0.25),
        (0.49, 0.25),
        (0.50, 0.5),
        (0.74, 0.5),
        (0.75, 0.75),
        (0.99, 0.75),
        (1, 1),
      ],
    5 => const <(double, double)>[
        (0, 0),
        (0.19, 0),
        (0.20, 0.2),
        (0.39, 0.2),
        (0.40, 0.4),
        (0.59, 0.4),
        (0.60, 0.6),
        (0.79, 0.6),
        (0.80, 0.8),
        (0.99, 0.8),
        (1, 1),
      ],
    6 => const <(double, double)>[
        (0, 0),
        (0.15, 0),
        (0.16, 0.16666),
        (0.32, 0.16666),
        (0.33, 0.333333),
        (0.49, 0.333333),
        (0.50, 0.5),
        (0.65, 0.5),
        (0.66, 0.666666),
        (0.82, 0.666666),
        (0.83, 0.833333),
        (0.99, 0.833333),
        (1, 1),
      ],
    _ => _genericStops(items),
  };
  return _piecewise(x, stops);
}

List<(double, double)> _genericStops(int items) {
  final out = <(double, double)>[];
  for (var i = 0; i < items; i++) {
    final start = i / items;
    final holdEnd = ((i + 1) / items) - 0.01;
    out.add((start, i / items));
    if (holdEnd > start) out.add((holdEnd, i / items));
  }
  out.add((1, 1));
  return out;
}

double _piecewise(double t, List<(double, double)> stops) {
  if (t <= stops.first.$1) return stops.first.$2;
  for (var i = 1; i < stops.length; i++) {
    if (t <= stops[i].$1) {
      final t0 = stops[i - 1].$1;
      final t1 = stops[i].$1;
      final y0 = stops[i - 1].$2;
      final y1 = stops[i].$2;
      if ((t1 - t0).abs() < 1e-9) return y1;
      return y0 + (y1 - y0) * ((t - t0) / (t1 - t0));
    }
  }
  return stops.last.$2;
}

/// Monospace class hint (`text-rotate`, `text-rotate text-rotate-static`, …).
class WashTextRotateClassLabel extends StatelessWidget {
  const WashTextRotateClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'text-rotate' : value,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// daisyUI `text-rotate`: cycles words in a single line-height slot.
///
/// Under [WashReducedMotion] this gallery port pauses and keeps the first
/// line (Wash override of daisyUI's stepped fallback). [staticRotate] is the
/// `text-rotate-static` companion: first word only, no loop.
class WashTextRotate extends StatefulWidget {
  const WashTextRotate({
    this.words = const [],
    this.children,
    this.style,
    this.duration = kWashTextRotateDuration,
    this.center = false,
    this.staticRotate = false,
    this.pauseOnHover = true,
    super.key,
  });

  final List<String> words;
  final List<Widget>? children;
  final TextStyle? style;
  final Duration duration;
  final bool center;
  final bool staticRotate;
  final bool pauseOnHover;

  @override
  State<WashTextRotate> createState() => _WashTextRotateState();
}

class _WashTextRotateState extends State<WashTextRotate>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  bool _hovering = false;
  double? _slot;
  double? _width;
  final GlobalKey _measureKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration);
    WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _syncMotion();
    WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
  }

  @override
  void didUpdateWidget(covariant WashTextRotate oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.duration != widget.duration) {
      _controller.duration = widget.duration;
    }
    if (oldWidget.staticRotate != widget.staticRotate ||
        oldWidget.words != widget.words ||
        oldWidget.children != widget.children ||
        oldWidget.style != widget.style ||
        oldWidget.center != widget.center) {
      _slot = null;
      _width = null;
      WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
    }
    _syncMotion();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  bool get _flat {
    if (widget.staticRotate) return true;
    return WashReducedMotion.of(context);
  }

  int get _count {
    if (widget.children != null && widget.children!.isNotEmpty) {
      return widget.children!.length;
    }
    return widget.words.length;
  }

  void _syncMotion() {
    final n = _count;
    final shouldRun = !_flat && n >= 2 && !(_hovering && widget.pauseOnHover);
    if (shouldRun) {
      if (!_controller.isAnimating) {
        _controller.repeat();
      }
    } else {
      _controller.stop();
      if (_flat) {
        _controller.value = 0;
      }
    }
  }

  List<Widget> _items(TextStyle style) {
    if (widget.children != null && widget.children!.isNotEmpty) {
      return widget.children!;
    }
    return [
      for (final w in widget.words)
        Text(w, maxLines: 1, softWrap: false, style: style),
    ];
  }

  void _measure() {
    if (!mounted) return;
    final box = _measureKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _measure());
      return;
    }
    final n = _count;
    if (n < 1) return;
    final nextW = box.size.width;
    final nextH = box.size.height / n;
    if (nextH < 1 || nextW < 1) return;
    if (_slot == null ||
        _width == null ||
        (nextH - _slot!).abs() > 0.5 ||
        (nextW - _width!).abs() > 0.5) {
      setState(() {
        _slot = nextH;
        _width = nextW;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final inherited = DefaultTextStyle.of(context).style;
    final style = inherited.merge(
      widget.style ??
          WashTypography.displayLarge(WashTokens.of(context).onSurface),
    );
    final items = _items(style);
    if (items.isEmpty) return const SizedBox.shrink();

    final estimated = (style.fontSize ?? 16) * (style.height ?? 1.2);
    final slot = _slot ?? estimated;
    final n = items.length;
    final loop = !_flat && n >= 2;
    final align = widget.center ? Alignment.center : Alignment.centerLeft;
    final cross =
        widget.center ? CrossAxisAlignment.center : CrossAxisAlignment.start;

    Widget slotChild(Widget child) {
      return SizedBox(
        height: slot,
        child: Align(alignment: align, child: child),
      );
    }

    final columnChildren = <Widget>[
      for (final child in items) slotChild(child),
      if (loop) slotChild(items.first),
    ];

    return MouseRegion(
      onEnter: widget.pauseOnHover
          ? (_) {
              _hovering = true;
              _syncMotion();
            }
          : null,
      onExit: widget.pauseOnHover
          ? (_) {
              _hovering = false;
              _syncMotion();
            }
          : null,
      child: DefaultTextStyle(
        style: style,
        child: Stack(
          clipBehavior: Clip.hardEdge,
          children: [
            Offstage(
              child: TickerMode(
                enabled: false,
                child: Column(
                  key: _measureKey,
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: cross,
                  children: items,
                ),
              ),
            ),
            AnimatedBuilder(
              animation: _controller,
              builder: (context, _) {
                final p =
                    loop ? washTextRotateProgress(_controller.value, n) : 0.0;
                return ClipRect(
                  child: SizedBox(
                    height: slot,
                    width: _width,
                    child: OverflowBox(
                      maxHeight: double.infinity,
                      alignment: Alignment.topCenter,
                      child: Transform.translate(
                        offset: Offset(0, -p * n * slot),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: cross,
                          children: columnChildren,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
