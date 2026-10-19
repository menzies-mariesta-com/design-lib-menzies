import 'package:flutter/widgets.dart';

import '../../tokens/wash_tokens.dart';
import '../layout/wash_aspect_ratio.dart';

/// Vertical anchor for [WashIndicator] marks (daisyUI `indicator-top`, etc.).
enum WashIndicatorVertical { top, middle, bottom }

/// Horizontal anchor for [WashIndicator] marks (daisyUI `indicator-start`, etc.).
enum WashIndicatorHorizontal { start, center, end }

/// Breakpoint override for responsive indicator placement.
class WashIndicatorResponsiveStep {
  const WashIndicatorResponsiveStep({
    required this.minWidth,
    this.vertical,
    this.horizontal,
  });

  final double minWidth;
  final WashIndicatorVertical? vertical;
  final WashIndicatorHorizontal? horizontal;
}

/// One badge or status mark pinned on a [WashIndicator].
class WashIndicatorMark {
  const WashIndicatorMark({
    required this.child,
    this.vertical = WashIndicatorVertical.top,
    this.horizontal = WashIndicatorHorizontal.end,
    this.responsive = const [],
  });

  final Widget child;
  final WashIndicatorVertical vertical;
  final WashIndicatorHorizontal horizontal;
  final List<WashIndicatorResponsiveStep> responsive;

  (WashIndicatorVertical, WashIndicatorHorizontal) resolve(double width) {
    var v = vertical;
    var h = horizontal;
    final steps = [...responsive]..sort((a, b) => a.minWidth.compareTo(b.minWidth));
    for (final step in steps) {
      if (width >= step.minWidth) {
        if (step.vertical != null) v = step.vertical!;
        if (step.horizontal != null) h = step.horizontal!;
      }
    }
    return (v, h);
  }
}

/// daisyUI `indicator`: absolutely positions badges or status dots on a child.
class WashIndicator extends StatelessWidget {
  const WashIndicator({
    required this.child,
    this.marks = const [],
    this.fullWidth = false,
    this.maxWidth,
    super.key,
  });

  final Widget child;
  final List<WashIndicatorMark> marks;
  final bool fullWidth;
  final double? maxWidth;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    Widget body = child;
    if (marks.isNotEmpty) {
      body = Stack(
        clipBehavior: Clip.none,
        children: [
          child,
          for (final mark in marks) _PositionedMark(mark: mark, viewportWidth: width),
        ],
      );
    }

    if (fullWidth || maxWidth != null) {
      body = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth ?? double.infinity),
        child: fullWidth ? SizedBox(width: double.infinity, child: body) : body,
      );
    }

    return body;
  }
}

class _PositionedMark extends StatelessWidget {
  const _PositionedMark({required this.mark, required this.viewportWidth});

  final WashIndicatorMark mark;
  final double viewportWidth;

  @override
  Widget build(BuildContext context) {
    final (vertical, horizontal) = mark.resolve(viewportWidth);
    final align = _alignment(vertical, horizontal);
    final translate = Offset(
      horizontal == WashIndicatorHorizontal.start
          ? -0.5
          : horizontal == WashIndicatorHorizontal.end
          ? 0.5
          : 0,
      vertical == WashIndicatorVertical.top
          ? -0.5
          : vertical == WashIndicatorVertical.bottom
          ? 0.5
          : 0,
    );

    return Positioned.fill(
      child: Align(
        alignment: align,
        child: FractionalTranslation(
          translation: translate,
          child: mark.child,
        ),
      ),
    );
  }

  Alignment _alignment(WashIndicatorVertical v, WashIndicatorHorizontal h) {
    final y = switch (v) {
      WashIndicatorVertical.top => -1.0,
      WashIndicatorVertical.middle => 0.0,
      WashIndicatorVertical.bottom => 1.0,
    };
    final x = switch (h) {
      WashIndicatorHorizontal.start => -1.0,
      WashIndicatorHorizontal.center => 0.0,
      WashIndicatorHorizontal.end => 1.0,
    };
    return Alignment(x, y);
  }
}

/// daisyUI `status` dot for presence and feedback colors.
enum WashStatusTone {
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

class WashStatusDot extends StatelessWidget {
  const WashStatusDot({
    this.tone = WashStatusTone.success,
    this.semanticsLabel,
    this.size = 8,
    super.key,
  });

  final WashStatusTone tone;
  final String? semanticsLabel;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = _color(tokens);
    return Semantics(
      label: semanticsLabel ?? tone.name,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(color: color, shape: BoxShape.circle),
      ),
    );
  }

  Color _color(WashTokens tokens) {
    final p = tokens.palette;
    return switch (tone) {
      WashStatusTone.primary => p.primary,
      WashStatusTone.secondary => p.secondary,
      WashStatusTone.accent => p.accent,
      WashStatusTone.info => p.info,
      WashStatusTone.success => p.success,
      WashStatusTone.warning => p.warning,
      WashStatusTone.error => p.error,
    };
  }
}

/// Tailwind `xl` breakpoint (1280px) for responsive indicator demos.
const double washIndicatorBreakpointXl = 1280;

/// Responsive steps matching web Indicator section 10.
List<WashIndicatorResponsiveStep> washIndicatorResponsivePlacementDemo() {
  return const [
    WashIndicatorResponsiveStep(
      minWidth: WashTailwindBreakpoints.sm,
      vertical: WashIndicatorVertical.middle,
    ),
    WashIndicatorResponsiveStep(
      minWidth: WashTailwindBreakpoints.md,
      vertical: WashIndicatorVertical.bottom,
    ),
    WashIndicatorResponsiveStep(
      minWidth: WashTailwindBreakpoints.lg,
      horizontal: WashIndicatorHorizontal.center,
    ),
    WashIndicatorResponsiveStep(
      minWidth: washIndicatorBreakpointXl,
      horizontal: WashIndicatorHorizontal.end,
    ),
  ];
}
