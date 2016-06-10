Marathon deploy
======
![Travis](https://travis-ci.org/bjarneo/marathon-deploy.svg?branch=master)

Deploy a docker image to Marathon.

Installation
------
```bash
$ npm i --save marathon-deploy
```

Usage
------
```js
const deploy = require('marathon-deploy');

deploy('docker-image-tag')
    .then(res => {
      console.log('Success!');
      console.log('Id: %s', res.deploymentId);
      console.log('Version: %s', res.version);
    }).catch(err => {
        throw new Error(err);
    });
```

Options
```js
const deploy = require('marathon-deploy');

const opts = {
    marathonFile: 'location/to/marathon.json' // default 'marathon.json'
};

deploy('docker-image-tag', opts)
  .then()
  .catch()
```

You can also pass marathon config as an object vs using an own file
```js
const deploy = require('marathon-deploy');

const opts = {
    marathonConfig: {
        endpoint: 'your-endpoint.com',
        etc: 'some more data',
        even: 'more data'
    }
};

deploy('docker-image-tag', opts)
  .then()
  .catch()
```

Tests
------
```bash
$ npm test
```

Inspiration
------
[grunt-marathon](https://github.com/olesku/grunt-marathon/)

Contribution
------
Contributions are appreciated.

License
------
MIT-licensed. See LICENSE.
