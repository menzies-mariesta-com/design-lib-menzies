
import 'package:flutter/widgets.dart';

import '../painting/wash_decorations.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import 'wash_gallery_typography.dart';

enum WashGalleryPanelTint { none, ochre, rose, blue }

class WashGallerySection extends StatelessWidget {
  const WashGallerySection({
    required this.eyebrow,
    required this.title,
    required this.child,
    this.description,
    this.tint = WashGalleryPanelTint.none,
    super.key,
  });

  final String eyebrow;
  final String title;
  final String? description;
  final Widget child;
  final WashGalleryPanelTint tint;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPanel(
      tint: tint,
      header: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashGalleryLabelInk(eyebrow),
          const SizedBox(height: 4),
          Text(
            title,
            style:
                WashTypography.title(WashTokens.of(context).onSurface).copyWith(
              fontSize: 24,
              height: 32 / 24,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.48,
            ),
          ),
          if (description != null) ...[
            const SizedBox(height: 4),
            Text(
              description!,
              style: WashTypography.body(WashTokens.of(context).inkMuted),
            ),
          ],
        ],
      ),
      child: child,
    );
  }
}

class WashGalleryPanel extends StatelessWidget {
  const WashGalleryPanel({
    required this.child,
    this.header,
    this.tint = WashGalleryPanelTint.none,
    super.key,
  });

  final Widget? header;
  final Widget child;
  final WashGalleryPanelTint tint;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          Positioned.fill(
            child: WashPanelWash(tint: tint, tokens: tokens),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (header != null)
                Container(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                          color: tokens.inkBorder.withValues(alpha: 0.7)),
                    ),
                  ),
                  child: header,
                ),
              Padding(padding: const EdgeInsets.all(20), child: child),
            ],
          ),
        ],
      ),
    );
  }
}

class WashGalleryPage extends StatelessWidget {
  const WashGalleryPage({
    required this.title,
    required this.description,
    required this.sections,
    this.kicker = 'Component gallery',
    super.key,
  });

  final String kicker;
  final String title;
  final String description;
  final List<Widget> sections;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashGalleryPageHero(
          kicker: kicker,
          title: title,
          description: description,
        ),
        for (var i = 0; i < sections.length; i++) ...[
          if (i > 0) const SizedBox(height: 24),
          sections[i],
        ],
      ],
    );
  }
}

/// Blurred pigment pools used by web `.wash-panel` pseudo-elements.
class WashPanelWash extends StatelessWidget {
  const WashPanelWash({required this.tint, required this.tokens, super.key});

  final WashGalleryPanelTint tint;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final atmo =
        kWashAtmosphereByTheme[washPaletteId(tokens.pigmentId, tokens.mode)] ??
            kWashAtmosphereByTheme['mineral']!;
    final (before, after) = switch (tint) {
      WashGalleryPanelTint.rose => (atmo.washC, atmo.washA),
      WashGalleryPanelTint.ochre => (atmo.washB, atmo.washA),
      WashGalleryPanelTint.blue => (atmo.washA, atmo.washB),
      WashGalleryPanelTint.none => (atmo.washA, atmo.washB),
    };
    return IgnorePointer(
      child: LayoutBuilder(
        builder: (context, constraints) {
          final w = constraints.maxWidth;
          final h = constraints.maxHeight;
          if (!w.isFinite || !h.isFinite || w <= 0 || h <= 0) {
            return const SizedBox.shrink();
          }
          return Stack(
            clipBehavior: Clip.none,
            children: [
              Positioned(
                left: -w * 0.16,
                top: -h * 0.22,
                width: w * 0.601,
                height: h * 0.764,
                child: _Blob(color: before, stop: 0.674),
              ),
              Positioned(
                right: -w * 0.14,
                bottom: -h * 0.20,
                width: w * 0.505,
                height: h * 0.594,
                child: _Blob(color: after, stop: 0.70),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _Blob extends StatelessWidget {
  const _Blob({required this.color, required this.stop});

  final Color color;
  final double stop;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _BlobPainter(color: color, stop: stop),
    );
  }
}

class _BlobPainter extends CustomPainter {
  const _BlobPainter({required this.color, required this.stop});

  final Color color;
  final double stop;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final paint = Paint()
      ..shader = RadialGradient(
        colors: [
          color.withValues(alpha: 0.85),
          color.withValues(alpha: 0),
        ],
        stops: [0, stop],
      ).createShader(rect)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 22);
    canvas.drawRect(rect, paint);
  }

  @override
  bool shouldRepaint(covariant _BlobPainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.stop != stop;
  }
}
