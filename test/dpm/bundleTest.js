// importing of the DPM client works with global object
const DPM = acsys.DPM;

// where the results will be displayed
let content = document.getElementById('content');

/**
 * On error callback
 * @param {*} error 
 */
function onError(error) {
    console.error('ERROR-!');
    console.error(error);
}

/**
 * When data is read (callback), display it in the html
 * @param {DPM_Replies} data 
 * @param {DPM_reply_DeviceInfo} info 
 */
function onDataRead(data, info) {
    // show in console
    console.log(data, info);
    let newDiv = `<hr></hr>`;
    if (info) {
        newDiv += `<div>Ref Id: ${info.ref_id}</div>`;
        newDiv += `<div>DI: ${info.di}</div>`;
        newDiv += `<div>name: ${info.name}</div>`;
        newDiv += `<div>description: ${info.description}</div>`;
        newDiv += `<div>units: ${info.units}</div>`;
    }
    if (data) {
        newDiv += `<div>Ref Id: ${data.ref_id}</div>`;
        newDiv += `<div>Timestamp: ${data.timestamp}</div>`;
        newDiv += `<div>${new Date(data.timestamp).toLocaleString()}</div>`;
        if (data.data) {
            newDiv += `<div><b>Data</b></div>`;
            if (data.data instanceof Array) {
                for (const row of data.data) {
                    newDiv += `<div>${row}</div>`;
                }
            } else {
                newDiv += `<div>${data.data}</div>`;
            }
        }
        // if data have micros info
        if (data.micros) {
            newDiv += `<div><b>Micros</b></div>`;
            if (data.micros instanceof Array) {
                console.log(new Date(data.micros[0] / 1000));
                for (const row of data.micros) {
                    newDiv += `<div>${new Date(row).toLocaleString()}</div>`;
                }
            }
            else {
                newDiv += `<div>${new Date(data.micros / 1000).toLocaleString()}</div>`;
            }
        }
    }
    content.innerHTML += newDiv;
}

/**
 * Create new DPM client
 * @param {string} reqQuery the Query
 */
function createDPM(reqQuery) {
    let dpm = new DPM();
    dpm.addRequest(reqQuery, onDataRead, onError).then(function () {
        console.log('OK!');
    }).catch(function (error) {
        console.error('ERROR!');
        console.error(error);
    });
    return dpm;
}

//const reqQuery = "G:AMANDA@P,30000<-LOGGERDURATION:3600000";
const reqQuery = "M:OUTTMP";
const dpm = createDPM(reqQuery);

// start and stop buttons
document.getElementById('startbtn').addEventListener('click', () => {
    dpm.start();
    console.log('Started!');
});

document.getElementById('stopbtn').addEventListener('click', () => {
    dpm.stop();
    console.log('Stopped!');
});
