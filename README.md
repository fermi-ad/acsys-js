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

### From Browser 
You can use this library from the browser either by:
- Linking to the bundled version, or.
- Using browser module resolution for javascript in your javascript project.


### Using the Bundled Version

Add the ```bundle.js``` script in your javascript / html.

```html
<script src="bundle.js"></script>
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

### Using as a module from browser
You can use browser resolution by using a library like ```browserify``` or ```bundle```.

TODO write example.

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

- Figure out why `pack` doesn't include sub-packages.