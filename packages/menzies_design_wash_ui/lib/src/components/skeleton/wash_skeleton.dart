import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI skeleton corner treatments.
enum WashSkeletonShape {
  /// Default `skeleton` (`--radius-selector`).
  rectangle,

  /// `rounded-full`.
  circle,

  /// `rounded-box` (`--radius-box`).
  roundedBox,
}

/// daisyUI `skeleton` placeholder with the 1.8s highlight sweep.
class WashSkeleton extends StatefulWidget {
  const WashSkeleton({
    this.width,
    this.height = 16,
    this.widthFraction,
    this.maxWidth,
    this.expand = false,
    this.aspectSquare = false,
    this.shape = WashSkeletonShape.rectangle,
    this.borderRadius,
    this.text,
    this.textStyle,
    this.semanticLabel,
    this.excludeFromSemantics = true,
    super.key,
  });

  /// daisyUI `skeleton skeleton-text`.
  const WashSkeleton.text(
    String this.text, {
    this.textStyle,
    this.semanticLabel,
    this.excludeFromSemantics = true,
    super.key,
  })  : width = null,
        height = 16,
        widthFraction = null,
        maxWidth = null,
        expand = false,
        aspectSquare = false,
        shape = WashSkeletonShape.rectangle,
        borderRadius = null;

  final double? width;
  final double height;
  final double? widthFraction;
  final double? maxWidth;
  final bool expand;
  final bool aspectSquare;
  final WashSkeletonShape shape;
  final BorderRadius? borderRadius;
  final String? text;
  final TextStyle? textStyle;
  final String? semanticLabel;
  final bool excludeFromSemantics;

  @override
  State<WashSkeleton> createState() => _WashSkeletonState();
}

class _WashSkeletonState extends State<WashSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (WashReducedMotion.of(context)) {
      _controller.stop();
      _controller.value = 0.5;
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  BorderRadius _radius(WashTokens tokens) {
    if (widget.borderRadius != null) return widget.borderRadius!;
    return switch (widget.shape) {
      WashSkeletonShape.circle => BorderRadius.circular(999),
      WashSkeletonShape.roundedBox => BorderRadius.circular(tokens.radiusBox),
      WashSkeletonShape.rectangle => BorderRadius.circular(tokens.radiusField),
    };
  }

  LinearGradient _gradient(WashTokens tokens, double t) {
    final base = tokens.palette.base300;
    final shine = tokens.palette.base100;
    final slide = 2.0 - 4.0 * t;
    return LinearGradient(
      begin: Alignment(-1.0 + slide, 0),
      end: Alignment(1.0 + slide, 0),
      colors: [base, base, shine, base, base],
      stops: const [0.0, 0.38, 0.5, 0.62, 1.0],
    );
  }

  Widget _wrapSemantics(Widget child) {
    if (widget.excludeFromSemantics) {
      return ExcludeSemantics(child: child);
    }
    if (widget.semanticLabel != null) {
      return Semantics(
        label: widget.semanticLabel,
        child: child,
      );
    }
    return child;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    if (widget.text != null) {
      return _wrapSemantics(_buildText(tokens));
    }
    return _wrapSemantics(_buildBox(tokens));
  }

  Widget _buildText(WashTokens tokens) {
    final style = (widget.textStyle ??
            WashTypography.title(tokens.onSurface).copyWith(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ))
        .copyWith(color: const Color(0xFFFFFFFF));
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return ShaderMask(
          blendMode: BlendMode.srcIn,
          shaderCallback: (bounds) =>
              _gradient(tokens, _controller.value).createShader(bounds),
          child: Text(widget.text!, style: style),
        );
      },
    );
  }

  Widget _buildBox(WashTokens tokens) {
    final radius = _radius(tokens);
    Widget box({required double? width, required double height}) {
      return AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          return Container(
            width: width,
            height: height,
            decoration: BoxDecoration(
              borderRadius: radius,
              gradient: _gradient(tokens, _controller.value),
            ),
          );
        },
      );
    }

    if (widget.aspectSquare) {
      return LayoutBuilder(
        builder: (context, constraints) {
          var side = widget.width ??
              (constraints.hasBoundedWidth
                  ? constraints.maxWidth
                  : widget.height);
          if (widget.maxWidth != null) {
            side = side.clamp(0, widget.maxWidth!).toDouble();
          }
          return box(width: side, height: side);
        },
      );
    }

    if (widget.expand ||
        widget.widthFraction != null ||
        widget.maxWidth != null) {
      return LayoutBuilder(
        builder: (context, constraints) {
          final maxW = constraints.hasBoundedWidth
              ? constraints.maxWidth
              : (widget.width ?? widget.maxWidth ?? 320);
          var w = widget.expand ? maxW : (widget.width ?? maxW);
          if (widget.widthFraction != null) {
            w = maxW * widget.widthFraction!;
          }
          if (widget.maxWidth != null) {
            w = w.clamp(0, widget.maxWidth!).toDouble();
          }
          return box(width: w, height: widget.height);
        },
      );
    }

    return box(width: widget.width, height: widget.height);
  }
}
