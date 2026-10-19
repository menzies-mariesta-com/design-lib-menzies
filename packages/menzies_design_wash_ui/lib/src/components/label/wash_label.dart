import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../input/wash_input.dart';
import '../radio/wash_radio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Error-colored required asterisk (form-crud rule).
class WashRequiredMark extends StatelessWidget {
  const WashRequiredMark({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      '*',
      style: TextStyle(
        color: tokens.palette.error,
        fontSize: 14,
        height: 1,
      ),
    );
  }
}

/// Gallery monospace class hint (LabelPage codeLabel).
class WashLabelClassLabel extends StatelessWidget {
  const WashLabelClassLabel(this.value, {super.key});

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontFamily: 'monospace',
          fontSize: 10.4,
        ),
      ),
    );
  }
}

/// daisyUI stacked `label` above a field.
class WashFieldLabel extends StatelessWidget {
  const WashFieldLabel({
    required this.text,
    this.requiredMark = false,
    this.trailing,
    super.key,
  });

  final String text;
  final bool requiredMark;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final style = WashTypography.label(tokens.onSurface).copyWith(
      fontSize: 13,
      fontWeight: FontWeight.w500,
    );
    if (trailing != null) {
      return Row(
        children: [
          Expanded(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(text, style: style),
                if (requiredMark) ...[
                  const SizedBox(width: 2),
                  const WashRequiredMark(),
                ],
              ],
            ),
          ),
          trailing!,
        ],
      );
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(text, style: style),
        if (requiredMark) ...[
          const SizedBox(width: 2),
          const WashRequiredMark(),
        ],
      ],
    );
  }
}

/// `span.label-text` inside a label row.
class WashLabelText extends StatelessWidget {
  const WashLabelText(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.label(tokens.onSurface).copyWith(
        fontSize: 13,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// daisyUI `p.label` / helper line under controls.
class WashLabelHelper extends StatelessWidget {
  const WashLabelHelper(this.text, {this.small = false, super.key});

  final String text;
  final bool small;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontSize: small ? 12 : 13,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// Optional hint on the right (`span.label text-xs`).
class WashLabelOptionalHint extends StatelessWidget {
  const WashLabelOptionalHint(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.label(tokens.inkMuted).copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}

/// Bordered `label.input` row with [prefix] or [suffix] caption.
class WashInputAffixField extends StatelessWidget {
  const WashInputAffixField({
    this.prefix,
    this.suffix,
    required this.child,
    super.key,
  }) : assert(prefix != null || suffix != null);

  final String? prefix;
  final String? suffix;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(16),
        color: tokens.surface,
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        child: Row(
          children: [
            if (prefix != null) ...[
              WashLabelHelper(prefix!, small: true),
              const SizedBox(width: 8),
            ],
            Expanded(child: child),
            if (suffix != null) ...[
              const SizedBox(width: 8),
              WashLabelHelper(suffix!, small: true),
            ],
          ],
        ),
      ),
    );
  }
}

typedef WashFloatingFieldBuilder = Widget Function(
  FocusNode focusNode,
  ValueChanged<String> onTextChanged,
);

/// daisyUI `floating-label` wrapper (caption lifts on focus or when filled).
class WashFloatingLabel extends StatefulWidget {
  const WashFloatingLabel({
    required this.caption,
    this.requiredMark = false,
    required this.fieldBuilder,
    super.key,
  });

  final String caption;
  final bool requiredMark;
  final WashFloatingFieldBuilder fieldBuilder;

  @override
  State<WashFloatingLabel> createState() => _WashFloatingLabelState();
}

class _WashFloatingLabelState extends State<WashFloatingLabel> {
  final _focusNode = FocusNode();
  var _hasText = false;

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(_onFocus);
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocus);
    _focusNode.dispose();
    super.dispose();
  }

  void _onFocus() => setState(() {});

  void _onChanged(String value) {
    final filled = value.isNotEmpty;
    if (filled != _hasText) setState(() => _hasText = filled);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final floated = _focusNode.hasFocus || _hasText;

    final caption = Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.caption,
          style: WashTypography.label(tokens.inkMuted).copyWith(
            fontSize: floated ? 11 : 13,
            fontWeight: FontWeight.w500,
          ),
        ),
        if (widget.requiredMark) ...[
          const SizedBox(width: 2),
          const WashRequiredMark(),
        ],
      ],
    );

    return Stack(
      clipBehavior: Clip.none,
      children: [
        Padding(
          padding: EdgeInsets.only(top: floated ? 18 : 0),
          child: widget.fieldBuilder(_focusNode, _onChanged),
        ),
        Positioned(
          left: 12,
          top: floated ? 0 : 14,
          child: IgnorePointer(child: caption),
        ),
      ],
    );
  }
}

/// Clickable `label` row wrapping a control and `label-text` caption.
class WashControlLabel extends StatelessWidget {
  const WashControlLabel({
    required this.control,
    required this.caption,
    this.onTap,
    super.key,
  });

  final Widget control;
  final String caption;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            control,
            const SizedBox(width: 12),
            WashLabelText(caption),
          ],
        ),
      ),
    );
  }
}

/// daisyUI `checkbox` for [WashControlLabel] demos.
class WashDaisyCheckbox extends StatelessWidget {
  const WashDaisyCheckbox({
    required this.value,
    required this.onChanged,
    this.primary = false,
    super.key,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final bool primary;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final fill = value ? (primary ? tokens.primary : tokens.onSurface) : null;
    return GestureDetector(
      onTap: () => onChanged(!value),
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Container(
          width: 20,
          height: 20,
          decoration: BoxDecoration(
            color: fill,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(
              color: primary && value ? tokens.primary : tokens.inkBorder,
              width: 2,
            ),
          ),
          child: value
              ? Center(
                  child: Text(
                    '✓',
                    style: TextStyle(
                      color: primary ? tokens.onPrimary : tokens.surface,
                      fontSize: 12,
                      height: 1,
                    ),
                  ),
                )
              : null,
        ),
      ),
    );
  }
}

/// daisyUI `toggle` for [WashControlLabel] demos.
class WashDaisyToggle extends StatelessWidget {
  const WashDaisyToggle({
    required this.value,
    required this.onChanged,
    this.primary = false,
    super.key,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final bool primary;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final track = value
        ? (primary ? tokens.primary : tokens.onSurface)
        : tokens.surfaceContainer;
    return GestureDetector(
      onTap: () => onChanged(!value),
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: 44,
          height: 24,
          padding: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            color: track,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: tokens.inkBorder),
          ),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 18,
            height: 18,
            decoration: BoxDecoration(
              color: tokens.surface,
              shape: BoxShape.circle,
            ),
          ),
        ),
      ),
    );
  }
}

/// daisyUI `radio` for [WashControlLabel] demos.
class WashDaisyRadio extends StatelessWidget {
  const WashDaisyRadio({
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.primary = true,
    super.key,
  });

  final String value;
  final String? groupValue;
  final ValueChanged<String> onChanged;
  final bool primary;

  @override
  Widget build(BuildContext context) {
    return WashRadio<String>(
      value: value,
      groupValue: groupValue,
      onChanged: (v) => onChanged(v!),
      variant: primary ? WashRadioVariant.primary : WashRadioVariant.defaultVariant,
    );
  }
}

/// Legacy stacked label + child (prefer [WashFieldLabel] + field).
class WashLabel extends StatelessWidget {
  const WashLabel({required this.text, required this.child, super.key});

  final String text;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        WashFieldLabel(text: text),
        const SizedBox(height: 4),
        child,
      ],
    );
  }
}
