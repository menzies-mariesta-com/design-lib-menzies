import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('every gallery page id has a registered demo', () {
    expect(kWashGalleryPageIds, isNotEmpty);
    for (final id in kWashGalleryPageIds) {
      expect(
        id,
        isNot(contains(WashGalleryDemo.stubMarker)),
        reason: 'id should not be a stub token',
      );
    }
  });

  testWidgets('all gallery demos build without throwing', (tester) async {
    for (final id in kWashGalleryPageIds) {
      await _pumpWithTheme(
        tester,
        WashGalleryDemo.build,
        id,
        'mineral',
        WashThemeMode.light,
      );
      final err = tester.takeException();
      expect(err, isNull, reason: 'Failed for $id: $err');
      final text = _collectText(tester);
      expect(
        text,
        isNot(contains('No preview registered')),
        reason: 'Missing demo implementation for $id',
      );
      expect(
        text,
        isNot(contains(WashGalleryDemo.stubMarker)),
        reason: 'Stub text for $id',
      );
    }
  });
}

Future<void> _pumpWithTheme(
  WidgetTester tester,
  Widget Function(BuildContext, String) build,
  String pageId,
  String pigment,
  WashThemeMode mode,
) async {
  await tester.pumpWidget(
    MediaQuery(
      data: const MediaQueryData(disableAnimations: true),
      child: WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          defaultPigment: pigment,
          defaultMode: mode,
          child: SizedBox(
            width: 360,
            height: 4000,
            child: ListView(
              children: [
                Builder(builder: (context) => build(context, pageId)),
              ],
            ),
          ),
        ),
      ),
    ),
  );
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 100));
}

String _collectText(WidgetTester tester) {
  final buffer = StringBuffer();
  for (final e in find.byType(Text).evaluate()) {
    final w = e.widget as Text;
    buffer.writeln(w.data ?? w.textSpan?.toPlainText() ?? '');
  }
  return buffer.toString();
}
