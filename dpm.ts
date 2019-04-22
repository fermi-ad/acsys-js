import { ACNET, AcnetError, Reply, Status } from "@fnal/acnet";
import {
  DPM_PROTO,
  DPM_request_ServiceDiscovery,
  DPM_request_OpenList,
  DPM_request_StartList,
  DPM_request_ClearList,
  DPM_request_StopList,
  DPM_reply_StartList,
  DPM_request_AddToList,
  DPM_reply_ServiceDiscovery,
  DPM_reply_OpenList,
  DPM_reply_ListStatus,
  DPM_reply_Status,
  DPM_reply_DeviceInfo,
  DPM_reply_Scalar,
  DPM_reply_ScalarArray,
  DPM_reply_Raw,
  DPM_reply_Text,
  DPM_reply_TextArray,
  DPM_reply_AnalogAlarm,
  DPM_reply_DigitalAlarm,
  DPM_reply_BasicStatus,
  DPM_Replies
} from "./dist/dpm_protocol.js";

interface Requests {
  request: string;
  callback: (d: any, i: DPM_reply_DeviceInfo) => void;
  errCallback?: (v: DPM_reply_Status) => void;
  dInfo?: DPM_reply_DeviceInfo;
}

interface DpmContext {
  task: string;
  listId: number;
}

export class DPM {
  private reqs: Array<Requests>;
  private started: boolean;
  private con: ACNET;
  private model?: string;

  // FIXME: Is the assumption on 'context' valid? Will it always get initialized before it's used?

  private context!: Promise<DpmContext>;

  private async discovery(task: string): Promise<string> {
    const msg = new DPM_request_ServiceDiscovery();

    while (true) {
      const reply = await this.con.oneshot(`${task}@MCAST`, msg, 3000);

      if (reply.status.isGood) {
        const loc: string = await this.con.getName(reply.sender);

        console.info(`DPM: Using DPM on ${loc}.`);
        return loc;
      } else {
        console.warn(`DPM: discovery error -- ${reply.status}.`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  private findDPM(server?: string): () => Promise<string> {
    if (server !== undefined) {
      if (server.includes("@")) {
        const [task, node] = server.split("@");

        return async () => Promise.resolve(`${task}@${node}`);
      } else return async () => Promise.resolve(`DPMD@${server}`);
    } else
      return async () => {
        const node = await this.discovery("DPMD");

        return Promise.resolve(`DPMD@${node}`);
      };
  }

  // Converts a Reply from ACNET (in which the embedded message is an ArrayBuffer) into a Reply containing a DPM reply message.

  private static u_reply(reply: Reply<ArrayBuffer>): Reply<DPM_Replies> {
    const { msg, ...copy } = reply;
    const result: Reply<DPM_Replies> = copy;

    if (msg !== undefined) {
      const bin = new Uint8Array(msg, msg.byteLength);

      try {
        result.msg = DPM_PROTO.unmarshal_reply(bin[Symbol.iterator]());
      } catch (e) {
        console.warn(`couldn't decode message -- ignoring`);
      }
    }
    return result;
  }

  // This is a background task that maintains the ACNET connection.

  private async connectionManager(server?: string) {
    let resolve!: (val: DpmContext) => void;

    // Reset the context. These will resolve once we reconnect to ACNET and DPM.

    this.context = new Promise(r => (resolve = r));

    const reqOpenList = new DPM_request_OpenList();
    const disc = await this.findDPM(server);

    while (true) {
      const dpm = await disc();

      // Loop through all the replies.

      const replies = await this.con.stream(dpm, reqOpenList, 1000);

      for await (let ii of replies) {
        const { msg } = DPM.u_reply(ii);

        if (msg !== undefined) {
          if (msg instanceof DPM_reply_OpenList) {
            console.info(`DPM: using list id ${msg.list_id}`);

            // FIXME: We should resolve the context *after* we set up the list with DPM. There could be pending promises to update the list of requests and we don't want them to occur before DPM is in sync with the current state.

            resolve({ listId: msg.list_id, task: dpm });
            await this.sendList();
            if (this.started) await this.start(this.model);
          } else if (msg instanceof DPM_reply_DeviceInfo)
            this.reqs[msg.ref_id].dInfo = msg;
          else if (msg instanceof DPM_reply_Status) {
            const { errCallback } = this.reqs[msg.ref_id];

            if (errCallback !== undefined) errCallback(msg);
            else {
              const s = new Status(msg.status);

              console.info(
                `DPM: error status ${s} for ${this.reqs[msg.ref_id].request}`
              );
            }
          } else if (
            msg instanceof DPM_reply_Scalar ||
            msg instanceof DPM_reply_ScalarArray ||
            msg instanceof DPM_reply_Raw ||
            msg instanceof DPM_reply_Text ||
            msg instanceof DPM_reply_TextArray ||
            msg instanceof DPM_reply_AnalogAlarm ||
            msg instanceof DPM_reply_DigitalAlarm ||
            msg instanceof DPM_reply_BasicStatus
          ) {
            const { callback, dInfo } = this.reqs[msg.ref_id];

            // Forcing Typescript to accept 'tmp.dInfo' being defined. The DPM should have sent us the device info before this message, so the summption is valid. If DPM ever breaks this, then lots of Web apps are going to complain.

            callback(msg, dInfo as DPM_reply_DeviceInfo);
          }
        }
      }

      // Reset our connection parameters so clients block until we re-connect.

      this.context = new Promise(r => (resolve = r));
    }
  }

  constructor(server?: string, shConn?: ACNET) {
    this.reqs = [];
    this.started = false;
    this.con = shConn ? shConn : new ACNET();

    Promise.resolve(server).then(server => this.connectionManager(server));
  }

  private async sendRequest(ii: number): Promise<any> {
    const msg = new DPM_request_AddToList();

    msg.ref_id = ii;
    msg.drf_request = this.reqs[ii].request;

    const { listId, task } = await this.context;

    msg.list_id = listId;
    return this.con.oneshot(task, msg, 1000);
  }

  async addRequest(
    req: string,
    cb: (o: any, i: DPM_reply_DeviceInfo) => boolean,
    ecb?: (e: any) => void
  ) {
    const entry: Requests = { request: req, callback: cb, errCallback: ecb };

    // FIXME: There is a race condition. We are registering the request using an index that doesn't exist yet.

    const reply = await this.sendRequest(this.reqs.length - 1);

    if (reply.status.isGood) this.reqs.push(entry);
    return reply;
  }

  private async sendList(): Promise<void> {
    for (let ii = 0; ii < this.reqs.length; ++ii) await this.sendRequest(ii);
  }

  async start(model?: string): Promise<Reply<DPM_reply_StartList>> {
    const msg = new DPM_request_StartList();

    msg.model = model;

    const { listId, task } = await this.context;

    // We update the state of the DPM object *after* we get the context values because, when reconnecting, the 'started' and 'model' fields would be used to restore the state.

    this.model = model;
    this.started = true;
    msg.list_id = listId;

    const bin = await this.con.oneshot(task, msg, 1000);
    const result = DPM.u_reply(bin);

    if (result.msg && result.msg instanceof DPM_reply_StartList)
      return result as Reply<DPM_reply_StartList>;
    else throw new AcnetError(Status.ACNET_RPLYPACK);
  }

  async clear(): Promise<void> {
    const msg = new DPM_request_ClearList();
    const { listId, task } = await this.context;

    msg.list_id = listId;

    const reply = await this.con.oneshot(task, msg, 1000);

    if (reply.status.isGood) {
      const msg = DPM.u_reply(reply);

      if (msg.msg instanceof DPM_reply_ListStatus) {
        const status: Status = new Status(msg.msg.status);

        if (status.isGood) {
          this.reqs = [];
          return;
        } else throw new AcnetError(status);
      } else throw new AcnetError(Status.ACNET_RPLYPACK);
    } else throw new AcnetError(reply.status);
  }

  async stop(): Promise<void> {
    if (this.started) {
      const msg = new DPM_request_StopList();
      const { listId, task } = await this.context;

      msg.list_id = listId;

      const reply = await this.con.oneshot(task, msg, 1000);

      if (reply.status.isGood) this.started = false;
    }
  }
}
