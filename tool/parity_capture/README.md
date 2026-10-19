# Gallery parity capture (Playwright)

Run against the built web demo to refresh reference PNGs under
`packages/menzies_design_wash_ui/test/parity/reference/`.

CI nightly job can invoke this after `npm run build:lib` and starting the demo.

Flutter compares subsets in `test/parity/flutter_golden_test.dart` (expand as refs land).
