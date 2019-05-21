const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    const newWater = req.body;
    const queryText = `INSERT INTO "farm_water" ("farm_","farm_field_id","label_code_text", "harvest_year_id")
                    VALUES ($1, $2, $3, $4)`;
    const queryValues = [
        newLabel.farm_crop_id,
        newLabel.farm_field_id,
        newLabel.label_code_text,
        newLabel.harvest_year_id,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT labelCode query', err);
            res.sendStatus(500);
        });

});

module.exports = router;