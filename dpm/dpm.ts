import IsoWebSocket from 'isomorphic-ws';
import {WebSocket, CloseEvent, MessageEvent} from 'ws';

import { ACNET, AcnetError, Marshalable, Reply, Status } from "@fnal/acnet";
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
} from "./dpm_protocol.js";

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
    timestamp?: number;
    cycle?: number;
    status: Status;
}

interface Request {
    drf: string;
    callback: (d: DataReply, i: DeviceInfo) => void;
    errCallback?: (v: DataStatus) => void;
    dInfo?: DeviceInfo;
}

interface DpmContext {
    task: string;
    listId: number;
}

type RawHandle = number;
type Handle = string;

interface ArrayBufferCallback {
    (buf: ArrayBuffer): void;
}

interface VoidCallback {
    (): void;
}

interface SocketCallback {
    (socket: WebSocket): void;
}

interface RawSocketCallback {
    (handle: WebSocket): void;
}

interface ResolveReply {
    (rpy: Reply<Uint8Array>, done: boolean): void;
}

interface RejectReply {
    (s: Status): void;
}

interface SocketOptions {
    test: boolean;
    host: string;
    port: number;
    path: string;
    protocol: string;
}

export class DPMConnection {
    private onConnect: Array<VoidCallback>;
    private onDisconnect: Array<VoidCallback>;

    private socketOpen: Promise<WebSocket>;
    private resolveSocket?: RawSocketCallback;
    private requests: {
        [idx: number]: {
            resolve: ResolveReply;
            reject: RejectReply;
        };
    };
    private socket?: WebSocket;
    private options?: SocketOptions;

    private static getHost(options?: SocketOptions): string {
        return `ws://${
            options?.host ?? `acsys-proxy.fnal.gov`
        }:${
            options?.port ?? options?.test ? `6805` : `6802`
        }/${
            options?.path ?? `dpm`
        }`;
    }

    on!: WebSocket[`on`];

    constructor(options?: SocketOptions) {
        this.onConnect = [];
        this.onDisconnect = [];
        this.socketOpen = new Promise(
            (resolve: SocketCallback) => (this.resolveSocket = resolve)
        );
        this.requests = {};
        this.options = options;

        this.prepSocket();
    }

    notifyOnDisconnect(f: VoidCallback): void {
        this.onDisconnect.push(f);
    }

    notifyOnConnect(f: VoidCallback): void {
        this.onConnect.push(f);
        if (this.isConnected && this.resolveSocket !== undefined)
            this.socketOpen.then(h => f());
    }

    private prepSocket(): void {
        this.socket = new IsoWebSocket(
            DPMConnection.getHost(this.options),
            this.options?.protocol ?? `pc`
        );
        this.socket!.binaryType = `arraybuffer`;
        this.on = this.socket!.on.bind(this.socket);

        this.socket!.onclose = (event: CloseEvent) => {
            delete this.socket;

            this.socketOpen = new Promise(
                (resolve: SocketCallback) => (this.resolveSocket = resolve)
            );
            for (const ii of this.onDisconnect) ii();

            // Clear existing requests
            this.requests = {};

            // Wait five seconds and then try to make a new connection.

            console.warn("DPM: connection broken.");
            setTimeout(() => {
                console.info("DPM Client: retrying connection.");
                this.prepSocket();
            }, 5000);
        };

        this.socket!.onopen = () => {
            this.resolveSocket!(this.socket!);
            delete this.resolveSocket;

            for (const ii of this.onConnect) ii();
        };

        this.socket!.onmessage = (event: MessageEvent) => {
            // const buf = event.data as ArrayBuffer;
            // const dv = new DataView(buf);

            // const svr = dv.getUint16(6, false);
            // const msg: Reply<Uint8Array> = {
            //     sender: svr,
            //     status: s
            // };

            // {
            //     const msgLen = dv.getUint16(18, true) - 18;

            //     if (msgLen > 0)
            //         msg.msg = new Uint8Array(buf, 20, msgLen);
            // }

            // const f = this.requests[rqid].resolve;

            // if (last) delete this.requests[rqid];

            // f(msg, last);
        };
    }

    async send(message: Marshalable) {
        const socket = await this.socketOpen;
        socket.send(Uint8Array.from(message.marshal()));
    }

    get isConnected(): boolean {
        return this.socket !== undefined && this.resolveSocket === undefined;
    }
}

export class DPM {
    private initRef: number;
    private stagedReqs: {
        reqs: { [req_id: number]: Request };
        nextRef: number;
    };
    private activeReqs: { [req_id: number]: Request };
    private started: boolean;
    private con: DPMConnection;
    private dataSource?: string;

    private shouldExit: boolean;
    private replies?: AsyncIterableIterator<Reply<Uint8Array>>;

    // TODO: server is no longer needed.
    constructor(server?: string, shConn?: DPMConnection) {
        this.initRef = 1000000;
        this.stagedReqs = { reqs: {}, nextRef: this.initRef };
        this.activeReqs = {};
        this.started = false;
        this.shouldExit = false;

        // TODO: The 'shConn' parameter is deprecated; we're going to redo the
        // DPMConnection module to start a shared worker.

        this.con = shConn ? shConn : new DPMConnection();

        this.con.on(`message`, this.handleMessages);

        // Open a list on the DPM.
        this.con.on(`open`, () => {
            this.con.send(new DPM_request_OpenList());
        });
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

    private handleMessages(
        messageEvent: MessageEvent,
    ) {
        const messageData = messageEvent.data as ArrayBuffer;

        if (messageData instanceof DPM_reply_DeviceInfo) {
            if (this.activeReqs[messageData.ref_id])
                this.activeReqs[messageData.ref_id].dInfo = messageData;
        } else if (messageData instanceof DPM_reply_Status) {
            const { ref_id, timestamp, cycle, status } = messageData;
            const { errCallback } = this.activeReqs[messageData.ref_id];

            if (errCallback !== undefined)
                errCallback({
                    ref_id,
                    timestamp,
                    cycle,
                    status: new Status(status)
                });
            else {
                const s = new Status(messageData.status);

                console.info(
                    `DPM: error status ${s} for ${
                        this.activeReqs[messageData.ref_id].drf
                    }`
                );
            }
        } else if (
            messageData instanceof DPM_reply_Scalar ||
            messageData instanceof DPM_reply_ScalarArray ||
            messageData instanceof DPM_reply_Raw ||
            messageData instanceof DPM_reply_Text ||
            messageData instanceof DPM_reply_TextArray ||
            messageData instanceof DPM_reply_TimedScalarArray
        ) {
            const { ref_id, timestamp, cycle, data } = messageData;
            const { callback, dInfo } = this.activeReqs[ref_id];

            // Forcing Typescript to accept 'dInfo' being defined.
            // The DPM should have sent us the device info before
            // this message, so the assumption is valid. If DPM ever
            // breaks this, then lots of Web apps are going to
            // complain.

            callback(
                { ref_id, timestamp, cycle, data },
                dInfo as DeviceInfo
            );
        } else if (
            messageData instanceof DPM_reply_AnalogAlarm ||
            messageData instanceof DPM_reply_DigitalAlarm ||
            messageData instanceof DPM_reply_BasicStatus
        ) {
            const { ref_id, timestamp, cycle, ...rest } = messageData;
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
        } else if (messageData instanceof DPM_reply_ApplySettings) {
            messageData.status.forEach(({ ref_id, status }) => {
                const settingStatus = new Status(status);

                if (settingStatus.isBad) {
                    const { errCallback } = this.activeReqs[ref_id];

                    if (errCallback !== undefined)
                        errCallback({
                            ref_id,
                            status: new Status(status)
                        });
                    else {
                        const s = new Status(status);

                        console.info(
                            `SETTING: error status ${s} for ${
                                this.activeReqs[ref_id].drf
                            }`
                        );
                    }
                }
            });
        }
    }

    private addToList(
        req: Request,
        ref_id: number
    ): Promise<void> {
        const msg = new DPM_request_AddToList();

        msg.ref_id = ref_id;
        msg.drf_request = req.drf;

        return this.con.send(msg);
    }

    addRequest(
        req: string,
        cb: (o: DataReply, i: DeviceInfo) => void,
        ecb?: (e: any) => void
    ): Promise<void> {
        const entry: Request = { drf: req, callback: cb, errCallback: ecb };
        const ref_id = this.stagedReqs.nextRef;

        this.stagedReqs.nextRef = this.stagedReqs.nextRef + 1;

        return this.addToList(entry, ref_id);
    }

    private buildStruct(index: number, value: number[]): DPM_struct_ScaledSetting;
    private buildStruct(index: number, value: string[]): DPM_struct_TextSetting;
    private buildStruct(index: number, value: ArrayBuffer): DPM_struct_RawSetting;
    private buildStruct(index: number, value: number[] | string[] | ArrayBuffer) {
        let setStruct: (
            DPM_struct_RawSetting
            | DPM_struct_ScaledSetting
            | DPM_struct_TextSetting
        ) = new DPM_struct_ScaledSetting();

        if (value instanceof ArrayBuffer) {
            setStruct = new DPM_struct_RawSetting();
        } else if (typeof value[0] === 'string') {
            setStruct = new DPM_struct_TextSetting();
        }

        const ref_ids = Object.keys(this.activeReqs).map(Number);

        setStruct.ref_id = ref_ids[index];
        setStruct.data = value;

        return setStruct;
    }

    applySettings(settings: (string | number | ArrayBuffer)[]) {
        const msg = new DPM_request_ApplySettings();

        msg.user_name = "beau";

        msg.text_array = [];
        msg.scaled_array = [];
        msg.raw_array = [];

        settings.forEach((setting, index) => {
            if (typeof setting === 'string') {
                msg.text_array!.push(this.buildStruct(index, [setting]));
            } else if (typeof setting === 'number') {
                msg.scaled_array!.push(this.buildStruct(index, [setting]));
            } else if (setting instanceof ArrayBuffer) {
                msg.raw_array!.push(this.buildStruct(index, setting));
            }
        });

        this.con.send(msg);
    }

    // Restores the state of the DPM connection.
    private async restoreState(): Promise<void> {
        // If the list was started, we re-register all the DRF requests in the
        // active list and then start the list.

        if (this.started) {
            for (const ii in this.activeReqs)
                this.addToList(this.activeReqs[ii], +ii);
            await this.start(this.dataSource);
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
            await this.addToList(this.stagedReqs.reqs[ii], +ii);
    }

    start(dataSource?: string): Promise<void> {
        const msg = new DPM_request_StartList();

        msg.model = dataSource;

        this.dataSource = dataSource;
        this.started = true;
        this.activeReqs = { ...this.stagedReqs.reqs };

        return this.con.send(msg);

        // TODO: Can this be removed?
        // if (result.msg instanceof DPM_reply_StartList) {
        //     if (result.status.isGood) {
        //         this.dataSource = dataSource;
        //         this.started = true;
        //         this.activeReqs = { ...this.stagedReqs.reqs };
        //     } else throw new AcnetError(result.status);
        // } else throw new AcnetError(Status.ACNET_RPLYPACK);
    }

    clear(): Promise<void> {
        const msg = new DPM_request_ClearList();

        this.stagedReqs = { reqs: {}, nextRef: this.initRef };

        return this.con.send(msg);

        // if (reply.status.isGood) {
        //     const msg = DPM.u_reply(reply);

        //     if (msg.msg instanceof DPM_reply_ListStatus) {
        //         const status: Status = new Status(msg.msg.status);

        //         if (status.isGood)
        //             this.stagedReqs = { reqs: {}, nextRef: this.initRef };
        //         else throw new AcnetError(status);
        //     } else throw new AcnetError(Status.ACNET_RPLYPACK);
        // } else throw new AcnetError(reply.status);
    }

    stop(): Promise<void> {
        const msg = new DPM_request_StopList();

        this.activeReqs = {};
        this.started = false;

        return this.con.send(msg);
    }
}
