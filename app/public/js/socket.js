$(document).ready(function () {

  const name = $(".data-source").attr("data-name");
  const userId = $(".data-source").attr("data-id");
  console.log(`Name is ${name} and id is ${userId}`);

  let brackitId = $(".brackit-info").attr("data-id");
  let chosenCand;
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
  }

  socket.on("load new round", roundData => {
    loadNewMatchup(roundData);
    socket.emit("new round started", roundData);
  })

  socket.on("load new matchup", roundData => {
    loadNewMatchup(roundData);
  })

  socket.on("local round over", roundData => {
    //render waiting screen
    //start to listen to global countdown/print global countdown
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
    console.timeLog(chosenCand);
  })

  $(document).on("click", ".pick-cand", () => {

    // let currentRound = parseInt($("#round-num").attr("data-num"));
    socket.emit("vote", userId, chosenCand, localRoundInfo);
  })

////////////

  // socket.on("send new pair", candidates => {
  //   let timeout = setTimeout(() => {
  //     $(".cand1").text(candidates[0].Candidate.name);
  //     $(".cand2").text(candidates[1].Candidate.name);

  //   }, 10);
  // })





  // let timeInRound;

  // // $(document).ready(function() {
  // //     $('body').load("/ #test", function(text){
  // //         //$("body").append(text);
  // //         console.log(text)
  // //     });
  // // })

  // //on start button click
  // socket.emit("start bracket", numberOfCandidates);

  // socket.on("start round", roundNumber => {
  //   //get request - bracket page
  //   //round whatever
  //   //set interval 1000 seconds 5 passes for each pair
  //   socket.emit("pair timer", pairNumber, roundNumber, numberOfCandidates);
  // });

  // socket.on("master countdown", timeLeft => {
  //   timeInRound = timeLeft;
  // })




  // socket.on("error", err => {
  //   console.log("Error connecting to room. Please wait for admin to enter.");
  // });

})