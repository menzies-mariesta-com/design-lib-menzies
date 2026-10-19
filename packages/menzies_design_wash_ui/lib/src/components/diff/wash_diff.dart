import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `diff` before/after compare with draggable resizer.
class WashDiff extends StatefulWidget {
  const WashDiff({
    required this.before,
    required this.after,
    this.ratio = WashAspectRatioValue.video,
    this.maxWidth,
    this.initialPosition = 0.5,
    this.semanticsLabel,
    super.key,
  });

  final Widget before;
  final Widget after;
  final WashAspectRatioValue ratio;
  final double? maxWidth;
  final double initialPosition;
  final String? semanticsLabel;

  @override
  State<WashDiff> createState() => _WashDiffState();
}

class _WashDiffState extends State<WashDiff> {
  late double _position;

  @override
  void initState() {
    super.initState();
    _position = widget.initialPosition.clamp(0.05, 0.95);
  }

  void _update(double localX, double width) {
    setState(() {
      _position = (localX / width).clamp(0.05, 0.95);
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    Widget frame = WashAspectFrame(
      ratio: widget.ratio,
      maxWidth: widget.maxWidth,
      backgroundColor: const Color(0x00000000),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final w = constraints.maxWidth;
          final splitX = w * _position;
          return GestureDetector(
            onHorizontalDragUpdate: (d) => _update(d.localPosition.dx, w),
            onTapDown: (d) => _update(d.localPosition.dx, w),
            child: Semantics(
              label: widget.semanticsLabel,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Positioned.fill(child: widget.after),
                  ClipRect(
                    clipper: _LeftClipper(splitX),
                    child: SizedBox(
                      width: w,
                      height: constraints.maxHeight,
                      child: widget.before,
                    ),
                  ),
                  Positioned(
                    left: splitX - 1,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    child: ColoredBox(color: tokens.surface.withValues(alpha: 0.9)),
                  ),
                  Positioned(
                    left: splitX - 12,
                    top: 0,
                    bottom: 0,
                    width: 24,
                    child: MouseRegion(
                      cursor: SystemMouseCursors.resizeColumn,
                      child: const SizedBox.expand(),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );

    return frame;
  }
}

class _LeftClipper extends CustomClipper<Rect> {
  _LeftClipper(this.width);
  final double width;

  @override
  Rect getClip(Size size) => Rect.fromLTWH(0, 0, width, size.height);

  @override
  bool shouldReclip(covariant _LeftClipper oldClipper) => oldClipper.width != width;
}

enum WashDiffPlateTone { blue, ochre, rose, ink }

enum WashDiffPlateVariant { wet, dry }

/// CSS wash plate for diff demos (matches web DiffPage WashPlate).
class WashDiffPlate extends StatelessWidget {
  const WashDiffPlate({
    required this.tone,
    required this.label,
    this.variant = WashDiffPlateVariant.wet,
    super.key,
  });

  final WashDiffPlateTone tone;
  final String label;
  final WashDiffPlateVariant variant;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final colors = _gradientColors(context, tone, variant);
    final overlay = variant == WashDiffPlateVariant.wet
        ? const [
            RadialGradient(
              center: Alignment(-0.2, -0.2),
              radius: 0.9,
              colors: [Color(0x8CFFFFFF), Color(0x00FFFFFF)],
            ),
            RadialGradient(
              center: Alignment(0.4, 0.4),
              radius: 0.7,
              colors: [Color(0x59FFFFFF), Color(0x00FFFFFF)],
            ),
          ]
        : [
            RadialGradient(
              center: Alignment(-0.2, -0.4),
              radius: 0.8,
              colors: [Color(0x14000000), Color(0x00000000)],
            ),
          ];

    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
      ),
      child: Stack(
        fit: StackFit.expand,
        children: [
          for (final g in overlay)
            Positioned.fill(
              child: IgnorePointer(
                child: DecoratedBox(
                  decoration: BoxDecoration(gradient: g),
                ),
              ),
            ),
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    textAlign: TextAlign.center,
                    style: WashTypography.title(tokens.onSurface).copyWith(
                      fontSize: 22,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.3,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    variant == WashDiffPlateVariant.wet ? 'WET WASH' : 'DRIED PIGMENT',
                    style: WashTypography.label(tokens.onSurface.withValues(alpha: 0.55)).copyWith(
                      fontSize: 10,
                      letterSpacing: 2.4,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  static List<Color> _gradientColors(
    BuildContext context,
    WashDiffPlateTone tone,
    WashDiffPlateVariant variant,
  ) {
    final tokens = WashTokens.of(context);
    if (variant == WashDiffPlateVariant.wet) {
      return switch (tone) {
        WashDiffPlateTone.blue => const [Color(0xFFB8DCE8), Color(0xFFD9EEF5), Color(0xFFEEF6F9)],
        WashDiffPlateTone.ochre => const [Color(0xFFE8D2A8), Color(0xFFF2E1C6), Color(0xFFF8F0E0)],
        WashDiffPlateTone.rose => const [Color(0xFFDCB0A8), Color(0xFFE8C9C3), Color(0xFFF4E4E0)],
        WashDiffPlateTone.ink => [
            tokens.surfaceContainer,
            tokens.surface,
            tokens.surface.withValues(alpha: 0.92),
          ],
      };
    }
    return switch (tone) {
      WashDiffPlateTone.blue => const [Color(0xFF7AA8B8), Color(0xFFA8C9D4), Color(0xFFC5DDE6)],
      WashDiffPlateTone.ochre => const [Color(0xFFC4A06A), Color(0xFFD4B888), Color(0xFFE8D4B0)],
      WashDiffPlateTone.rose => const [Color(0xFFB87870), Color(0xFFC99890), Color(0xFFE0B8B0)],
      WashDiffPlateTone.ink => [
          tokens.onSurface.withValues(alpha: 0.4),
          tokens.surfaceContainer,
          tokens.surface,
        ],
    };
  }
}
