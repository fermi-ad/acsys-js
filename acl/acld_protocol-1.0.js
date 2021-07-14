import { PROTOCOL } from '@fnal/proto_lib';

if (ACLDPROTOCOL_PROTO === undefined) {
    export var ACLDPROTOCOL_PROTO = {};

    // Define enumerations of the protocol.

    ACLDPROTOCOL_PROTO.enum = {

    };

    // Define user-defined structures of the protocol.

    var ACLDPROTOCOL_struct_Header = function () {
	this.requestorName = "";
	this.requestorNode = 0;
    };

    ACLDPROTOCOL_struct_Header.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [81, 4]);
	PROTOCOL.m_content(d, [18, 34, 212]);
	PROTOCOL.m_string(d, this.requestorName);
	PROTOCOL.m_content(d, [18, 149, 221]);
	PROTOCOL.m_int(d, this.requestorNode);
    };

    var ACLDPROTOCOL_struct_ScriptInfo = function () {
	this.ACLCode = "";
	this.defaultDataEvent = "";
	this.noStaleErrors = false;
	this.handleArrayDevices = false;
	this.noSettings = false;
	this.isPersistent = false;
	this.wantImmediateReply = false;
	this.substituteDevices = null;
	this.substituteStrings = null;
	this.returnSymbols = null;
    };

    ACLDPROTOCOL_struct_ScriptInfo.prototype.marshal = function (d) {
	const nullFields =
	    (this.substituteDevices === null ? 1 : 0)
	    + (this.substituteStrings === null ? 1 : 0)
	    + (this.returnSymbols === null ? 1 : 0);

	PROTOCOL.m_tagged_int(0x50, d, (10 - nullFields) * 2);
	PROTOCOL.m_content(d, [18, 181, 106]);
	PROTOCOL.m_string(d, this.ACLCode);
	PROTOCOL.m_content(d, [18, 180, 212]);
	PROTOCOL.m_string(d, this.defaultDataEvent);
	PROTOCOL.m_content(d, [18, 126, 229]);
	PROTOCOL.m_bool(d, this.noStaleErrors);
	PROTOCOL.m_content(d, [18, 78, 208]);
	PROTOCOL.m_bool(d, this.handleArrayDevices);
	PROTOCOL.m_content(d, [18, 104, 131]);
	PROTOCOL.m_bool(d, this.noSettings);
	PROTOCOL.m_content(d, [18, 73, 199]);
	PROTOCOL.m_bool(d, this.isPersistent);
	PROTOCOL.m_content(d, [18, 19, 242]);
	PROTOCOL.m_bool(d, this.wantImmediateReply);
	if (this.substituteDevices !== null) {
	    PROTOCOL.m_content(d, [18, 23, 238]);
	    PROTOCOL.m_array(d, this.substituteDevices, PROTOCOL.m_string);
	}
	if (this.substituteStrings !== null) {
	    PROTOCOL.m_content(d, [18, 179, 52]);
	    PROTOCOL.m_array(d, this.substituteStrings, PROTOCOL.m_string);
	}
	if (this.returnSymbols !== null) {
	    PROTOCOL.m_content(d, [18, 154, 173]);
	    PROTOCOL.m_array(d, this.returnSymbols, PROTOCOL.m_string);
	}
    };

    var ACLDPROTOCOL_struct_ScriptInfoGenericArgs = function () {
	this.ACLCode = "";
	this.defaultDataEvent = "";
	this.noStaleErrors = false;
	this.handleArrayDevices = false;
	this.noSettings = false;
	this.isPersistent = false;
	this.wantImmediateReply = false;
	this.startDataEvent = null;
	this.fldArguments = null;
	this.returnSymbols = null;
    };

    ACLDPROTOCOL_struct_ScriptInfoGenericArgs.prototype.marshal = function (d) {
	const nullFields =
	    (this.startDataEvent === null ? 1 : 0)
	    + (this.fldArguments === null ? 1 : 0)
	    + (this.returnSymbols === null ? 1 : 0);

	PROTOCOL.m_tagged_int(0x50, d, (10 - nullFields) * 2);
	PROTOCOL.m_content(d, [18, 181, 106]);
	PROTOCOL.m_string(d, this.ACLCode);
	PROTOCOL.m_content(d, [18, 180, 212]);
	PROTOCOL.m_string(d, this.defaultDataEvent);
	PROTOCOL.m_content(d, [18, 126, 229]);
	PROTOCOL.m_bool(d, this.noStaleErrors);
	PROTOCOL.m_content(d, [18, 78, 208]);
	PROTOCOL.m_bool(d, this.handleArrayDevices);
	PROTOCOL.m_content(d, [18, 104, 131]);
	PROTOCOL.m_bool(d, this.noSettings);
	PROTOCOL.m_content(d, [18, 73, 199]);
	PROTOCOL.m_bool(d, this.isPersistent);
	PROTOCOL.m_content(d, [18, 19, 242]);
	PROTOCOL.m_bool(d, this.wantImmediateReply);
	if (this.startDataEvent !== null) {
	    PROTOCOL.m_content(d, [18, 6, 159]);
	    PROTOCOL.m_string(d, this.startDataEvent);
	}
	if (this.fldArguments !== null) {
	    PROTOCOL.m_content(d, [18, 28, 170]);
	    PROTOCOL.m_array(d, this.fldArguments, PROTOCOL.m_string);
	}
	if (this.returnSymbols !== null) {
	    PROTOCOL.m_content(d, [18, 154, 173]);
	    PROTOCOL.m_array(d, this.returnSymbols, PROTOCOL.m_string);
	}
    };

    var ACLDPROTOCOL_struct_ReturnValue = function () {
	this.name = "";
	this.value = "";
    };

    ACLDPROTOCOL_struct_ReturnValue.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [81, 4]);
	PROTOCOL.m_content(d, [18, 147, 28]);
	PROTOCOL.m_string(d, this.name);
	PROTOCOL.m_content(d, [18, 193, 96]);
	PROTOCOL.m_string(d, this.value);
    };

    ACLDPROTOCOL_PROTO.u_struct_Header = function (d) {
	const v = new ACLDPROTOCOL_struct_Header();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 8916:
		v.requestorName = PROTOCOL.u_string(d);
		fflg[0] |= 1;
		break;
	     case -27171:
		v.requestorNode = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_struct_Header";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_struct_Header";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_struct_ScriptInfo = function (d) {
	const v = new ACLDPROTOCOL_struct_ScriptInfo();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -19094:
		v.ACLCode = PROTOCOL.u_string(d);
		fflg[0] |= 1;
		break;
	     case -19244:
		v.defaultDataEvent = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     case 32485:
		v.noStaleErrors = PROTOCOL.u_bool(d);
		fflg[0] |= 4;
		break;
	     case 20176:
		v.handleArrayDevices = PROTOCOL.u_bool(d);
		fflg[0] |= 8;
		break;
	     case 26755:
		v.noSettings = PROTOCOL.u_bool(d);
		fflg[0] |= 16;
		break;
	     case 18887:
		v.isPersistent = PROTOCOL.u_bool(d);
		fflg[0] |= 32;
		break;
	     case 5106:
		v.wantImmediateReply = PROTOCOL.u_bool(d);
		fflg[0] |= 64;
		break;
	     case 6126:
		v.substituteDevices = PROTOCOL.u_array(d, PROTOCOL.u_string);
		break;
	     case -19660:
		v.substituteStrings = PROTOCOL.u_array(d, PROTOCOL.u_string);
		break;
	     case -25939:
		v.returnSymbols = PROTOCOL.u_array(d, PROTOCOL.u_string);
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_struct_ScriptInfo";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 127)
	    throw "required fields missing when building ACLDPROTOCOL_struct_ScriptInfo";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_struct_ScriptInfoGenericArgs = function (d) {
	const v = new ACLDPROTOCOL_struct_ScriptInfoGenericArgs();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -19094:
		v.ACLCode = PROTOCOL.u_string(d);
		fflg[0] |= 1;
		break;
	     case -19244:
		v.defaultDataEvent = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     case 32485:
		v.noStaleErrors = PROTOCOL.u_bool(d);
		fflg[0] |= 4;
		break;
	     case 20176:
		v.handleArrayDevices = PROTOCOL.u_bool(d);
		fflg[0] |= 8;
		break;
	     case 26755:
		v.noSettings = PROTOCOL.u_bool(d);
		fflg[0] |= 16;
		break;
	     case 18887:
		v.isPersistent = PROTOCOL.u_bool(d);
		fflg[0] |= 32;
		break;
	     case 5106:
		v.wantImmediateReply = PROTOCOL.u_bool(d);
		fflg[0] |= 64;
		break;
	     case 1695:
		v.startDataEvent = PROTOCOL.u_string(d);
		break;
	     case 7338:
		v.fldArguments = PROTOCOL.u_array(d, PROTOCOL.u_string);
		break;
	     case -25939:
		v.returnSymbols = PROTOCOL.u_array(d, PROTOCOL.u_string);
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_struct_ScriptInfoGenericArgs";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 127)
	    throw "required fields missing when building ACLDPROTOCOL_struct_ScriptInfoGenericArgs";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_struct_ReturnValue = function (d) {
	const v = new ACLDPROTOCOL_struct_ReturnValue();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -27876:
		v.name = PROTOCOL.u_string(d);
		fflg[0] |= 1;
		break;
	     case -16032:
		v.value = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_struct_ReturnValue";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_struct_ReturnValue";
	return v;
    };

    // Define requests of the protocol.

    var ACLDPROTOCOL_request_ExecuteDBFile = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteDBFile.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 52, 138, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteFlatFile = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteFlatFile.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 139, 245, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteCode = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteCode.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 132, 143, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteDBFileMultReply = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteDBFileMultReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 187, 33, 81, 6]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 203, 153]);
	PROTOCOL.m_string(d, this.executeDataEvent);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteFlatFileMultReply = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteFlatFileMultReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 111, 132, 81, 6]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 203, 153]);
	PROTOCOL.m_string(d, this.executeDataEvent);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteCodeMultReply = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.executeDataEvent = "";
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfo();
    };

    ACLDPROTOCOL_request_ExecuteCodeMultReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 126, 1, 81, 6]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 203, 153]);
	PROTOCOL.m_string(d, this.executeDataEvent);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteDBFileGenericArgs = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfoGenericArgs();
    };

    ACLDPROTOCOL_request_ExecuteDBFileGenericArgs.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 153, 210, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.scriptInfo = new ACLDPROTOCOL_struct_ScriptInfoGenericArgs();
    };

    ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 211, 78, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 163, 226]);
	PROTOCOL.m_struct(d, this.scriptInfo);
    };

    var ACLDPROTOCOL_request_GetAcldVersion = function () {
    };

    ACLDPROTOCOL_request_GetAcldVersion.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 195, 248, 81, 0]);
    };

    var ACLDPROTOCOL_request_GetNumScripts = function () {
    };

    ACLDPROTOCOL_request_GetNumScripts.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 188, 160, 81, 0]);
    };

    var ACLDPROTOCOL_request_KillScript = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.ACLCode = "";
    };

    ACLDPROTOCOL_request_KillScript.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 82, 2, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 181, 106]);
	PROTOCOL.m_string(d, this.ACLCode);
    };

    var ACLDPROTOCOL_request_KillMyScripts = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
    };

    ACLDPROTOCOL_request_KillMyScripts.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 145, 76, 81, 2]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
    };

    var ACLDPROTOCOL_request_KillAllScripts = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
    };

    ACLDPROTOCOL_request_KillAllScripts.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 28, 153, 81, 2]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
    };

    var ACLDPROTOCOL_request_UpdateClientInfo = function () {
    };

    ACLDPROTOCOL_request_UpdateClientInfo.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 118, 78, 81, 0]);
    };

    var ACLDPROTOCOL_request_CommandHelp = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.wantOneline = false;
	this.commandName = "";
    };

    ACLDPROTOCOL_request_CommandHelp.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 227, 141, 81, 6]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 171, 221]);
	PROTOCOL.m_bool(d, this.wantOneline);
	PROTOCOL.m_content(d, [18, 253, 127]);
	PROTOCOL.m_string(d, this.commandName);
    };

    var ACLDPROTOCOL_request_FunctionHelp = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.wantOneline = false;
	this.functionName = "";
    };

    ACLDPROTOCOL_request_FunctionHelp.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 178, 52, 81, 6]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 171, 221]);
	PROTOCOL.m_bool(d, this.wantOneline);
	PROTOCOL.m_content(d, [18, 202, 140]);
	PROTOCOL.m_string(d, this.functionName);
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteDBFile = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteDBFile();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteDBFile";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteDBFile";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFile = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteFlatFile();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteFlatFile";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteFlatFile";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteCode = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteCode();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteCode";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteCode";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteDBFileMultReply = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteDBFileMultReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -13415:
		v.executeDataEvent = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteDBFileMultReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteDBFileMultReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFileMultReply = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteFlatFileMultReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -13415:
		v.executeDataEvent = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteFlatFileMultReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteFlatFileMultReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteCodeMultReply = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteCodeMultReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -13415:
		v.executeDataEvent = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfo(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteCodeMultReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteCodeMultReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteDBFileGenericArgs = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteDBFileGenericArgs();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfoGenericArgs(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteDBFileGenericArgs";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteDBFileGenericArgs";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFileGenericArgs = function (d) {
	const v = new ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -23582:
		v.scriptInfo = ACLDPROTOCOL_PROTO.u_struct_ScriptInfoGenericArgs(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_ExecuteFlatFileGenericArgs";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_GetAcldVersion = function (d) {
	if (PROTOCOL.u_tagged_int(0x50, d) !== 0)
	    throw "unknown field when building ACLDPROTOCOL_request_GetAcldVersion";
	return new ACLDPROTOCOL_request_GetAcldVersion();
    };

    ACLDPROTOCOL_PROTO.u_request_GetNumScripts = function (d) {
	if (PROTOCOL.u_tagged_int(0x50, d) !== 0)
	    throw "unknown field when building ACLDPROTOCOL_request_GetNumScripts";
	return new ACLDPROTOCOL_request_GetNumScripts();
    };

    ACLDPROTOCOL_PROTO.u_request_KillScript = function (d) {
	const v = new ACLDPROTOCOL_request_KillScript();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -19094:
		v.ACLCode = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_KillScript";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_request_KillScript";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_KillMyScripts = function (d) {
	const v = new ACLDPROTOCOL_request_KillMyScripts();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building ACLDPROTOCOL_request_KillMyScripts";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -18027)
	    throw "unknown field when building ACLDPROTOCOL_request_KillMyScripts";
	v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
	return v;
    }

    ACLDPROTOCOL_PROTO.u_request_KillAllScripts = function (d) {
	const v = new ACLDPROTOCOL_request_KillAllScripts();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building ACLDPROTOCOL_request_KillAllScripts";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -18027)
	    throw "unknown field when building ACLDPROTOCOL_request_KillAllScripts";
	v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
	return v;
    }

    ACLDPROTOCOL_PROTO.u_request_UpdateClientInfo = function (d) {
	if (PROTOCOL.u_tagged_int(0x50, d) !== 0)
	    throw "unknown field when building ACLDPROTOCOL_request_UpdateClientInfo";
	return new ACLDPROTOCOL_request_UpdateClientInfo();
    };

    ACLDPROTOCOL_PROTO.u_request_CommandHelp = function (d) {
	const v = new ACLDPROTOCOL_request_CommandHelp();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -21539:
		v.wantOneline = PROTOCOL.u_bool(d);
		fflg[0] |= 2;
		break;
	     case -641:
		v.commandName = PROTOCOL.u_string(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_CommandHelp";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_request_CommandHelp";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_request_FunctionHelp = function (d) {
	const v = new ACLDPROTOCOL_request_FunctionHelp();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case -21539:
		v.wantOneline = PROTOCOL.u_bool(d);
		fflg[0] |= 2;
		break;
	     case -13684:
		v.functionName = PROTOCOL.u_string(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_request_FunctionHelp";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_request_FunctionHelp";
	return v;
    };

    // Define replies of the protocol.

    var ACLDPROTOCOL_reply_ExecuteScript = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.status = 0;
	this.numSuppressedSettings = 0;
	this.startTime = 0;
	this.endTime = 0;
	this.returnValue = null;
    };

    ACLDPROTOCOL_reply_ExecuteScript.prototype.marshal = function (d) {
	const nullFields =
	    (this.returnValue === null ? 1 : 0);

	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 175, 21]);
	PROTOCOL.m_tagged_int(0x50, d, (6 - nullFields) * 2);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 182, 196]);
	PROTOCOL.m_int(d, this.numSuppressedSettings);
	PROTOCOL.m_content(d, [18, 87, 159]);
	PROTOCOL.m_int(d, this.startTime);
	PROTOCOL.m_content(d, [18, 121, 11]);
	PROTOCOL.m_int(d, this.endTime);
	if (this.returnValue !== null) {
	    PROTOCOL.m_content(d, [18, 60, 226]);
	    PROTOCOL.m_array(d, this.returnValue, PROTOCOL.m_struct);
	}
    };

    var ACLDPROTOCOL_reply_ExecuteScriptImmediateReply = function () {
	this.header = new ACLDPROTOCOL_struct_Header();
	this.status = 0;
    };

    ACLDPROTOCOL_reply_ExecuteScriptImmediateReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 71, 10, 81, 4]);
	PROTOCOL.m_content(d, [18, 185, 149]);
	PROTOCOL.m_struct(d, this.header);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var ACLDPROTOCOL_reply_GetAcldVersionReply = function () {
	this.status = 0;
	this.version = "";
    };

    ACLDPROTOCOL_reply_GetAcldVersionReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 91, 205, 81, 4]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 47, 16]);
	PROTOCOL.m_string(d, this.version);
    };

    var ACLDPROTOCOL_reply_GetNumScriptsReply = function () {
	this.status = 0;
	this.numScripts = 0;
	this.numCancelledScripts = 0;
    };

    ACLDPROTOCOL_reply_GetNumScriptsReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 231, 27, 81, 6]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 180, 72]);
	PROTOCOL.m_int(d, this.numScripts);
	PROTOCOL.m_content(d, [18, 242, 236]);
	PROTOCOL.m_int(d, this.numCancelledScripts);
    };

    var ACLDPROTOCOL_reply_KillScriptReply = function () {
	this.status = 0;
    };

    ACLDPROTOCOL_reply_KillScriptReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 79, 240, 81, 2]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var ACLDPROTOCOL_reply_KillMyScriptsReply = function () {
	this.status = 0;
	this.numKilled = 0;
    };

    ACLDPROTOCOL_reply_KillMyScriptsReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 166, 10, 81, 4]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 0, 153]);
	PROTOCOL.m_int(d, this.numKilled);
    };

    var ACLDPROTOCOL_reply_KillAllScriptsReply = function () {
	this.status = 0;
	this.numKilled = 0;
    };

    ACLDPROTOCOL_reply_KillAllScriptsReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 103, 85, 81, 4]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 0, 153]);
	PROTOCOL.m_int(d, this.numKilled);
    };

    var ACLDPROTOCOL_reply_CommandHelpReply = function () {
	this.status = 0;
	this.helpStrings = [];
    };

    ACLDPROTOCOL_reply_CommandHelpReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 27, 199, 81, 4]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 79, 4]);
	PROTOCOL.m_array(d, this.helpStrings, PROTOCOL.m_string);
    };

    var ACLDPROTOCOL_reply_FunctionHelpReply = function () {
	this.status = 0;
	this.helpStrings = [];
    };

    ACLDPROTOCOL_reply_FunctionHelpReply.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 191, 1, 128, 24, 18, 135, 180, 81, 4]);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 79, 4]);
	PROTOCOL.m_array(d, this.helpStrings, PROTOCOL.m_string);
    };

    ACLDPROTOCOL_PROTO.u_reply_ExecuteScript = function (d) {
	const v = new ACLDPROTOCOL_reply_ExecuteScript();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case -18748:
		v.numSuppressedSettings = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 22431:
		v.startTime = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 30987:
		v.endTime = PROTOCOL.u_int(d);
		fflg[0] |= 16;
		break;
	     case 15586:
		v.returnValue = PROTOCOL.u_array(d, ACLDPROTOCOL_PROTO.u_struct_ReturnValue);
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_ExecuteScript";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building ACLDPROTOCOL_reply_ExecuteScript";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_ExecuteScriptImmediateReply = function (d) {
	const v = new ACLDPROTOCOL_reply_ExecuteScriptImmediateReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -18027:
		v.header = ACLDPROTOCOL_PROTO.u_struct_Header(d);
		fflg[0] |= 1;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_ExecuteScriptImmediateReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_ExecuteScriptImmediateReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_GetAcldVersionReply = function (d) {
	const v = new ACLDPROTOCOL_reply_GetAcldVersionReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 12048:
		v.version = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_GetAcldVersionReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_GetAcldVersionReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_GetNumScriptsReply = function (d) {
	const v = new ACLDPROTOCOL_reply_GetNumScriptsReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -19384:
		v.numScripts = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case -3348:
		v.numCancelledScripts = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_GetNumScriptsReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building ACLDPROTOCOL_reply_GetNumScriptsReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_KillScriptReply = function (d) {
	const v = new ACLDPROTOCOL_reply_KillScriptReply();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building ACLDPROTOCOL_reply_KillScriptReply";
	if (PROTOCOL.u_tagged_int(0x10, d) !== 17492)
	    throw "unknown field when building ACLDPROTOCOL_reply_KillScriptReply";
	v.status = PROTOCOL.u_int(d);
	return v;
    }

    ACLDPROTOCOL_PROTO.u_reply_KillMyScriptsReply = function (d) {
	const v = new ACLDPROTOCOL_reply_KillMyScriptsReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 153:
		v.numKilled = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_KillMyScriptsReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_KillMyScriptsReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_KillAllScriptsReply = function (d) {
	const v = new ACLDPROTOCOL_reply_KillAllScriptsReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 153:
		v.numKilled = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_KillAllScriptsReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_KillAllScriptsReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_CommandHelpReply = function (d) {
	const v = new ACLDPROTOCOL_reply_CommandHelpReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 20228:
		v.helpStrings = PROTOCOL.u_array(d, PROTOCOL.u_string);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_CommandHelpReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_CommandHelpReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.u_reply_FunctionHelpReply = function (d) {
	const v = new ACLDPROTOCOL_reply_FunctionHelpReply();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 20228:
		v.helpStrings = PROTOCOL.u_array(d, PROTOCOL.u_string);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building ACLDPROTOCOL_reply_FunctionHelpReply";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building ACLDPROTOCOL_reply_FunctionHelpReply";
	return v;
    };

    ACLDPROTOCOL_PROTO.unmarshal_request = function (d) {
	if (d.v.getUint8(d.o) !== 83 || d.v.getUint8(d.o + 1) !== 68 ||
	    d.v.getUint8(d.o + 2) !== 68 || d.v.getUint8(d.o + 3) !== 2)
	    throw "bad SDD header";

	d.o += 4;
	if (PROTOCOL.u_tagged_int(0x50, d) !== 3)
	    throw "badly formed message header";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -1090420712)
	    throw "unknown protocol type";
	switch (PROTOCOL.u_tagged_int(0x10, d)) {
	 case 13450:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteDBFile(d);
	 case -29707:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFile(d);
	 case -31601:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteCode(d);
	 case -17631:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteDBFileMultReply(d);
	 case 28548:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFileMultReply(d);
	 case 32257:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteCodeMultReply(d);
	 case -26158:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteDBFileGenericArgs(d);
	 case -11442:
	    return ACLDPROTOCOL_PROTO.u_request_ExecuteFlatFileGenericArgs(d);
	 case -15368:
	    return ACLDPROTOCOL_PROTO.u_request_GetAcldVersion(d);
	 case -17248:
	    return ACLDPROTOCOL_PROTO.u_request_GetNumScripts(d);
	 case 20994:
	    return ACLDPROTOCOL_PROTO.u_request_KillScript(d);
	 case -28340:
	    return ACLDPROTOCOL_PROTO.u_request_KillMyScripts(d);
	 case 7321:
	    return ACLDPROTOCOL_PROTO.u_request_KillAllScripts(d);
	 case 30286:
	    return ACLDPROTOCOL_PROTO.u_request_UpdateClientInfo(d);
	 case -7283:
	    return ACLDPROTOCOL_PROTO.u_request_CommandHelp(d);
	 case -19916:
	    return ACLDPROTOCOL_PROTO.u_request_FunctionHelp(d);
	 default:
	    throw "unknown request in protocol";
	}
    }

    ACLDPROTOCOL_PROTO.unmarshal_reply = function (d) {
	if (d.v.getUint8(d.o) !== 83 || d.v.getUint8(d.o + 1) !== 68 ||
	    d.v.getUint8(d.o + 2) !== 68 || d.v.getUint8(d.o + 3) !== 2)
	    throw "bad SDD header";

	d.o += 4;
	if (PROTOCOL.u_tagged_int(0x50, d) !== 3)
	    throw "badly formed message header";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -1090420712)
	    throw "unknown protocol type";
	switch (PROTOCOL.u_tagged_int(0x10, d)) {
	 case -20715:
	    return ACLDPROTOCOL_PROTO.u_reply_ExecuteScript(d);
	 case 18186:
	    return ACLDPROTOCOL_PROTO.u_reply_ExecuteScriptImmediateReply(d);
	 case 23501:
	    return ACLDPROTOCOL_PROTO.u_reply_GetAcldVersionReply(d);
	 case -6373:
	    return ACLDPROTOCOL_PROTO.u_reply_GetNumScriptsReply(d);
	 case 20464:
	    return ACLDPROTOCOL_PROTO.u_reply_KillScriptReply(d);
	 case -23030:
	    return ACLDPROTOCOL_PROTO.u_reply_KillMyScriptsReply(d);
	 case 26453:
	    return ACLDPROTOCOL_PROTO.u_reply_KillAllScriptsReply(d);
	 case 7111:
	    return ACLDPROTOCOL_PROTO.u_reply_CommandHelpReply(d);
	 case -30796:
	    return ACLDPROTOCOL_PROTO.u_reply_FunctionHelpReply(d);
	 default:
	    throw "unknown reply in protocol";
	}
    }
}
