'use strict';

const pkg = require('../package.json');

module.exports = function put(opts) {
    const data = JSON.stringify(opts.body);

    return new Promise((resolve, reject) => {
        // Note: If require('url') is put outside of put function it will not
        // work for some reason..
        const url = require('url').parse(opts.url);

        // Data-Driven decision on which protocol to use
        const fn = url.protocol === 'https:' ? require('https') : require('http');

        const req = fn.request({
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            protocol: url.protocol,
            method: 'PUT',
            headers: {
                'User-Agent': `${pkg.name}/${pkg.version} (https://github.com/bjarneo/marathon-deploy)`,
                'Content-Length': data.length,
                'Content-Type': 'application/json'
            }
        }, res => {
            const body = [];

            res.setEncoding('utf8');

            res.on('data', chunk => body.push(chunk));

            res.on('end', () => resolve(JSON.parse(body.join(''))));
        });

        req.write(data);

        req.on('error', reject);

        req.end();
    });
};
