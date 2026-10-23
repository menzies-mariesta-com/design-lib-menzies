import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_docs_data.g.dart';
import '../wash_gallery_navigation.dart';
import 'wash_docs_widgets.dart';

/// Web `DocsGettingStartedPage`: 14 stack cards leading into the guides.
class WashDocsGettingStartedPage extends StatelessWidget {
  const WashDocsGettingStartedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final stacks = kWashDocsStacks.values.toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const WashDocsHero(
          title: 'Getting started',
          description:
              'Pick your web stack for a step-by-step setup guide. Gallery tabs '
              'paste full daisyUI kits (complete files, calendar-style); install '
              'the npm package when you want the maintained primitive API.',
        ),
        LayoutBuilder(
          builder: (context, constraints) {
            final viewport = MediaQuery.sizeOf(context).width;
            final cols = viewport >= 1280
                ? 3
                : viewport >= 640
                    ? 2
                    : 1;
            const gap = 16.0;
            final width = (constraints.maxWidth - gap * (cols - 1)) / cols;
            return Wrap(
              spacing: gap,
              runSpacing: gap,
              children: [
                for (final stack in stacks)
                  SizedBox(
                    width: width,
                    child: _StackCard(
                      stack: stack,
                      icon: washStackIcon(stack.id),
                      onTap: () => WashGalleryNavigation.callbackOf(context)
                          ?.call(stack.page),
                    ),
                  ),
              ],
            );
          },
        ),
      ],
    );
  }
}

class _StackCard extends StatefulWidget {
  const _StackCard({
    required this.stack,
    required this.icon,
    required this.onTap,
  });

  final WashDocsStackData stack;
  final String icon;
  final VoidCallback onTap;

  @override
  State<_StackCard> createState() => _StackCardState();
}

class _StackCardState extends State<_StackCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.all(20),
          constraints: const BoxConstraints(minHeight: 196),
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: _hover
                  ? Color.alphaBlend(
                      tokens.palette.primary.withValues(alpha: 0.4),
                      tokens.inkBorder,
                    )
                  : tokens.inkBorder,
            ),
            boxShadow: washPaperShadowSm(tokens),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashDocsIconTile(tone: widget.stack.tone, icon: widget.icon),
                  const Spacer(),
                  Flexible(
                    child: FittedBox(
                      fit: BoxFit.scaleDown,
                      alignment: Alignment.topRight,
                      child: WashDocsBadge(
                        label: widget.stack.adapter == 'react'
                            ? 'React adapter'
                            : 'Core API',
                        tone: widget.stack.adapter == 'react'
                            ? 'info'
                            : 'neutral',
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                widget.stack.name,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 18,
                  height: 26 / 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                widget.stack.description,
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 14,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Text(
                    'Open guide',
                    style: WashTypography.body(tokens.palette.primary).copyWith(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(width: 4),
                  WashLucideIcon(
                    'arrow-right',
                    size: 14,
                    color: tokens.palette.primary,
                    strokeWidth: 2,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
