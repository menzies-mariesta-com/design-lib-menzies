import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/input/wash_input.dart';
import '../../components/palette/wash_palette.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_provider.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_navigation.dart';
import '../wash_showcase_tabs.dart';
import 'wash_docs_widgets.dart';

/// Dispatcher for the long-form docs articles (theming, tokens, customize, MCP).
class WashDocsArticlePage extends StatelessWidget {
  const WashDocsArticlePage({required this.pageId, super.key});

  final String pageId;

  @override
  Widget build(BuildContext context) {
    return switch (pageId) {
      'docs-theming' => const _DocsThemingPage(),
      'docs-tokens' => const _DocsTokensPage(),
      'docs-customize' => const _DocsCustomizePage(),
      'docs-mcp-server' => const _DocsMcpServerPage(),
      _ => const _DocsTokensPage(),
    };
  }
}

class _DocsThemingPage extends StatelessWidget {
  const _DocsThemingPage();

  static const _applyCode =
      '''import { applyTheme } from '@menzies-mariesta-com/menzies-design-wash-ui/theme'

applyTheme('cerulean', 'dark')''';

  static const _varsCode = ''':root {
  --wash-a: #d9eef5;
  --wash-b: #f2e1c6;
  --wash-c: #e8c9c3;
  --paper-fiber: #e8e1d4;
  --ink-muted: /* muted copy */;
  --ink-border: /* hairlines */;
}''';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        WashDocsHero(
          title: 'Theming',
          description:
              '${kWashPigmentThemes.length} pigments, each with light and dark '
              'paper modes. Click a pigment to copy its theme CSS.',
        ),
        WashDocsSection(
          title: 'Apply a pigment',
          children: [
            const WashDocsCode(_applyCode),
            const WashDocsBody(
              'Gallery pages import the same helpers from `#plain/theme` so demos '
              'stay off the package component API. Apps that publish against npm '
              'should use the package path above.',
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'CSS variables to override',
          children: [
            const WashDocsCode(_varsCode),
            const WashDocsBody(
              'Themes set `data-theme` on `<html>` (for example `mineral` or '
              '`mineral-dark`).',
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Pigment gallery',
          children: [_PigmentGallery()],
        ),
      ],
    );
  }
}

class _PigmentGallery extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final viewport = MediaQuery.sizeOf(context).width;
    final cols = viewport >= 768 ? 4 : (viewport >= 640 ? 3 : 2);
    const gap = 12.0;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = (constraints.maxWidth - gap * (cols - 1)) / cols;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: [
            for (final theme in kWashPigmentThemes)
              SizedBox(
                width: width,
                child: _PigmentTile(theme: theme),
              ),
          ],
        );
      },
    );
  }
}

class _PigmentTile extends StatelessWidget {
  const _PigmentTile({required this.theme});

  final WashPigmentTheme theme;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final scope = WashScope.of(context);
    final active = scope.pigmentId == theme.id;
    return GestureDetector(
      onTap: () => scope.setPigment(theme.id),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 160),
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: active
              ? Color.alphaBlend(
                  tokens.palette.primary.withValues(alpha: 0.08),
                  tokens.surface,
                )
              : tokens.surface,
          border: Border.all(
            color: active ? tokens.palette.primary : tokens.inkBorder,
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: theme.swatch,
                shape: BoxShape.circle,
                border: Border.all(
                  color: tokens.onSurface.withValues(alpha: 0.12),
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    theme.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontSize: 12,
                      height: 1.35,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    theme.note,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 10.5,
                      height: 1.35,
                    ),
                  ),
                ],
              ),
            ),
            if (active)
              WashLucideIcon('check', size: 14, color: tokens.palette.primary),
          ],
        ),
      ),
    );
  }
}

class _DocsTokensPage extends StatelessWidget {
  const _DocsTokensPage();

  static const _coreTokens = [
    '--wash-a / --wash-b / --wash-c',
    '--paper-fiber / --pigment-grain',
    '--ink-muted / --ink-border',
    '--ease-absorb',
    '--shadow-paper-md',
    '--font-display / --font-sans / --font-mono',
  ];

  static const _utilities = [
    '`wash-shell` + `wash-shell-main` for the full page shell (prefer `WashShell`)',
    '`wash-panel` (default `1rem` padding), `wash-panel-flush`, `paper-grain`, `soak-in`',
    '`ripple` on interactive hosts',
    '`label-ink` for small caps labels',
    '`page-wash` for page atmosphere (prefer `WashShell` / `WashBackground`)',
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const WashDocsHero(
          title: 'Design tokens',
          description:
              'Paper, wash, ink, and motion tokens power every surface.',
        ),
        WashDocsSection(
          title: 'Core tokens',
          children: [WashDocsBulletList(_coreTokens, code: true)],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Utility classes',
          children: [
            for (var i = 0; i < _utilities.length; i++) ...[
              if (i > 0) const SizedBox(height: 8),
              WashDocsBullet(WashDocsBody(_utilities[i])),
            ],
          ],
        ),
      ],
    );
  }
}

class _DocsCustomizePage extends StatelessWidget {
  const _DocsCustomizePage();

  static const _buttonCode = '''<Button variant="primary" size="sm" ripple>
  Save
</Button>''';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const WashDocsHero(
          title: 'Customize components',
          description:
              'Every component accepts className slots, semantic variants, and '
              'CSS variables.',
        ),
        LayoutBuilder(
          builder: (context, constraints) {
            final two = constraints.maxWidth >= 768;
            final width =
                two ? (constraints.maxWidth - 24) / 2 : constraints.maxWidth;
            return Wrap(
              spacing: 24,
              runSpacing: 24,
              children: [
                SizedBox(
                  width: width,
                  child: const _ShowcaseCard(
                    icon: 'palette',
                    title: 'Button',
                    description:
                        'Variants, sizes, ripple, loading. Keyboard and disabled '
                        'states built in.',
                    child: _ButtonDemo(),
                  ),
                ),
                SizedBox(
                  width: width,
                  child: const _ShowcaseCard(
                    icon: 'settings-2',
                    title: 'Input',
                    description:
                        'Labels, required mark, error and hint text, aria-invalid '
                        'wiring.',
                    child: _InputDemo(),
                  ),
                ),
              ],
            );
          },
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Accessibility checklist',
          children: [
            WashDocsBulletList(const [
              'Visible or aria-label name on every control',
              'Focus visible styles (do not remove outline without replacement)',
              'Dialog and drawer: focus trap + Escape',
              'Toast and Loading: live regions',
              'Respect prefers-reduced-motion',
            ]),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Icons',
          children: [
            const WashDocsBody(
              'Install only `@menzies-mariesta-com/menzies-design-wash-ui`. '
              'Import Lucide UI icons from '
              '`@menzies-mariesta-com/menzies-design-wash-ui/icons` (named exports '
              'or `DynamicIcon`) and brand marks from '
              '`@menzies-mariesta-com/menzies-design-wash-ui/icons/brands` (named '
              'exports or `BrandIcon` from `/icons/brands/catalog`). Lucide and '
              'Simple Icons stay internal to Wash; do not import them in app code.',
            ),
            Row(
              children: const [
                WashLucideIcon('book-open', size: 24, strokeWidth: 1.75),
                SizedBox(width: 12),
                WashLucideIcon('palette', size: 24, strokeWidth: 1.75),
              ],
            ),
          ],
        ),
      ],
    );
  }
}

class _ShowcaseCard extends StatelessWidget {
  const _ShowcaseCard({
    required this.icon,
    required this.title,
    required this.description,
    required this.child,
  });

  final String icon;
  final String title;
  final String description;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: tokens.surface,
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              WashLucideIcon(icon, size: 20, strokeWidth: 1.75),
              const SizedBox(width: 8),
              Text(
                title,
                style: WashTypography.title(tokens.onSurface).copyWith(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 14,
              height: 1.55,
            ),
          ),
          const SizedBox(height: 16),
          child,
        ],
      ),
    );
  }
}

class _ButtonDemo extends StatelessWidget {
  const _ButtonDemo();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            WashButton(
              label: 'Primary',
              size: WashButtonSize.sm,
              onPressed: () {},
            ),
            WashButton(
              label: 'Outline',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.outline,
              onPressed: () {},
            ),
            WashButton(
              label: 'Ghost',
              size: WashButtonSize.sm,
              variant: WashButtonVariant.ghost,
              onPressed: () {},
            ),
          ],
        ),
        const SizedBox(height: 16),
        const WashDocsCode(_DocsCustomizePage._buttonCode),
      ],
    );
  }
}

class _InputDemo extends StatelessWidget {
  const _InputDemo();

  @override
  Widget build(BuildContext context) {
    return const WashInput(
      label: 'Plate name',
      hint: 'Coastal fog',
      requiredMark: true,
      size: WashInputSize.sm,
    );
  }
}

class _DocsMcpServerPage extends StatelessWidget {
  const _DocsMcpServerPage();

  static const _quickStart = '''# .npmrc
@menzies-mariesta-com:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT

# then use mcp.json with:
npx -y @menzies-mariesta-com/wash-ui-mcp@1.4.0''';

  static const _buildCode = '''# From repo root
npm run mcp:build

# Smoke test (stdio server, Ctrl+C to exit)
node packages/wash-ui-mcp/dist/index.js''';

  static const _cursorJson = '''{
  "mcpServers": {
    "wash-ui-web": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-ui-mcp@1.4.0"]
    }
  }
}''';

  static const _claudeJson = '''{
  "mcpServers": {
    "wash-ui-web": {
      "command": "npx",
      "args": ["-y", "@menzies-mariesta-com/wash-ui-mcp@1.4.0"]
    }
  }
}''';

  static const _tools = <(String, String)>[
    (
      'list_components',
      'Browse exports by category (primitive, core, chart, etc.)'
    ),
    ('search_components', 'Search by name, keyword, or description'),
    ('get_component_docs', 'Usage, props, import path, and examples'),
    ('list_chart_types', 'Chart categories and components per category'),
    ('get_theme_tokens', 'Theme CSS variables and applyTheme API'),
    ('get_install_guide', 'Install steps, exports, peer dependencies'),
    ('search_docs', 'Search documentation sections'),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const WashDocsHero(
          title: 'MCP server',
          description:
              'The Wash UI MCP package exposes design-system docs and APIs to AI '
              'assistants via the Model Context Protocol. It publishes to npm and '
              'GitHub Packages and runs via npx without cloning this monorepo.',
        ),
        WashDocsSection(
          title: 'Quick start (any repo)',
          children: [
            const WashDocsBody(
              'Add GitHub Packages auth for the `@menzies-mariesta-com` scope, '
              'then drop the sample config into `.cursor/mcp.json`. Published '
              'packages embed themes, icons, and source excerpts at build time.',
            ),
            const WashDocsCode(_quickStart),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Downloads',
          children: [
            const WashDocsBody(
              'Prefer `npx` above. Zips are optional for offline / contributor '
              'builds (source + `dist`).',
            ),
            _DownloadRow(
              label: 'Download web MCP',
              filename: 'wash-ui-web.zip',
              hint: 'The MCP source + dist (optional offline)',
            ),
            _DownloadRow(
              label: 'Download Cursor mcp.json',
              filename: 'mcp.json',
              hint: 'npx @menzies-mariesta-com/wash-ui-mcp (no monorepo path)',
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'What it provides',
          children: [
            _InfoAlert(
              child: const WashDocsBody(
                'Web MCP tools plus resources, built from the library README, '
                'demo docs, and export index in this monorepo.',
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (var i = 0; i < _tools.length; i++) ...[
                  if (i > 0) const SizedBox(height: 8),
                  _ToolRow(name: _tools[i].$1, description: _tools[i].$2),
                ],
              ],
            ),
            const WashDocsBody(
              'Resources: `wash-ui://components/index` (JSON index) and '
              '`wash-ui://docs/install` (install excerpt).',
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Build from monorepo (contributors)',
          children: [const WashDocsCode(_buildCode)],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Cursor configuration',
          children: [
            const WashDocsBody(
              'Preferred: `npx` from GitHub Packages (works in any project, '
              'including heka). Download the sample `mcp.json` above, or paste '
              'below. Contributors may instead point at '
              '`node packages/wash-*-mcp/dist/index.js` after `npm run mcp:build`.',
            ),
            const WashShowcaseTabs(
              preview: _McpPreview(
                title: 'wash-ui-web',
                command: 'npx -y @menzies-mariesta-com/wash-ui-mcp@1.4.0',
              ),
              dartSource: _cursorJson,
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Claude Desktop configuration',
          children: [
            const WashDocsBody(
              'Same `npx` args as Cursor. macOS config: '
              '`~/Library/Application Support/Claude/claude_desktop_config.json`',
            ),
            const WashShowcaseTabs(
              preview: _McpPreview(
                title: 'Claude Desktop mcpServers',
                command: 'wash-ui-web',
              ),
              dartSource: _claudeJson,
            ),
          ],
        ),
        const SizedBox(height: 24),
        WashDocsSection(
          title: 'Example agent prompts',
          children: [
            const WashDocsBulletList([
              '"Use wash-ui MCP: how do I install and boot initWash in vanilla JS?"',
              '"Search wash-ui components for table and show import path."',
              '"List chart types and give a LineChart example with Wash theming."',
            ]),
          ],
        ),
      ],
    );
  }
}

class _McpPreview extends StatelessWidget {
  const _McpPreview({required this.title, required this.command});

  final String title;
  final String command;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.6),
        border: Border.all(color: tokens.inkBorder),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
          ),
          const SizedBox(height: 8),
          Text(
            command,
            style: WashTypography.body(tokens.onSurface).copyWith(fontSize: 12),
          ),
        ],
      ),
    );
  }
}

class _DownloadRow extends StatelessWidget {
  const _DownloadRow({
    required this.label,
    required this.filename,
    required this.hint,
  });

  final String label;
  final String filename;
  final String hint;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashButton(
          size: WashButtonSize.sm,
          onPressed: () {
            final download = WashGalleryNavigation.downloadOf(context);
            if (download != null) {
              download('/mcp/$filename', filename);
            } else {
              Clipboard.setData(ClipboardData(text: '/mcp/$filename'));
            }
          },
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const WashLucideIcon('download', size: 15, strokeWidth: 2),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 6),
        Row(
          children: [
            Text(
              filename,
              style:
                  WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
            ),
            Expanded(
              child: Text(
                ': $hint',
                style:
                    WashTypography.body(tokens.inkMuted).copyWith(fontSize: 12),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ToolRow extends StatelessWidget {
  const _ToolRow({required this.name, required this.description});

  final String name;
  final String description;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          name,
          style: WashTypography.body(tokens.onSurface).copyWith(
            fontSize: 12,
            height: 1.6,
            fontWeight: FontWeight.w600,
          ),
        ),
        Expanded(
          child: Text(
            ': $description',
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 14,
              height: 1.6,
            ),
          ),
        ),
      ],
    );
  }
}

class _InfoAlert extends StatelessWidget {
  const _InfoAlert({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final info = tokens.palette.info;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color.alphaBlend(info.withValues(alpha: 0.09), tokens.surface),
        border: Border.all(color: info.withValues(alpha: 0.22)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashLucideIcon('network', size: 20, color: info, strokeWidth: 1.75),
          const SizedBox(width: 12),
          Expanded(child: child),
        ],
      ),
    );
  }
}
