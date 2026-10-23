import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `steps-horizontal` / `steps-vertical`.
enum WashStepsDirection { horizontal, vertical }

/// daisyUI `step-*` semantic colors. [none] is the uncolored default `step`.
enum WashStepTone {
  none,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

/// One `li.step` in a [WashSteps] trail.
class WashStepItem {
  const WashStepItem({
    required this.label,
    this.tone = WashStepTone.none,
    this.dataContent,
    this.icon,
    this.iconWidget,
    this.onTap,
    this.current = false,
  });

  final String label;
  final WashStepTone tone;

  /// daisyUI `data-content` (replaces the numbered counter).
  final String? dataContent;

  /// Lucide kebab-case name rendered in `step-icon`.
  final String? icon;

  /// Custom `step-icon` child when [icon] is null.
  final Widget? iconWidget;

  final VoidCallback? onTap;
  final bool current;

  bool get hasIcon => icon != null || iconWidget != null;
}

Color washStepToneFill(WashTokens tokens, WashStepTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashStepTone.none => p.base300,
    WashStepTone.neutral => p.neutral,
    WashStepTone.primary => p.primary,
    WashStepTone.secondary => p.secondary,
    WashStepTone.accent => p.accent,
    WashStepTone.info => p.info,
    WashStepTone.success => p.success,
    WashStepTone.warning => p.warning,
    WashStepTone.error => p.error,
  };
}

Color washStepToneContent(WashTokens tokens, WashStepTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashStepTone.none => p.baseContent,
    WashStepTone.neutral => p.neutralContent,
    WashStepTone.primary => p.primaryContent,
    WashStepTone.secondary => p.secondaryContent,
    WashStepTone.accent => p.accentContent,
    WashStepTone.info => p.infoContent,
    WashStepTone.success => p.successContent,
    WashStepTone.warning => p.warningContent,
    WashStepTone.error => p.errorContent,
  };
}

String washStepsClassLabel({
  WashStepsDirection direction = WashStepsDirection.horizontal,
}) {
  if (direction == WashStepsDirection.vertical) {
    return 'steps steps-vertical';
  }
  return 'steps';
}

String washStepClassLabel(
  WashStepTone tone, {
  String? dataContent,
  bool icon = false,
}) {
  final parts = <String>['step'];
  if (tone != WashStepTone.none) {
    parts.add('step-${tone.name}');
  }
  if (icon) {
    parts.add('step-icon');
  } else if (dataContent != null) {
    parts.add('data-content="$dataContent"');
  }
  return parts.join(' ');
}

/// daisyUI `steps` process trail: numbered or icon bubbles plus connectors.
class WashSteps extends StatelessWidget {
  const WashSteps({
    required this.steps,
    this.direction = WashStepsDirection.horizontal,
    this.expand = true,
    this.semanticLabel,
    super.key,
  });

  final List<WashStepItem> steps;
  final WashStepsDirection direction;

  /// Stretch like `w-full` (equal columns / full-width vertical labels).
  final bool expand;
  final String? semanticLabel;

  static const double bubble = 32;
  static const double markerSlot = 40;
  static const double connector = 8;
  static const double minStep = 64;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final child = direction == WashStepsDirection.vertical
        ? _vertical(context, tokens)
        : _horizontal(context, tokens);
    return Semantics(
      container: true,
      label: semanticLabel,
      child: child,
    );
  }

  Color _connectorColor(WashTokens tokens, int index) {
    if (index <= 0 || index >= steps.length) {
      return tokens.palette.base300;
    }
    final prev = steps[index - 1].tone;
    final cur = steps[index].tone;
    if (prev != WashStepTone.none && prev == cur) {
      return washStepToneFill(tokens, cur);
    }
    return tokens.palette.base300;
  }

  Widget _horizontal(BuildContext context, WashTokens tokens) {
    final cells = <Widget>[
      for (var i = 0; i < steps.length; i++)
        _StepCell(
          item: steps[i],
          index: i,
          direction: WashStepsDirection.horizontal,
          incoming: i > 0 ? _connectorColor(tokens, i) : null,
          outgoing:
              i < steps.length - 1 ? _connectorColor(tokens, i + 1) : null,
        ),
    ];
    if (expand) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final cell in cells) Expanded(child: cell),
        ],
      );
    }
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final cell in cells)
          ConstrainedBox(
            constraints: const BoxConstraints(minWidth: minStep),
            child: cell,
          ),
      ],
    );
  }

  Widget _vertical(BuildContext context, WashTokens tokens) {
    final column = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < steps.length; i++) ...[
          if (i > 0)
            Padding(
              padding: const EdgeInsets.only(left: 16),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  width: WashSteps.connector,
                  height: 24,
                  color: _connectorColor(tokens, i),
                ),
              ),
            ),
          _StepCell(
            item: steps[i],
            index: i,
            direction: WashStepsDirection.vertical,
            expandLabel: expand,
            incoming: null,
            outgoing: null,
          ),
        ],
      ],
    );
    if (expand) return column;
    return IntrinsicWidth(child: column);
  }
}

class _StepCell extends StatelessWidget {
  const _StepCell({
    required this.item,
    required this.index,
    required this.direction,
    this.expandLabel = true,
    this.incoming,
    this.outgoing,
  });

  final WashStepItem item;
  final int index;
  final WashStepsDirection direction;
  final bool expandLabel;
  final Color? incoming;
  final Color? outgoing;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = washStepToneFill(tokens, item.tone);
    final fg = washStepToneContent(tokens, item.tone);
    final bubble = _bubble(fill, fg);
    final label = Text(
      item.label,
      textAlign: direction == WashStepsDirection.horizontal
          ? TextAlign.center
          : TextAlign.start,
      style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
    );

    final Widget body;
    if (direction == WashStepsDirection.horizontal) {
      body = Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: WashSteps.markerSlot,
            width: double.infinity,
            child: _markerTrack(bubble: bubble),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: label,
          ),
        ],
      );
    } else {
      body = Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: WashSteps.markerSlot,
            height: WashSteps.markerSlot,
            child: Center(child: bubble),
          ),
          const SizedBox(width: 8),
          if (expandLabel) Expanded(child: label) else label,
        ],
      );
    }

    Widget wrapped = body;
    if (item.onTap != null) {
      wrapped = MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: item.onTap,
          behavior: HitTestBehavior.opaque,
          child: body,
        ),
      );
    }

    return Semantics(
      button: item.onTap != null,
      selected: item.current,
      label: item.label,
      child: wrapped,
    );
  }

  Widget _markerTrack({required Widget bubble}) {
    return Stack(
      alignment: Alignment.center,
      children: [
        if (incoming != null)
          Align(
            alignment: Alignment.centerLeft,
            child: FractionallySizedBox(
              widthFactor: 0.5,
              child: Container(height: WashSteps.connector, color: incoming),
            ),
          ),
        if (outgoing != null)
          Align(
            alignment: Alignment.centerRight,
            child: FractionallySizedBox(
              widthFactor: 0.5,
              child: Container(height: WashSteps.connector, color: outgoing),
            ),
          ),
        bubble,
      ],
    );
  }

  Widget _bubble(Color fill, Color fg) {
    Widget inner;
    if (item.iconWidget != null) {
      inner = IconTheme.merge(
        data: IconThemeData(color: fg, size: 16),
        child: item.iconWidget!,
      );
    } else if (item.icon != null) {
      inner = WashLucideIcon(
        item.icon!,
        size: 16,
        color: fg,
        strokeWidth: 2,
      );
    } else {
      inner = Text(
        item.dataContent ?? '${index + 1}',
        style: WashTypography.label(fg).copyWith(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          height: 1,
        ),
      );
    }

    return Container(
      width: WashSteps.bubble,
      height: WashSteps.bubble,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: fill,
        shape: BoxShape.circle,
        border: Border.all(color: fill),
      ),
      child: inner,
    );
  }
}
