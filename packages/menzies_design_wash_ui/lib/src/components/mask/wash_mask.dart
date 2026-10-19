import 'package:flutter/widgets.dart';

import '../../tokens/wash_tokens.dart';
import 'wash_mask_paths.dart';

export 'wash_mask_paths.dart'
    show
        WashMaskShape,
        WashMaskHalf,
        washMaskClassName,
        WashMaskClipper,
        washMaskPathFor;

/// daisyUI `mask` + `mask-*` shape crop for washes, images, and children.
class WashMask extends StatelessWidget {
  const WashMask({
    this.shape = WashMaskShape.circle,
    this.dimension = 96,
    this.width,
    this.height,
    this.half = WashMaskHalf.none,
    this.child,
    this.gradient,
    this.color,
    this.grain = false,
    this.semanticLabel,
    super.key,
  });

  final WashMaskShape shape;
  final double dimension;
  final double? width;
  final double? height;
  final WashMaskHalf half;
  final Widget? child;
  final Gradient? gradient;
  final Color? color;
  final bool grain;
  final String? semanticLabel;

  double get _w => width ?? dimension;
  double get _h => height ?? dimension;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = DecoratedBox(
      decoration: BoxDecoration(
        gradient: gradient ??
            (color == null
                ? LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      tokens.palette.primary.withValues(alpha: 0.55),
                      tokens.palette.secondary.withValues(alpha: 0.35),
                      tokens.palette.base100,
                    ],
                  )
                : null),
        color: gradient == null ? color : null,
      ),
    );

    Widget content = child ?? fill;
    if (grain) {
      content = Stack(
        fit: StackFit.expand,
        children: [
          if (child != null) child! else fill,
          const IgnorePointer(child: CustomPaint(painter: _GrainPainter())),
        ],
      );
    }

    final masked = ClipPath(
      clipper: WashMaskClipper(shape, half: half),
      child: SizedBox(
        width: _w,
        height: _h,
        child: content,
      ),
    );

    if (semanticLabel == null) return masked;
    return Semantics(
      label: semanticLabel,
      image: true,
      child: masked,
    );
  }
}

/// Soft paper grain overlay used by the studio plates demo.
class _GrainPainter extends CustomPainter {
  const _GrainPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final a = Paint()
      ..shader = RadialGradient(
        center: const Alignment(-0.4, -0.3),
        radius: 0.9,
        colors: [
          const Color(0xFFFFFFFF).withValues(alpha: 0.55),
          const Color(0x00FFFFFF),
        ],
      ).createShader(Offset.zero & size);
    canvas.drawRect(Offset.zero & size, a);
    final b = Paint()
      ..shader = RadialGradient(
        center: const Alignment(0.45, 0.35),
        radius: 0.85,
        colors: [
          const Color(0xFFFFFFFF).withValues(alpha: 0.3),
          const Color(0x00FFFFFF),
        ],
      ).createShader(Offset.zero & size);
    canvas.drawRect(Offset.zero & size, b);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Studio wash gradients matching MaskPage.tsx.
abstract final class WashMaskWashes {
  static const cerulean = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF7AA8B8), Color(0xFFB8DCE8), Color(0xFFEEF6F9)],
  );
  static const ochre = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFFC4A06A), Color(0xFFE8D2A8), Color(0xFFF8F0E0)],
  );
  static const rose = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFFB87870), Color(0xFFDCB0A8), Color(0xFFF4E4E0)],
  );
  static const jade = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF6A9E8A), Color(0xFFA8D4C4), Color(0xFFE8F4EF)],
  );
  static const violet = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF8A7AA8), Color(0xFFC4B8D8), Color(0xFFF0ECF6)],
  );

  static LinearGradient ink(WashTokens tokens) => LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          tokens.onSurface.withValues(alpha: 0.5),
          tokens.palette.base300,
          tokens.palette.base100,
        ],
      );

  static const shapeCycle = [
    cerulean,
    ochre,
    rose,
    jade,
    violet,
  ];
}
