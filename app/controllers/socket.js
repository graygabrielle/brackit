module.exports = function(io) {

    // let socketId;
    io.on("connection", (socket) => {
        console.log("User connected to socket.");
        let userName;
        let roomId;

        socket.on('bracketID', (bracketId, name) => {
            roomId = bracketId;
            userName = name;
            socket.join(roomId);
            console.log(`Joined socket : ${roomId}`)
            io.in(roomId).emit('new join', userName);
        });

        //set timeout for emit to room

        socket.on("disconnect", function() {
            console.log("A user has disconnected.");

            io.in(roomId).emit('user left', userName);
            
            //delete user
        });
    })

    // let namespace = io.of(`/${socketId}`);
    // namespace.on('connection', function(socket) {
        
    // });
}