import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

class WashDemoNavbar extends StatelessWidget {
  const WashDemoNavbar({
    required this.drawerOpen,
    required this.onDrawerToggle,
    required this.showMenu,
    required this.search,
    super.key,
  });

  final bool drawerOpen;
  final VoidCallback onDrawerToggle;
  final bool showMenu;
  final Widget search;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: tokens.inkBorder)),
      ),
      child: Row(
        children: [
          if (showMenu)
            Padding(
              padding: const EdgeInsets.only(right: 8),
              child: WashButton(
                square: true,
                variant: WashButtonVariant.ghost,
                onPressed: onDrawerToggle,
                child: const WashIcon(WashIconGlyph.menu, size: 18),
              ),
            ),
          Text(
            'Wash UI',
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(fontSize: 20),
          ),
          const SizedBox(width: 16),
          Expanded(child: search),
          const SizedBox(width: 12),
          const WashThemeSwitcher(),
        ],
      ),
    );
  }
}
