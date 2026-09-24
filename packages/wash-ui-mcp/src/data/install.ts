export const installGuide = {
  packageName: '@menzies-mariesta-com/menzies-design-wash-ui',
  mcpPackageName: '@menzies-mariesta-com/wash-ui-mcp',
  relatedMcp: {
    webServerName: 'wash-ui-web',
  },
  registry: 'https://registry.npmjs.org',
  peerDependencies: {
    react: '^18.0.0 || ^19.0.0',
    'react-dom': '^18.0.0 || ^19.0.0',
  },
  dependencies: {
    apexcharts: '^5.16.0',
    'lucide-react': '1.28.0',
    'react-apexcharts': '^2.1.1',
    'simple-icons': '^15.0.0',
  },
  npmrc: 'Not required for public npm installs of @menzies-mariesta-com/*',
  steps: [
    'npm i @menzies-mariesta-com/menzies-design-wash-ui (public npm; no scoped .npmrc required)',
    'For React: also install react and react-dom peer dependencies',
    'Charts: apexcharts / react-apexcharts come with Wash (no separate npm i apexcharts)',
    "Import styles.css in your app entry: import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'",
    'Boot with initWash (vanilla) or WashProvider (React)',
  ],
  exports: [
    { path: '.', use: 'React adapter (alias of /react)' },
    { path: './styles.css', use: 'Required stylesheet' },
    { path: './core', use: 'Framework-free APIs' },
    { path: './react', use: 'React components and hooks' },
    { path: './theme', use: 'Theme helpers' },
    { path: './icons', use: 'Lucide UI icons' },
    { path: './icons/brands', use: 'Curated brand marks (Simple Icons inside Wash)' },
    { path: './charts', use: 'ApexCharts React components' },
    { path: './charts/apex', use: 'ApexCharts constructor for Svelte / vanilla' },
    { path: './editors', use: 'Optional RichTextEditor + CodeEditor (web React)' },
    { path: './email', use: 'Email HTML builders' },
  ],
}
