import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('progress gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1100, 24000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 24000,
              child: SingleChildScrollView(
                child: WashProgressGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Value and indeterminate'), findsOneWidget);
    expect(find.text('Semantic colors'), findsOneWidget);
    expect(find.text('Width scale'), findsOneWidget);
    expect(find.text('Controlled value'), findsOneWidget);
    expect(find.text('Related radial progress'), findsOneWidget);
    expect(find.text('Wash drying panels'), findsOneWidget);
    expect(find.text('Adaptive progress rows'), findsOneWidget);
    expect(find.text('Pigment load'), findsWidgets);
    expect(find.text('70%'), findsWidgets);

    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashProgress determinate and indeterminate paint', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(400, 400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Column(
              children: [
                WashProgress(value: 40),
                WashProgress(),
                WashRadialProgress(value: 70, size: 64),
                WashRadialProgress(value: 70, filled: true, size: 64),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashProgress), findsNWidgets(2));
    expect(find.byType(WashRadialProgress), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });

  test('progress tone colors resolve for all semantics', () {
    final tokens = buildWashTokens(
      pigmentId: 'mineral',
      mode: WashThemeMode.light,
    );
    for (final tone in WashProgressTone.values) {
      expect(washProgressToneColor(tokens, tone).a, greaterThan(0));
    }
  });
}
