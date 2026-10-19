import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_aspect_ratio.dart';

/// Semantic footer background (daisyUI `bg-base-*`, `bg-neutral`, etc.).
enum WashFooterTone {
  base200,
  base300,
  base100,
  neutral,
  primary,
  secondary,
  accent,
}

/// daisyUI `footer` bar with optional responsive horizontal layout.
class WashFooter extends StatelessWidget {
  const WashFooter({
    required this.children,
    this.tone = WashFooterTone.base200,
    this.padding = const EdgeInsets.all(24),
    this.center = false,
    this.horizontalFromSm = false,
    this.multiColumnGrid = false,
    this.border,
    this.alignItemsCenter = false,
    super.key,
  });

  final List<Widget> children;
  final WashFooterTone tone;
  final EdgeInsets padding;
  final bool center;
  final bool horizontalFromSm;
  final bool multiColumnGrid;
  final BoxBorder? border;
  final bool alignItemsCenter;

  static const _washBlue = Color(0xFF4A7FA8);

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final (bg, fg) = _colors(tokens, tone);
    final radius = BorderRadius.circular(tokens.radiusBox);

    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final horizontal = horizontalFromSm && width >= WashTailwindBreakpoints.sm;

        Widget body;
        if (multiColumnGrid && horizontal) {
          body = Wrap(
            spacing: 24,
            runSpacing: 16,
            alignment: center ? WrapAlignment.center : WrapAlignment.start,
            children: children,
          );
        } else if (horizontal) {
          body = Row(
            crossAxisAlignment:
                alignItemsCenter ? CrossAxisAlignment.center : CrossAxisAlignment.start,
            mainAxisAlignment: center ? MainAxisAlignment.center : MainAxisAlignment.start,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) const SizedBox(width: 24),
                Flexible(child: children[i]),
              ],
            ],
          );
        } else {
          body = Column(
            crossAxisAlignment:
                center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) const SizedBox(height: 16),
                children[i],
              ],
            ],
          );
        }

        return DecoratedBox(
          decoration: BoxDecoration(
            color: bg,
            borderRadius: radius,
            border: border,
          ),
          child: DefaultTextStyle(
            style: WashTypography.body(fg).copyWith(fontSize: 14),
            child: IconTheme(
              data: IconThemeData(color: fg, size: 20),
              child: Padding(padding: padding, child: body),
            ),
          ),
        );
      },
    );
  }

  static (Color bg, Color fg) _colors(WashTokens tokens, WashFooterTone tone) {
    final p = tokens.palette;
    return switch (tone) {
      WashFooterTone.base200 => (p.base200, p.baseContent),
      WashFooterTone.base300 => (p.base300, p.baseContent),
      WashFooterTone.base100 => (p.base100, p.baseContent),
      WashFooterTone.neutral => (p.neutral, p.neutralContent),
      WashFooterTone.primary => (p.primary, p.primaryContent),
      WashFooterTone.secondary => (p.secondary, p.secondaryContent),
      WashFooterTone.accent => (p.accent, p.accentContent),
    };
  }

  static Color washBlueMark(WashTokens tokens) =>
      _washBlue.withValues(alpha: 0.5);
}

/// `footer-title` column with optional heading.
class WashFooterNav extends StatelessWidget {
  const WashFooterNav({
    this.title,
    required this.children,
    this.inlineLinks = false,
    this.center = false,
    super.key,
  });

  final String? title;
  final List<Widget> children;
  final bool inlineLinks;
  final bool center;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fg = DefaultTextStyle.of(context).style.color ?? tokens.onSurface;

    Widget links;
    if (inlineLinks) {
      links = Wrap(
        spacing: 16,
        runSpacing: 8,
        alignment: center ? WrapAlignment.center : WrapAlignment.start,
        children: children,
      );
    } else {
      links = Column(
        crossAxisAlignment:
            center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) const SizedBox(height: 4),
            children[i],
          ],
        ],
      );
    }

    return Column(
      crossAxisAlignment:
          center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (title != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(
              title!,
              style: WashTypography.title(fg).copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        links,
      ],
    );
  }
}

/// `link link-hover` inside a footer.
class WashFooterLink extends StatelessWidget {
  const WashFooterLink(this.label, {this.onTap, super.key});

  final String label;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fg = DefaultTextStyle.of(context).style.color ?? tokens.onSurface;
    return WashRipple(
      onTap: onTap ?? () {},
      child: Text(
        label,
        style: WashTypography.body(fg).copyWith(
          fontSize: 14,
          decoration: TextDecoration.underline,
          decorationColor: fg.withValues(alpha: 0.35),
        ),
      ),
    );
  }
}

/// Brand / copyright `aside` block inside a footer.
class WashFooterAside extends StatelessWidget {
  const WashFooterAside({
    required this.child,
    this.horizontal = false,
    this.center = false,
    super.key,
  });

  final Widget child;
  final bool horizontal;
  final bool center;

  @override
  Widget build(BuildContext context) {
    if (!horizontal) {
      return Column(
        crossAxisAlignment:
            center ? CrossAxisAlignment.center : CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [child],
      );
    }
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: center ? MainAxisAlignment.center : MainAxisAlignment.start,
      children: [
        Flexible(child: child),
      ],
    );
  }
}

/// Icon action in a footer nav row.
class WashFooterIconLink extends StatelessWidget {
  const WashFooterIconLink({
    required this.child,
    this.onTap,
    this.semanticsLabel,
    super.key,
  });

  final Widget child;
  final VoidCallback? onTap;
  final String? semanticsLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: semanticsLabel,
      child: WashRipple(
        onTap: onTap ?? () {},
        child: child,
      ),
    );
  }
}
