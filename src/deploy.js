'use strict';

const request = require('request-promise');
const generateJson = require('./generate-json');

module.exports = function deploy(tag, options) {
    if (!options) {
        options = {};
    }

    const opts = {
        user: process.env.USER || null,
        marathonFile: options.marathonFile || 'marathon.json',
        image: ''
    };

    if (tag) {
        opts.image = tag;
    } else {
        throw new Error('You need to provide a docker tag!');
    }

    const json = generateJson(opts);

    const deployUrl = json.endpoint + '/v2' + '/apps/' + json.id;

    // Must be removed before we put the data
    delete json.endpoint;

    return request({
        url: deployUrl,
        json: true,
        method: 'PUT',
        body: json
    })
    .then(res => res)
    .catch(err => {
        throw new Error(err);
    });
};
