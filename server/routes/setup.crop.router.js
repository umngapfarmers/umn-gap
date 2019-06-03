const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/crop', rejectUnauthenticated, (req, res) => {
    let harvestYear = req.user.current_harvest_year;

    let sqlQuery = `SELECT * FROM "farm_crop" WHERE "harvest_year_id" = $1 AND "farm_crop_status" = TRUE ORDER BY "farm_crop_id" DESC`;
    pool.query(sqlQuery, [harvestYear])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.get('/field', rejectUnauthenticated, (req, res) => {
    let harvestYear = req.user.current_harvest_year;

    let sqlQuery = `SELECT * FROM "farm_field" WHERE "harvest_year_id" = $1 AND "farm_field_status" = TRUE ORDER BY "farm_field_id" DESC`;
    pool.query(sqlQuery, [harvestYear])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Couldn't get data`, error);
            res.sendStatus(500);
        })

});

router.post('/crop', rejectUnauthenticated, (req, res) => {
    console.log('in post router');

    const newCrop = req.body;
    const queryText = `INSERT INTO "farm_crop" ("farm_crop_type", "harvest_year_id")
                    VALUES ($1, $2)`;
    const queryValues = [
        newCrop.type,
        req.user.current_harvest_year
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT crop query', err);
            res.sendStatus(500);
        });
});

router.post('/field', rejectUnauthenticated, (req, res) => {
    console.log('in post router');

    const newField = req.body;
    const queryText = `INSERT INTO "farm_field" ("field_name", "harvest_year_id")
                    VALUES ($1, $2)`;
    const queryValues = [
        newField.name,
        req.user.current_harvest_year,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT field query', err);
            res.sendStatus(500);
        });
});

router.delete('/crop/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "farm_crop" WHERE farm_crop_id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting crop query', err);
            res.sendStatus(500);
        });
});

router.delete('/field/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "farm_field" WHERE farm_field_id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting field query', err);
            res.sendStatus(500);
        });
});

router.put('/editcrop', rejectUnauthenticated, (req, res) => {

    const id = req.body.farm_crop_id
    const type = req.body.farm_crop_type
    
    const queryText = 'UPDATE "farm_crop" SET "farm_crop_type"=$1 WHERE farm_crop_id=$2';
    pool.query(queryText, [type, id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting crop query', err);
            res.sendStatus(500);
        });
});

router.put('/editfield', rejectUnauthenticated, (req, res) => {

    const id = req.body.farm_field_id
    const type = req.body.field_name

    const queryText = 'UPDATE "farm_field" SET "field_name"=$1 WHERE farm_field_id=$2';
    pool.query(queryText, [type, id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting field query', err);
            res.sendStatus(500);
        });
});

router.put('/disablecrop', rejectUnauthenticated, (req, res) => {

    const id = req.body.checked
    console.log('checked is', req.body);
    for(let num of id){ 
        const queryText = 'UPDATE "farm_crop" SET "farm_crop_status"= FALSE WHERE farm_crop_id=$1';
        pool.query(queryText, [num])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting crop query', err);
                res.sendStatus(500);
            });
    }
});

router.put('/disablefield', rejectUnauthenticated, (req, res) => {

    const id = req.body.checked
    console.log('checked is', req.body);
    for (let num of id) {
        const queryText = 'UPDATE "farm_field" SET "farm_field_status"= FALSE WHERE farm_field_id=$1';
        pool.query(queryText, [num])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting field query', err);
                res.sendStatus(500);
            });
    }
});

module.exports = router;