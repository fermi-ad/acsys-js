import {DPM, DPMConnection} from './dist/main.js';

const con = new DPMConnection({port: 6805});
const dpm = new DPM(undefined, con);

dpm.addRequest(`M:OUTTMP`,
    (dataReply, deviceInfo) => {
        console.log(dataReply, deviceInfo);
    },
    err => {
        console.error(err);
    }
);

dpm.start();
