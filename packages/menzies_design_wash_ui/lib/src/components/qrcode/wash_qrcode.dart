import 'dart:async';
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:qr/qr.dart';

import '../../foundation/wash_primitives.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../button/wash_button.dart';

/// Error correction level matching `qrcode.react` `level`.
enum WashQrLevel {
  l,
  m,
  q,
  h,
}

int _qrErrorLevel(WashQrLevel level) {
  return switch (level) {
    WashQrLevel.l => QrErrorCorrectLevel.L,
    WashQrLevel.m => QrErrorCorrectLevel.M,
    WashQrLevel.q => QrErrorCorrectLevel.Q,
    WashQrLevel.h => QrErrorCorrectLevel.H,
  };
}

/// Placeholder used when the payload is empty (web falls back to `"menzies"`).
const String kWashQrEmptyFallback = 'menzies';

String washQrPayload(String? value) {
  final trimmed = value?.trim() ?? '';
  return trimmed.isEmpty ? kWashQrEmptyFallback : trimmed;
}

/// Encodes [value] into a module matrix (true = dark).
QrImage washQrImage(
  String value, {
  WashQrLevel level = WashQrLevel.m,
}) {
  final code = QrCode.fromData(
    data: washQrPayload(value),
    errorCorrectLevel: _qrErrorLevel(level),
  );
  return QrImage(code);
}

/// Renders a PNG of the QR (quiet zone included). Useful for download.
Future<Uint8List> washQrPngBytes({
  required String value,
  required int size,
  Color foreground = const Color(0xFF1A1C1E),
  Color background = const Color(0xFFFFFFFF),
  int marginSize = 2,
  WashQrLevel level = WashQrLevel.m,
}) async {
  final image = washQrImage(value, level: level);
  final recorder = ui.PictureRecorder();
  final canvas = Canvas(recorder);
  _paintQr(
    canvas,
    Size(size.toDouble(), size.toDouble()),
    image,
    foreground,
    background,
    marginSize,
  );
  final picture = recorder.endRecording();
  final uiImage = await picture.toImage(size, size);
  try {
    final bytes = await uiImage.toByteData(format: ui.ImageByteFormat.png);
    if (bytes == null) {
      throw StateError('Failed to encode QR PNG');
    }
    return bytes.buffer.asUint8List();
  } finally {
    uiImage.dispose();
  }
}

void _paintQr(
  Canvas canvas,
  Size size,
  QrImage image,
  Color foreground,
  Color background,
  int marginSize,
) {
  canvas.drawRect(Offset.zero & size, Paint()..color = background);
  final modules = image.moduleCount;
  final total = modules + marginSize * 2;
  final cell = size.width / total;
  final paint = Paint()..color = foreground;
  for (var row = 0; row < modules; row++) {
    for (var col = 0; col < modules; col++) {
      if (!image.isDark(row, col)) continue;
      canvas.drawRect(
        Rect.fromLTWH(
          (col + marginSize) * cell,
          (row + marginSize) * cell,
          cell + 0.5,
          cell + 0.5,
        ),
        paint,
      );
    }
  }
}

/// daisyUI-styled QR code (parity with `QRCodeSVG` / `QRCodeCanvas`).
class WashQrCode extends StatelessWidget {
  const WashQrCode({
    required this.value,
    this.size = 144,
    this.marginSize = 2,
    this.foreground,
    this.background,
    this.level = WashQrLevel.m,
    this.semanticLabel,
    super.key,
  });

  final String value;
  final double size;

  /// Quiet-zone modules (web `marginSize`, default 2).
  final int marginSize;
  final Color? foreground;
  final Color? background;
  final WashQrLevel level;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fg = foreground ?? tokens.onSurface;
    final bg = background ?? tokens.palette.base100;
    final label = semanticLabel ?? 'QR code';
    final image = washQrImage(value, level: level);

    return Semantics(
      label: label,
      image: true,
      child: SizedBox(
        width: size,
        height: size,
        child: CustomPaint(
          painter: _WashQrPainter(
            image: image,
            foreground: fg,
            background: bg,
            marginSize: marginSize,
          ),
        ),
      ),
    );
  }
}

class _WashQrPainter extends CustomPainter {
  _WashQrPainter({
    required this.image,
    required this.foreground,
    required this.background,
    required this.marginSize,
  });

  final QrImage image;
  final Color foreground;
  final Color background;
  final int marginSize;

  @override
  void paint(Canvas canvas, Size size) {
    _paintQr(canvas, size, image, foreground, background, marginSize);
  }

  @override
  bool shouldRepaint(covariant _WashQrPainter old) =>
      old.image != image ||
      old.foreground != foreground ||
      old.background != background ||
      old.marginSize != marginSize;
}

/// Paper frame around a QR (web `QrFrame`).
class WashQrFrame extends StatelessWidget {
  const WashQrFrame({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tokens.palette.base100,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: child,
    );
  }
}

/// Icon download control. Calls [onPng] with PNG bytes (web canvas download).
class WashQrDownloadButton extends StatefulWidget {
  const WashQrDownloadButton({
    required this.value,
    required this.onPng,
    this.size = 192,
    this.foreground,
    this.background,
    this.marginSize = 2,
    this.level = WashQrLevel.m,
    this.tooltip = 'Download PNG',
    super.key,
  });

  final String value;
  final FutureOr<void> Function(Uint8List png) onPng;
  final double size;
  final Color? foreground;
  final Color? background;
  final int marginSize;
  final WashQrLevel level;
  final String tooltip;

  @override
  State<WashQrDownloadButton> createState() => _WashQrDownloadButtonState();
}

class _WashQrDownloadButtonState extends State<WashQrDownloadButton> {
  var _loading = false;

  Future<void> _download() async {
    if (_loading) return;
    setState(() => _loading = true);
    try {
      final tokens = WashTokens.of(context);
      final bytes = await washQrPngBytes(
        value: widget.value,
        size: widget.size.round(),
        foreground: widget.foreground ?? tokens.onSurface,
        background: widget.background ?? tokens.palette.base100,
        marginSize: widget.marginSize,
        level: widget.level,
      );
      await widget.onPng(bytes);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return WashTooltip(
      message: widget.tooltip,
      child: WashButton(
        variant: WashButtonVariant.ghost,
        tint: WashButtonVariant.primary,
        square: true,
        loading: _loading,
        enabled: !_loading,
        onPressed: _download,
        child: const WashLucideIcon('download', size: 16),
      ),
    );
  }
}

/// Convenience: copy a short confirmation after PNG generation (gallery demo).
Future<void> washQrCopyPngNotice(BuildContext context, Uint8List png) async {
  await Clipboard.setData(
    ClipboardData(text: 'QR PNG ready (${png.lengthInBytes} bytes)'),
  );
  if (!context.mounted) return;
  WashMessengerScope.showSnack(
    context,
    'PNG ready (${png.lengthInBytes} bytes)',
  );
}
