const router = require("express").Router();

router.get("/", function(req, res) {
    res.render('join-brackit-portal', {});
})

router.get("/:BrackitId/username", function(req, res) {
    res.render('join-brackit-participant', {});
})

router.get("/:BrackitId/waiting-room/admin/:displayName", function(req, res) {
    const adminName = req.params.displayName;
    res.render('admin-waiting-room', {adminName});
})

module.exports = router;