import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_modal_scope.dart';
import '../../tokens/wash_tokens.dart';

/// Tailwind `sm` breakpoint (matches daisyUI responsive modals).
const double kWashDialogSmBreakpoint = 640;

enum WashDialogPlacement {
  middle,
  top,
  bottom,
  start,
  end,

  /// `modal-bottom sm:modal-middle`
  responsive,
}

class WashDialogScope extends InheritedWidget {
  const WashDialogScope({
    required this.placement,
    required this.close,
    required super.child,
    super.key,
  });

  final WashDialogPlacement placement;
  final VoidCallback close;

  static WashDialogScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<WashDialogScope>();
  }

  @override
  bool updateShouldNotify(WashDialogScope oldWidget) {
    return placement != oldWidget.placement;
  }
}

WashDialogPlacement _resolveDialogPlacement(
  WashDialogPlacement placement,
  double width,
) {
  if (placement != WashDialogPlacement.responsive) return placement;
  return width >= kWashDialogSmBreakpoint
      ? WashDialogPlacement.middle
      : WashDialogPlacement.bottom;
}

/// Shows a daisyUI-style centered `modal` via [Overlay] (no Material).
Future<T?> showWashDialog<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool barrierDismissible = true,
  bool blocksBackground = true,
  WashDialogPlacement placement = WashDialogPlacement.middle,
  double? maxWidth,
}) {
  final overlay = Overlay.maybeOf(context, rootOverlay: true);
  if (overlay == null) {
    return Future.value(null);
  }

  final completer = Completer<T?>();
  late OverlayEntry entry;

  void close([T? result]) {
    if (!completer.isCompleted) {
      completer.complete(result);
    }
    entry.remove();
  }

  entry = OverlayEntry(
    builder: (overlayContext) {
      return _WashDialogOverlay<T>(
        barrierDismissible: barrierDismissible,
        blocksBackground: blocksBackground,
        placement: placement,
        maxWidth: maxWidth,
        onClose: close,
        child: Builder(builder: builder),
      );
    },
  );

  overlay.insert(entry);
  return completer.future;
}

class _WashDialogOverlay<T> extends StatefulWidget {
  const _WashDialogOverlay({
    required this.child,
    required this.onClose,
    required this.barrierDismissible,
    required this.blocksBackground,
    required this.placement,
    required this.maxWidth,
  });

  final Widget child;
  final void Function([T? result]) onClose;
  final bool barrierDismissible;
  final bool blocksBackground;
  final WashDialogPlacement placement;
  final double? maxWidth;

  @override
  State<_WashDialogOverlay<T>> createState() => _WashDialogOverlayState<T>();
}

class _WashDialogOverlayState<T> extends State<_WashDialogOverlay<T>> {
  final _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      widget.onClose();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  Alignment _alignmentFor(WashDialogPlacement p) {
    return switch (p) {
      WashDialogPlacement.top => Alignment.topCenter,
      WashDialogPlacement.bottom => Alignment.bottomCenter,
      WashDialogPlacement.start => Alignment.centerLeft,
      WashDialogPlacement.end => Alignment.centerRight,
      WashDialogPlacement.middle ||
      WashDialogPlacement.responsive =>
        Alignment.center,
    };
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final resolved = _resolveDialogPlacement(widget.placement, width);
    final tokens = WashTokens.of(context);

    Widget sheet = WashModalCloseScope(
      close: () => widget.onClose(),
      child: WashDialogScope(
        placement: resolved,
        close: () => widget.onClose(),
        child: widget.child,
      ),
    );

    final inset = resolved == WashDialogPlacement.bottom ? 0.0 : 24.0;
    sheet = Align(
      alignment: _alignmentFor(resolved),
      widthFactor: resolved == WashDialogPlacement.bottom ? 1 : null,
      child: Padding(
        padding: EdgeInsets.all(inset),
        child: widget.maxWidth != null
            ? ConstrainedBox(
                constraints: BoxConstraints(maxWidth: widget.maxWidth!),
                child: sheet,
              )
            : sheet,
      ),
    );

    return Focus(
      focusNode: _focusNode,
      autofocus: true,
      onKeyEvent: _onKey,
      child: Stack(
        fit: StackFit.expand,
        children: [
          if (widget.blocksBackground && widget.barrierDismissible)
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () => widget.onClose(),
                child: ColoredBox(
                  color: tokens.onSurface.withValues(alpha: 0.45),
                ),
              ),
            )
          else if (widget.blocksBackground)
            Positioned.fill(
              child: ColoredBox(
                color: tokens.onSurface.withValues(alpha: 0.45),
              ),
            )
          else if (widget.barrierDismissible)
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.translucent,
                onTap: () => widget.onClose(),
                child: const SizedBox.expand(),
              ),
            ),
          sheet,
        ],
      ),
    );
  }
}

/// Legacy checkbox toggle dialog (`modal-toggle` + label backdrop).
class WashCheckboxDialog extends StatefulWidget {
  const WashCheckboxDialog({
    required this.trigger,
    required this.dialog,
    super.key,
  });

  final Widget Function(VoidCallback open) trigger;
  final Widget dialog;

  @override
  State<WashCheckboxDialog> createState() => _WashCheckboxDialogState();
}

class _WashCheckboxDialogState extends State<WashCheckboxDialog> {
  OverlayEntry? _entry;

  void _open() {
    if (_entry != null) return;
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) return;
    _entry = OverlayEntry(
      builder: (ctx) => _WashDialogOverlay<void>(
        barrierDismissible: true,
        blocksBackground: true,
        placement: WashDialogPlacement.middle,
        maxWidth: null,
        onClose: ([_]) => _close(),
        child: widget.dialog,
      ),
    );
    overlay.insert(_entry!);
  }

  void _close() {
    _entry?.remove();
    _entry = null;
  }

  @override
  void dispose() {
    _close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return widget.trigger(_open);
  }
}

/// Inline `modal modal-open` preview (gallery force-open section).
class WashForcedModal extends StatelessWidget {
  const WashForcedModal({
    required this.open,
    required this.onClose,
    required this.child,
    super.key,
  });

  final bool open;
  final VoidCallback onClose;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (!open) return const SizedBox.shrink();
    final tokens = WashTokens.of(context);
    return Stack(
      fit: StackFit.passthrough,
      children: [
        Positioned.fill(
          child: GestureDetector(
            onTap: onClose,
            child: ColoredBox(
              color: tokens.onSurface.withValues(alpha: 0.45),
            ),
          ),
        ),
        Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: WashDialogScope(
              placement: WashDialogPlacement.middle,
              close: onClose,
              child: child,
            ),
          ),
        ),
      ],
    );
  }
}
