const express = require("express");

const router = express.Router();

// Import the model (user.js) to use its database functions.
const User = require("../../models/users");

// Create all our routes and set up logic within those routes where required.

router.post("/admin", async function(req, res) {
  try {
    const user = await req.body;
    User.create({
      displayName: user.name,     
    });
    res.json(user);
  } catch(e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;