const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/:harvest_year_id', (req, res) => {
    let harvestYear = req.params.harvest_year_id
    let sqlQuery = `SELECT * FROM "label_code" where "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvestYear])
        .then((response) => {
            console.log(`response label_code`, response.rows);
            res.send(response.rows)
        })
        .catch((error) => {
            console.log(`error getting label codes `, error);
            res.sendStatus(500);
        })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;