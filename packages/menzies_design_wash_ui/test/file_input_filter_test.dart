import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('file-input gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 5200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: const SizedBox(
              width: 900,
              height: 5200,
              child: SingleChildScrollView(child: WashFileInputGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Default file input'), findsOneWidget);
    expect(find.text('Fluid width'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('filter gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 4800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: const SizedBox(
              width: 900,
              height: 4800,
              child: SingleChildScrollView(child: WashFilterGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Form filter with reset'), findsOneWidget);
    expect(find.text('Wrap on mobile'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
