// @ts-nocheck

export declare class ACL_struct_Header {
    requestorName: string;
    requestorNode: number;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_struct_ScriptInfo {
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

export declare class ACL_struct_ScriptInfoGenericArgs {
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

export declare class ACL_struct_ReturnValue {
    name: string;
    value: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteDBFile {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteFlatFile {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteCode {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteDBFileMultReply {
    header: ACL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteFlatFileMultReply {
    header: ACL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteCodeMultReply {
    header: ACL_struct_Header;
    executeDataEvent: string;
    scriptInfo: ACL_struct_ScriptInfo;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteDBFileGenericArgs {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteFlatFileGenericArgs {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_ExecuteCodeGenericArgs {
    header: ACL_struct_Header;
    scriptInfo: ACL_struct_ScriptInfoGenericArgs;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_GetAcldVersion {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_GetNumScripts {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_KillScript {
    header: ACL_struct_Header;
    ACLCode: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_KillMyScripts {
    header: ACL_struct_Header;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_KillAllScripts {
    header: ACL_struct_Header;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_UpdateClientInfo {
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_CommandHelp {
    header: ACL_struct_Header;
    wantOneline: boolean;
    commandName: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_request_FunctionHelp {
    header: ACL_struct_Header;
    wantOneline: boolean;
    functionName: string;
    constructor();
    *marshal(): IterableIterator<number>;
}

export declare class ACL_reply_ExecuteScript {
    header: ACL_struct_Header;
    status: number;
    numSuppressedSettings: number;
    startTime: number;
    endTime: number;
    returnValue?: Array<ACL_struct_ReturnValue>;
    constructor();
}

export declare class ACL_reply_ExecuteScriptImmediateReply {
    header: ACL_struct_Header;
    status: number;
    constructor();
}

export declare class ACL_reply_GetAcldVersionReply {
    status: number;
    version: string;
    constructor();
}

export declare class ACL_reply_GetNumScriptsReply {
    status: number;
    numScripts: number;
    numCancelledScripts: number;
    constructor();
}

export declare class ACL_reply_KillScriptReply {
    status: number;
    constructor();
}

export declare class ACL_reply_KillMyScriptsReply {
    status: number;
    numKilled: number;
    constructor();
}

export declare class ACL_reply_KillAllScriptsReply {
    status: number;
    numKilled: number;
    constructor();
}

export declare class ACL_reply_CommandHelpReply {
    status: number;
    helpStrings: Array<string>;
    constructor();
}

export declare class ACL_reply_FunctionHelpReply {
    status: number;
    helpStrings: Array<string>;
    constructor();
}

type ACL_Requests = ACL_request_ExecuteDBFile
                  | ACL_request_ExecuteFlatFile
                  | ACL_request_ExecuteCode
                  | ACL_request_ExecuteDBFileMultReply
                  | ACL_request_ExecuteFlatFileMultReply
                  | ACL_request_ExecuteCodeMultReply
                  | ACL_request_ExecuteDBFileGenericArgs
                  | ACL_request_ExecuteFlatFileGenericArgs
                  | ACL_request_ExecuteCodeGenericArgs
                  | ACL_request_GetAcldVersion
                  | ACL_request_GetNumScripts
                  | ACL_request_KillScript
                  | ACL_request_KillMyScripts
                  | ACL_request_KillAllScripts
                  | ACL_request_UpdateClientInfo
                  | ACL_request_CommandHelp
                  | ACL_request_FunctionHelp;

type ACL_Replies = ACL_reply_ExecuteScript
                 | ACL_reply_ExecuteScriptImmediateReply
                 | ACL_reply_GetAcldVersionReply
                 | ACL_reply_GetNumScriptsReply
                 | ACL_reply_KillScriptReply
                 | ACL_reply_KillMyScriptsReply
                 | ACL_reply_KillAllScriptsReply
                 | ACL_reply_CommandHelpReply
                 | ACL_reply_FunctionHelpReply;

interface ACL_IF {
    unmarshal_reply: (iter: IterableIterator<number>) => ACL_Replies;
}

export const ACL_PROTO: ACL_IF;
