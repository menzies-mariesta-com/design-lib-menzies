import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('badge gallery builds sixteen sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 4800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 4800,
              child: SingleChildScrollView(child: WashBadgeGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Default badges'), findsOneWidget);
    expect(find.text('Pigment tags and wash chips'), findsOneWidget);
    expect(find.text('Plate 214 · Morning fog'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashBadge variants render', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: Builder(
            builder: (context) => Column(
              children: const [
                WashBadge('Solid', tone: WashBadgeTone.primary),
                WashBadge('Soft',
                    tone: WashBadgeTone.info, style: WashBadgeStyle.soft),
                WashBadge('Outline',
                    tone: WashBadgeTone.error, style: WashBadgeStyle.outline),
                WashBadge('',
                    tone: WashBadgeTone.primary, size: WashBadgeSize.sm),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Solid'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
