import 'package:flutter/widgets.dart';

import '../components/button/wash_button.dart';
import '../icons/wash_lucide_icon.dart';
import '../theme/wash_provider.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';

class _PigmentTheme {
  const _PigmentTheme(this.id, this.label, this.note, this.swatch);
  final String id;
  final String label;
  final String note;
  final Color swatch;
}

const _pigmentThemes = <_PigmentTheme>[
  _PigmentTheme('mineral', 'Mineral', 'Blue · ochre · rose', Color(0xFF276C8E)),
  _PigmentTheme('indigo', 'Indigo', 'Deep lake violet', Color(0xFF3D4F8F)),
  _PigmentTheme('celadon', 'Celadon', 'Sage glaze', Color(0xFF3D7A5F)),
  _PigmentTheme('vermilion', 'Vermilion', 'Warm lake red', Color(0xFFB8432F)),
  _PigmentTheme('sepia', 'Sepia', 'Archival ink', Color(0xFF6B4E32)),
  _PigmentTheme('cobalt', 'Cobalt', 'Bright mineral blue', Color(0xFF1F5F9E)),
  _PigmentTheme('moss', 'Moss', 'Botanical green', Color(0xFF4A6B3A)),
  _PigmentTheme('saffron', 'Saffron', 'Gold ochre', Color(0xFFC48A28)),
  _PigmentTheme('slate', 'Slate', 'Cool pigment gray', Color(0xFF5A6573)),
  _PigmentTheme('lake', 'Lake', 'Viridian teal', Color(0xFF2A7A72)),
  _PigmentTheme(
      'ultramarine', 'Ultramarine', 'Deep lapis blue', Color(0xFF2F4A9B)),
  _PigmentTheme('viridian', 'Viridian', 'Cool chrome green', Color(0xFF2F7A68)),
  _PigmentTheme('madder', 'Madder', 'Rose madder lake', Color(0xFFA63D52)),
  _PigmentTheme('ochre', 'Ochre', 'Yellow earth', Color(0xFFB8892E)),
  _PigmentTheme('umber', 'Umber', 'Burnt earth brown', Color(0xFF6B4A32)),
  _PigmentTheme('ivory', 'Ivory', 'Ivory black gray', Color(0xFF4A4842)),
  _PigmentTheme('cerulean', 'Cerulean', 'Sky mineral blue', Color(0xFF3A7CA8)),
  _PigmentTheme('crimson', 'Crimson', 'Deep carmine', Color(0xFF9E2F3E)),
  _PigmentTheme('olive', 'Olive', 'Muted leaf green', Color(0xFF6A6B3A)),
  _PigmentTheme('sienna', 'Sienna', 'Raw earth orange', Color(0xFFA65A32)),
  _PigmentTheme(
      'turquoise', 'Turquoise', 'Copper blue-green', Color(0xFF2A8A8E)),
  _PigmentTheme(
      'lavender', 'Lavender', 'Soft mineral violet', Color(0xFF6A5A8E)),
  _PigmentTheme('charcoal', 'Charcoal', 'Graphite gray', Color(0xFF3E4248)),
  _PigmentTheme('coral', 'Coral', 'Warm shell pink', Color(0xFFC45A4A)),
  _PigmentTheme('pine', 'Pine', 'Forest needle green', Color(0xFF3A5E42)),
  _PigmentTheme('bronze', 'Bronze', 'Metallic ochre', Color(0xFF8E6A32)),
  _PigmentTheme('mist', 'Mist', 'Cool vapor gray', Color(0xFF6A7A88)),
  _PigmentTheme('rust', 'Rust', 'Iron oxide', Color(0xFFA04828)),
  _PigmentTheme('jade', 'Jade', 'Soft stone green', Color(0xFF3A8A6A)),
  _PigmentTheme('ink', 'Ink', 'Sumi black-blue', Color(0xFF2A3548)),
];

class WashThemeSwitcher extends StatefulWidget {
  const WashThemeSwitcher({super.key});

  @override
  State<WashThemeSwitcher> createState() => _WashThemeSwitcherState();
}

class _WashThemeSwitcherState extends State<WashThemeSwitcher> {
  final _portal = OverlayPortalController();
  final _link = LayerLink();
  bool _hover = false;

  void _toggle() {
    if (_portal.isShowing) {
      _portal.hide();
    } else {
      _portal.show();
    }
  }

  void _hide() {
    if (_portal.isShowing) _portal.hide();
  }

  @override
  Widget build(BuildContext context) {
    final scope = WashScope.of(context);
    final tokens = WashTokens.of(context);
    final theme = _pigmentThemes.firstWhere(
      (t) => t.id == scope.pigmentId,
      orElse: () => _pigmentThemes.first,
    );
    final compact = MediaQuery.sizeOf(context).width < 640;

    return OverlayPortal(
      controller: _portal,
      overlayChildBuilder: (context) {
        return Stack(
          children: [
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.translucent,
                onTap: _hide,
              ),
            ),
            CompositedTransformFollower(
              link: _link,
              showWhenUnlinked: false,
              targetAnchor: Alignment.bottomRight,
              followerAnchor: Alignment.topRight,
              offset: const Offset(0, 8),
              child: _ThemePanel(
                tokens: tokens,
                activeId: scope.pigmentId,
                onSelect: (id) {
                  scope.setPigment(id);
                  _hide();
                },
              ),
            ),
          ],
        );
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _ModeToggle(
            mode: scope.mode,
            onToggle: () => scope.setMode(
              scope.mode == WashThemeMode.dark
                  ? WashThemeMode.light
                  : WashThemeMode.dark,
            ),
          ),
          const SizedBox(width: 2),
          CompositedTransformTarget(
            link: _link,
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              onEnter: (_) => setState(() => _hover = true),
              onExit: (_) => setState(() => _hover = false),
              child: GestureDetector(
                onTap: _toggle,
                child: Semantics(
                  button: true,
                  label: 'Theme: ${theme.label}',
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 120),
                    height: 40,
                    padding: EdgeInsets.symmetric(horizontal: compact ? 8 : 12),
                    decoration: BoxDecoration(
                      color: _hover
                          ? tokens.surfaceContainer.withValues(alpha: 0.55)
                          : null,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: tokens.inkBorder.withValues(alpha: 0.8),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _Swatch(color: theme.swatch, size: 14),
                        if (compact) ...[
                          const SizedBox(width: 6),
                          WashLucideIcon(
                            'swatch-book',
                            size: 16,
                            color: tokens.onSurface,
                          ),
                        ] else ...[
                          const SizedBox(width: 8),
                          Text(
                            theme.label,
                            style:
                                WashTypography.body(tokens.onSurface).copyWith(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              height: 1.1,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ModeToggle extends StatelessWidget {
  const _ModeToggle({required this.mode, required this.onToggle});

  final WashThemeMode mode;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    final dark = mode == WashThemeMode.dark;
    return Semantics(
      button: true,
      toggled: dark,
      label: dark ? 'Switch to light' : 'Switch to dark',
      child: WashButton(
        square: true,
        variant: WashButtonVariant.ghost,
        size: WashButtonSize.md,
        onPressed: onToggle,
        child: WashLucideIcon(
          dark ? 'sun' : 'moon',
          size: 18,
          color: WashTokens.of(context).onSurface,
          strokeWidth: 2,
        ),
      ),
    );
  }
}

class _ThemePanel extends StatelessWidget {
  const _ThemePanel({
    required this.tokens,
    required this.activeId,
    required this.onSelect,
  });

  final WashTokens tokens;
  final String activeId;
  final ValueChanged<String> onSelect;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 288,
      constraints: const BoxConstraints(maxWidth: 288, maxHeight: 420),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder),
        gradient: RadialGradient(
          center: const Alignment(-0.85, -0.9),
          radius: 1.15,
          colors: [
            tokens.palette.primary.withValues(alpha: 0.09),
            tokens.surface,
          ],
        ),
        boxShadow: [
          BoxShadow(
            color: tokens.onSurface.withValues(alpha: 0.14),
            blurRadius: 28,
            offset: const Offset(0, 14),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(4, 2, 4, 8),
            child: Text(
              'PIGMENT THEMES · ${_pigmentThemes.length}',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 9.5,
                letterSpacing: 0.9,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Flexible(
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (final theme in _pigmentThemes)
                    _ThemeRow(
                      theme: theme,
                      active: theme.id == activeId,
                      tokens: tokens,
                      onTap: () => onSelect(theme.id),
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ThemeRow extends StatefulWidget {
  const _ThemeRow({
    required this.theme,
    required this.active,
    required this.tokens,
    required this.onTap,
  });

  final _PigmentTheme theme;
  final bool active;
  final WashTokens tokens;
  final VoidCallback onTap;

  @override
  State<_ThemeRow> createState() => _ThemeRowState();
}

class _ThemeRowState extends State<_ThemeRow> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final tokens = widget.tokens;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: GestureDetector(
        onTap: widget.onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 100),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          decoration: BoxDecoration(
            color: widget.active
                ? Color.alphaBlend(
                    tokens.palette.primary.withValues(alpha: 0.1),
                    tokens.surface,
                  )
                : _hover
                    ? tokens.surfaceContainer.withValues(alpha: 0.5)
                    : null,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: widget.active
                  ? tokens.palette.primary.withValues(alpha: 0.28)
                  : const Color(0x00000000),
            ),
          ),
          child: Row(
            children: [
              _Swatch(color: widget.theme.swatch, size: 16),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            widget.theme.label,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style:
                                WashTypography.body(tokens.onSurface).copyWith(
                              fontSize: 12.5,
                              fontWeight: FontWeight.w500,
                              height: 1.3,
                            ),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          _hex(widget.theme.swatch),
                          style: WashTypography.body(tokens.inkMuted).copyWith(
                            fontSize: 9.5,
                            fontFamily: 'MapleMono',
                            letterSpacing: 0.2,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 1),
                    Text(
                      widget.theme.note,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 10,
                        fontFamily: 'MapleMono',
                        height: 1.3,
                      ),
                    ),
                  ],
                ),
              ),
              if (widget.active) ...[
                const SizedBox(width: 6),
                WashLucideIcon(
                  'check',
                  size: 14,
                  color: tokens.palette.primary,
                  strokeWidth: 2,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  String _hex(Color color) {
    final value = color.toARGB32() & 0xFFFFFF;
    return '#${value.toRadixString(16).padLeft(6, '0').toUpperCase()}';
  }
}

class _Swatch extends StatelessWidget {
  const _Swatch({required this.color, required this.size});

  final Color color;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final dark = Color.lerp(color, const Color(0xFF000000), 0.28)!;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          center: const Alignment(-0.35, -0.4),
          radius: 0.95,
          colors: [
            const Color(0xFFFFFFFF).withValues(alpha: 0.62),
            color,
            dark,
          ],
          stops: const [0, 0.58, 1],
        ),
        border: Border.all(
          color: tokens.inkBorder.withValues(alpha: 0.8),
        ),
      ),
    );
  }
}
