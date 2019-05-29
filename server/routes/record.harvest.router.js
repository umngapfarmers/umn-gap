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
    let sqlQuery = `SELECT "crop_harvest"."crop_harvest_id", "crop_harvest"."crop_harvest_date", "crop_harvest"."crop_harvest_amount", "person"."person_first", "person"."person_last", "label_code"."label_code_text" FROM "crop_harvest" JOIN "label_code" ON "crop_harvest"."label_code_id" = "label_code"."label_code_id" JOIN "person" ON "person"."person_id" = "crop_harvest"."crop_harvest_sig" WHERE "crop_harvest"."harvest_year_id" = $1 ORDER BY "crop_harvest"."crop_harvest_date" ASC `
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

router.get('/crop', (req, res) => {
    console.log('IN GET RECORD CROP')
    const harvest_year_id = req.query.harvest_year_id;
    console.log(harvest_year_id);
    let sqlQuery = `SELECT "farm_crop"."farm_crop_type", "farm_field"."field_name", "label_code"."label_code_text", "farm_crop"."farm_crop_id" FROM "farm_crop" JOIN "label_code" ON "label_code"."farm_crop_id" = "farm_crop"."farm_crop_id" JOIN "farm_field" ON "label_code"."farm_field_id" = "farm_field"."farm_field_id" WHERE "farm_crop"."harvest_year_id" = $1 ORDER BY "farm_crop"."farm_crop_id" ASC `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`RECORD CROP Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD CROP`, error);
            res.sendStatus(500);
        })
});


module.exports = router;