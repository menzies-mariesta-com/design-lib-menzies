// ignore_for_file: avoid_print
import 'dart:io';

/// Generates Flutter gallery + sidebar metadata from the web demo nav.ts.
void main() {
  final repoRoot = _repoRoot();
  final navPath = '$repoRoot/apps/demo/src/nav.ts';
  final manifestPath =
      '$repoRoot/apps/wash_demo_flutter/lib/gallery/gallery_manifest.g.dart';
  final navOutPath =
      '$repoRoot/apps/wash_demo_flutter/lib/shell/wash_demo_nav.g.dart';
  final idsPath =
      '$repoRoot/packages/menzies_design_wash_ui/lib/src/gallery/wash_gallery_page_ids.g.dart';

  final navSource = File(navPath).readAsStringSync();
  final pages = <String>{};

  final pageRe = RegExp(r"page:\s*'([^']+)'");
  for (final m in pageRe.allMatches(navSource)) {
    pages.add(m.group(1)!);
  }
  pages.add('overview');
  pages.add('support');

  final assets = _parseNavItems(navSource, 'assetsNav');
  final icons = _parseNavItems(navSource, 'iconsNav');
  final store = _parseNavItems(navSource, 'storeNav');
  final behaviour = _parseNavItems(navSource, 'behaviourNav');
  final charts = _parseNavItems(navSource, 'chartsNav');
  final navItems = _parseNavItems(navSource, 'nav');
  final lsp = _lspItems();

  final allById = <String, _NavItem>{};
  for (final item in [
    ...navItems,
    ...assets,
    ...icons,
    ...store,
    ...behaviour,
    ...charts,
    ...lsp,
  ]) {
    allById[item.id] = item;
    pages.add(item.id);
  }

  final sorted = pages.toList()..sort();
  _writeManifest(manifestPath, sorted, allById);
  _writeSidebarNav(
    navOutPath,
    assets: assets,
    icons: icons,
    store: store,
    behaviour: behaviour,
    charts: charts,
    allById: allById,
    lsp: lsp,
  );
  _writePageIds(idsPath, sorted);

  print(
    'Wrote ${sorted.length} page ids to $manifestPath, $navOutPath and $idsPath',
  );
}

class _NavItem {
  const _NavItem({required this.id, required this.label, required this.icon});

  final String id;
  final String label;
  final String icon;
}

List<_NavItem> _parseNavItems(String source, String arrayName) {
  final body = _arrayBody(source, arrayName);
  final items = <_NavItem>[];
  final objectRe = RegExp(r'\{([^{}]*?)\}', dotAll: true);
  for (final match in objectRe.allMatches(body)) {
    final block = match.group(1)!;
    if (!block.contains('page:')) continue;

    final page = _stringField(block, 'page');
    if (page == null) continue;

    items.add(
      _NavItem(
        id: _stringField(block, 'id') ?? page,
        label: _stringField(block, 'label') ?? _labelFor(page),
        icon: _iconField(block) ?? 'file-text',
      ),
    );
  }
  return items;
}

String _arrayBody(String source, String arrayName) {
  final marker = 'export const $arrayName';
  final markerAt = source.indexOf(marker);
  if (markerAt < 0) return '';

  final equalsAt = source.indexOf('=', markerAt);
  if (equalsAt < 0) return '';
  final openAt = source.indexOf('[', equalsAt);
  if (openAt < 0) return '';

  var depth = 0;
  var quote = '';
  var escaped = false;
  for (var i = openAt; i < source.length; i++) {
    final char = source[i];
    if (quote.isNotEmpty) {
      if (escaped) {
        escaped = false;
      } else if (char == r'\') {
        escaped = true;
      } else if (char == quote) {
        quote = '';
      }
      continue;
    }
    if (char == "'" || char == '"' || char == '`') {
      quote = char;
      continue;
    }
    if (char == '[') depth++;
    if (char == ']') {
      depth--;
      if (depth == 0) {
        return source.substring(openAt + 1, i);
      }
    }
  }
  return '';
}

String? _stringField(String block, String field) {
  final match = RegExp("$field:\\s*'([^']*)'").firstMatch(block);
  return match?.group(1);
}

String? _iconField(String block) {
  final match = RegExp(r'icon:\s*([A-Za-z_][A-Za-z0-9_]*)').firstMatch(block);
  final name = match?.group(1);
  return name == null ? null : _kebabIcon(name);
}

/// PascalCase Lucide component name -> kebab-case SVG id.
///
/// Inserts breaks before capitals and digit runs:
/// `LayoutDashboard` -> `layout-dashboard`, `Settings2` -> `settings-2`,
/// `QrCode` -> `qr-code`.
String _kebabIcon(String name) {
  final withBreaks = name
      .replaceAllMapped(
        RegExp(r'(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])'),
        (_) => '-',
      )
      .replaceAllMapped(RegExp(r'(?<=[A-Za-z])(?=[0-9])'), (_) => '-');
  final kebab = withBreaks.toLowerCase();
  // Lucide's `Grid2x2` id keeps `2x2` together as one token.
  return kebab == 'grid-2x-2' ? 'grid-2x2' : kebab;
}

List<_NavItem> _lspItems() {
  const packs = [
    ('typescript', 'TypeScript', 'file-code'),
    ('javascript', 'JavaScript', 'file-code'),
    ('json', 'JSON', 'file-json'),
    ('css', 'CSS', 'braces'),
    ('html', 'HTML', 'file-code'),
    ('markdown', 'Markdown', 'file-text'),
    ('plaintext', 'Plain text', 'file-text'),
    ('yaml', 'YAML', 'file-code'),
    ('toml', 'TOML', 'file-code'),
    ('xml', 'XML', 'file-code'),
    ('sql', 'SQL', 'database'),
    ('graphql', 'GraphQL', 'share-2'),
    ('shell', 'Shell', 'terminal'),
    ('python', 'Python', 'file-code'),
    ('go', 'Go', 'file-code'),
    ('rust', 'Rust', 'file-code'),
    ('java', 'Java', 'file-code'),
    ('c', 'C', 'file-code'),
    ('cpp', 'C++', 'file-code'),
    ('kotlin', 'Kotlin', 'file-code'),
    ('svelte', 'Svelte', 'file-code'),
    ('vue', 'Vue', 'file-code'),
  ];

  return [
    for (final (id, label, icon) in packs)
      _NavItem(id: 'lsp-$id', label: label, icon: icon),
  ];
}

int _byLabel(_NavItem a, _NavItem b) {
  return a.label.toLowerCase().compareTo(b.label.toLowerCase());
}

void _writeManifest(
  String path,
  List<String> sorted,
  Map<String, _NavItem> allById,
) {
  final buffer = StringBuffer();
  buffer.writeln('// GENERATED by tool/generate_gallery_manifest.dart');
  buffer.writeln();
  buffer.writeln("import 'gallery_manifest.dart';");
  buffer.writeln();
  buffer.writeln(
    '/// All gallery route ids (${sorted.length} pages, web nav parity).',
  );
  buffer.writeln('const List<String> kAllGalleryPageIds = [');
  for (final id in sorted) {
    buffer.writeln('  ${_dartString(id)},');
  }
  buffer.writeln('];');
  buffer.writeln();
  buffer.writeln('GallerySection _sectionFor(String id) {');
  buffer.writeln('  if (id == "overview") return GallerySection.overview;');
  buffer.writeln(
    '  if (id.startsWith("charts-")) return GallerySection.charts;',
  );
  buffer.writeln('  if (id.startsWith("template-") ||');
  buffer.writeln('      id == "auth-screen" ||');
  buffer.writeln('      id == "auth-2fa" ||');
  buffer.writeln('      id == "auth-otp" ||');
  buffer.writeln('      id == "forgot-password" ||');
  buffer.writeln('      id == "data-table" ||');
  buffer.writeln('      id == "calendar") {');
  buffer.writeln('    return GallerySection.templates;');
  buffer.writeln('  }');
  buffer.writeln(
    '  if (id.startsWith("behaviour-")) return GallerySection.behaviours;',
  );
  buffer.writeln(
    '  if (id.startsWith("assets-")) return GallerySection.assets;',
  );
  buffer.writeln('  if (id.startsWith("icons-")) return GallerySection.icons;');
  buffer.writeln('  if (id.startsWith("docs-")) return GallerySection.docs;');
  buffer.writeln('  if (id.startsWith("store-")) return GallerySection.store;');
  buffer.writeln('  if (id == "support") return GallerySection.docs;');
  buffer.writeln(
    '  if (id.startsWith("lsp-")) return GallerySection.components;',
  );
  buffer.writeln('  return GallerySection.components;');
  buffer.writeln('}');
  buffer.writeln();
  buffer.writeln('String _fallbackLabel(String id) {');
  buffer.writeln(
    "  final words = id.replaceFirst(RegExp(r'^lsp-'), '').split('-');",
  );
  buffer.writeln('  return words');
  buffer.writeln('      .where((word) => word.isNotEmpty)');
  buffer.writeln(
    '      .map((word) => word[0].toUpperCase() + word.substring(1))',
  );
  buffer.writeln("      .join(' ');");
  buffer.writeln('}');
  buffer.writeln();
  buffer.writeln('List<GalleryEntry> buildGeneratedGalleryEntries() {');
  buffer.writeln('  const labels = <String, String>{');
  for (final id in sorted) {
    final item = allById[id];
    if (item != null) {
      buffer.writeln('    ${_dartString(id)}: ${_dartString(item.label)},');
    }
  }
  buffer.writeln('  };');
  buffer.writeln('  const icons = <String, String>{');
  for (final id in sorted) {
    final item = allById[id];
    if (item != null) {
      buffer.writeln('    ${_dartString(id)}: ${_dartString(item.icon)},');
    }
  }
  buffer.writeln('  };');
  buffer.writeln('  return kAllGalleryPageIds');
  buffer.writeln('      .map(');
  buffer.writeln('        (id) => GalleryEntry(');
  buffer.writeln('          id: id,');
  buffer.writeln('          label: labels[id] ?? _fallbackLabel(id),');
  buffer.writeln("          icon: icons[id] ?? 'file-text',");
  buffer.writeln('          section: _sectionFor(id),');
  buffer.writeln('        ),');
  buffer.writeln('      )');
  buffer.writeln('      .toList();');
  buffer.writeln('}');

  File(path).writeAsStringSync(buffer.toString());
}

void _writeSidebarNav(
  String path, {
  required List<_NavItem> assets,
  required List<_NavItem> icons,
  required List<_NavItem> store,
  required List<_NavItem> behaviour,
  required List<_NavItem> charts,
  required Map<String, _NavItem> allById,
  required List<_NavItem> lsp,
}) {
  final all = allById.values.toList();

  const templateIds = {
    'auth-screen',
    'auth-2fa',
    'forgot-password',
    'auth-otp',
    'template-checkout',
    'template-payment',
    'template-terminal-logging',
    'template-rich-text',
    'template-code-editor',
    'template-file-tree',
    'template-docs-layout',
    'template-dialog',
    'data-table',
    'calendar',
  };

  final docs =
      all
          .where(
            (item) =>
                (item.id.startsWith('docs-') || item.id == 'support') &&
                !(item.id.startsWith('docs-start-') && item.id != 'docs-start'),
          )
          .toList()
        ..sort(_byLabel);

  final components =
      all
          .where(
            (item) =>
                item.id != 'overview' &&
                item.id != 'support' &&
                !item.id.startsWith('assets-') &&
                !item.id.startsWith('icons-') &&
                !item.id.startsWith('charts-') &&
                !item.id.startsWith('docs-') &&
                !item.id.startsWith('store-') &&
                !item.id.startsWith('behaviour-') &&
                !item.id.startsWith('lsp-') &&
                !templateIds.contains(item.id),
          )
          .toList()
        ..sort(_byLabel);

  final templates = all.where((item) => templateIds.contains(item.id)).toList()
    ..sort(_byLabel);

  List<_NavItem> templateGroup(Set<String> ids) {
    return templates.where((item) => ids.contains(item.id)).toList();
  }

  final templateSections = <String, List<_NavItem>>{
    'Auth': templateGroup({
      'auth-screen',
      'auth-2fa',
      'forgot-password',
      'auth-otp',
    }),
    'Commerce': templateGroup({'template-checkout', 'template-payment'}),
    'Data': templateGroup({'data-table', 'calendar'}),
    'Studio': templateGroup({
      'template-terminal-logging',
      'template-rich-text',
      'template-code-editor',
      'template-file-tree',
    }),
    'Layout': templateGroup({'template-docs-layout', 'template-dialog'}),
  };

  final buffer = StringBuffer();
  buffer.writeln('// GENERATED by tool/generate_gallery_manifest.dart');
  buffer.writeln();
  buffer.writeln("part of 'wash_demo_nav.dart';");
  buffer.writeln();
  buffer.writeln('List<WashDemoNavGroup> buildGeneratedSidebarGroups() {');
  buffer.writeln('  return const [');

  void group(
    String kind,
    String label,
    String icon, {
    List<_NavItem> items = const [],
    Map<String, List<_NavItem>> sections = const {},
    bool requiresPurchase = false,
  }) {
    buffer.writeln('    WashDemoNavGroup(');
    buffer.writeln('      kind: WashDemoNavGroupKind.$kind,');
    buffer.writeln('      label: ${_dartString(label)},');
    buffer.writeln('      icon: ${_dartString(icon)},');
    if (requiresPurchase) {
      buffer.writeln('      requiresPurchase: true,');
    }
    if (items.isNotEmpty) {
      buffer.writeln('      items: [');
      for (final item in items) {
        _writeNavItem(buffer, item);
      }
      buffer.writeln('      ],');
    }
    if (sections.isNotEmpty) {
      buffer.writeln('      sections: [');
      for (final entry in sections.entries) {
        buffer.writeln('        WashDemoNavSection(');
        buffer.writeln('          label: ${_dartString(entry.key)},');
        buffer.writeln('          items: [');
        for (final item in entry.value) {
          _writeNavItem(buffer, item, indent: '            ');
        }
        buffer.writeln('          ],');
        buffer.writeln('        ),');
      }
      buffer.writeln('      ],');
    }
    buffer.writeln('    ),');
  }

  group('docs', 'Docs', 'book-open', items: docs);
  group('assets', 'Assets', 'images', items: assets);
  group('icons', 'Icons', 'shapes', items: icons);
  group('charts', 'Charts', 'chart-line', items: charts);
  group('lsp', 'LSP', 'code', items: lsp);
  group('components', 'Components', 'square-stack', items: components);
  group('behaviour', 'Behaviour', 'mouse-pointer-click', items: behaviour);
  group('templates', 'Templates', 'folder-open', sections: templateSections);
  group('store', 'Store', 'store', items: store, requiresPurchase: true);

  buffer.writeln('  ];');
  buffer.writeln('}');

  File(path).writeAsStringSync(buffer.toString());
}

void _writeNavItem(
  StringBuffer buffer,
  _NavItem item, {
  String indent = '        ',
}) {
  buffer.writeln('${indent}WashDemoNavItem(');
  buffer.writeln('${indent}  id: ${_dartString(item.id)},');
  buffer.writeln('${indent}  label: ${_dartString(item.label)},');
  buffer.writeln('${indent}  icon: ${_dartString(item.icon)},');
  buffer.writeln('$indent),');
}

void _writePageIds(String path, List<String> sorted) {
  final idsBuf = StringBuffer();
  idsBuf.writeln('// GENERATED by tool/generate_gallery_manifest.dart');
  idsBuf.writeln('const List<String> kWashGalleryPageIds = [');
  for (final id in sorted) {
    idsBuf.writeln('  ${_dartString(id)},');
  }
  idsBuf.writeln('];');
  File(path).parent.createSync(recursive: true);
  File(path).writeAsStringSync(idsBuf.toString());
}

String _labelFor(String id) {
  return id.replaceFirst(RegExp(r'^lsp-'), '').replaceAll('-', ' ');
}

String _dartString(String value) {
  return "'${value.replaceAll(r'\', r'\\').replaceAll("'", r"\'").replaceAll(r'$', r'\$')}'";
}

String _repoRoot() {
  var dir = Directory.current;
  while (true) {
    if (File('${dir.path}/package.json').existsSync()) return dir.path;
    final parent = dir.parent;
    if (parent.path == dir.path) return Directory.current.path;
    dir = parent;
  }
}
