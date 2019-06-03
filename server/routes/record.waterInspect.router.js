const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD WATER INSPECT')
    const harvest_year = req.query.harvest_year;
    console.log(harvest_year);
    let sqlQuery = `SELECT "water_inspection"."inspection_id", "water_inspection"."inspection_date", "water_inspection"."distribution", "water_inspection"."observation", "water_inspection"."inspection_corrective_action", "farm_water_source"."farm_water_source_name", "person"."person_first", "person"."person_last" FROM "water_inspection" JOIN "farm_water_source" ON "farm_water_source"."farm_water_source_id" = "water_inspection"."inspection_water_source" JOIN "person" ON "person"."person_id" = "water_inspection"."inspection_signature" WHERE "water_inspection"."harvest_year_id" = $1 ORDER BY "water_inspection"."inspection_date" ASC `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Water Inspect Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD WATER INSPECT`, error);
            res.sendStatus(500);
        })
});



module.exports = router;