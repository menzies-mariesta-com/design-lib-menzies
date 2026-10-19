import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('washQrPayload falls back when empty', () {
    expect(washQrPayload(''), kWashQrEmptyFallback);
    expect(washQrPayload('  '), kWashQrEmptyFallback);
    expect(washQrPayload('hello'), 'hello');
  });

  test('washQrImage encodes sample url', () {
    final image = washQrImage('https://menzies.design/palette/ultramarine');
    expect(image.moduleCount, greaterThan(20));
    var dark = 0;
    for (var r = 0; r < image.moduleCount; r++) {
      for (var c = 0; c < image.moduleCount; c++) {
        if (image.isDark(r, c)) dark++;
      }
    }
    expect(dark, greaterThan(0));
  });

  testWidgets('qrcode gallery builds six sections', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(1100, 20000), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const SizedBox(
              width: 1100,
              height: 20000,
              child: SingleChildScrollView(
                child: WashQrcodeGalleryPage(),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    expect(find.text('Sample payloads'), findsOneWidget);
    expect(find.text('Small, medium, large'), findsOneWidget);
    expect(find.text('Theme-aware pigments'), findsOneWidget);
    expect(find.text('Live payload'), findsOneWidget);
    expect(find.text('Pigment and session demos'), findsOneWidget);
    expect(find.text('Export PNG'), findsOneWidget);
    expect(find.byType(WashQrCode), findsWidgets);

    final err = tester.takeException();
    expect(
      err == null ||
          '$err'.contains('overflowed') ||
          '$err'.contains('Multiple exceptions'),
      isTrue,
      reason: 'unexpected: $err',
    );
  });

  testWidgets('WashQrCode paints without error', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(400, 400), disableAnimations: true),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => WashProvider(
            defaultPigment: 'mineral',
            defaultMode: WashThemeMode.light,
            child: const WashQrFrame(
              child: WashQrCode(
                value: 'https://menzies.design',
                size: 144,
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pump();
    expect(find.byType(WashQrCode), findsOneWidget);
    expect(tester.takeException(), isNull);
  });

  testWidgets('washQrPngBytes returns PNG signature', (tester) async {
    await tester.pumpWidget(
      MediaQuery(
        data: const MediaQueryData(size: Size(64, 64)),
        child: WidgetsApp(
          color: const Color(0xFFFFFFFF),
          builder: (context, _) => const SizedBox.shrink(),
        ),
      ),
    );
    final bytes = await tester.runAsync(
      () => washQrPngBytes(value: 'menzies', size: 64),
    );
    expect(bytes, isNotNull);
    expect(bytes!.length, greaterThan(8));
    expect(bytes[0], 0x89);
    expect(bytes[1], 0x50); // P
    expect(bytes[2], 0x4E); // N
    expect(bytes[3], 0x47); // G
  });
}
