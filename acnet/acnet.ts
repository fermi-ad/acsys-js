import ISOWebSocket from 'isomorphic-ws'
import {CloseEvent, MessageEvent} from 'ws';
// This namespace groups together RAD50 manipulation functions. We don't want
// the end-user to know we're using RAD50 or to give them access to these
// functions since it complicates things so they're aren't exported.

namespace RAD50 {
    // Converts a string into a RAD50 value. The RAD50 character set is limited
    // so characters not in the set are mapped to the 'space' character.

    export function to_rad50(s: string): number {
        let v1 = 0;
        let v2 = 0;

        const charToIndex = (c: string): number => {
            if (c >= "A" && c <= "Z") return c.charCodeAt(0) - 64;
            else if (c >= "a" && c <= "z") return c.charCodeAt(0) - 96;
            else if (c >= "0" && c <= "9") return c.charCodeAt(0) - 18;
            else if (c == "$") return 27;
            else if (c == ".") return 28;
            else if (c == "%") return 29;
            return 0;
        };

        for (let ii = 0; ii < 6; ++ii) {
            const c = ii < s.length ? s.charAt(ii) : " ";

            if (ii < 3) v1 = v1 * 40 + charToIndex(c);
            else v2 = v2 * 40 + charToIndex(c);
        }
        return (v2 << 16) | v1;
    }

    // Converts a RAD50 value into a string containing the RAD50
    // translation.

    export function to_string(r50: number): string {
        const chars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ$.%0123456789";
        let s = [];
        let v1 = r50 & 0xffff;
        let v2 = (r50 >> 16) & 0xffff;

        for (let ii = 0; ii < 3; ii++) {
            s[2 - ii] = chars.charAt(v1 % 40);
            v1 /= 40;
            s[5 - ii] = chars.charAt(v2 % 40);
            v2 /= 40;
        }
        return s.join("").trim();
    }
}

// A type representing an ACNET status value. ACNET status values are signed,
// 16-bit integers where the lower 8 bits define the facility code and the upper
// 8 bits are the error code residing in the facility. A zero error code
// indicates success, a positive error code is a warning, and a negative code is
// a fatal error which always terminates an ACNET request.

export class Status {
    private status: number;

    // Builds a Status from a facility and error code. If the error code isn't
    // provided, it is assumed the facility code represents the entire, raw
    // value of the status.

    constructor(f: number, e?: number) {
        this.status = e === undefined ? f : e * 256 + f;
    }

    // Returns the raw integer representing the Status.

    get raw(): number {
        return this.status;
    }

    // Returns true if the Status represents a non-fatal status.

    get isGood(): boolean {
        return this.status >= 0;
    }

    // Returns true is the Status represents a fatal status.

    get isBad(): boolean {
        return this.status < 0;
    }

    // Converts a Status to a string in a format commonly used in Fermilab
    // applications.

    toString(): string {
        return `[${this.status & 255} ${Math.floor(this.status / 256)}]`;
    }

    // Returns a boolean indicating the equality between two status values.

    equals(o: Status): boolean {
        return this.status === o.status;
    }

    // These are a subset of all ACNET status values defined at Fermilab. These
    // are the ones commonly used in our Javascript modules.

    static ACNET_PEND: Status = new Status(1, 1);
    static ACNET_REPLY_TIMEOUT: Status = new Status(1, 3);
    static ACNET_SUCCESS: Status = new Status(1, 0);
    static ACNET_RPLYPACK: Status = new Status(1, -4);
    static ACNET_CANCELED: Status = new Status(1, -26);
    static ACNET_NONODE: Status = new Status(1, -30);
    static ACNET_DISCONNECT: Status = new Status(1, -34);
    static ACNET_UTIME: Status = new Status(1, -49);
}

// Defines a Javascript exception type for reporting ACNET status. In most
// cases, you simply want to use Status to pass around these values. The
// AcnetError type will save a stack trace, so it should only be used when you
// want to diagnose where errors occurred.

export class AcnetError extends Error {
    status: Status;

    constructor(s: Status) {
        super(s.toString());
        this.status = s;
    }
}

// Non-exported helper function to split an ACNET address of the form
// "TASK@NODE" into a tuple ["TASK", "NODE"].

function splitAddr(a: string) {
    const part = a.split("@");

    if (part.length === 2) return part;
    else throw new Error(`ACNET: invalid address -- ${a}`);
}

// Returns the Fermilab URL that proxies our WebSockets.

function getHost() {
    return "ws://acsys-proxy.fnal.gov:6805/acnet";
}

// Defines a type, Reply<T>, which describes the data returned in an ACNET reply
// packet. The 'status' field contains the Status value sent in the ACNET
// header. The 'sender' field contains the trunk/node address of the system that
// sent the reply. The optional 'msg' field contains the payload of the reply.

export interface Reply<T> {
    status: Status;
    sender: number;
    msg?: T;
}

// Defines the signature of a function that cancels a request.

interface CanFunc {
    (): Promise<Status>;
}

type RawReply = Reply<Uint8Array>;

// Defines the signature of a function that resolves a value of an asynchronous
// iterator.

interface Resolver {
    (val: IteratorResult<RawReply>): void;
}

// Defines the signature of a function that rejects a value of an asynchronous
// iterator.

interface Rejecter {
    (val: Status): void;
}

type AsyncIteratorResult<T> = Promise<IteratorResult<T>>;

// 'Replies' is an asynchronous iterator that returns replies from an ACNET
// request.

export class Replies implements AsyncIterableIterator<RawReply> {
    private cancelFunction: CanFunc;

    // The queue holds Promises that will resolve as replies are received. All
    // the methods of this class follow the contract that only the 'next()'
    // method is allowed to remove entries from the queue. A further requirement
    // is that there is always at least one Promise in the queue.

    private queue: Array<AsyncIteratorResult<RawReply>>;

    // If an unresolved Promise is inserted in the queue, 'res' will hold the
    // functions to resolve or reject it. By storing the two functions in a
    // "tuple", we have guaranteed -- at compile time -- that either both
    // functions are defined or neither are.

    private res?: [Resolver, Rejecter];

    // Creates a new `Replies` object with a pending Promise pre-stuffed in the
    // queue.

    constructor(canFunc: CanFunc) {
        this.queue = [
            new Promise((resolve, reject) => {
                this.res = [resolve, reject];
            })
        ];
        this.cancelFunction = canFunc;
    }

    resolve(value: RawReply, done: boolean): void {
        // If `res` is undefined, then all promises in the queue have been
        // resolved. This situation requires we append the reply to the end of
        // the queue as a resolved Promise.

        if (this.res === undefined) {
            this.queue.push(Promise.resolve({ value, done }));
        } else {
            const [f, _] = this.res;

            // Update the state to show we've resolved the only unsolved
            // promise. Once the object is in the new, correct state, call the
            // resolving function.

            delete this.res;
            f({ value, done });
        }
    }

    reject(val: Status): void {
        // If `res` is undefined, then all promises in the queue have been
        // resolved. This situation requires we append the reply to the end of
        // the queue as a rejected Promise.

        if (this.res === undefined) {
            this.queue.push(Promise.reject(val));
        } else {
            const [_, f] = this.res;

            // Update the state to show we've resolved the only unsolved
            // promise (albiet as a rejection.) Once the object is in the new
            // correct state, call the rejecting function.

            delete this.res;
            f(val);
        }
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<RawReply> {
        return this;
    }

    next(): AsyncIteratorResult<RawReply> {
        // This function removes the first entry from the queue. It also
        // enforces the requirement that the queue can't be empty. If popping
        // the first entry results in an empty queue, it appends an unresolved
        // Promise and saves the resolving functions to `res`.

        const pop = () => {
            this.queue.shift();
            if (this.queue.length === 0)
                this.queue.push(
                    new Promise((resolve, reject) => {
                        this.res = [resolve, reject];
                    })
                );
        };

        // Grab the first (oldest) item from the queue. The queue will never be
        // empty so this should always succeed.

        const tmp = this.queue[0];

        // If the promise has been resolved, we can pop it from the queue.

        if (this.res === undefined) {
            pop();
        } else {
            const [rsf, rjf] = this.res;

            // At this point, we know we have an unresolved Promise and this
            // call to `.next()` will return a Promise that will eventually used
            // with an `await` expression. We rewrite the resolve functions to
            // remove this entry before resolving.

            this.res = [
                (val: IteratorResult<RawReply>) => {
                    pop();
                    rsf(val);
                },
                (val: Status) => {
                    pop();
                    rjf(val);
                }
            ];
        }

        return tmp;
    }

    // This method gets called automatically when a `for await` loop terminates
    // early. It cancels the request to free up ACNET resources.

    return(val?: any): AsyncIteratorResult<RawReply> {
        return this.cancelFunction().then(() => {
            return {
                value: { status: Status.ACNET_CANCELED, sender: 0 },
                done: true
            };
        });
    }
}

export interface Marshalable {
    marshal(): IterableIterator<number>;
}

// This is a Typescript helper function. The 'is' keyword in the return type
// tells Typescript that, if this function returns 'true', the parameter 'val'
// can be assumed to be of type 'Marshalable'.

function isMarshalable(val: Marshalable | Uint8Array): val is Marshalable {
    return (<Marshalable>val).marshal !== undefined;
}

type RawHandle = number;
type Handle = string;

interface ArrayBufferCallback {
    (buf: ArrayBuffer): void;
}

interface VoidCallback {
    (): void;
}

interface HandleCallback {
    (handle: Handle): void;
}

interface RawHandleCallback {
    (handle: RawHandle): void;
}

interface ResolveReply {
    (rpy: Reply<Uint8Array>, done: boolean): void;
}

interface RejectReply {
    (s: Status): void;
}

// Constructor of ACNET objects. An ACNET object manages a connection
// to 'acnetd' which allows a web application to perform ACNET
// communications.

export class ACNET {
    private onConnect: Array<HandleCallback>;
    private onDisconnect: Array<VoidCallback>;

    private ackq: Array<ArrayBufferCallback>;
    private handle: Promise<RawHandle>;
    private resolveHandle?: RawHandleCallback;
    private requests: {
        [idx: number]: {
            resolve: ResolveReply;
            reject: RejectReply;
        };
    };
    private socket?: ISOWebSocket;

    private static bldNak: (s: Status) => ArrayBuffer = (() => {
        const nak = new ArrayBuffer(6);
        const dv = new DataView(nak);

        return (s: Status) => {
            dv.setUint32(0, 0x00010000);
            dv.setInt16(4, s.raw);
            return nak;
        };
    })();

    constructor() {
        this.onConnect = [];
        this.onDisconnect = [];
        this.ackq = [];
        this.handle = new Promise(
            (resolve: RawHandleCallback) => (this.resolveHandle = resolve)
        );
        this.requests = {};
        this.prepSocket();
    }

    notifyOnDisconnect(f: VoidCallback): void {
        this.onDisconnect.push(f);
    }

    notifyOnConnect(f: HandleCallback): void {
        this.onConnect.push(f);
        if (this.isConnected && this.resolveHandle !== undefined)
            this.handle.then(h => f(RAD50.to_string(h)));
    }

    private prepSocket(): void {
        const xlat_status = async (
            dv: DataView
        ): Promise<[Status, boolean]> => {
            const s = new Status(dv.getInt16(4, true));

            if (
                s.equals(Status.ACNET_PEND) ||
                s.equals(Status.ACNET_REPLY_TIMEOUT)
            ) {
                const reqId = dv.getUint16(16, true);

                await this.cancel(reqId);
                return [Status.ACNET_SUCCESS, true];
            } else {
                return [s, (dv.getUint16(2, true) & 1) === 0];
            }
        };

        this.socket = new ISOWebSocket(getHost(), "acnet-client");
        this.socket.binaryType = "arraybuffer";

        this.socket.onclose = (event: CloseEvent) => {
            delete this.socket;

            this.handle = new Promise(
                (resolve: RawHandleCallback) => (this.resolveHandle = resolve)
            );
            for (const ii of this.onDisconnect) ii();

            // Loop through the open requests and send them a fatal
            // error message (indicating the request is closed.) The
            // status of the error is ACNET_DISCONNECT.

            for (const ii in this.requests)
                this.requests[ii].reject(Status.ACNET_DISCONNECT);
            this.requests = {};

            // Build a NAK packet indicating an ACNET disconnect.

            const nak = ACNET.bldNak(Status.ACNET_DISCONNECT);

            // Loop through pending commands and feed them the
            // disconnect status so they'll retry.

            for (const ii of this.ackq) ii(nak);
            this.ackq = [];

            // Wait five seconds and then try to make a new connection
            // to ACNET.

            console.warn("ACNET: connection with acnetd is broken.");
            setTimeout(() => {
                console.info("ACNET: retrying connection.");
                this.prepSocket();
            }, 5000);
        };

        this.socket.onopen = async () => {
            const buf = new Uint8Array(18);
            let dv = new DataView(buf.buffer);

            dv.setUint32(0, 0x00010001);
            dv.setUint32(4, 0);
            dv.setUint32(8, 0);
            dv.setUint32(12, 0);
            dv.setUint16(16, 0);

            // We assert that 'this.socket' exists and is valid
            // because this function is attached to the 'onOpen'
            // handler for the socket, so it *has* to exist.

            const ack = await this.xact(buf);

            dv = new DataView(ack);

            const handle = dv.getUint32(7);

            this.resolveHandle!(handle);
            delete this.resolveHandle;

            console.info(`ACNET: connected as '${RAD50.to_string(handle)}'.`);

            const str_handle = RAD50.to_string(handle);

            for (const ii of this.onConnect) ii(str_handle);
        };

        this.socket.onmessage = async (event: MessageEvent) => {
            const buf = event.data as ArrayBuffer;
            const dv = new DataView(buf);

            // If the first, 16-bit word of the packet is 2, then it's
            // a response to a command. Otherwise it's an ACNET header
            // and represents a reply to an active request.

            if (dv.getUint16(0) === 2) {
                const ack = this.ackq.shift();

                // There must be a function in the `ackq`, unless there's a
                // serious bug in the code. Send the ACK packet to the ACK
                // function.

                ack!(buf);
            } else {
                const [s, last] = await xlat_status(dv);
                const rqid = dv.getUint16(16, true);

                if (s.isGood) {
                    const svr = dv.getUint16(6, false);
                    const msg: Reply<Uint8Array> = {
                        sender: svr,
                        status: s
                    };

                    {
                        const msgLen = dv.getUint16(18, true) - 18;

                        if (msgLen > 0)
                            msg.msg = new Uint8Array(buf, 20, msgLen);
                    }

                    const f = this.requests[rqid].resolve;

                    if (last) delete this.requests[rqid];

                    f(msg, last);
                } else {
                    const f = this.requests[rqid].reject;

                    delete this.requests[rqid];
                    f(s);
                }
            }
        };
    }

    get isConnected(): boolean {
        return this.socket !== undefined && this.resolveHandle === undefined;
    }

    // This function returns a promise which will resolve to a binary
    // buffer holding the ACK response to the command that was sent.

    private async xact(b: Uint8Array): Promise<ArrayBuffer> {
        return new Promise((resolve: ArrayBufferCallback, reject) => {
            if (this.socket) {
                this.socket.send(b);
                this.ackq.push(resolve);
            } else reject(Status.ACNET_DISCONNECT);
        });
    }

    private async cancel(rqid: number): Promise<Status> {
        const handle = await this.handle;
        const b = new Uint8Array(14);
        let dv = new DataView(b.buffer);

        dv.setUint32(0, 0x00010008);
        dv.setUint32(4, handle);
        dv.setUint16(12, rqid);

        const ack = await this.xact(b);

        dv = new DataView(ack);
        return Promise.resolve(new Status(dv.getInt16(4, true)));
    }

    // Sends a request to acnetd to translate a RAD50 name to a
    // trunk/node address. The result is given to the function
    // specified by the second argument. If the name was successfully
    // found, an integer representing the address is passed. Any error
    // results in 'undefined' being passed.

    async getNode(name: string): Promise<number> {
        const handle = await this.handle;
        const b = new Uint8Array(16);
        let dv = new DataView(b.buffer);

        dv.setUint32(0, 0x0001000b);
        dv.setUint32(4, handle);
        dv.setUint32(12, RAD50.to_rad50(name));

        const data = await this.xact(b);

        dv = new DataView(data, 2);

        const s = new Status(dv.getInt16(2));

        if (dv.getUint16(0) === 4 && s.isGood) return dv.getUint16(4);
        else throw new AcnetError(s);
    }

    async getName(node: number): Promise<string> {
        const handle = await this.handle;

        const b = new Uint8Array(14);
        let dv = new DataView(b.buffer);

        dv.setUint32(0, 0x0001000c);
        dv.setUint32(4, handle);
        dv.setUint16(12, node);

        const data = await this.xact(b);

        dv = new DataView(data, 2);

        const s = new Status(dv.getInt16(2));

        if (dv.getUint16(0) === 5 && s.isGood)
            return RAD50.to_string(dv.getUint32(4));
        else throw new AcnetError(s);
    }

    async getLocalNode(): Promise<number> {
        const handle = await this.handle;
        const b = new Uint8Array(12);
        let dv = new DataView(b.buffer);

        dv.setUint32(0, 0x0001000d);
        dv.setUint32(4, handle);

        const data = await this.xact(b);

        dv = new DataView(data, 2);

        const s = new Status(dv.getInt16(2));

        if (dv.getUint16(0) === 4 && s.isGood) return dv.getUint16(4);
        else throw new AcnetError(s);
    }

    // Appends to an Uint8Array another Uint8Array or a marshalled
    // message.

    private async makeRequest(
        dst: string,
        mult: boolean,
        obj: Marshalable | Uint8Array,
        tmo: number
    ): Promise<number> {
        const buf = new Uint8Array(65536);
        const part = splitAddr(dst);

        // If the node name starts with '#', we have a trunk/node
        // value which doesn't require a lookup.

        const node =
            part[1][0] == "#"
                ? parseInt(part[1].slice(1))
                : await this.getNode(part[1]);

        let dv = new DataView(buf.buffer);
        const handle = await this.handle;

        // Build the request packet header.

        dv.setUint32(0, 0x00010012);
        dv.setUint32(4, handle);
        dv.setUint32(12, RAD50.to_rad50(part[0]));
        dv.setUint16(16, node);
        dv.setUint16(18, mult ? 1 : 0);
        dv.setUint32(20, tmo);

        const payload = isMarshalable(obj)
            ? Uint8Array.from(obj.marshal())
            : obj;

        buf.set(payload, 24);

        const d = await this.xact(
            new Uint8Array(buf.buffer, 0, 24 + payload.byteLength)
        );

        dv = new DataView(d, 2);

        const s = new Status(dv.getInt16(2));

        if (s.isGood) return dv.getUint16(4);
        else throw new AcnetError(s);
    }

    // Lets a client send a request to the specified destination. The
    // destination is given in "TASK@NODE" format.

    async oneshot(
        dst: string,
        obj: Marshalable | Uint8Array,
        tmo: number
    ): Promise<Reply<Uint8Array>> {
        const reqId = await this.makeRequest(dst, false, obj, tmo);

        return new Promise((resolve: ResolveReply, reject: RejectReply) => {
            this.requests[reqId] = { resolve, reject };
        });
    }

    async stream(
        dst: string,
        obj: Marshalable | Uint8Array,
        tmo: number
    ): Promise<Replies> {
        const reqId = await this.makeRequest(dst, true, obj, tmo);
        const con = this;
        const stream = new Replies(() => con.cancel(reqId));

        this.requests[reqId] = {
            resolve: (val: Reply<Uint8Array>, mult: boolean) =>
                stream.resolve(val, mult),
            reject: (val: Status) => stream.reject(val)
        };

        return stream;
    }
}
