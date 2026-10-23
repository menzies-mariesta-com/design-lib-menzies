import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('radial progress gallery builds six sections at 360px',
      (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(360, 7200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 360,
              height: 7200,
              child: SingleChildScrollView(
                child: WashRadialProgressGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Values and a11y'), findsOneWidget);
    expect(find.text('Width and type'), findsOneWidget);
    expect(find.text('Semantic and filled'), findsOneWidget);
    expect(find.text('Ring weight'), findsOneWidget);
    expect(find.text('Live value'), findsOneWidget);
    expect(find.text('Pigment meters'), findsOneWidget);
    expect(find.text('Desk read'), findsOneWidget);
    expect(find.byType(WashRadialProgress), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashRadialProgress sizes and filled chrome', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Column(
              children: [
                WashRadialProgress(value: 0),
                WashRadialProgress(value: 70, size: 128, thickness: 10),
                WashRadialProgress(
                  value: 55,
                  filled: true,
                  tone: WashProgressTone.secondary,
                ),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashRadialProgress), findsNWidgets(3));
    expect(find.text('70%'), findsOneWidget);
    expect(find.text('55%'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  test('default size matches daisyUI 5rem', () {
    expect(kWashRadialProgressDefaultSize, 80);
  });
}
