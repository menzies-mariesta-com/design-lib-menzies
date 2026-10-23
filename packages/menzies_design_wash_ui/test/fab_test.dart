import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('fab gallery builds fourteen sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 7200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: const SizedBox(
              width: 900,
              height: 7200,
              child: SingleChildScrollView(child: WashFabGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Single FAB'), findsOneWidget);
    expect(find.text('Mixed palette'), findsNothing);
    expect(find.text('Colored speed dial actions'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashFabPrimary builds', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: WashFabPrimary(onPressed: () {}),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Click or focus the FAB'), findsOneWidget);
  });
}
