'use strict';

const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const deploy = require('../index');

describe('#deploy', () => {
    const app = express();
    app.use(bodyParser.json());

    before(function(done) {
        app.put('/v2/apps/:id', function(req, res) {
            res.json(req.body);
        });

        app.listen(3000);

        done();
    });

    it('should do a put request', function(done) {
        deploy('marathon-deploy')
            .then(res => {
                assert(typeof res.endpoint === 'undefined');

                assert(res.container.docker.image === 'marathon-deploy');

                assert(res.id === 'marathon-deploy');

                assert(res.instances === 1);

                done();
            }).catch(err => {
                throw new Error(err);
            });
    });
});
