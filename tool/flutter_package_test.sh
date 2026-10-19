#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/packages/menzies_design_wash_ui"
flutter pub get
exec flutter test "$@"
