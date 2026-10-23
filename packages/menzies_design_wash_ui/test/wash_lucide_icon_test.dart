import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  test('washLucideIconNames is non-empty and includes heart', () {
    expect(washLucideIconNames, isNotEmpty);
    expect(washLucideIconNameSet.contains('heart'), isTrue);
    expect(washLucideIconNames.length, washLucideIconNameSet.length);
  });

  test('washLucideLabIconNames includes bat', () {
    expect(washLucideLabIconNames, isNotEmpty);
    expect(washLucideLabIconNameSet.contains('bat'), isTrue);
  });

  test('WashLucideIcon asset paths', () {
    expect(
        WashLucideIcon.assetPathFor('heart'), 'assets/icons/lucide/heart.svg');
    expect(
      WashLucideIcon.assetPathFor('bat', lab: true),
      'assets/icons/lucide-lab/bat.svg',
    );
  });

  test('glyph mapping resolves to known lucide names', () {
    for (final g in WashIconGlyph.values) {
      final name = washIconGlyphLucideName(g);
      expect(
        WashLucideIcon.isKnownName(name),
        isTrue,
        reason: '$g -> $name',
      );
    }
  });
}
