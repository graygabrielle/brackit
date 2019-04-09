const express = require("express");

const router = express.Router();

// Import the model (bracket.js) to use its database functions.
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admin", async function(req, res) {
  try {
    const newBracket = await req.body;
    db.Bracket.create({
      name: newBracket.bracketName,
      numberCandidates: newBracket.numberCandidates
    });
    res.json(newBracket);
  } catch(e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;
