import 'dart:async';

import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/context_menu/wash_context_menu.dart';
import '../../placement/context_menu_placement.dart';
import '../../foundation/breakpoints.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_catalog.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashContextMenuGalleryPage extends StatelessWidget {
  const WashContextMenuGalleryPage({super.key});

  static const _washBlue = Color(0xFF4A7FA8);
  static const _washRose = Color(0xFFC45C6E);

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Context menu',
      description:
          'daisyUI menu has no dedicated context-menu class. Use package ContextMenu with useContextMenu / useContextMenuSurface.',
      sections: [
        _s('01 · Basic', 'Pointer-positioned menu', 'Right-click opens a menu near the pointer', const _BasicContextDemo(), _basicDart),
        _s('02 · Icons and shortcuts', 'Lucide plus kbd hints', 'Same trigger pattern with icons and keyboard shortcut hints', const _IconsShortcutsDemo(), _iconsDart, tint: WashGalleryPanelTint.ochre),
        _s('03 · Nested and destructive', 'Export submenu and Delete', 'Nested Export items, plus a destructive Delete row in error color', const _NestedDestructiveDemo(), _nestedDart, tint: WashGalleryPanelTint.rose),
        _s('04 · Studio', 'Wash plate actions', 'Duplicate, Lock layer, and Delete wash on a watercolor plate', const _StudioWashDemo(), _studioDart, tint: WashGalleryPanelTint.ochre),
        _s('05 · Keyboard and Escape', 'Close and open notes', 'Escape always dismisses an open context menu', _keyboardNotes(context), _keyboardDart),
        _s('06 · Responsive', 'Touch long-press fallback', 'On touch and pen, hold about half a second to open', _responsiveNotes(context), _responsiveDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String description,
    Widget preview,
    String dart, {
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

  static Widget _keyboardNotes(BuildContext context) {
    final tokens = WashTokens.of(context);
    final body = WashTypography.body(tokens.inkMuted);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _bullet(body, tokens, 'Escape', 'closes the open menu and clears nested state.'),
        _bullet(body, tokens, 'Outside click', '(pointerdown outside the menu) closes it.'),
        _bullet(body, tokens, 'Shift+F10', 'or the Context Menu key opens when the surface is focused.'),
        _bullet(body, tokens, 'Listeners', 'for dismiss are attached only while open and removed on unmount.'),
        const SizedBox(height: 12),
        Text(
          'keydown Escape + pointerdown outside',
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10,
          ),
        ),
      ],
    );
  }

  static Widget _bullet(TextStyle body, WashTokens tokens, String lead, String rest) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('• ', style: body),
          Expanded(
            child: Text.rich(
              TextSpan(
                style: body,
                children: [
                  TextSpan(
                    text: lead,
                    style: body.copyWith(
                      color: tokens.onSurface,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  TextSpan(text: ' $rest'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  static Widget _responsiveNotes(BuildContext context) {
    final tokens = WashTokens.of(context);
    final narrow = WashBreakpoints.of(context).isPhone;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        narrow
            ? Column(
                children: [
                  _responsiveCard(context, 'Desktop', 'Right-click or Shift+F10 on a focused target.'),
                  const SizedBox(height: 12),
                  _responsiveCard(context, 'Touch', 'Long-press the surface. Drag cancels before the menu opens.'),
                ],
              )
            : Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: _responsiveCard(
                      context,
                      'Desktop',
                      'Right-click or Shift+F10 on a focused target.',
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _responsiveCard(
                      context,
                      'Touch',
                      'Long-press the surface. Drag cancels before the menu opens.',
                    ),
                  ),
                ],
              ),
        const SizedBox(height: 12),
        Text(
          'pointerType touch|pen long-press',
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10,
          ),
        ),
      ],
    );
  }

  static Widget _responsiveCard(BuildContext context, String label, String body) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
        color: tokens.surfaceContainer.withValues(alpha: 0.3),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashGalleryLabelInk(label),
            const SizedBox(height: 8),
            Text(body, style: WashTypography.body(tokens.inkMuted)),
          ],
        ),
      ),
    );
  }

  static const _basicDart = '''
final controller = WashContextMenuController();
WashContextMenuSurface(
  controller: controller,
  child: /* target surface */,
);
WashContextMenu(
  controller: controller,
  menuLabel: 'Basic context menu',
  child: Column(
    children: [
      WashContextMenuItem(label: 'Open', onTap: close),
    ],
  ),
);''';

  static const _iconsDart = '''
WashContextMenuItem(
  label: 'Copy',
  leading: WashLucideIcon('copy', size: 16),
  trailing: WashKbd('⌘C'),
  onTap: onPick,
);''';

  static const _nestedDart = '''
WashContextMenuItem(
  label: 'Delete',
  destructive: true,
  leading: WashLucideIcon('trash-2', size: 16),
);''';

  static const _studioDart = '''
WashContextMenuTitle('Wash actions');
WashContextMenuItem(label: 'Lock layer', leading: WashLucideIcon('lock', size: 16));''';

  static const _keyboardDart = '// Escape + outside pointerdown dismiss while open';

  static const _responsiveDart = '// touch|pen: ${kWashContextMenuLongPressMs}ms long-press';
}

class _DashedTarget extends StatelessWidget {
  const _DashedTarget({
    required this.controller,
    required this.semanticsLabel,
    required this.child,
    this.fill,
  });

  final WashContextMenuController controller;
  final String semanticsLabel;
  final Widget child;
  final Color? fill;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashContextMenuSurface(
      controller: controller,
      semanticsLabel: semanticsLabel,
      child: Container(
        constraints: const BoxConstraints(minHeight: 144),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: tokens.inkBorder.withValues(alpha: 0.7),
          ),
          color: fill ?? tokens.surfaceContainer.withValues(alpha: 0.3),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
        child: child,
      ),
    );
  }
}

class _BasicContextDemo extends StatefulWidget {
  const _BasicContextDemo();

  @override
  State<_BasicContextDemo> createState() => _BasicContextDemoState();
}

class _BasicContextDemoState extends State<_BasicContextDemo> {
  final _controller = WashContextMenuController();
  String _last = 'None yet';

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _pick(String label) {
    setState(() => _last = label);
    _controller.close();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashContextMenu(
          controller: _controller,
          menuLabel: 'Basic context menu',
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashContextMenuItem(label: 'Open', onTap: () => _pick('Open')),
              WashContextMenuItem(label: 'Rename', onTap: () => _pick('Rename')),
              WashContextMenuItem(label: 'Inspect wash', onTap: () => _pick('Inspect wash')),
            ],
          ),
        ),
        _DashedTarget(
          controller: _controller,
          semanticsLabel: 'Right-click or long-press for basic context menu',
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Right-click this surface',
                style: WashTypography.body(tokens.onSurface).copyWith(fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4),
              Text(
                'Touch: long-press. Keyboard: Shift+F10 when focused.',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Text(
          'Last action: $_last',
          style: WashTypography.body(tokens.inkMuted),
        ),
        const SizedBox(height: 8),
        Text(
          'ContextMenu + useContextMenuSurface',
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}

class _IconsShortcutsDemo extends StatefulWidget {
  const _IconsShortcutsDemo();

  @override
  State<_IconsShortcutsDemo> createState() => _IconsShortcutsDemoState();
}

class _IconsShortcutsDemoState extends State<_IconsShortcutsDemo> {
  final _controller = WashContextMenuController();
  String _last = 'None yet';

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _pick(String label) {
    setState(() => _last = label);
    _controller.close();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashContextMenu(
          controller: _controller,
          menuLabel: 'Icons and shortcuts context menu',
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashContextMenuItem(
                label: 'Cut',
                leading: const WashLucideIcon('scissors', size: 16),
                trailing: const WashKbd('⌘X'),
                onTap: () => _pick('Cut'),
              ),
              WashContextMenuItem(
                label: 'Copy',
                leading: const WashLucideIcon('copy', size: 16),
                trailing: const WashKbd('⌘C'),
                onTap: () => _pick('Copy'),
              ),
              WashContextMenuItem(
                label: 'Paste',
                leading: const WashLucideIcon('clipboard-copy', size: 16),
                trailing: const WashKbd('⌘V'),
                onTap: () => _pick('Paste'),
              ),
              WashContextMenuItem(
                label: 'Edit label',
                leading: const WashLucideIcon('pencil', size: 16),
                trailing: const WashKbd('E'),
                onTap: () => _pick('Edit label'),
              ),
            ],
          ),
        ),
        _DashedTarget(
          controller: _controller,
          semanticsLabel: 'Right-click for icons and shortcuts context menu',
          fill: WashContextMenuGalleryPage._washBlue.withValues(alpha: 0.2),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashLucideIcon('paintbrush', size: 20, color: tokens.onSurface.withValues(alpha: 0.7)),
              const SizedBox(height: 8),
              Text(
                'Brush plate',
                style: WashTypography.body(tokens.onSurface).copyWith(fontWeight: FontWeight.w500),
              ),
              Text(
                'Icons and kbd hints in the menu',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Text('Last action: $_last', style: WashTypography.body(tokens.inkMuted)),
        const SizedBox(height: 8),
        Text(
          'menu + Lucide + kbd',
          style: WashTypography.label(tokens.inkMuted).copyWith(fontFamily: 'monospace', fontSize: 10),
        ),
      ],
    );
  }
}

class _NestedDestructiveDemo extends StatefulWidget {
  const _NestedDestructiveDemo();

  @override
  State<_NestedDestructiveDemo> createState() => _NestedDestructiveDemoState();
}

class _NestedDestructiveDemoState extends State<_NestedDestructiveDemo> {
  final _controller = WashContextMenuController();
  String _last = 'None yet';
  bool _nestedOpen = false;

  @override
  void initState() {
    super.initState();
    _controller.addListener(_onMenu);
  }

  @override
  void dispose() {
    _controller.removeListener(_onMenu);
    _controller.dispose();
    super.dispose();
  }

  void _pick(String label) {
    setState(() {
      _last = label;
      _nestedOpen = false;
    });
    _controller.close();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashContextMenu(
          controller: _controller,
          menuLabel: 'Nested context menu',
          width: 224,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              WashContextMenuItem(
                label: 'Duplicate',
                leading: const WashLucideIcon('copy', size: 16),
                onTap: () => _pick('Duplicate'),
              ),
              WashContextMenuItem(
                label: 'Export',
                active: _nestedOpen,
                trailing: WashLucideIcon(
                  'chevron-right',
                  size: 16,
                  color: tokens.onSurface.withValues(alpha: 0.7),
                ),
                onTap: () => setState(() => _nestedOpen = !_nestedOpen),
              ),
              if (_nestedOpen)
                Padding(
                  padding: const EdgeInsets.only(left: 8, top: 4),
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.5)),
                      color: tokens.surface,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(4),
                      child: Column(
                        children: [
                          WashContextMenuItem(label: 'PNG plate', onTap: () => _pick('Export PNG')),
                          WashContextMenuItem(label: 'SVG outline', onTap: () => _pick('Export SVG')),
                        ],
                      ),
                    ),
                  ),
                ),
              WashContextMenuItem(
                label: 'Delete',
                destructive: true,
                leading: const WashLucideIcon('trash-2', size: 16),
                onTap: () => _pick('Delete'),
              ),
            ],
          ),
        ),
        _DashedTarget(
          controller: _controller,
          semanticsLabel: 'Right-click for nested and destructive context menu',
          fill: WashContextMenuGalleryPage._washRose.withValues(alpha: 0.15),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Layer stack target',
                style: WashTypography.body(tokens.onSurface).copyWith(fontWeight: FontWeight.w500),
              ),
              Text(
                'Nested Export, plus Delete in error color',
                style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Text('Last action: $_last', style: WashTypography.body(tokens.inkMuted)),
        const SizedBox(height: 8),
        Text(
          'menu nested + text-error delete',
          style: WashTypography.label(tokens.inkMuted).copyWith(fontFamily: 'monospace', fontSize: 10),
        ),
      ],
    );
  }

  void _onMenu() {
    if (!_controller.isOpen && _nestedOpen) {
      setState(() => _nestedOpen = false);
    }
  }
}

class _StudioWashDemo extends StatefulWidget {
  const _StudioWashDemo();

  @override
  State<_StudioWashDemo> createState() => _StudioWashDemoState();
}

class _StudioWashDemoState extends State<_StudioWashDemo> {
  final _controller = WashContextMenuController();
  bool _locked = false;
  String? _toast;
  Timer? _toastTimer;

  @override
  void dispose() {
    _toastTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _pick(String label) {
    if (label == 'Lock layer') setState(() => _locked = true);
    if (label == 'Unlock layer') setState(() => _locked = false);
    setState(() => _toast = label);
    _controller.close();
    _toastTimer?.cancel();
    _toastTimer = Timer(const Duration(milliseconds: 2200), () {
      if (mounted) setState(() => _toast = null);
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashContextMenu(
          controller: _controller,
          menuLabel: 'Studio wash context menu',
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const WashContextMenuTitle('Wash actions'),
              WashContextMenuItem(
                label: 'Duplicate',
                leading: const WashLucideIcon('copy', size: 16),
                onTap: () => _pick('Duplicate'),
              ),
              WashContextMenuItem(
                label: _locked ? 'Unlock layer' : 'Lock layer',
                leading: const WashLucideIcon('lock', size: 16),
                onTap: () => _pick(_locked ? 'Unlock layer' : 'Lock layer'),
              ),
              WashContextMenuItem(
                label: 'Delete wash',
                destructive: true,
                leading: const WashLucideIcon('eraser', size: 16),
                onTap: () => _pick('Delete wash'),
              ),
            ],
          ),
        ),
        WashContextMenuSurface(
          controller: _controller,
          semanticsLabel: 'Right-click wash plate for studio actions',
          child: DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: tokens.inkBorder),
              color: WashContextMenuGalleryPage._washBlue.withValues(alpha: 0.25),
              boxShadow: washPaperShadowSm(tokens),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: ConstrainedBox(
                constraints: const BoxConstraints(minHeight: 176),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        WashGalleryLabelInk('Wash plate'),
                        const SizedBox(height: 4),
                        Text(
                          'Cerulean field',
                          style: WashTypography.title(tokens.onSurface).copyWith(
                            fontSize: 20,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Right-click or long-press for Duplicate, Lock, Delete wash.',
                          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        if (_locked)
                          DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(999),
                              border: Border.all(color: tokens.inkBorder),
                              color: tokens.surface.withValues(alpha: 0.8),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const WashLucideIcon('lock', size: 12),
                                  const SizedBox(width: 4),
                                  Text('Locked', style: WashTypography.label(tokens.onSurface)),
                                ],
                              ),
                            ),
                          )
                        else
                          DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(999),
                              border: Border.all(color: tokens.inkBorder),
                              color: tokens.surface.withValues(alpha: 0.6),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              child: Text('Editable', style: WashTypography.label(tokens.onSurface)),
                            ),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          _toast != null ? 'Studio: $_toast' : 'No studio action yet.',
          style: WashTypography.body(tokens.inkMuted),
        ),
        const SizedBox(height: 8),
        Text(
          'wash-panel + ContextMenu',
          style: WashTypography.label(tokens.inkMuted).copyWith(fontFamily: 'monospace', fontSize: 10),
        ),
      ],
    );
  }
}
