# ACSys JavaScript DPM and ACL Clients

`ACSys` is the interface to Fermilab data acquisition and control.


## Installing

`ACSys` is available via a Fermi hosted npm repository.

```bash
npm install --registry http://adrfads.fnal.gov:4873 @fnal/acsys
```


## DPM Client Usage

### From Node.js

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

You can use browser resolution when building a `React` front-end application, or by using a library like `parcel` or `browserify` in your project.

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

* **Note** this option is recommended since it allows IDEs like VS Code to resolve dependencies and let's you use intelli-sense code completion.


### Using the Bundled Version

Add the `bundle.js` script in your html, and use the global variable `acsys`:

```html
<script src="bundle.js"></script>
<script>
const DPM = acsys.DPM;
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


## ACL Client Usage

You can also use `ACL` client library in the same ways as the `DPM` client library.


### From Node.js

```javascript
import {ACL} from '@fnal/acsys';
const acl = new ACL();
acl.con.notifyOnConnect(async (handle) => {
    try {
        console.log("Handle:", handle);
        let reply = await acl.run("read M:OUTTMP");
        console.log(reply);
    }
    catch (error) {
        console.error(error);
    }
});
```


### Using as a module from browser

```bash
npm install --registry http://adrfads.fnal.gov:4873 @fnal/acsys
```

Import as a module on your javascript file:

```javascript
//index.js
import {ACL} from '@fnal/acsys';
const acl = new ACL();
acl.con.notifyOnConnect(async (handle) => {
    try {
        console.log("Handle:", handle);
        let reply = await acl.run("read M:OUTTMP");
        console.log(reply);
    }
    catch (error) {
        console.error(error);
    }
});
```


### Using the Bundled Version

Add the `bundle.js` script and use the global variable `acsys`:

```html
<script src="bundle.js"></script>
<script>
const ACL = acsys.ACL;
const acl = new ACL();
acl.con.notifyOnConnect(async (handle) => {
    try {
        console.log("Handle:", handle);
        let reply = await acl.run("read M:OUTTMP");
        console.log(reply);
    }
    catch (error) {
        console.error(error);
    }
});

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

To generate a bundle using `parcel`, run:

```bash
npm run bundle
```

## Testing

To run unit tests, using `mocha` and `chai`:

```bash
npm run test
```

**Browser Testing**

You can test on the browser as either module or bundle by running any of these commands:


```bash
# For DPM client
npm run test:dpm:webmodule
npm run test:dpm:webbundle
```

```bash
# For ACL client
npm run test:acl:webmodule
npm run test:acl:webbundle
```


