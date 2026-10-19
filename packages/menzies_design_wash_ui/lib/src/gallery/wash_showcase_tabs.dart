import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../studio/wash_code_highlighter.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import '../components/button/wash_button.dart';

enum _Tab { preview, dart }

class WashShowcaseTabs extends StatefulWidget {
  const WashShowcaseTabs({
    required this.preview,
    required this.dartSource,
    super.key,
  });

  final Widget preview;
  final String dartSource;

  @override
  State<WashShowcaseTabs> createState() => _WashShowcaseTabsState();
}

class _WashShowcaseTabsState extends State<WashShowcaseTabs> {
  _Tab _tab = _Tab.preview;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            _TabChip(
              label: 'Preview',
              selected: _tab == _Tab.preview,
              onTap: () => setState(() => _tab = _Tab.preview),
            ),
            const SizedBox(width: 8),
            _TabChip(
              label: 'Dart',
              selected: _tab == _Tab.dart,
              onTap: () => setState(() => _tab = _Tab.dart),
            ),
            const Spacer(),
            if (_tab == _Tab.dart)
              WashButton(
                size: WashButtonSize.sm,
                variant: WashButtonVariant.ghost,
                label: 'Copy',
                onPressed: () {
                  Clipboard.setData(ClipboardData(text: widget.dartSource));
                },
              ),
          ],
        ),
        const SizedBox(height: 16),
        if (_tab == _Tab.preview)
          widget.preview
        else
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: tokens.inkBorder),
            ),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: RichText(
                text: WashCodeHighlighter.highlight(widget.dartSource, language: 'dart'),
              ),
            ),
          ),
      ],
    );
  }
}

class _TabChip extends StatelessWidget {
  const _TabChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: selected ? tokens.primary.withValues(alpha: 0.12) : null,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(
            color: selected ? tokens.primary : tokens.inkBorder,
          ),
        ),
        child: Text(
          label,
          style: WashTypography.label(
            selected ? tokens.primary : tokens.onSurface,
          ),
        ),
      ),
    );
  }
}
