const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
    let harvestYear = req.user.current_harvest_year;
    let sqlQuery = `SELECT * FROM "label_code" where "harvest_year_id" = $1;`
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

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM "farm_field" WHERE farm_field_id=$1';
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
router.post('/', (req, res) => {
    const newLabel = req.body;
    const queryText = `INSERT INTO "label_code" ("farm_crop_id","farm_field_id","label_code_text", "harvest_year_id")
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