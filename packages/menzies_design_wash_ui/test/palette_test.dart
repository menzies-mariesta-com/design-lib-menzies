import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('pigment catalog matches web watercolorThemes count and order', () {
    expect(kWashPigmentThemes.length, 30);
    expect(kWashPigmentThemes.length, kWashPigmentIds.length);
    expect(kWashPigmentThemes.first.id, 'mineral');
    expect(kWashPigmentThemes.first.note, 'Blue · ochre · rose');
    expect(kWashPigmentThemes.last.id, 'ink');
    for (var i = 0; i < kWashPigmentIds.length; i++) {
      expect(kWashPigmentThemes[i].id, kWashPigmentIds[i]);
    }
    expect(washPigmentThemeById('cerulean')?.label, 'Cerulean');
  });

  testWidgets('palette gallery builds three sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 20000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 20000,
              child: SingleChildScrollView(
                child: WashPaletteGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('daisyUI color roles'), findsOneWidget);
    expect(find.text('Paper and pigment washes'), findsOneWidget);
    expect(find.text('Watercolor themes'), findsOneWidget);
    expect(find.text('Primary'), findsWidgets);
    expect(find.text('Wash A'), findsOneWidget);
    expect(find.text('Mineral'), findsWidgets);
    expect(find.byType(WashPigmentThemeCard), findsNWidgets(30));

    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('pigment dialog opens and apply updates scope', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 1200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: Overlay(
              initialEntries: [
                OverlayEntry(
                  builder: (ctx) => const SingleChildScrollView(
                    child: SizedBox(
                      width: 1100,
                      child: WashPigmentThemeGrid(),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();

    await tester.tap(find.text('Indigo').first);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Apply pigment'), findsOneWidget);
    await tester.tap(find.text('Apply pigment'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    final scope = tester.element(find.byType(WashPigmentThemeGrid));
    expect(WashScope.of(scope).pigmentId, 'indigo');
  });
}
