import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/src/tokens/wash_style_spec.g.dart';

void main() {
  test('button default metrics match CSS spec', () {
    expect(kWashBtnDefault.minHeight, closeTo(48, 1));
    expect(kWashBtnDefault.paddingX, closeTo(16, 1));
    expect(kWashBtnDefault.borderRadius, closeTo(16, 1));
  });

  test('input default metrics match CSS spec', () {
    expect(kWashInputDefault.minHeight, closeTo(48, 1));
    expect(kWashInputDefault.paddingX, closeTo(16, 1));
  });
}
