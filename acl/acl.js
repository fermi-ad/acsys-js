import { ACNET, RAD50, Status } from "@fnal/acnet";
import {
  ACLDPROTOCOL_PROTO,
  ACLDPROTOCOL_reply_ExecuteScript,
  ACLDPROTOCOL_request_ExecuteCode,
  ACLDPROTOCOL_struct_Header
} from "./acld_protocol-1.0";

export function ACL(shConn = new ACNET()) {
  // Attach an ACNET connection to the object. If the caller
  // specified one, use it. Otherwise create a new one.

  this.con = shConn;

  // The ACLD request message has a header structure which holds
  // ACNET connection information. When the ACNET object notifies us
  // that we're connected, we update the header, which will remain
  // constant until we disconnect again.

  this.header = new ACLDPROTOCOL_struct_Header();
  this.header.requestorNode = 3338;

  this.con.notifyOnConnect(handle => {
    this.header.requestorName = RAD50.to_string(handle);
  });

  function acldReply(cb) {
    return o => {
      if (o.status.isGood()) {
        if (o.msg !== null) {
          o.msg = ACLDPROTOCOL_PROTO.unmarshal_reply({ v: o.msg, o: 0 });
        }

        if (o.msg instanceof ACLDPROTOCOL_reply_ExecuteScript) {
          const reply = {
            status: new Status(o.msg.status),
            supSettings: o.msg.numSuppressedSettings,
            startTime: new Date(o.msg.startTime * 1000),
            endTime: new Date(o.msg.endTime * 1000),
            returnValue: null
          };

          if (o.msg.returnValue !== null) {
            reply.returnValue = o.msg.returnValue;
          }

          cb(null, o);
        } else {
          console.warn("ACLD: received unknown message, " + o.msg);
        }
      } else {
        console.warn("ACLD: received error status, " + o.status);
      }
      return false;
    };
  }

  this.run = (
    source,
    cb,
    options = {
      defaultDataEvent: "",
      staleErrors: true,
      handleArrayDevices: false,
      settings: true,
      persistent: false,
      wantImmediateReply: false,
      substituteDevices: null,
      substituteStrings: null,
      returnSymbols: null
    }
  ) => {
    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        this.run(
          source,
          (err, result) => {
            err ? reject(err) : resolve(result);
          },
          options
        );
      });
    }

    let error;
    if (source === undefined) {
      error = new Error("You must pass an ACL command string");
    } else if (typeof source !== "string") {
      error = new Error("ACL command must be a string");
    } else if (typeof options.defaultDataEvent !== "string") {
      error = new Error("The option defaultDataEvent must be a string");
    } else if (typeof options.staleErrors !== "boolean") {
      error = new Error("The option staleErrors must be a boolean");
    } else if (typeof options.handleArrayDevices !== "boolean") {
      error = new Error("The option handleArrayDevices must be a boolean");
    } else if (typeof options.settings !== "boolean") {
      error = new Error("The option settings must be a boolean");
    } else if (typeof options.persistent !== "boolean") {
      error = new Error("The option persistent must be a boolean");
    } else if (typeof options.wantImmediateReply !== "boolean") {
      error = new Error("The option wantImmediateReply must be a boolean");
    }

    try {
      if (error) throw error;
    } catch (error) {
      console.error(error);
      cb(error);
      return;
    }

    if (this.con.isConnected()) {
      const msg = new ACLDPROTOCOL_request_ExecuteCode();

      msg.header = this.header;
      msg.scriptInfo.ACLCode = source;

      // Transfer options to the script info structure.

      Object.assign(msg.scriptInfo, {
        defaultDataEvent: options.defaultDataEvent,
        noStaleErrors: !options.staleErrors,
        handleArrayDevices: options.handleArrayDevices,
        noSettings: !options.settings,
        isPersistent: options.persistent,
        wantImmediateReply: options.wantImmediateReply,
        substituteDevices: options.substituteDevices,
        substituteStrings: options.substituteStrings,
        returnSymbols: options.returnSymbols
      });

      this.con.oneshot("ACLD@CENTRA", msg, 60000, acldReply(cb));
    } else {
      cb(error, { status: this.con.ACNET_DISCONNECT });
    }
  };
}
