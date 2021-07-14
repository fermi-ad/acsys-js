#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

const targetDir = 'dist';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

exec(
  `curl -Rso ACL.proto 'https://www-ad.fnal.gov/cgi-cvs/cvsweb.cgi/~checkout~/mecca/uls/ul_acld_protocol/AcldProtocol.proto?rev=HEAD;content-type=text%2Fplain' \
&& node_modules/@fnal/protocol-compiler/pc -v -l javascript --js-dts ACL.proto`,
  error => {
    if (error) console.error(error);
  }
);
