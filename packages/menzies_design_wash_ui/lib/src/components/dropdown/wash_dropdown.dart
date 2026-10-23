import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../placement/dropdown_placement.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../button/wash_button.dart';

/// daisyUI dropdown panel width (`w-52`).
const double kWashDropdownMenuWidth = 208;

const Duration kWashDropdownHoverCloseDelay = Duration(milliseconds: 200);

const List<String> kWashDropdownPigmentLabels = [
  'Ultramarine',
  'Yellow ochre',
  'Alizarin',
  'Viridian',
  'Burnt sienna',
  "Payne's gray",
];

class WashDropdownAlign {
  const WashDropdownAlign({
    this.alignEnd = false,
    this.openTop = false,
    this.openBottom = true,
    this.openLeft = false,
    this.openRight = false,
  });

  final bool alignEnd;
  final bool openTop;
  final bool openBottom;
  final bool openLeft;
  final bool openRight;

  static const end = WashDropdownAlign(alignEnd: true);
  static const top = WashDropdownAlign(openTop: true, openBottom: false);
  static const bottom = WashDropdownAlign();
  static const left = WashDropdownAlign(openLeft: true, openBottom: false);
  static const right = WashDropdownAlign(openRight: true, openBottom: false);
  static const topEnd =
      WashDropdownAlign(alignEnd: true, openTop: true, openBottom: false);
}

class WashDropdownMenuItem {
  const WashDropdownMenuItem({
    required this.label,
    this.onTap,
    this.leading,
    this.trailing,
    this.active = false,
    this.enabled = true,
  });

  final String label;
  final VoidCallback? onTap;
  final Widget? leading;
  final Widget? trailing;
  final bool active;
  final bool enabled;
}

/// Menu list panel (`menu dropdown-content`).
class WashDropdownMenuPanel extends StatelessWidget {
  const WashDropdownMenuPanel({
    required this.items,
    this.width = kWashDropdownMenuWidth,
    this.maxHeight,
    super.key,
  });

  final List<WashDropdownMenuItem> items;
  final double width;
  final double? maxHeight;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    Widget list = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children:
          items.map((item) => _MenuRow(item: item, tokens: tokens)).toList(),
    );
    if (maxHeight != null) {
      list = ConstrainedBox(
        constraints: BoxConstraints(maxHeight: maxHeight!),
        child: SingleChildScrollView(child: list),
      );
    }
    return SizedBox(
      width: width,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: washPaperShadowSm(tokens),
        ),
        child: Padding(padding: const EdgeInsets.all(8), child: list),
      ),
    );
  }
}

class _MenuRow extends StatelessWidget {
  const _MenuRow({required this.item, required this.tokens});

  final WashDropdownMenuItem item;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final bg = item.active ? tokens.primary.withValues(alpha: 0.14) : null;
    final child = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          if (item.leading != null) ...[
            item.leading!,
            const SizedBox(width: 8)
          ],
          Expanded(
            child: Text(
              item.label,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontWeight: item.active ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          ),
          if (item.trailing != null) item.trailing!,
        ],
      ),
    );
    if (!item.enabled) {
      return Opacity(
        opacity: 0.7,
        child: DefaultTextStyle(
          style: WashTypography.body(tokens.inkMuted),
          child: child,
        ),
      );
    }
    return WashRipple(
      onTap: item.onTap,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(8),
        ),
        child: child,
      ),
    );
  }
}

List<WashDropdownMenuItem> washStandardPigmentMenuItems(
    {VoidCallback? onPick}) {
  return kWashDropdownPigmentLabels
      .map(
        (label) => WashDropdownMenuItem(
          label: label,
          onTap: onPick,
        ),
      )
      .toList();
}

/// Focus / hover dropdown (daisyUI `.dropdown` host).
class WashDropdown extends StatefulWidget {
  const WashDropdown({
    required this.trigger,
    required this.panel,
    this.align = const WashDropdownAlign(),
    this.hoverOpen = true,
    this.noHover = false,
    this.forceOpen = false,
    this.measureViewport = false,
    this.panelSizeEstimate = const Size(kWashDropdownMenuWidth, 280),
    this.onOpenChanged,
    super.key,
  });

  final Widget trigger;
  final Widget panel;
  final WashDropdownAlign align;
  final bool hoverOpen;
  final bool noHover;
  final bool forceOpen;
  final bool measureViewport;
  final Size panelSizeEstimate;
  final ValueChanged<bool>? onOpenChanged;

  @override
  State<WashDropdown> createState() => _WashDropdownState();
}

class _WashDropdownState extends State<WashDropdown> {
  final _triggerKey = GlobalKey();
  final _focusNode = FocusNode();
  OverlayEntry? _entry;
  bool _open = false;
  Timer? _hoverCloseTimer;
  bool _pointerInside = false;

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(_onFocusChange);
  }

  @override
  void didUpdateWidget(covariant WashDropdown oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.forceOpen && !_open) {
      _setOpen(true);
    }
  }

  void _onFocusChange() {
    if (_focusNode.hasFocus && !widget.noHover) {
      _setOpen(true);
    }
  }

  void _setOpen(bool value) {
    if (widget.forceOpen) return;
    if (_open == value) return;
    setState(() => _open = value);
    widget.onOpenChanged?.call(value);
    if (value) {
      _insertOverlay();
    } else {
      _removeOverlay();
      _hoverCloseTimer?.cancel();
    }
  }

  void _scheduleHoverClose() {
    _hoverCloseTimer?.cancel();
    _hoverCloseTimer = Timer(kWashDropdownHoverCloseDelay, () {
      if (!_pointerInside && _open) _setOpen(false);
    });
  }

  Rect? _triggerRect() {
    final box = _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return null;
    return box.localToGlobal(Offset.zero) & box.size;
  }

  Offset _panelOffset(Rect trigger, Size panelSize, Rect viewport) {
    if (widget.measureViewport) {
      final placement = WashDropdownPlacementLogic.measure(
        trigger: trigger,
        panelSize: panelSize,
        viewport: viewport,
      );
      return WashDropdownPlacementLogic.panelOffset(
        trigger: trigger,
        panelSize: panelSize,
        placement: placement,
      );
    }
    return WashDropdownPlacementLogic.staticPanelOffset(
      trigger: trigger,
      panelSize: panelSize,
      alignEnd: widget.align.alignEnd,
      openTop: widget.align.openTop,
      openLeft: widget.align.openLeft,
      openRight: widget.align.openRight,
    );
  }

  void _insertOverlay() {
    _removeOverlay();
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _entry = OverlayEntry(
      builder: (overlayContext) {
        final trigger = _triggerRect();
        if (trigger == null) return const SizedBox.shrink();
        final viewportBox =
            Overlay.of(overlayContext).context.findRenderObject() as RenderBox?;
        final viewport = viewportBox == null
            ? Offset.zero & MediaQuery.sizeOf(overlayContext)
            : Offset.zero & viewportBox.size;
        final panelSize = widget.panelSizeEstimate;
        final offset = _panelOffset(trigger, panelSize, viewport);
        return Stack(
          children: [
            Positioned.fill(
              child: Listener(
                behavior: HitTestBehavior.translucent,
                onPointerDown: (event) {
                  final pos = event.position;
                  final panelRect = offset & panelSize;
                  if (!trigger.contains(pos) && !panelRect.contains(pos)) {
                    _setOpen(false);
                    _focusNode.unfocus();
                  }
                },
              ),
            ),
            Positioned(
              left: offset.dx,
              top: offset.dy,
              child: MouseRegion(
                onEnter: (_) {
                  _pointerInside = true;
                  _hoverCloseTimer?.cancel();
                },
                onExit: (_) {
                  _pointerInside = false;
                  if (widget.hoverOpen && !widget.noHover) {
                    _scheduleHoverClose();
                  }
                },
                child: widget.panel,
              ),
            ),
          ],
        );
      },
    );
    overlay.insert(_entry!);
  }

  void _removeOverlay() {
    _entry?.remove();
    _entry = null;
  }

  @override
  void dispose() {
    _hoverCloseTimer?.cancel();
    _removeOverlay();
    _focusNode.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      _setOpen(false);
      _focusNode.unfocus();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.forceOpen) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: widget.align.alignEnd
            ? CrossAxisAlignment.end
            : CrossAxisAlignment.start,
        children: [
          KeyedSubtree(key: _triggerKey, child: widget.trigger),
          const SizedBox(height: 4),
          widget.panel,
        ],
      );
    }

    final enableHover = widget.hoverOpen && !widget.noHover;

    return Focus(
      focusNode: _focusNode,
      onKeyEvent: _onKey,
      child: MouseRegion(
        onEnter: enableHover
            ? (_) {
                _pointerInside = true;
                _hoverCloseTimer?.cancel();
                _setOpen(true);
              }
            : null,
        onExit: enableHover
            ? (_) {
                _pointerInside = false;
                _scheduleHoverClose();
              }
            : null,
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {
            _focusNode.requestFocus();
            _setOpen(!_open);
          },
          child: KeyedSubtree(
            key: _triggerKey,
            child: AbsorbPointer(child: widget.trigger),
          ),
        ),
      ),
    );
  }
}

/// Card-style dropdown panel (`card dropdown-content`).
class WashDropdownCardPanel extends StatelessWidget {
  const WashDropdownCardPanel({
    required this.title,
    required this.body,
    this.width = 256,
    this.compact = false,
    super.key,
  });

  final String title;
  final String body;
  final double width;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: width,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: washPaperShadowSm(tokens),
        ),
        child: Padding(
          padding: EdgeInsets.all(compact ? 12 : 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                title,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: compact ? 14 : 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: compact ? 4 : 8),
              Text(
                body,
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: compact ? 12 : 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Native `<details class="dropdown">` pattern.
class WashDetailsDropdown extends StatefulWidget {
  const WashDetailsDropdown({
    required this.summary,
    required this.panel,
    this.align = const WashDropdownAlign(),
    this.measureViewport = false,
    this.panelSizeEstimate = const Size(kWashDropdownMenuWidth, 280),
    this.hoverOpen = true,
    super.key,
  });

  final Widget summary;
  final Widget panel;
  final WashDropdownAlign align;
  final bool measureViewport;
  final Size panelSizeEstimate;
  final bool hoverOpen;

  @override
  State<WashDetailsDropdown> createState() => _WashDetailsDropdownState();
}

class _WashDetailsDropdownState extends State<WashDetailsDropdown> {
  bool _open = false;
  final _key = GlobalKey();
  Timer? _hoverCloseTimer;
  bool _inside = false;

  void _toggle() => setState(() => _open = !_open);

  void _close() => setState(() => _open = false);

  void _scheduleHoverClose() {
    _hoverCloseTimer?.cancel();
    _hoverCloseTimer = Timer(kWashDropdownHoverCloseDelay, () {
      if (!_inside && _open) _close();
    });
  }

  @override
  void dispose() {
    _hoverCloseTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Focus(
      onKeyEvent: (_, event) {
        if (event is KeyDownEvent &&
            event.logicalKey == LogicalKeyboardKey.escape &&
            _open) {
          _close();
          return KeyEventResult.handled;
        }
        return KeyEventResult.ignored;
      },
      child: Listener(
        onPointerDown: (event) {
          if (!_open) return;
          final box = _key.currentContext?.findRenderObject() as RenderBox?;
          if (box == null) return;
          final rect = box.localToGlobal(Offset.zero) & box.size;
          if (!rect.contains(event.position)) _close();
        },
        child: MouseRegion(
          onEnter: widget.hoverOpen
              ? (_) {
                  _inside = true;
                  _hoverCloseTimer?.cancel();
                  setState(() => _open = true);
                }
              : null,
          onExit: widget.hoverOpen
              ? (_) {
                  _inside = false;
                  _scheduleHoverClose();
                }
              : null,
          child: KeyedSubtree(
            key: _key,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: widget.align.alignEnd
                  ? CrossAxisAlignment.end
                  : CrossAxisAlignment.start,
              children: [
                GestureDetector(onTap: _toggle, child: widget.summary),
                if (_open) ...[
                  const SizedBox(height: 4),
                  widget.panel,
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Default gallery / legacy preview dropdown.
class WashDropdownBasicDemo extends StatelessWidget {
  const WashDropdownBasicDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return WashDropdown(
      trigger: WashDropdownTriggerButton(
        label: 'Open menu',
        showChevron: true,
      ),
      panel: WashDropdownMenuPanel(
        items: washStandardPigmentMenuItems(onPick: () {}),
      ),
    );
  }
}

class WashDropdownTriggerButton extends StatelessWidget {
  const WashDropdownTriggerButton({
    required this.label,
    this.showChevron = false,
    this.size = WashButtonSize.md,
    this.variant = WashButtonVariant.defaultVariant,
    this.block = false,
    this.margin = true,
    super.key,
  });

  final String label;
  final bool showChevron;
  final WashButtonSize size;
  final WashButtonVariant variant;
  final bool block;
  final bool margin;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: margin ? const EdgeInsets.all(4) : EdgeInsets.zero,
      child: WashButton(
        size: size,
        variant: variant,
        block: block,
        onPressed: () {},
        child: Row(
          mainAxisSize: block ? MainAxisSize.max : MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Flexible(
              child: Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            if (showChevron) ...[
              const SizedBox(width: 6),
              WashIcon(
                WashIconGlyph.chevronDown,
                size: 16,
                color: WashTokens.of(context).onSurface.withValues(alpha: 0.7),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

Color washPigmentSwatchColor(String label) {
  return switch (label) {
    'Ultramarine' => const Color(0xFF2F4A9B),
    'Yellow ochre' => const Color(0xFFC48A28),
    'Alizarin' => const Color(0xFFB8432F),
    'Viridian' => const Color(0xFF2F7A68),
    _ => const Color(0xFF6B7280),
  };
}

Widget washPigmentSwatch(String label, {double size = 16}) {
  final c = washPigmentSwatchColor(label);
  return Container(
    width: size,
    height: size,
    decoration: BoxDecoration(
      shape: BoxShape.circle,
      border: Border.all(color: const Color(0x33000000)),
      gradient: RadialGradient(
        center: const Alignment(-0.3, -0.4),
        colors: [
          Color.lerp(c, const Color(0xFFFFFFFF), 0.7)!,
          c,
          Color.lerp(c, const Color(0xFF000000), 0.3)!,
        ],
        stops: const [0, 0.6, 1],
      ),
    ),
  );
}
