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

    // Define replies of the protocol.

    var DPM_reply_ServiceDiscovery = function () {
	this.load = 0;
	this.serviceLocation = "";
    };

    var DPM_reply_OpenList = function () {
	this.list_id = 0;
    };

    var DPM_reply_AddToList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    var DPM_reply_RemoveFromList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    var DPM_reply_StartList = function () {
	this.list_id = 0;
	this.status = 0;
    };

    var DPM_reply_ListStatus = function () {
	this.list_id = 0;
	this.status = 0;
    };

    var DPM_reply_Status = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
    };

    var DPM_reply_DeviceInfo = function () {
	this.ref_id = 0;
	this.di = 0;
	this.name = "";
	this.description = "";
    };

    var DPM_reply_Scalar = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = 0;
    };

    var DPM_reply_ScalarArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };

    var DPM_reply_Raw = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = new ArrayBuffer();
    };

    var DPM_reply_Text = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = "";
    };

    var DPM_reply_TextArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
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

    var DPM_reply_BasicStatus = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
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
