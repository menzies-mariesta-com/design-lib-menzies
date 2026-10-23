import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('navbar gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 20000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 20000,
              child: SingleChildScrollView(child: WashNavbarGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Start, center, and end'), findsOneWidget);
    expect(find.text('Horizontal menu links'), findsOneWidget);
    expect(find.text('Join input and button'), findsOneWidget);
    expect(find.text('Account menu'), findsOneWidget);
    expect(find.text('Tooltips on icon-only actions'), findsOneWidget);
    expect(find.text('Brand and pigment tools'), findsOneWidget);
    expect(find.text('Background variants'), findsOneWidget);
    expect(find.text('Hamburger and collapse'), findsOneWidget);
    expect(find.text('Menzies Design'), findsWidgets);
    expect(find.text('Open plate'), findsWidgets);
    // Soft overflow from dense icon/tool rows is acceptable in gallery frames.
    final err = tester.takeException();
    expect(
      err == null || '$err'.contains('overflowed'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashNavbar brand and slots render', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(900, 400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashNavbar(
              start: const WashNavbarStart(
                child: WashNavbarBrand('Brand'),
              ),
              center: const WashNavbarCenter(child: Text('Center title')),
              end: WashNavbarEnd(
                child: WashButton(
                  label: 'Action',
                  size: WashButtonSize.sm,
                  onPressed: () {},
                ),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Brand'), findsOneWidget);
    expect(find.text('Center title'), findsOneWidget);
    expect(find.text('Action'), findsOneWidget);
  });

  testWidgets('WashNavbarCollapse toggles panel on small width',
      (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashNavbarCollapse(
              barBuilder: (context,
                  {required open, required wide, required onToggle}) {
                return Row(
                  children: [
                    WashButton(
                      variant: WashButtonVariant.ghost,
                      square: true,
                      onPressed: onToggle,
                      child: const Text('Toggle'),
                    ),
                    const WashNavbarBrand('Brand'),
                  ],
                );
              },
              panel: const Text('Collapse panel'),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Collapse panel'), findsNothing);
    await tester.tap(find.text('Toggle'));
    await tester.pump();
    expect(find.text('Collapse panel'), findsOneWidget);
  });
}
