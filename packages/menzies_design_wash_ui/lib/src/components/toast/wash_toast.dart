import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// daisyUI `toast-{top|middle|bottom}` + `toast-{start|center|end}` (nine placements).
enum WashToastPlacement {
  topStart,
  topCenter,
  topEnd,
  middleStart,
  middleCenter,
  middleEnd,
  bottomStart,
  bottomCenter,
  bottomEnd,
}

const Duration kWashToastDuration = Duration(milliseconds: 3200);
const Duration kWashToastStackDuration = Duration(milliseconds: 4000);

Alignment washToastAlignment(WashToastPlacement placement) {
  return switch (placement) {
    WashToastPlacement.topStart => Alignment.topLeft,
    WashToastPlacement.topCenter => Alignment.topCenter,
    WashToastPlacement.topEnd => Alignment.topRight,
    WashToastPlacement.middleStart => Alignment.centerLeft,
    WashToastPlacement.middleCenter => Alignment.center,
    WashToastPlacement.middleEnd => Alignment.centerRight,
    WashToastPlacement.bottomStart => Alignment.bottomLeft,
    WashToastPlacement.bottomCenter => Alignment.bottomCenter,
    WashToastPlacement.bottomEnd => Alignment.bottomRight,
  };
}

String washToastClass(WashToastPlacement placement) {
  return switch (placement) {
    WashToastPlacement.topStart => 'toast toast-top toast-start',
    WashToastPlacement.topCenter => 'toast toast-top toast-center',
    WashToastPlacement.topEnd => 'toast toast-top toast-end',
    WashToastPlacement.middleStart => 'toast toast-middle toast-start',
    WashToastPlacement.middleCenter => 'toast toast-middle toast-center',
    WashToastPlacement.middleEnd => 'toast toast-middle toast-end',
    WashToastPlacement.bottomStart => 'toast toast-bottom toast-start',
    WashToastPlacement.bottomCenter => 'toast toast-bottom toast-center',
    WashToastPlacement.bottomEnd => 'toast toast-bottom toast-end',
  };
}

String washToastAlertClass({
  WashAlertTone? tone,
  WashAlertStyle style = WashAlertStyle.solid,
}) {
  final parts = <String>['alert'];
  if (style == WashAlertStyle.soft) {
    parts.add('alert-soft');
  } else if (style == WashAlertStyle.outline) {
    parts.add('alert-outline');
  } else if (style == WashAlertStyle.dash) {
    parts.add('alert-dash');
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

/// One daisyUI `alert` inside a toast stack.
class WashToastAlert extends StatelessWidget {
  const WashToastAlert({
    required this.message,
    this.tone,
    this.style = WashAlertStyle.solid,
    this.iconName,
    this.onDismiss,
    this.showDismiss = false,
    this.shadow = true,
    this.dense = false,
    super.key,
  });

  final String message;
  final WashAlertTone? tone;
  final WashAlertStyle style;
  final String? iconName;
  final VoidCallback? onDismiss;
  final bool showDismiss;
  final bool shadow;
  final bool dense;

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[
      if (iconName != null)
        WashLucideIcon(iconName!, size: dense ? 14 : 20, strokeWidth: 2),
      WashAlertMessage(message),
      if (showDismiss)
        WashButton(
          label: 'Close',
          size: WashButtonSize.xs,
          variant: WashButtonVariant.ghost,
          onPressed: onDismiss ?? () {},
        ),
    ];

    return Semantics(
      liveRegion: true,
      container: true,
      label: 'toast',
      child: WashDaisyAlert(
        tone: tone,
        style: style,
        shadow: shadow,
        padding: dense
            ? const EdgeInsets.symmetric(horizontal: 10, vertical: 4)
            : null,
        children: children,
      ),
    );
  }
}

/// daisyUI `toast` wrapper: a positioned column of stacked alerts.
class WashToast extends StatelessWidget {
  const WashToast({
    required this.alerts,
    super.key,
  });

  final List<Widget> alerts;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const ClampingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < alerts.length; i++) ...[
            if (i > 0) const SizedBox(height: 8),
            alerts[i],
          ],
        ],
      ),
    );
  }
}

/// Gallery monospace class hint matching web `ClassLabel`.
class WashToastClassLabel extends StatelessWidget {
  const WashToastClassLabel(this.value, {super.key});

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
class WashToastStage extends StatelessWidget {
  const WashToastStage({
    required this.alerts,
    this.placement = WashToastPlacement.bottomEnd,
    this.minHeight = 96,
    this.backdropLabel,
    super.key,
  });

  final List<Widget> alerts;
  final WashToastPlacement placement;
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
                      alignment: washToastAlignment(placement),
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 420),
                        child: WashToast(alerts: alerts),
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

class _WashToastLive {
  const _WashToastLive({
    required this.id,
    required this.message,
    required this.placement,
    this.tone,
    this.style = WashAlertStyle.solid,
    this.iconName,
  });

  final int id;
  final String message;
  final WashToastPlacement placement;
  final WashAlertTone? tone;
  final WashAlertStyle style;
  final String? iconName;
}

/// Page-level live toast (daisyUI `toast z-[100]`). Single live item plus a stack.
class WashToastMessenger {
  WashToastMessenger._();

  static OverlayEntry? _liveEntry;
  static OverlayEntry? _stackEntry;
  static Timer? _liveTimer;
  static final Map<int, Timer> _stackTimers = <int, Timer>{};
  static int _id = 0;
  static int? _liveId;
  static _WashToastLive? _live;
  static final List<_WashToastLive> _stack = <_WashToastLive>[];
  static final List<VoidCallback> _listeners = <VoidCallback>[];

  static bool get hasLive => _liveEntry != null;
  static bool get hasStack => _stack.isNotEmpty;
  static int get stackLength => _stack.length;

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
    WashToastPlacement placement = WashToastPlacement.bottomEnd,
    WashAlertTone? tone,
    WashAlertStyle style = WashAlertStyle.solid,
    String? iconName,
    bool showDismiss = true,
    Duration duration = kWashToastDuration,
  }) {
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) {
      return;
    }

    dismissLive();
    _id += 1;
    final id = _id;
    _liveId = id;
    _live = _WashToastLive(
      id: id,
      message: message,
      placement: placement,
      tone: tone,
      style: style,
      iconName: iconName,
    );

    late OverlayEntry entry;
    entry = OverlayEntry(
      builder: (overlayContext) {
        final item = _live;
        if (item == null) {
          return const SizedBox.shrink();
        }
        return _WashToastOverlay(
          placement: item.placement,
          child: WashToast(
            alerts: [
              WashToastAlert(
                message: item.message,
                tone: item.tone,
                style: item.style,
                iconName: item.iconName,
                showDismiss: showDismiss,
                onDismiss: dismissLive,
              ),
            ],
          ),
        );
      },
    );
    _liveEntry = entry;
    overlay.insert(entry);
    _notify();

    _liveTimer = Timer(duration, () {
      if (_liveId == id) {
        dismissLive();
      }
    });
  }

  static void pushStack(
    BuildContext context, {
    required String message,
    WashAlertTone? tone,
    WashAlertStyle style = WashAlertStyle.solid,
    String? iconName,
    Duration duration = kWashToastStackDuration,
  }) {
    final overlay = Overlay.maybeOf(context, rootOverlay: true);
    if (overlay == null) {
      return;
    }

    _id += 1;
    final id = _id;
    _stack.add(
      _WashToastLive(
        id: id,
        message: message,
        placement: WashToastPlacement.bottomEnd,
        tone: tone,
        style: style,
        iconName: iconName,
      ),
    );

    if (_stackEntry == null) {
      _stackEntry = OverlayEntry(
        builder: (overlayContext) {
          return _WashToastOverlay(
            placement: WashToastPlacement.bottomEnd,
            child: WashToast(
              alerts: [
                for (final item in _stack)
                  WashToastAlert(
                    message: item.message,
                    tone: item.tone,
                    style: item.style,
                    iconName: item.iconName,
                    showDismiss: true,
                    onDismiss: () => dismissStackItem(item.id),
                  ),
              ],
            ),
          );
        },
      );
      overlay.insert(_stackEntry!);
    } else {
      _stackEntry!.markNeedsBuild();
    }

    _stackTimers[id] = Timer(duration, () {
      dismissStackItem(id);
    });
    _notify();
  }

  static void dismissLive() {
    _liveTimer?.cancel();
    _liveTimer = null;
    _liveId = null;
    _live = null;
    _liveEntry?.remove();
    _liveEntry = null;
    _notify();
  }

  static void dismissStackItem(int id) {
    _stackTimers.remove(id)?.cancel();
    _stack.removeWhere((item) => item.id == id);
    if (_stack.isEmpty) {
      _stackEntry?.remove();
      _stackEntry = null;
    } else {
      _stackEntry?.markNeedsBuild();
    }
    _notify();
  }

  static void clearStack() {
    for (final timer in _stackTimers.values) {
      timer.cancel();
    }
    _stackTimers.clear();
    _stack.clear();
    _stackEntry?.remove();
    _stackEntry = null;
    _notify();
  }

  static void dismissAll() {
    dismissLive();
    clearStack();
  }
}

void showWashToast(
  BuildContext context, {
  required String message,
  WashToastPlacement placement = WashToastPlacement.bottomEnd,
  WashAlertTone? tone,
  WashAlertStyle style = WashAlertStyle.solid,
  String? iconName,
  bool showDismiss = true,
  Duration duration = kWashToastDuration,
}) {
  WashToastMessenger.show(
    context,
    message: message,
    placement: placement,
    tone: tone,
    style: style,
    iconName: iconName,
    showDismiss: showDismiss,
    duration: duration,
  );
}

class _WashToastOverlay extends StatelessWidget {
  const _WashToastOverlay({
    required this.placement,
    required this.child,
  });

  final WashToastPlacement placement;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    const inset = 16.0;
    final boxed = ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 420),
      child: child,
    );

    return switch (placement) {
      WashToastPlacement.topStart => Positioned(
          left: inset,
          top: inset,
          child: boxed,
        ),
      WashToastPlacement.topCenter => Positioned(
          left: inset,
          right: inset,
          top: inset,
          child: Align(alignment: Alignment.topCenter, child: boxed),
        ),
      WashToastPlacement.topEnd => Positioned(
          right: inset,
          top: inset,
          child: boxed,
        ),
      WashToastPlacement.middleStart => Positioned(
          left: inset,
          top: inset,
          bottom: inset,
          child: Align(alignment: Alignment.centerLeft, child: boxed),
        ),
      WashToastPlacement.middleCenter => Positioned(
          left: inset,
          right: inset,
          top: inset,
          bottom: inset,
          child: Align(alignment: Alignment.center, child: boxed),
        ),
      WashToastPlacement.middleEnd => Positioned(
          right: inset,
          top: inset,
          bottom: inset,
          child: Align(alignment: Alignment.centerRight, child: boxed),
        ),
      WashToastPlacement.bottomStart => Positioned(
          left: inset,
          bottom: inset,
          child: boxed,
        ),
      WashToastPlacement.bottomCenter => Positioned(
          left: inset,
          right: inset,
          bottom: inset,
          child: Align(alignment: Alignment.bottomCenter, child: boxed),
        ),
      WashToastPlacement.bottomEnd => Positioned(
          right: inset,
          bottom: inset,
          child: boxed,
        ),
    };
  }
}
