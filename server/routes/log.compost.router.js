const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated
} = require('../modules/authentication-middleware');



// router.get('/', rejectUnauthenticated, (req, res) => {
//     let sqlText = `SELECT * FROM "farm_manure" 
//         JOIN "label_code" on "farm_manure"."label_code_id" = "label_code"."label_code_id"
//         WHERE "farm_manure"."harvest_year_id" = $1;`
//     let harvest_id = req.user.current_harvest_year;
//     console.log(`harvest id off user `, harvest_id);

//     pool.query(sqlText, [harvest_id])
//         .then((result) => {
//             // console.log(`result from manure GET`, result.rows);
//             res.send(result.rows)
//         })
//         .catch((error) => {
//             console.log(`error getting manure`, error);
//             res.sendStatus(500);
//         })
// });


router.post('/', (req, res) => {
    console.log(`req.user `, req.user);
    
    let sqlText = `INSERT INTO "compost"
        ("farm_compost_id", "compost_turned", "compost_date", "test_area_1_temp", "test_area_2_temp", "test_area_3_temp", "test_area_4_temp", "label_code_id", "compost_sig", "harvest_year_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    let values = [
        req.body.farm_compost_id,
        req.body.compost_turned,
        req.body.compost_date,
        req.body.test_area_1_temp,
        req.body.test_area_2_temp,
        req.body.test_area_3_temp,
        req.body.test_area_4_temp,
        req.body.label_code_id,
        req.body.compost_sig,
        1

    ];

    pool.query(sqlText, values)
        .then((result) => {
            console.log('added compost treatment log ');

            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`error in compost treatment log post `, error);
            res.sendStatus(500);
        })
});

// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//     let sqlText = `DELETE FROM "farm_manure" WHERE "farm_manure_id" = $1`;
//     let manure_id = req.params.id;
//     pool.query(sqlText, [manure_id])
//         .then((result) => {
//             console.log('deleted manure source ');
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log(`error in farm_manure delete `, error);
//             res.sendStatus(500);
//         })

// })

module.exports = router;