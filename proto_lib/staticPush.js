const { exec } = require('child_process');
const pkg = require('./package.json');

const sourceFile = 'dist/proto_lib.js';
const remoteHost = 'chablis';
const remotePath = '/usr/local/www/data/acnet/';
const remoteFile = `proto_lib-${pkg.version}.js`;

exec(`scp ${sourceFile} ${remoteHost}:${remotePath}${remoteFile}`, error => {
  if (error) console.error(error);
});
