const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    console.log('in post router');

    const newCrop = req.body;
    const queryText = `INSERT INTO "farm_crop" ("farm_crop_type")
                    VALUES ($1)`;
    const queryValues = [
        newCrop.type,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT crop query', err);
            res.sendStatus(500);
        });

});
module.exports = router;