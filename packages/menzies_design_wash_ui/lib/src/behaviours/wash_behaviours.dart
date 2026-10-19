import 'package:flutter/widgets.dart';

import '../components/dropdown/wash_dropdown.dart';
import '../components/marquee/wash_overflow_marquee.dart';
import '../widgets/wash_button.dart';
import '../widgets/wash_feedback.dart';

class WashOverflowMarqueeDemo extends StatelessWidget {
  const WashOverflowMarqueeDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      width: 200,
      child: WashOverflowMarquee(
        'Long pigment label that overflows on mobile widths',
      ),
    );
  }
}

class WashSpaceAwareTooltipDemo extends StatelessWidget {
  const WashSpaceAwareTooltipDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return Center(
      child: WashTooltip(
        message: 'Smart placement',
        child: WashButton(label: 'Press and hold', onPressed: () {}),
      ),
    );
  }
}

class WashSpaceAwareDropdownDemo extends StatefulWidget {
  const WashSpaceAwareDropdownDemo({super.key});
  @override
  State<WashSpaceAwareDropdownDemo> createState() =>
      _WashSpaceAwareDropdownDemoState();
}

class _WashSpaceAwareDropdownDemoState extends State<WashSpaceAwareDropdownDemo> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: WashDropdown(
        measureViewport: true,
        noHover: true,
        trigger: const WashDropdownTriggerButton(label: 'Toggle menu'),
        panel: WashDropdownMenuPanel(
          items: [
            WashDropdownMenuItem(label: 'One', onTap: () {}),
            WashDropdownMenuItem(label: 'Two', onTap: () {}),
          ],
        ),
      ),
    );
  }
}

class WashDropdownOnHoverDemo extends StatelessWidget {
  const WashDropdownOnHoverDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return WashDropdown(
      hoverOpen: true,
      trigger: const WashDropdownTriggerButton(label: 'Hover (desktop)'),
      panel: WashDropdownMenuPanel(
        items: washStandardPigmentMenuItems(),
      ),
    );
  }
}
