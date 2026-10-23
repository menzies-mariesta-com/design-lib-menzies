import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/card/wash_card.dart';
import '../../components/fieldset/wash_fieldset.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_form_fields.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashFieldsetGalleryPage extends StatelessWidget {
  const WashFieldsetGalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Fieldset',
      description:
          'daisyUI fieldset, fieldset-legend, and label groupings for related form controls.',
      sections: [
        _s(
            '01 · Basic',
            'Legend and input',
            'Minimal fieldset with legend, a single input, and a helper label',
            _basic(),
            _basicDart),
        _s(
            '02 · Background',
            'Bordered wash panel',
            'Background, border, and rounded-box utilities around the fieldset',
            _background(context),
            _bgDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Multiple fields',
            'Name, tags, status',
            'Several labeled controls in one fieldset with unique ids',
            const _MultipleFieldsDemo(),
            _multiDart),
        _s(
            '04 · Join',
            'Joined input and action',
            'Fieldset wrapping a join group for inline save',
            _join(),
            _joinDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Disabled',
            'Locked fieldset',
            'Native disabled attribute greys out every control inside',
            const _DisabledDemo(),
            _disabledDart),
        _s(
            '06 · Studio form',
            'Pigment wash settings',
            'Create form with required asterisks and a primary title',
            const _StudioFormDemo(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '07 · Responsive',
            'Side by side on desktop',
            'Stacks on small screens; two columns from md up',
            _responsive(context),
            _responsiveDart,
            tint: WashGalleryPanelTint.rose),
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

  static Widget _basic() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldset(
          legend: 'Plate title',
          maxWidth: 448,
          children: [
            const WashInput(hint: 'Coastal fog'),
            const WashFieldsetHelper(
                'You can edit the title later from settings'),
          ],
        ),
        const WashFieldsetClassLabel('fieldset + fieldset-legend + label'),
      ],
    );
  }

  static Widget _background(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetPanel(
          legend: 'Series name',
          children: [
            const WashInput(hint: 'Atlantic Studies'),
            const WashFieldsetHelper('Stored with the plate ledger'),
          ],
        ),
        const WashFieldsetClassLabel(
            'fieldset bg-base-200 border-base-300 rounded-box border p-4'),
      ],
    );
  }

  static Widget _join() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetPanel(
          legend: 'Quick rename',
          maxWidth: 512,
          children: [
            Row(
              children: [
                Expanded(child: WashInput(hint: 'Product name')),
                const SizedBox(width: 0),
                WashButton(
                    label: 'Save', size: WashButtonSize.md, onPressed: () {}),
              ],
            ),
          ],
        ),
        const WashFieldsetClassLabel(
            'fieldset + join + input.join-item + btn.join-item'),
      ],
    );
  }

  static Widget _responsive(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        final twoCol = c.maxWidth >= WashTailwindBreakpoints.md;
        final login = WashFieldsetPanel(
          legend: 'Login',
          maxWidth: double.infinity,
          children: [
            const WashFieldsetLabel(text: 'Email', requiredMark: true),
            const WashInput(hint: 'studio@menzies.design'),
            const WashFieldsetLabel(text: 'Password', requiredMark: true),
            const WashInput(hint: 'Passphrase', obscureText: true),
            const SizedBox(height: 8),
            WashButton(
                label: 'Login',
                variant: WashButtonVariant.neutral,
                onPressed: () {}),
          ],
        );
        final profile = WashFieldsetInkPanel(
          legend: 'Studio profile',
          maxWidth: double.infinity,
          children: [
            const WashFieldsetLabel(text: 'Display name'),
            const WashInput(hint: 'M. Kline'),
            const WashFieldsetLabel(text: 'Locale'),
            WashSelect<String>(
              value: 'en',
              options: const [
                WashSelectOption(value: 'en', label: 'English'),
                WashSelectOption(value: 'ja', label: 'Japanese'),
                WashSelectOption(value: 'fr', label: 'French'),
              ],
              onChanged: (_) {},
            ),
            const WashFieldsetHelper('Shown on shared plate sheets'),
          ],
        );
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (twoCol)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: login),
                  const SizedBox(width: 16),
                  Expanded(child: profile),
                ],
              )
            else ...[
              login,
              const SizedBox(height: 16),
              profile,
            ],
            const WashFieldsetClassLabel(
                'grid gap-4 md:grid-cols-2 + fieldset'),
          ],
        );
      },
    );
  }

  static const _basicDart =
      'WashFieldset(legend: ..., children: [WashInput(...), WashFieldsetHelper(...)])';
  static const _bgDart = 'WashFieldsetPanel(legend: ..., children: [...])';
  static const _multiDart =
      'WashFieldsetInkPanel + WashFieldsetLabel + WashInput + WashSelect';
  static const _joinDart = 'WashFieldsetPanel + Row(join input + WashButton)';
  static const _disabledDart = 'WashFieldsetInkPanel(disabled: true, ...)';
  static const _studioDart =
      'WashCard + WashFieldset + required WashFieldsetLabel';
  static const _responsiveDart =
      'LayoutBuilder md:grid-cols-2 + WashFieldsetPanel';
}

class _MultipleFieldsDemo extends StatelessWidget {
  const _MultipleFieldsDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetInkPanel(
          legend: 'Plate details',
          children: [
            const WashFieldsetLabel(text: 'Name'),
            const WashInput(hint: 'Mist over harbor'),
            const WashFieldsetLabel(text: 'Tags'),
            const WashInput(hint: 'coastal, fog, cool'),
            const WashFieldsetLabel(text: 'Status'),
            WashSelect<String>(
              value: 'draft',
              options: const [
                WashSelectOption(value: 'draft', label: 'Draft'),
                WashSelectOption(value: 'drying', label: 'Drying'),
                WashSelectOption(value: 'varnished', label: 'Varnished'),
                WashSelectOption(value: 'archived', label: 'Archived'),
              ],
              onChanged: (_) {},
            ),
          ],
        ),
        const WashFieldsetClassLabel('fieldset + label + input + select'),
      ],
    );
  }
}

class _DisabledDemo extends StatelessWidget {
  const _DisabledDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashFieldsetInkPanel(
          legend: 'Archived plate',
          maxWidth: 448,
          disabled: true,
          children: const [
            WashFieldsetLabel(text: 'Title'),
            WashInput(hint: 'WS-088 · Evening tide'),
            WashFieldsetLabel(text: 'Notes'),
            WashInput(hint: 'Locked after archive'),
            WashFieldsetHelper('Restore the plate to edit these fields'),
          ],
        ),
        const WashFieldsetClassLabel('fieldset disabled'),
      ],
    );
  }
}

class _StudioFormDemo extends StatefulWidget {
  const _StudioFormDemo();

  @override
  State<_StudioFormDemo> createState() => _StudioFormDemoState();
}

class _StudioFormDemoState extends State<_StudioFormDemo> {
  var _bloom = true;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 576),
          child: WashCard(
            body: WashCardBody(
              children: [
                Text(
                  'Add wash recipe',
                  style: WashTypography.title(tokens.primary)
                      .copyWith(fontWeight: FontWeight.bold),
                ),
                WashFieldset(
                  legend: 'Wash settings',
                  borderColor: tokens.inkBorder,
                  padding: const EdgeInsets.all(16),
                  children: [
                    const WashFieldsetLabel(
                        text: 'Pigment', requiredMark: true),
                    const WashInput(hint: 'Ultramarine'),
                    const WashFieldsetLabel(
                        text: 'Dilution', requiredMark: true),
                    WashSelect<String>(
                      value: '',
                      options: const [
                        WashSelectOption(value: '', label: 'Pick dilution…'),
                        WashSelectOption(value: 'glaze', label: 'Glaze'),
                        WashSelectOption(value: 'wash', label: 'Wash'),
                        WashSelectOption(value: 'body', label: 'Body color'),
                      ],
                      onChanged: (_) {},
                    ),
                    const WashFieldsetLabel(text: 'Paper weight'),
                    const WashInput(hint: '300 gsm cold press'),
                    WashCheckbox(
                      value: _bloom,
                      label: 'Allow wet-on-wet bloom',
                      onChanged: (v) => setState(() => _bloom = v ?? false),
                    ),
                    const WashFieldsetHelper('Asterisk marks required fields'),
                  ],
                ),
                Wrap(
                  alignment: WrapAlignment.end,
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    WashButton(
                        label: 'Cancel',
                        variant: WashButtonVariant.ghost,
                        onPressed: () {}),
                    WashButton(label: 'Save recipe', onPressed: () {}),
                  ],
                ),
              ],
            ),
          ),
        ),
        const WashFieldsetClassLabel(
            'fieldset + required labels + card-title text-primary'),
      ],
    );
  }
}
