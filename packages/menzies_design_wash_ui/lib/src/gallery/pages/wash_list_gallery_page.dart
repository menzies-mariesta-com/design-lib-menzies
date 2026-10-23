import 'package:flutter/widgets.dart';

import '../../components/badge/wash_badge.dart';
import '../../components/button/wash_button.dart';
import '../../components/list/wash_list.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../placement/tooltip_placement.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../../widgets/wash_feedback.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashListGalleryPage extends StatefulWidget {
  const WashListGalleryPage({super.key});

  @override
  State<WashListGalleryPage> createState() => _WashListGalleryPageState();
}

class _WashListGalleryPageState extends State<WashListGalleryPage> {
  int _hoverDemoActive = 1;
  late List<_PigmentRow> _pigments;
  String _activePigmentId = 'p1';

  @override
  void initState() {
    super.initState();
    _pigments = List<_PigmentRow>.from(_pigmentSeed);
  }

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      kicker: 'Component gallery',
      title: 'List',
      description:
          'daisyUI list and list-col-grow rows with figures, badges, actions, list-col-grow, list-col-wrap, hover, and.',
      sections: [
        WashGallerySection(
          eyebrow: '01 · Basic',
          title: 'list + list-row',
          description: 'Vertical flex shell with horizontal grid rows',
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 448,
              children: const [
                WashListRow(children: [WashListTitle('Cerulean wash')]),
                WashListRow(children: [WashListTitle('Ochre glaze')]),
                WashListRow(children: [WashListTitle('Rose bloom')]),
              ],
            ),
            dartSource: _basicDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '02 · Header',
          title: 'Section label row',
          description:
              'A plain li ahead of list-row items for a quiet group title',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 448,
              children: [
                const WashListSectionLabel('Most played plates this week'),
                for (final s in _songs)
                  WashListRow(children: [WashListTitle(s.track)]),
              ],
            ),
            dartSource: _headerDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '03 · Icons, avatars, badges',
          title: 'Figures and status chips',
          description:
              'Lucide icons, avatar placeholders, and badge chips beside growing',
          child: LayoutBuilder(
            builder: (context, constraints) {
              final wide = constraints.maxWidth >= 1024;
              final icons = WashShowcaseTabs(
                preview: WashList(
                  children: [
                    const WashListSectionLabel('Wash queue'),
                    for (final row in _iconRows)
                      WashListRow(
                        children: [
                          WashLucideIcon(
                            row.icon,
                            size: 20,
                            color: WashTokens.of(context)
                                .onSurface
                                .withValues(alpha: 0.8),
                          ),
                          WashListTextBlock(
                              title: row.name, subtitle: row.hint),
                          WashBadge(
                            row.badge,
                            size: WashBadgeSize.sm,
                            tone: row.tone,
                            style: row.style,
                          ),
                        ],
                      ),
                  ],
                ),
                dartSource: _iconsDart,
              );
              final avatars = WashShowcaseTabs(
                preview: WashList(
                  children: [
                    const WashListSectionLabel('Studio roster'),
                    for (var i = 0; i < _songs.length; i++)
                      WashListRow(
                        children: [
                          _ListAvatar(
                            initials: _songs[i].initials,
                            wash: _songs[i].wash,
                          ),
                          WashListTextBlock(
                            title: _songs[i].artist,
                            subtitle: _songs[i].track,
                            subtitleUppercase: true,
                          ),
                          WashBadge(
                            i == 0 ? 'Lead' : 'Bench',
                            size: WashBadgeSize.sm,
                            tone: i == 0
                                ? WashBadgeTone.primary
                                : WashBadgeTone.defaultTone,
                            style: i == 0
                                ? WashBadgeStyle.solid
                                : WashBadgeStyle.ghost,
                          ),
                        ],
                      ),
                  ],
                ),
                dartSource: _avatarsDart,
              );
              if (wide) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: icons),
                    const SizedBox(width: 24),
                    Expanded(child: avatars),
                  ],
                );
              }
              return Column(
                children: [
                  icons,
                  const SizedBox(height: 24),
                  avatars,
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '04 · Titles and descriptions',
          title: 'Second column grows (default)',
          description: 'Title plus muted subtitle',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 512,
              children: [
                const WashListSectionLabel('Most played songs this week'),
                for (final s in _songs)
                  WashListRow(
                    children: [
                      _ListAvatar(initials: s.initials, wash: s.wash),
                      WashListTextBlock(
                        title: s.artist,
                        subtitle: s.track,
                        subtitleUppercase: true,
                      ),
                    ],
                  ),
              ],
            ),
            dartSource: _titlesDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '05 · Actions',
          title: 'Icon actions on the trailing edge',
          description: 'Ghost square buttons with matching tooltips',
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 576,
              children: [
                const WashListSectionLabel('Most played songs this week'),
                for (final s in _songs)
                  WashListRow(
                    children: [
                      _ListAvatar(initials: s.initials, wash: s.wash),
                      WashListTextBlock(
                        title: s.artist,
                        subtitle: s.track,
                        subtitleUppercase: true,
                      ),
                      _iconAction(
                        tip: 'Play',
                        tint: WashButtonVariant.primary,
                        icon: 'play',
                      ),
                      _iconAction(
                        tip: 'Favorite',
                        tint: WashButtonVariant.accent,
                        icon: 'heart',
                      ),
                    ],
                  ),
              ],
            ),
            dartSource: _actionsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '06 · list-col-grow',
          title: 'Third column grows',
          description: 'Index + figure + growing title block',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 576,
              children: [
                const WashListSectionLabel('Most played songs this week'),
                for (var i = 0; i < _songs.length; i++)
                  WashListRow(
                    growIndex: 2,
                    children: [
                      Text(
                        (i + 1).toString().padLeft(2, '0'),
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w200,
                          color: WashTokens.of(context)
                              .onSurface
                              .withValues(alpha: 0.3),
                          fontFeatures: const [FontFeature.tabularFigures()],
                        ),
                      ),
                      _ListAvatar(
                        initials: _songs[i].initials,
                        wash: _songs[i].wash,
                      ),
                      WashListTextBlock(
                        title: _songs[i].artist,
                        subtitle: _songs[i].track,
                        subtitleUppercase: true,
                      ),
                      _iconAction(
                        tip: 'Play',
                        tint: WashButtonVariant.primary,
                        icon: 'play',
                      ),
                    ],
                  ),
              ],
            ),
            dartSource: _growDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '07 · list-col-wrap',
          title: 'Description wraps to next line',
          description:
              'list-col-wrap pushes a child onto the next grid row for longer copy',
          tint: WashGalleryPanelTint.rose,
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 576,
              children: [
                const WashListSectionLabel('Most played songs this week'),
                for (final s in _songs)
                  WashListRow(
                    wrap: Text(
                      s.blurb,
                      style: WashTypography.body(
                        WashTokens.of(context).inkMuted,
                      ).copyWith(fontSize: 12),
                    ),
                    children: [
                      _ListAvatar(initials: s.initials, wash: s.wash),
                      WashListTextBlock(
                        title: s.artist,
                        subtitle: s.track,
                        subtitleUppercase: true,
                      ),
                      _iconAction(
                        tip: 'Play',
                        tint: WashButtonVariant.primary,
                        icon: 'play',
                      ),
                      _iconAction(
                        tip: 'Favorite',
                        tint: WashButtonVariant.accent,
                        icon: 'heart',
                      ),
                    ],
                  ),
              ],
            ),
            dartSource: _wrapDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '08 · Hover and active',
          title: 'Selectable list rows',
          description:
              'cursor-pointer on rows, hover wash, and an active selection state',
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 512,
              children: [
                const WashListSectionLabel('Pick a plate'),
                for (var i = 0; i < _songs.length; i++)
                  WashListRow(
                    hoverable: true,
                    selected: _hoverDemoActive == i,
                    onTap: () => setState(() => _hoverDemoActive = i),
                    children: [
                      _ListAvatar(
                        initials: _songs[i].initials,
                        wash: _songs[i].wash,
                      ),
                      WashListTextBlock(
                        title: _songs[i].track,
                        subtitle: _songs[i].artist,
                      ),
                      if (_hoverDemoActive == i)
                        const WashBadge(
                          'Active',
                          size: WashBadgeSize.sm,
                          tone: WashBadgeTone.primary,
                        ),
                    ],
                  ),
              ],
            ),
            dartSource: _hoverDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '09 · Studio pigments',
          title: 'Interactive watercolor desk',
          description: 'Select a pigment, cycle its status, or remove it',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: _studioPigments(context),
            dartSource: _pigmentsDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '10 · Surface variants',
          title: 'Bordered and soft shadow',
          description: 'daisyUI list has no size or bordered modifiers',
          child: LayoutBuilder(
            builder: (context, constraints) {
              final wide = constraints.maxWidth >= 768;
              final bordered = WashShowcaseTabs(
                preview: WashList(
                  bordered: true,
                  shadow: WashListShadow.none,
                  children: [
                    for (final s in _songs)
                      WashListRow(children: [WashListTitle(s.track)]),
                  ],
                ),
                dartSource:
                    'WashList(bordered: true, shadow: WashListShadow.none, …)',
              );
              final soft = WashShowcaseTabs(
                preview: WashList(
                  bordered: false,
                  shadow: WashListShadow.md,
                  children: [
                    for (final s in _songs)
                      WashListRow(children: [WashListTitle(s.track)]),
                  ],
                ),
                dartSource:
                    'WashList(bordered: false, shadow: WashListShadow.md, …)',
              );
              if (wide) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: bordered),
                    const SizedBox(width: 24),
                    Expanded(child: soft),
                  ],
                );
              }
              return Column(
                children: [
                  bordered,
                  const SizedBox(height: 24),
                  soft,
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '11 · Responsive',
          title: 'Two-up from md',
          description: 'Side-by-side lists on tablet and up',
          tint: WashGalleryPanelTint.rose,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final wide = constraints.maxWidth >= 768;
              final cool = WashShowcaseTabs(
                preview: WashList(
                  children: [
                    const WashListSectionLabel('Cool washes'),
                    WashListRow(
                      hoverable: true,
                      onTap: () {},
                      children: const [
                        WashLucideIcon('droplets', size: 16),
                        WashListTitle('Cerulean'),
                        WashBadge(
                          'Cool',
                          size: WashBadgeSize.sm,
                          tone: WashBadgeTone.info,
                        ),
                      ],
                    ),
                    WashListRow(
                      hoverable: true,
                      onTap: () {},
                      children: const [
                        WashLucideIcon('droplets', size: 16),
                        WashListTitle('Ultramarine'),
                        WashBadge(
                          'Cool',
                          size: WashBadgeSize.sm,
                          tone: WashBadgeTone.info,
                        ),
                      ],
                    ),
                  ],
                ),
                dartSource: _coolDart,
              );
              final warm = WashShowcaseTabs(
                preview: WashList(
                  children: [
                    const WashListSectionLabel('Warm washes'),
                    WashListRow(
                      hoverable: true,
                      onTap: () {},
                      children: const [
                        WashLucideIcon('paintbrush', size: 16),
                        WashListTitle('Raw sienna'),
                        WashBadge(
                          'Warm',
                          size: WashBadgeSize.sm,
                          tone: WashBadgeTone.warning,
                        ),
                      ],
                    ),
                    WashListRow(
                      hoverable: true,
                      onTap: () {},
                      children: const [
                        WashLucideIcon('paintbrush', size: 16),
                        WashListTitle('Alizarin'),
                        WashBadge(
                          'Warm',
                          size: WashBadgeSize.sm,
                          tone: WashBadgeTone.warning,
                        ),
                      ],
                    ),
                  ],
                ),
                dartSource: _warmDart,
              );
              if (wide) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: cool),
                    const SizedBox(width: 16),
                    Expanded(child: warm),
                  ],
                );
              }
              return Column(
                children: [
                  cool,
                  const SizedBox(height: 16),
                  warm,
                ],
              );
            },
          ),
        ),
        WashGallerySection(
          eyebrow: '12 · CRUD actions',
          title: 'View, edit, delete',
          description: 'Semantic icon actions with matched tooltip colors',
          child: WashShowcaseTabs(
            preview: WashList(
              maxWidth: 576,
              children: [
                const WashListSectionLabel('Plate ledger'),
                for (final s in _songs)
                  WashListRow(
                    children: [
                      _ListAvatar(initials: s.initials, wash: s.wash),
                      WashListTextBlock(title: s.track, subtitle: s.artist),
                      _iconAction(
                        tip: 'View',
                        tint: WashButtonVariant.primary,
                        icon: 'eye',
                      ),
                      _iconAction(
                        tip: 'Edit',
                        tint: WashButtonVariant.secondary,
                        icon: 'pencil',
                      ),
                      _iconAction(
                        tip: 'Delete',
                        tint: WashButtonVariant.error,
                        icon: 'trash-2',
                      ),
                    ],
                  ),
              ],
            ),
            dartSource: _crudDart,
          ),
        ),
        WashGallerySection(
          eyebrow: '13 · Class map',
          title: 'Components and modifiers',
          description: 'Official daisyUI list surface',
          tint: WashGalleryPanelTint.ochre,
          child: WashShowcaseTabs(
            preview: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _ClassMapTable(),
                const SizedBox(height: 12),
                const WashListClassLabel(
                  'list · list-row · list-col-grow · list-col-wrap',
                ),
              ],
            ),
            dartSource: _classMapDart,
          ),
        ),
      ],
    );
  }

  Widget _studioPigments(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select a pigment row. Cycle status or remove a wash from the desk.',
          style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 14),
        ),
        const SizedBox(height: 12),
        WashList(
          maxWidth: 672,
          children: [
            const WashListSectionLabel('Studio pigments'),
            if (_pigments.isEmpty)
              WashListRow(
                children: [
                  Text(
                    'No pigments on the desk. Refresh to restore the sample set.',
                    style: WashTypography.body(tokens.inkMuted)
                        .copyWith(fontSize: 14),
                  ),
                ],
              )
            else
              for (final row in _pigments)
                WashListRow(
                  hoverable: true,
                  selected: row.id == _activePigmentId,
                  onTap: () => setState(() => _activePigmentId = row.id),
                  children: [
                    _WashSwatch(row.wash),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          spacing: 8,
                          runSpacing: 4,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          children: [
                            WashListTitle(row.name),
                            WashBadge(
                              row.status.label,
                              size: WashBadgeSize.sm,
                              tone: row.status.tone,
                              style: row.status.style,
                            ),
                            if (row.id == _activePigmentId)
                              const WashBadge(
                                'Active',
                                size: WashBadgeSize.sm,
                                tone: WashBadgeTone.primary,
                              ),
                          ],
                        ),
                        const SizedBox(height: 2),
                        WashListSubtitle(row.series),
                      ],
                    ),
                    _iconAction(
                      tip: 'Cycle status',
                      tint: WashButtonVariant.secondary,
                      icon: 'droplets',
                      onPressed: () => _cycleStatus(row.id),
                    ),
                    _iconAction(
                      tip: 'Remove',
                      tint: WashButtonVariant.error,
                      icon: 'trash-2',
                      onPressed: () => _removePigment(row.id),
                    ),
                  ],
                ),
          ],
        ),
        const SizedBox(height: 12),
        const WashListClassLabel(
          'list-row · cursor-pointer · hover:bg-primary/40 · active bg-primary/20',
        ),
      ],
    );
  }

  void _cycleStatus(String id) {
    setState(() {
      _pigments = _pigments.map((row) {
        if (row.id != id) return row;
        final next = switch (row.status) {
          _PigmentStatus.ready => _PigmentStatus.drying,
          _PigmentStatus.drying => _PigmentStatus.queued,
          _PigmentStatus.queued => _PigmentStatus.ready,
        };
        return row.copyWith(status: next);
      }).toList();
    });
  }

  void _removePigment(String id) {
    setState(() {
      _pigments = _pigments.where((r) => r.id != id).toList();
      if (_activePigmentId == id) {
        _activePigmentId = _pigments.isEmpty ? '' : _pigments.first.id;
      }
    });
  }

  static Widget _iconAction({
    required String tip,
    required WashButtonVariant tint,
    required String icon,
    VoidCallback? onPressed,
  }) {
    return WashTooltip(
      message: tip,
      prefer: WashTooltipSide.left,
      child: WashButton(
        size: WashButtonSize.sm,
        variant: WashButtonVariant.ghost,
        tint: tint,
        square: true,
        onPressed: onPressed ?? () {},
        child: WashLucideIcon(icon, size: 16),
      ),
    );
  }

  static const _basicDart = '''
WashList(
  maxWidth: 448,
  children: [
    WashListRow(children: [WashListTitle('Cerulean wash')]),
    …
  ],
);
''';

  static const _headerDart =
      "WashList(children: [WashListSectionLabel('…'), WashListRow(…)])";

  static const _iconsDart = 'WashListRow + WashLucideIcon + WashBadge';

  static const _avatarsDart = 'WashListRow + avatar placeholder + WashBadge';

  static const _titlesDart = 'WashListRow(avatar, WashListTextBlock(…))';

  static const _actionsDart =
      'WashListRow + WashButton(variant: ghost, tint: …, square: true)';

  static const _growDart =
      'WashListRow(growIndex: 2, children: [index, avatar, text, action])';

  static const _wrapDart = 'WashListRow(…, wrap: Text(blurb))';

  static const _hoverDart =
      'WashListRow(hoverable: true, selected: …, onTap: …)';

  static const _pigmentsDart =
      'Interactive WashList with status cycle + remove';

  static const _coolDart = 'WashList cool washes column';

  static const _warmDart = 'WashList warm washes column';

  static const _crudDart = 'View / Edit / Delete ghost icon actions';

  static const _classMapDart =
      'list · list-row · list-col-grow · list-col-wrap';
}

enum _WashKind { blue, ochre, rose }

class _Song {
  const _Song({
    required this.artist,
    required this.track,
    required this.blurb,
    required this.wash,
    required this.initials,
  });

  final String artist;
  final String track;
  final String blurb;
  final _WashKind wash;
  final String initials;
}

const _songs = <_Song>[
  _Song(
    artist: 'Mira K.',
    track: 'Harbor dawn',
    blurb: 'Soft cerulean washes over cold paper. Morning light on wet docks.',
    wash: _WashKind.blue,
    initials: 'MK',
  ),
  _Song(
    artist: 'Jon L.',
    track: 'Ochre cliff',
    blurb: 'Dry-brush edges and earth tones. A study in warm restraint.',
    wash: _WashKind.ochre,
    initials: 'JL',
  ),
  _Song(
    artist: 'Ada R.',
    track: 'Rose bloom',
    blurb: 'Petal glazes layered wet-on-wet until the paper sings.',
    wash: _WashKind.rose,
    initials: 'AR',
  ),
];

class _IconRow {
  const _IconRow({
    required this.name,
    required this.hint,
    required this.icon,
    required this.badge,
    required this.tone,
    required this.style,
  });

  final String name;
  final String hint;
  final String icon;
  final String badge;
  final WashBadgeTone tone;
  final WashBadgeStyle style;
}

const _iconRows = <_IconRow>[
  _IconRow(
    name: 'Cerulean wash',
    hint: 'Cool undertone',
    icon: 'droplets',
    badge: 'Ready',
    tone: WashBadgeTone.info,
    style: WashBadgeStyle.solid,
  ),
  _IconRow(
    name: 'Ochre glaze',
    hint: 'Warm earth',
    icon: 'paintbrush',
    badge: 'Drying',
    tone: WashBadgeTone.warning,
    style: WashBadgeStyle.solid,
  ),
  _IconRow(
    name: 'Rose bloom',
    hint: 'Floral series',
    icon: 'layers',
    badge: 'Queued',
    tone: WashBadgeTone.defaultTone,
    style: WashBadgeStyle.ghost,
  ),
];

enum _PigmentStatus {
  ready('Ready', WashBadgeTone.success, WashBadgeStyle.solid),
  drying('Drying', WashBadgeTone.warning, WashBadgeStyle.solid),
  queued('Queued', WashBadgeTone.defaultTone, WashBadgeStyle.ghost);

  const _PigmentStatus(this.label, this.tone, this.style);
  final String label;
  final WashBadgeTone tone;
  final WashBadgeStyle style;
}

class _PigmentRow {
  const _PigmentRow({
    required this.id,
    required this.name,
    required this.series,
    required this.wash,
    required this.status,
  });

  final String id;
  final String name;
  final String series;
  final _WashKind wash;
  final _PigmentStatus status;

  _PigmentRow copyWith({_PigmentStatus? status}) => _PigmentRow(
        id: id,
        name: name,
        series: series,
        wash: wash,
        status: status ?? this.status,
      );
}

const _pigmentSeed = <_PigmentRow>[
  _PigmentRow(
    id: 'p1',
    name: "Payne's gray",
    series: 'Mist bank',
    wash: _WashKind.blue,
    status: _PigmentStatus.ready,
  ),
  _PigmentRow(
    id: 'p2',
    name: 'Raw sienna',
    series: 'Warm earth',
    wash: _WashKind.ochre,
    status: _PigmentStatus.drying,
  ),
  _PigmentRow(
    id: 'p3',
    name: 'Alizarin lake',
    series: 'Florals',
    wash: _WashKind.rose,
    status: _PigmentStatus.queued,
  ),
  _PigmentRow(
    id: 'p4',
    name: 'Ultramarine',
    series: 'Coastal',
    wash: _WashKind.blue,
    status: _PigmentStatus.ready,
  ),
];

class _ListAvatar extends StatelessWidget {
  const _ListAvatar({required this.initials, required this.wash});

  final String initials;
  final _WashKind wash;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    final fill = switch (wash) {
      _WashKind.blue => atmo.washA,
      _WashKind.ochre => atmo.washB,
      _WashKind.rose => atmo.washC,
    };
    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
      ),
      child: Text(
        initials,
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _WashSwatch extends StatelessWidget {
  const _WashSwatch(this.wash);

  final _WashKind wash;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final atmo = kWashAtmosphereByTheme[tokens.pigmentId] ??
        kWashAtmosphereByTheme['mineral']!;
    final fill = switch (wash) {
      _WashKind.blue => atmo.washA,
      _WashKind.ochre => atmo.washB,
      _WashKind.rose => atmo.washC,
    };
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: fill,
        borderRadius: BorderRadius.circular(tokens.radiusBox),
        border: Border.all(color: tokens.inkBorder),
      ),
    );
  }
}

class _ClassMapTable extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const rows = <(String, String, String)>[
      ('list', 'Component', 'Vertical flex shell for rows'),
      ('list-row', 'Component', 'Horizontal grid item'),
      ('list-col-grow', 'Modifier', 'Child fills remaining space'),
      ('list-col-wrap', 'Modifier', 'Child wraps to next line'),
    ];
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(tokens.radiusBox),
      ),
      child: Column(
        children: [
          Container(
            color: tokens.surfaceContainer.withValues(alpha: 0.5),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Row(
              children: [
                _th(tokens, 'Class', flex: 2),
                _th(tokens, 'Type', flex: 1),
                _th(tokens, 'Role', flex: 3),
              ],
            ),
          ),
          for (var i = 0; i < rows.length; i++)
            Container(
              color: i.isOdd
                  ? tokens.surfaceContainer.withValues(alpha: 0.35)
                  : null,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              child: Row(
                children: [
                  Expanded(
                    flex: 2,
                    child: Text(
                      rows[i].$1,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontFamily: 'monospace',
                        fontSize: 12,
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Text(
                      rows[i].$2,
                      style: WashTypography.body(tokens.onSurface)
                          .copyWith(fontSize: 13),
                    ),
                  ),
                  Expanded(
                    flex: 3,
                    child: Text(
                      rows[i].$3,
                      style: WashTypography.body(tokens.onSurface)
                          .copyWith(fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  static Widget _th(WashTokens tokens, String label, {required int flex}) {
    return Expanded(
      flex: flex,
      child: Text(
        label,
        style: WashTypography.label(tokens.inkMuted).copyWith(
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
