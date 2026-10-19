import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('aspect ratio gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 1200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 2400,
              child: SingleChildScrollView(child: WashAspectRatioGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Common ratios'), findsOneWidget);
    expect(find.text('Toggle preview aspect'), findsOneWidget);
    expect(find.text('Preview'), findsWidgets);
  });

  test('responsive aspect resolves at breakpoints', () {
    const r = WashResponsiveAspectRatio(
      base: WashAspectRatioValue.square,
      md: WashAspectRatioValue.video,
    );
    expect(r.resolve(400), WashAspectRatioValue.square);
    expect(r.resolve(800), WashAspectRatioValue.video);
  });
}
