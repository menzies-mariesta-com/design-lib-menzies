import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';

/// Docs hero: 11px kicker, 30px display heading, 16px lede (web text-3xl).
class WashDocsHero extends StatelessWidget {
  const WashDocsHero({
    required this.title,
    required this.description,
    this.kicker = 'Documentation',
    super.key,
  });

  final String title;
  final String description;
  final String kicker;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            kicker.toUpperCase(),
            style: WashTypography.label(tokens.inkMuted).copyWith(
              fontSize: 11,
              height: 1.5,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.88,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(
              fontSize: 30,
              height: 36 / 30,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.75,
            ),
          ),
          const SizedBox(height: 8),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 672),
            child: Text(
              description,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 16,
                height: 1.5,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// `pre` code block used across the docs family.
class WashDocsCode extends StatelessWidget {
  const WashDocsCode(this.code, {super.key});

  final String code;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.8),
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(16),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Text(
          code,
          softWrap: false,
          style: WashTypography.body(tokens.onSurface).copyWith(
            fontSize: 12,
            height: 1.65,
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

/// `WashPanel` doc section with a 20px title and 20px body padding.
class WashDocsSection extends StatelessWidget {
  const WashDocsSection({
    required this.title,
    required this.children,
    super.key,
  });

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final spaced = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      if (i > 0) spaced.add(const SizedBox(height: 16));
      spaced.add(children[i]);
    }
    return WashGalleryPanel(
      header: Text(
        title,
        style: WashTypography.title(tokens.onSurface).copyWith(
          fontSize: 20,
          height: 28 / 20,
          fontWeight: FontWeight.w600,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: spaced,
      ),
    );
  }
}

/// Paragraph with `inline code` spans rendered in Maple Mono.
class WashDocsBody extends StatelessWidget {
  const WashDocsBody(this.text, {this.size = 14, super.key});

  final String text;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final normal = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: size,
      height: 1.6,
      fontWeight: FontWeight.w400,
    );
    final code = normal.copyWith(
      fontSize: size * 0.86,
      backgroundColor: tokens.surfaceContainer,
    );
    final spans = <InlineSpan>[];
    final parts = text.split('`');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].isEmpty) continue;
      spans.add(TextSpan(text: parts[i], style: i.isOdd ? code : normal));
    }
    return Text.rich(TextSpan(children: spans));
  }
}

class WashDocsBullet extends StatelessWidget {
  const WashDocsBullet(this.child, {super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 1, right: 8),
          child: Text(
            '•',
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 14,
              height: 1.6,
            ),
          ),
        ),
        Expanded(child: child),
      ],
    );
  }
}

class WashDocsBulletList extends StatelessWidget {
  const WashDocsBulletList(this.items, {this.code = false, super.key});

  final List<String> items;
  final bool code;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < items.length; i++) ...[
          if (i > 0) const SizedBox(height: 8),
          WashDocsBullet(
            code
                ? Text(
                    items[i],
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontSize: 12,
                      height: 1.6,
                    ),
                  )
                : WashDocsBody(items[i]),
          ),
        ],
      ],
    );
  }
}

class WashDocsBadge extends StatelessWidget {
  const WashDocsBadge({
    required this.label,
    this.tone = 'neutral',
    super.key,
  });

  final String label;
  final String tone;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = washToneColor(tokens, tone);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(
        color: Color.alphaBlend(
          color.withValues(alpha: 0.12),
          tokens.surface,
        ),
        border: Border.all(color: color.withValues(alpha: 0.22)),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: WashTypography.body(color).copyWith(
          fontSize: 12,
          height: 18 / 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

const Map<String, String> _washStackIcons = <String, String>{
  'vanilla': 'file-code',
  'react-vite': 'atom',
  'nextjs': 'triangle',
  'vue-vite': 'component',
  'nuxt': 'layers',
  'sveltekit': 'flame',
  'astro': 'rocket',
  'angular': 'shield',
  'remix': 'zap',
  'solid': 'boxes',
  'preact': 'box',
  'qwik': 'package',
  'lit': 'blocks',
  'eleventy': 'code',
};

String washStackIcon(String id) => _washStackIcons[id] ?? 'code';

Color washToneColor(WashTokens tokens, String tone) {
  return switch (tone) {
    'primary' => tokens.palette.primary,
    'secondary' => tokens.palette.secondary,
    'accent' => tokens.palette.accent,
    'info' => tokens.palette.info,
    'success' => tokens.palette.success,
    'warning' => tokens.palette.warning,
    'error' => tokens.palette.error,
    _ => tokens.palette.neutral,
  };
}

class WashDocsIconTile extends StatelessWidget {
  const WashDocsIconTile({
    required this.tone,
    this.size = 44,
    this.icon = 'code',
    super.key,
  });

  final String tone;
  final double size;
  final String icon;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = washToneColor(tokens, tone);
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Color.alphaBlend(color.withValues(alpha: 0.15), tokens.surface),
        borderRadius: BorderRadius.circular(16),
      ),
      child: WashLucideIcon(icon,
          size: size * 0.52, color: color, strokeWidth: 1.75),
    );
  }
}

/// Small ghost back link used by the stack guides.
class WashDocsBackButton extends StatelessWidget {
  const WashDocsBackButton(
      {required this.label, required this.onPressed, super.key});

  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      size: WashButtonSize.sm,
      variant: WashButtonVariant.ghost,
      onPressed: onPressed,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const WashLucideIcon('arrow-left', size: 16, strokeWidth: 2),
          const SizedBox(width: 4),
          Text(label),
        ],
      ),
    );
  }
}
