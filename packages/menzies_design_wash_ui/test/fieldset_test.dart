import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('fieldset gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 4200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: const SizedBox(
              width: 900,
              height: 4200,
              child: SingleChildScrollView(child: WashFieldsetGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Legend and input'), findsOneWidget);
    expect(find.text('Side by side on desktop'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashFieldset renders legend', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: const WashFieldset(
            legend: 'Plate title',
            children: [Text('Child')],
          ),
        ),
      ),
    );
    expect(find.text('Plate title'), findsOneWidget);
    expect(find.text('Child'), findsOneWidget);
  });
}
