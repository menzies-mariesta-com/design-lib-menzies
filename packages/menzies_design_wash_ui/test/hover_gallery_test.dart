import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/src/gallery/pages/wash_hover_gallery_gallery_page.dart';
import 'package:menzies_design_wash_ui/src/theme/wash_provider.dart';
import 'package:menzies_design_wash_ui/src/tokens/wash_tokens.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('hover gallery page builds five sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 1400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 3200,
              child: SingleChildScrollView(child: WashHoverGalleryGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Official structure'), findsOneWidget);
    expect(find.text('Wash plate sets'), findsOneWidget);
    expect(find.text('Width and frame'), findsOneWidget);
    expect(find.text('Menzies Design pigment preview'), findsOneWidget);
    expect(find.text('Fluid studio grid'), findsOneWidget);
    expect(find.text('Coastal fog set'), findsOneWidget);
  });

}
