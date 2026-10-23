import 'package:flutter/widgets.dart';

import '../components/button/wash_button.dart';
import '../components/dropdown/wash_dropdown.dart';
import '../components/marquee/wash_overflow_marquee.dart';
import '../components/search_select/wash_search_select.dart';
import '../foundation/wash_icon.dart';
import '../icons/wash_lucide_icon.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

/// Section-aware previews for the four behaviour routes. The web demo shows a
/// measured viewport stage plus a short explanation for each section; these
/// widgets mirror that structure instead of repeating one trigger button.
class WashBehaviourPreview extends StatelessWidget {
  const WashBehaviourPreview({
    required this.pageId,
    required this.sectionIndex,
    required this.sectionTitle,
    super.key,
  });

  final String pageId;
  final int sectionIndex;
  final String sectionTitle;

  @override
  Widget build(BuildContext context) {
    return switch (pageId) {
      'behaviour-auto-dropdown' => _AutoDropdownDemo(index: sectionIndex),
      'behaviour-auto-tooltip' => _AutoTooltipDemo(index: sectionIndex),
      'behaviour-dropdown-on-hover' => _HoverDropdownDemo(index: sectionIndex),
      'behaviour-overflow-marquee' => _MarqueeDemo(index: sectionIndex),
      _ => _Stage(
          child: Center(
            child: Text(
              sectionTitle,
              style: WashTypography.body(WashTokens.of(context).inkMuted),
            ),
          ),
        ),
    };
  }
}

class _Stage extends StatelessWidget {
  const _Stage({
    required this.child,
    this.height = 340,
    this.fixedHeight = false,
  }) : padding = 24;

  final Widget child;
  final double height;
  final double padding;

  /// Some children (marquee scrollers) have no finite intrinsic width, so they
  /// use the fixed stage height instead of an [IntrinsicHeight] measurement.
  final bool fixedHeight;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      height: fixedHeight ? height : null,
      constraints: fixedHeight ? null : BoxConstraints(minHeight: height),
      padding: EdgeInsets.all(padding),
      decoration: BoxDecoration(
        color: Color.alphaBlend(
          tokens.palette.primary.withValues(alpha: 0.035),
          tokens.surfaceContainer.withValues(alpha: 0.65),
        ),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: fixedHeight ? child : IntrinsicHeight(child: child),
    );
  }
}

class _Eyebrow extends StatelessWidget {
  const _Eyebrow(this.text) : color = null;

  final String text;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text.toUpperCase(),
      style: WashTypography.body(color ?? tokens.inkMuted).copyWith(
        fontSize: 9.5,
        letterSpacing: 0.9,
        fontWeight: FontWeight.w700,
      ),
    );
  }
}

class _Caption extends StatelessWidget {
  const _Caption(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontSize: 11,
        height: 1.45,
      ),
    );
  }
}

class _CodeLine extends StatelessWidget {
  const _CodeLine(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.72),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.55)),
      ),
      child: Text(
        text,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 10.5,
          fontFamily: 'MapleMono',
          height: 1.4,
        ),
      ),
    );
  }
}

/* ----------------------------------------------------------- auto dropdown */

class _AutoDropdownDemo extends StatelessWidget {
  const _AutoDropdownDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    if (index >= 3) return const _DropdownDecisionDiagram();
    if (index == 2) return const _SearchSelectStage();
    return const _DropdownEdgesStage();
  }
}

class _DropdownEdgesStage extends StatelessWidget {
  const _DropdownEdgesStage();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 360,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            runSpacing: 6,
            children: [
              const _Eyebrow('Viewport stage'),
              _Pill(
                label: 'measureViewport: true',
                color: tokens.palette.primary,
              ),
            ],
          ),
          const SizedBox(height: 14),
          Expanded(
            child: Container(
              padding: const EdgeInsets.fromLTRB(18, 14, 18, 14),
              decoration: BoxDecoration(
                color: tokens.surface.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: tokens.inkBorder.withValues(alpha: 0.6),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Wrap(
                    alignment: WrapAlignment.spaceBetween,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      _TriggerWithMenu(
                        label: 'Open near top',
                        caption: 'free space below → panel down',
                        alignEnd: false,
                      ),
                      const _Caption('Tall frame'),
                    ],
                  ),
                  const Spacer(),
                  Wrap(
                    alignment: WrapAlignment.spaceBetween,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      const _Caption('Open near footer'),
                      _TriggerWithMenu(
                        label: 'Open near bottom',
                        caption: 'free space above → panel up',
                        alignEnd: true,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          const _CodeLine(
            '<WashDropdown measureViewport noHover trigger={…} panel={…} />',
          ),
        ],
      ),
    );
  }
}

class _TriggerWithMenu extends StatelessWidget {
  const _TriggerWithMenu({
    required this.label,
    required this.caption,
    required this.alignEnd,
  });

  final String label;
  final String caption;
  final bool alignEnd;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment:
          alignEnd ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        WashDropdown(
          measureViewport: true,
          noHover: true,
          trigger: WashDropdownTriggerButton(
            label: label,
            showChevron: true,
            variant: WashButtonVariant.outline,
            size: WashButtonSize.sm,
          ),
          panel: WashDropdownMenuPanel(
            width: 220,
            items: const [
              WashDropdownMenuItem(label: 'Bottom placement'),
              WashDropdownMenuItem(label: 'Top placement'),
              WashDropdownMenuItem(label: 'Clamped + scroll'),
            ],
          ),
        ),
        const SizedBox(height: 4),
        _Caption(caption),
        const SizedBox(height: 6),
        Container(
          width: 150,
          height: 1,
          color: tokens.inkBorder.withValues(alpha: 0.45),
        ),
      ],
    );
  }
}

class _SearchSelectStage extends StatelessWidget {
  const _SearchSelectStage();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 340,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            runSpacing: 6,
            children: [
              const _Eyebrow('Shared SearchSelect'),
              _Pill(label: 'same space rule', color: tokens.palette.primary),
            ],
          ),
          const SizedBox(height: 10),
          _Caption(
            'The combobox measures its overlay before inserting it, so the '
            'menu flips above the trigger when the page footer is close.',
          ),
          const SizedBox(height: 18),
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 360),
              child: WashSearchSelect(
                label: 'Pigment',
                placeholder: 'Search pigments…',
                maxWidth: 360,
                options: const [
                  WashSearchSelectOption(
                    value: 'ultramarine',
                    label: 'Ultramarine',
                    note: 'Cool blue · granulating',
                  ),
                  WashSearchSelectOption(
                    value: 'ochre',
                    label: 'Yellow ochre',
                    note: 'Warm earth · opaque',
                  ),
                  WashSearchSelectOption(
                    value: 'alizarin',
                    label: 'Alizarin crimson',
                    note: 'Deep red · staining',
                  ),
                  WashSearchSelectOption(
                    value: 'viridian',
                    label: 'Viridian',
                    note: 'Green · transparent',
                  ),
                ],
              ),
            ),
          ),
          const Spacer(),
          const _CodeLine(
            'SearchSelect uses dropdown-no-hover and the same viewport measurement.',
          ),
        ],
      ),
    );
  }
}

class _DropdownDecisionDiagram extends StatelessWidget {
  const _DropdownDecisionDiagram();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const steps = [
      ('1', 'Measure', 'Read trigger + estimated panel size'),
      ('2', 'Compare', 'Score free space above and below'),
      ('3', 'Clamp', 'Shrink maxHeight and scroll inside'),
    ];
    return _Stage(
      height: 330,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const _Eyebrow('How it decides'),
          const SizedBox(height: 14),
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var i = 0; i < steps.length; i++) ...[
                  if (i > 0)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      child: Center(
                        child: WashLucideIcon(
                          'arrow-right',
                          size: 18,
                          color: tokens.inkMuted,
                        ),
                      ),
                    ),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: tokens.surface.withValues(alpha: 0.72),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: tokens.inkBorder.withValues(alpha: 0.6),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 26,
                            height: 26,
                            decoration: BoxDecoration(
                              color: tokens.palette.primary
                                  .withValues(alpha: 0.14),
                              borderRadius: BorderRadius.circular(7),
                            ),
                            child: Center(
                              child: Text(
                                steps[i].$1,
                                style:
                                    WashTypography.body(tokens.palette.primary)
                                        .copyWith(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            steps[i].$2,
                            style:
                                WashTypography.title(tokens.onSurface).copyWith(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 4),
                          _Caption(steps[i].$3),
                        ],
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 14),
          const _CodeLine(
            'side = freeBelow >= panelHeight ? bottom : top;',
          ),
        ],
      ),
    );
  }
}

/* ------------------------------------------------------------ auto tooltip */

class _AutoTooltipDemo extends StatelessWidget {
  const _AutoTooltipDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    if (index >= 3) return const _TooltipDecisionDiagram();
    return _TooltipEdgesStage(forced: index == 2);
  }
}

class _TooltipEdgesStage extends StatelessWidget {
  const _TooltipEdgesStage({this.forced = false});

  final bool forced;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 340,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            runSpacing: 6,
            children: [
              const _Eyebrow('Wide panel · edge triggers'),
              _Pill(
                label: forced ? 'placement locked' : 'auto from free space',
                color: forced ? tokens.palette.warning : tokens.palette.primary,
              ),
            ],
          ),
          const SizedBox(height: 12),
          _Caption(
            forced
                ? 'placement="left" / "right" skips the measurement and keeps '
                    'the chosen side even when the pointer is near the middle.'
                : 'Auto measures the trigger rectangle and opens toward the roomier '
                    'edge. Hover or press a trigger to see the live result.',
          ),
          const SizedBox(height: 18),
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 22),
              decoration: BoxDecoration(
                color: tokens.surface.withValues(alpha: 0.62),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: tokens.inkBorder.withValues(alpha: 0.6),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _Bubble(
                          message: forced ? 'Forced left' : 'Opens right',
                          onRight: true,
                          tone: forced
                              ? tokens.palette.warning
                              : tokens.palette.neutral,
                        ),
                        const SizedBox(height: 10),
                        WashButton(
                          variant: WashButtonVariant.outline,
                          size: WashButtonSize.sm,
                          label: 'Left edge trigger',
                          onPressed: () {},
                        ),
                        const SizedBox(height: 8),
                        const _Caption('measure → right'),
                      ],
                    ),
                  ),
                  Container(
                    width: 1,
                    height: 130,
                    color: tokens.inkBorder.withValues(alpha: 0.45),
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        _Bubble(
                          message: forced ? 'Forced right' : 'Opens left',
                          onRight: false,
                          tone: forced
                              ? tokens.palette.warning
                              : tokens.palette.neutral,
                        ),
                        const SizedBox(height: 10),
                        WashButton(
                          variant: WashButtonVariant.outline,
                          size: WashButtonSize.sm,
                          label: 'Right edge trigger',
                          onPressed: () {},
                        ),
                        const SizedBox(height: 8),
                        const _Caption('measure → left'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          _CodeLine(
            forced
                ? 'WashTooltip(prefer: WashTooltipSide.left, …)'
                : 'WashTooltip(message: …, child: trigger) // prefer is null',
          ),
        ],
      ),
    );
  }
}

class _Bubble extends StatelessWidget {
  const _Bubble({
    required this.message,
    required this.onRight,
    required this.tone,
  });

  final String message;
  final bool onRight;
  final Color tone;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (!onRight) ...[
          Flexible(child: _bubble()),
          const SizedBox(width: 6),
          WashLucideIcon('move-right', size: 13, color: tone),
        ] else ...[
          WashLucideIcon('move-left', size: 13, color: tone),
          const SizedBox(width: 6),
          Flexible(child: _bubble()),
        ],
      ],
    );
  }

  Widget _bubble() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: tone,
        borderRadius: BorderRadius.circular(7),
      ),
      child: Text(
        message,
        style: const TextStyle(
          fontSize: 11,
          color: Color(0xFFFAF7F2),
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _TooltipDecisionDiagram extends StatelessWidget {
  const _TooltipDecisionDiagram();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 320,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const _Eyebrow('Viewport free space, in three steps'),
          const SizedBox(height: 14),
          Expanded(
            child: Stack(
              children: [
                Container(
                  decoration: BoxDecoration(
                    color: tokens.surface.withValues(alpha: 0.5),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: tokens.inkBorder.withValues(alpha: 0.6),
                    ),
                  ),
                ),
                Positioned(
                  left: 18,
                  top: 18,
                  child: _DiagramNode(
                    icon: 'scan',
                    label: 'Trigger rect',
                    detail: 'global rect + estimated tip',
                  ),
                ),
                Positioned(
                  right: 18,
                  top: 18,
                  child: _DiagramNode(
                    icon: 'panel-left',
                    label: 'Free band',
                    detail: 'viewport minus safe gutter',
                  ),
                ),
                Positioned(
                  left: 18,
                  bottom: 18,
                  child: _DiagramNode(
                    icon: 'arrow-left-right',
                    label: 'Resolve side',
                    detail: 'left, right, top, or bottom',
                  ),
                ),
                Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: tokens.palette.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: tokens.palette.primary.withValues(alpha: 0.32),
                      ),
                    ),
                    child: Text(
                      'auto → right',
                      style:
                          WashTypography.body(tokens.palette.primary).copyWith(
                        fontSize: 12,
                        fontFamily: 'MapleMono',
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          const _CodeLine(
            'tooltip-left / tooltip-right classes are stripped so runtime wins.',
          ),
        ],
      ),
    );
  }
}

class _DiagramNode extends StatelessWidget {
  const _DiagramNode({
    required this.icon,
    required this.label,
    required this.detail,
  });

  final String icon;
  final String label;
  final String detail;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 30,
          height: 30,
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
          ),
          child: Center(
            child:
                WashLucideIcon(icon, size: 15, color: tokens.palette.primary),
          ),
        ),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontSize: 11.5,
                fontWeight: FontWeight.w600,
              ),
            ),
            _Caption(detail),
          ],
        ),
      ],
    );
  }
}

/* --------------------------------------------------------- hover dropdown */

class _HoverDropdownDemo extends StatelessWidget {
  const _HoverDropdownDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    if (index == 2) return const _DetailsMenuStage();
    if (index >= 3) return const _ComboboxStage();
    return const _HoverMenuStage();
  }
}

class _HoverMenuStage extends StatelessWidget {
  const _HoverMenuStage();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 320,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const _Eyebrow('Hover to open'),
                const SizedBox(height: 10),
                _Caption(
                  'Desktop menus open on hover, keep the pointer bridge, and '
                  'close after a short grace period.',
                ),
                const SizedBox(height: 18),
                WashDropdown(
                  hoverOpen: true,
                  trigger: const WashDropdownTriggerButton(
                    label: 'Pigment menu',
                    showChevron: true,
                    variant: WashButtonVariant.outline,
                  ),
                  panel: WashDropdownMenuPanel(
                    items: [
                      WashDropdownMenuItem(
                        label: 'Ultramarine',
                        leading: const WashIcon(WashIconGlyph.star),
                        onTap: () {},
                      ),
                      WashDropdownMenuItem(
                        label: 'Yellow ochre',
                        leading: const WashIcon(WashIconGlyph.starOutline),
                        onTap: () {},
                      ),
                      WashDropdownMenuItem(
                        label: 'Alizarin crimson',
                        leading: const WashIcon(WashIconGlyph.starOutline),
                        onTap: () {},
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
                _Pill(label: 'hoverOpen: true', color: tokens.palette.primary),
              ],
            ),
          ),
          const SizedBox(width: 24),
          Expanded(
            child: _MenuCard(
              title: 'Menu preview',
              subtitle: 'Open state',
              items: const [
                ('Ultramarine', 'star'),
                ('Yellow ochre', 'star-outline'),
                ('Alizarin crimson', 'star-outline'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DetailsMenuStage extends StatelessWidget {
  const _DetailsMenuStage();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 330,
      child: Row(
        children: [
          Expanded(
            child: _MenuCard(
              title: 'Hover card',
              subtitle: 'noHover: false',
              items: const [
                ('Wash tokens', 'droplets'),
                ('Plate components', 'component'),
                ('Accessibility notes', 'accessibility'),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: WashLucideIcon(
              'arrow-right',
              size: 20,
              color: tokens.inkMuted,
            ),
          ),
          Expanded(
            child: _MenuCard(
              title: 'Click only',
              subtitle: 'noHover: true',
              items: const [
                ('SearchSelect', 'search'),
                ('Combobox', 'list-filter'),
                ('Command menu', 'terminal'),
              ],
              outlined: true,
            ),
          ),
        ],
      ),
    );
  }
}

class _MenuCard extends StatelessWidget {
  const _MenuCard({
    required this.title,
    required this.subtitle,
    required this.items,
    this.outlined = false,
  });

  final String title;
  final String subtitle;
  final List<(String, String)> items;
  final bool outlined;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: outlined
              ? tokens.palette.primary.withValues(alpha: 0.4)
              : tokens.inkBorder.withValues(alpha: 0.7),
        ),
        boxShadow: [
          BoxShadow(
            color: tokens.onSurface.withValues(alpha: 0.07),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            runSpacing: 4,
            children: [
              Text(
                title,
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
              _Caption(subtitle),
            ],
          ),
          const SizedBox(height: 8),
          Container(height: 1, color: tokens.inkBorder.withValues(alpha: 0.5)),
          const SizedBox(height: 6),
          for (final item in items)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(
                children: [
                  WashLucideIcon(
                    item.$2,
                    size: 14,
                    color: tokens.palette.primary,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      item.$1,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 11.5,
                      ),
                    ),
                  ),
                  const SizedBox(width: 6),
                  WashLucideIcon(
                    'chevron-right',
                    size: 12,
                    color: tokens.inkMuted,
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _ComboboxStage extends StatelessWidget {
  const _ComboboxStage();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _Stage(
      height: 310,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const _Eyebrow('Combobox opt-out'),
          const SizedBox(height: 10),
          _Caption(
            'SearchSelect opts out with dropdown-no-hover. It opens on click or '
            'keyboard focus so typing does not dismiss the panel.',
          ),
          const SizedBox(height: 18),
          Container(
            width: double.infinity,
            constraints: const BoxConstraints(maxWidth: 360),
            padding: const EdgeInsets.symmetric(horizontal: 13, vertical: 12),
            decoration: BoxDecoration(
              color: tokens.surface,
              borderRadius: BorderRadius.circular(9),
              border: Border.all(
                color: tokens.palette.primary.withValues(alpha: 0.55),
              ),
            ),
            child: Row(
              children: [
                WashLucideIcon('search', size: 14, color: tokens.inkMuted),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Search pigments…',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                WashLucideIcon(
                  'chevron-up',
                  size: 14,
                  color: tokens.palette.primary,
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Container(
            width: double.infinity,
            constraints: const BoxConstraints(maxWidth: 360),
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: tokens.surface,
              borderRadius: BorderRadius.circular(10),
              border:
                  Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
              boxShadow: [
                BoxShadow(
                  color: tokens.onSurface.withValues(alpha: 0.08),
                  blurRadius: 16,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Column(
              children: const [
                _MenuRow(label: 'Ultramarine', note: 'Cool blue · granulating'),
                _MenuRow(label: 'Yellow ochre', note: 'Warm earth · opaque'),
                _MenuRow(
                    label: 'Alizarin crimson', note: 'Deep red · staining'),
              ],
            ),
          ),
          const Spacer(),
          const _CodeLine('noHover: true · open on click or focus'),
        ],
      ),
    );
  }
}

class _MenuRow extends StatelessWidget {
  const _MenuRow({required this.label, required this.note});

  final String label;
  final String note;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 7),
      child: Row(
        children: [
          Container(
            width: 10,
            height: 10,
            decoration: BoxDecoration(
              color: tokens.palette.primary.withValues(alpha: 0.5),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                _Caption(note),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/* --------------------------------------------------------------- marquee */

class _MarqueeDemo extends StatelessWidget {
  const _MarqueeDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const longText =
        'Cerulean blue hue · studio reserve · cold-press cotton plate · 140 lb';
    return _Stage(
      height: 300,
      fixedHeight: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 8,
            runSpacing: 6,
            children: [
              _Eyebrow(switch (index) {
                1 => 'Hover to reveal',
                2 => 'Component wrapper',
                3 => 'Line clamp',
                4 => 'Reduced motion',
                _ => 'Opt out',
              }),
              _Pill(
                label: switch (index) {
                  1 => 'enabled',
                  2 => 'overflow-hidden',
                  3 => 'line-clamp-2',
                  4 => 'prefers-reduced-motion',
                  _ => 'no marquee',
                },
                color: index == 4
                    ? tokens.palette.warning
                    : tokens.palette.primary,
              ),
            ],
          ),
          const SizedBox(height: 12),
          _Caption(switch (index) {
            1 =>
              'The label compares intrinsic and host width, then loops only when it actually overflows.',
            2 =>
              'A narrow host shows the ellipsis at rest; the wrapper keeps the layout height fixed.',
            3 =>
              'Long copy can stay clamped to two lines instead of becoming a single-line marquee.',
            4 =>
              'With reduced motion the text reveals statically on focus or hover — no looping transform.',
            _ =>
              'If looping is not appropriate, render a normal ellipsis and expose the full label another way.',
          }),
          const SizedBox(height: 20),
          Expanded(
            child: Center(
              child: Container(
                width: 260,
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  color: tokens.surface.withValues(alpha: 0.72),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(
                    color: tokens.inkBorder.withValues(alpha: 0.65),
                  ),
                ),
                child: switch (index) {
                  3 => Text(
                      longText,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 13,
                        height: 1.4,
                      ),
                    ),
                  4 => const WashOverflowMarquee(
                      longText,
                      enabled: false,
                    ),
                  _ => WashOverflowMarquee(
                      longText,
                      enabled: index != 5,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 13,
                      ),
                    ),
                },
              ),
            ),
          ),
          const SizedBox(height: 16),
          _CodeLine(switch (index) {
            1 => 'WashOverflowMarquee(longLabel)',
            2 => 'SizedBox(width: 260, child: WashOverflowMarquee(…))',
            3 => 'Text(maxLines: 2, overflow: TextOverflow.ellipsis)',
            4 => 'WashOverflowMarquee(..., enabled: false)',
            _ => 'Text(overflow: TextOverflow.ellipsis)',
          }),
        ],
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.32)),
      ),
      child: Text(
        label,
        style: WashTypography.body(color).copyWith(
          fontSize: 10,
          fontFamily: 'MapleMono',
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
