import 'dart:async';
import 'dart:ui' show PointerDeviceKind;

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_link.dart';

enum WashPreviewLinkTone { blue, ochre, rose, sage }

const _showDelayMs = 250;
const _hideDelayMs = 180;
const _longPressMs = 480;
const _previewGap = 8.0;
const _previewPad = 8.0;
const _previewWidth = 288.0;
const _previewHeight = 220.0;

/// Hover/focus delayed wash preview card (LinksPage PreviewLink).
class WashPreviewLink extends StatefulWidget {
  const WashPreviewLink({
    required this.title,
    required this.description,
    required this.child,
    this.onTap,
    this.tone = WashPreviewLinkTone.blue,
    this.plateLabel,
    this.linkTone = WashLinkTone.primary,
    this.hoverUnderline = false,
    super.key,
  });

  final String title;
  final String description;
  final Widget child;
  final VoidCallback? onTap;
  final WashPreviewLinkTone tone;
  final String? plateLabel;
  final WashLinkTone linkTone;
  final bool hoverUnderline;

  @override
  State<WashPreviewLink> createState() => _WashPreviewLinkState();
}

class _WashPreviewLinkState extends State<WashPreviewLink> {
  final _anchorKey = GlobalKey();
  final _focusNode = FocusNode();
  OverlayEntry? _entry;
  Timer? _showTimer;
  Timer? _hideTimer;
  Timer? _longPressTimer;
  Offset? _longPressOrigin;
  bool _pinned = false;
  bool _open = false;
  bool _coarseTap = false;
  _PreviewPos? _pos;

  @override
  void dispose() {
    _clearTimers();
    _removeOverlay();
    _focusNode.dispose();
    super.dispose();
  }

  void _clearTimers() {
    _showTimer?.cancel();
    _showTimer = null;
    _hideTimer?.cancel();
    _hideTimer = null;
    _longPressTimer?.cancel();
    _longPressTimer = null;
    _longPressOrigin = null;
  }

  void _removeOverlay() {
    _entry?.remove();
    _entry = null;
  }

  void _close() {
    _clearTimers();
    _pinned = false;
    _open = false;
    _pos = null;
    _removeOverlay();
    setState(() {});
  }

  Rect? _anchorRect() {
    final box = _anchorKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return null;
    final offset = box.localToGlobal(Offset.zero);
    return offset & box.size;
  }

  void _measureAndOpen() {
    final rect = _anchorRect();
    if (rect == null) return;
    final overlayBox =
        Overlay.of(context).context.findRenderObject() as RenderBox?;
    final viewport = overlayBox != null
        ? Offset.zero & overlayBox.size
        : Rect.fromLTWH(0, 0, 400, 800);
    _pos = _placePreviewNearAnchor(
      rect,
      _previewWidth,
      _previewHeight,
      viewport,
    );
    _open = true;
    _insertOverlay();
    setState(() {});
  }

  void _scheduleShow() {
    _hideTimer?.cancel();
    _hideTimer = null;
    if (_open || _pinned) return;
    _showTimer?.cancel();
    _showTimer = Timer(
      const Duration(milliseconds: _showDelayMs),
      () {
        _showTimer = null;
        if (!mounted) return;
        _measureAndOpen();
      },
    );
  }

  void _scheduleHide() {
    if (_pinned) return;
    _showTimer?.cancel();
    _showTimer = null;
    _hideTimer?.cancel();
    _hideTimer = Timer(const Duration(milliseconds: _hideDelayMs), () {
      _hideTimer = null;
      if (!mounted) return;
      _open = false;
      _pos = null;
      _removeOverlay();
      setState(() {});
    });
  }

  void _insertOverlay() {
    _removeOverlay();
    final pos = _pos;
    if (pos == null) return;
    final tokens = WashTokens.of(context);
    _entry = OverlayEntry(
      builder: (context) => Positioned(
        left: pos.x,
        top: pos.y,
        width: _previewWidth.clamp(0, MediaQuery.sizeOf(context).width - 16),
        child: _PreviewCard(
          title: widget.title,
          description: widget.description,
          tone: widget.tone,
          plateLabel: widget.plateLabel ?? widget.title,
          tokens: tokens,
          onEnter: () => _hideTimer?.cancel(),
          onLeave: _scheduleHide,
        ),
      ),
    );
    Overlay.of(context).insert(_entry!);
  }

  void _onPointerDown(PointerDownEvent event) {
    _coarseTap = event.kind == PointerDeviceKind.touch ||
        event.kind == PointerDeviceKind.stylus;
    if (!_coarseTap) {
      return;
    }
    _longPressTimer?.cancel();
    _longPressOrigin = event.position;
    _longPressTimer = Timer(const Duration(milliseconds: _longPressMs), () {
      _longPressTimer = null;
      _pinned = true;
      _measureAndOpen();
    });
  }

  void _onPointerMove(PointerMoveEvent event) {
    final origin = _longPressOrigin;
    if (origin == null) return;
    final dx = event.position.dx - origin.dx;
    final dy = event.position.dy - origin.dy;
    if (dx * dx + dy * dy > 36) {
      _longPressTimer?.cancel();
      _longPressTimer = null;
      _longPressOrigin = null;
    }
  }

  void _onPointerUp(PointerUpEvent event) {
    _clearLongPressGesture();
  }

  void _clearLongPressGesture() {
    _longPressTimer?.cancel();
    _longPressTimer = null;
    _longPressOrigin = null;
  }

  void _onTap() {
    if (!_coarseTap) {
      widget.onTap?.call();
      return;
    }
    if (_pinned && _open) {
      _close();
      return;
    }
    _clearTimers();
    _pinned = true;
    _measureAndOpen();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    if (event.logicalKey == LogicalKeyboardKey.escape && _open) {
      _close();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final hoverCapable = MediaQuery.maybeOf(context)?.accessibleNavigation != true;

    return Focus(
      focusNode: _focusNode,
      onKeyEvent: _onKey,
      onFocusChange: (focused) {
        if (focused) {
          _scheduleShow();
        } else {
          _scheduleHide();
        }
      },
      child: Listener(
        onPointerDown: _onPointerDown,
        onPointerMove: _onPointerMove,
        onPointerUp: _onPointerUp,
        onPointerCancel: (_) => _clearLongPressGesture(),
        child: MouseRegion(
          onEnter: hoverCapable ? (_) => _scheduleShow() : null,
          onExit: hoverCapable ? (_) => _scheduleHide() : null,
          child: KeyedSubtree(
          key: _anchorKey,
          child: WashLink(
            onTap: _onTap,
            tone: widget.linkTone,
            hoverUnderline: widget.hoverUnderline,
            child: widget.child,
          ),
        ),
        ),
      ),
    );
  }
}

class _PreviewPos {
  const _PreviewPos({required this.x, required this.y, required this.above});

  final double x;
  final double y;
  final bool above;
}

_PreviewPos _placePreviewNearAnchor(
  Rect rect,
  double width,
  double height,
  Rect viewport,
) {
  final vw = viewport.width;
  final vh = viewport.height;
  final spaceBelow = vh - rect.bottom - _previewPad;
  final spaceAbove = rect.top - _previewPad;
  final above =
      spaceBelow < height.clamp(0, vh * 0.45) && spaceAbove > spaceBelow;

  final y = above ? rect.top - height - _previewGap : rect.bottom + _previewGap;
  final rawX = rect.left + width + _previewPad > vw ? rect.right - width : rect.left;
  final x = rawX < _previewPad ? _previewPad : rawX;

  final maxX = (vw - width - _previewPad).clamp(_previewPad, vw);
  final maxY = (vh - height - _previewPad).clamp(_previewPad, vh);
  return _PreviewPos(
    x: x.clamp(_previewPad, maxX),
    y: y.clamp(_previewPad, maxY),
    above: above,
  );
}

class _PreviewCard extends StatelessWidget {
  const _PreviewCard({
    required this.title,
    required this.description,
    required this.tone,
    required this.plateLabel,
    required this.tokens,
    required this.onEnter,
    required this.onLeave,
  });

  final String title;
  final String description;
  final WashPreviewLinkTone tone;
  final String plateLabel;
  final WashTokens tokens;
  final VoidCallback onEnter;
  final VoidCallback onLeave;

  Color _panelWash(WashTokens tokens, WashPreviewLinkTone tone) {
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    return switch (tone) {
      WashPreviewLinkTone.blue => atmo.washA,
      WashPreviewLinkTone.ochre => atmo.washB,
      WashPreviewLinkTone.rose => atmo.washC,
      WashPreviewLinkTone.sage => atmo.washA,
    };
  }

  @override
  Widget build(BuildContext context) {
    final wash = _panelWash(tokens, tone);
    final fill = Color.alphaBlend(wash.withValues(alpha: 0.22), tokens.surface);
    return MouseRegion(
      onEnter: (_) => onEnter(),
      onExit: (_) => onLeave(),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: fill,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: [
            ...washPaperShadowSm(tokens),
            BoxShadow(
              color: tokens.onSurface.withValues(alpha: 0.1),
              offset: const Offset(0, 12),
              blurRadius: 28,
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AspectRatio(
                aspectRatio: 16 / 9,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        color: tokens.inkBorder.withValues(alpha: 0.5),
                      ),
                    ),
                  ),
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      DecoratedBox(
                        decoration: BoxDecoration(gradient: _plateGradient(tone)),
                      ),
                      const DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: RadialGradient(
                            center: Alignment(-0.4, -0.3),
                            radius: 0.85,
                            colors: [
                              Color(0x8CFFFFFF),
                              Color(0x00FFFFFF),
                            ],
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomCenter,
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Text(
                            plateLabel,
                            textAlign: TextAlign.center,
                            style: WashTypography.title(tokens.onSurface).copyWith(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: tokens.onSurface.withValues(alpha: 0.7),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: WashTypography.title(tokens.onSurface).copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        height: 1.25,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 12,
                        height: 1.45,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  LinearGradient _plateGradient(WashPreviewLinkTone tone) {
    switch (tone) {
      case WashPreviewLinkTone.blue:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xE6BAE6F9), Color(0xFFE0F2FE), Color(0xFFE7E5E4)],
        );
      case WashPreviewLinkTone.ochre:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xE6FDE68A), Color(0xFFFFEDD5), Color(0xFFE7E5E4)],
        );
      case WashPreviewLinkTone.rose:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xE6FECDD3), Color(0xFFFCE7F3), Color(0xFFE7E5E4)],
        );
      case WashPreviewLinkTone.sage:
        return const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xCCA7F3D0), Color(0xFFECFCCB), Color(0xFFE7E5E4)],
        );
    }
  }
}
