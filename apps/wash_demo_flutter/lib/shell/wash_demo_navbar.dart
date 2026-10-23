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
    final width = MediaQuery.sizeOf(context).width;
    final wide = width >= 1024;
    final showSearch = width >= 768;

    return Container(
      height: 64,
      padding: EdgeInsets.symmetric(horizontal: wide ? 24 : 16),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.8),
        border: Border(
          bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.8)),
        ),
      ),
      child: Row(
        children: [
          Expanded(
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
                Flexible(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Menzies Design',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: WashTypography.displayLarge(tokens.onSurface)
                            .copyWith(
                          fontSize: wide ? 24 : 20,
                          fontWeight: FontWeight.w600,
                          height: 1.1,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 1),
                      Text(
                        washUiBrandText().toUpperCase(),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: WashTypography.label(tokens.inkMuted).copyWith(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.9,
                          height: 1.2,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: showSearch
                ? Center(child: SizedBox(width: 288, child: search))
                : const SizedBox.shrink(),
          ),
          Expanded(
            child: Align(
              alignment: Alignment.centerRight,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  WashThemeSwitcher(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
