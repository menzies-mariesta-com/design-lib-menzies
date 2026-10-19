import 'package:flutter/widgets.dart';

import '../../components/layout/wash_stack.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashLayersGalleryPage extends StatefulWidget {
  const WashLayersGalleryPage({super.key});

  @override
  State<WashLayersGalleryPage> createState() => _WashLayersGalleryPageState();
}

class _WashLayersGalleryPageState extends State<WashLayersGalleryPage> {
  late List<WashPigmentLayer> _layers;

  @override
  void initState() {
    super.initState();
    _layers = WashPigmentLayer.initial();
  }

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Studio tool',
      title: 'Layers',
      description: 'daisyUI stack placements.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Base',
          title: 'stack',
          description: 'Elements layered on top of each other',
          child: WashShowcaseTabs(
            preview: const WashStackLabeledCards(),
            dartSource: _stackCardsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Placement',
          title: 'Alignment modifiers',
          description: 'Every stack placement: top, bottom, start',
          tint: WashGalleryPanelTint.ochre,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final cols = constraints.maxWidth >= 1280
                  ? 5
                  : constraints.maxWidth >= 640
                      ? 2
                      : 1;
              const placements = <(String, WashStackPlacement)>[
                ('Default', WashStackPlacement.bottom),
                ('Top', WashStackPlacement.top),
                ('Bottom', WashStackPlacement.bottom),
                ('Start', WashStackPlacement.start),
                ('End', WashStackPlacement.end),
              ];
              final gap = 32.0;
              final cellW = cols == 1
                  ? constraints.maxWidth
                  : (constraints.maxWidth - gap * (cols - 1)) / cols;
              return Wrap(
                spacing: gap,
                runSpacing: gap,
                children: [
                  for (final p in placements)
                    SizedBox(
                      width: cellW,
                      child: WashShowcaseTabs(
                        preview: Center(
                          child: WashStackLabeledCards(placement: p.$2),
                        ),
                        dartSource: p.$1 == 'Default'
                            ? 'WashStackLabeledCards()'
                            : 'WashStackLabeledCards(placement: WashStackPlacement.${p.$2.name})',
                      ),
                    ),
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Scale',
          title: 'Sized stacks',
          description:
              'Shared dimensions keep stacked plates aligned for studio previews',
          child: const Wrap(
            spacing: 40,
            runSpacing: 24,
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              WashShowcaseTabs(
                preview: WashStackLabeledCards(width: 80, height: 56),
                dartSource: 'WashStackLabeledCards(width: 80, height: 56)',
              ),
              WashShowcaseTabs(
                preview: WashStackLabeledCards(width: 128, height: 96),
                dartSource: 'WashStackLabeledCards(width: 128, height: 96)',
              ),
              WashShowcaseTabs(
                preview: WashStackLabeledCards(width: 160, height: 112),
                dartSource: 'WashStackLabeledCards(width: 160, height: 112)',
              ),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Wash desk',
          title: 'Pigment layer stack',
          description: 'Reorderable-looking list with opacity, visibility',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: WashLayersDesk(
              layers: _layers,
              onLayersChanged: (v) => setState(() => _layers = v),
            ),
            dartSource: _washDeskDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Composite',
          title: 'Plate preview',
          description:
              'Visible washes stacked as a living stack, opacity mirrored from the desk',
          child: WashShowcaseTabs(
            preview: WashLayersCompositePlate(layers: _layers),
            dartSource: _compositeDart,
          ),
        ),
      ],
    );
  }

  static const _stackCardsDart = '''
WashStackLabeledCards();
''';

  static const _washDeskDart = '''
WashLayersDesk(
  layers: layers,
  onLayersChanged: (v) => setState(() => layers = v),
);
''';

  static const _compositeDart = 'WashLayersCompositePlate(layers: layers)';
}
