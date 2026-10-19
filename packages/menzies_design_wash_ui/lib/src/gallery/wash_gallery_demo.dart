import 'package:flutter/widgets.dart';

import 'wash_gallery_legacy_preview.dart';
import 'wash_gallery_registry.dart';

/// Builds a live preview for every web gallery page id.
class WashGalleryDemo {
  const WashGalleryDemo._();

  static const String stubMarker = 'parity_matrix.yaml';

  static Widget build(BuildContext context, String pageId) {
    final registered = WashGalleryRegistry.build(context, pageId);
    if (registered != null) return registered;
    return WashGalleryLegacyPreview.build(context, pageId);
  }
}
