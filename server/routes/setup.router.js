const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/addHarvestYear', rejectUnauthenticated, (req, res) => {
    const newHarvestYear = req.body;
    console.log(newHarvestYear);
    const sqlText = `INSERT INTO "harvest_year" ("harvest_year", "farm_id") VALUES ($1, $2);`;

    pool.query(sqlText, 
        [ newHarvestYear.harvest_year, newHarvestYear.farm_id]
    )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in addHarvestYear POST`, error);
            res.sendStatus(500);
        });
});


module.exports = router;