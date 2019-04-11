const router = require("express").Router();
const path = require("path");

// Import the models to use their database functions.
const db = require("../../models");

// Create all our routes and set up logic within those routes where required.

router.post("/admins", async function(req, res) {
  try {
    const newAdmin = req.body;
    const response = await db.Admin.create({
      displayName: newAdmin.displayName
    });
    res.json(response);
    console.log("admin response!:", response);
  } catch(e) {
    res.send(e);
  }
});

router.post("/users", async function(req, res) {
  try {
    const newUser = req.body;
    console.log(newUser);
    const response = await db.User.create({
      BrackitId: newUser.BrackitId,
      displayName: newUser.displayName,
      isAdmin: newUser.isAdmin
    });
    res.json(response);
    console.log("user response!:", response);
  } catch(e) {
    res.send(e);
  }
});

// router.get("/admins/:adminCode/:brackitID", function(req, res) {
//   try {
//     const adminCode = req.params.adminCode;
//     const brackitID = req.params.brackitID;
//     res.render("admin-brackit-codes", {adminCode, brackitID});
//   } catch(e) {
//     res.send(e);
//   }
// });

router.post("/brackits", async function(req, res) {
  try {
    const newBrackit = req.body;
    const response = await db.Brackit.create({
      name: newBrackit.name,
      numberCandidates: newBrackit.numberCandidates,
      AdminId: newBrackit.AdminId
    });
    res.json(response);
    console.log("brackit response!:", response);
  } catch(e) {
    res.send(e);
  }
});

router.get("/brackits/:BrackitId", async function(req, res) {
  try {
    const response = await db.Brackit.findOne({
      where: {
        id: req.params.BrackitId
      }
    });
    res.json(response);
  } catch(e) {
    res.send(e);
  }
});

router.post("/candidates", async function(req, res) {
  try {
    const newCandidate = req.body;
    const response = await db.Candidate.create({
      BrackitId: newCandidate.BrackitId,
      name: newCandidate.name
    });
    res.json(response);
  } catch(e) {
    res.send(e);
  }
});

router.get("/users/:joinCode", async function(req, res) {
  try {
    const joinCode = req.params.joinCode;
    let BrackitId;
    let isAdmin = false;
    if (joinCode.includes("-")) {
      const codesArr = joinCode.split("-");
      BrackitId = codesArr[1];
      isAdmin = true;
    } else {
      BrackitId = joinCode;
    }
    const response = [await db.User.findAll({
      where: {
        BrackitId: BrackitId
      }
    }), isAdmin
    ];
    res.json(response);
  } catch(e) {
    res.send(e);
  }
});

router.get("/candidates/:BrackitId", async function(req, res) {
  try {
    const BrackitId = req.params.BrackitId;
    const response = await db.Candidate.findAll({
      where: {
        BrackitId: BrackitId
      }
    });
    res.json(response);
  } catch(e) {
    res.send(e);
  }
});

router.post("/matchups/roundOne", async function(req, res) {

  try {

    const candidates = req.body.postedCandidates;

    const powerOfTwo = Math.log(candidates.length)/Math.log(2);
    const numRounds = powerOfTwo | 0;
    console.log("Number of rounds:", numRounds);

    const matchups = [];

    for (let i = 0; i < candidates.length/2; i++) {
      matchups.push([candidates[i], i + 1], [candidates[candidates.length - 1 - i], i + 1]);
    }

    console.log("matchups:", matchups);

    const roundNumber = 1;
    
    let response = [];

    for (let i = 0; i < matchups.length; i++) { 
      response[i] = await db.Matchup.create({
      CandidateId: parseInt(matchups[i][0].id),
      matchup: matchups[i][1],
      roundNumber: roundNumber
      });
      console.log(`response ${i + 1}:`, response);
      if (i === matchups.length - 1) {
        res.json(response);
      }
    }

  } catch(e) {
    res.send(e);
  }
});

// Export routes for server.js to use.
module.exports = router;
