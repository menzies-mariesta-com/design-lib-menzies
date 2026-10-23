import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('watercolor playground gallery builds three sections',
      (tester) async {
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
                child: WashWatercolorPlaygroundGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Paint splash playground'), findsOneWidget);
    expect(find.text('Splash shapes'), findsOneWidget);
    expect(find.text('Drop-in pigment splashes'), findsOneWidget);
    expect(find.text('Card accent'), findsOneWidget);
    expect(find.text('blob'), findsWidgets);
    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashWatercolorSplash paints all variants without error',
      (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(800, 800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: SingleChildScrollView(
              child: Wrap(
                children: [
                  for (final v in kWashSplashVariants)
                    WashWatercolorSplash(
                      variant: v,
                      seed: 42,
                      size: 48,
                      opacity: 0.7,
                      blur: 10,
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(kWashSplashVariants.length, 40);
    expect(find.byType(WashWatercolorSplash), findsNWidgets(40));
    expect(tester.takeException(), isNull);
  });

  test('generate and merge splash config', () {
    final base = generateSplashConfig(99);
    expect(base.seed, 99);
    expect(kWashSplashVariants.contains(base.variant), isTrue);
    final merged = mergeSplashConfig(
      base,
      variant: 'ring',
      colors: const ['#ff0000', '#00ff00'],
      opacity: 0.5,
    );
    expect(merged.variant, 'ring');
    expect(merged.colors, ['#ff0000', '#00ff00']);
    expect(merged.opacity, 0.5);
    expect(washSplashVariantLabel('blob'), 'Blob');
  });
}
