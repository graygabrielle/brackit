const router = require("express").Router();
const apiRoutes = require("./apiController");
const path = require("path");

router.use("/api", apiRoutes);

module.exports = router;