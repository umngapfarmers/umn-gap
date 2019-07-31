const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET BATHROOM')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_bathroom" WHERE "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Bathroom information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET BATHROOM`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST BATHROOM LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('New Bathroom Log is:', req.body);
    console.log('Bathroom id is:', req.body.farm_bathroom_id);
    let sqlQuery = `INSERT INTO "bathroom" ("farm_bathroom_id", "bathroom_date", "bathroom_cleaned", "bathroom_sanitized", "bathroom_area", "bathroom_comment", "bathroom_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    pool.query(sqlQuery, [req.body.farm_bathroom_id, req.body.bathroom_date, req.body.bathroom_cleaned, req.body.bathroom_sanitized, req.body.bathroom_area, req.body.bathroom_comment, req.body.bathroom_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST BATHROOM LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;