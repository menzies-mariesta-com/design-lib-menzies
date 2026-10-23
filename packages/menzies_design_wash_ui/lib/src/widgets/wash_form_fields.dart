import 'package:flutter/widgets.dart';

import '../foundation/wash_icon.dart';
import '../foundation/wash_primitives.dart';
import '../tokens/wash_tokens.dart';

export '../components/input/wash_editable.dart' show WashEditable, WashInput;
export '../components/textarea/wash_textarea.dart' show WashTextarea;
export '../components/otp/wash_otp.dart';
export '../components/search_select/wash_search_select.dart';
export '../components/select/wash_select.dart';
export '../components/toggle/wash_toggle.dart';

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
          child: value
              ? WashIcon(WashIconGlyph.check, size: 14, color: tokens.onPrimary)
              : null,
        ),
      ),
      title: label != null ? Text(label!) : const SizedBox.shrink(),
      onTap: () => onChanged(!value),
    );
  }
}
