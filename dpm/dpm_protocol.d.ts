// @ts-nocheck

export declare class DPM_struct_RawSetting {
    ref_id: number;
    data: ArrayBuffer;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_struct_ScaledSetting {
    ref_id: number;
    data: Array<number>;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_struct_TextSetting {
    ref_id: number;
    data: Array<string>;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_struct_SettingStatus {
    ref_id: number;
    status: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_ServiceDiscovery {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_OpenList {
    location?: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_AddToList {
    list_id: number;
    ref_id: number;
    drf_request: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_Authenticate {
    list_id: number;
    token: ArrayBuffer;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_EnableSettings {
    list_id: number;
    MIC: ArrayBuffer;
    message: ArrayBuffer;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_RemoveFromList {
    list_id: number;
    ref_id: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_StartList {
    list_id: number;
    model?: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_ClearList {
    list_id: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_StopList {
    list_id: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_request_ApplySettings {
    user_name: string;
    list_id: number;
    raw_array?: Array<DPM_struct_RawSetting>;
    scaled_array?: Array<DPM_struct_ScaledSetting>;
    text_array?: Array<DPM_struct_TextSetting>;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class DPM_reply_ServiceDiscovery {
    load: number;
    serviceLocation: string;
    constructor();
}

export declare class DPM_reply_OpenList {
    list_id: number;
    constructor();
}

export declare class DPM_reply_Authenticate {
    serviceName?: string;
    token?: ArrayBuffer;
    constructor();
}

export declare class DPM_reply_AddToList {
    list_id: number;
    ref_id: number;
    status: number;
    constructor();
}

export declare class DPM_reply_RemoveFromList {
    list_id: number;
    ref_id: number;
    status: number;
    constructor();
}

export declare class DPM_reply_StartList {
    list_id: number;
    status: number;
    constructor();
}

export declare class DPM_reply_ListStatus {
    list_id: number;
    status: number;
    constructor();
}

export declare class DPM_reply_Status {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    constructor();
}

export declare class DPM_reply_DeviceInfo {
    ref_id: number;
    di: number;
    name: string;
    description: string;
    units?: string;
    format_hint?: number;
    constructor();
}

export declare class DPM_reply_Scalar {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: number;
    constructor();
}

export declare class DPM_reply_ScalarArray {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: Array<number>;
    constructor();
}

export declare class DPM_reply_Raw {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: ArrayBuffer;
    constructor();
}

export declare class DPM_reply_Text {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: string;
    constructor();
}

export declare class DPM_reply_TextArray {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: Array<string>;
    constructor();
}

export declare class DPM_reply_AnalogAlarm {
    ref_id: number;
    timestamp: number;
    cycle: number;
    minimum: number;
    maximum: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
    constructor();
}

export declare class DPM_reply_DigitalAlarm {
    ref_id: number;
    timestamp: number;
    cycle: number;
    nominal: number;
    mask: number;
    alarm_enable: boolean;
    alarm_status: boolean;
    abort: boolean;
    abort_inhibit: boolean;
    tries_needed: number;
    tries_now: number;
    constructor();
}

export declare class DPM_reply_BasicStatus {
    ref_id: number;
    timestamp: number;
    cycle: number;
    on?: boolean;
    ready?: boolean;
    remote?: boolean;
    positive?: boolean;
    ramp?: boolean;
    constructor();
}

export declare class DPM_reply_TimedScalarArray {
    ref_id: number;
    timestamp: number;
    cycle: number;
    status: number;
    data: Array<number>;
    micros: Array<number>;
    constructor();
}

export declare class DPM_reply_ApplySettings {
    status: Array<DPM_struct_SettingStatus>;
    constructor();
}

type DPM_Requests = DPM_request_ServiceDiscovery
                  | DPM_request_OpenList
                  | DPM_request_AddToList
                  | DPM_request_Authenticate
                  | DPM_request_EnableSettings
                  | DPM_request_RemoveFromList
                  | DPM_request_StartList
                  | DPM_request_ClearList
                  | DPM_request_StopList
                  | DPM_request_ApplySettings;

type DPM_Replies = DPM_reply_ServiceDiscovery
                 | DPM_reply_OpenList
                 | DPM_reply_Authenticate
                 | DPM_reply_AddToList
                 | DPM_reply_RemoveFromList
                 | DPM_reply_StartList
                 | DPM_reply_ListStatus
                 | DPM_reply_Status
                 | DPM_reply_DeviceInfo
                 | DPM_reply_Scalar
                 | DPM_reply_ScalarArray
                 | DPM_reply_Raw
                 | DPM_reply_Text
                 | DPM_reply_TextArray
                 | DPM_reply_AnalogAlarm
                 | DPM_reply_DigitalAlarm
                 | DPM_reply_BasicStatus
                 | DPM_reply_TimedScalarArray
                 | DPM_reply_ApplySettings;

interface DPM_IF {
    unmarshal_reply: (iter: IterableIterator<number>) => DPM_Replies;
}

export const DPM_PROTO: DPM_IF;
