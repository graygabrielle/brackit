const router = require("express").Router();

router.get("/play", function(req, res) {
    res.render('brackit-matchup', {});
})

router.get("/await-results", function(req, res) {
    res.render('await-results', {});
})

router.get("/results", function(req, res) {
    res.render('brackit-round-results', {});
})

router.get("/final-results", function(req, res) {
    res.render('brackit-final-results', {});
})


module.exports = router;