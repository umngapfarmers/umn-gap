const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    let harvestYear = req.user.current_harvest_year;
    
    let sqlQuery = `SELECT * FROM "label_code" WHERE "harvest_year_id" = $1 AND "label_code_status" = TRUE ORDER BY "label_code_id" DESC`;
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'DELETE FROM "label_code" WHERE label_code_id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting field query', err);
            res.sendStatus(500);
        });
});


/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newLabel = req.body;
    const queryText = `INSERT INTO "label_code" ("farm_crop_id","farm_field_id","label_code_text", "harvest_year_id")
                    VALUES ($1, $2, $3, $4)`;
    const queryValues = [
        newLabel.crop_id,
        newLabel.field_id,
        newLabel.label_code,
        req.user.current_harvest_year,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing INSERT labelCode query', err);
            res.sendStatus(500);
        });


});

router.put('/edit', rejectUnauthenticated, (req, res) => {

    const farmId = req.body.farm_field_id
    const cropId = req.body.farm_crop_id
    const text = req.body.label_code_text
    const labelId = req.body.label_code_id

    const queryText = 'UPDATE "label_code" SET "farm_field_id"=$1, "farm_crop_id"=$2, "label_code_text"=$3 WHERE label_code_id=$4';
    pool.query(queryText, [farmId, cropId, text, labelId])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting field query', err);
            res.sendStatus(500);
        });
});

router.put('/disable', rejectUnauthenticated, (req, res) => {

    const id = req.body.checked
    console.log('checked is', req.body);
    for (let num of id) {
        const queryText = 'UPDATE "label_code" SET "label_code_status"= FALSE WHERE label_code_id=$1';
        pool.query(queryText, [num])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting crop query', err);
                res.sendStatus(500);
            });
    }
});

module.exports = router;