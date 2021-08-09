# ACSys JavaScript DPM Client

`acsys` is the interface to Fermilab data acquisition and control.

## Installing

'''ACSys''' is available via a Fermi hosted npm repository.

```bash
npm install --registry http://adrfads.fnal.gov:4873 @fnal/acsys
```
## Usage
### From Node.js Script

```javascript
import {DPM} from '@fnal/acsys';
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
- Using a node-like module package for the browser, in your project, or.
- Linking to the bundled version.

### Using as a module from browser
You can use browser resolution by using a library like ```parcel``` or ```browserify``` in your project.

Start by installing from Fermilab registry:

```bash
npm install --registry http://adrfads.fnal.gov:4873 @fnal/acsys
```

Import as a module on your javascript file:


```javascript
//index.js
import {DPM} from '@fnal/acsys';
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

And from your HTML files.

```html
<head>
    <script src="index.js"></script>
</head>
```

* '''Note''' this option is recommended since it allows IDEs like VS Code to resolve 
dependencies and let's you use intelli-sense code completion.

### Using the Bundled Version

Add the ```bundle.js``` script in your javascript / html.

```html
<script src="bundle.js"></script>
<script>
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
</script>
```


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

To generate a bundle using ```parcel```, run:

```bash
npm run bundle
```
