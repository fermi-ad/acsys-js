# DPM for Javascript

## Build
`npm run build`

## Rebuild protocol files
To rebuild protocol files you need to install `@fnal/protocol-compiler` using AD registry.
```bash
npm i -D @fnal/protocol-compiler --registry=http://adrfads.fnal.gov:4873/
```
Then rebuild the files:
```bash
npm run build:proto
```

You can do this manually:

- Download definition file from: `https://www-ad.fnal.gov/cgi-cvs/cvsweb.cgi/~checkout~/mecca/uls/ul_dpm_protocol/DPM.proto?rev=HEAD;content-type=text%2Fplain`
- Store it as `DPM.proto`
- Compile it to javascript with `protocol-compiler`
  ```bash
  node_modules/@fnal/protocol-compiler/pc -v -l javascript --js-dts DPM.proto
  ```
- This should generate `dpm_protocol.js` and a corresponding `dpm_protocol.d.ts`

## TODO
- Figure out how to copy original dpm_protocol.d.ts instead of generated from dpm_protocol.js
- Fix entrypoints on package.json
