import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

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
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
      child: Row(
        children: [
          GestureDetector(
            onTap: onOverview,
            child: Text(
              'Overview',
              style: WashTypography.label(tokens.primary),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Text('/', style: WashTypography.label(tokens.inkMuted)),
          ),
          Text(pageLabel, style: WashTypography.label(tokens.onSurface)),
        ],
      ),
    );
  }
}
