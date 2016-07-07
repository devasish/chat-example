var app     = require('express')();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.get('/', function (req, res) {
    console.log(req.connection.remoteAddress);
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        var address = socket.handshake.address;
        var exp = address.split(":");
        var exp2 = exp[exp.length - 1].split('.');
        var key = exp2[exp2.length - 1];

        var name = '';
        switch (key) {
            case 53 :
            case '53' :
                name = 'Swarup';
                break;
            case 59 :
            case '59' :
                name = 'Rajkumar';
                break;
            case 63 :
            case '63' :
            case '1' :
                name = 'Devasish';
                break;
            case 64 :
            case '64' :
                name = 'Koustav';
                break;
            case 69 :
            case '69' :
                name = 'Tanmoy';
                break;
            case 71 :
            case '71' :
                name = 'Projesh';
                break;
            default:
                name = 'Anonymous [' + exp2 + ']'

        }
//        io.emit('chat message', name + " : " + msg);
        io.emit('chat message', {name : name, msg : msg});
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
