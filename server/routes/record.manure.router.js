const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD MANURE')
    const harvest_year = req.query.harvest_year;
    console.log(harvest_year);
    let sqlQuery = `SELECT "farm_manure"."farm_manure_id", "farm_manure"."farm_manure_date", "farm_manure"."farm_manure_description", "farm_manure"."farm_manure_rate", "label_code"."label_code_text" FROM "farm_manure" JOIN "label_code" ON "label_code"."label_code_id" = "farm_manure"."label_code_id" WHERE "farm_manure"."harvest_year_id" = $1 ORDER BY "farm_manure"."farm_manure_date" ASC `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Manure Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD MANURE`, error);
            res.sendStatus(500);
        })
});



module.exports = router;