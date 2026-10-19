#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/apps/wash_demo_flutter"
flutter pub get
exec flutter run "$@"
