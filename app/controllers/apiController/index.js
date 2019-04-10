const router = require("express").Router();
const path = require("path");

// Import the models to use their database functions.
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admins", async function(req, res) {
  try {
    const newAdmin = await req.body;
    db.Admin.create({
      displayName: newAdmin.displayName
    }).then(function(response) {
      res.json(response);
      console.log("admin response!:", response);
    });
  } catch(e) {
    res.send(e);
  }
});

router.post("/users", async function(req, res) {
  try {
    const newUser = await req.body;
    console.log(newUser);
    db.User.create({
      BrackitId: newUser.BrackitId,
      displayName: newUser.displayName,
      isAdmin: newUser.isAdmin
    }).then(function(response) {
      res.json(response);
      console.log("user response!:", response);
    });
  } catch(e) {
    res.send(e);
  }
});

router.get("/admins/:adminCode/:brackitID", function(req, res) {
  try {
    const adminCode = req.params.adminCode;
    const brackitID = req.params.brackitID;
    res.render("admin-brackit-codes", {adminCode, brackitID});
  } catch(e) {
    res.send(e);
  }
});

router.post("/brackits", async function(req, res) {
  try {
    const newBrackit = await req.body;
    db.Brackit.create({
      name: newBrackit.name,
      numberCandidates: newBrackit.numberCandidates,
      AdminId: newBrackit.AdminId
    }).then(function(response) {
      //res.json(response);
      console.log("brackit response!:", response);
      res.render("admin-candidate-setup", response);
    });
  } catch(e) {
    res.send(e);
  }
});

router.get("/brackits/:brackitID", async function(req, res) {
  try {
    db.Brackit.findOne({
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
