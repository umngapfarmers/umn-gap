const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlText = `SELECT * FROM "farm_compost" WHERE "farm_compost"."harvest_year_id" = $1 AND "farm_compost"."farm_compost_status"=true;`
    let harvest_id = req.user.current_harvest_year;
    console.log(`harvest id off user GET`, harvest_id);
    // let harvest_id = 2
    pool.query(sqlText, [harvest_id])
        .then((result) => {
            console.log(`result from compost GET`, result.rows);
            res.send(result.rows)
        })
        .catch((error)=>{
            console.log(`error getting compost`, error);
            res.sendStatus(500);
        })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(`in post compost `, req.user);
    
    let sqlText = `INSERT INTO "farm_compost"
        ("farm_compost_name", "farm_compost_date", "farm_compost_description", "harvest_year_id", "farm_compost_status")
        VALUES ($1, $2, $3, $4, $5);`;
    let values = [
        req.body.farm_compost_name,
        req.body.farm_compost_date,
        req.body.farm_compost_description,
        req.user.current_harvest_year,
        req.body.farm_compost_status
    ];

    pool.query(sqlText, values)
        .then((result) => {
            console.log(`sent compost`);
            
            res.sendStatus(201);
        })
        .catch((error)=>{
            console.log(`error in farm_compost post `, error);
            res.sendStatus(500);
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlText =  `DELETE FROM "farm_compost" WHERE "farm_compost_id" = $1`;
    let compost_id = req.params.id;
    pool.query(sqlText, [compost_id])
        .then((result) => {
            console.log('deleted compost source ');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in farm_compost delete `, error);
            res.sendStatus(500);
        })

})

router.put('/edit', (req, res) => {

    const date = req.body.farm_compost_date
    const description = req.body.farm_compost_description
    const name = req.body.farm_compost_name
    const id = req.body.farm_compost_id

    const queryText = 'UPDATE "farm_compost" SET "farm_compost_name"=$1, "farm_manure_date"=$2, "farm_compost_description"=$3, WHERE farm_compost_id=$4';
    pool.query(queryText, [name, date, description, id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error deleting compost query', err);
            res.sendStatus(500);
        });
});

router.put('/disable', (req, res) => {

    const id = req.body.checked
    console.log('checked is', req.body);
    for (let num of id) {
        const queryText = 'UPDATE "farm_compost" SET "farm_compost_status"= FALSE WHERE farm_compost_id=$1';
        pool.query(queryText, [num])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting compost query', err);
                res.sendStatus(500);
            });
    }
});

module.exports = router;