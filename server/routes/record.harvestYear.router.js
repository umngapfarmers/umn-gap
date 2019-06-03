const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD HARVEST YEAR')
    const farm_id = req.user.farm_registry_id;
    console.log(farm_id);
    let sqlQuery = `SELECT * FROM "harvest_year" WHERE "farm_id" = $1`
    pool.query(sqlQuery, [farm_id])
        .then((response) => {
            console.log(`Record Harvest Year Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD HARVEST YEAR`, error);
            res.sendStatus(500);
        })
});



module.exports = router;