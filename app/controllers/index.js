const router = require("express").Router();
const apiRoutes = require("./apiController");
const createHTMLRoutes = require("./create.js");
const joinHTMLRoutes = require("./join.js");
const brackitHTMLRoutes = require("./brackit.js")



router.get("/", function(req, res) {
  res.render('index');
});

router.use("/api", apiRoutes);

router.use("/join", joinHTMLRoutes);

router.use("/create", createHTMLRoutes);

router.use("/brackit", brackitHTMLRoutes);

module.exports = router;