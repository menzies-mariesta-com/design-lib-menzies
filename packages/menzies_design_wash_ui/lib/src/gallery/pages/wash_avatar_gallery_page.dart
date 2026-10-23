import 'package:flutter/widgets.dart';

import '../../components/avatar/wash_avatar.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashAvatarGalleryPage extends StatelessWidget {
  const WashAvatarGalleryPage({super.key});

  static const _groupIds = [64, 65, 91, 177];

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Avatar',
      description:
          'Every daisyUI avatar shape, size, presence, and group pattern.',
      sections: [
        _section(
          eyebrow: '01 · Default',
          title: 'Base avatar',
          description:
              'Thumbnail portrait with rounded corners and a size utility',
          preview: _defaultRow(),
          dart: _defaultDart,
        ),
        _section(
          eyebrow: '02 · Sizes',
          title: 'Custom sizes',
          description:
              'Set width with Tailwind w-* (height follows the square crop)',
          tint: WashGalleryPanelTint.ochre,
          preview: _sizesRow(),
          dart: _sizesDart,
        ),
        _section(
          eyebrow: '03 · Presence',
          title: 'Online and offline',
          description:
              'avatar-online shows a green dot; avatar-offline shows gray',
          preview: _presenceRow(),
          dart: _presenceDart,
        ),
        _section(
          eyebrow: '04 · Placeholder',
          title: 'Letter placeholders',
          description:
              'avatar-placeholder for initials when no photo is available',
          tint: WashGalleryPanelTint.rose,
          preview: _placeholderRow(context),
          dart: _placeholderDart,
        ),
        _section(
          eyebrow: '05 · Masks',
          title: 'Shape masks',
          description: 'squircle, hexagon, triangle from daisyUI mask',
          preview: _masksRow(),
          dart: _masksDart,
        ),
        _section(
          eyebrow: '06 · Rings',
          title: 'Presence rings',
          description:
              'ring-* with ring-offset for a colored presence frame around the',
          tint: WashGalleryPanelTint.ochre,
          preview: _ringsRow(),
          dart: _ringsDart,
        ),
        _section(
          eyebrow: '07 · Group',
          title: 'Avatar group',
          description:
              'avatar-group with negative space overlap for stacked portraits',
          preview: _groupColumn(),
          dart: _groupDart,
        ),
      ],
    );
  }

  static WashGallerySection _section({
    required String eyebrow,
    required String title,
    required String description,
    required Widget preview,
    required String dart,
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: description,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  static Widget _sample(String label, Widget child) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        child,
        const SizedBox(height: 8),
        Text(
          label,
          style: WashTypography.label(const Color(0xff6e6a61))
              .copyWith(fontSize: 10),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  static Widget _defaultRow() {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'avatar',
          const WashAvatar(
              imageId: 64, imageAlt: 'Watercolor studio artist portrait'),
        ),
        _sample(
          'avatar + rounded-xl',
          const WashAvatar(
            imageId: 65,
            imageAlt: 'Watercolor studio artist, soft rounded frame',
            radius: WashAvatarRadius.roundedXl,
          ),
        ),
        _sample(
          'avatar + rounded-full',
          const WashAvatar(
            imageId: 91,
            imageAlt: 'Watercolor studio artist, circular crop',
            radius: WashAvatarRadius.circle,
          ),
        ),
      ],
    );
  }

  static const _defaultDart = '''
WashAvatar(imageId: 64, imageAlt: 'Portrait');
WashAvatar(imageId: 65, radius: WashAvatarRadius.roundedXl);
WashAvatar(imageId: 91, radius: WashAvatarRadius.circle);
''';

  static Widget _sizesRow() {
    const sizes = WashAvatarSize.values;
    const labels = ['w-32', 'w-24', 'w-16', 'w-12', 'w-8'];
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (var i = 0; i < sizes.length; i++)
          _sample(
            'avatar ${labels[i]}',
            WashAvatar(imageId: 100 + i, size: sizes[i]),
          ),
      ],
    );
  }

  static const _sizesDart = '''
WashAvatar(imageId: 100, size: WashAvatarSize.xl);
WashAvatar(imageId: 104, size: WashAvatarSize.xs);
''';

  static Widget _presenceRow() {
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'avatar avatar-online',
          const WashAvatar(
            imageId: 177,
            imageAlt: 'Online studio collaborator portrait',
            radius: WashAvatarRadius.circle,
            presence: WashAvatarPresence.online,
          ),
        ),
        _sample(
          'avatar avatar-offline',
          const WashAvatar(
            imageId: 201,
            imageAlt: 'Offline studio collaborator portrait',
            radius: WashAvatarRadius.circle,
            presence: WashAvatarPresence.offline,
          ),
        ),
      ],
    );
  }

  static const _presenceDart = '''
WashAvatar(imageId: 177, presence: WashAvatarPresence.online, radius: WashAvatarRadius.circle);
WashAvatar(imageId: 201, presence: WashAvatarPresence.offline, radius: WashAvatarRadius.circle);
''';

  static Widget _placeholderRow(BuildContext context) {
    final tokens = WashTokens.of(context);
    final washBlue = washAvatarWashBlue(tokens);
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        _sample(
          'avatar avatar-placeholder',
          const WashAvatar(
            placeholder: true,
            placeholderText: 'D',
            radius: WashAvatarRadius.circle,
          ),
        ),
        _sample(
          'avatar avatar-online avatar-placeholder',
          const WashAvatar(
            placeholder: true,
            placeholderText: 'AI',
            size: WashAvatarSize.md,
            radius: WashAvatarRadius.circle,
            presence: WashAvatarPresence.online,
          ),
        ),
        _sample(
          'avatar avatar-placeholder',
          WashAvatar(
            placeholder: true,
            placeholderText: 'SY',
            size: WashAvatarSize.sm,
            radius: WashAvatarRadius.circle,
            placeholderBackground: washBlue,
            placeholderForeground: tokens.onSurface,
          ),
        ),
        _sample(
          'avatar avatar-placeholder',
          WashAvatar(
            placeholder: true,
            placeholderText: 'UI',
            size: WashAvatarSize.xs,
            radius: WashAvatarRadius.circle,
            placeholderBackground: tokens.primary,
            placeholderForeground: tokens.onPrimary,
          ),
        ),
      ],
    );
  }

  static const _placeholderDart = '''
WashAvatar(placeholder: true, placeholderText: 'D', radius: WashAvatarRadius.circle);
WashAvatar(placeholder: true, placeholderText: 'AI', presence: WashAvatarPresence.online);
''';

  static Widget _masksRow() {
    const masks = [
      (WashAvatarMask.squircle, 'mask mask-squircle'),
      (WashAvatarMask.hexagon, 'mask mask-hexagon'),
      (WashAvatarMask.triangle, 'mask mask-triangle'),
      (WashAvatarMask.none, 'rounded-full'),
    ];
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (var i = 0; i < masks.length; i++)
          _sample(
            'avatar ${masks[i].$2}',
            WashAvatar(
              imageId: 237 + i,
              mask: masks[i].$1,
              radius:
                  i == 3 ? WashAvatarRadius.circle : WashAvatarRadius.rounded,
            ),
          ),
      ],
    );
  }

  static const _masksDart = '''
WashAvatar(imageId: 237, mask: WashAvatarMask.squircle);
WashAvatar(imageId: 240, mask: WashAvatarMask.none, radius: WashAvatarRadius.circle);
''';

  static Widget _ringsRow() {
    const rings = [
      (WashAvatarRingColor.primary, 'ring-primary'),
      (WashAvatarRingColor.secondary, 'ring-secondary'),
      (WashAvatarRingColor.accent, 'ring-accent'),
      (WashAvatarRingColor.success, 'ring-success'),
    ];
    return Wrap(
      spacing: 32,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (var i = 0; i < rings.length; i++)
          _sample(
            'avatar ring-2 ring-offset-2 ${rings[i].$2}',
            WashAvatar(
              imageId: 338 + i,
              radius: WashAvatarRadius.circle,
              ring: rings[i].$1,
            ),
          ),
      ],
    );
  }

  static const _ringsDart = '''
WashAvatar(imageId: 338, ring: WashAvatarRingColor.primary, radius: WashAvatarRadius.circle);
''';

  static Widget _groupColumn() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _sample(
          'avatar-group -space-x-6',
          WashAvatarGroup(
            children: [
              for (final id in _groupIds)
                WashAvatar(
                  imageId: id,
                  size: WashAvatarSize.sm,
                  imageAlt: 'Team member portrait $id',
                ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        _sample(
          'avatar-group + counter placeholder',
          WashAvatarGroup(
            children: [
              for (final id in _groupIds.take(3))
                WashAvatar(
                  imageId: id,
                  size: WashAvatarSize.sm,
                  imageAlt: 'Team member portrait $id',
                ),
              const WashAvatar(
                placeholder: true,
                placeholderText: '+99',
                size: WashAvatarSize.sm,
              ),
            ],
          ),
        ),
      ],
    );
  }

  static const _groupDart = '''
WashAvatarGroup(
  children: [
    WashAvatar(imageId: 64, size: WashAvatarSize.sm),
    WashAvatar(placeholder: true, placeholderText: '+99', size: WashAvatarSize.sm),
  ],
);
''';
}
