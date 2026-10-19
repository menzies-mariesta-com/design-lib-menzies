import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('links gallery builds eight sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 4800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 4800,
              child: SingleChildScrollView(child: WashLinksGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Base link'), findsOneWidget);
    expect(find.text('Semantic colors'), findsOneWidget);
    expect(find.text('Hover underline'), findsOneWidget);
    expect(find.text('Hover with every color'), findsOneWidget);
    expect(find.text('Icon + label'), findsOneWidget);
    expect(find.text('Anchor and button'), findsOneWidget);
    expect(find.text('Paragraph context'), findsOneWidget);
    expect(find.text('Link preview card'), findsOneWidget);
    expect(find.text('Click me'), findsOneWidget);
    expect(find.text('Studio notes'), findsOneWidget);
    expect(find.text('btn btn-link'), findsOneWidget);
    expect(find.text('Revoke link'), findsOneWidget);
    expect(find.text('Ultramarine study'), findsWidgets);
    expect(tester.takeException(), isNull);
  });

  test('washLinkClassLabel matches daisyUI class names', () {
    expect(washLinkClassLabel(), 'link');
    expect(
      washLinkClassLabel(tone: WashLinkTone.primary, hoverUnderline: true),
      'link link-hover link-primary',
    );
    expect(
      washLinkClassLabel(tone: WashLinkTone.error),
      'link link-error',
    );
  });
}
