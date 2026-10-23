import 'dart:async';

import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/context_menu_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Menu panel width (`w-52`).
const double kWashContextMenuWidth = 208;

const double kWashContextMenuLongPressMoveCancelPx2 = 36;

/// Open / close / reposition state for a portaled context menu.
class WashContextMenuController extends ChangeNotifier {
  Offset? _menuOffset;
  Offset? _cursorGlobal;

  Offset? get menuOffset => _menuOffset;

  bool get isOpen => _menuOffset != null;

  void openAt(Offset global, Size viewport) {
    _cursorGlobal = global;
    _menuOffset = WashContextMenuPlacement.placeNearCursor(
      cursor: global,
      menuSize: const Size(kWashContextMenuWidth, 220),
      viewport: viewport,
    );
    notifyListeners();
  }

  void close() {
    if (_menuOffset == null) return;
    _cursorGlobal = null;
    _menuOffset = null;
    notifyListeners();
  }

  void reposition(Size menuSize, Size viewport) {
    final cursor = _cursorGlobal;
    final current = _menuOffset;
    if (cursor == null || current == null) return;
    final next = WashContextMenuPlacement.placeNearCursor(
      cursor: cursor,
      menuSize: menuSize,
      viewport: viewport,
    );
    if (next != current) {
      _menuOffset = next;
      notifyListeners();
    }
  }
}

/// Portaled daisyUI-style `menu` fixed near the pointer.
class WashContextMenu extends StatefulWidget {
  const WashContextMenu({
    required this.controller,
    required this.menuLabel,
    required this.child,
    this.width = kWashContextMenuWidth,
    super.key,
  });

  final WashContextMenuController controller;
  final String menuLabel;
  final Widget child;
  final double width;

  @override
  State<WashContextMenu> createState() => _WashContextMenuState();
}

class _WashContextMenuState extends State<WashContextMenu> {
  final _menuKey = GlobalKey();
  OverlayEntry? _entry;

  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_onController);
  }

  @override
  void didUpdateWidget(covariant WashContextMenu oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_onController);
      widget.controller.addListener(_onController);
    }
  }

  @override
  void dispose() {
    widget.controller.removeListener(_onController);
    _removeOverlay();
    super.dispose();
  }

  void _onController() {
    if (widget.controller.isOpen) {
      _insertOverlay();
      WidgetsBinding.instance.addPostFrameCallback((_) => _remeasure());
    } else {
      _removeOverlay();
    }
  }

  void _remeasure() {
    if (!widget.controller.isOpen) return;
    final box = _menuKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return;
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    final viewportBox = overlay.context.findRenderObject() as RenderBox?;
    final viewport =
        viewportBox == null ? MediaQuery.sizeOf(context) : viewportBox.size;
    widget.controller.reposition(box.size, viewport);
    _entry?.markNeedsBuild();
  }

  void _insertOverlay() {
    _removeOverlay();
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _entry = OverlayEntry(
      builder: (overlayContext) {
        final pos = widget.controller.menuOffset;
        if (pos == null) return const SizedBox.shrink();
        final tokens = WashTokens.of(overlayContext);
        return NotificationListener<ScrollNotification>(
          onNotification: (_) {
            widget.controller.close();
            return false;
          },
          child: Stack(
            children: [
              Positioned.fill(
                child: Listener(
                  behavior: HitTestBehavior.translucent,
                  onPointerDown: (event) {
                    final menuBox = _menuKey.currentContext?.findRenderObject()
                        as RenderBox?;
                    if (menuBox == null) {
                      widget.controller.close();
                      return;
                    }
                    final menuOrigin = menuBox.localToGlobal(Offset.zero);
                    final menuRect = menuOrigin & menuBox.size;
                    if (!menuRect.contains(event.position)) {
                      widget.controller.close();
                    }
                  },
                ),
              ),
              Positioned(
                left: pos.dx,
                top: pos.dy,
                child: Semantics(
                  container: true,
                  label: widget.menuLabel,
                  child: Focus(
                    autofocus: true,
                    onKeyEvent: (node, event) {
                      if (event is KeyDownEvent &&
                          event.logicalKey == LogicalKeyboardKey.escape) {
                        widget.controller.close();
                        return KeyEventResult.handled;
                      }
                      return KeyEventResult.ignored;
                    },
                    child: KeyedSubtree(
                      key: _menuKey,
                      child: _WashContextMenuShell(
                        width: widget.width,
                        tokens: tokens,
                        child: widget.child,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
    overlay.insert(_entry!);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final pos = widget.controller.menuOffset;
      if (pos == null) return;
      _remeasure();
    });
  }

  void _removeOverlay() {
    _entry?.remove();
    _entry = null;
  }

  @override
  Widget build(BuildContext context) {
    return const SizedBox.shrink();
  }
}

class _WashContextMenuShell extends StatelessWidget {
  const _WashContextMenuShell({
    required this.width,
    required this.tokens,
    required this.child,
  });

  final double width;
  final WashTokens tokens;
  final Widget child;

  @override
  Widget build(BuildContext context) {
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
          padding: const EdgeInsets.all(8),
          child: DefaultTextStyle(
            style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 14),
            child: child,
          ),
        ),
      ),
    );
  }
}

/// Section title row (`menu-title`).
class WashContextMenuTitle extends StatelessWidget {
  const WashContextMenuTitle(this.label, {super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: Text(
        label,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.4,
        ),
      ),
    );
  }
}

/// Single menu row (`role="menuitem"`).
class WashContextMenuItem extends StatelessWidget {
  const WashContextMenuItem({
    required this.label,
    this.onTap,
    this.leading,
    this.trailing,
    this.destructive = false,
    this.active = false,
    super.key,
  });

  final String label;
  final VoidCallback? onTap;
  final Widget? leading;
  final Widget? trailing;
  final bool destructive;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = destructive ? tokens.error : tokens.onSurface;
    final bg = active ? tokens.primary.withValues(alpha: 0.14) : null;
    return WashRipple(
      onTap: onTap,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              if (leading != null) ...[leading!, const SizedBox(width: 8)],
              Expanded(
                child: Text(
                  label,
                  style: WashTypography.body(color).copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              if (trailing != null) trailing!,
            ],
          ),
        ),
      ),
    );
  }
}

/// Right-click, long-press, and keyboard open handlers for a context menu surface.
class WashContextMenuSurface extends StatefulWidget {
  const WashContextMenuSurface({
    required this.controller,
    required this.child,
    this.semanticsLabel,
    super.key,
  });

  final WashContextMenuController controller;
  final Widget child;
  final String? semanticsLabel;

  @override
  State<WashContextMenuSurface> createState() => _WashContextMenuSurfaceState();
}

class _WashContextMenuSurfaceState extends State<WashContextMenuSurface> {
  final _focusNode = FocusNode();
  Timer? _longPressTimer;
  Offset? _longPressOrigin;

  @override
  void dispose() {
    _clearLongPress();
    _focusNode.dispose();
    super.dispose();
  }

  void _clearLongPress() {
    _longPressTimer?.cancel();
    _longPressTimer = null;
    _longPressOrigin = null;
  }

  Size _viewport() => MediaQuery.sizeOf(context);

  void _openAt(Offset global) {
    widget.controller.openAt(global, _viewport());
  }

  void _onSecondaryTapDown(TapDownDetails details) {
    _clearLongPress();
    _openAt(details.globalPosition);
  }

  Offset? _globalFromLocal(Offset local) {
    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return null;
    return box.localToGlobal(local);
  }

  void _onPointerDown(PointerDownEvent event) {
    if (event.buttons == kSecondaryMouseButton) return;
    final kind = event.kind;
    if (kind == PointerDeviceKind.touch || kind == PointerDeviceKind.stylus) {
      _clearLongPress();
      _longPressOrigin = _globalFromLocal(event.localPosition);
      _longPressTimer = Timer(
        const Duration(milliseconds: kWashContextMenuLongPressMs),
        () {
          final origin = _longPressOrigin;
          if (origin != null) _openAt(origin);
          _clearLongPress();
        },
      );
    }
  }

  void _onPointerMove(PointerMoveEvent event) {
    final origin = _longPressOrigin;
    if (origin == null) return;
    final global = _globalFromLocal(event.localPosition);
    if (global == null) return;
    final dx = global.dx - origin.dx;
    final dy = global.dy - origin.dy;
    if (dx * dx + dy * dy > kWashContextMenuLongPressMoveCancelPx2) {
      _clearLongPress();
    }
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      widget.controller.close();
      return KeyEventResult.handled;
    }
    final shiftF10 = event.logicalKey == LogicalKeyboardKey.f10 &&
        HardwareKeyboard.instance.isShiftPressed;
    final contextMenuKey = event.logicalKey == LogicalKeyboardKey.contextMenu;
    if (shiftF10 || contextMenuKey) {
      final box = context.findRenderObject() as RenderBox?;
      if (box != null && box.hasSize) {
        final rect = box.localToGlobal(Offset.zero) & box.size;
        _openAt(rect.center);
      }
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    return Focus(
      focusNode: _focusNode,
      onKeyEvent: _onKey,
      child: Listener(
        behavior: HitTestBehavior.opaque,
        onPointerDown: _onPointerDown,
        onPointerMove: _onPointerMove,
        onPointerUp: (_) => _clearLongPress(),
        onPointerCancel: (_) => _clearLongPress(),
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onSecondaryTapDown: _onSecondaryTapDown,
          child: Semantics(
            label: widget.semanticsLabel,
            container: true,
            child: widget.child,
          ),
        ),
      ),
    );
  }
}

/// Compact legacy / registry preview: basic open surface.
class WashContextMenuLegacyPreview extends StatefulWidget {
  const WashContextMenuLegacyPreview({super.key});

  @override
  State<WashContextMenuLegacyPreview> createState() =>
      _WashContextMenuLegacyPreviewState();
}

class _WashContextMenuLegacyPreviewState
    extends State<WashContextMenuLegacyPreview> {
  final _controller = WashContextMenuController();
  String _last = 'None yet';

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _pick(String label) {
    setState(() => _last = label);
    _controller.close();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashContextMenu(
            controller: _controller,
            menuLabel: 'Context menu',
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                WashContextMenuItem(label: 'Open', onTap: () => _pick('Open')),
                WashContextMenuItem(
                    label: 'Rename', onTap: () => _pick('Rename')),
              ],
            )),
        WashContextMenuSurface(
          controller: _controller,
          semanticsLabel: 'Right-click for context menu',
          child: Container(
            constraints: const BoxConstraints(minHeight: 120),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: tokens.inkBorder.withValues(alpha: 0.7),
                style: BorderStyle.solid,
              ),
              color: tokens.surfaceContainer.withValues(alpha: 0.3),
            ),
            padding: const EdgeInsets.all(16),
            child: Text(
              'Right-click or long-press',
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Last: $_last',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
        ),
      ],
    );
  }
}
