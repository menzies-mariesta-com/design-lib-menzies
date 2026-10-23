import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_docs_data.g.dart';
import '../wash_gallery_navigation.dart';
import '../wash_gallery_panel.dart';
import 'wash_docs_widgets.dart';

/// Web `DocsStackGuidePage`: back link, stack header and numbered WashPanels.
class WashDocsStackGuidePage extends StatelessWidget {
  const WashDocsStackGuidePage({required this.stackId, super.key});

  final String stackId;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final stack = kWashDocsStacks[stackId] ?? kWashDocsStacks['vanilla']!;
    final navigate = WashGalleryNavigation.callbackOf(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Align(
          alignment: Alignment.centerLeft,
          child: WashDocsBackButton(
            label: 'All stacks',
            onPressed: () => navigate?.call('docs-start'),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashDocsIconTile(
              tone: stack.tone,
              size: 56,
              icon: washStackIcon(stack.id),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'GETTING STARTED',
                    style: WashTypography.label(tokens.inkMuted).copyWith(
                      fontSize: 11,
                      height: 1.5,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.88,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    stack.name,
                    style:
                        WashTypography.displayLarge(tokens.onSurface).copyWith(
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
                      '${stack.description} Gallery HTML/JSX/Svelte paste '
                      'daisyUI class markup; use the npm package for the '
                      'maintained consumer API.',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 16,
                        height: 1.5,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      WashDocsBadge(
                        label: stack.adapter == 'react'
                            ? 'React adapter'
                            : 'Core API',
                        tone: stack.adapter == 'react' ? 'info' : 'neutral',
                      ),
                      WashDocsBadge(
                        label: '${stack.steps.length} steps',
                        tone: 'primary',
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),
        for (var i = 0; i < stack.steps.length; i++) ...[
          if (i > 0) const SizedBox(height: 16),
          _StepPanel(index: i, step: stack.steps[i]),
        ],
        if (stack.notes.isNotEmpty) ...[
          const SizedBox(height: 24),
          _NotesAlert(notes: stack.notes),
        ],
      ],
    );
  }
}

class _StepPanel extends StatelessWidget {
  const _StepPanel({required this.index, required this.step});

  final int index;
  final WashDocsStepData step;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashGalleryPanel(
      header: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'STEP ${index + 1}',
            style: WashTypography.label(tokens.inkMuted).copyWith(
              fontSize: 11,
              height: 1.5,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.88,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            step.title,
            style: WashTypography.title(tokens.onSurface).copyWith(
              fontSize: 20,
              height: 28 / 20,
              fontWeight: FontWeight.w600,
            ),
          ),
          if (step.body != null) ...[
            const SizedBox(height: 8),
            Text(
              step.body!,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 14,
                height: 1.6,
              ),
            ),
          ],
        ],
      ),
      child: step.code == null
          ? const SizedBox.shrink()
          : WashDocsCode(step.code!),
    );
  }
}

class _NotesAlert extends StatelessWidget {
  const _NotesAlert({required this.notes});

  final List<String> notes;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final info = tokens.palette.info;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color.alphaBlend(info.withValues(alpha: 0.09), tokens.surface),
        border: Border.all(color: info.withValues(alpha: 0.22)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashLucideIcon('info', size: 20, color: info, strokeWidth: 1.75),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < notes.length; i++) ...[
                  if (i > 0) const SizedBox(height: 4),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '•',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 14,
                          height: 1.6,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          notes[i],
                          style: WashTypography.body(tokens.onSurface).copyWith(
                            fontSize: 14,
                            height: 1.6,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
