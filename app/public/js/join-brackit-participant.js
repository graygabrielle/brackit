// The code in join-brackit-participant.js handles what happens when the user clicks the "submit" button on the join-brackit-participant page.

$(document).ready(function() {

    $("#submit").on("click", function() {
        const displayName = $("#username").val().trim();
        const BrackitId = $("#username").data("brackit-id");
        const isAdmin = false;
        const newUser = {
            BrackitId: BrackitId,
            isAdmin: isAdmin,
            displayName: displayName
        }
        $.post("/api/users", newUser)
            .then(function(data){
                console.log(data);
                window.location.href = `/join/${data.BrackitId}/waiting-room/${data.displayName}`;

            })
        


    //   const joinCode = $("#join-code").val().trim();
    //   $.get(`/api/users/${joinCode}`)
    //     .then(function(data) {
    //       const isAdmin = data[1];
    //       if (isAdmin) {
    //         window.location.href = `/join/${data[0][0].BrackitId}/waiting-room/${data[0][0].displayName}`;
    //       } else {
    //         window.location.href = `/join/${data[0][0].BrackitId}/username`;
    //       }
    //     })
    });

});

