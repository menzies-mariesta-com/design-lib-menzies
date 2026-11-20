# Agent instructions

## ui-sdk (@ui-sdk/react)

Before using ui-sdk:

1. If the **ui-sdk** skill is installed (`.agents/skills/ui-sdk`), follow it.
2. Read `node_modules/@ui-sdk/react/docs/llms.txt`.

To build a new component, also search `node_modules/@ui-sdk/react/docs/core.md` by heading, and read `rendering.md` next to it.

This repo uses React 19+ (`@menzies-mariesta-com/menzies-design-wash-ui` and `@menzies/wash-demo`).

## Wash UI v2

- Library version `1.7.0`. React apps using `.../react` must install peers `@ui-sdk/core` and `@ui-sdk/react` (see `packages/menzies-design-wash-ui/MIGRATION-v2.md`).
- Framework-free stack: `styles.css` + `core` only; behaviours live under `src/behaviours/` (re-exported from `core`).