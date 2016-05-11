'use strict';

const os = require('os');
const fs = require('fs');
const extend = require('extend');
const template = require('mini-template-engine');
const config = require('./config');

module.exports = function generateJson() {
    const json = new Promise((resolve, reject) => {
        return fs.readFile(config.get('options').marathonFile, 'utf-8', (err, res) => {
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
                    image: config.get('options').image
                }
            });
        })
        .then(JSON.parse)
        .then(data => {
            if (!data.labels) {
                data.labels = config.get('options').labels;
            } else {
                data.labels = extend(data.labels, config.get('options').labels);
            }

            data.labels.deployedBy = config.get('options').user;
            data.labels.deployedFrom = os.hostname();

            return data;
        })
        .catch(err => {
            throw new Error(err);
        });
};
