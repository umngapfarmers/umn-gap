const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD VEHICLE')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "vehicle"."vehicle_id", "vehicle"."vehicle_date", "vehicle"."vehicle_cleaned","vehicle"."vehicle_comment", "farm_vehicle"."farm_vehicle_name", "person"."person_first", "person"."person_last" FROM "vehicle" JOIN "farm_vehicle" ON "farm_vehicle"."farm_vehicle_id" = "vehicle"."farm_vehicle_id" JOIN "person" ON "person"."person_id" = "vehicle"."vehicle_sig" WHERE "vehicle"."harvest_year_id" = $1 ORDER BY "vehicle"."vehicle_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Vehicle Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD VEHICLE`, error);
            res.sendStatus(500);
        })
});



module.exports = router;