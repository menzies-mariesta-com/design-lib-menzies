import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../../components/color_picker/wash_color_math.dart';
import '../../components/color_picker/wash_color_picker.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_gallery_typography.dart';
import '../wash_showcase_tabs.dart';

class WashColorPickerGalleryPage extends StatelessWidget {
  const WashColorPickerGalleryPage({super.key});

  static const _defaultHex = '#276c8e';

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Color picker wheel',
      description:
          'Pick pigment with a canvas hue ring and saturation/lightness square. Sync hex values, keyboard nudge with arrows, and reuse the compact layout in the paint splash studio.',
      sections: [
        _s('01 · Control', 'Wash color wheel', 'No third-party picker dependency', const _ColorPickerPreviewGrid(), _controlDart),
        _s('02 · API', 'Props', 'Controlled hex value with optional swatch and built-in hex field', const _ColorPickerPropsTable(), _propsDart),
      ],
    );
  }

  static WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static const _controlDart =
      "WashColorPicker(value: hex, onChanged: setHex, size: 220, showSwatch: true, showHexInput: true);";
  static const _propsDart = 'WashColorPicker(value: hex, onChanged: setHex, showSwatch: true, showHexInput: false);';
}

class _ColorPickerPreviewGrid extends StatelessWidget {
  const _ColorPickerPreviewGrid();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= WashTailwindBreakpoints.lg;
        final panel = (String label, Widget child) => Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: washInkBorderBox(
                tokens,
                fill: tokens.surface.withValues(alpha: 0.7),
                radius: 16,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashGalleryLabelInk(label),
                  const SizedBox(height: 12),
                  child,
                ],
              ),
            );
        final full = panel('Full picker', const _StandaloneColorPickerDemo());
        final compact = panel('Compact (paint splash layout)', const _CompactColorPickerDemo());
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: full),
              const SizedBox(width: 24),
              Expanded(child: compact),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            full,
            const SizedBox(height: 24),
            compact,
          ],
        );
      },
    );
  }
}

class _StandaloneColorPickerDemo extends StatefulWidget {
  const _StandaloneColorPickerDemo();

  @override
  State<_StandaloneColorPickerDemo> createState() => _StandaloneColorPickerDemoState();
}

class _StandaloneColorPickerDemoState extends State<_StandaloneColorPickerDemo> {
  var _hex = WashColorPickerGalleryPage._defaultHex;

  @override
  Widget build(BuildContext context) {
    return WashColorPicker(
      value: _hex,
      onChanged: (v) => setState(() => _hex = v),
      size: 220,
      showSwatch: true,
      showHexInput: true,
      ariaLabel: 'Full color picker',
    );
  }
}

class _CompactColorPickerDemo extends StatefulWidget {
  const _CompactColorPickerDemo();

  @override
  State<_CompactColorPickerDemo> createState() => _CompactColorPickerDemoState();
}

class _CompactColorPickerDemoState extends State<_CompactColorPickerDemo> {
  var _hex = '#b87524';

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.end,
      spacing: 16,
      runSpacing: 16,
      children: [
        WashColorPicker(
          value: _hex,
          onChanged: (v) => setState(() => _hex = v),
          size: 140,
          showSwatch: false,
          showHexInput: false,
          ariaLabel: 'Compact splash color',
        ),
        ConstrainedBox(
          constraints: const BoxConstraints(minWidth: 128),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Hex', style: WashTypography.label(tokens.inkMuted).copyWith(fontSize: 13)),
              const SizedBox(height: 4),
              _CompactHexField(
                value: _hex,
                onChanged: (v) => setState(() => _hex = v),
              ),
            ],
          ),
        ),
        Container(
          width: 40,
          height: 40,
          decoration: washInkBorderBox(
            tokens,
            fill: _parseColor(_hex),
            radius: 12,
          ),
        ),
      ],
    );
  }

  Color _parseColor(String hex) {
    final rgb = washHexToRgb(hex);
    if (rgb == null) return const Color(0xFFB87524);
    return Color.fromARGB(255, rgb.r.round(), rgb.g.round(), rgb.b.round());
  }
}

class _CompactHexField extends StatefulWidget {
  const _CompactHexField({required this.value, required this.onChanged});
  final String value;
  final ValueChanged<String> onChanged;

  @override
  State<_CompactHexField> createState() => _CompactHexFieldState();
}

class _CompactHexFieldState extends State<_CompactHexField> {
  late TextEditingController _controller;
  late FocusNode _focus;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value);
    _focus = FocusNode();
  }

  @override
  void didUpdateWidget(covariant _CompactHexField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != _controller.text && !_focus.hasFocus) {
      _controller.text = widget.value;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: washInkBorderBox(tokens, radius: 8),
      child: EditableText(
        controller: _controller,
        focusNode: _focus,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontFamily: 'monospace',
          fontSize: 13,
        ),
        cursorColor: tokens.primary,
        backgroundCursorColor: tokens.inkMuted,
        onChanged: (next) {
          final trimmed = next.trim();
          if (RegExp(r'^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$').hasMatch(trimmed)) {
            widget.onChanged(trimmed);
          } else {
            widget.onChanged(next);
          }
        },
      ),
    );
  }
}

class _ColorPickerPropsTable extends StatelessWidget {
  const _ColorPickerPropsTable();

  static const _rows = [
    ('value', 'String', 'required', 'Hex color, e.g. #276c8e'),
    ('onChanged', 'ValueChanged<String>', 'required', 'Fires on wheel, square, or hex edits'),
    ('size', 'double', '200', 'Wheel diameter in logical px'),
    ('showHexInput', 'bool', 'false', 'Built-in hex text field'),
    ('showSwatch', 'bool', 'true', 'Current color preview chip'),
    ('disabled', 'bool', 'false', 'Disables interaction'),
  ];

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SizedBox(
        width: 720,
        child: Column(
          children: [
            _PropsHeader(tokens: tokens),
            for (var i = 0; i < _rows.length; i++)
              _PropsRow(
                tokens: tokens,
                zebra: i.isEven,
                prop: _rows[i].$1,
                type: _rows[i].$2,
                defaultValue: _rows[i].$3,
                notes: _rows[i].$4,
              ),
          ],
        ),
      ),
    );
  }
}

class _PropsHeader extends StatelessWidget {
  const _PropsHeader({required this.tokens});
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: tokens.surfaceContainer.withValues(alpha: 0.5),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          _cell('Prop', flex: 2, bold: true),
          _cell('Type', flex: 3, bold: true),
          _cell('Default', flex: 2, bold: true),
          _cell('Notes', flex: 4, bold: true),
        ],
      ),
    );
  }

  Widget _cell(String text, {required int flex, bool bold = false}) {
    return Expanded(
      flex: flex,
      child: Text(
        text,
        style: WashTypography.label(tokens.onSurface).copyWith(
          fontWeight: bold ? FontWeight.w600 : FontWeight.w500,
        ),
      ),
    );
  }
}

class _PropsRow extends StatelessWidget {
  const _PropsRow({
    required this.tokens,
    required this.zebra,
    required this.prop,
    required this.type,
    required this.defaultValue,
    required this.notes,
  });

  final WashTokens tokens;
  final bool zebra;
  final String prop;
  final String type;
  final String defaultValue;
  final String notes;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: zebra ? tokens.surfaceContainer.withValues(alpha: 0.35) : tokens.surface,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _mono(prop, flex: 2),
          _mono(type, flex: 3),
          Expanded(flex: 2, child: Text(defaultValue, style: WashTypography.body(tokens.onSurface))),
          Expanded(flex: 4, child: Text(notes, style: WashTypography.body(tokens.inkMuted))),
        ],
      ),
    );
  }

  Widget _mono(String text, {required int flex}) {
    return Expanded(
      flex: flex,
      child: Text(
        text,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontFamily: 'monospace',
          fontSize: 12,
        ),
      ),
    );
  }
}
