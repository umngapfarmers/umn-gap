const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "farm_manure" WHERE "harvest_year_id" = $1`
    pool.query(sqlText, [1])
        .then((result) => {
            console.log(`result from manure GET`, result.rows);
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log(`error getting manure`, error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    
    let sqlText = `INSERT INTO "farm_manure"
        ("farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id","farm_manure_status")
        VALUES ($1, $2, $3, $4, $5, $6);`;
    let values = [
        req.body.farm_manure_date,
        req.body.farm_manure_description, 
        req.body.farm_manure_rate, 
        req.body.label_code_id, 
        req.body.harvest_year_id,
        req.body.farm_manure_status
    ];

    pool.query(sqlText, values)
        .then((result) => {
            console.log('added manure source ', result.rows[0]);
            
            res.send(result.rows[0]);
        })
        .catch((error)=>{
            console.log(`error in farm_manure post `, error);
            res.sendStatus(500);
        })
});

module.exports = router;