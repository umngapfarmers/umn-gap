const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD FACILITY OTHER')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "facility_other"."facility_other_id", "facility_other"."facility_other_date", "facility_other"."facility_other_cleaned", "facility_other"."facility_other_sanitized", "facility_other"."facility_other_area", "facility_other"."facility_other_comment", "farm_facility_other"."farm_facility_other_name", "person"."person_first", "person"."person_last" FROM "facility_other" JOIN "farm_facility_other" ON "farm_facility_other"."farm_facility_other_id" = "facility_other"."farm_facility_other_id" JOIN "person" ON "person"."person_id" = "facility_other"."facility_other_sig" WHERE "facility_other"."harvest_year_id" = $1 ORDER BY "facility_other"."facility_other_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Facility Other Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD FACILITY OTHER`, error);
            res.sendStatus(500);
        })
});



module.exports = router;