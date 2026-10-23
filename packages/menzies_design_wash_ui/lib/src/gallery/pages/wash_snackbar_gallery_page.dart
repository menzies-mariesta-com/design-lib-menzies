import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../components/snackbar/wash_snackbar.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashSnackbarGalleryPage extends StatefulWidget {
  const WashSnackbarGalleryPage({super.key});

  static const tones = <(String, WashAlertTone, String, String)>[
    ('Success', WashAlertTone.success, 'circle-check', 'Changes kept'),
    ('Error', WashAlertTone.error, 'circle-x', 'Could not undo'),
    ('Warning', WashAlertTone.warning, 'triangle-alert', 'Draft almost gone'),
    ('Info', WashAlertTone.info, 'info', 'Synced to desk'),
  ];

  static const placements = <(String, WashSnackbarPlacement)>[
    ('Bottom center', WashSnackbarPlacement.bottomCenter),
    ('Bottom start', WashSnackbarPlacement.bottomStart),
    ('Bottom end', WashSnackbarPlacement.bottomEnd),
  ];

  @override
  State<WashSnackbarGalleryPage> createState() =>
      _WashSnackbarGalleryPageState();
}

class _WashSnackbarGalleryPageState extends State<WashSnackbarGalleryPage> {
  @override
  void dispose() {
    WashSnackbarMessenger.dismissAll();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Snackbar',
      description:
          'Composed snackbar pattern from daisyUI toast and alert (no dedicated snackbar component in daisyUI 5.7.9).',
      sections: [
        _s(
          '01 · Basic',
          'Short message bar',
          'A single line inside toast + alert',
          _basic(),
          _basicDart,
        ),
        _s(
          '02 · With action',
          'Undo and Dismiss',
          'Snackbars often pair a brief message with a single action (Undo)',
          _actions(),
          _actionDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '03 · Colors',
          'Success, error, info, warning',
          'Reuse alert color classes',
          _colors(),
          _colorsDart,
        ),
        _s(
          '04 · Positions',
          'Bottom-first placements',
          'Snackbars lean Material: bottom-center and bottom-start first',
          const _PositionsDemo(),
          _positionsDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '05 · Interactive',
          'Trigger, auto-dismiss, cleanup',
          'Live snackbars auto-dismiss (~2.2s)',
          const _InteractiveDemo(),
          _interactiveDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '06 · Studio',
          'Menzies Design snackbars',
          'Wash saved and Pigment removed with Undo',
          const _StudioDemo(),
          _studioDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '07 · Responsive',
          'Viewport notes',
          'Keep snackbars thumb-reachable and short',
          _responsive(context),
          _responsiveDart,
        ),
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

  static Widget _basic() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const _Sample(
          label: 'toast toast-bottom toast-center > alert',
          child: WashSnackbarStage(
            snackbar:
                WashSnackbar(message: 'Wash layer locked', showDismiss: false),
          ),
        ),
        const WashSnackbarClassLabel(
          'toast toast-bottom toast-center > alert (composed snackbar)',
        ),
      ],
    );
  }

  static Widget _actions() {
    return _TwoCol(
      children: const [
        _Sample(
          label: 'toast > alert + Undo + Dismiss',
          child: WashSnackbarStage(
            snackbar: WashSnackbar(
              message: 'Plate archived',
              actionLabel: 'Undo',
              showDismiss: true,
            ),
          ),
        ),
        _Sample(
          label: 'toast > alert alert-soft + Undo',
          child: WashSnackbarStage(
            placement: WashSnackbarPlacement.bottomStart,
            snackbar: WashSnackbar(
              message: 'Tag removed',
              style: WashAlertStyle.soft,
              actionLabel: 'Undo',
            ),
          ),
        ),
      ],
    );
  }

  static Widget _colors() {
    return _TwoCol(
      children: [
        for (final t in WashSnackbarGalleryPage.tones)
          _Sample(
            label:
                'toast toast-bottom toast-center > alert ${washSnackbarAlertClass(tone: t.$2)}',
            child: WashSnackbarStage(
              minHeight: 96,
              snackbar: WashSnackbar(
                message: t.$4,
                tone: t.$2,
                iconName: t.$3,
              ),
            ),
          ),
      ],
    );
  }

  static Widget _responsive(BuildContext context) {
    final tokens = WashTokens.of(context);
    final itemStyle =
        WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14);
    final mono = itemStyle.copyWith(fontFamily: 'monospace', fontSize: 12);
    Widget bullet(List<InlineSpan> spans) {
      return Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('•  ', style: itemStyle),
            Expanded(child: Text.rich(TextSpan(children: spans))),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        bullet([
          TextSpan(
            text: 'Mobile (~360-430px): prefer ',
            style: itemStyle,
          ),
          TextSpan(text: 'toast-bottom toast-center', style: mono),
          TextSpan(
            text: ' so the bar stays centered above the home indicator.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(text: 'Tablet (~768-1024px): ', style: itemStyle),
          TextSpan(text: 'toast-bottom toast-start', style: mono),
          TextSpan(
            text: ' works when a side drawer is open.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(
            text:
                'Desktop (~1280px+): bottom-center remains the snackbar default. Reserve bottom-end for Toast CRUD feedback.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(
            text: 'Gallery static samples nest toast in ',
            style: itemStyle,
          ),
          TextSpan(text: 'relative', style: mono),
          TextSpan(text: ' panels with ', style: itemStyle),
          TextSpan(text: '!absolute', style: mono),
          TextSpan(
            text:
                '. Live triggers use page-level toast with timer cleanup on unmount.',
            style: itemStyle,
          ),
        ]),
        const WashSnackbarClassLabel(
          'toast toast-bottom toast-center z-[100] (snackbar default)',
        ),
      ],
    );
  }

  static const _basicDart = '''
WashSnackbarStage(
  snackbar: WashSnackbar(message: 'Wash layer locked'),
)
''';

  static const _actionDart = '''
WashSnackbar(message: 'Plate archived', actionLabel: 'Undo', showDismiss: true)
WashSnackbar(message: 'Tag removed', style: WashAlertStyle.soft, actionLabel: 'Undo')
''';

  static const _colorsDart = '''
WashSnackbar(message: 'Changes kept', tone: WashAlertTone.success, iconName: 'circle-check')
WashSnackbar(message: 'Could not undo', tone: WashAlertTone.error, iconName: 'circle-x')
''';

  static const _positionsDart = '''
showWashSnackbar(context, message: 'Bottom center', placement: WashSnackbarPlacement.bottomCenter)
WashSnackbarStage(placement: WashSnackbarPlacement.bottomStart, snackbar: WashSnackbar(...))
''';

  static const _interactiveDart = '''
showWashSnackbar(context, message: 'Brief snackbar')
showWashSnackbar(
  context,
  message: 'Item removed',
  actionLabel: 'Undo',
  onAction: () => WashSnackbarMessenger.showNote(context, message: 'Undo applied'),
  duration: kWashSnackbarActionDuration,
)
WashSnackbarMessenger.dismiss()
''';

  static const _studioDart = '''
showWashSnackbar(
  context,
  message: 'Wash saved',
  tone: WashAlertTone.success,
  iconName: 'circle-check',
  actionLabel: 'Undo',
  duration: kWashSnackbarActionDuration,
)
''';

  static const _responsiveDart = '''
showWashSnackbar(
  context,
  message: 'Brief snackbar',
  placement: WashSnackbarPlacement.bottomCenter,
)
''';
}

class _Sample extends StatelessWidget {
  const _Sample({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        child,
        WashSnackbarClassLabel(label),
      ],
    );
  }
}

class _TwoCol extends StatelessWidget {
  const _TwoCol({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 520;
        if (!wide) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (var i = 0; i < children.length; i++) ...[
                if (i > 0) const SizedBox(height: 16),
                children[i],
              ],
            ],
          );
        }
        final width = (constraints.maxWidth - 16) / 2;
        return Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            for (final child in children) SizedBox(width: width, child: child),
          ],
        );
      },
    );
  }
}

class _PositionsDemo extends StatelessWidget {
  const _PositionsDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= 520;
            final buttons = [
              for (final p in WashSnackbarGalleryPage.placements)
                _Sample(
                  label: washSnackbarToastClass(p.$2),
                  child: WashButton(
                    label: p.$1,
                    size: WashButtonSize.sm,
                    variant: WashButtonVariant.outline,
                    block: true,
                    onPressed: () => showWashSnackbar(
                      context,
                      message: p.$1,
                      placement: p.$2,
                    ),
                  ),
                ),
            ];
            if (!wide) {
              return Column(
                children: [
                  for (var i = 0; i < buttons.length; i++) ...[
                    if (i > 0) const SizedBox(height: 8),
                    buttons[i],
                  ],
                ],
              );
            }
            final width = (constraints.maxWidth - 16) / 3;
            return Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final b in buttons) SizedBox(width: width, child: b),
              ],
            );
          },
        ),
        const SizedBox(height: 20),
        SizedBox(
          height: 160,
          child: _StaticPlacementsStage(),
        ),
        const WashSnackbarClassLabel(
          'toast toast-bottom toast-{center|start|end}',
        ),
      ],
    );
  }
}

class _StaticPlacementsStage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ClipRRect(
      borderRadius: BorderRadius.circular(tokens.radiusBox),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.palette.base100.withValues(alpha: 0.6),
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
        ),
        child: Stack(
          children: [
            Positioned.fill(
              child: Center(
                child: Text(
                  'Contained bottom placements (static)',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 12),
                ),
              ),
            ),
            for (final p in WashSnackbarGalleryPage.placements)
              Positioned.fill(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Align(
                    alignment: washSnackbarAlignment(p.$2),
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 200),
                      child: WashSnackbar(
                        message: p.$1,
                        style: WashAlertStyle.soft,
                        compact: true,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _InteractiveDemo extends StatefulWidget {
  const _InteractiveDemo();

  @override
  State<_InteractiveDemo> createState() => _InteractiveDemoState();
}

class _InteractiveDemoState extends State<_InteractiveDemo> {
  @override
  void initState() {
    super.initState();
    WashSnackbarMessenger.addListener(_onSnack);
  }

  @override
  void dispose() {
    WashSnackbarMessenger.removeListener(_onSnack);
    super.dispose();
  }

  void _onSnack() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashButton(
              label: 'Show basic',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.defaultVariant,
              onPressed: () => showWashSnackbar(
                context,
                message: 'Brief snackbar',
              ),
            ),
            for (final t in WashSnackbarGalleryPage.tones)
              WashButton(
                size: WashButtonSize.sm,
                variant: switch (t.$2) {
                  WashAlertTone.success => WashButtonVariant.success,
                  WashAlertTone.error => WashButtonVariant.error,
                  WashAlertTone.warning => WashButtonVariant.warning,
                  WashAlertTone.info => WashButtonVariant.info,
                },
                onPressed: () => showWashSnackbar(
                  context,
                  message: t.$4,
                  tone: t.$2,
                  iconName: t.$3,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    WashLucideIcon(t.$3, size: 16, strokeWidth: 2),
                    const SizedBox(width: 6),
                    Text(t.$1),
                  ],
                ),
              ),
            WashButton(
              label: 'With Undo',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.primary,
              onPressed: () => showWashSnackbar(
                context,
                message: 'Item removed',
                actionLabel: 'Undo',
                onAction: () => WashSnackbarMessenger.showNote(
                  context,
                  message: 'Undo applied',
                ),
                duration: kWashSnackbarActionDuration,
              ),
            ),
            WashButton(
              label: 'Dismiss now',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.ghost,
              enabled: WashSnackbarMessenger.hasLive,
              onPressed: WashSnackbarMessenger.dismiss,
            ),
          ],
        ),
        const WashSnackbarClassLabel(
          'toast toast-bottom toast-center z-[100] > alert (+ Undo)',
        ),
      ],
    );
  }
}

class _StudioDemo extends StatelessWidget {
  const _StudioDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashButton(
              size: WashButtonSize.sm,
              variant: WashButtonVariant.success,
              onPressed: () => showWashSnackbar(
                context,
                message: 'Wash saved',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
                actionLabel: 'Undo',
                onAction: () => WashSnackbarMessenger.showNote(
                  context,
                  message: 'Wash save undone',
                ),
                duration: kWashSnackbarActionDuration,
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon('circle-check', size: 16, strokeWidth: 2),
                  SizedBox(width: 6),
                  Text('Wash saved'),
                ],
              ),
            ),
            WashButton(
              size: WashButtonSize.sm,
              variant: WashButtonVariant.error,
              onPressed: () => showWashSnackbar(
                context,
                message: 'Pigment removed',
                placement: WashSnackbarPlacement.bottomStart,
                tone: WashAlertTone.error,
                iconName: 'circle-x',
                actionLabel: 'Undo',
                onAction: () => WashSnackbarMessenger.showNote(
                  context,
                  message: 'Pigment restored',
                ),
                duration: kWashSnackbarActionDuration,
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon('circle-x', size: 16, strokeWidth: 2),
                  SizedBox(width: 6),
                  Text('Pigment removed'),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const _TwoCol(
          children: [
            _Sample(
              label: 'toast toast-bottom toast-center > alert-success + Undo',
              child: WashSnackbarStage(
                minHeight: 96,
                snackbar: WashSnackbar(
                  message: 'Wash saved',
                  tone: WashAlertTone.success,
                  iconName: 'circle-check',
                  actionLabel: 'Undo',
                ),
              ),
            ),
            _Sample(
              label: 'toast toast-bottom toast-start > alert-error + Undo',
              child: WashSnackbarStage(
                minHeight: 96,
                placement: WashSnackbarPlacement.bottomStart,
                snackbar: WashSnackbar(
                  message: 'Pigment removed',
                  tone: WashAlertTone.error,
                  iconName: 'circle-x',
                  actionLabel: 'Undo',
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
