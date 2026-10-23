import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../components/toast/wash_toast.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashToastGalleryPage extends StatefulWidget {
  const WashToastGalleryPage({super.key});

  static const tones = <(String, WashAlertTone, String, String)>[
    ('Success', WashAlertTone.success, 'circle-check', 'Created successfully'),
    ('Error', WashAlertTone.error, 'circle-x', 'Could not save changes'),
    (
      'Warning',
      WashAlertTone.warning,
      'triangle-alert',
      'This action needs review'
    ),
    ('Info', WashAlertTone.info, 'info', 'New pigment series is ready'),
  ];

  static const placements = <(String, WashToastPlacement)>[
    ('Top start', WashToastPlacement.topStart),
    ('Top center', WashToastPlacement.topCenter),
    ('Top end', WashToastPlacement.topEnd),
    ('Middle start', WashToastPlacement.middleStart),
    ('Middle center', WashToastPlacement.middleCenter),
    ('Middle end', WashToastPlacement.middleEnd),
    ('Bottom start', WashToastPlacement.bottomStart),
    ('Bottom center', WashToastPlacement.bottomCenter),
    ('Bottom end', WashToastPlacement.bottomEnd),
  ];

  static const softOutline =
      <(String, WashAlertTone, WashAlertStyle, String, String)>[
    (
      'Soft success',
      WashAlertTone.success,
      WashAlertStyle.soft,
      'circle-check',
      'Soft success toast'
    ),
    (
      'Outline error',
      WashAlertTone.error,
      WashAlertStyle.outline,
      'circle-x',
      'Outline error toast'
    ),
    (
      'Soft warning',
      WashAlertTone.warning,
      WashAlertStyle.soft,
      'triangle-alert',
      'Soft warning toast'
    ),
    (
      'Outline info',
      WashAlertTone.info,
      WashAlertStyle.outline,
      'info',
      'Outline info toast'
    ),
  ];

  @override
  State<WashToastGalleryPage> createState() => _WashToastGalleryPageState();
}

class _WashToastGalleryPageState extends State<WashToastGalleryPage> {
  @override
  void dispose() {
    WashToastMessenger.dismissAll();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Toast',
      description: 'daisyUI toast placements and alert wrappers.',
      sections: [
        _s(
          '01 · Interactive',
          'Show toast',
          'Trigger a live toast that auto-dismisses after a few seconds',
          const _InteractiveDemo(),
          _interactiveDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '02 · CRUD pattern',
          'Bottom-end mutation feedback',
          'form-crud-ui: every create, update, or delete ends with toast-bottom',
          const _CrudDemo(),
          _crudDart,
        ),
        _s(
          '03 · Studio',
          'Pigment desk messages',
          'Menzies Design copy for save and failure feedback',
          const _StudioDemo(),
          _studioDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '04 · Placements',
          'All nine corners and edges',
          'toast-start / toast-center / toast-end combined',
          const _PlacementsDemo(),
          _placementsDart,
        ),
        _s(
          '05 · Alert colors',
          'Toast wrapping alerts',
          'success, error, warning, and info alerts inside toast',
          const _ColorsDemo(),
          _colorsDart,
          tint: WashGalleryPanelTint.ochre,
        ),
        _s(
          '06 · Soft and outline',
          'Alert styles in toast',
          'alert-soft and alert-outline work inside toast',
          const _SoftOutlineDemo(),
          _softOutlineDart,
        ),
        _s(
          '07 · Stacked',
          'Multiple alerts in one toast',
          'A single toast wrapper stacks several alerts',
          const _StackedDemo(),
          _stackedDart,
          tint: WashGalleryPanelTint.rose,
        ),
        _s(
          '08 · Responsive',
          'Viewport notes',
          'Toast stays fixed to the viewport corner',
          _responsive(context),
          _responsiveDart,
          tint: WashGalleryPanelTint.ochre,
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
          TextSpan(text: 'Mobile (~360-430px): use ', style: itemStyle),
          TextSpan(text: 'toast-bottom toast-end', style: mono),
          TextSpan(text: ' or ', style: itemStyle),
          TextSpan(text: 'toast-bottom toast-center', style: mono),
          TextSpan(
            text: '. Keep messages short so they wrap cleanly.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(
            text:
                'Tablet (~768-1024px): all nine placements work. Avoid middle-center for long CRUD strings.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(
            text:
                'Desktop (~1280px+): bottom-end remains the form-crud-ui default. Raise with ',
            style: itemStyle,
          ),
          TextSpan(text: 'z-[100]', style: mono),
          TextSpan(
            text: ' so toasts sit above drawers and dialogs.',
            style: itemStyle,
          ),
        ]),
        bullet([
          TextSpan(
            text: 'Gallery demos nest toast in ',
            style: itemStyle,
          ),
          TextSpan(text: 'relative', style: mono),
          TextSpan(text: ' panels with ', style: itemStyle),
          TextSpan(text: '!absolute', style: mono),
          TextSpan(
            text:
                ' so static samples do not escape the page. Live triggers still use page-level toast.',
            style: itemStyle,
          ),
        ]),
        const WashToastClassLabel(
          'toast toast-bottom toast-end z-[100] (CRUD default)',
        ),
      ],
    );
  }

  static const _interactiveDart = '''
showWashToast(
  context,
  message: 'Created successfully',
  tone: WashAlertTone.success,
  iconName: 'circle-check',
)
''';

  static const _crudDart = '''
showWashToast(context, message: 'Plate saved successfully', tone: WashAlertTone.success, iconName: 'circle-check')
WashToastStage(
  placement: WashToastPlacement.bottomEnd,
  alerts: [WashToastAlert(message: 'Created successfully', tone: WashAlertTone.success, iconName: 'circle-check')],
)
''';

  static const _studioDart = '''
showWashToast(context, message: 'Pigment saved', tone: WashAlertTone.success, iconName: 'circle-check')
showWashToast(context, message: 'Wash failed', tone: WashAlertTone.error, iconName: 'circle-x')
''';

  static const _placementsDart = '''
showWashToast(context, message: 'Top start', placement: WashToastPlacement.topStart, tone: WashAlertTone.info)
WashToastStage(placement: WashToastPlacement.bottomEnd, alerts: [WashToastAlert(...)])
''';

  static const _colorsDart = '''
WashToastStage(
  alerts: [WashToastAlert(message: 'Created successfully', tone: WashAlertTone.success, iconName: 'circle-check')],
)
''';

  static const _softOutlineDart = '''
WashToastAlert(message: 'Soft success toast', tone: WashAlertTone.success, style: WashAlertStyle.soft, iconName: 'circle-check')
WashToastAlert(message: 'Outline error toast', tone: WashAlertTone.error, style: WashAlertStyle.outline, iconName: 'circle-x')
''';

  static const _stackedDart = '''
WashToastStage(
  placement: WashToastPlacement.topEnd,
  alerts: [
    WashToastAlert(message: 'New message arrived', tone: WashAlertTone.info, iconName: 'info'),
    WashToastAlert(message: 'Message marked as read', tone: WashAlertTone.success, iconName: 'circle-check'),
  ],
)
WashToastMessenger.pushStack(context, message: 'Stack item 1', tone: WashAlertTone.info, iconName: 'info')
''';

  static const _responsiveDart = '''
showWashToast(
  context,
  message: 'Created successfully',
  placement: WashToastPlacement.bottomEnd,
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
        WashToastClassLabel(label),
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

class _IconBtn extends StatelessWidget {
  const _IconBtn({
    required this.label,
    required this.iconName,
    required this.variant,
    required this.onPressed,
  });

  final String label;
  final String iconName;
  final WashButtonVariant variant;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return WashButton(
      size: WashButtonSize.sm,
      variant: variant,
      onPressed: onPressed,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          WashLucideIcon(iconName, size: 16, strokeWidth: 2),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}

WashButtonVariant _toneVariant(WashAlertTone tone) {
  return switch (tone) {
    WashAlertTone.success => WashButtonVariant.success,
    WashAlertTone.error => WashButtonVariant.error,
    WashAlertTone.warning => WashButtonVariant.warning,
    WashAlertTone.info => WashButtonVariant.info,
  };
}

class _InteractiveDemo extends StatelessWidget {
  const _InteractiveDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final t in WashToastGalleryPage.tones)
              _IconBtn(
                label: 'Show ${t.$1}',
                iconName: t.$3,
                variant: _toneVariant(t.$2),
                onPressed: () => showWashToast(
                  context,
                  message: t.$4,
                  tone: t.$2,
                  iconName: t.$3,
                ),
              ),
          ],
        ),
        const WashToastClassLabel(
          'toast toast-bottom toast-end z-[100] > alert alert-{color}',
        ),
      ],
    );
  }
}

class _CrudDemo extends StatelessWidget {
  const _CrudDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _IconBtn(
              label: 'Simulate create',
              iconName: 'circle-check',
              variant: WashButtonVariant.primary,
              onPressed: () => showWashToast(
                context,
                message: 'Plate saved successfully',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
              ),
            ),
            _IconBtn(
              label: 'Simulate update',
              iconName: 'circle-check',
              variant: WashButtonVariant.secondary,
              onPressed: () => showWashToast(
                context,
                message: 'Wash series updated',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
              ),
            ),
            _IconBtn(
              label: 'Simulate delete error',
              iconName: 'circle-x',
              variant: WashButtonVariant.error,
              onPressed: () => showWashToast(
                context,
                message: 'Delete failed. Try again.',
                tone: WashAlertTone.error,
                iconName: 'circle-x',
              ),
            ),
            _IconBtn(
              label: 'Simulate warning',
              iconName: 'triangle-alert',
              variant: WashButtonVariant.warning,
              onPressed: () => showWashToast(
                context,
                message: 'Unsaved wash changes remain',
                tone: WashAlertTone.warning,
                iconName: 'triangle-alert',
              ),
            ),
            _IconBtn(
              label: 'Simulate info',
              iconName: 'info',
              variant: WashButtonVariant.info,
              onPressed: () => showWashToast(
                context,
                message: 'Export queued for tonight',
                tone: WashAlertTone.info,
                iconName: 'info',
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const WashToastStage(
          minHeight: 160,
          alerts: [
            WashToastAlert(
              message: 'Created successfully',
              tone: WashAlertTone.success,
              iconName: 'circle-check',
            ),
          ],
        ),
        const WashToastClassLabel(
          'toast toast-bottom toast-end z-[100] > alert alert-success',
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
            _IconBtn(
              label: 'Pigment saved',
              iconName: 'circle-check',
              variant: WashButtonVariant.success,
              onPressed: () => showWashToast(
                context,
                message: 'Pigment saved',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
              ),
            ),
            _IconBtn(
              label: 'Wash failed',
              iconName: 'circle-x',
              variant: WashButtonVariant.error,
              onPressed: () => showWashToast(
                context,
                message: 'Wash failed',
                tone: WashAlertTone.error,
                iconName: 'circle-x',
              ),
            ),
            _IconBtn(
              label: 'Layer locked',
              iconName: 'info',
              variant: WashButtonVariant.info,
              onPressed: () => showWashToast(
                context,
                message: 'Layer opacity locked for this plate',
                tone: WashAlertTone.info,
                iconName: 'info',
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const _TwoCol(
          children: [
            _Sample(
              label: 'toast > alert alert-success (Pigment saved)',
              child: WashToastStage(
                alerts: [
                  WashToastAlert(
                    message: 'Pigment saved',
                    tone: WashAlertTone.success,
                    iconName: 'circle-check',
                  ),
                ],
              ),
            ),
            _Sample(
              label: 'toast > alert alert-error (Wash failed)',
              child: WashToastStage(
                alerts: [
                  WashToastAlert(
                    message: 'Wash failed',
                    tone: WashAlertTone.error,
                    iconName: 'circle-x',
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _PlacementsDemo extends StatelessWidget {
  const _PlacementsDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= 520;
            final buttons = [
              for (final p in WashToastGalleryPage.placements)
                _Sample(
                  label: washToastClass(p.$2),
                  child: WashButton(
                    label: p.$1,
                    size: WashButtonSize.sm,
                    variant: WashButtonVariant.outline,
                    block: true,
                    onPressed: () => showWashToast(
                      context,
                      message: p.$1,
                      placement: p.$2,
                      tone: WashAlertTone.info,
                      iconName: 'info',
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
        const SizedBox(
          height: 224,
          child: _StaticPlacementsStage(),
        ),
        const WashToastClassLabel(
          'toast toast-{top|middle|bottom} toast-{start|center|end}',
        ),
      ],
    );
  }
}

class _StaticPlacementsStage extends StatelessWidget {
  const _StaticPlacementsStage();

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
                  'Contained placement preview (static)',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 12),
                ),
              ),
            ),
            for (final p in WashToastGalleryPage.placements)
              Positioned.fill(
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: Align(
                    alignment: washToastAlignment(p.$2),
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 160),
                      child: WashToastAlert(
                        message: p.$1,
                        tone: WashAlertTone.info,
                        style: WashAlertStyle.soft,
                        dense: true,
                        shadow: true,
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

class _ColorsDemo extends StatelessWidget {
  const _ColorsDemo();

  @override
  Widget build(BuildContext context) {
    return _TwoCol(
      children: [
        for (final t in WashToastGalleryPage.tones)
          _Sample(
            label:
                'toast toast-bottom toast-end > alert ${washToastAlertClass(tone: t.$2)}',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashToastStage(
                  alerts: [
                    WashToastAlert(
                      message: t.$4,
                      tone: t.$2,
                      iconName: t.$3,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                WashButton(
                  label: 'Show live',
                  size: WashButtonSize.xs,
                  variant: WashButtonVariant.ghost,
                  onPressed: () => showWashToast(
                    context,
                    message: t.$4,
                    tone: t.$2,
                    iconName: t.$3,
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _SoftOutlineDemo extends StatelessWidget {
  const _SoftOutlineDemo();

  @override
  Widget build(BuildContext context) {
    return _TwoCol(
      children: [
        for (final t in WashToastGalleryPage.softOutline)
          _Sample(
            label:
                'toast > alert ${washToastAlertClass(tone: t.$2, style: t.$3)}',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                WashToastStage(
                  alerts: [
                    WashToastAlert(
                      message: t.$5,
                      tone: t.$2,
                      style: t.$3,
                      iconName: t.$4,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                WashButton(
                  label: 'Show live',
                  size: WashButtonSize.xs,
                  variant: WashButtonVariant.ghost,
                  onPressed: () => showWashToast(
                    context,
                    message: t.$5,
                    tone: t.$2,
                    style: t.$3,
                    iconName: t.$4,
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _StackedDemo extends StatefulWidget {
  const _StackedDemo();

  @override
  State<_StackedDemo> createState() => _StackedDemoState();
}

class _StackedDemoState extends State<_StackedDemo> {
  @override
  void initState() {
    super.initState();
    WashToastMessenger.addListener(_onToast);
  }

  @override
  void dispose() {
    WashToastMessenger.removeListener(_onToast);
    super.dispose();
  }

  void _onToast() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const _Sample(
          label: 'toast toast-top toast-end > alert × 2',
          child: WashToastStage(
            minHeight: 176,
            placement: WashToastPlacement.topEnd,
            alerts: [
              WashToastAlert(
                message: 'New message arrived',
                tone: WashAlertTone.info,
                iconName: 'info',
              ),
              WashToastAlert(
                message: 'Message marked as read',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _IconBtn(
              label: 'Push stack toast',
              iconName: 'info',
              variant: WashButtonVariant.defaultVariant,
              onPressed: () => WashToastMessenger.pushStack(
                context,
                message: 'Stack item ${WashToastMessenger.stackLength + 1}',
                tone: WashAlertTone.info,
                iconName: 'info',
              ),
            ),
            _IconBtn(
              label: 'Push success',
              iconName: 'circle-check',
              variant: WashButtonVariant.success,
              onPressed: () => WashToastMessenger.pushStack(
                context,
                message: 'Pigment saved',
                tone: WashAlertTone.success,
                iconName: 'circle-check',
              ),
            ),
            _IconBtn(
              label: 'Push error',
              iconName: 'circle-x',
              variant: WashButtonVariant.error,
              onPressed: () => WashToastMessenger.pushStack(
                context,
                message: 'Wash failed',
                tone: WashAlertTone.error,
                iconName: 'circle-x',
              ),
            ),
            WashButton(
              label: 'Clear stack',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.ghost,
              enabled: WashToastMessenger.hasStack,
              onPressed: WashToastMessenger.clearStack,
            ),
          ],
        ),
        const WashToastClassLabel(
          'toast toast-bottom toast-end > alert + alert + …',
        ),
      ],
    );
  }
}
