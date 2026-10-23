import 'dart:math' as math;

import 'package:flutter/widgets.dart';

import '../../foundation/wash_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Picsum URL matching the web Avatar gallery (`/id/{id}/{size}/{size}`).
String washAvatarPicsumUrl(int id, {int size = 200}) =>
    'https://picsum.photos/id/$id/$size/$size';

enum WashAvatarSize {
  xl,
  lg,
  md,
  sm,
  xs,
}

double washAvatarSizePx(WashAvatarSize size) {
  return switch (size) {
    WashAvatarSize.xl => 128,
    WashAvatarSize.lg => 96,
    WashAvatarSize.md => 64,
    WashAvatarSize.sm => 48,
    WashAvatarSize.xs => 32,
  };
}

enum WashAvatarPresence { none, online, offline }

enum WashAvatarRadius { rounded, roundedXl, circle }

enum WashAvatarMask { none, squircle, hexagon, triangle }

enum WashAvatarRingColor { none, primary, secondary, accent, success }

/// daisyUI `avatar` with optional presence, placeholder, mask, and ring.
class WashAvatar extends StatelessWidget {
  const WashAvatar({
    this.imageId,
    this.imageUrl,
    this.imageAlt,
    this.placeholderText,
    this.placeholderBackground,
    this.placeholderForeground,
    this.size = WashAvatarSize.lg,
    this.radius = WashAvatarRadius.rounded,
    this.mask = WashAvatarMask.none,
    this.presence = WashAvatarPresence.none,
    this.placeholder = false,
    this.ring = WashAvatarRingColor.none,
    super.key,
  }) : assert(imageId == null || imageUrl == null);

  /// Legacy gallery preview: initials-only placeholder.
  const WashAvatar.initials(
    String initials, {
    WashAvatarSize size = WashAvatarSize.md,
    Key? key,
  }) : this(
          key: key,
          placeholderText: initials,
          placeholder: true,
          size: size,
          radius: WashAvatarRadius.circle,
        );

  final int? imageId;
  final String? imageUrl;
  final String? imageAlt;
  final String? placeholderText;
  final Color? placeholderBackground;
  final Color? placeholderForeground;
  final WashAvatarSize size;
  final WashAvatarRadius radius;
  final WashAvatarMask mask;
  final WashAvatarPresence presence;
  final bool placeholder;
  final WashAvatarRingColor ring;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final side = washAvatarSizePx(size);
    final resolvedUrl =
        imageUrl ?? (imageId != null ? washAvatarPicsumUrl(imageId!) : null);
    final showImage = resolvedUrl != null;

    Widget content = _AvatarPlate(
      side: side,
      tokens: tokens,
      radius: _effectiveRadius(radius, mask),
      mask: mask,
      background:
          showImage ? tokens.surfaceContainer : _placeholderBackground(tokens),
      foreground: placeholderForeground ?? _placeholderForeground(tokens),
      child: showImage
          ? _AvatarImage(url: resolvedUrl, alt: imageAlt, side: side)
          : _PlaceholderLabel(text: placeholderText ?? '?', size: size),
    );

    if (ring != WashAvatarRingColor.none) {
      content = _RingFrame(
        tokens: tokens,
        ring: ring,
        child: content,
      );
    }

    return _AvatarShell(
      side: side,
      presence: presence,
      tokens: tokens,
      child: content,
    );
  }

  WashAvatarRadius _effectiveRadius(WashAvatarRadius r, WashAvatarMask m) {
    if (m != WashAvatarMask.none) return WashAvatarRadius.rounded;
    return r;
  }

  Color _placeholderBackground(WashTokens tokens) {
    if (placeholderBackground != null) return placeholderBackground!;
    return tokens.palette.neutral;
  }

  Color _placeholderForeground(WashTokens tokens) {
    return tokens.palette.neutralContent;
  }
}

class WashAvatarGroup extends StatelessWidget {
  const WashAvatarGroup({
    required this.children,
    this.overlap = 24,
    super.key,
  });

  final List<Widget> children;
  final double overlap;

  @override
  Widget build(BuildContext context) {
    if (children.isEmpty) return const SizedBox.shrink();
    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        for (var i = 0; i < children.length; i++)
          Transform.translate(
            offset: Offset(i == 0 ? 0 : -overlap, 0),
            child: children[i],
          ),
      ],
    );
  }
}

class _AvatarShell extends StatelessWidget {
  const _AvatarShell({
    required this.side,
    required this.presence,
    required this.tokens,
    required this.child,
  });

  final double side;
  final WashAvatarPresence presence;
  final WashTokens tokens;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final dot = side * 0.22;
    return SizedBox(
      width: side,
      height: side,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned.fill(child: child),
          if (presence != WashAvatarPresence.none)
            Positioned(
              right: side * 0.02,
              bottom: side * 0.02,
              child: Container(
                width: dot,
                height: dot,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: presence == WashAvatarPresence.online
                      ? tokens.palette.success
                      : tokens.palette.neutral,
                  border: Border.all(
                      color: tokens.surface, width: math.max(2, dot * 0.15)),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _RingFrame extends StatelessWidget {
  const _RingFrame({
    required this.tokens,
    required this.ring,
    required this.child,
  });

  final WashTokens tokens;
  final WashAvatarRingColor ring;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final color = switch (ring) {
      WashAvatarRingColor.primary => tokens.palette.primary,
      WashAvatarRingColor.secondary => tokens.palette.secondary,
      WashAvatarRingColor.accent => tokens.palette.accent,
      WashAvatarRingColor.success => tokens.palette.success,
      WashAvatarRingColor.none => tokens.palette.primary,
    };
    return DecoratedBox(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: tokens.surface,
        border: Border.all(color: color, width: 2),
      ),
      child: Padding(padding: const EdgeInsets.all(2), child: child),
    );
  }
}

class _AvatarPlate extends StatelessWidget {
  const _AvatarPlate({
    required this.side,
    required this.tokens,
    required this.radius,
    required this.mask,
    required this.background,
    required this.foreground,
    required this.child,
  });

  final double side;
  final WashTokens tokens;
  final WashAvatarRadius radius;
  final WashAvatarMask mask;
  final Color background;
  final Color foreground;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final borderRadius = _borderRadius(radius, side);
    Widget inner = Container(
      width: side,
      height: side,
      alignment: Alignment.center,
      color: background,
      child: DefaultTextStyle(
        style: WashTypography.body(foreground),
        child: child,
      ),
    );

    if (mask == WashAvatarMask.none && radius == WashAvatarRadius.circle) {
      inner = ClipOval(child: inner);
    } else if (mask == WashAvatarMask.none) {
      inner = ClipRRect(borderRadius: borderRadius, child: inner);
    } else {
      inner = ClipPath(
        clipper: switch (mask) {
          WashAvatarMask.squircle => _SquircleClipper(),
          WashAvatarMask.hexagon => _HexagonClipper(),
          WashAvatarMask.triangle => _TriangleClipper(),
          WashAvatarMask.none => _SquircleClipper(),
        },
        child: inner,
      );
    }

    return inner;
  }

  BorderRadius _borderRadius(WashAvatarRadius r, double side) {
    return switch (r) {
      WashAvatarRadius.rounded => BorderRadius.circular(4),
      WashAvatarRadius.roundedXl => BorderRadius.circular(12),
      WashAvatarRadius.circle => BorderRadius.circular(side / 2),
    };
  }
}

class _AvatarImage extends StatelessWidget {
  const _AvatarImage({
    required this.url,
    required this.alt,
    required this.side,
  });

  final String url;
  final String? alt;
  final double side;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: alt,
      image: true,
      child: Image.network(
        url,
        width: side,
        height: side,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => WashIcon(
          WashIconGlyph.image,
          size: side * 0.45,
          color: WashTokens.of(context).inkMuted,
        ),
      ),
    );
  }
}

class _PlaceholderLabel extends StatelessWidget {
  const _PlaceholderLabel({required this.text, required this.size});

  final String text;
  final WashAvatarSize size;

  @override
  Widget build(BuildContext context) {
    final fontSize = switch (size) {
      WashAvatarSize.xl => 30.0,
      WashAvatarSize.lg => 30.0,
      WashAvatarSize.md => 20.0,
      WashAvatarSize.sm => 14.0,
      WashAvatarSize.xs => 12.0,
    };
    return Text(
      text,
      style: TextStyle(fontSize: fontSize, fontWeight: FontWeight.w600),
      textAlign: TextAlign.center,
    );
  }
}

Color washAvatarWashBlue(WashTokens tokens) {
  final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
      kWashAtmosphereByTheme['mineral']!;
  return atmo.washA;
}

class _SquircleClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final r = size.shortestSide * 0.28;
    return Path()
      ..addRRect(RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, size.width, size.height),
        Radius.circular(r),
      ));
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}

class _HexagonClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final w = size.width;
    final h = size.height;
    return Path()
      ..moveTo(w * 0.5, 0)
      ..lineTo(w, h * 0.25)
      ..lineTo(w, h * 0.75)
      ..lineTo(w * 0.5, h)
      ..lineTo(0, h * 0.75)
      ..lineTo(0, h * 0.25)
      ..close();
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}

class _TriangleClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    return Path()
      ..moveTo(size.width * 0.5, 0)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}
