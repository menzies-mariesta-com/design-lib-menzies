import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/floating_panel/wash_floating_panel.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_components_extended.dart';
import '../../widgets/wash_feedback.dart';
import '../../widgets/wash_form_fields.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashFloatingPanelGalleryPage extends StatelessWidget {
  const WashFloatingPanelGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Floating panel',
      description: 'Menzies Design wash-panel windows',
      sections: [
        _s('01 · Basic', 'Fixed float over canvas',
            'Wash-panel inside a demo frame', const _BasicDemo(), _basicDart),
        _s('02 · Draggable + resizable', 'Title-bar drag and edge resize',
            'Grab the header to move', const _DragDemo(), _dragDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · With actions',
            'Header icon buttons',
            'Pin, visibility, and overflow actions',
            const _ActionsDemo(),
            _actionsDart),
        _s('04 · Anchored', 'Popover beside trigger', 'Opens next to a control',
            const _AnchoredDemo(), _anchoredDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Studio',
            'Pigment inspector',
            'Layer name, opacity, blend, and lock on the same FloatingPanel',
            const _StudioDemo(),
            _studioDart),
        _s(
            '06 · Stacking',
            'Raise on focus',
            'Overlapping panels, each draggable and resizable',
            const _StackDemo(),
            _stackDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · Responsive',
            'Dock on small, float on large',
            'Full-width bottom dock on mobile; real floating window from sm up',
            const _ResponsiveDemo(),
            _responsiveDart),
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

  static const _basicDart =
      'WashFloatingPanel(draggable: false, resizable: false)';
  static const _dragDart = 'WashFloatingPanel + drag title + resize handles';
  static const _actionsDart = 'WashFloatingPanel + header icon actions';
  static const _anchoredDart = 'Anchored wash-panel popover beside trigger';
  static const _studioDart = 'WashFloatingPanel + range + select + lock';
  static const _stackDart = 'Stacked WashFloatingPanel + focus raise';
  static const _responsiveDart = 'Bottom dock vs floating by width';
}

double _panelWidth(double maxWidth, [double cap = 260]) =>
    (maxWidth - 16).clamp(160.0, cap);

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
          fontSize: 10.4,
        ),
      ),
    );
  }
}

class _BasicDemo extends StatefulWidget {
  const _BasicDemo();

  @override
  State<_BasicDemo> createState() => _BasicDemoState();
}

class _BasicDemoState extends State<_BasicDemo> {
  final _frameKey = GlobalKey();
  var _open = true;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'Sketch area behind a wash panel. Toggle the panel, or press Esc when it is open.',
                  ),
                  if (_open)
                    WashFloatingPanel(
                      title: 'Notes',
                      boundsKey: _frameKey,
                      draggable: false,
                      resizable: false,
                      defaultRect: WashFloatingPanelRect(
                          x: 8, y: 16, width: w, height: 168),
                      onClose: () => setState(() => _open = false),
                      child: const Text(
                        'Absolute within the frame. Soft wash edge, no modal lock.\n\nEsc closes this panel.',
                      ),
                    ),
                  if (!_open)
                    Positioned(
                      right: 12,
                      top: 12,
                      child: WashButton(
                        label: 'Show panel',
                        size: WashButtonSize.sm,
                        onPressed: () => setState(() => _open = true),
                      ),
                    ),
                ],
              ),
            ),
            const _ClassLabel(
                'FloatingPanel · draggable=false · Escape dismiss'),
          ],
        );
      },
    );
  }
}

class _DragDemo extends StatefulWidget {
  const _DragDemo();

  @override
  State<_DragDemo> createState() => _DragDemoState();
}

class _DragDemoState extends State<_DragDemo> {
  final _frameKey = GlobalKey();
  var _open = true;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth, 300);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'Drag the title bar. Resize from edges or the bottom-right corner.',
                  ),
                  if (_open)
                    WashFloatingPanel(
                      title: 'Studio float',
                      boundsKey: _frameKey,
                      showReset: true,
                      defaultRect: WashFloatingPanelRect(
                          x: 12, y: 24, width: w, height: 220),
                      minWidth: 220,
                      minHeight: 140,
                      onClose: () => setState(() => _open = false),
                      child: const Text(
                          'Title bar uses cursor-grab / cursor-grabbing.'),
                    ),
                  if (!_open)
                    Positioned(
                      left: 12,
                      top: 12,
                      child: WashButton(
                        label: 'Show panel',
                        size: WashButtonSize.sm,
                        onPressed: () => setState(() => _open = true),
                      ),
                    ),
                ],
              ),
            ),
            const _ClassLabel('cursor-grab / resize handles / clamp'),
          ],
        );
      },
    );
  }
}

class _ActionsDemo extends StatefulWidget {
  const _ActionsDemo();

  @override
  State<_ActionsDemo> createState() => _ActionsDemoState();
}

class _ActionsDemoState extends State<_ActionsDemo> {
  final _frameKey = GlobalKey();
  var _open = true;
  var _pinned = true;
  var _visible = true;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth, 280);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'Inspector chrome with icon actions. Drag still works from the title.',
                  ),
                  if (_open)
                    WashFloatingPanel(
                      title: 'Wash tools',
                      boundsKey: _frameKey,
                      showReset: true,
                      defaultRect: WashFloatingPanelRect(
                          x: 8, y: 16, width: w, height: 200),
                      onClose: () => setState(() => _open = false),
                      actions: Wrap(
                        spacing: 2,
                        children: [
                          WashTooltip(
                            message: _pinned ? 'Unpin' : 'Pin',
                            child: WashButton(
                              size: WashButtonSize.xs,
                              variant: _pinned
                                  ? WashButtonVariant.primary
                                  : WashButtonVariant.secondary,
                              square: true,
                              onPressed: () =>
                                  setState(() => _pinned = !_pinned),
                              child: const WashLucideIcon('pin', size: 14),
                            ),
                          ),
                          WashTooltip(
                            message: _visible ? 'Hide' : 'Show',
                            child: WashButton(
                              size: WashButtonSize.xs,
                              variant: WashButtonVariant.primary,
                              square: true,
                              onPressed: () =>
                                  setState(() => _visible = !_visible),
                              child: WashLucideIcon('eye', size: 14),
                            ),
                          ),
                          WashTooltip(
                            message: 'More',
                            child: WashButton(
                              size: WashButtonSize.xs,
                              variant: WashButtonVariant.secondary,
                              square: true,
                              onPressed: () {},
                              child: const WashLucideIcon('more-horizontal',
                                  size: 14),
                            ),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Text('Pinned: ${_pinned ? 'yes' : 'no'}'),
                          Text('Preview: ${_visible ? 'on' : 'off'}'),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            const _ClassLabel(
                'tooltip + btn-ghost btn-square + no-drag actions'),
          ],
        );
      },
    );
  }
}

class _AnchoredDemo extends StatefulWidget {
  const _AnchoredDemo();

  @override
  State<_AnchoredDemo> createState() => _AnchoredDemoState();
}

class _AnchoredDemoState extends State<_AnchoredDemo> {
  var _open = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final popoverW = (constraints.maxWidth - 32).clamp(160.0, 256.0);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              centerContent: true,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashButton(
                        variant: WashButtonVariant.primary,
                        onPressed: () => setState(() => _open = !_open),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const WashLucideIcon('palette', size: 16),
                            const SizedBox(width: 8),
                            Text('Pigment tip',
                                style: WashTypography.button(
                                    tokens.palette.primaryContent, 14, 600)),
                          ],
                        ),
                      ),
                      if (_open) ...[
                        const SizedBox(height: 8),
                        DecoratedBox(
                          decoration: BoxDecoration(
                            color: Color.alphaBlend(
                                const Color(0xFFE8C47A).withValues(alpha: 0.14),
                                tokens.surface),
                            borderRadius:
                                BorderRadius.circular(tokens.radiusBox),
                            border: Border.all(
                                color: tokens.inkBorder.withValues(alpha: 0.7)),
                          ),
                          child: SizedBox(
                            width: popoverW,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 12, vertical: 8),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          'Cadmium note',
                                          style: WashTypography.body(
                                                  tokens.onSurface)
                                              .copyWith(
                                            fontWeight: FontWeight.w600,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ),
                                      WashButton(
                                        size: WashButtonSize.xs,
                                        variant: WashButtonVariant.error,
                                        square: true,
                                        onPressed: () =>
                                            setState(() => _open = false),
                                        child:
                                            const WashLucideIcon('x', size: 14),
                                      ),
                                    ],
                                  ),
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(12, 0, 12, 12),
                                  child: Text(
                                    'Anchored beside the trigger on larger screens; stacks under on narrow frames.',
                                    style: WashTypography.body(tokens.inkMuted)
                                        .copyWith(fontSize: 14),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            const _ClassLabel(
                'relative trigger + absolute panel + outside dismiss'),
          ],
        );
      },
    );
  }
}

class _StudioDemo extends StatefulWidget {
  const _StudioDemo();

  @override
  State<_StudioDemo> createState() => _StudioDemoState();
}

class _StudioDemoState extends State<_StudioDemo> {
  final _frameKey = GlobalKey();
  var _open = true;
  var _opacity = 72.0;
  var _blend = 'multiply';
  final _locked = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth, 280);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              tall: true,
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'Studio canvas with a pigment inspector. Same floating primitive: drag, resize, focus, Esc.',
                  ),
                  if (_open)
                    WashFloatingPanel(
                      title: 'Layer properties',
                      boundsKey: _frameKey,
                      panelTint: WashFloatingPanelTint.rose,
                      showReset: true,
                      defaultRect: WashFloatingPanelRect(
                          x: 12, y: 48, width: w, height: 300),
                      minWidth: 160,
                      minHeight: 180,
                      onClose: () => setState(() => _open = false),
                      actions: WashButton(
                        size: WashButtonSize.xs,
                        variant: WashButtonVariant.secondary,
                        square: true,
                        onPressed: () {},
                        child: const WashLucideIcon('settings-2', size: 14),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const WashLucideIcon('layers', size: 16),
                              const SizedBox(width: 6),
                              Expanded(
                                child: Text(
                                  'Menzies Design layer sheet',
                                  style: WashTypography.body(tokens.inkMuted)
                                      .copyWith(fontSize: 12),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text('Name',
                              style: WashTypography.label(tokens.onSurface)
                                  .copyWith(fontSize: 12)),
                          const SizedBox(height: 4),
                          AbsorbPointer(
                            absorbing: _locked,
                            child: WashEditable(
                              controller: TextEditingController(
                                  text: 'Wash · ultramarine'),
                            ),
                          ),
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('Opacity',
                                  style: WashTypography.label(tokens.onSurface)
                                      .copyWith(fontSize: 12)),
                              Text('${_opacity.round()}%',
                                  style: WashTypography.label(tokens.inkMuted)
                                      .copyWith(fontSize: 12)),
                            ],
                          ),
                          WashRange(
                            value: _opacity,
                            onChanged: _locked
                                ? (_) {}
                                : (v) => setState(() => _opacity = v),
                          ),
                          const SizedBox(height: 8),
                          Text('Blend',
                              style: WashTypography.label(tokens.onSurface)
                                  .copyWith(fontSize: 12)),
                          const SizedBox(height: 4),
                          WashSelect<String>(
                            value: _blend,
                            options: const [
                              WashSelectOption(
                                  value: 'normal', label: 'Normal'),
                              WashSelectOption(
                                  value: 'multiply', label: 'Multiply'),
                              WashSelectOption(
                                  value: 'screen', label: 'Screen'),
                              WashSelectOption(
                                  value: 'overlay', label: 'Overlay'),
                            ],
                            onChanged: (v) {
                              if (_locked || v == null) return;
                              setState(() => _blend = v);
                            },
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            const _ClassLabel(
                'FloatingPanel + wash-panel-rose + range + select + lock'),
          ],
        );
      },
    );
  }
}

class _StackDemo extends StatefulWidget {
  const _StackDemo();

  @override
  State<_StackDemo> createState() => _StackDemoState();
}

class _StackDemoState extends State<_StackDemo> {
  final _frameKey = GlobalKey();
  final _open = {'notes': true, 'layers': true, 'copy': true};

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth, 200);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'Each panel is draggable and resizable. Click to raise. Esc closes the focused panel.',
                  ),
                  if (_open['notes']!)
                    WashFloatingPanel(
                      title: 'Notes',
                      boundsKey: _frameKey,
                      defaultRect: WashFloatingPanelRect(
                          x: 8, y: 12, width: w, height: 140),
                      onClose: () => setState(() => _open['notes'] = false),
                      child: const Text('z-10', style: TextStyle(fontSize: 12)),
                    ),
                  if (_open['layers']!)
                    WashFloatingPanel(
                      title: 'Layers',
                      boundsKey: _frameKey,
                      panelTint: WashFloatingPanelTint.ochre,
                      defaultRect: WashFloatingPanelRect(
                          x: 32, y: 48, width: w, height: 150),
                      onClose: () => setState(() => _open['layers'] = false),
                      child: const Text('z-11', style: TextStyle(fontSize: 12)),
                    ),
                  if (_open['copy']!)
                    WashFloatingPanel(
                      title: 'Reference',
                      boundsKey: _frameKey,
                      panelTint: WashFloatingPanelTint.rose,
                      defaultRect: WashFloatingPanelRect(
                          x: 56, y: 96, width: w, height: 140),
                      onClose: () => setState(() => _open['copy'] = false),
                      child: const Text('z-12', style: TextStyle(fontSize: 12)),
                    ),
                ],
              ),
            ),
            const _ClassLabel('z-index stack + onFocus raise + Esc topmost'),
          ],
        );
      },
    );
  }
}

class _ResponsiveDemo extends StatefulWidget {
  const _ResponsiveDemo();

  @override
  State<_ResponsiveDemo> createState() => _ResponsiveDemoState();
}

class _ResponsiveDemoState extends State<_ResponsiveDemo> {
  final _frameKey = GlobalKey();
  var _expanded = false;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final docked = width < kWashFloatingSmBreakpoint;
    final tokens = WashTokens.of(context);

    return LayoutBuilder(
      builder: (context, constraints) {
        final w = _panelWidth(constraints.maxWidth, 300);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashFloatingDemoFrame(
              tall: true,
              child: Stack(
                key: _frameKey,
                children: [
                  const WashFloatingDemoCanvas(
                    message:
                        'On small screens the panel docks full width at the bottom. From sm up it becomes a real floating window.',
                  ),
                  if (docked)
                    Positioned(
                      left: 8,
                      right: 8,
                      bottom: 8,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: tokens.surface,
                          borderRadius: BorderRadius.circular(tokens.radiusBox),
                          border: Border.all(
                              color: tokens.inkBorder.withValues(alpha: 0.7)),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Responsive panel',
                                style: WashTypography.body(tokens.onSurface)
                                    .copyWith(fontWeight: FontWeight.w600),
                              ),
                              const SizedBox(height: 8),
                              Text('Mobile: bottom dock.',
                                  style: WashTypography.body(tokens.inkMuted)
                                      .copyWith(fontSize: 14)),
                              if (_expanded) ...[
                                const SizedBox(height: 8),
                                Text('Paper size: A3 cold press',
                                    style: WashTypography.body(tokens.inkMuted)
                                        .copyWith(fontSize: 12)),
                              ],
                              WashButton(
                                label: _expanded ? 'Collapse' : 'Expand',
                                size: WashButtonSize.xs,
                                variant: WashButtonVariant.secondary,
                                onPressed: () =>
                                    setState(() => _expanded = !_expanded),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                  else
                    WashFloatingPanel(
                      title: 'Responsive panel',
                      boundsKey: _frameKey,
                      showReset: true,
                      defaultRect: WashFloatingPanelRect(
                        x: 12,
                        y: 48,
                        width: _expanded ? w : (w - 24).clamp(160.0, w),
                        height: _expanded ? 220 : 160,
                      ),
                      onClose: () {},
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                              'Desktop: corner float with drag and resize.'),
                          if (_expanded) ...[
                            const SizedBox(height: 8),
                            Text('Paper size: A3 cold press',
                                style: WashTypography.body(tokens.inkMuted)
                                    .copyWith(fontSize: 12)),
                          ],
                        ],
                      ),
                    ),
                ],
              ),
            ),
            const _ClassLabel('matchMedia dock → FloatingPanel from sm'),
          ],
        );
      },
    );
  }
}
