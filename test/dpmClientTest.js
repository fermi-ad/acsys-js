import { assert } from 'chai';
import {} from 'mocha';
import {DPM} from '../dist/main.js';

describe('DPM Client - Test', () => {
    let dpm;
    before(() => {
        dpm = new DPM();
    });

    it('Instantiate dpm client', () => {
        assert.isDefined(dpm);
    });

    it('Basic read - M:OUTTMP', (done) => {
        dpm.addRequest("M:OUTTMP", function(data, info){
            assert.isNotNull(data);
            assert.isDefined(data);
            assert.isNotNull(info);
            assert.isDefined(info);
            dpm.stop();
            done();
        }, function(error){
            assert.fail(error);
        });
        dpm.start();
    });

    // TODO if tested using async and await - Client doesn't work.

    after(() => {
        // TODO finish DPM sub-threads
        process.exit(0);
    });

});