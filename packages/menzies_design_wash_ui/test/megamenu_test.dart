import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('megamenu gallery builds five sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1100, 12000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 12000,
              child: SingleChildScrollView(child: WashMegamenuGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Wide multi-column panel'), findsOneWidget);
    expect(find.text('Lucide icons in link rows'), findsOneWidget);
    expect(find.text('Menzies Design section columns'), findsOneWidget);
    expect(find.text('Mini navbar host'), findsOneWidget);
    expect(find.text('Small screen notes'), findsOneWidget);
    expect(find.text('Pigments'), findsWidgets);
    expect(find.text('Ultramarine'), findsOneWidget);
    expect(find.text('Pigment chart'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashMegamenu opens panel on tap', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Center(
              child: SizedBox(
                width: 640,
                child: WashMegamenu(
                  showMobileMenuButton: false,
                  sections: [
                    WashMegamenuSection(
                      label: 'Alpha',
                      panel: WashMegamenuLinkList([
                        WashMegamenuLink(label: 'One'),
                      ]),
                    ),
                    WashMegamenuSection(
                      label: 'Beta',
                      panel: WashMegamenuLinkList([
                        WashMegamenuLink(label: 'Two'),
                      ]),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('One'), findsNothing);
    await tester.tap(find.text('Alpha'));
    await tester.pump();
    expect(find.text('One'), findsOneWidget);
  });
}
