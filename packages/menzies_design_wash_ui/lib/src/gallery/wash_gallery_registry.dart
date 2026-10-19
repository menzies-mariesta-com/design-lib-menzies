import 'package:flutter/widgets.dart';

import 'wash_gallery_registry.g.dart';

typedef WashGalleryPageBuilder = Widget Function(BuildContext context);

/// Full-depth gallery pages (web *Page.tsx parity).
class WashGalleryRegistry {
  const WashGalleryRegistry._();

  static Widget? build(BuildContext context, String pageId) {
    final builder = kGeneratedGalleryPages[pageId];
    if (builder == null) return null;
    return builder(context);
  }

  static bool hasPage(String pageId) => kGeneratedGalleryPages.containsKey(pageId);
}
