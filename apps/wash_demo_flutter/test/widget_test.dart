import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wash_demo_flutter/main.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Gallery loads overview', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(const WashDemoApp());
    await tester.pumpAndSettle();
    expect(find.textContaining('Wash UI'), findsWidgets);
  });
}
