const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated
} = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
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

            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});


module.exports = router;