import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('ripple gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(360, 5200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 360,
              height: 5200,
              child: SingleChildScrollView(child: WashRippleGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('How to opt in'), findsOneWidget);
    expect(find.text('Click ripple on buttons'), findsOneWidget);
    expect(find.text('Primary, secondary, accent washes'), findsOneWidget);
    expect(find.text('Centered vs pointer-origin'), findsOneWidget);
    expect(find.text('Cards and icon buttons'), findsOneWidget);
    expect(find.text('Pigment plate press'), findsOneWidget);
    expect(find.text('Reduced motion'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  test('washResolveRippleColor tints match web alpha mix', () {
    final tokens = buildWashTokens(
      pigmentId: 'mineral',
      mode: WashThemeMode.light,
    );

    expect(
      washResolveRippleColor(tokens, tint: WashRippleTint.primary).a,
      closeTo(0.34, 0.001),
    );
    expect(
      washResolveRippleColor(tokens, tint: WashRippleTint.ink).a,
      closeTo(0.22, 0.001),
    );
  });

  testWidgets('WashRipple respects disableAnimations on press', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(disableAnimations: true, size: Size(400, 400)),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: Center(
              child: WashRipple(
                onTap: () {},
                child: const SizedBox(width: 120, height: 48),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.tap(find.byType(WashRipple), warnIfMissed: false);
    await tester.pump(const Duration(milliseconds: 700));
    expect(tester.takeException(), isNull);
  });
}
