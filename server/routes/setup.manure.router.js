const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "farm_manure" 
        JOIN "label_code" on "farm_manure"."label_code_id" = "label_code"."label_code_id"
        WHERE "farm_manure"."harvest_year_id" = $1;`
    let harvest_id = req.user.current_harvest_year;
    console.log(`harvest id off user `, harvest_id);
    
    pool.query(sqlText, [harvest_id])
        .then((result) => {
            // console.log(`result from manure GET`, result.rows);
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log(`error getting manure`, error);
            res.sendStatus(500);
        })
});


router.post('/', (req, res) => {
    
    let sqlText = `INSERT INTO "farm_manure"
        ("farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id","farm_manure_status")
        VALUES ($1, $2, $3, $4, $5, $6);`;
    let values = [
        req.body.farm_manure_date,
        req.body.farm_manure_description, 
        req.body.farm_manure_rate, 
        req.body.label_code_id, 
        req.user.current_harvest_year,
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

router.delete('/:id', (req, res) => {
    let sqlText =  `DELETE FROM "farm_manure" WHERE "farm_manure_id" = $1`;
    let manure_id = req.params.id;
    pool.query(sqlText, [manure_id])
        .then((result) => {
            console.log('deleted manure source ');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in farm_manure delete `, error);
            res.sendStatus(500);
        })

})

module.exports = router;