import 'package:flutter/widgets.dart';

/// Mobile-first Wash breakpoints (CSS px parity).
class WashBreakpoints {
  const WashBreakpoints(this.width);

  final double width;

  static WashBreakpoints of(BuildContext context) {
    return WashBreakpoints(MediaQuery.sizeOf(context).width);
  }

  bool get isPhone => width < 768;
  bool get isTablet => width >= 768 && width < 1280;
  bool get isDesktop => width >= 1280;

  /// Gallery / shell: drawer + bottom nav on phone; rail on desktop.
  bool get useBottomNavigation => isPhone;
  bool get useNavigationRail => isDesktop;
}
