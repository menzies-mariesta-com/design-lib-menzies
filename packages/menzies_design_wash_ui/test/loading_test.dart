import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('loading gallery builds nine sections', (tester) async {
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
              child: SingleChildScrollView(child: WashLoadingGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    expect(find.text('Stroke, pigment, and logo'), findsOneWidget);
    expect(find.text('Busy panels that follow the desk'), findsOneWidget);
    expect(find.text('daisyUI animation styles'), findsOneWidget);
    expect(find.text('Size scale'), findsOneWidget);
    expect(find.text('Semantic colors'), findsOneWidget);
    expect(find.text('Style matrix'), findsOneWidget);
    expect(find.text('Loading button states'), findsOneWidget);
    expect(find.text('Wash drying panels'), findsOneWidget);
    expect(find.text('Adaptive busy rows'), findsOneWidget);
    expect(find.text('Stroke sweep'), findsOneWidget);
    expect(find.text('Mixing'), findsOneWidget);
    expect(find.text('Thumbnail bake'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashLoading variants paint without error', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const Row(
              children: [
                WashLoading(variant: WashLoadingVariant.spinner),
                WashLoading(variant: WashLoadingVariant.dots),
                WashLoading(variant: WashLoadingVariant.ring),
                WashLoading(variant: WashLoadingVariant.ball),
                WashLoading(variant: WashLoadingVariant.bars),
                WashLoading(variant: WashLoadingVariant.infinity),
              ],
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(tester.takeException(), isNull);
  });
}
