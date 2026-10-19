import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('mockup gallery builds ten sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1100, 20000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 20000,
              child: SingleChildScrollView(child: WashMockupGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Bordered browser'), findsOneWidget);
    expect(find.text('Tinted browser'), findsOneWidget);
    expect(find.text('Line prefix'), findsOneWidget);
    expect(find.text('Multi-line output'), findsOneWidget);
    expect(find.text('Highlighted line'), findsOneWidget);
    expect(find.text('Long line scroll'), findsOneWidget);
    expect(find.text('Without prefix'), findsOneWidget);
    expect(find.text('iPhone frame'), findsOneWidget);
    expect(find.text('OS window border'), findsOneWidget);
    expect(find.text('Tinted window'), findsOneWidget);
    expect(find.text('Plate archive'), findsOneWidget);
    expect(find.text('npm i daisyui@5.7.9'), findsOneWidget);
    expect(find.text('Studio mixer'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashMockupCode renders prefixes and tones', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(800, 600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Center(
              child: WashMockupCode(
                lines: [
                  WashMockupCodeLine('hello', prefix: r'$'),
                  WashMockupCodeLine(
                    'warn',
                    prefix: '>',
                    tone: WashMockupCodeTone.warning,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('hello'), findsOneWidget);
    expect(find.text('warn'), findsOneWidget);
    expect(find.text(r'$'), findsOneWidget);
  });

  testWidgets('WashMockupPhone builds camera notch', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(800, 900), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Center(
              child: WashMockupPhone(
                child: ColoredBox(
                  color: Color(0xFF333333),
                  child: Center(child: Text('Field notes')),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Field notes'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
