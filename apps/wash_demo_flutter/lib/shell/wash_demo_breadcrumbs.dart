import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

/// Website breadcrumb bar: 53px strip under the navbar, constrained to the
/// same 1320px content column as `wash-shell-main`.
class WashDemoBreadcrumbs extends StatelessWidget {
  const WashDemoBreadcrumbs({
    required this.pageLabel,
    required this.onOverview,
    super.key,
  });

  final String pageLabel;
  final VoidCallback onOverview;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final style = WashTypography.body(tokens.onSurface.withValues(alpha: 0.8))
        .copyWith(fontSize: 14, fontWeight: FontWeight.w400, height: 1.5);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.6),
        border: Border(
          bottom: BorderSide(color: tokens.inkBorder.withValues(alpha: 0.6)),
        ),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1320),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            child: Row(
              children: [
                GestureDetector(
                  onTap: onOverview,
                  behavior: HitTestBehavior.opaque,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      WashIcon(
                        WashIconGlyph.home,
                        size: 14,
                        color: tokens.onSurface.withValues(alpha: 0.8),
                      ),
                      const SizedBox(width: 6),
                      Text('Menzies Design', style: style),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  child: WashIcon(
                    WashIconGlyph.chevronRight,
                    size: 14,
                    color: tokens.onSurface.withValues(alpha: 0.5),
                  ),
                ),
                Flexible(
                  child: Text(
                    pageLabel,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: style.copyWith(color: tokens.onSurface),
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
