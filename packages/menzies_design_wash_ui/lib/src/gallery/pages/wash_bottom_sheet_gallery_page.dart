import 'package:flutter/widgets.dart';

import '../../components/bottom_sheet/wash_bottom_sheet.dart';
import '../../components/button/wash_button.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_form_fields.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashBottomSheetGalleryPage extends StatelessWidget {
  const WashBottomSheetGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Bottom sheet',
      description: 'daisyUI modal modal-bottom sheets.',
      sections: [
        _s('01 · Basic', 'Open and close with actions', 'HTML dialog + modal-bottom', const _BasicDemo(), _basicDart),
        _s('02 · Backdrop', 'Dismiss on outside click', 'A modal-backdrop form covers the page so clicking outside closes the', const _BackdropDemo(), _backdropDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Corner close', 'Ghost close in the corner', 'Absolute circle button in the top-right of modal-box', const _CornerDemo(), _cornerDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Heights', 'Short, half, and tall sheets', 'Override modal-box height', const _HeightsDemo(), _heightsDart),
        _s('05 · Create', 'Form sheet (create)', 'Primary title color for create flows', const _CreateDemo(), _createDart, tint: WashGalleryPanelTint.ochre),
        _s('06 · Edit', 'Form sheet (edit)', 'Secondary title color for edit flows', const _EditDemo(), _editDart, tint: WashGalleryPanelTint.rose),
        _s('07 · Delete', 'Destructive confirm sheet', 'Error-colored title for delete confirmation', const _DeleteDemo(), _deleteDart),
        _s('08 · Responsive', 'Bottom on small, middle on larger', 'modal-bottom by default; sm:modal-middle recenters on wider screens', const _ResponsiveDemo(), _responsiveDart, tint: WashGalleryPanelTint.ochre),
        _s('09 · Popover', 'Popover API bottom sheet', 'No focus trap on the background', const _PopoverDemo(), _popoverDart, tint: WashGalleryPanelTint.rose),
        _s('10 · Checkbox', 'Legacy checkbox toggle', 'Hidden modal-toggle checkbox', const _CheckboxDemo(), _checkboxDart),
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

Widget _sheetTitle(BuildContext context, String text) {
  final tokens = WashTokens.of(context);
  return Text(
    text,
    style: WashTypography.title(tokens.onSurface).copyWith(
      fontSize: 18,
      fontWeight: FontWeight.bold,
    ),
  );
}

Widget _cardTitle(BuildContext context, String text, Color color) {
  return Text(
    text,
    style: WashTypography.title(color).copyWith(fontWeight: FontWeight.bold),
  );
}

Widget _muted(BuildContext context, String text) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 16),
    child: Text(text, style: WashTypography.body(WashTokens.of(context).inkMuted).copyWith(fontSize: 14)),
  );
}

class _BasicDemo extends StatelessWidget {
  const _BasicDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open bottom sheet',
          variant: WashButtonVariant.primary,
          onPressed: () => showWashBottomSheet(
            context: context,
            barrierDismissible: false,
            blocksBackground: false,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _sheetTitle(context, 'Wash notes'),
                  _muted(
                    context,
                    'A bottom sheet anchors to the lower edge with rounded top corners. Press Escape or use Close.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('modal modal-bottom + modal-box + modal-action'),
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
          label: 'Open with backdrop dismiss',
          variant: WashButtonVariant.secondary,
          onPressed: () => showWashBottomSheet(
            context: context,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _sheetTitle(context, 'Tap outside'),
                  _muted(
                    context,
                    'Escape, backdrop click, or the button below will close this sheet.',
                  ),
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
          label: 'Open with corner close',
          variant: WashButtonVariant.accent,
          onPressed: () => showWashBottomSheet(
            context: context,
            child: WashModalBox(
              child: Stack(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const SizedBox(height: 8),
                      _sheetTitle(context, 'Corner dismiss'),
                      _muted(context, 'Use the X, Escape, or click outside.'),
                    ],
                  ),
                  const WashModalCornerClose(),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('btn btn-sm btn-circle btn-ghost absolute end-2 top-2'),
      ],
    );
  }
}

class _HeightsDemo extends StatelessWidget {
  const _HeightsDemo();

  void _open(BuildContext context, {required String title, required double height, double? maxHeight, bool tall = false}) {
    showWashBottomSheet(
      context: context,
      child: WashModalBox(
        height: height,
        maxHeight: maxHeight,
        scrollable: tall,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            _sheetTitle(context, title),
            _muted(
              context,
              tall
                  ? 'Near full height for longer content. Scrolls inside modal-box.'
                  : title.contains('Half')
                      ? 'About half the viewport. Useful for filters and pickers.'
                      : 'Fixed low height for quick confirmations.',
            ),
            if (tall)
              WashModalMenuList(
                labels: List.generate(12, (i) => 'Layer wash ${i + 1}'),
              ),
            WashModalActions(
              children: [
                WashButton(
                  label: 'Close',
                  size: tall ? WashButtonSize.md : WashButtonSize.sm,
                  onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final vh = MediaQuery.sizeOf(context).height;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashButton(
              label: 'Short',
              variant: WashButtonVariant.outline,
              onPressed: () => _open(context, title: 'Short sheet', height: 160, maxHeight: 160),
            ),
            WashButton(
              label: 'Half',
              variant: WashButtonVariant.outline,
              onPressed: () => _open(context, title: 'Half height', height: vh * 0.5),
            ),
            WashButton(
              label: 'Tall',
              variant: WashButtonVariant.outline,
              onPressed: () => _open(
                context,
                title: 'Tall sheet',
                height: vh * 0.85,
                maxHeight: vh - 80,
                tall: true,
              ),
            ),
          ],
        ),
        const _ClassLabel('modal-box h-40 | h-[50vh] | h-[85vh]'),
      ],
    );
  }
}

class _CreateDemo extends StatefulWidget {
  const _CreateDemo();

  @override
  State<_CreateDemo> createState() => _CreateDemoState();
}

class _CreateDemoState extends State<_CreateDemo> {
  final _name = TextEditingController();

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Add wash plate',
          variant: WashButtonVariant.primary,
          onPressed: () => showWashBottomSheet(
            context: context,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _cardTitle(context, 'Add wash plate', tokens.primary),
                  const SizedBox(height: 16),
                  WashInput(controller: _name, label: 'Name*', hint: 'Cerulean study'),
                  const SizedBox(height: 12),
                  const WashTextarea(label: 'Notes'),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Cancel',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                      WashButton(
                        label: 'Create',
                        variant: WashButtonVariant.primary,
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('card-title text-primary font-bold'),
      ],
    );
  }
}

class _EditDemo extends StatefulWidget {
  const _EditDemo();

  @override
  State<_EditDemo> createState() => _EditDemoState();
}

class _EditDemoState extends State<_EditDemo> {
  String _status = 'drying';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Edit wash plate',
          variant: WashButtonVariant.secondary,
          onPressed: () => showWashBottomSheet(
            context: context,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _cardTitle(context, 'Edit wash plate', tokens.palette.secondary),
                  const SizedBox(height: 16),
                  const WashInput(label: 'Name*', hint: 'Cerulean study'),
                  const SizedBox(height: 12),
                  WashSelect<String>(
                    label: 'Status*',
                    value: _status,
                    onChanged: (v) => setState(() => _status = v ?? _status),
                    options: const [
                      WashSelectOption(value: 'wet', label: 'Wet'),
                      WashSelectOption(value: 'drying', label: 'Drying'),
                      WashSelectOption(value: 'dry', label: 'Dry'),
                    ],
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Cancel',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                      WashButton(
                        label: 'Save',
                        variant: WashButtonVariant.secondary,
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('card-title text-secondary font-bold'),
      ],
    );
  }
}

class _DeleteDemo extends StatelessWidget {
  const _DeleteDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Delete wash plate',
          variant: WashButtonVariant.error,
          onPressed: () => showWashBottomSheet(
            context: context,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _cardTitle(context, 'Delete wash plate', tokens.error),
                  _muted(
                    context,
                    'This removes "Cerulean study" from the studio board. You cannot undo this action.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Cancel',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                      WashButton(
                        label: 'Delete',
                        variant: WashButtonVariant.error,
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
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

class _ResponsiveDemo extends StatelessWidget {
  const _ResponsiveDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open responsive sheet',
          variant: WashButtonVariant.primary,
          onPressed: () => showWashBottomSheet(
            context: context,
            placement: WashBottomSheetPlacement.responsive,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _sheetTitle(context, 'Responsive modal'),
                  _muted(
                    context,
                    'On small viewports this sits at the bottom. From the sm breakpoint up it centers like a standard dialog.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
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

class _PopoverDemo extends StatelessWidget {
  const _PopoverDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          label: 'Open popover sheet',
          onPressed: () => showWashBottomSheet(
            context: context,
            blocksBackground: false,
            barrierDismissible: true,
            child: WashModalBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _sheetTitle(context, 'Popover sheet'),
                  _muted(
                    context,
                    'Background stays interactive. Prefer dialog when you need a focus trap.',
                  ),
                  WashModalActions(
                    children: [
                      WashButton(
                        label: 'Close',
                        onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        const _ClassLabel('modal modal-bottom popover=auto'),
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
        WashCheckboxBottomSheet(
          trigger: (open) => WashButton(
            label: 'Open checkbox sheet',
            variant: WashButtonVariant.neutral,
            onPressed: open,
          ),
          sheet: WashModalBox(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                _sheetTitle(context, 'Checkbox sheet'),
                _muted(
                  context,
                  'Legacy pattern. Prefer the HTML dialog method for Escape and focus management.',
                ),
                WashModalActions(
                  children: [
                    WashButton(
                      label: 'Close',
                      onPressed: () => WashBottomSheetScope.maybeOf(context)?.close(),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const _ClassLabel('modal-toggle + modal modal-bottom'),
      ],
    );
  }
}

const _basicDart = '''
WashButton(
  label: 'Open bottom sheet',
  onPressed: () => showWashBottomSheet(
    context: context,
    barrierDismissible: false,
    child: WashModalBox(/* title, body, WashModalActions */),
  ),
);
''';

const _backdropDart = '''
showWashBottomSheet(context: context, child: WashModalBox(/* ... */));
''';

const _cornerDart = '''
WashModalBox(
  child: Stack(children: [content, const WashModalCornerClose()]),
);
''';

const _heightsDart = '''
WashModalBox(height: 160, child: /* short */);
WashModalBox(height: MediaQuery.sizeOf(context).height * 0.5, child: /* half */);
WashModalBox(height: vh * 0.85, scrollable: true, child: /* tall + menu */);
''';

const _createDart = '''
showWashBottomSheet(
  context: context,
  child: WashModalBox(
    child: Column(children: [
      Text('Add wash plate', style: primary card-title),
      WashInput(label: 'Name*'),
      WashTextarea(label: 'Notes'),
      WashModalActions(children: [cancel, create]),
    ]),
  ),
);
''';

const _editDart = '''
// card-title text-secondary; WashSelect for status
''';

const _deleteDart = '''
// card-title text-error; Cancel + Delete in WashModalActions
''';

const _responsiveDart = '''
showWashBottomSheet(
  context: context,
  placement: WashBottomSheetPlacement.responsive,
  child: WashModalBox(/* ... */),
);
''';

const _popoverDart = '''
showWashBottomSheet(
  context: context,
  blocksBackground: false,
  child: WashModalBox(/* ... */),
);
''';

const _checkboxDart = '''
WashCheckboxBottomSheet(
  trigger: WashButton(label: 'Open checkbox sheet'),
  sheet: WashModalBox(/* ... */),
);
''';
