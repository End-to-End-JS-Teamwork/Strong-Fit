'use strict';

var socketio_jwt = require('socketio-jwt'),
    socket_io = require('socket.io'),
    jwt = require('jsonwebtoken');

var clients = {},
    secret = 'Magical unicorns everywhere ^^';

function getToken(payload) {
    // The payload will be sent inside the token.
    // It can be username, id etc.
    var token = jwt.sign(payload, secret, { expiresInMinutes: 60*5});
    return token;
}

function init(server) {
    var sio = socket_io.listen(server);
    console.log('Socket.io opened...');

    sio.use(socketio_jwt.authorize({
        secret: secret,
        handshake: true
    }));

    sio.sockets.on('connection', function(socket) {
        var username = socket.decoded_token.username;
        console.log(username, 'Connected...');
        clients[username] = socket;

        socket.on('ping', function (m) {
            socket.emit('pong', m);
        });
    });

    if (!process.env.NODE_ENV) {
        setInterval(function() {
            sio.sockets.emit('time', Date());
        }, 2000);
    }
}

module.exports = {
    init: init,
    clients: clients,
    getToken: getToken
};

