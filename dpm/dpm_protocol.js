import { PROTOCOL } from '@fnal/proto_lib';

export const DPM_PROTO = {};

// Define enumerations of the protocol.

DPM_PROTO.enum = {

};

// Define user-defined structures of the protocol.

export class DPM_struct_RawSetting {
    constructor() {
	this.ref_id = 0;
	this.data = new ArrayBuffer();
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_binary(this.data);
    };
};

export class DPM_struct_ScaledSetting {
    constructor() {
	this.ref_id = 0;
	this.data = [];
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_array(PROTOCOL.m_float, this.data);
    };
};

export class DPM_struct_TextSetting {
    constructor() {
	this.ref_id = 0;
	this.data = [];
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_array(PROTOCOL.m_string, this.data);
    };
};

export class DPM_struct_SettingStatus {
    constructor() {
	this.ref_id = 0;
	this.status = 0;
    };

    *marshal() {
	yield* [81, 4];
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };
};

DPM_PROTO.u_struct_RawSetting = function (iter) {
    const v = new DPM_struct_RawSetting();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_binary(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_struct_RawSetting");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_struct_RawSetting");
    return v;
};

DPM_PROTO.u_struct_ScaledSetting = function (iter) {
    const v = new DPM_struct_ScaledSetting();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_array(PROTOCOL.u_float, iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_struct_ScaledSetting");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_struct_ScaledSetting");
    return v;
};

DPM_PROTO.u_struct_TextSetting = function (iter) {
    const v = new DPM_struct_TextSetting();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_struct_TextSetting");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_struct_TextSetting");
    return v;
};

DPM_PROTO.u_struct_SettingStatus = function (iter) {
    const v = new DPM_struct_SettingStatus();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_struct_SettingStatus");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_struct_SettingStatus");
    return v;
};

// Define requests of the protocol.

export class DPM_request_ServiceDiscovery {
    constructor() {
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 223, 218, 81, 0];
    };
};

export class DPM_request_OpenList {
    constructor() {
    };

    *marshal() {
	const nullFields =
		(this.location === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 8, 28];
	yield* PROTOCOL.m_tagged_int(0x50, 2 - nullFields);
	if (this.location !== undefined) {
	    yield* [18, 157, 224];
	    yield* PROTOCOL.m_string(this.location);
	}
    };
};

export class DPM_request_AddToList {
    constructor() {
	this.list_id = 0;
	this.ref_id = 0;
	this.drf_request = "";
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 17, 97, 81, 6];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 99, 36];
	yield* PROTOCOL.m_string(this.drf_request);
    };
};

export class DPM_request_Authenticate {
    constructor() {
	this.list_id = 0;
	this.token = new ArrayBuffer();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 196, 83, 81, 4];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 141, 161];
	yield* PROTOCOL.m_binary(this.token);
    };
};

export class DPM_request_EnableSettings {
    constructor() {
	this.list_id = 0;
	this.MIC = new ArrayBuffer();
	this.message = new ArrayBuffer();
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 83, 98, 81, 6];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 31, 205];
	yield* PROTOCOL.m_binary(this.MIC);
	yield* [18, 49, 2];
	yield* PROTOCOL.m_binary(this.message);
    };
};

export class DPM_request_RemoveFromList {
    constructor() {
	this.list_id = 0;
	this.ref_id = 0;
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 241, 33, 81, 4];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
    };
};

export class DPM_request_StartList {
    constructor() {
	this.list_id = 0;
    };

    *marshal() {
	const nullFields =
		(this.model === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 221, 181];
	yield* PROTOCOL.m_tagged_int(0x50, 4 - nullFields);
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	if (this.model !== undefined) {
	    yield* [18, 94, 99];
	    yield* PROTOCOL.m_string(this.model);
	}
    };
};

export class DPM_request_ClearList {
    constructor() {
	this.list_id = 0;
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 195, 9, 81, 2];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
    };
};

export class DPM_request_StopList {
    constructor() {
	this.list_id = 0;
    };

    *marshal() {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 83, 169, 81, 2];
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
    };
};

export class DPM_request_ApplySettings {
    constructor() {
	this.user_name = "";
	this.list_id = 0;
    };

    *marshal() {
	const nullFields =
		(this.raw_array === undefined ? 2 : 0)
	    + (this.scaled_array === undefined ? 2 : 0)
	    + (this.text_array === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 198, 120];
	yield* PROTOCOL.m_tagged_int(0x50, 10 - nullFields);
	yield* [18, 86, 72];
	yield* PROTOCOL.m_string(this.user_name);
	yield* [18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	if (this.raw_array !== undefined) {
	    yield* [18, 3, 1];
	    yield* PROTOCOL.m_array(PROTOCOL.m_struct, this.raw_array);
	}
	if (this.scaled_array !== undefined) {
	    yield* [18, 99, 206];
	    yield* PROTOCOL.m_array(PROTOCOL.m_struct, this.scaled_array);
	}
	if (this.text_array !== undefined) {
	    yield* [18, 206, 143];
	    yield* PROTOCOL.m_array(PROTOCOL.m_struct, this.text_array);
	}
    };
};

// Define replies of the protocol.

export class DPM_reply_ServiceDiscovery {
    constructor() {
	this.load = 0;
	this.serviceLocation = "";
    };
};

export class DPM_reply_OpenList {
    constructor() {
	this.list_id = 0;
    };
};

export class DPM_reply_Authenticate {
    constructor() {
    };
};

export class DPM_reply_AddToList {
    constructor() {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };
};

export class DPM_reply_RemoveFromList {
    constructor() {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };
};

export class DPM_reply_StartList {
    constructor() {
	this.list_id = 0;
	this.status = 0;
    };
};

export class DPM_reply_ListStatus {
    constructor() {
	this.list_id = 0;
	this.status = 0;
    };
};

export class DPM_reply_Status {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
    };
};

export class DPM_reply_DeviceInfo {
    constructor() {
	this.ref_id = 0;
	this.di = 0;
	this.name = "";
	this.description = "";
    };
};

export class DPM_reply_Scalar {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = 0;
    };
};

export class DPM_reply_ScalarArray {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };
};

export class DPM_reply_Raw {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = new ArrayBuffer();
    };
};

export class DPM_reply_Text {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = "";
    };
};

export class DPM_reply_TextArray {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };
};

export class DPM_reply_AnalogAlarm {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.minimum = 0;
	this.maximum = 0;
	this.alarm_enable = false;
	this.alarm_status = false;
	this.abort = false;
	this.abort_inhibit = false;
	this.tries_needed = 0;
	this.tries_now = 0;
    };
};

export class DPM_reply_DigitalAlarm {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.nominal = 0;
	this.mask = 0;
	this.alarm_enable = false;
	this.alarm_status = false;
	this.abort = false;
	this.abort_inhibit = false;
	this.tries_needed = 0;
	this.tries_now = 0;
    };
};

export class DPM_reply_BasicStatus {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
    };
};

export class DPM_reply_TimedScalarArray {
    constructor() {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
	this.micros = [];
    };
};

export class DPM_reply_ApplySettings {
    constructor() {
	this.status = [];
    };
};

DPM_PROTO.u_reply_ServiceDiscovery = function (iter) {
    const v = new DPM_reply_ServiceDiscovery();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7859:
	    v.load = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 4527:
	    v.serviceLocation = PROTOCOL.u_string(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_ServiceDiscovery");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_reply_ServiceDiscovery");
    return v;
};

DPM_PROTO.u_reply_OpenList = function (iter) {
    const v = new DPM_reply_OpenList();

    if (PROTOCOL.u_tagged_int(0x50, iter) !== 2)
	throw new Error("required fields missing when building DPM_reply_OpenList");
    if (PROTOCOL.u_tagged_int(0x10, iter) !== -6112)
	throw new Error("unknown field when building DPM_reply_OpenList");
    v.list_id = PROTOCOL.u_int(iter);
    return v;
}

DPM_PROTO.u_reply_Authenticate = function (iter) {
    const v = new DPM_reply_Authenticate();
    const fflg = new Uint8Array(0);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 25400:
	    v.serviceName = PROTOCOL.u_string(iter);
	    break;
	 case -29279:
	    v.token = PROTOCOL.u_binary(iter);
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_Authenticate");
	}
	nFlds -= 2;
    }
    return v;
};

DPM_PROTO.u_reply_AddToList = function (iter) {
    const v = new DPM_reply_AddToList();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -6112:
	    v.list_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_AddToList");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 7)
	throw new Error("required fields missing when building DPM_reply_AddToList");
    return v;
};

DPM_PROTO.u_reply_RemoveFromList = function (iter) {
    const v = new DPM_reply_RemoveFromList();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -6112:
	    v.list_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_RemoveFromList");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 7)
	throw new Error("required fields missing when building DPM_reply_RemoveFromList");
    return v;
};

DPM_PROTO.u_reply_StartList = function (iter) {
    const v = new DPM_reply_StartList();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -6112:
	    v.list_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_StartList");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_reply_StartList");
    return v;
};

DPM_PROTO.u_reply_ListStatus = function (iter) {
    const v = new DPM_reply_ListStatus();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -6112:
	    v.list_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_ListStatus");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 3)
	throw new Error("required fields missing when building DPM_reply_ListStatus");
    return v;
};

DPM_PROTO.u_reply_Status = function (iter) {
    const v = new DPM_reply_Status();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_Status");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 15)
	throw new Error("required fields missing when building DPM_reply_Status");
    return v;
};

DPM_PROTO.u_reply_DeviceInfo = function (iter) {
    const v = new DPM_reply_DeviceInfo();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -32035:
	    v.di = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case -27876:
	    v.name = PROTOCOL.u_string(iter);
	    fflg[0] |= 4;
	    break;
	 case -1748:
	    v.description = PROTOCOL.u_string(iter);
	    fflg[0] |= 8;
	    break;
	 case 15867:
	    v.units = PROTOCOL.u_string(iter);
	    break;
	 case 32450:
	    v.format_hint = PROTOCOL.u_int(iter);
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_DeviceInfo");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 15)
	throw new Error("required fields missing when building DPM_reply_DeviceInfo");
    return v;
};

DPM_PROTO.u_reply_Scalar = function (iter) {
    const v = new DPM_reply_Scalar();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_float(iter);
	    fflg[0] |= 16;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_Scalar");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building DPM_reply_Scalar");
    return v;
};

DPM_PROTO.u_reply_ScalarArray = function (iter) {
    const v = new DPM_reply_ScalarArray();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_array(PROTOCOL.u_float, iter);
	    fflg[0] |= 16;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_ScalarArray");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building DPM_reply_ScalarArray");
    return v;
};

DPM_PROTO.u_reply_Raw = function (iter) {
    const v = new DPM_reply_Raw();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_binary(iter);
	    fflg[0] |= 16;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_Raw");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building DPM_reply_Raw");
    return v;
};

DPM_PROTO.u_reply_Text = function (iter) {
    const v = new DPM_reply_Text();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_string(iter);
	    fflg[0] |= 16;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_Text");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building DPM_reply_Text");
    return v;
};

DPM_PROTO.u_reply_TextArray = function (iter) {
    const v = new DPM_reply_TextArray();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_array(PROTOCOL.u_string, iter);
	    fflg[0] |= 16;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_TextArray");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 31)
	throw new Error("required fields missing when building DPM_reply_TextArray");
    return v;
};

DPM_PROTO.u_reply_AnalogAlarm = function (iter) {
    const v = new DPM_reply_AnalogAlarm();
    const fflg = new Uint8Array(2);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 9036:
	    v.minimum = PROTOCOL.u_float(iter);
	    fflg[0] |= 8;
	    break;
	 case -7544:
	    v.maximum = PROTOCOL.u_float(iter);
	    fflg[0] |= 16;
	    break;
	 case -28896:
	    v.alarm_enable = PROTOCOL.u_bool(iter);
	    fflg[0] |= 32;
	    break;
	 case 24630:
	    v.alarm_status = PROTOCOL.u_bool(iter);
	    fflg[0] |= 64;
	    break;
	 case 18972:
	    v.abort = PROTOCOL.u_bool(iter);
	    fflg[0] |= 128;
	    break;
	 case -32398:
	    v.abort_inhibit = PROTOCOL.u_bool(iter);
	    fflg[1] |= 1;
	    break;
	 case 306:
	    v.tries_needed = PROTOCOL.u_int(iter);
	    fflg[1] |= 2;
	    break;
	 case 11070:
	    v.tries_now = PROTOCOL.u_int(iter);
	    fflg[1] |= 4;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_AnalogAlarm");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 255 || fflg[1] !== 7)
	throw new Error("required fields missing when building DPM_reply_AnalogAlarm");
    return v;
};

DPM_PROTO.u_reply_DigitalAlarm = function (iter) {
    const v = new DPM_reply_DigitalAlarm();
    const fflg = new Uint8Array(2);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 20253:
	    v.nominal = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 4587:
	    v.mask = PROTOCOL.u_int(iter);
	    fflg[0] |= 16;
	    break;
	 case -28896:
	    v.alarm_enable = PROTOCOL.u_bool(iter);
	    fflg[0] |= 32;
	    break;
	 case 24630:
	    v.alarm_status = PROTOCOL.u_bool(iter);
	    fflg[0] |= 64;
	    break;
	 case 18972:
	    v.abort = PROTOCOL.u_bool(iter);
	    fflg[0] |= 128;
	    break;
	 case -32398:
	    v.abort_inhibit = PROTOCOL.u_bool(iter);
	    fflg[1] |= 1;
	    break;
	 case 306:
	    v.tries_needed = PROTOCOL.u_int(iter);
	    fflg[1] |= 2;
	    break;
	 case 11070:
	    v.tries_now = PROTOCOL.u_int(iter);
	    fflg[1] |= 4;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_DigitalAlarm");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 255 || fflg[1] !== 7)
	throw new Error("required fields missing when building DPM_reply_DigitalAlarm");
    return v;
};

DPM_PROTO.u_reply_BasicStatus = function (iter) {
    const v = new DPM_reply_BasicStatus();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 23553:
	    v.on = PROTOCOL.u_bool(iter);
	    break;
	 case -21725:
	    v.ready = PROTOCOL.u_bool(iter);
	    break;
	 case -7034:
	    v.remote = PROTOCOL.u_bool(iter);
	    break;
	 case 10006:
	    v.positive = PROTOCOL.u_bool(iter);
	    break;
	 case -28104:
	    v.ramp = PROTOCOL.u_bool(iter);
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_BasicStatus");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 7)
	throw new Error("required fields missing when building DPM_reply_BasicStatus");
    return v;
};

DPM_PROTO.u_reply_TimedScalarArray = function (iter) {
    const v = new DPM_reply_TimedScalarArray();
    const fflg = new Uint8Array(1);
    var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

    while (nFlds > 0) {
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case 7851:
	    v.ref_id = PROTOCOL.u_int(iter);
	    fflg[0] |= 1;
	    break;
	 case -10917:
	    v.timestamp = PROTOCOL.u_int(iter);
	    fflg[0] |= 2;
	    break;
	 case 1856:
	    v.cycle = PROTOCOL.u_int(iter);
	    fflg[0] |= 4;
	    break;
	 case 17492:
	    v.status = PROTOCOL.u_int(iter);
	    fflg[0] |= 8;
	    break;
	 case 32568:
	    v.data = PROTOCOL.u_array(PROTOCOL.u_float, iter);
	    fflg[0] |= 16;
	    break;
	 case 13357:
	    v.micros = PROTOCOL.u_array(PROTOCOL.u_int, iter);
	    fflg[0] |= 32;
	    break;
	 default:
	    throw new Error("unknown field when building DPM_reply_TimedScalarArray");
	}
	nFlds -= 2;
    }
    if (fflg[0] !== 63)
	throw new Error("required fields missing when building DPM_reply_TimedScalarArray");
    return v;
};

DPM_PROTO.u_reply_ApplySettings = function (iter) {
    const v = new DPM_reply_ApplySettings();

    if (PROTOCOL.u_tagged_int(0x50, iter) !== 2)
	throw new Error("required fields missing when building DPM_reply_ApplySettings");
    if (PROTOCOL.u_tagged_int(0x10, iter) !== 17492)
	throw new Error("unknown field when building DPM_reply_ApplySettings");
    v.status = PROTOCOL.u_array(DPM_PROTO.u_struct_SettingStatus, iter);
    return v;
}

DPM_PROTO.unmarshal_reply = function (iter) {
    PROTOCOL.validate_header(2, iter);
    if (PROTOCOL.u_tagged_int(0x50, iter) !== 3)
	throw new Error("badly formed message header");
    if (PROTOCOL.u_tagged_int(0x10, iter) !== -1321570246)
	throw new Error("unknown protocol type");
    switch (PROTOCOL.u_tagged_int(0x10, iter)) {
     case -12930:
	return DPM_PROTO.u_reply_ServiceDiscovery(iter);
     case 13470:
	return DPM_PROTO.u_reply_OpenList(iter);
     case 7286:
	return DPM_PROTO.u_reply_Authenticate(iter);
     case -29780:
	return DPM_PROTO.u_reply_AddToList(iter);
     case -3046:
	return DPM_PROTO.u_reply_RemoveFromList(iter);
     case -27136:
	return DPM_PROTO.u_reply_StartList(iter);
     case 29552:
	return DPM_PROTO.u_reply_ListStatus(iter);
     case -10579:
	return DPM_PROTO.u_reply_Status(iter);
     case 28653:
	return DPM_PROTO.u_reply_DeviceInfo(iter);
     case -10581:
	return DPM_PROTO.u_reply_Scalar(iter);
     case 23036:
	return DPM_PROTO.u_reply_ScalarArray(iter);
     case -12450:
	return DPM_PROTO.u_reply_Raw(iter);
     case -28878:
	return DPM_PROTO.u_reply_Text(iter);
     case 12923:
	return DPM_PROTO.u_reply_TextArray(iter);
     case 30088:
	return DPM_PROTO.u_reply_AnalogAlarm(iter);
     case -14437:
	return DPM_PROTO.u_reply_DigitalAlarm(iter);
     case -3335:
	return DPM_PROTO.u_reply_BasicStatus(iter);
     case 31282:
	return DPM_PROTO.u_reply_TimedScalarArray(iter);
     case 17344:
	return DPM_PROTO.u_reply_ApplySettings(iter);
     default:
	throw new Error("unknown reply in protocol");
    }
}