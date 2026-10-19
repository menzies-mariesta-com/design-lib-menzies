import 'package:flutter/painting.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:menzies_design_wash_ui/menzies_design_wash_ui.dart';

void main() {
  test('WashContextMenuPlacement flips near viewport edges', () {
    const viewport = Size(400, 300);
    const menu = Size(208, 120);
    final nearRight = WashContextMenuPlacement.placeNearCursor(
      cursor: const Offset(350, 100),
      menuSize: menu,
      viewport: viewport,
    );
    expect(nearRight.dx < 350, isTrue);

    final nearBottom = WashContextMenuPlacement.placeNearCursor(
      cursor: const Offset(100, 280),
      menuSize: menu,
      viewport: viewport,
    );
    expect(nearBottom.dy < 280, isTrue);
  });

  test('WashContextMenuController open and close', () {
    final controller = WashContextMenuController();
    expect(controller.isOpen, isFalse);
    controller.openAt(const Offset(40, 40), const Size(800, 600));
    expect(controller.isOpen, isTrue);
    expect(controller.menuOffset, isNotNull);
    controller.close();
    expect(controller.isOpen, isFalse);
    controller.dispose();
  });
}
