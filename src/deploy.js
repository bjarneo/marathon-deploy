'use strict';

const request = require('thin-request');
const generateJson = require('./generate-json');
const config = require('./config');

const createEndpoint = data => {
    data.endpoint = data.endpoint + '/v2' + '/apps/' + data.id;

    return data;
};

const doRequest = data => {
    const deployUrl = data.endpoint;

    // Must be removed before we put the data
    delete data.endpoint;

    return request(deployUrl, {
        method: 'PUT',
        body: data,
        json: true
    });
};

module.exports = function deploy(tag, options) {
    if (!options) {
        options = {};
    }

    const opts = {
        user: process.env.USER || null,
        marathonFile: options.marathonFile || 'marathon.json',
        image: '',
        labels: options.labels || {},
        marathonConfig: options.marathonConfig || {}
    };

    if (tag) {
        opts.image = tag;
    } else {
        throw new Error('You need to provide a docker tag!');
    }

    config.set('options', opts);

    return generateJson()
        .then(createEndpoint)
        .then(doRequest)
        .catch(err => {
            throw new Error(err);
        });
};
