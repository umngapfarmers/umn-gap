const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlText = `SELECT * FROM "farm_manure" 
        JOIN "label_code" on "farm_manure"."label_code_id" = "label_code"."label_code_id"
        WHERE "farm_manure"."harvest_year_id" = $1 AND "farm_manure_status" = TRUE;`
    let harvest_id = req.user.current_harvest_year;
    console.log(`harvest id off user `, harvest_id);
    
    pool.query(sqlText, [harvest_id])
        .then((result) => {
            // console.log(`result from manure GET`, result.rows);
            res.send(result.rows)
        })
        .catch((error)=>{
            res.sendStatus(500);
        })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    
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
            
            res.send(result.rows[0]);
        })
        .catch((error)=>{
            console.log(`error in farm_manure post `, error);
            res.sendStatus(500);
        })
});

router.post('/new', rejectUnauthenticated, (req, res) => {
    
    let sqlText = `INSERT INTO "farm_manure"
        ("farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id")
        VALUES ($1, $2, $3, $4, $5);`;
    let values = [
        req.body.date,
        req.body.description,
        req.body.rate,
        req.body.label_code,
        req.user.current_harvest_year,
    ];
    
    

    pool.query(sqlText, values)
        .then((result) => {

            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log(`error in farm_manure post `, error);
            res.sendStatus(500);
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlText =  `DELETE FROM "farm_manure" WHERE "farm_manure_id" = $1`;
    let manure_id = req.params.id;
    pool.query(sqlText, [manure_id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in farm_manure delete `, error);
            res.sendStatus(500);
        })

})

router.put('/edit', rejectUnauthenticated, (req, res) => {

    const date = req.body.farm_manure_date
    const name = req.body.farm_manure_description
    const label = req.body.label_code_id
    const rate = req.body.farm_manure_rate
    const id = req.body.farm_manure_id

    const queryText = 'UPDATE "farm_manure" SET "farm_manure_date"=$1, "farm_manure_description"=$2, "label_code_id"=$3, "farm_manure_rate"=$4 WHERE farm_manure_id=$5';
    pool.query(queryText, [date, name, label, rate, id])
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
        const queryText = 'UPDATE "farm_manure" SET "farm_manure_status"= FALSE WHERE farm_manure_id=$1';
        pool.query(queryText, [num])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting crop query', err);
                res.sendStatus(500);
            });
    }
});


module.exports = router;