const router = require("express").Router();
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admins", async function (req, res) {
  try {
    const response = await db.Admin.create({
      displayName: req.body.displayName,
    });
    res.json(response);
  } catch (e) {
    res.send(e);
  }
});

router.get("/admins/:adminCode/:brackitID", function (req, res) {
  try {
    const {
      adminCode,
      brackitID
    } = req.params;
    res.render("admin-brackit-codes", {
      adminCode: adminCode,
      brackitID: brackitID
    });
  } catch (e) {
    res.send(e);
  }
})

// Export routes for server.js to use.
module.exports = router;