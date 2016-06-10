'use strict';

const assert = require('assert');
const generateJson = require('../src/generate-json');
const marathonConfig = Object.assign({}, require('../marathon.json'));

describe('#generateJson', () => {
    it('should generate json based on marathon.json file', function(done) {
        generateJson({
            user: 'bjarneo',
            marathonFile: 'marathon.json',
            image: 'marathon-deploy',
            labels: {
                env: 'development'
            }
        }).then(data => {
            assert(data.endpoint === 'http://localhost:3000');
            assert(data.container);
            assert(data.container.docker.image === 'marathon-deploy');
            assert(data.healthChecks);
            assert(data.id === 'marathon-deploy');
            assert(data.instances === 1);

            done();
        });
    });

    it('should generate json based on marathon config passed to the generate json function', function(done) {
        generateJson({
            user: 'bjarneo',
            marathonConfig,
            image: 'marathon-deploy',
            labels: {
                env: 'development'
            }
        }).then(data => {
            assert(data.endpoint === 'http://localhost:3000');
            assert(data.container);
            assert(data.container.docker.image === 'marathon-deploy');
            assert(data.healthChecks);
            assert(data.id === 'marathon-deploy');
            assert(data.instances === 1);

            done();
        });
    });
});
