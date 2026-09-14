import { makeKeywordPack } from './factory'
import type { LanguagePack } from './types'
import { highlightMarkupLine, snippetsFromKeywords } from './shared'

export const python = makeKeywordPack({
  id: 'python',
  label: 'Python',
  extensions: ['.py', '.pyi', '.pyw'],
  aliases: ['py'],
  keywords: [
    'and', 'as', 'assert', 'async', 'await', 'break',
    'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for',
    'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  ],
  builtins: [
    'False', 'None', 'True', 'print', 'len', 'range', 'str', 'int', 'float',
    'list', 'dict', 'set', 'tuple', 'bool', 'type', 'isinstance', 'enumerate',
    'zip', 'map', 'filter', 'open', 'super', 'self', 'cls', 'Exception',
  ],
  types: [
    'str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'bytes',
    'Any', 'Optional', 'List', 'Dict', 'Tuple', 'Set', 'Callable', 'Union',
  ],
  lineComment: '#',
  stringQuotes: ['"', "'"],
  highlightDecorators: true,
  snippets: [
    { label: 'def', insert: 'def $1($2):\n    $3' },
    { label: 'print', insert: 'print($1)' },
  ],
})

export const go = makeKeywordPack({
  id: 'go',
  label: 'Go',
  extensions: ['.go'],
  keywords: [
    'break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else',
    'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface',
    'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type',
    'var',
  ],
  builtins: [
    'true', 'false', 'nil', 'append', 'cap', 'close', 'complex', 'copy',
    'delete', 'imag', 'len', 'make', 'new', 'panic', 'print', 'println',
    'real', 'recover', 'iota',
  ],
  types: [
    'string', 'bool', 'byte', 'rune', 'error', 'int', 'int8', 'int16', 'int32',
    'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr', 'float32',
    'float64', 'complex64', 'complex128',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  snippets: [{ label: 'fmt', insert: 'fmt.Println($1)' }],
})

export const rust = makeKeywordPack({
  id: 'rust',
  label: 'Rust',
  extensions: ['.rs'],
  aliases: ['rs'],
  keywords: [
    'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn', 'else',
    'enum', 'extern', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop',
    'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return',
    'static', 'struct', 'super', 'trait', 'type', 'unsafe', 'use',
    'where', 'while',
  ],
  builtins: [
    'true', 'false', 'self', 'Self', 'Some', 'None', 'Ok', 'Err', 'vec',
    'println', 'format', 'panic', 'unreachable', 'todo', 'unimplemented',
  ],
  types: [
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize', 'u8', 'u16', 'u32', 'u64',
    'u128', 'usize', 'f32', 'f64', 'bool', 'char', 'str', 'String', 'Vec',
    'Option', 'Result', 'Box', 'Rc', 'Arc', 'RefCell', 'HashMap', 'HashSet',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  highlightDecorators: true,
  snippets: [{ label: 'fn', insert: 'fn $1($2) {\n    $3\n}' }],
})

export const java = makeKeywordPack({
  id: 'java',
  label: 'Java',
  extensions: ['.java'],
  keywords: [
    'abstract', 'assert', 'break', 'case', 'catch',
    'class', 'const', 'continue', 'default', 'do', 'else', 'enum',
    'extends', 'final', 'finally', 'for', 'goto', 'if', 'implements',
    'import', 'instanceof', 'interface', 'native', 'new',
    'package', 'private', 'protected', 'public', 'return',
    'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'try', 'volatile', 'while',
  ],
  builtins: ['true', 'false', 'null', 'this', 'super'],
  types: [
    'boolean', 'byte', 'char', 'double', 'float', 'int', 'long', 'short', 'void',
    'String', 'Object', 'Integer', 'Boolean', 'Double', 'Long', 'List', 'Map',
    'Set', 'Optional',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  highlightDecorators: true,
})

export const c = makeKeywordPack({
  id: 'c',
  label: 'C',
  extensions: ['.c', '.h'],
  keywords: [
    'auto', 'break', 'case', 'const', 'continue', 'default', 'do',
    'else', 'enum', 'extern', 'for', 'goto', 'if', 'inline',
    'register', 'restrict', 'return',
    'sizeof', 'static', 'struct', 'switch', 'typedef', 'union',
    'volatile', 'while',
  ],
  builtins: ['NULL', 'true', 'false'],
  types: [
    'char', 'double', 'float', 'int', 'long', 'short', 'signed', 'unsigned',
    'void', 'size_t', 'ptrdiff_t', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
    'int8_t', 'int16_t', 'int32_t', 'int64_t',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
})

export const cpp = makeKeywordPack({
  id: 'cpp',
  label: 'C++',
  extensions: ['.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx'],
  aliases: ['c++', 'cplusplus'],
  keywords: [
    'alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor',
    'break', 'case', 'catch', 'class', 'compl', 'concept',
    'const', 'consteval', 'constexpr', 'constinit', 'const_cast', 'continue',
    'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete', 'do',
    'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern',
    'for', 'friend', 'goto', 'if', 'inline',
    'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq',
    'operator', 'or', 'or_eq', 'private', 'protected', 'public', 'register',
    'reinterpret_cast', 'requires', 'return',
    'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template',
    'this', 'thread_local', 'throw', 'try', 'typedef', 'typeid',
    'typename', 'union', 'using', 'virtual', 'volatile',
    'while', 'xor', 'xor_eq',
  ],
  builtins: ['true', 'false', 'nullptr', 'NULL', 'this'],
  types: [
    'bool', 'char', 'char8_t', 'char16_t', 'char32_t', 'wchar_t', 'double',
    'float', 'int', 'long', 'short', 'signed', 'unsigned', 'void', 'size_t',
    'string', 'vector', 'map', 'set', 'optional', 'unique_ptr', 'shared_ptr',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
})

export const kotlin = makeKeywordPack({
  id: 'kotlin',
  label: 'Kotlin',
  extensions: ['.kt', '.kts'],
  aliases: ['kt'],
  keywords: [
    'as', 'break', 'class', 'continue', 'do', 'else', 'for', 'fun',
    'if', 'in', 'interface', 'is', 'object', 'package', 'return', 'super',
    'this', 'throw', 'try', 'typealias', 'typeof', 'val', 'var', 'when',
    'while', 'by', 'catch', 'constructor', 'delegate', 'dynamic', 'field', 'file',
    'finally', 'get', 'import', 'init', 'param', 'property', 'receiver', 'set',
    'setparam', 'where', 'actual', 'abstract', 'annotation', 'companion',
    'const', 'crossinline', 'data', 'enum', 'expect', 'external', 'final',
    'infix', 'inline', 'inner', 'internal', 'lateinit', 'noinline', 'open',
    'operator', 'out', 'override', 'private', 'protected', 'public', 'reified',
    'sealed', 'suspend', 'tailrec', 'vararg',
  ],
  builtins: ['true', 'false', 'null', 'this', 'super'],
  types: [
    'Boolean', 'Byte', 'Char', 'Double', 'Float', 'Int', 'Long', 'Short',
    'String', 'Unit', 'Any', 'Nothing', 'List', 'Map', 'Set', 'Array',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  highlightDecorators: true,
})

const svelteScript = makeKeywordPack({
  id: 'svelte',
  label: 'Svelte',
  extensions: [],
  keywords: [
    'const', 'let', 'export', 'import', 'from', 'function', 'return',
    'class', 'if', 'else', 'for', 'while', 'async', 'await', 'of', 'in',
  ],
  builtins: ['true', 'false', 'null', 'undefined', 'this'],
  lineComment: '//',
  highlightRegex: true,
})

/** Svelte: markup-first with script-ish fallback for non-tag lines. */
export const svelte: LanguagePack = {
  id: 'svelte',
  label: 'Svelte',
  extensions: ['.svelte'],
  aliases: [],
  keywords: [
    'script', 'style', 'each', 'if', 'else', 'then', 'await', 'key', 'html',
    'const', 'let', 'export', 'import', 'from', 'function', 'return',
    'class', 'bind',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  snippets: [
    ...snippetsFromKeywords(['each', 'if', 'await']),
    { label: 'each', insert: '{#each $1 as $2}\n  $3\n{/each}' },
  ],
  tokenize: (line) => {
    if (line.includes('<') || line.trimStart().startsWith('{')) {
      return highlightMarkupLine(line)
    }
    return svelteScript.tokenize(line)
  },
}

const vueScript = makeKeywordPack({
  id: 'vue',
  label: 'Vue',
  extensions: [],
  keywords: [
    'const', 'let', 'export', 'import', 'from', 'function', 'return',
    'default', 'if', 'else', 'for', 'while', 'async', 'await',
  ],
  builtins: [
    'true', 'false', 'null', 'undefined', 'ref', 'computed', 'watch',
    'onMounted', 'defineProps', 'defineEmits',
  ],
  lineComment: '//',
  highlightRegex: true,
})

export const vue: LanguagePack = {
  id: 'vue',
  label: 'Vue',
  extensions: ['.vue'],
  aliases: [],
  keywords: [
    'script', 'template', 'style', 'setup', 'defineProps', 'defineEmits',
    'ref', 'computed', 'watch', 'onMounted', 'import', 'export', 'default',
    'const', 'let', 'function', 'return',
  ],
  lineComment: '//',
  blockComment: { open: '/*', close: '*/' },
  snippets: snippetsFromKeywords(['defineProps', 'ref', 'computed']),
  tokenize: (line) => {
    if (line.includes('<') || line.trimStart().startsWith('{')) {
      return highlightMarkupLine(line)
    }
    return vueScript.tokenize(line)
  },
}
