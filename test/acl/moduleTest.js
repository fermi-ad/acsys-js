import { ACL } from "@fnal/acsys";
import 'regenerator-runtime/runtime';
let content = {};

//const reqQuery = "G:AMANDA@P,30000<-LOGGERDURATION:3600000";
const reqQuery = "M:OUTTMP";
let acl;

// after load
window.addEventListener('load', () => {
    console.log('Index loaded!');
    content = document.getElementById('content');
    content.innerHTML += '<p>Document loaded</p>';
    createACL();
    
    document.getElementById('startbtn').addEventListener('click', start);
});

/**
 * Create new ACL client
 */
function createACL() {
    acl = new ACL();
    acl.con.notifyOnConnect(async(handle) => {
        try {
            console.log("Handle:", handle);
            content.innerHTML += '<p>Client connected</p>';
        }
        catch (error) {
            console.log("ERROR!!!!");
            console.error(error);
        }
    });
}

async function start() {
    if (acl && acl.con.isConnected) {
        let reply = await acl.run("READ m:outtmp");
        onDataRead(reply)
    } else {
        console.log("Not connected");
    }
}

/**
 * When data is read, display it in the html
 * @param {*} data 
 * @param {*} info 
 */
function onDataRead(reply) {
    // show in console
    console.log(reply);
    let newDiv = `<hr></hr>`;
    if (reply) {
        newDiv += `<div>Status: ${reply.status}</div>`;
        newDiv += `<div>Sup Settings: ${reply.supSettings}</div>`;
        newDiv += `<div>Start: ${new Date(reply.startTime).toLocaleString()}</div>`;
        newDiv += `<div>End: ${new Date(reply.endTime).toLocaleString()}</div>`;
        newDiv += `<div><b>Return Value</b></div>`;
        for (const row of reply.returnValue) {
            newDiv += `<div>name: ${row.name}</div>`;
            newDiv += `<div>value: ${row.value}</div>`;
        }
    }
    
    content.innerHTML += newDiv;
}