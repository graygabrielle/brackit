const express = require("express");

const router = express.Router();

router.use(express.urlencoded({extended: true}));

// Import the model (brackets.js) to use its database functions.
const Admin = require("../../models/admins");

// Create all our routes and set up logic within those routes where required.

router.post("/api/admins", async function(req, res) {
  try {
    const newAdmin = await req.body;
    Admin.create({
      displayName: newAdmin.displayName,
    }).then(function(response) {
      res.json(response);
    })
  } catch(e) {
    res.send(e);
  }
});

router.get("/api/admins/:adminCode/:brackitID", function(req, res) {
  try {
    const adminCode = req.params.adminCode;
    const brackitID = req.params.brackitID;
    res.render("admin-brackit-codes", {adminCode, brackitID});
  } catch(e) {
    res.send(e);
  }
})

// Export routes for server.js to use.
module.exports = router;
