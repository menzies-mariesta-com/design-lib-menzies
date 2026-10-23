import 'package:flutter/widgets.dart';

import 'wash_input.dart';

export 'wash_input.dart';
export '../textarea/wash_textarea.dart' show WashTextarea;

/// Low-level editable field (legacy). Prefer [WashInput] for daisyUI `input` styling.
class WashEditable extends StatelessWidget {
  const WashEditable({
    this.controller,
    this.focusNode,
    this.hint,
    this.obscureText = false,
    this.keyboardType,
    this.onChanged,
    this.maxLines = 1,
    super.key,
  });

  final TextEditingController? controller;
  final FocusNode? focusNode;
  final String? hint;
  final bool obscureText;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return WashInput(
      controller: controller,
      focusNode: focusNode,
      hint: hint,
      obscureText: obscureText,
      keyboardType: keyboardType,
      onChanged: onChanged,
      maxLines: maxLines,
      expanded: false,
      decorated: false,
    );
  }
}
