import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('org chart gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 16000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 16000,
              child: SingleChildScrollView(child: WashOrgChartGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Basic tree'), findsOneWidget);
    expect(find.text('Horizontal and vertical'), findsOneWidget);
    expect(find.text('Avatars and roles'), findsOneWidget);
    expect(find.text('Select a node'), findsOneWidget);
    expect(find.text('Compact and expanded'), findsOneWidget);
    expect(find.text('Narrow viewport scroll'), findsOneWidget);
    expect(find.text('Studio'), findsOneWidget);
    expect(find.text('Mira Kline'), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashOrgChart selects and highlights descendants',
      (tester) async {
    String? selected;
    const root = WashOrgNode(
      id: 'root',
      name: 'Root',
      children: [
        WashOrgNode(id: 'a', name: 'Child A'),
        WashOrgNode(id: 'b', name: 'Child B'),
      ],
    );

    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(800, 600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: StatefulBuilder(
              builder: (context, setState) {
                final highlight = selected == null
                    ? null
                    : root.findById(selected!)?.collectDescendantIds();
                return WashOrgChart(
                  root: root,
                  selectedId: selected,
                  highlightIds: highlight,
                  onSelect: (id) => setState(() => selected = id),
                );
              },
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.tap(find.text('Child A'));
    await tester.pump();
    expect(selected, 'a');
  });

  testWidgets('horizontal direction builds without error', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(900, 400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const WashOrgChart(
              direction: WashOrgDirection.horizontal,
              root: WashOrgNode(
                id: 'r',
                name: 'Director',
                children: [
                  WashOrgNode(id: 'a', name: 'Color lead'),
                  WashOrgNode(id: 'b', name: 'Critique host'),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Director'), findsOneWidget);
    expect(find.text('Color lead'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
