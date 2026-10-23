import 'package:flutter/widgets.dart';

import '../../components/avatar/wash_avatar.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashChatPlacement { start, end }

enum WashChatBubbleTone {
  defaultTone,
  primary,
  secondary,
  accent,
  neutral,
  info,
  success,
  warning,
  error,
}

/// daisyUI `chat-bubble` surface.
class WashChatBubble extends StatelessWidget {
  const WashChatBubble({
    required this.message,
    this.tone = WashChatBubbleTone.defaultTone,
    this.textStyle,
    super.key,
  });

  final String message;
  final WashChatBubbleTone tone;
  final TextStyle? textStyle;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final (bg, fg) = _colors(tokens, tone);
    final style = textStyle ?? WashTypography.body(fg);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(tokens.radiusField),
      ),
      child: Text(message, style: style.copyWith(color: fg)),
    );
  }

  static (Color, Color) _colors(WashTokens tokens, WashChatBubbleTone tone) {
    final p = tokens.palette;
    return switch (tone) {
      WashChatBubbleTone.primary => (p.primary, p.primaryContent),
      WashChatBubbleTone.secondary => (p.secondary, p.secondaryContent),
      WashChatBubbleTone.accent => (p.accent, p.accentContent),
      WashChatBubbleTone.neutral => (p.neutral, p.neutralContent),
      WashChatBubbleTone.info => (p.info, p.infoContent),
      WashChatBubbleTone.success => (p.success, p.successContent),
      WashChatBubbleTone.warning => (p.warning, p.warningContent),
      WashChatBubbleTone.error => (p.error, p.errorContent),
      WashChatBubbleTone.defaultTone => (
          tokens.surfaceContainerHigh,
          tokens.onSurface,
        ),
    };
  }
}

/// Full `chat` row: optional avatar, header, bubble, footer.
class WashChatLine extends StatelessWidget {
  const WashChatLine({
    required this.placement,
    required this.message,
    this.bubbleTone = WashChatBubbleTone.defaultTone,
    this.avatarImageId,
    this.avatarSize = 40,
    this.avatarAlt,
    this.header,
    this.time,
    this.footer,
    this.bubbleTextStyle,
    this.headerTextStyle,
    this.footerTextStyle,
    super.key,
  });

  final WashChatPlacement placement;
  final String message;
  final WashChatBubbleTone bubbleTone;
  final int? avatarImageId;
  final double avatarSize;
  final String? avatarAlt;
  final String? header;
  final String? time;
  final String? footer;
  final TextStyle? bubbleTextStyle;
  final TextStyle? headerTextStyle;
  final TextStyle? footerTextStyle;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final align = placement == WashChatPlacement.start
        ? CrossAxisAlignment.start
        : CrossAxisAlignment.end;

    final headerStyle =
        headerTextStyle ?? WashTypography.body(tokens.onSurface);
    final footerStyle = footerTextStyle ??
        WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 12,
          color: tokens.onSurface.withValues(alpha: 0.5),
        );

    final children = <Widget>[];

    if (avatarImageId != null) {
      children.add(
        WashAvatar(
          imageId: avatarImageId,
          imageAlt: avatarAlt,
          size: _avatarSizeEnum(avatarSize),
          radius: WashAvatarRadius.circle,
        ),
      );
    }

    if (header != null || time != null) {
      children.add(
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 8,
          children: [
            if (header != null) Text(header!, style: headerStyle),
            if (time != null)
              Text(
                time!,
                style: headerStyle.copyWith(
                  fontSize: 12,
                  color: tokens.onSurface.withValues(alpha: 0.5),
                ),
              ),
          ],
        ),
      );
    }

    children.add(
      WashChatBubble(
        message: message,
        tone: bubbleTone,
        textStyle: bubbleTextStyle,
      ),
    );

    if (footer != null) {
      children.add(Text(footer!, style: footerStyle));
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Column(
        crossAxisAlignment: align,
        children: children,
      ),
    );
  }

  WashAvatarSize _avatarSizeEnum(double px) {
    if (px <= 32) return WashAvatarSize.sm;
    if (px >= 56) return WashAvatarSize.xl;
    return WashAvatarSize.md;
  }
}

/// Legacy preview: two bubbles without full chat chrome.
class WashChatLegacyPreview extends StatelessWidget {
  const WashChatLegacyPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: const [
        WashChatLine(
          placement: WashChatPlacement.start,
          message: 'Hello',
        ),
        WashChatLine(
          placement: WashChatPlacement.end,
          message: 'Hi',
          bubbleTone: WashChatBubbleTone.primary,
        ),
      ],
    );
  }
}
