import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/filter/wash_filter.dart';
import '../../components/indicator/wash_indicator.dart';
import '../../components/join/wash_join.dart';
import '../../components/badge/wash_badge.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashJoinGalleryPage extends StatelessWidget {
  const WashJoinGalleryPage({super.key});

  static const _sizes = <(String, WashButtonSize)>[
    ('XS', WashButtonSize.xs),
    ('SM', WashButtonSize.sm),
    ('MD', WashButtonSize.md),
    ('LG', WashButtonSize.lg),
    ('XL', WashButtonSize.xl),
  ];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Join',
      description:
          'daisyUI join groups: buttons, inputs, and selects sharing one continuous border.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'Joined buttons',
          description:
              'Direct sibling join-items share radius on the first and last child',
          child: _tabColumn([
            WashShowcaseTabs(
                preview: _basicSolid(), dartSource: _basicSolidDart),
            WashShowcaseTabs(
                preview: _basicOutline(), dartSource: _basicOutlineDart),
            WashShowcaseTabs(
                preview: const _BasicRadioDemo(), dartSource: _basicRadioDart),
          ]),
        ),
        WashGallerySection(
          eyebrow: '02 · Vertical',
          title: 'Join vertical',
          description: 'Stack items with join-vertical',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseWrap(
            spacing: 32,
            runSpacing: 24,
            children: [
              WashShowcaseTabs(
                  preview: _verticalSolid(), dartSource: _verticalSolidDart),
              WashShowcaseTabs(
                  preview: _verticalSoft(), dartSource: _verticalSoftDart),
            ],
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Input + button',
          title: 'Search-style join',
          description: 'Input and button as direct siblings',
          child: _tabColumn([
            WashShowcaseTabs(
                preview: _searchPlain(), dartSource: _searchPlainDart),
            WashShowcaseTabs(
                preview: _searchIcon(), dartSource: _searchIconDart),
            WashShowcaseTabs(
                preview: _subscribeRow(), dartSource: _subscribeDart),
          ]),
        ),
        WashGallerySection(
          eyebrow: '04 · Mixed controls',
          title: 'Select + button',
          description: 'Mix select, input, and button join-items in one group',
          tint: WashGalleryPanelTint.rose,
          child: _tabColumn([
            WashShowcaseTabs(
                preview: const _SelectApplyDemo(),
                dartSource: _selectApplyDart),
            WashShowcaseTabs(
                preview: const _SeriesHueDemo(), dartSource: _seriesHueDart),
            WashShowcaseTabs(
                preview: const _PigmentWrapDemo(),
                dartSource: _pigmentWrapDart),
          ]),
        ),
        WashGallerySection(
          eyebrow: '05 · Sizes',
          title: 'Item size modifiers',
          description: 'Join has no size class of its own',
          child: _tabColumn(
            _sizes
                .map(
                  (s) => WashShowcaseTabs(
                    preview: _sizeRow(s.$1, s.$2),
                    dartSource: _sizeDart(s.$1),
                  ),
                )
                .toList(),
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · Studio toolbar',
          title: 'Watercolor tool group',
          description: 'Icon tool strip for the pigment desk',
          tint: WashGalleryPanelTint.blue,
          child: _tabColumn([
            WashShowcaseTabs(
                preview: const _ToolbarIconsDemo(),
                dartSource: _toolbarIconsDart),
            WashShowcaseTabs(
                preview: _toolbarActions(), dartSource: _toolbarActionsDart),
          ]),
        ),
        WashGallerySection(
          eyebrow: '07 · Responsive',
          title: 'Vertical then horizontal',
          description:
              'join-vertical on small screens, lg:join-horizontal when space',
          child: WashShowcaseTabs(
              preview: const _ResponsiveJoinDemo(),
              dartSource: _responsiveDart),
        ),
      ],
    );
  }

  static Widget _tabColumn(List<Widget> tabs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < tabs.length; i++) ...[
          if (i > 0) const SizedBox(height: 20),
          tabs[i],
        ],
      ],
    );
  }

  static Widget _basicSolid() {
    return WashJoin(
      children: [
        WashButton(label: 'Wash', joinItem: true, onPressed: () {}),
        WashButton(
            label: 'Glaze', joinItem: true, active: true, onPressed: () {}),
        WashButton(label: 'Lift', joinItem: true, onPressed: () {}),
      ],
    );
  }

  static const _basicSolidDart = '''
WashJoin(
  children: [
    WashButton(label: 'Wash', joinItem: true, onPressed: () {}),
    WashButton(label: 'Glaze', joinItem: true, active: true, onPressed: () {}),
    WashButton(label: 'Lift', joinItem: true, onPressed: () {}),
  ],
);
''';

  static Widget _basicOutline() {
    return WashJoin(
      children: [
        WashButton(
            label: 'Day',
            joinItem: true,
            variant: WashButtonVariant.outline,
            onPressed: () {}),
        WashButton(
          label: 'Week',
          joinItem: true,
          variant: WashButtonVariant.outline,
          active: true,
          onPressed: () {},
        ),
        WashButton(
            label: 'Month',
            joinItem: true,
            variant: WashButtonVariant.outline,
            onPressed: () {}),
      ],
    );
  }

  static const _basicOutlineDart = '''
WashButton(label: 'Week', joinItem: true, variant: WashButtonVariant.outline, active: true, onPressed: () {});
''';

  static const _basicRadioDart = '''
WashJoin(
  children: [
    WashFilterRadio(label: 'Cold press', joinItem: true, selected: true, onSelected: () {}),
    WashFilterRadio(label: 'Hot press', joinItem: true, selected: false, onSelected: () {}),
    WashFilterRadio(label: 'Rough', joinItem: true, selected: false, onSelected: () {}),
  ],
);
''';

  static Widget _verticalSolid() {
    return WashJoin(
      vertical: true,
      children: [
        WashButton(label: 'Layer 1', joinItem: true, onPressed: () {}),
        WashButton(
            label: 'Layer 2', joinItem: true, active: true, onPressed: () {}),
        WashButton(label: 'Layer 3', joinItem: true, onPressed: () {}),
      ],
    );
  }

  static const _verticalSolidDart = '''
WashJoin(vertical: true, children: [WashButton(joinItem: true, …)]);
''';

  static Widget _verticalSoft() {
    return WashJoin(
      vertical: true,
      children: [
        WashButton(
          label: 'Foreground',
          joinItem: true,
          soft: true,
          variant: WashButtonVariant.primary,
          onPressed: () {},
        ),
        WashButton(
            label: 'Midground', joinItem: true, soft: true, onPressed: () {}),
        WashButton(
            label: 'Background', joinItem: true, soft: true, onPressed: () {}),
      ],
    );
  }

  static const _verticalSoftDart = '''
WashJoin(vertical: true, children: [WashButton(soft: true, joinItem: true, …)]);
''';

  static Widget _searchPlain() {
    return WashJoin(
      fullWidth: true,
      children: [
        WashJoinInput(hint: 'Search plates…'),
        WashButton(label: 'Search', joinItem: true, onPressed: () {}),
      ],
    );
  }

  static const _searchPlainDart = '''
WashJoin(
  fullWidth: true,
  children: [
    WashJoinInput(hint: 'Search plates…', width: growWidth),
    WashButton(label: 'Search', joinItem: true, onPressed: () {}),
  ],
);
''';

  static Widget _searchIcon() {
    return Builder(
      builder: (context) {
        final muted = WashTokens.of(context).inkMuted.withValues(alpha: 0.6);
        return WashJoin(
          fullWidth: true,
          children: [
            WashJoinInput(
              hint: 'Filter ledger…',
              leading: WashLucideIcon('search', size: 16, color: muted),
            ),
            WashButton(
              label: 'Go',
              joinItem: true,
              variant: WashButtonVariant.neutral,
              onPressed: () {},
            ),
          ],
        );
      },
    );
  }

  static const _searchIconDart = '''
WashJoinInput(leading: WashLucideIcon('search', size: 16), hint: 'Filter ledger…', width: growWidth);
''';

  static Widget _subscribeRow() {
    return WashJoin(
      fullWidth: true,
      children: [
        WashJoinInput(hint: 'studio@menzies.design'),
        WashButton(
          label: 'Subscribe',
          joinItem: true,
          variant: WashButtonVariant.secondary,
          onPressed: () {},
        ),
      ],
    );
  }

  static const _subscribeDart = '''
WashJoin(fullWidth: true, children: [WashJoinInput(width: growWidth), WashButton(joinItem: true, …)]);
''';

  static const _selectApplyDart = '''
WashJoinSelect(value: '300', options: [190, 300, 640 gsm], …);
WashButton(label: 'Apply', joinItem: true, onPressed: () {});
''';

  static const _seriesHueDart = '''
WashJoin(fullWidth: true, children: [WashJoinInput(width: growWidth), WashJoinSelect(...), WashButton(joinItem: true)]);
''';

  static const _pigmentWrapDart = '''
WashJoin(wrap: true, children: [WashJoinInput(), WashJoinSelect(), WashIndicator + WashButton]);
''';

  static Widget _sizeRow(String name, WashButtonSize size) {
    return WashJoin(
      fullWidth: true,
      children: [
        WashJoinInput(hint: '$name search…', size: size),
        WashButton(label: 'Find', joinItem: true, size: size, onPressed: () {}),
      ],
    );
  }

  static String _sizeDart(String name) {
    final key = name.toLowerCase();
    return "WashJoinInput(size: WashButtonSize.$key, width: growWidth);";
  }

  static Widget _toolbarActions() {
    return WashJoin(
      children: [
        WashButton(label: 'Undo', joinItem: true, soft: true, onPressed: () {}),
        WashButton(label: 'Redo', joinItem: true, soft: true, onPressed: () {}),
        WashButton(
          label: 'Commit wash',
          joinItem: true,
          variant: WashButtonVariant.primary,
          onPressed: () {},
        ),
      ],
    );
  }

  static const _toolbarActionsDart = '''
WashJoin(children: [WashButton(soft: true, joinItem: true), WashButton(joinItem: true, variant: primary)]);
''';

  static const _toolbarIconsDart = '''
WashJoin(children: [WashTooltip + WashButton(square, joinItem, WashLucideIcon), …]);
''';

  static const _responsiveDart = '''
WashJoin.responsiveLg(maxWidth: constraints.maxWidth, children: [WashButton(joinItem: true, …)]);
''';
}

class _BasicRadioDemo extends StatefulWidget {
  const _BasicRadioDemo();

  @override
  State<_BasicRadioDemo> createState() => _BasicRadioDemoState();
}

class _BasicRadioDemoState extends State<_BasicRadioDemo> {
  var _paper = 'Cold press';

  @override
  Widget build(BuildContext context) {
    const papers = ['Cold press', 'Hot press', 'Rough'];
    return WashJoin(
      children: [
        for (final p in papers)
          WashFilterRadio(
            label: p,
            joinItem: true,
            selected: _paper == p,
            onSelected: () => setState(() => _paper = p),
          ),
      ],
    );
  }
}

class _SelectApplyDemo extends StatefulWidget {
  const _SelectApplyDemo();

  @override
  State<_SelectApplyDemo> createState() => _SelectApplyDemoState();
}

class _SelectApplyDemoState extends State<_SelectApplyDemo> {
  var _weight = '300';

  @override
  Widget build(BuildContext context) {
    return WashJoin(
      fullWidth: true,
      children: [
        WashJoinSelect<String>(
          value: _weight,
          accessibilityLabel: 'Paper weight',
          options: const [
            WashJoinSelectOption(value: '190', label: '190 gsm'),
            WashJoinSelectOption(value: '300', label: '300 gsm'),
            WashJoinSelectOption(value: '640', label: '640 gsm'),
          ],
          onChanged: (v) => setState(() => _weight = v ?? _weight),
        ),
        WashButton(label: 'Apply', joinItem: true, onPressed: () {}),
      ],
    );
  }
}

class _SeriesHueDemo extends StatefulWidget {
  const _SeriesHueDemo();

  @override
  State<_SeriesHueDemo> createState() => _SeriesHueDemoState();
}

class _SeriesHueDemoState extends State<_SeriesHueDemo> {
  String? _hue;

  @override
  Widget build(BuildContext context) {
    return WashJoin(
      fullWidth: true,
      children: [
        WashJoinInput(hint: 'Series name…'),
        WashJoinSelect<String>(
          value: _hue,
          placeholder: 'Hue',
          accessibilityLabel: 'Hue family',
          options: const [
            WashJoinSelectOption(value: 'cool', label: 'Cool'),
            WashJoinSelectOption(value: 'warm', label: 'Warm'),
            WashJoinSelectOption(value: 'earth', label: 'Earth'),
          ],
          onChanged: (v) => setState(() => _hue = v),
        ),
        WashButton(
            label: 'Add',
            joinItem: true,
            variant: WashButtonVariant.defaultVariant,
            onPressed: () {}),
      ],
    );
  }
}

class _PigmentWrapDemo extends StatefulWidget {
  const _PigmentWrapDemo();

  @override
  State<_PigmentWrapDemo> createState() => _PigmentWrapDemoState();
}

class _PigmentWrapDemoState extends State<_PigmentWrapDemo> {
  String? _wash;

  @override
  Widget build(BuildContext context) {
    return WashJoin(
      wrap: true,
      children: [
        WashJoinInput(hint: 'Pigment…'),
        WashJoinSelect<String>(
          value: _wash,
          placeholder: 'Wash',
          accessibilityLabel: 'Wash type',
          options: const [
            WashJoinSelectOption(value: 'glaze', label: 'Glaze'),
            WashJoinSelectOption(value: 'flat', label: 'Flat'),
            WashJoinSelectOption(value: 'granulating', label: 'Granulating'),
          ],
          onChanged: (v) => setState(() => _wash = v),
        ),
        WashIndicator(
          marks: const [
            WashIndicatorMark(
                child: WashBadge('new', tone: WashBadgeTone.secondary)),
          ],
          child: WashButton(label: 'Search', joinItem: true, onPressed: () {}),
        ),
      ],
    );
  }
}

class _ToolbarIconsDemo extends StatefulWidget {
  const _ToolbarIconsDemo();

  @override
  State<_ToolbarIconsDemo> createState() => _ToolbarIconsDemoState();
}

class _ToolbarIconsDemoState extends State<_ToolbarIconsDemo> {
  var _active = 'Brush';

  @override
  Widget build(BuildContext context) {
    const tools = <(String, String)>[
      ('Brush', 'paintbrush'),
      ('Pencil', 'pencil'),
      ('Wash', 'droplets'),
      ('Eraser', 'eraser'),
      ('Mask', 'square'),
    ];
    return WashJoin(
      children: [
        for (final (label, icon) in tools)
          WashTooltip(
            message: label,
            child: WashButton(
              joinItem: true,
              square: true,
              variant: _active == label
                  ? WashButtonVariant.primary
                  : WashButtonVariant.defaultVariant,
              onPressed: () => setState(() => _active = label),
              child: WashLucideIcon(icon, size: 16),
            ),
          ),
      ],
    );
  }
}

class _ResponsiveJoinDemo extends StatelessWidget {
  const _ResponsiveJoinDemo();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, c) {
        return WashJoin.responsiveLg(
          maxWidth: c.maxWidth,
          children: [
            WashButton(label: 'Coastal', joinItem: true, onPressed: () {}),
            WashButton(
                label: 'Alpine',
                joinItem: true,
                active: true,
                onPressed: () {}),
            WashButton(label: 'Desert', joinItem: true, onPressed: () {}),
            WashButton(label: 'Urban', joinItem: true, onPressed: () {}),
          ],
        );
      },
    );
  }
}
