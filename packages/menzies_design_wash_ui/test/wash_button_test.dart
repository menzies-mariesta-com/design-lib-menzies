import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

import 'support/wash_test_matrix.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('WashButton matrix', (tester) async {
    await runWashComponentMatrix(
      tester: tester,
      buildSubject: () => WashButton(
        label: 'Save',
        onPressed: () {},
      ),
    );
    await tester.tap(find.text('Save'));
    await tester.pump();
  });
}
