# 🎨 Codebase Summary: Menzies Design Wash UI Monorepo

This repository is a monorepo for the **Menzies Design Wash UI** design system. It hosts a publicly publishable NPM package (`@menzies-mariesta-com/menzies-design-wash-ui`) and a private documentation/gallery application (`@menzies/wash-demo`).

The primary goal of this project is to provide a robust, watercolor-themed design system featuring pigment themes, wash atmosphere effects, CSS utilities, extensive components, integrated charting (ApexCharts), and full-page templates.

## 📂 Project Structure Overview

The codebase is organized into several key areas:

*   **`apps/`**: Contains runnable applications.
    *   `demo/`: The private gallery and documentation site (`@menzies/wash-demo`). This serves as a showcase for the design system components and templates, including live previews of various snippets (HTML, JSX, Svelte).
    *   `wash_demo_flutter/`: A Flutter gallery demonstrating parity with the Wash UI package.
*   **`packages/`**: Contains reusable library packages.
    *   `menzies-design-wash-ui`: The main public NPM component library (React adapter and core utilities).
    *   `menzies_design_wash_ui`: The Flutter implementation of the design system, containing components, themes, and tokens for mobile/Flutter applications.
*   **`tool/`**: Contains various internal scripts used for generating assets, auditing, and running demos (e.g., `generate_gallery_manifest.dart`, `gallery_depth_audit.dart`).

## ✨ Menzies Design Wash UI Features (The Core Product)

The design system is highly comprehensive, offering:

### Components & UI Elements
*   **115+ Gallery Pages**: A vast catalog of components covering buttons, forms, data displays, overlays, and more.
*   **Tokens & Theming**: Full support for pigment themes, wash atmosphere effects (`wash_atmosphere.frag` shader), and custom theming via `WashProvider`.
*   **Foundation**: Core elements like ripples, tooltips, and form fields are provided with a watercolor aesthetic.

### Data Visualization & Layout
*   **Charts**: Over 31 categories of ApexChart components (line, bar, pie, heatmap, etc.) that are pigment-aware and integrated into the system.
*   **Templates**: 11 full-page layouts grouped by use case: **Auth**, **Commerce**, **Data**, **Studio** (code editor/terminal), and **Layout**.

### Development & Usage
The design system is accessible through multiple entrypoints depending on the framework:

| Entrypoint | Use Case | Framework | Description |
| :--- | :--- | :--- | :--- |
| `styles.css` | Base Stylesheet | Universal | Required stylesheet containing tokens, pigments, and utilities. |
| `/react` (via `@menzies-mariesta-com/...`) | Components/Hooks | React (Web) | Access to core components, providers, and hooks for web applications. |
| `core` | Framework-free | Universal | Provides foundational functions like theme initialization (`initWash`), ripple effects, and tooltips. |
| `/flutter` (via `menzies_design_wash_ui`) | Components/Themes | Flutter | Comprehensive Flutter package implementation of the design system. |

## 🛠️ Development Workflow

The monorepo supports full-stack development:

*   **Setup**: `npm install` in the root directory.
*   **Demo Site**: `npm run dev` runs the documentation and gallery site (Vite).
*   **Library Builds**: Dedicated commands (`npm run build:lib`, `npm run build`) allow for building just the package or the full application bundle.
*   **Flutter Gallery**: Specific scripts manage generation, testing, and running the Flutter demonstration app using `npm run flutter:*`.

## ⚖️ Licensing

The project is licensed under the [GNU General Public License v3.0 or later](LICENSE).