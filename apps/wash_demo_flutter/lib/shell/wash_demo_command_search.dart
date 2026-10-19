import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import '../gallery/gallery_manifest.dart';

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
  Timer? _debounce;
  String _localQuery = '';

  @override
  void initState() {
    super.initState();
    _localQuery = widget.filterQuery;
    _controller = TextEditingController(text: widget.filterQuery);
    _controller.addListener(_onTextChanged);
  }

  void _onTextChanged() {
    final next = _controller.text;
    setState(() => _localQuery = next);
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 100), () {
      if (widget.filterQuery != next) {
        widget.onFilterQueryChanged(next);
      }
    });
  }

  @override
  void didUpdateWidget(covariant WashDemoCommandSearch oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.filterQuery != widget.filterQuery &&
        _controller.text != widget.filterQuery) {
      _controller.text = widget.filterQuery;
      _localQuery = widget.filterQuery;
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
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashEditable(
          controller: _controller,
          hint: 'Search gallery…',
        ),
        if (matches.isNotEmpty)
          Container(
            margin: const EdgeInsets.only(top: 4),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer,
              border: Border.all(color: tokens.inkBorder),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: matches
                  .map(
                    (e) => GestureDetector(
                      onTap: () => widget.onSelect(e.id),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(e.label, style: WashTypography.body(tokens.onSurface)),
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
      ],
    );
  }
}
