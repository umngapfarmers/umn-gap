const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/label_code', (req, res) => {
    let sqlQuery = `SELECT * FROM "label_code" ;`
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;