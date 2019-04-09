const express = require("express");

const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Import the model (brackets.js) to use its database functions.
const Brackit = require("../../models/brackets");

// Create all our routes and set up logic within those routes where required.

router.post("/api/brackits", async function(req, res) {
  try {
    const newBrackit = await req.body;
    Brackit.create({
      name: newBrackit.name,
      numberCandidates: newBrackit.numberCandidates,
      AdminId: newBrackit.AdminId
    }).then(function(response) {
      res.render("admin-candidate-setup", response);
    });
  } catch(e) {
    res.send(e);
  }
});

router.get("/api/brackits/:brackitID", async function(req, res) {
  try {
    Brackit.findOne({
      where: {
        id: req.params.brackitID
      }
    }).then(function(response) {
      res.json(response);
    });
  } catch(e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;
