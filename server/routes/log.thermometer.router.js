const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET THERMOMETER')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_thermometer" WHERE "harvest_year_id" = $1 AND "farm_thermometer_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Thermometer information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET THERMOMETER`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST THERMOMETER LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New Thermometer Log is:', req.body);
    console.log('Thermometer id is:', req.body.farm_thermometer_id);
    let sqlQuery = `INSERT INTO "thermometer" ("farm_thermometer_id", "thermometer_date", "thermometer_calibrate","thermometer_comment", "thermometer_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(sqlQuery, [req.body.farm_thermometer_id, req.body.thermometer_date, req.body.thermometer_calibrate, req.body.thermometer_comment, req.body.thermometer_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST THERMOMETER LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;