import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/dropdown_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../badge/wash_badge.dart';
import '../button/wash_button.dart';
import '../input/wash_input.dart';

/// One searchable combobox option (web `SearchSelectOption`).
class WashSearchSelectOption {
  const WashSearchSelectOption({
    required this.value,
    required this.label,
    this.disabled = false,
    this.note,
    this.badge,
    this.iconName,
    this.swatch,
  });

  final String value;
  final String label;
  final bool disabled;
  final String? note;
  final String? badge;
  final String? iconName;
  final Color? swatch;
}

List<WashSearchSelectOption> washSearchSelectFromStrings(
  Iterable<String> values,
) {
  return [
    for (final value in values)
      WashSearchSelectOption(value: value, label: value),
  ];
}

bool washSearchSelectFilterText(String query, String haystack) {
  return haystack.toLowerCase().contains(query.trim().toLowerCase());
}

String washSearchSelectClassLabel({
  WashButtonVariant tone = WashButtonVariant.defaultVariant,
  WashButtonSize size = WashButtonSize.md,
  bool disabled = false,
}) {
  final parts = <String>['btn'];
  final toneClass = switch (tone) {
    WashButtonVariant.defaultVariant => null,
    WashButtonVariant.ghost => 'btn-ghost',
    WashButtonVariant.link => 'btn-link',
    WashButtonVariant.outline => 'btn-outline',
    WashButtonVariant.neutral => 'btn-neutral',
    WashButtonVariant.primary => 'btn-primary',
    WashButtonVariant.secondary => 'btn-secondary',
    WashButtonVariant.accent => 'btn-accent',
    WashButtonVariant.info => 'btn-info',
    WashButtonVariant.success => 'btn-success',
    WashButtonVariant.warning => 'btn-warning',
    WashButtonVariant.error => 'btn-error',
  };
  if (toneClass != null) parts.add(toneClass);
  if (size != WashButtonSize.md) parts.add('btn-${size.name}');
  if (disabled) parts.add('btn-disabled');
  return parts.join(' ');
}

/// Gallery monospace class hint (SearchSelectPage ClassLabel).
class WashSearchSelectClassLabel extends StatelessWidget {
  const WashSearchSelectClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'dropdown + btn + input + menu' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// Searchable select (combobox): trigger + filter field + scrollable menu.
/// Placement flips top/bottom from viewport space (bottom default).
class WashSearchSelect extends StatefulWidget {
  const WashSearchSelect({
    required this.options,
    this.label,
    this.placeholder = 'Choose…',
    this.requiredMark = false,
    this.disabled = false,
    this.value,
    this.defaultValue,
    this.onChanged,
    this.onPick,
    this.emptyMessage = 'No options match.',
    this.filterPlaceholder = 'Type to filter…',
    this.triggerVariant = WashButtonVariant.defaultVariant,
    this.triggerSize = WashButtonSize.md,
    this.filterSize = WashInputSize.sm,
    this.forceOpen = false,
    this.defaultQuery = '',
    this.onQueryChanged,
    this.maxWidth = 448,
    this.semanticLabel,
    super.key,
  });

  final List<WashSearchSelectOption> options;
  final String? label;
  final String placeholder;
  final bool requiredMark;
  final bool disabled;
  final String? value;
  final String? defaultValue;
  final ValueChanged<String?>? onChanged;
  final ValueChanged<String>? onPick;
  final String emptyMessage;
  final String filterPlaceholder;
  final WashButtonVariant triggerVariant;
  final WashButtonSize triggerSize;
  final WashInputSize filterSize;
  final bool forceOpen;
  final String defaultQuery;
  final ValueChanged<String>? onQueryChanged;
  final double? maxWidth;
  final String? semanticLabel;

  @override
  State<WashSearchSelect> createState() => _WashSearchSelectState();
}

class _WashSearchSelectState extends State<WashSearchSelect> {
  final _triggerKey = GlobalKey();
  final _panelKey = GlobalKey();
  final _rootFocus = FocusNode();
  final _searchFocus = FocusNode();
  late final TextEditingController _query;
  OverlayEntry? _entry;
  bool _open = false;
  String? _uncontrolled;

  @override
  void initState() {
    super.initState();
    _query = TextEditingController(text: widget.defaultQuery);
    _uncontrolled = widget.value ?? widget.defaultValue;
    if (widget.forceOpen && !widget.disabled) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _setOpen(true);
      });
    }
  }

  @override
  void didUpdateWidget(covariant WashSearchSelect oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != oldWidget.value) {
      _uncontrolled = widget.value ?? _uncontrolled;
    }
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
    _rootFocus.dispose();
    _searchFocus.dispose();
    _query.dispose();
    super.dispose();
  }

  String? get _current => widget.value ?? _uncontrolled;

  bool get _menuOpen => (widget.forceOpen || _open) && !widget.disabled;

  WashSearchSelectOption? get _selected {
    final current = _current;
    if (current == null) return null;
    for (final opt in widget.options) {
      if (opt.value == current) return opt;
    }
    return null;
  }

  List<WashSearchSelectOption> get _matches {
    final q = _query.text;
    if (q.trim().isEmpty) return widget.options;
    return widget.options.where((opt) {
      if (washSearchSelectFilterText(q, opt.label) ||
          washSearchSelectFilterText(q, opt.value)) {
        return true;
      }
      final note = opt.note;
      if (note != null && washSearchSelectFilterText(q, note)) return true;
      final badge = opt.badge;
      if (badge != null && washSearchSelectFilterText(q, badge)) return true;
      return false;
    }).toList();
  }

  void _setOpen(bool value) {
    if (widget.disabled) return;
    if (widget.forceOpen && !value) return;
    if (_open == value) return;
    setState(() => _open = value);
    if (value) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted || !_open) return;
        _insertOverlay();
        _searchFocus.requestFocus();
      });
    } else {
      _removeOverlay();
      _searchFocus.unfocus();
    }
  }

  void _toggle() {
    if (widget.disabled) return;
    _rootFocus.requestFocus();
    _setOpen(!_open);
  }

  void _commit(WashSearchSelectOption opt) {
    if (opt.disabled) return;
    if (widget.value == null) {
      setState(() => _uncontrolled = opt.value);
    }
    widget.onChanged?.call(opt.value);
    widget.onPick?.call(opt.value);
    _query.clear();
    widget.onQueryChanged?.call('');
    if (!widget.forceOpen) _setOpen(false);
  }

  Rect? _triggerRect() {
    final box = _triggerKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null || !box.hasSize) return null;
    return box.localToGlobal(Offset.zero) & box.size;
  }

  double _estimatePanelHeight() {
    final matches = _matches;
    final rows = matches.isEmpty ? 1 : matches.length;
    final rich = matches.any((o) => o.note != null);
    final rowH = rich ? 52.0 : 40.0;
    return (16 + 44 + rows * rowH).clamp(96.0, 320.0);
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
                _rootFocus.unfocus();
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
            child: KeyedSubtree(
              key: _panelKey,
              child: _WashSearchSelectMenuPanel(
                queryController: _query,
                searchFocus: _searchFocus,
                filterPlaceholder: widget.filterPlaceholder,
                filterSize: widget.filterSize,
                filterLabel: widget.label,
                emptyMessage: widget.emptyMessage,
                matches: _matches,
                selectedValue: _current,
                onQueryChanged: (q) {
                  widget.onQueryChanged?.call(q);
                  setState(() {});
                  _entry?.markNeedsBuild();
                },
                onEscape: () {
                  _setOpen(false);
                  _rootFocus.unfocus();
                },
                onPick: _commit,
              ),
            ),
          ),
        ),
      ],
    );
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape) {
      if (_open) {
        _setOpen(false);
        _rootFocus.unfocus();
        return KeyEventResult.handled;
      }
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final selected = _selected;
    final hasValue = selected != null;

    final trigger = KeyedSubtree(
      key: _triggerKey,
      child: Semantics(
        button: true,
        enabled: !widget.disabled,
        expanded: _menuOpen,
        label: widget.semanticLabel ?? widget.label,
        child: WashButton(
          block: true,
          enabled: !widget.disabled,
          variant: widget.triggerVariant,
          size: widget.triggerSize,
          onPressed: _toggle,
          child: Row(
            children: [
              Expanded(
                child: hasValue
                    ? Row(
                        children: [
                          if (selected.swatch != null) ...[
                            _WashSearchSelectSwatch(selected.swatch!, size: 14),
                            const SizedBox(width: 8),
                          ] else if (selected.iconName != null) ...[
                            WashLucideIcon(
                              selected.iconName!,
                              size: 16,
                              strokeWidth: 2,
                            ),
                            const SizedBox(width: 8),
                          ],
                          Expanded(
                            child: Text(
                              selected.label,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontWeight: FontWeight.w400),
                            ),
                          ),
                          if (selected.badge != null) ...[
                            const SizedBox(width: 8),
                            WashBadge(
                              selected.badge!,
                              size: WashBadgeSize.sm,
                              tone: WashBadgeTone.primary,
                            ),
                          ],
                        ],
                      )
                    : Builder(
                        builder: (context) {
                          final fg = DefaultTextStyle.of(context).style.color ??
                              tokens.onSurface;
                          return Text(
                            widget.placeholder,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: fg.withValues(alpha: 0.5),
                              fontWeight: FontWeight.w400,
                            ),
                          );
                        },
                      ),
              ),
              const SizedBox(width: 8),
              Opacity(
                opacity: widget.triggerVariant == WashButtonVariant.primary
                    ? 0.8
                    : 0.6,
                child: const WashLucideIcon(
                  'chevrons-up-down',
                  size: 16,
                  strokeWidth: 2,
                ),
              ),
            ],
          ),
        ),
      ),
    );

    Widget field = Focus(
      focusNode: _rootFocus,
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
            constraints: const BoxConstraints(maxHeight: 320),
            child: _WashSearchSelectMenuPanel(
              queryController: _query,
              searchFocus: _searchFocus,
              filterPlaceholder: widget.filterPlaceholder,
              filterSize: widget.filterSize,
              filterLabel: widget.label,
              emptyMessage: widget.emptyMessage,
              matches: _matches,
              selectedValue: _current,
              onQueryChanged: (q) {
                widget.onQueryChanged?.call(q);
                setState(() {});
              },
              onEscape: () {
                if (!widget.forceOpen) {
                  _setOpen(false);
                  _rootFocus.unfocus();
                }
              },
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
    if (!showLabel) return field;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
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
      ],
    );
  }
}

class _WashSearchSelectSwatch extends StatelessWidget {
  const _WashSearchSelectSwatch(this.color, {this.size = 14});

  final Color color;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        border: Border.all(color: tokens.inkBorder),
      ),
    );
  }
}

class _WashSearchSelectMenuPanel extends StatelessWidget {
  const _WashSearchSelectMenuPanel({
    required this.queryController,
    required this.searchFocus,
    required this.filterPlaceholder,
    required this.filterSize,
    required this.emptyMessage,
    required this.matches,
    required this.onQueryChanged,
    required this.onEscape,
    required this.onPick,
    this.filterLabel,
    this.selectedValue,
  });

  final TextEditingController queryController;
  final FocusNode searchFocus;
  final String filterPlaceholder;
  final WashInputSize filterSize;
  final String? filterLabel;
  final String emptyMessage;
  final List<WashSearchSelectOption> matches;
  final String? selectedValue;
  final ValueChanged<String> onQueryChanged;
  final VoidCallback onEscape;
  final ValueChanged<WashSearchSelectOption> onPick;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
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
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Focus(
              onKeyEvent: (node, event) {
                if (event is KeyDownEvent &&
                    event.logicalKey == LogicalKeyboardKey.escape) {
                  onEscape();
                  return KeyEventResult.handled;
                }
                return KeyEventResult.ignored;
              },
              child: WashInput(
                controller: queryController,
                focusNode: searchFocus,
                hint: filterPlaceholder,
                size: filterSize,
                semanticLabel: filterLabel != null
                    ? 'Filter ${filterLabel!}'
                    : 'Filter options',
                onChanged: onQueryChanged,
                leading: WashLucideIcon(
                  'search',
                  size: 14,
                  strokeWidth: 2,
                  color: tokens.onSurface.withValues(alpha: 0.6),
                ),
              ),
            ),
            const SizedBox(height: 8),
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 208),
              child: matches.isEmpty
                  ? Align(
                      alignment: Alignment.topLeft,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        child: Text(
                          emptyMessage,
                          style: WashTypography.body(tokens.inkMuted)
                              .copyWith(fontSize: 13),
                        ),
                      ),
                    )
                  : ListView.builder(
                      shrinkWrap: true,
                      padding: EdgeInsets.zero,
                      itemCount: matches.length,
                      itemBuilder: (context, index) {
                        final opt = matches[index];
                        return _WashSearchSelectOptionRow(
                          option: opt,
                          active: opt.value == selectedValue,
                          onPick: onPick,
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _WashSearchSelectOptionRow extends StatelessWidget {
  const _WashSearchSelectOptionRow({
    required this.option,
    required this.active,
    required this.onPick,
  });

  final WashSearchSelectOption option;
  final bool active;
  final ValueChanged<WashSearchSelectOption> onPick;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final note = option.note;
    final row = Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      child: Row(
        children: [
          if (option.swatch != null) ...[
            _WashSearchSelectSwatch(option.swatch!),
            const SizedBox(width: 8),
          ] else if (option.iconName != null) ...[
            WashLucideIcon(option.iconName!, size: 16, strokeWidth: 2),
            const SizedBox(width: 8),
          ],
          Expanded(
            child: note == null
                ? Text(
                    option.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontWeight: active ? FontWeight.w600 : FontWeight.w500,
                    ),
                  )
                : Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        option.label,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        note,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 12),
                      ),
                    ],
                  ),
          ),
          if (option.badge != null) ...[
            const SizedBox(width: 8),
            WashBadge(
              option.badge!,
              size: WashBadgeSize.sm,
              style: WashBadgeStyle.ghost,
            ),
          ],
          if (active) ...[
            const SizedBox(width: 8),
            WashIcon(
              WashIconGlyph.check,
              size: 16,
              color: tokens.onSurface.withValues(alpha: 0.7),
            ),
          ],
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
