import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../app_bar/wash_screen_bar.dart';
import '../button/wash_button.dart';

export '../app_bar/wash_screen_bar.dart'
    show
        WashNavbarStart,
        WashNavbarCenter,
        WashNavbarEnd,
        WashScreenBar,
        WashScreenBarRow,
        WashScreenBarTitle,
        WashAvatarPlaceholder;

/// Semantic navbar background fills from the web color bars demo.
enum WashNavbarTone {
  surface,
  base200,
  base300,
  neutral,
  primary,
  secondary,
  accent,
}

/// daisyUI `navbar` shell with start / center / end slots.
class WashNavbar extends StatelessWidget {
  const WashNavbar({
    this.child,
    this.start,
    this.center,
    this.end,
    this.title,
    this.actions,
    this.tone = WashNavbarTone.surface,
    this.backgroundColor,
    this.foregroundColor,
    this.bordered = true,
    this.softBorder = false,
    this.rounded = true,
    this.dense = false,
    this.tall = false,
    super.key,
  });

  /// Raw child; when set, [start]/[center]/[end] and legacy [title] are ignored.
  final Widget? child;
  final Widget? start;
  final Widget? center;
  final Widget? end;

  /// Legacy convenience: brand title on the left.
  final String? title;
  final List<Widget>? actions;

  final WashNavbarTone tone;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final bool bordered;
  final bool softBorder;
  final bool rounded;
  final bool dense;
  final bool tall;

  (Color bg, Color fg) _colors(WashTokens tokens) {
    if (backgroundColor != null) {
      return (backgroundColor!, foregroundColor ?? tokens.onSurface);
    }
    return switch (tone) {
      WashNavbarTone.surface => (tokens.palette.base100, tokens.onSurface),
      WashNavbarTone.base200 => (tokens.palette.base200, tokens.onSurface),
      WashNavbarTone.base300 => (tokens.palette.base300, tokens.onSurface),
      WashNavbarTone.neutral => (
          tokens.palette.neutral,
          tokens.palette.neutralContent,
        ),
      WashNavbarTone.primary => (tokens.primary, tokens.onPrimary),
      WashNavbarTone.secondary => (
          tokens.palette.secondary,
          tokens.palette.secondaryContent,
        ),
      WashNavbarTone.accent => (
          tokens.palette.accent,
          tokens.palette.accentContent,
        ),
    };
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final (bg, fg) = _colors(tokens);
    final borderAlpha = softBorder ? 0.4 : 0.6;

    Widget body;
    if (child != null) {
      body = child!;
    } else if (start != null || center != null || end != null) {
      body = Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (start != null) start!,
          if (center != null) Flexible(fit: FlexFit.loose, child: center!),
          if (end != null) end!,
        ],
      );
    } else {
      body = WashScreenBarRow(
        title: Text(
          title ?? 'Navbar',
          style: WashTypography.body(fg).copyWith(
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        trailing: actions != null
            ? Row(mainAxisSize: MainAxisSize.min, children: actions!)
            : null,
      );
    }

    return DecoratedBox(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: rounded
            ? BorderRadius.circular(tokens.radiusBox)
            : BorderRadius.zero,
        border: bordered
            ? Border.all(color: tokens.inkBorder.withValues(alpha: borderAlpha))
            : null,
        boxShadow: rounded ? washPaperShadowSm(tokens) : null,
      ),
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: tall ? 64 : (dense ? 40 : 56)),
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: 8,
            vertical: tall ? 12 : (dense ? 0 : 4),
          ),
          child: DefaultTextStyle(
            style: WashTypography.title(fg).copyWith(
              fontSize: tall ? 20 : 18,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.3,
            ),
            child: IconTheme(
              data: IconThemeData(color: fg, size: 20),
              child: body,
            ),
          ),
        ),
      ),
    );
  }
}

/// Ghost brand control (`btn btn-ghost text-xl font-display`).
class WashNavbarBrand extends StatelessWidget {
  const WashNavbarBrand(
    this.label, {
    this.onPressed,
    this.large = true,
    super.key,
  });

  final String label;
  final VoidCallback? onPressed;
  final bool large;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final style = DefaultTextStyle.of(context).style;
    return WashButton(
      variant: WashButtonVariant.ghost,
      onPressed: onPressed ?? () {},
      child: Text(
        label,
        style: style.copyWith(
          fontSize: large ? 20 : 16,
          fontWeight: FontWeight.w600,
          letterSpacing: -0.3,
          color: style.color ?? tokens.onSurface,
        ),
      ),
    );
  }
}

/// Collapsible navbar for small screens (hamburger reveals a panel below).
class WashNavbarCollapse extends StatefulWidget {
  const WashNavbarCollapse({
    required this.barBuilder,
    required this.panel,
    this.breakpoint = 1024,
    this.backgroundColor,
    super.key,
  });

  final Widget Function(
    BuildContext context, {
    required bool open,
    required bool wide,
    required VoidCallback onToggle,
  }) barBuilder;
  final Widget panel;
  final double breakpoint;
  final Color? backgroundColor;

  @override
  State<WashNavbarCollapse> createState() => _WashNavbarCollapseState();
}

class _WashNavbarCollapseState extends State<WashNavbarCollapse> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final wide = MediaQuery.sizeOf(context).width >= widget.breakpoint;
    final bg = widget.backgroundColor ?? tokens.palette.base200;

    return DecoratedBox(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.all(8),
            child: widget.barBuilder(
              context,
              open: _open,
              wide: wide,
              onToggle: () => setState(() => _open = !_open),
            ),
          ),
          if (!wide && _open)
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
              child: widget.panel,
            ),
        ],
      ),
    );
  }
}
