const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD PEST')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "pest"."pest_id", "pest"."pest_date", "pest"."pest_administrator", "pest"."pest_comment", "farm_pest"."farm_pest_location", "farm_pest"."farm_pest_type", "person"."person_first", "person"."person_last" FROM "pest" JOIN "farm_pest" ON "farm_pest"."farm_pest_id" = "pest"."farm_pest_id" JOIN "person" ON "person"."person_id" = "pest"."pest_sig" WHERE "pest"."harvest_year_id" = $1 ORDER BY "pest"."pest_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record pest Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD PEST`, error);
            res.sendStatus(500);
        })
});



module.exports = router;