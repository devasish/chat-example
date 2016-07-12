var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [
    
];
var socketIdName = {};

app.get('/', function (req, res) {
    console.log(req.connection.remoteAddress);
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (message) {
        console.log(socket.handshake.address);
        var msg     = message;
        var from    = msg.from;
        var to      = msg.to;
        var body    = msg.body;
        if (validUser(msg)) {
            io.emit('cast' + to, msg)
        }
        else {
            console.log("else")
            io.emit('chat message', msg)
        }
//        io.emit('chat message', name + " : " + msg);
        //io.emit('chat message', {name : name, msg : msg});
        //io.emit('user' + key, {news: "hello world"});
    });
    
    socket.on('new-connection', function(message) {
        console.log(typeof(message.name))
        if (message.name == 'null' || message.name == 'null') {
            message.name = socket.handshake.address;
        }
        
        users.push(message.name);
        socketIdName[socket.id] = message.name;
        //socketIdIP[socket.id]   = socket.handshake.address;
        
        io.emit('new-connection', {users : users});
    });
    
    socket.on('disconnect', function() {
        var userName = socketIdName[socket.id];
        users.splice(users.indexOf(userName), 1);
        io.emit('do-disconnect', {users : users});
        //remove user from db
    });
});

http.listen(3000, function () {
    console.log('listening on *:3030');
});

function validUser(msg) {
    return ((msg.to == 'all')? false : true);
}
