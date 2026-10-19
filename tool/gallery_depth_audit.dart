// ignore_for_file: avoid_print
import 'dart:io';

/// Fails when web GallerySection count != Flutter WashGallerySection count per page id.
void main() {
  final repo = _repoRoot();
  final demoSrc = '$repo/apps/demo/src';
  final appTsx = File('$repo/apps/demo/src/App.tsx').readAsStringSync();
  final ids = _readIds(
    File('$repo/packages/menzies_design_wash_ui/lib/src/gallery/wash_gallery_page_ids.g.dart')
        .readAsStringSync(),
  );
  final pageToTsx = _pageToTsxPath(appTsx, demoSrc);
  var failures = 0;

  const handPorted = <String, String>{
    'buttons': 'wash_buttons_gallery_page.dart',
    'aspect-ratio': 'wash_aspect_ratio_gallery_page.dart',
    'dropdown': 'wash_dropdown_gallery_page.dart',
    'accordion': 'wash_accordion_gallery_page.dart',
    'alert': 'wash_alert_gallery_page.dart',
    'app-bar': 'wash_app_bar_gallery_page.dart',
    'aura': 'wash_aura_gallery_page.dart',
    'avatar': 'wash_avatar_gallery_page.dart',
    'background': 'wash_background_gallery_page.dart',
    'autocomplete': 'wash_autocomplete_gallery_page.dart',
    'badge': 'wash_badge_gallery_page.dart',
    'bottomsheet': 'wash_bottom_sheet_gallery_page.dart',
    'bento': 'wash_bento_gallery_page.dart',
    'card': 'wash_card_gallery_page.dart',
    'carousel': 'wash_carousel_gallery_page.dart',
    'chat': 'wash_chat_gallery_page.dart',
    'chip': 'wash_chip_gallery_page.dart',
    'color-picker': 'wash_color_picker_gallery_page.dart',
    'collapse': 'wash_collapse_gallery_page.dart',
    'context-menu': 'wash_context_menu_gallery_page.dart',
    'countdown': 'wash_countdown_gallery_page.dart',
    'date-time': 'wash_date_time_gallery_page.dart',
    'dialog': 'wash_dialog_gallery_page.dart',
    'diff': 'wash_diff_gallery_page.dart',
    'divider': 'wash_divider_gallery_page.dart',
    'dock': 'wash_dock_gallery_page.dart',
    'drawer': 'wash_drawer_gallery_page.dart',
    'fab': 'wash_fab_gallery_page.dart',
    'fieldset': 'wash_fieldset_gallery_page.dart',
    'file-input': 'wash_file_input_gallery_page.dart',
    'filter': 'wash_filter_gallery_page.dart',
    'floating-panel': 'wash_floating_panel_gallery_page.dart',
    'footer': 'wash_footer_gallery_page.dart',
    'hero': 'wash_hero_gallery_page.dart',
    'hover-3d': 'wash_hover_3d_gallery_page.dart',
    'hover-gallery': 'wash_hover_gallery_gallery_page.dart',
    'indicator': 'wash_indicator_gallery_page.dart',
    'input': 'wash_input_gallery_page.dart',
    'join': 'wash_join_gallery_page.dart',
    'kbd': 'wash_kbd_gallery_page.dart',
    'label': 'wash_label_gallery_page.dart',
    'layers': 'wash_layers_gallery_page.dart',
    'links': 'wash_links_gallery_page.dart',
    'list': 'wash_list_gallery_page.dart',
    'loading': 'wash_loading_gallery_page.dart',
    'marquee': 'wash_marquee_gallery_page.dart',
    'mask': 'wash_mask_gallery_page.dart',
    'megamenu': 'wash_megamenu_gallery_page.dart',
    'menu': 'wash_menu_gallery_page.dart',
    'mockup': 'wash_mockup_gallery_page.dart',
    'navbar': 'wash_navbar_gallery_page.dart',
    'org-chart': 'wash_org_chart_gallery_page.dart',
    'otp': 'wash_otp_gallery_page.dart',
    'pagination': 'wash_pagination_gallery_page.dart',
    'palette': 'wash_palette_gallery_page.dart',
    'progress': 'wash_progress_gallery_page.dart',
    'qrcode': 'wash_qrcode_gallery_page.dart',
    'radial-progress': 'wash_radial_progress_gallery_page.dart',
    'watercolor-playground': 'wash_watercolor_playground_gallery_page.dart',
  };

  for (final id in ids) {
    final handDart = handPorted[id];
    if (handDart != null) {
      final tsx = pageToTsx[id];
      if (tsx == null) {
        print('FAIL $id: no tsx mapping');
        failures++;
        continue;
      }
      final web = _countSection(File(tsx).readAsStringSync());
      final flutter = _countHandPortedSections(
        File('$repo/packages/menzies_design_wash_ui/lib/src/gallery/pages/$handDart')
            .readAsStringSync(),
      );
      if (web != flutter) {
        print('FAIL $id: web=$web flutter=$flutter');
        failures++;
      }
      continue;
    }
    final generated = File(
      '$repo/packages/menzies_design_wash_ui/lib/src/gallery/pages/generated/${_fileForId(id)}',
    );
    if (!generated.existsSync()) {
      print('FAIL $id: missing generated dart page');
      failures++;
      continue;
    }
    final tsx = pageToTsx[id];
    final web = tsx != null ? _countGallerySection(File(tsx).readAsStringSync()) : 1;
    final flutter = _countWashGallerySection(generated.readAsStringSync());
    if (web != flutter) {
      print('FAIL $id: web=$web flutter=$flutter');
      failures++;
    }
  }

  if (failures > 0) {
    stderr.writeln('gallery_depth_audit: $failures mismatch(es)');
    exit(1);
  }
  print('gallery_depth_audit: ${ids.length} pages OK');
}

int _countGallerySection(String tsx) {
  final n = RegExp(r'<GallerySection\b').allMatches(tsx).length;
  return n == 0 ? 1 : n;
}

int _countSection(String tsx) {
  final gallery = _countGallerySection(tsx);
  if (gallery > 1) return gallery;
  final section = RegExp(r'<Section\b').allMatches(tsx).length;
  return section == 0 ? 1 : section;
}

int _countWashGallerySection(String dart) {
  final eyebrows = RegExp(r"eyebrow:\s*'").allMatches(dart).length;
  if (eyebrows > 0) return eyebrows;
  final helperSections = RegExp(r"_s\('\d+").allMatches(dart).length;
  if (helperSections > 0) return helperSections;
  return RegExp(r'WashGallerySection\(').allMatches(dart).length;
}

int _countHandPortedSections(String dart) {
  final explicit = RegExp(r"eyebrow:\s*'").allMatches(dart).length;
  if (explicit > 0) return explicit;
  final helper = RegExp(r"_s\('").allMatches(dart).length;
  if (helper > 0) return helper;
  return _countWashGallerySection(dart);
}

String _fileForId(String id) => '${_snakeCase(_classNameFor(id))}.dart';

String _classNameFor(String id) {
  final parts = id.split('-').map((p) {
    if (p.isEmpty) return '';
    return '${p[0].toUpperCase()}${p.substring(1)}';
  });
  return 'Wash${parts.join()}GalleryPage';
}

String _snakeCase(String className) {
  final buf = StringBuffer();
  for (var i = 0; i < className.length; i++) {
    final c = className[i];
    if (c == c.toUpperCase() && i > 0) buf.write('_');
    buf.write(c.toLowerCase());
  }
  return buf.toString();
}

List<String> _readIds(String source) {
  final re = RegExp(r"'([^']+)'");
  final list = source.split('kWashGalleryPageIds').last;
  return re.allMatches(list).map((m) => m.group(1)!).toList();
}

Map<String, String> _pageToTsxPath(String appTsx, String demoSrc) {
  final lazy = RegExp(r"const (\w+) = lazy\(\(\) => import\('\./([^']+)'\)\)");
  final componentToFile = <String, String>{};
  for (final m in lazy.allMatches(appTsx)) {
    componentToFile[m.group(1)!] = '$demoSrc/${m.group(2)!}.tsx';
  }
  final caseRe = RegExp(r"case '([^']+)':\s*\n\s*return <(\w+)");
  final map = <String, String>{};
  for (final m in caseRe.allMatches(appTsx)) {
    final path = componentToFile[m.group(2)!];
    if (path != null) map[m.group(1)!] = path;
  }
  map['overview'] = '$demoSrc/OverviewPage.tsx';
  map['support'] = '$demoSrc/SupportPage.tsx';
  return map;
}

String _repoRoot() {
  var dir = Directory.current;
  while (!File('${dir.path}/package.json').existsSync()) {
    dir = dir.parent;
  }
  return dir.path;
}
