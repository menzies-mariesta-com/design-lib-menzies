import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('radio gallery builds seven sections at 360px', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(360, 6400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 360,
              height: 6400,
              child: SingleChildScrollView(child: WashRadioGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Base radio group'), findsOneWidget);
    expect(find.text('Exclusive pigment pick'), findsOneWidget);
    final err = tester.takeException();
    expect(
      err == null || '$err'.contains('overflowed'),
      isTrue,
      reason: 'Unexpected error: $err',
    );
  });

  testWidgets('WashRadio toggles group value', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: _RadioTapHarness(),
        ),
      ),
    );
    await tester.pumpAndSettle();

    await tester.tap(find.text('Option B'));
    await tester.pumpAndSettle();
    expect(find.bySemanticsLabel('Option B'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}

class _RadioTapHarness extends StatefulWidget {
  @override
  State<_RadioTapHarness> createState() => _RadioTapHarnessState();
}

class _RadioTapHarnessState extends State<_RadioTapHarness> {
  String _g = 'a';

  @override
  Widget build(BuildContext context) {
    return WashRadioLabeled<String>(
      label: 'Option B',
      radio: WashRadio<String>(
        value: 'b',
        groupValue: _g,
        onChanged: (v) => setState(() => _g = v!),
        semanticLabel: 'Option B',
      ),
    );
  }
}
