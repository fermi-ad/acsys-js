import { assert } from 'chai';
import {} from 'mocha';
import {ACL} from '../dist/main.js';

describe('ACL Client - Test', () => {
    let acl;
    before(() => {
        acl = new ACL();
    });

    it('Instantiate acl client', () => {
        assert.isNotNull(acl);
    });

    it('Connect', (done) => {
        acl.con.notifyOnConnect((handle) => {
            assert.isDefined(handle);
            done();
        });
    })

    it('Basic read - M:OUTTMP', (done) => {
        acl.con.notifyOnConnect(async (handle) => {
            try {
                let reply = await acl.run("read M:OUTTMP");
                assert.isNotNull(reply);
                done();
            }
            catch (error) {
                console.error(error);
                assert.fail(error);
            }
        });
        
    }); 

    after(() => {
        // TODO finish acl sub-threads
       process.exit(0);
    });

});