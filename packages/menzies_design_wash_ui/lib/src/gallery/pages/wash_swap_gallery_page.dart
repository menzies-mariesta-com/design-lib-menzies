import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/swap/wash_swap.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../../placement/tooltip_placement.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashSwapGalleryPage extends StatelessWidget {
  const WashSwapGalleryPage({super.key});

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

  static const _basicDart = '''
WashSwap(
  onChild: Text('ON'),
  offChild: Text('OFF'),
)
WashSwap(
  initialState: WashSwapState.on,
  onChild: Text('Yes'),
  offChild: Text('No'),
)
WashSwap(
  onChild: _FilledHeart(),
  offChild: WashLucideIcon('heart', size: 40),
)
''';

  static const _motionDart = '''
WashSwap(
  effect: WashSwapEffect.rotate,
  onChild: WashLucideIcon('sun', size: 40),
  offChild: WashLucideIcon('moon', size: 40),
)
WashSwap(
  effect: WashSwapEffect.flip,
  onChild: Text('A'),
  offChild: Text('B'),
)
''';

  static const _indeterminateDart = '''
WashSwap(
  initialState: WashSwapState.mixed,
  onChild: Text('On'),
  offChild: Text('Off'),
  indeterminateChild: Text('Mixed'),
)
''';

  static const _iconsDart = '''
WashSwap(
  onChild: WashLucideIcon('volume-x', size: 40),
  offChild: WashLucideIcon('volume-2', size: 40),
)
WashSwap(
  effect: WashSwapEffect.rotate,
  onChild: WashLucideIcon('x', size: 24),
  offChild: WashLucideIcon('menu', size: 24),
)
''';

  static const _studioDart = '''
WashSwap(
  effect: WashSwapEffect.flip,
  initialState: WashSwapState.on,
  onChild: Column(children: [WashLucideIcon('droplets'), Text('Wet')]),
  offChild: Column(children: [WashLucideIcon('paintbrush'), Text('Dry')]),
)
WashSwap(
  onChild: WashLucideIcon('eye', size: 36, color: success),
  offChild: WashLucideIcon('eye-off', size: 36, color: warning),
)
''';

  static const _controlledDart = '''
WashSwap(
  value: wetBrush ? WashSwapState.on : WashSwapState.off,
  onChanged: setBrush,
  effect: WashSwapEffect.flip,
  onChild: WashLucideIcon('droplets', size: 40),
  offChild: WashLucideIcon('paintbrush', size: 40),
)
WashSwap(
  value: previewOn ? WashSwapState.on : WashSwapState.off,
  onChanged: (_) => setPreview(!previewOn),
  onChild: Text('▣'),
  offChild: Text('▢'),
)
''';

  static const _responsiveDart = '''
WashSwap(
  onChild: Text('Open'),
  offChild: Text('Closed'),
)
WashButton(
  variant: WashButtonVariant.outline,
  block: stacked,
  wide: !stacked,
  child: WashSwap(
    tappable: false,
    onChild: Text('Listening'),
    offChild: Text('Muted'),
  ),
)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Swap',
      description: 'daisyUI swap toggles for text, icons, and studio controls.',
      sections: [
        _s(
            '01 · Basic',
            'Text and icon pairs',
            'swap-on shows when checked, swap-off when not',
            const _BasicSection(),
            _basicDart),
        _s(
            '02 · Motion',
            'Rotate and flip',
            'Modifiers add transition: swap-rotate turns, swap-flip flips on the Y axis',
            const _MotionSection(),
            _motionDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Indeterminate',
            'Three-state swap',
            'swap-indeterminate appears when the controlling checkbox is mixed',
            const _IndeterminateSection(),
            _indeterminateDart,
            tint: WashGalleryPanelTint.rose),
        _s('04 · Icon toggles', 'Volume, menu, and theme-ish',
            'Common icon swaps', const _IconTogglesSection(), _iconsDart),
        _s(
            '05 · Studio',
            'Brush and layer eyes',
            'Wet versus dry brush, and show versus hide layer visibility',
            const _StudioSection(),
            _studioDart,
            tint: WashGalleryPanelTint.blue),
        _s(
            '06 · Controlled',
            'Interactive demos',
            'State drives checked and swap-active',
            const _ControlledSection(),
            _controlledDart),
        _s(
            '07 · Responsive',
            'Stack to row',
            'Swaps reflow from a vertical stack on narrow viewports to a row from sm up',
            const _ResponsiveSection(),
            _responsiveDart,
            tint: WashGalleryPanelTint.ochre),
      ],
    );
  }
}

Widget _caption(BuildContext context, String text) {
  return Text(
    text,
    style: WashTypography.body(WashTokens.of(context).inkMuted)
        .copyWith(fontSize: 12),
  );
}

Widget _sample(
  BuildContext context, {
  required String className,
  required String caption,
  required Widget child,
}) {
  return Column(
    mainAxisSize: MainAxisSize.min,
    children: [
      child,
      const SizedBox(height: 8),
      WashSwapClassLabel(className),
      const SizedBox(height: 4),
      _caption(context, caption),
    ],
  );
}

class _FilledHeart extends StatelessWidget {
  const _FilledHeart();

  @override
  Widget build(BuildContext context) {
    final color = WashTokens.of(context).palette.error;
    return CustomPaint(
      size: const Size(40, 40),
      painter: _HeartFillPainter(color),
    );
  }
}

class _HeartFillPainter extends CustomPainter {
  const _HeartFillPainter(this.color);

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(12, 21.35)
      ..lineTo(10.55, 20.03)
      ..cubicTo(5.4, 15.36, 2, 12.28, 2, 8.5)
      ..cubicTo(2, 5.42, 4.42, 3, 7.5, 3)
      ..cubicTo(9.24, 3, 10.91, 3.81, 12, 5.09)
      ..cubicTo(13.09, 3.81, 14.76, 3, 16.5, 3)
      ..cubicTo(19.58, 3, 22, 5.42, 22, 8.5)
      ..cubicTo(22, 12.28, 18.6, 15.36, 13.45, 20.04)
      ..lineTo(12, 21.35)
      ..close();
    canvas.save();
    canvas.scale(size.width / 24, size.height / 24);
    canvas.drawPath(path, Paint()..color = color);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _HeartFillPainter oldDelegate) =>
      oldDelegate.color != color;
}

class _BasicSection extends StatelessWidget {
  const _BasicSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 32,
      runSpacing: 24,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          context,
          className: 'swap',
          caption: 'Text',
          child: WashSwap(
            semanticLabel: 'Text swap ON OFF',
            onChild: Text(
              'ON',
              style:
                  WashTypography.displayLarge(tokens.palette.primary).copyWith(
                fontSize: 24,
                fontWeight: FontWeight.w600,
              ),
            ),
            offChild: Text(
              'OFF',
              style: WashTypography.displayLarge(tokens.inkMuted).copyWith(
                fontSize: 24,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
        _sample(
          context,
          className: 'swap (default checked)',
          caption: 'Checked start',
          child: DefaultTextStyle(
            style: WashTypography.body(tokens.palette.secondary).copyWith(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
            child: const WashSwap(
              semanticLabel: 'Yes no text swap',
              initialState: WashSwapState.on,
              onChild: Text('Yes'),
              offChild: Text('No'),
            ),
          ),
        ),
        _sample(
          context,
          className: 'swap + swap-on / swap-off',
          caption: 'Icon pair',
          child: WashSwap(
            semanticLabel: 'Heart outline filled swap',
            onChild: const _FilledHeart(),
            offChild: WashLucideIcon(
              'heart',
              size: 40,
              strokeWidth: 2,
              color: tokens.onSurface,
            ),
          ),
        ),
      ],
    );
  }
}

class _MotionSection extends StatelessWidget {
  const _MotionSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 40,
      runSpacing: 24,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          context,
          className: 'swap swap-rotate',
          caption: 'Rotate',
          child: WashSwap(
            semanticLabel: 'Rotate sun moon demo',
            effect: WashSwapEffect.rotate,
            onChild: WashLucideIcon(
              'sun',
              size: 40,
              strokeWidth: 2,
              color: tokens.palette.warning,
            ),
            offChild: WashLucideIcon(
              'moon',
              size: 40,
              strokeWidth: 2,
              color: tokens.palette.info,
            ),
          ),
        ),
        _sample(
          context,
          className: 'swap swap-flip',
          caption: 'Flip',
          child: DefaultTextStyle(
            style: WashTypography.displayLarge(tokens.onSurface)
                .copyWith(fontSize: 48),
            child: const WashSwap(
              semanticLabel: 'Flip faces demo',
              effect: WashSwapEffect.flip,
              onChild: Text('A'),
              offChild: Text('B'),
            ),
          ),
        ),
        _sample(
          context,
          className: 'swap swap-flip (icons)',
          caption: 'Icon flip',
          child: WashSwap(
            semanticLabel: 'Flip wet dry icons',
            effect: WashSwapEffect.flip,
            initialState: WashSwapState.on,
            onChild: WashLucideIcon(
              'droplets',
              size: 40,
              strokeWidth: 2,
              color: tokens.palette.info,
            ),
            offChild: WashLucideIcon(
              'paintbrush',
              size: 40,
              strokeWidth: 2,
              color: tokens.palette.secondary,
            ),
          ),
        ),
      ],
    );
  }
}

class _IndeterminateSection extends StatelessWidget {
  const _IndeterminateSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final display = WashTypography.displayLarge(tokens.onSurface).copyWith(
      fontSize: 24,
      fontWeight: FontWeight.w600,
    );
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Column(
          children: [
            WashSwap(
              semanticLabel: 'Indeterminate swap demo',
              initialState: WashSwapState.mixed,
              onChild: Text('On',
                  style: display.copyWith(color: tokens.palette.success)),
              offChild: Text('Off',
                  style: display.copyWith(color: tokens.palette.error)),
              indeterminateChild: Text(
                'Mixed',
                style: display.copyWith(color: tokens.palette.warning),
              ),
            ),
            const SizedBox(height: 8),
            const WashSwapClassLabel('swap-indeterminate'),
            const SizedBox(height: 4),
            _caption(context, 'Checkbox indeterminate'),
          ],
        ),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 320),
          child: Text.rich(
            TextSpan(
              style: WashTypography.body(tokens.inkMuted),
              children: [
                const TextSpan(
                  text:
                      'Unchecked shows Off. Checked shows On. Indeterminate shows Mixed via ',
                ),
                TextSpan(
                  text: 'swap-indeterminate',
                  style: WashTypography.label(tokens.inkMuted).copyWith(
                    fontFamily: 'monospace',
                    fontSize: 12,
                  ),
                ),
                const TextSpan(text: '.'),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _IconTogglesSection extends StatelessWidget {
  const _IconTogglesSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      spacing: 32,
      runSpacing: 32,
      alignment: WrapAlignment.center,
      children: [
        _sample(
          context,
          className: 'swap (volume)',
          caption: 'Volume',
          child: WashTooltip(
            message: 'Mute',
            prefer: WashTooltipSide.right,
            child: WashSwap(
              semanticLabel: 'Mute volume',
              onChild: WashLucideIcon(
                'volume-x',
                size: 40,
                strokeWidth: 2,
                color: tokens.palette.primary,
              ),
              offChild: WashLucideIcon(
                'volume-2',
                size: 40,
                strokeWidth: 2,
                color: tokens.palette.primary,
              ),
            ),
          ),
        ),
        _sample(
          context,
          className: 'btn btn-circle swap swap-rotate',
          caption: 'Hamburger',
          child: const _HamburgerSwap(),
        ),
        _sample(
          context,
          className: 'swap swap-rotate (local theme-ish)',
          caption: 'Day / night preview',
          child: WashTooltip(
            message: 'Local day night',
            child: WashSwap(
              semanticLabel: 'Local day night preview',
              effect: WashSwapEffect.rotate,
              onChild: WashLucideIcon(
                'sun',
                size: 40,
                strokeWidth: 2,
                color: tokens.palette.accent,
              ),
              offChild: WashLucideIcon(
                'moon',
                size: 40,
                strokeWidth: 2,
                color: tokens.palette.accent,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _HamburgerSwap extends StatefulWidget {
  const _HamburgerSwap();

  @override
  State<_HamburgerSwap> createState() => _HamburgerSwapState();
}

class _HamburgerSwapState extends State<_HamburgerSwap> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    return WashTooltip(
      message: 'Menu',
      child: WashButton(
        variant: WashButtonVariant.secondary,
        circle: true,
        onPressed: () => setState(() => _open = !_open),
        child: IgnorePointer(
          child: WashSwap(
            tappable: false,
            value: _open ? WashSwapState.on : WashSwapState.off,
            effect: WashSwapEffect.rotate,
            semanticLabel: 'Open or close menu',
            onChild: const WashLucideIcon('x', size: 24, strokeWidth: 2),
            offChild: const WashLucideIcon('menu', size: 24, strokeWidth: 2),
          ),
        ),
      ),
    );
  }
}

class _StudioSection extends StatelessWidget {
  const _StudioSection();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final captionStyle = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: 12,
      fontWeight: FontWeight.w500,
    );
    return Wrap(
      spacing: 40,
      runSpacing: 24,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        Column(
          children: [
            WashSwap(
              semanticLabel: 'Wet or dry brush',
              effect: WashSwapEffect.flip,
              initialState: WashSwapState.on,
              onChild: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon(
                    'droplets',
                    size: 36,
                    strokeWidth: 2,
                    color: tokens.palette.info,
                  ),
                  const SizedBox(height: 4),
                  Text('Wet',
                      style: captionStyle.copyWith(color: tokens.palette.info)),
                ],
              ),
              offChild: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon(
                    'paintbrush',
                    size: 36,
                    strokeWidth: 2,
                    color: tokens.palette.secondary,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Dry',
                    style:
                        captionStyle.copyWith(color: tokens.palette.secondary),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const WashSwapClassLabel('swap swap-flip (wet / dry)'),
          ],
        ),
        Column(
          children: [
            WashTooltip(
              message: 'Layer eye',
              prefer: WashTooltipSide.right,
              child: WashSwap(
                semanticLabel: 'Show or hide layer',
                initialState: WashSwapState.on,
                onChild: WashLucideIcon(
                  'eye',
                  size: 36,
                  strokeWidth: 2,
                  color: tokens.palette.success,
                ),
                offChild: WashLucideIcon(
                  'eye-off',
                  size: 36,
                  strokeWidth: 2,
                  color: tokens.palette.warning,
                ),
              ),
            ),
            const SizedBox(height: 8),
            const WashSwapClassLabel('swap (Eye / EyeOff)'),
          ],
        ),
        Column(
          children: [
            WashSwap(
              semanticLabel: 'Layer stack visibility',
              effect: WashSwapEffect.rotate,
              onChild: WashBadge.icon(
                'eye',
                'Shown',
                tone: WashBadgeTone.success,
                size: WashBadgeSize.lg,
              ),
              offChild: WashBadge.icon(
                'eye-off',
                'Hidden',
                tone: WashBadgeTone.defaultTone,
                style: WashBadgeStyle.ghost,
                size: WashBadgeSize.lg,
              ),
            ),
            const SizedBox(height: 8),
            const WashSwapClassLabel('swap swap-rotate + badge'),
          ],
        ),
      ],
    );
  }
}

class _ControlledSection extends StatefulWidget {
  const _ControlledSection();

  @override
  State<_ControlledSection> createState() => _ControlledSectionState();
}

class _ControlledSectionState extends State<_ControlledSection> {
  bool _wetBrush = true;
  bool _layerVisible = true;
  bool _previewOn = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    Widget card({required Widget child}) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: tokens.palette.base100.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.5)),
        ),
        child: child,
      );
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final cols = constraints.maxWidth >= 1024
            ? 3
            : constraints.maxWidth >= 640
                ? 2
                : 1;
        final gap = 24.0;
        final width = cols == 1
            ? constraints.maxWidth
            : (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            SizedBox(
              width: width,
              child: card(
                child: Column(
                  children: [
                    WashSwap(
                      semanticLabel: 'Toggle wet or dry brush',
                      value: _wetBrush ? WashSwapState.on : WashSwapState.off,
                      onChanged: (s) =>
                          setState(() => _wetBrush = s == WashSwapState.on),
                      effect: WashSwapEffect.flip,
                      onChild: WashLucideIcon(
                        'droplets',
                        size: 40,
                        strokeWidth: 2,
                        color: tokens.palette.primary,
                      ),
                      offChild: WashLucideIcon(
                        'paintbrush',
                        size: 40,
                        strokeWidth: 2,
                        color: tokens.palette.primary,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _wetBrush ? 'Wet brush' : 'Dry brush',
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const WashSwapClassLabel('swap swap-flip (controlled)'),
                    const SizedBox(height: 12),
                    WashButton(
                      variant: WashButtonVariant.outline,
                      size: WashButtonSize.sm,
                      label: 'Flip from button',
                      onPressed: () => setState(() => _wetBrush = !_wetBrush),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(
              width: width,
              child: card(
                child: Column(
                  children: [
                    WashTooltip(
                      message: _layerVisible ? 'Hide layer' : 'Show layer',
                      child: WashSwap(
                        semanticLabel:
                            _layerVisible ? 'Hide layer' : 'Show layer',
                        value: _layerVisible
                            ? WashSwapState.on
                            : WashSwapState.off,
                        onChanged: (s) => setState(
                          () => _layerVisible = s == WashSwapState.on,
                        ),
                        effect: WashSwapEffect.rotate,
                        onChild: WashLucideIcon(
                          'eye',
                          size: 40,
                          strokeWidth: 2,
                          color: tokens.palette.success,
                        ),
                        offChild: WashLucideIcon(
                          'eye-off',
                          size: 40,
                          strokeWidth: 2,
                          color: tokens.palette.warning,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _layerVisible ? 'Layer visible' : 'Layer hidden',
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const WashSwapClassLabel('swap swap-rotate (controlled)'),
                  ],
                ),
              ),
            ),
            SizedBox(
              width: cols == 2 ? constraints.maxWidth : width,
              child: card(
                child: Column(
                  children: [
                    DefaultTextStyle(
                      style: WashTypography.displayLarge(tokens.onSurface)
                          .copyWith(fontSize: 36),
                      child: WashSwap(
                        value:
                            _previewOn ? WashSwapState.on : WashSwapState.off,
                        onChanged: (s) =>
                            setState(() => _previewOn = s == WashSwapState.on),
                        onChild: const Text('▣'),
                        offChild: const Text('▢'),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _previewOn ? 'Preview active' : 'Preview idle',
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const WashSwapClassLabel('swap-active (class toggle)'),
                    const SizedBox(height: 12),
                    WashButton(
                      variant: WashButtonVariant.primary,
                      size: WashButtonSize.sm,
                      label: 'Toggle swap-active',
                      onPressed: () => setState(() => _previewOn = !_previewOn),
                    ),
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _ResponsiveSection extends StatefulWidget {
  const _ResponsiveSection();

  @override
  State<_ResponsiveSection> createState() => _ResponsiveSectionState();
}

class _ResponsiveSectionState extends State<_ResponsiveSection> {
  bool _listening = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= 640;
        final sunSize = constraints.maxWidth >= 768
            ? 40.0
            : constraints.maxWidth >= 640
                ? 36.0
                : 28.0;
        final items = [
          Column(
            children: [
              WashSwap(
                semanticLabel: 'Compact text swap',
                onChild: Text(
                  'Open',
                  style: WashTypography.body(tokens.palette.primary).copyWith(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                offChild: Text(
                  'Closed',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              const WashSwapClassLabel('swap (sm text)'),
            ],
          ),
          Column(
            children: [
              WashSwap(
                semanticLabel: 'Responsive rotate swap',
                effect: WashSwapEffect.rotate,
                onChild: WashLucideIcon('sun', size: sunSize, strokeWidth: 2),
                offChild: WashLucideIcon('moon', size: sunSize, strokeWidth: 2),
              ),
              const SizedBox(height: 8),
              const WashSwapClassLabel('swap swap-rotate (fluid size)'),
            ],
          ),
          Column(
            children: [
              SizedBox(
                width: row ? null : double.infinity,
                child: WashButton(
                  variant: WashButtonVariant.outline,
                  block: !row,
                  onPressed: () => setState(() => _listening = !_listening),
                  child: IgnorePointer(
                    child: WashSwap(
                      tappable: false,
                      value: _listening ? WashSwapState.on : WashSwapState.off,
                      semanticLabel: 'Wide button swap',
                      onChild: const Text('Listening'),
                      offChild: const Text('Muted'),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              const WashSwapClassLabel('btn swap (full width on mobile)'),
            ],
          ),
        ];
        if (row) {
          return Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: items,
          );
        }
        return Column(
          children: [
            for (var i = 0; i < items.length; i++) ...[
              if (i > 0) const SizedBox(height: 24),
              items[i],
            ],
          ],
        );
      },
    );
  }
}
