import 'package:flutter/widgets.dart';

import '../button/wash_button.dart';
import '../input/wash_editable.dart';
import '../layout/wash_aspect_ratio.dart';
import '../../foundation/wash_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `join` + `join-item` (horizontal or vertical segment control).
class WashJoin extends StatelessWidget {
  const WashJoin({
    required this.children,
    this.vertical = false,
    this.wrap = false,
    this.fullWidth = false,
    super.key,
  });

  final List<Widget> children;
  final bool vertical;
  final bool wrap;
  final bool fullWidth;

  /// `join-vertical sm:join-horizontal` using [maxWidth] (not screen width).
  static Widget responsive({
    required List<Widget> children,
    required double maxWidth,
    double breakpoint = 640,
    bool wrap = false,
  }) {
    final vertical = maxWidth < breakpoint;
    return WashJoin(vertical: vertical, wrap: wrap, children: children);
  }

  /// `join-vertical lg:join-horizontal` (Tailwind `lg` = 1024px).
  static Widget responsiveLg({
    required List<Widget> children,
    required double maxWidth,
    bool wrap = false,
  }) {
    return responsive(
      children: children,
      maxWidth: maxWidth,
      breakpoint: WashTailwindBreakpoints.lg,
      wrap: wrap,
    );
  }

  @override
  Widget build(BuildContext context) {
    if (children.isEmpty) return const SizedBox.shrink();

    final items = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      items.add(
        _WashJoinItem(
          vertical: vertical,
          first: i == 0,
          last: i == children.length - 1,
          child: children[i],
        ),
      );
    }

    if (vertical) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: items,
      );
    }

    if (wrap) {
      return Wrap(
        spacing: 0,
        runSpacing: 0,
        children: items,
      );
    }

    if (fullWidth) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          for (var i = 0; i < items.length; i++)
            if (i == items.length - 1) items[i] else Expanded(child: items[i]),
        ],
      );
    }

    final row = Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: items,
    );
    final containsField = children.any(
      (child) =>
          child is WashInput ||
          child is WashEditable ||
          child is WashJoinInput ||
          child is WashTextarea,
    );
    if (containsField) return row;
    return LayoutBuilder(
      builder: (context, constraints) {
        if (!constraints.hasBoundedWidth) return row;
        return FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerLeft,
          child: row,
        );
      },
    );
  }
}

class _WashJoinItem extends StatelessWidget {
  const _WashJoinItem({
    required this.child,
    required this.vertical,
    required this.first,
    required this.last,
  });

  final Widget child;
  final bool vertical;
  final bool first;
  final bool last;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final borderColor = tokens.palette.base300;
    const r = 12.0;

    if (vertical) {
      return Transform.translate(
        offset: first ? Offset.zero : const Offset(0, -1),
        child: DecoratedBox(
          decoration: BoxDecoration(
            border: Border(
              top: first ? BorderSide(color: borderColor) : BorderSide.none,
              left: BorderSide(color: borderColor),
              right: BorderSide(color: borderColor),
              bottom: BorderSide(color: borderColor),
            ),
            borderRadius: BorderRadius.vertical(
              top: first ? const Radius.circular(r) : Radius.zero,
              bottom: last ? const Radius.circular(r) : Radius.zero,
            ),
          ),
          child: child,
        ),
      );
    }

    return Transform.translate(
      offset: first ? Offset.zero : const Offset(-1, 0),
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(color: borderColor),
            bottom: BorderSide(color: borderColor),
            left: first ? BorderSide(color: borderColor) : BorderSide.none,
            right: BorderSide(color: borderColor),
          ),
          borderRadius: BorderRadius.horizontal(
            left: first ? const Radius.circular(r) : Radius.zero,
            right: last ? const Radius.circular(r) : Radius.zero,
          ),
        ),
        child: child,
      ),
    );
  }
}

WashInputMetrics _joinInputMetrics(WashButtonSize? size) {
  if (size == null) return kWashInputDefault;
  final key = switch (size) {
    WashButtonSize.xs => 'xs',
    WashButtonSize.sm => 'sm',
    WashButtonSize.md => 'md',
    WashButtonSize.lg => 'lg',
    WashButtonSize.xl => 'xl',
  };
  final btn = kWashBtnSizeMetrics[key] ?? kWashBtnDefault;
  return WashInputMetrics(
    minHeight: btn.minHeight,
    paddingX: btn.paddingX,
    paddingY: kWashInputDefault.paddingY,
    fontSize: btn.fontSize,
    borderRadius: btn.borderRadius,
    borderWidth: btn.borderWidth,
  );
}

/// `input.join-item` (optional leading icon inside the field).
class WashJoinInput extends StatelessWidget {
  const WashJoinInput({
    this.hint,
    this.leading,
    this.joinItem = true,
    this.size,
    this.controller,
    this.width,
    super.key,
  });

  final String? hint;
  final Widget? leading;
  final bool joinItem;
  final WashButtonSize? size;
  final TextEditingController? controller;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _joinInputMetrics(size);
    final radius = joinItem ? 0.0 : m.borderRadius;
    final field = Container(
      constraints: BoxConstraints(minHeight: m.minHeight),
      padding:
          EdgeInsets.symmetric(horizontal: m.paddingX, vertical: m.paddingY),
      decoration: washInkBorderBox(tokens, radius: radius),
      alignment: Alignment.centerLeft,
      child: Row(
        children: [
          if (leading != null) ...[
            leading!,
            const SizedBox(width: 8),
          ],
          if (width != null)
            Expanded(
              child: WashJoinEditable(
                controller: controller,
                hint: hint,
                joinItem: joinItem,
                metrics: m,
              ),
            )
          else
            Flexible(
              fit: FlexFit.loose,
              child: WashJoinEditable(
                controller: controller,
                hint: hint,
                joinItem: joinItem,
                metrics: m,
              ),
            ),
        ],
      ),
    );
    if (width != null) {
      return SizedBox(width: width, child: field);
    }
    return field;
  }
}

/// Bare editable for use inside [WashJoinInput] (no outer box).
class WashJoinEditable extends StatefulWidget {
  const WashJoinEditable({
    this.controller,
    this.hint,
    this.joinItem = false,
    this.metrics,
    super.key,
  });

  final TextEditingController? controller;
  final String? hint;
  final bool joinItem;
  final WashInputMetrics? metrics;

  @override
  State<WashJoinEditable> createState() => _WashJoinEditableState();
}

class _WashJoinEditableState extends State<WashJoinEditable> {
  late TextEditingController _controller;
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
  }

  @override
  void dispose() {
    if (widget.controller == null) _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = widget.metrics ?? kWashInputDefault;
    return Stack(
      alignment: Alignment.centerLeft,
      children: [
        if (widget.hint != null && _controller.text.isEmpty)
          Text(
            widget.hint!,
            style: WashTypography.body(tokens.inkMuted)
                .copyWith(fontSize: m.fontSize),
          ),
        EditableText(
          controller: _controller,
          focusNode: _focusNode,
          style: WashTypography.body(tokens.onSurface)
              .copyWith(fontSize: m.fontSize),
          cursorColor: tokens.primary,
          backgroundCursorColor: tokens.inkMuted,
          maxLines: 1,
          onChanged: (_) => setState(() {}),
        ),
      ],
    );
  }
}

class WashJoinSelectOption<T> {
  const WashJoinSelectOption(
      {required this.value, required this.label, this.enabled = true});
  final T value;
  final String label;
  final bool enabled;
}

/// `select.join-item` for join toolbars and mixed control rows.
class WashJoinSelect<T> extends StatefulWidget {
  const WashJoinSelect({
    required this.value,
    required this.options,
    required this.onChanged,
    this.joinItem = true,
    this.size = WashButtonSize.md,
    this.placeholder,
    this.accessibilityLabel,
    this.width,
    super.key,
  });

  final T? value;
  final List<WashJoinSelectOption<T>> options;
  final ValueChanged<T?> onChanged;
  final bool joinItem;
  final WashButtonSize size;
  final String? placeholder;
  final String? accessibilityLabel;
  final double? width;

  @override
  State<WashJoinSelect<T>> createState() => _WashJoinSelectState<T>();
}

class _WashJoinSelectState<T> extends State<WashJoinSelect<T>> {
  OverlayEntry? _entry;

  void _close() {
    _entry?.remove();
    _entry = null;
  }

  void _toggle() {
    if (_entry != null) {
      _close();
      return;
    }
    final box = context.findRenderObject() as RenderBox?;
    if (box == null) return;
    final origin = box.localToGlobal(Offset.zero);
    final tokens = WashTokens.of(context);
    _entry = OverlayEntry(
      builder: (context) => Stack(
        children: [
          Positioned.fill(
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: _close,
            ),
          ),
          Positioned(
            left: origin.dx,
            top: origin.dy + box.size.height + 4,
            width: box.size.width,
            child: _WashJoinSelectList<T>(
              tokens: tokens,
              options: widget.options,
              value: widget.value,
              onPick: (v) {
                widget.onChanged(v);
                _close();
              },
            ),
          ),
        ],
      ),
    );
    Overlay.of(context).insert(_entry!);
  }

  @override
  void dispose() {
    _close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _joinInputMetrics(widget.size);
    final radius = widget.joinItem ? 0.0 : m.borderRadius;
    final selected =
        widget.options.where((o) => o.value == widget.value).firstOrNull;
    final label = selected?.label ?? widget.placeholder ?? '';
    final field = Container(
      constraints:
          BoxConstraints(minHeight: m.minHeight, minWidth: widget.width ?? 120),
      width: widget.width,
      padding: EdgeInsets.symmetric(horizontal: m.paddingX),
      decoration: washInkBorderBox(tokens, radius: radius),
      alignment: Alignment.centerLeft,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Flexible(
            child: Text(
              label,
              style: WashTypography.body(tokens.onSurface)
                  .copyWith(fontSize: m.fontSize),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const SizedBox(width: 6),
          WashIcon(
            WashIconGlyph.chevronDown,
            size: 16,
            color: tokens.onSurface.withValues(alpha: 0.7),
          ),
        ],
      ),
    );
    return Semantics(
      label: widget.accessibilityLabel ?? widget.placeholder,
      button: true,
      child: GestureDetector(onTap: _toggle, child: field),
    );
  }
}

class _WashJoinSelectList<T> extends StatelessWidget {
  const _WashJoinSelectList({
    required this.tokens,
    required this.options,
    required this.value,
    required this.onPick,
    super.key,
  });

  final WashTokens tokens;
  final List<WashJoinSelectOption<T>> options;
  final T? value;
  final ValueChanged<T?> onPick;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: washInkBorderBox(tokens, radius: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (final o in options)
            GestureDetector(
              onTap: o.enabled ? () => onPick(o.value) : null,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                color: o.value == value ? tokens.surfaceContainer : null,
                child: Text(
                  o.label,
                  style: WashTypography.body(
                    o.enabled ? tokens.onSurface : tokens.inkMuted,
                  ).copyWith(fontSize: 14),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

extension _FirstOrNull<E> on Iterable<E> {
  E? get firstOrNull {
    final i = iterator;
    if (!i.moveNext()) return null;
    return i.current;
  }
}
