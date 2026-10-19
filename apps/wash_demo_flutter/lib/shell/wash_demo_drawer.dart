import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import '../gallery/gallery_manifest.dart';
import 'wash_demo_nav.dart';

class WashDemoDrawer extends StatelessWidget {
  const WashDemoDrawer({
    required this.selectedId,
    required this.query,
    required this.onSelect,
    super.key,
  });

  final String selectedId;
  final String query;
  final ValueChanged<String> onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final q = query.trim().toLowerCase();

    return ColoredBox(
      color: tokens.surfaceContainer,
      child: ListView(
        padding: const EdgeInsets.symmetric(vertical: 12),
        children: [
          for (final group in kWashDemoNavGroups) ...[
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
              child: Text(group.label, style: WashTypography.label(tokens.inkMuted)),
            ),
            ...kGalleryEntries.where((e) {
              if (e.section != group.section) return false;
              if (q.isEmpty) return true;
              return e.label.toLowerCase().contains(q) || e.id.contains(q);
            }).map(
              (e) => WashListTile(
                title: Text(e.label),
                selected: e.id == selectedId,
                onTap: () => onSelect(e.id),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
