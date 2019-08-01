const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET COOLER')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_cooler" WHERE "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Cooler information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET COOLER`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST COOLER LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('New Cooler Log is:', req.body);
    console.log('Cooler id is:', req.body.farm_cooler_id);
    let sqlQuery = `INSERT INTO "cooler" ("farm_cooler_id", "cooler_date", "cooler_temperature", "cooler_cleaned", "cooler_sanitized", "cooler_area", "cooler_comment", "cooler_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    pool.query(sqlQuery, [req.body.farm_cooler_id, req.body.cooler_date, req.body.cooler_temperature, req.body.cooler_cleaned, req.body.cooler_sanitized, req.body.cooler_area, req.body.cooler_comment, req.body.cooler_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST COOLER LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;