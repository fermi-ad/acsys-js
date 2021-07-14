const pkg = require("./package.json");
const {exec} = require("child_process");

exec(`scp dist/acnet.js chablis:/usr/local/www/data/acnet/acnet-${pkg.version}.js`, (error) => {if (error) console.log(error)});
