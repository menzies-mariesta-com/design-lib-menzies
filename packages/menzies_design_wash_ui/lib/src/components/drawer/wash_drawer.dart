import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';

/// Side panel width (`w-56`).
const double kWashDrawerSideWidth = 224;

/// Default bounded demo frame height (`h-72`).
const double kWashDrawerDemoFrameHeight = 288;

class WashDrawerScope extends InheritedWidget {
  const WashDrawerScope({
    required this.open,
    required this.toggle,
    required this.setOpen,
    required super.child,
    super.key,
  });

  final bool open;
  final VoidCallback toggle;
  final ValueChanged<bool> setOpen;

  static WashDrawerScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<WashDrawerScope>();
  }

  @override
  bool updateShouldNotify(WashDrawerScope oldWidget) => open != oldWidget.open;
}

/// daisyUI `drawer` inside a relative, height-boxed frame (not full viewport).
class WashDrawer extends StatefulWidget {
  const WashDrawer({
    required this.content,
    required this.side,
    this.end = false,
    this.lgOpen = false,
    this.frameHeight = kWashDrawerDemoFrameHeight,
    this.sideWidth = kWashDrawerSideWidth,
    this.initialOpen = false,
    super.key,
  });

  final Widget content;
  final Widget side;
  final bool end;
  final bool lgOpen;
  final double frameHeight;
  final double sideWidth;
  final bool initialOpen;

  @override
  State<WashDrawer> createState() => _WashDrawerState();
}

class _WashDrawerState extends State<WashDrawer> {
  late bool _open = widget.initialOpen;

  bool _isLarge(BuildContext context) {
    return MediaQuery.sizeOf(context).width >= WashTailwindBreakpoints.lg;
  }

  bool _sideVisible(BuildContext context) {
    return _open || (widget.lgOpen && _isLarge(context));
  }

  bool _overlayVisible(BuildContext context) {
    if (!_open) return false;
    if (widget.lgOpen && _isLarge(context)) return false;
    return true;
  }

  void _toggle() => setOpen(!_open);

  void setOpen(bool value) {
    if (_open == value) return;
    setState(() => _open = value);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final sideVisible = _sideVisible(context);
    final overlayVisible = _overlayVisible(context);

    return WashDrawerScope(
      open: _open,
      toggle: _toggle,
      setOpen: setOpen,
      child: WashDrawerFrame(
        height: widget.frameHeight,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Positioned.fill(child: widget.content),
              if (overlayVisible)
                Positioned.fill(
                  child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTap: () => setOpen(false),
                    child: ColoredBox(
                      color: tokens.onSurface.withValues(alpha: 0.45),
                    ),
                  ),
                ),
              if (sideVisible)
                Positioned(
                  top: 0,
                  bottom: 0,
                  left: widget.end ? null : 0,
                  right: widget.end ? 0 : null,
                  width: widget.sideWidth,
                  child: widget.side,
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// `relative h-* overflow-hidden rounded-box border …` demo shell.
class WashDrawerFrame extends StatelessWidget {
  const WashDrawerFrame({
    required this.child,
    this.height = kWashDrawerDemoFrameHeight,
    super.key,
  });

  final Widget child;
  final double height;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      height: height,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surfaceContainer.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
        child: child,
      ),
    );
  }
}

/// `menu min-h-full w-56 bg-base-100 p-4` side list.
class WashDrawerMenu extends StatelessWidget {
  const WashDrawerMenu({
    required this.items,
    this.width = kWashDrawerSideWidth,
    this.title,
    this.padding = const EdgeInsets.all(16),
    super.key,
  });

  final List<String> items;
  final double width;
  final String? title;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: width,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surface,
          boxShadow: washPaperShadowSm(tokens),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (title != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
                child: Text(
                  title!,
                  style: WashTypography.label(tokens.inkMuted),
                ),
              ),
            Expanded(
              child: ListView(
                padding: padding,
                children: items
                    .map(
                      (label) =>
                          WashDrawerMenuButton(label: label, onTap: () {}),
                    )
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WashDrawerMenuButton extends StatelessWidget {
  const WashDrawerMenuButton({
    required this.label,
    this.onTap,
    this.leading,
    super.key,
  });

  final String label;
  final VoidCallback? onTap;
  final Widget? leading;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashRipple(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        child: Row(
          children: [
            if (leading != null) ...[leading!, const SizedBox(width: 8)],
            Text(label, style: WashTypography.body(tokens.onSurface)),
          ],
        ),
      ),
    );
  }
}

enum WashDrawerIconToggleColor { primary, secondary, ghost }

/// Icon-only drawer toggle with daisyUI tooltip (`drawer-button`).
class WashDrawerIconToggle extends StatelessWidget {
  const WashDrawerIconToggle({
    required this.tip,
    this.close = false,
    this.color = WashDrawerIconToggleColor.primary,
    this.onPressed,
    super.key,
  });

  final String tip;
  final bool close;
  final WashDrawerIconToggleColor color;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final variant = switch (color) {
      WashDrawerIconToggleColor.primary => WashButtonVariant.primary,
      WashDrawerIconToggleColor.secondary => WashButtonVariant.secondary,
      WashDrawerIconToggleColor.ghost => WashButtonVariant.ghost,
    };
    void press() {
      if (onPressed != null) {
        onPressed!();
      } else {
        WashDrawerScope.maybeOf(context)?.toggle();
      }
    }

    return WashTooltip(
      message: tip,
      child: WashButton(
        variant: variant,
        square: true,
        onPressed: press,
        child: WashIcon(
          close ? WashIconGlyph.close : WashIconGlyph.menu,
          size: 20,
        ),
      ),
    );
  }
}

class WashDrawerOpenButton extends StatelessWidget {
  const WashDrawerOpenButton({
    required this.label,
    this.variant = WashButtonVariant.primary,
    this.size = WashButtonSize.md,
    super.key,
  });

  final String label;
  final WashButtonVariant variant;
  final WashButtonSize size;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: label,
      variant: variant,
      size: size,
      onPressed: () => WashDrawerScope.maybeOf(context)?.setOpen(true),
    );
  }
}

class WashDrawerCloseButton extends StatelessWidget {
  const WashDrawerCloseButton({
    this.tip = 'Close menu',
    this.color = WashDrawerIconToggleColor.secondary,
    super.key,
  });

  final String tip;
  final WashDrawerIconToggleColor color;

  @override
  Widget build(BuildContext context) {
    return WashDrawerIconToggle(
      tip: tip,
      close: true,
      color: color,
      onPressed: () => WashDrawerScope.maybeOf(context)?.setOpen(false),
    );
  }
}

/// Studio navbar header used in drawer gallery section 05.
class WashDrawerStudioNavbar extends StatelessWidget {
  const WashDrawerStudioNavbar({
    required this.onMenu,
    super.key,
  });

  final VoidCallback onMenu;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.9),
        border: Border(
          bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        child: Row(
          children: [
            WashDrawerIconToggle(
              tip: 'Open studio menu',
              color: WashDrawerIconToggleColor.ghost,
              onPressed: onMenu,
            ),
            const SizedBox(width: 4),
            Expanded(
              child: Text(
                'Menzies Design',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: WashTypography.title(tokens.onSurface)
                    .copyWith(fontSize: 18),
              ),
            ),
            const SizedBox(width: 4),
            Text('Studio', style: WashTypography.label(tokens.inkMuted)),
            const SizedBox(width: 8),
          ],
        ),
      ),
    );
  }
}

class WashDrawerStudioAside extends StatelessWidget {
  const WashDrawerStudioAside({super.key});

  static const _links = [
    ('home', 'Home'),
    ('palette', 'Palette'),
    ('layers', 'Layers'),
    ('paintbrush', 'Brushes'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: kWashDrawerSideWidth,
      child: DecoratedBox(
        decoration: BoxDecoration(color: tokens.surface),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Studio',
                    style: WashTypography.title(tokens.onSurface)
                        .copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 4),
                  Text('Quick links',
                      style: WashTypography.label(tokens.inkMuted)),
                ],
              ),
            ),
            DecoratedBox(
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                      color: tokens.inkBorder.withValues(alpha: 0.6)),
                ),
              ),
              child: const SizedBox(height: 0),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(8),
                children: _links
                    .map(
                      (e) => WashDrawerMenuButton(
                        label: e.$2,
                        leading: WashLucideIcon(e.$1, size: 16, strokeWidth: 2),
                        onTap: () {},
                      ),
                    )
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Legacy preview: basic open drawer in a frame.
class WashDrawerBasicDemo extends StatelessWidget {
  const WashDrawerBasicDemo({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashDrawer(
      side: Stack(
        children: [
          const WashDrawerMenu(items: ['Home', 'Palette', 'Layers']),
          Positioned(
            top: 8,
            right: 8,
            child: const WashDrawerCloseButton(),
          ),
        ],
      ),
      content: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Main content', style: WashTypography.body(tokens.inkMuted)),
            const SizedBox(height: 12),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const WashDrawerOpenButton(label: 'Open drawer'),
                const SizedBox(width: 8),
                const WashDrawerIconToggle(tip: 'Open menu'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
