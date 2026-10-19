#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIB="$ROOT/packages/menzies_design_wash_ui/lib"
if rg -n "package:flutter/material\.dart" "$LIB" >/dev/null 2>&1; then
  echo "ERROR: material.dart imports found in menzies_design_wash_ui/lib:"
  rg -n "package:flutter/material\.dart" "$LIB"
  exit 1
fi
if rg -n "package:flutter/cupertino\.dart" "$LIB" >/dev/null 2>&1; then
  echo "ERROR: cupertino.dart imports found in lib"
  exit 1
fi
echo "OK: no material/cupertino imports in package lib"
