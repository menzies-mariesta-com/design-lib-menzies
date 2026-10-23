import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../foundation/wash_ripple.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

enum WashCollapseIndicator { none, arrow, plus }

enum WashCollapseForce { none, open, closed }

/// Single daisyUI-style collapse panel (checkbox or standalone).
class WashCollapse extends StatefulWidget {
  const WashCollapse({
    required this.title,
    required this.content,
    this.open,
    this.initiallyOpen = false,
    this.onOpenChanged,
    this.indicator = WashCollapseIndicator.arrow,
    this.force = WashCollapseForce.none,
    this.bordered = true,
    this.backgroundColor,
    this.foregroundColor,
    this.titleBackgroundColor,
    this.contentBackgroundColor,
    this.iconOnStart = false,
    this.focusDriven = false,
    this.onFocusChange,
    super.key,
  });

  final Widget title;
  final Widget content;
  final bool? open;
  final bool initiallyOpen;
  final ValueChanged<bool>? onOpenChanged;
  final WashCollapseIndicator indicator;
  final WashCollapseForce force;
  final bool bordered;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? titleBackgroundColor;
  final Color? contentBackgroundColor;
  final bool iconOnStart;
  final bool focusDriven;
  final ValueChanged<bool>? onFocusChange;

  @override
  State<WashCollapse> createState() => _WashCollapseState();
}

class _WashCollapseState extends State<WashCollapse> {
  late bool _internalOpen;
  final _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _internalOpen = widget.initiallyOpen;
  }

  bool get _open {
    switch (widget.force) {
      case WashCollapseForce.open:
        return true;
      case WashCollapseForce.closed:
        return false;
      case WashCollapseForce.none:
        return widget.open ?? _internalOpen;
    }
  }

  void _setOpen(bool value) {
    if (widget.force != WashCollapseForce.none) return;
    if (widget.open == null) {
      setState(() => _internalOpen = value);
    }
    widget.onOpenChanged?.call(value);
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final bg = widget.backgroundColor ?? tokens.palette.base100;
    final fg = widget.foregroundColor ?? tokens.onSurface;
    final borderColor = tokens.palette.base300;
    final open = _open;

    final titleBg = widget.titleBackgroundColor;
    final contentBg = widget.contentBackgroundColor ?? titleBg;

    Widget titleRow = DefaultTextStyle(
      style: WashTypography.body(fg).copyWith(fontWeight: FontWeight.w600),
      child: widget.title,
    );

    if (widget.indicator != WashCollapseIndicator.none) {
      final icon = widget.indicator == WashCollapseIndicator.plus
          ? (open
              ? const Text('−', style: TextStyle(fontSize: 18))
              : const Text('+', style: TextStyle(fontSize: 18)))
          : WashIcon(
              open ? WashIconGlyph.chevronDown : WashIconGlyph.chevronRight,
              size: 18,
              color: fg,
            );
      titleRow = Row(
        children: widget.iconOnStart
            ? [
                icon,
                const SizedBox(width: 12),
                Expanded(child: titleRow),
              ]
            : [
                Expanded(child: titleRow),
                const SizedBox(width: 8),
                icon,
              ],
      );
    }

    final decoration = widget.bordered
        ? BoxDecoration(
            color: bg,
            border: Border.all(color: borderColor),
            borderRadius: BorderRadius.circular(tokens.radiusBox),
          )
        : BoxDecoration(color: bg);

    Widget panel = DecoratedBox(
      decoration: decoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          WashRipple(
            onTap: widget.focusDriven
                ? null
                : widget.force == WashCollapseForce.none
                    ? () => _setOpen(!open)
                    : null,
            borderRadius: tokens.radiusBox,
            child: Container(
              color: titleBg,
              padding: EdgeInsets.fromLTRB(
                widget.iconOnStart ? 20 : 16,
                14,
                16,
                14,
              ),
              child: titleRow,
            ),
          ),
          ClipRect(
            child: AnimatedAlign(
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOut,
              heightFactor: open ? 1 : 0,
              alignment: Alignment.topCenter,
              child: Container(
                color: contentBg,
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                child: DefaultTextStyle(
                  style: WashTypography.body(fg).copyWith(fontSize: 14),
                  child: widget.content,
                ),
              ),
            ),
          ),
        ],
      ),
    );

    if (widget.focusDriven && widget.force == WashCollapseForce.none) {
      panel = Focus(
        focusNode: _focusNode,
        onFocusChange: (hasFocus) {
          widget.onFocusChange?.call(hasFocus);
          _setOpen(hasFocus);
        },
        child: panel,
      );
    }

    return panel;
  }
}

/// Radio-style accordion: only one panel open at a time.
class WashAccordion extends StatefulWidget {
  const WashAccordion({
    required this.items,
    this.initialIndex = 0,
    this.indicator = WashCollapseIndicator.arrow,
    this.joined = false,
    super.key,
  });

  final List<(Widget title, Widget content)> items;
  final int initialIndex;
  final WashCollapseIndicator indicator;
  final bool joined;

  @override
  State<WashAccordion> createState() => _WashAccordionState();
}

class _WashAccordionState extends State<WashAccordion> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.initialIndex.clamp(0, widget.items.length - 1);
  }

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    for (var i = 0; i < widget.items.length; i++) {
      final (title, content) = widget.items[i];
      final item = WashCollapse(
        title: title,
        content: content,
        open: _index == i,
        indicator: widget.indicator,
        onOpenChanged: (open) {
          if (open) setState(() => _index = i);
        },
      );
      children.add(
        widget.joined
            ? _JoinItem(
                first: i == 0, last: i == widget.items.length - 1,
                child: item)
            : item,
      );
      if (!widget.joined && i < widget.items.length - 1) {
        children.add(const SizedBox(height: 0));
      }
    }

    if (widget.joined) {
      return WashCollapseJoin.vertical(children: children);
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: children,
    );
  }
}

/// Independent checkbox collapses (multiple open).
class WashCollapseCheckboxGroup extends StatelessWidget {
  const WashCollapseCheckboxGroup({
    required this.items,
    this.initialOpen = const {0},
    this.indicator = WashCollapseIndicator.arrow,
    this.spacing = 8,
    super.key,
  });

  final List<(Widget title, Widget content)> items;
  final Set<int> initialOpen;
  final WashCollapseIndicator indicator;
  final double spacing;

  @override
  Widget build(BuildContext context) {
    return _WashCollapseCheckboxGroupBody(
      items: items,
      initialOpen: initialOpen,
      indicator: indicator,
      spacing: spacing,
    );
  }
}

class _WashCollapseCheckboxGroupBody extends StatefulWidget {
  const _WashCollapseCheckboxGroupBody({
    required this.items,
    required this.initialOpen,
    required this.indicator,
    required this.spacing,
  });

  final List<(Widget title, Widget content)> items;
  final Set<int> initialOpen;
  final WashCollapseIndicator indicator;
  final double spacing;

  @override
  State<_WashCollapseCheckboxGroupBody> createState() =>
      _WashCollapseCheckboxGroupBodyState();
}

class _WashCollapseCheckboxGroupBodyState
    extends State<_WashCollapseCheckboxGroupBody> {
  late final Set<int> _open = Set<int>.from(widget.initialOpen);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < widget.items.length; i++) ...[
          if (i > 0) SizedBox(height: widget.spacing),
          WashCollapse(
            title: widget.items[i].$1,
            content: widget.items[i].$2,
            open: _open.contains(i),
            indicator: widget.indicator,
            onOpenChanged: (v) {
              setState(() {
                if (v) {
                  _open.add(i);
                } else {
                  _open.remove(i);
                }
              });
            },
          ),
        ],
      ],
    );
  }
}

/// Semantic color accordion row (radio).
class WashAccordionColorGroup extends StatefulWidget {
  const WashAccordionColorGroup({
    required this.panels,
    this.initialIndex = 0,
    super.key,
  });

  final List<WashAccordionColorPanel> panels;
  final int initialIndex;

  @override
  State<WashAccordionColorGroup> createState() =>
      _WashAccordionColorGroupState();
}

class WashAccordionColorPanel {
  const WashAccordionColorPanel({
    required this.title,
    required this.content,
    required this.background,
    required this.foreground,
  });

  final String title;
  final String content;
  final Color background;
  final Color foreground;
}

class _WashAccordionColorGroupState extends State<WashAccordionColorGroup> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        for (var i = 0; i < widget.panels.length; i++)
          SizedBox(
            width: 280,
            child: WashCollapse(
              title: Text(widget.panels[i].title),
              content: Text(widget.panels[i].content),
              open: _index == i,
              indicator: WashCollapseIndicator.arrow,
              bordered: false,
              backgroundColor: widget.panels[i].background,
              foregroundColor: widget.panels[i].foreground,
              onOpenChanged: (o) {
                if (o) setState(() => _index = i);
              },
            ),
          ),
      ],
    );
  }
}

/// Peer-checked color shift (info → success when open).
/// Single-panel details/summary-style collapse (tap title to toggle).
class WashCollapseDetails extends StatelessWidget {
  const WashCollapseDetails({
    required this.title,
    required this.content,
    this.initiallyOpen = false,
    this.indicator = WashCollapseIndicator.none,
    super.key,
  });

  final Widget title;
  final Widget content;
  final bool initiallyOpen;
  final WashCollapseIndicator indicator;

  @override
  Widget build(BuildContext context) {
    return WashCollapse(
      title: title,
      content: content,
      initiallyOpen: initiallyOpen,
      indicator: indicator,
    );
  }
}

/// Checkbox collapse that dismisses when tapping outside the panel bounds.
class WashCollapseOutsideDismiss extends StatefulWidget {
  const WashCollapseOutsideDismiss({
    required this.title,
    required this.content,
    super.key,
  });

  final Widget title;
  final Widget content;

  @override
  State<WashCollapseOutsideDismiss> createState() =>
      _WashCollapseOutsideDismissState();
}

class _WashCollapseOutsideDismissState
    extends State<WashCollapseOutsideDismiss> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return SizedBox(
          width: constraints.maxWidth,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              if (_open)
                Positioned(
                  left: -800,
                  right: -800,
                  top: -800,
                  bottom: -800,
                  child: GestureDetector(
                    onTap: () => setState(() => _open = false),
                    behavior: HitTestBehavior.translucent,
                  ),
                ),
              WashCollapse(
                title: widget.title,
                content: widget.content,
                open: _open,
                indicator: WashCollapseIndicator.none,
                onOpenChanged: (v) => setState(() => _open = v),
              ),
            ],
          ),
        );
      },
    );
  }
}

/// Primary at rest, secondary when the focus-driven panel is focused.
class WashCollapseFocusColorShift extends StatefulWidget {
  const WashCollapseFocusColorShift({super.key});

  @override
  State<WashCollapseFocusColorShift> createState() =>
      _WashCollapseFocusColorShiftState();
}

class _WashCollapseFocusColorShiftState
    extends State<WashCollapseFocusColorShift> {
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    final p = WashTokens.of(context).palette;
    final bg = _focused ? p.secondary : p.primary;
    final fg = _focused ? p.secondaryContent : p.primaryContent;
    return WashCollapse(
      focusDriven: true,
      bordered: false,
      backgroundColor: bg,
      foregroundColor: fg,
      titleBackgroundColor: bg,
      contentBackgroundColor: bg,
      indicator: WashCollapseIndicator.none,
      onFocusChange: (v) => setState(() => _focused = v),
      title: const Text('Focus color shift'),
      content: const Text('Primary at rest, secondary when focused.'),
    );
  }
}

/// Joined vertical stack of independent checkbox collapses.
class WashCollapseJoinCheckboxGroup extends StatelessWidget {
  const WashCollapseJoinCheckboxGroup({
    required this.items,
    this.initialOpen = const {0},
    this.indicator = WashCollapseIndicator.arrow,
    super.key,
  });

  final List<(Widget title, Widget content)> items;
  final Set<int> initialOpen;
  final WashCollapseIndicator indicator;

  @override
  Widget build(BuildContext context) {
    return _WashCollapseJoinCheckboxGroupBody(
      items: items,
      initialOpen: initialOpen,
      indicator: indicator,
    );
  }
}

class _WashCollapseJoinCheckboxGroupBody extends StatefulWidget {
  const _WashCollapseJoinCheckboxGroupBody({
    required this.items,
    required this.initialOpen,
    required this.indicator,
  });

  final List<(Widget title, Widget content)> items;
  final Set<int> initialOpen;
  final WashCollapseIndicator indicator;

  @override
  State<_WashCollapseJoinCheckboxGroupBody> createState() =>
      _WashCollapseJoinCheckboxGroupBodyState();
}

class _WashCollapseJoinCheckboxGroupBodyState
    extends State<_WashCollapseJoinCheckboxGroupBody> {
  late final Set<int> _open = Set<int>.from(widget.initialOpen);

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    for (var i = 0; i < widget.items.length; i++) {
      final (title, content) = widget.items[i];
      children.add(
        _JoinItem(
          first: i == 0,
          last: i == widget.items.length - 1,
          child: WashCollapse(
            title: title,
            content: content,
            open: _open.contains(i),
            indicator: widget.indicator,
            bordered: false,
            onOpenChanged: (v) {
              setState(() {
                if (v) {
                  _open.add(i);
                } else {
                  _open.remove(i);
                }
              });
            },
          ),
        ),
      );
    }
    return WashCollapseJoin.vertical(children: children);
  }
}

class WashCollapsePeerShift extends StatefulWidget {
  const WashCollapsePeerShift({super.key});

  @override
  State<WashCollapsePeerShift> createState() => _WashCollapsePeerShiftState();
}

class _WashCollapsePeerShiftState extends State<WashCollapsePeerShift> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final p = tokens.palette;
    final bg = _open ? p.success : p.info;
    final fg = _open ? p.successContent : p.infoContent;
    return SizedBox(
      width: 280,
      child: WashCollapse(
        title: const Text('Peer color shift'),
        content: const Text(
          'Title and content flip from info to success when checked.',
        ),
        open: _open,
        bordered: true,
        backgroundColor: tokens.palette.base100,
        titleBackgroundColor: bg,
        contentBackgroundColor: bg,
        foregroundColor: fg,
        indicator: WashCollapseIndicator.none,
        onOpenChanged: (v) => setState(() => _open = v),
      ),
    );
  }
}

class WashCollapseJoin extends StatelessWidget {
  const WashCollapseJoin.vertical({required this.children, super.key});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: children,
      ),
    );
  }
}

class _JoinItem extends StatelessWidget {
  const _JoinItem(
      {required this.child, required this.first, required this.last});

  final Widget child;
  final bool first;
  final bool last;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border(
          top: first
              ? BorderSide.none
              : BorderSide(color: tokens.palette.base300),
          left: BorderSide(color: tokens.palette.base300),
          right: BorderSide(color: tokens.palette.base300),
          bottom: BorderSide(color: tokens.palette.base300),
        ),
        borderRadius: BorderRadius.vertical(
          top: first ? const Radius.circular(12) : Radius.zero,
          bottom: last ? const Radius.circular(12) : Radius.zero,
        ),
      ),
      child: child,
    );
  }
}

/// Exclusive-open group mimicking HTML details[name].
class WashCollapseDetailsGroup extends StatefulWidget {
  const WashCollapseDetailsGroup({
    required this.items,
    this.initialIndex = 0,
    super.key,
  });

  final List<(String title, String body)> items;
  final int initialIndex;

  @override
  State<WashCollapseDetailsGroup> createState() =>
      _WashCollapseDetailsGroupState();
}

class _WashCollapseDetailsGroupState extends State<WashCollapseDetailsGroup> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return WashAccordion(
      items: widget.items.map((e) => (Text(e.$1), Text(e.$2))).toList(),
      initialIndex: _index,
      indicator: WashCollapseIndicator.none,
    );
  }
}
