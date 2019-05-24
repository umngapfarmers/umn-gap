const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/source', (req, res) => {
    let harvestYear = req.user.current_harvest_year;

    const queryText = `SELECT * FROM "farm_water_source" WHERE "harvest_year_id" = $1 AND farm_water_status = true`;
    pool.query(queryText, [harvestYear])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.get('/label', (req, res) => {
    let harvestYear = req.user.current_harvest_year;

    const queryText = ` SELECT * FROM "farm_water_source" 
    JOIN "farm_water" ON "farm_water"."farm_water_source_id" = "farm_water_source"."farm_water_source_id"
    JOIN "label_code" ON "label_code"."label_code_id" = 
    "farm_water"."label_code_id"
    WHERE "farm_water"."harvest_year_id" = $1 AND "farm_water"."farm_water_status" = TRUE`;
    pool.query(queryText, [harvestYear])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.post('/source', (req, res) => {

    const newWaterSource = req.body;
    const queryText = `INSERT INTO "farm_water_source" (farm_water_source_name,harvest_year_id)
                    VALUES ($1, $2)`;
    const queryValues = [
        newWaterSource.name,
        req.user.current_harvest_year,

    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completeing INSERT watersource query', err);
            res.sendStatus(500);
        });

});

router.post('/label', (req, res) => {
    
    const newWaterLabel = req.body;
    const queryText = `INSERT INTO "farm_water" ("farm_water_source_id", "label_code_id", "harvest_year_id")
                    VALUES ($1, $2, $3)`;
    const queryValues = [
        newWaterLabel.farm_water_source_id,
        newWaterLabel.label_code_id,
        req.user.current_harvest_year,
        
    ];
    console.log('queryValues post water ', queryValues);
    
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completeing INSERT waterlabel query', err);
            res.sendStatus(500);
        });

});

router.delete('/source/:id', (req, res) => {
    const queryText = 'DELETE FROM "farm_water_source" WHERE farm_water_source_id = $1 ';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting crop query', err);
            res.sendStatus(500);
        });
});

router.delete('/label/:id', (req, res) => {
    const queryText = 'DELETE FROM "farm_water" WHERE farm_water_id = $1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting crop query', err);
            res.sendStatus(500);
        });
});


module.exports = router;