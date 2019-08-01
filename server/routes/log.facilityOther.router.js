const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET FACILITY OTHER')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_facility_other" WHERE "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Facility Other information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET FACILITY OTHER`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST FACILITY OTHER LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('New Facility Other Log is:', req.body);
    console.log('Facility Other id is:', req.body.farm_facility_other_id);
    let sqlQuery = `INSERT INTO "facility_other" ("farm_facility_other_id", "facility_other_date", "facility_other_cleaned", "facility_other_sanitized", "facility_other_area", "facility_other_comment", "facility_other_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    pool.query(sqlQuery, [req.body.farm_facility_other_id, req.body.facility_other_date, req.body.facility_other_cleaned, req.body.facility_other_sanitized, req.body.facility_other_area, req.body.facility_other_comment, req.body.facility_other_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST FACILITY OTHER LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;