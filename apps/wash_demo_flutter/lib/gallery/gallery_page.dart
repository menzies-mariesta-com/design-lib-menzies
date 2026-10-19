import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import 'gallery_manifest.dart';

class GalleryShowcase extends StatelessWidget {
  const GalleryShowcase({required this.entry, super.key});

  final GalleryEntry entry;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: WashGalleryDemo.build(context, entry.id),
    );
  }
}
