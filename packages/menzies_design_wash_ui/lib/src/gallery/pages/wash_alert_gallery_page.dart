import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAlertGalleryPage extends StatelessWidget {
  const WashAlertGalleryPage({super.key});

  static const _messages = {
    WashAlertTone.info: 'New software update available.',
    WashAlertTone.success: 'Your purchase has been confirmed!',
    WashAlertTone.warning: 'Warning: Invalid email address!',
    WashAlertTone.error: 'Error! Task failed successfully.',
  };

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Alert',
      description: 'Every daisyUI alert color, style, and direction.',
      sections: [
        _s('01 · Default', 'Base alert', 'role=alert with optional icon and message', _base(context), _baseDart),
        _s('02 · Colors', 'Semantic colors', 'info, success, warning, and error with matching icons', _colors(), _colorsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Soft', 'Soft style', 'alert-soft with each semantic color', _styled(WashAlertStyle.soft), _softDart),
        _s('04 · Outline', 'Outline style', 'alert-outline for a lighter border treatment', _styled(WashAlertStyle.outline), _outlineDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Dash', 'Dash style', 'alert-dash uses a dashed outline', _styled(WashAlertStyle.dash), _dashDart),
        _s('06 · Styles × colors', 'Style matrix', 'Soft, outline, and dash across all four colors', _matrix(), _matrixDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Direction', 'Vertical and horizontal', 'alert-vertical stacks on small screens', _direction(context), _directionDart),
        _s('08 · With actions', 'Buttons and title copy', 'Alerts can carry CTAs and a short title plus description', _actions(context), _actionsDart, tint: WashGalleryPanelTint.rose),
        _s('09 · Toast placement', 'CRUD toast pattern', 'Mutation feedback wraps alert in toast toast-bottom', _toast(context), _toastDart, tint: WashGalleryPanelTint.ochre),
      ],
    );
  }

  static WashGallerySection _s(String eyebrow, String title, String desc, Widget preview, String dart, {WashGalleryPanelTint tint = WashGalleryPanelTint.none}) {
    return WashGallerySection(eyebrow: eyebrow, title: title, description: desc, tint: tint, child: WashShowcaseTabs(preview: preview, dartSource: dart));
  }

  static Widget _base(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashDaisyAlert(
      children: [
        WashAlertIcon('info', color: tokens.palette.info),
        const WashAlertMessage('12 unread messages. Tap to see.'),
      ],
    );
  }

  static Widget _colors() {
    return Column(
      children: WashAlertTone.values.map((t) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: WashDaisyAlert(
            tone: t,
            children: [
              WashAlertIcon(washAlertToneLucideIcon(t)),
              WashAlertMessage(_messages[t]!),
            ],
          ),
        );
      }).toList(),
    );
  }

  static Widget _styled(WashAlertStyle style) {
    return Column(
      children: WashAlertTone.values.map((t) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: WashDaisyAlert(tone: t, style: style, children: [WashAlertMessage(_messages[t]!)]),
        );
      }).toList(),
    );
  }

  static Widget _matrix() {
    const styles = [WashAlertStyle.soft, WashAlertStyle.outline, WashAlertStyle.dash];
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 520;
        final columns = styles.map((style) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(style.name, style: const TextStyle(fontSize: 11)),
                const SizedBox(height: 8),
                for (final t in WashAlertTone.values)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: WashDaisyAlert(
                      tone: t,
                      style: style,
                      children: [Text(t.name[0].toUpperCase() + t.name.substring(1))],
                    ),
                  ),
              ],
            ),
          );
        }).toList();
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: columns.map((c) => Expanded(child: c)).toList(),
          );
        }
        return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: columns);
      },
    );
  }

  static Widget _direction(BuildContext context) {
    final tokens = WashTokens.of(context);
    final icon = WashAlertIcon('info', color: tokens.palette.info);
    return Column(
      children: [
        WashDaisyAlert(layout: WashAlertLayout.vertical, children: [icon, const WashAlertMessage('Stacked content for narrow viewports.'), WashButton(label: 'Dismiss', size: WashButtonSize.sm, onPressed: () {})]),
        const SizedBox(height: 12),
        WashDaisyAlert(layout: WashAlertLayout.horizontal, children: [icon, const WashAlertMessage('Side-by-side layout for wider desks.'), WashButton(label: 'Dismiss', size: WashButtonSize.sm, onPressed: () {})]),
        const SizedBox(height: 12),
        WashDaisyAlertResponsive(children: [icon, const WashAlertMessage('Responsive: vertical by default, horizontal from sm up.'), WashButton(label: 'Got it', size: WashButtonSize.sm, onPressed: () {})]),
      ],
    );
  }

  static Widget _actions(BuildContext context) {
    final tokens = WashTokens.of(context);
    final icon = WashAlertIcon('info', color: tokens.palette.info);
    return Column(
      children: [
        WashDaisyAlertResponsive(
          children: [
            icon,
            const WashAlertMessage('We use cookies for no reason.'),
            Row(
              children: [
                WashButton(label: 'Deny', size: WashButtonSize.sm, variant: WashButtonVariant.ghost, onPressed: () {}),
                const SizedBox(width: 8),
                WashButton(label: 'Accept', size: WashButtonSize.sm, onPressed: () {}),
              ],
            ),
          ],
        ),
        const SizedBox(height: 12),
        WashDaisyAlertResponsive(
          children: [
            icon,
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('New message!', style: TextStyle(fontWeight: FontWeight.bold)),
                Text('You have 1 unread message', style: TextStyle(fontSize: 12)),
              ],
            ),
            WashButton(label: 'See', size: WashButtonSize.sm, variant: WashButtonVariant.ghost, onPressed: () {}),
          ],
        ),
      ],
    );
  }

  static Widget _toast(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      height: 192,
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          color: tokens.palette.base100.withValues(alpha: 0.6),
        ),
        child: WashToastStack(
          alerts: [
            WashDaisyAlert(
              tone: WashAlertTone.success,
              shadow: true,
              children: [
                const WashAlertIcon('circle-check', color: null),
                const WashAlertMessage('Created successfully'),
              ],
            ),
            WashDaisyAlert(
              tone: WashAlertTone.error,
              shadow: true,
              children: [
                const WashAlertIcon('circle-x', color: null),
                const WashAlertMessage('Could not save changes'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  static const _baseDart = 'WashDaisyAlert(children: [WashAlertIcon(...), WashAlertMessage(...)]);';
  static const _colorsDart = 'WashDaisyAlert(tone: WashAlertTone.info, children: [...]);';
  static const _softDart = 'WashDaisyAlert(style: WashAlertStyle.soft, tone: WashAlertTone.info, ...);';
  static const _outlineDart = 'WashDaisyAlert(style: WashAlertStyle.outline, ...);';
  static const _dashDart = 'WashDaisyAlert(style: WashAlertStyle.dash, ...);';
  static const _matrixDart = 'WashDaisyAlert(style: WashAlertStyle.soft, tone: tone, ...);';
  static const _directionDart = 'WashDaisyAlert(layout: WashAlertLayout.vertical, children: [...]);';
  static const _actionsDart = 'WashDaisyAlertResponsive(children: [icon, message, WashButton(...)]);';
  static const _toastDart = 'WashToastStack(alerts: [WashDaisyAlert(tone: WashAlertTone.success, shadow: true, ...)]);';
}
