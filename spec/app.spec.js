var server = require('../app');
var supertest = require('supertest');

describe('routes tests ', function() {

    it('add rout should return true with parameters', function(done) {
        var app = supertest(server);
        app.get('/emailCheck/daniel.evans17@outlook.com')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});