import 'dart:math' as math;

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/wash_ripple.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../badge/wash_badge.dart';
import '../button/wash_button.dart';
import '../chip/wash_chip.dart';
import '../input/wash_input.dart';

enum WashTagsInputSuggestionMode { none, datalist, menu }

String washNormalizeTag(String raw) {
  return raw.trim().replaceAll(RegExp(r'^,+|,+$'), '').trim();
}

String washTagsInputClassLabel({
  WashInputTone tone = WashInputTone.defaultTone,
  WashInputSize size = WashInputSize.md,
  WashBadgeTone badgeTone = WashBadgeTone.defaultTone,
  WashBadgeStyle badgeStyle = WashBadgeStyle.soft,
  WashBadgeSize badgeSize = WashBadgeSize.md,
}) {
  final input = washInputClassLabel(tone: tone, size: size);
  final badge = <String>['badge'];
  if (badgeTone != WashBadgeTone.defaultTone) {
    badge.add('badge-${_badgeToneClass(badgeTone)}');
  }
  if (badgeStyle == WashBadgeStyle.soft) badge.add('badge-soft');
  if (badgeStyle == WashBadgeStyle.outline) badge.add('badge-outline');
  if (badgeSize != WashBadgeSize.md) badge.add('badge-${badgeSize.name}');
  return '$input + ${badge.join(' ')}';
}

String _badgeToneClass(WashBadgeTone tone) {
  return switch (tone) {
    WashBadgeTone.defaultTone => '',
    WashBadgeTone.neutral => 'neutral',
    WashBadgeTone.primary => 'primary',
    WashBadgeTone.secondary => 'secondary',
    WashBadgeTone.accent => 'accent',
    WashBadgeTone.info => 'info',
    WashBadgeTone.success => 'success',
    WashBadgeTone.warning => 'warning',
    WashBadgeTone.error => 'error',
  };
}

/// Gallery monospace class hint (TagsInputPage ClassLabel).
class WashTagsInputClassLabel extends StatelessWidget {
  const WashTagsInputClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'input + badge' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// daisyUI `input` shell with `badge` chips (Enter / comma to add).
class WashTagsInput extends StatefulWidget {
  const WashTagsInput({
    required this.tags,
    required this.onChanged,
    this.placeholder = 'Add a tag…',
    this.dismissible = false,
    this.allowDuplicates = false,
    this.maxTags,
    this.suggestions = const [],
    this.suggestionMode = WashTagsInputSuggestionMode.none,
    this.tone = WashInputTone.defaultTone,
    this.size = WashInputSize.md,
    this.badgeTone = WashBadgeTone.defaultTone,
    this.badgeStyle = WashBadgeStyle.soft,
    this.badgeSize = WashBadgeSize.md,
    this.enabled = true,
    this.invalid = false,
    this.semanticLabel,
    this.onLimitHit,
    this.onDuplicate,
    super.key,
  });

  final List<String> tags;
  final ValueChanged<List<String>> onChanged;
  final String placeholder;
  final bool dismissible;
  final bool allowDuplicates;
  final int? maxTags;
  final List<String> suggestions;
  final WashTagsInputSuggestionMode suggestionMode;
  final WashInputTone tone;
  final WashInputSize size;
  final WashBadgeTone badgeTone;
  final WashBadgeStyle badgeStyle;
  final WashBadgeSize badgeSize;
  final bool enabled;
  final bool invalid;
  final String? semanticLabel;
  final VoidCallback? onLimitHit;
  final ValueChanged<String>? onDuplicate;

  @override
  State<WashTagsInput> createState() => _WashTagsInputState();
}

class _WashTagsInputState extends State<WashTagsInput> {
  final _controller = TextEditingController();
  final _focus = FocusNode();
  var _menuOpen = false;
  var _pickingSuggestion = false;

  bool get _atLimit =>
      widget.maxTags != null && widget.tags.length >= widget.maxTags!;

  bool get _fieldEnabled => widget.enabled && !_atLimit;

  List<String> get _filteredSuggestions {
    final q = _controller.text.trim().toLowerCase();
    return [
      for (final item in widget.suggestions)
        if ((q.isEmpty || item.toLowerCase().contains(q)) &&
            (widget.allowDuplicates ||
                !widget.tags.any((t) => t.toLowerCase() == item.toLowerCase())))
          item,
    ];
  }

  @override
  void initState() {
    super.initState();
    _focus
      ..addListener(_onFocusChange)
      ..onKeyEvent = _onKey;
    _controller.addListener(_onDraftTick);
  }

  @override
  void dispose() {
    _focus
      ..removeListener(_onFocusChange)
      ..onKeyEvent = null;
    _controller.removeListener(_onDraftTick);
    _focus.dispose();
    _controller.dispose();
    super.dispose();
  }

  void _onDraftTick() {
    if (mounted) setState(() {});
  }

  void _onFocusChange() {
    if (!mounted) return;
    if (_focus.hasFocus) {
      if (widget.suggestionMode == WashTagsInputSuggestionMode.menu) {
        setState(() => _menuOpen = true);
      }
      return;
    }
    if (_pickingSuggestion) {
      _pickingSuggestion = false;
      return;
    }
    if (_controller.text.trim().isNotEmpty) {
      _commit(_controller.text);
    }
    setState(() => _menuOpen = false);
  }

  bool _commit(String raw) {
    final value = washNormalizeTag(raw);
    if (value.isEmpty) return false;
    if (_atLimit) {
      widget.onLimitHit?.call();
      return false;
    }
    if (!widget.allowDuplicates &&
        widget.tags.any((t) => t.toLowerCase() == value.toLowerCase())) {
      widget.onDuplicate?.call(value);
      _controller.clear();
      return false;
    }
    widget.onChanged([...widget.tags, value]);
    _controller.clear();
    return true;
  }

  void _removeAt(int index) {
    widget.onChanged([
      for (var i = 0; i < widget.tags.length; i++)
        if (i != index) widget.tags[i],
    ]);
    _focus.requestFocus();
  }

  void _commitMany(Iterable<String> parts) {
    final next = [...widget.tags];
    for (final raw in parts) {
      final value = washNormalizeTag(raw);
      if (value.isEmpty) continue;
      if (widget.maxTags != null && next.length >= widget.maxTags!) {
        widget.onLimitHit?.call();
        break;
      }
      if (!widget.allowDuplicates &&
          next.any((t) => t.toLowerCase() == value.toLowerCase())) {
        widget.onDuplicate?.call(value);
        continue;
      }
      next.add(value);
    }
    widget.onChanged(next);
    _controller.clear();
  }

  void _onTextChanged(String value) {
    if (value.contains(',') || value.contains('\n')) {
      final parts = value.split(RegExp(r'[,\n]'));
      _commitMany(parts);
      return;
    }
    if (widget.suggestionMode != WashTagsInputSuggestionMode.none) {
      setState(() => _menuOpen = true);
    }
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (event is! KeyDownEvent) return KeyEventResult.ignored;
    final key = event.logicalKey;
    if (key == LogicalKeyboardKey.escape) {
      setState(() => _menuOpen = false);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.enter ||
        key == LogicalKeyboardKey.numpadEnter ||
        key == LogicalKeyboardKey.comma) {
      _commit(_controller.text);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.backspace &&
        _controller.text.isEmpty &&
        widget.tags.isNotEmpty) {
      widget.onChanged(widget.tags.sublist(0, widget.tags.length - 1));
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final metrics = washInputMetricsFor(widget.size);
    final tone = widget.invalid ? WashInputTone.error : widget.tone;
    final (fill, border, shadow) = _shellColors(tokens, tone, !widget.enabled);
    final suggestions = _filteredSuggestions;
    final showMenu = widget.suggestionMode != WashTagsInputSuggestionMode.none &&
        _menuOpen &&
        _fieldEnabled &&
        suggestions.isNotEmpty &&
        (widget.suggestionMode == WashTagsInputSuggestionMode.menu ||
            _controller.text.trim().isNotEmpty ||
            _focus.hasFocus);

    final hint = widget.tags.isEmpty
        ? widget.placeholder
        : (_atLimit ? 'Limit reached' : widget.placeholder);

    Widget shell = GestureDetector(
      onTap: widget.enabled ? () => _focus.requestFocus() : null,
      child: MouseRegion(
        cursor: widget.enabled
            ? SystemMouseCursors.text
            : SystemMouseCursors.forbidden,
        child: Container(
          width: double.infinity,
          constraints: BoxConstraints(minHeight: math.max(metrics.minHeight, 40)),
          padding: EdgeInsets.symmetric(
            horizontal: metrics.paddingX,
            vertical: math.max(metrics.paddingY, 8),
          ),
          decoration: BoxDecoration(
            color: fill,
            borderRadius: BorderRadius.circular(metrics.borderRadius),
            border: Border.all(color: border, width: metrics.borderWidth),
            boxShadow: shadow,
          ),
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              for (var i = 0; i < widget.tags.length; i++) _chip(widget.tags[i], i),
              _draftField(tokens, metrics, hint),
            ],
          ),
        ),
      ),
    );

    if (!widget.enabled) {
      shell = Opacity(opacity: 0.6, child: shell);
    }

    if (widget.semanticLabel != null) {
      shell = Semantics(
        textField: true,
        label: widget.semanticLabel,
        enabled: widget.enabled,
        child: shell,
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        shell,
        if (showMenu)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: _SuggestionMenu(
              items: suggestions,
              onPick: (item) {
                _pickingSuggestion = true;
                _commit(item);
                setState(() => _menuOpen = false);
                _focus.requestFocus();
              },
            ),
          ),
      ],
    );
  }

  Widget _chip(String tag, int index) {
    if (!widget.dismissible) {
      return WashChip(
        label: tag,
        tone: widget.badgeTone,
        style: widget.badgeStyle,
        size: widget.badgeSize,
      );
    }

    final dismiss = WashTooltip(
      message: 'Remove',
      prefer: WashTooltipSide.right,
      child: WashButton(
        onPressed: widget.enabled ? () => _removeAt(index) : null,
        variant: WashButtonVariant.ghost,
        tint: WashButtonVariant.error,
        size: WashButtonSize.xs,
        square: true,
        child: const WashLucideIcon('x', size: 14, strokeWidth: 2),
      ),
    );

    return Semantics(
      button: false,
      label: tag,
      child: WashBadge(
        tag,
        tone: widget.badgeTone,
        style: widget.badgeStyle,
        size: widget.badgeSize,
        trailing: dismiss,
        semanticsLabel: tag,
      ),
    );
  }

  Widget _draftField(
    WashTokens tokens,
    WashInputMetrics metrics,
    String hint,
  ) {
    final textStyle = WashTypography.body(tokens.onSurface).copyWith(
      fontSize: metrics.fontSize,
    );
    final hintStyle = WashTypography.body(tokens.inkMuted).copyWith(
      fontSize: metrics.fontSize,
    );
    final measure = _controller.text.isEmpty ? hint : _controller.text;
    final painter = TextPainter(
      text: TextSpan(text: measure, style: textStyle),
      maxLines: 1,
      textDirection: TextDirection.ltr,
    )..layout();
    final width = math.max(128.0, painter.width + 12);
    painter.dispose();

    return SizedBox(
      width: width,
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          if (_controller.text.isEmpty)
            IgnorePointer(
              child: Text(
                hint,
                style: hintStyle,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          EditableText(
            controller: _controller,
            focusNode: _focus,
            readOnly: !_fieldEnabled,
            style: textStyle,
            cursorColor: tokens.primary,
            backgroundCursorColor: tokens.inkMuted,
            keyboardType: TextInputType.text,
            maxLines: 1,
            onChanged: _onTextChanged,
          ),
        ],
      ),
    );
  }
}

(Color? fill, Color border, List<BoxShadow>? shadow) _shellColors(
  WashTokens tokens,
  WashInputTone tone,
  bool disabled,
) {
  final p = tokens.palette;
  Color border = tokens.inkBorder;
  Color? fill = tokens.surface;
  List<BoxShadow>? shadow = washPaperShadowSm(tokens);

  switch (tone) {
    case WashInputTone.ghost:
      fill = null;
      border = tokens.inkBorder.withValues(alpha: 0.45);
      shadow = null;
    case WashInputTone.neutral:
      border = p.neutral;
    case WashInputTone.primary:
      border = p.primary;
    case WashInputTone.secondary:
      border = p.secondary;
    case WashInputTone.accent:
      border = p.accent;
    case WashInputTone.info:
      border = p.info;
    case WashInputTone.success:
      border = p.success;
    case WashInputTone.warning:
      border = p.warning;
    case WashInputTone.error:
      border = p.error;
    case WashInputTone.defaultTone:
      break;
  }

  if (disabled) shadow = null;
  return (fill, border, shadow);
}

class _SuggestionMenu extends StatelessWidget {
  const _SuggestionMenu({required this.items, required this.onPick});

  final List<String> items;
  final ValueChanged<String> onPick;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxHeight: 192),
        child: ListView(
          padding: const EdgeInsets.all(8),
          shrinkWrap: true,
          children: [
            for (final item in items)
              WashRipple(
                borderRadius: 8,
                onTap: () => onPick(item),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  child: Text(
                    item,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontWeight: FontWeight.w500,
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
