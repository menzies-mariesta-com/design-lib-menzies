import 'package:flutter/widgets.dart';

import '../foundation/wash_primitives.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import '../components/button/wash_button.dart';

import '../components/card/wash_card.dart';

export '../components/card/wash_card.dart' show WashPlateCard;
export '../components/divider/wash_divider.dart';
export '../components/dock/wash_dock.dart';
export '../components/kbd/wash_kbd.dart';
export '../components/marquee/wash_marquee.dart';
export '../components/marquee/wash_overflow_marquee.dart';
export '../components/navbar/wash_navbar.dart';
export '../components/pagination/wash_pagination.dart';

/// Wave B–D catalog widgets (mobile-first, token-driven).

class WashTabs extends StatefulWidget {
  const WashTabs({required this.tabs, required this.children, super.key});
  final List<String> tabs;
  final List<Widget> children;

  @override
  State<WashTabs> createState() => _WashTabsState();
}

class _WashTabsState extends State<WashTabs> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: List.generate(widget.tabs.length, (i) {
            final selected = i == _index;
            return Padding(
              padding: const EdgeInsets.only(right: 8),
              child: WashButton(
                label: widget.tabs[i],
                variant: selected ? WashButtonVariant.primary : WashButtonVariant.ghost,
                size: WashButtonSize.sm,
                onPressed: () => setState(() => _index = i),
              ),
            );
          }),
        ),
        const SizedBox(height: 12),
        Expanded(child: widget.children[_index.clamp(0, widget.children.length - 1)]),
      ],
    );
  }
}

class WashSkeleton extends StatelessWidget {
  const WashSkeleton({this.height = 16, this.width, super.key});
  final double height;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}

class WashDrawerList extends StatelessWidget {
  const WashDrawerList({required this.items, super.key});
  final List<(String label, VoidCallback onTap)> items;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      color: tokens.surface,
      child: ListView(
        children: items
            .map(
              (e) => WashListTile(
                title: Text(e.$1),
                onTap: e.$2,
              ),
            )
            .toList(),
      ),
    );
  }
}

class WashStat extends StatelessWidget {
  const WashStat({required this.label, required this.value, super.key});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashPlateCard(
      title: label,
      child: Text(value, style: WashTypography.displayLarge(tokens.onSurface)),
    );
  }
}


