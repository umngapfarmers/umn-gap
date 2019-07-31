const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', (req, res) => {
    console.log('IN GET BATHROOM')
    console.log('Harvest year is:', req.user.current_harvest_year);
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "farm_bathroom" WHERE "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`Bathroom information`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET BATHROOM`, error);
            res.sendStatus(500);
        })
});



module.exports = router;