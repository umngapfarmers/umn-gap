const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD THERMOMETER')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "thermometer"."thermometer_id", "thermometer"."thermometer_date", "thermometer"."thermometer_calibrate","thermometer"."thermometer_comment", "farm_thermometer"."farm_thermometer_location", "person"."person_first", "person"."person_last" FROM "thermometer" JOIN "farm_thermometer" ON "farm_thermometer"."farm_thermometer_id" = "thermometer"."farm_thermometer_id" JOIN "person" ON "person"."person_id" = "thermometer"."thermometer_sig" WHERE "thermometer"."harvest_year_id" = $1 ORDER BY "thermometer"."thermometer_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Thermometer Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD THERMOMETER`, error);
            res.sendStatus(500);
        })
});



module.exports = router;