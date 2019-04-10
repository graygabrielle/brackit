const router = require("express").Router();

router.get("/new-brackit", function(req, res) {
    res.render('admin-brackit-setup', {});
})

router.get("/add-candidates/:BrackitId/:numberCandidates", function(req, res) {
    const BrackitId = req.params.BrackitId;
    const numberCandidates = req.params.numberCandidates;
    res.render('admin-candidate-setup', {BrackitId, numberCandidates});
})

router.get("/codes/:BrackitId/:adminCode", function(req, res) {
    const BrackitId = req.params.BrackitId;
    const adminCode = req.params.adminCode;
    res.render('admin-brackit-codes', {BrackitId, adminCode});
})


module.exports = router;