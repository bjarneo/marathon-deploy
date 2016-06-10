'use strict';

const os = require('os');
const fs = require('fs');
const extend = require('extend');
const template = require('mini-template-engine');
const config = require('./config');

const json = () => new Promise((resolve, reject) => {
    return fs.readFile(config.get('options').marathonFile, 'utf-8', (err, res) => {
        if (err) {
            reject(err);
        }

        resolve(res);
    });
});

function getTemplate(res) {
    return template(res, {
        marathon: {
            image: config.get('options').image
        }
    });
}

function generateLabels(data) {
    if (!data.labels) {
        data.labels = config.get('options').labels;
    } else {
        data.labels = extend(data.labels, config.get('options').labels);
    }

    data.labels.deployedBy = config.get('options').user;
    data.labels.deployedFrom = os.hostname();

    return data;
}

module.exports = function generateJson() {
    let data;
    const conf = config.get('options');

    // Should validate the marathon config and file
    if (
        conf.marathonConfig &&
        conf.marathonConfig.endpoint
    ) {
        data = Promise.resolve(JSON.stringify(conf.marathonConfig));
    } else {
        data = json();
    }

    return data
        .then(getTemplate)
        .then(JSON.parse)
        .then(generateLabels)
        .catch(err => {
            throw new Error(err);
        });
};
