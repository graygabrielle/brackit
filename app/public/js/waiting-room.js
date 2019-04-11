$(document).ready(function() {

    $("#start").on("click", function() {
      const BrackitId = $(this).data("id");
      $.get(`/api/candidates/${BrackitId}`)
        .then(function(data) {
          const candidates = data;
          $.post("/api/matchups/roundOne", {candidates})
            .then(function(data) {
              console.log("Data:", data);
            });
        });
      
      //Eliza, please start the game here(render the brackit-matchup view)
        
    });

});
