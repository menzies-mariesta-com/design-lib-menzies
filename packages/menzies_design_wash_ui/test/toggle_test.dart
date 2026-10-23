import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('toggle gallery builds nine sections at 360px', (tester) async {
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
              child: SingleChildScrollView(child: WashToggleGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('On and off'), findsOneWidget);
    expect(find.text('Stack and row'), findsOneWidget);
    final err = tester.takeException();
    expect(
      err == null || '$err'.contains('overflowed'),
      isTrue,
      reason: 'Unexpected error: $err',
    );
  });

  testWidgets('WashToggle flips value on tap', (tester) async {
    await tester.pumpWidget(
      WidgetsApp(
        color: const Color(0xFFFFFFFF),
        builder: (context, _) => WashProvider(
          child: _ToggleTapHarness(),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('off'), findsOneWidget);
    await tester.tap(find.byType(WashToggle));
    await tester.pumpAndSettle();
    expect(find.text('on'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
}

class _ToggleTapHarness extends StatefulWidget {
  @override
  State<_ToggleTapHarness> createState() => _ToggleTapHarnessState();
}

class _ToggleTapHarnessState extends State<_ToggleTapHarness> {
  bool _on = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        WashToggle(
          value: _on,
          semanticLabel: 'Preview',
          onChanged: (v) => setState(() => _on = v),
        ),
        Text(_on ? 'on' : 'off'),
      ],
    );
  }
}
