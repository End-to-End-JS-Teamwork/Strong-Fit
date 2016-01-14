var server = require('../server');
var http = require('./lib/http');

describe('Article API', function () {

    before(function (done) {
        http.createServer(server, done);
    });

    it('GET /admin/articles should return status code 403', function (done) {
        http.request()
            .get('/admin/articles')
            .expect(403, done);
    });

    it('Get /admin/articles:id should return 200 when invalid', function (done) {
        http.request()
            .get('/admin/articles/invalid')
            .expect(200, done);
    });
});