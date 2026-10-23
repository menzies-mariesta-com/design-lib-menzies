import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('rating gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 28000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 28000,
              child: SingleChildScrollView(
                child: WashRatingGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Default stars'), findsOneWidget);
    expect(find.text('Size scale'), findsOneWidget);
    expect(find.text('Semantic fills'), findsOneWidget);
    expect(find.text('Half-step scores'), findsOneWidget);
    expect(find.text('Controlled value'), findsOneWidget);
    expect(find.text('Critique desk'), findsOneWidget);
    expect(find.text('Display and reset'), findsOneWidget);
    expect(find.text('Narrow and wide'), findsOneWidget);
    expect(find.text('PLATE SCORE'), findsWidgets);
    expect(find.text('HEARTS'), findsOneWidget);

    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashRating interactive and read-only', (tester) async {
    var value = 2;
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: Column(
              children: [
                WashRating(
                  value: value,
                  onChanged: (v) => value = v.toInt(),
                  shape: WashRatingShape.star,
                ),
                const WashRating(
                  value: 4,
                  readOnly: true,
                  size: WashRatingSize.md,
                  tone: WashProgressTone.warning,
                ),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashRating), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });

  test('rating sizes resolve for all steps', () {
    for (final size in WashRatingSize.values) {
      expect(washRatingItemSize(size), greaterThan(0));
    }
  });
}
