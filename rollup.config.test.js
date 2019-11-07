import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'test/**/*.js',
  output: {
    file: 'test/test-bundle.js',
    format: 'es',
  },
  treeshake: false,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    multiEntry(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',

      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false

      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',

      // ignores indent and generates the smallest code
      compact: true, // Default: false

      // generate a named export for every property of the JSON object
      namedExports: true, // Default: true
    }),
    globals(),
    builtins(),
  ],
};
