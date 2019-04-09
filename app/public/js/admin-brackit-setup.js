// The code in admin-brackit-setup.js handles what happens when the user clicks the "submit" button on the admin-brackit-setup page.

$(document).ready(function() {

  // When user clicks "submit"
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Make a newAdmin object
    const newAdmin = {
      displayName: $("admin-name").val().trim()
    };
  
    // Post the new admin
    $.post("/api/admins", newAdmin)
      // On success, run the following code
      .then(function(data) {
        const adminID = data.id;
        // Make a newBracket object
        const newBracket = {
          name: $("#bracket-name").val().trim(),
          numberCandidates: $("#number-candidates").val().trim(),
          adminID: adminID
        };
        // Post the new bracket
        $.post("/api/brackets", newBracket)
          // On success, run the following code
          .then(function(data) {
            const bracketID = data.id;
            // Save bracketID to localStorage so we can attach it to the candidates on the next page.
            localStorage.setItem("bracketID", bracketID);
            // Get request to render "admin-candidate-setup.handlebars"
            // The number of candidate fields to fill in will depend on the number of candidates selected,
            // hence the inclusion of the bracketID in the URL,
            // which allows us to use req.params in the API route to check the number of candidates associated with that bracketID
            // (the path being something along the lines of "/api/:bracketID/add-candidates")
            // and render the view with the appropriate number of fields (=numberCandidates).
            $.get(`/api/${bracketID}/add-candidates`);
          });
      });
  
  });

});
  