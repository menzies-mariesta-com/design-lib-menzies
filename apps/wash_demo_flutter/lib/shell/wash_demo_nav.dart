import '../gallery/gallery_manifest.dart';

class WashDemoNavGroup {
  const WashDemoNavGroup({required this.label, required this.section});
  final String label;
  final GallerySection section;
}

const kWashDemoNavGroups = [
  WashDemoNavGroup(label: 'Overview', section: GallerySection.overview),
  WashDemoNavGroup(label: 'Docs', section: GallerySection.docs),
  WashDemoNavGroup(label: 'Assets', section: GallerySection.assets),
  WashDemoNavGroup(label: 'Icons', section: GallerySection.icons),
  WashDemoNavGroup(label: 'Charts', section: GallerySection.charts),
  WashDemoNavGroup(label: 'Components', section: GallerySection.components),
  WashDemoNavGroup(label: 'Behaviour', section: GallerySection.behaviours),
  WashDemoNavGroup(label: 'Templates', section: GallerySection.templates),
  WashDemoNavGroup(label: 'Store', section: GallerySection.store),
];
