import { ACNET, AcnetError, Reply, Status } from "@fnal/acnet";
import {
    ACL_PROTO,
    ACL_Replies,
    ACL_reply_ExecuteScript,
    ACL_request_ExecuteCode,
    ACL_struct_Header,
    ACL_struct_ReturnValue
} from "./acl_protocol";

type ACL_reply = {
    status: Status
    supSettings?: number
    startTime?: Date
    endTime?: Date
    returnValue?: Array<ACL_struct_ReturnValue>,
};

type Callback = (error: Error | null, reply: ACL_reply) => void;

export class ACL {
    con: ACNET;
    header: any;

    constructor(shConn: ACNET) {
        // Attach an ACNET connection to the object. If the caller
        // specified one, use it. Otherwise create a new one.
        this.con = shConn || new ACNET();

        // The ACLD request message has a header structure which holds
        // ACNET connection information. When the ACNET object notifies us
        // that we're connected, we update the header, which will remain
        // constant until we disconnect again.

        this.header = new ACL_struct_Header();
        this.header.requestorNode = 3338;

        this.con.notifyOnConnect(handle => {
            this.header.requestorName = handle;
        });
    }

    aclReply(cb: Callback) {
        return (reply: Reply<Uint8Array>) => {
            const { msg, ...copy } = reply;

            if (msg !== undefined) {
                const result: Reply<ACL_Replies> = copy;
                result.msg = ACL_PROTO.unmarshal_reply(msg[Symbol.iterator]());

                if (result.msg instanceof ACL_reply_ExecuteScript) {
                    const {
                        status,
                        numSuppressedSettings,
                        startTime,
                        endTime,
                        returnValue,
                    } = result.msg;
                    const reply: ACL_reply = {
                        status: new Status(status),
                        supSettings: numSuppressedSettings,
                        startTime: new Date(startTime * 1000),
                        endTime: new Date(endTime * 1000),
                        returnValue,
                    };

                    cb(null, reply);
                }
            } else throw new AcnetError(reply.status);

            return false;
        };
    }

    async run(
        source: string,
        cb: Callback,
        options: {
            defaultDataEvent: string
            staleErrors: boolean
            handleArrayDevices: boolean
            settings: boolean
            persistent: boolean
            wantImmediateReply: boolean
            substituteDevices: null
            substituteStrings: null
            returnSymbols: null
        } = {
            defaultDataEvent: "",
            staleErrors: true,
            handleArrayDevices: false,
            settings: true,
            persistent: false,
            wantImmediateReply: false,
            substituteDevices: null,
            substituteStrings: null,
            returnSymbols: null
        }
    ) {
        if (cb === undefined) {
            return new Promise((resolve, reject) => {
                this.run(
                    source,
                    (err, result) => {
                        err ? reject(err) : resolve(result);
                    },
                    options
                );
            });
        }

        if (this.con.isConnected) {
            const msg = new ACL_request_ExecuteCode();

            msg.header = this.header;
            msg.scriptInfo.ACLCode = source;

            // Transfer options to the script info structure.

            Object.assign(msg.scriptInfo, {
                defaultDataEvent: options.defaultDataEvent,
                noStaleErrors: !options.staleErrors,
                handleArrayDevices: options.handleArrayDevices,
                noSettings: !options.settings,
                isPersistent: options.persistent,
                wantImmediateReply: options.wantImmediateReply,
                substituteDevices: options.substituteDevices,
                substituteStrings: options.substituteStrings,
                returnSymbols: options.returnSymbols
            });

            const reply = await this.con.oneshot(`ACLD@CENTRA`, msg, 60000);
            this.aclReply(cb)(reply);
        } else {
            cb(new Error(`Not connected`), { status: Status.ACNET_DISCONNECT });
        }
    };
}
