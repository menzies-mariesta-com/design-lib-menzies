import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/dropdown_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../input/wash_input.dart';
import '../menu/wash_menu.dart';

/// daisyUI `select-*` tones (same modifiers as `input-*`).
enum WashSelectTone {
  defaultTone,
  ghost,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

/// daisyUI `select-xs` through `select-xl`.
enum WashSelectSize { xs, sm, md, lg, xl }

class WashSelectOption<T> {
  const WashSelectOption({
    required this.value,
    required this.label,
    this.disabled = false,
  });

  final T value;
  final String label;
  final bool disabled;
}

class WashSelectOptionGroup<T> {
  const WashSelectOptionGroup({
    required this.label,
    required this.options,
  });

  final String label;
  final List<WashSelectOption<T>> options;
}

WashInputMetrics washSelectMetricsFor(WashSelectSize size) {
  return washInputMetricsFor(switch (size) {
    WashSelectSize.xs => WashInputSize.xs,
    WashSelectSize.sm => WashInputSize.sm,
    WashSelectSize.md => WashInputSize.md,
    WashSelectSize.lg => WashInputSize.lg,
    WashSelectSize.xl => WashInputSize.xl,
  });
}

String washSelectClassLabel({
  WashSelectTone tone = WashSelectTone.defaultTone,
  WashSelectSize size = WashSelectSize.md,
  bool disabled = false,
}) {
  final parts = <String>['select'];
  final toneClass = switch (tone) {
    WashSelectTone.defaultTone => null,
    WashSelectTone.ghost => 'select-ghost',
    WashSelectTone.neutral => 'select-neutral',
    WashSelectTone.primary => 'select-primary',
    WashSelectTone.secondary => 'select-secondary',
    WashSelectTone.accent => 'select-accent',
    WashSelectTone.info => 'select-info',
    WashSelectTone.success => 'select-success',
    WashSelectTone.warning => 'select-warning',
    WashSelectTone.error => 'select-error',
  };
  if (toneClass != null) parts.add(toneClass);
  if (size != WashSelectSize.md) parts.add('select-${size.name}');
  if (disabled) parts.add('disabled');
  return parts.join(' ');
}

/// Gallery monospace class hint (SelectPage ClassLabel).
class WashSelectClassLabel extends StatelessWidget {
  const WashSelectClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'Select' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// Wash select: daisyUI-styled trigger + custom listbox (not the OS picker).
/// Placement flips top/bottom from viewport space; outside click + Escape close.
class WashSelect<T> extends StatefulWidget {
  const WashSelect({
    required this.options,
    required this.onChanged,
    this.value,
    this.groups,
    this.label,
    this.hint,
    this.placeholder = 'Choose…',
    this.requiredMark = false,
    this.disabled = false,
    this.tone = WashSelectTone.defaultTone,
    this.size = WashSelectSize.md,
    this.semanticLabel,
    this.forceOpen = false,
    this.maxWidth,
    super.key,
  });

  final T? value;
  final List<WashSelectOption<T>> options;
  final List<WashSelectOptionGroup<T>>? groups;
  final ValueChanged<T?> onChanged;
  final String? label;
  final String? hint;
  final String placeholder;
  final bool requiredMark;
  final bool disabled;
  final WashSelectTone tone;
  final WashSelectSize size;
  final String? semanticLabel;
  final bool forceOpen;
  final double? maxWidth;

  @override
  State<WashSelect<T>> createState() => _WashSelectState<T>();
}

class _WashSelectState<T> extends State<WashSelect<T>> {
  final _triggerKey = GlobalKey();
  final _focusNode = FocusNode();
  OverlayEntry? _entry;
  bool _open = false;

  List<WashSelectOption<T>> get _flat {
    final groups = widget.groups;
    if (groups != null && groups.isNotEmpty) {
      return [for (final g in groups) ...g.options];
    }
    return widget.options;
  }

  WashSelectOption<T>? get _selected {
    for (final opt in _flat) {
      if (opt.value == widget.value) return opt;
    }
    return null;
  }

  bool get _menuOpen => (widget.forceOpen || _open) && !widget.disabled;

  @override
  void initState() {
    super.initState();
    if (widget.forceOpen && !widget.disabled) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _setOpen(true);
      });
    }
  }

  @override
  void didUpdateWidget(covariant WashSelect<T> oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.disabled && _open) {
      _setOpen(false);
      return;
    }
    if (widget.forceOpen && !_open && !widget.disabled) {
      _setOpen(true);
    }
    if (_open) {
      _entry?.markNeedsBuild();
    }
  }

  @override
  void dispose() {
    _removeOverlay();
    _focusNode.dispose();
    super.dispose();
  }

  void _setOpen(bool value) {
    if (widget.disabled) return;
    if (widget.forceOpen && !value) return;
    if (_open == value) return;
    setState(() => _open = value);
    if (value) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted && _open) _insertOverlay();
      });
    } else {
      _removeOverlay();
    }
  }

  void _toggle() {
    if (widget.disabled) return;
    _focusNode.requestFocus();
    _setOpen(!_open);
  }

  void _commit(WashSelectOption<T> opt) {
    if (opt.disabled) return;
    widget.onChanged(opt.value);
    if (!widget.forceOpen) _setOpen(false);
  }

  Rect? _triggerRect() {
    final box = _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return null;
    return box.localToGlobal(Offset.zero) & box.size;
  }

  double _estimatePanelHeight() {
    var items = 0;
    var titles = 0;
    final groups = widget.groups;
    if (groups != null && groups.isNotEmpty) {
      for (final g in groups) {
        titles += 1;
        items += g.options.length;
      }
    } else {
      items = widget.options.isEmpty ? 1 : widget.options.length;
    }
    return (16 + titles * 28.0 + items * 40.0).clamp(48.0, 280.0);
  }

  void _insertOverlay() {
    _removeOverlay();
    if (widget.forceOpen) return;
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _entry = OverlayEntry(builder: _buildOverlay);
    overlay.insert(_entry!);
  }

  void _removeOverlay() {
    _entry?.remove();
    _entry = null;
  }

  Widget _buildOverlay(BuildContext overlayContext) {
    final trigger = _triggerRect();
    if (trigger == null) return const SizedBox.shrink();
    final overlayState = Overlay.maybeOf(overlayContext);
    final viewportBox = overlayState?.context.findRenderObject() as RenderBox?;
    final viewport = viewportBox == null
        ? Offset.zero & MediaQuery.sizeOf(overlayContext)
        : Offset.zero & viewportBox.size;
    final preferred = _estimatePanelHeight();
    final placement = WashDropdownPlacementLogic.measure(
      trigger: trigger,
      panelSize: Size(trigger.width, preferred),
      viewport: viewport,
    );
    final openTop = placement == WashDropdownPlacement.aboveStart ||
        placement == WashDropdownPlacement.aboveEnd;
    final height = WashDropdownPlacementLogic.cappedPanelHeight(
      trigger: trigger,
      viewport: viewport,
      preferredHeight: preferred,
      openTop: openTop,
    );
    final panelSize = Size(trigger.width, height);
    final offset = WashDropdownPlacementLogic.panelOffset(
      trigger: trigger,
      panelSize: panelSize,
      placement: placement,
    );
    return Stack(
      children: [
        Positioned.fill(
          child: Listener(
            behavior: HitTestBehavior.translucent,
            onPointerDown: (event) {
              final pos = event.position;
              final panelRect = offset & panelSize;
              if (!trigger.contains(pos) && !panelRect.contains(pos)) {
                _setOpen(false);
                _focusNode.unfocus();
              }
            },
          ),
        ),
        Positioned(
          left: offset.dx,
          top: offset.dy,
          width: panelSize.width,
          child: ConstrainedBox(
            constraints: BoxConstraints(maxHeight: panelSize.height),
            child: _WashSelectMenuPanel<T>(
              groups: widget.groups,
              options: widget.options,
              selected: widget.value,
              onPick: _commit,
            ),
          ),
        ),
      ],
    );
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent && event.logicalKey == LogicalKeyboardKey.escape) {
      if (_open) {
        _setOpen(false);
        _focusNode.unfocus();
        return KeyEventResult.handled;
      }
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = washSelectMetricsFor(widget.size);
    final selected = _selected;
    final hasValue = selected != null;
    final (fill, border, shadow) = _shellColors(tokens, widget.tone, widget.disabled);

    Widget trigger = KeyedSubtree(
      key: _triggerKey,
      child: MouseRegion(
        cursor: widget.disabled ? SystemMouseCursors.forbidden : SystemMouseCursors.click,
        child: Semantics(
          button: true,
          enabled: !widget.disabled,
          expanded: _menuOpen,
          label: widget.semanticLabel ?? widget.label,
          child: Opacity(
            opacity: widget.disabled ? 0.6 : 1,
            child: Container(
              constraints: BoxConstraints(minHeight: metrics.minHeight),
              padding: EdgeInsets.symmetric(
                horizontal: metrics.paddingX,
                vertical: metrics.paddingY,
              ),
              decoration: BoxDecoration(
                color: fill,
                borderRadius: BorderRadius.circular(metrics.borderRadius),
                border: Border.all(color: border, width: metrics.borderWidth),
                boxShadow: widget.disabled ? null : shadow,
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      hasValue ? selected.label : widget.placeholder,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(
                        hasValue
                            ? tokens.onSurface
                            : tokens.onSurface.withValues(alpha: 0.5),
                      ).copyWith(
                        fontSize: metrics.fontSize,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  WashIcon(
                    WashIconGlyph.chevronDown,
                    size: 20,
                    color: tokens.onSurface.withValues(
                      alpha: widget.disabled ? 0.4 : 0.6,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );

    trigger = GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: widget.disabled ? null : _toggle,
      child: trigger,
    );

    Widget field = Focus(
      focusNode: _focusNode,
      onKeyEvent: _onKey,
      child: trigger,
    );

    final overlay = Overlay.maybeOf(context);
    final inlinePanel = widget.forceOpen || overlay == null;
    if (inlinePanel && _menuOpen) {
      field = Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          field,
          const SizedBox(height: 4),
          ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 280),
            child: _WashSelectMenuPanel<T>(
              groups: widget.groups,
              options: widget.options,
              selected: widget.value,
              onPick: _commit,
            ),
          ),
        ],
      );
    }

    field = SizedBox(width: double.infinity, child: field);

    if (widget.maxWidth != null) {
      field = ConstrainedBox(
        constraints: BoxConstraints(maxWidth: widget.maxWidth!),
        child: field,
      );
    }

    final showLabel = widget.label != null && widget.label!.isNotEmpty;
    final showHint = widget.hint != null && widget.hint!.isNotEmpty;
    if (!showLabel && !showHint) return field;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showLabel)
          Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.label!,
                  style: WashTypography.label(tokens.onSurface).copyWith(fontSize: 13),
                ),
                if (widget.requiredMark)
                  Padding(
                    padding: const EdgeInsets.only(left: 2),
                    child: Text(
                      '*',
                      style: TextStyle(
                        color: tokens.palette.error,
                        fontSize: 14,
                        height: 1,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        field,
        if (showHint)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              widget.hint!,
              style: WashTypography.label(tokens.inkMuted).copyWith(fontSize: 12),
            ),
          ),
      ],
    );
  }
}

(Color? fill, Color border, List<BoxShadow>? shadow) _shellColors(
  WashTokens tokens,
  WashSelectTone tone,
  bool disabled,
) {
  final p = tokens.palette;
  Color border = tokens.inkBorder;
  Color? fill = tokens.surface;
  List<BoxShadow>? shadow = washPaperShadowSm(tokens);

  switch (tone) {
    case WashSelectTone.ghost:
      fill = null;
      border = tokens.inkBorder.withValues(alpha: 0.45);
      shadow = null;
    case WashSelectTone.neutral:
      border = p.neutral;
    case WashSelectTone.primary:
      border = p.primary;
    case WashSelectTone.secondary:
      border = p.secondary;
    case WashSelectTone.accent:
      border = p.accent;
    case WashSelectTone.info:
      border = p.info;
    case WashSelectTone.success:
      border = p.success;
    case WashSelectTone.warning:
      border = p.warning;
    case WashSelectTone.error:
      border = p.error;
    case WashSelectTone.defaultTone:
      break;
  }

  if (disabled) shadow = null;
  return (fill, border, shadow);
}

class _WashSelectMenuPanel<T> extends StatelessWidget {
  const _WashSelectMenuPanel({
    required this.options,
    required this.onPick,
    this.groups,
    this.selected,
  });

  final List<WashSelectOption<T>> options;
  final List<WashSelectOptionGroup<T>>? groups;
  final T? selected;
  final ValueChanged<WashSelectOption<T>> onPick;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final grouped = groups != null && groups!.isNotEmpty;
    final children = <Widget>[];

    if (grouped) {
      for (final group in groups!) {
        children.add(WashMenuTitle(group.label));
        for (final opt in group.options) {
          children.add(
            _WashSelectOptionRow<T>(
              option: opt,
              active: opt.value == selected,
              onPick: onPick,
            ),
          );
        }
      }
    } else if (options.isEmpty) {
      children.add(
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: Text(
            'No options',
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
          ),
        ),
      );
    } else {
      for (final opt in options) {
        children.add(
          _WashSelectOptionRow<T>(
            option: opt,
            active: opt.value == selected,
            onPick: onPick,
          ),
        );
      }
    }

    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.zero,
          children: children,
        ),
      ),
    );
  }
}

class _WashSelectOptionRow<T> extends StatelessWidget {
  const _WashSelectOptionRow({
    required this.option,
    required this.active,
    required this.onPick,
  });

  final WashSelectOption<T> option;
  final bool active;
  final ValueChanged<WashSelectOption<T>> onPick;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final row = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          Expanded(
            child: Text(
              option.label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontWeight: active ? FontWeight.w600 : FontWeight.w500,
              ),
            ),
          ),
          if (active)
            WashIcon(
              WashIconGlyph.check,
              size: 16,
              color: tokens.onSurface.withValues(alpha: 0.7),
            ),
        ],
      ),
    );

    if (option.disabled) {
      return MouseRegion(
        cursor: SystemMouseCursors.forbidden,
        child: Opacity(opacity: 0.5, child: row),
      );
    }

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: WashRipple(
        onTap: () => onPick(option),
        borderRadius: 8,
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: active ? tokens.primary.withValues(alpha: 0.14) : null,
            borderRadius: BorderRadius.circular(8),
          ),
          child: row,
        ),
      ),
    );
  }
}
