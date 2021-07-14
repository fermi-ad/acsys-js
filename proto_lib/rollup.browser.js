import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

export default {
  input: 'proto_lib.js',
  output: [
    {
      file: pkg.browser,
      format: 'esm',
      sourceMap: true,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    babel({
      exclude: ['node_modules/**'],
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
};
