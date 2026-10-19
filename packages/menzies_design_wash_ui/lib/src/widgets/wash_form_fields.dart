import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../components/input/wash_editable.dart';
import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../painting/wash_decorations.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

export '../components/input/wash_editable.dart' show WashEditable, WashInput, WashTextarea;
export '../components/otp/wash_otp.dart';

class WashCheckbox extends StatelessWidget {
  const WashCheckbox({
    required this.value,
    required this.onChanged,
    this.label,
    super.key,
  });

  final bool value;
  final ValueChanged<bool?> onChanged;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashListTile(
      leading: GestureDetector(
        onTap: () => onChanged(!value),
        child: Container(
          width: 20,
          height: 20,
          decoration: BoxDecoration(
            color: value ? tokens.primary : null,
            border: Border.all(color: tokens.inkBorder, width: 2),
            borderRadius: BorderRadius.circular(4),
          ),
          child: value ? WashIcon(WashIconGlyph.check, size: 14, color: tokens.onPrimary) : null,
        ),
      ),
      title: label != null ? Text(label!) : const SizedBox.shrink(),
      onTap: () => onChanged(!value),
    );
  }
}

class WashToggle extends StatelessWidget {
  const WashToggle({
    required this.value,
    required this.onChanged,
    this.label,
    super.key,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return WashListTile(
      title: label != null ? Text(label!) : const SizedBox.shrink(),
      trailing: GestureDetector(
        onTap: () => onChanged(!value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: 44,
          height: 24,
          padding: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            color: value ? tokens.primary : tokens.surfaceContainer,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: tokens.inkBorder),
          ),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 18,
            height: 18,
            decoration: BoxDecoration(color: tokens.onPrimary, shape: BoxShape.circle),
          ),
        ),
      ),
      onTap: () => onChanged(!value),
    );
  }
}

class WashSelectOption<T> {
  const WashSelectOption({required this.value, required this.label});
  final T value;
  final String label;
}

class WashSelect<T> extends StatelessWidget {
  const WashSelect({
    required this.value,
    required this.options,
    required this.onChanged,
    this.label,
    super.key,
  });

  final T value;
  final List<WashSelectOption<T>> options;
  final ValueChanged<T?> onChanged;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Text(label!, style: WashTypography.label(tokens.onSurface)),
          ),
        Container(
          decoration: washInkBorderBox(tokens),
          child: Column(
            children: options
                .map(
                  (o) => WashListTile(
                    title: Text(o.label),
                    trailing: o.value == value ? WashIcon(WashIconGlyph.check, color: tokens.primary) : null,
                    onTap: () => onChanged(o.value),
                  ),
                )
                .toList(),
          ),
        ),
      ],
    );
  }
}

class WashSearchSelect extends StatefulWidget {
  const WashSearchSelect({
    required this.options,
    required this.onSelected,
    this.hint = 'Search…',
    super.key,
  });

  final List<String> options;
  final ValueChanged<String> onSelected;
  final String hint;

  @override
  State<WashSearchSelect> createState() => _WashSearchSelectState();
}

class _WashSearchSelectState extends State<WashSearchSelect> {
  final _controller = TextEditingController();
  late List<String> _filtered;

  @override
  void initState() {
    super.initState();
    _filtered = widget.options;
    _controller.addListener(_filter);
  }

  void _filter() {
    final q = _controller.text.toLowerCase();
    setState(() {
      _filtered = widget.options.where((o) => o.toLowerCase().contains(q)).toList();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashInput(controller: _controller, hint: widget.hint),
        const SizedBox(height: 8),
        ConstrainedBox(
          constraints: const BoxConstraints(maxHeight: 200),
          child: ListView.builder(
            itemCount: _filtered.length,
            itemBuilder: (context, index) {
              final item = _filtered[index];
              return WashListTile(
                title: Text(item),
                onTap: () {
                  widget.onSelected(item);
                  _controller.text = item;
                },
              );
            },
          ),
        ),
      ],
    );
  }
}
