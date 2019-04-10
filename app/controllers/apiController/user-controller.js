const router = require("express").Router();
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admin", async function(req, res) {
  try {
    const user = await db.User.create({
      displayName: req.body.name 
    });  
    res.json(user);
  } catch {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;
