import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "dpm.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourceMap: true
    }
  ],
  plugins: [
    typescript({}),
    babel({
      exclude: ["node_modules/**"],
      externalHelpers: false,
      runtimeHelpers: true
    })
  ],
  external: [ '@fnal/acnet', '@fnal/proto_lib' ]
};
