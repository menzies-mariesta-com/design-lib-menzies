import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `otp-xs` … `otp-xl`.
enum WashOtpSize { xs, sm, md, lg, xl }

/// daisyUI `otp-neutral` … `otp-error`.
enum WashOtpTone {
  defaultTone,
  neutral,
  primary,
  secondary,
  accent,
  info,
  success,
  warning,
  error,
}

class _OtpMetrics {
  const _OtpMetrics({
    required this.cellHeight,
    required this.cellWidth,
    required this.gap,
    required this.fontSize,
  });
  final double cellHeight;
  final double cellWidth;
  final double gap;
  final double fontSize;
}

_OtpMetrics _metrics(WashOtpSize size) {
  return switch (size) {
    WashOtpSize.xs => const _OtpMetrics(
        cellHeight: 28,
        cellWidth: 24,
        gap: 4,
        fontSize: 14,
      ),
    WashOtpSize.sm => const _OtpMetrics(
        cellHeight: 32,
        cellWidth: 28,
        gap: 5,
        fontSize: 16,
      ),
    WashOtpSize.md => const _OtpMetrics(
        cellHeight: 40,
        cellWidth: 32,
        gap: 6,
        fontSize: 20,
      ),
    WashOtpSize.lg => const _OtpMetrics(
        cellHeight: 48,
        cellWidth: 36,
        gap: 7,
        fontSize: 24,
      ),
    WashOtpSize.xl => const _OtpMetrics(
        cellHeight: 56,
        cellWidth: 40,
        gap: 8,
        fontSize: 28,
      ),
  };
}

Color _toneBorder(WashTokens tokens, WashOtpTone tone) {
  return switch (tone) {
    WashOtpTone.defaultTone => tokens.onSurface.withValues(alpha: 0.2),
    WashOtpTone.neutral => tokens.palette.neutral,
    WashOtpTone.primary => tokens.primary,
    WashOtpTone.secondary => tokens.palette.secondary,
    WashOtpTone.accent => tokens.palette.accent,
    WashOtpTone.info => tokens.palette.info,
    WashOtpTone.success => tokens.palette.success,
    WashOtpTone.warning => tokens.palette.warning,
    WashOtpTone.error => tokens.palette.error,
  };
}

/// daisyUI `otp` pin field: fixed digit cells driven by one numeric input.
class WashOtp extends StatefulWidget {
  const WashOtp({
    required this.digits,
    this.value,
    this.onChanged,
    this.onCompleted,
    this.size = WashOtpSize.md,
    this.tone = WashOtpTone.defaultTone,
    this.joined = false,
    this.enabled = true,
    this.autofocus = false,
    this.semanticLabel,
    this.controller,
    this.focusNode,
    super.key,
  }) : assert(digits >= 1 && digits <= 8);

  final int digits;
  final String? value;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onCompleted;
  final WashOtpSize size;
  final WashOtpTone tone;
  final bool joined;
  final bool enabled;
  final bool autofocus;
  final String? semanticLabel;
  final TextEditingController? controller;
  final FocusNode? focusNode;

  @override
  State<WashOtp> createState() => _WashOtpState();
}

class _WashOtpState extends State<WashOtp> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  var _ownsController = false;
  var _ownsFocus = false;
  var _wasComplete = false;

  String get _text => _sanitize(widget.value ?? _controller.text);

  String _sanitize(String raw) {
    final digitsOnly = raw.replaceAll(RegExp(r'\D'), '');
    if (digitsOnly.length <= widget.digits) return digitsOnly;
    return digitsOnly.substring(0, widget.digits);
  }

  @override
  void initState() {
    super.initState();
    _ownsController = widget.controller == null;
    _controller =
        widget.controller ?? TextEditingController(text: widget.value ?? '');
    _ownsFocus = widget.focusNode == null;
    _focusNode = widget.focusNode ?? FocusNode();
    _controller.addListener(_onControllerTick);
    _focusNode.addListener(_onFocusTick);
    _wasComplete = _sanitize(_controller.text).length == widget.digits;
    if (widget.autofocus) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) _focusNode.requestFocus();
      });
    }
  }

  void _onFocusTick() {
    if (mounted) setState(() {});
  }

  @override
  void didUpdateWidget(covariant WashOtp oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.controller != oldWidget.controller) {
      _controller.removeListener(_onControllerTick);
      if (_ownsController) _controller.dispose();
      _ownsController = widget.controller == null;
      _controller =
          widget.controller ?? TextEditingController(text: widget.value ?? '');
      _controller.addListener(_onControllerTick);
    }
    if (widget.value != null && widget.value != _controller.text) {
      final next = _sanitize(widget.value!);
      if (_controller.text != next) {
        _controller.value = TextEditingValue(
          text: next,
          selection: TextSelection.collapsed(offset: next.length),
        );
      }
    }
    if (widget.focusNode != oldWidget.focusNode) {
      _focusNode.removeListener(_onFocusTick);
      if (_ownsFocus) _focusNode.dispose();
      _ownsFocus = widget.focusNode == null;
      _focusNode = widget.focusNode ?? FocusNode();
      _focusNode.addListener(_onFocusTick);
    }
  }

  void _onControllerTick() {
    final next = _sanitize(_controller.text);
    if (_controller.text != next) {
      _controller.value = TextEditingValue(
        text: next,
        selection: TextSelection.collapsed(offset: next.length),
      );
      return;
    }
    widget.onChanged?.call(next);
    final complete = next.length == widget.digits;
    if (complete && !_wasComplete) widget.onCompleted?.call(next);
    _wasComplete = complete;
    setState(() {});
  }

  @override
  void dispose() {
    _controller.removeListener(_onControllerTick);
    _focusNode.removeListener(_onFocusTick);
    if (_ownsController) _controller.dispose();
    if (_ownsFocus) _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final m = _metrics(widget.size);
    final border = _toneBorder(tokens, widget.tone);
    final gap = widget.joined ? 0.0 : m.gap;
    final text = _text;
    final activeIndex = text.length.clamp(0, widget.digits - 1);
    final focused = _focusNode.hasFocus;

    final outline = focused ? tokens.primary : border;
    final outlineWidth = focused ? 2.0 : 1.0;

    final Widget boxes;
    if (widget.joined) {
      boxes = DecoratedBox(
        decoration: BoxDecoration(
          color: tokens.palette.base100,
          borderRadius: BorderRadius.circular(tokens.radiusField),
          border: Border.all(color: outline, width: outlineWidth),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < widget.digits; i++) ...[
              if (i > 0)
                Container(
                  width: 1,
                  height: m.cellHeight,
                  color: outline.withValues(alpha: 0.85),
                ),
              _OtpCell(
                digit: i < text.length ? text[i] : null,
                height: m.cellHeight,
                width: m.cellWidth,
                fontSize: m.fontSize,
                borderColor: border,
                active: focused &&
                    ((text.length < widget.digits && i == activeIndex) ||
                        (text.length == widget.digits &&
                            i == widget.digits - 1)),
                joined: true,
                tokens: tokens,
              ),
            ],
          ],
        ),
      );
    } else {
      boxes = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < widget.digits; i++) ...[
            if (i > 0) SizedBox(width: gap),
            _OtpCell(
              digit: i < text.length ? text[i] : null,
              height: m.cellHeight,
              width: m.cellWidth,
              fontSize: m.fontSize,
              borderColor: border,
              active: focused &&
                  ((text.length < widget.digits && i == activeIndex) ||
                      (text.length == widget.digits && i == widget.digits - 1)),
              joined: false,
              tokens: tokens,
            ),
          ],
        ],
      );
    }

    return MouseRegion(
      cursor: widget.enabled
          ? SystemMouseCursors.text
          : SystemMouseCursors.forbidden,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: widget.enabled ? () => _focusNode.requestFocus() : null,
        child: Semantics(
          textField: true,
          enabled: widget.enabled,
          label: widget.semanticLabel ?? 'One-time code',
          value: text,
          child: Stack(
            alignment: Alignment.centerLeft,
            children: [
              boxes,
              Positioned.fill(
                child: Opacity(
                  opacity: 0,
                  child: EditableText(
                    controller: _controller,
                    focusNode: _focusNode,
                    style:
                        const TextStyle(color: Color(0x00000000), fontSize: 1),
                    cursorColor: const Color(0x00000000),
                    backgroundCursorColor: const Color(0x00000000),
                    keyboardType: TextInputType.number,
                    autofillHints: const [AutofillHints.oneTimeCode],
                    inputFormatters: [
                      FilteringTextInputFormatter.digitsOnly,
                      LengthLimitingTextInputFormatter(widget.digits),
                    ],
                    onChanged: (_) {},
                    readOnly: !widget.enabled,
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

class _OtpCell extends StatelessWidget {
  const _OtpCell({
    required this.digit,
    required this.height,
    required this.width,
    required this.fontSize,
    required this.borderColor,
    required this.active,
    required this.joined,
    required this.tokens,
  });

  final String? digit;
  final double height;
  final double width;
  final double fontSize;
  final Color borderColor;
  final bool active;
  final bool joined;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    final radius = tokens.radiusField;
    final digitText = Text(
      digit ?? '',
      style: WashTypography.body(tokens.onSurface).copyWith(
        fontSize: fontSize,
        fontWeight: FontWeight.w600,
        fontFamily: 'monospace',
        height: 1,
      ),
    );

    if (joined) {
      return SizedBox(
        width: width,
        height: height,
        child: ColoredBox(
          color: active
              ? tokens.primary.withValues(alpha: 0.06)
              : const Color(0x00000000),
          child: Center(child: digitText),
        ),
      );
    }

    return AnimatedContainer(
      duration: const Duration(milliseconds: 150),
      width: width,
      height: height,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(
          color: active ? tokens.primary : borderColor,
          width: active ? 2 : 1,
        ),
      ),
      child: digitText,
    );
  }
}

/// Compatibility wrapper used by templates (`length` + `onCompleted`).
class WashOtpField extends StatelessWidget {
  const WashOtpField({
    required this.length,
    this.onCompleted,
    this.onChanged,
    this.value,
    this.size = WashOtpSize.md,
    this.tone = WashOtpTone.defaultTone,
    this.joined = false,
    this.semanticLabel,
    super.key,
  });

  final int length;
  final ValueChanged<String>? onCompleted;
  final ValueChanged<String>? onChanged;
  final String? value;
  final WashOtpSize size;
  final WashOtpTone tone;
  final bool joined;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return WashOtp(
      digits: length,
      value: value,
      onChanged: onChanged,
      onCompleted: onCompleted,
      size: size,
      tone: tone,
      joined: joined,
      semanticLabel: semanticLabel,
    );
  }
}
