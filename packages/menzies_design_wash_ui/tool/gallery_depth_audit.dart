// ignore_for_file: avoid_print
import 'dart:io';

/// Runs the repo-root gallery depth audit from the Flutter package directory.
void main() {
  final repoRoot = Directory.current.parent.parent;
  final script = File('${repoRoot.path}/tool/gallery_depth_audit.dart');
  if (!script.existsSync()) {
    stderr.writeln('gallery_depth_audit: missing ${script.path}');
    exit(1);
  }
  final result = Process.runSync(
    Platform.executable,
    ['run', script.path],
    workingDirectory: repoRoot.path,
  );
  stdout.write(result.stdout);
  stderr.write(result.stderr);
  exit(result.exitCode);
}
