import 'package:flutter/widgets.dart';

/// Close callback for modal overlays (dialog or bottom sheet).
typedef WashModalClose = void Function();

class WashModalCloseScope extends InheritedWidget {
  const WashModalCloseScope({
    required this.close,
    required super.child,
    super.key,
  });

  final WashModalClose close;

  static WashModalClose? maybeCloseOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<WashModalCloseScope>()?.close;
  }

  @override
  bool updateShouldNotify(WashModalCloseScope oldWidget) => false;
}
