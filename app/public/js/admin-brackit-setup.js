// The code in admin-brackit-setup.js handles what happens when the user clicks the "submit" button on the admin-brackit-setup page.

$(document).ready(function() {

  // When user clicks "submit"
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Make a newAdmin object
    const newAdmin = {
      displayName: $("#admin-name").val().trim()
    };

    const numberCandidates = parseInt($("#num-of-cand").val());

    // Post the new admin
    $.post("/api/admins", newAdmin)
      // On success, run the following code
      .then(function(data) {
        const AdminId = data.id;
        // Make a newBrackit object
        const newBrackit = {
          name: $("#brack-name").val().trim(),
          numberCandidates: numberCandidates,
          AdminId: AdminId
        };
        // Post the new brackit
        $.post("/api/brackits", newBrackit);
          // On success, run the following code
        //  .then(function(data) {
        //    const brackitID = data.id;
        //    // Save brackitID to localStorage so we can attach it to the candidates on the next page.
        //    localStorage.setItem("brackitID", brackitID);
        //    // Get request to render "admin-candidate-setup.handlebars"
        //    // The number of candidate fields to fill in will depend on the number of candidates selected,
        //    // hence the inclusion of the brackitID in the URL,
        //    // which allows us to use req.params in the API route to check the number of candidates associated with that brackitID
        //    // (the path being something along the lines of "/api/:brackitID/add-candidates")
        //    // and render the view with the appropriate number of fields (=numberCandidates).
        //    $.get(`/${brackitID}/add-candidates/${numberCandidates}`);
        //  });
      });

  });

});
