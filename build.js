#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

const targetDir = 'dist';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

exec(
    `curl -Rso DPM.proto 'http://www-ad.fnal.gov/cgi-cvs/cvsweb.cgi/~checkout~/mecca/uls/ul_dpm_protocol/DPM.proto?rev=HEAD;content-type=text%2Fplain' \
&& pc -v -t ${targetDir} -l javascript --js-dts DPM.proto`,
    error => {
	if (error)
	    console.error(error);
    }
);
