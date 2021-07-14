import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "acnet.ts",
  output: [
    {
      file: pkg.module,
      format: "esm",
      intro: "import websocket from 'websocket';\nconst { w3cwebsocket: WebSocket } = websocket;",
    },
    {
      file: pkg.browser,
      format: "esm",
    },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [
    typescript({}),
    babel({
      exclude: ["node_modules/**"],
      externalHelpers: false,
      runtimeHelpers: true
    })
  ]
};
