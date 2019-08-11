const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD EQUIPMENT OTHER')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "equipment_other"."equipment_other_id", "equipment_other"."equipment_other_date", "equipment_other"."equipment_other_comment", "farm_equipment_other"."farm_equipment_other_name", "person"."person_first", "person"."person_last" FROM "equipment_other" JOIN "farm_equipment_other" ON "farm_equipment_other"."farm_equipment_other_id" = "equipment_other"."farm_equipment_other_id" JOIN "person" ON "person"."person_id" = "equipment_other"."equipment_other_sig" WHERE "equipment_other"."harvest_year_id" = $1 ORDER BY "equipment_other"."equipment_other_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Equipment Other Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD EQUIPMENT OTHER`, error);
            res.sendStatus(500);
        })
});



module.exports = router;