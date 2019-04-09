const router = require("express").Router();
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admins", async function(req, res) {
  try {
    const newAdmin = await req.body;
    db.Admin.create({
      displayName: newAdmin.displayName,
    }).then(function(response) {
      res.json(response);
    })
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
})

// Export routes for server.js to use.
module.exports = router;
