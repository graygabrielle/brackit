const router = require("express").Router();
const apiRoutes = require("./apiController");
const path = require("path");

router.use("/api", apiRoutes);

router.get("/", function(req, res) {
    res.render('index');
})

router.get("/test", function(req, res) {
    res.render("test");
})

module.exports = router;