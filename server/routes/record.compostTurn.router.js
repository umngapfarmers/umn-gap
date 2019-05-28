const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    console.log('IN GET RECORD COMPOST TURN')
    console.log('Req query is:', req.query)
    const harvest_year = req.query.harvest_year_id;
    console.log(harvest_year);
    let sqlQuery = `SELECT "farm_compost"."farm_compost_name", "compost"."compost_id", "compost"."compost_turned", "compost"."compost_date", "compost"."test_area_1_temp", "compost"."test_area_2_temp", "compost"."test_area_3_temp", "compost"."test_area_4_temp", "person"."person_first", "person"."person_last", "label_code"."label_code_text" FROM "compost" JOIN "farm_compost" ON "compost"."farm_compost_id" = "farm_compost"."farm_compost_id" JOIN "label_code" ON "label_code"."label_code_id" = "compost"."label_code_id" JOIN "person" ON "compost"."compost_sig" = "person"."person_id" WHERE "compost"."harvest_year_id" = $1 ORDER BY "compost"."compost_date" ASC `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Compost Turn Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD COMPOST Turn`, error);
            res.sendStatus(500);
        })
});



module.exports = router;