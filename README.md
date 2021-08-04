# ACSys JavaScript DPM Client

`acsys` is the interface to Fermilab data acquisition and control.

## Installing

acsys is available via a Fermi hosted npm repository.

```bash
npm i --registry http://adrfads.fnal.gov:4873 @fnal/acsys
```
## Usage
### From Node.js Script

```javascript
const dpm = new DPM();

dpm.addRequest(`M:OUTTMP`,
    (dataReply, deviceInfo) => {
        console.log(dataReply, deviceInfo);
    },
    err => {
        console.error(err);
    }
);

dpm.start();
```

### From Browser Script
TODO write instructions
```html
<script src="dpm.js"></script>
<script>
const dpm = new DPM();
    dpm.addRequest(`M:OUTTMP`,
        (dataReply, deviceInfo) => {
            console.log(dataReply, deviceInfo);
            // TODO append to HTML
        },
        err => {
            console.error(err);
        }
    );

    dpm.start();
</script>
```
TODO use parcel

## Building
To install dependencies on all subpackages run:
```bash
npm run postinstall
```
Is the equivalent of doing `npm install` on each subpackage. This command depends on `subpackage`.

To build all sub-packages and main package:

```bash
npm run build
```

## Pending
- Figure out why installing it doesn't load dependencies beyond.
- Figure out why `pack` doesn't include sub-packages.