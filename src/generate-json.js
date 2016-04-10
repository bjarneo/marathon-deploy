'use strict';

const os = require('os');
const fs = require('fs');
const template = require('mini-template-engine');

module.exports = function generateJson(opts) {
    // Reading the file sync
    // because in this case it really doesn't need to be performant
    const json = JSON.parse(
        template(
            fs.readFileSync(opts.marathonFile, 'utf-8'),
            {
                marathon: {
                    image: opts.image
                }
            }
        )
    );

    if (!json.labels) {
        json.labels = {};
    }

    json.labels.deployedBy = opts.user;
    json.labels.deployedFrom = os.hostname();

    return json;
};
