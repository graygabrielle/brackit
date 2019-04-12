const db = require("../models");

module.exports = function (io) {
  
  io.on("connection", socket => {
    let socketId = socket.id;
    console.log(`${socketId} connected to socket.`);
    let userName;
    let roomId;
    let userId;
    let brackitId;
    let matchupInterval;
    let roundInterval;

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

    //matchup functions

    const nextMatchup = function(roundData) {
      if (roundData.currentMatchup === roundData.totalMatchups) {
        if (roundData.currentRound === roundData.totalRounds) {
          //final screen
          socket.emit("final local round over", roundData);

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

    socket.on("start matchup timer", roundData => {
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

    //round functions

    const resultPageTimer = function(roundData) {
      let resultTimeLeft = 10;
      let resultInterval = setInterval(function() {
        io.in(roomId).emit("result page countdown", --resultTimeLeft);
        if (resultTimeLeft===0) {
          clearInterval(resultInterval);
          roundData.currentRound++;
          roundData.totalMatchups = roundData.totalMatchups/2;
          io.in(roomId).emit("load new round", roundData);
        }
      },1000)
    }

    const newRoundStarted = function(roundData) {
        //master round timer
      //emits master round countdown
      //at end trigger results screen
      const secondsPerChoice = 5;
      let roundTimeLeft = roundData.totalMatchups * secondsPerChoice;

      roundInterval = setInterval(function() {
        io.in(roomId).emit("master round countdown", --roundTimeLeft);
        console.log(`master round timer: ${roundTimeLeft}`)
        if (roundTimeLeft===0) {
          clearInterval(roundInterval);
    
          if (roundData.currentRound === roundData.totalRounds) {
            io.in(roomId).emit("final results", roundData);
          } else {
            io.in(roomId).emit("get results", roundData);
            resultPageTimer(roundData);
          }
        }
      }, 1000)

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
      clearInterval(matchupInterval);
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