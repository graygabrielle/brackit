const router = require("express").Router();
const apiRoutes = require("./apiController");
const createHTMLRoutes = require("./create.js");
const joinHTMLRoutes = require("./join.js");



router.get("/", function(req, res) {
  res.render('index');
});

router.get("/join", function(req, res) {

});

router.get("/create", function(req, res) {
  res.render('admin-brackit-setup');
});

router.use("/api", apiRoutes);

router.use("/join", joinHTMLRoutes);

router.use("/create", createHTMLRoutes);

module.exports = router;