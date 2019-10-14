import { ACNET, AcnetError, Reply, Status } from "@fnal/acnet";
import {
    DPM_PROTO,
    DPM_request_ServiceDiscovery,
    DPM_reply_ServiceDiscovery,
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
    DPM_Replies,
    DPM_reply_AddToList,
    DPM_reply_TimedScalarArray,
    DPM_request_ApplySettings,
    DPM_struct_RawSetting,
    DPM_struct_TextSetting,
    DPM_struct_ScaledSetting,
    DPM_reply_ApplySettings
} from "./dpm_protocol";

export interface AnaAlarm {
    minimum: number;
    maximum: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
}

export interface DigAlarm {
    nominal: number;
    mask: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
}

export interface BasStatus {
    on?: boolean;
    ready?: boolean;
    remote?: boolean;
    positive?: boolean;
    ramp?: boolean;
}

export interface DataReply {
    ref_id: number;
    timestamp: number;
    cycle: number;
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

export interface DeviceInfo {
    di: number;
    name: string;
    description: string;
    units?: string;
    format_hint?: number;
}

export interface DataStatus {
    ref_id: number;
    timestamp: number;
    cycle: number;
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
    private stagedReqs: {
        reqs: { [req_id: number]: Request };
        nextRef: number;
    };
    private activeReqs: { [req_id: number]: Request };
    private started: boolean;
    private con: ACNET;
    private model?: string;
    private context: Promise<DpmContext>;

    private shouldExit: boolean;
    private replies?: AsyncIterableIterator<Reply<Uint8Array>>;

    constructor(server?: string, shConn?: ACNET) {
        let resolveContext!: (val: DpmContext) => void;

        this.stagedReqs = { reqs: {}, nextRef: 1000000 };
        this.activeReqs = {};
        this.started = false;
        this.shouldExit = false;

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

    async findDPMs(dpmType?: string): Promise<DPM_reply_ServiceDiscovery[]> {
        const result: DPM_reply_ServiceDiscovery[] = [];
        const sdMessage = new DPM_request_ServiceDiscovery();
        const replies = await this.con.stream(`${dpmType || 'DPMJ'}@MCAST`, sdMessage, 200);

        try {
            for await (const reply of replies) {
                const { msg } = DPM.u_reply(reply);
                if (msg instanceof DPM_reply_ServiceDiscovery)
                    result.push(msg);
            }
        } catch (e) {
            console.error('findDPMs Error: ', e)
        }

        return result;
    }

    // Converts a Reply from ACNET (in which the embedded message is an
    // Uint8Array) into a Reply containing a DPM reply message.

    private static u_reply(reply: Reply<Uint8Array>): Reply<DPM_Replies> {
        const { msg, ...copy } = reply;

        // DPM returns status in one of the reply messages. If there is no
        // message in the reply packet, then the status in the header indicates
        // the error.

        if (msg != undefined) {
            // Making a copy of the reply message serves several purposes.
            // First, it lets us coerce a Reply<Uint8Array> into a
            // Reply<DPM_Replies> in a way that makes Typescript happy. Since
            // Reply<> objects can have a missing 'msg' field and our copy
            // doesn't include the 'msg' field, we're allowed to change its
            // type. The second reason to copy is that the caller gave us a
            // Reply<Uint8Array> and it would be rude to change it to a
            // Reply<DPM_replies>.

            const result: Reply<DPM_Replies> = copy;

            result.msg = DPM_PROTO.unmarshal_reply(msg[Symbol.iterator]());
            return result;
        } else throw new AcnetError(reply.status);
    }

    async cancel() {
        if (this.replies !== undefined) {
            const reps = this.replies;

            delete this.replies;
            this.shouldExit = true;
            reps.return!();
        }
    }

    // This is a background task that maintains the ACNET connection.

    private async connectionManager(
        resolve: (val: DpmContext) => void,
        server?: string
    ) {
        const reqOpenList = new DPM_request_OpenList();
        const disc = await this.findDPM(server);

        while (!this.shouldExit) {
            const dpm = await disc();

            // Loop through all the replies.

            this.replies = await this.con.stream(dpm, reqOpenList, 6000);

            try {
                for await (const ii of this.replies) {
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
                        await this.restoreState();
                    } else if (msg instanceof DPM_reply_DeviceInfo) {
                        if (this.activeReqs[msg.ref_id])
                            this.activeReqs[msg.ref_id].dInfo = msg;
                    } else if (msg instanceof DPM_reply_Status) {
                        const { ref_id, timestamp, cycle, status } = msg;
                        const { errCallback } = this.activeReqs[msg.ref_id];

                        if (errCallback !== undefined)
                            errCallback({
                                ref_id,
                                timestamp,
                                cycle,
                                status: new Status(status)
                            });
                        else {
                            const s = new Status(msg.status);

                            console.info(
                                `DPM: error status ${s} for ${
                                    this.activeReqs[msg.ref_id].drf2
                                }`
                            );
                        }
                    } else if (
                        msg instanceof DPM_reply_Scalar ||
                        msg instanceof DPM_reply_ScalarArray ||
                        msg instanceof DPM_reply_Raw ||
                        msg instanceof DPM_reply_Text ||
                        msg instanceof DPM_reply_TextArray ||
                        msg instanceof DPM_reply_TimedScalarArray
                    ) {
                        const { ref_id, timestamp, cycle, data } = msg;
                        const { callback, dInfo } = this.activeReqs[ref_id];

                        // Forcing Typescript to accept 'dInfo' being defined.
                        // The DPM should have sent us the device info before
                        // this message, so the summption is valid. If DPM ever
                        // breaks this, then lots of Web apps are going to
                        // complain.

                        callback(
                            { ref_id, timestamp, cycle, data },
                            dInfo as DeviceInfo
                        );
                    } else if (
                        msg instanceof DPM_reply_AnalogAlarm ||
                        msg instanceof DPM_reply_DigitalAlarm ||
                        msg instanceof DPM_reply_BasicStatus
                    ) {
                        const { ref_id, timestamp, cycle, ...rest } = msg;
                        const { callback, dInfo } = this.activeReqs[ref_id];

                        // Forcing Typescript to accept 'dInfo' being defined.
                        // The DPM should have sent us the device info before
                        // this message, so the assumption is valid. If DPM ever
                        // breaks this contract, lots of Web apps are going to
                        // complain.

                        callback(
                            { ref_id, timestamp, cycle, data: rest },
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
    ): Promise<Reply<Uint8Array>> {
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
        const ref_id = this.stagedReqs.nextRef;

        this.stagedReqs.nextRef = this.stagedReqs.nextRef + 1;

        const reply = await this.sendRequest(entry, ref_id);
        const result = DPM.u_reply(reply);

        if (result.msg instanceof DPM_reply_AddToList) {
            const status = new Status(result.msg.status);

            if (status.isGood) this.stagedReqs.reqs[ref_id] = entry;
            else throw new AcnetError(status);
        } else throw new AcnetError(Status.ACNET_RPLYPACK);
    }

    // Restores the state of the DPM connection.

    private async restoreState(): Promise<void> {
        // If the list was started, we re-register all the DRF2 requests in the
        // active list and then start the list.

        if (this.started) {
            for (const ii in this.activeReqs)
                await this.sendRequest(this.activeReqs[ii], +ii);
            await this.start(this.model);
        }

        // Now we clear out the list on DPM in preparation of the staged
        // requests. Since a side-effect of `clear()` is to wipe-out the local
        // copy of the requests, we keep a copy and then restore it.

        {
            const oldState = this.stagedReqs;

            await this.clear();
            this.stagedReqs = oldState;
        }

        // Now register the staged requests to DPM.

        for (const ii in this.stagedReqs.reqs)
            await this.sendRequest(this.stagedReqs.reqs[ii], +ii);
    }

    async start(model?: string): Promise<void> {
        const { listId, task } = await this.context;
        const msg = new DPM_request_StartList();

        msg.model = model;
        msg.list_id = listId;

        const bin = await this.con.oneshot(task, msg, 1000);
        const result = DPM.u_reply(bin);

        if (result.msg instanceof DPM_reply_StartList) {
            if (result.status.isGood) {
                this.model = model;
                this.started = true;
                this.activeReqs = { ...this.stagedReqs.reqs };
            } else throw new AcnetError(result.status);
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

                if (status.isGood)
                    this.stagedReqs = { reqs: {}, nextRef: 1000000 };
                else throw new AcnetError(status);
            } else throw new AcnetError(Status.ACNET_RPLYPACK);
        } else throw new AcnetError(reply.status);
    }

    async stop(): Promise<void> {
        if (this.started) {
            const msg = new DPM_request_StopList();
            const { listId, task } = await this.context;

            msg.list_id = listId;

            const reply = await this.con.oneshot(task, msg, 1000);

            if (reply.status.isGood) {
                this.activeReqs = {};
                this.started = false;
            }
        }
    }
}
