import 'package:flutter/widgets.dart';

/// Focus ring styling for native Wash controls (no Material focus).
class WashFocusRing extends StatelessWidget {
  const WashFocusRing({required this.focused, required this.child, super.key});

  final bool focused;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    if (!focused) return child;
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(width: 2, color: const Color(0xFF2563EB)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: child,
    );
  }
}
