import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('divider gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 4200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 4200,
              child: SingleChildScrollView(child: WashDividerGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Default divider with and without text'), findsOneWidget);
    expect(find.text('Breakpoint behavior'), findsOneWidget);
    expect(find.text('Pigment mix'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashDivider renders label and tones', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: const Column(
            children: [
              WashDivider(label: 'OR'),
              WashDivider(label: 'Primary', tone: WashBadgeTone.primary),
            ],
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('OR'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
