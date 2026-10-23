import 'package:flutter/widgets.dart';

import '../../components/input/wash_editable.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';

/// Native-style `input type="date"` (ISO `YYYY-MM-DD`).
class WashDateInput extends StatelessWidget {
  const WashDateInput({
    required this.value,
    required this.onChanged,
    this.enabled = true,
    this.ariaLabel,
    super.key,
  });

  final String value;
  final ValueChanged<String> onChanged;
  final bool enabled;
  final String? ariaLabel;

  @override
  Widget build(BuildContext context) {
    return _WashBorderedField(
      enabled: enabled,
      ariaLabel: ariaLabel ?? 'Date',
      initial: value,
      hint: 'YYYY-MM-DD',
      onChanged: onChanged,
    );
  }
}

/// Native-style `input type="datetime-local"`.
class WashDateTimeLocalInput extends StatelessWidget {
  const WashDateTimeLocalInput({
    required this.value,
    required this.onChanged,
    this.enabled = true,
    this.ariaLabel,
    super.key,
  });

  final String value;
  final ValueChanged<String> onChanged;
  final bool enabled;
  final String? ariaLabel;

  @override
  Widget build(BuildContext context) {
    return _WashBorderedField(
      enabled: enabled,
      ariaLabel: ariaLabel ?? 'Date and time',
      initial: value,
      hint: 'YYYY-MM-DDTHH:mm',
      onChanged: onChanged,
    );
  }
}

class WashDateTimeFieldset extends StatelessWidget {
  const WashDateTimeFieldset({
    required this.legend,
    required this.child,
    this.requiredMark = false,
    super.key,
  });

  final String legend;
  final Widget child;
  final bool requiredMark;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(legend,
                style: WashTypography.label(tokens.onSurface)
                    .copyWith(fontWeight: FontWeight.w600)),
            if (requiredMark)
              const Padding(
                padding: EdgeInsets.only(left: 2),
                child: Text('*',
                    style: TextStyle(
                        color: Color(0xFFEF4444), fontSize: 14, height: 1)),
              ),
          ],
        ),
        const SizedBox(height: 8),
        child,
      ],
    );
  }
}

class WashDateTimeClassLabel extends StatelessWidget {
  const WashDateTimeClassLabel(this.value, {super.key});
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Text(
        value,
        style: const TextStyle(
            fontFamily: 'monospace', fontSize: 10.4, color: Color(0xFF6B7280)),
      ),
    );
  }
}

class WashDateTimeLiveValue extends StatelessWidget {
  const WashDateTimeLiveValue(
      {this.label = 'Value', required this.value, super.key});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Text.rich(
        TextSpan(
          style: WashTypography.body(tokens.inkMuted),
          children: [
            TextSpan(text: '$label: '),
            TextSpan(
              text: value.isEmpty ? '(none)' : value,
              style: WashTypography.body(tokens.onSurface).copyWith(
                fontFamily: 'monospace',
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _WashBorderedField extends StatefulWidget {
  const _WashBorderedField({
    required this.initial,
    required this.onChanged,
    required this.hint,
    required this.enabled,
    required this.ariaLabel,
  });

  final String initial;
  final ValueChanged<String> onChanged;
  final String hint;
  final bool enabled;
  final String ariaLabel;

  @override
  State<_WashBorderedField> createState() => _WashBorderedFieldState();
}

class _WashBorderedFieldState extends State<_WashBorderedField> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initial);
  }

  @override
  void didUpdateWidget(covariant _WashBorderedField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initial != widget.initial &&
        _controller.text != widget.initial) {
      _controller.text = widget.initial;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Semantics(
      label: widget.ariaLabel,
      textField: true,
      enabled: widget.enabled,
      child: Opacity(
        opacity: widget.enabled ? 1 : 0.7,
        child: IgnorePointer(
          ignoring: !widget.enabled,
          child: Container(
            width: double.infinity,
            constraints: const BoxConstraints(minHeight: 44),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: washInkBorderBox(tokens),
            child: WashEditable(
              controller: _controller,
              hint: widget.hint,
              onChanged: widget.onChanged,
            ),
          ),
        ),
      ),
    );
  }
}
