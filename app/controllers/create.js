const router = require("express").Router();
const db = require("../models");

router.get("/new-brackit", function(req, res) {
    res.render('admin-brackit-setup', {});
})

router.get("/add-candidates/:BrackitId/:numberCandidates", async function(req, res) {
    const {BrackitId, numberCandidates} = req.params;
    const brackit = await db.Brackit.findOne({
        where: {
            id: BrackitId
        }
    });
    const question = brackit.name;
    res.render('admin-candidate-setup', {BrackitId, numberCandidates, question});
})

router.get("/codes/:BrackitId/:adminCode", async function(req, res) {
    const BrackitId = req.params.BrackitId;
    const adminCode = req.params.adminCode;
    const brackit = await db.Brackit.findOne({
        where: {
            id: BrackitId
        }
    });
    const question = brackit.name;
    res.render('admin-brackit-codes', {BrackitId, adminCode, question});
})


router.get("/add-candidates/:BrackitId/:numberCandidates", async function(req, res) {
  const BrackitId = req.params.BrackitId;
  const numberCandidates = req.params.numberCandidates;
  const brackit = await db.Brackit.findOne({
      where: {
          id: BrackitId
      }
  });
  const question = brackit.name;
  res.render('admin-candidate-setup', {BrackitId, numberCandidates, question});
})



module.exports = router;