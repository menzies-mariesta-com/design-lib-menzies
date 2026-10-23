import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_modal_scope.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../button/wash_button.dart';

/// Tailwind `sm` breakpoint (matches daisyUI responsive modals).
const double kWashBottomSheetSmBreakpoint = 640;

enum WashBottomSheetPlacement {
  bottom,
  middle,

  /// `modal-bottom sm:modal-middle`
  responsive,
}

class WashBottomSheetScope extends InheritedWidget {
  const WashBottomSheetScope({
    required this.placement,
    required this.close,
    required super.child,
    super.key,
  });

  final WashBottomSheetPlacement placement;
  final VoidCallback close;

  static WashBottomSheetScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<WashBottomSheetScope>();
  }

  @override
  bool updateShouldNotify(WashBottomSheetScope oldWidget) {
    return placement != oldWidget.placement;
  }
}

WashBottomSheetPlacement _resolvePlacement(
  WashBottomSheetPlacement placement,
  double width,
) {
  if (placement != WashBottomSheetPlacement.responsive) return placement;
  return width >= kWashBottomSheetSmBreakpoint
      ? WashBottomSheetPlacement.middle
      : WashBottomSheetPlacement.bottom;
}

/// Shows a daisyUI-style `modal modal-bottom` sheet via [Overlay] (no Material).
Future<T?> showWashBottomSheet<T>({
  required BuildContext context,
  required Widget child,
  bool barrierDismissible = true,
  bool blocksBackground = true,
  WashBottomSheetPlacement placement = WashBottomSheetPlacement.bottom,
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
      return _WashBottomSheetOverlay<T>(
        barrierDismissible: barrierDismissible,
        blocksBackground: blocksBackground,
        placement: placement,
        onClose: close,
        child: child,
      );
    },
  );

  overlay.insert(entry);
  return completer.future;
}

class _WashBottomSheetOverlay<T> extends StatefulWidget {
  const _WashBottomSheetOverlay({
    required this.child,
    required this.onClose,
    required this.barrierDismissible,
    required this.blocksBackground,
    required this.placement,
  });

  final Widget child;
  final void Function([T? result]) onClose;
  final bool barrierDismissible;
  final bool blocksBackground;
  final WashBottomSheetPlacement placement;

  @override
  State<_WashBottomSheetOverlay<T>> createState() =>
      _WashBottomSheetOverlayState<T>();
}

class _WashBottomSheetOverlayState<T>
    extends State<_WashBottomSheetOverlay<T>> {
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

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final resolved = _resolvePlacement(widget.placement, width);
    final tokens = WashTokens.of(context);

    Widget sheet = WashModalCloseScope(
      close: () => widget.onClose(),
      child: WashBottomSheetScope(
        placement: resolved,
        close: () => widget.onClose(),
        child: widget.child,
      ),
    );

    if (resolved == WashBottomSheetPlacement.bottom) {
      sheet = Align(
        alignment: Alignment.bottomCenter,
        widthFactor: 1,
        child: sheet,
      );
    } else {
      sheet = Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: sheet,
        ),
      );
    }

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
            ),
          if (!widget.blocksBackground && widget.barrierDismissible)
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

/// Pass-through host for sheet body (used by legacy catalog API).
class WashBottomSheet extends StatelessWidget {
  const WashBottomSheet({required this.child, super.key});

  final Widget child;

  static Future<void> show(BuildContext context, Widget child) {
    return showWashBottomSheet<void>(
      context: context,
      child: WashBottomSheet(child: child),
    );
  }

  @override
  Widget build(BuildContext context) => child;
}

/// `modal-box` for bottom sheets and responsive modals.
class WashModalBox extends StatelessWidget {
  const WashModalBox({
    required this.child,
    this.height,
    this.maxHeight,
    this.width,
    this.scrollable = false,
    this.padding = const EdgeInsets.all(20),
    this.dialogStyle = false,
    super.key,
  });

  final Widget child;
  final double? height;
  final double? maxHeight;
  final double? width;
  final bool scrollable;
  final EdgeInsets padding;

  /// When true, uses centered dialog radii (all corners) instead of bottom sheet.
  final bool dialogStyle;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final scope = WashBottomSheetScope.maybeOf(context);
    final placement = scope?.placement ?? WashBottomSheetPlacement.bottom;
    final bool bottom;
    if (scope != null) {
      bottom = !dialogStyle && placement == WashBottomSheetPlacement.bottom;
    } else {
      bottom = !dialogStyle;
    }

    final radius = BorderRadius.only(
      topLeft: Radius.circular(tokens.radiusBox),
      topRight: Radius.circular(tokens.radiusBox),
      bottomLeft: bottom ? Radius.zero : Radius.circular(tokens.radiusBox),
      bottomRight: bottom ? Radius.zero : Radius.circular(tokens.radiusBox),
    );

    Widget body = child;
    if (scrollable) {
      body = SingleChildScrollView(child: body);
    }

    final maxW = dialogStyle
        ? (width ?? 420)
        : (bottom ? width ?? double.infinity : (width ?? 420));
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: maxW,
        minWidth: bottom ? 0 : 280,
        maxHeight: maxHeight ??
            (bottom ? MediaQuery.sizeOf(context).height * 0.92 : 600),
        minHeight: height ?? 0,
      ),
      child: SizedBox(
        width: bottom ? double.infinity : null,
        height: height,
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: radius,
            border: Border.all(color: tokens.inkBorder),
            boxShadow: washPaperShadowSm(tokens),
          ),
          child: Padding(padding: padding, child: body),
        ),
      ),
    );
  }
}

/// `modal-action` row.
class WashModalActions extends StatelessWidget {
  const WashModalActions({required this.children, super.key});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) const SizedBox(width: 8),
            children[i],
          ],
        ],
      ),
    );
  }
}

/// Corner ghost close (`btn btn-sm btn-circle btn-ghost absolute end-2 top-2`).
class WashModalCornerClose extends StatelessWidget {
  const WashModalCornerClose({super.key});

  @override
  Widget build(BuildContext context) {
    final close = WashModalCloseScope.maybeCloseOf(context);
    return Align(
      alignment: Alignment.topRight,
      child: Padding(
        padding: const EdgeInsets.only(top: 4, right: 4),
        child: WashButton(
          onPressed: close,
          variant: WashButtonVariant.ghost,
          size: WashButtonSize.sm,
          circle: true,
          child: const WashIcon(WashIconGlyph.close, size: 16),
        ),
      ),
    );
  }
}

/// Legacy checkbox toggle sheet (`modal-toggle` + label backdrop).
class WashCheckboxBottomSheet extends StatefulWidget {
  const WashCheckboxBottomSheet({
    required this.trigger,
    required this.sheet,
    super.key,
  });

  /// Build the open control; receives [open] to wire buttons.
  final Widget Function(VoidCallback open) trigger;
  final Widget sheet;

  @override
  State<WashCheckboxBottomSheet> createState() =>
      _WashCheckboxBottomSheetState();
}

class _WashCheckboxBottomSheetState extends State<WashCheckboxBottomSheet> {
  OverlayEntry? _entry;

  void _open() {
    if (_entry != null) return;
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) return;
    _entry = OverlayEntry(
      builder: (ctx) => _WashBottomSheetOverlay<void>(
        barrierDismissible: true,
        blocksBackground: true,
        placement: WashBottomSheetPlacement.bottom,
        onClose: ([_]) => _close(),
        child: widget.sheet,
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

/// Simple menu list for tall sheet demos (`menu rounded-box bg-base-200`).
class WashModalMenuList extends StatelessWidget {
  const WashModalMenuList({required this.labels, super.key});

  final List<String> labels;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: tokens.inkBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: labels
            .map(
              (label) => Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                child: Text(
                  label,
                  style: WashTypography.body(tokens.onSurface)
                      .copyWith(fontSize: 14),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}
