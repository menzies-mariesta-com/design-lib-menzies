import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../components/button/wash_button.dart';
import '../components/layout/wash_aspect_ratio.dart';
import '../studio/wash_code_highlighter.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

enum _Tab { preview, dart }

/// Website showcase frame: a segmented `tabs-box` strip above the preview.
/// The web demo offers Preview + generated HTML/JSX/Svelte snippets. Flutter
/// mirrors the same chrome with Preview + Dart source.
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
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(8, 8, 8, 4),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer.withValues(alpha: 0.5),
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
              ),
            ),
            child: Row(
              children: [
                _TabButton(
                  label: 'Preview',
                  selected: _tab == _Tab.preview,
                  onTap: () => setState(() => _tab = _Tab.preview),
                ),
                const SizedBox(width: 4),
                _TabButton(
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
          ),
          ConstrainedBox(
            // Mirror the web showcase pane's 20rem floor so short previews
            // leave the same room for the code panel. The inner Column keeps
            // the preview top-aligned instead of stretching it to the floor.
            constraints: const BoxConstraints(minHeight: 320),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: _tab == _Tab.preview
                      ? widget.preview
                      : Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: tokens.surfaceContainer.withValues(
                              alpha: 0.3,
                            ),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: tokens.inkBorder),
                          ),
                          child: SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            child: RichText(
                              text: WashCodeHighlighter.highlight(
                                widget.dartSource,
                                language: 'dart',
                              ),
                            ),
                          ),
                        ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Row-major responsive wrap for showcase cards. Mirrors the web demo's
/// `flex flex-wrap` grids while giving each card a predictable share of the
/// row so the tab chrome and 20rem preview floor stay aligned.
class WashShowcaseWrap extends StatelessWidget {
  const WashShowcaseWrap({
    required this.children,
    this.spacing = 32,
    this.runSpacing = 24,
    this.maxColumns = 3,
    this.minItemWidth = 280,
    this.alignment = WrapAlignment.start,
    this.crossAxisAlignment = WrapCrossAlignment.start,
    super.key,
  });

  final List<Widget> children;
  final double spacing;
  final double runSpacing;
  final int maxColumns;
  final double minItemWidth;
  final WrapAlignment alignment;
  final WrapCrossAlignment crossAxisAlignment;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final columns = constraints.maxWidth >= WashTailwindBreakpoints.lg
            ? maxColumns
            : constraints.maxWidth >= WashTailwindBreakpoints.sm
                ? maxColumns < 2
                    ? maxColumns
                    : 2
                : 1;
        var count = columns < children.length ? columns : children.length;
        var itemWidth = (constraints.maxWidth - spacing * (count - 1)) / count;
        while (count > 1 && itemWidth < minItemWidth) {
          count -= 1;
          itemWidth = (constraints.maxWidth - spacing * (count - 1)) / count;
        }
        return Wrap(
          spacing: spacing,
          runSpacing: runSpacing,
          alignment: alignment,
          crossAxisAlignment: crossAxisAlignment,
          children: [
            for (final child in children)
              SizedBox(width: itemWidth < 0 ? 0 : itemWidth, child: child),
          ],
        );
      },
    );
  }
}

class _TabButton extends StatelessWidget {
  const _TabButton({
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
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 40,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: selected ? tokens.surface : null,
          borderRadius: BorderRadius.circular(16),
          boxShadow: selected
              ? const [
                  BoxShadow(
                    color: Color(0x14000000),
                    offset: Offset(0, 1),
                    blurRadius: 2,
                  ),
                ]
              : null,
        ),
        child: Text(
          label,
          style: WashTypography.body(tokens.onSurface).copyWith(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            height: 21 / 14,
            color: selected
                ? tokens.onSurface
                : tokens.onSurface.withValues(alpha: 0.5),
          ),
        ),
      ),
    );
  }
}
