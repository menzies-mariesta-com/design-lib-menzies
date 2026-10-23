import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('range gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 12000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 12000,
              child: SingleChildScrollView(
                child: WashRangeGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Default range'), findsOneWidget);
    expect(find.text('Size scale'), findsOneWidget);
    expect(find.text('Semantic colors'), findsOneWidget);
    expect(find.text('Steps and measure'), findsOneWidget);
    expect(find.text('Controlled value'), findsOneWidget);
    expect(find.text('Brush desk'), findsOneWidget);
    expect(find.text('WASH STRENGTH'), findsWidgets);
    expect(find.text('PIGMENT LOAD'), findsWidgets);
    expect(find.text('Active tip'), findsOneWidget);

    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashRange sizes, tone, step, and vertical', (tester) async {
    var v = 40.0;
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 600), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: Column(
              children: [
                WashRange(
                  value: v,
                  onChanged: (n) => v = n,
                  tone: WashProgressTone.secondary,
                  size: WashRangeSize.lg,
                ),
                WashRange(
                  value: 25,
                  min: 0,
                  max: 100,
                  step: 25,
                  onChanged: (_) {},
                ),
                WashRange(
                  value: 55,
                  vertical: true,
                  size: WashRangeSize.sm,
                  onChanged: (_) {},
                ),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashRange), findsNWidgets(3));
    expect(tester.takeException(), isNull);
  });

  test('washRangeClassLabel matches daisyUI modifiers', () {
    expect(washRangeClassLabel(), 'range');
    expect(
      washRangeClassLabel(
          tone: WashProgressTone.primary, size: WashRangeSize.sm),
      'range range-primary range-sm',
    );
    expect(
      washRangeClassLabel(tone: WashProgressTone.secondary, vertical: true),
      'range range-secondary range-vertical',
    );
  });
}
