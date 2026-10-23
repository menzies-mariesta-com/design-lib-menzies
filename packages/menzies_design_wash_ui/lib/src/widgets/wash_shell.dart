import 'package:flutter/widgets.dart';

import '../foundation/breakpoints.dart';
import '../foundation/wash_primitives.dart';
import 'wash_background.dart';

class WashShell extends StatelessWidget {
  const WashShell({
    required this.title,
    required this.body,
    this.leading,
    this.actions,
    this.navigation,
    this.bottomNavigation,
    this.drawer,
    super.key,
  });

  final String title;
  final Widget body;
  final Widget? leading;
  final List<Widget>? actions;
  final Widget? navigation;
  final Widget? bottomNavigation;
  final Widget? drawer;

  @override
  Widget build(BuildContext context) {
    final bp = WashBreakpoints.of(context);
    return WashBackground(
      child: Column(
        children: [
          WashAppBar(title: Text(title), leading: leading, actions: actions),
          Expanded(
            child: Row(
              children: [
                if (bp.useNavigationRail && navigation != null)
                  SizedBox(width: 280, child: navigation),
                Expanded(child: body),
              ],
            ),
          ),
          if (bp.useBottomNavigation && bottomNavigation != null)
            bottomNavigation!,
        ],
      ),
    );
  }
}
