import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';

/// Scroll direction for composed [WashMarquee] (daisyUI-style band).
enum WashMarqueeDirection { left, reverse, vertical }

/// Duration tokens: normal 28s, slow 48s, fast 14s.
enum WashMarqueeSpeed { normal, slow, fast }

Duration washMarqueeDuration(WashMarqueeSpeed speed) {
  return switch (speed) {
    WashMarqueeSpeed.normal => const Duration(seconds: 28),
    WashMarqueeSpeed.slow => const Duration(seconds: 48),
    WashMarqueeSpeed.fast => const Duration(seconds: 14),
  };
}

/// Composed `marquee > marquee-track > marquee-content ×2` scroll band.
class WashMarquee extends StatefulWidget {
  const WashMarquee({
    required this.children,
    this.direction = WashMarqueeDirection.left,
    this.speed = WashMarqueeSpeed.normal,
    this.hoverPause = false,
    this.staticBand = false,
    this.gap = 24,
    this.verticalHeight = 192,
    super.key,
  });

  /// Legacy single-string constructor (horizontal, normal speed).
  WashMarquee.text(
    String text, {
    WashMarqueeDirection direction = WashMarqueeDirection.left,
    WashMarqueeSpeed speed = WashMarqueeSpeed.normal,
    bool hoverPause = false,
    bool staticBand = false,
    double gap = 24,
    Key? key,
  }) : this(
          children: [Text(text)],
          direction: direction,
          speed: speed,
          hoverPause: hoverPause,
          staticBand: staticBand,
          gap: gap,
          key: key,
        );

  final List<Widget> children;
  final WashMarqueeDirection direction;
  final WashMarqueeSpeed speed;
  final bool hoverPause;
  final bool staticBand;
  final double gap;
  final double verticalHeight;

  @override
  State<WashMarquee> createState() => _WashMarqueeState();
}

class _WashMarqueeState extends State<WashMarquee>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  final GlobalKey _measureKey = GlobalKey();
  double _shift = 0;
  double _crossExtent = 28;
  bool _hovering = false;
  bool _looping = false;

  bool get _vertical => widget.direction == WashMarqueeDirection.vertical;
  bool get _reverse => widget.direction == WashMarqueeDirection.reverse;

  bool get _shouldAnimate {
    if (widget.staticBand) return false;
    if (WashReducedMotion.of(context)) return false;
    if (widget.hoverPause && _hovering) return false;
    return _shift > 0;
  }

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureAndSync());
  }

  @override
  void didUpdateWidget(covariant WashMarquee oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.speed != widget.speed ||
        oldWidget.direction != widget.direction ||
        oldWidget.staticBand != widget.staticBand ||
        oldWidget.gap != widget.gap ||
        oldWidget.children != widget.children) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _measureAndSync());
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _syncMotion();
  }

  void _measureAndSync() {
    if (!mounted) return;
    final box = _measureKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _measureAndSync());
      return;
    }
    final main = _vertical ? box.size.height : box.size.width;
    final cross = _vertical ? box.size.width : box.size.height;
    final nextShift = main + widget.gap;
    final nextCross = cross < 1 ? 28.0 : cross;
    if ((nextShift - _shift).abs() > 0.5 ||
        (nextCross - _crossExtent).abs() > 0.5) {
      setState(() {
        _shift = nextShift;
        _crossExtent = nextCross;
      });
    } else {
      _shift = nextShift;
      _crossExtent = nextCross;
    }
    _controller.duration = washMarqueeDuration(widget.speed);
    _syncMotion();
  }

  void _syncMotion() {
    if (!mounted) return;
    if (_shouldAnimate) {
      if (!_looping) {
        _looping = true;
        _runLoop();
      }
    } else {
      _looping = false;
      _controller.stop();
      if (widget.staticBand || WashReducedMotion.of(context)) {
        _controller.value = 0;
      }
    }
  }

  Future<void> _runLoop() async {
    while (mounted && _looping && _shouldAnimate) {
      final from = _controller.value;
      try {
        await _controller.forward(from: from);
      } catch (_) {
        return;
      }
      if (!mounted || !_looping) return;
      _controller.value = 0;
    }
    _looping = false;
  }

  @override
  void dispose() {
    _looping = false;
    _controller.dispose();
    super.dispose();
  }

  Widget _strip({Key? key, required bool hideSemantics}) {
    final kids = <Widget>[];
    for (var i = 0; i < widget.children.length; i++) {
      if (i > 0) {
        kids.add(
          _vertical
              ? SizedBox(height: widget.gap)
              : SizedBox(width: widget.gap),
        );
      }
      kids.add(widget.children[i]);
    }
    final strip = _vertical
        ? Column(
            key: key,
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: kids,
          )
        : Row(
            key: key,
            mainAxisSize: MainAxisSize.min,
            children: kids,
          );
    if (hideSemantics) {
      return ExcludeSemantics(child: strip);
    }
    return strip;
  }

  Widget _track() {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final t = _controller.value;
        final travel = _shift * t;
        final dx = _vertical ? 0.0 : (_reverse ? travel : -travel);
        final dy = _vertical ? (_reverse ? travel : -travel) : 0.0;
        return Transform.translate(
          offset: Offset(dx, dy),
          child: _vertical
              ? Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _strip(key: _measureKey, hideSemantics: false),
                    SizedBox(height: widget.gap),
                    _strip(hideSemantics: true),
                  ],
                )
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _strip(key: _measureKey, hideSemantics: false),
                    SizedBox(width: widget.gap),
                    _strip(hideSemantics: true),
                  ],
                ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final viewportH = _vertical ? widget.verticalHeight : _crossExtent;

    Widget band = LayoutBuilder(
      builder: (context, constraints) {
        final viewportW = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : 300.0;
        return SizedBox(
          width: viewportW,
          height: viewportH,
          child: ShaderMask(
            blendMode: BlendMode.dstIn,
            shaderCallback: (bounds) {
              if (_vertical) {
                return const LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color(0x00000000),
                    Color(0xFF000000),
                    Color(0xFF000000),
                    Color(0x00000000),
                  ],
                  stops: [0, 0.1, 0.9, 1],
                ).createShader(bounds);
              }
              return const LinearGradient(
                colors: [
                  Color(0x00000000),
                  Color(0xFF000000),
                  Color(0xFF000000),
                  Color(0x00000000),
                ],
                stops: [0, 0.06, 0.94, 1],
              ).createShader(bounds);
            },
            child: ClipRect(
              child: OverflowBox(
                alignment:
                    _vertical ? Alignment.topCenter : Alignment.centerLeft,
                minWidth: 0,
                maxWidth: double.infinity,
                minHeight: 0,
                maxHeight: _vertical ? double.infinity : viewportH,
                child: _track(),
              ),
            ),
          ),
        );
      },
    );

    if (widget.hoverPause) {
      band = MouseRegion(
        onEnter: (_) {
          _hovering = true;
          _syncMotion();
        },
        onExit: (_) {
          _hovering = false;
          _syncMotion();
        },
        child: band,
      );
    }

    return band;
  }
}
