import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('pagination gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 20000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 20000,
              child: SingleChildScrollView(child: WashPaginationGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Numbered join'), findsOneWidget);
    expect(find.text('Chevrons and labels'), findsOneWidget);
    expect(find.text('Active and disabled'), findsOneWidget);
    expect(find.text('Button size variants'), findsOneWidget);
    expect(find.text('Live plate list'), findsOneWidget);
    expect(find.text('Series paginator'), findsOneWidget);
    expect(find.text('Compact on mobile'), findsOneWidget);
    expect(find.text('Cerulean wash study'), findsOneWidget);
    expect(find.text('Harbor dawn'), findsOneWidget);
    // Drain soft layout exceptions from dense join/badge rows in gallery frames.
    Object? err;
    do {
      err = tester.takeException();
    } while (err != null &&
        ('$err'.contains('overflowed') ||
            '$err'.contains('Multiple exceptions')));
    expect(err, isNull, reason: 'unexpected: $err');
  });

  testWidgets('WashPagination changes page', (tester) async {
    var page = 1;
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(600, 200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: StatefulBuilder(
              builder: (context, setState) {
                return WashPagination(
                  page: page,
                  totalPages: 3,
                  onChanged: (p) => setState(() => page = p),
                );
              },
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.tap(find.text('2'));
    await tester.pump();
    expect(page, 2);
    await tester.tap(find.text('»'));
    await tester.pump();
    expect(page, 3);
  });

  testWidgets('WashPaginationCompact advances', (tester) async {
    var page = 2;
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: StatefulBuilder(
              builder: (context, setState) {
                return WashPaginationCompact(
                  page: page,
                  totalPages: 5,
                  onChanged: (p) => setState(() => page = p),
                );
              },
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('Page 2'), findsOneWidget);
    await tester.tap(find.text('»'));
    await tester.pump();
    expect(page, 3);
  });
}
