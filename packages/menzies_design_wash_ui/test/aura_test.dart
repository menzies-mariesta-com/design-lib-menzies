import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('aura gallery builds nine sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(900, 1400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 3200,
              child: SingleChildScrollView(child: WashAuraGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Aura around a card'), findsOneWidget);
    expect(find.text('Rainbow pricing card'), findsOneWidget);
    expect(find.text('Preview'), findsWidgets);
  });

  test('washAuraClassLabel matches daisy modifiers', () {
    expect(washAuraClassLabel(), 'aura');
    expect(
      washAuraClassLabel(style: WashAuraStyle.rainbow, size: WashAuraSize.lg),
      'aura aura-rainbow aura-lg',
    );
  });
}
