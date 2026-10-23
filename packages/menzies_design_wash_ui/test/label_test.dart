import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('label gallery builds seven sections', (tester) async {
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
              child: SingleChildScrollView(child: WashLabelGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Label and input'), findsOneWidget);
    expect(find.text('Floating label'), findsOneWidget);
    expect(find.text('Add wash recipe'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashFieldLabel shows required mark', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: const WashFieldLabel(text: 'Pigment', requiredMark: true),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Pigment'), findsOneWidget);
    expect(find.text('*'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
