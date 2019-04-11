// The code in join-brackit-portal.js handles what happens when the user clicks the "submit" button on the join-brackit-portal page.

$(document).ready(function() {

    $("#submit").on("click", function() {
      const joinCode = $("#join-code").val().trim();
      $.get(`/api/users/${joinCode}`)
        .then(function(data) {
          const isAdmin = data[1];
          if (isAdmin) {
            window.location.href = `/join/${data[0][0].BrackitId}/waiting-room/admin/${data[0][0].displayName}`;
          } else {
            window.location.href = `/join/${data[0][0].BrackitId}/username`;
          }
        })
    });

});