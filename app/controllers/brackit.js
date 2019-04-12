const router = require("express").Router();
const db = require("../models");

router.get("/play/brack/:brackitId/round/:roundNumber/matchup/:matchupNumber", function (req, res) {
  const roundNumber = req.params.roundNumber;
  const matchupNumber = req.params.matchupNumber;
  const bracketId = req.params.brackitId;

  db.sequelize.query(`SELECT matchup, roundNumber, brack.name "question", cand.name "candidateName", cand.id "candidateId", brack.id "brackitId" FROM Matchups mat INNER JOIN Candidates cand ON cand.id = mat.CandidateId INNER JOIN Brackits brack on brack.id = cand.BrackitId WHERE matchup=${matchupNumber} AND roundNumber=${roundNumber} AND brack.id=${bracketId}`, {
    type: db.sequelize.QueryTypes.SELECT
  }).then((candidates, metadata) => {
    console.log(candidates);
    res.render('brackit-matchup', {
      candidates
    })
  }).catch((error) => {
    console.log(error)
  })

})

//do we need round number for this?
router.get("/await-results", function (req, res) {
  res.render('await-results');
})

router.get("/results/brack/:brackitId/round/:roundNumber/of/:numRounds", function (req, res) {

  const brackitId = req.params.brackitId;
  const numRounds = req.params.numRounds;
  const roundNumber = req.params.roundNumber;

  console.log(brackitId);
  console.log(numRounds);
  console.log(roundNumber);

  function mostFreqCand(arr) {
    var obj = {},
      mostFreq = 0,
      which = [];

    arr.forEach(ea => {
      if (!obj[ea]) {
        obj[ea] = 1;
      } else {
        obj[ea]++;
      }

      if (obj[ea] > mostFreq) {
        mostFreq = obj[ea];
        which = [ea];
      } else if (obj[ea] === mostFreq) {
        which.push(ea);
      }
    });

    return which;
  };

  async function voteCounter(numRounds, roundNumber) {
    // try {

    const votes = await db.sequelize.query(`SELECT color, matchup, vot.roundNumber, brack.name 'question', cand.name 'candidateName', cand.id 'candidateId', brack.id 'brackitId' FROM Votes vot INNER JOIN Matchups mat ON mat.roundNumber = vot.roundNumber AND mat.CandidateId = vot.CandidateId INNER JOIN Candidates cand ON cand.id = vot.CandidateId INNER JOIN Brackits brack on brack.id = cand.BrackitId WHERE brack.id=${brackitId} AND vot.roundNumber=${roundNumber}`, {
      type: db.sequelize.QueryTypes.SELECT
    });

    console.log(votes);

    const roundsRemaining = numRounds - roundNumber;
    const numMatchups = 2 ** roundsRemaining;
    console.log("numMatchups:", numMatchups);

    const candidateVotes = [];
    const roundWinners = [];

    for (let i = 1; i <= numMatchups; i++) {
      candidateVotes.push([]);
    }

    for (let i = 0; i < votes.length; i++) {
      candidateVotes[votes[i].matchup - 1].push(votes[i].candidateId);
    }
    console.log("Candidate votes by matchup:", candidateVotes);

    for (let i = 0; i < candidateVotes.length; i++) {
      roundWinners.push(mostFreqCand(candidateVotes[i]));
    }
    console.log("Tentative winners:", roundWinners);

    for (let i = 0; i < roundWinners.length; i++) {
      roundWinners[i] = roundWinners[i][Math.floor(Math.random() * roundWinners[i].length)];
      if (i === roundWinners.length - 1) {
        console.log("Winners after tiebreaker:", roundWinners);
      }
    }

    if (roundNumber !== numRounds) {
      const nextRound = parseInt(roundNumber) + 1;
      console.log("nextRound:", nextRound);

      const remainingCandidates = roundWinners;

      const matchups = [];

      for (let i = 0; i < remainingCandidates.length / 2; i++) {
        matchups.push([remainingCandidates[i], i + 1], [remainingCandidates[remainingCandidates.length - 1 - i], i + 1]);
      }

      console.log("matchups:", matchups);
      let newMatchups = [];

      for (let i = 0; i < matchups.length; i++) {
        const match = await db.Matchup.create({
          CandidateId: parseInt(matchups[i][0]),
          matchup: matchups[i][1],
          roundNumber: nextRound
        });
        newMatchups.push(match);
        if (i === matchups.length - 1) {
          console.log("display results for this round");
          console.log("winners for this round: " + newMatchups);
          res.render('brackit-round-results', {
            newMatchups
          });
        }
      }

    } else {
      console.log("display final results");
      console.log(roundWinners[0]);
      const finalWinner = await db.Candidate.findOne({
        where: {
          id: roundWinners[0]
        }
      })
      console.log(finalWinner.dataValues);

      res.render('brackit-final-results', finalWinner.dataValues);
    }
  }
  // } catch (err) {
  //   console.log(err)
  // }


  voteCounter(numRounds, roundNumber);

})


//variable path name w bracket id
// router.get("/final-results/:brackitId/round/:totalRounds", function (req, res) {
//   // db.Matchup.findAll({
//   //   where: {
//   //     roundNumber = 
//   //   }
//   // })

//     res.render('brackit-final-results', {});
// })

module.exports = router;