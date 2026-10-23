import 'package:flutter/widgets.dart';
import '../foundation/wash_icon.dart';
import '../icons/wash_lucide_icon.dart';
import '../foundation/wash_primitives.dart';
import '../foundation/wash_ripple.dart';

export '../components/label/wash_label.dart';

import '../components/layout/wash_stack.dart';
import '../components/chip/wash_chip.dart';
import '../components/context_menu/wash_context_menu.dart';
import '../components/drawer/wash_drawer.dart';
import '../components/palette/wash_palette.dart';
import '../components/radio/wash_radio.dart';
import '../components/snackbar/wash_snackbar.dart';
import '../components/toast/wash_toast.dart';
import '../components/alert/wash_daisy_alert.dart';
import '../components/splash/wash_watercolor_splash.dart';
import 'wash_button.dart';
import 'wash_catalog.dart';
import 'wash_feedback.dart';
import 'wash_form_fields.dart';

export '../components/link/wash_link.dart';
export '../components/range/wash_range.dart';
export '../components/list/wash_list.dart';
export '../components/mask/wash_mask.dart';
export '../components/megamenu/wash_megamenu.dart';
export '../components/menu/wash_menu.dart';
export '../components/mockup/wash_mockup.dart';
export '../components/org_chart/wash_org_chart.dart';
export '../components/otp/wash_otp.dart';
export '../components/pagination/wash_pagination.dart';
export '../components/palette/wash_palette.dart';
export '../components/progress/wash_progress.dart';
export '../components/rating/wash_rating.dart';
export '../components/qrcode/wash_qrcode.dart';
export '../components/splash/wash_watercolor_splash.dart';

class WashRadioGroup<T> extends StatelessWidget {
  const WashRadioGroup({
    required this.value,
    required this.options,
    required this.onChanged,
    super.key,
  });

  final T value;
  final List<(T value, String label)> options;
  final ValueChanged<T?> onChanged;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 24,
      runSpacing: 12,
      children: options
          .map(
            (o) => WashRadioLabeled<T>(
              label: o.$2,
              radio: WashRadio<T>(
                value: o.$1,
                groupValue: value,
                onChanged: onChanged,
                variant: WashRadioVariant.primary,
              ),
            ),
          )
          .toList(),
    );
  }
}

class WashSwap extends StatefulWidget {
  const WashSwap({
    required this.first,
    required this.second,
    super.key,
  });

  final Widget first;
  final Widget second;

  @override
  State<WashSwap> createState() => _WashSwapState();
}

class _WashSwapState extends State<WashSwap> {
  bool _showFirst = true;

  @override
  Widget build(BuildContext context) {
    return WashRipple(
      onTap: () => setState(() => _showFirst = !_showFirst),
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 200),
        child: _showFirst ? widget.first : widget.second,
      ),
    );
  }
}

class WashTransferList extends StatefulWidget {
  const WashTransferList({super.key});

  @override
  State<WashTransferList> createState() => _WashTransferListState();
}

class _WashTransferListState extends State<WashTransferList> {
  final _left = ['Alpha', 'Beta', 'Gamma'];
  final _right = <String>[];

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: _column('Available', _left, true)),
        WashIcon(WashIconGlyph.more),
        Expanded(child: _column('Selected', _right, false)),
      ],
    );
  }

  Widget _column(String title, List<String> items, bool toRight) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(title, textAlign: TextAlign.center),
        Expanded(
          child: ListView(
            children: items
                .map(
                  (e) => WashListTile(
                    title: Text(e),
                    onTap: () {
                      setState(() {
                        items.remove(e);
                        (toRight ? _right : _left).add(e);
                      });
                    },
                  ),
                )
                .toList(),
          ),
        ),
      ],
    );
  }
}

class WashSteps extends StatelessWidget {
  const WashSteps({required this.current, super.key});
  final int current;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < 3; i++)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text('Step ${i + 1}${i == current ? ' (current)' : ''}'),
          ),
      ],
    );
  }
}

class WashTimeline extends StatelessWidget {
  const WashTimeline({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        WashListTile(
          leading: WashIcon(WashIconGlyph.more, size: 12),
          title: Text('Created'),
          subtitle: Text('Today'),
        ),
        WashListTile(
          leading: WashIcon(WashIconGlyph.more, size: 12),
          title: Text('Shipped'),
        ),
      ],
    );
  }
}

class WashContextMenuTrigger extends StatelessWidget {
  const WashContextMenuTrigger({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashContextMenuLegacyPreview();
  }
}

class WashStatus extends StatelessWidget {
  const WashStatus({super.key});
  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        WashIcon(WashIconGlyph.more, size: 10, color: Color(0xFF22C55E)),
        SizedBox(width: 6),
        Text('Online'),
      ],
    );
  }
}

class WashSnackbarTrigger extends StatelessWidget {
  const WashSnackbarTrigger({super.key});
  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: 'Show snackbar',
      onPressed: () {
        showWashSnackbar(context, message: 'Saved');
      },
    );
  }
}

class WashToastTrigger extends StatelessWidget {
  const WashToastTrigger({super.key});
  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: 'Show toast',
      onPressed: () {
        showWashToast(
          context,
          message: 'Changes saved',
          tone: WashAlertTone.success,
          iconName: 'circle-check',
        );
      },
    );
  }
}

class WashValidatorForm extends StatelessWidget {
  const WashValidatorForm({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const WashInput(label: 'Required'),
        WashButton(label: 'Validate', onPressed: () {}),
      ],
    );
  }
}

class WashTagsInput extends StatefulWidget {
  const WashTagsInput({super.key});
  @override
  State<WashTagsInput> createState() => _WashTagsInputState();
}

class _WashTagsInputState extends State<WashTagsInput> {
  final _tags = ['design', 'flutter'];

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      children: [
        ..._tags.map((t) => WashChip(
            label: t,
            onDeleted: () {
              setState(() => _tags.remove(t));
            })),
        WashChip(
          label: '+ tag',
          onDeleted: () => setState(() => _tags.add('new')),
        ),
      ],
    );
  }
}

class WashLayersPreview extends StatelessWidget {
  const WashLayersPreview({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashStackLabeledCards();
  }
}

class WashPalettePreview extends StatelessWidget {
  const WashPalettePreview({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashSemanticPaletteGrid();
  }
}

class WashTableBasic extends StatelessWidget {
  const WashTableBasic({super.key});
  @override
  Widget build(BuildContext context) {
    return Table(
      children: const [
        TableRow(children: [Text('A'), Text('B')]),
        TableRow(children: [Text('1'), Text('2')]),
      ],
    );
  }
}

class WashDocPage extends StatelessWidget {
  const WashDocPage({required this.pageId, super.key});
  final String pageId;

  @override
  Widget build(BuildContext context) {
    return WashPlateCard(
      title: pageId,
      child: Text(
        'Documentation mirror for $pageId. See web demo for full prose and install steps.',
      ),
    );
  }
}

class WashAssetsFonts extends StatelessWidget {
  const WashAssetsFonts({super.key});
  @override
  Widget build(BuildContext context) {
    return const Text('Fraunces + Maple Mono (bundled woff2 assets)');
  }
}

class WashAssetsImages extends StatelessWidget {
  const WashAssetsImages({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashIcon(WashIconGlyph.image, size: 64);
  }
}

class WashIconsUtility extends StatelessWidget {
  const WashIconsUtility({super.key});
  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: const [
        WashLucideIcon('home', size: 24, strokeWidth: 1.75),
        WashLucideIcon('settings', size: 24, strokeWidth: 1.75),
        WashLucideIcon('search', size: 24, strokeWidth: 1.75),
        WashLucideIcon('heart', size: 24, strokeWidth: 1.75),
        WashLucideIcon('bat', size: 24, strokeWidth: 1.75, lab: true),
      ],
    );
  }
}

class WashIconsBrands extends StatelessWidget {
  const WashIconsBrands({super.key});
  @override
  Widget build(BuildContext context) {
    return const Text('Brand marks: use curated SVGs (Simple Icons policy)');
  }
}

class WashStoreMerch extends StatelessWidget {
  const WashStoreMerch({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashPlateCard(title: 'Merch', child: Text('Wash UI tee'));
  }
}

class WashStorePage extends StatelessWidget {
  const WashStorePage({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashPlateCard(title: 'Store', child: Text('Template bundles'));
  }
}

class WashRippleDemo extends StatelessWidget {
  const WashRippleDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: 'Press wash',
      variant: WashButtonVariant.defaultVariant,
      onPressed: () {},
    );
  }
}

class WashWatercolorPlayground extends StatelessWidget {
  const WashWatercolorPlayground({super.key});
  @override
  Widget build(BuildContext context) {
    return WashWatercolorSplash(
      seed: 1284,
      variant: 'blob',
      size: 160,
      opacity: 0.72,
      blur: 18,
    );
  }
}

class WashDrawerDemo extends StatelessWidget {
  const WashDrawerDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashDrawerBasicDemo();
  }
}
