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
        var msg     = message;
        var from    = msg.from;
        var to      = msg.to;
        var body    = msg.body;
        console.log(msg);
        if (validUser()) {
            io.emit('cast' + to, msg)
        }
//        io.emit('chat message', name + " : " + msg);
        //io.emit('chat message', {name : name, msg : msg});
        //io.emit('user' + key, {news: "hello world"});
    });
    
    socket.on('new-connection', function(message) {
        //console.log(socket.id + ' connected');
        
        users.push(message.name);
        socketIdName[socket.id] = message.name;
        
        io.emit('new-connection', {users : users});
    });
    
    socket.on('disconnect', function() {
        var userName = socketIdName[socket.id];
        users.splice(users.indexOf(userName), 1);
        io.emit('do-disconnect', {users : users});
        //remove user from db
    });
});

http.listen(3030, function () {
    console.log('listening on *:3030');
});

function validUser() {
    return true;
}
