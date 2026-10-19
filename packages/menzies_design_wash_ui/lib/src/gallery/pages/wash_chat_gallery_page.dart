import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/chat/wash_chat.dart';
import '../../components/input/wash_editable.dart';
import '../../foundation/breakpoints.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashChatGalleryPage extends StatelessWidget {
  const WashChatGalleryPage({super.key});

  static const _bubbleColors = <(String, WashChatBubbleTone, String)>[
    ('Primary', WashChatBubbleTone.primary, 'Primary wash note'),
    ('Secondary', WashChatBubbleTone.secondary, 'Secondary wash note'),
    ('Accent', WashChatBubbleTone.accent, 'Accent wash note'),
    ('Neutral', WashChatBubbleTone.neutral, 'Neutral wash note'),
    ('Info', WashChatBubbleTone.info, 'Info wash note'),
    ('Success', WashChatBubbleTone.success, 'Success wash note'),
    ('Warning', WashChatBubbleTone.warning, 'Warning wash note'),
    ('Error', WashChatBubbleTone.error, 'Error wash note'),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Chat bubble',
      description: 'daisyUI chat placement, colors, and chrome.',
      sections: [
        _s('01 · Start / end', 'Conversation sides', 'chat-start aligns left; chat-end aligns right', _sides(), _sidesDart),
        _s('02 · Colors', 'Bubble colors', 'Every chat-bubble-* semantic color with class labels', _colors(), _colorsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Chrome', 'Avatar, header, footer, time', 'Full chat line: image avatar, name header', _chrome(), _chromeDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Density', 'Avatar and text scale', 'daisyUI chat has no size modifiers', _density(), _densityDart),
        _s('05 · Studio critique', 'Critique thread', 'A short watercolor-studio conversation', const _StudioCritiqueThread(), _critiqueDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Responsive', 'Narrow and wide layouts', 'Stack threads full width on mobile; split side-by-side from lg up', _responsive(context), _responsiveDart, tint: WashGalleryPanelTint.rose),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        child,
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontFamily: 'monospace', fontSize: 10.4)),
      ],
    );
  }

  static Widget _sides() {
    return _sample(
      'chat chat-start | chat chat-end',
      Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: const [
          WashChatLine(
            placement: WashChatPlacement.start,
            message: 'Soften the wash edge before it dries.',
          ),
          WashChatLine(
            placement: WashChatPlacement.end,
            message: 'Lifting now with a clean brush.',
          ),
        ],
      ),
    );
  }

  static Widget _colors() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final twoCol = constraints.maxWidth >= 640;
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: List.generate(_bubbleColors.length, (index) {
            final (name, tone, sample) = _bubbleColors[index];
            final placement =
                index.isEven ? WashChatPlacement.start : WashChatPlacement.end;
            return SizedBox(
              width: twoCol ? (constraints.maxWidth - 16) / 2 : constraints.maxWidth,
              child: _sample(
                'chat-bubble chat-bubble-${name.toLowerCase()}',
                WashChatLine(placement: placement, message: sample, bubbleTone: tone),
              ),
            );
          }),
        );
      },
    );
  }

  static Widget _chrome() {
    return _sample(
      'chat-image avatar + chat-header + chat-bubble + chat-footer',
      Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: const [
          WashChatLine(
            placement: WashChatPlacement.start,
            avatarImageId: 64,
            avatarAlt: 'Mentor artist portrait',
            header: 'Maya Chen',
            time: '12:45',
            message: 'Leave a dry edge where the paper should sparkle.',
            footer: 'Delivered',
          ),
          WashChatLine(
            placement: WashChatPlacement.end,
            avatarImageId: 91,
            avatarAlt: 'Student artist portrait',
            header: 'You',
            time: '12:46',
            message: 'Noted. Masking that highlight now.',
            bubbleTone: WashChatBubbleTone.primary,
            footer: 'Seen at 12:46',
          ),
        ],
      ),
    );
  }

  static Widget _density() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final threeCol = constraints.maxWidth >= 1024;
        final children = [
          _densityColumn(
            'avatar w-8 + text-sm',
            32,
            const TextStyle(fontSize: 12),
            const TextStyle(fontSize: 14),
            'Compact',
            '10:01',
            'Compact density.',
            'Seen',
            65,
            'Compact mentor portrait',
          ),
          _densityColumn(
            'avatar w-10 (default)',
            40,
            null,
            null,
            'Default',
            '10:02',
            'Default density.',
            'Seen',
            177,
            'Default mentor portrait',
          ),
          _densityColumn(
            'avatar w-14 + text-base',
            56,
            const TextStyle(fontSize: 16),
            const TextStyle(fontSize: 16),
            'Large',
            '10:03',
            'Larger density.',
            'Seen',
            239,
            'Large mentor portrait',
          ),
        ];
        if (threeCol) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: children
                .map((c) => Expanded(child: Padding(padding: const EdgeInsets.only(right: 12), child: c)))
                .toList(),
          );
        }
        return Column(children: children);
      },
    );
  }

  static Widget _densityColumn(
    String label,
    double avatarPx,
    TextStyle? headerStyle,
    TextStyle? bubbleStyle,
    String header,
    String time,
    String message,
    String footer,
    int imageId,
    String alt,
  ) {
    return _sample(
      label,
      WashChatLine(
        placement: WashChatPlacement.start,
        avatarImageId: imageId,
        avatarAlt: alt,
        avatarSize: avatarPx,
        header: header,
        time: time,
        message: message,
        footer: footer,
        headerTextStyle: headerStyle,
        bubbleTextStyle: bubbleStyle,
        footerTextStyle: headerStyle?.copyWith(fontSize: 12),
      ),
    );
  }

  static Widget _responsive(BuildContext context) {
    final wide = WashBreakpoints.of(context).width >= 1024;
    final panel = _threadPanel(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: const [
          WashChatLine(
            placement: WashChatPlacement.start,
            message: 'How wide should the vignette sit?',
            bubbleTone: WashChatBubbleTone.secondary,
          ),
          WashChatLine(
            placement: WashChatPlacement.end,
            message: 'Keep it soft past the third vertical.',
            bubbleTone: WashChatBubbleTone.accent,
          ),
        ],
      ),
    );
    final companion = _threadPanel(
      child: const WashChatLine(
        placement: WashChatPlacement.start,
        avatarImageId: 64,
        avatarAlt: 'Critic portrait',
        header: 'Crit',
        time: 'Just now',
        message: 'Check value contrast on phone before you glaze.',
        bubbleTone: WashChatBubbleTone.warning,
        footer: 'Pinned',
      ),
    );

    if (wide) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: _sample('single column thread', panel)),
          const SizedBox(width: 16),
          Expanded(child: _sample('lg:grid-cols-2 companion panel', companion)),
        ],
      );
    }
    return Column(
      children: [
        _sample('single column thread', panel),
        const SizedBox(height: 16),
        _sample('lg:grid-cols-2 companion panel', companion),
      ],
    );
  }

  static Widget _threadPanel({required Widget child}) {
    return Builder(
      builder: (context) {
        final tokens = WashTokens.of(context);
        return Container(
          padding: const EdgeInsets.all(12),
          decoration: washInkBorderBox(
            tokens,
            fill: tokens.surface.withValues(alpha: 0.4),
          ),
          child: child,
        );
      },
    );
  }

  static const _sidesDart =
      "WashChatLine(placement: WashChatPlacement.start, message: '...');";
  static const _colorsDart =
      'WashChatLine(bubbleTone: WashChatBubbleTone.primary, message: sample);';
  static const _chromeDart =
      'WashChatLine(avatarImageId: 64, header: ..., time: ..., footer: ...);';
  static const _densityDart =
      'WashChatLine(avatarSize: 40, bubbleTextStyle: TextStyle(fontSize: 14), ...);';
  static const _critiqueDart = '_StudioCritiqueThread();';
  static const _responsiveDart =
      'LayoutBuilder + WashChatLine in bordered panels; Row when width >= 1024';
}

class _StudioCritiqueThread extends StatefulWidget {
  const _StudioCritiqueThread();

  @override
  State<_StudioCritiqueThread> createState() => _StudioCritiqueThreadState();
}

class _CritiqueMsg {
  _CritiqueMsg({
    required this.side,
    required this.name,
    required this.time,
    required this.text,
    this.tone = WashChatBubbleTone.defaultTone,
  });

  final WashChatPlacement side;
  final String name;
  final String time;
  final String text;
  final WashChatBubbleTone tone;
}

class _StudioCritiqueThreadState extends State<_StudioCritiqueThread> {
  final _controller = TextEditingController();
  var _messages = <_CritiqueMsg>[
    _CritiqueMsg(
      side: WashChatPlacement.start,
      name: 'Maya',
      time: '09:12',
      text:
          'The sky wash is blooming too hard near the horizon. Soften the edge with a clean brush.',
      tone: WashChatBubbleTone.info,
    ),
    _CritiqueMsg(
      side: WashChatPlacement.end,
      name: 'You',
      time: '09:14',
      text: 'Agreed. I will lift pigment while it is still damp.',
      tone: WashChatBubbleTone.primary,
    ),
    _CritiqueMsg(
      side: WashChatPlacement.start,
      name: 'Maya',
      time: '09:15',
      text: 'Keep the foreground dark enough so the midground can breathe.',
    ),
  ];
  var _submitting = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final text = _controller.text.trim();
    if (text.isEmpty || _submitting) return;
    setState(() => _submitting = true);
    final now = DateTime.now();
    final time =
        '${now.hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')}';
    setState(() {
      _messages = [
        ..._messages,
        _CritiqueMsg(
          side: WashChatPlacement.end,
          name: 'You',
          time: time,
          text: text,
          tone: WashChatBubbleTone.primary,
        ),
      ];
      _controller.clear();
      _submitting = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: washInkBorderBox(
            tokens,
            fill: tokens.surface.withValues(alpha: 0.5),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: _messages.map((msg) {
              return WashChatLine(
                placement: msg.side,
                avatarImageId: msg.side == WashChatPlacement.start ? 64 : 91,
                avatarAlt: '${msg.name} studio portrait',
                header: msg.name,
                time: msg.time,
                message: msg.text,
                bubbleTone: msg.tone,
                footer: msg.side == WashChatPlacement.end ? 'Sent' : 'Seen',
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Reply', style: WashTypography.label(tokens.inkMuted)),
                  const SizedBox(height: 4),
                  WashInput(
                    controller: _controller,
                    hint: 'Add a critique note…',
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            WashButton(
              onPressed: _submitting ? null : _send,
              loading: _submitting,
              variant: WashButtonVariant.primary,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const WashLucideIcon('send', size: 16),
                  const SizedBox(width: 8),
                  const Text('Send'),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        const Text(
          'chat chat-start | chat-end + interactive reply',
          style: TextStyle(fontFamily: 'monospace', fontSize: 10.4),
        ),
      ],
    );
  }
}
