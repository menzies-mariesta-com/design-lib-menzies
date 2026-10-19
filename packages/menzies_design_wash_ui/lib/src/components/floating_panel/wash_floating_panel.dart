import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';
import '../button/wash_button.dart';

const double kWashFloatingDemoFrameHeight = 288;
const double kWashFloatingDemoFrameHeightSm = 320;
const double kWashFloatingSmBreakpoint = 640;

const double _titleReach = 48;
const double _defaultMinW = 200;
const double _defaultMinH = 120;

String? _washFloatingEscapeOwner;

class WashFloatingPanelRect {
  const WashFloatingPanelRect({
    required this.x,
    required this.y,
    required this.width,
    required this.height,
  });

  final double x;
  final double y;
  final double width;
  final double height;

  WashFloatingPanelRect copyWith({
    double? x,
    double? y,
    double? width,
    double? height,
  }) {
    return WashFloatingPanelRect(
      x: x ?? this.x,
      y: y ?? this.y,
      width: width ?? this.width,
      height: height ?? this.height,
    );
  }
}

enum WashFloatingPanelTint { none, ochre, rose }

/// Shared demo frame shell for gallery canvases.
class WashFloatingDemoFrame extends StatelessWidget {
  const WashFloatingDemoFrame({
    required this.child,
    this.tall = false,
    this.centerContent = false,
    super.key,
  });

  final Widget child;
  final bool tall;
  final bool centerContent;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final width = MediaQuery.sizeOf(context).width;
    final height = tall && width >= kWashFloatingSmBreakpoint
        ? kWashFloatingDemoFrameHeightSm + 64
        : (width >= kWashFloatingSmBreakpoint
            ? kWashFloatingDemoFrameHeightSm
            : kWashFloatingDemoFrameHeight);

    Widget body = ClipRRect(
      borderRadius: BorderRadius.circular(tokens.radiusBox),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.palette.base200.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
        child: Stack(
          clipBehavior: Clip.hardEdge,
          children: [child],
        ),
      ),
    );

    if (centerContent) {
      body = Center(child: body);
    }

    return SizedBox(
      width: double.infinity,
      height: height,
      child: body,
    );
  }
}

class WashFloatingDemoCanvas extends StatelessWidget {
  const WashFloatingDemoCanvas({required this.message, super.key});

  final String message;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Positioned.fill(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: DecoratedBox(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(
              color: tokens.inkBorder.withValues(alpha: 0.5),
              style: BorderStyle.solid,
            ),
            color: tokens.surface.withValues(alpha: 0.4),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Canvas', style: WashTypography.label(tokens.inkMuted)),
                const SizedBox(height: 8),
                Text(
                  message,
                  style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class WashFloatingPanel extends StatefulWidget {
  const WashFloatingPanel({
    required this.title,
    required this.child,
    this.open = true,
    this.onClose,
    this.onFocus,
    this.boundsKey,
    this.defaultRect,
    this.minWidth = _defaultMinW,
    this.minHeight = _defaultMinH,
    this.draggable = true,
    this.resizable = true,
    this.closeOnEscape = true,
    this.showReset = false,
    this.zIndex = 10,
    this.actions,
    this.panelTint = WashFloatingPanelTint.none,
    super.key,
  });

  final String title;
  final Widget child;
  final bool open;
  final VoidCallback? onClose;
  final VoidCallback? onFocus;
  final GlobalKey? boundsKey;
  final WashFloatingPanelRect? defaultRect;
  final double minWidth;
  final double minHeight;
  final bool draggable;
  final bool resizable;
  final bool closeOnEscape;
  final bool showReset;
  final int zIndex;
  final Widget? actions;
  final WashFloatingPanelTint panelTint;

  @override
  State<WashFloatingPanel> createState() => _WashFloatingPanelState();
}

class _WashFloatingPanelState extends State<WashFloatingPanel> {
  late WashFloatingPanelRect _rect;
  late WashFloatingPanelRect _default;
  bool _dragging = false;
  final _panelToken = UniqueKey().toString();
  _Interaction? _interaction;

  @override
  void initState() {
    super.initState();
    _default = _initialRect();
    _rect = _default;
    if (widget.open && widget.closeOnEscape && widget.onClose != null) {
      _washFloatingEscapeOwner = _panelToken;
    }
    HardwareKeyboard.instance.addHandler(_handleKey);
  }

  @override
  void didUpdateWidget(covariant WashFloatingPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.open && !oldWidget.open && widget.closeOnEscape && widget.onClose != null) {
      _washFloatingEscapeOwner = _panelToken;
    }
    if (!widget.open && _washFloatingEscapeOwner == _panelToken) {
      _washFloatingEscapeOwner = null;
    }
  }

  @override
  void dispose() {
    HardwareKeyboard.instance.removeHandler(_handleKey);
    if (_washFloatingEscapeOwner == _panelToken) {
      _washFloatingEscapeOwner = null;
    }
    super.dispose();
  }

  bool _handleKey(KeyEvent event) {
    if (event is! KeyDownEvent) return false;
    if (event.logicalKey != LogicalKeyboardKey.escape) return false;
    if (!widget.closeOnEscape || widget.onClose == null) return false;
    if (_washFloatingEscapeOwner != _panelToken) return false;
    widget.onClose!();
    return true;
  }

  WashFloatingPanelRect _initialRect() {
    final d = widget.defaultRect;
    return WashFloatingPanelRect(
      x: d?.x ?? 24,
      y: d?.y ?? 24,
      width: d?.width ?? 288,
      height: d?.height ?? 200,
    );
  }

  Size _readBounds() {
    final ctx = widget.boundsKey?.currentContext;
    if (ctx != null) {
      final box = ctx.findRenderObject() as RenderBox?;
      if (box != null && box.hasSize) {
        return box.size;
      }
    }
    return MediaQuery.sizeOf(context);
  }

  WashFloatingPanelRect _clamp(WashFloatingPanelRect next) {
    final bounds = _readBounds();
    final width = next.width.clamp(widget.minWidth, bounds.width);
    final height = next.height.clamp(widget.minHeight, bounds.height);
    final maxX = (bounds.width - _titleReach).clamp(0.0, double.infinity);
    final maxY = (bounds.height - _titleReach).clamp(0.0, double.infinity);
    final xMin = -(width - _titleReach);
    final x = next.x.clamp(xMin, maxX);
    final y = next.y.clamp(0.0, maxY);
    return WashFloatingPanelRect(x: x, y: y, width: width, height: height);
  }

  void _bringForward() {
    widget.onFocus?.call();
    if (widget.closeOnEscape && widget.onClose != null) {
      _washFloatingEscapeOwner = _panelToken;
    }
  }

  void _resetRect() {
    setState(() {
      _default = _initialRect();
      _rect = _clamp(_default);
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.open) return const SizedBox.shrink();

    final tokens = WashTokens.of(context);
    final panelFill = switch (widget.panelTint) {
      WashFloatingPanelTint.ochre => const Color(0xFFE8C47A).withValues(alpha: 0.14),
      WashFloatingPanelTint.rose => const Color(0xFFE8A0B0).withValues(alpha: 0.14),
      WashFloatingPanelTint.none => tokens.surface,
    };

    return Positioned(
      left: _rect.x,
      top: _rect.y,
      width: _rect.width,
      height: _rect.height,
      child: Listener(
        onPointerDown: (_) => _bringForward(),
        onPointerMove: _onDragUpdate,
        onPointerUp: _onDragEnd,
        onPointerCancel: _onPointerCancel,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            DecoratedBox(
              decoration: BoxDecoration(boxShadow: washPaperShadowSm(tokens)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(tokens.radiusBox),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: Color.alphaBlend(panelFill, tokens.surface),
                    borderRadius: BorderRadius.circular(tokens.radiusBox),
                    border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _TitleBar(
                        title: widget.title,
                        draggable: widget.draggable,
                        dragging: _dragging,
                        onDragStart: _onTitleDragStart,
                        actions: widget.actions,
                        showReset: widget.showReset,
                        onReset: _resetRect,
                        onClose: widget.onClose,
                      ),
                      Expanded(
                        child: SingleChildScrollView(
                          padding: const EdgeInsets.all(12),
                          child: DefaultTextStyle(
                            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                            child: widget.child,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            if (widget.resizable) ..._resizeHandles(),
          ],
        ),
      ),
    );
  }

  List<Widget> _resizeHandles() {
    const edges = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
    return edges.map((edge) {
      final isCorner = edge.length == 2;
      final w = isCorner ? 10.0 : (edge == 'n' || edge == 's' ? null : 8.0);
      final h = isCorner ? 10.0 : (edge == 'e' || edge == 'w' ? null : 8.0);
      return Positioned(
        left: edge.contains('w') ? 0 : (edge.contains('e') ? null : 8),
        right: edge.contains('e') ? 0 : (edge.contains('w') ? null : 8),
        top: edge.contains('n') ? 0 : (edge.contains('s') ? null : 8),
        bottom: edge.contains('s') ? 0 : (edge.contains('n') ? null : 8),
        width: w,
        height: h,
        child: Listener(
          behavior: HitTestBehavior.translucent,
          onPointerDown: (e) => _onResizeStart(edge, e),
          child: const SizedBox(width: 8, height: 8),
        ),
      );
    }).toList();
  }

  void _onTitleDragStart(PointerDownEvent e) {
    if (!widget.draggable || e.buttons != 1) return;
    _bringForward();
    _dragging = true;
    _interaction = _Interaction.drag(
      pointer: e.pointer,
      startX: e.position.dx,
      startY: e.position.dy,
      orig: _rect,
    );
  }

  void _onDragUpdate(PointerMoveEvent e) {
    final active = _interaction;
    if (active == null || active.pointer != e.pointer) return;
    if (active.kind == _InteractionKind.drag) {
      final dx = e.position.dx - active.startX;
      final dy = e.position.dy - active.startY;
      setState(() {
        _rect = _clamp(active.orig.copyWith(
          x: active.orig.x + dx,
          y: active.orig.y + dy,
        ));
      });
    } else if (active.kind == _InteractionKind.resize) {
      _applyResize(active, e.position.dx, e.position.dy);
    }
  }

  void _onDragEnd(PointerUpEvent e) {
    if (_interaction?.pointer == e.pointer) {
      _interaction = null;
      _dragging = false;
    }
  }

  void _onPointerCancel(PointerCancelEvent e) {
    if (_interaction?.pointer == e.pointer) {
      _interaction = null;
      _dragging = false;
    }
  }

  void _applyResize(_Interaction active, double x, double y) {
    final dx = x - active.startX;
    final dy = y - active.startY;
    final edge = active.edge!;
    var next = active.orig;
    var w = next.width;
    var h = next.height;
    var nx = next.x;
    var ny = next.y;

    if (edge.contains('e')) w = next.width + dx;
    if (edge.contains('s')) h = next.height + dy;
    if (edge.contains('w')) {
      w = next.width - dx;
      nx = next.x + dx;
    }
    if (edge.contains('n')) {
      h = next.height - dy;
      ny = next.y + dy;
    }

    final bounds = _readBounds();
    w = w.clamp(widget.minWidth, bounds.width);
    h = h.clamp(widget.minHeight, bounds.height);
    if (edge.contains('w')) nx = next.x + (next.width - w);
    if (edge.contains('n')) ny = next.y + (next.height - h);

    setState(() => _rect = _clamp(WashFloatingPanelRect(x: nx, y: ny, width: w, height: h)));
  }

  void _onResizeStart(String edge, PointerDownEvent e) {
    if (!widget.resizable || e.buttons != 1) return;
    _bringForward();
    _dragging = true;
    _interaction = _Interaction.resize(
      pointer: e.pointer,
      edge: edge,
      startX: e.position.dx,
      startY: e.position.dy,
      orig: _rect,
    );
  }
}

enum _InteractionKind { drag, resize }

class _Interaction {
  _Interaction._({
    required this.kind,
    required this.pointer,
    required this.startX,
    required this.startY,
    required this.orig,
    this.edge,
  });

  final _InteractionKind kind;
  final int pointer;
  final double startX;
  final double startY;
  final WashFloatingPanelRect orig;
  final String? edge;

  factory _Interaction.drag({
    required int pointer,
    required double startX,
    required double startY,
    required WashFloatingPanelRect orig,
  }) {
    return _Interaction._(
      kind: _InteractionKind.drag,
      pointer: pointer,
      startX: startX,
      startY: startY,
      orig: orig,
    );
  }

  factory _Interaction.resize({
    required int pointer,
    required String edge,
    required double startX,
    required double startY,
    required WashFloatingPanelRect orig,
  }) {
    return _Interaction._(
      kind: _InteractionKind.resize,
      pointer: pointer,
      startX: startX,
      startY: startY,
      orig: orig,
      edge: edge,
    );
  }
}

class _TitleBar extends StatelessWidget {
  const _TitleBar({
    required this.title,
    required this.draggable,
    required this.dragging,
    required this.onDragStart,
    this.actions,
    this.showReset = false,
    this.onReset,
    this.onClose,
  });

  final String title;
  final bool draggable;
  final bool dragging;
  final void Function(PointerDownEvent) onDragStart;
  final Widget? actions;
  final bool showReset;
  final VoidCallback? onReset;
  final VoidCallback? onClose;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final cursor = draggable
        ? (dragging ? SystemMouseCursors.grabbing : SystemMouseCursors.grab)
        : SystemMouseCursors.basic;

    return Listener(
      onPointerDown: onDragStart,
      child: MouseRegion(
        cursor: cursor,
        child: DecoratedBox(
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.7)),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            child: Row(
              children: [
                if (draggable)
                  WashLucideIcon('grip-horizontal', size: 16, color: tokens.inkMuted),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    child: Text(
                      title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                Flexible(
                  child: Wrap(
                    alignment: WrapAlignment.end,
                    spacing: 2,
                    children: [
                      if (actions != null) actions!,
                      if (showReset)
                        WashTooltip(
                          message: 'Reset position',
                          prefer: WashTooltipSide.bottom,
                          child: WashButton(
                            size: WashButtonSize.xs,
                            variant: WashButtonVariant.secondary,
                            square: true,
                            onPressed: () => onReset?.call(),
                            child: const WashLucideIcon('rotate-ccw', size: 14),
                          ),
                        ),
                      if (onClose != null)
                        WashTooltip(
                          message: 'Close',
                          prefer: WashTooltipSide.left,
                          child: WashButton(
                            size: WashButtonSize.xs,
                            variant: WashButtonVariant.error,
                            square: true,
                            onPressed: () => onClose?.call(),
                            child: const WashLucideIcon('x', size: 14),
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
