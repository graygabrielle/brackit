const router = require("express").Router();

router.get("/", function(req, res) {
    res.render('join-brackit-portal', {});
})

router.get("/username", function(req, res) {
    res.render('join-brackit-participant', {});
})

router.get("/waiting-room", function(req, res) {
    res.render('brackit-waiting-room', {});
})

module.exports = router;