import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default {
  input: 'proto_lib.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      file: pkg.browser,
      format: 'esm',
      sourceMap: true,
    },
  ],
  plugins: [
    typescript({}),
    babel({
      exclude: ["node_modules/**"],
      externalHelpers: false,
      runtimeHelpers: true
    })
  ],
};
