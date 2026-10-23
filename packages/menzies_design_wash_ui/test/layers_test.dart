import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('layers gallery builds five sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 3600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 3600,
              child: SingleChildScrollView(child: WashLayersGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Elements layered on top of each other'), findsOneWidget);
    expect(find.text('Alignment modifiers'), findsOneWidget);
    expect(find.text('Pigment layer stack'), findsOneWidget);
    expect(find.text('Plate preview'), findsOneWidget);
    expect(find.text('Sky'), findsWidgets);
    expect(find.text('Sky glaze'), findsOneWidget);
    expect(find.text('Ochre cliff'), findsOneWidget);
    expect(find.text('Rose bloom'), findsOneWidget);
    expect(find.text('Paper tooth'), findsOneWidget);
    expect(find.text('Add wash'), findsOneWidget);
    expect(find.text('Composite plate'), findsOneWidget);
    expect(find.text('4 of 4 washes visible'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  test('WashPigmentLayer initial has four washes', () {
    expect(WashPigmentLayer.initial(), hasLength(4));
    expect(WashPigmentLayer.initial().where((l) => l.locked), hasLength(2));
    expect(
      WashPigmentLayer.initial().map((l) => l.swatch).toList(),
      [
        WashLayerSwatch.blue,
        WashLayerSwatch.ochre,
        WashLayerSwatch.rose,
        WashLayerSwatch.paper,
      ],
    );
  });
}
