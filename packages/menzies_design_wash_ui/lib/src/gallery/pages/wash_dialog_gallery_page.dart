import 'package:flutter/widgets.dart';

import '../../components/bottom_sheet/wash_bottom_sheet.dart';
import '../../components/button/wash_button.dart';
import '../../components/dialog/wash_dialog.dart';
import '../../foundation/wash_modal_scope.dart';
import '../../foundation/wash_primitives.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_form_fields.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDialogGalleryPage extends StatelessWidget {
  const WashDialogGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Dialog',
      description:
          'daisyUI modal and <dialog> patterns: native dialog, checkbox toggle, popover, placements.',
      sections: [
        _s('01 · Default dialog', 'HTML dialog element', 'Recommended', const _DefaultDemo(), _defaultDart),
        _s('02 · Backdrop', 'Close on outside click', 'A second form with modal-backdrop covers the page', const _BackdropDemo(), _backdropDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Corner close', 'Ghost circle dismiss', 'Absolute btn-circle in the modal-box corner via form method=dialog', const _CornerDemo(), _cornerDart),
        _s('04 · Sizes', 'Custom modal width', 'Any w- / max-w- utilities on modal-box', const _SizesDemo(), _sizesDart, tint: WashGalleryPanelTint.rose),
        _s('05 · Placement', 'Top, middle, bottom, start, end', 'Placement modifiers on the modal root', const _PlacementDemo(), _placementDart),
        _s('06 · Responsive', 'Bottom on small, middle on sm+', 'Combine modal-bottom with sm:modal-middle for mobile sheets', const _ResponsiveDemo(), _responsiveDart, tint: WashGalleryPanelTint.ochre),
        _s('07 · Force open', 'modal-open modifier', 'Keeps the modal visible via class', const _ForceOpenDemo(), _forceDart, tint: WashGalleryPanelTint.rose),
        _s('08 · Checkbox (legacy)', 'modal-toggle + label', 'Hidden checkbox controls open state', const _CheckboxDemo(), _checkboxDart),
        _s('09 · Popover', 'Popover API modal', 'Does not trap focus', const _PopoverDemo(), _popoverDart, tint: WashGalleryPanelTint.ochre),
        _s('10 · Form dialog', 'Create wash entry', 'Form inside modal-box with required labels and primary title', const _FormDemo(), _formDart),
        _s('11 · Alert confirm', 'Destructive confirm', 'Alert-style confirm with text-error font-bold title', const _AlertDemo(), _alertDart, tint: WashGalleryPanelTint.rose),
        _s('12 · Parts reference', 'Class map', 'Component, parts, modifier, and placement classes from daisyUI', const _PartsDemo(), _partsDart),
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
}

class _ClassLabel extends StatelessWidget {
  const _ClassLabel(this.value);
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text(
        value,
        style: WashTypography.label(WashTokens.of(context).inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10,
        ),
      ),
    );
  }
}

Widget _title(BuildContext context, String text) {
  return Text(
    text,
    style: WashTypography.title(WashTokens.of(context).onSurface).copyWith(
      fontSize: 18,
      fontWeight: FontWeight.bold,
    ),
  );
}

Widget _muted(BuildContext context, String text) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 16),
    child: Text(text, style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(fontSize: 14)),
  );
}

Widget _cardTitle(BuildContext context, String text, Color color) {
  return Text(
    text,
    style: WashTypography.title(color).copyWith(fontWeight: FontWeight.bold),
  );
}

void _openDialog(
  BuildContext context, {
  required Widget child,
  bool barrierDismissible = true,
  bool blocksBackground = true,
  WashDialogPlacement placement = WashDialogPlacement.middle,
  double? maxWidth,
}) {
  showWashDialog<void>(
    context: context,
    barrierDismissible: barrierDismissible,
    blocksBackground: blocksBackground,
    placement: placement,
    maxWidth: maxWidth,
    builder: (ctx) => child,
  );
}

class _DefaultDemo extends StatelessWidget {
  const _DefaultDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open dialog',
          onPressed: () => _openDialog(
            context,
            child: WashModalBox(
              dialogStyle: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _title(context, 'Hello!'),
                  _muted(context, 'Press Esc or click Close. Native dialog locks background focus.'),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('dialog.modal + modal-box + modal-action'),
      ],
    );
  }
}

class _BackdropDemo extends StatelessWidget {
  const _BackdropDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open with backdrop',
          variant: WashButtonVariant.primary,
          onPressed: () => _openDialog(
            context,
            child: WashModalBox(
              dialogStyle: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _title(context, 'Outside click'),
                  _muted(context, 'Press Esc or click outside the box to close.'),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('form.modal-backdrop method=dialog'),
      ],
    );
  }
}

class _CornerDemo extends StatelessWidget {
  const _CornerDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open corner close',
          onPressed: () => _openDialog(
            context,
            child: WashModalBox(
              dialogStyle: true,
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _title(context, 'Corner dismiss'),
                      _muted(context, 'Esc or the corner control closes this dialog.'),
                    ],
                  ),
                  const WashModalCornerClose(),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('btn-sm btn-circle btn-ghost absolute right-2 top-2'),
      ],
    );
  }
}

class _SizesDemo extends StatelessWidget {
  const _SizesDemo();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        _sizeButton(context, 'Narrow', maxWidth: 320, label: 'modal-box w-11/12 max-w-xs'),
        _sizeButton(context, 'Default', maxWidth: null, label: 'modal-box (default)'),
        _sizeButton(context, 'Wide', maxWidth: 1024, label: 'modal-box w-11/12 max-w-5xl'),
      ],
    );
  }

  Widget _sizeButton(BuildContext context, String name, {required double? maxWidth, required String label}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: name,
          onPressed: () => _openDialog(
            context,
            maxWidth: maxWidth,
            child: WashModalBox(
              dialogStyle: true,
              width: maxWidth,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _title(context, name),
                  _muted(context, 'Width tuned with Tailwind utilities on modal-box.'),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        _ClassLabel(label),
      ],
    );
  }
}

class _PlacementDemo extends StatelessWidget {
  const _PlacementDemo();

  static const _items = [
    ('Top', WashDialogPlacement.top),
    ('Middle', WashDialogPlacement.middle),
    ('Bottom', WashDialogPlacement.bottom),
    ('Start', WashDialogPlacement.start),
    ('End', WashDialogPlacement.end),
  ];

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: _items.map((e) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashButton(
              label: e.$1,
              onPressed: () => _openDialog(
                context,
                placement: e.$2,
                child: WashModalBox(
                  dialogStyle: e.$2 != WashDialogPlacement.bottom,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _title(context, e.$1),
                      _muted(context, 'Anchored with modal-${e.$1.toLowerCase()}.'),
                      WashModalActions(
                        children: [
                          WashButton(
                            label: 'Close',
                            onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            _ClassLabel('modal modal-${e.$1.toLowerCase()}'),
          ],
        );
      }).toList(),
    );
  }
}

class _ResponsiveDemo extends StatelessWidget {
  const _ResponsiveDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open responsive',
          onPressed: () => _openDialog(
            context,
            placement: WashDialogPlacement.responsive,
            child: WashModalBox(
              dialogStyle: false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _title(context, 'Responsive sheet'),
                  _muted(
                    context,
                    'Bottom sheet on narrow viewports; centered from sm up.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('modal modal-bottom sm:modal-middle'),
      ],
    );
  }
}

class _ForceOpenDemo extends StatefulWidget {
  const _ForceOpenDemo();

  @override
  State<_ForceOpenDemo> createState() => _ForceOpenDemoState();
}

class _ForceOpenDemoState extends State<_ForceOpenDemo> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashButton(
              label: 'Force open',
              variant: WashButtonVariant.secondary,
              onPressed: () => setState(() => _open = true),
            ),
            const _ClassLabel('modal modal-open'),
          ],
        ),
        WashForcedModal(
          open: _open,
          onClose: () => setState(() => _open = false),
          child: WashModalBox(
            dialogStyle: true,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                _title(context, 'Forced open'),
                _muted(
                  context,
                  'Visible while modal-open is applied. Clear the class to dismiss.',
                ),
                WashModalActions(
                  children: [
                    WashButton(
                      label: 'Close',
                      onPressed: () => setState(() => _open = false),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _CheckboxDemo extends StatelessWidget {
  const _CheckboxDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashCheckboxDialog(
          trigger: (open) => WashButton(label: 'Open checkbox modal', onPressed: open),
          dialog: WashModalBox(
            dialogStyle: true,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                _title(context, 'Checkbox modal'),
                _muted(context, 'Legacy pattern. No Esc dismiss; use the action or backdrop label.'),
                WashModalActions(
                  children: [
                    WashButton(
                      label: 'Close',
                      onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const _ClassLabel('input.modal-toggle + label[for]'),
      ],
    );
  }
}

class _PopoverDemo extends StatelessWidget {
  const _PopoverDemo();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashButton(
              label: 'Open popover',
              onPressed: () => _openDialog(
                context,
                blocksBackground: false,
                child: WashModalBox(
                  dialogStyle: true,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _title(context, 'Popover modal'),
                      _muted(context, 'Background stays interactive. Esc or Close hides it.'),
                      WashModalActions(
                        children: [
                          WashButton(
                            label: 'Close',
                            onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const _ClassLabel('modal[popover] + popoverTarget'),
          ],
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashButton(
              label: 'Popover + backdrop',
              variant: WashButtonVariant.outline,
              onPressed: () => _openDialog(
                context,
                blocksBackground: false,
                child: WashModalBox(
                  dialogStyle: true,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _title(context, 'Popover backdrop'),
                      _muted(context, 'Click outside via modal-backdrop to hide.'),
                    ],
                  ),
                ),
              ),
            ),
            const _ClassLabel('modal-backdrop + popoverTargetAction=hide'),
          ],
        ),
      ],
    );
  }
}

class _FormDemo extends StatelessWidget {
  const _FormDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Add plate',
          variant: WashButtonVariant.primary,
          onPressed: () => _openDialog(
            context,
            child: WashModalBox(
              dialogStyle: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _cardTitle(context, 'Add plate', tokens.primary),
                  const SizedBox(height: 16),
                  const WashInput(label: 'Name*', hint: 'Coastal fog'),
                  const SizedBox(height: 12),
                  const WashTextarea(label: 'Notes'),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Cancel',
                        variant: WashButtonVariant.ghost,
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                      WashButton(
                        label: 'Save',
                        variant: WashButtonVariant.primary,
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('modal-box + form + modal-action'),
      ],
    );
  }
}

class _AlertDemo extends StatelessWidget {
  const _AlertDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Delete series',
          variant: WashButtonVariant.error,
          onPressed: () => _openDialog(
            context,
            child: WashModalBox(
              dialogStyle: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _cardTitle(context, 'Delete series?', tokens.error),
                  _muted(
                    context,
                    'This removes the pigment series and its washes. This cannot be undone.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Cancel',
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                      WashButton(
                        label: 'Delete',
                        variant: WashButtonVariant.error,
                        onPressed: () => WashModalCloseScope.maybeCloseOf(context)?.call(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('card-title text-error font-bold'),
      ],
    );
  }
}

class _PartsDemo extends StatelessWidget {
  const _PartsDemo();

  static const _rows = [
    ('modal', 'Component root'),
    ('modal-box', 'Content panel'),
    ('modal-action', 'Action row'),
    ('modal-backdrop', 'Outside dismiss layer'),
    ('modal-toggle', 'Hidden checkbox control'),
    ('modal-open', 'Force visible'),
    ('modal-top / middle / bottom', 'Vertical placement'),
    ('modal-start / end', 'Horizontal placement'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, c) {
        final cols = c.maxWidth >= 480 ? 2 : 1;
        return GridView.count(
          crossAxisCount: cols,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 8,
          crossAxisSpacing: 8,
          childAspectRatio: cols == 2 ? 3.2 : 4,
          children: _rows.map((r) {
            return DecoratedBox(
              decoration: BoxDecoration(
                border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
                borderRadius: BorderRadius.circular(tokens.radiusBox),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      r.$1,
                      style: WashTypography.label(tokens.inkMuted).copyWith(
                        fontFamily: 'monospace',
                        fontSize: 10,
                      ),
                    ),
                    Text(r.$2, style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14)),
                  ],
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }
}

const _defaultDart = '''
showWashDialog(
  context: context,
  builder: (ctx) => WashModalBox(
    dialogStyle: true,
    child: Column(children: [title, body, WashModalActions(/* Close */)]),
  ),
);
''';

const _backdropDart = '''
showWashDialog(context: context, barrierDismissible: true, child: WashModalBox(...));
''';

const _cornerDart = '''
WashModalBox(
  dialogStyle: true,
  child: Stack(children: [content, const WashModalCornerClose()]),
);
''';

const _sizesDart = '''
WashModalBox(dialogStyle: true, width: 320, /* narrow */);
WashModalBox(dialogStyle: true); // default max-w
WashModalBox(dialogStyle: true, width: 1024); // wide
''';

const _placementDart = '''
showWashDialog(placement: WashDialogPlacement.top, ...);
''';

const _responsiveDart = '''
showWashDialog(placement: WashDialogPlacement.responsive, child: WashModalBox(dialogStyle: false, ...));
''';

const _forceDart = '''
WashForcedModal(open: open, onClose: () => setOpen(false), child: WashModalBox(...));
''';

const _checkboxDart = '''
WashCheckboxDialog(trigger: (open) => WashButton(...), dialog: WashModalBox(...));
''';

const _popoverDart = '''
showWashDialog(blocksBackground: false, builder: (_) => WashModalBox(...));
''';

const _formDart = '''
// card-title text-primary; WashInput required; WashTextarea optional
''';

const _alertDart = '''
// card-title text-error; Cancel + Delete in WashModalActions
''';

const _partsDart = '''
// modal, modal-box, modal-action, modal-backdrop, modal-toggle, modal-open, placements
''';
