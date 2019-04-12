const db = require("../models");

module.exports = function (io) {
  
  io.on("connection", socket => {
    let socketId = socket.id;
    console.log(`${socketId} connected to socket.`);
    let userName;
    let roomId;
    let userId;
    let brackitId;

    socket.on("join room", async (bracketId, name, incomingUserId) => {
      brackitId = bracketId;
      roomId = `bracket ${brackitId}`;
      userName = name;
      userId = incomingUserId;
      socket.join(roomId);
      console.log(`${userName} joined socket : ${roomId}`);
      socket.broadcast.to(roomId).emit("new join", userName, userId);
      await db.User.update({
        isConnected: true
      }, {
        where: {
          id: userId
        }
      });
    })

    socket.on("who's in room", async () => {
      const users = await db.User.findAll({
        where: {
          BrackitId: brackitId,
          isConnected: true
        }
      });
      socket.emit("people in room", users);
    })


    const nextMatchup = function(roundData) {
      if (roundData.currentMatchup === roundData.totalMatchups) {
        if (roundData.currentRound === roundData.totalRounds) {
          //final screen

        } else {
          roundData.currentRound++;
          roundData.currentMatchup = 1;
          roundData.totalMatchups = roundData.totalMatchups/2;
          socket.emit("local round over", roundData);
        }
      } else {
        roundData.currentMatchup++;
        socket.emit("load new matchup", roundData);
      }

    }

    let matchupInterval;

    socket.on("start matchup timer", roundData => {
      //5 second timer
      //
      // if (matchupInterval) {
      //   clearInterval(matchupInterval);
      // }
      let matchupTimeLeft = 5;
      matchupInterval = setInterval(function() {
        socket.emit("matchup countdown", --matchupTimeLeft)
        if (matchupTimeLeft===0) {
          clearInterval(matchupInterval);
          nextMatchup(roundData);
        }
      }, 1000);
      

    })

    const newRoundStarted = function(roundData) {
        //master round timer
      //emits master round countdown
      //at end trigger results screen

    }

    socket.on("begin bracket", async () => {
      try{
        const thisBrackit = await db.Brackit.findOne({
          id: brackitId
        });
        const totalCandidates = thisBrackit.numberCandidates;
        const currentRound = 1;
        const totalRounds = Math.log(totalCandidates, 2);
        const currentMatchup = 1;
        const totalMatchups = totalCandidates / 2;
  
        const roundData = {
          currentRound, totalRounds, currentMatchup, totalMatchups
        }
  
        io.in(roomId).emit("load new round", roundData);
        newRoundStarted(roundData);
      } catch (err) {
        console.log(err)
      }      
    })


    socket.on("vote", async (userId, chosenCand, roundData) => {
      clearInterval(matchupInterval)
      try {
        await db.Vote.create({
          UserId: userId,
          CandidateId: chosenCand,
          roundNumber: roundData.currentRound
        })
        nextMatchup(roundData);
      } catch (err) {
        console.log(err);
      }
    })

    socket.on("pair timer", (pairNumber, roundNumber, numberOfCandidates) => {
      const totalRounds = Math.log(numberOfCandidates, 2);
      const totalPairs = numberOfCandidates / (2 ** roundNumber);
      const secondsPerChoice = 5;
      let timeLeft = secondsPerChoice;
      socket.emit("pair countdown", timeLeft);
      let pairInterval = setInterval(() => {

        if (timeLeft > 1) {
          socket.emit("pair countdown", --timeLeft);

        } else if (timeLeft === 1) {
          socket.emit("pair countdown", --timeLeft);

          if (pairNumber < totalPairs) {
            socket.emit("new pair", ++pairNumber);
          } else if (pairNumber === totalPairs) {
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

    socket.on("disconnect", async () => {
      console.log(`${userName} at socket ${socketId} has disconnected.`);
      try {
        await db.User.update({
        isConnected: false
      }, {
        where: {
          id: userId
        }
      });
      io.in(roomId).emit("user left", userName, userId);
    } catch (error) {
      console.log(error);
    }
    });
  });
};