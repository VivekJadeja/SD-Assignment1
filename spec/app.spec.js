var server = require('../app');
var supertest = require('supertest');

describe('routes tests ', function() {
    //testing emailCheck route
    it('emailCheck get route should return true with parameters', function(done) {
        var app = supertest(server);
        app.get('/emailCheck/daniel.evans17@outlook.com')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('emailCheck get route should return false with parameters', function(done) {
        var app = supertest(server);
        app.get('/emailCheck/daniel@outlook.com')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //testing home get route
    it('home get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('login get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/login')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //testing login route
    it('login post route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.post('/login')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //testing logout route
    it('logout get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/logout')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //testing signup route
    it('signup get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/signup')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //testing signup post route
    it('signup post route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.post('/signup')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('registerProfile get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/registerProfile')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('registerProfile post route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.post('/registerProfile')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('requestQuote get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/requestQuote')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('requestQuote post route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.post('/requestQuote')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('userHome get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/userHome')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('* get route should return 200 with html file', function(done) {
        var app = supertest(server);
        app.get('/*')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});