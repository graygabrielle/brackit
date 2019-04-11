const router = require("express").Router();
const db = require("../models");


router.get("/play/brack/:brackitId/round/:roundNumber/matchup/:matchupNumber", function (req, res) {
    const roundNumber = req.params.roundNumber;
    const matchupNumber = req.params.matchupNumber;
    const bracketId = req.params.brackitId;
    db.sequelize.query(`SELECT matchup, roundNumber, brack.name "question", cand.name "candidateName", cand.id "candidateId", brack.id "brackitId" FROM Matchups mat INNER JOIN Candidates cand ON cand.id = mat.CandidateId INNER JOIN Brackits brack on brack.id = cand.BrackitId WHERE matchup=${matchupNumber} AND roundNumber=${roundNumber} AND brack.id=${bracketId};`, 
    {
        type: db.sequelize.QueryTypes.SELECT
    }).then((candidates, metadata) => {
        console.log(candidates);
        res.render('brackit-matchup', {candidates})
    }).catch((error) => {
        console.log(error)
    })   
})

//do we need round number for this?
router.get("/await-results", function (req, res) {
    res.render('await-results', {});
})

//variable path name with bracket id
router.get("/results", function (req, res) {
    //this is where we will calculate winners
    //join votes w matchups w candidates w brackets
    //count votes for each matchup
    //update table with new matchups for next round


    //then pull all matchups with bracket id (joined w candidates)
    //OR pull next round of matchups
    res.render('brackit-round-results', {});
})

//variable path name w bracket id
router.get("/final-results", function (req, res) {
    res.render('brackit-final-results', {});
})


module.exports = router;