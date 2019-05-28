const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/person', (req, res) => {
    console.log('IN GET PERSON')
    const current_harvest_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "person" WHERE "person_status" = TRUE;`
    pool.query(sqlQuery)
        .then((response) => {
            console.log(`response person`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET PERSON`, error);
            res.sendStatus(500);
        })
});

router.post('/', (req,res) =>{
    console.log('IN ADD HARVEST LOG');
    const newHarvestLog = req.body;
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `INSERT INTO "crop_harvest" ("crop_harvest_date", "crop_harvest_amount", "crop_harvest_sig", "label_code_id", "harvest_year_id") VALUES ($1, $2, $3, $4, $5);`
    pool.query(sqlQuery, [newHarvestLog.crop_harvest_date, newHarvestLog.crop_harvest_amount, newHarvestLog.crop_harvest_sig, newHarvestLog.label_code_id, harvest_year_id ])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`ERROR in HARVEST LOG POST`, error);
        res.sendStatus(500);
    })

})
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;