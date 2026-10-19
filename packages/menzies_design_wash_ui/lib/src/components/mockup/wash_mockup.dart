import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Line tone for [WashMockupCode] rows (`text-warning`, `text-success`, highlight).
enum WashMockupCodeTone { none, warning, success, highlight }

/// One `pre` row inside daisyUI `mockup-code`.
class WashMockupCodeLine {
  const WashMockupCodeLine(
    this.code, {
    this.prefix,
    this.tone = WashMockupCodeTone.none,
  });

  final String code;
  final String? prefix;
  final WashMockupCodeTone tone;
}

/// Traffic-light dots used by browser / window / code chrome.
class _MockupTrafficLights extends StatelessWidget {
  const _MockupTrafficLights({this.color});

  final Color? color;

  @override
  Widget build(BuildContext context) {
    final c = (color ?? WashTokens.of(context).onSurface).withValues(alpha: 0.3);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < 3; i++) ...[
          if (i > 0) const SizedBox(width: 8),
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(color: c, shape: BoxShape.circle),
          ),
        ],
      ],
    );
  }
}

/// daisyUI `mockup-browser` with toolbar address bar and content pane.
class WashMockupBrowser extends StatelessWidget {
  const WashMockupBrowser({
    required this.url,
    required this.child,
    this.tinted = false,
    this.bordered = true,
    super.key,
  });

  final String url;
  final Widget child;
  final bool tinted;
  final bool bordered;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final border = tokens.palette.base300;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: tinted ? tokens.palette.base100 : null,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: bordered ? Border.all(color: border) : null,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
            child: Row(
              children: [
                const _MockupTrafficLights(),
                const SizedBox(width: 16),
                Expanded(
                  child: Container(
                    height: 32,
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      color: tokens.palette.base200,
                      borderRadius: BorderRadius.circular(tokens.radiusField),
                    ),
                    child: Row(
                      children: [
                        WashLucideIcon(
                          'search',
                          size: 14,
                          strokeWidth: 2,
                          color: tokens.onSurface.withValues(alpha: 0.5),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            url,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: WashTypography.body(tokens.onSurface).copyWith(
                              fontSize: 12,
                              fontFamily: 'monospace',
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          child,
        ],
      ),
    );
  }
}

/// daisyUI `mockup-code` terminal / editor chrome.
class WashMockupCode extends StatelessWidget {
  const WashMockupCode({
    required this.lines,
    this.background,
    this.foreground,
    this.scrollHorizontal = true,
    super.key,
  });

  final List<WashMockupCodeLine> lines;
  final Color? background;
  final Color? foreground;
  final bool scrollHorizontal;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final bg = background ?? tokens.palette.neutral;
    final fg = foreground ?? tokens.palette.neutralContent;

    final linesColumn = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final line in lines) _CodeLine(line: line, defaultFg: fg),
      ],
    );

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 20),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 20, bottom: 16),
            child: _MockupTrafficLights(color: fg),
          ),
          if (scrollHorizontal)
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: linesColumn,
            )
          else
            linesColumn,
        ],
      ),
    );
  }
}

class _CodeLine extends StatelessWidget {
  const _CodeLine({required this.line, required this.defaultFg});

  final WashMockupCodeLine line;
  final Color defaultFg;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    Color fg = defaultFg;
    Color? bg;
    switch (line.tone) {
      case WashMockupCodeTone.warning:
        fg = tokens.palette.warning;
      case WashMockupCodeTone.success:
        fg = tokens.palette.success;
      case WashMockupCodeTone.highlight:
        bg = tokens.palette.warning;
        fg = tokens.palette.warningContent;
      case WashMockupCodeTone.none:
        break;
    }

    return ColoredBox(
      color: bg ?? const Color(0x00000000),
      child: Padding(
        padding: const EdgeInsets.only(right: 20),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 32,
              child: line.prefix == null
                  ? const SizedBox.shrink()
                  : Text(
                      line.prefix!,
                      textAlign: TextAlign.right,
                      style: TextStyle(
                        color: fg.withValues(alpha: 0.5),
                        fontSize: 14,
                        fontFamily: 'monospace',
                        height: 1.5,
                      ),
                    ),
            ),
            const SizedBox(width: 16),
            Text(
              line.code,
              style: TextStyle(
                color: fg,
                fontSize: 14,
                fontFamily: 'monospace',
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// daisyUI `mockup-phone` with camera notch and display.
class WashMockupPhone extends StatelessWidget {
  const WashMockupPhone({
    required this.child,
    this.borderColor,
    this.width = 280,
    super.key,
  });

  final Widget child;
  final Color? borderColor;
  final double width;

  @override
  Widget build(BuildContext context) {
    final border = borderColor ?? const Color(0xFF6B6B6B);
    final height = width * (978 / 462);

    return SizedBox(
      width: width,
      height: height,
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: const Color(0xFF000000),
          borderRadius: BorderRadius.circular(65),
          border: Border.all(color: border, width: 5),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(54),
          child: Stack(
            fit: StackFit.expand,
            children: [
              child,
              Align(
                alignment: Alignment.topCenter,
                child: Container(
                  margin: EdgeInsets.only(top: height * 0.03),
                  width: width * 0.28,
                  height: height * 0.037,
                  decoration: BoxDecoration(
                    color: const Color(0xFF000000),
                    borderRadius: BorderRadius.circular(17),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Full-bleed image for [WashMockupPhone] display (covers offline with wash).
class WashMockupPhoneImage extends StatelessWidget {
  const WashMockupPhoneImage({
    required this.url,
    required this.semanticLabel,
    super.key,
  });

  final String url;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Image.network(
      url,
      fit: BoxFit.cover,
      width: double.infinity,
      height: double.infinity,
      semanticLabel: semanticLabel,
      errorBuilder: (_, __, ___) => DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              tokens.palette.primary.withValues(alpha: 0.35),
              tokens.palette.base200,
              tokens.palette.accent.withValues(alpha: 0.4),
            ],
          ),
        ),
      ),
      loadingBuilder: (context, child, progress) {
        if (progress == null) return child;
        return ColoredBox(color: tokens.palette.base200);
      },
    );
  }
}

/// daisyUI `mockup-window` OS chrome.
class WashMockupWindow extends StatelessWidget {
  const WashMockupWindow({
    required this.child,
    this.tinted = false,
    this.bordered = true,
    super.key,
  });

  final Widget child;
  final bool tinted;
  final bool bordered;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: tinted ? tokens.palette.base100 : null,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: bordered
            ? Border.all(color: tokens.palette.base300)
            : null,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 20, 20, 16),
            child: Align(
              alignment: Alignment.centerLeft,
              child: _MockupTrafficLights(),
            ),
          ),
          child,
        ],
      ),
    );
  }
}
