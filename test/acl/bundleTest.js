const ACL = acsys.ACL;

// where the results will be displayed
let content = document.getElementById('content');

/**
 * Create new ACL client
 */
 function createACL() {
    let acl = new ACL();
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
    return acl;
}


/**
 * Displays reply on the page
 * @param {ACL_reply} reply the reply
 */
 function displayReply(reply) {
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

//const reqQuery = "READ G:AMANDA@P,30000<-LOGGERDURATION:3600000";
const reqQuery = "READ M:OUTTMP";
const acl = createACL();

/**
 * On start button
 */
document.getElementById('startbtn').addEventListener('click', async () => {
    if (acl.con.isConnected) {
        // request for reading
        let reply = await acl.run(reqQuery);
        displayReply(reply)
    } else {
        console.log("Not connected");
    }
});
