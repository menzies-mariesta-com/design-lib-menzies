import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/join/wash_join.dart';
import '../../components/org_chart/wash_org_chart.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashOrgChartGalleryPage extends StatelessWidget {
  const WashOrgChartGalleryPage({super.key});

  static const basicTree = WashOrgNode(
    id: 'root',
    name: 'Studio',
    children: [
      WashOrgNode(id: 'a', name: 'Sketch'),
      WashOrgNode(id: 'b', name: 'Wash'),
      WashOrgNode(id: 'c', name: 'Glaze'),
    ],
  );

  static const directionTree = WashOrgNode(
    id: 'v-root',
    name: 'Director',
    children: [
      WashOrgNode(id: 'v-a', name: 'Color lead'),
      WashOrgNode(id: 'v-b', name: 'Critique host'),
    ],
  );

  static const menziesTree = WashOrgNode(
    id: 'director',
    name: 'Mira Kline',
    role: 'Director',
    initials: 'MK',
    wash: WashOrgWashTint.blue,
    children: [
      WashOrgNode(
        id: 'color-lead',
        name: 'Jonah Reed',
        role: 'Color lead',
        initials: 'JR',
        wash: WashOrgWashTint.ochre,
        children: [
          WashOrgNode(
            id: 'wash-tech',
            name: 'Ava Chen',
            role: 'Wash tech',
            initials: 'AC',
            wash: WashOrgWashTint.rose,
          ),
        ],
      ),
      WashOrgNode(
        id: 'critique-host',
        name: 'Ellis Park',
        role: 'Critique host',
        initials: 'EP',
        wash: WashOrgWashTint.secondary,
      ),
    ],
  );

  static const densityTree = WashOrgNode(
    id: 'desk',
    name: 'Pigment desk',
    role: 'Lead',
    initials: 'PD',
    wash: WashOrgWashTint.blue,
    children: [
      WashOrgNode(
        id: 'series',
        name: 'Series A',
        role: 'Plate lead',
        initials: 'SA',
        wash: WashOrgWashTint.ochre,
        children: [
          WashOrgNode(
            id: 'p1',
            name: 'Plate 1',
            role: 'Artist',
            initials: 'P1',
            wash: WashOrgWashTint.rose,
          ),
          WashOrgNode(
            id: 'p2',
            name: 'Plate 2',
            role: 'Artist',
            initials: 'P2',
            wash: WashOrgWashTint.rose,
          ),
        ],
      ),
      WashOrgNode(
        id: 'series-b',
        name: 'Series B',
        role: 'Plate lead',
        initials: 'SB',
        wash: WashOrgWashTint.secondary,
        children: [
          WashOrgNode(
            id: 'p3',
            name: 'Plate 3',
            role: 'Artist',
            initials: 'P3',
            wash: WashOrgWashTint.blue,
          ),
        ],
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'Org chart',
      description:
          'Pure CSS hierarchy trees with daisyUI card and avatar.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Basic tree',
          description: 'Root to children with border connectors',
          child: WashShowcaseTabs(
            preview: const WashOrgChart(root: basicTree),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Direction',
          title: 'Horizontal and vertical',
          description:
              'Same Menzies Design branch rendered top-down and left-to-right',
          tint: WashGalleryPanelTint.blue,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashShowcaseTabs(
                preview: const WashOrgChart(root: directionTree),
                dartSource: _verticalDart,
              ),
              const SizedBox(height: 32),
              WashShowcaseTabs(
                preview: const WashOrgChart(
                  root: directionTree,
                  direction: WashOrgDirection.horizontal,
                ),
                dartSource: _horizontalDart,
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Roles',
          title: 'Avatars and roles',
          description:
              'Menzies Design studio: Director, Color lead, Wash tech',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: const WashOrgChart(root: menziesTree),
            dartSource: _rolesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Interactive',
          title: 'Select a node',
          description:
              'Click a card to highlight descendants and open a detail panel',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: const _InteractiveOrg(),
            dartSource: _interactiveDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Density',
          title: 'Compact and expanded',
          description:
              'Toggle padding and type size while keeping connectors readable',
          child: WashShowcaseTabs(
            preview: const _DensityToggle(),
            dartSource: _densityDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Responsive',
          title: 'Narrow viewport scroll',
          description: 'Trees keep natural width',
          tint: WashGalleryPanelTint.blue,
          child: WashShowcaseTabs(
            preview: Builder(
              builder: (context) {
                final tokens = WashTokens.of(context);
                return Align(
                  alignment: Alignment.centerLeft,
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 320),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: tokens.palette.base100.withValues(alpha: 0.5),
                        borderRadius:
                            BorderRadius.circular(tokens.radiusBox),
                        border: Border.all(
                          color: tokens.inkBorder.withValues(alpha: 0.6),
                        ),
                      ),
                      child: const WashOrgChart(
                        root: menziesTree,
                        density: WashOrgDensity.compact,
                      ),
                    ),
                  ),
                );
              },
            ),
            dartSource: _responsiveDart,
          ),
        ),
      ],
    );
  }

  static const _basicDart =
      "WashOrgChart(root: WashOrgNode(name: 'Studio', children: …))";
  static const _verticalDart =
      'WashOrgChart(direction: vertical)';
  static const _horizontalDart =
      'WashOrgChart(direction: horizontal)';
  static const _rolesDart =
      'WashOrgNode(initials, role, wash) + WashOrgChart';
  static const _interactiveDart =
      'selectedId + highlightIds + onSelect detail panel';
  static const _densityDart =
      'WashOrgDensity.compact | expanded';
  static const _responsiveDart =
      'max-w-xs frame + WashOrgChart(density: compact)';
}

class _InteractiveOrg extends StatefulWidget {
  const _InteractiveOrg();

  @override
  State<_InteractiveOrg> createState() => _InteractiveOrgState();
}

class _InteractiveOrgState extends State<_InteractiveOrg> {
  String _selectedId = 'director';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final selected =
        WashOrgChartGalleryPage.menziesTree.findById(_selectedId);
    final highlightIds = selected?.collectDescendantIds() ?? <String>{};
    final descendantCount = (highlightIds.length - 1).clamp(0, 999);

    final tree = WashOrgChart(
      root: WashOrgChartGalleryPage.menziesTree,
      selectedId: _selectedId,
      highlightIds: highlightIds,
      onSelect: (id) => setState(() => _selectedId = id),
    );

    final aside = Container(
      width: double.infinity,
      constraints: const BoxConstraints(maxWidth: 320),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFC4A574).withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: selected == null
          ? Text(
              'Select a node to inspect.',
              style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
            )
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Selected',
                  style: WashTypography.label(tokens.inkMuted),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: washOrgTintColor(tokens, selected.wash),
                        shape: BoxShape.circle,
                      ),
                      child: Text(
                        selected.initials ??
                            selected.name.substring(
                              0,
                              selected.name.length.clamp(0, 2),
                            ),
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            selected.name,
                            style: WashTypography.body(tokens.onSurface)
                                .copyWith(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          if (selected.role != null)
                            Text(
                              selected.role!,
                              style: WashTypography.body(tokens.inkMuted)
                                  .copyWith(fontSize: 14),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  'Highlight covers this node and $descendantCount '
                  'descendant${descendantCount == 1 ? '' : 's'}.',
                  style: WashTypography.body(tokens.inkMuted)
                      .copyWith(fontSize: 14),
                ),
                const SizedBox(height: 8),
                Text(
                  'card + avatar + ring-primary',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontFamily: 'monospace',
                    fontSize: 10.4,
                  ),
                ),
              ],
            ),
    );

    return LayoutBuilder(
      builder: (context, constraints) {
        final row = constraints.maxWidth >= 1024;
        if (row) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: tree),
              const SizedBox(width: 20),
              aside,
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            tree,
            const SizedBox(height: 20),
            aside,
          ],
        );
      },
    );
  }
}

class _DensityToggle extends StatefulWidget {
  const _DensityToggle();

  @override
  State<_DensityToggle> createState() => _DensityToggleState();
}

class _DensityToggleState extends State<_DensityToggle> {
  WashOrgDensity _density = WashOrgDensity.expanded;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashJoin(
          children: [
            WashButton(
              label: 'Compact',
              size: WashButtonSize.sm,
              joinItem: true,
              variant: _density == WashOrgDensity.compact
                  ? WashButtonVariant.primary
                  : WashButtonVariant.ghost,
              onPressed: () =>
                  setState(() => _density = WashOrgDensity.compact),
            ),
            WashButton(
              label: 'Expanded',
              size: WashButtonSize.sm,
              joinItem: true,
              variant: _density == WashOrgDensity.expanded
                  ? WashButtonVariant.primary
                  : WashButtonVariant.ghost,
              onPressed: () =>
                  setState(() => _density = WashOrgDensity.expanded),
            ),
          ],
        ),
        const SizedBox(height: 16),
        WashOrgChart(
          root: WashOrgChartGalleryPage.densityTree,
          density: _density,
        ),
        const SizedBox(height: 12),
        Text(
          _density == WashOrgDensity.compact
              ? 'org-tree compact (p-2, text-xs)'
              : 'org-tree expanded (p-3, text-sm)',
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontFamily: 'monospace',
            fontSize: 10.4,
          ),
        ),
      ],
    );
  }
}
