import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('menu gallery builds eight sections', (tester) async {
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
              child: SingleChildScrollView(child: WashMenuGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Vertical menu links'), findsOneWidget);
    expect(find.text('menu-horizontal'), findsOneWidget);
    expect(find.text('From menu-xs to menu-lg'), findsOneWidget);
    expect(find.text('Lucide icons in menu items'), findsOneWidget);
    expect(find.text('Title, disabled, active, focus'), findsOneWidget);
    expect(find.text('Nested, details, and JS toggle'), findsOneWidget);
    expect(find.text('Watercolor tools sidebar'), findsOneWidget);
    expect(find.text('Vertical on small, horizontal on large'), findsOneWidget);
    expect(find.text('Overview'), findsOneWidget);
    expect(find.text('Studio tools'), findsOneWidget);
    expect(find.text('Round brush'), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashMenuDetails toggles submenu', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(900, 800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: Center(
              child: WashMenu(
                width: 224,
                children: [
                  WashMenuItem(label: 'Home', onPressed: () {}),
                  WashMenuDetails(
                    label: 'Pigments',
                    children: [
                      WashMenuItem(label: 'Ultramarine', onPressed: () {}),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Ultramarine'), findsNothing);
    await tester.tap(find.text('Pigments'));
    await tester.pump();
    expect(find.text('Ultramarine'), findsOneWidget);
  });

  testWidgets('WashMenuItem active and disabled states', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashMenu(
              width: 224,
              children: const [
                WashMenuItem(label: 'Active item', active: true),
                WashMenuItem(label: 'Disabled button', disabled: true),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Active item'), findsOneWidget);
    expect(find.text('Disabled button'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
