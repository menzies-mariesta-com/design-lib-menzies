import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('list gallery builds thirteen sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 9000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 9000,
              child: SingleChildScrollView(child: WashListGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('list + list-row'), findsOneWidget);
    expect(find.text('Section label row'), findsOneWidget);
    expect(find.text('Figures and status chips'), findsOneWidget);
    expect(find.text('Second column grows (default)'), findsOneWidget);
    expect(find.text('Icon actions on the trailing edge'), findsOneWidget);
    expect(find.text('Third column grows'), findsOneWidget);
    expect(find.text('Description wraps to next line'), findsOneWidget);
    expect(find.text('Selectable list rows'), findsOneWidget);
    expect(find.text('Interactive watercolor desk'), findsOneWidget);
    expect(find.text('Bordered and soft shadow'), findsOneWidget);
    expect(find.text('Two-up from md'), findsOneWidget);
    expect(find.text('View, edit, delete'), findsOneWidget);
    expect(find.text('Components and modifiers'), findsOneWidget);
    expect(find.text('Cerulean wash'), findsWidgets);
    expect(find.text('Harbor dawn'), findsWidgets);
    expect(find.text("Payne's gray"), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashList.titles builds simple rows', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          defaultPigment: 'mineral',
          defaultMode: WashThemeMode.light,
          child: WashList.titles(const ['Alpha', 'Beta']),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Alpha'), findsOneWidget);
    expect(find.text('Beta'), findsOneWidget);
  });
}
