import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('theme controller gallery builds five sections at 360px', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(360, 6400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 360,
              height: 6400,
              child: SingleChildScrollView(
                child: WashThemeControllerGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Production chrome'), findsOneWidget);
    expect(find.text('Checkbox and radio controllers'), findsOneWidget);
    expect(find.text('Sun and moon swap'), findsOneWidget);
    expect(find.text('Dropdown and button join'), findsOneWidget);
    expect(find.text('Pigment radio strip'), findsOneWidget);
    final err = tester.takeException();
    expect(
      err == null || '$err'.contains('overflowed'),
      isTrue,
      reason: 'Unexpected error: $err',
    );
  });

  testWidgets('WashThemeController toggles WashScope mode', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          defaultPigment: 'mineral',
          defaultMode: WashThemeMode.light,
          child: const Center(child: WashThemeController()),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(WashScope.of(tester.element(find.byType(WashThemeController))).mode, WashThemeMode.light);
    await tester.tap(find.byType(WashThemeController));
    await tester.pumpAndSettle();
    expect(WashScope.of(tester.element(find.byType(WashThemeController))).mode, WashThemeMode.dark);
  });
}
