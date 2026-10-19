import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('kbd gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(360, 4200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 360,
              height: 4200,
              child: SingleChildScrollView(child: WashKbdGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Single keys'), findsOneWidget);
    expect(find.text('Responsive layout'), findsOneWidget);
    expect(find.text('Command palette'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashKbd sizes and combo render', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: const Column(
            children: [
              WashKbd('K'),
              WashKbd('Large', size: WashKbdSize.lg),
              WashKbdCombo(keys: ['Ctrl', 'K']),
            ],
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Large'), findsOneWidget);
    expect(find.text('Ctrl'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
