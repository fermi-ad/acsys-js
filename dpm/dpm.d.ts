import { ACNET, Status } from "@fnal/acnet";
import { DPM_reply_ServiceDiscovery } from "./dpm_protocol";
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
    data: number | string | AnaAlarm | DigAlarm | BasStatus | Array<number> | Array<string> | ArrayBuffer;
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
export declare class DPM {
    private initRef;
    private stagedReqs;
    private activeReqs;
    private started;
    private con;
    private model?;
    private context;
    private shouldExit;
    private replies?;
    constructor(server?: string, shConn?: ACNET);
    private discovery;
    private findDPM;
    findDPMs(dpmType?: string): Promise<DPM_reply_ServiceDiscovery[]>;
    private static u_reply;
    cancel(): Promise<void>;
    private connectionManager;
    private sendRequest;
    addRequest(req: string, cb: (o: DataReply, i: DeviceInfo) => void, ecb?: (e: any) => void): Promise<void>;
    private buildStruct;
    applySettings(settings: (string | number | ArrayBuffer)[]): Promise<void>;
    private restoreState;
    start(model?: string): Promise<void>;
    clear(): Promise<void>;
    stop(): Promise<void>;
}
