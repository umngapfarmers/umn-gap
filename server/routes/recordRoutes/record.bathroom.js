const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD BATHROOM')
    const harvest_year = req.query.harvest_year;
    console.log(harvest_year);
    let sqlQuery = `SELECT "bathroom"."bathroom_id", "bathroom"."bathroom_date", "bathroom"."bathroom_cleaned", "bathroom"."bathroom_sanitized", "bathroom"."area", "bathroom"."comment", "farm_bathroom"."farm_bathroom_name", "person"."person_first", "person"."person_last" FROM "bathroom" JOIN "farm_bathroom" ON "farm_bathroom"."farm_bathroom_id" = "bathroom"."farm_bathroom_id" JOIN "person" ON "person"."person_id" = "bathroom"."bathroom_sig" WHERE "bathroom"."harvest_year_id" = $1 ORDER BY "bathroom"."bathroom_date" ASC  `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Bathroom Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD BATHROOM`, error);
            res.sendStatus(500);
        })
});



module.exports = router;