const router = require("express").Router();
const db = require("../models");

router.get("/", function (req, res) {
    res.render('join-brackit-portal', {});
})

router.get("/:BrackitId/username", function (req, res) {
    const BrackitId = req.params.BrackitId;
    res.render('join-brackit-participant', {
        BrackitId
    });
})

router.get("/:BrackitId/waiting-room/:userId/:displayName/:admin*?", function (req, res) {
    let isAdmin = false;
    if (req.params.admin) {
        isAdmin = true;
    }

        //this will need to be a database call instead of just from URL - also necessary to get admin name.  can join bracket db with admin on admin id and pass obj.

        const displayName = req.params.displayName;
        const userId = req.params.userId;
        const BrackitId = req.params.BrackitId;
        res.render('waiting-room', {
            displayName,
            isAdmin,
            userId,
            BrackitId
        });

    })


module.exports = router;