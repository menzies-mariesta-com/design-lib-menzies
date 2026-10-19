import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('washInputClassLabel matches daisy modifiers', () {
    expect(washInputClassLabel(), 'input');
    expect(
      washInputClassLabel(tone: WashInputTone.primary, size: WashInputSize.lg),
      'input input-primary input-lg',
    );
    expect(washInputClassLabel(tone: WashInputTone.ghost), 'input input-ghost');
  });

  testWidgets('input gallery builds nine sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(900, 6400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 900,
              height: 6400,
              child: SingleChildScrollView(child: WashInputGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Base input'), findsOneWidget);
    expect(find.text('Input + button'), findsOneWidget);
    expect(find.text('Semantic colors'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashInput composite and disabled states', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: Builder(
            builder: (context) {
              final muted = WashTokens.of(context).onSurface.withValues(alpha: 0.6);
              return Column(
                children: [
                  WashInput(
                    hint: 'Search',
                    leading: WashLucideIcon('search', size: 16, color: muted),
                  ),
                  const WashInput(hint: 'Off', enabled: false),
                ],
              );
            },
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Search'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}
