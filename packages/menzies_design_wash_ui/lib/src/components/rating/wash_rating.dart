import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../tokens/wash_tokens.dart';
import '../mask/wash_mask.dart';
import '../progress/wash_progress.dart';

/// daisyUI `rating-*` size scale.
enum WashRatingSize {
  xs,
  sm,
  md,
  lg,
  xl,
}

/// Mask shape for rating items (`mask-star`, `mask-star-2`, `mask-heart`).
enum WashRatingShape {
  star,
  star2,
  heart,
}

double washRatingItemSize(WashRatingSize size) {
  return switch (size) {
    WashRatingSize.xs => 14,
    WashRatingSize.sm => 18,
    WashRatingSize.md => 22,
    WashRatingSize.lg => 28,
    WashRatingSize.xl => 36,
  };
}

WashMaskShape _maskShape(WashRatingShape shape) {
  return switch (shape) {
    WashRatingShape.star => WashMaskShape.star,
    WashRatingShape.star2 => WashMaskShape.star2,
    WashRatingShape.heart => WashMaskShape.heart,
  };
}

/// daisyUI `rating` star row with mask shapes (interactive or read-only).
class WashRating extends StatelessWidget {
  const WashRating({
    required this.value,
    this.onChanged,
    this.max = 5,
    this.size = WashRatingSize.md,
    this.tone = WashProgressTone.primary,
    this.shape = WashRatingShape.star2,
    this.half = false,
    this.clearable = false,
    this.readOnly = false,
    this.itemTones,
    this.gap,
    this.semanticLabel,
    super.key,
  }) : assert(max > 0);

  /// Whole or half-step value in `[0, max]`.
  final num value;
  final ValueChanged<num>? onChanged;
  final int max;
  final WashRatingSize size;
  final WashProgressTone tone;
  final WashRatingShape shape;
  final bool half;
  final bool clearable;
  final bool readOnly;
  final List<WashProgressTone>? itemTones;
  final double? gap;
  final String? semanticLabel;

  static const _halfSteps = <double>[
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final itemSize = washRatingItemSize(size);
    final mask = _maskShape(shape);
    final spacing = gap ?? (shape == WashRatingShape.heart ? 4.0 : 2.0);
    final empty = tokens.palette.base300.withValues(alpha: 0.55);
    final interactive = !readOnly && onChanged != null;

    final children = <Widget>[];
    if (clearable && interactive) {
      children.add(
        _ClearTarget(
          size: itemSize,
          selected: value == 0,
          onClear: () => onChanged!(0),
        ),
      );
    }
    if (half && interactive) {
      for (var i = 0; i < _halfSteps.length; i++) {
        children.add(
          _HalfStepTarget(
            step: _halfSteps[i],
            firstHalf: i.isEven,
            size: itemSize,
            mask: mask,
            tone: tone,
            emptyColor: empty,
            filled: value >= _halfSteps[i],
            selected: value == _halfSteps[i],
            onSelect: () => onChanged!(_halfSteps[i]),
          ),
        );
      }
    } else {
      for (var n = 1; n <= max; n++) {
        final itemTone = itemTones != null && n <= itemTones!.length
            ? itemTones![n - 1]
            : tone;
        children.add(
          interactive
              ? _StarTarget(
                  index: n,
                  size: itemSize,
                  mask: mask,
                  tone: itemTone,
                  emptyColor: empty,
                  fill: _fillForStar(n, value),
                  onSelect: () => onChanged!(n),
                )
              : _RatingMaskItem(
                  dimension: itemSize,
                  mask: mask,
                  fill: _fillForStar(n, value),
                  tone: itemTone,
                  emptyColor: empty,
                  readOnly: readOnly,
                  current: n == value.round() && value == n,
                ),
        );
      }
    }

    final spaced = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0 && spacing > 0) spaced.add(SizedBox(width: spacing));
      spaced.add(children[i]);
    }

    return Semantics(
      label: semanticLabel ?? '$value of $max stars',
      container: true,
      child: Row(mainAxisSize: MainAxisSize.min, children: spaced),
    );
  }

  static double _fillForStar(int index, num value) {
    if (value >= index) return 1;
    if (value >= index - 0.5) return 0.5;
    return 0;
  }
}

class _ClearTarget extends StatelessWidget {
  const _ClearTarget({
    required this.size,
    required this.selected,
    required this.onClear,
  });

  final double size;
  final bool selected;
  final VoidCallback onClear;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Clear rating',
      button: true,
      selected: selected,
      child: SizedBox(
        width: 0,
        height: size,
        child: OverflowBox(
          maxWidth: 24,
          alignment: Alignment.centerLeft,
          child: WashRipple(
            onTap: onClear,
            borderRadius: 4,
            child: SizedBox(width: 24, height: size),
          ),
        ),
      ),
    );
  }
}

class _StarTarget extends StatelessWidget {
  const _StarTarget({
    required this.index,
    required this.size,
    required this.mask,
    required this.tone,
    required this.emptyColor,
    required this.fill,
    required this.onSelect,
  });

  final int index;
  final double size;
  final WashMaskShape mask;
  final WashProgressTone tone;
  final Color emptyColor;
  final double fill;
  final VoidCallback onSelect;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '$index star',
      button: true,
      child: WashRipple(
        onTap: onSelect,
        borderRadius: size / 4,
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: _RatingMaskItem(
            dimension: size,
            mask: mask,
            fill: fill,
            tone: tone,
            emptyColor: emptyColor,
            readOnly: false,
          ),
        ),
      ),
    );
  }
}

class _HalfStepTarget extends StatelessWidget {
  const _HalfStepTarget({
    required this.step,
    required this.firstHalf,
    required this.size,
    required this.mask,
    required this.tone,
    required this.emptyColor,
    required this.filled,
    required this.selected,
    required this.onSelect,
  });

  final double step;
  final bool firstHalf;
  final double size;
  final WashMaskShape mask;
  final WashProgressTone tone;
  final Color emptyColor;
  final bool filled;
  final bool selected;
  final VoidCallback onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fillColor = washProgressToneColor(tokens, tone);
    final half = firstHalf ? WashMaskHalf.first : WashMaskHalf.second;
    return Semantics(
      label: '$step star',
      button: true,
      selected: selected,
      child: WashRipple(
        onTap: onSelect,
        borderRadius: size / 4,
        child: MouseRegion(
          cursor: SystemMouseCursors.click,
          child: WashMask(
            shape: mask,
            dimension: size,
            half: half,
            color: filled ? fillColor : emptyColor,
          ),
        ),
      ),
    );
  }
}

class _RatingMaskItem extends StatelessWidget {
  const _RatingMaskItem({
    required this.dimension,
    required this.mask,
    required this.fill,
    required this.tone,
    required this.emptyColor,
    required this.readOnly,
    this.current = false,
  });

  final double dimension;
  final WashMaskShape mask;
  final double fill;
  final WashProgressTone tone;
  final Color emptyColor;
  final bool readOnly;
  final bool current;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fillColor = washProgressToneColor(tokens, tone);
    final star = SizedBox(
      width: dimension,
      height: dimension,
      child: Stack(
        fit: StackFit.expand,
        children: [
          WashMask(
            shape: mask,
            dimension: dimension,
            color: emptyColor,
          ),
          if (fill > 0)
            ClipRect(
              child: Align(
                alignment: Alignment.centerLeft,
                widthFactor: fill.clamp(0.0, 1.0),
                child: WashMask(
                  shape: mask,
                  dimension: dimension,
                  color: fillColor,
                ),
              ),
            ),
        ],
      ),
    );

    return Semantics(
      image: readOnly,
      selected: current,
      child: star,
    );
  }
}
