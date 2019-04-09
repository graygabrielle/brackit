// The code in admin-candidate-setup.js handles what happens when the user clicks the "submit" button on the admin-candidate-setup page.

$(document).ready(function() {

  // When user clicks "submit"
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    const candidates = $("input[type=text]").map(function() {
      return this.value;
    }).get();
  
    for (let i = 0; i < candidates.length; i++) {

      const bracketID = localStorage.getItem("bracketID");

      const newCandidate = {
        bracketID: bracketID,
        name: candidates[i]
      };

      // Get the adminID associated with our bracketID
      $.get("/api/admins")
        .then(function(data) {
          
        });

      // Post the candidates
      $.post("/api/candidates", newCandidate)
        // On success, run the following code 
        .then(function(data) {
          
        });
    }
  
  });

});
