# ACNETD

The ACNET service takes a message and bundles it into the ACNET protocol.

## Development Dependencies

To make changes to this project you will need to have [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)(comes with Node) installed.

## Build

There are a series of scripts defined in the `package.json` file that perform different pieces of the build process.

- `npm run build` will build both the browser and node versions.
- `npm run staticPush` will run a build and then run the `staticPush.js` script to create a versioned file on Chablis.
- `npm run clean` will remove the ./dist directory.

## Constructor

The constructor, ACNET, is exported in a JavaScript object and accepts no options.

### Browser
TODO figure out importing details
[https://developers.google.com/web/fundamentals/primers/modules](https://developers.google.com/web/fundamentals/primers/modules)

This is distributed in the `dist/acnet.js` file.

```html
<script type="module">
  import { ACNET } from "./dist/acnet.js";
  const con = new ACNET();
</script>
```

### Node

[https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html)

ESModules currently requires the --experimental-modules flag when running Node v11.8.0 or older.

This is distributed in the `dist/acnet.mjs` file.

```JavaScript
import { ACNET } from "./dist/acnet.mjs";

const con = new ACNET();
```

## Recent Changes

* v2.2.1 -- Internal change to reduce copying data from incoming messages.

## TODO
- Fix entrypoints on package.json