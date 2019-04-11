// The code in admin-brackit-setup.js handles what happens when the user clicks the "submit" button on the admin-brackit-setup page.

$(document).ready(function() {

  // When user clicks "submit"
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Make a newAdmin object
    const newAdmin = {
      displayName: $("#admin-name").val().trim()
    };

    const numberCandidates = parseInt($("input[name='num-of-cand']:checked").val());
    console.log(numberCandidates + " candidates");

    // Post the new admin
    $.post("/api/admins", newAdmin)
      // On success, run the following code
      .then(function(data) {
        console.log("New Admin:", data);
        const AdminId = data.id;
        // Make a newBrackit object
        const newBrackit = {
          name: $("#brack-name").val().trim(),
          numberCandidates: numberCandidates,
          AdminId: AdminId
        };
        // Post the new brackit
        $.post("/api/brackits", newBrackit)
          .then(function(data) {
            console.log("New Brackit:", data);
            const BrackitId = data.id;
            const newUser = {
              BrackitId: BrackitId,
              isAdmin: true,
              displayName: newAdmin.displayName
            };
            // Post the admin as a new user
            $.post("/api/users", newUser)
              .then(function(data) {
                console.log("New User:", data);
                window.location.href = `/create/add-candidates/${BrackitId}/${numberCandidates}`;
              });
          });
      });

  });

});
