import 'dart:math' as math;

import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_style_spec.g.dart';
import '../../tokens/wash_pigments.g.dart';
import '../../tokens/wash_tokens.dart';
import '../badge/wash_badge.dart';
import '../palette/wash_palette.dart';

/// Pigment names used in autocomplete demos (web parity).
const List<String> kWashAutocompletePigmentNames = [
  'Ultramarine',
  'Yellow ochre',
  'Alizarin crimson',
  'Viridian',
  'Burnt sienna',
  'Cobalt blue',
  'Cerulean',
  'Quinacridone rose',
];

enum WashAutocompleteInputTone {
  defaultVariant,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

enum WashAutocompleteInputSize { xs, sm, md, lg, xl }

class WashAutocompleteOption {
  const WashAutocompleteOption({
    required this.id,
    required this.label,
    this.note,
    this.badge,
    this.leading,
    this.searchTokens = const [],
  });

  final String id;
  final String label;
  final String? note;
  final String? badge;
  final Widget? leading;
  final List<String> searchTokens;
}

bool washAutocompleteFilterText(String query, String haystack) {
  return haystack.toLowerCase().contains(query.trim().toLowerCase());
}

/// daisyUI dropdown + menu combobox (filters as you type).
class WashTypeaheadAutocomplete extends StatefulWidget {
  const WashTypeaheadAutocomplete({
    this.label = 'Suggest pigment',
    this.placeholder = 'Type to filter…',
    this.required = false,
    this.disabled = false,
    this.emptyQueryShowsAll = true,
    this.tone = WashAutocompleteInputTone.defaultVariant,
    this.size = WashAutocompleteInputSize.md,
    this.options = kWashAutocompletePigmentNames,
    this.initialQuery = '',
    this.initialOpen = false,
    this.emptyMessage = 'No pigments match.',
    this.onSelected,
    this.maxWidth = 448,
    super.key,
  });

  final String label;
  final String placeholder;
  final bool required;
  final bool disabled;
  final bool emptyQueryShowsAll;
  final WashAutocompleteInputTone tone;
  final WashAutocompleteInputSize size;
  final List<String> options;
  final String initialQuery;
  final bool initialOpen;
  final String emptyMessage;
  final ValueChanged<String>? onSelected;
  final double maxWidth;

  @override
  State<WashTypeaheadAutocomplete> createState() => _WashTypeaheadAutocompleteState();
}

class _WashTypeaheadAutocompleteState extends State<WashTypeaheadAutocomplete> {
  final _rootKey = GlobalKey();
  final _focusNode = FocusNode();
  late TextEditingController _controller;
  bool _open = false;
  int _activeIndex = -1;
  OverlayEntry? _outsideEntry;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialQuery);
    _open = widget.initialOpen && !widget.disabled;
    _focusNode.addListener(_onFocus);
    _focusNode.onKeyEvent = _onKey;
  }

  @override
  void didUpdateWidget(covariant WashTypeaheadAutocomplete oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.disabled && _open) {
      _setOpen(false);
    }
  }

  void _onFocus() {
    if (_focusNode.hasFocus && !widget.disabled) {
      _setOpen(true);
    }
  }

  List<String> get _matches {
    final q = _controller.text;
    if (q.trim().isEmpty && !widget.emptyQueryShowsAll) {
      return const [];
    }
    return widget.options
        .where((name) {
          if (q.trim().isEmpty) return widget.emptyQueryShowsAll;
          return washAutocompleteFilterText(q, name);
        })
        .toList();
  }

  void _setOpen(bool value) {
    if (widget.disabled) value = false;
    if (_open == value) return;
    setState(() {
      _open = value;
      if (!value) _activeIndex = -1;
    });
    if (value) {
      _installOutsideClose();
    } else {
      _removeOutsideClose();
    }
  }

  void _pick(String name) {
    _controller.text = name;
    _setOpen(false);
    widget.onSelected?.call(name);
  }

  void _installOutsideClose() {
    _removeOutsideClose();
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _outsideEntry = OverlayEntry(
      builder: (ctx) => Positioned.fill(
        child: Listener(
          behavior: HitTestBehavior.translucent,
          onPointerDown: (event) {
            final box = _rootKey.currentContext?.findRenderObject() as RenderBox?;
            if (box == null) return;
            final rect = box.localToGlobal(Offset.zero) & box.size;
            if (!rect.contains(event.position)) {
              _setOpen(false);
              _focusNode.unfocus();
            }
          },
        ),
      ),
    );
    overlay.insert(_outsideEntry!);
  }

  void _removeOutsideClose() {
    _outsideEntry?.remove();
    _outsideEntry = null;
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (widget.disabled) return KeyEventResult.ignored;
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    final matches = _matches;
    if (event.logicalKey == LogicalKeyboardKey.escape) {
      if (_open) {
        _setOpen(false);
        return KeyEventResult.handled;
      }
      return KeyEventResult.ignored;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      if (!_open) {
        _setOpen(true);
        setState(() => _activeIndex = matches.isEmpty ? -1 : 0);
        return KeyEventResult.handled;
      }
      if (matches.isEmpty) return KeyEventResult.handled;
      setState(() => _activeIndex = (_activeIndex + 1) % matches.length);
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      if (!_open) {
        _setOpen(true);
        setState(() => _activeIndex = matches.isEmpty ? -1 : matches.length - 1);
        return KeyEventResult.handled;
      }
      if (matches.isEmpty) return KeyEventResult.handled;
      setState(() {
        _activeIndex = _activeIndex <= 0 ? matches.length - 1 : _activeIndex - 1;
      });
      return KeyEventResult.handled;
    }
    if (event.logicalKey == LogicalKeyboardKey.enter) {
      if (_open && _activeIndex >= 0 && _activeIndex < matches.length) {
        _pick(matches[_activeIndex]);
        return KeyEventResult.handled;
      }
    }
    return KeyEventResult.ignored;
  }

  @override
  void dispose() {
    _removeOutsideClose();
    _focusNode.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final matches = _matches;
    final q = _controller.text.trim();

    return ConstrainedBox(
      key: _rootKey,
      constraints: BoxConstraints(maxWidth: widget.maxWidth),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          _WashAutocompleteLabel(
            label: widget.label,
            required: widget.required,
          ),
          _WashAutocompleteField(
              controller: _controller,
              focusNode: _focusNode,
              enabled: !widget.disabled,
              hint: widget.disabled ? 'Suggestions locked' : widget.placeholder,
              tone: widget.tone,
              size: widget.size,
              onChanged: (v) {
                setState(() => _activeIndex = -1);
                _setOpen(true);
              },
              onTap: () {
                if (!widget.disabled) _setOpen(true);
              },
            ),
            if (_open && !widget.disabled)
              Padding(
                padding: const EdgeInsets.only(top: 4),
                child: _WashAutocompleteMenuPanel(
                  width: widget.maxWidth,
                  child: matches.isEmpty
                      ? Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                          child: Text(
                            widget.emptyMessage,
                            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
                          ),
                        )
                      : Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            for (var i = 0; i < matches.length; i++)
                              _WashAutocompleteMenuRow(
                                label: matches[i],
                                active: _activeIndex == i,
                                trailing: q.isNotEmpty &&
                                        matches[i].toLowerCase() == q.toLowerCase()
                                    ? WashIcon(
                                        WashIconGlyph.check,
                                        size: 16,
                                        color: tokens.onSurface.withValues(alpha: 0.7),
                                      )
                                    : null,
                                onTap: () => _pick(matches[i]),
                                onHover: () => setState(() => _activeIndex = i),
                              ),
                          ],
                        ),
                ),
              ),
        ],
      ),
    );
  }
}

/// Search field with Lucide icons and badge chips in each suggestion.
class WashAutocompleteToolSearch extends StatefulWidget {
  const WashAutocompleteToolSearch({super.key});

  @override
  State<WashAutocompleteToolSearch> createState() => _WashAutocompleteToolSearchState();
}

class _WashAutocompleteToolSearchState extends State<WashAutocompleteToolSearch> {
  static final _tools = [
    WashAutocompleteOption(
      id: 'round',
      label: 'Round brush',
      note: 'Washes and edges',
      badge: 'Tool',
      leading: const WashLucideIcon('paintbrush', size: 16),
      searchTokens: ['Tool'],
    ),
    WashAutocompleteOption(
      id: 'drop',
      label: 'Wash dropper',
      note: 'Dilution control',
      badge: 'Water',
      leading: const WashLucideIcon('droplets', size: 16),
      searchTokens: ['Water'],
    ),
    WashAutocompleteOption(
      id: 'spark',
      label: 'Bloom lift',
      note: 'Soft highlights',
      badge: 'Effect',
      leading: const WashLucideIcon('sparkles', size: 16),
      searchTokens: ['Effect'],
    ),
  ];

  final _rootKey = GlobalKey();
  final _focusNode = FocusNode();
  final _controller = TextEditingController();
  bool _open = false;
  WashAutocompleteOption? _picked;
  OverlayEntry? _outsideEntry;

  List<WashAutocompleteOption> get _matches {
    final q = _controller.text;
    if (q.trim().isEmpty) return _tools;
    return _tools.where((item) {
      return washAutocompleteFilterText(q, item.label) ||
          (item.note != null && washAutocompleteFilterText(q, item.note!)) ||
          item.searchTokens.any((t) => washAutocompleteFilterText(q, t)) ||
          (item.badge != null && washAutocompleteFilterText(q, item.badge!));
    }).toList();
  }

  void _setOpen(bool value) {
    if (_open == value) return;
    setState(() => _open = value);
    if (value) {
      _installOutsideClose();
    } else {
      _removeOutsideClose();
    }
  }

  void _installOutsideClose() {
    _removeOutsideClose();
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _outsideEntry = OverlayEntry(
      builder: (ctx) => Positioned.fill(
        child: Listener(
          behavior: HitTestBehavior.translucent,
          onPointerDown: (event) {
            final box = _rootKey.currentContext?.findRenderObject() as RenderBox?;
            if (box == null) return;
            final rect = box.localToGlobal(Offset.zero) & box.size;
            if (!rect.contains(event.position)) {
              _setOpen(false);
              _focusNode.unfocus();
            }
          },
        ),
      ),
    );
    overlay.insert(_outsideEntry!);
  }

  void _removeOutsideClose() {
    _outsideEntry?.remove();
    _outsideEntry = null;
  }

  void _pick(WashAutocompleteOption item) {
    setState(() {
      _picked = item;
      _controller.text = item.label;
    });
    _setOpen(false);
  }

  @override
  void dispose() {
    _removeOutsideClose();
    _focusNode.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final matches = _matches;

    return ConstrainedBox(
      key: _rootKey,
      constraints: const BoxConstraints(maxWidth: 512),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          _WashAutocompleteSearchShell(
            leading: WashLucideIcon(
              'search',
              size: 16,
              color: tokens.onSurface.withValues(alpha: 0.6),
            ),
            trailing: _picked != null
                ? WashBadge(
                    _picked!.badge ?? '',
                    tone: WashBadgeTone.primary,
                    style: WashBadgeStyle.solid,
                    size: WashBadgeSize.sm,
                  )
                : null,
            controller: _controller,
            focusNode: _focusNode,
            hint: 'Search studio tools…',
            onChanged: (_) => _setOpen(true),
            onTap: () => _setOpen(true),
          ),
          if (_open)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: _WashAutocompleteMenuPanel(
                child: matches.isEmpty
                    ? Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        child: Text(
                          'No tools match.',
                          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
                        ),
                      )
                    : Column(
                        mainAxisSize: MainAxisSize.min,
                        children: matches.map((item) {
                          final active = _picked?.id == item.id;
                          return _WashAutocompleteMenuRow(
                            label: item.label,
                            note: item.note,
                            leading: item.leading,
                            trailing: item.badge != null
                                ? WashBadge(
                                    item.badge!,
                                    tone: WashBadgeTone.defaultTone,
                                    style: WashBadgeStyle.ghost,
                                    size: WashBadgeSize.sm,
                                  )
                                : null,
                            active: active,
                            onTap: () => _pick(item),
                          );
                        }).toList(),
                      ),
              ),
            ),
          const SizedBox(height: 8),
          Text(
            'label.input + dropdown menu + badge',
            style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 10,
              color: tokens.inkMuted,
            ),
          ),
        ],
      ),
    );
  }
}

class WashStudioPigmentRow {
  const WashStudioPigmentRow({
    required this.id,
    required this.label,
    required this.note,
    required this.swatch,
  });

  final String id;
  final String label;
  final String note;
  final Color swatch;
}

List<WashStudioPigmentRow> washStudioPigmentCatalog() {
  return kWashPigmentThemes
      .map(
        (t) => WashStudioPigmentRow(
          id: t.id,
          label: t.label,
          note: t.note,
          swatch: t.swatch,
        ),
      )
      .toList();
}

/// Filter [kWashPigmentIds] as watercolor theme suggestions.
class WashAutocompleteStudioField extends StatefulWidget {
  const WashAutocompleteStudioField({
    required this.onSelectionChanged,
    super.key,
  });

  final ValueChanged<WashStudioPigmentRow?> onSelectionChanged;

  @override
  State<WashAutocompleteStudioField> createState() => _WashAutocompleteStudioFieldState();
}

class _WashAutocompleteStudioFieldState extends State<WashAutocompleteStudioField> {
  final _rootKey = GlobalKey();
  final _focusNode = FocusNode();
  final _controller = TextEditingController();
  bool _open = false;
  String? _selectedId;
  OverlayEntry? _outsideEntry;

  late final List<WashStudioPigmentRow> _all = washStudioPigmentCatalog();

  List<WashStudioPigmentRow> get _matches {
    final q = _controller.text;
    if (q.trim().isEmpty) return _all;
    return _all.where((theme) {
      return washAutocompleteFilterText(q, theme.label) ||
          washAutocompleteFilterText(q, theme.note) ||
          washAutocompleteFilterText(q, theme.id);
    }).toList();
  }

  void _setOpen(bool value) {
    if (_open == value) return;
    setState(() => _open = value);
    if (value) {
      _installOutsideClose();
    } else {
      _removeOutsideClose();
    }
  }

  void _installOutsideClose() {
    _removeOutsideClose();
    final overlay = Overlay.maybeOf(context);
    if (overlay == null) return;
    _outsideEntry = OverlayEntry(
      builder: (ctx) => Positioned.fill(
        child: Listener(
          behavior: HitTestBehavior.translucent,
          onPointerDown: (event) {
            final box = _rootKey.currentContext?.findRenderObject() as RenderBox?;
            if (box == null) return;
            final rect = box.localToGlobal(Offset.zero) & box.size;
            if (!rect.contains(event.position)) {
              _setOpen(false);
              _focusNode.unfocus();
            }
          },
        ),
      ),
    );
    overlay.insert(_outsideEntry!);
  }

  void _removeOutsideClose() {
    _outsideEntry?.remove();
    _outsideEntry = null;
  }

  void _pick(WashStudioPigmentRow theme) {
    setState(() {
      _selectedId = theme.id;
      _controller.text = theme.label;
    });
    widget.onSelectionChanged(theme);
    _setOpen(false);
  }

  @override
  void dispose() {
    _removeOutsideClose();
    _focusNode.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final matches = _matches;
    final q = _controller.text.trim();

    return Column(
      key: _rootKey,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const _WashAutocompleteLabel(label: 'Studio pigment', required: true),
        _WashAutocompleteField(
          controller: _controller,
          focusNode: _focusNode,
          hint: 'Filter watercolorThemes…',
          tone: WashAutocompleteInputTone.primary,
          onChanged: (_) {
            setState(() => _selectedId = null);
            widget.onSelectionChanged(null);
            _setOpen(true);
          },
          onTap: () => _setOpen(true),
        ),
        if (_open)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: _WashAutocompleteMenuPanel(
              child: matches.isEmpty
                  ? Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      child: Text(
                        q.isEmpty
                            ? 'No studio pigments match.'
                            : 'No studio pigments match "$q".',
                        style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 13),
                      ),
                    )
                  : Column(
                      mainAxisSize: MainAxisSize.min,
                      children: matches.map((theme) {
                        final active = _selectedId == theme.id;
                        return _WashAutocompleteMenuRow(
                          label: theme.label,
                          note: theme.note,
                          leading: _WashAutocompleteSwatch(theme.swatch),
                          active: active,
                          trailing: active
                              ? WashIcon(
                                  WashIconGlyph.check,
                                  size: 16,
                                  color: tokens.onSurface.withValues(alpha: 0.7),
                                )
                              : null,
                          onTap: () => _pick(theme),
                        );
                      }).toList(),
                    ),
            ),
          ),
        Padding(
          padding: const EdgeInsets.only(top: 8),
          child: Text(
            'Showing ${matches.length} of ${_all.length} pigments',
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 11),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'input + menu · watercolorThemes filter',
          style: TextStyle(
            fontFamily: 'monospace',
            fontSize: 10,
            color: tokens.inkMuted,
          ),
        ),
      ],
    );
  }
}

/// Compact legacy preview widget for gallery stubs.
class WashAutocomplete extends StatelessWidget {
  const WashAutocomplete({super.key});

  @override
  Widget build(BuildContext context) {
    return const WashTypeaheadAutocomplete(
      label: 'Pigment name',
      placeholder: 'Start typing a pigment…',
      required: true,
    );
  }
}

class _WashAutocompleteLabel extends StatelessWidget {
  const _WashAutocompleteLabel({required this.label, this.required = false});
  final String label;
  final bool required;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: WashTypography.label(tokens.onSurface)),
          if (required)
            Text(
              '*',
              style: WashTypography.label(tokens.palette.error).copyWith(
                fontSize: 13,
                height: 1,
              ),
            ),
        ],
      ),
    );
  }
}

class _WashAutocompleteField extends StatelessWidget {
  const _WashAutocompleteField({
    required this.controller,
    required this.focusNode,
    this.hint,
    this.enabled = true,
    this.tone = WashAutocompleteInputTone.defaultVariant,
    this.size = WashAutocompleteInputSize.md,
    this.onChanged,
    this.onTap,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final String? hint;
  final bool enabled;
  final WashAutocompleteInputTone tone;
  final WashAutocompleteInputSize size;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = _metricsFor(size);
    final border = _toneBorder(tokens, tone);
    return GestureDetector(
      onTap: enabled ? onTap : null,
      child: Container(
        constraints: BoxConstraints(minHeight: metrics.minHeight),
        padding: EdgeInsets.symmetric(horizontal: metrics.paddingX, vertical: metrics.paddingY),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(metrics.borderRadius),
          border: Border.all(color: border, width: metrics.borderWidth),
        ),
        alignment: Alignment.centerLeft,
        child: _WashAutocompleteEditable(
          controller: controller,
          focusNode: focusNode,
          readOnly: !enabled,
          hint: hint,
          style: WashTypography.body(tokens.onSurface).copyWith(fontSize: metrics.fontSize),
          hintStyle: WashTypography.body(tokens.inkMuted).copyWith(fontSize: metrics.fontSize),
          cursorColor: tokens.primary,
          onChanged: onChanged,
        ),
      ),
    );
  }
}

class _WashAutocompleteSearchShell extends StatelessWidget {
  const _WashAutocompleteSearchShell({
    required this.leading,
    required this.controller,
    required this.focusNode,
    this.trailing,
    this.hint,
    this.onChanged,
    this.onTap,
  });

  final Widget leading;
  final Widget? trailing;
  final TextEditingController controller;
  final FocusNode focusNode;
  final String? hint;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = kWashInputDefault;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        constraints: BoxConstraints(minHeight: m.minHeight),
        padding: EdgeInsets.symmetric(horizontal: m.paddingX, vertical: m.paddingY),
        decoration: washInkBorderBox(tokens, radius: m.borderRadius),
        child: Row(
          children: [
            leading,
            const SizedBox(width: 8),
            Expanded(
              child: _WashAutocompleteEditable(
                controller: controller,
                focusNode: focusNode,
                hint: hint,
                style: WashTypography.body(tokens.onSurface),
                hintStyle: WashTypography.body(tokens.inkMuted),
                cursorColor: tokens.primary,
                onChanged: onChanged,
              ),
            ),
            if (trailing != null) ...[const SizedBox(width: 8), trailing!],
          ],
        ),
      ),
    );
  }
}

class _WashAutocompleteMenuPanel extends StatelessWidget {
  const _WashAutocompleteMenuPanel({required this.child, this.width});

  final Widget child;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final screen = MediaQuery.sizeOf(context);
    final viewportW = screen.width > 0 ? screen.width : 360.0;
    final maxH = math.min(screen.height > 0 ? screen.height * 0.7 : 240.0, 240.0);
    final maxW = math.max(0.0, math.min(viewportW - 16, width ?? 448.0)).toDouble();
    return SizedBox(
      width: maxW,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: tokens.inkBorder),
          boxShadow: washPaperShadowSm(tokens),
        ),
        child: ConstrainedBox(
          constraints: BoxConstraints(maxHeight: maxH),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(8),
            child: child,
          ),
        ),
      ),
    );
  }
}

class _WashAutocompleteMenuRow extends StatelessWidget {
  const _WashAutocompleteMenuRow({
    required this.label,
    this.note,
    this.leading,
    this.trailing,
    this.active = false,
    required this.onTap,
    this.onHover,
  });

  final String label;
  final String? note;
  final Widget? leading;
  final Widget? trailing;
  final bool active;
  final VoidCallback onTap;
  final VoidCallback? onHover;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashRipple(
      onTap: onTap,
      child: MouseRegion(
        onEnter: (_) => onHover?.call(),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: active ? tokens.primary.withValues(alpha: 0.14) : null,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Row(
              children: [
                if (leading != null) ...[leading!, const SizedBox(width: 8)],
                Expanded(
                  child: note == null
                      ? Text(
                          label,
                          style: WashTypography.body(tokens.onSurface).copyWith(
                            fontWeight: active ? FontWeight.w600 : FontWeight.w500,
                          ),
                        )
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              label,
                              style: WashTypography.body(tokens.onSurface).copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            Text(
                              note!,
                              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 11),
                            ),
                          ],
                        ),
                ),
                if (trailing != null) trailing!,
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _WashAutocompleteSwatch extends StatelessWidget {
  const _WashAutocompleteSwatch(this.color);
  final Color color;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: 14,
      height: 14,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color,
        border: Border.all(color: tokens.inkBorder),
      ),
    );
  }
}

class _WashAutocompleteEditable extends StatefulWidget {
  const _WashAutocompleteEditable({
    required this.controller,
    required this.focusNode,
    required this.style,
    required this.hintStyle,
    required this.cursorColor,
    this.hint,
    this.readOnly = false,
    this.onChanged,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final TextStyle style;
  final TextStyle hintStyle;
  final Color cursorColor;
  final String? hint;
  final bool readOnly;
  final ValueChanged<String>? onChanged;

  @override
  State<_WashAutocompleteEditable> createState() => _WashAutocompleteEditableState();
}

class _WashAutocompleteEditableState extends State<_WashAutocompleteEditable> {
  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_sync);
  }

  @override
  void didUpdateWidget(covariant _WashAutocompleteEditable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_sync);
      widget.controller.addListener(_sync);
    }
  }

  @override
  void dispose() {
    widget.controller.removeListener(_sync);
    super.dispose();
  }

  void _sync() => setState(() {});

  @override
  Widget build(BuildContext context) {
    final showHint = widget.hint != null && widget.hint!.isNotEmpty && widget.controller.text.isEmpty;
    return SizedBox(
      width: double.infinity,
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          if (showHint)
            IgnorePointer(
              child: Text(
                widget.hint!,
                style: widget.hintStyle,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          EditableText(
            controller: widget.controller,
            focusNode: widget.focusNode,
            readOnly: widget.readOnly,
            style: widget.style,
            cursorColor: widget.cursorColor,
            backgroundCursorColor:
                widget.hintStyle.color ?? widget.style.color ?? const Color(0xFF000000),
            onChanged: widget.onChanged,
          ),
        ],
      ),
    );
  }
}

WashInputMetrics _metricsFor(WashAutocompleteInputSize size) {
  return switch (size) {
    WashAutocompleteInputSize.xs => const WashInputMetrics(
        minHeight: 32,
        paddingX: 10,
        paddingY: 6,
        fontSize: 12,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashAutocompleteInputSize.sm => const WashInputMetrics(
        minHeight: 40,
        paddingX: 12,
        paddingY: 8,
        fontSize: 13,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashAutocompleteInputSize.md => kWashInputDefault,
    WashAutocompleteInputSize.lg => const WashInputMetrics(
        minHeight: 52,
        paddingX: 18,
        paddingY: 12,
        fontSize: 15,
        borderRadius: 16,
        borderWidth: 1,
      ),
    WashAutocompleteInputSize.xl => const WashInputMetrics(
        minHeight: 56,
        paddingX: 20,
        paddingY: 14,
        fontSize: 16,
        borderRadius: 16,
        borderWidth: 1,
      ),
  };
}

Color _toneBorder(WashTokens tokens, WashAutocompleteInputTone tone) {
  final p = tokens.palette;
  return switch (tone) {
    WashAutocompleteInputTone.defaultVariant => tokens.inkBorder,
    WashAutocompleteInputTone.neutral => p.neutral,
    WashAutocompleteInputTone.primary => p.primary,
    WashAutocompleteInputTone.secondary => p.secondary,
    WashAutocompleteInputTone.accent => p.accent,
    WashAutocompleteInputTone.info => p.info,
    WashAutocompleteInputTone.success => p.success,
    WashAutocompleteInputTone.warning => p.warning,
    WashAutocompleteInputTone.error => p.error,
  };
}
