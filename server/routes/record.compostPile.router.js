const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD COMPOST PILE')
    const harvest_year = req.query.harvest_year;
    console.log(harvest_year);
    let sqlQuery = `SELECT * FROM "farm_compost" WHERE "harvest_year_id" = $1 ORDER BY "farm_compost_date" ASC `
    pool.query(sqlQuery, [harvest_year])
        .then((response) => {
            console.log(`Record Compost Pile Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD COMPOST PILE`, error);
            res.sendStatus(500);
        })
});



module.exports = router;