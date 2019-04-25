import { ACNET, AcnetError, Reply, Status } from "@fnal/acnet";
import {
    DPM_PROTO,
    DPM_request_ServiceDiscovery,
    DPM_request_OpenList,
    DPM_request_StartList,
    DPM_request_ClearList,
    DPM_request_StopList,
    DPM_reply_StartList,
    DPM_request_AddToList,
    DPM_reply_OpenList,
    DPM_reply_ListStatus,
    DPM_reply_Status,
    DPM_reply_DeviceInfo,
    DPM_reply_Scalar,
    DPM_reply_ScalarArray,
    DPM_reply_Raw,
    DPM_reply_Text,
    DPM_reply_TextArray,
    DPM_reply_AnalogAlarm,
    DPM_reply_DigitalAlarm,
    DPM_reply_BasicStatus,
    DPM_Replies
} from "./dpm_protocol";

interface AnaAlarm {
    minimum: number;
    maximum: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
}

interface DigAlarm {
    nominal: number;
    mask: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
}

interface BasStatus {
    on?: boolean;
    ready?: boolean;
    remote?: boolean;
    positive?: boolean;
    ramp?: boolean;
}

interface DataReply {
    ref_id: number;
    timestamp: number;
    data:
        | number
        | string
        | AnaAlarm
        | DigAlarm
        | BasStatus
        | Array<number>
        | Array<string>
        | ArrayBuffer;
}

interface DeviceInfo {
    di: number;
    name: string;
    description: string;
    units?: string;
    format_hint?: number;
}

interface DataStatus {
    ref_id: number;
    timestamp: number;
    status: Status;
}

interface Request {
    drf2: string;
    callback: (d: DataReply, i: DeviceInfo) => void;
    errCallback?: (v: DataStatus) => void;
    dInfo?: DeviceInfo;
}

interface DpmContext {
    task: string;
    listId: number;
}

export class DPM {
    private reqs: Array<Request>;
    private started: boolean;
    private con: ACNET;
    private model?: string;
    private context: Promise<DpmContext>;

    constructor(server?: string, shConn?: ACNET) {
        let resolveContext!: (val: DpmContext) => void;

        this.reqs = [];
        this.started = false;

        // TODO: The 'shConn' parameter is deprecated; we're going to redo the
        // ACNET module to start a shared worker.

        this.con = shConn ? shConn : new ACNET();
        this.context = new Promise(resolve => (resolveContext = resolve));

        // This creates a promise which never goes away (because the promise in
        // the .then() call never goes away.)

        Promise.resolve(resolveContext).then(resolve =>
            this.connectionManager(resolve, server)
        );
    }

    // Finds an available DPM for the session. Unlike the public methods, this
    // method is used before we set up the 'context' field. Any changes to this
    // method need to follow that constraint.

    private async discovery(): Promise<string> {
        const msg = new DPM_request_ServiceDiscovery();

        // We loop until we get a DPM reply.

        while (true) {
            try {
                const reply = await this.con.oneshot(`DPMD@MCAST`, msg, 3000);
                const loc: string = await this.con.getName(reply.sender);

                console.info(`DPM: Using DPM on ${loc}.`);
                return `DPMD@${loc}`;
            } catch (e) {
                // We received an error. Report the status and sleep for 5
                // seconds.

                console.warn(`DPM: discovery error -- ${e}.`);
                await new Promise(r => setTimeout(r, 5000));
            }
        }
    }

    // This method returns a function that returns a DPM. If the 'server'
    // parameter specifies a particular DPM, then the returned function simply
    // returns it. If no preference is given, the returned function performs a
    // service discovery.

    private findDPM(server?: string): () => Promise<string> {
        if (server !== undefined) {
            // If 'service' contains an '@', then it's a full, remote task
            // specification. Otherwise it's just a node name and we have to
            // prepend the task name.

            const dpm = Promise.resolve(
                server.includes("@") ? server : `DPMD@${server}`
            );

            return async () => dpm;
        } else
            return async () => {
                const node = await this.discovery();

                return Promise.resolve(node);
            };
    }

    // Converts a Reply from ACNET (in which the embedded message is an
    // ArrayBuffer) into a Reply containing a DPM reply message.

    private static u_reply(reply: Reply<ArrayBuffer>): Reply<DPM_Replies> {
        const { msg, ...copy } = reply;

        // DPM returns status in one of the reply messages. If there is no
        // message in the reply packet, then the status in the header indicates
        // the error.

        if (msg != undefined) {
            // Making a copy of the reply message serves several purposes.
            // First, it lets us coerce a Reply<ArrayBuffer> into a
            // Reply<DPM_Replies> in a way that makes Typescript happy. Since
            // Reply<> objects can have a missing 'msg' field and our copy
            // doesn't include the 'msg' field, we're allowed to change its
            // type. The second reason to copy is that the caller gave us a
            // Reply<ArrayBuffer> and it would be rude to change it to a
            // Reply<DPM_replies>.

            const result: Reply<DPM_Replies> = copy;
            const bin = new Uint8Array(msg, 0, msg.byteLength);

            result.msg = DPM_PROTO.unmarshal_reply(bin[Symbol.iterator]());
            return result;
        } else throw new AcnetError(reply.status);
    }

    // This is a background task that maintains the ACNET connection.

    private async connectionManager(
        resolve: (val: DpmContext) => void,
        server?: string
    ) {
        const reqOpenList = new DPM_request_OpenList();
        const disc = await this.findDPM(server);

        while (true) {
            const dpm = await disc();

            // Loop through all the replies.

            const replies = await this.con.stream(dpm, reqOpenList, 1000);

            try {
                for await (const ii of replies) {
                    const { msg } = DPM.u_reply(ii);

                    if (msg instanceof DPM_reply_OpenList) {
                        console.info(`DPM: using list id ${msg.list_id}`);

                        // FIXME: We should resolve the context *after* we set
                        // up the list with DPM. There could be pending promises
                        // to update the list of requests and we don't want them
                        // to occur before DPM is in sync with the current
                        // state. Unfortunately restoreState() and start()
                        // require the context to be resolved, so we lose
                        // control of restoring DPM's state.

                        resolve({ listId: msg.list_id, task: dpm });
                        await this.sendList();
                        if (this.started) await this.start(this.model);
                    } else if (msg instanceof DPM_reply_DeviceInfo) {
                        this.reqs[msg.ref_id].dInfo = msg;
                    } else if (msg instanceof DPM_reply_Status) {
                        const { ref_id, timestamp, status } = msg;
                        const { errCallback } = this.reqs[msg.ref_id];

                        if (errCallback !== undefined)
                            errCallback({
                                ref_id,
                                timestamp,
                                status: new Status(status)
                            });
                        else {
                            const s = new Status(msg.status);

                            console.info(
                                `DPM: error status ${s} for ${
                                    this.reqs[msg.ref_id].drf2
                                }`
                            );
                        }
                    } else if (
                        msg instanceof DPM_reply_Scalar ||
                        msg instanceof DPM_reply_ScalarArray ||
                        msg instanceof DPM_reply_Raw ||
                        msg instanceof DPM_reply_Text ||
                        msg instanceof DPM_reply_TextArray
                    ) {
                        const { ref_id, timestamp, data } = msg;
                        const { callback, dInfo } = this.reqs[ref_id];

                        // Forcing Typescript to accept 'dInfo' being defined.
                        // The DPM should have sent us the device info before
                        // this message, so the summption is valid. If DPM ever
                        // breaks this, then lots of Web apps are going to
                        // complain.

                        callback(
                            { ref_id, timestamp, data },
                            dInfo as DeviceInfo
                        );
                    } else if (
                        msg instanceof DPM_reply_AnalogAlarm ||
                        msg instanceof DPM_reply_DigitalAlarm ||
                        msg instanceof DPM_reply_BasicStatus
                    ) {
                        const { ref_id, timestamp, cycle, ...rest } = msg;
                        const { callback, dInfo } = this.reqs[ref_id];

                        // Forcing Typescript to accept 'dInfo' being defined.
                        // The DPM should have sent us the device info before
                        // this message, so the summption is valid. If DPM ever
                        // breaks this, then lots of Web apps are going to
                        // complain.

                        callback(
                            { ref_id, timestamp, data: rest },
                            dInfo as DeviceInfo
                        );
                    }
                }
            } catch (e) {
                console.error(`DPM: Caught exception -- ${e}`);
            }

            // Reset our connection parameters so clients block until we
            // re-connect.

            this.context = new Promise(r => (resolve = r));
        }
    }

    private async sendRequest(
        req: Request,
        ref_id: number
    ): Promise<Reply<ArrayBuffer>> {
        const msg = new DPM_request_AddToList();

        msg.ref_id = ref_id;
        msg.drf_request = req.drf2;

        const { listId, task } = await this.context;

        msg.list_id = listId;
        return this.con.oneshot(task, msg, 1000);
    }

    async addRequest(
        req: string,
        cb: (o: DataReply, i: DeviceInfo) => boolean,
        ecb?: (e: any) => void
    ): Promise<void> {
        const entry: Request = { drf2: req, callback: cb, errCallback: ecb };

        // FIXME: This is a race condition. We are registering the request using an index that doesn't exist yet in the array.

        const reply = await this.sendRequest(entry, this.reqs.length);
        const result = DPM.u_reply(reply);

        if (result.msg instanceof DPM_reply_ListStatus) {
            const status = new Status(result.msg.status);

            if (status.isGood) this.reqs.push(entry);
            else throw new AcnetError(status);
        } else throw new AcnetError(Status.ACNET_RPLYPACK);
    }

    private async sendList(): Promise<void> {
        for (let ii = 0; ii < this.reqs.length; ++ii)
            await this.sendRequest(this.reqs[ii], ii);
    }

    async start(model?: string): Promise<void> {
        const msg = new DPM_request_StartList();

        msg.model = model;

        const { listId, task } = await this.context;

        // We update the state of the DPM object *after* we get the context values because, when reconnecting, the 'started' and 'model' fields would be used to restore the state.

        this.model = model;
        this.started = true;
        msg.list_id = listId;

        const bin = await this.con.oneshot(task, msg, 1000);
        const result = DPM.u_reply(bin);

        if (result.msg instanceof DPM_reply_StartList) {
            if (result.status.isBad) throw new AcnetError(result.status);
        } else throw new AcnetError(Status.ACNET_RPLYPACK);
    }

    async clear(): Promise<void> {
        const msg = new DPM_request_ClearList();
        const { listId, task } = await this.context;

        msg.list_id = listId;

        const reply = await this.con.oneshot(task, msg, 1000);

        if (reply.status.isGood) {
            const msg = DPM.u_reply(reply);

            if (msg.msg instanceof DPM_reply_ListStatus) {
                const status: Status = new Status(msg.msg.status);

                if (status.isGood) {
                    this.reqs = [];
                    return;
                } else throw new AcnetError(status);
            } else throw new AcnetError(Status.ACNET_RPLYPACK);
        } else throw new AcnetError(reply.status);
    }

    async stop(): Promise<void> {
        if (this.started) {
            const msg = new DPM_request_StopList();
            const { listId, task } = await this.context;

            msg.list_id = listId;

            const reply = await this.con.oneshot(task, msg, 1000);

            if (reply.status.isGood) this.started = false;
        }
    }
}
