import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

Future<void> runWashComponentMatrix({
  required WidgetTester tester,
  required Widget Function() buildSubject,
  String pigmentId = 'mineral',
  bool runGoldens = false,
  String? goldenPrefix,
}) async {
  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.light);
  expect(tester.takeException(), isNull);

  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.light);
  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.dark);

  await _pumpWithTheme(tester, buildSubject(), 'indigo', WashThemeMode.light);

  await tester.binding.setSurfaceSize(const Size(360, 640));
  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.light);
  await tester.binding.setSurfaceSize(const Size(1280, 800));
  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.light);
  await tester.binding.setSurfaceSize(null);

  await tester.pumpWidget(
    MediaQuery(
      data: const MediaQueryData(textScaler: TextScaler.linear(1.3)),
      child: _wrap(buildSubject(), pigmentId, WashThemeMode.light),
    ),
  );
  await tester.pumpAndSettle();

  await tester.pumpWidget(
    MediaQuery(
      data: const MediaQueryData(disableAnimations: true),
      child: _wrap(buildSubject(), pigmentId, WashThemeMode.light),
    ),
  );
  await tester.pump();

  expect(find.byType(WashProvider), findsOneWidget);

  await _pumpWithTheme(tester, buildSubject(), pigmentId, WashThemeMode.light);

  if (runGoldens && goldenPrefix != null) {
    await expectLater(
      find.byType(WashProvider),
      matchesGoldenFile('goldens/${goldenPrefix}_light.png'),
    );
  }
}

Future<void> _pumpWithTheme(
  WidgetTester tester,
  Widget child,
  String pigment,
  WashThemeMode mode,
) async {
  await tester.pumpWidget(_wrap(child, pigment, mode));
  await tester.pumpAndSettle();
}

Widget _wrap(Widget child, String pigment, WashThemeMode mode) {
  return WidgetsApp(
    color: const Color(0xFFFFFFFF),
    builder: (context, _) => WashProvider(
      defaultPigment: pigment,
      defaultMode: mode,
      child: Center(child: child),
    ),
  );
}
