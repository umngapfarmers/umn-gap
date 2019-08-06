const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET FIRSTAID')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_firstaid" WHERE "harvest_year_id" = $1 AND "farm_firstaid_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`First Aid information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET FIRSTAID`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST FIRSTAID LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New First Aid Log is:', req.body);
    console.log('First Aid id is:', req.body.farm_firstaid_id);
    let sqlQuery = `INSERT INTO "firstaid" ("farm_firstaid_id", "firstaid_date", "firstaid_stocked", "firstaid_comment", "firstaid_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(sqlQuery, [req.body.farm_firstaid_id, req.body.firstaid_date, req.body.firstaid_stocked, req.body.firstaid_comment, req.body.firstaid_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST FIRSTAID LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;