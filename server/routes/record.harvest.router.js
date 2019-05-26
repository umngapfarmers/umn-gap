const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    console.log('IN GET RECORD HARVEST')
    const harvest_year_id = req.query.harvest_year_id;
    console.log(harvest_year_id);
    let sqlQuery = `SELECT "crop_harvest"."crop_harvest_id", "crop_harvest"."crop_harvest_date", "crop_harvest"."crop_harvest_amount", "crop_harvest"."crop_harvest_sig", "label_code"."label_code_text" FROM "crop_harvest" JOIN "label_code" ON "crop_harvest"."label_code_id" = "label_code"."label_code_id" WHERE "crop_harvest"."harvest_year_id" = $1 ORDER BY "crop_harvest"."crop_harvest_date" ASC `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`RECORD HARVEST Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD HARVEST`, error);
            res.sendStatus(500);
        })
});



module.exports = router;