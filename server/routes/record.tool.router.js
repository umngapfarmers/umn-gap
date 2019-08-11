const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD TOOL')
    console.log('req.query is', req.query);
    const harvest_year_id = Number(req.query.harvest_year_id);
    console.log('Harvest year is', harvest_year_id);
    let sqlQuery = `SELECT "tool"."tool_id", "tool"."tool_date", "tool"."tool_cleaned", "tool"."tool_sanitized", "tool"."tool_comment", "farm_tool"."farm_tool_name", "person"."person_first", "person"."person_last" FROM "tool" JOIN "farm_tool" ON "farm_tool"."farm_tool_id" = "tool"."farm_tool_id" JOIN "person" ON "person"."person_id" = "tool"."tool_sig" WHERE "tool"."harvest_year_id" = $1 ORDER BY "tool"."tool_date" ASC  `
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Record Tool Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD TOOL`, error);
            res.sendStatus(500);
        })
});



module.exports = router;