import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/card/wash_card.dart';
import '../../foundation/reduced_motion.dart';
import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashRippleGalleryPage extends StatelessWidget {
  const WashRippleGalleryPage({super.key});

  static const _usageDart = '''
// Class-only opt-in on any press host (buttons, cards, panels).
WashButton(
  label: 'Class-only press',
  variant: WashButtonVariant.primary,
  onPressed: () {},
)

// Imperative tint + origin on WashRipple hosts:
WashRipple(
  tint: WashRippleTint.primary,
  origin: WashRippleOrigin.center,
  semanticButton: true,
  onTap: () {},
  child: myCard,
)
''';

  static const _basicDart = '''
WashButton(label: 'Press wash', variant: WashButtonVariant.defaultVariant, onPressed: () {})
WashButton(label: 'Outline press', variant: WashButtonVariant.outline, onPressed: () {})
WashButton(
  label: 'Soft ink',
  soft: true,
  rippleTint: WashRippleTint.ink,
  onPressed: () {},
)
''';

  static const _colorsDart = '''
WashButton(label: 'Primary', variant: WashButtonVariant.primary, rippleTint: WashRippleTint.primary, onPressed: () {})
WashButton(label: 'Secondary', variant: WashButtonVariant.secondary, rippleTint: WashRippleTint.secondary, onPressed: () {})
WashButton(label: 'Accent', variant: WashButtonVariant.accent, rippleTint: WashRippleTint.accent, onPressed: () {})
''';

  static const _originDart = '''
WashButton(label: 'Pointer origin', variant: WashButtonVariant.primary, onPressed: () {})
WashButton(
  label: 'Centered',
  variant: WashButtonVariant.secondary,
  rippleTint: WashRippleTint.secondary,
  rippleOrigin: WashRippleOrigin.center,
  onPressed: () {},
)
''';

  static const _surfacesDart = '''
WashRipple(
  semanticButton: true,
  tint: WashRippleTint.primary,
  onTap: () {},
  child: WashCard(body: WashCardBody(children: [WashCardTitle('Mist plate'), …])),
)
WashButton(
  square: true,
  variant: WashButtonVariant.ghost,
  tint: WashButtonVariant.primary,
  rippleTint: WashRippleTint.primary,
  child: WashLucideIcon('heart', size: 20),
  onPressed: () {},
)
''';

  static const _studioDart = '''
WashRipple(
  semanticButton: true,
  tint: WashRippleTint.primary,
  onTap: () {},
  child: WashGalleryPanel(
    tint: WashGalleryPanelTint.ochre,
    child: Row(children: [WashLucideIcon('droplets'), …]),
  ),
)
''';

  static const _motionDart = '''
// Skips wave spawn when MediaQuery.disableAnimations is true
// (mirrors web prefers-reduced-motion).
final reduced = WashReducedMotion.of(context);
WashButton(
  label: reduced ? 'Ripple disabled' : 'Try a press',
  variant: WashButtonVariant.primary,
  onPressed: () {},
)
''';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Ripple',
      description: 'Soft wash bloom on press.',
      sections: [
        _section(
          eyebrow: '00 · Usage',
          title: 'How to opt in',
          description: 'Shared CSS host + one global listener',
          preview: _usagePreview(),
          dart: _usageDart,
        ),
        _section(
          eyebrow: '01 · Basic',
          title: 'Click ripple on buttons',
          description: 'Pointer-origin wash bloom on daisyUI buttons',
          preview: _basicPreview(),
          dart: _basicDart,
        ),
        _section(
          eyebrow: '02 · Colors',
          title: 'Primary, secondary, accent washes',
          description: 'Tinted ripple ink matched to studio theme colors',
          tint: WashGalleryPanelTint.ochre,
          preview: _colorsPreview(),
          dart: _colorsDart,
        ),
        _section(
          eyebrow: '03 · Origin',
          title: 'Centered vs pointer-origin',
          description: 'Centered blooms from the host middle',
          preview: _originPreview(),
          dart: _originDart,
        ),
        _section(
          eyebrow: '04 · Surfaces',
          title: 'Cards and icon buttons',
          description: 'Ripple hosts on card plates and square icon actions',
          tint: WashGalleryPanelTint.rose,
          preview: _surfacesPreview(),
          dart: _surfacesDart,
        ),
        _section(
          eyebrow: '05 · Studio',
          title: 'Pigment plate press',
          description:
              'A wash panel that blooms from the press point, like a drop hitting',
          preview: _studioPreview(context),
          dart: _studioDart,
        ),
        _section(
          eyebrow: '06 · Motion',
          title: 'Reduced motion',
          description:
              'Ripple nodes are not spawned when the OS asks for less motion',
          tint: WashGalleryPanelTint.ochre,
          preview: const _RippleMotionPreview(),
          dart: _motionDart,
        ),
      ],
    );
  }

  static Widget _section({
    required String eyebrow,
    required String title,
    required String description,
    required Widget preview,
    required String dart,
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: description,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _classLabel(String value) {
    return Text(
      value,
      style: WashTypography.label(const Color(0xff6e6a61)).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        child,
        const SizedBox(height: 8),
        _classLabel(label),
      ],
    );
  }

  static Widget _muted(BuildContext context, String text) {
    return Text(
      text,
      style: WashTypography.body(WashTokens.of(context).inkMuted)
          .copyWith(fontSize: 14),
    );
  }

  static Widget _usagePreview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _mutedParagraph([
          const TextSpan(text: 'Add '),
          WidgetSpan(child: _classLabel('ripple')),
          const TextSpan(text: ' (or '),
          WidgetSpan(child: _classLabel('data-ripple')),
          const TextSpan(text: ') next to '),
          WidgetSpan(child: _classLabel('btn')),
          const TextSpan(text: '. Optional: '),
          WidgetSpan(child: _classLabel('data-ripple-origin="center"')),
          const TextSpan(text: ', tint helpers '),
          WidgetSpan(child: _classLabel('ripple-primary')),
          const TextSpan(text: ', opt-out '),
          WidgetSpan(child: _classLabel('no-ripple')),
          const TextSpan(text: '.'),
        ]),
        const SizedBox(height: 12),
        _mutedParagraph([
          const TextSpan(text: 'Imperative Flutter path: wrap hosts with '),
          WidgetSpan(child: _classLabel('WashRipple')),
          const TextSpan(text: ' (set '),
          WidgetSpan(child: _classLabel('semanticButton: true')),
          const TextSpan(
              text: ' on card-like surfaces). Core helpers live in '),
          WidgetSpan(child: _classLabel('wash_ripple.dart')),
          const TextSpan(text: '.'),
        ]),
        const SizedBox(height: 12),
        _sample(
          'btn ripple (class only)',
          WashButton(
            label: 'Class-only press',
            variant: WashButtonVariant.primary,
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  static Widget _mutedParagraph(List<InlineSpan> children) {
    return Text.rich(
      TextSpan(
        style: WashTypography.body(const Color(0xff6e6a61))
            .copyWith(fontSize: 14, height: 1.45),
        children: children,
      ),
    );
  }

  static Widget _basicPreview() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'ripple + btn',
          WashButton(
            label: 'Press wash',
            variant: WashButtonVariant.defaultVariant,
            onPressed: () {},
          ),
        ),
        _sample(
          'ripple + btn btn-outline',
          WashButton(
            label: 'Outline press',
            variant: WashButtonVariant.outline,
            onPressed: () {},
          ),
        ),
        _sample(
          'ripple ripple-ink + btn btn-soft',
          WashButton(
            label: 'Soft ink',
            soft: true,
            rippleTint: WashRippleTint.ink,
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  static Widget _colorsPreview() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'ripple ripple-primary + btn btn-primary',
          WashButton(
            label: 'Primary',
            variant: WashButtonVariant.primary,
            rippleTint: WashRippleTint.primary,
            onPressed: () {},
          ),
        ),
        _sample(
          'ripple ripple-secondary + btn btn-secondary',
          WashButton(
            label: 'Secondary',
            variant: WashButtonVariant.secondary,
            rippleTint: WashRippleTint.secondary,
            onPressed: () {},
          ),
        ),
        _sample(
          'ripple ripple-accent + btn btn-accent',
          WashButton(
            label: 'Accent',
            variant: WashButtonVariant.accent,
            rippleTint: WashRippleTint.accent,
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  static Widget _originPreview() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'ripple (pointer origin)',
          WashButton(
            label: 'Pointer origin',
            variant: WashButtonVariant.primary,
            onPressed: () {},
          ),
        ),
        _sample(
          'ripple data-ripple-origin="center"',
          WashButton(
            label: 'Centered',
            variant: WashButtonVariant.secondary,
            rippleTint: WashRippleTint.secondary,
            rippleOrigin: WashRippleOrigin.center,
            onPressed: () {},
          ),
        ),
      ],
    );
  }

  static Widget _surfacesPreview() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 900;
        final card = _sample(
          'ripple + card',
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 384),
            child: WashRipple(
              semanticButton: true,
              tint: WashRippleTint.primary,
              onTap: () {},
              borderRadius: 16,
              child: WashCard(
                body: WashCardBody(
                  children: [
                    const WashCardTitle('Mist plate'),
                    _muted(
                      context,
                      'Press anywhere on the card for a soft primary wash.',
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
        final icons = Wrap(
          spacing: 16,
          runSpacing: 16,
          crossAxisAlignment: WrapCrossAlignment.end,
          children: [
            _sample(
              'ripple + btn-square',
              WashTooltip(
                message: 'Favorite',
                child: WashButton(
                  square: true,
                  variant: WashButtonVariant.ghost,
                  tint: WashButtonVariant.primary,
                  rippleTint: WashRippleTint.primary,
                  onPressed: () {},
                  child: const WashLucideIcon('heart', size: 20),
                ),
              ),
            ),
            _sample(
              'ripple + btn-square',
              WashTooltip(
                message: 'Settings',
                child: WashButton(
                  square: true,
                  variant: WashButtonVariant.ghost,
                  tint: WashButtonVariant.secondary,
                  rippleTint: WashRippleTint.secondary,
                  onPressed: () {},
                  child: const WashLucideIcon('settings', size: 20),
                ),
              ),
            ),
            _sample(
              'ripple + btn-square',
              WashTooltip(
                message: 'Palette',
                child: WashButton(
                  square: true,
                  variant: WashButtonVariant.ghost,
                  tint: WashButtonVariant.accent,
                  rippleTint: WashRippleTint.accent,
                  onPressed: () {},
                  child: const WashLucideIcon('palette', size: 20),
                ),
              ),
            ),
          ],
        );
        if (!wide) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [card, const SizedBox(height: 24), icons],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(child: card),
            const SizedBox(width: 24),
            Expanded(child: icons),
          ],
        );
      },
    );
  }

  static Widget _studioPreview(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _sample(
      'ripple ripple-primary + wash-panel',
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 448),
        child: WashRipple(
          semanticButton: true,
          tint: WashRippleTint.primary,
          onTap: () {},
          borderRadius: 16,
          child: WashGalleryPanel(
            tint: WashGalleryPanelTint.ochre,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: WashLucideIcon('droplets',
                      size: 20, color: tokens.palette.primary),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Cerulean drop',
                        style: WashTypography.title(tokens.onSurface).copyWith(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      _muted(
                        context,
                        'Press the plate. Watch the wash expand from your fingertip.',
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _RippleMotionPreview extends StatelessWidget {
  const _RippleMotionPreview();

  @override
  Widget build(BuildContext context) {
    final reduced = WashReducedMotion.of(context);
    final tokens = WashTokens.of(context);
    final pref = reduced
        ? 'prefers-reduced-motion: reduce'
        : 'prefers-reduced-motion: no-preference';
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text.rich(
          TextSpan(
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            children: [
              const TextSpan(text: 'Current preference: '),
              TextSpan(
                text: pref,
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: tokens.onSurface,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Text(
          'Under reduce, handlers skip wave creation and any leftover waves '
          'are cleared on unmount with timers and DOM nodes.',
          style: WashTypography.body(tokens.inkMuted)
              .copyWith(fontSize: 14, height: 1.45),
        ),
        const SizedBox(height: 12),
        WashRippleGalleryPage._sample(
          'ripple (motion gated)',
          WashButton(
            label: reduced ? 'Ripple disabled' : 'Try a press',
            variant: WashButtonVariant.primary,
            onPressed: () {},
          ),
        ),
      ],
    );
  }
}
