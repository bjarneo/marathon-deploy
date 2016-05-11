'use strict';

const put = require('./put');
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

    return put({
        url: deployUrl,
        body: data
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
        labels: options.labels || {}
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
