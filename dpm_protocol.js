if (DPM_PROTO === undefined) {
    var DPM_PROTO = {};

    // Define requests of the protocol.

    var DPM_request_ServiceDiscovery = function () {
    };

    DPM_request_ServiceDiscovery.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 223, 218, 81, 0];
    };

    var DPM_request_OpenList = function () {
    };

    DPM_request_OpenList.prototype.marshal = function* () {
	const nullFields =
	    (this.location === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 8, 28];
	yield* PROTOCOL.m_tagged_int(0x50, 2 - nullFields);
	if (this.location !== undefined) {
	    yield* [18, 157, 224];
	    yield* PROTOCOL.m_string(this.location);
	}
    };

    var DPM_request_AddToList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.drf_request = "";
    };

    DPM_request_AddToList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 17, 97, 81, 6, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 99, 36];
	yield* PROTOCOL.m_string(this.drf_request);
    };

    var DPM_request_RemoveFromList = function () {
	this.list_id = 0;
	this.ref_id = 0;
    };

    DPM_request_RemoveFromList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 241, 33, 81, 4, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
    };

    var DPM_request_StartList = function () {
	this.list_id = 0;
    };

    DPM_request_StartList.prototype.marshal = function* () {
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

    var DPM_request_ClearList = function () {
	this.list_id = 0;
    };

    DPM_request_ClearList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 195, 9, 81, 2, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
    };

    var DPM_request_StopList = function () {
	this.list_id = 0;
    };

    DPM_request_StopList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 83, 169, 81, 2, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
    };

    DPM_PROTO.u_request_ServiceDiscovery = function (iter) {
	if (PROTOCOL.u_tagged_int(0x50, iter) !== 0)
	    throw new Error("unknown field when building DPM_request_ServiceDiscovery");
	return new DPM_request_ServiceDiscovery();
    };

    DPM_PROTO.u_request_OpenList = function (iter) {
	const v = new DPM_request_OpenList();
	const fflg = new Uint8Array(0);
	var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	     case -25120:
		v.location = PROTOCOL.u_string(iter);
		break;
	     default:
		throw new Error("unknown field when building DPM_request_OpenList");
	    }
	    nFlds -= 2;
	}
	return v;
    };

    DPM_PROTO.u_request_AddToList = function (iter) {
	const v = new DPM_request_AddToList();
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
	     case 25380:
		v.drf_request = PROTOCOL.u_string(iter);
		fflg[0] |= 4;
		break;
	     default:
		throw new Error("unknown field when building DPM_request_AddToList");
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw new Error("required fields missing when building DPM_request_AddToList");
	return v;
    };

    DPM_PROTO.u_request_RemoveFromList = function (iter) {
	const v = new DPM_request_RemoveFromList();
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
	     default:
		throw new Error("unknown field when building DPM_request_RemoveFromList");
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw new Error("required fields missing when building DPM_request_RemoveFromList");
	return v;
    };

    DPM_PROTO.u_request_StartList = function (iter) {
	const v = new DPM_request_StartList();
	const fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, iter);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(iter);
		fflg[0] |= 1;
		break;
	     case 24163:
		v.model = PROTOCOL.u_string(iter);
		break;
	     default:
		throw new Error("unknown field when building DPM_request_StartList");
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 1)
	    throw new Error("required fields missing when building DPM_request_StartList");
	return v;
    };

    DPM_PROTO.u_request_ClearList = function (iter) {
	const v = new DPM_request_ClearList();

	if (PROTOCOL.u_tagged_int(0x50, iter) !== 2)
	    throw new Error("required fields missing when building DPM_request_ClearList");
	if (PROTOCOL.u_tagged_int(0x10, iter) !== -6112)
	    throw new Error("unknown field when building DPM_request_ClearList");
	v.list_id = PROTOCOL.u_int(iter);
	return v;
    }

    DPM_PROTO.u_request_StopList = function (iter) {
	const v = new DPM_request_StopList();

	if (PROTOCOL.u_tagged_int(0x50, iter) !== 2)
	    throw new Error("required fields missing when building DPM_request_StopList");
	if (PROTOCOL.u_tagged_int(0x10, iter) !== -6112)
	    throw new Error("unknown field when building DPM_request_StopList");
	v.list_id = PROTOCOL.u_int(iter);
	return v;
    }

    // Define replies of the protocol.

    var DPM_reply_ServiceDiscovery = function () {
	this.load = 0;
	this.serviceLocation = "";
    };

    DPM_reply_ServiceDiscovery.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 205, 126, 81, 4, 18, 30, 179];
	yield* PROTOCOL.m_int(this.load);
	yield* [18, 17, 175];
	yield* PROTOCOL.m_string(this.serviceLocation);
    };

    var DPM_reply_OpenList = function () {
	this.list_id = 0;
    };

    DPM_reply_OpenList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 52, 158, 81, 2, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
    };

    var DPM_reply_AddToList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    DPM_reply_AddToList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 139, 172, 81, 6, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };

    var DPM_reply_RemoveFromList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    DPM_reply_RemoveFromList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 244, 26, 81, 6, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };

    var DPM_reply_StartList = function () {
	this.list_id = 0;
	this.status = 0;
    };

    DPM_reply_StartList.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 150, 0, 81, 4, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };

    var DPM_reply_ListStatus = function () {
	this.list_id = 0;
	this.status = 0;
    };

    DPM_reply_ListStatus.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 115, 112, 81, 4, 18, 232, 32];
	yield* PROTOCOL.m_int(this.list_id);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };

    var DPM_reply_Status = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
    };

    DPM_reply_Status.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 214, 173, 81, 8, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
    };

    var DPM_reply_DeviceInfo = function () {
	this.ref_id = 0;
	this.di = 0;
	this.name = "";
	this.description = "";
    };

    DPM_reply_DeviceInfo.prototype.marshal = function* () {
	const nullFields =
	    (this.units === undefined ? 2 : 0)
	    + (this.format_hint === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 111, 237];
	yield* PROTOCOL.m_tagged_int(0x50, 12 - nullFields);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 130, 221];
	yield* PROTOCOL.m_int(this.di);
	yield* [18, 147, 28];
	yield* PROTOCOL.m_string(this.name);
	yield* [18, 249, 44];
	yield* PROTOCOL.m_string(this.description);
	if (this.units !== undefined) {
	    yield* [18, 61, 251];
	    yield* PROTOCOL.m_string(this.units);
	}
	if (this.format_hint !== undefined) {
	    yield* [18, 126, 194];
	    yield* PROTOCOL.m_int(this.format_hint);
	}
    };

    var DPM_reply_Scalar = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = 0;
    };

    DPM_reply_Scalar.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 214, 171, 81, 10, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_float(this.data);
    };

    var DPM_reply_ScalarArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };

    DPM_reply_ScalarArray.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 89, 252, 81, 10, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_array(PROTOCOL.m_float, this.data);
    };

    var DPM_reply_Raw = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = new ArrayBuffer();
    };

    DPM_reply_Raw.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 207, 94, 81, 10, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_binary(this.data);
    };

    var DPM_reply_Text = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = "";
    };

    DPM_reply_Text.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 143, 50, 81, 10, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_string(this.data);
    };

    var DPM_reply_TextArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };

    DPM_reply_TextArray.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 50, 123, 81, 10, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 68, 84];
	yield* PROTOCOL.m_int(this.status);
	yield* [18, 127, 56];
	yield* PROTOCOL.m_array(PROTOCOL.m_string, this.data);
    };

    var DPM_reply_AnalogAlarm = function () {
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

    DPM_reply_AnalogAlarm.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 117, 136, 81, 22, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 35, 76];
	yield* PROTOCOL.m_float(this.minimum);
	yield* [18, 226, 136];
	yield* PROTOCOL.m_float(this.maximum);
	yield* [18, 143, 32];
	yield* PROTOCOL.m_bool(this.alarm_enable);
	yield* [18, 96, 54];
	yield* PROTOCOL.m_bool(this.alarm_status);
	yield* [18, 74, 28];
	yield* PROTOCOL.m_bool(this.abort);
	yield* [18, 129, 114];
	yield* PROTOCOL.m_bool(this.abort_inhibit);
	yield* [18, 1, 50];
	yield* PROTOCOL.m_int(this.tries_needed);
	yield* [18, 43, 62];
	yield* PROTOCOL.m_int(this.tries_now);
    };

    var DPM_reply_DigitalAlarm = function () {
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

    DPM_reply_DigitalAlarm.prototype.marshal = function* () {
	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 199, 155, 81, 22, 18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	yield* [18, 79, 29];
	yield* PROTOCOL.m_int(this.nominal);
	yield* [18, 17, 235];
	yield* PROTOCOL.m_int(this.mask);
	yield* [18, 143, 32];
	yield* PROTOCOL.m_bool(this.alarm_enable);
	yield* [18, 96, 54];
	yield* PROTOCOL.m_bool(this.alarm_status);
	yield* [18, 74, 28];
	yield* PROTOCOL.m_bool(this.abort);
	yield* [18, 129, 114];
	yield* PROTOCOL.m_bool(this.abort_inhibit);
	yield* [18, 1, 50];
	yield* PROTOCOL.m_int(this.tries_needed);
	yield* [18, 43, 62];
	yield* PROTOCOL.m_int(this.tries_now);
    };

    var DPM_reply_BasicStatus = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
    };

    DPM_reply_BasicStatus.prototype.marshal = function* () {
	const nullFields =
	    (this.on === undefined ? 2 : 0)
	    + (this.ready === undefined ? 2 : 0)
	    + (this.remote === undefined ? 2 : 0)
	    + (this.positive === undefined ? 2 : 0)
	    + (this.ramp === undefined ? 2 : 0);

	yield* [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 242, 249];
	yield* PROTOCOL.m_tagged_int(0x50, 16 - nullFields);
	yield* [18, 30, 171];
	yield* PROTOCOL.m_int(this.ref_id);
	yield* [18, 213, 91];
	yield* PROTOCOL.m_int(this.timestamp);
	yield* [18, 7, 64];
	yield* PROTOCOL.m_int(this.cycle);
	if (this.on !== undefined) {
	    yield* [18, 92, 1];
	    yield* PROTOCOL.m_bool(this.on);
	}
	if (this.ready !== undefined) {
	    yield* [18, 171, 35];
	    yield* PROTOCOL.m_bool(this.ready);
	}
	if (this.remote !== undefined) {
	    yield* [18, 228, 134];
	    yield* PROTOCOL.m_bool(this.remote);
	}
	if (this.positive !== undefined) {
	    yield* [18, 39, 22];
	    yield* PROTOCOL.m_bool(this.positive);
	}
	if (this.ramp !== undefined) {
	    yield* [18, 146, 56];
	    yield* PROTOCOL.m_bool(this.ramp);
	}
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

    DPM_PROTO.unmarshal_request = function (iter) {
	PROTOCOL.validate_header(2, iter);
	if (PROTOCOL.u_tagged_int(0x50, iter) !== 3)
	    throw new Error("badly formed message header");
	if (PROTOCOL.u_tagged_int(0x10, iter) !== -1321570246)
	    throw new Error("unknown protocol type");
	switch (PROTOCOL.u_tagged_int(0x10, iter)) {
	 case -8230:
	    return DPM_PROTO.u_request_ServiceDiscovery(iter);
	 case 2076:
	    return DPM_PROTO.u_request_OpenList(iter);
	 case 97:
	    return DPM_PROTO.u_request_AddToList(iter);
	 case -3807:
	    return DPM_PROTO.u_request_RemoveFromList(iter);
	 case -8779:
	    return DPM_PROTO.u_request_StartList(iter);
	 case -15607:
	    return DPM_PROTO.u_request_ClearList(iter);
	 case 21417:
	    return DPM_PROTO.u_request_StopList(iter);
	 default:
	    throw new Error("unknown request in protocol");
	}
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
	 default:
	    throw new Error("unknown reply in protocol");
	}
    }
}
