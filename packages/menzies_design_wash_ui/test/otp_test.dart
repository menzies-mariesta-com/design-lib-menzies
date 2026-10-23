import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('otp gallery builds seven sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(
            size: Size(1100, 16000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 16000,
              child: SingleChildScrollView(child: WashOtpGalleryPage()),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Digit boxes'), findsOneWidget);
    expect(find.text('Connected boxes'), findsOneWidget);
    expect(find.text('Scale ladder'), findsOneWidget);
    expect(find.text('Semantic accents'), findsOneWidget);
    expect(find.text('Verify with button'), findsOneWidget);
    expect(find.text('Studio unlock code'), findsOneWidget);
    expect(find.text('Narrow viewports'), findsOneWidget);
    expect(find.text('Verify'), findsOneWidget);
    expect(find.text('Unlock studio'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('WashOtp accepts digits and completes', (tester) async {
    String? completed;
    String? changed;
    final controller = TextEditingController();

    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashOtp(
              digits: 4,
              controller: controller,
              onChanged: (v) => changed = v,
              onCompleted: (v) => completed = v,
              semanticLabel: 'Test OTP',
            ),
          ),
        ),
      ),
    );
    await tester.pump();

    controller.text = '12ab34';
    await tester.pump();
    expect(changed, '1234');
    expect(completed, '1234');
    expect(controller.text, '1234');

    completed = null;
    controller.text = '99';
    await tester.pump();
    expect(changed, '99');
    expect(completed, isNull);

    controller.text = '9999';
    await tester.pump();
    expect(completed, '9999');
  });

  testWidgets('WashOtpField length alias works', (tester) async {
    String? done;
    await tester.pumpWidget(
      MediaQuery(
        data:
            const MediaQueryData(size: Size(400, 200), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: WashOtpField(
              length: 6,
              onCompleted: (v) => done = v,
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashOtp), findsOneWidget);
    expect(done, isNull);
    expect(tester.takeException(), isNull);
  });
}
