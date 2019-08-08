const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD COOLER')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "cooler"."cooler_id", "cooler"."cooler_date", "cooler"."cooler_cleaned", "cooler"."cooler_sanitized", "cooler"."cooler_area", "cooler"."cooler_comment", "cooler"."cooler_temperature", "farm_cooler"."farm_cooler_name", "person"."person_first", "person"."person_last" FROM "cooler" JOIN "farm_cooler" ON "farm_cooler"."farm_cooler_id" = "cooler"."farm_cooler_id" JOIN "person" ON "person"."person_id" = "cooler"."cooler_sig" WHERE "cooler"."harvest_year_id" = $1 ORDER BY "cooler"."cooler_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Bathroom Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD COOLER`, error);
            res.sendStatus(500);
        })
});



module.exports = router;