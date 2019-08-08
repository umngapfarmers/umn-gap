const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD PACKING')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "packing"."packing_id", "packing"."packing_date", "packing"."packing_cleaned", "packing"."packing_sanitized", "packing"."packing_area", "packing"."packing_comment", "farm_packing"."farm_packing_name", "person"."person_first", "person"."person_last" FROM "packing" JOIN "farm_packing" ON "farm_packing"."farm_packing_id" = "packing"."farm_packing_id" JOIN "person" ON "person"."person_id" = "packing"."packing_sig" WHERE "packing"."harvest_year_id" = $1 ORDER BY "packing"."packing_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Packing Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD PACKING`, error);
            res.sendStatus(500);
        })
});



module.exports = router;