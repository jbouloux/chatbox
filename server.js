var app = require('./express_app.js').app;

var server = app.listen(8080);

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    // Quand un client se connecte, on lui envoie un message
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('nouveau_client', function(pseudo) {
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', socket.pseudo);
    });

    // Dès qu'on reçoit un "message", on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(socket.pseudo + ' SAYS : ' + message);
        // on emet le message aux autres utilisateurs
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

console.log("Server is running...");
