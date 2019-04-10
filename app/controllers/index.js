const router = require("express").Router();
const apiRoutes = require("./apiController");
const path = require("path");

router.use("/api", apiRoutes);

router.get("/", function(req, res) {
  res.render('index');
});

router.get("/join", function(req, res) {

});

router.get("/create", function(req, res) {
  res.render('admin-brackit-setup');
});

module.exports = router;