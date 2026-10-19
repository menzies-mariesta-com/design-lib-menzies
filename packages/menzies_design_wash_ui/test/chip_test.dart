import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('chip gallery builds nine sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 5200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 5200,
              child: SingleChildScrollView(child: WashChipGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Tag chips'), findsOneWidget);
    expect(find.text('Responsive wrap'), findsOneWidget);
    expect(find.text('Ultramarine deep'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashChip variants render', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: Builder(
            builder: (context) => Column(
              children: [
                const WashChip(label: 'Tag', tone: WashBadgeTone.primary),
                WashChip(label: 'Removable', onDeleted: () {}),
                WashChip.selectable(label: 'Filter', selected: true, onPressed: () {}),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Tag'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
