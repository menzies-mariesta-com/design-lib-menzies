import { makeKeywordPack } from './factory'

const KW = [
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally', 'for',
  'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'return',
  'super', 'switch', 'throw', 'try', 'typeof', 'var',
  'void', 'while', 'with', 'yield', 'async', 'await', 'from', 'of', 'as', 'type',
  'interface', 'implements', 'private', 'public', 'protected', 'readonly', 'static',
  'namespace', 'module', 'declare', 'abstract', 'override', 'satisfies', 'keyof',
  'infer', 'is', 'asserts', 'using',
]

const BUILTINS = [
  'true', 'false', 'null', 'undefined', 'NaN', 'Infinity', 'this', 'super',
  'console', 'Math', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Date',
  'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Error', 'JSON', 'Symbol',
  'BigInt', 'RegExp', 'Proxy', 'Reflect', 'Intl', 'globalThis', 'window',
  'document', 'process', 'Buffer', 'require', 'module', 'exports',
]

const TYPES = [
  'string', 'number', 'boolean', 'object', 'symbol', 'bigint', 'any', 'unknown',
  'never', 'void', 'Record', 'Partial', 'Required', 'Readonly', 'Pick', 'Omit',
  'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'Parameters', 'Awaited',
]

export const typescript = makeKeywordPack({
  id: 'typescript',
  label: 'TypeScript',
  extensions: ['.ts', '.tsx', '.mts', '.cts'],
  aliases: ['ts', 'tsx'],
  keywords: KW,
  builtins: BUILTINS,
  types: TYPES,
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  highlightRegex: true,
  snippets: [
    { label: 'log', insert: 'console.log($1)' },
    { label: 'fn', insert: 'function $1($2) {\n  $3\n}' },
  ],
})

export const javascript = makeKeywordPack({
  id: 'javascript',
  label: 'JavaScript',
  extensions: ['.js', '.jsx', '.mjs', '.cjs'],
  aliases: ['js', 'jsx'],
  keywords: KW.filter(
    (k) =>
      ![
        'type',
        'interface',
        'implements',
        'readonly',
        'namespace',
        'declare',
        'abstract',
        'override',
        'satisfies',
        'keyof',
        'infer',
        'asserts',
        'using',
      ].includes(k),
  ),
  builtins: BUILTINS,
  types: ['string', 'number', 'boolean', 'object', 'symbol', 'bigint'],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  highlightRegex: true,
  snippets: [{ label: 'log', insert: 'console.log($1)' }],
})
