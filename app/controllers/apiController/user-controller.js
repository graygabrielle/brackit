const express = require("express");

const router = express.Router();

// Import the model (user.js) to use its database functions.
const User = require("../../models/users");

// Create all our routes and set up logic within those routes where required.

router.post("/api/users", async function(req, res) {
  try {
    const newUser = await req.body;
    db.User.create({
      displayName: newUser.name,
      isAdmin: true,
      
    }).then(function(response) {
      res.json(response);
    });
  } catch(e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;
