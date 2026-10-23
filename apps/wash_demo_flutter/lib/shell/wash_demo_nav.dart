part 'wash_demo_nav.g.dart';

/// One leaf entry in the demo sidebar. Mirrors a web `NavItem`.
class WashDemoNavItem {
  const WashDemoNavItem({
    required this.id,
    required this.label,
    required this.icon,
  });

  final String id;
  final String label;

  /// Kebab-case Lucide icon name, e.g. `layout-dashboard`.
  final String icon;
}

/// A titled group inside a sidebar group (`menu-title`, used by Templates).
class WashDemoNavSection {
  const WashDemoNavSection({required this.label, required this.items});

  final String label;
  final List<WashDemoNavItem> items;
}

/// Sidebar groups in the same order as the website demo.
enum WashDemoNavGroupKind {
  docs,
  assets,
  icons,
  charts,
  lsp,
  components,
  behaviour,
  templates,
  store,
}

class WashDemoNavGroup {
  const WashDemoNavGroup({
    required this.kind,
    required this.label,
    required this.icon,
    this.items = const [],
    this.sections = const [],
    this.requiresPurchase = false,
  });

  final WashDemoNavGroupKind kind;
  final String label;
  final String icon;
  final List<WashDemoNavItem> items;
  final List<WashDemoNavSection> sections;

  /// Store group shows the amber crown affordance on its summary and items.
  final bool requiresPurchase;

  String get id => kind.name;

  Iterable<WashDemoNavItem> get allItems sync* {
    yield* items;
    for (final section in sections) {
      yield* section.items;
    }
  }

  bool containsPage(String pageId) {
    return allItems.any((item) => item.id == pageId);
  }

  /// True when [pageId] belongs in this group, including pages that are not
  /// listed as leaves (for example the per-stack `docs-start-*` guides).
  bool ownsPage(String pageId) {
    return switch (kind) {
      WashDemoNavGroupKind.docs =>
        pageId.startsWith('docs-') || pageId == 'support',
      WashDemoNavGroupKind.assets => pageId.startsWith('assets-'),
      WashDemoNavGroupKind.icons => pageId.startsWith('icons-'),
      WashDemoNavGroupKind.charts => pageId.startsWith('charts-'),
      WashDemoNavGroupKind.lsp => pageId.startsWith('lsp-'),
      WashDemoNavGroupKind.behaviour => pageId.startsWith('behaviour-'),
      WashDemoNavGroupKind.store => pageId.startsWith('store-'),
      WashDemoNavGroupKind.templates => containsPage(pageId),
      WashDemoNavGroupKind.components => containsPage(pageId),
    };
  }
}

/// Overview is a standalone top-level row in the web sidebar.
const WashDemoNavItem kWashDemoOverviewItem = WashDemoNavItem(
  id: 'overview',
  label: 'Overview',
  icon: 'layout-dashboard',
);

/// Generated from `apps/demo/src/nav.ts` by
/// `tool/generate_gallery_manifest.dart`.
final List<WashDemoNavGroup> kWashDemoSidebarGroups =
    buildGeneratedSidebarGroups();

WashDemoNavGroup? washDemoGroupForPage(String pageId) {
  if (pageId == kWashDemoOverviewItem.id) return null;
  for (final group in kWashDemoSidebarGroups) {
    if (group.ownsPage(pageId)) return group;
  }
  return null;
}
