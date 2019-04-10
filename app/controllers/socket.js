module.exports = function (io) {
  // let socketId;
  io.on("connection", socket => {
    console.log(`${socket.id} connected to socket.`);
    let userName;
    let roomId;

    socket.on("bracketID", (bracketId, name) => {
      roomId = `bracket ${bracketId}`;
      userName = name;
      socket.join(roomId);
      console.log(`${userName} joined socket : ${roomId}`);
      io.in(roomId).emit("new join", userName);
    });

    //set timeout for emit to room

    socket.on("start bracket", numberOfCandidates => {
      const secondsPerChoice = 5;
      let roundNumber = 1;
      let candidates = numberOfCandidates;
      let roundPairs = candidates / 2;
      const totalRounds = Math.log(candidates, 2);
      let roundInterval = setInterval(() => {
        io.in(roomId).emit("start round", roundNumber);
        if (roundNumber < totalRounds) {
          roundNumber++;
          candidates = candidates / 2;
          roundPairs = roundPairs / 2;
        } else {
          clearInterval(roundInterval);
        }
      }, roundPairs * secondsPerChoice * 1000);
    });

    // setInterval(function() {
    //     io.in(roomId).emit('user left', userName);
    // }, 1000);

    socket.on("disconnect", () => {
      console.log(`${userName} at socket ${socket.Id} has disconnected.`);

      io.in(roomId).emit("user left", userName);

      //delete user
    });
  });
};