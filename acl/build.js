#!/usr/bin/env node
import { exec } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

// Create dist dir
const targetDir = 'dist';
if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
}

// download protocol definition and compile to javascript
exec(
    `curl -Rso ACL.proto 'https://www-ad.fnal.gov/cgi-cvs/cvsweb.cgi/~checkout~/mecca/uls/ul_acld_protocol/AcldProtocol.proto?rev=HEAD;content-type=text%2Fplain' \
&& node_modules/@fnal/protocol-compiler/pc -v -l javascript --js-dts ACL.proto`,
    error => {
        if (error) console.error(error);
    }
);
