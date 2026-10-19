import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('generated palette count', () {
    expect(kWashPigmentPaletteCount, 60);
    expect(kWashPigmentIds.length, 30);
  });

  test('mineral primary matches web token', () {
    final p = washPalette('mineral', WashThemeMode.light);
    expect(p.primary, const Color(0xff276c8e));
  });
}
