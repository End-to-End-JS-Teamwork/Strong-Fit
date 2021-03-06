var express = require('express'),
    env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);

var server = app.listen(config.port);
require('./server/config/socket').init(server);

console.log('Server running on port: ' + config.port);