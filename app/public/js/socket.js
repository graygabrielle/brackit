$(document).ready(function () {

  const name = $(".data-source").attr("data-name");
  const userId = $(".data-source").attr("data-id");
  console.log(`Name is ${name} and id is ${userId}`);

  let brackitId = $(".brackit-info").attr("data-id");
  let roundNumber = 1;
  let matchupNumber = 1;
  let chosenCand;
  let socket = io();

  socket.emit("join room", brackitId, name, userId);
  socket.emit("who's in room");

  //functions 
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

  $("#start").on("click", function () {
    console.log("start button clicked");
    socket.emit("begin bracket");
  })

  socket.on("load new round", currentRound => {
    matchupNumber = 1;
    $("#insert").load(`/brackit/play/brack/${brackitId}/round/${roundNumber}/matchup/${matchupNumber} #play`);
    socket.emit("new round started", currentRound);
  })

  socket.on("load new matchup", (currentRound, matchupNumber) => {
    $("#insert").load(`/brackit/play/brack/${brackitId}/round/${currentRound}/matchup/${matchupNumber} #play`);
  })

  const loadNewMatchup = () => {

  }

  // socket.on("send new pair", candidates => {
  //   let timeout = setTimeout(() => {
  //     $(".cand1").text(candidates[0].Candidate.name);
  //     $(".cand2").text(candidates[1].Candidate.name);

  //   }, 10);
  // })


  //brackit-matchup handlebars
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

    // matchupNumber++;
    socket.emit("vote", userId, chosenCand, roundNumber);
    // $("#insert").load(`/brackit/play/brack/${brackitId}/round/${currentRound}/matchup/${matchupNumber} #play`);
  })



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