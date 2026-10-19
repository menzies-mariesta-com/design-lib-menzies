import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_aspect_ratio.dart';

/// daisyUI `hover-gallery`: default first frame, hover strips reveal siblings.
class WashHoverGallery extends StatefulWidget {
  const WashHoverGallery({
    required this.children,
    this.maxWidth,
    this.aspectRatio = 4 / 3,
    super.key,
  }) : assert(children.length >= 2 && children.length <= 10);

  final List<Widget> children;
  final double? maxWidth;
  final double aspectRatio;

  @override
  State<WashHoverGallery> createState() => _WashHoverGalleryState();
}

class _WashHoverGalleryState extends State<WashHoverGallery> {
  int? _hoveredStrip;

  @override
  Widget build(BuildContext context) {
    final stripCount = widget.children.length - 1;
    final ratio = widget.aspectRatio == 1
        ? WashAspectRatioValue.square
        : WashAspectRatioValue(widget.aspectRatio, 1);
    Widget frame = WashAspectRatio(
      ratio: ratio,
      child: Stack(
        fit: StackFit.expand,
        children: [
          if (_hoveredStrip == null)
            Positioned.fill(
              child: _coverChild(widget.children.first),
            )
          else
            Positioned.fill(
              child: _coverChild(widget.children[_hoveredStrip! + 1]),
            ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < stripCount; i++)
                Expanded(
                  child: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    onEnter: (_) => setState(() => _hoveredStrip = i),
                    onExit: (_) => setState(() => _hoveredStrip = null),
                    child: const SizedBox.expand(),
                  ),
                ),
            ],
          ),
        ],
      ),
    );

    frame = ClipRect(child: frame);

    if (widget.maxWidth != null) {
      frame = Align(
        alignment: Alignment.centerLeft,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: widget.maxWidth!),
          child: frame,
        ),
      );
    }

    return frame;
  }

  static Widget _coverChild(Widget child) {
    return FittedBox(
      fit: BoxFit.cover,
      clipBehavior: Clip.hardEdge,
      child: child,
    );
  }
}

enum WashHoverGalleryTone { blue, ochre, rose, ink, sage, violet }

enum WashHoverGalleryStage { wet, dry }

/// Offline wash plate for hover-gallery demos (web HoverGalleryPage parity).
class WashHoverGalleryPlate extends StatelessWidget {
  const WashHoverGalleryPlate({
    required this.tone,
    required this.label,
    this.stage = WashHoverGalleryStage.wet,
    this.width = 480,
    this.height = 360,
    super.key,
  });

  final WashHoverGalleryTone tone;
  final String label;
  final WashHoverGalleryStage stage;
  final double width;
  final double height;

  @override
  Widget build(BuildContext context) {
    final colors = _gradientColors(context, tone, stage);
    final fog = stage == WashHoverGalleryStage.dry ? 0.2 : 0.45;
    final contrast = stage == WashHoverGalleryStage.dry ? 0.12 : 0.06;
    final subtitle = stage == WashHoverGalleryStage.wet ? 'WET WASH' : 'DRIED';

    return Semantics(
      label: label,
      image: true,
      child: SizedBox(
        width: width,
        height: height,
        child: DecoratedBox(
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
              Positioned.fill(
                child: IgnorePointer(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        center: const Alignment(-0.36, -0.24),
                        radius: 0.55,
                        colors: [
                          Color.fromRGBO(255, 255, 255, fog),
                          const Color(0x00FFFFFF),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              Positioned.fill(
                child: IgnorePointer(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        center: const Alignment(0.44, 0.56),
                        radius: 0.48,
                        colors: [
                          Color.fromRGBO(0, 0, 0, contrast),
                          const Color(0x00000000),
                        ],
                      ),
                    ),
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
                        style: WashTypography.title(const Color(0xFF2A2622)).copyWith(
                          fontSize: height * 0.12,
                          fontWeight: FontWeight.w600,
                          height: 1.1,
                        ).copyWith(color: const Color(0xFF2A2622).withValues(alpha: 0.85)),
                      ),
                      Text(
                        subtitle,
                        textAlign: TextAlign.center,
                        style: WashTypography.label(const Color(0xFF2A2622)).copyWith(
                          fontSize: height * 0.045,
                          letterSpacing: height * 0.045 * 0.18,
                          color: const Color(0xFF2A2622).withValues(alpha: 0.55),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static List<Color> _gradientColors(
    BuildContext context,
    WashHoverGalleryTone tone,
    WashHoverGalleryStage stage,
  ) {
    final tokens = WashTokens.of(context);
    if (stage == WashHoverGalleryStage.wet) {
      return switch (tone) {
        WashHoverGalleryTone.blue => const [Color(0xFFB8DCE8), Color(0xFFB8DCE8), Color(0xFFEEF6F9)],
        WashHoverGalleryTone.ochre => const [Color(0xFFE8D2A8), Color(0xFFE8D2A8), Color(0xFFF8F0E0)],
        WashHoverGalleryTone.rose => const [Color(0xFFDCB0A8), Color(0xFFDCB0A8), Color(0xFFF4E4E0)],
        WashHoverGalleryTone.ink => [
            const Color(0xFFC8C4C0),
            const Color(0xFFC8C4C0),
            const Color(0xFFEBE8E4),
          ],
        WashHoverGalleryTone.sage => const [Color(0xFFC5D4C0), Color(0xFFC5D4C0), Color(0xFFE8F0E6)],
        WashHoverGalleryTone.violet => const [Color(0xFFC8B8D4), Color(0xFFC8B8D4), Color(0xFFF0E8F4)],
      };
    }
    return switch (tone) {
      WashHoverGalleryTone.blue => const [Color(0xFF7AA8B8), Color(0xFF7AA8B8), Color(0xFFEEF6F9)],
      WashHoverGalleryTone.ochre => const [Color(0xFFC4A06A), Color(0xFFC4A06A), Color(0xFFF8F0E0)],
      WashHoverGalleryTone.rose => const [Color(0xFFB87870), Color(0xFFB87870), Color(0xFFF4E4E0)],
      WashHoverGalleryTone.ink => [
          tokens.onSurface.withValues(alpha: 0.35),
          const Color(0xFF6E6A66),
          const Color(0xFFEBE8E4),
        ],
      WashHoverGalleryTone.sage => const [Color(0xFF7A9478), Color(0xFF7A9478), Color(0xFFE8F0E6)],
      WashHoverGalleryTone.violet => const [Color(0xFF8A7498), Color(0xFF8A7498), Color(0xFFF0E8F4)],
    };
  }
}

/// Tailwind max-width helpers for hover-gallery demos.
abstract final class WashHoverGalleryMaxWidth {
  static const w40 = 160.0;
  static const w60 = 240.0;
  static const xs = 320.0;
  static const sm = 384.0;
}
