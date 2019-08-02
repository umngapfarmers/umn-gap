const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET PACKING')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_packing" WHERE "harvest_year_id" = $1 AND "farm_packing_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Packing information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET PACKING`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST PACKING LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('New Packing Log is:', req.body);
    console.log('Packing id is:', req.body.farm_packing_id);
    let sqlQuery = `INSERT INTO "packing" ("farm_packing_id", "packing_date", "packing_cleaned", "packing_sanitized", "packing_area", "packing_comment", "packing_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    pool.query(sqlQuery, [req.body.farm_packing_id, req.body.packing_date, req.body.packing_cleaned, req.body.packing_sanitized, req.body.packing_area, req.body.packing_comment, req.body.packing_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST PACKING LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;