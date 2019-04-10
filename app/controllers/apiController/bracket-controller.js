const router = require("express").Router();
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/brackits", async function (req, res) {
  try {

    const response = await db.Bracket.create({
      name: req.body.name,
      numberCandidates: req.body.numberCandidates,
      AdminId: req.body.AdminId
    });
    res.render("admin-candidate-setup", response);
  } catch (e) {
    res.send(e);
  }
});

router.get("/brackits/:brackitID", async function (req, res) {
  try {
    const response = db.Bracket.findOne({
      where: {
        id: req.params.brackitID
      }
    });
    res.json(response);

  } catch (e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;