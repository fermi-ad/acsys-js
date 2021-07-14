import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default {
  input: "acnet.ts",
  output: [
    {
      file: pkg.browser,
      format: "esm",
      sourceMap: true
    }
  ],
  external: ["websocket"],
  plugins: [
    resolve({
      browser: true
    }),
    typescript({}),
    babel({
      exclude: ["node_modules/**"],
      externalHelpers: false,
      runtimeHelpers: true
    })
  ]
};
