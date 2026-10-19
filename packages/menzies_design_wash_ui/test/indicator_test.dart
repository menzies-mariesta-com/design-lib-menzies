import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('indicator gallery builds ten sections', (tester) async {
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
              child: SingleChildScrollView(child: WashIndicatorGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Badge and status dots'), findsOneWidget);
    expect(find.text('Breakpoint placement'), findsOneWidget);
    expect(find.text('Resize to move the badge'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashIndicator places marks on child', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: Builder(
            builder: (context) => WashIndicator(
              marks: const [
                WashIndicatorMark(
                  vertical: WashIndicatorVertical.bottom,
                  horizontal: WashIndicatorHorizontal.start,
                  child: WashBadge('Hint', tone: WashBadgeTone.info, size: WashBadgeSize.sm),
                ),
              ],
              child: const SizedBox(width: 120, height: 48),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Hint'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
