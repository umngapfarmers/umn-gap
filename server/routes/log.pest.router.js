const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET PEST')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_pest" WHERE "harvest_year_id" = $1 AND "farm_pest_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Pest information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET PEST`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST PEST LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New Pest Log is:', req.body);
    console.log('Pest id is:', req.body.farm_pest_id);
    let sqlQuery = `INSERT INTO "pest" ("farm_pest_id", "pest_date", "pest_administrator", "pest_comment", "pest_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(sqlQuery, [req.body.farm_pest_id, req.body.pest_date, req.body.pest_administrator, req.body.pest_comment, req.body.pest_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST PEST LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;