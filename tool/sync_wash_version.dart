// ignore_for_file: avoid_print
import 'dart:convert';
import 'dart:io';

/// Syncs semver from npm web package to Flutter package + demo.
void main() {
  final root = _repoRoot();
  final npmJson = File(
    '$root/packages/menzies-design-wash-ui/package.json',
  ).readAsStringSync();
  final version =
      (jsonDecode(npmJson) as Map<String, dynamic>)['version'] as String;

  _patchPubspec('$root/packages/menzies_design_wash_ui/pubspec.yaml', version);
  _patchPubspec('$root/apps/wash_demo_flutter/pubspec.yaml', version);

  final versionDart = '''
/// Synced from packages/menzies-design-wash-ui/package.json
const String kWashUiVersion = '$version';

String washUiBrandText([String suffix = '']) =>
    'Wash UI v\$kWashUiVersion\$suffix';
''';
  File('$root/packages/menzies_design_wash_ui/lib/src/version.dart')
      .writeAsStringSync(versionDart);
  print('Synced Wash UI version $version');
}

void _patchPubspec(String path, String version) {
  final lines = File(path).readAsLinesSync();
  final out = <String>[];
  for (final line in lines) {
    if (line.startsWith('version:')) {
      out.add('version: $version');
    } else {
      out.add(line);
    }
  }
  File(path).writeAsStringSync('${out.join('\n')}\n');
}

String _repoRoot() {
  var dir = Directory.current;
  while (true) {
    if (File('${dir.path}/package.json').existsSync()) return dir.path;
    final parent = dir.parent;
    if (parent.path == dir.path) return Directory.current.path;
    dir = parent;
  }
}
