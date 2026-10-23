import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `fieldset` grouping for related form controls.
class WashFieldset extends StatelessWidget {
  const WashFieldset({
    this.legend,
    required this.children,
    this.disabled = false,
    this.maxWidth,
    this.padding,
    this.backgroundColor,
    this.borderColor,
    this.borderWidth = 1,
    super.key,
  });

  final String? legend;
  final List<Widget> children;
  final bool disabled;
  final double? maxWidth;
  final EdgeInsetsGeometry? padding;
  final Color? backgroundColor;
  final Color? borderColor;
  final double borderWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final bg = backgroundColor;
    final border = borderColor ?? tokens.inkBorder;
    final pad = padding ??
        (bg != null || borderWidth > 0
            ? const EdgeInsets.all(16)
            : EdgeInsets.zero);

    Widget body = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (legend != null) ...[
          WashFieldsetLegend(legend!),
          const SizedBox(height: 8),
        ],
        ..._spaced(children),
      ],
    );

    if (disabled) {
      body = Opacity(opacity: 0.55, child: IgnorePointer(child: body));
    }

    body = Padding(padding: pad, child: body);

    if (bg != null || borderWidth > 0) {
      body = DecoratedBox(
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: borderWidth > 0
              ? Border.all(color: border, width: borderWidth)
              : null,
        ),
        child: body,
      );
    }

    if (maxWidth != null) {
      body = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth!),
        child: body,
      );
    }

    return body;
  }

  static List<Widget> _spaced(List<Widget> items) {
    if (items.isEmpty) return items;
    final out = <Widget>[items.first];
    for (var i = 1; i < items.length; i++) {
      out.add(const SizedBox(height: 8));
      out.add(items[i]);
    }
    return out;
  }
}

/// daisyUI `fieldset-legend`.
class WashFieldsetLegend extends StatelessWidget {
  const WashFieldsetLegend(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.label(tokens.onSurface).copyWith(
        fontWeight: FontWeight.w600,
        fontSize: 14,
      ),
    );
  }
}

/// daisyUI `label` helper line under controls.
class WashFieldsetHelper extends StatelessWidget {
  const WashFieldsetHelper(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.label(tokens.inkMuted).copyWith(fontSize: 13),
    );
  }
}

/// Field label (`label` class) with optional [htmlFor] semantics via [fieldId].
class WashFieldsetLabel extends StatelessWidget {
  const WashFieldsetLabel({
    required this.text,
    this.requiredMark = false,
    super.key,
  });

  final String text;
  final bool requiredMark;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(text,
            style:
                WashTypography.label(tokens.onSurface).copyWith(fontSize: 13)),
        if (requiredMark)
          const Padding(
            padding: EdgeInsets.only(left: 2),
            child: Text('*',
                style: TextStyle(
                    color: Color(0xFFEF4444), fontSize: 14, height: 1)),
          ),
      ],
    );
  }
}

/// Gallery / docs monospace class hint (matches FieldsetPage ClassLabel).
class WashFieldsetClassLabel extends StatelessWidget {
  const WashFieldsetClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text(
        value,
        style: const TextStyle(
            fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
      ),
    );
  }
}

/// Bordered wash panel preset from FieldsetPage section 02.
class WashFieldsetPanel extends StatelessWidget {
  const WashFieldsetPanel({
    required this.legend,
    required this.children,
    this.maxWidth = 448,
    super.key,
  });

  final String legend;
  final List<Widget> children;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashFieldset(
      legend: legend,
      maxWidth: maxWidth,
      backgroundColor: tokens.surfaceContainer,
      borderColor: tokens.palette.neutral.withValues(alpha: 0.25),
      children: children,
    );
  }
}

/// Ink-border fieldset preset (sections 03, 05, disabled).
class WashFieldsetInkPanel extends StatelessWidget {
  const WashFieldsetInkPanel({
    required this.legend,
    required this.children,
    this.maxWidth = 512,
    this.disabled = false,
    super.key,
  });

  final String legend;
  final List<Widget> children;
  final double maxWidth;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashFieldset(
      legend: legend,
      maxWidth: maxWidth,
      disabled: disabled,
      backgroundColor: tokens.surface.withValues(alpha: 0.8),
      borderColor: tokens.inkBorder,
      children: children,
    );
  }
}
