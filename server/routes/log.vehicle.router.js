const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET VEHICLE')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_vehicle" WHERE "harvest_year_id" = $1 AND "farm_vehicle_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Vehicle information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET VEHICLE`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST VEHICLE LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New Vehicle Log is:', req.body);
    console.log('Vehicle id is:', req.body.farm_vehicle_id);
    let sqlQuery = `INSERT INTO "vehicle" ("farm_vehicle_id", "vehicle_date", "vehicle_cleaned", "vehicle_comment", "vehicle_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlQuery, [req.body.farm_vehicle_id, req.body.vehicle_date, req.body.vehicle_cleaned, req.body.vehicle_comment, req.body.vehicle_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST VEHICLE LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;