const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET EQUIPMENT OTHER')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_equipment_other" WHERE "harvest_year_id" = $1 AND "farm_equipment_other_status" = TRUE;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Equipment Other information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET EQUIPMENT OTHER`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST EQUIPMENT OTHER LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New Equipment Other Log is:', req.body);
    console.log('Equipment Other id is:', req.body.farm_equipment_other_id);
    let sqlQuery = `INSERT INTO "equipment_other" ("farm_equipment_other_id", "equipment_other_date", "equipment_other_comment", "equipment_other_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlQuery, [req.body.farm_equipment_other_id, req.body.equipment_other_date, req.body.equipment_other_comment, req.body.equipment_other_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST EQUIPMENT OTHER LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;