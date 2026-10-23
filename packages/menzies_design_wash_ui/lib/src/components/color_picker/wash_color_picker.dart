import 'dart:async';
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../foundation/reduced_motion.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_color_math.dart';

class _WheelMetrics {
  const _WheelMetrics({
    required this.ringWidth,
    required this.outerRadius,
    required this.innerRadius,
    required this.slSize,
  });

  final double ringWidth;
  final double outerRadius;
  final double innerRadius;
  final int slSize;
}

_WheelMetrics _wheelMetrics(double size) {
  final ringWidth = math.max(10, (size * 0.12).round());
  final outerRadius = size / 2 - 2;
  final innerRadius = outerRadius - ringWidth;
  final slSize = (innerRadius * 1.65).round();
  return _WheelMetrics(
    ringWidth: ringWidth.toDouble(),
    outerRadius: outerRadius,
    innerRadius: innerRadius,
    slSize: slSize,
  );
}

Future<ui.Image> _rasterHueWheel(int size, _WheelMetrics metrics) {
  final center = size / 2;
  final outerSq = metrics.outerRadius * metrics.outerRadius;
  final innerSq = metrics.innerRadius * metrics.innerRadius;
  final bytes = Uint8List(size * size * 4);

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final dx = x - center + 0.5;
      final dy = y - center + 0.5;
      final distSq = dx * dx + dy * dy;
      final index = (y * size + x) * 4;
      if (distSq > outerSq || distSq < innerSq) {
        bytes[index + 3] = 0;
        continue;
      }
      final angle = math.atan2(dy, dx) * 180 / math.pi;
      final hue = (angle + 360) % 360;
      final rgb = washHslToRgb(hue, 100, 50);
      bytes[index] = rgb.r.round().clamp(0, 255);
      bytes[index + 1] = rgb.g.round().clamp(0, 255);
      bytes[index + 2] = rgb.b.round().clamp(0, 255);
      bytes[index + 3] = 255;
    }
  }

  final completer = Completer<ui.Image>();
  ui.decodeImageFromPixels(
    bytes,
    size,
    size,
    ui.PixelFormat.rgba8888,
    completer.complete,
  );
  return completer.future;
}

Future<ui.Image> _rasterSlSquare(int size, double hue) {
  final bytes = Uint8List(size * size * 4);
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final s = (x / (size - 1)) * 100;
      final l = 100 - (y / (size - 1)) * 100;
      final rgb = washHslToRgb(hue, s, l);
      final index = (y * size + x) * 4;
      bytes[index] = rgb.r.round().clamp(0, 255);
      bytes[index + 1] = rgb.g.round().clamp(0, 255);
      bytes[index + 2] = rgb.b.round().clamp(0, 255);
      bytes[index + 3] = 255;
    }
  }

  final completer = Completer<ui.Image>();
  ui.decodeImageFromPixels(
    bytes,
    size,
    size,
    ui.PixelFormat.rgba8888,
    completer.complete,
  );
  return completer.future;
}

double? _pointerHue(
  double localX,
  double localY,
  double width,
  double height,
  _WheelMetrics metrics,
) {
  final centerX = width / 2;
  final centerY = height / 2;
  final x = localX - centerX;
  final y = localY - centerY;
  final dist = math.sqrt(x * x + y * y);
  if (dist < metrics.innerRadius || dist > metrics.outerRadius) return null;
  return math.atan2(y, x) * 180 / math.pi;
}

({double s, double l}) _pointerSl(
    double localX, double localY, double width, double height) {
  final x = washClamp(localX, 0, width);
  final y = washClamp(localY, 0, height);
  return (
    s: (x / width) * 100,
    l: 100 - (y / height) * 100,
  );
}

/// Canvas hue ring and saturation/lightness square (parity with web `ColorPickerWheel`).
class WashColorPicker extends StatefulWidget {
  const WashColorPicker({
    required this.value,
    required this.onChanged,
    this.disabled = false,
    this.size = 200,
    this.showHexInput = false,
    this.showSwatch = true,
    this.ariaLabel = 'Color picker',
    super.key,
  });

  final String value;
  final ValueChanged<String> onChanged;
  final bool disabled;
  final double size;
  final bool showHexInput;
  final bool showSwatch;
  final String ariaLabel;

  @override
  State<WashColorPicker> createState() => _WashColorPickerState();
}

class _WashColorPickerState extends State<WashColorPicker> {
  ui.Image? _hueImage;
  ui.Image? _slImage;
  String? _dragTarget;
  late TextEditingController _hexController;
  late FocusNode _hexFocus;
  late FocusNode _wheelFocus;

  @override
  void initState() {
    super.initState();
    final normalized = washNormalizeHex(widget.value) ?? '#888888';
    _hexController = TextEditingController(text: normalized);
    _hexFocus = FocusNode();
    _wheelFocus = FocusNode();
    _loadImages();
  }

  @override
  void didUpdateWidget(covariant WashColorPicker oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.size != widget.size) {
      _loadImages();
    } else if (oldWidget.value != widget.value) {
      final oldHue = washHexToHsl(washNormalizeHex(oldWidget.value) ?? '')?.h;
      if (oldHue != _hsl.h) _loadSlImage(_hsl.h);
    }
    final normalized = washNormalizeHex(widget.value) ?? '#888888';
    if (washNormalizeHex(_hexController.text) != normalized &&
        !_hexFocus.hasFocus) {
      _hexController.text = normalized;
    }
  }

  @override
  void dispose() {
    _hueImage?.dispose();
    _slImage?.dispose();
    _hexController.dispose();
    _hexFocus.dispose();
    _wheelFocus.dispose();
    super.dispose();
  }

  WashHsl get _hsl {
    final normalized = washNormalizeHex(widget.value) ?? '#888888';
    return washHexToHsl(normalized) ?? const WashHsl(0, 50, 50);
  }

  String get _normalizedValue => washNormalizeHex(widget.value) ?? '#888888';

  _WheelMetrics get _metrics => _wheelMetrics(widget.size);

  Future<void> _loadImages() async {
    final pixelSize = widget.size.round();
    final hue = await _rasterHueWheel(pixelSize, _metrics);
    if (!mounted) {
      hue.dispose();
      return;
    }
    _hueImage?.dispose();
    _hueImage = hue;
    await _loadSlImage(_hsl.h);
    if (mounted) setState(() {});
  }

  Future<void> _loadSlImage(double hue) async {
    final sl = await _rasterSlSquare(_metrics.slSize, hue);
    if (!mounted) {
      sl.dispose();
      return;
    }
    _slImage?.dispose();
    _slImage = sl;
    if (mounted) setState(() {});
  }

  void _emitHsl({double? h, double? s, double? l}) {
    if (widget.disabled) return;
    final current = _hsl;
    final hex = washHslToHex(
      h ?? current.h,
      s ?? current.s,
      l ?? current.l,
    );
    widget.onChanged(hex);
    if (h != null && h != current.h) {
      _loadSlImage(h);
    }
  }

  void _handleWheelPointer(Offset local, double w, double h) {
    final hue = _pointerHue(local.dx, local.dy, w, h, _metrics);
    if (hue == null) return;
    _emitHsl(h: (hue + 360) % 360);
  }

  void _handleSlPointer(Offset local, double w, double h) {
    final sl = _pointerSl(local.dx, local.dy, w, h);
    _emitHsl(s: sl.s, l: sl.l);
  }

  KeyEventResult _onKey(FocusNode node, KeyEvent event) {
    if (widget.disabled || event is! KeyDownEvent) {
      return KeyEventResult.ignored;
    }
    final hsl = _hsl;
    final step = HardwareKeyboard.instance.isShiftPressed ? 5.0 : 1.0;
    var handled = true;
    if (event.logicalKey == LogicalKeyboardKey.arrowLeft) {
      _emitHsl(s: washClamp(hsl.s - step, 0, 100));
    } else if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
      _emitHsl(s: washClamp(hsl.s + step, 0, 100));
    } else if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
      _emitHsl(l: washClamp(hsl.l + step, 0, 100));
    } else if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
      _emitHsl(l: washClamp(hsl.l - step, 0, 100));
    } else if (event.logicalKey == LogicalKeyboardKey.pageUp) {
      _emitHsl(h: (hsl.h + 15) % 360);
    } else if (event.logicalKey == LogicalKeyboardKey.pageDown) {
      _emitHsl(h: (hsl.h + 345) % 360);
    } else {
      handled = false;
    }
    return handled ? KeyEventResult.handled : KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final hsl = _hsl;
    final metrics = _metrics;
    final reducedMotion = WashReducedMotion.of(context);
    final size = widget.size;
    final slSize = metrics.slSize.toDouble();

    final hueAngle = hsl.h * math.pi / 180;
    final hueMarkerRadius = (metrics.innerRadius + metrics.outerRadius) / 2;
    final hueMarkerX = size / 2 + math.cos(hueAngle) * hueMarkerRadius;
    final hueMarkerY = size / 2 + math.sin(hueAngle) * hueMarkerRadius;
    final slMarkerX = (hsl.s / 100) * slSize;
    final slMarkerY = (1 - hsl.l / 100) * slSize;

    final markerDuration =
        reducedMotion ? Duration.zero : const Duration(milliseconds: 75);

    return Opacity(
      opacity: widget.disabled ? 0.6 : 1,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Focus(
            focusNode: _wheelFocus,
            onKeyEvent: _onKey,
            skipTraversal: widget.disabled,
            child: SizedBox(
              width: size,
              height: size,
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Positioned.fill(
                    child: _RasterSurface(
                      image: _hueImage,
                      borderRadius: BorderRadius.circular(size / 2),
                      borderColor: tokens.inkBorder.withValues(alpha: 0.7),
                      backgroundColor: tokens.surface,
                      cursor: widget.disabled
                          ? SystemMouseCursors.forbidden
                          : SystemMouseCursors.click,
                      onPointerDown: widget.disabled
                          ? null
                          : (e, size) {
                              _dragTarget = 'hue';
                              _handleWheelPointer(
                                  e.localPosition, size.width, size.height);
                            },
                      onPointerMove: widget.disabled
                          ? null
                          : (e, size) {
                              if (_dragTarget == 'hue') {
                                _handleWheelPointer(
                                    e.localPosition, size.width, size.height);
                              }
                            },
                      onPointerUp: (_) => _dragTarget = null,
                      onPointerCancel: (_) => _dragTarget = null,
                    ),
                  ),
                  Positioned(
                    left: (size - slSize) / 2,
                    top: (size - slSize) / 2,
                    width: slSize,
                    height: slSize,
                    child: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        _RasterSurface(
                          image: _slImage,
                          borderRadius: BorderRadius.circular(12),
                          borderColor: tokens.inkBorder.withValues(alpha: 0.8),
                          innerShadow: true,
                          cursor: widget.disabled
                              ? SystemMouseCursors.forbidden
                              : SystemMouseCursors.click,
                          onPointerDown: widget.disabled
                              ? null
                              : (e, box) {
                                  _dragTarget = 'sl';
                                  _handleSlPointer(
                                      e.localPosition, box.width, box.height);
                                },
                          onPointerMove: widget.disabled
                              ? null
                              : (e, box) {
                                  if (_dragTarget == 'sl') {
                                    _handleSlPointer(
                                        e.localPosition, box.width, box.height);
                                  }
                                },
                          onPointerUp: (_) => _dragTarget = null,
                          onPointerCancel: (_) => _dragTarget = null,
                        ),
                        AnimatedPositioned(
                          duration: markerDuration,
                          left: slMarkerX - 6,
                          top: slMarkerY - 6,
                          child: IgnorePointer(
                            child: Container(
                              width: 12,
                              height: 12,
                              decoration: BoxDecoration(
                                color: _colorFromHex(_normalizedValue),
                                shape: BoxShape.circle,
                                border:
                                    Border.all(color: tokens.surface, width: 2),
                                boxShadow: washPaperShadowSm(tokens),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  AnimatedPositioned(
                    duration: markerDuration,
                    left: hueMarkerX - 7,
                    top: hueMarkerY - 7,
                    child: IgnorePointer(
                      child: Container(
                        width: 14,
                        height: 14,
                        decoration: BoxDecoration(
                          color: _colorFromHex(washHslToHex(hsl.h, 100, 50)),
                          shape: BoxShape.circle,
                          border: Border.all(color: tokens.surface, width: 2),
                          boxShadow: washPaperShadowSm(tokens),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (widget.showSwatch || widget.showHexInput) ...[
            const SizedBox(height: 8),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 320),
              child: Row(
                children: [
                  if (widget.showSwatch) ...[
                    Container(
                      width: 36,
                      height: 36,
                      decoration: washInkBorderBox(tokens,
                          fill: _colorFromHex(_normalizedValue), radius: 12),
                    ),
                    if (widget.showHexInput) const SizedBox(width: 8),
                  ],
                  if (widget.showHexInput)
                    Expanded(
                      child: Semantics(
                        label: 'Hex color value',
                        textField: true,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 6),
                          decoration: washInkBorderBox(tokens, radius: 8),
                          child: EditableText(
                            controller: _hexController,
                            focusNode: _hexFocus,
                            style:
                                WashTypography.body(tokens.onSurface).copyWith(
                              fontFamily: 'monospace',
                              fontSize: 13,
                            ),
                            cursorColor: tokens.primary,
                            backgroundCursorColor: tokens.inkMuted,
                            readOnly: widget.disabled,
                            onChanged: (next) {
                              final normalized = washNormalizeHex(next);
                              if (normalized != null) {
                                widget.onChanged(normalized);
                              }
                            },
                            onSubmitted: (_) => _commitHex(),
                            onEditingComplete: _commitHex,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  void _commitHex() {
    final normalized = washNormalizeHex(_hexController.text);
    if (normalized != null) {
      widget.onChanged(normalized);
      _hexController.text = normalized;
      return;
    }
    _hexController.text = _normalizedValue;
  }

  Color _colorFromHex(String hex) {
    final rgb = washHexToRgb(hex);
    if (rgb == null) return const Color(0xFF888888);
    return Color.fromARGB(255, rgb.r.round(), rgb.g.round(), rgb.b.round());
  }
}

class _RasterSurface extends StatelessWidget {
  const _RasterSurface({
    required this.image,
    required this.borderRadius,
    required this.borderColor,
    this.backgroundColor,
    this.innerShadow = false,
    this.cursor,
    this.onPointerDown,
    this.onPointerMove,
    this.onPointerUp,
    this.onPointerCancel,
  });

  final ui.Image? image;
  final BorderRadius borderRadius;
  final Color borderColor;
  final Color? backgroundColor;
  final bool innerShadow;
  final MouseCursor? cursor;
  final void Function(PointerDownEvent event, Size size)? onPointerDown;
  final void Function(PointerMoveEvent event, Size size)? onPointerMove;
  final void Function(PointerUpEvent event)? onPointerUp;
  final void Function(PointerCancelEvent event)? onPointerCancel;

  @override
  Widget build(BuildContext context) {
    return Listener(
      behavior: HitTestBehavior.opaque,
      onPointerDown: onPointerDown == null
          ? null
          : (e) {
              final box = context.findRenderObject()! as RenderBox;
              onPointerDown!(e, box.size);
            },
      onPointerMove: onPointerMove == null
          ? null
          : (e) {
              final box = context.findRenderObject()! as RenderBox;
              onPointerMove!(e, box.size);
            },
      onPointerUp: onPointerUp,
      onPointerCancel: onPointerCancel,
      child: MouseRegion(
        cursor: cursor ?? MouseCursor.defer,
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: borderRadius,
            border: Border.all(color: borderColor),
            boxShadow: innerShadow
                ? [
                    BoxShadow(
                      color: borderColor.withValues(alpha: 0.35),
                      blurRadius: 4,
                      spreadRadius: -1,
                      offset: const Offset(0, 1),
                    ),
                  ]
                : washPaperShadowSm(WashTokens.of(context)),
          ),
          child: ClipRRect(
            borderRadius: borderRadius,
            child: image == null
                ? const SizedBox.expand()
                : RawImage(image: image, fit: BoxFit.fill),
          ),
        ),
      ),
    );
  }
}

/// Self-contained preview for gallery legacy routing.
class WashColorPickerLegacyPreview extends StatefulWidget {
  const WashColorPickerLegacyPreview({super.key});

  @override
  State<WashColorPickerLegacyPreview> createState() =>
      _WashColorPickerLegacyPreviewState();
}

class _WashColorPickerLegacyPreviewState
    extends State<WashColorPickerLegacyPreview> {
  var _hex = '#276c8e';

  @override
  Widget build(BuildContext context) {
    return WashColorPicker(
      value: _hex,
      onChanged: (v) => setState(() => _hex = v),
      size: 200,
      showSwatch: true,
      showHexInput: true,
    );
  }
}
