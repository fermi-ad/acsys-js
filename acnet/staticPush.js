import { version } from "./package.json";
import { exec } from "child_process";

// Push to static - shared folder
exec(`scp dist/acnet.js chablis:/usr/local/www/data/acnet/acnet-${version}.js`, (error) => {if (error) console.log(error)});
