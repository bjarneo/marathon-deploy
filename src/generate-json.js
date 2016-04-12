'use strict';

const os = require('os');
const fs = require('fs');
const template = require('mini-template-engine');

module.exports = function generateJson(opts) {
    const json = new Promise((resolve, reject) => {
        return fs.readFile(opts.marathonFile, 'utf-8', (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    });

    return json
        .then(res => {
            return template(res, {
                marathon: {
                    image: opts.image
                }
            });
        })
        .then(JSON.parse)
        .then(data => {
            if (!data.labels) {
                data.labels = {};
            }

            data.labels.deployedBy = opts.user;
            data.labels.deployedFrom = os.hostname();

            return data;
        })
        .catch(err => {
            throw new Error(err);
        });
};
