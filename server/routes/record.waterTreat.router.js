const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    console.log('IN GET RECORD WATER TREAT')
    const harvest_year = req.query.harvest_year;
    console.log(harvest_year);
    let sqlQuery = `SELECT "water_treatment"."treatment_id", "water_treatment"."treatment_date", "water_treatment"."water_ph", "water_treatment"."water_temp", "water_treatment"."turbidity", "water_treatment"."sanitizer", "water_treatment"."corrective_action",  "farm_water_source"."farm_water_source_name", "person"."person_first", "person"."person_last" FROM "water_treatment" JOIN "farm_water_source" ON "farm_water_source"."farm_water_source_id" = "water_treatment"."farm_water_source_id" JOIN "person" ON "person"."person_id" = "water_treatment"."treatment_sig" WHERE "water_treatment"."harvest_year_id" = $1 `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Water Treatment Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD WATER TREAT`, error);
            res.sendStatus(500);
        })
});



module.exports = router;