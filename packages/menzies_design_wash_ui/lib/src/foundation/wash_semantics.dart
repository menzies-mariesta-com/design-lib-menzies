import 'package:flutter/widgets.dart';

Widget washButtonSemantics({
  required Widget child,
  required String label,
  bool enabled = true,
}) {
  return Semantics(
    button: true,
    enabled: enabled,
    label: label,
    child: child,
  );
}
