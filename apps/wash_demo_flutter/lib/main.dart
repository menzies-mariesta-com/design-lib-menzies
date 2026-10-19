import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import 'gallery/gallery_manifest.dart';
import 'gallery/gallery_page.dart';
import 'shell/wash_demo_shell.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  WashAtmosphereShader.ensureLoaded();
  runApp(const WashDemoApp());
}

class WashDemoApp extends StatelessWidget {
  const WashDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return WashProvider(
      child: WidgetsApp(
        title: 'Wash UI Flutter',
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => Overlay(
          initialEntries: [
            OverlayEntry(
              maintainState: true,
              builder: (context) => const GalleryHome(),
            ),
          ],
        ),
      ),
    );
  }
}

class GalleryHome extends StatefulWidget {
  const GalleryHome({super.key});

  @override
  State<GalleryHome> createState() => _GalleryHomeState();
}

class _GalleryHomeState extends State<GalleryHome> {
  String _pageId = 'overview';

  @override
  Widget build(BuildContext context) {
    final entry = kGalleryEntries.firstWhere(
      (e) => e.id == _pageId,
      orElse: () => kGalleryEntries.first,
    );

    return WashDemoShell(
      pageId: _pageId,
      onPageIdChanged: (id) => setState(() => _pageId = id),
      body: GalleryShowcase(entry: entry),
    );
  }
}
