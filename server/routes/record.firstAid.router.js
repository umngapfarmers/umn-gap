const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD FIRSTAID')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "firstaid"."firstaid_id", "firstaid"."firstaid_date", "firstaid"."firstaid_stocked", "firstaid"."firstaid_comment", "farm_firstaid"."farm_firstaid_location", "person"."person_first", "person"."person_last" FROM "firstaid" JOIN "farm_firstaid" ON "farm_firstaid"."farm_firstaid_id" = "firstaid"."farm_firstaid_id" JOIN "person" ON "person"."person_id" = "firstaid"."firstaid_sig" WHERE "firstaid"."harvest_year_id" = $1 ORDER BY "firstaid"."firstaid_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record First Aid Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD FIRSTAID`, error);
            res.sendStatus(500);
        })
});



module.exports = router;