import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/diff/wash_diff.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDiffGalleryPage extends StatelessWidget {
  const WashDiffGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Diff',
      description: 'daisyUI diff before and after comparisons with a resizable handle.',
      sections: [
        _s('01 · Basic', 'Two sides and a resizer', 'Core parts: diff-item-1, diff-item-2', _basic(), _basicDart),
        _s('02 · Aspect ratios', 'Frame proportions', 'Keep the figure ratio with Tailwind aspect utilities on the diff', _aspectRatios(), _aspectDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Image compare', 'Pigment wash plates', 'CSS wash plates stand in', _imageCompare(), _imageDart),
        _s('04 · Text / figure', 'Typography compare', 'Diff works with any content: large type blocks, not only images', _typography(context), _typoDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Studio', 'Wet wash vs dried pigment', 'Narrative before and after', _studio(context), _studioDart),
        _s('06 · Responsive', 'Fluid width', 'Diff fills its column', _responsive(context), _responsiveDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _plate(WashDiffPlateTone tone, String label, {WashDiffPlateVariant v = WashDiffPlateVariant.wet}) {
    return WashDiffPlate(tone: tone, label: label, variant: v);
  }

  static Widget _basic() {
    return WashDiff(
      before: _plate(WashDiffPlateTone.blue, 'Cerulean'),
      after: _plate(WashDiffPlateTone.blue, 'Cerulean', v: WashDiffPlateVariant.dry),
    );
  }

  static Widget _aspectRatios() {
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 640 ? 3 : 1;
        return GridView.count(
          crossAxisCount: cols,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 24,
          crossAxisSpacing: 24,
          childAspectRatio: cols == 1 ? 1.1 : 0.95,
          children: [
            WashDiff(
              ratio: WashAspectRatioValue.video,
              before: _plate(WashDiffPlateTone.ochre, '16:9'),
              after: _plate(WashDiffPlateTone.ochre, '16:9', v: WashDiffPlateVariant.dry),
            ),
            WashDiff(
              ratio: WashAspectRatioValue.classic,
              before: _plate(WashDiffPlateTone.rose, '4:3'),
              after: _plate(WashDiffPlateTone.rose, '4:3', v: WashDiffPlateVariant.dry),
            ),
            WashDiff(
              ratio: WashAspectRatioValue.square,
              maxWidth: 320,
              before: _plate(WashDiffPlateTone.ink, '1:1'),
              after: _plate(WashDiffPlateTone.ink, '1:1', v: WashDiffPlateVariant.dry),
            ),
          ],
        );
      },
    );
  }

  static Widget _imageCompare() {
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 900 ? 2 : 1;
        return GridView.count(
          crossAxisCount: cols,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 24,
          crossAxisSpacing: 24,
          childAspectRatio: 1.05,
          children: [
            WashDiff(
              semanticsLabel: 'Wet cerulean wash plate',
              before: _plate(WashDiffPlateTone.blue, 'Coastal fog'),
              after: _plate(WashDiffPlateTone.blue, 'Coastal fog', v: WashDiffPlateVariant.dry),
            ),
            WashDiff(
              semanticsLabel: 'Wet rose madder wash plate',
              before: _plate(WashDiffPlateTone.rose, 'Rose madder'),
              after: _plate(WashDiffPlateTone.rose, 'Rose madder', v: WashDiffPlateVariant.dry),
            ),
          ],
        );
      },
    );
  }

  static Widget _typography(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashDiff(
      before: ColoredBox(
        color: tokens.primary,
        child: Center(
          child: Text(
            'WASH',
            style: WashTypography.displayLarge(tokens.onPrimary).copyWith(
              fontSize: 72,
              fontWeight: FontWeight.w900,
              letterSpacing: -2,
            ),
          ),
        ),
      ),
      after: ColoredBox(
        color: tokens.surfaceContainer,
        child: Center(
          child: Text(
            'WASH',
            style: WashTypography.displayLarge(tokens.onSurface).copyWith(
              fontSize: 72,
              fontWeight: FontWeight.w900,
              letterSpacing: -2,
            ),
          ),
        ),
      ),
    );
  }

  static Widget _studio(BuildContext context) {
    return WashDiff(
      ratio: WashAspectRatioValue.cinema,
      before: _studioSide(
        context,
        label: 'Before',
        title: 'Wet wash',
        body: 'Soft blooms and pooled pigment while the paper is still damp.',
        colors: const [Color(0xFF9EC8D8), Color(0xFFC5E0EA), Color(0xFFE8F4F8)],
      ),
      after: _studioSide(
        context,
        label: 'After',
        title: 'Dried pigment',
        body: 'Settled edges, quieter chroma, and paper tooth showing through.',
        colors: const [Color(0xFF6A8F9E), Color(0xFF8FB0BC), Color(0xFFB8CFD8)],
      ),
    );
  }

  static Widget _studioSide(
    BuildContext context, {
    required String label,
    required String title,
    required String body,
    required List<Color> colors,
  }) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
      ),
      child: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                label,
                style: WashTypography.label(tokens.onSurface.withValues(alpha: 0.7)),
              ),
              const SizedBox(height: 4),
              Text(
                title,
                textAlign: TextAlign.center,
                style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 28),
              ),
              const SizedBox(height: 8),
              Text(
                body,
                textAlign: TextAlign.center,
                style: WashTypography.body(tokens.onSurface.withValues(alpha: 0.65)).copyWith(fontSize: 14),
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Widget _responsive(BuildContext context) {
    final tokens = WashTokens.of(context);
    final notes = DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        color: tokens.surface.withValues(alpha: 0.5),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Touch and narrow viewports',
              style: WashTypography.title(tokens.onSurface).copyWith(fontSize: 18),
            ),
            const SizedBox(height: 12),
            Text(
              'Drag the handle horizontally. On small screens the figure spans the full content width; the two-column layout stacks so each compare stays large enough to use.',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
          ],
        ),
      ),
    );
    final compare = WashDiff(
      ratio: WashAspectRatioValue.classic,
      before: _plate(WashDiffPlateTone.ochre, 'Raw sienna'),
      after: _plate(WashDiffPlateTone.ochre, 'Raw sienna', v: WashDiffPlateVariant.dry),
    );
    return LayoutBuilder(
      builder: (context, c) {
        if (c.maxWidth >= 768) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: compare),
              const SizedBox(width: 24),
              Expanded(child: notes),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            compare,
            const SizedBox(height: 24),
            notes,
          ],
        );
      },
    );
  }
}

const _basicDart = '''
WashDiff(
  before: WashDiffPlate(tone: WashDiffPlateTone.blue, label: 'Cerulean'),
  after: WashDiffPlate(tone: WashDiffPlateTone.blue, label: 'Cerulean', variant: WashDiffPlateVariant.dry),
);
''';

const _aspectDart = '''
WashDiff(ratio: WashAspectRatioValue.video, ...);
WashDiff(ratio: WashAspectRatioValue.classic, ...);
WashDiff(ratio: WashAspectRatioValue.square, maxWidth: 320, ...);
''';

const _imageDart = '''
WashDiff(before: WashDiffPlate(..., label: 'Coastal fog'), after: ...);
''';

const _typoDart = '''
WashDiff(before: ColoredBox(color: primary, child: Text('WASH')), after: ...);
''';

const _studioDart = '''
WashDiff(ratio: WashAspectRatioValue.cinema, before: studioWet, after: studioDry);
''';

const _responsiveDart = '''
WashDiff(ratio: WashAspectRatioValue.classic, before: ..., after: ...);
// md:grid-cols-2 notes panel beside compare on wide viewports
''';
