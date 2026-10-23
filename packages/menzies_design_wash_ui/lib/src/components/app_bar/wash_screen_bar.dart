import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `navbar` shell for screen-level app bars (distinct from [WashAppBar] shell chrome).
class WashScreenBar extends StatelessWidget {
  const WashScreenBar({
    required this.child,
    this.backgroundColor,
    this.foregroundColor,
    this.dense = false,
    this.tall = false,
    this.rounded = true,
    this.border = true,
    this.sticky = false,
    this.panelTint,
    super.key,
  });

  final Widget child;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final bool dense;
  final bool tall;
  final bool rounded;
  final bool border;
  final bool sticky;
  final Color? panelTint;

  double get _minHeight => tall ? 64 : (dense ? 40 : 56);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final bg = panelTint != null
        ? Color.alphaBlend(panelTint!.withValues(alpha: 0.08),
            backgroundColor ?? tokens.palette.base100)
        : (backgroundColor ?? tokens.palette.base100);
    final fg = foregroundColor ?? tokens.onSurface;

    Widget bar = DecoratedBox(
      decoration: BoxDecoration(
        color: bg.withValues(alpha: sticky ? 0.95 : 1),
        borderRadius: rounded && !sticky
            ? BorderRadius.circular(tokens.radiusBox)
            : (sticky
                ? const BorderRadius.vertical(top: Radius.zero)
                : BorderRadius.zero),
        border: border
            ? Border.all(
                color: tokens.inkBorder.withValues(alpha: sticky ? 0.5 : 0.6),
              )
            : null,
        boxShadow: rounded && !sticky ? washPaperShadowSm(tokens) : null,
      ),
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: _minHeight),
        child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: 8, vertical: tall ? 12 : (dense ? 0 : 4)),
          child: DefaultTextStyle(
            style: WashTypography.title(fg).copyWith(
              fontSize: tall ? 20 : 18,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.3,
            ),
            child: IconTheme(
              data: IconThemeData(color: fg, size: 20),
              child: child,
            ),
          ),
        ),
      ),
    );

    if (sticky) {
      bar = bar;
    }
    return bar;
  }
}

class WashScreenBarRow extends StatelessWidget {
  const WashScreenBarRow({
    this.start,
    this.center,
    this.end,
    this.leading,
    this.title,
    this.trailing,
    super.key,
  });

  final Widget? start;
  final Widget? center;
  final Widget? end;
  final Widget? leading;
  final Widget? title;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    if (start != null || center != null || end != null) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (start != null)
            Expanded(
                child: Align(alignment: Alignment.centerLeft, child: start!)),
          if (center != null) center!,
          if (end != null)
            Expanded(
                child: Align(alignment: Alignment.centerRight, child: end!)),
        ],
      );
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (leading != null) leading!,
        if (title != null)
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: title!,
            ),
          ),
        if (trailing != null)
          Flexible(
            fit: FlexFit.loose,
            child: FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerRight,
              child: trailing!,
            ),
          ),
      ],
    );
  }
}

class WashNavbarStart extends StatelessWidget {
  const WashNavbarStart({required this.child, this.gap = 4, super.key});
  final Widget child;
  final double gap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Align(
        alignment: Alignment.centerLeft,
        child: FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerLeft,
          child: _GapRow(gap: gap, children: _children(child)),
        ),
      ),
    );
  }

  static List<Widget> _children(Widget child) {
    if (child is Row) return child.children;
    return [child];
  }
}

class WashNavbarEnd extends StatelessWidget {
  const WashNavbarEnd({required this.child, this.gap = 4, super.key});
  final Widget child;
  final double gap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Align(
        alignment: Alignment.centerRight,
        child: FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerRight,
          child: _GapRow(gap: gap, children: _children(child)),
        ),
      ),
    );
  }

  static List<Widget> _children(Widget child) {
    if (child is Row) return child.children;
    return [child];
  }
}

class WashNavbarCenter extends StatelessWidget {
  const WashNavbarCenter({required this.child, super.key});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return child;
  }
}

class _GapRow extends StatelessWidget {
  const _GapRow({required this.children, required this.gap});
  final List<Widget> children;
  final double gap;

  @override
  Widget build(BuildContext context) {
    final out = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0) out.add(SizedBox(width: gap));
      out.add(children[i]);
    }
    return Row(mainAxisSize: MainAxisSize.min, children: out);
  }
}

class WashScreenBarTitle extends StatelessWidget {
  const WashScreenBarTitle(this.text, {this.subtitle, super.key});
  final String text;
  final String? subtitle;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    if (subtitle == null) {
      return Text(text);
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(text),
        Text(
          subtitle!,
          style: WashTypography.label(tokens.inkMuted),
        ),
      ],
    );
  }
}

class WashAvatarPlaceholder extends StatelessWidget {
  const WashAvatarPlaceholder(this.initials, {this.size = 36, super.key});
  final String initials;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: tokens.palette.secondary.withValues(alpha: 0.85),
        shape: BoxShape.circle,
      ),
      child: Text(
        initials,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 13,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
