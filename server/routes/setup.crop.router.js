const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/crop', (req, res) => {
    const queryText = `SELECT * FROM "farm_crop"`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.get('/field', (req, res) => {
    const queryText = `SELECT * FROM "farm_field"`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.post('/crop', (req, res) => {
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

router.post('/field', (req, res) => {
    console.log('in post router');

    const newField = req.body;
    const queryText = `INSERT INTO "farm_field" ("farm_field_name")
                    VALUES ($1)`;
    const queryValues = [
        newField.name,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT field query', err);
            res.sendStatus(500);
        });
});
module.exports = router;