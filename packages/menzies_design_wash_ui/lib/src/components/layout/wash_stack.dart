import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../foundation/wash_primitives.dart';
import '../../placement/tooltip_placement.dart';
import '../../widgets/wash_feedback.dart';

/// daisyUI `stack` placement modifiers (default matches bare `stack` / `stack-bottom`).
enum WashStackPlacement {
  bottom,
  top,
  start,
  end,
}

/// Layer stack swatch ids matching web `bg-wash-*` / `bg-base-200`.
enum WashLayerSwatch {
  blue,
  ochre,
  rose,
  paper,
}

/// Resolves pastel wash fills from atmosphere tokens (`--wash-a/b/c`, base-200).
Color washLayerSwatchColor(BuildContext context, WashLayerSwatch swatch) {
  final tokens = WashTokens.of(context);
  final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
      kWashAtmosphereByTheme['mineral']!;
  return switch (swatch) {
    WashLayerSwatch.blue => atmo.washA,
    WashLayerSwatch.ochre => atmo.washB,
    WashLayerSwatch.rose => atmo.washC,
    WashLayerSwatch.paper => tokens.surfaceContainer,
  };
}

/// Studio wash swatches (Tailwind `bg-wash-*` pastel parity via atmosphere).
abstract final class WashStackPigments {
  static Color blue(BuildContext context) =>
      washLayerSwatchColor(context, WashLayerSwatch.blue);
  static Color ochre(BuildContext context) =>
      washLayerSwatchColor(context, WashLayerSwatch.ochre);
  static Color rose(BuildContext context) =>
      washLayerSwatchColor(context, WashLayerSwatch.rose);

  /// Fallback mineral pastels when no [BuildContext] is available.
  static const blueFallback = Color(0xFFD9EEF5);
  static const ochreFallback = Color(0xFFF2E1C6);
  static const roseFallback = Color(0xFFE8C9C3);
}

/// daisyUI `stack`: layered children on a 5x5 grid with offset plates.
///
/// Paint order matches daisyUI z-index: first child on top, then second,
/// then remaining siblings in document order (later above earlier).
class WashStack extends StatelessWidget {
  const WashStack({
    required this.width,
    required this.height,
    required this.children,
    this.placement = WashStackPlacement.bottom,
    this.applyChildOpacity = true,
    super.key,
  });

  final double width;
  final double height;
  final WashStackPlacement placement;
  final List<Widget> children;

  /// When true, applies daisyUI stack opacities (1 / 0.9 / 0.7).
  final bool applyChildOpacity;

  static const _rowTracks = [3.0, 4.0, null, 4.0, 3.0];
  static const _colTracks = [3.0, 4.0, null, 4.0, 3.0];

  @override
  Widget build(BuildContext context) {
    final lineX = _gridLines(width, _colTracks);
    final lineY = _gridLines(height, _rowTracks);

    // Bottom → top paint order for daisyUI z-index parity.
    final paintOrder = <int>[];
    for (var i = 2; i < children.length; i++) {
      paintOrder.add(i);
    }
    if (children.length > 1) paintOrder.add(1);
    if (children.isNotEmpty) paintOrder.add(0);

    final stacked = <Widget>[];
    for (final i in paintOrder) {
      final area = _gridArea(placement, i);
      final rect = _rectFromArea(lineX, lineY, area);
      final opacity =
          !applyChildOpacity ? 1.0 : (i == 0 ? 1.0 : (i == 1 ? 0.9 : 0.7));
      stacked.add(
        Positioned(
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          child: Opacity(opacity: opacity, child: children[i]),
        ),
      );
    }
    return SizedBox(
      width: width,
      height: height,
      child: Stack(
        clipBehavior: Clip.none,
        children: stacked,
      ),
    );
  }

  static List<double> _gridLines(double total, List<double?> tracks) {
    final fixed = tracks.whereType<double>().fold<double>(0, (a, b) => a + b);
    final flex = total - fixed;
    final lines = <double>[0];
    var x = 0.0;
    for (final t in tracks) {
      x += t ?? flex;
      lines.add(x);
    }
    return lines;
  }

  static ({int r1, int c1, int r2, int c2}) _gridArea(
    WashStackPlacement placement,
    int index,
  ) {
    final first = index == 0;
    final second = index == 1;
    switch (placement) {
      case WashStackPlacement.top:
        if (first) return (r1: 3, c1: 1, r2: 6, c2: 6);
        if (second) return (r1: 2, c1: 2, r2: 5, c2: 5);
        return (r1: 1, c1: 3, r2: 4, c2: 4);
      case WashStackPlacement.start:
        if (first) return (r1: 1, c1: 3, r2: 6, c2: 6);
        if (second) return (r1: 2, c1: 2, r2: 5, c2: 5);
        return (r1: 3, c1: 1, r2: 4, c2: 4);
      case WashStackPlacement.end:
        if (first) return (r1: 1, c1: 1, r2: 6, c2: 4);
        if (second) return (r1: 2, c1: 2, r2: 5, c2: 5);
        return (r1: 3, c1: 3, r2: 4, c2: 6);
      case WashStackPlacement.bottom:
        if (first) return (r1: 1, c1: 1, r2: 4, c2: 6);
        if (second) return (r1: 2, c1: 2, r2: 5, c2: 5);
        return (r1: 3, c1: 3, r2: 6, c2: 4);
    }
  }

  static Rect _rectFromArea(
    List<double> lineX,
    List<double> lineY,
    ({int r1, int c1, int r2, int c2}) area,
  ) {
    return Rect.fromLTRB(
      lineX[area.c1 - 1],
      lineY[area.r1 - 1],
      lineX[area.c2 - 1],
      lineY[area.r2 - 1],
    );
  }
}

/// Gallery stack cards (Sky / Earth / Bloom) matching web [StackCards].
class WashStackLabeledCards extends StatelessWidget {
  const WashStackLabeledCards({
    this.placement = WashStackPlacement.bottom,
    this.width = 112,
    this.height = 80,
    super.key,
  });

  final WashStackPlacement placement;
  final double width;
  final double height;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashStack(
      width: width,
      height: height,
      placement: placement,
      children: [
        _card(context, tokens, 'Sky', WashStackPigments.blue(context)),
        _card(context, tokens, 'Earth', WashStackPigments.ochre(context)),
        _card(context, tokens, 'Bloom', WashStackPigments.rose(context)),
      ],
    );
  }

  Widget _card(
    BuildContext context,
    WashTokens tokens,
    String label,
    Color fill,
  ) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder),
        boxShadow: washPaperShadowSm(tokens),
      ),
      child: Center(
        child: Text(
          label,
          style: WashTypography.label(tokens.onSurface).copyWith(
            fontSize: 12,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}

class WashStackClassLabel extends StatelessWidget {
  const WashStackClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value.isEmpty ? 'stack' : value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// Pigment layer row for [WashLayersDesk].
class WashPigmentLayer {
  const WashPigmentLayer({
    required this.id,
    required this.name,
    required this.opacity,
    required this.visible,
    required this.locked,
    required this.swatch,
  });

  final String id;
  final String name;
  final int opacity;
  final bool visible;
  final bool locked;
  final WashLayerSwatch swatch;

  WashPigmentLayer copyWith({
    String? name,
    int? opacity,
    bool? visible,
    bool? locked,
    WashLayerSwatch? swatch,
  }) {
    return WashPigmentLayer(
      id: id,
      name: name ?? this.name,
      opacity: opacity ?? this.opacity,
      visible: visible ?? this.visible,
      locked: locked ?? this.locked,
      swatch: swatch ?? this.swatch,
    );
  }

  static List<WashPigmentLayer> initial() => [
        const WashPigmentLayer(
          id: '1',
          name: 'Sky glaze',
          opacity: 72,
          visible: true,
          locked: false,
          swatch: WashLayerSwatch.blue,
        ),
        const WashPigmentLayer(
          id: '2',
          name: 'Ochre cliff',
          opacity: 55,
          visible: true,
          locked: false,
          swatch: WashLayerSwatch.ochre,
        ),
        const WashPigmentLayer(
          id: '3',
          name: 'Rose bloom',
          opacity: 40,
          visible: true,
          locked: true,
          swatch: WashLayerSwatch.rose,
        ),
        const WashPigmentLayer(
          id: '4',
          name: 'Paper tooth',
          opacity: 100,
          visible: true,
          locked: true,
          swatch: WashLayerSwatch.paper,
        ),
      ];
}

/// Interactive wash layer list (studio desk) matching web Layers desk.
class WashLayersDesk extends StatelessWidget {
  const WashLayersDesk({
    required this.layers,
    required this.onLayersChanged,
    super.key,
  });

  final List<WashPigmentLayer> layers;
  final ValueChanged<List<WashPigmentLayer>> onLayersChanged;

  void _update(String id, WashPigmentLayer Function(WashPigmentLayer) fn) {
    onLayersChanged(
      layers.map((l) => l.id == id ? fn(l) : l).toList(),
    );
  }

  void _toggleVisible(String id) {
    onLayersChanged(
      layers.map((l) {
        if (l.id != id || l.locked) return l;
        return l.copyWith(visible: !l.visible);
      }).toList(),
    );
  }

  void _toggleLocked(String id) {
    onLayersChanged(
      layers
          .map((l) => l.id == id ? l.copyWith(locked: !l.locked) : l)
          .toList(),
    );
  }

  void _remove(String id) {
    onLayersChanged(
      layers.where((l) => l.id != id || l.locked).toList(),
    );
  }

  void _add() {
    final n = layers.length + 1;
    onLayersChanged([
      WashPigmentLayer(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: 'Fresh wash $n',
        opacity: 65,
        visible: true,
        locked: false,
        swatch: WashLayerSwatch.blue,
      ),
      ...layers,
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final visibleCount = layers.where((l) => l.visible).length;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 12,
          runSpacing: 8,
          children: [
            Text(
              '$visibleCount of ${layers.length} washes visible',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
            WashButton(
              size: WashButtonSize.sm,
              variant: WashButtonVariant.primary,
              onPressed: _add,
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  WashLucideIcon('plus', size: 16),
                  SizedBox(width: 6),
                  Text('Add wash'),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        DecoratedBox(
          decoration: washInkBorderBox(
            tokens,
            fill: Color.alphaBlend(
              tokens.surface.withValues(alpha: 0.9),
              tokens.surface,
            ),
            radius: tokens.radiusBox,
          ).copyWith(
            boxShadow: washPaperShadowSm(tokens),
          ),
          child: Column(
            children: [
              for (var i = 0; i < layers.length; i++) ...[
                if (i > 0)
                  Container(
                    height: 1,
                    color: tokens.inkBorder.withValues(alpha: 0.7),
                  ),
                _LayerRow(
                  layer: layers[i],
                  onOpacity: (v) => _update(
                    layers[i].id,
                    (l) => l.locked ? l : l.copyWith(opacity: v.round()),
                  ),
                  onToggleVisible: () => _toggleVisible(layers[i].id),
                  onToggleLocked: () => _toggleLocked(layers[i].id),
                  onRemove: () => _remove(layers[i].id),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 12),
        const WashStackClassLabel(
          'list + list-row · checkbox-style toggles via icons · range range-xs range-primary',
        ),
      ],
    );
  }
}

class _LayerRow extends StatelessWidget {
  const _LayerRow({
    required this.layer,
    required this.onOpacity,
    required this.onToggleVisible,
    required this.onToggleLocked,
    required this.onRemove,
  });

  final WashPigmentLayer layer;
  final ValueChanged<double> onOpacity;
  final VoidCallback onToggleVisible;
  final VoidCallback onToggleLocked;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = washLayerSwatchColor(context, layer.swatch);
    final rowOpacity = layer.visible ? 1.0 : 0.5;
    final mutedIcon = tokens.inkMuted;
    final grip = WashTooltip(
      message: 'Reorder',
      prefer: WashTooltipSide.right,
      child: WashButton(
        size: WashButtonSize.xs,
        variant: WashButtonVariant.ghost,
        square: true,
        onPressed: () {},
        child: WashLucideIcon(
          'grip-vertical',
          size: 16,
          color: mutedIcon,
        ),
      ),
    );
    final swatch = Opacity(
      opacity: layer.opacity / 100,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: fill,
          borderRadius: BorderRadius.circular(tokens.radiusBox),
          border: Border.all(color: tokens.inkBorder),
        ),
      ),
    );
    final info = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Flexible(
              child: Text(
                layer.name,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontWeight: FontWeight.w500,
                  color: tokens.onSurface,
                ),
              ),
            ),
            if (layer.locked) ...[
              const SizedBox(width: 8),
              const WashBadge(
                'Locked',
                size: WashBadgeSize.sm,
                style: WashBadgeStyle.ghost,
              ),
            ],
          ],
        ),
        const SizedBox(height: 8),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 320),
          child: Row(
            children: [
              Expanded(
                child: WashSlider(
                  value: layer.opacity.toDouble(),
                  min: 0,
                  max: 100,
                  onChanged: layer.locked ? null : onOpacity,
                ),
              ),
              const SizedBox(width: 12),
              SizedBox(
                width: 40,
                child: Text(
                  '${layer.opacity}%',
                  textAlign: TextAlign.right,
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontFamily: 'monospace',
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
    final controls = <Widget>[
      // btn-ghost btn-primary / secondary / error (icon tinted)
      WashTooltip(
        message: layer.visible ? 'Hide' : 'Show',
        prefer: WashTooltipSide.right,
        child: WashButton(
          size: WashButtonSize.sm,
          variant: WashButtonVariant.ghost,
          square: true,
          enabled: !layer.locked,
          onPressed: onToggleVisible,
          child: WashLucideIcon(
            layer.visible ? 'eye' : 'eye-off',
            size: 16,
            color: tokens.primary,
          ),
        ),
      ),
      WashTooltip(
        message: layer.locked ? 'Unlock' : 'Lock',
        prefer: WashTooltipSide.right,
        child: WashButton(
          size: WashButtonSize.sm,
          variant: WashButtonVariant.ghost,
          square: true,
          onPressed: onToggleLocked,
          child: WashLucideIcon(
            layer.locked ? 'lock' : 'unlock',
            size: 16,
            color: tokens.palette.secondary,
          ),
        ),
      ),
      WashTooltip(
        message: 'Delete',
        prefer: WashTooltipSide.right,
        child: WashButton(
          size: WashButtonSize.sm,
          variant: WashButtonVariant.ghost,
          square: true,
          enabled: !layer.locked,
          onPressed: onRemove,
          child: WashLucideIcon(
            'trash-2',
            size: 16,
            color: tokens.error,
          ),
        ),
      ),
    ];
    return Opacity(
      opacity: rowOpacity,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
        child: LayoutBuilder(
          builder: (context, constraints) {
            final leading = Row(
              children: [
                grip,
                const SizedBox(width: 8),
                swatch,
                const SizedBox(width: 8),
                Expanded(child: info),
              ],
            );
            if (constraints.maxWidth < 420) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisSize: MainAxisSize.min,
                children: [
                  leading,
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: controls,
                  ),
                ],
              );
            }
            return Row(
              children: [
                grip,
                const SizedBox(width: 8),
                swatch,
                const SizedBox(width: 8),
                Expanded(child: info),
                const SizedBox(width: 2),
                ...controls,
              ],
            );
          },
        ),
      ),
    );
  }
}

/// Live composite stack from visible pigment layers.
class WashLayersCompositePlate extends StatelessWidget {
  const WashLayersCompositePlate({
    required this.layers,
    super.key,
  });

  final List<WashPigmentLayer> layers;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final visible = layers.where((l) => l.visible).toList();
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 640;
        final stack = WashStack(
          width: 192,
          height: 144,
          children: [
            for (final layer in visible)
              Opacity(
                opacity: layer.opacity / 100,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: washLayerSwatchColor(context, layer.swatch),
                    borderRadius: BorderRadius.circular(tokens.radiusBox),
                    border: Border.all(color: tokens.inkBorder),
                    boxShadow: washPaperShadowSm(tokens),
                  ),
                ),
              ),
          ],
        );
        final copy = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Composite plate',
              style: WashTypography.title(tokens.onSurface).copyWith(
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Toggle visibility or drag opacity on the wash desk. Locked layers stay put until unlocked.',
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            ),
            const WashStackClassLabel('stack (live wash preview)'),
          ],
        );
        if (wide) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              stack,
              const SizedBox(width: 48),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 320),
                child: copy,
              ),
            ],
          );
        }
        return Column(
          children: [
            stack,
            const SizedBox(height: 16),
            copy,
          ],
        );
      },
    );
  }
}
