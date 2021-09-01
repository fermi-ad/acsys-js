import { ACNET, AcnetError, Reply, Status } from "@fnal/acnet";
import {
    ACLDPROTOCOL_PROTO,
    ACLDPROTOCOL_Replies,
    ACLDPROTOCOL_reply_ExecuteScript,
    ACLDPROTOCOL_request_ExecuteCode,
    ACLDPROTOCOL_struct_Header,
    ACLDPROTOCOL_struct_ReturnValue
} from "./acl_protocol.js";

type ACL_reply = {
    status: Status
    supSettings?: number
    startTime?: Date
    endTime?: Date
    returnValue?: Array<ACLDPROTOCOL_struct_ReturnValue>,
};

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

        this.header = new ACLDPROTOCOL_struct_Header();
        this.header.requestorNode = 3338;

        this.con.notifyOnConnect(handle => {
            this.header.requestorName = handle;
        });
    }

    // Converts a byte array into an ACL_reply structure.

    aclReply(reply: Reply<Uint8Array>): ACL_reply {
        const { msg, ...copy } = reply;

        if (msg !== undefined) {
            const result: Reply<ACLDPROTOCOL_Replies> = copy;

            result.msg = ACLDPROTOCOL_PROTO.unmarshal_reply(msg[Symbol.iterator]());

            if (result.msg instanceof ACLDPROTOCOL_reply_ExecuteScript) {
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

                return reply;
            } else
                throw new AcnetError(Status.ACNET_RPLYPACK);
        } else
            throw new AcnetError(reply.status);
    }

    // Submits an ACL script to be run on the ACL server.

    async run(
        source: string,
        options: {
            defaultDataEvent: string
            staleErrors: boolean
            handleArrayDevices: boolean
            settings: boolean
            persistent: boolean
            wantImmediateReply: boolean
            substituteDevices: undefined
            substituteStrings: undefined
            returnSymbols: Array<any>
        } = {
            defaultDataEvent: "",
            staleErrors: true,
            handleArrayDevices: false,
            settings: true,
            persistent: false,
            wantImmediateReply: false,
            substituteDevices: undefined,
            substituteStrings: undefined,
            returnSymbols: ['$_output_strings[]']
        }
    ): Promise<ACL_reply> {
        if (this.con.isConnected) {
            const msg = new ACLDPROTOCOL_request_ExecuteCode();

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

            return this.aclReply(reply);
        } else {
            throw new AcnetError(Status.ACNET_DISCONNECT);
        }
    };
}
