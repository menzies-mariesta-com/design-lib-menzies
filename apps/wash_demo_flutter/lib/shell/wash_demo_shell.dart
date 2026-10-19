import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import '../gallery/gallery_manifest.dart';
import 'wash_demo_breadcrumbs.dart';
import 'wash_demo_command_search.dart';
import 'wash_demo_drawer.dart';
import 'wash_demo_navbar.dart';

/// Demo chrome only. [WashBackground] wraps this so search typing does not repaint atmosphere.
class WashDemoShell extends StatelessWidget {
  const WashDemoShell({
    required this.pageId,
    required this.onPageIdChanged,
    required this.body,
    super.key,
  });

  final String pageId;
  final ValueChanged<String> onPageIdChanged;
  final Widget body;

  @override
  Widget build(BuildContext context) {
    return WashBackground(
      child: _WashDemoShellChrome(
        pageId: pageId,
        onPageIdChanged: onPageIdChanged,
        body: body,
      ),
    );
  }
}

class _WashDemoShellChrome extends StatefulWidget {
  const _WashDemoShellChrome({
    required this.pageId,
    required this.onPageIdChanged,
    required this.body,
  });

  final String pageId;
  final ValueChanged<String> onPageIdChanged;
  final Widget body;

  @override
  State<_WashDemoShellChrome> createState() => _WashDemoShellChromeState();
}

class _WashDemoShellChromeState extends State<_WashDemoShellChrome> {
  bool _drawerOpen = false;
  String _filterQuery = '';

  GalleryEntry get _entry => kGalleryEntries.firstWhere(
        (e) => e.id == widget.pageId,
        orElse: () => kGalleryEntries.first,
      );

  @override
  Widget build(BuildContext context) {
    final bp = WashBreakpoints.of(context);
    final showPersistentDrawer = !bp.isPhone;

    final main = Row(
      children: [
        if (showPersistentDrawer)
          SizedBox(
            width: 280,
            child: WashDemoDrawer(
              selectedId: widget.pageId,
              query: _filterQuery,
              onSelect: widget.onPageIdChanged,
            ),
          ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              WashDemoNavbar(
                drawerOpen: _drawerOpen,
                onDrawerToggle: () => setState(() => _drawerOpen = !_drawerOpen),
                showMenu: !showPersistentDrawer,
                search: WashDemoCommandSearch(
                  filterQuery: _filterQuery,
                  onFilterQueryChanged: (q) => setState(() => _filterQuery = q),
                  onSelect: widget.onPageIdChanged,
                ),
              ),
              WashDemoBreadcrumbs(
                pageLabel: _entry.label,
                onOverview: () => widget.onPageIdChanged('overview'),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.topCenter,
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 1320),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                      child: widget.body,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );

    return Stack(
      children: [
        main,
        if (!showPersistentDrawer && _drawerOpen)
          Positioned.fill(
            child: Stack(
              children: [
                GestureDetector(
                  onTap: () => setState(() => _drawerOpen = false),
                  child: const ColoredBox(color: Color(0x66000000)),
                ),
                Align(
                  alignment: Alignment.centerLeft,
                  child: SizedBox(
                    width: 280,
                    height: double.infinity,
                    child: WashDemoDrawer(
                      selectedId: widget.pageId,
                      query: _filterQuery,
                      onSelect: (id) {
                        setState(() => _drawerOpen = false);
                        widget.onPageIdChanged(id);
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
