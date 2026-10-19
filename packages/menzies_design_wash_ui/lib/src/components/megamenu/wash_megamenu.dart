import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../button/wash_button.dart';

/// daisyUI `megamenu-wide` / `megamenu-full`.
enum WashMegamenuVariant { wide, full }

/// One top-level megamenu trigger + its popover panel.
class WashMegamenuSection {
  const WashMegamenuSection({
    required this.label,
    required this.panel,
  });

  final String label;
  final Widget panel;
}

/// daisyUI `megamenu` bar with sliding active pill and expandable panels.
class WashMegamenu extends StatefulWidget {
  const WashMegamenu({
    required this.sections,
    this.variant = WashMegamenuVariant.wide,
    this.bordered = true,
    this.verticalOnNarrow = true,
    this.showMobileMenuButton = true,
    this.narrowBreakpoint = 640,
    this.hoverOpen = true,
    this.padding = const EdgeInsets.all(8),
    this.initiallyOpenIndex,
    super.key,
  });

  final List<WashMegamenuSection> sections;
  final WashMegamenuVariant variant;
  final bool bordered;
  final bool verticalOnNarrow;
  final bool showMobileMenuButton;
  final double narrowBreakpoint;
  final bool hoverOpen;
  final EdgeInsets padding;

  /// When set, opens that section on first build (gallery demos).
  final int? initiallyOpenIndex;

  @override
  State<WashMegamenu> createState() => _WashMegamenuState();
}

class _WashMegamenuState extends State<WashMegamenu> {
  final _barKey = GlobalKey();
  final List<GlobalKey> _triggerKeys = [];
  int? _openIndex;
  bool _mobileExpanded = false;
  Rect? _activeRect;
  bool _listening = false;

  @override
  void initState() {
    super.initState();
    _syncKeys();
    _openIndex = widget.initiallyOpenIndex;
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureActive());
  }

  @override
  void didUpdateWidget(covariant WashMegamenu oldWidget) {
    super.didUpdateWidget(oldWidget);
    _syncKeys();
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureActive());
  }

  void _syncKeys() {
    while (_triggerKeys.length < widget.sections.length) {
      _triggerKeys.add(GlobalKey());
    }
    if (_triggerKeys.length > widget.sections.length) {
      _triggerKeys.removeRange(widget.sections.length, _triggerKeys.length);
    }
  }

  bool _isNarrow(BuildContext context) =>
      MediaQuery.sizeOf(context).width < widget.narrowBreakpoint;

  void _setOpen(int? index) {
    setState(() => _openIndex = index);
    WidgetsBinding.instance.addPostFrameCallback((_) => _measureActive());
  }

  void _measureActive() {
    if (!mounted) return;
    final idx = _openIndex;
    if (idx == null || idx < 0 || idx >= _triggerKeys.length) {
      if (_activeRect != null) setState(() => _activeRect = null);
      return;
    }
    final barBox = _barKey.currentContext?.findRenderObject() as RenderBox?;
    final trigBox =
        _triggerKeys[idx].currentContext?.findRenderObject() as RenderBox?;
    if (barBox == null || trigBox == null || !barBox.hasSize || !trigBox.hasSize) {
      return;
    }
    final offset = trigBox.localToGlobal(Offset.zero, ancestor: barBox);
    final next = offset & trigBox.size;
    if (_activeRect != next) setState(() => _activeRect = next);
  }

  void _onKey(KeyEvent event) {
    if (event is KeyDownEvent &&
        event.logicalKey == LogicalKeyboardKey.escape &&
        _openIndex != null) {
      _setOpen(null);
    }
  }

  @override
  void dispose() {
    if (_listening) {
      HardwareKeyboard.instance.removeHandler(_onKeyHandler);
    }
    super.dispose();
  }

  bool _onKeyHandler(KeyEvent event) {
    _onKey(event);
    return false;
  }

  void _ensureKeyListener() {
    if (_listening) return;
    HardwareKeyboard.instance.addHandler(_onKeyHandler);
    _listening = true;
  }

  @override
  Widget build(BuildContext context) {
    _ensureKeyListener();
    final tokens = WashTokens.of(context);
    final narrow = _isNarrow(context);
    final vertical = widget.verticalOnNarrow && narrow;
    final showBar = !narrow || !widget.showMobileMenuButton || _mobileExpanded;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (widget.showMobileMenuButton && narrow)
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: WashButton(
                label: 'Menu',
                size: WashButtonSize.sm,
                variant: WashButtonVariant.defaultVariant,
                onPressed: () => setState(() {
                  _mobileExpanded = !_mobileExpanded;
                  if (!_mobileExpanded) _openIndex = null;
                }),
              ),
            ),
          ),
        if (showBar)
          Container(
            key: _barKey,
            width: widget.variant == WashMegamenuVariant.full
                ? null
                : double.infinity,
            padding: widget.padding,
            decoration: BoxDecoration(
              color: tokens.palette.base100.withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(tokens.radiusField + 2),
              border: widget.bordered
                  ? Border.all(color: tokens.palette.base300)
                  : null,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Stack(
                  clipBehavior: Clip.none,
                  children: [
                    if (_activeRect != null)
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 200),
                        curve: Curves.easeOut,
                        left: _activeRect!.left,
                        top: _activeRect!.top,
                        width: _activeRect!.width,
                        height: _activeRect!.height,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            color: tokens.onSurface.withValues(alpha: 0.08),
                            borderRadius:
                                BorderRadius.circular(tokens.radiusField),
                          ),
                        ),
                      ),
                    Flex(
                      direction: vertical ? Axis.vertical : Axis.horizontal,
                      crossAxisAlignment: vertical
                          ? CrossAxisAlignment.stretch
                          : CrossAxisAlignment.center,
                      children: [
                        for (var i = 0; i < widget.sections.length; i++)
                          _MegamenuTrigger(
                            key: _triggerKeys[i],
                            label: widget.sections[i].label,
                            selected: _openIndex == i,
                            hoverOpen: widget.hoverOpen && !narrow,
                            onTap: () =>
                                _setOpen(_openIndex == i ? null : i),
                            onHover: (v) {
                              if (!widget.hoverOpen || narrow) return;
                              if (v) _setOpen(i);
                            },
                          ),
                      ],
                    ),
                  ],
                ),
                if (_openIndex != null) ...[
                  const SizedBox(height: 8),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      color: tokens.palette.base100,
                      borderRadius: BorderRadius.circular(tokens.radiusBox),
                      border: Border.all(
                        color: tokens.inkBorder.withValues(alpha: 0.5),
                      ),
                      boxShadow: washPaperShadowSm(tokens),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: widget.sections[_openIndex!].panel,
                    ),
                  ),
                ],
              ],
            ),
          ),
      ],
    );
  }
}

class _MegamenuTrigger extends StatelessWidget {
  const _MegamenuTrigger({
    required this.label,
    required this.selected,
    required this.onTap,
    required this.onHover,
    required this.hoverOpen,
    super.key,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;
  final ValueChanged<bool> onHover;
  final bool hoverOpen;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final child = MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: hoverOpen ? (_) => onHover(true) : null,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                label,
                style: WashTypography.body(tokens.onSurface).copyWith(
                  fontSize: 14,
                  fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
                ),
              ),
              const SizedBox(width: 8),
              Transform.rotate(
                angle: selected ? 0.785 : -2.356, // chevron cue
                child: Container(
                  width: 6,
                  height: 6,
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: tokens.onSurface.withValues(alpha: 0.25),
                        width: 2,
                      ),
                      left: BorderSide(
                        color: tokens.onSurface.withValues(alpha: 0.25),
                        width: 2,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
    return child;
  }
}

/// Horizontal or stacked daisyUI `menu` columns inside a megamenu panel.
class WashMegamenuMenu extends StatelessWidget {
  const WashMegamenuMenu({
    required this.children,
    this.horizontal = true,
    this.stackOnNarrow = true,
    this.narrowBreakpoint = 640,
    super.key,
  });

  final List<Widget> children;
  final bool horizontal;
  final bool stackOnNarrow;
  final double narrowBreakpoint;

  @override
  Widget build(BuildContext context) {
    final narrow = MediaQuery.sizeOf(context).width < narrowBreakpoint;
    final useRow = horizontal && !(stackOnNarrow && narrow);
    if (!useRow) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) const SizedBox(height: 16),
            children[i],
          ],
        ],
      );
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0) const SizedBox(width: 24),
          Expanded(child: children[i]),
        ],
      ],
    );
  }
}

/// A titled column of links (`menu-title` + nested `ul`).
class WashMegamenuColumn extends StatelessWidget {
  const WashMegamenuColumn({
    required this.links,
    this.title,
    this.titleIsLink = false,
    super.key,
  });

  final String? title;
  final bool titleIsLink;
  final List<WashMegamenuLink> links;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (title != null) ...[
          if (titleIsLink)
            WashMegamenuLink(label: title!)
          else
            Padding(
              padding: const EdgeInsets.only(bottom: 6, left: 8, right: 8),
              child: Text(
                title!,
                style: WashTypography.label(tokens.inkMuted).copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
        for (final link in links) link,
      ],
    );
  }
}

/// A single megamenu / menu row link (optional Lucide icon).
class WashMegamenuLink extends StatelessWidget {
  const WashMegamenuLink({
    required this.label,
    this.icon,
    this.onPressed,
    super.key,
  });

  final String label;
  final String? icon;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onPressed ?? () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                WashLucideIcon(icon!, size: 16, strokeWidth: 2),
                const SizedBox(width: 8),
              ],
              Flexible(
                child: Text(
                  label,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Simple vertical list of links (Series / Guides / Desk panels).
class WashMegamenuLinkList extends StatelessWidget {
  const WashMegamenuLinkList(this.links, {super.key});

  final List<WashMegamenuLink> links;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: links,
    );
  }
}
