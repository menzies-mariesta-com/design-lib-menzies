import 'package:flutter/widgets.dart';

/// Lets gallery pages link to other gallery routes without coupling the
/// package to the demo shell's state management.
class WashGalleryNavigation extends InheritedWidget {
  const WashGalleryNavigation({
    required this.onNavigate,
    this.onDownload,
    this.onOpenExternal,
    required super.child,
    super.key,
  });

  final ValueChanged<String> onNavigate;

  /// Download a bundled demo file. `url` is relative to the host root.
  final void Function(String url, String filename)? onDownload;

  /// Open an external URL (store checkout, sponsor links, docs).
  final ValueChanged<String>? onOpenExternal;

  static WashGalleryNavigation? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<WashGalleryNavigation>();

  static ValueChanged<String>? callbackOf(BuildContext context) =>
      maybeOf(context)?.onNavigate;

  static void Function(String url, String filename)? downloadOf(
    BuildContext context,
  ) =>
      maybeOf(context)?.onDownload;

  static ValueChanged<String>? openExternalOf(BuildContext context) =>
      maybeOf(context)?.onOpenExternal;

  @override
  bool updateShouldNotify(WashGalleryNavigation oldWidget) =>
      oldWidget.onNavigate != onNavigate ||
      oldWidget.onDownload != onDownload ||
      oldWidget.onOpenExternal != onOpenExternal;
}
