import 'gallery_manifest.g.dart';

class GalleryEntry {
  const GalleryEntry({
    required this.id,
    required this.label,
    required this.section,
  });

  final String id;
  final String label;
  final GallerySection section;
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
