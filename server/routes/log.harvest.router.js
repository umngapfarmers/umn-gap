const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/person', (req, res) => {
    console.log('IN GET PERSON')
    const current_harvest_id = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "person" WHERE "current_harvest_id" = $1`
    pool.query(sqlQuery, [current_harvest_id])
        .then((response) => {
            console.log(`response person`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET PERSON`, error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;