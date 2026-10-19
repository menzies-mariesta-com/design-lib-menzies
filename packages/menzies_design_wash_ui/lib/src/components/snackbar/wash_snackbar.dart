import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `toast-bottom` placements used by composed snackbars.
enum WashSnackbarPlacement {
  bottomCenter,
  bottomStart,
  bottomEnd,
}

const Duration kWashSnackbarDuration = Duration(milliseconds: 2200);
const Duration kWashSnackbarActionDuration = Duration(milliseconds: 4000);
const Duration kWashSnackbarNoteDuration = Duration(milliseconds: 1600);

Alignment washSnackbarAlignment(WashSnackbarPlacement placement) {
  return switch (placement) {
    WashSnackbarPlacement.bottomCenter => Alignment.bottomCenter,
    WashSnackbarPlacement.bottomStart => Alignment.bottomLeft,
    WashSnackbarPlacement.bottomEnd => Alignment.bottomRight,
  };
}

String washSnackbarToastClass(WashSnackbarPlacement placement) {
  return switch (placement) {
    WashSnackbarPlacement.bottomCenter => 'toast toast-bottom toast-center',
    WashSnackbarPlacement.bottomStart => 'toast toast-bottom toast-start',
    WashSnackbarPlacement.bottomEnd => 'toast toast-bottom toast-end',
  };
}

String washSnackbarAlertClass({
  WashAlertTone? tone,
  WashAlertStyle style = WashAlertStyle.solid,
}) {
  final parts = <String>['alert'];
  if (style == WashAlertStyle.soft) {
    parts.add('alert-soft');
  }
  if (tone != null) {
    parts.add(switch (tone) {
      WashAlertTone.success => 'alert-success',
      WashAlertTone.error => 'alert-error',
      WashAlertTone.warning => 'alert-warning',
      WashAlertTone.info => 'alert-info',
    });
  }
  return parts.join(' ');
}

/// Composed daisyUI `toast` + `alert` snackbar (no dedicated snackbar in daisyUI 5.7.9).
class WashSnackbar extends StatelessWidget {
  const WashSnackbar({
    required this.message,
    this.tone,
    this.style = WashAlertStyle.solid,
    this.iconName,
    this.actionLabel,
    this.onAction,
    this.onDismiss,
    this.showDismiss = false,
    this.shadow = true,
    this.compact = false,
    super.key,
  });

  final String message;
  final WashAlertTone? tone;
  final WashAlertStyle style;
  final String? iconName;
  final String? actionLabel;
  final VoidCallback? onAction;
  final VoidCallback? onDismiss;
  final bool showDismiss;
  final bool shadow;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[
      if (iconName != null)
        WashLucideIcon(iconName!, size: compact ? 16 : 20, strokeWidth: 2),
      WashAlertMessage(message),
      if (actionLabel != null)
        WashButton(
          label: actionLabel,
          size: WashButtonSize.xs,
          variant: WashButtonVariant.ghost,
          onPressed: onAction ?? () {},
        ),
      if (showDismiss)
        WashButton(
          label: 'Dismiss',
          size: WashButtonSize.xs,
          variant: WashButtonVariant.ghost,
          onPressed: onDismiss ?? () {},
        ),
    ];

    return Semantics(
      liveRegion: true,
      container: true,
      label: 'snackbar',
      child: WashDaisyAlert(
        tone: tone,
        style: style,
        shadow: shadow,
        children: children,
      ),
    );
  }
}

/// Gallery monospace class hint matching web `ClassLabel`.
class WashSnackbarClassLabel extends StatelessWidget {
  const WashSnackbarClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// Contained `relative` panel with an `!absolute` toast, matching gallery static samples.
class WashSnackbarStage extends StatelessWidget {
  const WashSnackbarStage({
    required this.snackbar,
    this.placement = WashSnackbarPlacement.bottomCenter,
    this.minHeight = 112,
    this.backdropLabel,
    super.key,
  });

  final WashSnackbar snackbar;
  final WashSnackbarPlacement placement;
  final double minHeight;
  final String? backdropLabel;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return ClipRRect(
      borderRadius: BorderRadius.circular(tokens.radiusBox),
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: minHeight),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: tokens.palette.base100.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(tokens.radiusBox),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
          ),
          child: SizedBox(
            height: minHeight,
            width: double.infinity,
            child: Stack(
              children: [
                if (backdropLabel != null)
                  Positioned.fill(
                    child: Center(
                      child: Text(
                        backdropLabel!,
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 12,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                Positioned.fill(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Align(
                      alignment: washSnackbarAlignment(placement),
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 420),
                        child: snackbar,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Page-level live snackbar (daisyUI `toast z-[100]`), one at a time with timer cleanup.
class WashSnackbarMessenger {
  WashSnackbarMessenger._();

  static OverlayEntry? _snackEntry;
  static OverlayEntry? _noteEntry;
  static Timer? _snackTimer;
  static Timer? _noteTimer;
  static int _id = 0;
  static int? _liveId;
  static final List<VoidCallback> _listeners = <VoidCallback>[];

  static bool get hasLive => _snackEntry != null;

  static void addListener(VoidCallback listener) {
    _listeners.add(listener);
  }

  static void removeListener(VoidCallback listener) {
    _listeners.remove(listener);
  }

  static void _notify() {
    for (final listener in List<VoidCallback>.from(_listeners)) {
      listener();
    }
  }

  static void show(
    BuildContext context, {
    required String message,
    WashSnackbarPlacement placement = WashSnackbarPlacement.bottomCenter,
    WashAlertTone? tone,
    WashAlertStyle style = WashAlertStyle.solid,
    String? iconName,
    String? actionLabel,
    VoidCallback? onAction,
    bool showDismiss = true,
    Duration duration = kWashSnackbarDuration,
  }) {
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) {
      return;
    }

    dismiss();
    _id += 1;
    final id = _id;
    _liveId = id;

    late OverlayEntry entry;
    entry = OverlayEntry(
      builder: (overlayContext) {
        return _WashSnackbarOverlay(
          placement: placement,
          child: WashSnackbar(
            message: message,
            tone: tone,
            style: style,
            iconName: iconName,
            actionLabel: actionLabel,
            showDismiss: showDismiss,
            onAction: actionLabel == null
                ? null
                : () {
                    onAction?.call();
                    dismiss();
                  },
            onDismiss: dismiss,
          ),
        );
      },
    );
    _snackEntry = entry;
    overlay.insert(entry);
    _notify();

    _snackTimer = Timer(duration, () {
      if (_liveId == id) {
        dismiss();
      }
    });
  }

  static void showNote(
    BuildContext context, {
    required String message,
    Duration duration = kWashSnackbarNoteDuration,
  }) {
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) {
      return;
    }
    _clearNote();
    late OverlayEntry entry;
    entry = OverlayEntry(
      builder: (overlayContext) {
        return _WashSnackbarOverlay(
          placement: WashSnackbarPlacement.bottomCenter,
          child: WashSnackbar(
            message: message,
            tone: WashAlertTone.info,
            style: WashAlertStyle.soft,
            showDismiss: false,
            shadow: true,
          ),
        );
      },
    );
    _noteEntry = entry;
    overlay.insert(entry);
    _noteTimer = Timer(duration, _clearNote);
  }

  static void dismiss() {
    _snackTimer?.cancel();
    _snackTimer = null;
    _liveId = null;
    _snackEntry?.remove();
    _snackEntry = null;
    _notify();
  }

  static void dismissAll() {
    dismiss();
    _clearNote();
  }

  static void _clearNote() {
    _noteTimer?.cancel();
    _noteTimer = null;
    _noteEntry?.remove();
    _noteEntry = null;
  }
}

void showWashSnackbar(
  BuildContext context, {
  required String message,
  WashSnackbarPlacement placement = WashSnackbarPlacement.bottomCenter,
  WashAlertTone? tone,
  WashAlertStyle style = WashAlertStyle.solid,
  String? iconName,
  String? actionLabel,
  VoidCallback? onAction,
  bool showDismiss = true,
  Duration duration = kWashSnackbarDuration,
}) {
  WashSnackbarMessenger.show(
    context,
    message: message,
    placement: placement,
    tone: tone,
    style: style,
    iconName: iconName,
    actionLabel: actionLabel,
    onAction: onAction,
    showDismiss: showDismiss,
    duration: duration,
  );
}

class _WashSnackbarOverlay extends StatelessWidget {
  const _WashSnackbarOverlay({
    required this.placement,
    required this.child,
  });

  final WashSnackbarPlacement placement;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    const inset = 16.0;
    switch (placement) {
      case WashSnackbarPlacement.bottomCenter:
        return Positioned(
          left: inset,
          right: inset,
          bottom: inset,
          child: Align(
            alignment: Alignment.bottomCenter,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: child,
            ),
          ),
        );
      case WashSnackbarPlacement.bottomStart:
        return Positioned(
          left: inset,
          bottom: inset,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: child,
          ),
        );
      case WashSnackbarPlacement.bottomEnd:
        return Positioned(
          right: inset,
          bottom: inset,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: child,
          ),
        );
    }
  }
}
