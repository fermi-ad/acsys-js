///<reference path="path/to/file.d.ts" />

import { PROTOCOL } from '@fnal/proto_lib';

export const ACL_PROTO = {};

// Define enumerations of the protocol.

ACL_PROTO.enum = {

};

// Define user-defined structures of the protocol.

export class ACL_struct_Header {
    constructor() {
	this.requestorName = "";
	this.requestorNode = 0;
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 34, 212];
	yield* PROTOCOL.m_string(this.requestorName);
	yield* [18, 149, 221];
	yield* PROTOCOL.m_int(this.requestorNode);
    };
};

export class ACL_struct_ScriptInfo {
    constructor() {
	this.ACLCode = "";
	this.defaultDataEvent = "";
	this.noStaleErrors = false;
	this.handleArrayDevices = false;
	this.noSettings = false;
	this.isPersistent = false;
	this.wantImmediateReply = false;
    };

    *marshal() {
	const nullFields =
		(this.substituteDevices === undefined ? 2 : 0)
	    + (this.substituteStrings === undefined ? 2 : 0)
	    + (this.returnSymbols === undefined ? 2 : 0);

	yield* PROTOCOL.m_tagged_int(0x50, 20 - nullFields);
	yield* [18, 181, 106];
	yield* PROTOCOL.m_string(this.ACLCode);
	yield* [18, 180, 212];
	yield* PROTOCOL.m_string(this.defaultDataEvent);
	yield* [18, 126, 229];
	yield* PROTOCOL.m_bool(this.noStaleErrors);
	yield* [18, 78, 208];
	yield* PROTOCOL.m_bool(this.handleArrayDevices);
	yield* [18, 104, 131];
	yield* PROTOCOL.m_bool(this.noSettings);
	yield* [18, 73, 199];
	yield* PROTOCOL.m_bool(this.isPersistent);
	yield* [18, 19, 242];
	yield* PROTOCOL.m_bool(this.wantImmediateReply);
	if (this.substituteDevices !== undefined) {
	    yield* [18, 23, 238];
	    yield* PROTOCOL.m_array(PROTOCOL.m_string, this.substituteDevices);
	}
	if (this.substituteStrings !== undefined) {
	    yield* [18, 179, 52];
	    yield* PROTOCOL.m_array(PROTOCOL.m_string, this.substituteStrings);
	}
	if (this.returnSymbols !== undefined) {
	    yield* [18, 154, 173];
	    yield* PROTOCOL.m_array(PROTOCOL.m_string, this.returnSymbols);
	}
    };
};

export class ACL_struct_ScriptInfoGenericArgs {
    constructor() {
	this.ACLCode = "";
	this.defaultDataEvent = "";
	this.noStaleErrors = false;
	this.handleArrayDevices = false;
	this.noSettings = false;
	this.isPersistent = false;
	this.wantImmediateReply = false;
    };

    *marshal() {
	const nullFields =
		(this.startDataEvent === undefined ? 2 : 0)
	    + (this.fldArguments === undefined ? 2 : 0)
	    + (this.returnSymbols === undefined ? 2 : 0);

	yield* PROTOCOL.m_tagged_int(0x50, 20 - nullFields);
	yield* [18, 181, 106];
	yield* PROTOCOL.m_string(this.ACLCode);
	yield* [18, 180, 212];
	yield* PROTOCOL.m_string(this.defaultDataEvent);
	yield* [18, 126, 229];
	yield* PROTOCOL.m_bool(this.noStaleErrors);
	yield* [18, 78, 208];
	yield* PROTOCOL.m_bool(this.handleArrayDevices);
	yield* [18, 104, 131];
	yield* PROTOCOL.m_bool(this.noSettings);
	yield* [18, 73, 199];
	yield* PROTOCOL.m_bool(this.isPersistent);
	yield* [18, 19, 242];
	yield* PROTOCOL.m_bool(this.wantImmediateReply);
	if (this.startDataEvent !== undefined) {
	    yield* [18, 6, 159];
	    yield* PROTOCOL.m_string(this.startDataEvent);
	}
	if (this.fldArguments !== undefined) {
	    yield* [18, 28, 170];
	    yield* PROTOCOL.m_array(PROTOCOL.m_string, this.fldArguments);
	}
	if (this.returnSymbols !== undefined) {
	    yield* [18, 154, 173];
	    yield* PROTOCOL.m_array(PROTOCOL.m_string, this.returnSymbols);
	}
    };
};

export class ACL_struct_ReturnValue {
    constructor() {
	this.name = "";
	this.value = "";
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 147, 28];
	yield* PROTOCOL.m_string(this.name);
	yield* [18, 193, 96];
	yield* PROTOCOL.m_string(this.value);
    };
};

ACL_PROTO.u_struct_Header = function (iter) {
    const v = new ACL_struct_Header();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 8916:
	    v.requestorName = PROTOCOL.u_string(iter);
	    fflg[0] |= 1;
	    break;
	 case -27171:
	    v.requestorNode = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_struct_Header");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_struct_Header");
    return v;
};

ACL_PROTO.u_struct_ScriptInfo = function (iter) {
    const v = new ACL_struct_ScriptInfo();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -19094:
	    v.ACLCode = PROTOCOL.u_string(iter);
	    fflg[0] |= 1;
	    break;
	 case -19244:
	    v.defaultDataEvent = PROTOCOL.u_string(iter);
	    fflg[0] |= 2;
	    break;
	 case 32485:
	    v.noStaleErrors = PROTOCOL.u_bool(iter);
	    fflg[0] |= 4;
	    break;
	 case 20176:
	    v.handleArrayDevices = PROTOCOL.u_bool(iter);
	    fflg[0] |= 8;
	    break;
	 case 26755:
	    v.noSettings = PROTOCOL.u_bool(iter);
	    fflg[0] |= 16;
	    break;
	 case 18887:
	    v.isPersistent = PROTOCOL.u_bool(iter);
	    fflg[0] |= 32;
	    break;
	 case 5106:
	    v.wantImmediateReply = PROTOCOL.u_bool(iter);
	    fflg[0] |= 64;
	    break;
	 case 6126:
	    v.substituteDevices = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    break;
	 case -19660:
	    v.substituteStrings = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    break;
	 case -25939:
	    v.returnSymbols = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    break;
	 default:
	    throw new Error("unknown field when building ACL_struct_ScriptInfo");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 127)
	throw new Error("required fields missing when building ACL_struct_ScriptInfo");
    return v;
};

ACL_PROTO.u_struct_ScriptInfoGenericArgs = function (iter) {
    const v = new ACL_struct_ScriptInfoGenericArgs();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -19094:
	    v.ACLCode = PROTOCOL.u_string(iter);
	    fflg[0] |= 1;
	    break;
	 case -19244:
	    v.defaultDataEvent = PROTOCOL.u_string(iter);
	    fflg[0] |= 2;
	    break;
	 case 32485:
	    v.noStaleErrors = PROTOCOL.u_bool(iter);
	    fflg[0] |= 4;
	    break;
	 case 20176:
	    v.handleArrayDevices = PROTOCOL.u_bool(iter);
	    fflg[0] |= 8;
	    break;
	 case 26755:
	    v.noSettings = PROTOCOL.u_bool(iter);
	    fflg[0] |= 16;
	    break;
	 case 18887:
	    v.isPersistent = PROTOCOL.u_bool(iter);
	    fflg[0] |= 32;
	    break;
	 case 5106:
	    v.wantImmediateReply = PROTOCOL.u_bool(iter);
	    fflg[0] |= 64;
	    break;
	 case 1695:
	    v.startDataEvent = PROTOCOL.u_string(iter);
	    break;
	 case 7338:
	    v.fldArguments = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    break;
	 case -25939:
	    v.returnSymbols = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    break;
	 default:
	    throw new Error("unknown field when building ACL_struct_ScriptInfoGenericArgs");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 127)
	throw new Error("required fields missing when building ACL_struct_ScriptInfoGenericArgs");
    return v;
};

ACL_PROTO.u_struct_ReturnValue = function (iter) {
    const v = new ACL_struct_ReturnValue();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -27876:
	    v.name = PROTOCOL.u_string(iter);
	    fflg[0] |= 1;
	    break;
	 case -16032:
	    v.value = PROTOCOL.u_string(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_struct_ReturnValue");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_struct_ReturnValue");
    return v;
};

// Define requests of the protocol.

export class ACL_request_ExecuteDBFile {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 52, 138, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteFlatFile {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 139, 245, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteCode {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 132, 143, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteDBFileMultReply {
    constructor() {
	this.header = new ACL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 187, 33, 81, 6];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 203, 153];
	yield* PROTOCOL.m_string(this.executeDataEvent);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteFlatFileMultReply {
    constructor() {
	this.header = new ACL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 111, 132, 81, 6];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 203, 153];
	yield* PROTOCOL.m_string(this.executeDataEvent);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteCodeMultReply {
    constructor() {
	this.header = new ACL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACL_struct_ScriptInfo();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 126, 1, 81, 6];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 203, 153];
	yield* PROTOCOL.m_string(this.executeDataEvent);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteDBFileGenericArgs {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfoGenericArgs();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 153, 210, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteFlatFileGenericArgs {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfoGenericArgs();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 211, 78, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_ExecuteCodeGenericArgs {
    constructor() {
	this.header = new ACL_struct_Header();
	this.scriptInfo = new ACL_struct_ScriptInfoGenericArgs();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 67, 35, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 163, 226];
	yield* PROTOCOL.m_struct(this.scriptInfo);
    };
};

export class ACL_request_GetAcldVersion {
    constructor() {
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 195, 248, 81, 0];
    };
};

export class ACL_request_GetNumScripts {
    constructor() {
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 188, 160, 81, 0];
    };
};

export class ACL_request_KillScript {
    constructor() {
	this.header = new ACL_struct_Header();
	this.ACLCode = "";
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 82, 2, 81, 4];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 181, 106];
	yield* PROTOCOL.m_string(this.ACLCode);
    };
};

export class ACL_request_KillMyScripts {
    constructor() {
	this.header = new ACL_struct_Header();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 145, 76, 81, 2];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
    };
};

export class ACL_request_KillAllScripts {
    constructor() {
	this.header = new ACL_struct_Header();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 28, 153, 81, 2];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
    };
};

export class ACL_request_UpdateClientInfo {
    constructor() {
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 118, 78, 81, 0];
    };
};

export class ACL_request_CommandHelp {
    constructor() {
	this.header = new ACL_struct_Header();
	this.wantOneline = false;
	this.commandName = "";
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 227, 141, 81, 6];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 171, 221];
	yield* PROTOCOL.m_bool(this.wantOneline);
	yield* [18, 253, 127];
	yield* PROTOCOL.m_string(this.commandName);
    };
};

export class ACL_request_FunctionHelp {
    constructor() {
	this.header = new ACL_struct_Header();
	this.wantOneline = false;
	this.functionName = "";
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 91, 236, 85, 212, 18, 178, 52, 81, 6];
	yield* [18, 185, 149];
	yield* PROTOCOL.m_struct(this.header);
	yield* [18, 171, 221];
	yield* PROTOCOL.m_bool(this.wantOneline);
	yield* [18, 202, 140];
	yield* PROTOCOL.m_string(this.functionName);
    };
};

// Define replies of the protocol.

export class ACL_reply_ExecuteScript {
    constructor() {
	this.header = new ACL_struct_Header();
	this.status = 0;
	this.numSuppressedSettings = 0;
	this.startTime = 0;
	this.endTime = 0;
    };
};

export class ACL_reply_ExecuteScriptImmediateReply {
    constructor() {
	this.header = new ACL_struct_Header();
	this.status = 0;
    };
};

export class ACL_reply_GetAcldVersionReply {
    constructor() {
	this.status = 0;
	this.version = "";
    };
};

export class ACL_reply_GetNumScriptsReply {
    constructor() {
	this.status = 0;
	this.numScripts = 0;
	this.numCancelledScripts = 0;
    };
};

export class ACL_reply_KillScriptReply {
    constructor() {
	this.status = 0;
    };
};

export class ACL_reply_KillMyScriptsReply {
    constructor() {
	this.status = 0;
	this.numKilled = 0;
    };
};

export class ACL_reply_KillAllScriptsReply {
    constructor() {
	this.status = 0;
	this.numKilled = 0;
    };
};

export class ACL_reply_CommandHelpReply {
    constructor() {
	this.status = 0;
	this.helpStrings = [];
    };
};

export class ACL_reply_FunctionHelpReply {
    constructor() {
	this.status = 0;
	this.helpStrings = [];
    };
};

ACL_PROTO.u_reply_ExecuteScript = function (iter) {
    const v = new ACL_reply_ExecuteScript();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -18027:
	    v.header = ACL_PROTO.u_struct_Header(iter);
	    fflg[0] |= 1;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case -18748:
	    v.numSuppressedSettings = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 22431:
	    v.startTime = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 30987:
	    v.endTime = PROTOCOL.u_int(iter);
	    fflg[0] |= 16;
	    break;
	 case 15586:
	    v.returnValue = PROTOCOL.u_array(ACL_PROTO.u_struct_ReturnValue, iter);
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_ExecuteScript");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building ACL_reply_ExecuteScript");
    return v;
};

ACL_PROTO.u_reply_ExecuteScriptImmediateReply = function (iter) {
    const v = new ACL_reply_ExecuteScriptImmediateReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -18027:
	    v.header = ACL_PROTO.u_struct_Header(iter);
	    fflg[0] |= 1;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_ExecuteScriptImmediateReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_ExecuteScriptImmediateReply");
    return v;
};

ACL_PROTO.u_reply_GetAcldVersionReply = function (iter) {
    const v = new ACL_reply_GetAcldVersionReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 12048:
	    v.version = PROTOCOL.u_string(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_GetAcldVersionReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_GetAcldVersionReply");
    return v;
};

ACL_PROTO.u_reply_GetNumScriptsReply = function (iter) {
    const v = new ACL_reply_GetNumScriptsReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -19384:
	    v.numScripts = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case -3348:
	    v.numCancelledScripts = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_GetNumScriptsReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 7)
	throw new Error("required fields missing when building ACL_reply_GetNumScriptsReply");
    return v;
};

ACL_PROTO.u_reply_KillScriptReply = function (iter) {
    const v = new ACL_reply_KillScriptReply();

    if (PROTOCOL.u_tagged_int(0x50, iter) !== 2)
	throw new Error("required fields missing when building ACL_reply_KillScriptReply");
    if (PROTOCOL.u_tagged_int(0x10, iter) !== 17492)
	throw new Error("unknown field when building ACL_reply_KillScriptReply");
    v.status = PROTOCOL.u_int(iter);
    return v;
}

ACL_PROTO.u_reply_KillMyScriptsReply = function (iter) {
    const v = new ACL_reply_KillMyScriptsReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 153:
	    v.numKilled = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_KillMyScriptsReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_KillMyScriptsReply");
    return v;
};

ACL_PROTO.u_reply_KillAllScriptsReply = function (iter) {
    const v = new ACL_reply_KillAllScriptsReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 153:
	    v.numKilled = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_KillAllScriptsReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_KillAllScriptsReply");
    return v;
};

ACL_PROTO.u_reply_CommandHelpReply = function (iter) {
    const v = new ACL_reply_CommandHelpReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 20228:
	    v.helpStrings = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_CommandHelpReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_CommandHelpReply");
    return v;
};

ACL_PROTO.u_reply_FunctionHelpReply = function (iter) {
    const v = new ACL_reply_FunctionHelpReply();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 20228:
	    v.helpStrings = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building ACL_reply_FunctionHelpReply");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building ACL_reply_FunctionHelpReply");
    return v;
};

ACL_PROTO.unmarshal_reply = function (iter) {
    PROTOCOL.validate_header(2, iter);
    if (PROTOCOL.u_tagged_int(0x50, iter) !== 3)
	throw new Error("badly formed message header");
    if (PROTOCOL.u_tagged_int(0x10, iter) !== 1542215124)
	throw new Error("unknown protocol type");
    switch (PROTOCOL.u_tagged_int(0x10, iter)) {
     case -20715:
	return ACL_PROTO.u_reply_ExecuteScript(iter);
     case 18186:
	return ACL_PROTO.u_reply_ExecuteScriptImmediateReply(iter);
     case 23501:
	return ACL_PROTO.u_reply_GetAcldVersionReply(iter);
     case -6373:
	return ACL_PROTO.u_reply_GetNumScriptsReply(iter);
     case 20464:
	return ACL_PROTO.u_reply_KillScriptReply(iter);
     case -23030:
	return ACL_PROTO.u_reply_KillMyScriptsReply(iter);
     case 26453:
	return ACL_PROTO.u_reply_KillAllScriptsReply(iter);
     case 7111:
	return ACL_PROTO.u_reply_CommandHelpReply(iter);
     case -30796:
	return ACL_PROTO.u_reply_FunctionHelpReply(iter);
     default:
	throw new Error("unknown reply in protocol");
    }
}
