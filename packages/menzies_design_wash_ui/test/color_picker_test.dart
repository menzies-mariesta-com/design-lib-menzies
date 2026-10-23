import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('wash color math normalizes hex', () {
    expect(washNormalizeHex('#abc'), '#aabbcc');
    expect(washHslToHex(200, 50, 50), isNotEmpty);
  });

  testWidgets('color picker gallery builds two sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 1200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 1200,
              child: SingleChildScrollView(child: WashColorPickerGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    expect(find.text('Wash color wheel'), findsOneWidget);
    expect(find.text('Props'), findsOneWidget);
    expect(find.text('FULL PICKER'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashColorPicker reports changes', (tester) async {
    var hex = '#276c8e';
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: Builder(
            builder: (context) => WashColorPicker(
              value: hex,
              onChanged: (v) => hex = v,
              size: 120,
              showHexInput: true,
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));
    expect(tester.takeException(), isNull);
  });
}
