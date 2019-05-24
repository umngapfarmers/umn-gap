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
    let sqlQuery = `SELECT `
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