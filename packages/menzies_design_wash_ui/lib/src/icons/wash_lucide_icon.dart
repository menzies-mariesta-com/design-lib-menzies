import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'wash_lucide_icon_names.g.dart';

const String _kWashUiPackage = 'menzies_design_wash_ui';

/// Lucide stroke icon by kebab-case name (matches web `DynamicIcon` / `iconNames`).
///
/// Set [lab] to true for icons from Lucide Lab (`washLucideLabIconNames`).
class WashLucideIcon extends StatelessWidget {
  const WashLucideIcon(
    this.name, {
    super.key,
    this.size = 24,
    this.color,
    this.strokeWidth,
    this.lab = false,
    this.semanticLabel,
  });

  /// Kebab-case icon id, e.g. `heart`, `circle-check`.
  final String name;
  final double size;
  final Color? color;
  final double? strokeWidth;
  final bool lab;
  final String? semanticLabel;

  static String assetPathFor(String name, {bool lab = false}) {
    final segment = lab ? 'lucide-lab' : 'lucide';
    return 'assets/icons/$segment/$name.svg';
  }

  static bool isKnownName(String name, {bool lab = false}) {
    if (lab) {
      return washLucideLabIconNameSet.contains(name);
    }
    return washLucideIconNameSet.contains(name);
  }

  @override
  Widget build(BuildContext context) {
    final known = isKnownName(name, lab: lab);
    if (!known) {
      return SizedBox(width: size, height: size);
    }

    final path = assetPathFor(name, lab: lab);
    final resolvedColor = color ?? IconTheme.of(context).color;
    final icon = SvgPicture.asset(
      path,
      package: _kWashUiPackage,
      width: size,
      height: size,
      semanticsLabel: semanticLabel,
      colorFilter: resolvedColor == null
          ? null
          : ColorFilter.mode(resolvedColor, BlendMode.srcIn),
    );

    if (strokeWidth == null) {
      return icon;
    }

    // Lucide SVGs use stroke-width="2" in the file; scale viewBox when needed.
    return SizedBox(
      width: size,
      height: size,
      child: FittedBox(
        fit: BoxFit.contain,
        child: SizedBox(
          width: 24 * (strokeWidth! / 2),
          height: 24 * (strokeWidth! / 2),
          child: icon,
        ),
      ),
    );
  }
}
