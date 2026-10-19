import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('join gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1200, 4800), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1200,
              height: 4800,
              child: SingleChildScrollView(child: WashJoinGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    expect(find.text('Joined buttons'), findsOneWidget);
    expect(find.text('Vertical then horizontal'), findsOneWidget);
    expect(find.text('Watercolor tool group'), findsOneWidget);
  });

  testWidgets('WashJoin responsiveLg stacks below lg width', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(800, 400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            child: LayoutBuilder(
              builder: (context, c) => WashJoin.responsiveLg(
                maxWidth: c.maxWidth,
                children: [
                  WashButton(label: 'A', joinItem: true, onPressed: () {}),
                  WashButton(label: 'B', joinItem: true, onPressed: () {}),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(Column), findsWidgets);
  });
}
