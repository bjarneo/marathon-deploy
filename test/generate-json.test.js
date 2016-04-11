'use strict';

const assert = require('assert');
const generateJson = require('../src/generate-json');

describe('#generateJson', () => {
    it('should generate json based on marathon.json file', function() {
        const data = generateJson({
            user: 'bjarneo',
            marathonFile: 'marathon.json',
            image: 'marathon-deploy'
        });

        assert(data.endpoint === 'http://localhost:3000');
        assert(data.container);
        assert(data.container.docker.image === 'marathon-deploy');
        assert(data.healthChecks);
        assert(data.id === 'marathon-deploy');
        assert(data.instances === 1);
    });
});
