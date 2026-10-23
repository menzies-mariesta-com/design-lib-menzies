import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('marquee gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 14000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 14000,
              child: SingleChildScrollView(child: WashMarqueeGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Horizontal scroll'), findsOneWidget);
    expect(find.text('Left, right, and vertical'), findsOneWidget);
    expect(find.text('Slow, fast, and pause on hover'), findsOneWidget);
    expect(find.text('Pigment chips in motion'), findsOneWidget);
    expect(find.text('Scrolling wash tips'), findsOneWidget);
    expect(find.text('Pause when motion is reduced'), findsOneWidget);
    expect(find.text('Narrow and full-bleed bands'), findsOneWidget);
    expect(find.text('Truncated text that marquees'), findsOneWidget);
    expect(find.text('Ultramarine'), findsWidgets);
    expect(find.text('Short label'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashMarquee static band does not throw', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashMarquee(
              staticBand: true,
              children: const [
                Text('Alpha'),
                Text('Beta'),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Alpha'), findsWidgets);
    expect(tester.takeException(), isNull);
  });
}
