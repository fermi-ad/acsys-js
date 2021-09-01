# ACL Library - Javascript

## Build
`npm run build`

## Rebuild protocol files
To rebuild protocol files you need to install `@fnal/protocol-compiler` using AD registry.

On Unix:

```bash
npm i -D @fnal/protocol-compiler --registry=http://adrfads.fnal.gov:4873/
```
Then rebuild the files:
```bash
npm run build:proto
```

You can do this manually:

- Download definition file from: `https://www-ad.fnal.gov/cgi-cvs/cvsweb.cgi/~checkout~/mecca/uls/ul_acld_protocol/AcldProtocol.proto?rev=HEAD;content-type=text%2Fplain`
- Store it as `ACL.proto`
- Compile it to javascript with `protocol-compiler`
  ```bash
  node_modules/@fnal/protocol-compiler/pc -v -l javascript --js-dts ACL.proto
  ```
- This should generate `acl_protocol.js` and a corresponding `acl_protocol.d.ts`
