var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express')

server.listen(process.env.PORT || 8080);

app.use('/public', express.static(__dirname + '/controler/assets'));
app.get('/gyrophare', function (req, res) {
    res.sendFile(__dirname + '/controler/gyrophare.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/controler/home.html');
});
app.get('/app', function (req, res) {
    res.sendFile(__dirname + '/controler/app.html');
});

io.on('connection', (socket) => {
    console.log('client connecté')
    // ! Identify receivers
    socket.on('receiver', () => {
        console.log('identification dun receiver');
        socket.join('receiver')
    })
    // ! Processing gyrophare actions
    // * getStatus
    // * Turn On
    socket.on('turnOn', () => {
        console.log('turnOn')
        io.to('receiver').emit('turnOn');
    })
    // * Turn Off
    socket.on('turnOff', () => {
        console.log('turnOff')
        io.to('receiver').emit('turnOff');
    })
    // * Light On
    socket.on('lightOn', () => {
        console.log('light on')
        socket.broadcast.emit('lightStatus', {
            status: 'on'
        });
    })
    // * Light Off
    socket.on('lightOff', () => {
        console.log('light off')
        socket.broadcast.emit('lightStatus', {
            status: 'off'
        });
    })
    // * Btn status
    socket.on('btnStatus', (data) => {
        console.log('btn status');
        socket.broadcast.emit('btnStatus', data)
    })
    // ! Processing temperature actions
    socket.on('newTemperature', (data) => {
        console.log(data)
        socket.broadcast.emit('newTemperature', data)
    })
    socket.on('newColor', (data) => {
        socket.broadcast.emit('newColor', data)
    })
})