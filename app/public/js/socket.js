$(document).ready(function () {

  const name = $(".data-source").attr("data-name");
  const userId = $(".data-source").attr("data-id");
  console.log(`Name is ${name} and id is ${userId}`);

  let brackitId = $(".brackit-info").attr("data-id");
  let chosenCand = null;
  let socket = io();
  // let round = {
  //   current: 1,
  //   total: 2,
  //   matchup: {
  //     current: 1,
  //     total: 2
  //   }
  // }
  let localRoundInfo;

  socket.emit("join room", brackitId, name, userId);
  socket.emit("who's in room");

  //functions for waiting room
  socket.on("people in room", users => {

    users.forEach(function (elem) {
      let newName = $("<p>", {
        "data-id": `${elem.id}`
      }).text(elem.displayName);
      $(".participants").append(newName);
    })
  })

  socket.on("new join", (joinerName, joinerId) => {
    console.log(`${joinerName} just joined!`);
    let newName = $("<p>", {
      "data-id": `${joinerId}`
    }).text(joinerName);
    $(".participants").append(newName);
  });

  socket.on("user left", (name, id) => {
    console.log(`${name} has left the room.`);
    //delete name from screen
    $(`[data-id="${id}"]`).remove();
  });

  //start first round function
  $("#start").on("click", function () {
    socket.emit("begin bracket");
  })


  const loadNewMatchup = function (roundData) {
    localRoundInfo = roundData;
    $("#insert").load(`/brackit/play/brack/${brackitId}/round/${roundData.currentRound}/matchup/${roundData.currentMatchup} #play`);
    socket.emit("start matchup timer", roundData);
  }

  socket.on("load new round", roundData => {
    loadNewMatchup(roundData);
    //socket.emit("new round started", roundData);
  })

  socket.on("load new matchup", roundData => {
    loadNewMatchup(roundData);
  })

  socket.on("local round over", roundData => {
    //render waiting screen
    //start to listen to global countdown/print global countdown
    $("#insert").load(`/brackit/await-results #grab`);
    socket.on("master round countdown", timeLeft =>{
      $(".timer").text(timeLeft);
    })

  })

  socket.on("final local round over", roundData => {
    //render waiting screen
    //start to listen to global countdown/print global countdown
    $("#insert").load(`/brackit/await-results #grab`);
    socket.on("master round countdown", timeLeft =>{
      $(".timer").text(timeLeft);

    })

  })

  //TIMER FCNS
  socket.on("matchup countdown", timeLeft => {
    $(".timer").text(timeLeft);
  })

  socket.on("get results", roundData => {
    //render results page
    //for URL:
    console.log("getting results");

    $("#insert").load(`/brackit/results/brack/${brackitId}/round/${roundData.currentRound}/of/${roundData.totalRounds} #grab`);
  })


  socket.on("final results", roundData => {
    //render results page
    //for URL:
    //should be FINAL results
    $("#insert").load(`/brackit/final-results #grab`);
  })


  socket.on("result page countdown", timeLeft => {
    //print countdown to page
    $(".timer").text(timeLeft);
  })

  
 //BRACKit-MATCHUP-HANDLEBARS-FUNCTIONS

  $(document).on("click", ".choice", function () {
    let otherCand;

    if ($(this).hasClass("cand1")) {
      otherCand = ".cand2";
    } else {
      otherCand = ".cand1";
    }

    if ($(this).hasClass("inactive")) {

      $(this).removeClass("inactive");
      $(otherCand).removeClass("active");

    } else if ($(this).hasClass("active")) {
      return;
    }

    $(this).addClass("active");
    $(otherCand).addClass("inactive");

    chosenCand = $(this).attr("data-id");
    console.log(chosenCand);
  })

  $(document).on("click", ".pick-cand", () => {

    // let currentRound = parseInt($("#round-num").attr("data-num"));
    
    if (chosenCand) {
      socket.emit("vote", userId, chosenCand, localRoundInfo);
      chosenCand = null;
    }
  })


  // socket.on("error", err => {
  //   console.log("Error connecting to room. Please wait for admin to enter.");
  // });

})