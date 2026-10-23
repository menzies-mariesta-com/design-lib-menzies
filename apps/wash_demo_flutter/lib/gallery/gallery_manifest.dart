import 'gallery_manifest.g.dart';

class GalleryEntry {
  const GalleryEntry({
    required this.id,
    required this.label,
    required this.section,
    required this.icon,
  });

  final String id;
  final String label;
  final GallerySection section;

  /// Kebab-case Lucide icon name, matching the web demo nav.
  final String icon;
}

enum GallerySection {
  overview,
  components,
  charts,
  templates,
  behaviours,
  assets,
  icons,
  docs,
  store,
}

/// Full web nav parity (generated from apps/demo/src/nav.ts).
final List<GalleryEntry> kGalleryEntries = buildGeneratedGalleryEntries();
