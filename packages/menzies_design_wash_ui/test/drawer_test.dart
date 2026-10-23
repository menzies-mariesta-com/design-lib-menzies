import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('drawer gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 5600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 5600,
              child: SingleChildScrollView(child: WashDrawerGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Checkbox toggle'), findsOneWidget);
    expect(find.text('Menu and close with tooltips'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashDrawerBasicDemo builds', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: const SizedBox(
              width: 400, height: 320, child: WashDrawerBasicDemo()),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Open drawer'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
