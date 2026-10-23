import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `kbd` size modifiers (`kbd-xs` … `kbd-lg`).
enum WashKbdSize { xs, sm, md, lg }

class _WashKbdMetrics {
  const _WashKbdMetrics({
    required this.fontSize,
    required this.paddingX,
    required this.paddingY,
    required this.minHeight,
    required this.borderRadius,
  });

  final double fontSize;
  final double paddingX;
  final double paddingY;
  final double minHeight;
  final double borderRadius;
}

const _kKbdMetrics = <WashKbdSize, _WashKbdMetrics>{
  WashKbdSize.xs: _WashKbdMetrics(
    fontSize: 10,
    paddingX: 4,
    paddingY: 1,
    minHeight: 18,
    borderRadius: 4,
  ),
  WashKbdSize.sm: _WashKbdMetrics(
    fontSize: 11,
    paddingX: 5,
    paddingY: 2,
    minHeight: 22,
    borderRadius: 5,
  ),
  WashKbdSize.md: _WashKbdMetrics(
    fontSize: 12,
    paddingX: 6,
    paddingY: 2,
    minHeight: 26,
    borderRadius: 6,
  ),
  WashKbdSize.lg: _WashKbdMetrics(
    fontSize: 14,
    paddingX: 8,
    paddingY: 3,
    minHeight: 32,
    borderRadius: 6,
  ),
};

String washKbdClassLabel(WashKbdSize size) {
  return size == WashKbdSize.md ? 'kbd' : 'kbd kbd-${size.name}';
}

/// Gallery monospace class hint (KbdPage ClassLabel).
class WashKbdClassLabel extends StatelessWidget {
  const WashKbdClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text(
        value.isEmpty ? 'kbd' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// Single daisyUI `kbd` key cap.
class WashKbd extends StatelessWidget {
  const WashKbd(
    this.label, {
    this.size = WashKbdSize.md,
    super.key,
  });

  final String label;
  final WashKbdSize size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _kKbdMetrics[size]!;
    return MouseRegion(
      cursor: SystemMouseCursors.basic,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surfaceContainer,
          borderRadius: BorderRadius.circular(m.borderRadius),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: [
            BoxShadow(
              color: tokens.onSurface.withValues(alpha: 0.08),
              offset: const Offset(0, 1),
              blurRadius: 0,
            ),
          ],
        ),
        child: ConstrainedBox(
          constraints: BoxConstraints(minHeight: m.minHeight),
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: m.paddingX, vertical: m.paddingY),
            child: Center(
              child: Text(
                label,
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontFamily: 'monospace',
                  fontSize: m.fontSize,
                  fontWeight: FontWeight.w500,
                  height: 1.1,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Plus separator between keys in a combo (`text-ink-muted`).
class WashKbdPlus extends StatelessWidget {
  const WashKbdPlus({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      '+',
      style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
    );
  }
}

/// Inline key sequence with plus between each [keys] entry.
class WashKbdCombo extends StatelessWidget {
  const WashKbdCombo({
    required this.keys,
    this.size = WashKbdSize.md,
    super.key,
  });

  final List<String> keys;
  final WashKbdSize size;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 6,
      runSpacing: 6,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        for (var i = 0; i < keys.length; i++) ...[
          if (i > 0) const WashKbdPlus(),
          WashKbd(keys[i], size: size),
        ],
      ],
    );
  }
}

/// `kbd-sm` below 640px CSS width, `kbd-md` at sm and up (Tailwind `sm:`).
class WashKbdResponsive extends StatelessWidget {
  const WashKbdResponsive(this.label, {super.key});

  final String label;

  static const _smBreakpoint = 640.0;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final size = width >= _smBreakpoint ? WashKbdSize.md : WashKbdSize.sm;
    return WashKbd(label, size: size);
  }
}
