import { assert } from 'chai';
import {} from 'mocha';
import {DPM, DPMConnection} from '../dist/main.js';

describe('DPM Client - Test', () => {
    let dpm;
    const con = new DPMConnection({port: 6805});

    before(() => {
        dpm = new DPM(undefined, con);
    });

    it('Instantiate dpm client', () => {
        assert.isDefined(dpm);
    });

    it('Basic read - M:OUTTMP', (done) => {
        dpm.addRequest("M:OUTTMP", function (data, info) {
            assert.isNotNull(data);
            assert.isDefined(data);
            assert.isNotNull(info);
            assert.isDefined(info);
            dpm.stop();
            done();
        }, function (error) {
            assert.fail(error);
        });
        dpm.start();
    });

    // TODO if tested using async and await - Client doesn't work.

    after(() => {
        // TODO finish DPM sub-threads
        console.log('Finished!');
        //process.exit(0);
    });

});