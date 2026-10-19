import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI semantic link tones (`link-primary`, `link-neutral`, …).
enum WashLinkTone {
  inherit,
  neutral,
  primary,
  secondary,
  accent,
  success,
  info,
  warning,
  error,
}

/// Gallery monospace class hint (LinksPage ClassLabel).
class WashLinkClassLabel extends StatelessWidget {
  const WashLinkClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value.isEmpty ? 'link' : value,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}

String washLinkClassLabel({
  WashLinkTone tone = WashLinkTone.inherit,
  bool hoverUnderline = false,
}) {
  final parts = <String>['link'];
  if (hoverUnderline) parts.add('link-hover');
  switch (tone) {
    case WashLinkTone.inherit:
      break;
    case WashLinkTone.neutral:
      parts.add('link-neutral');
    case WashLinkTone.primary:
      parts.add('link-primary');
    case WashLinkTone.secondary:
      parts.add('link-secondary');
    case WashLinkTone.accent:
      parts.add('link-accent');
    case WashLinkTone.success:
      parts.add('link-success');
    case WashLinkTone.info:
      parts.add('link-info');
    case WashLinkTone.warning:
      parts.add('link-warning');
    case WashLinkTone.error:
      parts.add('link-error');
  }
  return parts.join(' ');
}

/// Resolves daisyUI `link-*` foreground color.
Color washLinkToneColor(WashTokens tokens, WashLinkTone tone) {
  final p = tokens.palette;
  switch (tone) {
    case WashLinkTone.inherit:
      return tokens.onSurface;
    case WashLinkTone.neutral:
      return p.neutral;
    case WashLinkTone.primary:
      return p.primary;
    case WashLinkTone.secondary:
      return p.secondary;
    case WashLinkTone.accent:
      return p.accent;
    case WashLinkTone.success:
      return p.success;
    case WashLinkTone.info:
      return p.info;
    case WashLinkTone.warning:
      return p.warning;
    case WashLinkTone.error:
      return p.error;
  }
}

/// daisyUI hover darken: `color-mix(in oklab, color 80%, #000)`.
Color washLinkHoverColor(Color color) =>
    Color.lerp(color, const Color(0xFF000000), 0.2)!;

/// daisyUI `link` on anchors and plain buttons (`cursor-pointer`, underline rules).
class WashLink extends StatefulWidget {
  const WashLink({
    this.label,
    this.child,
    this.onTap,
    this.tone = WashLinkTone.inherit,
    this.hoverUnderline = false,
    this.semanticsLabel,
    super.key,
  }) : assert(label != null || child != null);

  final String? label;
  final Widget? child;
  final VoidCallback? onTap;
  final WashLinkTone tone;

  /// When true, matches `link-hover` (underline only while hovered/focused).
  final bool hoverUnderline;
  final String? semanticsLabel;

  @override
  State<WashLink> createState() => _WashLinkState();
}

class _WashLinkState extends State<WashLink> {
  bool _hovered = false;
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final base = washLinkToneColor(tokens, widget.tone);
    final active = _hovered || _focused;
    final color = active && widget.tone != WashLinkTone.inherit
        ? washLinkHoverColor(base)
        : base;
    final showUnderline = widget.hoverUnderline ? active : true;
    final style = WashTypography.body(color).copyWith(
      fontSize: 14,
      height: 1.4,
      decoration: showUnderline ? TextDecoration.underline : TextDecoration.none,
      decorationColor: color,
      decorationThickness: 1,
    );

    Widget content;
    if (widget.child != null) {
      content = DefaultTextStyle.merge(
        style: style,
        child: IconTheme.merge(
          data: IconThemeData(color: color, size: 16),
          child: widget.child!,
        ),
      );
    } else {
      content = Text(widget.label!, style: style);
    }

    return Semantics(
      link: true,
      label: widget.semanticsLabel ?? widget.label,
      button: widget.onTap != null,
      child: FocusableActionDetector(
        mouseCursor: SystemMouseCursors.click,
        onShowHoverHighlight: (v) => setState(() => _hovered = v),
        onShowFocusHighlight: (v) => setState(() => _focused = v),
        actions: <Type, Action<Intent>>{
          ActivateIntent: CallbackAction<ActivateIntent>(
            onInvoke: (_) {
              widget.onTap?.call();
              return null;
            },
          ),
        },
        child: GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: widget.onTap,
          child: content,
        ),
      ),
    );
  }
}

/// `button.link` without btn chrome (transparent, zero padding).
class WashLinkButton extends StatelessWidget {
  const WashLinkButton({
    required this.label,
    this.onTap,
    this.tone = WashLinkTone.secondary,
    this.hoverUnderline = false,
    this.child,
    super.key,
  });

  final String label;
  final VoidCallback? onTap;
  final WashLinkTone tone;
  final bool hoverUnderline;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return WashLink(
      label: child == null ? label : null,
      onTap: onTap,
      tone: tone,
      hoverUnderline: hoverUnderline,
      semanticsLabel: label,
      child: child,
    );
  }
}
