import { exec } from 'child_process';
import { version } from './package.json';

const sourceFile = 'dist/proto_lib.js';
const remoteHost = 'chablis';
const remotePath = '/usr/local/www/data/acnet/';
const remoteFile = `proto_lib-${version}.js`;

exec(`scp ${sourceFile} ${remoteHost}:${remotePath}${remoteFile}`, error => {
  if (error) console.error(error);
});
