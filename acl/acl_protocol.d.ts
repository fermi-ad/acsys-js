// @ts-nocheck
export declare class ACLDPROTOCOL_struct_Header {
    requestorName: string;
    requestorNode: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_struct_ScriptInfo {
    ACLCode: string;
    defaultDataEvent: string;
    noStaleErrors: boolean;
    handleArrayDevices: boolean;
    noSettings: boolean;
    isPersistent: boolean;
    wantImmediateReply: boolean;
    substituteDevices?: Array<string>;
    substituteStrings?: Array<string>;
    returnSymbols?: Array<string>;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_struct_ScriptInfoGenericArgs {
    ACLCode: string;
    defaultDataEvent: string;
    noStaleErrors: boolean;
    handleArrayDevices: boolean;
    noSettings: boolean;
    isPersistent: boolean;
    wantImmediateReply: boolean;
    startDataEvent?: string;
    arguments?: Array<string>;
    returnSymbols?: Array<string>;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_struct_ReturnValue {
    name: string;
    value: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteDBFile {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteFlatFile {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteCode {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteDBFileMultReply {
    header: ACLDPROTOCOL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteFlatFileMultReply {
    header: ACLDPROTOCOL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteCodeMultReply {
    header: ACLDPROTOCOL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteDBFileGenericArgs {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_ExecuteCodeGenericArgs {
    header: ACLDPROTOCOL_struct_Header;
    scriptInfo: ACLDPROTOCOL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_GetAcldVersion {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_GetNumScripts {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_KillScript {
    header: ACLDPROTOCOL_struct_Header;
    ACLCode: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_KillMyScripts {
    header: ACLDPROTOCOL_struct_Header;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_KillAllScripts {
    header: ACLDPROTOCOL_struct_Header;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_UpdateClientInfo {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_CommandHelp {
    header: ACLDPROTOCOL_struct_Header;
    wantOneline: boolean;
    commandName: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_request_FunctionHelp {
    header: ACLDPROTOCOL_struct_Header;
    wantOneline: boolean;
    functionName: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACLDPROTOCOL_reply_ExecuteScript {
    header: ACLDPROTOCOL_struct_Header;
    status: number;
    numSuppressedSettings: number;
    startTime: number;
    endTime: number;
    returnValue?: Array<ACLDPROTOCOL_struct_ReturnValue>;
    constructor();
}

export declare class ACLDPROTOCOL_reply_ExecuteScriptImmediateReply {
    header: ACLDPROTOCOL_struct_Header;
    status: number;
    constructor();
}

export declare class ACLDPROTOCOL_reply_GetAcldVersionReply {
    status: number;
    version: string;
    constructor();
}

export declare class ACLDPROTOCOL_reply_GetNumScriptsReply {
    status: number;
    numScripts: number;
    numCancelledScripts: number;
    constructor();
}

export declare class ACLDPROTOCOL_reply_KillScriptReply {
    status: number;
    constructor();
}

export declare class ACLDPROTOCOL_reply_KillMyScriptsReply {
    status: number;
    numKilled: number;
    constructor();
}

export declare class ACLDPROTOCOL_reply_KillAllScriptsReply {
    status: number;
    numKilled: number;
    constructor();
}

export declare class ACLDPROTOCOL_reply_CommandHelpReply {
    status: number;
    helpStrings: Array<string>;
    constructor();
}

export declare class ACLDPROTOCOL_reply_FunctionHelpReply {
    status: number;
    helpStrings: Array<string>;
    constructor();
}

type ACLDPROTOCOL_Requests = ACLDPROTOCOL_request_ExecuteDBFile
                           | ACLDPROTOCOL_request_ExecuteFlatFile
                           | ACLDPROTOCOL_request_ExecuteCode
                           | ACLDPROTOCOL_request_ExecuteDBFileMultReply
                           | ACLDPROTOCOL_request_ExecuteFlatFileMultReply
                           | ACLDPROTOCOL_request_ExecuteCodeMultReply
                           | ACLDPROTOCOL_request_ExecuteDBFileGenericArgs
                           | ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs
                           | ACLDPROTOCOL_request_ExecuteCodeGenericArgs
                           | ACLDPROTOCOL_request_GetAcldVersion
                           | ACLDPROTOCOL_request_GetNumScripts
                           | ACLDPROTOCOL_request_KillScript
                           | ACLDPROTOCOL_request_KillMyScripts
                           | ACLDPROTOCOL_request_KillAllScripts
                           | ACLDPROTOCOL_request_UpdateClientInfo
                           | ACLDPROTOCOL_request_CommandHelp
                           | ACLDPROTOCOL_request_FunctionHelp;

type ACLDPROTOCOL_Replies = ACLDPROTOCOL_reply_ExecuteScript
                          | ACLDPROTOCOL_reply_ExecuteScriptImmediateReply
                          | ACLDPROTOCOL_reply_GetAcldVersionReply
                          | ACLDPROTOCOL_reply_GetNumScriptsReply
                          | ACLDPROTOCOL_reply_KillScriptReply
                          | ACLDPROTOCOL_reply_KillMyScriptsReply
                          | ACLDPROTOCOL_reply_KillAllScriptsReply
                          | ACLDPROTOCOL_reply_CommandHelpReply
                          | ACLDPROTOCOL_reply_FunctionHelpReply;

interface ACLDPROTOCOL_IF {
    unmarshal_reply: (iter: IterableIterator<number>) => ACLDPROTOCOL_Replies;
}

export const ACLDPROTOCOL_PROTO: ACLDPROTOCOL_IF;
