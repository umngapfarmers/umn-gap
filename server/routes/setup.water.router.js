const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "farm_water_source"`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.post('/', (req, res) => {
    const newWaterSource = req.body;
    const queryText = `INSERT INTO "farm_water_source" ("farm_water_source_name")
                    VALUES ($1)`;
    const queryValues = [
        newWaterSource.name,
        
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completeing INSERT watersource query', err);
            res.sendStatus(500);
        });

});


module.exports = router;