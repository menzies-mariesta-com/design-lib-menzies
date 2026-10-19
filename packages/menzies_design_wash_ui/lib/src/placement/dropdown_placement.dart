import 'package:flutter/painting.dart';

enum WashDropdownPlacement {
  belowStart,
  belowEnd,
  aboveStart,
  aboveEnd,
}

class WashDropdownPlacementLogic {
  const WashDropdownPlacementLogic._();

  static WashDropdownPlacement measure({
    required Rect trigger,
    required Size panelSize,
    required Rect viewport,
    double pad = 8,
  }) {
    final below = Rect.fromLTWH(
      trigger.left,
      trigger.bottom,
      panelSize.width,
      panelSize.height,
    );
    final above = Rect.fromLTWH(
      trigger.left,
      trigger.top - panelSize.height,
      panelSize.width,
      panelSize.height,
    );
    final fitsBelow = _fits(below, viewport.deflate(pad));
    final fitsAbove = _fits(above, viewport.deflate(pad));
    final useAbove = !fitsBelow && fitsAbove;
    final alignEnd = trigger.right + panelSize.width > viewport.right - pad;
    if (useAbove) {
      return alignEnd
          ? WashDropdownPlacement.aboveEnd
          : WashDropdownPlacement.aboveStart;
    }
    return alignEnd
        ? WashDropdownPlacement.belowEnd
        : WashDropdownPlacement.belowStart;
  }

  static Offset panelOffset({
    required Rect trigger,
    required Size panelSize,
    required WashDropdownPlacement placement,
    double gap = 4,
  }) {
    switch (placement) {
      case WashDropdownPlacement.belowStart:
        return Offset(trigger.left, trigger.bottom + gap);
      case WashDropdownPlacement.belowEnd:
        return Offset(trigger.right - panelSize.width, trigger.bottom + gap);
      case WashDropdownPlacement.aboveStart:
        return Offset(trigger.left, trigger.top - panelSize.height - gap);
      case WashDropdownPlacement.aboveEnd:
        return Offset(
          trigger.right - panelSize.width,
          trigger.top - panelSize.height - gap,
        );
    }
  }

  static bool _fits(Rect panel, Rect viewport) {
    return panel.left >= viewport.left &&
        panel.top >= viewport.top &&
        panel.right <= viewport.right &&
        panel.bottom <= viewport.bottom;
  }

  /// Static daisyUI placement (no viewport measure).
  static Offset staticPanelOffset({
    required Rect trigger,
    required Size panelSize,
    bool alignEnd = false,
    bool openTop = false,
    bool openLeft = false,
    bool openRight = false,
    double gap = 4,
  }) {
    if (openLeft) {
      return Offset(
        trigger.left - panelSize.width - gap,
        trigger.top,
      );
    }
    if (openRight) {
      return Offset(trigger.right + gap, trigger.top);
    }
    final left = alignEnd ? trigger.right - panelSize.width : trigger.left;
    if (openTop) {
      return Offset(left, trigger.top - panelSize.height - gap);
    }
    return Offset(left, trigger.bottom + gap);
  }

  static double cappedPanelHeight({
    required Rect trigger,
    required Rect viewport,
    required double preferredHeight,
    bool openTop = false,
    double pad = 8,
  }) {
    final safe = viewport.deflate(pad);
    final below = safe.bottom - trigger.bottom - pad;
    final above = trigger.top - safe.top - pad;
    final space = openTop ? above : below;
    if (space <= 0) return preferredHeight;
    return space < preferredHeight ? space : preferredHeight;
  }
}
