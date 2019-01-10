
module.exports = (http) => {
    const io = socketIo(http)

    io.on('connection', function (socket) {
        socket.on('dashboard', function (msg) {
            //io.emit('chat message', msg);
            console.log(msg)
            
        });
    });

}
