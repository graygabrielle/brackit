$(document).ready(function () {

    const name = $(".data-source").attr("data-name");
    const newUserId = $(".data-source").attr("data-id");
    console.log(`Name is ${name} and id is ${newUserId}`);

    let brackitId = $(".brackit-info").attr("data-id");
    let socket = io();

    socket.emit("join room", brackitId, name, newUserId);
    socket.emit("who's in room");

    socket.on("people in room", users => {
      console.log(users);

      users.forEach(function(elem) {
        let newName = $("<p>", {"data-id": `${elem.id}`}).text(elem.displayName);
        $(".participants").append(newName);
      })
    })

    socket.on("new join", (joinerName, joinerId) => {
      console.log(`${joinerName} just joined!`);
      let newName = $("<p>", {"data-id": `${joinerId}`}).text(joinerName);
      $(".participants").append(newName);
    });

    socket.on("user left", (name, id) => {
      console.log(`${name} has left the room.`);
      //delete name from screen
      $(`[data-id="${id}"]`).remove();
    });

    $("#start").on("click", function() {
      console.log("start button clicked");
      socket.emit("begin bracket");
    })

    socket.on("load new round", currentRound => {
      $("body").load("/brackit/play #play");
      socket.emit("new round started", currentRound);
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