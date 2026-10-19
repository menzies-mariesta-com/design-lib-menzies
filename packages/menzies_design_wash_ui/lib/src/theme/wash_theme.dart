import 'package:flutter/widgets.dart';

import '../tokens/wash_tokens.dart';

/// Native Wash theme scope (no ThemeData / Material).
class WashThemeScope extends InheritedWidget {
  const WashThemeScope({
    required this.tokens,
    required super.child,
    super.key,
  });

  final WashTokens tokens;

  static WashTokens of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<WashThemeScope>();
    assert(scope != null, 'Wrap with WashProvider');
    return scope!.tokens;
  }

  @override
  bool updateShouldNotify(WashThemeScope oldWidget) =>
      oldWidget.tokens != tokens;
}
