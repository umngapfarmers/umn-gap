const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/label_code', (req, res) => {
    let harvestYear = req.params
    let sqlQuery = `SELECT * FROM "label_code" where "harvest_year_id" = $1;`
    pool.query(sqlQuery, [harvestYear])
        
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;