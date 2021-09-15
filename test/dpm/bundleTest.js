// importing of the DPM client works with global object
const DPM = acsys.DPM;
let content = {};

//const reqQuery = "G:AMANDA@P,30000<-LOGGERDURATION:3600000";
const reqQuery = "M:OUTTMP";
let dpm;

// after load
window.addEventListener('load', () => {
    console.log('Index loaded!');
    content = document.getElementById('content');
    content.innerHTML += '<p>Document loaded</p>';
    createDPM();
    
    document.getElementById('startbtn').addEventListener('click', start);
    document.getElementById('stopbtn').addEventListener('click', stop);
});

/**
 * Create new DPM client
 */
function createDPM() {
    dpm = new DPM();
    dpm.addRequest(reqQuery, onDataRead, onError).then(function(){
        console.log('OK!');
    }).catch(function(error){
        console.error('ERROR!');
        console.error(error);
    }); 
}

function start() {
    if (dpm) {
        dpm.start();
        console.log('Started!');
    }
}

function stop() {
    if (dpm) {
        dpm.stop();
        console.log('Stopped!');
    }
}

function onError(error){
    console.error('ERROR-!');
    console.error(error);
}

/**
 * When data is read, display it in the html
 * @param {*} data 
 * @param {*} info 
 */
function onDataRead(data, info) {
    // show in console
    console.log(data, info);
    let newDiv = `<hr></hr>`;
    if (info){
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