import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('mask gallery builds four sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1100, 10000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 10000,
              child: SingleChildScrollView(child: WashMaskGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Shape masks'), findsOneWidget);
    expect(find.text('Half crop'), findsOneWidget);
    expect(find.text('Custom widths'), findsOneWidget);
    expect(find.text('Pigment wash plates'), findsOneWidget);
    expect(find.text('Cerulean wash'), findsOneWidget);
    expect(find.textContaining('mask-squircle'), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  test('mask paths parse for every shape', () {
    const size = Size(96, 96);
    for (final shape in WashMaskShape.values) {
      final path = washMaskPathFor(shape, size);
      expect(path.getBounds().isEmpty, isFalse, reason: shape.name);
      final half = washMaskPathFor(shape, size, half: WashMaskHalf.first);
      expect(half.getBounds().width, lessThanOrEqualTo(size.width + 0.5));
    }
  });
}
