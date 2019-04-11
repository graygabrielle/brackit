module.exports = function (io) {
  // let socketId;
  io.on("connection", socket => {
    let socketId = socket.id;
    console.log(`${socketId} connected to socket.`);
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

    socket.on("pair timer", (pairNumber, roundNumber, numberOfCandidates) => {
      const totalRounds = Math.log(numberOfCandidates, 2);
      const totalPairs = numberOfCandidates/(2**roundNumber);
      const secondsPerChoice = 5;
      let timeLeft = secondsPerChoice;
      socket.emit("pair countdown", timeLeft);
      let pairInterval = setInterval(() => {

        if (timeLeft > 1) {
          socket.emit("pair countdown", --timeLeft);

        } else if (timeLeft = 1) {
          socket.emit("pair countdown", --timeLeft);

          if (pairNumber < totalPairs) {
            socket.emit("new pair", ++pairNumber);
          } else if (pairNumber===totalPairs) {
            socket.emit("round done", roundNumber, totalRounds);
          }

          pairInterval.clearInterval();
        }
      }, 1000);
    });

    // socket.on("start bracket", numberOfCandidates => {
    //   const secondsPerChoice = 5;
    //   let roundNumber = 1;
    //   let candidates = numberOfCandidates;
    //   let pairsInRound = candidates / 2;
    //   const totalRounds = Math.log(candidates, 2);

    //   //
    //   const roundTimer = function () {
    //     //first cycle of fcn outside of timer
    //     io.in(roomId).emit("start round", roundNumber);
    //     let roundTimeLeft = pairsInRound * secondsPerChoice * 1000;
    //     io.in(roomId).emit("master countdown", roundTimeLeft);

    //     let timerInterval = setInterval(() => {
    //       if (roundTimeLeft > 0) {
    //         roundTimeLeft--;
    //         io.in(roomId).emit("master countdown", roundTimeLeft);
    //       } else {
    //         timerInterval.clearInterval();
    //       }
    //     }, 1000);
    //   };

    //   const allRounds = function () {
    //     let roundInterval = setInterval(() => {
    //       if (roundNumber < totalRounds) {

    //         roundNumber++;
    //         candidates = candidates / 2;
    //         pairsInRound = pairsInRound / 2;
    //         roundTimer();

    //       } else {
    //         clearInterval(roundInterval);
    //       }
    //     }, pairsInRound * secondsPerChoice * 1000)
    //   }

    //   //first cycle of function outside of allRound timer
    //   roundTimer();
    //   allRounds();
    // })

    // setInterval(function() {
    //     socket.emit('user left', userName);
    // }, 1000);

    socket.on("disconnect", () => {
      console.log(`${userName} at socket ${socketId} has disconnected.`);

      io.in(roomId).emit("user left", userName);

      //delete user
    });
  });
};