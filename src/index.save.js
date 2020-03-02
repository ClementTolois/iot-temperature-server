const io = require('socket.io')();
io.on('connection',(socket) => {
    console.log('client connecté')
    // ! Identify receivers
    socket.on('receiver',() => {
        console.log('identification dun receiver');
        socket.join('receiver')
    })
    // ! Processing actions
    // * Turn On
    socket.on('turnOn',() => {
        console.log('turnOn')
        io.to('receiver').emit('turnOn');
    })
    // * Turn Off
    socket.on('turnOff',() => {
        console.log('turnOff')
        io.to('receiver').emit('turnOff');
    })
})
io.listen(8080);