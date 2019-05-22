const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    const newWater = req.body;
    const queryText = `INSERT INTO "farm_water_source" ("farm_water_source_name","harvest_year_id")
                    VALUES ($1, $2)`;
    const queryValues = [
        newWater.name,
        /* req.user.current_harvest_year, */
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completeing INSERT watersource query', err, req.user.current_harvest_year);
            res.sendStatus(500);
        });

});


module.exports = router;