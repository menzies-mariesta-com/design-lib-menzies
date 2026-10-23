import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import '../gallery/gallery_manifest.dart';

/// Web-parity search field. The website opens a command palette from a
/// 288x40 trigger; the Flutter demo filters the sidebar live and floats the
/// matching pages in an overlay so the 64px navbar never grows.
class WashDemoCommandSearch extends StatefulWidget {
  const WashDemoCommandSearch({
    required this.filterQuery,
    required this.onFilterQueryChanged,
    required this.onSelect,
    super.key,
  });

  /// Debounced query shared with drawer filtering.
  final String filterQuery;
  final ValueChanged<String> onFilterQueryChanged;
  final ValueChanged<String> onSelect;

  @override
  State<WashDemoCommandSearch> createState() => _WashDemoCommandSearchState();
}

class _WashDemoCommandSearchState extends State<WashDemoCommandSearch> {
  late final TextEditingController _controller;
  final LayerLink _link = LayerLink();
  final OverlayPortalController _portal = OverlayPortalController();
  Timer? _debounce;
  String _localQuery = '';

  @override
  void initState() {
    super.initState();
    _localQuery = widget.filterQuery;
    _controller = TextEditingController(text: widget.filterQuery);
    _controller.addListener(_onTextChanged);
    if (_localQuery.trim().isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _syncPortal());
    }
  }

  void _syncPortal() {
    if (!mounted) return;
    if (_localQuery.trim().isEmpty) {
      if (_portal.isShowing) _portal.hide();
    } else if (!_portal.isShowing) {
      _portal.show();
    }
  }

  void _onTextChanged() {
    final next = _controller.text;
    setState(() => _localQuery = next);
    _syncPortal();
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 100), () {
      if (widget.filterQuery != next) {
        widget.onFilterQueryChanged(next);
      }
    });
  }

  void _select(GalleryEntry entry) {
    widget.onSelect(entry.id);
    _controller.clear();
    widget.onFilterQueryChanged('');
  }

  @override
  void didUpdateWidget(covariant WashDemoCommandSearch oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.filterQuery != widget.filterQuery &&
        _controller.text != widget.filterQuery) {
      _controller.text = widget.filterQuery;
      _localQuery = widget.filterQuery;
      _syncPortal();
    }
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _controller.removeListener(_onTextChanged);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final q = _localQuery.trim().toLowerCase();
    final matches = q.isEmpty
        ? const <GalleryEntry>[]
        : kGalleryEntries
            .where((e) => e.label.toLowerCase().contains(q) || e.id.contains(q))
            .take(8)
            .toList();

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        CompositedTransformTarget(
          link: _link,
          child: WashInput(
            controller: _controller,
            size: WashInputSize.sm,
            hint: 'Search pages…',
            leading: WashIcon(
              WashIconGlyph.search,
              size: 16,
              color: tokens.onSurface.withValues(alpha: 0.75),
            ),
            trailing: const _ShortcutHint(label: 'CtrlK'),
            maxWidth: 288,
          ),
        ),
        OverlayPortal(
          controller: _portal,
          overlayChildBuilder: (overlayContext) {
            if (matches.isEmpty) return const SizedBox.shrink();
            return CompositedTransformFollower(
              link: _link,
              targetAnchor: Alignment.bottomLeft,
              followerAnchor: Alignment.topLeft,
              offset: const Offset(0, 4),
              child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  width: 288,
                  constraints: const BoxConstraints(maxHeight: 320),
                  decoration: BoxDecoration(
                    color: tokens.surface,
                    border: Border.all(color: tokens.inkBorder),
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x1A000000),
                        offset: Offset(0, 10),
                        blurRadius: 30,
                      ),
                    ],
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: matches
                          .map(
                            (e) => GestureDetector(
                              onTap: () => _select(e),
                              behavior: HitTestBehavior.opaque,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 10,
                                ),
                                child: Align(
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    e.label,
                                    style:
                                        WashTypography.body(tokens.onSurface),
                                  ),
                                ),
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

class _ShortcutHint extends StatelessWidget {
  const _ShortcutHint({required this.label});
  final String label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer,
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(5),
      ),
      child: Text(
        label,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontSize: 10.4,
          fontWeight: FontWeight.w500,
          letterSpacing: 0,
        ),
      ),
    );
  }
}
