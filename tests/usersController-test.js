var assert = require('assert');
var superagent = require('superagent');
var server = require('../server');
// var users = require('../users');
var status = require('http-status');

describe('/', function() {
    var app;

    before(function() {
        app = server(3210);
    });

    after(function() {
        app.close();
    });

    it('Get /admin/articles:id should return 200 when invalid', function (done) {
        app.request()
            .get('/admin/articles/invalid')
            .expect(200, done);
    });

    it('returns username if name param is a valid user', function(done) {
       // server.list = ['test'];
        superagent.get('http://localhost:3210').end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.deepEqual({ article: 'test' }, result);
            done();
        });
    });

    it('returns 404 if user named `params.name` not found', function(done) {
        users.list = ['test'];
        superagent.get('http://localhost:3210/notfound').end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.NOT_FOUND);
            var result = JSON.parse(res.text);
            assert.deepEqual({ error: 'Not Found' }, result);
            done();
        });
    });
});