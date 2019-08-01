const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET TOOL')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_tool" WHERE "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Tool information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET TOOL`, error);
            res.sendStatus(500);
        })
});


router.post('/add', rejectUnauthenticated, (req,res) => {
    console.log('IN POST TOOL LOG');
    const harvest_year_id = req.user.current_harvest_year;
    const user_id= req.user
    console.log('User id is:', req.user);
    console.log('New Tool Log is:', req.body);
    console.log('Tool id is:', req.body.farm_tool_id);
    let sqlQuery = `INSERT INTO "tool" ("farm_tool_id", "tool_date", "tool_cleaned", "tool_sanitized", "tool_comment", "tool_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlQuery, [req.body.farm_tool_id, req.body.tool_date, req.body.tool_cleaned, req.body.tool_sanitized, req.body.tool_comment, req.body.tool_sig, harvest_year_id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`ERROR in POST TOOL LOG`, error);
            res.sendStatus(500);
        })
})



module.exports = router;