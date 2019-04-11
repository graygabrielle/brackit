const router = require("express").Router();

router.get("/", function(req, res) {
    res.render('join-brackit-portal', {});
})

router.get("/:BrackitId/username", function(req, res) {
    const BrackitId = req.params.BrackitId;
    res.render('join-brackit-participant', {BrackitId});
})

router.get("/:BrackitId/waiting-room/:displayName/:admin*?", function(req, res) {
    let isAdmin = false;
    if(req.params.admin){
        isAdmin = true;
    }
    const displayName = req.params.displayName;
    res.render('waiting-room', {displayName, isAdmin});
})

module.exports = router;